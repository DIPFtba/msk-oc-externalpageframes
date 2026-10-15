// Nur im Editor verwenden.
// collectDocs(PointAreaExt)  oder  collectDocs(moduleNamespace)
// -> { own: {logs, events, messages}, inherited: {logs, events, messages} }
// Geerbte Einträge tragen zusätzlich `from` (Name der Quelle).

const TYPES = ['logs', 'events', 'messages'];
const empty = () => Object.fromEntries(TYPES.map((type) => [type, []]));

function docsOf(src) {
  if (!src || (typeof src !== 'function' && typeof src !== 'object')) return null;
  // hasOwn: static Getter einer Basisklasse nicht fälschlich als "eigene" Doku lesen
  if (Object.hasOwn(src, '__docs')) return src.__docs;
  if (Object.hasOwn(src, '__moduleDocs')) return src.__moduleDocs;
  return null;
}

export function collectDocs(source) {
  const result = { own: empty(), inherited: empty() };
  const seen = new Set();

  function walk(src, isRoot) {
    if (!src || seen.has(src)) return;
    seen.add(src);

    const d = docsOf(src);
    if (d) {
      for (const type of TYPES) {
        for (const entry of d.own[type]) {
          if (isRoot) result.own[type].push(entry);
          else result.inherited[type].push({ ...entry, from: d.name });
        }
      }
      d.children.forEach((child) => walk(child, false));
    }

    // Modul-Namespace (import * as x): auch die exportierten Klassen/Funktionen durchsuchen
    if (Object.prototype.toString.call(src) === '[object Module]') {
      Object.values(src).forEach((value) => walk(value, false));
    }

    // extends: Basisklasse automatisch als "geerbt" behandeln
    if (typeof src === 'function') {
      const parent = Object.getPrototypeOf(src);
      if (parent && parent !== Function.prototype) walk(parent, false);
    }
  }

  walk(source, true);
  return result;
}