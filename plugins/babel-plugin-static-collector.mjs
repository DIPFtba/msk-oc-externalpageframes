import path from 'node:path';

/**
 * Sammelt registerLog / registerEvent / registerMessage / registerChildModule
 * zur Build-Zeit, entfernt die Aufrufe und hängt (nur wenn enabled !== false)
 * die Daten an die umgebende Klasse (static get __docs) bzw. das Modul
 * (export const __moduleDocs).
 *
 * Optionen: { enabled: boolean (default true), debug: boolean }
 */

const MARKERS = {
  registerLog: 'logs',
  registerEvent: 'events',
  registerMessage: 'messages',
};
const CHILD = 'registerChildModule';

const isMarker = (name) => Object.hasOwn(MARKERS, name) || name === CHILD;
const emptyBucket = () => ({ logs: [], events: [], messages: [] });
const hasEntries = (b) => b.logs.length + b.events.length + b.messages.length > 0;

export default function staticCollectorPlugin({ types: t }) {
  // Aufruf entfernen, ohne die Syntax zu zerstören (z. B. Arrow-Body)
  function drop(p) {
    if (p.parentPath.isExpressionStatement()) p.parentPath.remove();
    else p.replaceWith(t.unaryExpression('void', t.numericLiteral(0)));
  }

  function keyName(key) {
    if (!key) return '?';
    if (t.isIdentifier(key)) return key.name;
    if (t.isPrivateName(key)) return `#${key.id.name}`;
    if (t.isStringLiteral(key) || t.isNumericLiteral(key)) return String(key.value);
    return '[computed]';
  }

  function classNameOf(cls) {
    if (cls.node.id) return cls.node.id.name;
    if (cls.parentPath.isVariableDeclarator() && t.isIdentifier(cls.parent.id)) {
      return cls.parent.id.name;
    }
    return 'anonymous';
  }

  // Lesbare Herkunft: "Klasse#methode", "Klasse.statischeMethode", "funktionsname"
  function whereOf(p, cls) {
    if (cls) {
      const name = classNameOf(cls);
      const member = p.findParent((x) => x.parent === cls.node.body);
      if (!member) return name;
      const key = member.isStaticBlock() ? 'static' : keyName(member.node.key);
      const sep = member.isStaticBlock() || member.node.static ? '.' : '#';
      return `${name}${sep}${key}`;
    }
    for (
      let fn = p.findParent((x) => x.isFunction());
      fn;
      fn = fn.findParent((x) => x.isFunction())
    ) {
      if (fn.node.id) return fn.node.id.name;
      if (fn.parentPath.isVariableDeclarator() && t.isIdentifier(fn.parent.id)) {
        return fn.parent.id.name;
      }
    }
    return '(module)';
  }

  return {
    name: 'static-collector',
    visitor: {
      // Alles in Program.enter: läuft VOR Klassen-Transformationen anderer Plugins.
      Program(programPath, state) {
        const enabled = state.opts.enabled !== false;
        const debug = state.opts.debug === true;
        const file = path.relative(process.cwd(), state.filename || 'unknown');

        // debugFile: optionaler Teilstring, um die Ausgabe auf bestimmte Dateien zu beschränken
        const debugFile =
          typeof state.opts.debugFile === 'string' ? file.includes(state.opts.debugFile) : true;
        const log = (msg) => {
          if (debug && debugFile) console.log(`[static-collector] ${msg}`);
        };
        log(`Verarbeite ${file} (enabled=${enabled})`);

        const moduleDocs = { own: emptyBucket(), children: [] };
        const classDocs = new Map(); // class node -> { cls, name, own, children }

        const warn = (p, msg) =>
          console.warn(`[static-collector] ${file}:${p.node.loc?.start.line ?? '?'} ${msg}`);

        programPath.traverse({
          // Imports der Marker-Funktionen entfernen (sie existieren im Build nicht mehr)
          ImportDeclaration(p) {
            const had = p.node.specifiers.length > 0;
            p.get('specifiers').forEach((s) => {
              if (s.isImportSpecifier() && isMarker(s.node.local.name)) s.remove();
            });
            if (had && p.node && p.node.specifiers.length === 0) p.remove();
          },

          CallExpression(p) {
            const { callee } = p.node;
            if (!t.isIdentifier(callee)) return;
            const line = p.node.loc?.start.line ?? '?';

            if (!isMarker(callee.name)) {
              // Hinweis auf Tippfehler / Umbenennungen (z. B. registerChildMOdule, registerLog$1)
              if (/^register/i.test(callee.name)) {
                log(
                  `  Zeile ${line}: '${callee.name}()' wird NICHT erkannt ` +
                    `(erwartet: ${[...Object.keys(MARKERS), CHILD].join(', ')})`
                );
              }
              return;
            }

            log(`  Zeile ${line}: ${callee.name}() gefunden`);
            if (enabled) collect(p, callee.name);
            else log('    enabled=false -> Aufruf wird nur entfernt');
            drop(p);
          },
        });

        function collect(p, calleeName) {
          const cls = p.findParent((x) => x.isClass());
          let target = moduleDocs;
          if (cls) {
            if (!classDocs.has(cls.node)) {
              classDocs.set(cls.node, {
                cls,
                name: classNameOf(cls),
                own: emptyBucket(),
                children: [],
              });
            }
            target = classDocs.get(cls.node);
          }

          // --- Kind-Modul ---
          if (calleeName === CHILD) {
            const arg = p.node.arguments[0];
            const scope = cls ? cls.scope : programPath.scope;
            if (!t.isIdentifier(arg)) {
              warn(p, 'registerChildModule erwartet einen Bezeichner – ignoriert.');
            } else if (!scope.hasBinding(arg.name)) {
              warn(p, `'${arg.name}' ist im Geltungsbereich nicht erreichbar – ignoriert.`);
            } else {
              target.children.push(arg.name);
              log(
                `    -> Kind '${arg.name}' eingetragen bei ` +
                  `${cls ? `Klasse ${classNameOf(cls)}` : 'Modul'}`
              );
            }
            return;
          }

          // --- Log / Event / Message ---
          const [nameArg, descrArg, paramsArg] = p.get('arguments');
          const nameEval = nameArg?.evaluate();
          if (!nameEval?.confident) {
            warn(p, `Erstes Argument (name) von ${calleeName} nicht statisch auswertbar – ignoriert.`);
            return;
          }

          const entry = { name: nameEval.value, where: whereOf(p, cls) };

          // 2. Argument -> descr, 3. Argument -> params (jeweils optional)
          for (const [argPath, field] of [
            [descrArg, 'descr'],
            [paramsArg, 'params'],
          ]) {
            if (!argPath) continue;
            const r = argPath.evaluate();
            if (r.confident) entry[field] = r.value;
            else warn(p, `Argument '${field}' von ${calleeName} nicht statisch auswertbar – ignoriert.`);
          }
          target.own[MARKERS[calleeName]].push(entry);

          log(`    -> ${MARKERS[calleeName]}: ${JSON.stringify(entry)}`);
        }

        log(
          `  Zusammenfassung: ${classDocs.size} Klasse(n) mit Einträgen, ` +
            `Modul-Ebene: ${hasEntries(moduleDocs.own) || moduleDocs.children.length ? 'ja' : 'nein'}`
        );

        if (!enabled) return;

        // Klassen: static get __docs() { return { name, own, children } }
        for (const { cls, name, own, children } of classDocs.values()) {
          if (!hasEntries(own) && children.length === 0) continue;

          const getter = t.classMethod(
            'get',
            t.identifier('__docs'),
            [],
            t.blockStatement([
              t.returnStatement(
                t.objectExpression([
                  t.objectProperty(t.identifier('name'), t.stringLiteral(name)),
                  t.objectProperty(t.identifier('own'), t.valueToNode(own)),
                  t.objectProperty(
                    t.identifier('children'),
                    t.arrayExpression(children.map((n) => t.identifier(n)))
                  ),
                ])
              ),
            ]),
            false, // computed
            true // static
          );
          cls.get('body').pushContainer('body', getter);
          log(`  static get __docs() in Klasse '${name}' eingefügt`);
        }

        // Modul-Ebene: export const __moduleDocs = { name, own, get children() {...} }
        if (hasEntries(moduleDocs.own) || moduleDocs.children.length > 0) {
          const decl = t.exportNamedDeclaration(
            t.variableDeclaration('const', [
              t.variableDeclarator(
                t.identifier('__moduleDocs'),
                t.objectExpression([
                  t.objectProperty(t.identifier('name'), t.stringLiteral(path.basename(file))),
                  t.objectProperty(t.identifier('own'), t.valueToNode(moduleDocs.own)),
                  t.objectMethod(
                    'get',
                    t.identifier('children'),
                    [],
                    t.blockStatement([
                      t.returnStatement(
                        t.arrayExpression(moduleDocs.children.map((n) => t.identifier(n)))
                      ),
                    ])
                  ),
                ])
              ),
            ])
          );
          programPath.pushContainer('body', decl);
          log('  export const __moduleDocs eingefügt');
        }
      },
    },
  };
}
