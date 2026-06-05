/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function ze(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const K = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, wt = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], oe = () => {
}, js = () => !1, en = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Nn = (e) => e.startsWith("onUpdate:"), te = Object.assign, xo = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, ri = Object.prototype.hasOwnProperty, H = (e, t) => ri.call(e, t), M = Array.isArray, ht = (e) => Pn(e) === "[object Map]", Hs = (e) => Pn(e) === "[object Set]", $ = (e) => typeof e == "function", Z = (e) => typeof e == "string", ut = (e) => typeof e == "symbol", W = (e) => e !== null && typeof e == "object", wo = (e) => (W(e) || $(e)) && $(e.then) && $(e.catch), ks = Object.prototype.toString, Pn = (e) => ks.call(e), Do = (e) => Pn(e).slice(8, -1), Us = (e) => Pn(e) === "[object Object]", Vo = (e) => Z(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, kt = /* @__PURE__ */ ze(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ii = /* @__PURE__ */ ze(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), Ln = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, li = /-\w/g, Ce = Ln(
  (e) => e.replace(li, (t) => t.slice(1).toUpperCase())
), ci = /\B([A-Z])/g, Je = Ln(
  (e) => e.replace(ci, "-$1").toLowerCase()
), Fn = Ln((e) => e.charAt(0).toUpperCase() + e.slice(1)), dt = Ln(
  (e) => e ? `on${Fn(e)}` : ""
), it = (e, t) => !Object.is(e, t), It = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, On = (e, t, n, o = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: o,
    value: n
  });
}, ui = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Xo;
const tn = () => Xo || (Xo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function nn(e) {
  if (M(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], s = Z(o) ? pi(o) : nn(o);
      if (s)
        for (const r in s)
          t[r] = s[r];
    }
    return t;
  } else if (Z(e) || W(e))
    return e;
}
const fi = /;(?![^(]*\))/g, ai = /:([^]+)/, di = /\/\*[^]*?\*\//g;
function pi(e) {
  const t = {};
  return e.replace(di, "").split(fi).forEach((n) => {
    if (n) {
      const o = n.split(ai);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function jn(e) {
  let t = "";
  if (Z(e))
    t = e;
  else if (M(e))
    for (let n = 0; n < e.length; n++) {
      const o = jn(e[n]);
      o && (t += o + " ");
    }
  else if (W(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const hi = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", gi = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", vi = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", mi = /* @__PURE__ */ ze(hi), _i = /* @__PURE__ */ ze(gi), Ei = /* @__PURE__ */ ze(vi), yi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", bi = /* @__PURE__ */ ze(yi);
function Bs(e) {
  return !!e || e === "";
}
const Ks = (e) => !!(e && e.__v_isRef === !0), Ws = (e) => Z(e) ? e : e == null ? "" : M(e) || W(e) && (e.toString === ks || !$(e.toString)) ? Ks(e) ? Ws(e.value) : JSON.stringify(e, Gs, 2) : String(e), Gs = (e, t) => Ks(t) ? Gs(e, t.value) : ht(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [o, s], r) => (n[zn(o, r) + " =>"] = s, n),
    {}
  )
} : Hs(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => zn(n))
} : ut(t) ? zn(t) : W(t) && !M(t) && !Us(t) ? String(t) : t, zn = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    ut(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Me(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let _e;
class Ni {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = _e, !t && _e && (this.index = (_e.scopes || (_e.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = _e;
      try {
        return _e = this, t();
      } finally {
        _e = n;
      }
    } else process.env.NODE_ENV !== "production" && Me("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = _e, _e = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (_e = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, o;
      for (n = 0, o = this.effects.length; n < o; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, o = this.cleanups.length; n < o; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, o = this.scopes.length; n < o; n++)
          this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Oi() {
  return _e;
}
let U;
const Xn = /* @__PURE__ */ new WeakSet();
class Zs {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, _e && _e.active && _e.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Xn.has(this) && (Xn.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || qs(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Qo(this), Js(this);
    const t = U, n = Te;
    U = this, Te = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && U !== this && Me(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), zs(this), U = t, Te = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        To(t);
      this.deps = this.depsTail = void 0, Qo(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Xn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    lo(this) && this.run();
  }
  get dirty() {
    return lo(this);
  }
}
let Ys = 0, Ut, Bt;
function qs(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Bt, Bt = e;
    return;
  }
  e.next = Ut, Ut = e;
}
function So() {
  Ys++;
}
function Co() {
  if (--Ys > 0)
    return;
  if (Bt) {
    let t = Bt;
    for (Bt = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Ut; ) {
    let t = Ut;
    for (Ut = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (o) {
          e || (e = o);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function Js(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function zs(e) {
  let t, n = e.depsTail, o = n;
  for (; o; ) {
    const s = o.prevDep;
    o.version === -1 ? (o === n && (n = s), To(o), xi(o)) : t = o, o.dep.activeLink = o.prevActiveLink, o.prevActiveLink = void 0, o = s;
  }
  e.deps = t, e.depsTail = n;
}
function lo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Xs(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Xs(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Yt) || (e.globalVersion = Yt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !lo(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = U, o = Te;
  U = e, Te = !0;
  try {
    Js(e);
    const s = e.fn(e._value);
    (t.version === 0 || it(s, e._value)) && (e.flags |= 128, e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    U = n, Te = o, zs(e), e.flags &= -3;
  }
}
function To(e, t = !1) {
  const { dep: n, prevSub: o, nextSub: s } = e;
  if (o && (o.nextSub = s, e.prevSub = void 0), s && (s.prevSub = o, e.nextSub = void 0), process.env.NODE_ENV !== "production" && n.subsHead === e && (n.subsHead = s), n.subs === e && (n.subs = o, !o && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep)
      To(r, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function xi(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Te = !0;
const Qs = [];
function $e() {
  Qs.push(Te), Te = !1;
}
function Ae() {
  const e = Qs.pop();
  Te = e === void 0 ? !0 : e;
}
function Qo(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = U;
    U = void 0;
    try {
      t();
    } finally {
      U = n;
    }
  }
}
let Yt = 0;
class wi {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Mo {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!U || !Te || U === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== U)
      n = this.activeLink = new wi(U, this), U.deps ? (n.prevDep = U.depsTail, U.depsTail.nextDep = n, U.depsTail = n) : U.deps = U.depsTail = n, er(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const o = n.nextDep;
      o.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = o), n.prevDep = U.depsTail, n.nextDep = void 0, U.depsTail.nextDep = n, U.depsTail = n, U.deps === n && (U.deps = o);
    }
    return process.env.NODE_ENV !== "production" && U.onTrack && U.onTrack(
      te(
        {
          effect: U
        },
        t
      )
    ), n;
  }
  trigger(t) {
    this.version++, Yt++, this.notify(t);
  }
  notify(t) {
    So();
    try {
      if (process.env.NODE_ENV !== "production")
        for (let n = this.subsHead; n; n = n.nextSub)
          n.sub.onTrigger && !(n.sub.flags & 8) && n.sub.onTrigger(
            te(
              {
                effect: n.sub
              },
              t
            )
          );
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Co();
    }
  }
}
function er(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let o = t.deps; o; o = o.nextDep)
        er(o);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const co = /* @__PURE__ */ new WeakMap(), gt = Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), uo = Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), qt = Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function ne(e, t, n) {
  if (Te && U) {
    let o = co.get(e);
    o || co.set(e, o = /* @__PURE__ */ new Map());
    let s = o.get(n);
    s || (o.set(n, s = new Mo()), s.map = o, s.key = n), process.env.NODE_ENV !== "production" ? s.track({
      target: e,
      type: t,
      key: n
    }) : s.track();
  }
}
function ke(e, t, n, o, s, r) {
  const i = co.get(e);
  if (!i) {
    Yt++;
    return;
  }
  const l = (u) => {
    u && (process.env.NODE_ENV !== "production" ? u.trigger({
      target: e,
      type: t,
      key: n,
      newValue: o,
      oldValue: s,
      oldTarget: r
    }) : u.trigger());
  };
  if (So(), t === "clear")
    i.forEach(l);
  else {
    const u = M(e), p = u && Vo(n);
    if (u && n === "length") {
      const d = Number(o);
      i.forEach((a, g) => {
        (g === "length" || g === qt || !ut(g) && g >= d) && l(a);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), p && l(i.get(qt)), t) {
        case "add":
          u ? p && l(i.get("length")) : (l(i.get(gt)), ht(e) && l(i.get(uo)));
          break;
        case "delete":
          u || (l(i.get(gt)), ht(e) && l(i.get(uo)));
          break;
        case "set":
          ht(e) && l(i.get(gt));
          break;
      }
  }
  Co();
}
function bt(e) {
  const t = R(e);
  return t === e ? t : (ne(t, "iterate", qt), he(e) ? t : t.map(ie));
}
function Hn(e) {
  return ne(e = R(e), "iterate", qt), e;
}
const Di = {
  __proto__: null,
  [Symbol.iterator]() {
    return Qn(this, Symbol.iterator, ie);
  },
  concat(...e) {
    return bt(this).concat(
      ...e.map((t) => M(t) ? bt(t) : t)
    );
  },
  entries() {
    return Qn(this, "entries", (e) => (e[1] = ie(e[1]), e));
  },
  every(e, t) {
    return Ge(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ge(this, "filter", e, t, (n) => n.map(ie), arguments);
  },
  find(e, t) {
    return Ge(this, "find", e, t, ie, arguments);
  },
  findIndex(e, t) {
    return Ge(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ge(this, "findLast", e, t, ie, arguments);
  },
  findLastIndex(e, t) {
    return Ge(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ge(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return eo(this, "includes", e);
  },
  indexOf(...e) {
    return eo(this, "indexOf", e);
  },
  join(e) {
    return bt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return eo(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ge(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Pt(this, "pop");
  },
  push(...e) {
    return Pt(this, "push", e);
  },
  reduce(e, ...t) {
    return es(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return es(this, "reduceRight", e, t);
  },
  shift() {
    return Pt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ge(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Pt(this, "splice", e);
  },
  toReversed() {
    return bt(this).toReversed();
  },
  toSorted(e) {
    return bt(this).toSorted(e);
  },
  toSpliced(...e) {
    return bt(this).toSpliced(...e);
  },
  unshift(...e) {
    return Pt(this, "unshift", e);
  },
  values() {
    return Qn(this, "values", ie);
  }
};
function Qn(e, t, n) {
  const o = Hn(e), s = o[t]();
  return o !== e && !he(e) && (s._next = s.next, s.next = () => {
    const r = s._next();
    return r.done || (r.value = n(r.value)), r;
  }), s;
}
const Vi = Array.prototype;
function Ge(e, t, n, o, s, r) {
  const i = Hn(e), l = i !== e && !he(e), u = i[t];
  if (u !== Vi[t]) {
    const a = u.apply(e, r);
    return l ? ie(a) : a;
  }
  let p = n;
  i !== e && (l ? p = function(a, g) {
    return n.call(this, ie(a), g, e);
  } : n.length > 2 && (p = function(a, g) {
    return n.call(this, a, g, e);
  }));
  const d = u.call(i, p, o);
  return l && s ? s(d) : d;
}
function es(e, t, n, o) {
  const s = Hn(e);
  let r = n;
  return s !== e && (he(e) ? n.length > 3 && (r = function(i, l, u) {
    return n.call(this, i, l, u, e);
  }) : r = function(i, l, u) {
    return n.call(this, i, ie(l), u, e);
  }), s[t](r, ...o);
}
function eo(e, t, n) {
  const o = R(e);
  ne(o, "iterate", qt);
  const s = o[t](...n);
  return (s === -1 || s === !1) && xn(n[0]) ? (n[0] = R(n[0]), o[t](...n)) : s;
}
function Pt(e, t, n = []) {
  $e(), So();
  const o = R(e)[t].apply(e, n);
  return Co(), Ae(), o;
}
const Si = /* @__PURE__ */ ze("__proto__,__v_isRef,__isVue"), tr = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ut)
);
function Ci(e) {
  ut(e) || (e = String(e));
  const t = R(this);
  return ne(t, "has", e), t.hasOwnProperty(e);
}
class nr {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, o) {
    if (n === "__v_skip") return t.__v_skip;
    const s = this._isReadonly, r = this._isShallow;
    if (n === "__v_isReactive")
      return !s;
    if (n === "__v_isReadonly")
      return s;
    if (n === "__v_isShallow")
      return r;
    if (n === "__v_raw")
      return o === (s ? r ? cr : lr : r ? ir : rr).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const i = M(t);
    if (!s) {
      let u;
      if (i && (u = Di[n]))
        return u;
      if (n === "hasOwnProperty")
        return Ci;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      z(t) ? t : o
    );
    if ((ut(n) ? tr.has(n) : Si(n)) || (s || ne(t, "get", n), r))
      return l;
    if (z(l)) {
      const u = i && Vo(n) ? l : l.value;
      return s && W(u) ? ao(u) : u;
    }
    return W(l) ? s ? ao(l) : $o(l) : l;
  }
}
class or extends nr {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, o, s) {
    let r = t[n];
    if (!this._isShallow) {
      const u = Ke(r);
      if (!he(o) && !Ke(o) && (r = R(r), o = R(o)), !M(t) && z(r) && !z(o))
        return u ? (process.env.NODE_ENV !== "production" && Me(
          `Set operation on key "${String(n)}" failed: target is readonly.`,
          t[n]
        ), !0) : (r.value = o, !0);
    }
    const i = M(t) && Vo(n) ? Number(n) < t.length : H(t, n), l = Reflect.set(
      t,
      n,
      o,
      z(t) ? t : s
    );
    return t === R(s) && (i ? it(o, r) && ke(t, "set", n, o, r) : ke(t, "add", n, o)), l;
  }
  deleteProperty(t, n) {
    const o = H(t, n), s = t[n], r = Reflect.deleteProperty(t, n);
    return r && o && ke(t, "delete", n, void 0, s), r;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!ut(n) || !tr.has(n)) && ne(t, "has", n), o;
  }
  ownKeys(t) {
    return ne(
      t,
      "iterate",
      M(t) ? "length" : gt
    ), Reflect.ownKeys(t);
  }
}
class sr extends nr {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && Me(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && Me(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const Ti = /* @__PURE__ */ new or(), Mi = /* @__PURE__ */ new sr(), $i = /* @__PURE__ */ new or(!0), Ai = /* @__PURE__ */ new sr(!0), fo = (e) => e, dn = (e) => Reflect.getPrototypeOf(e);
function Ri(e, t, n) {
  return function(...o) {
    const s = this.__v_raw, r = R(s), i = ht(r), l = e === "entries" || e === Symbol.iterator && i, u = e === "keys" && i, p = s[e](...o), d = n ? fo : t ? wn : ie;
    return !t && ne(
      r,
      "iterate",
      u ? uo : gt
    ), {
      // iterator protocol
      next() {
        const { value: a, done: g } = p.next();
        return g ? { value: a, done: g } : {
          value: l ? [d(a[0]), d(a[1])] : d(a),
          done: g
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function pn(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      Me(
        `${Fn(e)} operation ${n}failed: target is readonly.`,
        R(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Ii(e, t) {
  const n = {
    get(s) {
      const r = this.__v_raw, i = R(r), l = R(s);
      e || (it(s, l) && ne(i, "get", s), ne(i, "get", l));
      const { has: u } = dn(i), p = t ? fo : e ? wn : ie;
      if (u.call(i, s))
        return p(r.get(s));
      if (u.call(i, l))
        return p(r.get(l));
      r !== i && r.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !e && ne(R(s), "iterate", gt), s.size;
    },
    has(s) {
      const r = this.__v_raw, i = R(r), l = R(s);
      return e || (it(s, l) && ne(i, "has", s), ne(i, "has", l)), s === l ? r.has(s) : r.has(s) || r.has(l);
    },
    forEach(s, r) {
      const i = this, l = i.__v_raw, u = R(l), p = t ? fo : e ? wn : ie;
      return !e && ne(u, "iterate", gt), l.forEach((d, a) => s.call(r, p(d), p(a), i));
    }
  };
  return te(
    n,
    e ? {
      add: pn("add"),
      set: pn("set"),
      delete: pn("delete"),
      clear: pn("clear")
    } : {
      add(s) {
        !t && !he(s) && !Ke(s) && (s = R(s));
        const r = R(this);
        return dn(r).has.call(r, s) || (r.add(s), ke(r, "add", s, s)), this;
      },
      set(s, r) {
        !t && !he(r) && !Ke(r) && (r = R(r));
        const i = R(this), { has: l, get: u } = dn(i);
        let p = l.call(i, s);
        p ? process.env.NODE_ENV !== "production" && ts(i, l, s) : (s = R(s), p = l.call(i, s));
        const d = u.call(i, s);
        return i.set(s, r), p ? it(r, d) && ke(i, "set", s, r, d) : ke(i, "add", s, r), this;
      },
      delete(s) {
        const r = R(this), { has: i, get: l } = dn(r);
        let u = i.call(r, s);
        u ? process.env.NODE_ENV !== "production" && ts(r, i, s) : (s = R(s), u = i.call(r, s));
        const p = l ? l.call(r, s) : void 0, d = r.delete(s);
        return u && ke(r, "delete", s, void 0, p), d;
      },
      clear() {
        const s = R(this), r = s.size !== 0, i = process.env.NODE_ENV !== "production" ? ht(s) ? new Map(s) : new Set(s) : void 0, l = s.clear();
        return r && ke(
          s,
          "clear",
          void 0,
          void 0,
          i
        ), l;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((s) => {
    n[s] = Ri(s, e, t);
  }), n;
}
function kn(e, t) {
  const n = Ii(e, t);
  return (o, s, r) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get(
    H(n, s) && s in o ? n : o,
    s,
    r
  );
}
const Pi = {
  get: /* @__PURE__ */ kn(!1, !1)
}, Li = {
  get: /* @__PURE__ */ kn(!1, !0)
}, Fi = {
  get: /* @__PURE__ */ kn(!0, !1)
}, ji = {
  get: /* @__PURE__ */ kn(!0, !0)
};
function ts(e, t, n) {
  const o = R(n);
  if (o !== n && t.call(e, o)) {
    const s = Do(e);
    Me(
      `Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const rr = /* @__PURE__ */ new WeakMap(), ir = /* @__PURE__ */ new WeakMap(), lr = /* @__PURE__ */ new WeakMap(), cr = /* @__PURE__ */ new WeakMap();
function Hi(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function ki(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Hi(Do(e));
}
function $o(e) {
  return Ke(e) ? e : Un(
    e,
    !1,
    Ti,
    Pi,
    rr
  );
}
function Ui(e) {
  return Un(
    e,
    !1,
    $i,
    Li,
    ir
  );
}
function ao(e) {
  return Un(
    e,
    !0,
    Mi,
    Fi,
    lr
  );
}
function Ue(e) {
  return Un(
    e,
    !0,
    Ai,
    ji,
    cr
  );
}
function Un(e, t, n, o, s) {
  if (!W(e))
    return process.env.NODE_ENV !== "production" && Me(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = ki(e);
  if (r === 0)
    return e;
  const i = s.get(e);
  if (i)
    return i;
  const l = new Proxy(
    e,
    r === 2 ? o : n
  );
  return s.set(e, l), l;
}
function lt(e) {
  return Ke(e) ? lt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Ke(e) {
  return !!(e && e.__v_isReadonly);
}
function he(e) {
  return !!(e && e.__v_isShallow);
}
function xn(e) {
  return e ? !!e.__v_raw : !1;
}
function R(e) {
  const t = e && e.__v_raw;
  return t ? R(t) : e;
}
function Bi(e) {
  return !H(e, "__v_skip") && Object.isExtensible(e) && On(e, "__v_skip", !0), e;
}
const ie = (e) => W(e) ? $o(e) : e, wn = (e) => W(e) ? ao(e) : e;
function z(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function ue(e) {
  return Ki(e, !1);
}
function Ki(e, t) {
  return z(e) ? e : new Wi(e, t);
}
class Wi {
  constructor(t, n) {
    this.dep = new Mo(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : R(t), this._value = n ? t : ie(t), this.__v_isShallow = n;
  }
  get value() {
    return process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, o = this.__v_isShallow || he(t) || Ke(t);
    t = o ? t : R(t), it(t, n) && (this._rawValue = t, this._value = o ? t : ie(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }) : this.dep.trigger());
  }
}
function tt(e) {
  return z(e) ? e.value : e;
}
const Gi = {
  get: (e, t, n) => t === "__v_raw" ? e : tt(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const s = e[t];
    return z(s) && !z(n) ? (s.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function ur(e) {
  return lt(e) ? e : new Proxy(e, Gi);
}
class Zi {
  constructor(t, n, o) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Mo(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Yt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = o;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    U !== this)
      return qs(this, !0), !0;
    process.env.NODE_ENV;
  }
  get value() {
    const t = process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track();
    return Xs(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter ? this.setter(t) : process.env.NODE_ENV !== "production" && Me("Write operation failed: computed value is readonly");
  }
}
function Yi(e, t, n = !1) {
  let o, s;
  $(e) ? o = e : (o = e.get, s = e.set);
  const r = new Zi(o, s, n);
  return process.env.NODE_ENV, r;
}
const hn = {}, Dn = /* @__PURE__ */ new WeakMap();
let pt;
function qi(e, t = !1, n = pt) {
  if (n) {
    let o = Dn.get(n);
    o || Dn.set(n, o = []), o.push(e);
  } else process.env.NODE_ENV !== "production" && !t && Me(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function Ji(e, t, n = K) {
  const { immediate: o, deep: s, once: r, scheduler: i, augmentJob: l, call: u } = n, p = (S) => {
    (n.onWarn || Me)(
      "Invalid watch source: ",
      S,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, d = (S) => s ? S : he(S) || s === !1 || s === 0 ? rt(S, 1) : rt(S);
  let a, g, y, D, V = !1, X = !1;
  if (z(e) ? (g = () => e.value, V = he(e)) : lt(e) ? (g = () => d(e), V = !0) : M(e) ? (X = !0, V = e.some((S) => lt(S) || he(S)), g = () => e.map((S) => {
    if (z(S))
      return S.value;
    if (lt(S))
      return d(S);
    if ($(S))
      return u ? u(S, 2) : S();
    process.env.NODE_ENV !== "production" && p(S);
  })) : $(e) ? t ? g = u ? () => u(e, 2) : e : g = () => {
    if (y) {
      $e();
      try {
        y();
      } finally {
        Ae();
      }
    }
    const S = pt;
    pt = a;
    try {
      return u ? u(e, 3, [D]) : e(D);
    } finally {
      pt = S;
    }
  } : (g = oe, process.env.NODE_ENV !== "production" && p(e)), t && s) {
    const S = g, Q = s === !0 ? 1 / 0 : s;
    g = () => rt(S(), Q);
  }
  const k = Oi(), I = () => {
    a.stop(), k && k.active && xo(k.effects, a);
  };
  if (r && t) {
    const S = t;
    t = (...Q) => {
      S(...Q), I();
    };
  }
  let P = X ? new Array(e.length).fill(hn) : hn;
  const fe = (S) => {
    if (!(!(a.flags & 1) || !a.dirty && !S))
      if (t) {
        const Q = a.run();
        if (s || V || (X ? Q.some((se, ee) => it(se, P[ee])) : it(Q, P))) {
          y && y();
          const se = pt;
          pt = a;
          try {
            const ee = [
              Q,
              // pass undefined as the old value when it's changed for the first time
              P === hn ? void 0 : X && P[0] === hn ? [] : P,
              D
            ];
            P = Q, u ? u(t, 3, ee) : (
              // @ts-expect-error
              t(...ee)
            );
          } finally {
            pt = se;
          }
        }
      } else
        a.run();
  };
  return l && l(fe), a = new Zs(g), a.scheduler = i ? () => i(fe, !1) : fe, D = (S) => qi(S, !1, a), y = a.onStop = () => {
    const S = Dn.get(a);
    if (S) {
      if (u)
        u(S, 4);
      else
        for (const Q of S) Q();
      Dn.delete(a);
    }
  }, process.env.NODE_ENV !== "production" && (a.onTrack = n.onTrack, a.onTrigger = n.onTrigger), t ? o ? fe(!0) : P = a.run() : i ? i(fe.bind(null, !0), !0) : a.run(), I.pause = a.pause.bind(a), I.resume = a.resume.bind(a), I.stop = I, I;
}
function rt(e, t = 1 / 0, n) {
  if (t <= 0 || !W(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, z(e))
    rt(e.value, t, n);
  else if (M(e))
    for (let o = 0; o < e.length; o++)
      rt(e[o], t, n);
  else if (Hs(e) || ht(e))
    e.forEach((o) => {
      rt(o, t, n);
    });
  else if (Us(e)) {
    for (const o in e)
      rt(e[o], t, n);
    for (const o of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, o) && rt(e[o], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const vt = [];
function gn(e) {
  vt.push(e);
}
function vn() {
  vt.pop();
}
let to = !1;
function O(e, ...t) {
  if (to) return;
  to = !0, $e();
  const n = vt.length ? vt[vt.length - 1].component : null, o = n && n.appContext.config.warnHandler, s = zi();
  if (o)
    Ct(
      o,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((r) => {
          var i, l;
          return (l = (i = r.toString) == null ? void 0 : i.call(r)) != null ? l : JSON.stringify(r);
        }).join(""),
        n && n.proxy,
        s.map(
          ({ vnode: r }) => `at <${Zn(n, r.type)}>`
        ).join(`
`),
        s
      ]
    );
  else {
    const r = [`[Vue warn]: ${e}`, ...t];
    s.length && r.push(`
`, ...Xi(s)), console.warn(...r);
  }
  Ae(), to = !1;
}
function zi() {
  let e = vt[vt.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const o = e.component && e.component.parent;
    e = o && o.vnode;
  }
  return t;
}
function Xi(e) {
  const t = [];
  return e.forEach((n, o) => {
    t.push(...o === 0 ? [] : [`
`], ...Qi(n));
  }), t;
}
function Qi({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, s = ` at <${Zn(
    e.component,
    e.type,
    o
  )}`, r = ">" + n;
  return e.props ? [s, ...el(e.props), r] : [s + r];
}
function el(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((o) => {
    t.push(...fr(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function fr(e, t, n) {
  return Z(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : z(t) ? (t = fr(e, R(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : $(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = R(t), n ? t : [`${e}=`, t]);
}
const Ao = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush",
  15: "component update",
  16: "app unmount cleanup function"
};
function Ct(e, t, n, o) {
  try {
    return o ? e(...o) : e();
  } catch (s) {
    on(s, t, n);
  }
}
function We(e, t, n, o) {
  if ($(e)) {
    const s = Ct(e, t, n, o);
    return s && wo(s) && s.catch((r) => {
      on(r, t, n);
    }), s;
  }
  if (M(e)) {
    const s = [];
    for (let r = 0; r < e.length; r++)
      s.push(We(e[r], t, n, o));
    return s;
  } else process.env.NODE_ENV !== "production" && O(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function on(e, t, n, o = !0) {
  const s = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: i } = t && t.appContext.config || K;
  if (t) {
    let l = t.parent;
    const u = t.proxy, p = process.env.NODE_ENV !== "production" ? Ao[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const d = l.ec;
      if (d) {
        for (let a = 0; a < d.length; a++)
          if (d[a](e, u, p) === !1)
            return;
      }
      l = l.parent;
    }
    if (r) {
      $e(), Ct(r, null, 10, [
        e,
        u,
        p
      ]), Ae();
      return;
    }
  }
  tl(e, n, s, o, i);
}
function tl(e, t, n, o = !0, s = !1) {
  if (process.env.NODE_ENV !== "production") {
    const r = Ao[t];
    if (n && gn(n), O(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && vn(), o)
      throw e;
    console.error(e);
  } else {
    if (s)
      throw e;
    console.error(e);
  }
}
const pe = [];
let je = -1;
const Dt = [];
let nt = null, xt = 0;
const ar = /* @__PURE__ */ Promise.resolve();
let Vn = null;
const nl = 100;
function Ro(e) {
  const t = Vn || ar;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ol(e) {
  let t = je + 1, n = pe.length;
  for (; t < n; ) {
    const o = t + n >>> 1, s = pe[o], r = Jt(s);
    r < e || r === e && s.flags & 2 ? t = o + 1 : n = o;
  }
  return t;
}
function Bn(e) {
  if (!(e.flags & 1)) {
    const t = Jt(e), n = pe[pe.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Jt(n) ? pe.push(e) : pe.splice(ol(t), 0, e), e.flags |= 1, dr();
  }
}
function dr() {
  Vn || (Vn = ar.then(gr));
}
function pr(e) {
  M(e) ? Dt.push(...e) : nt && e.id === -1 ? nt.splice(xt + 1, 0, e) : e.flags & 1 || (Dt.push(e), e.flags |= 1), dr();
}
function ns(e, t, n = je + 1) {
  for (process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()); n < pe.length; n++) {
    const o = pe[n];
    if (o && o.flags & 2) {
      if (e && o.id !== e.uid || process.env.NODE_ENV !== "production" && Io(t, o))
        continue;
      pe.splice(n, 1), n--, o.flags & 4 && (o.flags &= -2), o(), o.flags & 4 || (o.flags &= -2);
    }
  }
}
function hr(e) {
  if (Dt.length) {
    const t = [...new Set(Dt)].sort(
      (n, o) => Jt(n) - Jt(o)
    );
    if (Dt.length = 0, nt) {
      nt.push(...t);
      return;
    }
    for (nt = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), xt = 0; xt < nt.length; xt++) {
      const n = nt[xt];
      process.env.NODE_ENV !== "production" && Io(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    nt = null, xt = 0;
  }
}
const Jt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function gr(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => Io(e, n) : oe;
  try {
    for (je = 0; je < pe.length; je++) {
      const n = pe[je];
      if (n && !(n.flags & 8)) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        n.flags & 4 && (n.flags &= -2), Ct(
          n,
          n.i,
          n.i ? 15 : 14
        ), n.flags & 4 || (n.flags &= -2);
      }
    }
  } finally {
    for (; je < pe.length; je++) {
      const n = pe[je];
      n && (n.flags &= -2);
    }
    je = -1, pe.length = 0, hr(e), Vn = null, (pe.length || Dt.length) && gr(e);
  }
}
function Io(e, t) {
  const n = e.get(t) || 0;
  if (n > nl) {
    const o = t.i, s = o && Jr(o.type);
    return on(
      `Maximum recursive updates exceeded${s ? ` in component <${s}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
let Be = !1;
const mn = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (tn().__VUE_HMR_RUNTIME__ = {
  createRecord: no(vr),
  rerender: no(il),
  reload: no(ll)
});
const Et = /* @__PURE__ */ new Map();
function sl(e) {
  const t = e.type.__hmrId;
  let n = Et.get(t);
  n || (vr(t, e.type), n = Et.get(t)), n.instances.add(e);
}
function rl(e) {
  Et.get(e.type.__hmrId).instances.delete(e);
}
function vr(e, t) {
  return Et.has(e) ? !1 : (Et.set(e, {
    initialDef: Sn(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Sn(e) {
  return zr(e) ? e.__vccOpts : e;
}
function il(e, t) {
  const n = Et.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, Sn(o.type).render = t), o.renderCache = [], Be = !0, o.job.flags & 8 || o.update(), Be = !1;
  }));
}
function ll(e, t) {
  const n = Et.get(e);
  if (!n) return;
  t = Sn(t), os(n.initialDef, t);
  const o = [...n.instances];
  for (let s = 0; s < o.length; s++) {
    const r = o[s], i = Sn(r.type);
    let l = mn.get(i);
    l || (i !== n.initialDef && os(i, t), mn.set(i, l = /* @__PURE__ */ new Set())), l.add(r), r.appContext.propsCache.delete(r.type), r.appContext.emitsCache.delete(r.type), r.appContext.optionsCache.delete(r.type), r.ceReload ? (l.add(r), r.ceReload(t.styles), l.delete(r)) : r.parent ? Bn(() => {
      r.job.flags & 8 || (Be = !0, r.parent.update(), Be = !1, l.delete(r));
    }) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), r.root.ce && r !== r.root && r.root.ce._removeChildStyle(i);
  }
  pr(() => {
    mn.clear();
  });
}
function os(e, t) {
  te(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function no(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (o) {
      console.error(o), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let Se, jt = [], po = !1;
function sn(e, ...t) {
  Se ? Se.emit(e, ...t) : po || jt.push({ event: e, args: t });
}
function Po(e, t) {
  var n, o;
  Se = e, Se ? (Se.enabled = !0, jt.forEach(({ event: s, args: r }) => Se.emit(s, ...r)), jt = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((o = (n = window.navigator) == null ? void 0 : n.userAgent) != null && o.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((r) => {
    Po(r, t);
  }), setTimeout(() => {
    Se || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, po = !0, jt = []);
  }, 3e3)) : (po = !0, jt = []);
}
function cl(e, t) {
  sn("app:init", e, t, {
    Fragment: be,
    Text: rn,
    Comment: xe,
    Static: En
  });
}
function ul(e) {
  sn("app:unmount", e);
}
const fl = /* @__PURE__ */ Lo(
  "component:added"
  /* COMPONENT_ADDED */
), mr = /* @__PURE__ */ Lo(
  "component:updated"
  /* COMPONENT_UPDATED */
), al = /* @__PURE__ */ Lo(
  "component:removed"
  /* COMPONENT_REMOVED */
), dl = (e) => {
  Se && typeof Se.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !Se.cleanupBuffer(e) && al(e);
};
// @__NO_SIDE_EFFECTS__
function Lo(e) {
  return (t) => {
    sn(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
const pl = /* @__PURE__ */ _r(
  "perf:start"
  /* PERFORMANCE_START */
), hl = /* @__PURE__ */ _r(
  "perf:end"
  /* PERFORMANCE_END */
);
function _r(e) {
  return (t, n, o) => {
    sn(e, t.appContext.app, t.uid, t, n, o);
  };
}
function gl(e, t, n) {
  sn(
    "component:emit",
    e.appContext.app,
    e,
    t,
    n
  );
}
let Ne = null, Er = null;
function Cn(e) {
  const t = Ne;
  return Ne = e, Er = e && e.type.__scopeId || null, t;
}
function vl(e, t = Ne, n) {
  if (!t || e._n)
    return e;
  const o = (...s) => {
    o._d && ms(-1);
    const r = Cn(t);
    let i;
    try {
      i = e(...s);
    } finally {
      Cn(r), o._d && ms(1);
    }
    return process.env.NODE_ENV !== "production" && mr(t), i;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function yr(e) {
  ii(e) && O("Do not use built-in directive ids as custom directive id: " + e);
}
function ft(e, t, n, o) {
  const s = e.dirs, r = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const l = s[i];
    r && (l.oldValue = r[i].value);
    let u = l.dir[o];
    u && ($e(), We(u, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Ae());
  }
}
const ml = Symbol("_vte"), _l = (e) => e.__isTeleport, El = Symbol("_leaveCb");
function Fo(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Fo(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Tt(e, t) {
  return $(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    te({ name: e.name }, t, { setup: e })
  ) : e;
}
function br(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const ss = /* @__PURE__ */ new WeakSet(), Tn = /* @__PURE__ */ new WeakMap();
function Kt(e, t, n, o, s = !1) {
  if (M(e)) {
    e.forEach(
      (V, X) => Kt(
        V,
        t && (M(t) ? t[X] : t),
        n,
        o,
        s
      )
    );
    return;
  }
  if (Wt(o) && !s) {
    o.shapeFlag & 512 && o.type.__asyncResolved && o.component.subTree.component && Kt(e, t, n, o.component.subTree);
    return;
  }
  const r = o.shapeFlag & 4 ? Go(o.component) : o.el, i = s ? null : r, { i: l, r: u } = e;
  if (process.env.NODE_ENV !== "production" && !l) {
    O(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const p = t && t.r, d = l.refs === K ? l.refs = {} : l.refs, a = l.setupState, g = R(a), y = a === K ? js : (V) => process.env.NODE_ENV !== "production" && (H(g, V) && !z(g[V]) && O(
    `Template ref "${V}" used on a non-ref value. It will not work in the production build.`
  ), ss.has(g[V])) ? !1 : H(g, V), D = (V) => process.env.NODE_ENV === "production" || !ss.has(V);
  if (p != null && p !== u) {
    if (rs(t), Z(p))
      d[p] = null, y(p) && (a[p] = null);
    else if (z(p)) {
      D(p) && (p.value = null);
      const V = t;
      V.k && (d[V.k] = null);
    }
  }
  if ($(u))
    Ct(u, l, 12, [i, d]);
  else {
    const V = Z(u), X = z(u);
    if (V || X) {
      const k = () => {
        if (e.f) {
          const I = V ? y(u) ? a[u] : d[u] : D(u) || !e.k ? u.value : d[e.k];
          if (s)
            M(I) && xo(I, r);
          else if (M(I))
            I.includes(r) || I.push(r);
          else if (V)
            d[u] = [r], y(u) && (a[u] = d[u]);
          else {
            const P = [r];
            D(u) && (u.value = P), e.k && (d[e.k] = P);
          }
        } else V ? (d[u] = i, y(u) && (a[u] = i)) : X ? (D(u) && (u.value = i), e.k && (d[e.k] = i)) : process.env.NODE_ENV !== "production" && O("Invalid template ref type:", u, `(${typeof u})`);
      };
      if (i) {
        const I = () => {
          k(), Tn.delete(e);
        };
        I.id = -1, Tn.set(e, I), ye(I, n);
      } else
        rs(e), k();
    } else process.env.NODE_ENV !== "production" && O("Invalid template ref type:", u, `(${typeof u})`);
  }
}
function rs(e) {
  const t = Tn.get(e);
  t && (t.flags |= 8, Tn.delete(e));
}
tn().requestIdleCallback;
tn().cancelIdleCallback;
const Wt = (e) => !!e.type.__asyncLoader, jo = (e) => e.type.__isKeepAlive;
function yl(e, t) {
  Nr(e, "a", t);
}
function bl(e, t) {
  Nr(e, "da", t);
}
function Nr(e, t, n = le) {
  const o = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if (Kn(t, o, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      jo(s.parent.vnode) && Nl(o, t, n, s), s = s.parent;
  }
}
function Nl(e, t, n, o) {
  const s = Kn(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  Or(() => {
    xo(o[t], s);
  }, n);
}
function Kn(e, t, n = le, o = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...i) => {
      $e();
      const l = ln(n), u = We(t, n, e, i);
      return l(), Ae(), u;
    });
    return o ? s.unshift(r) : s.push(r), r;
  } else if (process.env.NODE_ENV !== "production") {
    const s = dt(Ao[e].replace(/ hook$/, ""));
    O(
      `${s} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const Xe = (e) => (t, n = le) => {
  (!Xt || e === "sp") && Kn(e, (...o) => t(...o), n);
}, Ol = Xe("bm"), Ho = Xe("m"), xl = Xe(
  "bu"
), wl = Xe("u"), Dl = Xe(
  "bum"
), Or = Xe("um"), Vl = Xe(
  "sp"
), Sl = Xe("rtg"), Cl = Xe("rtc");
function Tl(e, t = le) {
  Kn("ec", e, t);
}
const Ml = Symbol.for("v-ndc");
function $l(e, t, n, o) {
  let s;
  const r = n, i = M(e);
  if (i || Z(e)) {
    const l = i && lt(e);
    let u = !1, p = !1;
    l && (u = !he(e), p = Ke(e), e = Hn(e)), s = new Array(e.length);
    for (let d = 0, a = e.length; d < a; d++)
      s[d] = t(
        u ? p ? wn(ie(e[d])) : ie(e[d]) : e[d],
        d,
        void 0,
        r
      );
  } else if (typeof e == "number") {
    process.env.NODE_ENV !== "production" && !Number.isInteger(e) && O(`The v-for range expect an integer value but got ${e}.`), s = new Array(e);
    for (let l = 0; l < e; l++)
      s[l] = t(l + 1, l, void 0, r);
  } else if (W(e))
    if (e[Symbol.iterator])
      s = Array.from(
        e,
        (l, u) => t(l, u, void 0, r)
      );
    else {
      const l = Object.keys(e);
      s = new Array(l.length);
      for (let u = 0, p = l.length; u < p; u++) {
        const d = l[u];
        s[u] = t(e[d], d, u, r);
      }
    }
  else
    s = [];
  return s;
}
const ho = (e) => e ? Yr(e) ? Go(e) : ho(e.parent) : null, mt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ te(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? Ue(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? Ue(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? Ue(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? Ue(e.refs) : e.refs,
    $parent: (e) => ho(e.parent),
    $root: (e) => ho(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Dr(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Bn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Ro.bind(e.proxy)),
    $watch: (e) => ac.bind(e)
  })
), ko = (e) => e === "_" || e === "$", oo = (e, t) => e !== K && !e.__isScriptSetup && H(e, t), xr = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: o, data: s, props: r, accessCache: i, type: l, appContext: u } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let p;
    if (t[0] !== "$") {
      const y = i[t];
      if (y !== void 0)
        switch (y) {
          case 1:
            return o[t];
          case 2:
            return s[t];
          case 4:
            return n[t];
          case 3:
            return r[t];
        }
      else {
        if (oo(o, t))
          return i[t] = 1, o[t];
        if (s !== K && H(s, t))
          return i[t] = 2, s[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (p = e.propsOptions[0]) && H(p, t)
        )
          return i[t] = 3, r[t];
        if (n !== K && H(n, t))
          return i[t] = 4, n[t];
        go && (i[t] = 0);
      }
    }
    const d = mt[t];
    let a, g;
    if (d)
      return t === "$attrs" ? (ne(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && An()) : process.env.NODE_ENV !== "production" && t === "$slots" && ne(e, "get", t), d(e);
    if (
      // css module (injected by vue-loader)
      (a = l.__cssModules) && (a = a[t])
    )
      return a;
    if (n !== K && H(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      g = u.config.globalProperties, H(g, t)
    )
      return g[t];
    process.env.NODE_ENV !== "production" && Ne && (!Z(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (s !== K && ko(t[0]) && H(s, t) ? O(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === Ne && O(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: s, ctx: r } = e;
    return oo(s, t) ? (s[t] = n, !0) : process.env.NODE_ENV !== "production" && s.__isScriptSetup && H(s, t) ? (O(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : o !== K && H(o, t) ? (o[t] = n, !0) : H(e.props, t) ? (process.env.NODE_ENV !== "production" && O(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && O(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(r, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : r[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: s, propsOptions: r, type: i }
  }, l) {
    let u, p;
    return !!(n[l] || e !== K && l[0] !== "$" && H(e, l) || oo(t, l) || (u = r[0]) && H(u, l) || H(o, l) || H(mt, l) || H(s.config.globalProperties, l) || (p = i.__cssModules) && p[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : H(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (xr.ownKeys = (e) => (O(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function Al(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys(mt).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => mt[n](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: oe
    });
  }), t;
}
function Rl(e) {
  const {
    ctx: t,
    propsOptions: [n]
  } = e;
  n && Object.keys(n).forEach((o) => {
    Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[o],
      set: oe
    });
  });
}
function Il(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(R(n)).forEach((o) => {
    if (!n.__isScriptSetup) {
      if (ko(o[0])) {
        O(
          `setup() return property ${JSON.stringify(
            o
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(t, o, {
        enumerable: !0,
        configurable: !0,
        get: () => n[o],
        set: oe
      });
    }
  });
}
function is(e) {
  return M(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function Pl() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? O(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let go = !0;
function Ll(e) {
  const t = Dr(e), n = e.proxy, o = e.ctx;
  go = !1, t.beforeCreate && ls(t.beforeCreate, e, "bc");
  const {
    // state
    data: s,
    computed: r,
    methods: i,
    watch: l,
    provide: u,
    inject: p,
    // lifecycle
    created: d,
    beforeMount: a,
    mounted: g,
    beforeUpdate: y,
    updated: D,
    activated: V,
    deactivated: X,
    beforeDestroy: k,
    beforeUnmount: I,
    destroyed: P,
    unmounted: fe,
    render: S,
    renderTracked: Q,
    renderTriggered: se,
    errorCaptured: ee,
    serverPrefetch: ce,
    // public API
    expose: Y,
    inheritAttrs: q,
    // assets
    components: Ee,
    directives: fn,
    filters: Zo
  } = t, Qe = process.env.NODE_ENV !== "production" ? Pl() : null;
  if (process.env.NODE_ENV !== "production") {
    const [F] = e.propsOptions;
    if (F)
      for (const L in F)
        Qe("Props", L);
  }
  if (p && Fl(p, o, Qe), i)
    for (const F in i) {
      const L = i[F];
      $(L) ? (process.env.NODE_ENV !== "production" ? Object.defineProperty(o, F, {
        value: L.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : o[F] = L.bind(n), process.env.NODE_ENV !== "production" && Qe("Methods", F)) : process.env.NODE_ENV !== "production" && O(
        `Method "${F}" has type "${typeof L}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (s) {
    process.env.NODE_ENV !== "production" && !$(s) && O(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const F = s.call(n, n);
    if (process.env.NODE_ENV !== "production" && wo(F) && O(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !W(F))
      process.env.NODE_ENV !== "production" && O("data() should return an object.");
    else if (e.data = $o(F), process.env.NODE_ENV !== "production")
      for (const L in F)
        Qe("Data", L), ko(L[0]) || Object.defineProperty(o, L, {
          configurable: !0,
          enumerable: !0,
          get: () => F[L],
          set: oe
        });
  }
  if (go = !0, r)
    for (const F in r) {
      const L = r[F], Re = $(L) ? L.bind(n, n) : $(L.get) ? L.get.bind(n, n) : oe;
      process.env.NODE_ENV !== "production" && Re === oe && O(`Computed property "${F}" has no getter.`);
      const Yn = !$(L) && $(L.set) ? L.set.bind(n) : process.env.NODE_ENV !== "production" ? () => {
        O(
          `Write operation failed: computed property "${F}" is readonly.`
        );
      } : oe, Mt = No({
        get: Re,
        set: Yn
      });
      Object.defineProperty(o, F, {
        enumerable: !0,
        configurable: !0,
        get: () => Mt.value,
        set: (yt) => Mt.value = yt
      }), process.env.NODE_ENV !== "production" && Qe("Computed", F);
    }
  if (l)
    for (const F in l)
      wr(l[F], o, n, F);
  if (u) {
    const F = $(u) ? u.call(n) : u;
    Reflect.ownKeys(F).forEach((L) => {
      Kl(L, F[L]);
    });
  }
  d && ls(d, e, "c");
  function ge(F, L) {
    M(L) ? L.forEach((Re) => F(Re.bind(n))) : L && F(L.bind(n));
  }
  if (ge(Ol, a), ge(Ho, g), ge(xl, y), ge(wl, D), ge(yl, V), ge(bl, X), ge(Tl, ee), ge(Cl, Q), ge(Sl, se), ge(Dl, I), ge(Or, fe), ge(Vl, ce), M(Y))
    if (Y.length) {
      const F = e.exposed || (e.exposed = {});
      Y.forEach((L) => {
        Object.defineProperty(F, L, {
          get: () => n[L],
          set: (Re) => n[L] = Re,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  S && e.render === oe && (e.render = S), q != null && (e.inheritAttrs = q), Ee && (e.components = Ee), fn && (e.directives = fn), ce && br(e);
}
function Fl(e, t, n = oe) {
  M(e) && (e = vo(e));
  for (const o in e) {
    const s = e[o];
    let r;
    W(s) ? "default" in s ? r = Gt(
      s.from || o,
      s.default,
      !0
    ) : r = Gt(s.from || o) : r = Gt(s), z(r) ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (i) => r.value = i
    }) : t[o] = r, process.env.NODE_ENV !== "production" && n("Inject", o);
  }
}
function ls(e, t, n) {
  We(
    M(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function wr(e, t, n, o) {
  let s = o.includes(".") ? Fr(n, o) : () => n[o];
  if (Z(e)) {
    const r = t[e];
    $(r) ? _t(s, r) : process.env.NODE_ENV !== "production" && O(`Invalid watch handler specified by key "${e}"`, r);
  } else if ($(e))
    _t(s, e.bind(n));
  else if (W(e))
    if (M(e))
      e.forEach((r) => wr(r, t, n, o));
    else {
      const r = $(e.handler) ? e.handler.bind(n) : t[e.handler];
      $(r) ? _t(s, r, e) : process.env.NODE_ENV !== "production" && O(`Invalid watch handler specified by key "${e.handler}"`, r);
    }
  else process.env.NODE_ENV !== "production" && O(`Invalid watch option: "${o}"`, e);
}
function Dr(e) {
  const t = e.type, { mixins: n, extends: o } = t, {
    mixins: s,
    optionsCache: r,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = r.get(t);
  let u;
  return l ? u = l : !s.length && !n && !o ? u = t : (u = {}, s.length && s.forEach(
    (p) => Mn(u, p, i, !0)
  ), Mn(u, t, i)), W(t) && r.set(t, u), u;
}
function Mn(e, t, n, o = !1) {
  const { mixins: s, extends: r } = t;
  r && Mn(e, r, n, !0), s && s.forEach(
    (i) => Mn(e, i, n, !0)
  );
  for (const i in t)
    if (o && i === "expose")
      process.env.NODE_ENV !== "production" && O(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const l = jl[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const jl = {
  data: cs,
  props: us,
  emits: us,
  // objects
  methods: Ht,
  computed: Ht,
  // lifecycle
  beforeCreate: de,
  created: de,
  beforeMount: de,
  mounted: de,
  beforeUpdate: de,
  updated: de,
  beforeDestroy: de,
  beforeUnmount: de,
  destroyed: de,
  unmounted: de,
  activated: de,
  deactivated: de,
  errorCaptured: de,
  serverPrefetch: de,
  // assets
  components: Ht,
  directives: Ht,
  // watch
  watch: kl,
  // provide / inject
  provide: cs,
  inject: Hl
};
function cs(e, t) {
  return t ? e ? function() {
    return te(
      $(e) ? e.call(this, this) : e,
      $(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Hl(e, t) {
  return Ht(vo(e), vo(t));
}
function vo(e) {
  if (M(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function de(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Ht(e, t) {
  return e ? te(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function us(e, t) {
  return e ? M(e) && M(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : te(
    /* @__PURE__ */ Object.create(null),
    is(e),
    is(t ?? {})
  ) : t;
}
function kl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = te(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = de(e[o], t[o]);
  return n;
}
function Vr() {
  return {
    app: null,
    config: {
      isNativeTag: js,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Ul = 0;
function Bl(e, t) {
  return function(o, s = null) {
    $(o) || (o = te({}, o)), s != null && !W(s) && (process.env.NODE_ENV !== "production" && O("root props passed to app.mount() must be an object."), s = null);
    const r = Vr(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let u = !1;
    const p = r.app = {
      _uid: Ul++,
      _component: o,
      _props: s,
      _container: null,
      _context: r,
      _instance: null,
      version: bs,
      get config() {
        return r.config;
      },
      set config(d) {
        process.env.NODE_ENV !== "production" && O(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(d, ...a) {
        return i.has(d) ? process.env.NODE_ENV !== "production" && O("Plugin has already been applied to target app.") : d && $(d.install) ? (i.add(d), d.install(p, ...a)) : $(d) ? (i.add(d), d(p, ...a)) : process.env.NODE_ENV !== "production" && O(
          'A plugin must either be a function or an object with an "install" function.'
        ), p;
      },
      mixin(d) {
        return r.mixins.includes(d) ? process.env.NODE_ENV !== "production" && O(
          "Mixin has already been applied to target app" + (d.name ? `: ${d.name}` : "")
        ) : r.mixins.push(d), p;
      },
      component(d, a) {
        return process.env.NODE_ENV !== "production" && bo(d, r.config), a ? (process.env.NODE_ENV !== "production" && r.components[d] && O(`Component "${d}" has already been registered in target app.`), r.components[d] = a, p) : r.components[d];
      },
      directive(d, a) {
        return process.env.NODE_ENV !== "production" && yr(d), a ? (process.env.NODE_ENV !== "production" && r.directives[d] && O(`Directive "${d}" has already been registered in target app.`), r.directives[d] = a, p) : r.directives[d];
      },
      mount(d, a, g) {
        if (u)
          process.env.NODE_ENV !== "production" && O(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          process.env.NODE_ENV !== "production" && d.__vue_app__ && O(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const y = p._ceVNode || De(o, s);
          return y.appContext = r, g === !0 ? g = "svg" : g === !1 && (g = void 0), process.env.NODE_ENV !== "production" && (r.reload = () => {
            const D = ct(y);
            D.el = null, e(D, d, g);
          }), e(y, d, g), u = !0, p._container = d, d.__vue_app__ = p, process.env.NODE_ENV !== "production" && (p._instance = y.component, cl(p, bs)), Go(y.component);
        }
      },
      onUnmount(d) {
        process.env.NODE_ENV !== "production" && typeof d != "function" && O(
          `Expected function as first argument to app.onUnmount(), but got ${typeof d}`
        ), l.push(d);
      },
      unmount() {
        u ? (We(
          l,
          p._instance,
          16
        ), e(null, p._container), process.env.NODE_ENV !== "production" && (p._instance = null, ul(p)), delete p._container.__vue_app__) : process.env.NODE_ENV !== "production" && O("Cannot unmount an app that is not mounted.");
      },
      provide(d, a) {
        return process.env.NODE_ENV !== "production" && d in r.provides && (H(r.provides, d) ? O(
          `App already provides property with key "${String(d)}". It will be overwritten with the new value.`
        ) : O(
          `App already provides property with key "${String(d)}" inherited from its parent element. It will be overwritten with the new value.`
        )), r.provides[d] = a, p;
      },
      runWithContext(d) {
        const a = Vt;
        Vt = p;
        try {
          return d();
        } finally {
          Vt = a;
        }
      }
    };
    return p;
  };
}
let Vt = null;
function Kl(e, t) {
  if (!le)
    process.env.NODE_ENV !== "production" && O("provide() can only be used inside setup().");
  else {
    let n = le.provides;
    const o = le.parent && le.parent.provides;
    o === n && (n = le.provides = Object.create(o)), n[e] = t;
  }
}
function Gt(e, t, n = !1) {
  const o = Zr();
  if (o || Vt) {
    let s = Vt ? Vt._context.provides : o ? o.parent == null || o.ce ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : void 0;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return n && $(t) ? t.call(o && o.proxy) : t;
    process.env.NODE_ENV !== "production" && O(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && O("inject() can only be used inside setup() or functional components.");
}
const Sr = {}, Cr = () => Object.create(Sr), Tr = (e) => Object.getPrototypeOf(e) === Sr;
function Wl(e, t, n, o = !1) {
  const s = {}, r = Cr();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Mr(e, t, s, r);
  for (const i in e.propsOptions[0])
    i in s || (s[i] = void 0);
  process.env.NODE_ENV !== "production" && Ar(t || {}, s, e), n ? e.props = o ? s : Ui(s) : e.type.props ? e.props = s : e.props = r, e.attrs = r;
}
function Gl(e) {
  for (; e; ) {
    if (e.type.__hmrId) return !0;
    e = e.parent;
  }
}
function Zl(e, t, n, o) {
  const {
    props: s,
    attrs: r,
    vnode: { patchFlag: i }
  } = e, l = R(s), [u] = e.propsOptions;
  let p = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(process.env.NODE_ENV !== "production" && Gl(e)) && (o || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const d = e.vnode.dynamicProps;
      for (let a = 0; a < d.length; a++) {
        let g = d[a];
        if (Wn(e.emitsOptions, g))
          continue;
        const y = t[g];
        if (u)
          if (H(r, g))
            y !== r[g] && (r[g] = y, p = !0);
          else {
            const D = Ce(g);
            s[D] = mo(
              u,
              l,
              D,
              y,
              e,
              !1
            );
          }
        else
          y !== r[g] && (r[g] = y, p = !0);
      }
    }
  } else {
    Mr(e, t, s, r) && (p = !0);
    let d;
    for (const a in l)
      (!t || // for camelCase
      !H(t, a) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((d = Je(a)) === a || !H(t, d))) && (u ? n && // for camelCase
      (n[a] !== void 0 || // for kebab-case
      n[d] !== void 0) && (s[a] = mo(
        u,
        l,
        a,
        void 0,
        e,
        !0
      )) : delete s[a]);
    if (r !== l)
      for (const a in r)
        (!t || !H(t, a)) && (delete r[a], p = !0);
  }
  p && ke(e.attrs, "set", ""), process.env.NODE_ENV !== "production" && Ar(t || {}, s, e);
}
function Mr(e, t, n, o) {
  const [s, r] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let u in t) {
      if (kt(u))
        continue;
      const p = t[u];
      let d;
      s && H(s, d = Ce(u)) ? !r || !r.includes(d) ? n[d] = p : (l || (l = {}))[d] = p : Wn(e.emitsOptions, u) || (!(u in o) || p !== o[u]) && (o[u] = p, i = !0);
    }
  if (r) {
    const u = R(n), p = l || K;
    for (let d = 0; d < r.length; d++) {
      const a = r[d];
      n[a] = mo(
        s,
        u,
        a,
        p[a],
        e,
        !H(p, a)
      );
    }
  }
  return i;
}
function mo(e, t, n, o, s, r) {
  const i = e[n];
  if (i != null) {
    const l = H(i, "default");
    if (l && o === void 0) {
      const u = i.default;
      if (i.type !== Function && !i.skipFactory && $(u)) {
        const { propsDefaults: p } = s;
        if (n in p)
          o = p[n];
        else {
          const d = ln(s);
          o = p[n] = u.call(
            null,
            t
          ), d();
        }
      } else
        o = u;
      s.ce && s.ce._setProp(n, o);
    }
    i[
      0
      /* shouldCast */
    ] && (r && !l ? o = !1 : i[
      1
      /* shouldCastTrue */
    ] && (o === "" || o === Je(n)) && (o = !0));
  }
  return o;
}
const Yl = /* @__PURE__ */ new WeakMap();
function $r(e, t, n = !1) {
  const o = n ? Yl : t.propsCache, s = o.get(e);
  if (s)
    return s;
  const r = e.props, i = {}, l = [];
  let u = !1;
  if (!$(e)) {
    const d = (a) => {
      u = !0;
      const [g, y] = $r(a, t, !0);
      te(i, g), y && l.push(...y);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!r && !u)
    return W(e) && o.set(e, wt), wt;
  if (M(r))
    for (let d = 0; d < r.length; d++) {
      process.env.NODE_ENV !== "production" && !Z(r[d]) && O("props must be strings when using array syntax.", r[d]);
      const a = Ce(r[d]);
      fs(a) && (i[a] = K);
    }
  else if (r) {
    process.env.NODE_ENV !== "production" && !W(r) && O("invalid props options", r);
    for (const d in r) {
      const a = Ce(d);
      if (fs(a)) {
        const g = r[d], y = i[a] = M(g) || $(g) ? { type: g } : te({}, g), D = y.type;
        let V = !1, X = !0;
        if (M(D))
          for (let k = 0; k < D.length; ++k) {
            const I = D[k], P = $(I) && I.name;
            if (P === "Boolean") {
              V = !0;
              break;
            } else P === "String" && (X = !1);
          }
        else
          V = $(D) && D.name === "Boolean";
        y[
          0
          /* shouldCast */
        ] = V, y[
          1
          /* shouldCastTrue */
        ] = X, (V || H(y, "default")) && l.push(a);
      }
    }
  }
  const p = [i, l];
  return W(e) && o.set(e, p), p;
}
function fs(e) {
  return e[0] !== "$" && !kt(e) ? !0 : (process.env.NODE_ENV !== "production" && O(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function ql(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function Ar(e, t, n) {
  const o = R(t), s = n.propsOptions[0], r = Object.keys(e).map((i) => Ce(i));
  for (const i in s) {
    let l = s[i];
    l != null && Jl(
      i,
      o[i],
      l,
      process.env.NODE_ENV !== "production" ? Ue(o) : o,
      !r.includes(i)
    );
  }
}
function Jl(e, t, n, o, s) {
  const { type: r, required: i, validator: l, skipCheck: u } = n;
  if (i && s) {
    O('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !i)) {
    if (r != null && r !== !0 && !u) {
      let p = !1;
      const d = M(r) ? r : [r], a = [];
      for (let g = 0; g < d.length && !p; g++) {
        const { valid: y, expectedType: D } = Xl(t, d[g]);
        a.push(D || ""), p = y;
      }
      if (!p) {
        O(Ql(e, t, a));
        return;
      }
    }
    l && !l(t, o) && O('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const zl = /* @__PURE__ */ ze(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function Xl(e, t) {
  let n;
  const o = ql(t);
  if (o === "null")
    n = e === null;
  else if (zl(o)) {
    const s = typeof e;
    n = s === o.toLowerCase(), !n && s === "object" && (n = e instanceof t);
  } else o === "Object" ? n = W(e) : o === "Array" ? n = M(e) : n = e instanceof t;
  return {
    valid: n,
    expectedType: o
  };
}
function Ql(e, t, n) {
  if (n.length === 0)
    return `Prop type [] for prop "${e}" won't match anything. Did you mean to use type Array instead?`;
  let o = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(Fn).join(" | ")}`;
  const s = n[0], r = Do(t), i = as(t, s), l = as(t, r);
  return n.length === 1 && ds(s) && !ec(s, r) && (o += ` with value ${i}`), o += `, got ${r} `, ds(r) && (o += `with value ${l}.`), o;
}
function as(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function ds(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function ec(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const Uo = (e) => e === "_" || e === "_ctx" || e === "$stable", Bo = (e) => M(e) ? e.map(Ve) : [Ve(e)], tc = (e, t, n) => {
  if (t._n)
    return t;
  const o = vl((...s) => (process.env.NODE_ENV !== "production" && le && !(n === null && Ne) && !(n && n.root !== le.root) && O(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), Bo(t(...s))), n);
  return o._c = !1, o;
}, Rr = (e, t, n) => {
  const o = e._ctx;
  for (const s in e) {
    if (Uo(s)) continue;
    const r = e[s];
    if ($(r))
      t[s] = tc(s, r, o);
    else if (r != null) {
      process.env.NODE_ENV !== "production" && O(
        `Non-function value encountered for slot "${s}". Prefer function slots for better performance.`
      );
      const i = Bo(r);
      t[s] = () => i;
    }
  }
}, Ir = (e, t) => {
  process.env.NODE_ENV !== "production" && !jo(e.vnode) && O(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = Bo(t);
  e.slots.default = () => n;
}, _o = (e, t, n) => {
  for (const o in t)
    (n || !Uo(o)) && (e[o] = t[o]);
}, nc = (e, t, n) => {
  const o = e.slots = Cr();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (_o(o, t, n), n && On(o, "_", s, !0)) : Rr(t, o);
  } else t && Ir(e, t);
}, oc = (e, t, n) => {
  const { vnode: o, slots: s } = e;
  let r = !0, i = K;
  if (o.shapeFlag & 32) {
    const l = t._;
    l ? process.env.NODE_ENV !== "production" && Be ? (_o(s, t, n), ke(e, "set", "$slots")) : n && l === 1 ? r = !1 : _o(s, t, n) : (r = !t.$stable, Rr(t, s)), i = t;
  } else t && (Ir(e, t), i = { default: 1 });
  if (r)
    for (const l in s)
      !Uo(l) && i[l] == null && delete s[l];
};
let Lt, Ye;
function Nt(e, t) {
  e.appContext.config.performance && $n() && Ye.mark(`vue-${t}-${e.uid}`), process.env.NODE_ENV !== "production" && pl(e, t, $n() ? Ye.now() : Date.now());
}
function Ot(e, t) {
  if (e.appContext.config.performance && $n()) {
    const n = `vue-${t}-${e.uid}`, o = n + ":end", s = `<${Zn(e, e.type)}> ${t}`;
    Ye.mark(o), Ye.measure(s, n, o), Ye.clearMeasures(s), Ye.clearMarks(n), Ye.clearMarks(o);
  }
  process.env.NODE_ENV !== "production" && hl(e, t, $n() ? Ye.now() : Date.now());
}
function $n() {
  return Lt !== void 0 || (typeof window < "u" && window.performance ? (Lt = !0, Ye = window.performance) : Lt = !1), Lt;
}
function sc() {
  const e = [];
  if (process.env.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(
      `Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const ye = Ec;
function rc(e) {
  return ic(e);
}
function ic(e, t) {
  sc();
  const n = tn();
  n.__VUE__ = !0, process.env.NODE_ENV !== "production" && Po(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const {
    insert: o,
    remove: s,
    patchProp: r,
    createElement: i,
    createText: l,
    createComment: u,
    setText: p,
    setElementText: d,
    parentNode: a,
    nextSibling: g,
    setScopeId: y = oe,
    insertStaticContent: D
  } = e, V = (c, f, h, _ = null, v = null, m = null, x = void 0, N = null, b = process.env.NODE_ENV !== "production" && Be ? !1 : !!f.dynamicChildren) => {
    if (c === f)
      return;
    c && !Ft(c, f) && (_ = an(c), et(c, v, m, !0), c = null), f.patchFlag === -2 && (b = !1, f.dynamicChildren = null);
    const { type: E, ref: T, shapeFlag: w } = f;
    switch (E) {
      case rn:
        X(c, f, h, _);
        break;
      case xe:
        k(c, f, h, _);
        break;
      case En:
        c == null ? I(f, h, _, x) : process.env.NODE_ENV !== "production" && P(c, f, h, x);
        break;
      case be:
        fn(
          c,
          f,
          h,
          _,
          v,
          m,
          x,
          N,
          b
        );
        break;
      default:
        w & 1 ? Q(
          c,
          f,
          h,
          _,
          v,
          m,
          x,
          N,
          b
        ) : w & 6 ? Zo(
          c,
          f,
          h,
          _,
          v,
          m,
          x,
          N,
          b
        ) : w & 64 || w & 128 ? E.process(
          c,
          f,
          h,
          _,
          v,
          m,
          x,
          N,
          b,
          At
        ) : process.env.NODE_ENV !== "production" && O("Invalid VNode type:", E, `(${typeof E})`);
    }
    T != null && v ? Kt(T, c && c.ref, m, f || c, !f) : T == null && c && c.ref != null && Kt(c.ref, null, m, c, !0);
  }, X = (c, f, h, _) => {
    if (c == null)
      o(
        f.el = l(f.children),
        h,
        _
      );
    else {
      const v = f.el = c.el;
      f.children !== c.children && p(v, f.children);
    }
  }, k = (c, f, h, _) => {
    c == null ? o(
      f.el = u(f.children || ""),
      h,
      _
    ) : f.el = c.el;
  }, I = (c, f, h, _) => {
    [c.el, c.anchor] = D(
      c.children,
      f,
      h,
      _,
      c.el,
      c.anchor
    );
  }, P = (c, f, h, _) => {
    if (f.children !== c.children) {
      const v = g(c.anchor);
      S(c), [f.el, f.anchor] = D(
        f.children,
        h,
        v,
        _
      );
    } else
      f.el = c.el, f.anchor = c.anchor;
  }, fe = ({ el: c, anchor: f }, h, _) => {
    let v;
    for (; c && c !== f; )
      v = g(c), o(c, h, _), c = v;
    o(f, h, _);
  }, S = ({ el: c, anchor: f }) => {
    let h;
    for (; c && c !== f; )
      h = g(c), s(c), c = h;
    s(f);
  }, Q = (c, f, h, _, v, m, x, N, b) => {
    f.type === "svg" ? x = "svg" : f.type === "math" && (x = "mathml"), c == null ? se(
      f,
      h,
      _,
      v,
      m,
      x,
      N,
      b
    ) : Y(
      c,
      f,
      v,
      m,
      x,
      N,
      b
    );
  }, se = (c, f, h, _, v, m, x, N) => {
    let b, E;
    const { props: T, shapeFlag: w, transition: C, dirs: A } = c;
    if (b = c.el = i(
      c.type,
      m,
      T && T.is,
      T
    ), w & 8 ? d(b, c.children) : w & 16 && ce(
      c.children,
      b,
      null,
      _,
      v,
      so(c, m),
      x,
      N
    ), A && ft(c, null, _, "created"), ee(b, c, c.scopeId, x, _), T) {
      for (const G in T)
        G !== "value" && !kt(G) && r(b, G, null, T[G], m, _);
      "value" in T && r(b, "value", null, T.value, m), (E = T.onVnodeBeforeMount) && Fe(E, _, c);
    }
    process.env.NODE_ENV !== "production" && (On(b, "__vnode", c, !0), On(b, "__vueParentComponent", _, !0)), A && ft(c, null, _, "beforeMount");
    const j = lc(v, C);
    j && C.beforeEnter(b), o(b, f, h), ((E = T && T.onVnodeMounted) || j || A) && ye(() => {
      E && Fe(E, _, c), j && C.enter(b), A && ft(c, null, _, "mounted");
    }, v);
  }, ee = (c, f, h, _, v) => {
    if (h && y(c, h), _)
      for (let m = 0; m < _.length; m++)
        y(c, _[m]);
    if (v) {
      let m = v.subTree;
      if (process.env.NODE_ENV !== "production" && m.patchFlag > 0 && m.patchFlag & 2048 && (m = Ko(m.children) || m), f === m || kr(m.type) && (m.ssContent === f || m.ssFallback === f)) {
        const x = v.vnode;
        ee(
          c,
          x,
          x.scopeId,
          x.slotScopeIds,
          v.parent
        );
      }
    }
  }, ce = (c, f, h, _, v, m, x, N, b = 0) => {
    for (let E = b; E < c.length; E++) {
      const T = c[E] = N ? ot(c[E]) : Ve(c[E]);
      V(
        null,
        T,
        f,
        h,
        _,
        v,
        m,
        x,
        N
      );
    }
  }, Y = (c, f, h, _, v, m, x) => {
    const N = f.el = c.el;
    process.env.NODE_ENV !== "production" && (N.__vnode = f);
    let { patchFlag: b, dynamicChildren: E, dirs: T } = f;
    b |= c.patchFlag & 16;
    const w = c.props || K, C = f.props || K;
    let A;
    if (h && at(h, !1), (A = C.onVnodeBeforeUpdate) && Fe(A, h, f, c), T && ft(f, c, h, "beforeUpdate"), h && at(h, !0), process.env.NODE_ENV !== "production" && Be && (b = 0, x = !1, E = null), (w.innerHTML && C.innerHTML == null || w.textContent && C.textContent == null) && d(N, ""), E ? (q(
      c.dynamicChildren,
      E,
      N,
      h,
      _,
      so(f, v),
      m
    ), process.env.NODE_ENV !== "production" && _n(c, f)) : x || Re(
      c,
      f,
      N,
      null,
      h,
      _,
      so(f, v),
      m,
      !1
    ), b > 0) {
      if (b & 16)
        Ee(N, w, C, h, v);
      else if (b & 2 && w.class !== C.class && r(N, "class", null, C.class, v), b & 4 && r(N, "style", w.style, C.style, v), b & 8) {
        const j = f.dynamicProps;
        for (let G = 0; G < j.length; G++) {
          const B = j[G], ve = w[B], me = C[B];
          (me !== ve || B === "value") && r(N, B, ve, me, v, h);
        }
      }
      b & 1 && c.children !== f.children && d(N, f.children);
    } else !x && E == null && Ee(N, w, C, h, v);
    ((A = C.onVnodeUpdated) || T) && ye(() => {
      A && Fe(A, h, f, c), T && ft(f, c, h, "updated");
    }, _);
  }, q = (c, f, h, _, v, m, x) => {
    for (let N = 0; N < f.length; N++) {
      const b = c[N], E = f[N], T = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        b.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (b.type === be || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Ft(b, E) || // - In the case of a component, it could contain anything.
        b.shapeFlag & 198) ? a(b.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          h
        )
      );
      V(
        b,
        E,
        T,
        null,
        _,
        v,
        m,
        x,
        !0
      );
    }
  }, Ee = (c, f, h, _, v) => {
    if (f !== h) {
      if (f !== K)
        for (const m in f)
          !kt(m) && !(m in h) && r(
            c,
            m,
            f[m],
            null,
            v,
            _
          );
      for (const m in h) {
        if (kt(m)) continue;
        const x = h[m], N = f[m];
        x !== N && m !== "value" && r(c, m, N, x, v, _);
      }
      "value" in h && r(c, "value", f.value, h.value, v);
    }
  }, fn = (c, f, h, _, v, m, x, N, b) => {
    const E = f.el = c ? c.el : l(""), T = f.anchor = c ? c.anchor : l("");
    let { patchFlag: w, dynamicChildren: C, slotScopeIds: A } = f;
    process.env.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (Be || w & 2048) && (w = 0, b = !1, C = null), A && (N = N ? N.concat(A) : A), c == null ? (o(E, h, _), o(T, h, _), ce(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      f.children || [],
      h,
      T,
      v,
      m,
      x,
      N,
      b
    )) : w > 0 && w & 64 && C && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren ? (q(
      c.dynamicChildren,
      C,
      h,
      v,
      m,
      x,
      N
    ), process.env.NODE_ENV !== "production" ? _n(c, f) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (f.key != null || v && f === v.subTree) && _n(
        c,
        f,
        !0
        /* shallow */
      )
    )) : Re(
      c,
      f,
      h,
      T,
      v,
      m,
      x,
      N,
      b
    );
  }, Zo = (c, f, h, _, v, m, x, N, b) => {
    f.slotScopeIds = N, c == null ? f.shapeFlag & 512 ? v.ctx.activate(
      f,
      h,
      _,
      x,
      b
    ) : Qe(
      f,
      h,
      _,
      v,
      m,
      x,
      b
    ) : ge(c, f, b);
  }, Qe = (c, f, h, _, v, m, x) => {
    const N = c.component = Dc(
      c,
      _,
      v
    );
    if (process.env.NODE_ENV !== "production" && N.type.__hmrId && sl(N), process.env.NODE_ENV !== "production" && (gn(c), Nt(N, "mount")), jo(c) && (N.ctx.renderer = At), process.env.NODE_ENV !== "production" && Nt(N, "init"), Sc(N, !1, x), process.env.NODE_ENV !== "production" && Ot(N, "init"), process.env.NODE_ENV !== "production" && Be && (c.el = null), N.asyncDep) {
      if (v && v.registerDep(N, F, x), !c.el) {
        const b = N.subTree = De(xe);
        k(null, b, f, h), c.placeholder = b.el;
      }
    } else
      F(
        N,
        c,
        f,
        h,
        v,
        m,
        x
      );
    process.env.NODE_ENV !== "production" && (vn(), Ot(N, "mount"));
  }, ge = (c, f, h) => {
    const _ = f.component = c.component;
    if (mc(c, f, h))
      if (_.asyncDep && !_.asyncResolved) {
        process.env.NODE_ENV !== "production" && gn(f), L(_, f, h), process.env.NODE_ENV !== "production" && vn();
        return;
      } else
        _.next = f, _.update();
    else
      f.el = c.el, _.vnode = f;
  }, F = (c, f, h, _, v, m, x) => {
    const N = () => {
      if (c.isMounted) {
        let { next: w, bu: C, u: A, parent: j, vnode: G } = c;
        {
          const Pe = Pr(c);
          if (Pe) {
            w && (w.el = G.el, L(c, w, x)), Pe.asyncDep.then(() => {
              c.isUnmounted || N();
            });
            return;
          }
        }
        let B = w, ve;
        process.env.NODE_ENV !== "production" && gn(w || c.vnode), at(c, !1), w ? (w.el = G.el, L(c, w, x)) : w = G, C && It(C), (ve = w.props && w.props.onVnodeBeforeUpdate) && Fe(ve, j, w, G), at(c, !0), process.env.NODE_ENV !== "production" && Nt(c, "render");
        const me = hs(c);
        process.env.NODE_ENV !== "production" && Ot(c, "render");
        const Ie = c.subTree;
        c.subTree = me, process.env.NODE_ENV !== "production" && Nt(c, "patch"), V(
          Ie,
          me,
          // parent may have changed if it's in a teleport
          a(Ie.el),
          // anchor may have changed if it's in a fragment
          an(Ie),
          c,
          v,
          m
        ), process.env.NODE_ENV !== "production" && Ot(c, "patch"), w.el = me.el, B === null && _c(c, me.el), A && ye(A, v), (ve = w.props && w.props.onVnodeUpdated) && ye(
          () => Fe(ve, j, w, G),
          v
        ), process.env.NODE_ENV !== "production" && mr(c), process.env.NODE_ENV !== "production" && vn();
      } else {
        let w;
        const { el: C, props: A } = f, { bm: j, m: G, parent: B, root: ve, type: me } = c, Ie = Wt(f);
        at(c, !1), j && It(j), !Ie && (w = A && A.onVnodeBeforeMount) && Fe(w, B, f), at(c, !0);
        {
          ve.ce && // @ts-expect-error _def is private
          ve.ce._def.shadowRoot !== !1 && ve.ce._injectChildStyle(me), process.env.NODE_ENV !== "production" && Nt(c, "render");
          const Pe = c.subTree = hs(c);
          process.env.NODE_ENV !== "production" && Ot(c, "render"), process.env.NODE_ENV !== "production" && Nt(c, "patch"), V(
            null,
            Pe,
            h,
            _,
            c,
            v,
            m
          ), process.env.NODE_ENV !== "production" && Ot(c, "patch"), f.el = Pe.el;
        }
        if (G && ye(G, v), !Ie && (w = A && A.onVnodeMounted)) {
          const Pe = f;
          ye(
            () => Fe(w, B, Pe),
            v
          );
        }
        (f.shapeFlag & 256 || B && Wt(B.vnode) && B.vnode.shapeFlag & 256) && c.a && ye(c.a, v), c.isMounted = !0, process.env.NODE_ENV !== "production" && fl(c), f = h = _ = null;
      }
    };
    c.scope.on();
    const b = c.effect = new Zs(N);
    c.scope.off();
    const E = c.update = b.run.bind(b), T = c.job = b.runIfDirty.bind(b);
    T.i = c, T.id = c.uid, b.scheduler = () => Bn(T), at(c, !0), process.env.NODE_ENV !== "production" && (b.onTrack = c.rtc ? (w) => It(c.rtc, w) : void 0, b.onTrigger = c.rtg ? (w) => It(c.rtg, w) : void 0), E();
  }, L = (c, f, h) => {
    f.component = c;
    const _ = c.vnode.props;
    c.vnode = f, c.next = null, Zl(c, f.props, _, h), oc(c, f.children, h), $e(), ns(c), Ae();
  }, Re = (c, f, h, _, v, m, x, N, b = !1) => {
    const E = c && c.children, T = c ? c.shapeFlag : 0, w = f.children, { patchFlag: C, shapeFlag: A } = f;
    if (C > 0) {
      if (C & 128) {
        Mt(
          E,
          w,
          h,
          _,
          v,
          m,
          x,
          N,
          b
        );
        return;
      } else if (C & 256) {
        Yn(
          E,
          w,
          h,
          _,
          v,
          m,
          x,
          N,
          b
        );
        return;
      }
    }
    A & 8 ? (T & 16 && $t(E, v, m), w !== E && d(h, w)) : T & 16 ? A & 16 ? Mt(
      E,
      w,
      h,
      _,
      v,
      m,
      x,
      N,
      b
    ) : $t(E, v, m, !0) : (T & 8 && d(h, ""), A & 16 && ce(
      w,
      h,
      _,
      v,
      m,
      x,
      N,
      b
    ));
  }, Yn = (c, f, h, _, v, m, x, N, b) => {
    c = c || wt, f = f || wt;
    const E = c.length, T = f.length, w = Math.min(E, T);
    let C;
    for (C = 0; C < w; C++) {
      const A = f[C] = b ? ot(f[C]) : Ve(f[C]);
      V(
        c[C],
        A,
        h,
        null,
        v,
        m,
        x,
        N,
        b
      );
    }
    E > T ? $t(
      c,
      v,
      m,
      !0,
      !1,
      w
    ) : ce(
      f,
      h,
      _,
      v,
      m,
      x,
      N,
      b,
      w
    );
  }, Mt = (c, f, h, _, v, m, x, N, b) => {
    let E = 0;
    const T = f.length;
    let w = c.length - 1, C = T - 1;
    for (; E <= w && E <= C; ) {
      const A = c[E], j = f[E] = b ? ot(f[E]) : Ve(f[E]);
      if (Ft(A, j))
        V(
          A,
          j,
          h,
          null,
          v,
          m,
          x,
          N,
          b
        );
      else
        break;
      E++;
    }
    for (; E <= w && E <= C; ) {
      const A = c[w], j = f[C] = b ? ot(f[C]) : Ve(f[C]);
      if (Ft(A, j))
        V(
          A,
          j,
          h,
          null,
          v,
          m,
          x,
          N,
          b
        );
      else
        break;
      w--, C--;
    }
    if (E > w) {
      if (E <= C) {
        const A = C + 1, j = A < T ? f[A].el : _;
        for (; E <= C; )
          V(
            null,
            f[E] = b ? ot(f[E]) : Ve(f[E]),
            h,
            j,
            v,
            m,
            x,
            N,
            b
          ), E++;
      }
    } else if (E > C)
      for (; E <= w; )
        et(c[E], v, m, !0), E++;
    else {
      const A = E, j = E, G = /* @__PURE__ */ new Map();
      for (E = j; E <= C; E++) {
        const ae = f[E] = b ? ot(f[E]) : Ve(f[E]);
        ae.key != null && (process.env.NODE_ENV !== "production" && G.has(ae.key) && O(
          "Duplicate keys found during update:",
          JSON.stringify(ae.key),
          "Make sure keys are unique."
        ), G.set(ae.key, E));
      }
      let B, ve = 0;
      const me = C - j + 1;
      let Ie = !1, Pe = 0;
      const Rt = new Array(me);
      for (E = 0; E < me; E++) Rt[E] = 0;
      for (E = A; E <= w; E++) {
        const ae = c[E];
        if (ve >= me) {
          et(ae, v, m, !0);
          continue;
        }
        let Le;
        if (ae.key != null)
          Le = G.get(ae.key);
        else
          for (B = j; B <= C; B++)
            if (Rt[B - j] === 0 && Ft(ae, f[B])) {
              Le = B;
              break;
            }
        Le === void 0 ? et(ae, v, m, !0) : (Rt[Le - j] = E + 1, Le >= Pe ? Pe = Le : Ie = !0, V(
          ae,
          f[Le],
          h,
          null,
          v,
          m,
          x,
          N,
          b
        ), ve++);
      }
      const qo = Ie ? cc(Rt) : wt;
      for (B = qo.length - 1, E = me - 1; E >= 0; E--) {
        const ae = j + E, Le = f[ae], Jo = f[ae + 1], zo = ae + 1 < T ? (
          // #13559, fallback to el placeholder for unresolved async component
          Jo.el || Jo.placeholder
        ) : _;
        Rt[E] === 0 ? V(
          null,
          Le,
          h,
          zo,
          v,
          m,
          x,
          N,
          b
        ) : Ie && (B < 0 || E !== qo[B] ? yt(Le, h, zo, 2) : B--);
      }
    }
  }, yt = (c, f, h, _, v = null) => {
    const { el: m, type: x, transition: N, children: b, shapeFlag: E } = c;
    if (E & 6) {
      yt(c.component.subTree, f, h, _);
      return;
    }
    if (E & 128) {
      c.suspense.move(f, h, _);
      return;
    }
    if (E & 64) {
      x.move(c, f, h, At);
      return;
    }
    if (x === be) {
      o(m, f, h);
      for (let w = 0; w < b.length; w++)
        yt(b[w], f, h, _);
      o(c.anchor, f, h);
      return;
    }
    if (x === En) {
      fe(c, f, h);
      return;
    }
    if (_ !== 2 && E & 1 && N)
      if (_ === 0)
        N.beforeEnter(m), o(m, f, h), ye(() => N.enter(m), v);
      else {
        const { leave: w, delayLeave: C, afterLeave: A } = N, j = () => {
          c.ctx.isUnmounted ? s(m) : o(m, f, h);
        }, G = () => {
          m._isLeaving && m[El](
            !0
            /* cancelled */
          ), w(m, () => {
            j(), A && A();
          });
        };
        C ? C(m, j, G) : G();
      }
    else
      o(m, f, h);
  }, et = (c, f, h, _ = !1, v = !1) => {
    const {
      type: m,
      props: x,
      ref: N,
      children: b,
      dynamicChildren: E,
      shapeFlag: T,
      patchFlag: w,
      dirs: C,
      cacheIndex: A
    } = c;
    if (w === -2 && (v = !1), N != null && ($e(), Kt(N, null, h, c, !0), Ae()), A != null && (f.renderCache[A] = void 0), T & 256) {
      f.ctx.deactivate(c);
      return;
    }
    const j = T & 1 && C, G = !Wt(c);
    let B;
    if (G && (B = x && x.onVnodeBeforeUnmount) && Fe(B, f, c), T & 6)
      si(c.component, h, _);
    else {
      if (T & 128) {
        c.suspense.unmount(h, _);
        return;
      }
      j && ft(c, null, f, "beforeUnmount"), T & 64 ? c.type.remove(
        c,
        f,
        h,
        At,
        _
      ) : E && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !E.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (m !== be || w > 0 && w & 64) ? $t(
        E,
        f,
        h,
        !1,
        !0
      ) : (m === be && w & 384 || !v && T & 16) && $t(b, f, h), _ && qn(c);
    }
    (G && (B = x && x.onVnodeUnmounted) || j) && ye(() => {
      B && Fe(B, f, c), j && ft(c, null, f, "unmounted");
    }, h);
  }, qn = (c) => {
    const { type: f, el: h, anchor: _, transition: v } = c;
    if (f === be) {
      process.env.NODE_ENV !== "production" && c.patchFlag > 0 && c.patchFlag & 2048 && v && !v.persisted ? c.children.forEach((x) => {
        x.type === xe ? s(x.el) : qn(x);
      }) : oi(h, _);
      return;
    }
    if (f === En) {
      S(c);
      return;
    }
    const m = () => {
      s(h), v && !v.persisted && v.afterLeave && v.afterLeave();
    };
    if (c.shapeFlag & 1 && v && !v.persisted) {
      const { leave: x, delayLeave: N } = v, b = () => x(h, m);
      N ? N(c.el, m, b) : b();
    } else
      m();
  }, oi = (c, f) => {
    let h;
    for (; c !== f; )
      h = g(c), s(c), c = h;
    s(f);
  }, si = (c, f, h) => {
    process.env.NODE_ENV !== "production" && c.type.__hmrId && rl(c);
    const { bum: _, scope: v, job: m, subTree: x, um: N, m: b, a: E } = c;
    ps(b), ps(E), _ && It(_), v.stop(), m && (m.flags |= 8, et(x, c, f, h)), N && ye(N, f), ye(() => {
      c.isUnmounted = !0;
    }, f), process.env.NODE_ENV !== "production" && dl(c);
  }, $t = (c, f, h, _ = !1, v = !1, m = 0) => {
    for (let x = m; x < c.length; x++)
      et(c[x], f, h, _, v);
  }, an = (c) => {
    if (c.shapeFlag & 6)
      return an(c.component.subTree);
    if (c.shapeFlag & 128)
      return c.suspense.next();
    const f = g(c.anchor || c.el), h = f && f[ml];
    return h ? g(h) : f;
  };
  let Jn = !1;
  const Yo = (c, f, h) => {
    c == null ? f._vnode && et(f._vnode, null, null, !0) : V(
      f._vnode || null,
      c,
      f,
      null,
      null,
      null,
      h
    ), f._vnode = c, Jn || (Jn = !0, ns(), hr(), Jn = !1);
  }, At = {
    p: V,
    um: et,
    m: yt,
    r: qn,
    mt: Qe,
    mc: ce,
    pc: Re,
    pbc: q,
    n: an,
    o: e
  };
  return {
    render: Yo,
    hydrate: void 0,
    createApp: Bl(Yo)
  };
}
function so({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function at({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function lc(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function _n(e, t, n = !1) {
  const o = e.children, s = t.children;
  if (M(o) && M(s))
    for (let r = 0; r < o.length; r++) {
      const i = o[r];
      let l = s[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = s[r] = ot(s[r]), l.el = i.el), !n && l.patchFlag !== -2 && _n(i, l)), l.type === rn && // avoid cached text nodes retaining detached dom nodes
      l.patchFlag !== -1 && (l.el = i.el), l.type === xe && !l.el && (l.el = i.el), process.env.NODE_ENV !== "production" && l.el && (l.el.__vnode = l);
    }
}
function cc(e) {
  const t = e.slice(), n = [0];
  let o, s, r, i, l;
  const u = e.length;
  for (o = 0; o < u; o++) {
    const p = e[o];
    if (p !== 0) {
      if (s = n[n.length - 1], e[s] < p) {
        t[o] = s, n.push(o);
        continue;
      }
      for (r = 0, i = n.length - 1; r < i; )
        l = r + i >> 1, e[n[l]] < p ? r = l + 1 : i = l;
      p < e[n[r]] && (r > 0 && (t[o] = n[r - 1]), n[r] = o);
    }
  }
  for (r = n.length, i = n[r - 1]; r-- > 0; )
    n[r] = i, i = t[i];
  return n;
}
function Pr(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Pr(t);
}
function ps(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const uc = Symbol.for("v-scx"), fc = () => {
  {
    const e = Gt(uc);
    return e || process.env.NODE_ENV !== "production" && O(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function _t(e, t, n) {
  return process.env.NODE_ENV !== "production" && !$(t) && O(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), Lr(e, t, n);
}
function Lr(e, t, n = K) {
  const { immediate: o, deep: s, flush: r, once: i } = n;
  process.env.NODE_ENV !== "production" && !t && (o !== void 0 && O(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), s !== void 0 && O(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), i !== void 0 && O(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const l = te({}, n);
  process.env.NODE_ENV !== "production" && (l.onWarn = O);
  const u = t && o || !t && r !== "post";
  let p;
  if (Xt) {
    if (r === "sync") {
      const y = fc();
      p = y.__watcherHandles || (y.__watcherHandles = []);
    } else if (!u) {
      const y = () => {
      };
      return y.stop = oe, y.resume = oe, y.pause = oe, y;
    }
  }
  const d = le;
  l.call = (y, D, V) => We(y, d, D, V);
  let a = !1;
  r === "post" ? l.scheduler = (y) => {
    ye(y, d && d.suspense);
  } : r !== "sync" && (a = !0, l.scheduler = (y, D) => {
    D ? y() : Bn(y);
  }), l.augmentJob = (y) => {
    t && (y.flags |= 4), a && (y.flags |= 2, d && (y.id = d.uid, y.i = d));
  };
  const g = Ji(e, t, l);
  return Xt && (p ? p.push(g) : u && g()), g;
}
function ac(e, t, n) {
  const o = this.proxy, s = Z(e) ? e.includes(".") ? Fr(o, e) : () => o[e] : e.bind(o, o);
  let r;
  $(t) ? r = t : (r = t.handler, n = t);
  const i = ln(this), l = Lr(s, r.bind(o), n);
  return i(), l;
}
function Fr(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let s = 0; s < n.length && o; s++)
      o = o[n[s]];
    return o;
  };
}
const dc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ce(t)}Modifiers`] || e[`${Je(t)}Modifiers`];
function pc(e, t, ...n) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || K;
  if (process.env.NODE_ENV !== "production") {
    const {
      emitsOptions: d,
      propsOptions: [a]
    } = e;
    if (d)
      if (!(t in d))
        (!a || !(dt(Ce(t)) in a)) && O(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${dt(Ce(t))}" prop.`
        );
      else {
        const g = d[t];
        $(g) && (g(...n) || O(
          `Invalid event arguments: event validation failed for event "${t}".`
        ));
      }
  }
  let s = n;
  const r = t.startsWith("update:"), i = r && dc(o, t.slice(7));
  if (i && (i.trim && (s = n.map((d) => Z(d) ? d.trim() : d)), i.number && (s = n.map(ui))), process.env.NODE_ENV !== "production" && gl(e, t, s), process.env.NODE_ENV !== "production") {
    const d = t.toLowerCase();
    d !== t && o[dt(d)] && O(
      `Event "${d}" is emitted in component ${Zn(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${Je(
        t
      )}" instead of "${t}".`
    );
  }
  let l, u = o[l = dt(t)] || // also try camelCase event handler (#2249)
  o[l = dt(Ce(t))];
  !u && r && (u = o[l = dt(Je(t))]), u && We(
    u,
    e,
    6,
    s
  );
  const p = o[l + "Once"];
  if (p) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, We(
      p,
      e,
      6,
      s
    );
  }
}
const hc = /* @__PURE__ */ new WeakMap();
function jr(e, t, n = !1) {
  const o = n ? hc : t.emitsCache, s = o.get(e);
  if (s !== void 0)
    return s;
  const r = e.emits;
  let i = {}, l = !1;
  if (!$(e)) {
    const u = (p) => {
      const d = jr(p, t, !0);
      d && (l = !0, te(i, d));
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !r && !l ? (W(e) && o.set(e, null), null) : (M(r) ? r.forEach((u) => i[u] = null) : te(i, r), W(e) && o.set(e, i), i);
}
function Wn(e, t) {
  return !e || !en(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), H(e, t[0].toLowerCase() + t.slice(1)) || H(e, Je(t)) || H(e, t));
}
let Eo = !1;
function An() {
  Eo = !0;
}
function hs(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: s,
    propsOptions: [r],
    slots: i,
    attrs: l,
    emit: u,
    render: p,
    renderCache: d,
    props: a,
    data: g,
    setupState: y,
    ctx: D,
    inheritAttrs: V
  } = e, X = Cn(e);
  let k, I;
  process.env.NODE_ENV !== "production" && (Eo = !1);
  try {
    if (n.shapeFlag & 4) {
      const S = s || o, Q = process.env.NODE_ENV !== "production" && y.__isScriptSetup ? new Proxy(S, {
        get(se, ee, ce) {
          return O(
            `Property '${String(
              ee
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(se, ee, ce);
        }
      }) : S;
      k = Ve(
        p.call(
          Q,
          S,
          d,
          process.env.NODE_ENV !== "production" ? Ue(a) : a,
          y,
          g,
          D
        )
      ), I = l;
    } else {
      const S = t;
      process.env.NODE_ENV !== "production" && l === a && An(), k = Ve(
        S.length > 1 ? S(
          process.env.NODE_ENV !== "production" ? Ue(a) : a,
          process.env.NODE_ENV !== "production" ? {
            get attrs() {
              return An(), Ue(l);
            },
            slots: i,
            emit: u
          } : { attrs: l, slots: i, emit: u }
        ) : S(
          process.env.NODE_ENV !== "production" ? Ue(a) : a,
          null
        )
      ), I = t.props ? l : gc(l);
    }
  } catch (S) {
    Zt.length = 0, on(S, e, 1), k = De(xe);
  }
  let P = k, fe;
  if (process.env.NODE_ENV !== "production" && k.patchFlag > 0 && k.patchFlag & 2048 && ([P, fe] = Hr(k)), I && V !== !1) {
    const S = Object.keys(I), { shapeFlag: Q } = P;
    if (S.length) {
      if (Q & 7)
        r && S.some(Nn) && (I = vc(
          I,
          r
        )), P = ct(P, I, !1, !0);
      else if (process.env.NODE_ENV !== "production" && !Eo && P.type !== xe) {
        const se = Object.keys(l), ee = [], ce = [];
        for (let Y = 0, q = se.length; Y < q; Y++) {
          const Ee = se[Y];
          en(Ee) ? Nn(Ee) || ee.push(Ee[2].toLowerCase() + Ee.slice(3)) : ce.push(Ee);
        }
        ce.length && O(
          `Extraneous non-props attributes (${ce.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`
        ), ee.length && O(
          `Extraneous non-emits event listeners (${ee.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return n.dirs && (process.env.NODE_ENV !== "production" && !gs(P) && O(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), P = ct(P, null, !1, !0), P.dirs = P.dirs ? P.dirs.concat(n.dirs) : n.dirs), n.transition && (process.env.NODE_ENV !== "production" && !gs(P) && O(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), Fo(P, n.transition)), process.env.NODE_ENV !== "production" && fe ? fe(P) : k = P, Cn(X), k;
}
const Hr = (e) => {
  const t = e.children, n = e.dynamicChildren, o = Ko(t, !1);
  if (o) {
    if (process.env.NODE_ENV !== "production" && o.patchFlag > 0 && o.patchFlag & 2048)
      return Hr(o);
  } else return [e, void 0];
  const s = t.indexOf(o), r = n ? n.indexOf(o) : -1, i = (l) => {
    t[s] = l, n && (r > -1 ? n[r] = l : l.patchFlag > 0 && (e.dynamicChildren = [...n, l]));
  };
  return [Ve(o), i];
};
function Ko(e, t = !0) {
  let n;
  for (let o = 0; o < e.length; o++) {
    const s = e[o];
    if (Gn(s)) {
      if (s.type !== xe || s.children === "v-if") {
        if (n)
          return;
        if (n = s, process.env.NODE_ENV !== "production" && t && n.patchFlag > 0 && n.patchFlag & 2048)
          return Ko(n.children);
      }
    } else
      return;
  }
  return n;
}
const gc = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || en(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, vc = (e, t) => {
  const n = {};
  for (const o in e)
    (!Nn(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
}, gs = (e) => e.shapeFlag & 7 || e.type === xe;
function mc(e, t, n) {
  const { props: o, children: s, component: r } = e, { props: i, children: l, patchFlag: u } = t, p = r.emitsOptions;
  if (process.env.NODE_ENV !== "production" && (s || l) && Be || t.dirs || t.transition)
    return !0;
  if (n && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return o ? vs(o, i, p) : !!i;
    if (u & 8) {
      const d = t.dynamicProps;
      for (let a = 0; a < d.length; a++) {
        const g = d[a];
        if (i[g] !== o[g] && !Wn(p, g))
          return !0;
      }
    }
  } else
    return (s || l) && (!l || !l.$stable) ? !0 : o === i ? !1 : o ? i ? vs(o, i, p) : !0 : !!i;
  return !1;
}
function vs(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let s = 0; s < o.length; s++) {
    const r = o[s];
    if (t[r] !== e[r] && !Wn(n, r))
      return !0;
  }
  return !1;
}
function _c({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.el = e.el), o === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const kr = (e) => e.__isSuspense;
function Ec(e, t) {
  t && t.pendingBranch ? M(e) ? t.effects.push(...e) : t.effects.push(e) : pr(e);
}
const be = Symbol.for("v-fgt"), rn = Symbol.for("v-txt"), xe = Symbol.for("v-cmt"), En = Symbol.for("v-stc"), Zt = [];
let Oe = null;
function J(e = !1) {
  Zt.push(Oe = e ? null : []);
}
function yc() {
  Zt.pop(), Oe = Zt[Zt.length - 1] || null;
}
let zt = 1;
function ms(e, t = !1) {
  zt += e, e < 0 && Oe && t && (Oe.hasOnce = !0);
}
function Ur(e) {
  return e.dynamicChildren = zt > 0 ? Oe || wt : null, yc(), zt > 0 && Oe && Oe.push(e), e;
}
function re(e, t, n, o, s, r) {
  return Ur(
    we(
      e,
      t,
      n,
      o,
      s,
      r,
      !0
    )
  );
}
function Rn(e, t, n, o, s) {
  return Ur(
    De(
      e,
      t,
      n,
      o,
      s,
      !0
    )
  );
}
function Gn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ft(e, t) {
  if (process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && e.component) {
    const n = mn.get(t.type);
    if (n && n.has(e.component))
      return e.shapeFlag &= -257, t.shapeFlag &= -513, !1;
  }
  return e.type === t.type && e.key === t.key;
}
const bc = (...e) => Kr(
  ...e
), Br = ({ key: e }) => e ?? null, yn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Z(e) || z(e) || $(e) ? { i: Ne, r: e, k: t, f: !!n } : e : null);
function we(e, t = null, n = null, o = 0, s = null, r = e === be ? 0 : 1, i = !1, l = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Br(t),
    ref: t && yn(t),
    scopeId: Er,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: o,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: Ne
  };
  return l ? (Wo(u, n), r & 128 && e.normalize(u)) : n && (u.shapeFlag |= Z(n) ? 8 : 16), process.env.NODE_ENV !== "production" && u.key !== u.key && O("VNode created with invalid key (NaN). VNode type:", u.type), zt > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Oe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && Oe.push(u), u;
}
const De = process.env.NODE_ENV !== "production" ? bc : Kr;
function Kr(e, t = null, n = null, o = 0, s = null, r = !1) {
  if ((!e || e === Ml) && (process.env.NODE_ENV !== "production" && !e && O(`Invalid vnode type when creating vnode: ${e}.`), e = xe), Gn(e)) {
    const l = ct(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Wo(l, n), zt > 0 && !r && Oe && (l.shapeFlag & 6 ? Oe[Oe.indexOf(e)] = l : Oe.push(l)), l.patchFlag = -2, l;
  }
  if (zr(e) && (e = e.__vccOpts), t) {
    t = Nc(t);
    let { class: l, style: u } = t;
    l && !Z(l) && (t.class = jn(l)), W(u) && (xn(u) && !M(u) && (u = te({}, u)), t.style = nn(u));
  }
  const i = Z(e) ? 1 : kr(e) ? 128 : _l(e) ? 64 : W(e) ? 4 : $(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && xn(e) && (e = R(e), O(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), we(
    e,
    t,
    n,
    o,
    s,
    i,
    r,
    !0
  );
}
function Nc(e) {
  return e ? xn(e) || Tr(e) ? te({}, e) : e : null;
}
function ct(e, t, n = !1, o = !1) {
  const { props: s, ref: r, patchFlag: i, children: l, transition: u } = e, p = t ? Oc(s || {}, t) : s, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: p,
    key: p && Br(p),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? M(r) ? r.concat(yn(t)) : [r, yn(t)] : yn(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && i === -1 && M(l) ? l.map(Wr) : l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== be ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: u,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && ct(e.ssContent),
    ssFallback: e.ssFallback && ct(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return u && o && Fo(
    d,
    u.clone(d)
  ), d;
}
function Wr(e) {
  const t = ct(e);
  return M(e.children) && (t.children = e.children.map(Wr)), t;
}
function Gr(e = " ", t = 0) {
  return De(rn, null, e, t);
}
function He(e = "", t = !1) {
  return t ? (J(), Rn(xe, null, e)) : De(xe, null, e);
}
function Ve(e) {
  return e == null || typeof e == "boolean" ? De(xe) : M(e) ? De(
    be,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Gn(e) ? ot(e) : De(rn, null, String(e));
}
function ot(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : ct(e);
}
function Wo(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (M(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Wo(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !Tr(t) ? t._ctx = Ne : s === 3 && Ne && (Ne.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else $(t) ? (t = { default: t, _ctx: Ne }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [Gr(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Oc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const s in o)
      if (s === "class")
        t.class !== o.class && (t.class = jn([t.class, o.class]));
      else if (s === "style")
        t.style = nn([t.style, o.style]);
      else if (en(s)) {
        const r = t[s], i = o[s];
        i && r !== i && !(M(r) && r.includes(i)) && (t[s] = r ? [].concat(r, i) : i);
      } else s !== "" && (t[s] = o[s]);
  }
  return t;
}
function Fe(e, t, n, o = null) {
  We(e, t, 7, [
    n,
    o
  ]);
}
const xc = Vr();
let wc = 0;
function Dc(e, t, n) {
  const o = e.type, s = (t ? t.appContext : e.appContext) || xc, r = {
    uid: wc++,
    vnode: e,
    type: o,
    parent: t,
    appContext: s,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Ni(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(s.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: $r(o, s),
    emitsOptions: jr(o, s),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: K,
    // inheritAttrs
    inheritAttrs: o.inheritAttrs,
    // state
    ctx: K,
    data: K,
    props: K,
    attrs: K,
    slots: K,
    refs: K,
    setupState: K,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return process.env.NODE_ENV !== "production" ? r.ctx = Al(r) : r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = pc.bind(null, r), e.ce && e.ce(r), r;
}
let le = null;
const Zr = () => le || Ne;
let In, yo;
{
  const e = tn(), t = (n, o) => {
    let s;
    return (s = e[n]) || (s = e[n] = []), s.push(o), (r) => {
      s.length > 1 ? s.forEach((i) => i(r)) : s[0](r);
    };
  };
  In = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => le = n
  ), yo = t(
    "__VUE_SSR_SETTERS__",
    (n) => Xt = n
  );
}
const ln = (e) => {
  const t = le;
  return In(e), e.scope.on(), () => {
    e.scope.off(), In(t);
  };
}, _s = () => {
  le && le.scope.off(), In(null);
}, Vc = /* @__PURE__ */ ze("slot,component");
function bo(e, { isNativeTag: t }) {
  (Vc(e) || t(e)) && O(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function Yr(e) {
  return e.vnode.shapeFlag & 4;
}
let Xt = !1;
function Sc(e, t = !1, n = !1) {
  t && yo(t);
  const { props: o, children: s } = e.vnode, r = Yr(e);
  Wl(e, o, r, t), nc(e, s, n || t);
  const i = r ? Cc(e, t) : void 0;
  return t && yo(!1), i;
}
function Cc(e, t) {
  var n;
  const o = e.type;
  if (process.env.NODE_ENV !== "production") {
    if (o.name && bo(o.name, e.appContext.config), o.components) {
      const r = Object.keys(o.components);
      for (let i = 0; i < r.length; i++)
        bo(r[i], e.appContext.config);
    }
    if (o.directives) {
      const r = Object.keys(o.directives);
      for (let i = 0; i < r.length; i++)
        yr(r[i]);
    }
    o.compilerOptions && Tc() && O(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, xr), process.env.NODE_ENV !== "production" && Rl(e);
  const { setup: s } = o;
  if (s) {
    $e();
    const r = e.setupContext = s.length > 1 ? $c(e) : null, i = ln(e), l = Ct(
      s,
      e,
      0,
      [
        process.env.NODE_ENV !== "production" ? Ue(e.props) : e.props,
        r
      ]
    ), u = wo(l);
    if (Ae(), i(), (u || e.sp) && !Wt(e) && br(e), u) {
      if (l.then(_s, _s), t)
        return l.then((p) => {
          Es(e, p, t);
        }).catch((p) => {
          on(p, e, 0);
        });
      if (e.asyncDep = l, process.env.NODE_ENV !== "production" && !e.suspense) {
        const p = (n = o.name) != null ? n : "Anonymous";
        O(
          `Component <${p}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      Es(e, l, t);
  } else
    qr(e, t);
}
function Es(e, t, n) {
  $(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : W(t) ? (process.env.NODE_ENV !== "production" && Gn(t) && O(
    "setup() should not return VNodes directly - return a render function instead."
  ), process.env.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = ur(t), process.env.NODE_ENV !== "production" && Il(e)) : process.env.NODE_ENV !== "production" && t !== void 0 && O(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), qr(e, n);
}
const Tc = () => !0;
function qr(e, t, n) {
  const o = e.type;
  e.render || (e.render = o.render || oe);
  {
    const s = ln(e);
    $e();
    try {
      Ll(e);
    } finally {
      Ae(), s();
    }
  }
  process.env.NODE_ENV !== "production" && !o.render && e.render === oe && !t && (o.template ? O(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
  ) : O("Component is missing template or render function: ", o));
}
const ys = process.env.NODE_ENV !== "production" ? {
  get(e, t) {
    return An(), ne(e, "get", ""), e[t];
  },
  set() {
    return O("setupContext.attrs is readonly."), !1;
  },
  deleteProperty() {
    return O("setupContext.attrs is readonly."), !1;
  }
} : {
  get(e, t) {
    return ne(e, "get", ""), e[t];
  }
};
function Mc(e) {
  return new Proxy(e.slots, {
    get(t, n) {
      return ne(e, "get", "$slots"), t[n];
    }
  });
}
function $c(e) {
  const t = (n) => {
    if (process.env.NODE_ENV !== "production" && (e.exposed && O("expose() should be called only once per setup()."), n != null)) {
      let o = typeof n;
      o === "object" && (M(n) ? o = "array" : z(n) && (o = "ref")), o !== "object" && O(
        `expose() should be passed a plain object, received ${o}.`
      );
    }
    e.exposed = n || {};
  };
  if (process.env.NODE_ENV !== "production") {
    let n, o;
    return Object.freeze({
      get attrs() {
        return n || (n = new Proxy(e.attrs, ys));
      },
      get slots() {
        return o || (o = Mc(e));
      },
      get emit() {
        return (s, ...r) => e.emit(s, ...r);
      },
      expose: t
    });
  } else
    return {
      attrs: new Proxy(e.attrs, ys),
      slots: e.slots,
      emit: e.emit,
      expose: t
    };
}
function Go(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(ur(Bi(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in mt)
        return mt[n](e);
    },
    has(t, n) {
      return n in t || n in mt;
    }
  })) : e.proxy;
}
const Ac = /(?:^|[-_])\w/g, Rc = (e) => e.replace(Ac, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Jr(e, t = !0) {
  return $(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Zn(e, t, n = !1) {
  let o = Jr(t);
  if (!o && t.__file) {
    const s = t.__file.match(/([^/\\]+)\.\w+$/);
    s && (o = s[1]);
  }
  if (!o && e && e.parent) {
    const s = (r) => {
      for (const i in r)
        if (r[i] === t)
          return i;
    };
    o = s(
      e.components || e.parent.type.components
    ) || s(e.appContext.components);
  }
  return o ? Rc(o) : n ? "App" : "Anonymous";
}
function zr(e) {
  return $(e) && "__vccOpts" in e;
}
const No = (e, t) => {
  const n = Yi(e, t, Xt);
  if (process.env.NODE_ENV !== "production") {
    const o = Zr();
    o && o.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function Ic() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, o = { style: "color:#eb2f96" }, s = {
    __vue_custom_formatter: !0,
    header(a) {
      if (!W(a))
        return null;
      if (a.__isVue)
        return ["div", e, "VueInstance"];
      if (z(a)) {
        $e();
        const g = a.value;
        return Ae(), [
          "div",
          {},
          ["span", e, d(a)],
          "<",
          l(g),
          ">"
        ];
      } else {
        if (lt(a))
          return [
            "div",
            {},
            ["span", e, he(a) ? "ShallowReactive" : "Reactive"],
            "<",
            l(a),
            `>${Ke(a) ? " (readonly)" : ""}`
          ];
        if (Ke(a))
          return [
            "div",
            {},
            ["span", e, he(a) ? "ShallowReadonly" : "Readonly"],
            "<",
            l(a),
            ">"
          ];
      }
      return null;
    },
    hasBody(a) {
      return a && a.__isVue;
    },
    body(a) {
      if (a && a.__isVue)
        return [
          "div",
          {},
          ...r(a.$)
        ];
    }
  };
  function r(a) {
    const g = [];
    a.type.props && a.props && g.push(i("props", R(a.props))), a.setupState !== K && g.push(i("setup", a.setupState)), a.data !== K && g.push(i("data", R(a.data)));
    const y = u(a, "computed");
    y && g.push(i("computed", y));
    const D = u(a, "inject");
    return D && g.push(i("injected", D)), g.push([
      "div",
      {},
      [
        "span",
        {
          style: o.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: a }]
    ]), g;
  }
  function i(a, g) {
    return g = te({}, g), Object.keys(g).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        a
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(g).map((y) => [
          "div",
          {},
          ["span", o, y + ": "],
          l(g[y], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function l(a, g = !0) {
    return typeof a == "number" ? ["span", t, a] : typeof a == "string" ? ["span", n, JSON.stringify(a)] : typeof a == "boolean" ? ["span", o, a] : W(a) ? ["object", { object: g ? R(a) : a }] : ["span", n, String(a)];
  }
  function u(a, g) {
    const y = a.type;
    if ($(y))
      return;
    const D = {};
    for (const V in a.ctx)
      p(y, V, g) && (D[V] = a.ctx[V]);
    return D;
  }
  function p(a, g, y) {
    const D = a[y];
    if (M(D) && D.includes(g) || W(D) && g in D || a.extends && p(a.extends, g, y) || a.mixins && a.mixins.some((V) => p(V, g, y)))
      return !0;
  }
  function d(a) {
    return he(a) ? "ShallowRef" : a.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(s) : window.devtoolsFormatters = [s];
}
const bs = "3.5.22", qe = process.env.NODE_ENV !== "production" ? O : oe;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Oo;
const Ns = typeof window < "u" && window.trustedTypes;
if (Ns)
  try {
    Oo = /* @__PURE__ */ Ns.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch (e) {
    process.env.NODE_ENV !== "production" && qe(`Error creating trusted types policy: ${e}`);
  }
const Xr = Oo ? (e) => Oo.createHTML(e) : (e) => e, Pc = "http://www.w3.org/2000/svg", Lc = "http://www.w3.org/1998/Math/MathML", Ze = typeof document < "u" ? document : null, Os = Ze && /* @__PURE__ */ Ze.createElement("template"), Fc = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const s = t === "svg" ? Ze.createElementNS(Pc, e) : t === "mathml" ? Ze.createElementNS(Lc, e) : n ? Ze.createElement(e, { is: n }) : Ze.createElement(e);
    return e === "select" && o && o.multiple != null && s.setAttribute("multiple", o.multiple), s;
  },
  createText: (e) => Ze.createTextNode(e),
  createComment: (e) => Ze.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ze.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, o, s, r) {
    const i = n ? n.previousSibling : t.lastChild;
    if (s && (s === r || s.nextSibling))
      for (; t.insertBefore(s.cloneNode(!0), n), !(s === r || !(s = s.nextSibling)); )
        ;
    else {
      Os.innerHTML = Xr(
        o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e
      );
      const l = Os.content;
      if (o === "svg" || o === "mathml") {
        const u = l.firstChild;
        for (; u.firstChild; )
          l.appendChild(u.firstChild);
        l.removeChild(u);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, jc = Symbol("_vtc");
function Hc(e, t, n) {
  const o = e[jc];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const xs = Symbol("_vod"), kc = Symbol("_vsh"), Uc = Symbol(process.env.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : ""), Bc = /(?:^|;)\s*display\s*:/;
function Kc(e, t, n) {
  const o = e.style, s = Z(n);
  let r = !1;
  if (n && !s) {
    if (t)
      if (Z(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && bn(o, l, "");
        }
      else
        for (const i in t)
          n[i] == null && bn(o, i, "");
    for (const i in n)
      i === "display" && (r = !0), bn(o, i, n[i]);
  } else if (s) {
    if (t !== n) {
      const i = o[Uc];
      i && (n += ";" + i), o.cssText = n, r = Bc.test(n);
    }
  } else t && e.removeAttribute("style");
  xs in e && (e[xs] = r ? o.display : "", e[kc] && (o.display = "none"));
}
const Wc = /[^\\];\s*$/, ws = /\s*!important$/;
function bn(e, t, n) {
  if (M(n))
    n.forEach((o) => bn(e, t, o));
  else if (n == null && (n = ""), process.env.NODE_ENV !== "production" && Wc.test(n) && qe(
    `Unexpected semicolon at the end of '${t}' style value: '${n}'`
  ), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = Gc(e, t);
    ws.test(n) ? e.setProperty(
      Je(o),
      n.replace(ws, ""),
      "important"
    ) : e[o] = n;
  }
}
const Ds = ["Webkit", "Moz", "ms"], ro = {};
function Gc(e, t) {
  const n = ro[t];
  if (n)
    return n;
  let o = Ce(t);
  if (o !== "filter" && o in e)
    return ro[t] = o;
  o = Fn(o);
  for (let s = 0; s < Ds.length; s++) {
    const r = Ds[s] + o;
    if (r in e)
      return ro[t] = r;
  }
  return t;
}
const Vs = "http://www.w3.org/1999/xlink";
function Ss(e, t, n, o, s, r = bi(t)) {
  o && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Vs, t.slice(6, t.length)) : e.setAttributeNS(Vs, t, n) : n == null || r && !Bs(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : ut(n) ? String(n) : n
  );
}
function Cs(e, t, n, o, s) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Xr(n) : n);
    return;
  }
  const r = e.tagName;
  if (t === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const l = r === "OPTION" ? e.getAttribute("value") || "" : e.value, u = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== u || !("_value" in e)) && (e.value = u), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let i = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = Bs(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch (l) {
    process.env.NODE_ENV !== "production" && !i && qe(
      `Failed setting prop "${t}" on <${r.toLowerCase()}>: value ${n} is invalid.`,
      l
    );
  }
  i && e.removeAttribute(s || t);
}
function Zc(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function Yc(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
const Ts = Symbol("_vei");
function qc(e, t, n, o, s = null) {
  const r = e[Ts] || (e[Ts] = {}), i = r[t];
  if (o && i)
    i.value = process.env.NODE_ENV !== "production" ? $s(o, t) : o;
  else {
    const [l, u] = Jc(t);
    if (o) {
      const p = r[t] = Qc(
        process.env.NODE_ENV !== "production" ? $s(o, t) : o,
        s
      );
      Zc(e, l, p, u);
    } else i && (Yc(e, l, i, u), r[t] = void 0);
  }
}
const Ms = /(?:Once|Passive|Capture)$/;
function Jc(e) {
  let t;
  if (Ms.test(e)) {
    t = {};
    let o;
    for (; o = e.match(Ms); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Je(e.slice(2)), t];
}
let io = 0;
const zc = /* @__PURE__ */ Promise.resolve(), Xc = () => io || (zc.then(() => io = 0), io = Date.now());
function Qc(e, t) {
  const n = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= n.attached)
      return;
    We(
      eu(o, n.value),
      t,
      5,
      [o]
    );
  };
  return n.value = e, n.attached = Xc(), n;
}
function $s(e, t) {
  return $(e) || M(e) ? e : (qe(
    `Wrong type passed as event handler to ${t} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof e}.`
  ), oe);
}
function eu(e, t) {
  if (M(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (o) => (s) => !s._stopped && o && o(s)
    );
  } else
    return t;
}
const As = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, tu = (e, t, n, o, s, r) => {
  const i = s === "svg";
  t === "class" ? Hc(e, o, i) : t === "style" ? Kc(e, n, o) : en(t) ? Nn(t) || qc(e, t, n, o, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : nu(e, t, o, i)) ? (Cs(e, t, o), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Ss(e, t, o, i, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !Z(o)) ? Cs(e, Ce(t), o, r, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), Ss(e, t, o, i));
};
function nu(e, t, n, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && As(t) && $(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
      return !1;
  }
  return As(t) && Z(n) ? !1 : t in e;
}
const ou = ["ctrl", "shift", "alt", "meta"], su = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => ou.some((n) => e[`${n}Key`] && !t.includes(n))
}, st = (e, t) => {
  const n = e._withMods || (e._withMods = {}), o = t.join(".");
  return n[o] || (n[o] = ((s, ...r) => {
    for (let i = 0; i < t.length; i++) {
      const l = su[t[i]];
      if (l && l(s, t)) return;
    }
    return e(s, ...r);
  }));
}, ru = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Rs = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), o = t.join(".");
  return n[o] || (n[o] = ((s) => {
    if (!("key" in s))
      return;
    const r = Je(s.key);
    if (t.some(
      (i) => i === r || ru[i] === r
    ))
      return e(s);
  }));
}, iu = /* @__PURE__ */ te({ patchProp: tu }, Fc);
let Is;
function lu() {
  return Is || (Is = rc(iu));
}
const cu = ((...e) => {
  const t = lu().createApp(...e);
  process.env.NODE_ENV !== "production" && (fu(t), au(t));
  const { mount: n } = t;
  return t.mount = (o) => {
    const s = du(o);
    if (!s) return;
    const r = t._component;
    !$(r) && !r.render && !r.template && (r.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const i = n(s, !1, uu(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), i;
  }, t;
});
function uu(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function fu(e) {
  Object.defineProperty(e.config, "isNativeTag", {
    value: (t) => mi(t) || _i(t) || Ei(t),
    writable: !1
  });
}
function au(e) {
  {
    const t = e.config.isCustomElement;
    Object.defineProperty(e.config, "isCustomElement", {
      get() {
        return t;
      },
      set() {
        qe(
          "The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead."
        );
      }
    });
    const n = e.config.compilerOptions, o = 'The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader\'s `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc';
    Object.defineProperty(e.config, "compilerOptions", {
      get() {
        return qe(o), n;
      },
      set() {
        qe(o);
      }
    });
  }
}
function du(e) {
  if (Z(e)) {
    const t = document.querySelector(e);
    return process.env.NODE_ENV !== "production" && !t && qe(
      `Failed to mount app: mount target selector "${e}" returned null.`
    ), t;
  }
  return process.env.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && qe(
    'mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs'
  ), e;
}
/**
* vue v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function pu() {
  Ic();
}
process.env.NODE_ENV !== "production" && pu();
const Qr = Symbol("GlobalJsonConfig"), hu = {
  install(e, t) {
    e.provide(Qr, t);
  }
};
function cn() {
  const e = Gt(Qr);
  if (!e)
    throw new Error("Plugin GlobalJsonConfig not found.");
  return e;
}
const gu = ["src"], vu = {
  key: 1,
  class: "loader"
}, mu = /* @__PURE__ */ Tt({
  __name: "ChatEntryAudio",
  props: {
    entry: {},
    id: {}
  },
  setup(e) {
    const t = cn(), n = e, o = ue(null);
    return Ho(() => {
      const s = {
        ended: () => t.fsm?.logEvent({ event: "AUDIO_PLAY_ENDED", id: n.id }),
        play: () => t.fsm?.logEvent({ event: "AUDIO_PLAY_START", id: n.id }),
        pause: () => t.fsm?.logEvent({ event: "AUDIO_PLAY_PAUSE", id: n.id }),
        seeked: () => t.fsm?.logEvent({ event: "AUDIO_PLAY_SEEKED", id: n.id })
      };
      for (const r in s)
        o.value?.addEventListener(r, s[r]);
    }), (s, r) => n.entry.length > 0 ? (J(), re("audio", {
      key: 0,
      ref_key: "audioElement",
      ref: o,
      controls: "",
      controlslist: "nodownload",
      preload: "auto"
    }, [
      we("source", {
        src: n.entry
      }, null, 8, gu)
    ], 512)) : (J(), re("div", vu, [...r[0] || (r[0] = [
      we("span", null, null, -1)
    ])]));
  }
}), un = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, s] of t)
    n[o] = s;
  return n;
}, ei = /* @__PURE__ */ un(mu, [["__scopeId", "data-v-c34464fb"]]), _u = /* @__PURE__ */ Tt({
  __name: "ChatEntryText",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => Ws(t.entry);
  }
});
function Qt(e) {
  const t = {};
  if (!e)
    return t;
  let n = null, o = null, s = null, r = null;
  if (Object.keys(e).forEach((i) => {
    if (i.startsWith("_set_") || `_set_${i}` in e && !e[`_set_${i}`])
      return;
    const l = e[i];
    switch (i) {
      case "marginVert":
        n = l;
        break;
      case "marginHorz":
        o = l;
        break;
      case "paddingVert":
        r = l;
        break;
      case "paddingHorz":
        s = l;
        break;
      case "borderWidth":
        t.borderWidth = `${l}px`, t.borderStyle = "solid";
        break;
      case "borderRadius":
        t.borderRadius = `${l}px`;
        break;
      default:
        t[i] = l;
        break;
    }
  }), n !== null) {
    const i = `${n}px`;
    o !== null ? t.margin = `${i} ${o}px` : (t.marginLeft = i, t.marginRight = i);
  } else if (o !== null) {
    const i = `${o}px`;
    t.marginLeft = i, t.marginRight = i;
  }
  if (r !== null) {
    const i = `${r}px`;
    s !== null ? t.padding = `${i} ${s}px` : (t.paddingTop = i, t.paddingBottom = i);
  } else if (s !== null) {
    const i = `${s}px`;
    t.paddingLeft = i, t.paddingRight = i;
  }
  return t;
}
const ti = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M4%206H20M16%206L15.7294%205.18807C15.4671%204.40125%2015.3359%204.00784%2015.0927%203.71698C14.8779%203.46013%2014.6021%203.26132%2014.2905%203.13878C13.9376%203%2013.523%203%2012.6936%203H11.3064C10.477%203%2010.0624%203%209.70951%203.13878C9.39792%203.26132%209.12208%203.46013%208.90729%203.71698C8.66405%204.00784%208.53292%204.40125%208.27064%205.18807L8%206M18%206V16.2C18%2017.8802%2018%2018.7202%2017.673%2019.362C17.3854%2019.9265%2016.9265%2020.3854%2016.362%2020.673C15.7202%2021%2014.8802%2021%2013.2%2021H10.8C9.11984%2021%208.27976%2021%207.63803%2020.673C7.07354%2020.3854%206.6146%2019.9265%206.32698%2019.362C6%2018.7202%206%2017.8802%206%2016.2V6M14%2010V17M10%2010V17'%20stroke='%23000000'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e", Eu = {
  key: 0,
  class: "deleting"
}, yu = { class: "button" }, bu = ["src"], Nu = 3510, Ou = /* @__PURE__ */ Tt({
  __name: "ChatEntry",
  props: {
    entry: {}
  },
  emits: ["updateEntryValue"],
  setup(e, { emit: t }) {
    const n = cn(), o = ue(null), s = {
      ...Qt(n.entryStyle),
      marginTop: `${n.listGap}px`
    }, r = ue(s), l = ue(e.entry), u = t, p = (y) => {
      l.value.status = y, u("updateEntryValue", l.value);
    };
    let d = null;
    const a = () => {
      p("deleting");
      const y = o.value;
      y.scrollIntoView({ behavior: "smooth", block: "nearest" });
      const D = `${y.getBoundingClientRect().height}px`;
      r.value = {
        minHeight: D,
        maxHeight: D,
        height: D,
        marginTop: `${n.listGap}px`,
        ...Qt(n.deletingStyle || n.entryStyle)
      }, y.classList.add("deleted");
      const V = {
        event: "ENTRY_DELETING",
        id: l.value.id,
        type: l.value.type
      };
      l.value.type === "text" && (V.text = l.value.entry), d = setTimeout(() => {
        p("deleted"), r.value = s, V.event = "ENTRY_DELETED", n.fsm?.logEvent(V);
      }, Nu), n.fsm?.logEvent(V);
    }, g = () => {
      if (d) {
        clearTimeout(d), d = null, p("active"), o.value.classList.remove("deleted"), r.value = s;
        const y = {
          event: "ENTRY_DELETE_CANCEL",
          id: l.value.id,
          type: l.value.type
        };
        l.value.type === "text" && (y.text = l.value.entry), n.fsm?.logEvent(y);
      }
    };
    return (y, D) => (J(), re("div", {
      ref_key: "entryDiv",
      ref: o,
      class: "entry",
      style: nn(r.value)
    }, [
      e.entry.status === "deleting" ? (J(), re("div", Eu, [
        D[0] || (D[0] = Gr(" Eintrag Gelöscht. ", -1)),
        we("a", {
          href: "#",
          onClick: st(g, ["prevent"])
        }, "Rückgängig machen")
      ])) : e.entry.status !== "deleted" ? (J(), re(be, { key: 1 }, [
        l.value.type === "text" ? (J(), Rn(_u, {
          key: 0,
          entry: l.value.entry
        }, null, 8, ["entry"])) : l.value.type === "audio" ? (J(), Rn(ei, {
          key: 1,
          entry: l.value.entry,
          id: l.value.id
        }, null, 8, ["entry", "id"])) : He("", !0),
        we("div", yu, [
          we("img", {
            src: tt(ti),
            onClick: st(a, ["prevent"])
          }, null, 8, bu)
        ])
      ], 64)) : He("", !0)
    ], 4));
  }
}), xu = /* @__PURE__ */ un(Ou, [["__scopeId", "data-v-6298b429"]]), wu = /* @__PURE__ */ Tt({
  __name: "ChatList",
  props: {
    list: {}
  },
  emits: ["updateEntryValue"],
  setup(e, { emit: t }) {
    const n = cn(), o = {
      ...Qt(n.listStyle),
      padding: `0 ${n.listGap}px ${n.listGap}px ${n.listGap}px`
    };
    n.listHeight && n.listHeight > 0 && (o.height = `${n.listHeight}px`);
    const s = e, r = t, i = (u) => {
      r("updateEntryValue", u);
    }, l = ue(null);
    return _t(
      () => s.list.length,
      (u, p) => {
        u > p && Ro(() => {
          l.value && (l.value.scrollTop = l.value.scrollHeight);
        });
      }
    ), (u, p) => (J(), re("div", {
      class: "chat-list",
      style: o,
      ref_key: "listContainer",
      ref: l
    }, [
      (J(!0), re(be, null, $l(s.list, (d) => (J(), re(be, {
        key: d.id
      }, [
        d.status != "deleted" ? (J(), Rn(xu, {
          key: 0,
          entry: d,
          onUpdateEntryValue: i
        }, null, 8, ["entry"])) : He("", !0)
      ], 64))), 128))
    ], 512));
  }
}), Du = /* @__PURE__ */ un(wu, [["__scopeId", "data-v-6c767312"]]), ni = "__IB_ExtRes_MicroAllowed_stat";
let St = null;
function Vu() {
  return navigator.mediaDevices?.getUserMedia ? St = sessionStorage.getItem(ni) ?? "prompt" : St = "not-supported", St;
}
function Ps(e) {
  St = e, e === "allowed" && sessionStorage.setItem(ni, e);
}
function Su() {
  const e = [
    "audio/ogg;codecs=opus",
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/ogg",
    "audio/mp4"
  ];
  for (const t of e)
    if (MediaRecorder?.isTypeSupported(t))
      return t;
}
async function Cu() {
  return new Promise((e, t) => {
    const n = (r) => {
      const i = "allowed";
      St !== i && Ps(i), e(r);
    }, o = () => {
      const r = "denied";
      St !== r && Ps(r), t();
    }, s = {
      audio: !0
    };
    navigator.mediaDevices.getUserMedia(s).then(n, o);
  });
}
async function Tu(e) {
  return new Promise((t, n) => {
    const o = new FileReader();
    o.onloadend = () => t(o.result), o.onerror = n, o.readAsDataURL(e);
  });
}
function Mu(e) {
  return Tu(e).catch((n) => console.error("convertToBase64: ", n));
}
const Ls = (e, t) => e ? { [t]: e } : {};
function $u(e, t = void 0, n = 32e3, o = Su()) {
  const s = new MediaRecorder(e, {
    audioBitsPerSecond: n,
    ...Ls(o, "mimeType")
  });
  if (!s)
    return s;
  const r = [], i = (u) => {
    r.push(u.data);
  }, l = () => {
    e.getTracks().forEach((p) => p.stop());
    const u = new Blob(r, Ls(o, "type"));
    t && Mu(u).then((p) => {
      p && typeof p == "string" && t(p);
    });
  };
  return s.addEventListener("dataavailable", i), s.addEventListener("stop", l), s.start(), s;
}
function Fs(e) {
  e?.stop();
}
const Au = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M19%2010V12C19%2015.866%2015.866%2019%2012%2019M5%2010V12C5%2015.866%208.13401%2019%2012%2019M12%2019V22M8%2022H16M12%2015C10.3431%2015%209%2013.6569%209%2012V5C9%203.34315%2010.3431%202%2012%202C13.6569%202%2015%203.34315%2015%205V12C15%2013.6569%2013.6569%2015%2012%2015Z'%20stroke='%23000000'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e", Ru = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%20-0.5%2025%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M19.1168%2012.1484C19.474%2012.3581%2019.9336%2012.2384%2020.1432%2011.8811C20.3528%2011.5238%2020.2331%2011.0643%2019.8758%2010.8547L19.1168%2012.1484ZM6.94331%204.13656L6.55624%204.77902L6.56378%204.78344L6.94331%204.13656ZM5.92408%204.1598L5.50816%203.5357L5.50816%203.5357L5.92408%204.1598ZM5.51031%205.09156L4.76841%205.20151C4.77575%205.25101%204.78802%205.29965%204.80505%205.34671L5.51031%205.09156ZM7.12405%2011.7567C7.26496%2012.1462%207.69495%2012.3477%208.08446%2012.2068C8.47397%2012.0659%208.67549%2011.6359%208.53458%2011.2464L7.12405%2011.7567ZM19.8758%2012.1484C20.2331%2011.9388%2020.3528%2011.4793%2020.1432%2011.122C19.9336%2010.7648%2019.474%2010.6451%2019.1168%2010.8547L19.8758%2012.1484ZM6.94331%2018.8666L6.56375%2018.2196L6.55627%2018.2241L6.94331%2018.8666ZM5.92408%2018.8433L5.50815%2019.4674H5.50815L5.92408%2018.8433ZM5.51031%2017.9116L4.80505%2017.6564C4.78802%2017.7035%204.77575%2017.7521%204.76841%2017.8016L5.51031%2017.9116ZM8.53458%2011.7567C8.67549%2011.3672%208.47397%2010.9372%208.08446%2010.7963C7.69495%2010.6554%207.26496%2010.8569%207.12405%2011.2464L8.53458%2011.7567ZM19.4963%2012.2516C19.9105%2012.2516%2020.2463%2011.9158%2020.2463%2011.5016C20.2463%2011.0873%2019.9105%2010.7516%2019.4963%2010.7516V12.2516ZM7.82931%2010.7516C7.4151%2010.7516%207.07931%2011.0873%207.07931%2011.5016C7.07931%2011.9158%207.4151%2012.2516%207.82931%2012.2516V10.7516ZM19.8758%2010.8547L7.32284%203.48968L6.56378%204.78344L19.1168%2012.1484L19.8758%2010.8547ZM7.33035%203.49414C6.76609%203.15419%206.05633%203.17038%205.50816%203.5357L6.34%204.78391C6.40506%204.74055%206.4893%204.73863%206.55627%204.77898L7.33035%203.49414ZM5.50816%203.5357C4.95998%203.90102%204.67184%204.54987%204.76841%205.20151L6.25221%204.98161C6.24075%204.90427%206.27494%204.82727%206.34%204.78391L5.50816%203.5357ZM4.80505%205.34671L7.12405%2011.7567L8.53458%2011.2464L6.21558%204.83641L4.80505%205.34671ZM19.1168%2010.8547L6.56378%2018.2197L7.32284%2019.5134L19.8758%2012.1484L19.1168%2010.8547ZM6.55627%2018.2241C6.4893%2018.2645%206.40506%2018.2626%206.34%2018.2192L5.50815%2019.4674C6.05633%2019.8327%206.76609%2019.8489%207.33035%2019.509L6.55627%2018.2241ZM6.34%2018.2192C6.27494%2018.1759%206.24075%2018.0988%206.25221%2018.0215L4.76841%2017.8016C4.67184%2018.4532%204.95998%2019.1021%205.50815%2019.4674L6.34%2018.2192ZM6.21558%2018.1667L8.53458%2011.7567L7.12405%2011.2464L4.80505%2017.6564L6.21558%2018.1667ZM19.4963%2010.7516H7.82931V12.2516H19.4963V10.7516Z'%20fill='%23000000'/%3e%3c/svg%3e", Iu = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20fill='%23dc143c'%20height='800px'%20width='800px'%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%20512%20512'%20enable-background='new%200%200%20512%20512'%20xml:space='preserve'%3e%3cpath%20d='M465.5,0H46.5C20.9,0,0,20.9,0,46.5v418.9C0,491.1,20.9,512,46.5,512h418.9c25.7,0,46.5-20.9,46.5-46.5V46.5%20C512,20.9,491.1,0,465.5,0z'/%3e%3c/svg%3e", Pu = ["disabled", "value", "placeholder", "rows", "onKeydown"], Lu = {
  key: 1,
  class: "rectext"
}, Fu = {
  key: 2,
  class: "rectext"
}, ju = {
  key: 3,
  class: "button"
}, Hu = ["src"], ku = {
  key: 4,
  class: "button"
}, Uu = ["src"], Bu = {
  key: 5,
  class: "button"
}, Ku = ["src"], Wu = {
  key: 6,
  class: "button-stop"
}, Gu = ["src"], Zu = /* @__PURE__ */ Tt({
  __name: "ChatInput",
  emits: ["addEntry"],
  setup(e, { emit: t }) {
    const n = cn(), o = Qt(n.inputStyle), s = Qt(n.inputStyleTextinput || n.inputStyle), r = ue(null), i = ue({}), l = ue(!1), u = No(() => l.value ? {
      ...s,
      ...i.value
    } : {
      ...o,
      ...i.value
    }), p = ue(!0), d = No(() => p.value && n.textInputDisabled !== !0 ? n.inputPlaceholder : void 0), a = ue(null), g = () => {
      n.textInputDisabled !== !0 && a.value?.focus();
    };
    Ho(() => {
      g();
    });
    const y = ue({
      id: null,
      type: "text",
      entry: "Nochn Eintrag",
      status: "active"
    }), D = ue("none");
    _t(D, (Y) => {
      switch (Y) {
        case "none":
          n.fsm?.triggerEvent("NEXT_ENABLED");
          break;
        case "texting":
          n.fsm?.logEvent("TEXTINPUT_STARTED"), n.fsm?.triggerEvent("NEXT_DISABLED");
          break;
        case "recording":
          n.fsm?.logEvent("RECORD_STARTED"), n.fsm?.triggerEvent("NEXT_DISABLED");
          break;
        case "recording_ack":
          n.fsm?.logEvent("RECORD_STOPPED");
          break;
      }
    });
    const V = ue(""), X = (Y) => {
      const q = Y.target.value;
      V.value = q, q.length === 0 ? D.value !== "none" && (D.value = "none") : D.value !== "texting" && (D.value = "texting"), p.value && (p.value = !1);
    }, k = ue("");
    let I;
    const P = ue(Vu());
    _t(P, (Y) => {
      switch (Y) {
        case "not-supported":
          n.fsm?.logAndTriggerEvent("RECORD_NOT_SUPPORTED");
          break;
        case "denied":
          n.fsm?.logAndTriggerEvent("RECORD_DENIED");
          break;
        case "allowed":
          n.fsm?.logAndTriggerEvent("RECORD_ALLOWED");
          break;
        case "prompt":
          n.fsm?.logAndTriggerEvent("RECORD_PROMPT");
          break;
      }
    });
    const fe = () => {
      I || P.value === "not-supported" || P.value === "denied" || (k.value = "", Cu().then((Y) => {
        P.value = "allowed", I = $u(Y, (q) => {
          k.value = q, n.fsm?.logEvent({
            event: "RECORDING_RECEIVED",
            b64: q
          });
        }), D.value = "recording";
      }).catch(() => {
        P.value = "denied", se();
      }), i.value.height || (i.value.height = r.value.getBoundingClientRect().height + "px"));
    }, S = () => {
      I ? (Fs(I), I = void 0, D.value = "recording_ack") : se();
    }, Q = t, se = () => {
      I && (Fs(I), I = void 0), V.value = "", D.value = "none", Ro(g);
    }, ee = () => {
      if (D.value === "texting")
        y.value.type = "text", y.value.entry = V.value;
      else {
        if (!k.value)
          return;
        y.value.type = "audio", y.value.entry = k.value;
      }
      Q("addEntry", y.value), se();
    }, ce = () => {
      const Y = {
        event: "INPUT_DELETED",
        id: null,
        type: "audio"
      };
      D.value === "texting" && (Y.text = V.value, Y.type = "text"), n.fsm?.logEvent(Y), se();
    };
    return (Y, q) => (J(), re("div", {
      class: "outer",
      style: nn(u.value),
      ref_key: "outerDiv",
      ref: r
    }, [
      D.value === "none" || D.value === "texting" ? (J(), re("textarea", {
        key: 0,
        disabled: tt(n).textInputDisabled ? !0 : void 0,
        ref_key: "textareaRef",
        ref: a,
        value: V.value,
        onInput: X,
        placeholder: d.value,
        rows: tt(n).inputRows || 2,
        onKeydown: [
          Rs(st(ee, ["ctrl", "prevent"]), ["enter"]),
          Rs(st(ee, ["meta", "prevent"]), ["enter"])
        ],
        onFocus: q[0] || (q[0] = (Ee) => l.value = !0),
        onBlur: q[1] || (q[1] = (Ee) => l.value = !1)
      }, null, 40, Pu)) : He("", !0),
      D.value === "recording" ? (J(), re("div", Lu, [...q[2] || (q[2] = [
        we("div", null, "Aufnahme läuft", -1)
      ])])) : He("", !0),
      D.value === "recording_ack" ? (J(), re("div", Fu, [
        De(ei, {
          entry: k.value,
          id: null,
          style: { width: "100%" }
        }, null, 8, ["entry"])
      ])) : He("", !0),
      D.value == "texting" || D.value == "recording_ack" ? (J(), re("div", ju, [
        we("img", {
          src: tt(ti),
          onClick: st(ce, ["prevent"])
        }, null, 8, Hu)
      ])) : He("", !0),
      D.value === "texting" || D.value === "recording_ack" ? (J(), re("div", ku, [
        we("img", {
          src: tt(Ru),
          onClick: st(ee, ["prevent"])
        }, null, 8, Uu)
      ])) : He("", !0),
      D.value === "none" ? (J(), re("div", Bu, [
        we("img", {
          src: tt(Au),
          class: jn({ striked: P.value === "not-supported" }),
          onClick: st(fe, ["prevent"])
        }, null, 10, Ku)
      ])) : He("", !0),
      D.value === "recording" ? (J(), re("div", Wu, [
        we("img", {
          src: tt(Iu),
          onClick: st(S, ["prevent"])
        }, null, 8, Gu)
      ])) : He("", !0)
    ], 4));
  }
}), Yu = /* @__PURE__ */ un(Zu, [["__scopeId", "data-v-d7140728"]]), qu = /* @__PURE__ */ Tt({
  __name: "App",
  setup(e, { expose: t }) {
    const n = cn(), o = ue([]);
    t({
      chatList: o
      // Freigegebene Property
    });
    const s = (i) => {
      const l = o.value.findIndex((u) => u.id === i.id);
      l !== -1 && (o.value[l] = i);
    }, r = (i) => {
      const l = o.value.length + 1;
      o.value.push({
        ...i,
        id: l
      });
      const u = {
        event: "ENTRY_ADDED",
        id: l,
        type: i.type
      };
      i.type === "text" && (u.text = i.entry), n.fsm?.logEvent(u);
    };
    return (i, l) => (J(), re("div", null, [
      De(Du, {
        class: "list",
        list: o.value,
        onUpdateEntryValue: s
      }, null, 8, ["list"]),
      De(Yu, { onAddEntry: r })
    ]));
  }
}), Ju = /* @__PURE__ */ un(qu, [["__scopeId", "data-v-f4907ab0"]]);
function zu(e) {
  e.postMessagePayload && (e.fsm = {
    setVariable: (t, n) => {
      Array.isArray(n) && (n = n.join(",")), e.postMessagePayload?.({
        setVariable: {
          variableName: t,
          newValue: Number.isNaN(n) ? 0 : n.toString()
        }
      });
    },
    logEvent: (t) => e.postMessagePayload?.({
      traceMessage: typeof t == "string" ? { event: t } : t
    }),
    triggerEvent: (t) => e.postMessagePayload?.({
      microfinEvent: `EV_${t}`
    }),
    logAndTriggerEvent(t) {
      e.fsm.logEvent(t), e.fsm.triggerEvent(t);
    }
  });
}
function Xu(e) {
  const t = {}, n = lt(e) ? R(e) : e;
  for (const o in n)
    if (Object.prototype.hasOwnProperty.call(n, o)) {
      const s = n[o];
      z(s) ? t[o] = s.value : t[o] = s;
    }
  return t;
}
const ef = (e, t, n, o) => {
  o && (t.postMessagePayload = o), zu(t);
  const s = cu(Ju);
  s.use(hu, t);
  const i = s.mount(e);
  return n && _t(
    () => Xu(i),
    () => {
      n(i);
    },
    {
      deep: !0,
      // Überwacht auch Änderungen an verschachtelten Properties
      immediate: !0
      // Optional: Ruft das Callback sofort beim Mount auf
    }
  ), { app: s, state: i };
};
export {
  ef as initializeAndMount
};
