
// Hilfsfunktion, um ein StyleInterface in ein CSS-kompatibles Objekt umzuwandeln
export function expStyle(s) {
    const res = {};
    if (!s) {
        return res;
    }

    const abbr = {
        marginVert: null,
        marginHorz: null,
        paddingHorz: null,
        paddingVert: null,
    };
    const abbrKeys = Object.keys(abbr);

    const setPx = (val) =>
        typeof val === 'number' || /^\d+(\.\d+)?$/.test(val) ? `${val}px` : val;

    Object.keys(s).forEach((key) => {
        if (key.startsWith('_set_')) {
            return; // Ignoriere interne Properties
        }
        if (`_set_${key}` in s && !s[`_set_${key}`]) {
            return; // Ignoriere Properties, die durch eine _set_XY=false disabled werden
        }

        // Value holen und trimmen
        let v = s[key];
        if (typeof v === 'string') {
            v = v.trim();
        }
        if (v === null || v === undefined || v === '') {
            return; // Ignoriere null/undefined/empty Werte
        }

        // einer der abbr Werte?
        if (abbrKeys.includes(key)) {
            abbr[key] = v;
            return;
        }

        switch (key) {
            case 'opacity100':
                res['opacity'] = v / 100;
                break;
            case 'borderWidth':
                res['borderWidth'] = setPx(v);
                res['borderStyle'] = 'solid';
                break;
            case 'fontWeight':
                // Ohne "px"!
                res[key] = v;
                break;
            default:
                res[key] = setPx(v);
                break;
        }
    });

    const setVertHorz = (name) => {
        const vert = abbr[`${name}Vert`];
        const horz = abbr[`${name}Horz`];
        if (vert !== null) {
            const v = setPx(vert);
            if (horz !== null) {
                res[`${name}`] = `${v} ${setPx(horz)}`;
            } else {
                res[`${name}Top`] = v;
                res[`${name}Bottom`] = v;
            }
        } else if (horz !== null) {
            const h = setPx(horz);
            res[`${name}Left`] = h;
            res[`${name}Right`] = h;
        }
    };
    setVertHorz('margin');
    setVertHorz('padding');

    return res;
}


/**
 * Wandelt eine Camel-Case-Zeichenkette in Kebab-Case um.
 * @param {string} str - Die Camel-Case-Zeichenkette (z.B. 'meinKamelCaseString').
 * @returns {string} Die Kebab-Case-Zeichenkette (z.B. 'mein-kamel-case-string').
 */
export function camelToKebab(str) {
  // 1. Suchen Sie nach jedem Großbuchstaben (A-Z)
  // 2. Fügen Sie einen Bindestrich (-) vor jedem gefundenen Großbuchstaben ein
  // 3. Wandeln Sie den gesamten String in Kleinbuchstaben um
  return str
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
    .toLowerCase();
}


export function setStyles ( el, styles ) {
    for ( const st in styles ) {
        el.style[st] = styles[st];
    }
}
