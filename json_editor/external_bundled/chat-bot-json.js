/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Ke(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const k = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, Et = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], X = () => {
}, Ss = () => !1, Gt = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), pn = (e) => e.startsWith("onUpdate:"), Y = Object.assign, mo = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Jr = Object.prototype.hasOwnProperty, j = (e, t) => Jr.call(e, t), C = Array.isArray, ct = (e) => wn(e) === "[object Map]", Ts = (e) => wn(e) === "[object Set]", $ = (e) => typeof e == "function", q = (e) => typeof e == "string", ot = (e) => typeof e == "symbol", K = (e) => e !== null && typeof e == "object", _o = (e) => (K(e) || $(e)) && $(e.then) && $(e.catch), Cs = Object.prototype.toString, wn = (e) => Cs.call(e), vo = (e) => wn(e).slice(8, -1), $s = (e) => wn(e) === "[object Object]", Eo = (e) => q(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Pt = /* @__PURE__ */ Ke(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Yr = /* @__PURE__ */ Ke(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), Vn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, zr = /-\w/g, Ne = Vn(
  (e) => e.replace(zr, (t) => t.slice(1).toUpperCase())
), Xr = /\B([A-Z])/g, tt = Vn(
  (e) => e.replace(Xr, "-$1").toLowerCase()
), Sn = Vn((e) => e.charAt(0).toUpperCase() + e.slice(1)), it = Vn(
  (e) => e ? `on${Sn(e)}` : ""
), Ze = (e, t) => !Object.is(e, t), St = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, dn = (e, t, n, o = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: o,
    value: n
  });
}, Zr = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Wo;
const qt = () => Wo || (Wo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Tn(e) {
  if (C(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], s = q(o) ? ni(o) : Tn(o);
      if (s)
        for (const r in s)
          t[r] = s[r];
    }
    return t;
  } else if (q(e) || K(e))
    return e;
}
const Qr = /;(?![^(]*\))/g, ei = /:([^]+)/, ti = /\/\*[^]*?\*\//g;
function ni(e) {
  const t = {};
  return e.replace(ti, "").split(Qr).forEach((n) => {
    if (n) {
      const o = n.split(ei);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function Cn(e) {
  let t = "";
  if (q(e))
    t = e;
  else if (C(e))
    for (let n = 0; n < e.length; n++) {
      const o = Cn(e[n]);
      o && (t += o + " ");
    }
  else if (K(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const oi = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", si = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", ri = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", ii = /* @__PURE__ */ Ke(oi), li = /* @__PURE__ */ Ke(si), ci = /* @__PURE__ */ Ke(ri), fi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", ui = /* @__PURE__ */ Ke(fi);
function As(e) {
  return !!e || e === "";
}
const Is = (e) => !!(e && e.__v_isRef === !0), bo = (e) => q(e) ? e : e == null ? "" : C(e) || K(e) && (e.toString === Cs || !$(e.toString)) ? Is(e) ? bo(e.value) : JSON.stringify(e, Ps, 2) : String(e), Ps = (e, t) => Is(t) ? Ps(e, t.value) : ct(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [o, s], r) => (n[Kn(o, r) + " =>"] = s, n),
    {}
  )
} : Ts(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Kn(n))
} : ot(t) ? Kn(t) : K(t) && !C(t) && !$s(t) ? String(t) : t, Kn = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    ot(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function De(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let ae;
class ai {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = ae, !t && ae && (this.index = (ae.scopes || (ae.scopes = [])).push(
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
      const n = ae;
      try {
        return ae = this, t();
      } finally {
        ae = n;
      }
    } else process.env.NODE_ENV !== "production" && De("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = ae, ae = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (ae = this.prevScope, this.prevScope = void 0);
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
function pi() {
  return ae;
}
let U;
const Wn = /* @__PURE__ */ new WeakSet();
class Ms {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ae && ae.active && ae.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Wn.has(this) && (Wn.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Fs(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Go(this), js(this);
    const t = U, n = ye;
    U = this, ye = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && U !== this && De(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), Hs(this), U = t, ye = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Oo(t);
      this.deps = this.depsTail = void 0, Go(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Wn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    eo(this) && this.run();
  }
  get dirty() {
    return eo(this);
  }
}
let Rs = 0, Mt, Rt;
function Fs(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Rt, Rt = e;
    return;
  }
  e.next = Mt, Mt = e;
}
function No() {
  Rs++;
}
function yo() {
  if (--Rs > 0)
    return;
  if (Rt) {
    let t = Rt;
    for (Rt = void 0; t; ) {
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
function js(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Hs(e) {
  let t, n = e.depsTail, o = n;
  for (; o; ) {
    const s = o.prevDep;
    o.version === -1 ? (o === n && (n = s), Oo(o), di(o)) : t = o, o.dep.activeLink = o.prevActiveLink, o.prevActiveLink = void 0, o = s;
  }
  e.deps = t, e.depsTail = n;
}
function eo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Ls(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Ls(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ut) || (e.globalVersion = Ut, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !eo(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = U, o = ye;
  U = e, ye = !0;
  try {
    js(e);
    const s = e.fn(e._value);
    (t.version === 0 || Ze(s, e._value)) && (e.flags |= 128, e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    U = n, ye = o, Hs(e), e.flags &= -3;
  }
}
function Oo(e, t = !1) {
  const { dep: n, prevSub: o, nextSub: s } = e;
  if (o && (o.nextSub = s, e.prevSub = void 0), s && (s.prevSub = o, e.nextSub = void 0), process.env.NODE_ENV !== "production" && n.subsHead === e && (n.subsHead = s), n.subs === e && (n.subs = o, !o && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep)
      Oo(r, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function di(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let ye = !0;
const Us = [];
function we() {
  Us.push(ye), ye = !1;
}
function Ve() {
  const e = Us.pop();
  ye = e === void 0 ? !0 : e;
}
function Go(e) {
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
let Ut = 0;
class hi {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class xo {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!U || !ye || U === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== U)
      n = this.activeLink = new hi(U, this), U.deps ? (n.prevDep = U.depsTail, U.depsTail.nextDep = n, U.depsTail = n) : U.deps = U.depsTail = n, Bs(n);
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
    this.version++, Ut++, this.notify(t);
  }
  notify(t) {
    No();
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
      yo();
    }
  }
}
function Bs(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let o = t.deps; o; o = o.nextDep)
        Bs(o);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const to = /* @__PURE__ */ new WeakMap(), ft = Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), no = Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), Bt = Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function z(e, t, n) {
  if (ye && U) {
    let o = to.get(e);
    o || to.set(e, o = /* @__PURE__ */ new Map());
    let s = o.get(n);
    s || (o.set(n, s = new xo()), s.map = o, s.key = n), process.env.NODE_ENV !== "production" ? s.track({
      target: e,
      type: t,
      key: n
    }) : s.track();
  }
}
function Pe(e, t, n, o, s, r) {
  const i = to.get(e);
  if (!i) {
    Ut++;
    return;
  }
  const l = (f) => {
    f && (process.env.NODE_ENV !== "production" ? f.trigger({
      target: e,
      type: t,
      key: n,
      newValue: o,
      oldValue: s,
      oldTarget: r
    }) : f.trigger());
  };
  if (No(), t === "clear")
    i.forEach(l);
  else {
    const f = C(e), d = f && Eo(n);
    if (f && n === "length") {
      const p = Number(o);
      i.forEach((a, g) => {
        (g === "length" || g === Bt || !ot(g) && g >= p) && l(a);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), d && l(i.get(Bt)), t) {
        case "add":
          f ? d && l(i.get("length")) : (l(i.get(ft)), ct(e) && l(i.get(no)));
          break;
        case "delete":
          f || (l(i.get(ft)), ct(e) && l(i.get(no)));
          break;
        case "set":
          ct(e) && l(i.get(ft));
          break;
      }
  }
  yo();
}
function gt(e) {
  const t = P(e);
  return t === e ? t : (z(t, "iterate", Bt), ie(e) ? t : t.map(ee));
}
function $n(e) {
  return z(e = P(e), "iterate", Bt), e;
}
const gi = {
  __proto__: null,
  [Symbol.iterator]() {
    return Gn(this, Symbol.iterator, ee);
  },
  concat(...e) {
    return gt(this).concat(
      ...e.map((t) => C(t) ? gt(t) : t)
    );
  },
  entries() {
    return Gn(this, "entries", (e) => (e[1] = ee(e[1]), e));
  },
  every(e, t) {
    return Le(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Le(this, "filter", e, t, (n) => n.map(ee), arguments);
  },
  find(e, t) {
    return Le(this, "find", e, t, ee, arguments);
  },
  findIndex(e, t) {
    return Le(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Le(this, "findLast", e, t, ee, arguments);
  },
  findLastIndex(e, t) {
    return Le(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Le(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return qn(this, "includes", e);
  },
  indexOf(...e) {
    return qn(this, "indexOf", e);
  },
  join(e) {
    return gt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return qn(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Le(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Tt(this, "pop");
  },
  push(...e) {
    return Tt(this, "push", e);
  },
  reduce(e, ...t) {
    return qo(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return qo(this, "reduceRight", e, t);
  },
  shift() {
    return Tt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Le(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Tt(this, "splice", e);
  },
  toReversed() {
    return gt(this).toReversed();
  },
  toSorted(e) {
    return gt(this).toSorted(e);
  },
  toSpliced(...e) {
    return gt(this).toSpliced(...e);
  },
  unshift(...e) {
    return Tt(this, "unshift", e);
  },
  values() {
    return Gn(this, "values", ee);
  }
};
function Gn(e, t, n) {
  const o = $n(e), s = o[t]();
  return o !== e && !ie(e) && (s._next = s.next, s.next = () => {
    const r = s._next();
    return r.done || (r.value = n(r.value)), r;
  }), s;
}
const mi = Array.prototype;
function Le(e, t, n, o, s, r) {
  const i = $n(e), l = i !== e && !ie(e), f = i[t];
  if (f !== mi[t]) {
    const a = f.apply(e, r);
    return l ? ee(a) : a;
  }
  let d = n;
  i !== e && (l ? d = function(a, g) {
    return n.call(this, ee(a), g, e);
  } : n.length > 2 && (d = function(a, g) {
    return n.call(this, a, g, e);
  }));
  const p = f.call(i, d, o);
  return l && s ? s(p) : p;
}
function qo(e, t, n, o) {
  const s = $n(e);
  let r = n;
  return s !== e && (ie(e) ? n.length > 3 && (r = function(i, l, f) {
    return n.call(this, i, l, f, e);
  }) : r = function(i, l, f) {
    return n.call(this, i, ee(l), f, e);
  }), s[t](r, ...o);
}
function qn(e, t, n) {
  const o = P(e);
  z(o, "iterate", Bt);
  const s = o[t](...n);
  return (s === -1 || s === !1) && hn(n[0]) ? (n[0] = P(n[0]), o[t](...n)) : s;
}
function Tt(e, t, n = []) {
  we(), No();
  const o = P(e)[t].apply(e, n);
  return yo(), Ve(), o;
}
const _i = /* @__PURE__ */ Ke("__proto__,__v_isRef,__isVue"), ks = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ot)
);
function vi(e) {
  ot(e) || (e = String(e));
  const t = P(this);
  return z(t, "has", e), t.hasOwnProperty(e);
}
class Ks {
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
      return o === (s ? r ? zs : Ys : r ? Js : qs).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const i = C(t);
    if (!s) {
      let f;
      if (i && (f = gi[n]))
        return f;
      if (n === "hasOwnProperty")
        return vi;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      J(t) ? t : o
    );
    if ((ot(n) ? ks.has(n) : _i(n)) || (s || z(t, "get", n), r))
      return l;
    if (J(l)) {
      const f = i && Eo(n) ? l : l.value;
      return s && K(f) ? so(f) : f;
    }
    return K(l) ? s ? so(l) : Do(l) : l;
  }
}
class Ws extends Ks {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, o, s) {
    let r = t[n];
    if (!this._isShallow) {
      const f = Fe(r);
      if (!ie(o) && !Fe(o) && (r = P(r), o = P(o)), !C(t) && J(r) && !J(o))
        return f ? (process.env.NODE_ENV !== "production" && De(
          `Set operation on key "${String(n)}" failed: target is readonly.`,
          t[n]
        ), !0) : (r.value = o, !0);
    }
    const i = C(t) && Eo(n) ? Number(n) < t.length : j(t, n), l = Reflect.set(
      t,
      n,
      o,
      J(t) ? t : s
    );
    return t === P(s) && (i ? Ze(o, r) && Pe(t, "set", n, o, r) : Pe(t, "add", n, o)), l;
  }
  deleteProperty(t, n) {
    const o = j(t, n), s = t[n], r = Reflect.deleteProperty(t, n);
    return r && o && Pe(t, "delete", n, void 0, s), r;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!ot(n) || !ks.has(n)) && z(t, "has", n), o;
  }
  ownKeys(t) {
    return z(
      t,
      "iterate",
      C(t) ? "length" : ft
    ), Reflect.ownKeys(t);
  }
}
class Gs extends Ks {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && De(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && De(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const Ei = /* @__PURE__ */ new Ws(), bi = /* @__PURE__ */ new Gs(), Ni = /* @__PURE__ */ new Ws(!0), yi = /* @__PURE__ */ new Gs(!0), oo = (e) => e, tn = (e) => Reflect.getPrototypeOf(e);
function Oi(e, t, n) {
  return function(...o) {
    const s = this.__v_raw, r = P(s), i = ct(r), l = e === "entries" || e === Symbol.iterator && i, f = e === "keys" && i, d = s[e](...o), p = n ? oo : t ? gn : ee;
    return !t && z(
      r,
      "iterate",
      f ? no : ft
    ), {
      // iterator protocol
      next() {
        const { value: a, done: g } = d.next();
        return g ? { value: a, done: g } : {
          value: l ? [p(a[0]), p(a[1])] : p(a),
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
function nn(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      De(
        `${Sn(e)} operation ${n}failed: target is readonly.`,
        P(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function xi(e, t) {
  const n = {
    get(s) {
      const r = this.__v_raw, i = P(r), l = P(s);
      e || (Ze(s, l) && z(i, "get", s), z(i, "get", l));
      const { has: f } = tn(i), d = t ? oo : e ? gn : ee;
      if (f.call(i, s))
        return d(r.get(s));
      if (f.call(i, l))
        return d(r.get(l));
      r !== i && r.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !e && z(P(s), "iterate", ft), s.size;
    },
    has(s) {
      const r = this.__v_raw, i = P(r), l = P(s);
      return e || (Ze(s, l) && z(i, "has", s), z(i, "has", l)), s === l ? r.has(s) : r.has(s) || r.has(l);
    },
    forEach(s, r) {
      const i = this, l = i.__v_raw, f = P(l), d = t ? oo : e ? gn : ee;
      return !e && z(f, "iterate", ft), l.forEach((p, a) => s.call(r, d(p), d(a), i));
    }
  };
  return Y(
    n,
    e ? {
      add: nn("add"),
      set: nn("set"),
      delete: nn("delete"),
      clear: nn("clear")
    } : {
      add(s) {
        !t && !ie(s) && !Fe(s) && (s = P(s));
        const r = P(this);
        return tn(r).has.call(r, s) || (r.add(s), Pe(r, "add", s, s)), this;
      },
      set(s, r) {
        !t && !ie(r) && !Fe(r) && (r = P(r));
        const i = P(this), { has: l, get: f } = tn(i);
        let d = l.call(i, s);
        d ? process.env.NODE_ENV !== "production" && Jo(i, l, s) : (s = P(s), d = l.call(i, s));
        const p = f.call(i, s);
        return i.set(s, r), d ? Ze(r, p) && Pe(i, "set", s, r, p) : Pe(i, "add", s, r), this;
      },
      delete(s) {
        const r = P(this), { has: i, get: l } = tn(r);
        let f = i.call(r, s);
        f ? process.env.NODE_ENV !== "production" && Jo(r, i, s) : (s = P(s), f = i.call(r, s));
        const d = l ? l.call(r, s) : void 0, p = r.delete(s);
        return f && Pe(r, "delete", s, void 0, d), p;
      },
      clear() {
        const s = P(this), r = s.size !== 0, i = process.env.NODE_ENV !== "production" ? ct(s) ? new Map(s) : new Set(s) : void 0, l = s.clear();
        return r && Pe(
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
    n[s] = Oi(s, e, t);
  }), n;
}
function An(e, t) {
  const n = xi(e, t);
  return (o, s, r) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get(
    j(n, s) && s in o ? n : o,
    s,
    r
  );
}
const Di = {
  get: /* @__PURE__ */ An(!1, !1)
}, wi = {
  get: /* @__PURE__ */ An(!1, !0)
}, Vi = {
  get: /* @__PURE__ */ An(!0, !1)
}, Si = {
  get: /* @__PURE__ */ An(!0, !0)
};
function Jo(e, t, n) {
  const o = P(n);
  if (o !== n && t.call(e, o)) {
    const s = vo(e);
    De(
      `Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const qs = /* @__PURE__ */ new WeakMap(), Js = /* @__PURE__ */ new WeakMap(), Ys = /* @__PURE__ */ new WeakMap(), zs = /* @__PURE__ */ new WeakMap();
function Ti(e) {
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
function Ci(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ti(vo(e));
}
function Do(e) {
  return Fe(e) ? e : In(
    e,
    !1,
    Ei,
    Di,
    qs
  );
}
function $i(e) {
  return In(
    e,
    !1,
    Ni,
    wi,
    Js
  );
}
function so(e) {
  return In(
    e,
    !0,
    bi,
    Vi,
    Ys
  );
}
function Me(e) {
  return In(
    e,
    !0,
    yi,
    Si,
    zs
  );
}
function In(e, t, n, o, s) {
  if (!K(e))
    return process.env.NODE_ENV !== "production" && De(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = Ci(e);
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
function Qe(e) {
  return Fe(e) ? Qe(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Fe(e) {
  return !!(e && e.__v_isReadonly);
}
function ie(e) {
  return !!(e && e.__v_isShallow);
}
function hn(e) {
  return e ? !!e.__v_raw : !1;
}
function P(e) {
  const t = e && e.__v_raw;
  return t ? P(t) : e;
}
function Ai(e) {
  return !j(e, "__v_skip") && Object.isExtensible(e) && dn(e, "__v_skip", !0), e;
}
const ee = (e) => K(e) ? Do(e) : e, gn = (e) => K(e) ? so(e) : e;
function J(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function Xs(e) {
  return Ii(e, !1);
}
function Ii(e, t) {
  return J(e) ? e : new Pi(e, t);
}
class Pi {
  constructor(t, n) {
    this.dep = new xo(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : P(t), this._value = n ? t : ee(t), this.__v_isShallow = n;
  }
  get value() {
    return process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, o = this.__v_isShallow || ie(t) || Fe(t);
    t = o ? t : P(t), Ze(t, n) && (this._rawValue = t, this._value = o ? t : ee(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }) : this.dep.trigger());
  }
}
function Zs(e) {
  return J(e) ? e.value : e;
}
const Mi = {
  get: (e, t, n) => t === "__v_raw" ? e : Zs(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const s = e[t];
    return J(s) && !J(n) ? (s.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function Qs(e) {
  return Qe(e) ? e : new Proxy(e, Mi);
}
class Ri {
  constructor(t, n, o) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new xo(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ut - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = o;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    U !== this)
      return Fs(this, !0), !0;
    process.env.NODE_ENV;
  }
  get value() {
    const t = process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track();
    return Ls(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter ? this.setter(t) : process.env.NODE_ENV !== "production" && De("Write operation failed: computed value is readonly");
  }
}
function Fi(e, t, n = !1) {
  let o, s;
  $(e) ? o = e : (o = e.get, s = e.set);
  const r = new Ri(o, s, n);
  return process.env.NODE_ENV, r;
}
const on = {}, mn = /* @__PURE__ */ new WeakMap();
let lt;
function ji(e, t = !1, n = lt) {
  if (n) {
    let o = mn.get(n);
    o || mn.set(n, o = []), o.push(e);
  } else process.env.NODE_ENV !== "production" && !t && De(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function Hi(e, t, n = k) {
  const { immediate: o, deep: s, once: r, scheduler: i, augmentJob: l, call: f } = n, d = (S) => {
    (n.onWarn || De)(
      "Invalid watch source: ",
      S,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, p = (S) => s ? S : ie(S) || s === !1 || s === 0 ? Xe(S, 1) : Xe(S);
  let a, g, x, A, V = !1, Z = !1;
  if (J(e) ? (g = () => e.value, V = ie(e)) : Qe(e) ? (g = () => p(e), V = !0) : C(e) ? (Z = !0, V = e.some((S) => Qe(S) || ie(S)), g = () => e.map((S) => {
    if (J(S))
      return S.value;
    if (Qe(S))
      return p(S);
    if ($(S))
      return f ? f(S, 2) : S();
    process.env.NODE_ENV !== "production" && d(S);
  })) : $(e) ? t ? g = f ? () => f(e, 2) : e : g = () => {
    if (x) {
      we();
      try {
        x();
      } finally {
        Ve();
      }
    }
    const S = lt;
    lt = a;
    try {
      return f ? f(e, 3, [A]) : e(A);
    } finally {
      lt = S;
    }
  } : (g = X, process.env.NODE_ENV !== "production" && d(e)), t && s) {
    const S = g, Q = s === !0 ? 1 / 0 : s;
    g = () => Xe(S(), Q);
  }
  const G = pi(), L = () => {
    a.stop(), G && G.active && mo(G.effects, a);
  };
  if (r && t) {
    const S = t;
    t = (...Q) => {
      S(...Q), L();
    };
  }
  let H = Z ? new Array(e.length).fill(on) : on;
  const pe = (S) => {
    if (!(!(a.flags & 1) || !a.dirty && !S))
      if (t) {
        const Q = a.run();
        if (s || V || (Z ? Q.some((me, ne) => Ze(me, H[ne])) : Ze(Q, H))) {
          x && x();
          const me = lt;
          lt = a;
          try {
            const ne = [
              Q,
              // pass undefined as the old value when it's changed for the first time
              H === on ? void 0 : Z && H[0] === on ? [] : H,
              A
            ];
            H = Q, f ? f(t, 3, ne) : (
              // @ts-expect-error
              t(...ne)
            );
          } finally {
            lt = me;
          }
        }
      } else
        a.run();
  };
  return l && l(pe), a = new Ms(g), a.scheduler = i ? () => i(pe, !1) : pe, A = (S) => ji(S, !1, a), x = a.onStop = () => {
    const S = mn.get(a);
    if (S) {
      if (f)
        f(S, 4);
      else
        for (const Q of S) Q();
      mn.delete(a);
    }
  }, process.env.NODE_ENV !== "production" && (a.onTrack = n.onTrack, a.onTrigger = n.onTrigger), t ? o ? pe(!0) : H = a.run() : i ? i(pe.bind(null, !0), !0) : a.run(), L.pause = a.pause.bind(a), L.resume = a.resume.bind(a), L.stop = L, L;
}
function Xe(e, t = 1 / 0, n) {
  if (t <= 0 || !K(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, J(e))
    Xe(e.value, t, n);
  else if (C(e))
    for (let o = 0; o < e.length; o++)
      Xe(e[o], t, n);
  else if (Ts(e) || ct(e))
    e.forEach((o) => {
      Xe(o, t, n);
    });
  else if ($s(e)) {
    for (const o in e)
      Xe(e[o], t, n);
    for (const o of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, o) && Xe(e[o], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const ut = [];
function sn(e) {
  ut.push(e);
}
function rn() {
  ut.pop();
}
let Jn = !1;
function y(e, ...t) {
  if (Jn) return;
  Jn = !0, we();
  const n = ut.length ? ut[ut.length - 1].component : null, o = n && n.appContext.config.warnHandler, s = Li();
  if (o)
    Ot(
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
          ({ vnode: r }) => `at <${jn(n, r.type)}>`
        ).join(`
`),
        s
      ]
    );
  else {
    const r = [`[Vue warn]: ${e}`, ...t];
    s.length && r.push(`
`, ...Ui(s)), console.warn(...r);
  }
  Ve(), Jn = !1;
}
function Li() {
  let e = ut[ut.length - 1];
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
function Ui(e) {
  const t = [];
  return e.forEach((n, o) => {
    t.push(...o === 0 ? [] : [`
`], ...Bi(n));
  }), t;
}
function Bi({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, s = ` at <${jn(
    e.component,
    e.type,
    o
  )}`, r = ">" + n;
  return e.props ? [s, ...ki(e.props), r] : [s + r];
}
function ki(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((o) => {
    t.push(...er(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function er(e, t, n) {
  return q(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : J(t) ? (t = er(e, P(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : $(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = P(t), n ? t : [`${e}=`, t]);
}
const wo = {
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
function Ot(e, t, n, o) {
  try {
    return o ? e(...o) : e();
  } catch (s) {
    Jt(s, t, n);
  }
}
function je(e, t, n, o) {
  if ($(e)) {
    const s = Ot(e, t, n, o);
    return s && _o(s) && s.catch((r) => {
      Jt(r, t, n);
    }), s;
  }
  if (C(e)) {
    const s = [];
    for (let r = 0; r < e.length; r++)
      s.push(je(e[r], t, n, o));
    return s;
  } else process.env.NODE_ENV !== "production" && y(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function Jt(e, t, n, o = !0) {
  const s = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: i } = t && t.appContext.config || k;
  if (t) {
    let l = t.parent;
    const f = t.proxy, d = process.env.NODE_ENV !== "production" ? wo[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const p = l.ec;
      if (p) {
        for (let a = 0; a < p.length; a++)
          if (p[a](e, f, d) === !1)
            return;
      }
      l = l.parent;
    }
    if (r) {
      we(), Ot(r, null, 10, [
        e,
        f,
        d
      ]), Ve();
      return;
    }
  }
  Ki(e, n, s, o, i);
}
function Ki(e, t, n, o = !0, s = !1) {
  if (process.env.NODE_ENV !== "production") {
    const r = wo[t];
    if (n && sn(n), y(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && rn(), o)
      throw e;
    console.error(e);
  } else {
    if (s)
      throw e;
    console.error(e);
  }
}
const re = [];
let Ie = -1;
const bt = [];
let Ye = null, vt = 0;
const tr = /* @__PURE__ */ Promise.resolve();
let _n = null;
const Wi = 100;
function nr(e) {
  const t = _n || tr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Gi(e) {
  let t = Ie + 1, n = re.length;
  for (; t < n; ) {
    const o = t + n >>> 1, s = re[o], r = kt(s);
    r < e || r === e && s.flags & 2 ? t = o + 1 : n = o;
  }
  return t;
}
function Pn(e) {
  if (!(e.flags & 1)) {
    const t = kt(e), n = re[re.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= kt(n) ? re.push(e) : re.splice(Gi(t), 0, e), e.flags |= 1, or();
  }
}
function or() {
  _n || (_n = tr.then(ir));
}
function sr(e) {
  C(e) ? bt.push(...e) : Ye && e.id === -1 ? Ye.splice(vt + 1, 0, e) : e.flags & 1 || (bt.push(e), e.flags |= 1), or();
}
function Yo(e, t, n = Ie + 1) {
  for (process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()); n < re.length; n++) {
    const o = re[n];
    if (o && o.flags & 2) {
      if (e && o.id !== e.uid || process.env.NODE_ENV !== "production" && Vo(t, o))
        continue;
      re.splice(n, 1), n--, o.flags & 4 && (o.flags &= -2), o(), o.flags & 4 || (o.flags &= -2);
    }
  }
}
function rr(e) {
  if (bt.length) {
    const t = [...new Set(bt)].sort(
      (n, o) => kt(n) - kt(o)
    );
    if (bt.length = 0, Ye) {
      Ye.push(...t);
      return;
    }
    for (Ye = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), vt = 0; vt < Ye.length; vt++) {
      const n = Ye[vt];
      process.env.NODE_ENV !== "production" && Vo(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    Ye = null, vt = 0;
  }
}
const kt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function ir(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => Vo(e, n) : X;
  try {
    for (Ie = 0; Ie < re.length; Ie++) {
      const n = re[Ie];
      if (n && !(n.flags & 8)) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        n.flags & 4 && (n.flags &= -2), Ot(
          n,
          n.i,
          n.i ? 15 : 14
        ), n.flags & 4 || (n.flags &= -2);
      }
    }
  } finally {
    for (; Ie < re.length; Ie++) {
      const n = re[Ie];
      n && (n.flags &= -2);
    }
    Ie = -1, re.length = 0, rr(e), _n = null, (re.length || bt.length) && ir(e);
  }
}
function Vo(e, t) {
  const n = e.get(t) || 0;
  if (n > Wi) {
    const o = t.i, s = o && Br(o.type);
    return Jt(
      `Maximum recursive updates exceeded${s ? ` in component <${s}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
let Re = !1;
const ln = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (qt().__VUE_HMR_RUNTIME__ = {
  createRecord: Yn(lr),
  rerender: Yn(Yi),
  reload: Yn(zi)
});
const dt = /* @__PURE__ */ new Map();
function qi(e) {
  const t = e.type.__hmrId;
  let n = dt.get(t);
  n || (lr(t, e.type), n = dt.get(t)), n.instances.add(e);
}
function Ji(e) {
  dt.get(e.type.__hmrId).instances.delete(e);
}
function lr(e, t) {
  return dt.has(e) ? !1 : (dt.set(e, {
    initialDef: vn(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function vn(e) {
  return kr(e) ? e.__vccOpts : e;
}
function Yi(e, t) {
  const n = dt.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, vn(o.type).render = t), o.renderCache = [], Re = !0, o.job.flags & 8 || o.update(), Re = !1;
  }));
}
function zi(e, t) {
  const n = dt.get(e);
  if (!n) return;
  t = vn(t), zo(n.initialDef, t);
  const o = [...n.instances];
  for (let s = 0; s < o.length; s++) {
    const r = o[s], i = vn(r.type);
    let l = ln.get(i);
    l || (i !== n.initialDef && zo(i, t), ln.set(i, l = /* @__PURE__ */ new Set())), l.add(r), r.appContext.propsCache.delete(r.type), r.appContext.emitsCache.delete(r.type), r.appContext.optionsCache.delete(r.type), r.ceReload ? (l.add(r), r.ceReload(t.styles), l.delete(r)) : r.parent ? Pn(() => {
      r.job.flags & 8 || (Re = !0, r.parent.update(), Re = !1, l.delete(r));
    }) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), r.root.ce && r !== r.root && r.root.ce._removeChildStyle(i);
  }
  sr(() => {
    ln.clear();
  });
}
function zo(e, t) {
  Y(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Yn(e) {
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
let be, At = [], ro = !1;
function Yt(e, ...t) {
  be ? be.emit(e, ...t) : ro || At.push({ event: e, args: t });
}
function So(e, t) {
  var n, o;
  be = e, be ? (be.enabled = !0, At.forEach(({ event: s, args: r }) => be.emit(s, ...r)), At = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((o = (n = window.navigator) == null ? void 0 : n.userAgent) != null && o.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((r) => {
    So(r, t);
  }), setTimeout(() => {
    be || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, ro = !0, At = []);
  }, 3e3)) : (ro = !0, At = []);
}
function Xi(e, t) {
  Yt("app:init", e, t, {
    Fragment: _e,
    Text: Xt,
    Comment: Oe,
    Static: fn
  });
}
function Zi(e) {
  Yt("app:unmount", e);
}
const Qi = /* @__PURE__ */ To(
  "component:added"
  /* COMPONENT_ADDED */
), cr = /* @__PURE__ */ To(
  "component:updated"
  /* COMPONENT_UPDATED */
), el = /* @__PURE__ */ To(
  "component:removed"
  /* COMPONENT_REMOVED */
), tl = (e) => {
  be && typeof be.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !be.cleanupBuffer(e) && el(e);
};
// @__NO_SIDE_EFFECTS__
function To(e) {
  return (t) => {
    Yt(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
const nl = /* @__PURE__ */ fr(
  "perf:start"
  /* PERFORMANCE_START */
), ol = /* @__PURE__ */ fr(
  "perf:end"
  /* PERFORMANCE_END */
);
function fr(e) {
  return (t, n, o) => {
    Yt(e, t.appContext.app, t.uid, t, n, o);
  };
}
function sl(e, t, n) {
  Yt(
    "component:emit",
    e.appContext.app,
    e,
    t,
    n
  );
}
let he = null, ur = null;
function En(e) {
  const t = he;
  return he = e, ur = e && e.type.__scopeId || null, t;
}
function rl(e, t = he, n) {
  if (!t || e._n)
    return e;
  const o = (...s) => {
    o._d && us(-1);
    const r = En(t);
    let i;
    try {
      i = e(...s);
    } finally {
      En(r), o._d && us(1);
    }
    return process.env.NODE_ENV !== "production" && cr(t), i;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function ar(e) {
  Yr(e) && y("Do not use built-in directive ids as custom directive id: " + e);
}
function st(e, t, n, o) {
  const s = e.dirs, r = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const l = s[i];
    r && (l.oldValue = r[i].value);
    let f = l.dir[o];
    f && (we(), je(f, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Ve());
  }
}
const il = Symbol("_vte"), ll = (e) => e.__isTeleport, cl = Symbol("_leaveCb");
function Co(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Co(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function zt(e, t) {
  return $(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Y({ name: e.name }, t, { setup: e })
  ) : e;
}
function pr(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const Xo = /* @__PURE__ */ new WeakSet(), bn = /* @__PURE__ */ new WeakMap();
function Ft(e, t, n, o, s = !1) {
  if (C(e)) {
    e.forEach(
      (V, Z) => Ft(
        V,
        t && (C(t) ? t[Z] : t),
        n,
        o,
        s
      )
    );
    return;
  }
  if (jt(o) && !s) {
    o.shapeFlag & 512 && o.type.__asyncResolved && o.component.subTree.component && Ft(e, t, n, o.component.subTree);
    return;
  }
  const r = o.shapeFlag & 4 ? jo(o.component) : o.el, i = s ? null : r, { i: l, r: f } = e;
  if (process.env.NODE_ENV !== "production" && !l) {
    y(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const d = t && t.r, p = l.refs === k ? l.refs = {} : l.refs, a = l.setupState, g = P(a), x = a === k ? Ss : (V) => process.env.NODE_ENV !== "production" && (j(g, V) && !J(g[V]) && y(
    `Template ref "${V}" used on a non-ref value. It will not work in the production build.`
  ), Xo.has(g[V])) ? !1 : j(g, V), A = (V) => process.env.NODE_ENV === "production" || !Xo.has(V);
  if (d != null && d !== f) {
    if (Zo(t), q(d))
      p[d] = null, x(d) && (a[d] = null);
    else if (J(d)) {
      A(d) && (d.value = null);
      const V = t;
      V.k && (p[V.k] = null);
    }
  }
  if ($(f))
    Ot(f, l, 12, [i, p]);
  else {
    const V = q(f), Z = J(f);
    if (V || Z) {
      const G = () => {
        if (e.f) {
          const L = V ? x(f) ? a[f] : p[f] : A(f) || !e.k ? f.value : p[e.k];
          if (s)
            C(L) && mo(L, r);
          else if (C(L))
            L.includes(r) || L.push(r);
          else if (V)
            p[f] = [r], x(f) && (a[f] = p[f]);
          else {
            const H = [r];
            A(f) && (f.value = H), e.k && (p[e.k] = H);
          }
        } else V ? (p[f] = i, x(f) && (a[f] = i)) : Z ? (A(f) && (f.value = i), e.k && (p[e.k] = i)) : process.env.NODE_ENV !== "production" && y("Invalid template ref type:", f, `(${typeof f})`);
      };
      if (i) {
        const L = () => {
          G(), bn.delete(e);
        };
        L.id = -1, bn.set(e, L), de(L, n);
      } else
        Zo(e), G();
    } else process.env.NODE_ENV !== "production" && y("Invalid template ref type:", f, `(${typeof f})`);
  }
}
function Zo(e) {
  const t = bn.get(e);
  t && (t.flags |= 8, bn.delete(e));
}
qt().requestIdleCallback;
qt().cancelIdleCallback;
const jt = (e) => !!e.type.__asyncLoader, $o = (e) => e.type.__isKeepAlive;
function fl(e, t) {
  dr(e, "a", t);
}
function ul(e, t) {
  dr(e, "da", t);
}
function dr(e, t, n = te) {
  const o = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if (Mn(t, o, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      $o(s.parent.vnode) && al(o, t, n, s), s = s.parent;
  }
}
function al(e, t, n, o) {
  const s = Mn(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  gr(() => {
    mo(o[t], s);
  }, n);
}
function Mn(e, t, n = te, o = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...i) => {
      we();
      const l = Zt(n), f = je(t, n, e, i);
      return l(), Ve(), f;
    });
    return o ? s.unshift(r) : s.push(r), r;
  } else if (process.env.NODE_ENV !== "production") {
    const s = it(wo[e].replace(/ hook$/, ""));
    y(
      `${s} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const We = (e) => (t, n = te) => {
  (!Wt || e === "sp") && Mn(e, (...o) => t(...o), n);
}, pl = We("bm"), hr = We("m"), dl = We(
  "bu"
), hl = We("u"), gl = We(
  "bum"
), gr = We("um"), ml = We(
  "sp"
), _l = We("rtg"), vl = We("rtc");
function El(e, t = te) {
  Mn("ec", e, t);
}
const bl = Symbol.for("v-ndc");
function mr(e, t, n, o) {
  let s;
  const r = n, i = C(e);
  if (i || q(e)) {
    const l = i && Qe(e);
    let f = !1, d = !1;
    l && (f = !ie(e), d = Fe(e), e = $n(e)), s = new Array(e.length);
    for (let p = 0, a = e.length; p < a; p++)
      s[p] = t(
        f ? d ? gn(ee(e[p])) : ee(e[p]) : e[p],
        p,
        void 0,
        r
      );
  } else if (typeof e == "number") {
    process.env.NODE_ENV !== "production" && !Number.isInteger(e) && y(`The v-for range expect an integer value but got ${e}.`), s = new Array(e);
    for (let l = 0; l < e; l++)
      s[l] = t(l + 1, l, void 0, r);
  } else if (K(e))
    if (e[Symbol.iterator])
      s = Array.from(
        e,
        (l, f) => t(l, f, void 0, r)
      );
    else {
      const l = Object.keys(e);
      s = new Array(l.length);
      for (let f = 0, d = l.length; f < d; f++) {
        const p = l[f];
        s[f] = t(e[p], p, f, r);
      }
    }
  else
    s = [];
  return s;
}
const io = (e) => e ? Lr(e) ? jo(e) : io(e.parent) : null, at = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Y(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? Me(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? Me(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? Me(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? Me(e.refs) : e.refs,
    $parent: (e) => io(e.parent),
    $root: (e) => io(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Er(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Pn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = nr.bind(e.proxy)),
    $watch: (e) => Ql.bind(e)
  })
), Ao = (e) => e === "_" || e === "$", zn = (e, t) => e !== k && !e.__isScriptSetup && j(e, t), _r = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: o, data: s, props: r, accessCache: i, type: l, appContext: f } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let d;
    if (t[0] !== "$") {
      const x = i[t];
      if (x !== void 0)
        switch (x) {
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
        if (zn(o, t))
          return i[t] = 1, o[t];
        if (s !== k && j(s, t))
          return i[t] = 2, s[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (d = e.propsOptions[0]) && j(d, t)
        )
          return i[t] = 3, r[t];
        if (n !== k && j(n, t))
          return i[t] = 4, n[t];
        lo && (i[t] = 0);
      }
    }
    const p = at[t];
    let a, g;
    if (p)
      return t === "$attrs" ? (z(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && On()) : process.env.NODE_ENV !== "production" && t === "$slots" && z(e, "get", t), p(e);
    if (
      // css module (injected by vue-loader)
      (a = l.__cssModules) && (a = a[t])
    )
      return a;
    if (n !== k && j(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      g = f.config.globalProperties, j(g, t)
    )
      return g[t];
    process.env.NODE_ENV !== "production" && he && (!q(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (s !== k && Ao(t[0]) && j(s, t) ? y(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === he && y(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: s, ctx: r } = e;
    return zn(s, t) ? (s[t] = n, !0) : process.env.NODE_ENV !== "production" && s.__isScriptSetup && j(s, t) ? (y(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : o !== k && j(o, t) ? (o[t] = n, !0) : j(e.props, t) ? (process.env.NODE_ENV !== "production" && y(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && y(
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
    let f, d;
    return !!(n[l] || e !== k && l[0] !== "$" && j(e, l) || zn(t, l) || (f = r[0]) && j(f, l) || j(o, l) || j(at, l) || j(s.config.globalProperties, l) || (d = i.__cssModules) && d[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : j(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (_r.ownKeys = (e) => (y(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function Nl(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys(at).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => at[n](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: X
    });
  }), t;
}
function yl(e) {
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
function Ol(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(P(n)).forEach((o) => {
    if (!n.__isScriptSetup) {
      if (Ao(o[0])) {
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
function Qo(e) {
  return C(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function xl() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? y(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let lo = !0;
function Dl(e) {
  const t = Er(e), n = e.proxy, o = e.ctx;
  lo = !1, t.beforeCreate && es(t.beforeCreate, e, "bc");
  const {
    // state
    data: s,
    computed: r,
    methods: i,
    watch: l,
    provide: f,
    inject: d,
    // lifecycle
    created: p,
    beforeMount: a,
    mounted: g,
    beforeUpdate: x,
    updated: A,
    activated: V,
    deactivated: Z,
    beforeDestroy: G,
    beforeUnmount: L,
    destroyed: H,
    unmounted: pe,
    render: S,
    renderTracked: Q,
    renderTriggered: me,
    errorCaptured: ne,
    serverPrefetch: le,
    // public API
    expose: He,
    inheritAttrs: Ge,
    // assets
    components: ve,
    directives: Qt,
    filters: Lo
  } = t, qe = process.env.NODE_ENV !== "production" ? xl() : null;
  if (process.env.NODE_ENV !== "production") {
    const [R] = e.propsOptions;
    if (R)
      for (const M in R)
        qe("Props", M);
  }
  if (d && wl(d, o, qe), i)
    for (const R in i) {
      const M = i[R];
      $(M) ? (process.env.NODE_ENV !== "production" ? Object.defineProperty(o, R, {
        value: M.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : o[R] = M.bind(n), process.env.NODE_ENV !== "production" && qe("Methods", R)) : process.env.NODE_ENV !== "production" && y(
        `Method "${R}" has type "${typeof M}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (s) {
    process.env.NODE_ENV !== "production" && !$(s) && y(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const R = s.call(n, n);
    if (process.env.NODE_ENV !== "production" && _o(R) && y(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !K(R))
      process.env.NODE_ENV !== "production" && y("data() should return an object.");
    else if (e.data = Do(R), process.env.NODE_ENV !== "production")
      for (const M in R)
        qe("Data", M), Ao(M[0]) || Object.defineProperty(o, M, {
          configurable: !0,
          enumerable: !0,
          get: () => R[M],
          set: X
        });
  }
  if (lo = !0, r)
    for (const R in r) {
      const M = r[R], Se = $(M) ? M.bind(n, n) : $(M.get) ? M.get.bind(n, n) : X;
      process.env.NODE_ENV !== "production" && Se === X && y(`Computed property "${R}" has no getter.`);
      const Un = !$(M) && $(M.set) ? M.set.bind(n) : process.env.NODE_ENV !== "production" ? () => {
        y(
          `Write operation failed: computed property "${R}" is readonly.`
        );
      } : X, xt = Ho({
        get: Se,
        set: Un
      });
      Object.defineProperty(o, R, {
        enumerable: !0,
        configurable: !0,
        get: () => xt.value,
        set: (ht) => xt.value = ht
      }), process.env.NODE_ENV !== "production" && qe("Computed", R);
    }
  if (l)
    for (const R in l)
      vr(l[R], o, n, R);
  if (f) {
    const R = $(f) ? f.call(n) : f;
    Reflect.ownKeys(R).forEach((M) => {
      Al(M, R[M]);
    });
  }
  p && es(p, e, "c");
  function ce(R, M) {
    C(M) ? M.forEach((Se) => R(Se.bind(n))) : M && R(M.bind(n));
  }
  if (ce(pl, a), ce(hr, g), ce(dl, x), ce(hl, A), ce(fl, V), ce(ul, Z), ce(El, ne), ce(vl, Q), ce(_l, me), ce(gl, L), ce(gr, pe), ce(ml, le), C(He))
    if (He.length) {
      const R = e.exposed || (e.exposed = {});
      He.forEach((M) => {
        Object.defineProperty(R, M, {
          get: () => n[M],
          set: (Se) => n[M] = Se,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  S && e.render === X && (e.render = S), Ge != null && (e.inheritAttrs = Ge), ve && (e.components = ve), Qt && (e.directives = Qt), le && pr(e);
}
function wl(e, t, n = X) {
  C(e) && (e = co(e));
  for (const o in e) {
    const s = e[o];
    let r;
    K(s) ? "default" in s ? r = Ht(
      s.from || o,
      s.default,
      !0
    ) : r = Ht(s.from || o) : r = Ht(s), J(r) ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (i) => r.value = i
    }) : t[o] = r, process.env.NODE_ENV !== "production" && n("Inject", o);
  }
}
function es(e, t, n) {
  je(
    C(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function vr(e, t, n, o) {
  let s = o.includes(".") ? $r(n, o) : () => n[o];
  if (q(e)) {
    const r = t[e];
    $(r) ? yt(s, r) : process.env.NODE_ENV !== "production" && y(`Invalid watch handler specified by key "${e}"`, r);
  } else if ($(e))
    yt(s, e.bind(n));
  else if (K(e))
    if (C(e))
      e.forEach((r) => vr(r, t, n, o));
    else {
      const r = $(e.handler) ? e.handler.bind(n) : t[e.handler];
      $(r) ? yt(s, r, e) : process.env.NODE_ENV !== "production" && y(`Invalid watch handler specified by key "${e.handler}"`, r);
    }
  else process.env.NODE_ENV !== "production" && y(`Invalid watch option: "${o}"`, e);
}
function Er(e) {
  const t = e.type, { mixins: n, extends: o } = t, {
    mixins: s,
    optionsCache: r,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = r.get(t);
  let f;
  return l ? f = l : !s.length && !n && !o ? f = t : (f = {}, s.length && s.forEach(
    (d) => Nn(f, d, i, !0)
  ), Nn(f, t, i)), K(t) && r.set(t, f), f;
}
function Nn(e, t, n, o = !1) {
  const { mixins: s, extends: r } = t;
  r && Nn(e, r, n, !0), s && s.forEach(
    (i) => Nn(e, i, n, !0)
  );
  for (const i in t)
    if (o && i === "expose")
      process.env.NODE_ENV !== "production" && y(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const l = Vl[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Vl = {
  data: ts,
  props: ns,
  emits: ns,
  // objects
  methods: It,
  computed: It,
  // lifecycle
  beforeCreate: se,
  created: se,
  beforeMount: se,
  mounted: se,
  beforeUpdate: se,
  updated: se,
  beforeDestroy: se,
  beforeUnmount: se,
  destroyed: se,
  unmounted: se,
  activated: se,
  deactivated: se,
  errorCaptured: se,
  serverPrefetch: se,
  // assets
  components: It,
  directives: It,
  // watch
  watch: Tl,
  // provide / inject
  provide: ts,
  inject: Sl
};
function ts(e, t) {
  return t ? e ? function() {
    return Y(
      $(e) ? e.call(this, this) : e,
      $(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Sl(e, t) {
  return It(co(e), co(t));
}
function co(e) {
  if (C(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function se(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function It(e, t) {
  return e ? Y(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ns(e, t) {
  return e ? C(e) && C(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Y(
    /* @__PURE__ */ Object.create(null),
    Qo(e),
    Qo(t ?? {})
  ) : t;
}
function Tl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Y(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = se(e[o], t[o]);
  return n;
}
function br() {
  return {
    app: null,
    config: {
      isNativeTag: Ss,
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
let Cl = 0;
function $l(e, t) {
  return function(o, s = null) {
    $(o) || (o = Y({}, o)), s != null && !K(s) && (process.env.NODE_ENV !== "production" && y("root props passed to app.mount() must be an object."), s = null);
    const r = br(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let f = !1;
    const d = r.app = {
      _uid: Cl++,
      _component: o,
      _props: s,
      _container: null,
      _context: r,
      _instance: null,
      version: hs,
      get config() {
        return r.config;
      },
      set config(p) {
        process.env.NODE_ENV !== "production" && y(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(p, ...a) {
        return i.has(p) ? process.env.NODE_ENV !== "production" && y("Plugin has already been applied to target app.") : p && $(p.install) ? (i.add(p), p.install(d, ...a)) : $(p) ? (i.add(p), p(d, ...a)) : process.env.NODE_ENV !== "production" && y(
          'A plugin must either be a function or an object with an "install" function.'
        ), d;
      },
      mixin(p) {
        return r.mixins.includes(p) ? process.env.NODE_ENV !== "production" && y(
          "Mixin has already been applied to target app" + (p.name ? `: ${p.name}` : "")
        ) : r.mixins.push(p), d;
      },
      component(p, a) {
        return process.env.NODE_ENV !== "production" && ho(p, r.config), a ? (process.env.NODE_ENV !== "production" && r.components[p] && y(`Component "${p}" has already been registered in target app.`), r.components[p] = a, d) : r.components[p];
      },
      directive(p, a) {
        return process.env.NODE_ENV !== "production" && ar(p), a ? (process.env.NODE_ENV !== "production" && r.directives[p] && y(`Directive "${p}" has already been registered in target app.`), r.directives[p] = a, d) : r.directives[p];
      },
      mount(p, a, g) {
        if (f)
          process.env.NODE_ENV !== "production" && y(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          process.env.NODE_ENV !== "production" && p.__vue_app__ && y(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const x = d._ceVNode || xe(o, s);
          return x.appContext = r, g === !0 ? g = "svg" : g === !1 && (g = void 0), process.env.NODE_ENV !== "production" && (r.reload = () => {
            const A = nt(x);
            A.el = null, e(A, p, g);
          }), e(x, p, g), f = !0, d._container = p, p.__vue_app__ = d, process.env.NODE_ENV !== "production" && (d._instance = x.component, Xi(d, hs)), jo(x.component);
        }
      },
      onUnmount(p) {
        process.env.NODE_ENV !== "production" && typeof p != "function" && y(
          `Expected function as first argument to app.onUnmount(), but got ${typeof p}`
        ), l.push(p);
      },
      unmount() {
        f ? (je(
          l,
          d._instance,
          16
        ), e(null, d._container), process.env.NODE_ENV !== "production" && (d._instance = null, Zi(d)), delete d._container.__vue_app__) : process.env.NODE_ENV !== "production" && y("Cannot unmount an app that is not mounted.");
      },
      provide(p, a) {
        return process.env.NODE_ENV !== "production" && p in r.provides && (j(r.provides, p) ? y(
          `App already provides property with key "${String(p)}". It will be overwritten with the new value.`
        ) : y(
          `App already provides property with key "${String(p)}" inherited from its parent element. It will be overwritten with the new value.`
        )), r.provides[p] = a, d;
      },
      runWithContext(p) {
        const a = Nt;
        Nt = d;
        try {
          return p();
        } finally {
          Nt = a;
        }
      }
    };
    return d;
  };
}
let Nt = null;
function Al(e, t) {
  if (!te)
    process.env.NODE_ENV !== "production" && y("provide() can only be used inside setup().");
  else {
    let n = te.provides;
    const o = te.parent && te.parent.provides;
    o === n && (n = te.provides = Object.create(o)), n[e] = t;
  }
}
function Ht(e, t, n = !1) {
  const o = Hr();
  if (o || Nt) {
    let s = Nt ? Nt._context.provides : o ? o.parent == null || o.ce ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : void 0;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return n && $(t) ? t.call(o && o.proxy) : t;
    process.env.NODE_ENV !== "production" && y(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && y("inject() can only be used inside setup() or functional components.");
}
const Nr = {}, yr = () => Object.create(Nr), Or = (e) => Object.getPrototypeOf(e) === Nr;
function Il(e, t, n, o = !1) {
  const s = {}, r = yr();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), xr(e, t, s, r);
  for (const i in e.propsOptions[0])
    i in s || (s[i] = void 0);
  process.env.NODE_ENV !== "production" && wr(t || {}, s, e), n ? e.props = o ? s : $i(s) : e.type.props ? e.props = s : e.props = r, e.attrs = r;
}
function Pl(e) {
  for (; e; ) {
    if (e.type.__hmrId) return !0;
    e = e.parent;
  }
}
function Ml(e, t, n, o) {
  const {
    props: s,
    attrs: r,
    vnode: { patchFlag: i }
  } = e, l = P(s), [f] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(process.env.NODE_ENV !== "production" && Pl(e)) && (o || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const p = e.vnode.dynamicProps;
      for (let a = 0; a < p.length; a++) {
        let g = p[a];
        if (Rn(e.emitsOptions, g))
          continue;
        const x = t[g];
        if (f)
          if (j(r, g))
            x !== r[g] && (r[g] = x, d = !0);
          else {
            const A = Ne(g);
            s[A] = fo(
              f,
              l,
              A,
              x,
              e,
              !1
            );
          }
        else
          x !== r[g] && (r[g] = x, d = !0);
      }
    }
  } else {
    xr(e, t, s, r) && (d = !0);
    let p;
    for (const a in l)
      (!t || // for camelCase
      !j(t, a) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((p = tt(a)) === a || !j(t, p))) && (f ? n && // for camelCase
      (n[a] !== void 0 || // for kebab-case
      n[p] !== void 0) && (s[a] = fo(
        f,
        l,
        a,
        void 0,
        e,
        !0
      )) : delete s[a]);
    if (r !== l)
      for (const a in r)
        (!t || !j(t, a)) && (delete r[a], d = !0);
  }
  d && Pe(e.attrs, "set", ""), process.env.NODE_ENV !== "production" && wr(t || {}, s, e);
}
function xr(e, t, n, o) {
  const [s, r] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let f in t) {
      if (Pt(f))
        continue;
      const d = t[f];
      let p;
      s && j(s, p = Ne(f)) ? !r || !r.includes(p) ? n[p] = d : (l || (l = {}))[p] = d : Rn(e.emitsOptions, f) || (!(f in o) || d !== o[f]) && (o[f] = d, i = !0);
    }
  if (r) {
    const f = P(n), d = l || k;
    for (let p = 0; p < r.length; p++) {
      const a = r[p];
      n[a] = fo(
        s,
        f,
        a,
        d[a],
        e,
        !j(d, a)
      );
    }
  }
  return i;
}
function fo(e, t, n, o, s, r) {
  const i = e[n];
  if (i != null) {
    const l = j(i, "default");
    if (l && o === void 0) {
      const f = i.default;
      if (i.type !== Function && !i.skipFactory && $(f)) {
        const { propsDefaults: d } = s;
        if (n in d)
          o = d[n];
        else {
          const p = Zt(s);
          o = d[n] = f.call(
            null,
            t
          ), p();
        }
      } else
        o = f;
      s.ce && s.ce._setProp(n, o);
    }
    i[
      0
      /* shouldCast */
    ] && (r && !l ? o = !1 : i[
      1
      /* shouldCastTrue */
    ] && (o === "" || o === tt(n)) && (o = !0));
  }
  return o;
}
const Rl = /* @__PURE__ */ new WeakMap();
function Dr(e, t, n = !1) {
  const o = n ? Rl : t.propsCache, s = o.get(e);
  if (s)
    return s;
  const r = e.props, i = {}, l = [];
  let f = !1;
  if (!$(e)) {
    const p = (a) => {
      f = !0;
      const [g, x] = Dr(a, t, !0);
      Y(i, g), x && l.push(...x);
    };
    !n && t.mixins.length && t.mixins.forEach(p), e.extends && p(e.extends), e.mixins && e.mixins.forEach(p);
  }
  if (!r && !f)
    return K(e) && o.set(e, Et), Et;
  if (C(r))
    for (let p = 0; p < r.length; p++) {
      process.env.NODE_ENV !== "production" && !q(r[p]) && y("props must be strings when using array syntax.", r[p]);
      const a = Ne(r[p]);
      os(a) && (i[a] = k);
    }
  else if (r) {
    process.env.NODE_ENV !== "production" && !K(r) && y("invalid props options", r);
    for (const p in r) {
      const a = Ne(p);
      if (os(a)) {
        const g = r[p], x = i[a] = C(g) || $(g) ? { type: g } : Y({}, g), A = x.type;
        let V = !1, Z = !0;
        if (C(A))
          for (let G = 0; G < A.length; ++G) {
            const L = A[G], H = $(L) && L.name;
            if (H === "Boolean") {
              V = !0;
              break;
            } else H === "String" && (Z = !1);
          }
        else
          V = $(A) && A.name === "Boolean";
        x[
          0
          /* shouldCast */
        ] = V, x[
          1
          /* shouldCastTrue */
        ] = Z, (V || j(x, "default")) && l.push(a);
      }
    }
  }
  const d = [i, l];
  return K(e) && o.set(e, d), d;
}
function os(e) {
  return e[0] !== "$" && !Pt(e) ? !0 : (process.env.NODE_ENV !== "production" && y(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function Fl(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function wr(e, t, n) {
  const o = P(t), s = n.propsOptions[0], r = Object.keys(e).map((i) => Ne(i));
  for (const i in s) {
    let l = s[i];
    l != null && jl(
      i,
      o[i],
      l,
      process.env.NODE_ENV !== "production" ? Me(o) : o,
      !r.includes(i)
    );
  }
}
function jl(e, t, n, o, s) {
  const { type: r, required: i, validator: l, skipCheck: f } = n;
  if (i && s) {
    y('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !i)) {
    if (r != null && r !== !0 && !f) {
      let d = !1;
      const p = C(r) ? r : [r], a = [];
      for (let g = 0; g < p.length && !d; g++) {
        const { valid: x, expectedType: A } = Ll(t, p[g]);
        a.push(A || ""), d = x;
      }
      if (!d) {
        y(Ul(e, t, a));
        return;
      }
    }
    l && !l(t, o) && y('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const Hl = /* @__PURE__ */ Ke(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function Ll(e, t) {
  let n;
  const o = Fl(t);
  if (o === "null")
    n = e === null;
  else if (Hl(o)) {
    const s = typeof e;
    n = s === o.toLowerCase(), !n && s === "object" && (n = e instanceof t);
  } else o === "Object" ? n = K(e) : o === "Array" ? n = C(e) : n = e instanceof t;
  return {
    valid: n,
    expectedType: o
  };
}
function Ul(e, t, n) {
  if (n.length === 0)
    return `Prop type [] for prop "${e}" won't match anything. Did you mean to use type Array instead?`;
  let o = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(Sn).join(" | ")}`;
  const s = n[0], r = vo(t), i = ss(t, s), l = ss(t, r);
  return n.length === 1 && rs(s) && !Bl(s, r) && (o += ` with value ${i}`), o += `, got ${r} `, rs(r) && (o += `with value ${l}.`), o;
}
function ss(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function rs(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function Bl(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const Io = (e) => e === "_" || e === "_ctx" || e === "$stable", Po = (e) => C(e) ? e.map(Ee) : [Ee(e)], kl = (e, t, n) => {
  if (t._n)
    return t;
  const o = rl((...s) => (process.env.NODE_ENV !== "production" && te && !(n === null && he) && !(n && n.root !== te.root) && y(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), Po(t(...s))), n);
  return o._c = !1, o;
}, Vr = (e, t, n) => {
  const o = e._ctx;
  for (const s in e) {
    if (Io(s)) continue;
    const r = e[s];
    if ($(r))
      t[s] = kl(s, r, o);
    else if (r != null) {
      process.env.NODE_ENV !== "production" && y(
        `Non-function value encountered for slot "${s}". Prefer function slots for better performance.`
      );
      const i = Po(r);
      t[s] = () => i;
    }
  }
}, Sr = (e, t) => {
  process.env.NODE_ENV !== "production" && !$o(e.vnode) && y(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = Po(t);
  e.slots.default = () => n;
}, uo = (e, t, n) => {
  for (const o in t)
    (n || !Io(o)) && (e[o] = t[o]);
}, Kl = (e, t, n) => {
  const o = e.slots = yr();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (uo(o, t, n), n && dn(o, "_", s, !0)) : Vr(t, o);
  } else t && Sr(e, t);
}, Wl = (e, t, n) => {
  const { vnode: o, slots: s } = e;
  let r = !0, i = k;
  if (o.shapeFlag & 32) {
    const l = t._;
    l ? process.env.NODE_ENV !== "production" && Re ? (uo(s, t, n), Pe(e, "set", "$slots")) : n && l === 1 ? r = !1 : uo(s, t, n) : (r = !t.$stable, Vr(t, s)), i = t;
  } else t && (Sr(e, t), i = { default: 1 });
  if (r)
    for (const l in s)
      !Io(l) && i[l] == null && delete s[l];
};
let Ct, Be;
function mt(e, t) {
  e.appContext.config.performance && yn() && Be.mark(`vue-${t}-${e.uid}`), process.env.NODE_ENV !== "production" && nl(e, t, yn() ? Be.now() : Date.now());
}
function _t(e, t) {
  if (e.appContext.config.performance && yn()) {
    const n = `vue-${t}-${e.uid}`, o = n + ":end", s = `<${jn(e, e.type)}> ${t}`;
    Be.mark(o), Be.measure(s, n, o), Be.clearMeasures(s), Be.clearMarks(n), Be.clearMarks(o);
  }
  process.env.NODE_ENV !== "production" && ol(e, t, yn() ? Be.now() : Date.now());
}
function yn() {
  return Ct !== void 0 || (typeof window < "u" && window.performance ? (Ct = !0, Be = window.performance) : Ct = !1), Ct;
}
function Gl() {
  const e = [];
  if (process.env.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(
      `Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const de = lc;
function ql(e) {
  return Jl(e);
}
function Jl(e, t) {
  Gl();
  const n = qt();
  n.__VUE__ = !0, process.env.NODE_ENV !== "production" && So(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const {
    insert: o,
    remove: s,
    patchProp: r,
    createElement: i,
    createText: l,
    createComment: f,
    setText: d,
    setElementText: p,
    parentNode: a,
    nextSibling: g,
    setScopeId: x = X,
    insertStaticContent: A
  } = e, V = (c, u, h, v = null, m = null, _ = null, O = void 0, N = null, b = process.env.NODE_ENV !== "production" && Re ? !1 : !!u.dynamicChildren) => {
    if (c === u)
      return;
    c && !$t(c, u) && (v = en(c), Je(c, m, _, !0), c = null), u.patchFlag === -2 && (b = !1, u.dynamicChildren = null);
    const { type: E, ref: T, shapeFlag: D } = u;
    switch (E) {
      case Xt:
        Z(c, u, h, v);
        break;
      case Oe:
        G(c, u, h, v);
        break;
      case fn:
        c == null ? L(u, h, v, O) : process.env.NODE_ENV !== "production" && H(c, u, h, O);
        break;
      case _e:
        Qt(
          c,
          u,
          h,
          v,
          m,
          _,
          O,
          N,
          b
        );
        break;
      default:
        D & 1 ? Q(
          c,
          u,
          h,
          v,
          m,
          _,
          O,
          N,
          b
        ) : D & 6 ? Lo(
          c,
          u,
          h,
          v,
          m,
          _,
          O,
          N,
          b
        ) : D & 64 || D & 128 ? E.process(
          c,
          u,
          h,
          v,
          m,
          _,
          O,
          N,
          b,
          wt
        ) : process.env.NODE_ENV !== "production" && y("Invalid VNode type:", E, `(${typeof E})`);
    }
    T != null && m ? Ft(T, c && c.ref, _, u || c, !u) : T == null && c && c.ref != null && Ft(c.ref, null, _, c, !0);
  }, Z = (c, u, h, v) => {
    if (c == null)
      o(
        u.el = l(u.children),
        h,
        v
      );
    else {
      const m = u.el = c.el;
      u.children !== c.children && d(m, u.children);
    }
  }, G = (c, u, h, v) => {
    c == null ? o(
      u.el = f(u.children || ""),
      h,
      v
    ) : u.el = c.el;
  }, L = (c, u, h, v) => {
    [c.el, c.anchor] = A(
      c.children,
      u,
      h,
      v,
      c.el,
      c.anchor
    );
  }, H = (c, u, h, v) => {
    if (u.children !== c.children) {
      const m = g(c.anchor);
      S(c), [u.el, u.anchor] = A(
        u.children,
        h,
        m,
        v
      );
    } else
      u.el = c.el, u.anchor = c.anchor;
  }, pe = ({ el: c, anchor: u }, h, v) => {
    let m;
    for (; c && c !== u; )
      m = g(c), o(c, h, v), c = m;
    o(u, h, v);
  }, S = ({ el: c, anchor: u }) => {
    let h;
    for (; c && c !== u; )
      h = g(c), s(c), c = h;
    s(u);
  }, Q = (c, u, h, v, m, _, O, N, b) => {
    u.type === "svg" ? O = "svg" : u.type === "math" && (O = "mathml"), c == null ? me(
      u,
      h,
      v,
      m,
      _,
      O,
      N,
      b
    ) : He(
      c,
      u,
      m,
      _,
      O,
      N,
      b
    );
  }, me = (c, u, h, v, m, _, O, N) => {
    let b, E;
    const { props: T, shapeFlag: D, transition: w, dirs: I } = c;
    if (b = c.el = i(
      c.type,
      _,
      T && T.is,
      T
    ), D & 8 ? p(b, c.children) : D & 16 && le(
      c.children,
      b,
      null,
      v,
      m,
      Xn(c, _),
      O,
      N
    ), I && st(c, null, v, "created"), ne(b, c, c.scopeId, O, v), T) {
      for (const W in T)
        W !== "value" && !Pt(W) && r(b, W, null, T[W], _, v);
      "value" in T && r(b, "value", null, T.value, _), (E = T.onVnodeBeforeMount) && Ae(E, v, c);
    }
    process.env.NODE_ENV !== "production" && (dn(b, "__vnode", c, !0), dn(b, "__vueParentComponent", v, !0)), I && st(c, null, v, "beforeMount");
    const F = Yl(m, w);
    F && w.beforeEnter(b), o(b, u, h), ((E = T && T.onVnodeMounted) || F || I) && de(() => {
      E && Ae(E, v, c), F && w.enter(b), I && st(c, null, v, "mounted");
    }, m);
  }, ne = (c, u, h, v, m) => {
    if (h && x(c, h), v)
      for (let _ = 0; _ < v.length; _++)
        x(c, v[_]);
    if (m) {
      let _ = m.subTree;
      if (process.env.NODE_ENV !== "production" && _.patchFlag > 0 && _.patchFlag & 2048 && (_ = Mo(_.children) || _), u === _ || Pr(_.type) && (_.ssContent === u || _.ssFallback === u)) {
        const O = m.vnode;
        ne(
          c,
          O,
          O.scopeId,
          O.slotScopeIds,
          m.parent
        );
      }
    }
  }, le = (c, u, h, v, m, _, O, N, b = 0) => {
    for (let E = b; E < c.length; E++) {
      const T = c[E] = N ? ze(c[E]) : Ee(c[E]);
      V(
        null,
        T,
        u,
        h,
        v,
        m,
        _,
        O,
        N
      );
    }
  }, He = (c, u, h, v, m, _, O) => {
    const N = u.el = c.el;
    process.env.NODE_ENV !== "production" && (N.__vnode = u);
    let { patchFlag: b, dynamicChildren: E, dirs: T } = u;
    b |= c.patchFlag & 16;
    const D = c.props || k, w = u.props || k;
    let I;
    if (h && rt(h, !1), (I = w.onVnodeBeforeUpdate) && Ae(I, h, u, c), T && st(u, c, h, "beforeUpdate"), h && rt(h, !0), process.env.NODE_ENV !== "production" && Re && (b = 0, O = !1, E = null), (D.innerHTML && w.innerHTML == null || D.textContent && w.textContent == null) && p(N, ""), E ? (Ge(
      c.dynamicChildren,
      E,
      N,
      h,
      v,
      Xn(u, m),
      _
    ), process.env.NODE_ENV !== "production" && cn(c, u)) : O || Se(
      c,
      u,
      N,
      null,
      h,
      v,
      Xn(u, m),
      _,
      !1
    ), b > 0) {
      if (b & 16)
        ve(N, D, w, h, m);
      else if (b & 2 && D.class !== w.class && r(N, "class", null, w.class, m), b & 4 && r(N, "style", D.style, w.style, m), b & 8) {
        const F = u.dynamicProps;
        for (let W = 0; W < F.length; W++) {
          const B = F[W], fe = D[B], ue = w[B];
          (ue !== fe || B === "value") && r(N, B, fe, ue, m, h);
        }
      }
      b & 1 && c.children !== u.children && p(N, u.children);
    } else !O && E == null && ve(N, D, w, h, m);
    ((I = w.onVnodeUpdated) || T) && de(() => {
      I && Ae(I, h, u, c), T && st(u, c, h, "updated");
    }, v);
  }, Ge = (c, u, h, v, m, _, O) => {
    for (let N = 0; N < u.length; N++) {
      const b = c[N], E = u[N], T = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        b.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (b.type === _e || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !$t(b, E) || // - In the case of a component, it could contain anything.
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
        v,
        m,
        _,
        O,
        !0
      );
    }
  }, ve = (c, u, h, v, m) => {
    if (u !== h) {
      if (u !== k)
        for (const _ in u)
          !Pt(_) && !(_ in h) && r(
            c,
            _,
            u[_],
            null,
            m,
            v
          );
      for (const _ in h) {
        if (Pt(_)) continue;
        const O = h[_], N = u[_];
        O !== N && _ !== "value" && r(c, _, N, O, m, v);
      }
      "value" in h && r(c, "value", u.value, h.value, m);
    }
  }, Qt = (c, u, h, v, m, _, O, N, b) => {
    const E = u.el = c ? c.el : l(""), T = u.anchor = c ? c.anchor : l("");
    let { patchFlag: D, dynamicChildren: w, slotScopeIds: I } = u;
    process.env.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (Re || D & 2048) && (D = 0, b = !1, w = null), I && (N = N ? N.concat(I) : I), c == null ? (o(E, h, v), o(T, h, v), le(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      u.children || [],
      h,
      T,
      m,
      _,
      O,
      N,
      b
    )) : D > 0 && D & 64 && w && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren ? (Ge(
      c.dynamicChildren,
      w,
      h,
      m,
      _,
      O,
      N
    ), process.env.NODE_ENV !== "production" ? cn(c, u) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (u.key != null || m && u === m.subTree) && cn(
        c,
        u,
        !0
        /* shallow */
      )
    )) : Se(
      c,
      u,
      h,
      T,
      m,
      _,
      O,
      N,
      b
    );
  }, Lo = (c, u, h, v, m, _, O, N, b) => {
    u.slotScopeIds = N, c == null ? u.shapeFlag & 512 ? m.ctx.activate(
      u,
      h,
      v,
      O,
      b
    ) : qe(
      u,
      h,
      v,
      m,
      _,
      O,
      b
    ) : ce(c, u, b);
  }, qe = (c, u, h, v, m, _, O) => {
    const N = c.component = mc(
      c,
      v,
      m
    );
    if (process.env.NODE_ENV !== "production" && N.type.__hmrId && qi(N), process.env.NODE_ENV !== "production" && (sn(c), mt(N, "mount")), $o(c) && (N.ctx.renderer = wt), process.env.NODE_ENV !== "production" && mt(N, "init"), vc(N, !1, O), process.env.NODE_ENV !== "production" && _t(N, "init"), process.env.NODE_ENV !== "production" && Re && (c.el = null), N.asyncDep) {
      if (m && m.registerDep(N, R, O), !c.el) {
        const b = N.subTree = xe(Oe);
        G(null, b, u, h), c.placeholder = b.el;
      }
    } else
      R(
        N,
        c,
        u,
        h,
        m,
        _,
        O
      );
    process.env.NODE_ENV !== "production" && (rn(), _t(N, "mount"));
  }, ce = (c, u, h) => {
    const v = u.component = c.component;
    if (rc(c, u, h))
      if (v.asyncDep && !v.asyncResolved) {
        process.env.NODE_ENV !== "production" && sn(u), M(v, u, h), process.env.NODE_ENV !== "production" && rn();
        return;
      } else
        v.next = u, v.update();
    else
      u.el = c.el, v.vnode = u;
  }, R = (c, u, h, v, m, _, O) => {
    const N = () => {
      if (c.isMounted) {
        let { next: D, bu: w, u: I, parent: F, vnode: W } = c;
        {
          const Ce = Tr(c);
          if (Ce) {
            D && (D.el = W.el, M(c, D, O)), Ce.asyncDep.then(() => {
              c.isUnmounted || N();
            });
            return;
          }
        }
        let B = D, fe;
        process.env.NODE_ENV !== "production" && sn(D || c.vnode), rt(c, !1), D ? (D.el = W.el, M(c, D, O)) : D = W, w && St(w), (fe = D.props && D.props.onVnodeBeforeUpdate) && Ae(fe, F, D, W), rt(c, !0), process.env.NODE_ENV !== "production" && mt(c, "render");
        const ue = ls(c);
        process.env.NODE_ENV !== "production" && _t(c, "render");
        const Te = c.subTree;
        c.subTree = ue, process.env.NODE_ENV !== "production" && mt(c, "patch"), V(
          Te,
          ue,
          // parent may have changed if it's in a teleport
          a(Te.el),
          // anchor may have changed if it's in a fragment
          en(Te),
          c,
          m,
          _
        ), process.env.NODE_ENV !== "production" && _t(c, "patch"), D.el = ue.el, B === null && ic(c, ue.el), I && de(I, m), (fe = D.props && D.props.onVnodeUpdated) && de(
          () => Ae(fe, F, D, W),
          m
        ), process.env.NODE_ENV !== "production" && cr(c), process.env.NODE_ENV !== "production" && rn();
      } else {
        let D;
        const { el: w, props: I } = u, { bm: F, m: W, parent: B, root: fe, type: ue } = c, Te = jt(u);
        rt(c, !1), F && St(F), !Te && (D = I && I.onVnodeBeforeMount) && Ae(D, B, u), rt(c, !0);
        {
          fe.ce && // @ts-expect-error _def is private
          fe.ce._def.shadowRoot !== !1 && fe.ce._injectChildStyle(ue), process.env.NODE_ENV !== "production" && mt(c, "render");
          const Ce = c.subTree = ls(c);
          process.env.NODE_ENV !== "production" && _t(c, "render"), process.env.NODE_ENV !== "production" && mt(c, "patch"), V(
            null,
            Ce,
            h,
            v,
            c,
            m,
            _
          ), process.env.NODE_ENV !== "production" && _t(c, "patch"), u.el = Ce.el;
        }
        if (W && de(W, m), !Te && (D = I && I.onVnodeMounted)) {
          const Ce = u;
          de(
            () => Ae(D, B, Ce),
            m
          );
        }
        (u.shapeFlag & 256 || B && jt(B.vnode) && B.vnode.shapeFlag & 256) && c.a && de(c.a, m), c.isMounted = !0, process.env.NODE_ENV !== "production" && Qi(c), u = h = v = null;
      }
    };
    c.scope.on();
    const b = c.effect = new Ms(N);
    c.scope.off();
    const E = c.update = b.run.bind(b), T = c.job = b.runIfDirty.bind(b);
    T.i = c, T.id = c.uid, b.scheduler = () => Pn(T), rt(c, !0), process.env.NODE_ENV !== "production" && (b.onTrack = c.rtc ? (D) => St(c.rtc, D) : void 0, b.onTrigger = c.rtg ? (D) => St(c.rtg, D) : void 0), E();
  }, M = (c, u, h) => {
    u.component = c;
    const v = c.vnode.props;
    c.vnode = u, c.next = null, Ml(c, u.props, v, h), Wl(c, u.children, h), we(), Yo(c), Ve();
  }, Se = (c, u, h, v, m, _, O, N, b = !1) => {
    const E = c && c.children, T = c ? c.shapeFlag : 0, D = u.children, { patchFlag: w, shapeFlag: I } = u;
    if (w > 0) {
      if (w & 128) {
        xt(
          E,
          D,
          h,
          v,
          m,
          _,
          O,
          N,
          b
        );
        return;
      } else if (w & 256) {
        Un(
          E,
          D,
          h,
          v,
          m,
          _,
          O,
          N,
          b
        );
        return;
      }
    }
    I & 8 ? (T & 16 && Dt(E, m, _), D !== E && p(h, D)) : T & 16 ? I & 16 ? xt(
      E,
      D,
      h,
      v,
      m,
      _,
      O,
      N,
      b
    ) : Dt(E, m, _, !0) : (T & 8 && p(h, ""), I & 16 && le(
      D,
      h,
      v,
      m,
      _,
      O,
      N,
      b
    ));
  }, Un = (c, u, h, v, m, _, O, N, b) => {
    c = c || Et, u = u || Et;
    const E = c.length, T = u.length, D = Math.min(E, T);
    let w;
    for (w = 0; w < D; w++) {
      const I = u[w] = b ? ze(u[w]) : Ee(u[w]);
      V(
        c[w],
        I,
        h,
        null,
        m,
        _,
        O,
        N,
        b
      );
    }
    E > T ? Dt(
      c,
      m,
      _,
      !0,
      !1,
      D
    ) : le(
      u,
      h,
      v,
      m,
      _,
      O,
      N,
      b,
      D
    );
  }, xt = (c, u, h, v, m, _, O, N, b) => {
    let E = 0;
    const T = u.length;
    let D = c.length - 1, w = T - 1;
    for (; E <= D && E <= w; ) {
      const I = c[E], F = u[E] = b ? ze(u[E]) : Ee(u[E]);
      if ($t(I, F))
        V(
          I,
          F,
          h,
          null,
          m,
          _,
          O,
          N,
          b
        );
      else
        break;
      E++;
    }
    for (; E <= D && E <= w; ) {
      const I = c[D], F = u[w] = b ? ze(u[w]) : Ee(u[w]);
      if ($t(I, F))
        V(
          I,
          F,
          h,
          null,
          m,
          _,
          O,
          N,
          b
        );
      else
        break;
      D--, w--;
    }
    if (E > D) {
      if (E <= w) {
        const I = w + 1, F = I < T ? u[I].el : v;
        for (; E <= w; )
          V(
            null,
            u[E] = b ? ze(u[E]) : Ee(u[E]),
            h,
            F,
            m,
            _,
            O,
            N,
            b
          ), E++;
      }
    } else if (E > w)
      for (; E <= D; )
        Je(c[E], m, _, !0), E++;
    else {
      const I = E, F = E, W = /* @__PURE__ */ new Map();
      for (E = F; E <= w; E++) {
        const oe = u[E] = b ? ze(u[E]) : Ee(u[E]);
        oe.key != null && (process.env.NODE_ENV !== "production" && W.has(oe.key) && y(
          "Duplicate keys found during update:",
          JSON.stringify(oe.key),
          "Make sure keys are unique."
        ), W.set(oe.key, E));
      }
      let B, fe = 0;
      const ue = w - F + 1;
      let Te = !1, Ce = 0;
      const Vt = new Array(ue);
      for (E = 0; E < ue; E++) Vt[E] = 0;
      for (E = I; E <= D; E++) {
        const oe = c[E];
        if (fe >= ue) {
          Je(oe, m, _, !0);
          continue;
        }
        let $e;
        if (oe.key != null)
          $e = W.get(oe.key);
        else
          for (B = F; B <= w; B++)
            if (Vt[B - F] === 0 && $t(oe, u[B])) {
              $e = B;
              break;
            }
        $e === void 0 ? Je(oe, m, _, !0) : (Vt[$e - F] = E + 1, $e >= Ce ? Ce = $e : Te = !0, V(
          oe,
          u[$e],
          h,
          null,
          m,
          _,
          O,
          N,
          b
        ), fe++);
      }
      const Bo = Te ? zl(Vt) : Et;
      for (B = Bo.length - 1, E = ue - 1; E >= 0; E--) {
        const oe = F + E, $e = u[oe], ko = u[oe + 1], Ko = oe + 1 < T ? (
          // #13559, fallback to el placeholder for unresolved async component
          ko.el || ko.placeholder
        ) : v;
        Vt[E] === 0 ? V(
          null,
          $e,
          h,
          Ko,
          m,
          _,
          O,
          N,
          b
        ) : Te && (B < 0 || E !== Bo[B] ? ht($e, h, Ko, 2) : B--);
      }
    }
  }, ht = (c, u, h, v, m = null) => {
    const { el: _, type: O, transition: N, children: b, shapeFlag: E } = c;
    if (E & 6) {
      ht(c.component.subTree, u, h, v);
      return;
    }
    if (E & 128) {
      c.suspense.move(u, h, v);
      return;
    }
    if (E & 64) {
      O.move(c, u, h, wt);
      return;
    }
    if (O === _e) {
      o(_, u, h);
      for (let D = 0; D < b.length; D++)
        ht(b[D], u, h, v);
      o(c.anchor, u, h);
      return;
    }
    if (O === fn) {
      pe(c, u, h);
      return;
    }
    if (v !== 2 && E & 1 && N)
      if (v === 0)
        N.beforeEnter(_), o(_, u, h), de(() => N.enter(_), m);
      else {
        const { leave: D, delayLeave: w, afterLeave: I } = N, F = () => {
          c.ctx.isUnmounted ? s(_) : o(_, u, h);
        }, W = () => {
          _._isLeaving && _[cl](
            !0
            /* cancelled */
          ), D(_, () => {
            F(), I && I();
          });
        };
        w ? w(_, F, W) : W();
      }
    else
      o(_, u, h);
  }, Je = (c, u, h, v = !1, m = !1) => {
    const {
      type: _,
      props: O,
      ref: N,
      children: b,
      dynamicChildren: E,
      shapeFlag: T,
      patchFlag: D,
      dirs: w,
      cacheIndex: I
    } = c;
    if (D === -2 && (m = !1), N != null && (we(), Ft(N, null, h, c, !0), Ve()), I != null && (u.renderCache[I] = void 0), T & 256) {
      u.ctx.deactivate(c);
      return;
    }
    const F = T & 1 && w, W = !jt(c);
    let B;
    if (W && (B = O && O.onVnodeBeforeUnmount) && Ae(B, u, c), T & 6)
      qr(c.component, h, v);
    else {
      if (T & 128) {
        c.suspense.unmount(h, v);
        return;
      }
      F && st(c, null, u, "beforeUnmount"), T & 64 ? c.type.remove(
        c,
        u,
        h,
        wt,
        v
      ) : E && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !E.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== _e || D > 0 && D & 64) ? Dt(
        E,
        u,
        h,
        !1,
        !0
      ) : (_ === _e && D & 384 || !m && T & 16) && Dt(b, u, h), v && Bn(c);
    }
    (W && (B = O && O.onVnodeUnmounted) || F) && de(() => {
      B && Ae(B, u, c), F && st(c, null, u, "unmounted");
    }, h);
  }, Bn = (c) => {
    const { type: u, el: h, anchor: v, transition: m } = c;
    if (u === _e) {
      process.env.NODE_ENV !== "production" && c.patchFlag > 0 && c.patchFlag & 2048 && m && !m.persisted ? c.children.forEach((O) => {
        O.type === Oe ? s(O.el) : Bn(O);
      }) : Gr(h, v);
      return;
    }
    if (u === fn) {
      S(c);
      return;
    }
    const _ = () => {
      s(h), m && !m.persisted && m.afterLeave && m.afterLeave();
    };
    if (c.shapeFlag & 1 && m && !m.persisted) {
      const { leave: O, delayLeave: N } = m, b = () => O(h, _);
      N ? N(c.el, _, b) : b();
    } else
      _();
  }, Gr = (c, u) => {
    let h;
    for (; c !== u; )
      h = g(c), s(c), c = h;
    s(u);
  }, qr = (c, u, h) => {
    process.env.NODE_ENV !== "production" && c.type.__hmrId && Ji(c);
    const { bum: v, scope: m, job: _, subTree: O, um: N, m: b, a: E } = c;
    is(b), is(E), v && St(v), m.stop(), _ && (_.flags |= 8, Je(O, c, u, h)), N && de(N, u), de(() => {
      c.isUnmounted = !0;
    }, u), process.env.NODE_ENV !== "production" && tl(c);
  }, Dt = (c, u, h, v = !1, m = !1, _ = 0) => {
    for (let O = _; O < c.length; O++)
      Je(c[O], u, h, v, m);
  }, en = (c) => {
    if (c.shapeFlag & 6)
      return en(c.component.subTree);
    if (c.shapeFlag & 128)
      return c.suspense.next();
    const u = g(c.anchor || c.el), h = u && u[il];
    return h ? g(h) : u;
  };
  let kn = !1;
  const Uo = (c, u, h) => {
    c == null ? u._vnode && Je(u._vnode, null, null, !0) : V(
      u._vnode || null,
      c,
      u,
      null,
      null,
      null,
      h
    ), u._vnode = c, kn || (kn = !0, Yo(), rr(), kn = !1);
  }, wt = {
    p: V,
    um: Je,
    m: ht,
    r: Bn,
    mt: qe,
    mc: le,
    pc: Se,
    pbc: Ge,
    n: en,
    o: e
  };
  return {
    render: Uo,
    hydrate: void 0,
    createApp: $l(Uo)
  };
}
function Xn({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function rt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Yl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function cn(e, t, n = !1) {
  const o = e.children, s = t.children;
  if (C(o) && C(s))
    for (let r = 0; r < o.length; r++) {
      const i = o[r];
      let l = s[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = s[r] = ze(s[r]), l.el = i.el), !n && l.patchFlag !== -2 && cn(i, l)), l.type === Xt && // avoid cached text nodes retaining detached dom nodes
      l.patchFlag !== -1 && (l.el = i.el), l.type === Oe && !l.el && (l.el = i.el), process.env.NODE_ENV !== "production" && l.el && (l.el.__vnode = l);
    }
}
function zl(e) {
  const t = e.slice(), n = [0];
  let o, s, r, i, l;
  const f = e.length;
  for (o = 0; o < f; o++) {
    const d = e[o];
    if (d !== 0) {
      if (s = n[n.length - 1], e[s] < d) {
        t[o] = s, n.push(o);
        continue;
      }
      for (r = 0, i = n.length - 1; r < i; )
        l = r + i >> 1, e[n[l]] < d ? r = l + 1 : i = l;
      d < e[n[r]] && (r > 0 && (t[o] = n[r - 1]), n[r] = o);
    }
  }
  for (r = n.length, i = n[r - 1]; r-- > 0; )
    n[r] = i, i = t[i];
  return n;
}
function Tr(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Tr(t);
}
function is(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const Xl = Symbol.for("v-scx"), Zl = () => {
  {
    const e = Ht(Xl);
    return e || process.env.NODE_ENV !== "production" && y(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function yt(e, t, n) {
  return process.env.NODE_ENV !== "production" && !$(t) && y(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), Cr(e, t, n);
}
function Cr(e, t, n = k) {
  const { immediate: o, deep: s, flush: r, once: i } = n;
  process.env.NODE_ENV !== "production" && !t && (o !== void 0 && y(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), s !== void 0 && y(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), i !== void 0 && y(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const l = Y({}, n);
  process.env.NODE_ENV !== "production" && (l.onWarn = y);
  const f = t && o || !t && r !== "post";
  let d;
  if (Wt) {
    if (r === "sync") {
      const x = Zl();
      d = x.__watcherHandles || (x.__watcherHandles = []);
    } else if (!f) {
      const x = () => {
      };
      return x.stop = X, x.resume = X, x.pause = X, x;
    }
  }
  const p = te;
  l.call = (x, A, V) => je(x, p, A, V);
  let a = !1;
  r === "post" ? l.scheduler = (x) => {
    de(x, p && p.suspense);
  } : r !== "sync" && (a = !0, l.scheduler = (x, A) => {
    A ? x() : Pn(x);
  }), l.augmentJob = (x) => {
    t && (x.flags |= 4), a && (x.flags |= 2, p && (x.id = p.uid, x.i = p));
  };
  const g = Hi(e, t, l);
  return Wt && (d ? d.push(g) : f && g()), g;
}
function Ql(e, t, n) {
  const o = this.proxy, s = q(e) ? e.includes(".") ? $r(o, e) : () => o[e] : e.bind(o, o);
  let r;
  $(t) ? r = t : (r = t.handler, n = t);
  const i = Zt(this), l = Cr(s, r.bind(o), n);
  return i(), l;
}
function $r(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let s = 0; s < n.length && o; s++)
      o = o[n[s]];
    return o;
  };
}
const ec = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ne(t)}Modifiers`] || e[`${tt(t)}Modifiers`];
function tc(e, t, ...n) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || k;
  if (process.env.NODE_ENV !== "production") {
    const {
      emitsOptions: p,
      propsOptions: [a]
    } = e;
    if (p)
      if (!(t in p))
        (!a || !(it(Ne(t)) in a)) && y(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${it(Ne(t))}" prop.`
        );
      else {
        const g = p[t];
        $(g) && (g(...n) || y(
          `Invalid event arguments: event validation failed for event "${t}".`
        ));
      }
  }
  let s = n;
  const r = t.startsWith("update:"), i = r && ec(o, t.slice(7));
  if (i && (i.trim && (s = n.map((p) => q(p) ? p.trim() : p)), i.number && (s = n.map(Zr))), process.env.NODE_ENV !== "production" && sl(e, t, s), process.env.NODE_ENV !== "production") {
    const p = t.toLowerCase();
    p !== t && o[it(p)] && y(
      `Event "${p}" is emitted in component ${jn(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${tt(
        t
      )}" instead of "${t}".`
    );
  }
  let l, f = o[l = it(t)] || // also try camelCase event handler (#2249)
  o[l = it(Ne(t))];
  !f && r && (f = o[l = it(tt(t))]), f && je(
    f,
    e,
    6,
    s
  );
  const d = o[l + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, je(
      d,
      e,
      6,
      s
    );
  }
}
const nc = /* @__PURE__ */ new WeakMap();
function Ar(e, t, n = !1) {
  const o = n ? nc : t.emitsCache, s = o.get(e);
  if (s !== void 0)
    return s;
  const r = e.emits;
  let i = {}, l = !1;
  if (!$(e)) {
    const f = (d) => {
      const p = Ar(d, t, !0);
      p && (l = !0, Y(i, p));
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  return !r && !l ? (K(e) && o.set(e, null), null) : (C(r) ? r.forEach((f) => i[f] = null) : Y(i, r), K(e) && o.set(e, i), i);
}
function Rn(e, t) {
  return !e || !Gt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), j(e, t[0].toLowerCase() + t.slice(1)) || j(e, tt(t)) || j(e, t));
}
let ao = !1;
function On() {
  ao = !0;
}
function ls(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: s,
    propsOptions: [r],
    slots: i,
    attrs: l,
    emit: f,
    render: d,
    renderCache: p,
    props: a,
    data: g,
    setupState: x,
    ctx: A,
    inheritAttrs: V
  } = e, Z = En(e);
  let G, L;
  process.env.NODE_ENV !== "production" && (ao = !1);
  try {
    if (n.shapeFlag & 4) {
      const S = s || o, Q = process.env.NODE_ENV !== "production" && x.__isScriptSetup ? new Proxy(S, {
        get(me, ne, le) {
          return y(
            `Property '${String(
              ne
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(me, ne, le);
        }
      }) : S;
      G = Ee(
        d.call(
          Q,
          S,
          p,
          process.env.NODE_ENV !== "production" ? Me(a) : a,
          x,
          g,
          A
        )
      ), L = l;
    } else {
      const S = t;
      process.env.NODE_ENV !== "production" && l === a && On(), G = Ee(
        S.length > 1 ? S(
          process.env.NODE_ENV !== "production" ? Me(a) : a,
          process.env.NODE_ENV !== "production" ? {
            get attrs() {
              return On(), Me(l);
            },
            slots: i,
            emit: f
          } : { attrs: l, slots: i, emit: f }
        ) : S(
          process.env.NODE_ENV !== "production" ? Me(a) : a,
          null
        )
      ), L = t.props ? l : oc(l);
    }
  } catch (S) {
    Lt.length = 0, Jt(S, e, 1), G = xe(Oe);
  }
  let H = G, pe;
  if (process.env.NODE_ENV !== "production" && G.patchFlag > 0 && G.patchFlag & 2048 && ([H, pe] = Ir(G)), L && V !== !1) {
    const S = Object.keys(L), { shapeFlag: Q } = H;
    if (S.length) {
      if (Q & 7)
        r && S.some(pn) && (L = sc(
          L,
          r
        )), H = nt(H, L, !1, !0);
      else if (process.env.NODE_ENV !== "production" && !ao && H.type !== Oe) {
        const me = Object.keys(l), ne = [], le = [];
        for (let He = 0, Ge = me.length; He < Ge; He++) {
          const ve = me[He];
          Gt(ve) ? pn(ve) || ne.push(ve[2].toLowerCase() + ve.slice(3)) : le.push(ve);
        }
        le.length && y(
          `Extraneous non-props attributes (${le.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`
        ), ne.length && y(
          `Extraneous non-emits event listeners (${ne.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return n.dirs && (process.env.NODE_ENV !== "production" && !cs(H) && y(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), H = nt(H, null, !1, !0), H.dirs = H.dirs ? H.dirs.concat(n.dirs) : n.dirs), n.transition && (process.env.NODE_ENV !== "production" && !cs(H) && y(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), Co(H, n.transition)), process.env.NODE_ENV !== "production" && pe ? pe(H) : G = H, En(Z), G;
}
const Ir = (e) => {
  const t = e.children, n = e.dynamicChildren, o = Mo(t, !1);
  if (o) {
    if (process.env.NODE_ENV !== "production" && o.patchFlag > 0 && o.patchFlag & 2048)
      return Ir(o);
  } else return [e, void 0];
  const s = t.indexOf(o), r = n ? n.indexOf(o) : -1, i = (l) => {
    t[s] = l, n && (r > -1 ? n[r] = l : l.patchFlag > 0 && (e.dynamicChildren = [...n, l]));
  };
  return [Ee(o), i];
};
function Mo(e, t = !0) {
  let n;
  for (let o = 0; o < e.length; o++) {
    const s = e[o];
    if (Fn(s)) {
      if (s.type !== Oe || s.children === "v-if") {
        if (n)
          return;
        if (n = s, process.env.NODE_ENV !== "production" && t && n.patchFlag > 0 && n.patchFlag & 2048)
          return Mo(n.children);
      }
    } else
      return;
  }
  return n;
}
const oc = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Gt(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, sc = (e, t) => {
  const n = {};
  for (const o in e)
    (!pn(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
}, cs = (e) => e.shapeFlag & 7 || e.type === Oe;
function rc(e, t, n) {
  const { props: o, children: s, component: r } = e, { props: i, children: l, patchFlag: f } = t, d = r.emitsOptions;
  if (process.env.NODE_ENV !== "production" && (s || l) && Re || t.dirs || t.transition)
    return !0;
  if (n && f >= 0) {
    if (f & 1024)
      return !0;
    if (f & 16)
      return o ? fs(o, i, d) : !!i;
    if (f & 8) {
      const p = t.dynamicProps;
      for (let a = 0; a < p.length; a++) {
        const g = p[a];
        if (i[g] !== o[g] && !Rn(d, g))
          return !0;
      }
    }
  } else
    return (s || l) && (!l || !l.$stable) ? !0 : o === i ? !1 : o ? i ? fs(o, i, d) : !0 : !!i;
  return !1;
}
function fs(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let s = 0; s < o.length; s++) {
    const r = o[s];
    if (t[r] !== e[r] && !Rn(n, r))
      return !0;
  }
  return !1;
}
function ic({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.el = e.el), o === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const Pr = (e) => e.__isSuspense;
function lc(e, t) {
  t && t.pendingBranch ? C(e) ? t.effects.push(...e) : t.effects.push(e) : sr(e);
}
const _e = Symbol.for("v-fgt"), Xt = Symbol.for("v-txt"), Oe = Symbol.for("v-cmt"), fn = Symbol.for("v-stc"), Lt = [];
let ge = null;
function et(e = !1) {
  Lt.push(ge = e ? null : []);
}
function cc() {
  Lt.pop(), ge = Lt[Lt.length - 1] || null;
}
let Kt = 1;
function us(e, t = !1) {
  Kt += e, e < 0 && ge && t && (ge.hasOnce = !0);
}
function Mr(e) {
  return e.dynamicChildren = Kt > 0 ? ge || Et : null, cc(), Kt > 0 && ge && ge.push(e), e;
}
function pt(e, t, n, o, s, r) {
  return Mr(
    Ro(
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
function fc(e, t, n, o, s) {
  return Mr(
    xe(
      e,
      t,
      n,
      o,
      s,
      !0
    )
  );
}
function Fn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function $t(e, t) {
  if (process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && e.component) {
    const n = ln.get(t.type);
    if (n && n.has(e.component))
      return e.shapeFlag &= -257, t.shapeFlag &= -513, !1;
  }
  return e.type === t.type && e.key === t.key;
}
const uc = (...e) => Fr(
  ...e
), Rr = ({ key: e }) => e ?? null, un = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? q(e) || J(e) || $(e) ? { i: he, r: e, k: t, f: !!n } : e : null);
function Ro(e, t = null, n = null, o = 0, s = null, r = e === _e ? 0 : 1, i = !1, l = !1) {
  const f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Rr(t),
    ref: t && un(t),
    scopeId: ur,
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
  return l ? (Fo(f, n), r & 128 && e.normalize(f)) : n && (f.shapeFlag |= q(n) ? 8 : 16), process.env.NODE_ENV !== "production" && f.key !== f.key && y("VNode created with invalid key (NaN). VNode type:", f.type), Kt > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  ge && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (f.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  f.patchFlag !== 32 && ge.push(f), f;
}
const xe = process.env.NODE_ENV !== "production" ? uc : Fr;
function Fr(e, t = null, n = null, o = 0, s = null, r = !1) {
  if ((!e || e === bl) && (process.env.NODE_ENV !== "production" && !e && y(`Invalid vnode type when creating vnode: ${e}.`), e = Oe), Fn(e)) {
    const l = nt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Fo(l, n), Kt > 0 && !r && ge && (l.shapeFlag & 6 ? ge[ge.indexOf(e)] = l : ge.push(l)), l.patchFlag = -2, l;
  }
  if (kr(e) && (e = e.__vccOpts), t) {
    t = ac(t);
    let { class: l, style: f } = t;
    l && !q(l) && (t.class = Cn(l)), K(f) && (hn(f) && !C(f) && (f = Y({}, f)), t.style = Tn(f));
  }
  const i = q(e) ? 1 : Pr(e) ? 128 : ll(e) ? 64 : K(e) ? 4 : $(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && hn(e) && (e = P(e), y(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), Ro(
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
function ac(e) {
  return e ? hn(e) || Or(e) ? Y({}, e) : e : null;
}
function nt(e, t, n = !1, o = !1) {
  const { props: s, ref: r, patchFlag: i, children: l, transition: f } = e, d = t ? dc(s || {}, t) : s, p = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Rr(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? C(r) ? r.concat(un(t)) : [r, un(t)] : un(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && i === -1 && C(l) ? l.map(jr) : l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== _e ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: f,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && nt(e.ssContent),
    ssFallback: e.ssFallback && nt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return f && o && Co(
    p,
    f.clone(p)
  ), p;
}
function jr(e) {
  const t = nt(e);
  return C(e.children) && (t.children = e.children.map(jr)), t;
}
function pc(e = " ", t = 0) {
  return xe(Xt, null, e, t);
}
function Ee(e) {
  return e == null || typeof e == "boolean" ? xe(Oe) : C(e) ? xe(
    _e,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Fn(e) ? ze(e) : xe(Xt, null, String(e));
}
function ze(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : nt(e);
}
function Fo(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (C(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Fo(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !Or(t) ? t._ctx = he : s === 3 && he && (he.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else $(t) ? (t = { default: t, _ctx: he }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [pc(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function dc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const s in o)
      if (s === "class")
        t.class !== o.class && (t.class = Cn([t.class, o.class]));
      else if (s === "style")
        t.style = Tn([t.style, o.style]);
      else if (Gt(s)) {
        const r = t[s], i = o[s];
        i && r !== i && !(C(r) && r.includes(i)) && (t[s] = r ? [].concat(r, i) : i);
      } else s !== "" && (t[s] = o[s]);
  }
  return t;
}
function Ae(e, t, n, o = null) {
  je(e, t, 7, [
    n,
    o
  ]);
}
const hc = br();
let gc = 0;
function mc(e, t, n) {
  const o = e.type, s = (t ? t.appContext : e.appContext) || hc, r = {
    uid: gc++,
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
    scope: new ai(
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
    propsOptions: Dr(o, s),
    emitsOptions: Ar(o, s),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: k,
    // inheritAttrs
    inheritAttrs: o.inheritAttrs,
    // state
    ctx: k,
    data: k,
    props: k,
    attrs: k,
    slots: k,
    refs: k,
    setupState: k,
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
  return process.env.NODE_ENV !== "production" ? r.ctx = Nl(r) : r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = tc.bind(null, r), e.ce && e.ce(r), r;
}
let te = null;
const Hr = () => te || he;
let xn, po;
{
  const e = qt(), t = (n, o) => {
    let s;
    return (s = e[n]) || (s = e[n] = []), s.push(o), (r) => {
      s.length > 1 ? s.forEach((i) => i(r)) : s[0](r);
    };
  };
  xn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => te = n
  ), po = t(
    "__VUE_SSR_SETTERS__",
    (n) => Wt = n
  );
}
const Zt = (e) => {
  const t = te;
  return xn(e), e.scope.on(), () => {
    e.scope.off(), xn(t);
  };
}, as = () => {
  te && te.scope.off(), xn(null);
}, _c = /* @__PURE__ */ Ke("slot,component");
function ho(e, { isNativeTag: t }) {
  (_c(e) || t(e)) && y(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function Lr(e) {
  return e.vnode.shapeFlag & 4;
}
let Wt = !1;
function vc(e, t = !1, n = !1) {
  t && po(t);
  const { props: o, children: s } = e.vnode, r = Lr(e);
  Il(e, o, r, t), Kl(e, s, n || t);
  const i = r ? Ec(e, t) : void 0;
  return t && po(!1), i;
}
function Ec(e, t) {
  var n;
  const o = e.type;
  if (process.env.NODE_ENV !== "production") {
    if (o.name && ho(o.name, e.appContext.config), o.components) {
      const r = Object.keys(o.components);
      for (let i = 0; i < r.length; i++)
        ho(r[i], e.appContext.config);
    }
    if (o.directives) {
      const r = Object.keys(o.directives);
      for (let i = 0; i < r.length; i++)
        ar(r[i]);
    }
    o.compilerOptions && bc() && y(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, _r), process.env.NODE_ENV !== "production" && yl(e);
  const { setup: s } = o;
  if (s) {
    we();
    const r = e.setupContext = s.length > 1 ? yc(e) : null, i = Zt(e), l = Ot(
      s,
      e,
      0,
      [
        process.env.NODE_ENV !== "production" ? Me(e.props) : e.props,
        r
      ]
    ), f = _o(l);
    if (Ve(), i(), (f || e.sp) && !jt(e) && pr(e), f) {
      if (l.then(as, as), t)
        return l.then((d) => {
          ps(e, d, t);
        }).catch((d) => {
          Jt(d, e, 0);
        });
      if (e.asyncDep = l, process.env.NODE_ENV !== "production" && !e.suspense) {
        const d = (n = o.name) != null ? n : "Anonymous";
        y(
          `Component <${d}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      ps(e, l, t);
  } else
    Ur(e, t);
}
function ps(e, t, n) {
  $(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : K(t) ? (process.env.NODE_ENV !== "production" && Fn(t) && y(
    "setup() should not return VNodes directly - return a render function instead."
  ), process.env.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = Qs(t), process.env.NODE_ENV !== "production" && Ol(e)) : process.env.NODE_ENV !== "production" && t !== void 0 && y(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), Ur(e, n);
}
const bc = () => !0;
function Ur(e, t, n) {
  const o = e.type;
  e.render || (e.render = o.render || X);
  {
    const s = Zt(e);
    we();
    try {
      Dl(e);
    } finally {
      Ve(), s();
    }
  }
  process.env.NODE_ENV !== "production" && !o.render && e.render === X && !t && (o.template ? y(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
  ) : y("Component is missing template or render function: ", o));
}
const ds = process.env.NODE_ENV !== "production" ? {
  get(e, t) {
    return On(), z(e, "get", ""), e[t];
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
function Nc(e) {
  return new Proxy(e.slots, {
    get(t, n) {
      return z(e, "get", "$slots"), t[n];
    }
  });
}
function yc(e) {
  const t = (n) => {
    if (process.env.NODE_ENV !== "production" && (e.exposed && y("expose() should be called only once per setup()."), n != null)) {
      let o = typeof n;
      o === "object" && (C(n) ? o = "array" : J(n) && (o = "ref")), o !== "object" && y(
        `expose() should be passed a plain object, received ${o}.`
      );
    }
    e.exposed = n || {};
  };
  if (process.env.NODE_ENV !== "production") {
    let n, o;
    return Object.freeze({
      get attrs() {
        return n || (n = new Proxy(e.attrs, ds));
      },
      get slots() {
        return o || (o = Nc(e));
      },
      get emit() {
        return (s, ...r) => e.emit(s, ...r);
      },
      expose: t
    });
  } else
    return {
      attrs: new Proxy(e.attrs, ds),
      slots: e.slots,
      emit: e.emit,
      expose: t
    };
}
function jo(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Qs(Ai(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in at)
        return at[n](e);
    },
    has(t, n) {
      return n in t || n in at;
    }
  })) : e.proxy;
}
const Oc = /(?:^|[-_])\w/g, xc = (e) => e.replace(Oc, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Br(e, t = !0) {
  return $(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function jn(e, t, n = !1) {
  let o = Br(t);
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
  return o ? xc(o) : n ? "App" : "Anonymous";
}
function kr(e) {
  return $(e) && "__vccOpts" in e;
}
const Ho = (e, t) => {
  const n = Fi(e, t, Wt);
  if (process.env.NODE_ENV !== "production") {
    const o = Hr();
    o && o.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function Dc() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, o = { style: "color:#eb2f96" }, s = {
    __vue_custom_formatter: !0,
    header(a) {
      if (!K(a))
        return null;
      if (a.__isVue)
        return ["div", e, "VueInstance"];
      if (J(a)) {
        we();
        const g = a.value;
        return Ve(), [
          "div",
          {},
          ["span", e, p(a)],
          "<",
          l(g),
          ">"
        ];
      } else {
        if (Qe(a))
          return [
            "div",
            {},
            ["span", e, ie(a) ? "ShallowReactive" : "Reactive"],
            "<",
            l(a),
            `>${Fe(a) ? " (readonly)" : ""}`
          ];
        if (Fe(a))
          return [
            "div",
            {},
            ["span", e, ie(a) ? "ShallowReadonly" : "Readonly"],
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
    a.type.props && a.props && g.push(i("props", P(a.props))), a.setupState !== k && g.push(i("setup", a.setupState)), a.data !== k && g.push(i("data", P(a.data)));
    const x = f(a, "computed");
    x && g.push(i("computed", x));
    const A = f(a, "inject");
    return A && g.push(i("injected", A)), g.push([
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
        ...Object.keys(g).map((x) => [
          "div",
          {},
          ["span", o, x + ": "],
          l(g[x], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function l(a, g = !0) {
    return typeof a == "number" ? ["span", t, a] : typeof a == "string" ? ["span", n, JSON.stringify(a)] : typeof a == "boolean" ? ["span", o, a] : K(a) ? ["object", { object: g ? P(a) : a }] : ["span", n, String(a)];
  }
  function f(a, g) {
    const x = a.type;
    if ($(x))
      return;
    const A = {};
    for (const V in a.ctx)
      d(x, V, g) && (A[V] = a.ctx[V]);
    return A;
  }
  function d(a, g, x) {
    const A = a[x];
    if (C(A) && A.includes(g) || K(A) && g in A || a.extends && d(a.extends, g, x) || a.mixins && a.mixins.some((V) => d(V, g, x)))
      return !0;
  }
  function p(a) {
    return ie(a) ? "ShallowRef" : a.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(s) : window.devtoolsFormatters = [s];
}
const hs = "3.5.22", ke = process.env.NODE_ENV !== "production" ? y : X;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let go;
const gs = typeof window < "u" && window.trustedTypes;
if (gs)
  try {
    go = /* @__PURE__ */ gs.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch (e) {
    process.env.NODE_ENV !== "production" && ke(`Error creating trusted types policy: ${e}`);
  }
const Kr = go ? (e) => go.createHTML(e) : (e) => e, wc = "http://www.w3.org/2000/svg", Vc = "http://www.w3.org/1998/Math/MathML", Ue = typeof document < "u" ? document : null, ms = Ue && /* @__PURE__ */ Ue.createElement("template"), Sc = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const s = t === "svg" ? Ue.createElementNS(wc, e) : t === "mathml" ? Ue.createElementNS(Vc, e) : n ? Ue.createElement(e, { is: n }) : Ue.createElement(e);
    return e === "select" && o && o.multiple != null && s.setAttribute("multiple", o.multiple), s;
  },
  createText: (e) => Ue.createTextNode(e),
  createComment: (e) => Ue.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ue.querySelector(e),
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
      ms.innerHTML = Kr(
        o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e
      );
      const l = ms.content;
      if (o === "svg" || o === "mathml") {
        const f = l.firstChild;
        for (; f.firstChild; )
          l.appendChild(f.firstChild);
        l.removeChild(f);
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
}, Tc = Symbol("_vtc");
function Cc(e, t, n) {
  const o = e[Tc];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const _s = Symbol("_vod"), $c = Symbol("_vsh"), Ac = Symbol(process.env.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : ""), Ic = /(?:^|;)\s*display\s*:/;
function Pc(e, t, n) {
  const o = e.style, s = q(n);
  let r = !1;
  if (n && !s) {
    if (t)
      if (q(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && an(o, l, "");
        }
      else
        for (const i in t)
          n[i] == null && an(o, i, "");
    for (const i in n)
      i === "display" && (r = !0), an(o, i, n[i]);
  } else if (s) {
    if (t !== n) {
      const i = o[Ac];
      i && (n += ";" + i), o.cssText = n, r = Ic.test(n);
    }
  } else t && e.removeAttribute("style");
  _s in e && (e[_s] = r ? o.display : "", e[$c] && (o.display = "none"));
}
const Mc = /[^\\];\s*$/, vs = /\s*!important$/;
function an(e, t, n) {
  if (C(n))
    n.forEach((o) => an(e, t, o));
  else if (n == null && (n = ""), process.env.NODE_ENV !== "production" && Mc.test(n) && ke(
    `Unexpected semicolon at the end of '${t}' style value: '${n}'`
  ), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = Rc(e, t);
    vs.test(n) ? e.setProperty(
      tt(o),
      n.replace(vs, ""),
      "important"
    ) : e[o] = n;
  }
}
const Es = ["Webkit", "Moz", "ms"], Zn = {};
function Rc(e, t) {
  const n = Zn[t];
  if (n)
    return n;
  let o = Ne(t);
  if (o !== "filter" && o in e)
    return Zn[t] = o;
  o = Sn(o);
  for (let s = 0; s < Es.length; s++) {
    const r = Es[s] + o;
    if (r in e)
      return Zn[t] = r;
  }
  return t;
}
const bs = "http://www.w3.org/1999/xlink";
function Ns(e, t, n, o, s, r = ui(t)) {
  o && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(bs, t.slice(6, t.length)) : e.setAttributeNS(bs, t, n) : n == null || r && !As(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : ot(n) ? String(n) : n
  );
}
function ys(e, t, n, o, s) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Kr(n) : n);
    return;
  }
  const r = e.tagName;
  if (t === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const l = r === "OPTION" ? e.getAttribute("value") || "" : e.value, f = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== f || !("_value" in e)) && (e.value = f), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let i = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = As(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch (l) {
    process.env.NODE_ENV !== "production" && !i && ke(
      `Failed setting prop "${t}" on <${r.toLowerCase()}>: value ${n} is invalid.`,
      l
    );
  }
  i && e.removeAttribute(s || t);
}
function Fc(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function jc(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
const Os = Symbol("_vei");
function Hc(e, t, n, o, s = null) {
  const r = e[Os] || (e[Os] = {}), i = r[t];
  if (o && i)
    i.value = process.env.NODE_ENV !== "production" ? Ds(o, t) : o;
  else {
    const [l, f] = Lc(t);
    if (o) {
      const d = r[t] = kc(
        process.env.NODE_ENV !== "production" ? Ds(o, t) : o,
        s
      );
      Fc(e, l, d, f);
    } else i && (jc(e, l, i, f), r[t] = void 0);
  }
}
const xs = /(?:Once|Passive|Capture)$/;
function Lc(e) {
  let t;
  if (xs.test(e)) {
    t = {};
    let o;
    for (; o = e.match(xs); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : tt(e.slice(2)), t];
}
let Qn = 0;
const Uc = /* @__PURE__ */ Promise.resolve(), Bc = () => Qn || (Uc.then(() => Qn = 0), Qn = Date.now());
function kc(e, t) {
  const n = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= n.attached)
      return;
    je(
      Kc(o, n.value),
      t,
      5,
      [o]
    );
  };
  return n.value = e, n.attached = Bc(), n;
}
function Ds(e, t) {
  return $(e) || C(e) ? e : (ke(
    `Wrong type passed as event handler to ${t} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof e}.`
  ), X);
}
function Kc(e, t) {
  if (C(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (o) => (s) => !s._stopped && o && o(s)
    );
  } else
    return t;
}
const ws = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Wc = (e, t, n, o, s, r) => {
  const i = s === "svg";
  t === "class" ? Cc(e, o, i) : t === "style" ? Pc(e, n, o) : Gt(t) ? pn(t) || Hc(e, t, n, o, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Gc(e, t, o, i)) ? (ys(e, t, o), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Ns(e, t, o, i, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !q(o)) ? ys(e, Ne(t), o, r, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), Ns(e, t, o, i));
};
function Gc(e, t, n, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && ws(t) && $(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
      return !1;
  }
  return ws(t) && q(n) ? !1 : t in e;
}
const qc = ["ctrl", "shift", "alt", "meta"], Jc = {
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
  exact: (e, t) => qc.some((n) => e[`${n}Key`] && !t.includes(n))
}, Yc = (e, t) => {
  const n = e._withMods || (e._withMods = {}), o = t.join(".");
  return n[o] || (n[o] = ((s, ...r) => {
    for (let i = 0; i < t.length; i++) {
      const l = Jc[t[i]];
      if (l && l(s, t)) return;
    }
    return e(s, ...r);
  }));
}, zc = /* @__PURE__ */ Y({ patchProp: Wc }, Sc);
let Vs;
function Xc() {
  return Vs || (Vs = ql(zc));
}
const Zc = ((...e) => {
  const t = Xc().createApp(...e);
  process.env.NODE_ENV !== "production" && (ef(t), tf(t));
  const { mount: n } = t;
  return t.mount = (o) => {
    const s = nf(o);
    if (!s) return;
    const r = t._component;
    !$(r) && !r.render && !r.template && (r.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const i = n(s, !1, Qc(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), i;
  }, t;
});
function Qc(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function ef(e) {
  Object.defineProperty(e.config, "isNativeTag", {
    value: (t) => ii(t) || li(t) || ci(t),
    writable: !1
  });
}
function tf(e) {
  {
    const t = e.config.isCustomElement;
    Object.defineProperty(e.config, "isCustomElement", {
      get() {
        return t;
      },
      set() {
        ke(
          "The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead."
        );
      }
    });
    const n = e.config.compilerOptions, o = 'The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader\'s `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc';
    Object.defineProperty(e.config, "compilerOptions", {
      get() {
        return ke(o), n;
      },
      set() {
        ke(o);
      }
    });
  }
}
function nf(e) {
  if (q(e)) {
    const t = document.querySelector(e);
    return process.env.NODE_ENV !== "production" && !t && ke(
      `Failed to mount app: mount target selector "${e}" returned null.`
    ), t;
  }
  return process.env.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && ke(
    'mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs'
  ), e;
}
/**
* vue v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function of() {
  Dc();
}
process.env.NODE_ENV !== "production" && of();
const sf = /* @__PURE__ */ zt({
  __name: "ChatEntryText",
  props: {
    text: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => bo(t.text);
  }
});
function Dn(e) {
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
const Wr = Symbol("GlobalJsonConfig"), rf = {
  install(e, t) {
    e.provide(Wr, t);
  }
};
function Hn() {
  const e = Ht(Wr);
  if (!e)
    throw new Error("Plugin GlobalJsonConfig not found.");
  return e;
}
const lf = /* @__PURE__ */ zt({
  __name: "ChatEntry",
  props: {
    entry: {}
  },
  setup(e) {
    const t = Hn(), n = e, o = {
      ...Dn(n.entry.type === "bot" ? t.botEntryStyle : t.userEntryStyle),
      marginTop: `${t.listGap}px`
    };
    return (s, r) => (et(), pt("div", {
      class: Cn(["entrcont", n.entry.type])
    }, [
      Ro("div", {
        class: "entry",
        style: o
      }, [
        xe(sf, {
          text: n.entry.text
        }, null, 8, ["text"])
      ])
    ], 2));
  }
}), Ln = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, s] of t)
    n[o] = s;
  return n;
}, cf = /* @__PURE__ */ Ln(lf, [["__scopeId", "data-v-14a7ed94"]]), ff = /* @__PURE__ */ zt({
  __name: "ChatList",
  props: {
    list: {}
  },
  setup(e) {
    const t = Hn(), n = {
      ...Dn(t.listStyle),
      padding: `0 ${t.listGap}px ${t.listGap}px ${t.listGap}px`
    };
    t.listHeight && t.listHeight > 0 && (n.height = `${t.listHeight}px`);
    const o = e, s = Xs(null);
    return yt(
      () => o.list.length,
      (r, i) => {
        r > i && nr(() => {
          s.value && (s.value.scrollTop = s.value.scrollHeight);
        });
      }
    ), (r, i) => (et(), pt("div", {
      class: "chat-list",
      style: n,
      ref_key: "listContainer",
      ref: s
    }, [
      (et(!0), pt(_e, null, mr(o.list, (l) => (et(), fc(cf, {
        key: l.id,
        entry: l
      }, null, 8, ["entry"]))), 128))
    ], 512));
  }
}), uf = /* @__PURE__ */ Ln(ff, [["__scopeId", "data-v-65d1a758"]]), af = ["onClick"], pf = /* @__PURE__ */ zt({
  __name: "ChatInput",
  props: {
    label: {}
  },
  emits: ["addEntry"],
  setup(e, { emit: t }) {
    const n = Hn(), o = {
      ...Dn(n.inputStyle),
      minHeight: `${n.inputRows}rem`
    }, s = Dn(n.inputStyleUser), r = e, i = t, l = Ho(() => n.chat.user.filter((f) => f.label === r.label));
    return (f, d) => (et(), pt("div", {
      class: "outer",
      style: o
    }, [
      (et(!0), pt(_e, null, mr(l.value, (p, a) => (et(), pt("div", {
        key: a,
        style: Tn(Zs(s)),
        onClick: Yc((g) => i("addEntry", p), ["prevent"])
      }, bo(p.text), 13, af))), 128))
    ]));
  }
}), df = /* @__PURE__ */ Ln(pf, [["__scopeId", "data-v-e7e1cd12"]]), hf = /* @__PURE__ */ zt({
  __name: "App",
  setup(e, { expose: t }) {
    const n = Hn();
    n.chat.user.forEach((f) => {
      f.label = f.label.trim(), f.next = f.next?.trim();
    }), n.chat.bot.forEach((f) => {
      f.label = f.label.trim();
    });
    const o = Xs({
      curr: [],
      currLabel: "START",
      prev: []
    });
    yt(
      () => o.value.currLabel,
      (f) => {
        const d = n.chat.bot.find((p) => p.label === f);
        if (d) {
          const p = o.value.curr.length > 0 && n.botDelay || 0;
          setTimeout(() => {
            const a = o.value.curr.length + 1;
            o.value.curr.push({
              id: a,
              type: "bot",
              text: d.text
            });
            const g = {
              event: "ENTRY_ADDED_BOT",
              text: d.text
            };
            n.fsm?.logEvent(g);
          }, p);
        } else
          n.fsm?.logEvent(`BOT_RESPONSE_NOT_FOUND: ${f}`);
      },
      { immediate: !0 }
    );
    const s = Ho(() => {
      const f = o.value.curr.length;
      return f > 0 && o.value.curr[f - 1]?.type === "bot" ? o.value.currLabel : "";
    });
    t({
      chat: o
      // Freigegebene Property
    });
    const r = () => {
      o.value.curr.length > 0 && o.value.prev.push(o.value.curr), o.value.curr = [], o.value.currLabel = "START", n.fsm?.logEvent("CHAT_RESTARTED"), i(o.value.currLabel);
    }, i = (f) => {
      if (f === "RESTART") {
        r();
        return;
      } else if (f !== "END")
        if (f === "START") {
          const d = n.chat.bot.find((p) => p.label === "START") || n.chat.bot[0];
          d ? o.value.currLabel = d.label : (n.fsm?.logEvent("CHAT_START_LABEL_NOT_FOUND"), f = "END");
        } else if (f.length > 0) {
          const d = n.chat.bot.find((p) => p.label === f);
          d ? o.value.currLabel = d.label : (n.fsm?.logEvent(`CHAT_LABEL_NOT_FOUND: ${f}`), f = "END");
        } else {
          const d = n.chat.bot.findIndex(
            (p) => p.label === o.value.currLabel
          );
          d >= 0 && d < n.chat.bot.length - 1 ? o.value.currLabel = n.chat.bot[d + 1].label : f = "END";
        }
      if (f === "END") {
        n.fsm?.logEvent("CHAT_ENDED"), n.fsm?.triggerEvent("RESPONSE");
        return;
      }
    };
    hr(() => i(o.value.currLabel));
    const l = (f) => {
      if (f.next != "RESTART" && f.next !== "EXIT") {
        const p = o.value.curr.length + 1;
        o.value.curr.push({
          id: p,
          type: "user",
          text: f.text
        });
      }
      const d = {
        event: "ENTRY_ADDED_USER",
        text: f.text
      };
      n.fsm?.logEvent(d), i(f.next || "");
    };
    return (f, d) => (et(), pt("div", null, [
      xe(uf, {
        class: "list",
        list: o.value.curr
      }, null, 8, ["list"]),
      xe(df, {
        label: s.value,
        onAddEntry: l
      }, null, 8, ["label"])
    ]));
  }
}), gf = /* @__PURE__ */ Ln(hf, [["__scopeId", "data-v-c2ae4b39"]]);
function mf(e) {
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
function _f(e) {
  const t = {}, n = Qe(e) ? P(e) : e;
  for (const o in n)
    if (Object.prototype.hasOwnProperty.call(n, o)) {
      const s = n[o];
      J(s) ? t[o] = s.value : t[o] = s;
    }
  return t;
}
const Ef = (e, t, n, o) => {
  o && (t.postMessagePayload = o), mf(t);
  const s = Zc(gf);
  s.use(rf, t);
  const i = s.mount(e);
  return n && yt(
    () => _f(i),
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
  Ef as initializeAndMount
};
