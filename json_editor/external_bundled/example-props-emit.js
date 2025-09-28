/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function We(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const W = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, gt = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], X = () => {
}, Es = () => !1, Kt = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), un = (e) => e.startsWith("onUpdate:"), Y = Object.assign, co = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Pr = Object.prototype.hasOwnProperty, j = (e, t) => Pr.call(e, t), $ = Array.isArray, mt = (e) => yn(e) === "[object Map]", Mr = (e) => yn(e) === "[object Set]", T = (e) => typeof e == "function", J = (e) => typeof e == "string", Et = (e) => typeof e == "symbol", k = (e) => e !== null && typeof e == "object", lo = (e) => (k(e) || T(e)) && T(e.then) && T(e.catch), Ar = Object.prototype.toString, yn = (e) => Ar.call(e), fo = (e) => yn(e).slice(8, -1), Ir = (e) => yn(e) === "[object Object]", uo = (e) => J(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Pt = /* @__PURE__ */ We(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Rr = /* @__PURE__ */ We(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), On = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, Fr = /-\w/g, Ne = On(
  (e) => e.replace(Fr, (t) => t.slice(1).toUpperCase())
), jr = /\B([A-Z])/g, Qe = On(
  (e) => e.replace(jr, "-$1").toLowerCase()
), Dn = On((e) => e.charAt(0).toUpperCase() + e.slice(1)), ot = On(
  (e) => e ? `on${Dn(e)}` : ""
), Xe = (e, t) => !Object.is(e, t), xt = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, an = (e, t, n, o = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: o,
    value: n
  });
}, Hr = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Ro;
const kt = () => Ro || (Ro = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function xn(e) {
  if ($(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], s = J(o) ? Wr(o) : xn(o);
      if (s)
        for (const r in s)
          t[r] = s[r];
    }
    return t;
  } else if (J(e) || k(e))
    return e;
}
const Lr = /;(?![^(]*\))/g, Ur = /:([^]+)/, Br = /\/\*[^]*?\*\//g;
function Wr(e) {
  const t = {};
  return e.replace(Br, "").split(Lr).forEach((n) => {
    if (n) {
      const o = n.split(Ur);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function ao(e) {
  let t = "";
  if (J(e))
    t = e;
  else if ($(e))
    for (let n = 0; n < e.length; n++) {
      const o = ao(e[n]);
      o && (t += o + " ");
    }
  else if (k(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Kr = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", kr = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", Gr = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", qr = /* @__PURE__ */ We(Kr), Jr = /* @__PURE__ */ We(kr), Yr = /* @__PURE__ */ We(Gr), zr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Xr = /* @__PURE__ */ We(zr);
function Ns(e) {
  return !!e || e === "";
}
/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Oe(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let ue;
class Zr {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = ue, !t && ue && (this.index = (ue.scopes || (ue.scopes = [])).push(
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
      const n = ue;
      try {
        return ue = this, t();
      } finally {
        ue = n;
      }
    } else process.env.NODE_ENV !== "production" && Oe("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = ue, ue = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (ue = this.prevScope, this.prevScope = void 0);
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
function Qr() {
  return ue;
}
let U;
const Rn = /* @__PURE__ */ new WeakSet();
class bs {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ue && ue.active && ue.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Rn.has(this) && (Rn.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Os(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Fo(this), Ds(this);
    const t = U, n = be;
    U = this, be = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && U !== this && Oe(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), xs(this), U = t, be = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        go(t);
      this.deps = this.depsTail = void 0, Fo(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Rn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    kn(this) && this.run();
  }
  get dirty() {
    return kn(this);
  }
}
let ys = 0, Mt, At;
function Os(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = At, At = e;
    return;
  }
  e.next = Mt, Mt = e;
}
function po() {
  ys++;
}
function ho() {
  if (--ys > 0)
    return;
  if (At) {
    let t = At;
    for (At = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Mt; ) {
    let t = Mt;
    for (Mt = void 0; t; ) {
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
function Ds(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function xs(e) {
  let t, n = e.depsTail, o = n;
  for (; o; ) {
    const s = o.prevDep;
    o.version === -1 ? (o === n && (n = s), go(o), ei(o)) : t = o, o.dep.activeLink = o.prevActiveLink, o.prevActiveLink = void 0, o = s;
  }
  e.deps = t, e.depsTail = n;
}
function kn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (ws(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function ws(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ht) || (e.globalVersion = Ht, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !kn(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = U, o = be;
  U = e, be = !0;
  try {
    Ds(e);
    const s = e.fn(e._value);
    (t.version === 0 || Xe(s, e._value)) && (e.flags |= 128, e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    U = n, be = o, xs(e), e.flags &= -3;
  }
}
function go(e, t = !1) {
  const { dep: n, prevSub: o, nextSub: s } = e;
  if (o && (o.nextSub = s, e.prevSub = void 0), s && (s.prevSub = o, e.nextSub = void 0), process.env.NODE_ENV !== "production" && n.subsHead === e && (n.subsHead = s), n.subs === e && (n.subs = o, !o && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep)
      go(r, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function ei(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let be = !0;
const Vs = [];
function De() {
  Vs.push(be), be = !1;
}
function xe() {
  const e = Vs.pop();
  be = e === void 0 ? !0 : e;
}
function Fo(e) {
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
let Ht = 0;
class ti {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class mo {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!U || !be || U === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== U)
      n = this.activeLink = new ti(U, this), U.deps ? (n.prevDep = U.depsTail, U.depsTail.nextDep = n, U.depsTail = n) : U.deps = U.depsTail = n, Ss(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const o = n.nextDep;
      o.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = o), n.prevDep = U.depsTail, n.nextDep = void 0, U.depsTail.nextDep = n, U.depsTail = n, U.deps === n && (U.deps = o);
    }
    return process.env.NODE_ENV !== "production" && U.onTrack && U.onTrack(
      Y(
        {
          effect: U
        },
        t
      )
    ), n;
  }
  trigger(t) {
    this.version++, Ht++, this.notify(t);
  }
  notify(t) {
    po();
    try {
      if (process.env.NODE_ENV !== "production")
        for (let n = this.subsHead; n; n = n.nextSub)
          n.sub.onTrigger && !(n.sub.flags & 8) && n.sub.onTrigger(
            Y(
              {
                effect: n.sub
              },
              t
            )
          );
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      ho();
    }
  }
}
function Ss(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let o = t.deps; o; o = o.nextDep)
        Ss(o);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const Gn = /* @__PURE__ */ new WeakMap(), rt = Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), qn = Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), Lt = Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function z(e, t, n) {
  if (be && U) {
    let o = Gn.get(e);
    o || Gn.set(e, o = /* @__PURE__ */ new Map());
    let s = o.get(n);
    s || (o.set(n, s = new mo()), s.map = o, s.key = n), process.env.NODE_ENV !== "production" ? s.track({
      target: e,
      type: t,
      key: n
    }) : s.track();
  }
}
function Me(e, t, n, o, s, r) {
  const i = Gn.get(e);
  if (!i) {
    Ht++;
    return;
  }
  const c = (u) => {
    u && (process.env.NODE_ENV !== "production" ? u.trigger({
      target: e,
      type: t,
      key: n,
      newValue: o,
      oldValue: s,
      oldTarget: r
    }) : u.trigger());
  };
  if (po(), t === "clear")
    i.forEach(c);
  else {
    const u = $(e), d = u && uo(n);
    if (u && n === "length") {
      const p = Number(o);
      i.forEach((a, g) => {
        (g === "length" || g === Lt || !Et(g) && g >= p) && c(a);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && c(i.get(n)), d && c(i.get(Lt)), t) {
        case "add":
          u ? d && c(i.get("length")) : (c(i.get(rt)), mt(e) && c(i.get(qn)));
          break;
        case "delete":
          u || (c(i.get(rt)), mt(e) && c(i.get(qn)));
          break;
        case "set":
          mt(e) && c(i.get(rt));
          break;
      }
  }
  ho();
}
function at(e) {
  const t = A(e);
  return t === e ? t : (z(t, "iterate", Lt), ae(e) ? t : t.map(se));
}
function _o(e) {
  return z(e = A(e), "iterate", Lt), e;
}
const ni = {
  __proto__: null,
  [Symbol.iterator]() {
    return Fn(this, Symbol.iterator, se);
  },
  concat(...e) {
    return at(this).concat(
      ...e.map((t) => $(t) ? at(t) : t)
    );
  },
  entries() {
    return Fn(this, "entries", (e) => (e[1] = se(e[1]), e));
  },
  every(e, t) {
    return je(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return je(this, "filter", e, t, (n) => n.map(se), arguments);
  },
  find(e, t) {
    return je(this, "find", e, t, se, arguments);
  },
  findIndex(e, t) {
    return je(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return je(this, "findLast", e, t, se, arguments);
  },
  findLastIndex(e, t) {
    return je(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return je(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return jn(this, "includes", e);
  },
  indexOf(...e) {
    return jn(this, "indexOf", e);
  },
  join(e) {
    return at(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return jn(this, "lastIndexOf", e);
  },
  map(e, t) {
    return je(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return wt(this, "pop");
  },
  push(...e) {
    return wt(this, "push", e);
  },
  reduce(e, ...t) {
    return jo(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return jo(this, "reduceRight", e, t);
  },
  shift() {
    return wt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return je(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return wt(this, "splice", e);
  },
  toReversed() {
    return at(this).toReversed();
  },
  toSorted(e) {
    return at(this).toSorted(e);
  },
  toSpliced(...e) {
    return at(this).toSpliced(...e);
  },
  unshift(...e) {
    return wt(this, "unshift", e);
  },
  values() {
    return Fn(this, "values", se);
  }
};
function Fn(e, t, n) {
  const o = _o(e), s = o[t]();
  return o !== e && !ae(e) && (s._next = s.next, s.next = () => {
    const r = s._next();
    return r.done || (r.value = n(r.value)), r;
  }), s;
}
const oi = Array.prototype;
function je(e, t, n, o, s, r) {
  const i = _o(e), c = i !== e && !ae(e), u = i[t];
  if (u !== oi[t]) {
    const a = u.apply(e, r);
    return c ? se(a) : a;
  }
  let d = n;
  i !== e && (c ? d = function(a, g) {
    return n.call(this, se(a), g, e);
  } : n.length > 2 && (d = function(a, g) {
    return n.call(this, a, g, e);
  }));
  const p = u.call(i, d, o);
  return c && s ? s(p) : p;
}
function jo(e, t, n, o) {
  const s = _o(e);
  let r = n;
  return s !== e && (ae(e) ? n.length > 3 && (r = function(i, c, u) {
    return n.call(this, i, c, u, e);
  }) : r = function(i, c, u) {
    return n.call(this, i, se(c), u, e);
  }), s[t](r, ...o);
}
function jn(e, t, n) {
  const o = A(e);
  z(o, "iterate", Lt);
  const s = o[t](...n);
  return (s === -1 || s === !1) && pn(n[0]) ? (n[0] = A(n[0]), o[t](...n)) : s;
}
function wt(e, t, n = []) {
  De(), po();
  const o = A(e)[t].apply(e, n);
  return ho(), xe(), o;
}
const si = /* @__PURE__ */ We("__proto__,__v_isRef,__isVue"), Cs = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Et)
);
function ri(e) {
  Et(e) || (e = String(e));
  const t = A(this);
  return z(t, "has", e), t.hasOwnProperty(e);
}
class Ts {
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
      return o === (s ? r ? Rs : Is : r ? As : Ms).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const i = $(t);
    if (!s) {
      let u;
      if (i && (u = ni[n]))
        return u;
      if (n === "hasOwnProperty")
        return ri;
    }
    const c = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      q(t) ? t : o
    );
    if ((Et(n) ? Cs.has(n) : si(n)) || (s || z(t, "get", n), r))
      return c;
    if (q(c)) {
      const u = i && uo(n) ? c : c.value;
      return s && k(u) ? Yn(u) : u;
    }
    return k(c) ? s ? Yn(c) : vo(c) : c;
  }
}
class $s extends Ts {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, o, s) {
    let r = t[n];
    if (!this._isShallow) {
      const u = Be(r);
      if (!ae(o) && !Be(o) && (r = A(r), o = A(o)), !$(t) && q(r) && !q(o))
        return u ? (process.env.NODE_ENV !== "production" && Oe(
          `Set operation on key "${String(n)}" failed: target is readonly.`,
          t[n]
        ), !0) : (r.value = o, !0);
    }
    const i = $(t) && uo(n) ? Number(n) < t.length : j(t, n), c = Reflect.set(
      t,
      n,
      o,
      q(t) ? t : s
    );
    return t === A(s) && (i ? Xe(o, r) && Me(t, "set", n, o, r) : Me(t, "add", n, o)), c;
  }
  deleteProperty(t, n) {
    const o = j(t, n), s = t[n], r = Reflect.deleteProperty(t, n);
    return r && o && Me(t, "delete", n, void 0, s), r;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!Et(n) || !Cs.has(n)) && z(t, "has", n), o;
  }
  ownKeys(t) {
    return z(
      t,
      "iterate",
      $(t) ? "length" : rt
    ), Reflect.ownKeys(t);
  }
}
class Ps extends Ts {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && Oe(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && Oe(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const ii = /* @__PURE__ */ new $s(), ci = /* @__PURE__ */ new Ps(), li = /* @__PURE__ */ new $s(!0), fi = /* @__PURE__ */ new Ps(!0), Jn = (e) => e, Zt = (e) => Reflect.getPrototypeOf(e);
function ui(e, t, n) {
  return function(...o) {
    const s = this.__v_raw, r = A(s), i = mt(r), c = e === "entries" || e === Symbol.iterator && i, u = e === "keys" && i, d = s[e](...o), p = n ? Jn : t ? zn : se;
    return !t && z(
      r,
      "iterate",
      u ? qn : rt
    ), {
      // iterator protocol
      next() {
        const { value: a, done: g } = d.next();
        return g ? { value: a, done: g } : {
          value: c ? [p(a[0]), p(a[1])] : p(a),
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
function Qt(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      Oe(
        `${Dn(e)} operation ${n}failed: target is readonly.`,
        A(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function ai(e, t) {
  const n = {
    get(s) {
      const r = this.__v_raw, i = A(r), c = A(s);
      e || (Xe(s, c) && z(i, "get", s), z(i, "get", c));
      const { has: u } = Zt(i), d = t ? Jn : e ? zn : se;
      if (u.call(i, s))
        return d(r.get(s));
      if (u.call(i, c))
        return d(r.get(c));
      r !== i && r.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !e && z(A(s), "iterate", rt), s.size;
    },
    has(s) {
      const r = this.__v_raw, i = A(r), c = A(s);
      return e || (Xe(s, c) && z(i, "has", s), z(i, "has", c)), s === c ? r.has(s) : r.has(s) || r.has(c);
    },
    forEach(s, r) {
      const i = this, c = i.__v_raw, u = A(c), d = t ? Jn : e ? zn : se;
      return !e && z(u, "iterate", rt), c.forEach((p, a) => s.call(r, d(p), d(a), i));
    }
  };
  return Y(
    n,
    e ? {
      add: Qt("add"),
      set: Qt("set"),
      delete: Qt("delete"),
      clear: Qt("clear")
    } : {
      add(s) {
        !t && !ae(s) && !Be(s) && (s = A(s));
        const r = A(this);
        return Zt(r).has.call(r, s) || (r.add(s), Me(r, "add", s, s)), this;
      },
      set(s, r) {
        !t && !ae(r) && !Be(r) && (r = A(r));
        const i = A(this), { has: c, get: u } = Zt(i);
        let d = c.call(i, s);
        d ? process.env.NODE_ENV !== "production" && Ho(i, c, s) : (s = A(s), d = c.call(i, s));
        const p = u.call(i, s);
        return i.set(s, r), d ? Xe(r, p) && Me(i, "set", s, r, p) : Me(i, "add", s, r), this;
      },
      delete(s) {
        const r = A(this), { has: i, get: c } = Zt(r);
        let u = i.call(r, s);
        u ? process.env.NODE_ENV !== "production" && Ho(r, i, s) : (s = A(s), u = i.call(r, s));
        const d = c ? c.call(r, s) : void 0, p = r.delete(s);
        return u && Me(r, "delete", s, void 0, d), p;
      },
      clear() {
        const s = A(this), r = s.size !== 0, i = process.env.NODE_ENV !== "production" ? mt(s) ? new Map(s) : new Set(s) : void 0, c = s.clear();
        return r && Me(
          s,
          "clear",
          void 0,
          void 0,
          i
        ), c;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((s) => {
    n[s] = ui(s, e, t);
  }), n;
}
function wn(e, t) {
  const n = ai(e, t);
  return (o, s, r) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get(
    j(n, s) && s in o ? n : o,
    s,
    r
  );
}
const pi = {
  get: /* @__PURE__ */ wn(!1, !1)
}, di = {
  get: /* @__PURE__ */ wn(!1, !0)
}, hi = {
  get: /* @__PURE__ */ wn(!0, !1)
}, gi = {
  get: /* @__PURE__ */ wn(!0, !0)
};
function Ho(e, t, n) {
  const o = A(n);
  if (o !== n && t.call(e, o)) {
    const s = fo(e);
    Oe(
      `Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Ms = /* @__PURE__ */ new WeakMap(), As = /* @__PURE__ */ new WeakMap(), Is = /* @__PURE__ */ new WeakMap(), Rs = /* @__PURE__ */ new WeakMap();
function mi(e) {
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
function _i(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : mi(fo(e));
}
function vo(e) {
  return Be(e) ? e : Vn(
    e,
    !1,
    ii,
    pi,
    Ms
  );
}
function vi(e) {
  return Vn(
    e,
    !1,
    li,
    di,
    As
  );
}
function Yn(e) {
  return Vn(
    e,
    !0,
    ci,
    hi,
    Is
  );
}
function Ae(e) {
  return Vn(
    e,
    !0,
    fi,
    gi,
    Rs
  );
}
function Vn(e, t, n, o, s) {
  if (!k(e))
    return process.env.NODE_ENV !== "production" && Oe(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = _i(e);
  if (r === 0)
    return e;
  const i = s.get(e);
  if (i)
    return i;
  const c = new Proxy(
    e,
    r === 2 ? o : n
  );
  return s.set(e, c), c;
}
function it(e) {
  return Be(e) ? it(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Be(e) {
  return !!(e && e.__v_isReadonly);
}
function ae(e) {
  return !!(e && e.__v_isShallow);
}
function pn(e) {
  return e ? !!e.__v_raw : !1;
}
function A(e) {
  const t = e && e.__v_raw;
  return t ? A(t) : e;
}
function Ei(e) {
  return !j(e, "__v_skip") && Object.isExtensible(e) && an(e, "__v_skip", !0), e;
}
const se = (e) => k(e) ? vo(e) : e, zn = (e) => k(e) ? Yn(e) : e;
function q(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function Ni(e) {
  return bi(e, !1);
}
function bi(e, t) {
  return q(e) ? e : new yi(e, t);
}
class yi {
  constructor(t, n) {
    this.dep = new mo(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : A(t), this._value = n ? t : se(t), this.__v_isShallow = n;
  }
  get value() {
    return process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, o = this.__v_isShallow || ae(t) || Be(t);
    t = o ? t : A(t), Xe(t, n) && (this._rawValue = t, this._value = o ? t : se(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }) : this.dep.trigger());
  }
}
function Ct(e) {
  return q(e) ? e.value : e;
}
const Oi = {
  get: (e, t, n) => t === "__v_raw" ? e : Ct(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const s = e[t];
    return q(s) && !q(n) ? (s.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function Fs(e) {
  return it(e) ? e : new Proxy(e, Oi);
}
class Di {
  constructor(t, n, o) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new mo(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ht - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = o;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    U !== this)
      return Os(this, !0), !0;
    process.env.NODE_ENV;
  }
  get value() {
    const t = process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track();
    return ws(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter ? this.setter(t) : process.env.NODE_ENV !== "production" && Oe("Write operation failed: computed value is readonly");
  }
}
function xi(e, t, n = !1) {
  let o, s;
  T(e) ? o = e : (o = e.get, s = e.set);
  const r = new Di(o, s, n);
  return process.env.NODE_ENV, r;
}
const en = {}, dn = /* @__PURE__ */ new WeakMap();
let st;
function wi(e, t = !1, n = st) {
  if (n) {
    let o = dn.get(n);
    o || dn.set(n, o = []), o.push(e);
  } else process.env.NODE_ENV !== "production" && !t && Oe(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function Vi(e, t, n = W) {
  const { immediate: o, deep: s, once: r, scheduler: i, augmentJob: c, call: u } = n, d = (S) => {
    (n.onWarn || Oe)(
      "Invalid watch source: ",
      S,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, p = (S) => s ? S : ae(S) || s === !1 || s === 0 ? ze(S, 1) : ze(S);
  let a, g, D, P, V = !1, Z = !1;
  if (q(e) ? (g = () => e.value, V = ae(e)) : it(e) ? (g = () => p(e), V = !0) : $(e) ? (Z = !0, V = e.some((S) => it(S) || ae(S)), g = () => e.map((S) => {
    if (q(S))
      return S.value;
    if (it(S))
      return p(S);
    if (T(S))
      return u ? u(S, 2) : S();
    process.env.NODE_ENV !== "production" && d(S);
  })) : T(e) ? t ? g = u ? () => u(e, 2) : e : g = () => {
    if (D) {
      De();
      try {
        D();
      } finally {
        xe();
      }
    }
    const S = st;
    st = a;
    try {
      return u ? u(e, 3, [P]) : e(P);
    } finally {
      st = S;
    }
  } : (g = X, process.env.NODE_ENV !== "production" && d(e)), t && s) {
    const S = g, Q = s === !0 ? 1 / 0 : s;
    g = () => ze(S(), Q);
  }
  const G = Qr(), L = () => {
    a.stop(), G && G.active && co(G.effects, a);
  };
  if (r && t) {
    const S = t;
    t = (...Q) => {
      S(...Q), L();
    };
  }
  let H = Z ? new Array(e.length).fill(en) : en;
  const pe = (S) => {
    if (!(!(a.flags & 1) || !a.dirty && !S))
      if (t) {
        const Q = a.run();
        if (s || V || (Z ? Q.some((me, te) => Xe(me, H[te])) : Xe(Q, H))) {
          D && D();
          const me = st;
          st = a;
          try {
            const te = [
              Q,
              // pass undefined as the old value when it's changed for the first time
              H === en ? void 0 : Z && H[0] === en ? [] : H,
              P
            ];
            H = Q, u ? u(t, 3, te) : (
              // @ts-expect-error
              t(...te)
            );
          } finally {
            st = me;
          }
        }
      } else
        a.run();
  };
  return c && c(pe), a = new bs(g), a.scheduler = i ? () => i(pe, !1) : pe, P = (S) => wi(S, !1, a), D = a.onStop = () => {
    const S = dn.get(a);
    if (S) {
      if (u)
        u(S, 4);
      else
        for (const Q of S) Q();
      dn.delete(a);
    }
  }, process.env.NODE_ENV !== "production" && (a.onTrack = n.onTrack, a.onTrigger = n.onTrigger), t ? o ? pe(!0) : H = a.run() : i ? i(pe.bind(null, !0), !0) : a.run(), L.pause = a.pause.bind(a), L.resume = a.resume.bind(a), L.stop = L, L;
}
function ze(e, t = 1 / 0, n) {
  if (t <= 0 || !k(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, q(e))
    ze(e.value, t, n);
  else if ($(e))
    for (let o = 0; o < e.length; o++)
      ze(e[o], t, n);
  else if (Mr(e) || mt(e))
    e.forEach((o) => {
      ze(o, t, n);
    });
  else if (Ir(e)) {
    for (const o in e)
      ze(e[o], t, n);
    for (const o of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, o) && ze(e[o], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const ct = [];
function tn(e) {
  ct.push(e);
}
function nn() {
  ct.pop();
}
let Hn = !1;
function y(e, ...t) {
  if (Hn) return;
  Hn = !0, De();
  const n = ct.length ? ct[ct.length - 1].component : null, o = n && n.appContext.config.warnHandler, s = Si();
  if (o)
    Nt(
      o,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((r) => {
          var i, c;
          return (c = (i = r.toString) == null ? void 0 : i.call(r)) != null ? c : JSON.stringify(r);
        }).join(""),
        n && n.proxy,
        s.map(
          ({ vnode: r }) => `at <${Pn(n, r.type)}>`
        ).join(`
`),
        s
      ]
    );
  else {
    const r = [`[Vue warn]: ${e}`, ...t];
    s.length && r.push(`
`, ...Ci(s)), console.warn(...r);
  }
  xe(), Hn = !1;
}
function Si() {
  let e = ct[ct.length - 1];
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
function Ci(e) {
  const t = [];
  return e.forEach((n, o) => {
    t.push(...o === 0 ? [] : [`
`], ...Ti(n));
  }), t;
}
function Ti({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, s = ` at <${Pn(
    e.component,
    e.type,
    o
  )}`, r = ">" + n;
  return e.props ? [s, ...$i(e.props), r] : [s + r];
}
function $i(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((o) => {
    t.push(...js(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function js(e, t, n) {
  return J(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : q(t) ? (t = js(e, A(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : T(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = A(t), n ? t : [`${e}=`, t]);
}
const Eo = {
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
function Nt(e, t, n, o) {
  try {
    return o ? e(...o) : e();
  } catch (s) {
    Gt(s, t, n);
  }
}
function Re(e, t, n, o) {
  if (T(e)) {
    const s = Nt(e, t, n, o);
    return s && lo(s) && s.catch((r) => {
      Gt(r, t, n);
    }), s;
  }
  if ($(e)) {
    const s = [];
    for (let r = 0; r < e.length; r++)
      s.push(Re(e[r], t, n, o));
    return s;
  } else process.env.NODE_ENV !== "production" && y(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function Gt(e, t, n, o = !0) {
  const s = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: i } = t && t.appContext.config || W;
  if (t) {
    let c = t.parent;
    const u = t.proxy, d = process.env.NODE_ENV !== "production" ? Eo[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; c; ) {
      const p = c.ec;
      if (p) {
        for (let a = 0; a < p.length; a++)
          if (p[a](e, u, d) === !1)
            return;
      }
      c = c.parent;
    }
    if (r) {
      De(), Nt(r, null, 10, [
        e,
        u,
        d
      ]), xe();
      return;
    }
  }
  Pi(e, n, s, o, i);
}
function Pi(e, t, n, o = !0, s = !1) {
  if (process.env.NODE_ENV !== "production") {
    const r = Eo[t];
    if (n && tn(n), y(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && nn(), o)
      throw e;
    console.error(e);
  } else {
    if (s)
      throw e;
    console.error(e);
  }
}
const re = [];
let $e = -1;
const _t = [];
let Je = null, ht = 0;
const Hs = /* @__PURE__ */ Promise.resolve();
let hn = null;
const Mi = 100;
function Ai(e) {
  const t = hn || Hs;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ii(e) {
  let t = $e + 1, n = re.length;
  for (; t < n; ) {
    const o = t + n >>> 1, s = re[o], r = Ut(s);
    r < e || r === e && s.flags & 2 ? t = o + 1 : n = o;
  }
  return t;
}
function Sn(e) {
  if (!(e.flags & 1)) {
    const t = Ut(e), n = re[re.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Ut(n) ? re.push(e) : re.splice(Ii(t), 0, e), e.flags |= 1, Ls();
  }
}
function Ls() {
  hn || (hn = Hs.then(Ws));
}
function Us(e) {
  $(e) ? _t.push(...e) : Je && e.id === -1 ? Je.splice(ht + 1, 0, e) : e.flags & 1 || (_t.push(e), e.flags |= 1), Ls();
}
function Lo(e, t, n = $e + 1) {
  for (process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()); n < re.length; n++) {
    const o = re[n];
    if (o && o.flags & 2) {
      if (e && o.id !== e.uid || process.env.NODE_ENV !== "production" && No(t, o))
        continue;
      re.splice(n, 1), n--, o.flags & 4 && (o.flags &= -2), o(), o.flags & 4 || (o.flags &= -2);
    }
  }
}
function Bs(e) {
  if (_t.length) {
    const t = [...new Set(_t)].sort(
      (n, o) => Ut(n) - Ut(o)
    );
    if (_t.length = 0, Je) {
      Je.push(...t);
      return;
    }
    for (Je = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), ht = 0; ht < Je.length; ht++) {
      const n = Je[ht];
      process.env.NODE_ENV !== "production" && No(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    Je = null, ht = 0;
  }
}
const Ut = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Ws(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => No(e, n) : X;
  try {
    for ($e = 0; $e < re.length; $e++) {
      const n = re[$e];
      if (n && !(n.flags & 8)) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        n.flags & 4 && (n.flags &= -2), Nt(
          n,
          n.i,
          n.i ? 15 : 14
        ), n.flags & 4 || (n.flags &= -2);
      }
    }
  } finally {
    for (; $e < re.length; $e++) {
      const n = re[$e];
      n && (n.flags &= -2);
    }
    $e = -1, re.length = 0, Bs(e), hn = null, (re.length || _t.length) && Ws(e);
  }
}
function No(e, t) {
  const n = e.get(t) || 0;
  if (n > Mi) {
    const o = t.i, s = o && wr(o.type);
    return Gt(
      `Maximum recursive updates exceeded${s ? ` in component <${s}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
let Ie = !1;
const on = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (kt().__VUE_HMR_RUNTIME__ = {
  createRecord: Ln(Ks),
  rerender: Ln(ji),
  reload: Ln(Hi)
});
const ft = /* @__PURE__ */ new Map();
function Ri(e) {
  const t = e.type.__hmrId;
  let n = ft.get(t);
  n || (Ks(t, e.type), n = ft.get(t)), n.instances.add(e);
}
function Fi(e) {
  ft.get(e.type.__hmrId).instances.delete(e);
}
function Ks(e, t) {
  return ft.has(e) ? !1 : (ft.set(e, {
    initialDef: gn(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function gn(e) {
  return Vr(e) ? e.__vccOpts : e;
}
function ji(e, t) {
  const n = ft.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, gn(o.type).render = t), o.renderCache = [], Ie = !0, o.job.flags & 8 || o.update(), Ie = !1;
  }));
}
function Hi(e, t) {
  const n = ft.get(e);
  if (!n) return;
  t = gn(t), Uo(n.initialDef, t);
  const o = [...n.instances];
  for (let s = 0; s < o.length; s++) {
    const r = o[s], i = gn(r.type);
    let c = on.get(i);
    c || (i !== n.initialDef && Uo(i, t), on.set(i, c = /* @__PURE__ */ new Set())), c.add(r), r.appContext.propsCache.delete(r.type), r.appContext.emitsCache.delete(r.type), r.appContext.optionsCache.delete(r.type), r.ceReload ? (c.add(r), r.ceReload(t.styles), c.delete(r)) : r.parent ? Sn(() => {
      r.job.flags & 8 || (Ie = !0, r.parent.update(), Ie = !1, c.delete(r));
    }) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), r.root.ce && r !== r.root && r.root.ce._removeChildStyle(i);
  }
  Us(() => {
    on.clear();
  });
}
function Uo(e, t) {
  Y(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Ln(e) {
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
let Ee, Tt = [], Xn = !1;
function qt(e, ...t) {
  Ee ? Ee.emit(e, ...t) : Xn || Tt.push({ event: e, args: t });
}
function bo(e, t) {
  var n, o;
  Ee = e, Ee ? (Ee.enabled = !0, Tt.forEach(({ event: s, args: r }) => Ee.emit(s, ...r)), Tt = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((o = (n = window.navigator) == null ? void 0 : n.userAgent) != null && o.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((r) => {
    bo(r, t);
  }), setTimeout(() => {
    Ee || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Xn = !0, Tt = []);
  }, 3e3)) : (Xn = !0, Tt = []);
}
function Li(e, t) {
  qt("app:init", e, t, {
    Fragment: Pe,
    Text: Jt,
    Comment: ye,
    Static: cn
  });
}
function Ui(e) {
  qt("app:unmount", e);
}
const Bi = /* @__PURE__ */ yo(
  "component:added"
  /* COMPONENT_ADDED */
), ks = /* @__PURE__ */ yo(
  "component:updated"
  /* COMPONENT_UPDATED */
), Wi = /* @__PURE__ */ yo(
  "component:removed"
  /* COMPONENT_REMOVED */
), Ki = (e) => {
  Ee && typeof Ee.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !Ee.cleanupBuffer(e) && Wi(e);
};
// @__NO_SIDE_EFFECTS__
function yo(e) {
  return (t) => {
    qt(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
const ki = /* @__PURE__ */ Gs(
  "perf:start"
  /* PERFORMANCE_START */
), Gi = /* @__PURE__ */ Gs(
  "perf:end"
  /* PERFORMANCE_END */
);
function Gs(e) {
  return (t, n, o) => {
    qt(e, t.appContext.app, t.uid, t, n, o);
  };
}
function qi(e, t, n) {
  qt(
    "component:emit",
    e.appContext.app,
    e,
    t,
    n
  );
}
let he = null, qs = null;
function mn(e) {
  const t = he;
  return he = e, qs = e && e.type.__scopeId || null, t;
}
function Ji(e, t = he, n) {
  if (!t || e._n)
    return e;
  const o = (...s) => {
    o._d && ts(-1);
    const r = mn(t);
    let i;
    try {
      i = e(...s);
    } finally {
      mn(r), o._d && ts(1);
    }
    return process.env.NODE_ENV !== "production" && ks(t), i;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function Js(e) {
  Rr(e) && y("Do not use built-in directive ids as custom directive id: " + e);
}
function tt(e, t, n, o) {
  const s = e.dirs, r = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    r && (c.oldValue = r[i].value);
    let u = c.dir[o];
    u && (De(), Re(u, n, 8, [
      e.el,
      c,
      e,
      t
    ]), xe());
  }
}
const Yi = Symbol("_vte"), zi = (e) => e.__isTeleport, Xi = Symbol("_leaveCb");
function Oo(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Oo(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Ys(e, t) {
  return T(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Y({ name: e.name }, t, { setup: e })
  ) : e;
}
function zs(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const Bo = /* @__PURE__ */ new WeakSet(), _n = /* @__PURE__ */ new WeakMap();
function It(e, t, n, o, s = !1) {
  if ($(e)) {
    e.forEach(
      (V, Z) => It(
        V,
        t && ($(t) ? t[Z] : t),
        n,
        o,
        s
      )
    );
    return;
  }
  if (Rt(o) && !s) {
    o.shapeFlag & 512 && o.type.__asyncResolved && o.component.subTree.component && It(e, t, n, o.component.subTree);
    return;
  }
  const r = o.shapeFlag & 4 ? To(o.component) : o.el, i = s ? null : r, { i: c, r: u } = e;
  if (process.env.NODE_ENV !== "production" && !c) {
    y(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const d = t && t.r, p = c.refs === W ? c.refs = {} : c.refs, a = c.setupState, g = A(a), D = a === W ? Es : (V) => process.env.NODE_ENV !== "production" && (j(g, V) && !q(g[V]) && y(
    `Template ref "${V}" used on a non-ref value. It will not work in the production build.`
  ), Bo.has(g[V])) ? !1 : j(g, V), P = (V) => process.env.NODE_ENV === "production" || !Bo.has(V);
  if (d != null && d !== u) {
    if (Wo(t), J(d))
      p[d] = null, D(d) && (a[d] = null);
    else if (q(d)) {
      P(d) && (d.value = null);
      const V = t;
      V.k && (p[V.k] = null);
    }
  }
  if (T(u))
    Nt(u, c, 12, [i, p]);
  else {
    const V = J(u), Z = q(u);
    if (V || Z) {
      const G = () => {
        if (e.f) {
          const L = V ? D(u) ? a[u] : p[u] : P(u) || !e.k ? u.value : p[e.k];
          if (s)
            $(L) && co(L, r);
          else if ($(L))
            L.includes(r) || L.push(r);
          else if (V)
            p[u] = [r], D(u) && (a[u] = p[u]);
          else {
            const H = [r];
            P(u) && (u.value = H), e.k && (p[e.k] = H);
          }
        } else V ? (p[u] = i, D(u) && (a[u] = i)) : Z ? (P(u) && (u.value = i), e.k && (p[e.k] = i)) : process.env.NODE_ENV !== "production" && y("Invalid template ref type:", u, `(${typeof u})`);
      };
      if (i) {
        const L = () => {
          G(), _n.delete(e);
        };
        L.id = -1, _n.set(e, L), de(L, n);
      } else
        Wo(e), G();
    } else process.env.NODE_ENV !== "production" && y("Invalid template ref type:", u, `(${typeof u})`);
  }
}
function Wo(e) {
  const t = _n.get(e);
  t && (t.flags |= 8, _n.delete(e));
}
kt().requestIdleCallback;
kt().cancelIdleCallback;
const Rt = (e) => !!e.type.__asyncLoader, Do = (e) => e.type.__isKeepAlive;
function Zi(e, t) {
  Xs(e, "a", t);
}
function Qi(e, t) {
  Xs(e, "da", t);
}
function Xs(e, t, n = ee) {
  const o = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if (Cn(t, o, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      Do(s.parent.vnode) && ec(o, t, n, s), s = s.parent;
  }
}
function ec(e, t, n, o) {
  const s = Cn(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  Zs(() => {
    co(o[t], s);
  }, n);
}
function Cn(e, t, n = ee, o = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...i) => {
      De();
      const c = Yt(n), u = Re(t, n, e, i);
      return c(), xe(), u;
    });
    return o ? s.unshift(r) : s.push(r), r;
  } else if (process.env.NODE_ENV !== "production") {
    const s = ot(Eo[e].replace(/ hook$/, ""));
    y(
      `${s} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const Ke = (e) => (t, n = ee) => {
  (!Wt || e === "sp") && Cn(e, (...o) => t(...o), n);
}, tc = Ke("bm"), nc = Ke("m"), oc = Ke(
  "bu"
), sc = Ke("u"), rc = Ke(
  "bum"
), Zs = Ke("um"), ic = Ke(
  "sp"
), cc = Ke("rtg"), lc = Ke("rtc");
function fc(e, t = ee) {
  Cn("ec", e, t);
}
const uc = Symbol.for("v-ndc"), Zn = (e) => e ? Dr(e) ? To(e) : Zn(e.parent) : null, lt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Y(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? Ae(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? Ae(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? Ae(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? Ae(e.refs) : e.refs,
    $parent: (e) => Zn(e.parent),
    $root: (e) => Zn(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => tr(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Sn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Ai.bind(e.proxy)),
    $watch: (e) => Wc.bind(e)
  })
), xo = (e) => e === "_" || e === "$", Un = (e, t) => e !== W && !e.__isScriptSetup && j(e, t), Qs = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: o, data: s, props: r, accessCache: i, type: c, appContext: u } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let d;
    if (t[0] !== "$") {
      const D = i[t];
      if (D !== void 0)
        switch (D) {
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
        if (Un(o, t))
          return i[t] = 1, o[t];
        if (s !== W && j(s, t))
          return i[t] = 2, s[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (d = e.propsOptions[0]) && j(d, t)
        )
          return i[t] = 3, r[t];
        if (n !== W && j(n, t))
          return i[t] = 4, n[t];
        Qn && (i[t] = 0);
      }
    }
    const p = lt[t];
    let a, g;
    if (p)
      return t === "$attrs" ? (z(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && Nn()) : process.env.NODE_ENV !== "production" && t === "$slots" && z(e, "get", t), p(e);
    if (
      // css module (injected by vue-loader)
      (a = c.__cssModules) && (a = a[t])
    )
      return a;
    if (n !== W && j(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      g = u.config.globalProperties, j(g, t)
    )
      return g[t];
    process.env.NODE_ENV !== "production" && he && (!J(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (s !== W && xo(t[0]) && j(s, t) ? y(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === he && y(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: s, ctx: r } = e;
    return Un(s, t) ? (s[t] = n, !0) : process.env.NODE_ENV !== "production" && s.__isScriptSetup && j(s, t) ? (y(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : o !== W && j(o, t) ? (o[t] = n, !0) : j(e.props, t) ? (process.env.NODE_ENV !== "production" && y(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && y(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(r, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : r[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: s, propsOptions: r, type: i }
  }, c) {
    let u, d;
    return !!(n[c] || e !== W && c[0] !== "$" && j(e, c) || Un(t, c) || (u = r[0]) && j(u, c) || j(o, c) || j(lt, c) || j(s.config.globalProperties, c) || (d = i.__cssModules) && d[c]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : j(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (Qs.ownKeys = (e) => (y(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function ac(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys(lt).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => lt[n](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: X
    });
  }), t;
}
function pc(e) {
  const {
    ctx: t,
    propsOptions: [n]
  } = e;
  n && Object.keys(n).forEach((o) => {
    Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[o],
      set: X
    });
  });
}
function dc(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(A(n)).forEach((o) => {
    if (!n.__isScriptSetup) {
      if (xo(o[0])) {
        y(
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
        set: X
      });
    }
  });
}
function Ko(e) {
  return $(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function hc() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? y(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let Qn = !0;
function gc(e) {
  const t = tr(e), n = e.proxy, o = e.ctx;
  Qn = !1, t.beforeCreate && ko(t.beforeCreate, e, "bc");
  const {
    // state
    data: s,
    computed: r,
    methods: i,
    watch: c,
    provide: u,
    inject: d,
    // lifecycle
    created: p,
    beforeMount: a,
    mounted: g,
    beforeUpdate: D,
    updated: P,
    activated: V,
    deactivated: Z,
    beforeDestroy: G,
    beforeUnmount: L,
    destroyed: H,
    unmounted: pe,
    render: S,
    renderTracked: Q,
    renderTriggered: me,
    errorCaptured: te,
    serverPrefetch: ie,
    // public API
    expose: Fe,
    inheritAttrs: ke,
    // assets
    components: _e,
    directives: zt,
    filters: $o
  } = t, Ge = process.env.NODE_ENV !== "production" ? hc() : null;
  if (process.env.NODE_ENV !== "production") {
    const [R] = e.propsOptions;
    if (R)
      for (const I in R)
        Ge("Props", I);
  }
  if (d && mc(d, o, Ge), i)
    for (const R in i) {
      const I = i[R];
      T(I) ? (process.env.NODE_ENV !== "production" ? Object.defineProperty(o, R, {
        value: I.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : o[R] = I.bind(n), process.env.NODE_ENV !== "production" && Ge("Methods", R)) : process.env.NODE_ENV !== "production" && y(
        `Method "${R}" has type "${typeof I}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (s) {
    process.env.NODE_ENV !== "production" && !T(s) && y(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const R = s.call(n, n);
    if (process.env.NODE_ENV !== "production" && lo(R) && y(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !k(R))
      process.env.NODE_ENV !== "production" && y("data() should return an object.");
    else if (e.data = vo(R), process.env.NODE_ENV !== "production")
      for (const I in R)
        Ge("Data", I), xo(I[0]) || Object.defineProperty(o, I, {
          configurable: !0,
          enumerable: !0,
          get: () => R[I],
          set: X
        });
  }
  if (Qn = !0, r)
    for (const R in r) {
      const I = r[R], we = T(I) ? I.bind(n, n) : T(I.get) ? I.get.bind(n, n) : X;
      process.env.NODE_ENV !== "production" && we === X && y(`Computed property "${R}" has no getter.`);
      const Mn = !T(I) && T(I.set) ? I.set.bind(n) : process.env.NODE_ENV !== "production" ? () => {
        y(
          `Write operation failed: computed property "${R}" is readonly.`
        );
      } : X, bt = ml({
        get: we,
        set: Mn
      });
      Object.defineProperty(o, R, {
        enumerable: !0,
        configurable: !0,
        get: () => bt.value,
        set: (ut) => bt.value = ut
      }), process.env.NODE_ENV !== "production" && Ge("Computed", R);
    }
  if (c)
    for (const R in c)
      er(c[R], o, n, R);
  if (u) {
    const R = T(u) ? u.call(n) : u;
    Reflect.ownKeys(R).forEach((I) => {
      yc(I, R[I]);
    });
  }
  p && ko(p, e, "c");
  function ce(R, I) {
    $(I) ? I.forEach((we) => R(we.bind(n))) : I && R(I.bind(n));
  }
  if (ce(tc, a), ce(nc, g), ce(oc, D), ce(sc, P), ce(Zi, V), ce(Qi, Z), ce(fc, te), ce(lc, Q), ce(cc, me), ce(rc, L), ce(Zs, pe), ce(ic, ie), $(Fe))
    if (Fe.length) {
      const R = e.exposed || (e.exposed = {});
      Fe.forEach((I) => {
        Object.defineProperty(R, I, {
          get: () => n[I],
          set: (we) => n[I] = we,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  S && e.render === X && (e.render = S), ke != null && (e.inheritAttrs = ke), _e && (e.components = _e), zt && (e.directives = zt), ie && zs(e);
}
function mc(e, t, n = X) {
  $(e) && (e = eo(e));
  for (const o in e) {
    const s = e[o];
    let r;
    k(s) ? "default" in s ? r = Ft(
      s.from || o,
      s.default,
      !0
    ) : r = Ft(s.from || o) : r = Ft(s), q(r) ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (i) => r.value = i
    }) : t[o] = r, process.env.NODE_ENV !== "production" && n("Inject", o);
  }
}
function ko(e, t, n) {
  Re(
    $(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function er(e, t, n, o) {
  let s = o.includes(".") ? dr(n, o) : () => n[o];
  if (J(e)) {
    const r = t[e];
    T(r) ? rn(s, r) : process.env.NODE_ENV !== "production" && y(`Invalid watch handler specified by key "${e}"`, r);
  } else if (T(e))
    rn(s, e.bind(n));
  else if (k(e))
    if ($(e))
      e.forEach((r) => er(r, t, n, o));
    else {
      const r = T(e.handler) ? e.handler.bind(n) : t[e.handler];
      T(r) ? rn(s, r, e) : process.env.NODE_ENV !== "production" && y(`Invalid watch handler specified by key "${e.handler}"`, r);
    }
  else process.env.NODE_ENV !== "production" && y(`Invalid watch option: "${o}"`, e);
}
function tr(e) {
  const t = e.type, { mixins: n, extends: o } = t, {
    mixins: s,
    optionsCache: r,
    config: { optionMergeStrategies: i }
  } = e.appContext, c = r.get(t);
  let u;
  return c ? u = c : !s.length && !n && !o ? u = t : (u = {}, s.length && s.forEach(
    (d) => vn(u, d, i, !0)
  ), vn(u, t, i)), k(t) && r.set(t, u), u;
}
function vn(e, t, n, o = !1) {
  const { mixins: s, extends: r } = t;
  r && vn(e, r, n, !0), s && s.forEach(
    (i) => vn(e, i, n, !0)
  );
  for (const i in t)
    if (o && i === "expose")
      process.env.NODE_ENV !== "production" && y(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const c = _c[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const _c = {
  data: Go,
  props: qo,
  emits: qo,
  // objects
  methods: $t,
  computed: $t,
  // lifecycle
  beforeCreate: oe,
  created: oe,
  beforeMount: oe,
  mounted: oe,
  beforeUpdate: oe,
  updated: oe,
  beforeDestroy: oe,
  beforeUnmount: oe,
  destroyed: oe,
  unmounted: oe,
  activated: oe,
  deactivated: oe,
  errorCaptured: oe,
  serverPrefetch: oe,
  // assets
  components: $t,
  directives: $t,
  // watch
  watch: Ec,
  // provide / inject
  provide: Go,
  inject: vc
};
function Go(e, t) {
  return t ? e ? function() {
    return Y(
      T(e) ? e.call(this, this) : e,
      T(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function vc(e, t) {
  return $t(eo(e), eo(t));
}
function eo(e) {
  if ($(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function oe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function $t(e, t) {
  return e ? Y(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function qo(e, t) {
  return e ? $(e) && $(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Y(
    /* @__PURE__ */ Object.create(null),
    Ko(e),
    Ko(t ?? {})
  ) : t;
}
function Ec(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Y(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = oe(e[o], t[o]);
  return n;
}
function nr() {
  return {
    app: null,
    config: {
      isNativeTag: Es,
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
let Nc = 0;
function bc(e, t) {
  return function(o, s = null) {
    T(o) || (o = Y({}, o)), s != null && !k(s) && (process.env.NODE_ENV !== "production" && y("root props passed to app.mount() must be an object."), s = null);
    const r = nr(), i = /* @__PURE__ */ new WeakSet(), c = [];
    let u = !1;
    const d = r.app = {
      _uid: Nc++,
      _component: o,
      _props: s,
      _container: null,
      _context: r,
      _instance: null,
      version: rs,
      get config() {
        return r.config;
      },
      set config(p) {
        process.env.NODE_ENV !== "production" && y(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(p, ...a) {
        return i.has(p) ? process.env.NODE_ENV !== "production" && y("Plugin has already been applied to target app.") : p && T(p.install) ? (i.add(p), p.install(d, ...a)) : T(p) ? (i.add(p), p(d, ...a)) : process.env.NODE_ENV !== "production" && y(
          'A plugin must either be a function or an object with an "install" function.'
        ), d;
      },
      mixin(p) {
        return r.mixins.includes(p) ? process.env.NODE_ENV !== "production" && y(
          "Mixin has already been applied to target app" + (p.name ? `: ${p.name}` : "")
        ) : r.mixins.push(p), d;
      },
      component(p, a) {
        return process.env.NODE_ENV !== "production" && ro(p, r.config), a ? (process.env.NODE_ENV !== "production" && r.components[p] && y(`Component "${p}" has already been registered in target app.`), r.components[p] = a, d) : r.components[p];
      },
      directive(p, a) {
        return process.env.NODE_ENV !== "production" && Js(p), a ? (process.env.NODE_ENV !== "production" && r.directives[p] && y(`Directive "${p}" has already been registered in target app.`), r.directives[p] = a, d) : r.directives[p];
      },
      mount(p, a, g) {
        if (u)
          process.env.NODE_ENV !== "production" && y(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          process.env.NODE_ENV !== "production" && p.__vue_app__ && y(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const D = d._ceVNode || Ze(o, s);
          return D.appContext = r, g === !0 ? g = "svg" : g === !1 && (g = void 0), process.env.NODE_ENV !== "production" && (r.reload = () => {
            const P = et(D);
            P.el = null, e(P, p, g);
          }), e(D, p, g), u = !0, d._container = p, p.__vue_app__ = d, process.env.NODE_ENV !== "production" && (d._instance = D.component, Li(d, rs)), To(D.component);
        }
      },
      onUnmount(p) {
        process.env.NODE_ENV !== "production" && typeof p != "function" && y(
          `Expected function as first argument to app.onUnmount(), but got ${typeof p}`
        ), c.push(p);
      },
      unmount() {
        u ? (Re(
          c,
          d._instance,
          16
        ), e(null, d._container), process.env.NODE_ENV !== "production" && (d._instance = null, Ui(d)), delete d._container.__vue_app__) : process.env.NODE_ENV !== "production" && y("Cannot unmount an app that is not mounted.");
      },
      provide(p, a) {
        return process.env.NODE_ENV !== "production" && p in r.provides && (j(r.provides, p) ? y(
          `App already provides property with key "${String(p)}". It will be overwritten with the new value.`
        ) : y(
          `App already provides property with key "${String(p)}" inherited from its parent element. It will be overwritten with the new value.`
        )), r.provides[p] = a, d;
      },
      runWithContext(p) {
        const a = vt;
        vt = d;
        try {
          return p();
        } finally {
          vt = a;
        }
      }
    };
    return d;
  };
}
let vt = null;
function yc(e, t) {
  if (!ee)
    process.env.NODE_ENV !== "production" && y("provide() can only be used inside setup().");
  else {
    let n = ee.provides;
    const o = ee.parent && ee.parent.provides;
    o === n && (n = ee.provides = Object.create(o)), n[e] = t;
  }
}
function Ft(e, t, n = !1) {
  const o = Or();
  if (o || vt) {
    let s = vt ? vt._context.provides : o ? o.parent == null || o.ce ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : void 0;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return n && T(t) ? t.call(o && o.proxy) : t;
    process.env.NODE_ENV !== "production" && y(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && y("inject() can only be used inside setup() or functional components.");
}
const or = {}, sr = () => Object.create(or), rr = (e) => Object.getPrototypeOf(e) === or;
function Oc(e, t, n, o = !1) {
  const s = {}, r = sr();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), ir(e, t, s, r);
  for (const i in e.propsOptions[0])
    i in s || (s[i] = void 0);
  process.env.NODE_ENV !== "production" && lr(t || {}, s, e), n ? e.props = o ? s : vi(s) : e.type.props ? e.props = s : e.props = r, e.attrs = r;
}
function Dc(e) {
  for (; e; ) {
    if (e.type.__hmrId) return !0;
    e = e.parent;
  }
}
function xc(e, t, n, o) {
  const {
    props: s,
    attrs: r,
    vnode: { patchFlag: i }
  } = e, c = A(s), [u] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(process.env.NODE_ENV !== "production" && Dc(e)) && (o || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const p = e.vnode.dynamicProps;
      for (let a = 0; a < p.length; a++) {
        let g = p[a];
        if (Tn(e.emitsOptions, g))
          continue;
        const D = t[g];
        if (u)
          if (j(r, g))
            D !== r[g] && (r[g] = D, d = !0);
          else {
            const P = Ne(g);
            s[P] = to(
              u,
              c,
              P,
              D,
              e,
              !1
            );
          }
        else
          D !== r[g] && (r[g] = D, d = !0);
      }
    }
  } else {
    ir(e, t, s, r) && (d = !0);
    let p;
    for (const a in c)
      (!t || // for camelCase
      !j(t, a) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((p = Qe(a)) === a || !j(t, p))) && (u ? n && // for camelCase
      (n[a] !== void 0 || // for kebab-case
      n[p] !== void 0) && (s[a] = to(
        u,
        c,
        a,
        void 0,
        e,
        !0
      )) : delete s[a]);
    if (r !== c)
      for (const a in r)
        (!t || !j(t, a)) && (delete r[a], d = !0);
  }
  d && Me(e.attrs, "set", ""), process.env.NODE_ENV !== "production" && lr(t || {}, s, e);
}
function ir(e, t, n, o) {
  const [s, r] = e.propsOptions;
  let i = !1, c;
  if (t)
    for (let u in t) {
      if (Pt(u))
        continue;
      const d = t[u];
      let p;
      s && j(s, p = Ne(u)) ? !r || !r.includes(p) ? n[p] = d : (c || (c = {}))[p] = d : Tn(e.emitsOptions, u) || (!(u in o) || d !== o[u]) && (o[u] = d, i = !0);
    }
  if (r) {
    const u = A(n), d = c || W;
    for (let p = 0; p < r.length; p++) {
      const a = r[p];
      n[a] = to(
        s,
        u,
        a,
        d[a],
        e,
        !j(d, a)
      );
    }
  }
  return i;
}
function to(e, t, n, o, s, r) {
  const i = e[n];
  if (i != null) {
    const c = j(i, "default");
    if (c && o === void 0) {
      const u = i.default;
      if (i.type !== Function && !i.skipFactory && T(u)) {
        const { propsDefaults: d } = s;
        if (n in d)
          o = d[n];
        else {
          const p = Yt(s);
          o = d[n] = u.call(
            null,
            t
          ), p();
        }
      } else
        o = u;
      s.ce && s.ce._setProp(n, o);
    }
    i[
      0
      /* shouldCast */
    ] && (r && !c ? o = !1 : i[
      1
      /* shouldCastTrue */
    ] && (o === "" || o === Qe(n)) && (o = !0));
  }
  return o;
}
const wc = /* @__PURE__ */ new WeakMap();
function cr(e, t, n = !1) {
  const o = n ? wc : t.propsCache, s = o.get(e);
  if (s)
    return s;
  const r = e.props, i = {}, c = [];
  let u = !1;
  if (!T(e)) {
    const p = (a) => {
      u = !0;
      const [g, D] = cr(a, t, !0);
      Y(i, g), D && c.push(...D);
    };
    !n && t.mixins.length && t.mixins.forEach(p), e.extends && p(e.extends), e.mixins && e.mixins.forEach(p);
  }
  if (!r && !u)
    return k(e) && o.set(e, gt), gt;
  if ($(r))
    for (let p = 0; p < r.length; p++) {
      process.env.NODE_ENV !== "production" && !J(r[p]) && y("props must be strings when using array syntax.", r[p]);
      const a = Ne(r[p]);
      Jo(a) && (i[a] = W);
    }
  else if (r) {
    process.env.NODE_ENV !== "production" && !k(r) && y("invalid props options", r);
    for (const p in r) {
      const a = Ne(p);
      if (Jo(a)) {
        const g = r[p], D = i[a] = $(g) || T(g) ? { type: g } : Y({}, g), P = D.type;
        let V = !1, Z = !0;
        if ($(P))
          for (let G = 0; G < P.length; ++G) {
            const L = P[G], H = T(L) && L.name;
            if (H === "Boolean") {
              V = !0;
              break;
            } else H === "String" && (Z = !1);
          }
        else
          V = T(P) && P.name === "Boolean";
        D[
          0
          /* shouldCast */
        ] = V, D[
          1
          /* shouldCastTrue */
        ] = Z, (V || j(D, "default")) && c.push(a);
      }
    }
  }
  const d = [i, c];
  return k(e) && o.set(e, d), d;
}
function Jo(e) {
  return e[0] !== "$" && !Pt(e) ? !0 : (process.env.NODE_ENV !== "production" && y(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function Vc(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function lr(e, t, n) {
  const o = A(t), s = n.propsOptions[0], r = Object.keys(e).map((i) => Ne(i));
  for (const i in s) {
    let c = s[i];
    c != null && Sc(
      i,
      o[i],
      c,
      process.env.NODE_ENV !== "production" ? Ae(o) : o,
      !r.includes(i)
    );
  }
}
function Sc(e, t, n, o, s) {
  const { type: r, required: i, validator: c, skipCheck: u } = n;
  if (i && s) {
    y('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !i)) {
    if (r != null && r !== !0 && !u) {
      let d = !1;
      const p = $(r) ? r : [r], a = [];
      for (let g = 0; g < p.length && !d; g++) {
        const { valid: D, expectedType: P } = Tc(t, p[g]);
        a.push(P || ""), d = D;
      }
      if (!d) {
        y($c(e, t, a));
        return;
      }
    }
    c && !c(t, o) && y('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const Cc = /* @__PURE__ */ We(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function Tc(e, t) {
  let n;
  const o = Vc(t);
  if (o === "null")
    n = e === null;
  else if (Cc(o)) {
    const s = typeof e;
    n = s === o.toLowerCase(), !n && s === "object" && (n = e instanceof t);
  } else o === "Object" ? n = k(e) : o === "Array" ? n = $(e) : n = e instanceof t;
  return {
    valid: n,
    expectedType: o
  };
}
function $c(e, t, n) {
  if (n.length === 0)
    return `Prop type [] for prop "${e}" won't match anything. Did you mean to use type Array instead?`;
  let o = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(Dn).join(" | ")}`;
  const s = n[0], r = fo(t), i = Yo(t, s), c = Yo(t, r);
  return n.length === 1 && zo(s) && !Pc(s, r) && (o += ` with value ${i}`), o += `, got ${r} `, zo(r) && (o += `with value ${c}.`), o;
}
function Yo(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function zo(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function Pc(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const wo = (e) => e === "_" || e === "_ctx" || e === "$stable", Vo = (e) => $(e) ? e.map(ve) : [ve(e)], Mc = (e, t, n) => {
  if (t._n)
    return t;
  const o = Ji((...s) => (process.env.NODE_ENV !== "production" && ee && !(n === null && he) && !(n && n.root !== ee.root) && y(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), Vo(t(...s))), n);
  return o._c = !1, o;
}, fr = (e, t, n) => {
  const o = e._ctx;
  for (const s in e) {
    if (wo(s)) continue;
    const r = e[s];
    if (T(r))
      t[s] = Mc(s, r, o);
    else if (r != null) {
      process.env.NODE_ENV !== "production" && y(
        `Non-function value encountered for slot "${s}". Prefer function slots for better performance.`
      );
      const i = Vo(r);
      t[s] = () => i;
    }
  }
}, ur = (e, t) => {
  process.env.NODE_ENV !== "production" && !Do(e.vnode) && y(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = Vo(t);
  e.slots.default = () => n;
}, no = (e, t, n) => {
  for (const o in t)
    (n || !wo(o)) && (e[o] = t[o]);
}, Ac = (e, t, n) => {
  const o = e.slots = sr();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (no(o, t, n), n && an(o, "_", s, !0)) : fr(t, o);
  } else t && ur(e, t);
}, Ic = (e, t, n) => {
  const { vnode: o, slots: s } = e;
  let r = !0, i = W;
  if (o.shapeFlag & 32) {
    const c = t._;
    c ? process.env.NODE_ENV !== "production" && Ie ? (no(s, t, n), Me(e, "set", "$slots")) : n && c === 1 ? r = !1 : no(s, t, n) : (r = !t.$stable, fr(t, s)), i = t;
  } else t && (ur(e, t), i = { default: 1 });
  if (r)
    for (const c in s)
      !wo(c) && i[c] == null && delete s[c];
};
let Vt, Le;
function pt(e, t) {
  e.appContext.config.performance && En() && Le.mark(`vue-${t}-${e.uid}`), process.env.NODE_ENV !== "production" && ki(e, t, En() ? Le.now() : Date.now());
}
function dt(e, t) {
  if (e.appContext.config.performance && En()) {
    const n = `vue-${t}-${e.uid}`, o = n + ":end", s = `<${Pn(e, e.type)}> ${t}`;
    Le.mark(o), Le.measure(s, n, o), Le.clearMeasures(s), Le.clearMarks(n), Le.clearMarks(o);
  }
  process.env.NODE_ENV !== "production" && Gi(e, t, En() ? Le.now() : Date.now());
}
function En() {
  return Vt !== void 0 || (typeof window < "u" && window.performance ? (Vt = !0, Le = window.performance) : Vt = !1), Vt;
}
function Rc() {
  const e = [];
  if (process.env.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(
      `Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const de = Xc;
function Fc(e) {
  return jc(e);
}
function jc(e, t) {
  Rc();
  const n = kt();
  n.__VUE__ = !0, process.env.NODE_ENV !== "production" && bo(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const {
    insert: o,
    remove: s,
    patchProp: r,
    createElement: i,
    createText: c,
    createComment: u,
    setText: d,
    setElementText: p,
    parentNode: a,
    nextSibling: g,
    setScopeId: D = X,
    insertStaticContent: P
  } = e, V = (l, f, h, v = null, m = null, _ = null, O = void 0, b = null, N = process.env.NODE_ENV !== "production" && Ie ? !1 : !!f.dynamicChildren) => {
    if (l === f)
      return;
    l && !St(l, f) && (v = Xt(l), qe(l, m, _, !0), l = null), f.patchFlag === -2 && (N = !1, f.dynamicChildren = null);
    const { type: E, ref: C, shapeFlag: x } = f;
    switch (E) {
      case Jt:
        Z(l, f, h, v);
        break;
      case ye:
        G(l, f, h, v);
        break;
      case cn:
        l == null ? L(f, h, v, O) : process.env.NODE_ENV !== "production" && H(l, f, h, O);
        break;
      case Pe:
        zt(
          l,
          f,
          h,
          v,
          m,
          _,
          O,
          b,
          N
        );
        break;
      default:
        x & 1 ? Q(
          l,
          f,
          h,
          v,
          m,
          _,
          O,
          b,
          N
        ) : x & 6 ? $o(
          l,
          f,
          h,
          v,
          m,
          _,
          O,
          b,
          N
        ) : x & 64 || x & 128 ? E.process(
          l,
          f,
          h,
          v,
          m,
          _,
          O,
          b,
          N,
          Ot
        ) : process.env.NODE_ENV !== "production" && y("Invalid VNode type:", E, `(${typeof E})`);
    }
    C != null && m ? It(C, l && l.ref, _, f || l, !f) : C == null && l && l.ref != null && It(l.ref, null, _, l, !0);
  }, Z = (l, f, h, v) => {
    if (l == null)
      o(
        f.el = c(f.children),
        h,
        v
      );
    else {
      const m = f.el = l.el;
      f.children !== l.children && d(m, f.children);
    }
  }, G = (l, f, h, v) => {
    l == null ? o(
      f.el = u(f.children || ""),
      h,
      v
    ) : f.el = l.el;
  }, L = (l, f, h, v) => {
    [l.el, l.anchor] = P(
      l.children,
      f,
      h,
      v,
      l.el,
      l.anchor
    );
  }, H = (l, f, h, v) => {
    if (f.children !== l.children) {
      const m = g(l.anchor);
      S(l), [f.el, f.anchor] = P(
        f.children,
        h,
        m,
        v
      );
    } else
      f.el = l.el, f.anchor = l.anchor;
  }, pe = ({ el: l, anchor: f }, h, v) => {
    let m;
    for (; l && l !== f; )
      m = g(l), o(l, h, v), l = m;
    o(f, h, v);
  }, S = ({ el: l, anchor: f }) => {
    let h;
    for (; l && l !== f; )
      h = g(l), s(l), l = h;
    s(f);
  }, Q = (l, f, h, v, m, _, O, b, N) => {
    f.type === "svg" ? O = "svg" : f.type === "math" && (O = "mathml"), l == null ? me(
      f,
      h,
      v,
      m,
      _,
      O,
      b,
      N
    ) : Fe(
      l,
      f,
      m,
      _,
      O,
      b,
      N
    );
  }, me = (l, f, h, v, m, _, O, b) => {
    let N, E;
    const { props: C, shapeFlag: x, transition: w, dirs: M } = l;
    if (N = l.el = i(
      l.type,
      _,
      C && C.is,
      C
    ), x & 8 ? p(N, l.children) : x & 16 && ie(
      l.children,
      N,
      null,
      v,
      m,
      Bn(l, _),
      O,
      b
    ), M && tt(l, null, v, "created"), te(N, l, l.scopeId, O, v), C) {
      for (const K in C)
        K !== "value" && !Pt(K) && r(N, K, null, C[K], _, v);
      "value" in C && r(N, "value", null, C.value, _), (E = C.onVnodeBeforeMount) && Te(E, v, l);
    }
    process.env.NODE_ENV !== "production" && (an(N, "__vnode", l, !0), an(N, "__vueParentComponent", v, !0)), M && tt(l, null, v, "beforeMount");
    const F = Hc(m, w);
    F && w.beforeEnter(N), o(N, f, h), ((E = C && C.onVnodeMounted) || F || M) && de(() => {
      E && Te(E, v, l), F && w.enter(N), M && tt(l, null, v, "mounted");
    }, m);
  }, te = (l, f, h, v, m) => {
    if (h && D(l, h), v)
      for (let _ = 0; _ < v.length; _++)
        D(l, v[_]);
    if (m) {
      let _ = m.subTree;
      if (process.env.NODE_ENV !== "production" && _.patchFlag > 0 && _.patchFlag & 2048 && (_ = So(_.children) || _), f === _ || mr(_.type) && (_.ssContent === f || _.ssFallback === f)) {
        const O = m.vnode;
        te(
          l,
          O,
          O.scopeId,
          O.slotScopeIds,
          m.parent
        );
      }
    }
  }, ie = (l, f, h, v, m, _, O, b, N = 0) => {
    for (let E = N; E < l.length; E++) {
      const C = l[E] = b ? Ye(l[E]) : ve(l[E]);
      V(
        null,
        C,
        f,
        h,
        v,
        m,
        _,
        O,
        b
      );
    }
  }, Fe = (l, f, h, v, m, _, O) => {
    const b = f.el = l.el;
    process.env.NODE_ENV !== "production" && (b.__vnode = f);
    let { patchFlag: N, dynamicChildren: E, dirs: C } = f;
    N |= l.patchFlag & 16;
    const x = l.props || W, w = f.props || W;
    let M;
    if (h && nt(h, !1), (M = w.onVnodeBeforeUpdate) && Te(M, h, f, l), C && tt(f, l, h, "beforeUpdate"), h && nt(h, !0), process.env.NODE_ENV !== "production" && Ie && (N = 0, O = !1, E = null), (x.innerHTML && w.innerHTML == null || x.textContent && w.textContent == null) && p(b, ""), E ? (ke(
      l.dynamicChildren,
      E,
      b,
      h,
      v,
      Bn(f, m),
      _
    ), process.env.NODE_ENV !== "production" && sn(l, f)) : O || we(
      l,
      f,
      b,
      null,
      h,
      v,
      Bn(f, m),
      _,
      !1
    ), N > 0) {
      if (N & 16)
        _e(b, x, w, h, m);
      else if (N & 2 && x.class !== w.class && r(b, "class", null, w.class, m), N & 4 && r(b, "style", x.style, w.style, m), N & 8) {
        const F = f.dynamicProps;
        for (let K = 0; K < F.length; K++) {
          const B = F[K], le = x[B], fe = w[B];
          (fe !== le || B === "value") && r(b, B, le, fe, m, h);
        }
      }
      N & 1 && l.children !== f.children && p(b, f.children);
    } else !O && E == null && _e(b, x, w, h, m);
    ((M = w.onVnodeUpdated) || C) && de(() => {
      M && Te(M, h, f, l), C && tt(f, l, h, "updated");
    }, v);
  }, ke = (l, f, h, v, m, _, O) => {
    for (let b = 0; b < f.length; b++) {
      const N = l[b], E = f[b], C = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        N.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (N.type === Pe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !St(N, E) || // - In the case of a component, it could contain anything.
        N.shapeFlag & 198) ? a(N.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          h
        )
      );
      V(
        N,
        E,
        C,
        null,
        v,
        m,
        _,
        O,
        !0
      );
    }
  }, _e = (l, f, h, v, m) => {
    if (f !== h) {
      if (f !== W)
        for (const _ in f)
          !Pt(_) && !(_ in h) && r(
            l,
            _,
            f[_],
            null,
            m,
            v
          );
      for (const _ in h) {
        if (Pt(_)) continue;
        const O = h[_], b = f[_];
        O !== b && _ !== "value" && r(l, _, b, O, m, v);
      }
      "value" in h && r(l, "value", f.value, h.value, m);
    }
  }, zt = (l, f, h, v, m, _, O, b, N) => {
    const E = f.el = l ? l.el : c(""), C = f.anchor = l ? l.anchor : c("");
    let { patchFlag: x, dynamicChildren: w, slotScopeIds: M } = f;
    process.env.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (Ie || x & 2048) && (x = 0, N = !1, w = null), M && (b = b ? b.concat(M) : M), l == null ? (o(E, h, v), o(C, h, v), ie(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      f.children || [],
      h,
      C,
      m,
      _,
      O,
      b,
      N
    )) : x > 0 && x & 64 && w && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    l.dynamicChildren ? (ke(
      l.dynamicChildren,
      w,
      h,
      m,
      _,
      O,
      b
    ), process.env.NODE_ENV !== "production" ? sn(l, f) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (f.key != null || m && f === m.subTree) && sn(
        l,
        f,
        !0
        /* shallow */
      )
    )) : we(
      l,
      f,
      h,
      C,
      m,
      _,
      O,
      b,
      N
    );
  }, $o = (l, f, h, v, m, _, O, b, N) => {
    f.slotScopeIds = b, l == null ? f.shapeFlag & 512 ? m.ctx.activate(
      f,
      h,
      v,
      O,
      N
    ) : Ge(
      f,
      h,
      v,
      m,
      _,
      O,
      N
    ) : ce(l, f, N);
  }, Ge = (l, f, h, v, m, _, O) => {
    const b = l.component = cl(
      l,
      v,
      m
    );
    if (process.env.NODE_ENV !== "production" && b.type.__hmrId && Ri(b), process.env.NODE_ENV !== "production" && (tn(l), pt(b, "mount")), Do(l) && (b.ctx.renderer = Ot), process.env.NODE_ENV !== "production" && pt(b, "init"), fl(b, !1, O), process.env.NODE_ENV !== "production" && dt(b, "init"), process.env.NODE_ENV !== "production" && Ie && (l.el = null), b.asyncDep) {
      if (m && m.registerDep(b, R, O), !l.el) {
        const N = b.subTree = Ze(ye);
        G(null, N, f, h), l.placeholder = N.el;
      }
    } else
      R(
        b,
        l,
        f,
        h,
        m,
        _,
        O
      );
    process.env.NODE_ENV !== "production" && (nn(), dt(b, "mount"));
  }, ce = (l, f, h) => {
    const v = f.component = l.component;
    if (Yc(l, f, h))
      if (v.asyncDep && !v.asyncResolved) {
        process.env.NODE_ENV !== "production" && tn(f), I(v, f, h), process.env.NODE_ENV !== "production" && nn();
        return;
      } else
        v.next = f, v.update();
    else
      f.el = l.el, v.vnode = f;
  }, R = (l, f, h, v, m, _, O) => {
    const b = () => {
      if (l.isMounted) {
        let { next: x, bu: w, u: M, parent: F, vnode: K } = l;
        {
          const Se = ar(l);
          if (Se) {
            x && (x.el = K.el, I(l, x, O)), Se.asyncDep.then(() => {
              l.isUnmounted || b();
            });
            return;
          }
        }
        let B = x, le;
        process.env.NODE_ENV !== "production" && tn(x || l.vnode), nt(l, !1), x ? (x.el = K.el, I(l, x, O)) : x = K, w && xt(w), (le = x.props && x.props.onVnodeBeforeUpdate) && Te(le, F, x, K), nt(l, !0), process.env.NODE_ENV !== "production" && pt(l, "render");
        const fe = Zo(l);
        process.env.NODE_ENV !== "production" && dt(l, "render");
        const Ve = l.subTree;
        l.subTree = fe, process.env.NODE_ENV !== "production" && pt(l, "patch"), V(
          Ve,
          fe,
          // parent may have changed if it's in a teleport
          a(Ve.el),
          // anchor may have changed if it's in a fragment
          Xt(Ve),
          l,
          m,
          _
        ), process.env.NODE_ENV !== "production" && dt(l, "patch"), x.el = fe.el, B === null && zc(l, fe.el), M && de(M, m), (le = x.props && x.props.onVnodeUpdated) && de(
          () => Te(le, F, x, K),
          m
        ), process.env.NODE_ENV !== "production" && ks(l), process.env.NODE_ENV !== "production" && nn();
      } else {
        let x;
        const { el: w, props: M } = f, { bm: F, m: K, parent: B, root: le, type: fe } = l, Ve = Rt(f);
        nt(l, !1), F && xt(F), !Ve && (x = M && M.onVnodeBeforeMount) && Te(x, B, f), nt(l, !0);
        {
          le.ce && // @ts-expect-error _def is private
          le.ce._def.shadowRoot !== !1 && le.ce._injectChildStyle(fe), process.env.NODE_ENV !== "production" && pt(l, "render");
          const Se = l.subTree = Zo(l);
          process.env.NODE_ENV !== "production" && dt(l, "render"), process.env.NODE_ENV !== "production" && pt(l, "patch"), V(
            null,
            Se,
            h,
            v,
            l,
            m,
            _
          ), process.env.NODE_ENV !== "production" && dt(l, "patch"), f.el = Se.el;
        }
        if (K && de(K, m), !Ve && (x = M && M.onVnodeMounted)) {
          const Se = f;
          de(
            () => Te(x, B, Se),
            m
          );
        }
        (f.shapeFlag & 256 || B && Rt(B.vnode) && B.vnode.shapeFlag & 256) && l.a && de(l.a, m), l.isMounted = !0, process.env.NODE_ENV !== "production" && Bi(l), f = h = v = null;
      }
    };
    l.scope.on();
    const N = l.effect = new bs(b);
    l.scope.off();
    const E = l.update = N.run.bind(N), C = l.job = N.runIfDirty.bind(N);
    C.i = l, C.id = l.uid, N.scheduler = () => Sn(C), nt(l, !0), process.env.NODE_ENV !== "production" && (N.onTrack = l.rtc ? (x) => xt(l.rtc, x) : void 0, N.onTrigger = l.rtg ? (x) => xt(l.rtg, x) : void 0), E();
  }, I = (l, f, h) => {
    f.component = l;
    const v = l.vnode.props;
    l.vnode = f, l.next = null, xc(l, f.props, v, h), Ic(l, f.children, h), De(), Lo(l), xe();
  }, we = (l, f, h, v, m, _, O, b, N = !1) => {
    const E = l && l.children, C = l ? l.shapeFlag : 0, x = f.children, { patchFlag: w, shapeFlag: M } = f;
    if (w > 0) {
      if (w & 128) {
        bt(
          E,
          x,
          h,
          v,
          m,
          _,
          O,
          b,
          N
        );
        return;
      } else if (w & 256) {
        Mn(
          E,
          x,
          h,
          v,
          m,
          _,
          O,
          b,
          N
        );
        return;
      }
    }
    M & 8 ? (C & 16 && yt(E, m, _), x !== E && p(h, x)) : C & 16 ? M & 16 ? bt(
      E,
      x,
      h,
      v,
      m,
      _,
      O,
      b,
      N
    ) : yt(E, m, _, !0) : (C & 8 && p(h, ""), M & 16 && ie(
      x,
      h,
      v,
      m,
      _,
      O,
      b,
      N
    ));
  }, Mn = (l, f, h, v, m, _, O, b, N) => {
    l = l || gt, f = f || gt;
    const E = l.length, C = f.length, x = Math.min(E, C);
    let w;
    for (w = 0; w < x; w++) {
      const M = f[w] = N ? Ye(f[w]) : ve(f[w]);
      V(
        l[w],
        M,
        h,
        null,
        m,
        _,
        O,
        b,
        N
      );
    }
    E > C ? yt(
      l,
      m,
      _,
      !0,
      !1,
      x
    ) : ie(
      f,
      h,
      v,
      m,
      _,
      O,
      b,
      N,
      x
    );
  }, bt = (l, f, h, v, m, _, O, b, N) => {
    let E = 0;
    const C = f.length;
    let x = l.length - 1, w = C - 1;
    for (; E <= x && E <= w; ) {
      const M = l[E], F = f[E] = N ? Ye(f[E]) : ve(f[E]);
      if (St(M, F))
        V(
          M,
          F,
          h,
          null,
          m,
          _,
          O,
          b,
          N
        );
      else
        break;
      E++;
    }
    for (; E <= x && E <= w; ) {
      const M = l[x], F = f[w] = N ? Ye(f[w]) : ve(f[w]);
      if (St(M, F))
        V(
          M,
          F,
          h,
          null,
          m,
          _,
          O,
          b,
          N
        );
      else
        break;
      x--, w--;
    }
    if (E > x) {
      if (E <= w) {
        const M = w + 1, F = M < C ? f[M].el : v;
        for (; E <= w; )
          V(
            null,
            f[E] = N ? Ye(f[E]) : ve(f[E]),
            h,
            F,
            m,
            _,
            O,
            b,
            N
          ), E++;
      }
    } else if (E > w)
      for (; E <= x; )
        qe(l[E], m, _, !0), E++;
    else {
      const M = E, F = E, K = /* @__PURE__ */ new Map();
      for (E = F; E <= w; E++) {
        const ne = f[E] = N ? Ye(f[E]) : ve(f[E]);
        ne.key != null && (process.env.NODE_ENV !== "production" && K.has(ne.key) && y(
          "Duplicate keys found during update:",
          JSON.stringify(ne.key),
          "Make sure keys are unique."
        ), K.set(ne.key, E));
      }
      let B, le = 0;
      const fe = w - F + 1;
      let Ve = !1, Se = 0;
      const Dt = new Array(fe);
      for (E = 0; E < fe; E++) Dt[E] = 0;
      for (E = M; E <= x; E++) {
        const ne = l[E];
        if (le >= fe) {
          qe(ne, m, _, !0);
          continue;
        }
        let Ce;
        if (ne.key != null)
          Ce = K.get(ne.key);
        else
          for (B = F; B <= w; B++)
            if (Dt[B - F] === 0 && St(ne, f[B])) {
              Ce = B;
              break;
            }
        Ce === void 0 ? qe(ne, m, _, !0) : (Dt[Ce - F] = E + 1, Ce >= Se ? Se = Ce : Ve = !0, V(
          ne,
          f[Ce],
          h,
          null,
          m,
          _,
          O,
          b,
          N
        ), le++);
      }
      const Mo = Ve ? Lc(Dt) : gt;
      for (B = Mo.length - 1, E = fe - 1; E >= 0; E--) {
        const ne = F + E, Ce = f[ne], Ao = f[ne + 1], Io = ne + 1 < C ? (
          // #13559, fallback to el placeholder for unresolved async component
          Ao.el || Ao.placeholder
        ) : v;
        Dt[E] === 0 ? V(
          null,
          Ce,
          h,
          Io,
          m,
          _,
          O,
          b,
          N
        ) : Ve && (B < 0 || E !== Mo[B] ? ut(Ce, h, Io, 2) : B--);
      }
    }
  }, ut = (l, f, h, v, m = null) => {
    const { el: _, type: O, transition: b, children: N, shapeFlag: E } = l;
    if (E & 6) {
      ut(l.component.subTree, f, h, v);
      return;
    }
    if (E & 128) {
      l.suspense.move(f, h, v);
      return;
    }
    if (E & 64) {
      O.move(l, f, h, Ot);
      return;
    }
    if (O === Pe) {
      o(_, f, h);
      for (let x = 0; x < N.length; x++)
        ut(N[x], f, h, v);
      o(l.anchor, f, h);
      return;
    }
    if (O === cn) {
      pe(l, f, h);
      return;
    }
    if (v !== 2 && E & 1 && b)
      if (v === 0)
        b.beforeEnter(_), o(_, f, h), de(() => b.enter(_), m);
      else {
        const { leave: x, delayLeave: w, afterLeave: M } = b, F = () => {
          l.ctx.isUnmounted ? s(_) : o(_, f, h);
        }, K = () => {
          _._isLeaving && _[Xi](
            !0
            /* cancelled */
          ), x(_, () => {
            F(), M && M();
          });
        };
        w ? w(_, F, K) : K();
      }
    else
      o(_, f, h);
  }, qe = (l, f, h, v = !1, m = !1) => {
    const {
      type: _,
      props: O,
      ref: b,
      children: N,
      dynamicChildren: E,
      shapeFlag: C,
      patchFlag: x,
      dirs: w,
      cacheIndex: M
    } = l;
    if (x === -2 && (m = !1), b != null && (De(), It(b, null, h, l, !0), xe()), M != null && (f.renderCache[M] = void 0), C & 256) {
      f.ctx.deactivate(l);
      return;
    }
    const F = C & 1 && w, K = !Rt(l);
    let B;
    if (K && (B = O && O.onVnodeBeforeUnmount) && Te(B, f, l), C & 6)
      $r(l.component, h, v);
    else {
      if (C & 128) {
        l.suspense.unmount(h, v);
        return;
      }
      F && tt(l, null, f, "beforeUnmount"), C & 64 ? l.type.remove(
        l,
        f,
        h,
        Ot,
        v
      ) : E && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !E.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== Pe || x > 0 && x & 64) ? yt(
        E,
        f,
        h,
        !1,
        !0
      ) : (_ === Pe && x & 384 || !m && C & 16) && yt(N, f, h), v && An(l);
    }
    (K && (B = O && O.onVnodeUnmounted) || F) && de(() => {
      B && Te(B, f, l), F && tt(l, null, f, "unmounted");
    }, h);
  }, An = (l) => {
    const { type: f, el: h, anchor: v, transition: m } = l;
    if (f === Pe) {
      process.env.NODE_ENV !== "production" && l.patchFlag > 0 && l.patchFlag & 2048 && m && !m.persisted ? l.children.forEach((O) => {
        O.type === ye ? s(O.el) : An(O);
      }) : Tr(h, v);
      return;
    }
    if (f === cn) {
      S(l);
      return;
    }
    const _ = () => {
      s(h), m && !m.persisted && m.afterLeave && m.afterLeave();
    };
    if (l.shapeFlag & 1 && m && !m.persisted) {
      const { leave: O, delayLeave: b } = m, N = () => O(h, _);
      b ? b(l.el, _, N) : N();
    } else
      _();
  }, Tr = (l, f) => {
    let h;
    for (; l !== f; )
      h = g(l), s(l), l = h;
    s(f);
  }, $r = (l, f, h) => {
    process.env.NODE_ENV !== "production" && l.type.__hmrId && Fi(l);
    const { bum: v, scope: m, job: _, subTree: O, um: b, m: N, a: E } = l;
    Xo(N), Xo(E), v && xt(v), m.stop(), _ && (_.flags |= 8, qe(O, l, f, h)), b && de(b, f), de(() => {
      l.isUnmounted = !0;
    }, f), process.env.NODE_ENV !== "production" && Ki(l);
  }, yt = (l, f, h, v = !1, m = !1, _ = 0) => {
    for (let O = _; O < l.length; O++)
      qe(l[O], f, h, v, m);
  }, Xt = (l) => {
    if (l.shapeFlag & 6)
      return Xt(l.component.subTree);
    if (l.shapeFlag & 128)
      return l.suspense.next();
    const f = g(l.anchor || l.el), h = f && f[Yi];
    return h ? g(h) : f;
  };
  let In = !1;
  const Po = (l, f, h) => {
    l == null ? f._vnode && qe(f._vnode, null, null, !0) : V(
      f._vnode || null,
      l,
      f,
      null,
      null,
      null,
      h
    ), f._vnode = l, In || (In = !0, Lo(), Bs(), In = !1);
  }, Ot = {
    p: V,
    um: qe,
    m: ut,
    r: An,
    mt: Ge,
    mc: ie,
    pc: we,
    pbc: ke,
    n: Xt,
    o: e
  };
  return {
    render: Po,
    hydrate: void 0,
    createApp: bc(Po)
  };
}
function Bn({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function nt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Hc(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function sn(e, t, n = !1) {
  const o = e.children, s = t.children;
  if ($(o) && $(s))
    for (let r = 0; r < o.length; r++) {
      const i = o[r];
      let c = s[r];
      c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && (c = s[r] = Ye(s[r]), c.el = i.el), !n && c.patchFlag !== -2 && sn(i, c)), c.type === Jt && // avoid cached text nodes retaining detached dom nodes
      c.patchFlag !== -1 && (c.el = i.el), c.type === ye && !c.el && (c.el = i.el), process.env.NODE_ENV !== "production" && c.el && (c.el.__vnode = c);
    }
}
function Lc(e) {
  const t = e.slice(), n = [0];
  let o, s, r, i, c;
  const u = e.length;
  for (o = 0; o < u; o++) {
    const d = e[o];
    if (d !== 0) {
      if (s = n[n.length - 1], e[s] < d) {
        t[o] = s, n.push(o);
        continue;
      }
      for (r = 0, i = n.length - 1; r < i; )
        c = r + i >> 1, e[n[c]] < d ? r = c + 1 : i = c;
      d < e[n[r]] && (r > 0 && (t[o] = n[r - 1]), n[r] = o);
    }
  }
  for (r = n.length, i = n[r - 1]; r-- > 0; )
    n[r] = i, i = t[i];
  return n;
}
function ar(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : ar(t);
}
function Xo(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const Uc = Symbol.for("v-scx"), Bc = () => {
  {
    const e = Ft(Uc);
    return e || process.env.NODE_ENV !== "production" && y(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function rn(e, t, n) {
  return process.env.NODE_ENV !== "production" && !T(t) && y(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), pr(e, t, n);
}
function pr(e, t, n = W) {
  const { immediate: o, deep: s, flush: r, once: i } = n;
  process.env.NODE_ENV !== "production" && !t && (o !== void 0 && y(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), s !== void 0 && y(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), i !== void 0 && y(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const c = Y({}, n);
  process.env.NODE_ENV !== "production" && (c.onWarn = y);
  const u = t && o || !t && r !== "post";
  let d;
  if (Wt) {
    if (r === "sync") {
      const D = Bc();
      d = D.__watcherHandles || (D.__watcherHandles = []);
    } else if (!u) {
      const D = () => {
      };
      return D.stop = X, D.resume = X, D.pause = X, D;
    }
  }
  const p = ee;
  c.call = (D, P, V) => Re(D, p, P, V);
  let a = !1;
  r === "post" ? c.scheduler = (D) => {
    de(D, p && p.suspense);
  } : r !== "sync" && (a = !0, c.scheduler = (D, P) => {
    P ? D() : Sn(D);
  }), c.augmentJob = (D) => {
    t && (D.flags |= 4), a && (D.flags |= 2, p && (D.id = p.uid, D.i = p));
  };
  const g = Vi(e, t, c);
  return Wt && (d ? d.push(g) : u && g()), g;
}
function Wc(e, t, n) {
  const o = this.proxy, s = J(e) ? e.includes(".") ? dr(o, e) : () => o[e] : e.bind(o, o);
  let r;
  T(t) ? r = t : (r = t.handler, n = t);
  const i = Yt(this), c = pr(s, r.bind(o), n);
  return i(), c;
}
function dr(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let s = 0; s < n.length && o; s++)
      o = o[n[s]];
    return o;
  };
}
const Kc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ne(t)}Modifiers`] || e[`${Qe(t)}Modifiers`];
function kc(e, t, ...n) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || W;
  if (process.env.NODE_ENV !== "production") {
    const {
      emitsOptions: p,
      propsOptions: [a]
    } = e;
    if (p)
      if (!(t in p))
        (!a || !(ot(Ne(t)) in a)) && y(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${ot(Ne(t))}" prop.`
        );
      else {
        const g = p[t];
        T(g) && (g(...n) || y(
          `Invalid event arguments: event validation failed for event "${t}".`
        ));
      }
  }
  let s = n;
  const r = t.startsWith("update:"), i = r && Kc(o, t.slice(7));
  if (i && (i.trim && (s = n.map((p) => J(p) ? p.trim() : p)), i.number && (s = n.map(Hr))), process.env.NODE_ENV !== "production" && qi(e, t, s), process.env.NODE_ENV !== "production") {
    const p = t.toLowerCase();
    p !== t && o[ot(p)] && y(
      `Event "${p}" is emitted in component ${Pn(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${Qe(
        t
      )}" instead of "${t}".`
    );
  }
  let c, u = o[c = ot(t)] || // also try camelCase event handler (#2249)
  o[c = ot(Ne(t))];
  !u && r && (u = o[c = ot(Qe(t))]), u && Re(
    u,
    e,
    6,
    s
  );
  const d = o[c + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[c])
      return;
    e.emitted[c] = !0, Re(
      d,
      e,
      6,
      s
    );
  }
}
const Gc = /* @__PURE__ */ new WeakMap();
function hr(e, t, n = !1) {
  const o = n ? Gc : t.emitsCache, s = o.get(e);
  if (s !== void 0)
    return s;
  const r = e.emits;
  let i = {}, c = !1;
  if (!T(e)) {
    const u = (d) => {
      const p = hr(d, t, !0);
      p && (c = !0, Y(i, p));
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !r && !c ? (k(e) && o.set(e, null), null) : ($(r) ? r.forEach((u) => i[u] = null) : Y(i, r), k(e) && o.set(e, i), i);
}
function Tn(e, t) {
  return !e || !Kt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), j(e, t[0].toLowerCase() + t.slice(1)) || j(e, Qe(t)) || j(e, t));
}
let oo = !1;
function Nn() {
  oo = !0;
}
function Zo(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: s,
    propsOptions: [r],
    slots: i,
    attrs: c,
    emit: u,
    render: d,
    renderCache: p,
    props: a,
    data: g,
    setupState: D,
    ctx: P,
    inheritAttrs: V
  } = e, Z = mn(e);
  let G, L;
  process.env.NODE_ENV !== "production" && (oo = !1);
  try {
    if (n.shapeFlag & 4) {
      const S = s || o, Q = process.env.NODE_ENV !== "production" && D.__isScriptSetup ? new Proxy(S, {
        get(me, te, ie) {
          return y(
            `Property '${String(
              te
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(me, te, ie);
        }
      }) : S;
      G = ve(
        d.call(
          Q,
          S,
          p,
          process.env.NODE_ENV !== "production" ? Ae(a) : a,
          D,
          g,
          P
        )
      ), L = c;
    } else {
      const S = t;
      process.env.NODE_ENV !== "production" && c === a && Nn(), G = ve(
        S.length > 1 ? S(
          process.env.NODE_ENV !== "production" ? Ae(a) : a,
          process.env.NODE_ENV !== "production" ? {
            get attrs() {
              return Nn(), Ae(c);
            },
            slots: i,
            emit: u
          } : { attrs: c, slots: i, emit: u }
        ) : S(
          process.env.NODE_ENV !== "production" ? Ae(a) : a,
          null
        )
      ), L = t.props ? c : qc(c);
    }
  } catch (S) {
    jt.length = 0, Gt(S, e, 1), G = Ze(ye);
  }
  let H = G, pe;
  if (process.env.NODE_ENV !== "production" && G.patchFlag > 0 && G.patchFlag & 2048 && ([H, pe] = gr(G)), L && V !== !1) {
    const S = Object.keys(L), { shapeFlag: Q } = H;
    if (S.length) {
      if (Q & 7)
        r && S.some(un) && (L = Jc(
          L,
          r
        )), H = et(H, L, !1, !0);
      else if (process.env.NODE_ENV !== "production" && !oo && H.type !== ye) {
        const me = Object.keys(c), te = [], ie = [];
        for (let Fe = 0, ke = me.length; Fe < ke; Fe++) {
          const _e = me[Fe];
          Kt(_e) ? un(_e) || te.push(_e[2].toLowerCase() + _e.slice(3)) : ie.push(_e);
        }
        ie.length && y(
          `Extraneous non-props attributes (${ie.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`
        ), te.length && y(
          `Extraneous non-emits event listeners (${te.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return n.dirs && (process.env.NODE_ENV !== "production" && !Qo(H) && y(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), H = et(H, null, !1, !0), H.dirs = H.dirs ? H.dirs.concat(n.dirs) : n.dirs), n.transition && (process.env.NODE_ENV !== "production" && !Qo(H) && y(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), Oo(H, n.transition)), process.env.NODE_ENV !== "production" && pe ? pe(H) : G = H, mn(Z), G;
}
const gr = (e) => {
  const t = e.children, n = e.dynamicChildren, o = So(t, !1);
  if (o) {
    if (process.env.NODE_ENV !== "production" && o.patchFlag > 0 && o.patchFlag & 2048)
      return gr(o);
  } else return [e, void 0];
  const s = t.indexOf(o), r = n ? n.indexOf(o) : -1, i = (c) => {
    t[s] = c, n && (r > -1 ? n[r] = c : c.patchFlag > 0 && (e.dynamicChildren = [...n, c]));
  };
  return [ve(o), i];
};
function So(e, t = !0) {
  let n;
  for (let o = 0; o < e.length; o++) {
    const s = e[o];
    if ($n(s)) {
      if (s.type !== ye || s.children === "v-if") {
        if (n)
          return;
        if (n = s, process.env.NODE_ENV !== "production" && t && n.patchFlag > 0 && n.patchFlag & 2048)
          return So(n.children);
      }
    } else
      return;
  }
  return n;
}
const qc = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Kt(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Jc = (e, t) => {
  const n = {};
  for (const o in e)
    (!un(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
}, Qo = (e) => e.shapeFlag & 7 || e.type === ye;
function Yc(e, t, n) {
  const { props: o, children: s, component: r } = e, { props: i, children: c, patchFlag: u } = t, d = r.emitsOptions;
  if (process.env.NODE_ENV !== "production" && (s || c) && Ie || t.dirs || t.transition)
    return !0;
  if (n && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return o ? es(o, i, d) : !!i;
    if (u & 8) {
      const p = t.dynamicProps;
      for (let a = 0; a < p.length; a++) {
        const g = p[a];
        if (i[g] !== o[g] && !Tn(d, g))
          return !0;
      }
    }
  } else
    return (s || c) && (!c || !c.$stable) ? !0 : o === i ? !1 : o ? i ? es(o, i, d) : !0 : !!i;
  return !1;
}
function es(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let s = 0; s < o.length; s++) {
    const r = o[s];
    if (t[r] !== e[r] && !Tn(n, r))
      return !0;
  }
  return !1;
}
function zc({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.el = e.el), o === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const mr = (e) => e.__isSuspense;
function Xc(e, t) {
  t && t.pendingBranch ? $(e) ? t.effects.push(...e) : t.effects.push(e) : Us(e);
}
const Pe = Symbol.for("v-fgt"), Jt = Symbol.for("v-txt"), ye = Symbol.for("v-cmt"), cn = Symbol.for("v-stc"), jt = [];
let ge = null;
function _r(e = !1) {
  jt.push(ge = e ? null : []);
}
function Zc() {
  jt.pop(), ge = jt[jt.length - 1] || null;
}
let Bt = 1;
function ts(e, t = !1) {
  Bt += e, e < 0 && ge && t && (ge.hasOnce = !0);
}
function vr(e) {
  return e.dynamicChildren = Bt > 0 ? ge || gt : null, Zc(), Bt > 0 && ge && ge.push(e), e;
}
function Qc(e, t, n, o, s, r) {
  return vr(
    Nr(
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
function el(e, t, n, o, s) {
  return vr(
    Ze(
      e,
      t,
      n,
      o,
      s,
      !0
    )
  );
}
function $n(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function St(e, t) {
  if (process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && e.component) {
    const n = on.get(t.type);
    if (n && n.has(e.component))
      return e.shapeFlag &= -257, t.shapeFlag &= -513, !1;
  }
  return e.type === t.type && e.key === t.key;
}
const tl = (...e) => br(
  ...e
), Er = ({ key: e }) => e ?? null, ln = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? J(e) || q(e) || T(e) ? { i: he, r: e, k: t, f: !!n } : e : null);
function Nr(e, t = null, n = null, o = 0, s = null, r = e === Pe ? 0 : 1, i = !1, c = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Er(t),
    ref: t && ln(t),
    scopeId: qs,
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
    ctx: he
  };
  return c ? (Co(u, n), r & 128 && e.normalize(u)) : n && (u.shapeFlag |= J(n) ? 8 : 16), process.env.NODE_ENV !== "production" && u.key !== u.key && y("VNode created with invalid key (NaN). VNode type:", u.type), Bt > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  ge && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && ge.push(u), u;
}
const Ze = process.env.NODE_ENV !== "production" ? tl : br;
function br(e, t = null, n = null, o = 0, s = null, r = !1) {
  if ((!e || e === uc) && (process.env.NODE_ENV !== "production" && !e && y(`Invalid vnode type when creating vnode: ${e}.`), e = ye), $n(e)) {
    const c = et(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Co(c, n), Bt > 0 && !r && ge && (c.shapeFlag & 6 ? ge[ge.indexOf(e)] = c : ge.push(c)), c.patchFlag = -2, c;
  }
  if (Vr(e) && (e = e.__vccOpts), t) {
    t = nl(t);
    let { class: c, style: u } = t;
    c && !J(c) && (t.class = ao(c)), k(u) && (pn(u) && !$(u) && (u = Y({}, u)), t.style = xn(u));
  }
  const i = J(e) ? 1 : mr(e) ? 128 : zi(e) ? 64 : k(e) ? 4 : T(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && pn(e) && (e = A(e), y(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), Nr(
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
function nl(e) {
  return e ? pn(e) || rr(e) ? Y({}, e) : e : null;
}
function et(e, t, n = !1, o = !1) {
  const { props: s, ref: r, patchFlag: i, children: c, transition: u } = e, d = t ? sl(s || {}, t) : s, p = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Er(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? $(r) ? r.concat(ln(t)) : [r, ln(t)] : ln(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && i === -1 && $(c) ? c.map(yr) : c,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Pe ? i === -1 ? 16 : i | 16 : i,
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
    ssContent: e.ssContent && et(e.ssContent),
    ssFallback: e.ssFallback && et(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return u && o && Oo(
    p,
    u.clone(p)
  ), p;
}
function yr(e) {
  const t = et(e);
  return $(e.children) && (t.children = e.children.map(yr)), t;
}
function ol(e = " ", t = 0) {
  return Ze(Jt, null, e, t);
}
function ve(e) {
  return e == null || typeof e == "boolean" ? Ze(ye) : $(e) ? Ze(
    Pe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : $n(e) ? Ye(e) : Ze(Jt, null, String(e));
}
function Ye(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : et(e);
}
function Co(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if ($(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Co(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !rr(t) ? t._ctx = he : s === 3 && he && (he.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else T(t) ? (t = { default: t, _ctx: he }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [ol(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function sl(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const s in o)
      if (s === "class")
        t.class !== o.class && (t.class = ao([t.class, o.class]));
      else if (s === "style")
        t.style = xn([t.style, o.style]);
      else if (Kt(s)) {
        const r = t[s], i = o[s];
        i && r !== i && !($(r) && r.includes(i)) && (t[s] = r ? [].concat(r, i) : i);
      } else s !== "" && (t[s] = o[s]);
  }
  return t;
}
function Te(e, t, n, o = null) {
  Re(e, t, 7, [
    n,
    o
  ]);
}
const rl = nr();
let il = 0;
function cl(e, t, n) {
  const o = e.type, s = (t ? t.appContext : e.appContext) || rl, r = {
    uid: il++,
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
    scope: new Zr(
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
    propsOptions: cr(o, s),
    emitsOptions: hr(o, s),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: W,
    // inheritAttrs
    inheritAttrs: o.inheritAttrs,
    // state
    ctx: W,
    data: W,
    props: W,
    attrs: W,
    slots: W,
    refs: W,
    setupState: W,
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
  return process.env.NODE_ENV !== "production" ? r.ctx = ac(r) : r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = kc.bind(null, r), e.ce && e.ce(r), r;
}
let ee = null;
const Or = () => ee || he;
let bn, so;
{
  const e = kt(), t = (n, o) => {
    let s;
    return (s = e[n]) || (s = e[n] = []), s.push(o), (r) => {
      s.length > 1 ? s.forEach((i) => i(r)) : s[0](r);
    };
  };
  bn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => ee = n
  ), so = t(
    "__VUE_SSR_SETTERS__",
    (n) => Wt = n
  );
}
const Yt = (e) => {
  const t = ee;
  return bn(e), e.scope.on(), () => {
    e.scope.off(), bn(t);
  };
}, ns = () => {
  ee && ee.scope.off(), bn(null);
}, ll = /* @__PURE__ */ We("slot,component");
function ro(e, { isNativeTag: t }) {
  (ll(e) || t(e)) && y(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function Dr(e) {
  return e.vnode.shapeFlag & 4;
}
let Wt = !1;
function fl(e, t = !1, n = !1) {
  t && so(t);
  const { props: o, children: s } = e.vnode, r = Dr(e);
  Oc(e, o, r, t), Ac(e, s, n || t);
  const i = r ? ul(e, t) : void 0;
  return t && so(!1), i;
}
function ul(e, t) {
  var n;
  const o = e.type;
  if (process.env.NODE_ENV !== "production") {
    if (o.name && ro(o.name, e.appContext.config), o.components) {
      const r = Object.keys(o.components);
      for (let i = 0; i < r.length; i++)
        ro(r[i], e.appContext.config);
    }
    if (o.directives) {
      const r = Object.keys(o.directives);
      for (let i = 0; i < r.length; i++)
        Js(r[i]);
    }
    o.compilerOptions && al() && y(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Qs), process.env.NODE_ENV !== "production" && pc(e);
  const { setup: s } = o;
  if (s) {
    De();
    const r = e.setupContext = s.length > 1 ? dl(e) : null, i = Yt(e), c = Nt(
      s,
      e,
      0,
      [
        process.env.NODE_ENV !== "production" ? Ae(e.props) : e.props,
        r
      ]
    ), u = lo(c);
    if (xe(), i(), (u || e.sp) && !Rt(e) && zs(e), u) {
      if (c.then(ns, ns), t)
        return c.then((d) => {
          os(e, d, t);
        }).catch((d) => {
          Gt(d, e, 0);
        });
      if (e.asyncDep = c, process.env.NODE_ENV !== "production" && !e.suspense) {
        const d = (n = o.name) != null ? n : "Anonymous";
        y(
          `Component <${d}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      os(e, c, t);
  } else
    xr(e, t);
}
function os(e, t, n) {
  T(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : k(t) ? (process.env.NODE_ENV !== "production" && $n(t) && y(
    "setup() should not return VNodes directly - return a render function instead."
  ), process.env.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = Fs(t), process.env.NODE_ENV !== "production" && dc(e)) : process.env.NODE_ENV !== "production" && t !== void 0 && y(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), xr(e, n);
}
const al = () => !0;
function xr(e, t, n) {
  const o = e.type;
  e.render || (e.render = o.render || X);
  {
    const s = Yt(e);
    De();
    try {
      gc(e);
    } finally {
      xe(), s();
    }
  }
  process.env.NODE_ENV !== "production" && !o.render && e.render === X && !t && (o.template ? y(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
  ) : y("Component is missing template or render function: ", o));
}
const ss = process.env.NODE_ENV !== "production" ? {
  get(e, t) {
    return Nn(), z(e, "get", ""), e[t];
  },
  set() {
    return y("setupContext.attrs is readonly."), !1;
  },
  deleteProperty() {
    return y("setupContext.attrs is readonly."), !1;
  }
} : {
  get(e, t) {
    return z(e, "get", ""), e[t];
  }
};
function pl(e) {
  return new Proxy(e.slots, {
    get(t, n) {
      return z(e, "get", "$slots"), t[n];
    }
  });
}
function dl(e) {
  const t = (n) => {
    if (process.env.NODE_ENV !== "production" && (e.exposed && y("expose() should be called only once per setup()."), n != null)) {
      let o = typeof n;
      o === "object" && ($(n) ? o = "array" : q(n) && (o = "ref")), o !== "object" && y(
        `expose() should be passed a plain object, received ${o}.`
      );
    }
    e.exposed = n || {};
  };
  if (process.env.NODE_ENV !== "production") {
    let n, o;
    return Object.freeze({
      get attrs() {
        return n || (n = new Proxy(e.attrs, ss));
      },
      get slots() {
        return o || (o = pl(e));
      },
      get emit() {
        return (s, ...r) => e.emit(s, ...r);
      },
      expose: t
    });
  } else
    return {
      attrs: new Proxy(e.attrs, ss),
      slots: e.slots,
      emit: e.emit,
      expose: t
    };
}
function To(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Fs(Ei(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in lt)
        return lt[n](e);
    },
    has(t, n) {
      return n in t || n in lt;
    }
  })) : e.proxy;
}
const hl = /(?:^|[-_])\w/g, gl = (e) => e.replace(hl, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function wr(e, t = !0) {
  return T(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Pn(e, t, n = !1) {
  let o = wr(t);
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
  return o ? gl(o) : n ? "App" : "Anonymous";
}
function Vr(e) {
  return T(e) && "__vccOpts" in e;
}
const ml = (e, t) => {
  const n = xi(e, t, Wt);
  if (process.env.NODE_ENV !== "production") {
    const o = Or();
    o && o.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function _l() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, o = { style: "color:#eb2f96" }, s = {
    __vue_custom_formatter: !0,
    header(a) {
      if (!k(a))
        return null;
      if (a.__isVue)
        return ["div", e, "VueInstance"];
      if (q(a)) {
        De();
        const g = a.value;
        return xe(), [
          "div",
          {},
          ["span", e, p(a)],
          "<",
          c(g),
          ">"
        ];
      } else {
        if (it(a))
          return [
            "div",
            {},
            ["span", e, ae(a) ? "ShallowReactive" : "Reactive"],
            "<",
            c(a),
            `>${Be(a) ? " (readonly)" : ""}`
          ];
        if (Be(a))
          return [
            "div",
            {},
            ["span", e, ae(a) ? "ShallowReadonly" : "Readonly"],
            "<",
            c(a),
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
    a.type.props && a.props && g.push(i("props", A(a.props))), a.setupState !== W && g.push(i("setup", a.setupState)), a.data !== W && g.push(i("data", A(a.data)));
    const D = u(a, "computed");
    D && g.push(i("computed", D));
    const P = u(a, "inject");
    return P && g.push(i("injected", P)), g.push([
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
    return g = Y({}, g), Object.keys(g).length ? [
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
        ...Object.keys(g).map((D) => [
          "div",
          {},
          ["span", o, D + ": "],
          c(g[D], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(a, g = !0) {
    return typeof a == "number" ? ["span", t, a] : typeof a == "string" ? ["span", n, JSON.stringify(a)] : typeof a == "boolean" ? ["span", o, a] : k(a) ? ["object", { object: g ? A(a) : a }] : ["span", n, String(a)];
  }
  function u(a, g) {
    const D = a.type;
    if (T(D))
      return;
    const P = {};
    for (const V in a.ctx)
      d(D, V, g) && (P[V] = a.ctx[V]);
    return P;
  }
  function d(a, g, D) {
    const P = a[D];
    if ($(P) && P.includes(g) || k(P) && g in P || a.extends && d(a.extends, g, D) || a.mixins && a.mixins.some((V) => d(V, g, D)))
      return !0;
  }
  function p(a) {
    return ae(a) ? "ShallowRef" : a.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(s) : window.devtoolsFormatters = [s];
}
const rs = "3.5.22", Ue = process.env.NODE_ENV !== "production" ? y : X;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let io;
const is = typeof window < "u" && window.trustedTypes;
if (is)
  try {
    io = /* @__PURE__ */ is.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch (e) {
    process.env.NODE_ENV !== "production" && Ue(`Error creating trusted types policy: ${e}`);
  }
const Sr = io ? (e) => io.createHTML(e) : (e) => e, vl = "http://www.w3.org/2000/svg", El = "http://www.w3.org/1998/Math/MathML", He = typeof document < "u" ? document : null, cs = He && /* @__PURE__ */ He.createElement("template"), Nl = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const s = t === "svg" ? He.createElementNS(vl, e) : t === "mathml" ? He.createElementNS(El, e) : n ? He.createElement(e, { is: n }) : He.createElement(e);
    return e === "select" && o && o.multiple != null && s.setAttribute("multiple", o.multiple), s;
  },
  createText: (e) => He.createTextNode(e),
  createComment: (e) => He.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => He.querySelector(e),
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
      cs.innerHTML = Sr(
        o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e
      );
      const c = cs.content;
      if (o === "svg" || o === "mathml") {
        const u = c.firstChild;
        for (; u.firstChild; )
          c.appendChild(u.firstChild);
        c.removeChild(u);
      }
      t.insertBefore(c, n);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, bl = Symbol("_vtc");
function yl(e, t, n) {
  const o = e[bl];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const ls = Symbol("_vod"), Ol = Symbol("_vsh"), Dl = Symbol(process.env.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : ""), xl = /(?:^|;)\s*display\s*:/;
function wl(e, t, n) {
  const o = e.style, s = J(n);
  let r = !1;
  if (n && !s) {
    if (t)
      if (J(t))
        for (const i of t.split(";")) {
          const c = i.slice(0, i.indexOf(":")).trim();
          n[c] == null && fn(o, c, "");
        }
      else
        for (const i in t)
          n[i] == null && fn(o, i, "");
    for (const i in n)
      i === "display" && (r = !0), fn(o, i, n[i]);
  } else if (s) {
    if (t !== n) {
      const i = o[Dl];
      i && (n += ";" + i), o.cssText = n, r = xl.test(n);
    }
  } else t && e.removeAttribute("style");
  ls in e && (e[ls] = r ? o.display : "", e[Ol] && (o.display = "none"));
}
const Vl = /[^\\];\s*$/, fs = /\s*!important$/;
function fn(e, t, n) {
  if ($(n))
    n.forEach((o) => fn(e, t, o));
  else if (n == null && (n = ""), process.env.NODE_ENV !== "production" && Vl.test(n) && Ue(
    `Unexpected semicolon at the end of '${t}' style value: '${n}'`
  ), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = Sl(e, t);
    fs.test(n) ? e.setProperty(
      Qe(o),
      n.replace(fs, ""),
      "important"
    ) : e[o] = n;
  }
}
const us = ["Webkit", "Moz", "ms"], Wn = {};
function Sl(e, t) {
  const n = Wn[t];
  if (n)
    return n;
  let o = Ne(t);
  if (o !== "filter" && o in e)
    return Wn[t] = o;
  o = Dn(o);
  for (let s = 0; s < us.length; s++) {
    const r = us[s] + o;
    if (r in e)
      return Wn[t] = r;
  }
  return t;
}
const as = "http://www.w3.org/1999/xlink";
function ps(e, t, n, o, s, r = Xr(t)) {
  o && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(as, t.slice(6, t.length)) : e.setAttributeNS(as, t, n) : n == null || r && !Ns(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : Et(n) ? String(n) : n
  );
}
function ds(e, t, n, o, s) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Sr(n) : n);
    return;
  }
  const r = e.tagName;
  if (t === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const c = r === "OPTION" ? e.getAttribute("value") || "" : e.value, u = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (c !== u || !("_value" in e)) && (e.value = u), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let i = !1;
  if (n === "" || n == null) {
    const c = typeof e[t];
    c === "boolean" ? n = Ns(n) : n == null && c === "string" ? (n = "", i = !0) : c === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch (c) {
    process.env.NODE_ENV !== "production" && !i && Ue(
      `Failed setting prop "${t}" on <${r.toLowerCase()}>: value ${n} is invalid.`,
      c
    );
  }
  i && e.removeAttribute(s || t);
}
function Cl(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function Tl(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
const hs = Symbol("_vei");
function $l(e, t, n, o, s = null) {
  const r = e[hs] || (e[hs] = {}), i = r[t];
  if (o && i)
    i.value = process.env.NODE_ENV !== "production" ? ms(o, t) : o;
  else {
    const [c, u] = Pl(t);
    if (o) {
      const d = r[t] = Il(
        process.env.NODE_ENV !== "production" ? ms(o, t) : o,
        s
      );
      Cl(e, c, d, u);
    } else i && (Tl(e, c, i, u), r[t] = void 0);
  }
}
const gs = /(?:Once|Passive|Capture)$/;
function Pl(e) {
  let t;
  if (gs.test(e)) {
    t = {};
    let o;
    for (; o = e.match(gs); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Qe(e.slice(2)), t];
}
let Kn = 0;
const Ml = /* @__PURE__ */ Promise.resolve(), Al = () => Kn || (Ml.then(() => Kn = 0), Kn = Date.now());
function Il(e, t) {
  const n = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= n.attached)
      return;
    Re(
      Rl(o, n.value),
      t,
      5,
      [o]
    );
  };
  return n.value = e, n.attached = Al(), n;
}
function ms(e, t) {
  return T(e) || $(e) ? e : (Ue(
    `Wrong type passed as event handler to ${t} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof e}.`
  ), X);
}
function Rl(e, t) {
  if ($(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (o) => (s) => !s._stopped && o && o(s)
    );
  } else
    return t;
}
const _s = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Fl = (e, t, n, o, s, r) => {
  const i = s === "svg";
  t === "class" ? yl(e, o, i) : t === "style" ? wl(e, n, o) : Kt(t) ? un(t) || $l(e, t, n, o, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : jl(e, t, o, i)) ? (ds(e, t, o), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && ps(e, t, o, i, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !J(o)) ? ds(e, Ne(t), o, r, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), ps(e, t, o, i));
};
function jl(e, t, n, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && _s(t) && T(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
      return !1;
  }
  return _s(t) && J(n) ? !1 : t in e;
}
const Hl = /* @__PURE__ */ Y({ patchProp: Fl }, Nl);
let vs;
function Ll() {
  return vs || (vs = Fc(Hl));
}
const Ul = ((...e) => {
  const t = Ll().createApp(...e);
  process.env.NODE_ENV !== "production" && (Wl(t), Kl(t));
  const { mount: n } = t;
  return t.mount = (o) => {
    const s = kl(o);
    if (!s) return;
    const r = t._component;
    !T(r) && !r.render && !r.template && (r.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const i = n(s, !1, Bl(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), i;
  }, t;
});
function Bl(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Wl(e) {
  Object.defineProperty(e.config, "isNativeTag", {
    value: (t) => qr(t) || Jr(t) || Yr(t),
    writable: !1
  });
}
function Kl(e) {
  {
    const t = e.config.isCustomElement;
    Object.defineProperty(e.config, "isCustomElement", {
      get() {
        return t;
      },
      set() {
        Ue(
          "The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead."
        );
      }
    });
    const n = e.config.compilerOptions, o = 'The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader\'s `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc';
    Object.defineProperty(e.config, "compilerOptions", {
      get() {
        return Ue(o), n;
      },
      set() {
        Ue(o);
      }
    });
  }
}
function kl(e) {
  if (J(e)) {
    const t = document.querySelector(e);
    return process.env.NODE_ENV !== "production" && !t && Ue(
      `Failed to mount app: mount target selector "${e}" returned null.`
    ), t;
  }
  return process.env.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && Ue(
    'mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs'
  ), e;
}
/**
* vue v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Gl() {
  _l();
}
process.env.NODE_ENV !== "production" && Gl();
const Cr = Symbol("GlobalJsonConfig"), ql = {
  install(e, t) {
    e.provide(Cr, t);
  }
};
function Jl() {
  const e = Ft(Cr);
  if (!e)
    throw new Error("Plugin GlobalJsonConfig not found.");
  return e;
}
const Yl = ["value"], zl = /* @__PURE__ */ Ys({
  __name: "cfgDiv",
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = Jl(), o = e, s = t;
    function r(i) {
      const c = i.target;
      s("update:modelValue", c.value);
    }
    return (i, c) => (_r(), Qc("textarea", {
      style: xn({
        backgroundColor: Ct(n).backgroundColor,
        color: Ct(n).textColor,
        width: Ct(n).width + "px",
        height: Ct(n).height + "px"
      }),
      value: o.modelValue,
      onInput: r
    }, "    ", 44, Yl));
  }
}), Xl = /* @__PURE__ */ Ys({
  __name: "example-props-emit",
  setup(e, { expose: t }) {
    const n = Ni("Anfangstext");
    return t({
      textValue: n
      // Freigegebene Property
    }), (o, s) => (_r(), el(zl, {
      modelValue: n.value,
      "onUpdate:modelValue": s[0] || (s[0] = (r) => n.value = r)
    }, null, 8, ["modelValue"]));
  }
});
function Zl(e) {
  const t = {}, n = it(e) ? A(e) : e;
  for (const o in n)
    if (Object.prototype.hasOwnProperty.call(n, o)) {
      const s = n[o];
      q(s) ? t[o] = s.value : t[o] = s;
    }
  return t;
}
const ef = (e, t, n) => {
  const o = Ul(Xl);
  o.use(ql, t);
  const r = o.mount(e);
  return n && rn(
    () => Zl(r),
    () => {
      n(r);
    },
    {
      deep: !0,
      // Überwacht auch Änderungen an verschachtelten Properties
      immediate: !0
      // Optional: Ruft das Callback sofort beim Mount auf
    }
  ), {
    app: o,
    state: r
  };
};
export {
  ef as initializeAndMount
};
