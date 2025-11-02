/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Ge(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const k = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, Et = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], X = () => {
}, Ss = () => !1, Gt = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), pn = (e) => e.startsWith("onUpdate:"), z = Object.assign, _o = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, zr = Object.prototype.hasOwnProperty, j = (e, t) => zr.call(e, t), C = Array.isArray, ft = (e) => wn(e) === "[object Map]", Ts = (e) => wn(e) === "[object Set]", $ = (e) => typeof e == "function", q = (e) => typeof e == "string", st = (e) => typeof e == "symbol", K = (e) => e !== null && typeof e == "object", vo = (e) => (K(e) || $(e)) && $(e.then) && $(e.catch), Cs = Object.prototype.toString, wn = (e) => Cs.call(e), Eo = (e) => wn(e).slice(8, -1), $s = (e) => wn(e) === "[object Object]", bo = (e) => q(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Pt = /* @__PURE__ */ Ge(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Yr = /* @__PURE__ */ Ge(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), Vn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, Xr = /-\w/g, Oe = Vn(
  (e) => e.replace(Xr, (t) => t.slice(1).toUpperCase())
), Zr = /\B([A-Z])/g, nt = Vn(
  (e) => e.replace(Zr, "-$1").toLowerCase()
), Sn = Vn((e) => e.charAt(0).toUpperCase() + e.slice(1)), lt = Vn(
  (e) => e ? `on${Sn(e)}` : ""
), et = (e, t) => !Object.is(e, t), St = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, dn = (e, t, n, o = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: o,
    value: n
  });
}, Qr = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Wo;
const qt = () => Wo || (Wo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Tn(e) {
  if (C(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], s = q(o) ? oi(o) : Tn(o);
      if (s)
        for (const r in s)
          t[r] = s[r];
    }
    return t;
  } else if (q(e) || K(e))
    return e;
}
const ei = /;(?![^(]*\))/g, ti = /:([^]+)/, ni = /\/\*[^]*?\*\//g;
function oi(e) {
  const t = {};
  return e.replace(ni, "").split(ei).forEach((n) => {
    if (n) {
      const o = n.split(ti);
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
const si = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", ri = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", ii = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", li = /* @__PURE__ */ Ge(si), ci = /* @__PURE__ */ Ge(ri), fi = /* @__PURE__ */ Ge(ii), ui = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", ai = /* @__PURE__ */ Ge(ui);
function As(e) {
  return !!e || e === "";
}
const Is = (e) => !!(e && e.__v_isRef === !0), $n = (e) => q(e) ? e : e == null ? "" : C(e) || K(e) && (e.toString === Cs || !$(e.toString)) ? Is(e) ? $n(e.value) : JSON.stringify(e, Ps, 2) : String(e), Ps = (e, t) => Is(t) ? Ps(e, t.value) : ft(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [o, s], r) => (n[Wn(o, r) + " =>"] = s, n),
    {}
  )
} : Ts(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Wn(n))
} : st(t) ? Wn(t) : K(t) && !C(t) && !$s(t) ? String(t) : t, Wn = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    st(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function we(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let ae;
class pi {
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
    } else process.env.NODE_ENV !== "production" && we("cannot run an inactive effect scope.");
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
function di() {
  return ae;
}
let U;
const Gn = /* @__PURE__ */ new WeakSet();
class Ms {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ae && ae.active && ae.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Gn.has(this) && (Gn.delete(this), this.trigger()));
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
    const t = U, n = xe;
    U = this, xe = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && U !== this && we(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), Hs(this), U = t, xe = n, this.flags &= -3;
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
    this.flags & 64 ? Gn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    to(this) && this.run();
  }
  get dirty() {
    return to(this);
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
    o.version === -1 ? (o === n && (n = s), Oo(o), hi(o)) : t = o, o.dep.activeLink = o.prevActiveLink, o.prevActiveLink = void 0, o = s;
  }
  e.deps = t, e.depsTail = n;
}
function to(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Ls(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Ls(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ut) || (e.globalVersion = Ut, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !to(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = U, o = xe;
  U = e, xe = !0;
  try {
    js(e);
    const s = e.fn(e._value);
    (t.version === 0 || et(s, e._value)) && (e.flags |= 128, e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    U = n, xe = o, Hs(e), e.flags &= -3;
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
function hi(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let xe = !0;
const Us = [];
function Ve() {
  Us.push(xe), xe = !1;
}
function Se() {
  const e = Us.pop();
  xe = e === void 0 ? !0 : e;
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
class gi {
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
    if (!U || !xe || U === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== U)
      n = this.activeLink = new gi(U, this), U.deps ? (n.prevDep = U.depsTail, U.depsTail.nextDep = n, U.depsTail = n) : U.deps = U.depsTail = n, Bs(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const o = n.nextDep;
      o.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = o), n.prevDep = U.depsTail, n.nextDep = void 0, U.depsTail.nextDep = n, U.depsTail = n, U.deps === n && (U.deps = o);
    }
    return process.env.NODE_ENV !== "production" && U.onTrack && U.onTrack(
      z(
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
            z(
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
const no = /* @__PURE__ */ new WeakMap(), ut = Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), oo = Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), Bt = Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function Y(e, t, n) {
  if (xe && U) {
    let o = no.get(e);
    o || no.set(e, o = /* @__PURE__ */ new Map());
    let s = o.get(n);
    s || (o.set(n, s = new xo()), s.map = o, s.key = n), process.env.NODE_ENV !== "production" ? s.track({
      target: e,
      type: t,
      key: n
    }) : s.track();
  }
}
function Me(e, t, n, o, s, r) {
  const i = no.get(e);
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
    const f = C(e), d = f && bo(n);
    if (f && n === "length") {
      const p = Number(o);
      i.forEach((a, g) => {
        (g === "length" || g === Bt || !st(g) && g >= p) && l(a);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), d && l(i.get(Bt)), t) {
        case "add":
          f ? d && l(i.get("length")) : (l(i.get(ut)), ft(e) && l(i.get(oo)));
          break;
        case "delete":
          f || (l(i.get(ut)), ft(e) && l(i.get(oo)));
          break;
        case "set":
          ft(e) && l(i.get(ut));
          break;
      }
  }
  yo();
}
function gt(e) {
  const t = P(e);
  return t === e ? t : (Y(t, "iterate", Bt), ie(e) ? t : t.map(ee));
}
function An(e) {
  return Y(e = P(e), "iterate", Bt), e;
}
const mi = {
  __proto__: null,
  [Symbol.iterator]() {
    return qn(this, Symbol.iterator, ee);
  },
  concat(...e) {
    return gt(this).concat(
      ...e.map((t) => C(t) ? gt(t) : t)
    );
  },
  entries() {
    return qn(this, "entries", (e) => (e[1] = ee(e[1]), e));
  },
  every(e, t) {
    return Ue(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ue(this, "filter", e, t, (n) => n.map(ee), arguments);
  },
  find(e, t) {
    return Ue(this, "find", e, t, ee, arguments);
  },
  findIndex(e, t) {
    return Ue(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ue(this, "findLast", e, t, ee, arguments);
  },
  findLastIndex(e, t) {
    return Ue(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ue(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Jn(this, "includes", e);
  },
  indexOf(...e) {
    return Jn(this, "indexOf", e);
  },
  join(e) {
    return gt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Jn(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ue(this, "map", e, t, void 0, arguments);
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
    return Ue(this, "some", e, t, void 0, arguments);
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
    return qn(this, "values", ee);
  }
};
function qn(e, t, n) {
  const o = An(e), s = o[t]();
  return o !== e && !ie(e) && (s._next = s.next, s.next = () => {
    const r = s._next();
    return r.done || (r.value = n(r.value)), r;
  }), s;
}
const _i = Array.prototype;
function Ue(e, t, n, o, s, r) {
  const i = An(e), l = i !== e && !ie(e), f = i[t];
  if (f !== _i[t]) {
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
  const s = An(e);
  let r = n;
  return s !== e && (ie(e) ? n.length > 3 && (r = function(i, l, f) {
    return n.call(this, i, l, f, e);
  }) : r = function(i, l, f) {
    return n.call(this, i, ee(l), f, e);
  }), s[t](r, ...o);
}
function Jn(e, t, n) {
  const o = P(e);
  Y(o, "iterate", Bt);
  const s = o[t](...n);
  return (s === -1 || s === !1) && hn(n[0]) ? (n[0] = P(n[0]), o[t](...n)) : s;
}
function Tt(e, t, n = []) {
  Ve(), No();
  const o = P(e)[t].apply(e, n);
  return yo(), Se(), o;
}
const vi = /* @__PURE__ */ Ge("__proto__,__v_isRef,__isVue"), ks = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(st)
);
function Ei(e) {
  st(e) || (e = String(e));
  const t = P(this);
  return Y(t, "has", e), t.hasOwnProperty(e);
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
      return o === (s ? r ? Ys : zs : r ? Js : qs).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const i = C(t);
    if (!s) {
      let f;
      if (i && (f = mi[n]))
        return f;
      if (n === "hasOwnProperty")
        return Ei;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      J(t) ? t : o
    );
    if ((st(n) ? ks.has(n) : vi(n)) || (s || Y(t, "get", n), r))
      return l;
    if (J(l)) {
      const f = i && bo(n) ? l : l.value;
      return s && K(f) ? ro(f) : f;
    }
    return K(l) ? s ? ro(l) : Do(l) : l;
  }
}
class Ws extends Ks {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, o, s) {
    let r = t[n];
    if (!this._isShallow) {
      const f = je(r);
      if (!ie(o) && !je(o) && (r = P(r), o = P(o)), !C(t) && J(r) && !J(o))
        return f ? (process.env.NODE_ENV !== "production" && we(
          `Set operation on key "${String(n)}" failed: target is readonly.`,
          t[n]
        ), !0) : (r.value = o, !0);
    }
    const i = C(t) && bo(n) ? Number(n) < t.length : j(t, n), l = Reflect.set(
      t,
      n,
      o,
      J(t) ? t : s
    );
    return t === P(s) && (i ? et(o, r) && Me(t, "set", n, o, r) : Me(t, "add", n, o)), l;
  }
  deleteProperty(t, n) {
    const o = j(t, n), s = t[n], r = Reflect.deleteProperty(t, n);
    return r && o && Me(t, "delete", n, void 0, s), r;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!st(n) || !ks.has(n)) && Y(t, "has", n), o;
  }
  ownKeys(t) {
    return Y(
      t,
      "iterate",
      C(t) ? "length" : ut
    ), Reflect.ownKeys(t);
  }
}
class Gs extends Ks {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && we(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && we(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const bi = /* @__PURE__ */ new Ws(), Ni = /* @__PURE__ */ new Gs(), yi = /* @__PURE__ */ new Ws(!0), Oi = /* @__PURE__ */ new Gs(!0), so = (e) => e, tn = (e) => Reflect.getPrototypeOf(e);
function xi(e, t, n) {
  return function(...o) {
    const s = this.__v_raw, r = P(s), i = ft(r), l = e === "entries" || e === Symbol.iterator && i, f = e === "keys" && i, d = s[e](...o), p = n ? so : t ? gn : ee;
    return !t && Y(
      r,
      "iterate",
      f ? oo : ut
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
      we(
        `${Sn(e)} operation ${n}failed: target is readonly.`,
        P(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Di(e, t) {
  const n = {
    get(s) {
      const r = this.__v_raw, i = P(r), l = P(s);
      e || (et(s, l) && Y(i, "get", s), Y(i, "get", l));
      const { has: f } = tn(i), d = t ? so : e ? gn : ee;
      if (f.call(i, s))
        return d(r.get(s));
      if (f.call(i, l))
        return d(r.get(l));
      r !== i && r.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !e && Y(P(s), "iterate", ut), s.size;
    },
    has(s) {
      const r = this.__v_raw, i = P(r), l = P(s);
      return e || (et(s, l) && Y(i, "has", s), Y(i, "has", l)), s === l ? r.has(s) : r.has(s) || r.has(l);
    },
    forEach(s, r) {
      const i = this, l = i.__v_raw, f = P(l), d = t ? so : e ? gn : ee;
      return !e && Y(f, "iterate", ut), l.forEach((p, a) => s.call(r, d(p), d(a), i));
    }
  };
  return z(
    n,
    e ? {
      add: nn("add"),
      set: nn("set"),
      delete: nn("delete"),
      clear: nn("clear")
    } : {
      add(s) {
        !t && !ie(s) && !je(s) && (s = P(s));
        const r = P(this);
        return tn(r).has.call(r, s) || (r.add(s), Me(r, "add", s, s)), this;
      },
      set(s, r) {
        !t && !ie(r) && !je(r) && (r = P(r));
        const i = P(this), { has: l, get: f } = tn(i);
        let d = l.call(i, s);
        d ? process.env.NODE_ENV !== "production" && Jo(i, l, s) : (s = P(s), d = l.call(i, s));
        const p = f.call(i, s);
        return i.set(s, r), d ? et(r, p) && Me(i, "set", s, r, p) : Me(i, "add", s, r), this;
      },
      delete(s) {
        const r = P(this), { has: i, get: l } = tn(r);
        let f = i.call(r, s);
        f ? process.env.NODE_ENV !== "production" && Jo(r, i, s) : (s = P(s), f = i.call(r, s));
        const d = l ? l.call(r, s) : void 0, p = r.delete(s);
        return f && Me(r, "delete", s, void 0, d), p;
      },
      clear() {
        const s = P(this), r = s.size !== 0, i = process.env.NODE_ENV !== "production" ? ft(s) ? new Map(s) : new Set(s) : void 0, l = s.clear();
        return r && Me(
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
    n[s] = xi(s, e, t);
  }), n;
}
function In(e, t) {
  const n = Di(e, t);
  return (o, s, r) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get(
    j(n, s) && s in o ? n : o,
    s,
    r
  );
}
const wi = {
  get: /* @__PURE__ */ In(!1, !1)
}, Vi = {
  get: /* @__PURE__ */ In(!1, !0)
}, Si = {
  get: /* @__PURE__ */ In(!0, !1)
}, Ti = {
  get: /* @__PURE__ */ In(!0, !0)
};
function Jo(e, t, n) {
  const o = P(n);
  if (o !== n && t.call(e, o)) {
    const s = Eo(e);
    we(
      `Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const qs = /* @__PURE__ */ new WeakMap(), Js = /* @__PURE__ */ new WeakMap(), zs = /* @__PURE__ */ new WeakMap(), Ys = /* @__PURE__ */ new WeakMap();
function Ci(e) {
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
function $i(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ci(Eo(e));
}
function Do(e) {
  return je(e) ? e : Pn(
    e,
    !1,
    bi,
    wi,
    qs
  );
}
function Ai(e) {
  return Pn(
    e,
    !1,
    yi,
    Vi,
    Js
  );
}
function ro(e) {
  return Pn(
    e,
    !0,
    Ni,
    Si,
    zs
  );
}
function Re(e) {
  return Pn(
    e,
    !0,
    Oi,
    Ti,
    Ys
  );
}
function Pn(e, t, n, o, s) {
  if (!K(e))
    return process.env.NODE_ENV !== "production" && we(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = $i(e);
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
function tt(e) {
  return je(e) ? tt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function je(e) {
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
function Ii(e) {
  return !j(e, "__v_skip") && Object.isExtensible(e) && dn(e, "__v_skip", !0), e;
}
const ee = (e) => K(e) ? Do(e) : e, gn = (e) => K(e) ? ro(e) : e;
function J(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function Xs(e) {
  return Pi(e, !1);
}
function Pi(e, t) {
  return J(e) ? e : new Mi(e, t);
}
class Mi {
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
    const n = this._rawValue, o = this.__v_isShallow || ie(t) || je(t);
    t = o ? t : P(t), et(t, n) && (this._rawValue = t, this._value = o ? t : ee(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }) : this.dep.trigger());
  }
}
function wo(e) {
  return J(e) ? e.value : e;
}
const Ri = {
  get: (e, t, n) => t === "__v_raw" ? e : wo(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const s = e[t];
    return J(s) && !J(n) ? (s.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function Zs(e) {
  return tt(e) ? e : new Proxy(e, Ri);
}
class Fi {
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
    this.setter ? this.setter(t) : process.env.NODE_ENV !== "production" && we("Write operation failed: computed value is readonly");
  }
}
function ji(e, t, n = !1) {
  let o, s;
  $(e) ? o = e : (o = e.get, s = e.set);
  const r = new Fi(o, s, n);
  return process.env.NODE_ENV, r;
}
const on = {}, mn = /* @__PURE__ */ new WeakMap();
let ct;
function Hi(e, t = !1, n = ct) {
  if (n) {
    let o = mn.get(n);
    o || mn.set(n, o = []), o.push(e);
  } else process.env.NODE_ENV !== "production" && !t && we(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function Li(e, t, n = k) {
  const { immediate: o, deep: s, once: r, scheduler: i, augmentJob: l, call: f } = n, d = (S) => {
    (n.onWarn || we)(
      "Invalid watch source: ",
      S,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, p = (S) => s ? S : ie(S) || s === !1 || s === 0 ? Qe(S, 1) : Qe(S);
  let a, g, O, A, V = !1, Z = !1;
  if (J(e) ? (g = () => e.value, V = ie(e)) : tt(e) ? (g = () => p(e), V = !0) : C(e) ? (Z = !0, V = e.some((S) => tt(S) || ie(S)), g = () => e.map((S) => {
    if (J(S))
      return S.value;
    if (tt(S))
      return p(S);
    if ($(S))
      return f ? f(S, 2) : S();
    process.env.NODE_ENV !== "production" && d(S);
  })) : $(e) ? t ? g = f ? () => f(e, 2) : e : g = () => {
    if (O) {
      Ve();
      try {
        O();
      } finally {
        Se();
      }
    }
    const S = ct;
    ct = a;
    try {
      return f ? f(e, 3, [A]) : e(A);
    } finally {
      ct = S;
    }
  } : (g = X, process.env.NODE_ENV !== "production" && d(e)), t && s) {
    const S = g, Q = s === !0 ? 1 / 0 : s;
    g = () => Qe(S(), Q);
  }
  const G = di(), L = () => {
    a.stop(), G && G.active && _o(G.effects, a);
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
        if (s || V || (Z ? Q.some((_e, ne) => et(_e, H[ne])) : et(Q, H))) {
          O && O();
          const _e = ct;
          ct = a;
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
            ct = _e;
          }
        }
      } else
        a.run();
  };
  return l && l(pe), a = new Ms(g), a.scheduler = i ? () => i(pe, !1) : pe, A = (S) => Hi(S, !1, a), O = a.onStop = () => {
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
function Qe(e, t = 1 / 0, n) {
  if (t <= 0 || !K(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, J(e))
    Qe(e.value, t, n);
  else if (C(e))
    for (let o = 0; o < e.length; o++)
      Qe(e[o], t, n);
  else if (Ts(e) || ft(e))
    e.forEach((o) => {
      Qe(o, t, n);
    });
  else if ($s(e)) {
    for (const o in e)
      Qe(e[o], t, n);
    for (const o of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, o) && Qe(e[o], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const at = [];
function sn(e) {
  at.push(e);
}
function rn() {
  at.pop();
}
let zn = !1;
function y(e, ...t) {
  if (zn) return;
  zn = !0, Ve();
  const n = at.length ? at[at.length - 1].component : null, o = n && n.appContext.config.warnHandler, s = Ui();
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
          ({ vnode: r }) => `at <${Hn(n, r.type)}>`
        ).join(`
`),
        s
      ]
    );
  else {
    const r = [`[Vue warn]: ${e}`, ...t];
    s.length && r.push(`
`, ...Bi(s)), console.warn(...r);
  }
  Se(), zn = !1;
}
function Ui() {
  let e = at[at.length - 1];
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
function Bi(e) {
  const t = [];
  return e.forEach((n, o) => {
    t.push(...o === 0 ? [] : [`
`], ...ki(n));
  }), t;
}
function ki({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, s = ` at <${Hn(
    e.component,
    e.type,
    o
  )}`, r = ">" + n;
  return e.props ? [s, ...Ki(e.props), r] : [s + r];
}
function Ki(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((o) => {
    t.push(...Qs(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Qs(e, t, n) {
  return q(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : J(t) ? (t = Qs(e, P(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : $(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = P(t), n ? t : [`${e}=`, t]);
}
const Vo = {
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
function He(e, t, n, o) {
  if ($(e)) {
    const s = Ot(e, t, n, o);
    return s && vo(s) && s.catch((r) => {
      Jt(r, t, n);
    }), s;
  }
  if (C(e)) {
    const s = [];
    for (let r = 0; r < e.length; r++)
      s.push(He(e[r], t, n, o));
    return s;
  } else process.env.NODE_ENV !== "production" && y(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function Jt(e, t, n, o = !0) {
  const s = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: i } = t && t.appContext.config || k;
  if (t) {
    let l = t.parent;
    const f = t.proxy, d = process.env.NODE_ENV !== "production" ? Vo[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
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
      Ve(), Ot(r, null, 10, [
        e,
        f,
        d
      ]), Se();
      return;
    }
  }
  Wi(e, n, s, o, i);
}
function Wi(e, t, n, o = !0, s = !1) {
  if (process.env.NODE_ENV !== "production") {
    const r = Vo[t];
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
let Pe = -1;
const bt = [];
let Xe = null, vt = 0;
const er = /* @__PURE__ */ Promise.resolve();
let _n = null;
const Gi = 100;
function tr(e) {
  const t = _n || er;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function qi(e) {
  let t = Pe + 1, n = re.length;
  for (; t < n; ) {
    const o = t + n >>> 1, s = re[o], r = kt(s);
    r < e || r === e && s.flags & 2 ? t = o + 1 : n = o;
  }
  return t;
}
function Mn(e) {
  if (!(e.flags & 1)) {
    const t = kt(e), n = re[re.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= kt(n) ? re.push(e) : re.splice(qi(t), 0, e), e.flags |= 1, nr();
  }
}
function nr() {
  _n || (_n = er.then(rr));
}
function or(e) {
  C(e) ? bt.push(...e) : Xe && e.id === -1 ? Xe.splice(vt + 1, 0, e) : e.flags & 1 || (bt.push(e), e.flags |= 1), nr();
}
function zo(e, t, n = Pe + 1) {
  for (process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()); n < re.length; n++) {
    const o = re[n];
    if (o && o.flags & 2) {
      if (e && o.id !== e.uid || process.env.NODE_ENV !== "production" && So(t, o))
        continue;
      re.splice(n, 1), n--, o.flags & 4 && (o.flags &= -2), o(), o.flags & 4 || (o.flags &= -2);
    }
  }
}
function sr(e) {
  if (bt.length) {
    const t = [...new Set(bt)].sort(
      (n, o) => kt(n) - kt(o)
    );
    if (bt.length = 0, Xe) {
      Xe.push(...t);
      return;
    }
    for (Xe = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), vt = 0; vt < Xe.length; vt++) {
      const n = Xe[vt];
      process.env.NODE_ENV !== "production" && So(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    Xe = null, vt = 0;
  }
}
const kt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function rr(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => So(e, n) : X;
  try {
    for (Pe = 0; Pe < re.length; Pe++) {
      const n = re[Pe];
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
    for (; Pe < re.length; Pe++) {
      const n = re[Pe];
      n && (n.flags &= -2);
    }
    Pe = -1, re.length = 0, sr(e), _n = null, (re.length || bt.length) && rr(e);
  }
}
function So(e, t) {
  const n = e.get(t) || 0;
  if (n > Gi) {
    const o = t.i, s = o && kr(o.type);
    return Jt(
      `Maximum recursive updates exceeded${s ? ` in component <${s}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
let Fe = !1;
const ln = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (qt().__VUE_HMR_RUNTIME__ = {
  createRecord: Yn(ir),
  rerender: Yn(Yi),
  reload: Yn(Xi)
});
const dt = /* @__PURE__ */ new Map();
function Ji(e) {
  const t = e.type.__hmrId;
  let n = dt.get(t);
  n || (ir(t, e.type), n = dt.get(t)), n.instances.add(e);
}
function zi(e) {
  dt.get(e.type.__hmrId).instances.delete(e);
}
function ir(e, t) {
  return dt.has(e) ? !1 : (dt.set(e, {
    initialDef: vn(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function vn(e) {
  return Kr(e) ? e.__vccOpts : e;
}
function Yi(e, t) {
  const n = dt.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, vn(o.type).render = t), o.renderCache = [], Fe = !0, o.job.flags & 8 || o.update(), Fe = !1;
  }));
}
function Xi(e, t) {
  const n = dt.get(e);
  if (!n) return;
  t = vn(t), Yo(n.initialDef, t);
  const o = [...n.instances];
  for (let s = 0; s < o.length; s++) {
    const r = o[s], i = vn(r.type);
    let l = ln.get(i);
    l || (i !== n.initialDef && Yo(i, t), ln.set(i, l = /* @__PURE__ */ new Set())), l.add(r), r.appContext.propsCache.delete(r.type), r.appContext.emitsCache.delete(r.type), r.appContext.optionsCache.delete(r.type), r.ceReload ? (l.add(r), r.ceReload(t.styles), l.delete(r)) : r.parent ? Mn(() => {
      r.job.flags & 8 || (Fe = !0, r.parent.update(), Fe = !1, l.delete(r));
    }) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), r.root.ce && r !== r.root && r.root.ce._removeChildStyle(i);
  }
  or(() => {
    ln.clear();
  });
}
function Yo(e, t) {
  z(e, t);
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
let ye, At = [], io = !1;
function zt(e, ...t) {
  ye ? ye.emit(e, ...t) : io || At.push({ event: e, args: t });
}
function To(e, t) {
  var n, o;
  ye = e, ye ? (ye.enabled = !0, At.forEach(({ event: s, args: r }) => ye.emit(s, ...r)), At = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((o = (n = window.navigator) == null ? void 0 : n.userAgent) != null && o.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((r) => {
    To(r, t);
  }), setTimeout(() => {
    ye || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, io = !0, At = []);
  }, 3e3)) : (io = !0, At = []);
}
function Zi(e, t) {
  zt("app:init", e, t, {
    Fragment: ve,
    Text: Xt,
    Comment: me,
    Static: fn
  });
}
function Qi(e) {
  zt("app:unmount", e);
}
const el = /* @__PURE__ */ Co(
  "component:added"
  /* COMPONENT_ADDED */
), lr = /* @__PURE__ */ Co(
  "component:updated"
  /* COMPONENT_UPDATED */
), tl = /* @__PURE__ */ Co(
  "component:removed"
  /* COMPONENT_REMOVED */
), nl = (e) => {
  ye && typeof ye.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !ye.cleanupBuffer(e) && tl(e);
};
// @__NO_SIDE_EFFECTS__
function Co(e) {
  return (t) => {
    zt(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
const ol = /* @__PURE__ */ cr(
  "perf:start"
  /* PERFORMANCE_START */
), sl = /* @__PURE__ */ cr(
  "perf:end"
  /* PERFORMANCE_END */
);
function cr(e) {
  return (t, n, o) => {
    zt(e, t.appContext.app, t.uid, t, n, o);
  };
}
function rl(e, t, n) {
  zt(
    "component:emit",
    e.appContext.app,
    e,
    t,
    n
  );
}
let he = null, fr = null;
function En(e) {
  const t = he;
  return he = e, fr = e && e.type.__scopeId || null, t;
}
function il(e, t = he, n) {
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
    return process.env.NODE_ENV !== "production" && lr(t), i;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function ur(e) {
  Yr(e) && y("Do not use built-in directive ids as custom directive id: " + e);
}
function rt(e, t, n, o) {
  const s = e.dirs, r = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const l = s[i];
    r && (l.oldValue = r[i].value);
    let f = l.dir[o];
    f && (Ve(), He(f, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Se());
  }
}
const ll = Symbol("_vte"), cl = (e) => e.__isTeleport, fl = Symbol("_leaveCb");
function $o(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, $o(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Yt(e, t) {
  return $(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    z({ name: e.name }, t, { setup: e })
  ) : e;
}
function ar(e) {
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
  const d = t && t.r, p = l.refs === k ? l.refs = {} : l.refs, a = l.setupState, g = P(a), O = a === k ? Ss : (V) => process.env.NODE_ENV !== "production" && (j(g, V) && !J(g[V]) && y(
    `Template ref "${V}" used on a non-ref value. It will not work in the production build.`
  ), Xo.has(g[V])) ? !1 : j(g, V), A = (V) => process.env.NODE_ENV === "production" || !Xo.has(V);
  if (d != null && d !== f) {
    if (Zo(t), q(d))
      p[d] = null, O(d) && (a[d] = null);
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
          const L = V ? O(f) ? a[f] : p[f] : A(f) || !e.k ? f.value : p[e.k];
          if (s)
            C(L) && _o(L, r);
          else if (C(L))
            L.includes(r) || L.push(r);
          else if (V)
            p[f] = [r], O(f) && (a[f] = p[f]);
          else {
            const H = [r];
            A(f) && (f.value = H), e.k && (p[e.k] = H);
          }
        } else V ? (p[f] = i, O(f) && (a[f] = i)) : Z ? (A(f) && (f.value = i), e.k && (p[e.k] = i)) : process.env.NODE_ENV !== "production" && y("Invalid template ref type:", f, `(${typeof f})`);
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
const jt = (e) => !!e.type.__asyncLoader, Ao = (e) => e.type.__isKeepAlive;
function ul(e, t) {
  pr(e, "a", t);
}
function al(e, t) {
  pr(e, "da", t);
}
function pr(e, t, n = te) {
  const o = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if (Rn(t, o, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      Ao(s.parent.vnode) && pl(o, t, n, s), s = s.parent;
  }
}
function pl(e, t, n, o) {
  const s = Rn(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  hr(() => {
    _o(o[t], s);
  }, n);
}
function Rn(e, t, n = te, o = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...i) => {
      Ve();
      const l = Zt(n), f = He(t, n, e, i);
      return l(), Se(), f;
    });
    return o ? s.unshift(r) : s.push(r), r;
  } else if (process.env.NODE_ENV !== "production") {
    const s = lt(Vo[e].replace(/ hook$/, ""));
    y(
      `${s} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const qe = (e) => (t, n = te) => {
  (!Wt || e === "sp") && Rn(e, (...o) => t(...o), n);
}, dl = qe("bm"), dr = qe("m"), hl = qe(
  "bu"
), gl = qe("u"), ml = qe(
  "bum"
), hr = qe("um"), _l = qe(
  "sp"
), vl = qe("rtg"), El = qe("rtc");
function bl(e, t = te) {
  Rn("ec", e, t);
}
const Nl = Symbol.for("v-ndc");
function gr(e, t, n, o) {
  let s;
  const r = n, i = C(e);
  if (i || q(e)) {
    const l = i && tt(e);
    let f = !1, d = !1;
    l && (f = !ie(e), d = je(e), e = An(e)), s = new Array(e.length);
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
const lo = (e) => e ? Ur(e) ? jo(e) : lo(e.parent) : null, pt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ z(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? Re(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? Re(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? Re(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? Re(e.refs) : e.refs,
    $parent: (e) => lo(e.parent),
    $root: (e) => lo(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => vr(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Mn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = tr.bind(e.proxy)),
    $watch: (e) => ec.bind(e)
  })
), Io = (e) => e === "_" || e === "$", Xn = (e, t) => e !== k && !e.__isScriptSetup && j(e, t), mr = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: o, data: s, props: r, accessCache: i, type: l, appContext: f } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let d;
    if (t[0] !== "$") {
      const O = i[t];
      if (O !== void 0)
        switch (O) {
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
        if (Xn(o, t))
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
        co && (i[t] = 0);
      }
    }
    const p = pt[t];
    let a, g;
    if (p)
      return t === "$attrs" ? (Y(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && On()) : process.env.NODE_ENV !== "production" && t === "$slots" && Y(e, "get", t), p(e);
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
    t.indexOf("__v") !== 0) && (s !== k && Io(t[0]) && j(s, t) ? y(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === he && y(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: s, ctx: r } = e;
    return Xn(s, t) ? (s[t] = n, !0) : process.env.NODE_ENV !== "production" && s.__isScriptSetup && j(s, t) ? (y(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : o !== k && j(o, t) ? (o[t] = n, !0) : j(e.props, t) ? (process.env.NODE_ENV !== "production" && y(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && y(
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
    return !!(n[l] || e !== k && l[0] !== "$" && j(e, l) || Xn(t, l) || (f = r[0]) && j(f, l) || j(o, l) || j(pt, l) || j(s.config.globalProperties, l) || (d = i.__cssModules) && d[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : j(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (mr.ownKeys = (e) => (y(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function yl(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys(pt).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => pt[n](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: X
    });
  }), t;
}
function Ol(e) {
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
function xl(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(P(n)).forEach((o) => {
    if (!n.__isScriptSetup) {
      if (Io(o[0])) {
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
function Dl() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? y(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let co = !0;
function wl(e) {
  const t = vr(e), n = e.proxy, o = e.ctx;
  co = !1, t.beforeCreate && es(t.beforeCreate, e, "bc");
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
    beforeUpdate: O,
    updated: A,
    activated: V,
    deactivated: Z,
    beforeDestroy: G,
    beforeUnmount: L,
    destroyed: H,
    unmounted: pe,
    render: S,
    renderTracked: Q,
    renderTriggered: _e,
    errorCaptured: ne,
    serverPrefetch: le,
    // public API
    expose: Le,
    inheritAttrs: Je,
    // assets
    components: be,
    directives: Qt,
    filters: Lo
  } = t, ze = process.env.NODE_ENV !== "production" ? Dl() : null;
  if (process.env.NODE_ENV !== "production") {
    const [R] = e.propsOptions;
    if (R)
      for (const M in R)
        ze("Props", M);
  }
  if (d && Vl(d, o, ze), i)
    for (const R in i) {
      const M = i[R];
      $(M) ? (process.env.NODE_ENV !== "production" ? Object.defineProperty(o, R, {
        value: M.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : o[R] = M.bind(n), process.env.NODE_ENV !== "production" && ze("Methods", R)) : process.env.NODE_ENV !== "production" && y(
        `Method "${R}" has type "${typeof M}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (s) {
    process.env.NODE_ENV !== "production" && !$(s) && y(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const R = s.call(n, n);
    if (process.env.NODE_ENV !== "production" && vo(R) && y(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !K(R))
      process.env.NODE_ENV !== "production" && y("data() should return an object.");
    else if (e.data = Do(R), process.env.NODE_ENV !== "production")
      for (const M in R)
        ze("Data", M), Io(M[0]) || Object.defineProperty(o, M, {
          configurable: !0,
          enumerable: !0,
          get: () => R[M],
          set: X
        });
  }
  if (co = !0, r)
    for (const R in r) {
      const M = r[R], Te = $(M) ? M.bind(n, n) : $(M.get) ? M.get.bind(n, n) : X;
      process.env.NODE_ENV !== "production" && Te === X && y(`Computed property "${R}" has no getter.`);
      const Bn = !$(M) && $(M.set) ? M.set.bind(n) : process.env.NODE_ENV !== "production" ? () => {
        y(
          `Write operation failed: computed property "${R}" is readonly.`
        );
      } : X, xt = Ho({
        get: Te,
        set: Bn
      });
      Object.defineProperty(o, R, {
        enumerable: !0,
        configurable: !0,
        get: () => xt.value,
        set: (ht) => xt.value = ht
      }), process.env.NODE_ENV !== "production" && ze("Computed", R);
    }
  if (l)
    for (const R in l)
      _r(l[R], o, n, R);
  if (f) {
    const R = $(f) ? f.call(n) : f;
    Reflect.ownKeys(R).forEach((M) => {
      Il(M, R[M]);
    });
  }
  p && es(p, e, "c");
  function ce(R, M) {
    C(M) ? M.forEach((Te) => R(Te.bind(n))) : M && R(M.bind(n));
  }
  if (ce(dl, a), ce(dr, g), ce(hl, O), ce(gl, A), ce(ul, V), ce(al, Z), ce(bl, ne), ce(El, Q), ce(vl, _e), ce(ml, L), ce(hr, pe), ce(_l, le), C(Le))
    if (Le.length) {
      const R = e.exposed || (e.exposed = {});
      Le.forEach((M) => {
        Object.defineProperty(R, M, {
          get: () => n[M],
          set: (Te) => n[M] = Te,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  S && e.render === X && (e.render = S), Je != null && (e.inheritAttrs = Je), be && (e.components = be), Qt && (e.directives = Qt), le && ar(e);
}
function Vl(e, t, n = X) {
  C(e) && (e = fo(e));
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
  He(
    C(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function _r(e, t, n, o) {
  let s = o.includes(".") ? Cr(n, o) : () => n[o];
  if (q(e)) {
    const r = t[e];
    $(r) ? yt(s, r) : process.env.NODE_ENV !== "production" && y(`Invalid watch handler specified by key "${e}"`, r);
  } else if ($(e))
    yt(s, e.bind(n));
  else if (K(e))
    if (C(e))
      e.forEach((r) => _r(r, t, n, o));
    else {
      const r = $(e.handler) ? e.handler.bind(n) : t[e.handler];
      $(r) ? yt(s, r, e) : process.env.NODE_ENV !== "production" && y(`Invalid watch handler specified by key "${e.handler}"`, r);
    }
  else process.env.NODE_ENV !== "production" && y(`Invalid watch option: "${o}"`, e);
}
function vr(e) {
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
      const l = Sl[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Sl = {
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
  watch: Cl,
  // provide / inject
  provide: ts,
  inject: Tl
};
function ts(e, t) {
  return t ? e ? function() {
    return z(
      $(e) ? e.call(this, this) : e,
      $(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Tl(e, t) {
  return It(fo(e), fo(t));
}
function fo(e) {
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
  return e ? z(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ns(e, t) {
  return e ? C(e) && C(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : z(
    /* @__PURE__ */ Object.create(null),
    Qo(e),
    Qo(t ?? {})
  ) : t;
}
function Cl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = z(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = se(e[o], t[o]);
  return n;
}
function Er() {
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
let $l = 0;
function Al(e, t) {
  return function(o, s = null) {
    $(o) || (o = z({}, o)), s != null && !K(s) && (process.env.NODE_ENV !== "production" && y("root props passed to app.mount() must be an object."), s = null);
    const r = Er(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let f = !1;
    const d = r.app = {
      _uid: $l++,
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
        return process.env.NODE_ENV !== "production" && go(p, r.config), a ? (process.env.NODE_ENV !== "production" && r.components[p] && y(`Component "${p}" has already been registered in target app.`), r.components[p] = a, d) : r.components[p];
      },
      directive(p, a) {
        return process.env.NODE_ENV !== "production" && ur(p), a ? (process.env.NODE_ENV !== "production" && r.directives[p] && y(`Directive "${p}" has already been registered in target app.`), r.directives[p] = a, d) : r.directives[p];
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
          const O = d._ceVNode || Ee(o, s);
          return O.appContext = r, g === !0 ? g = "svg" : g === !1 && (g = void 0), process.env.NODE_ENV !== "production" && (r.reload = () => {
            const A = ot(O);
            A.el = null, e(A, p, g);
          }), e(O, p, g), f = !0, d._container = p, p.__vue_app__ = d, process.env.NODE_ENV !== "production" && (d._instance = O.component, Zi(d, hs)), jo(O.component);
        }
      },
      onUnmount(p) {
        process.env.NODE_ENV !== "production" && typeof p != "function" && y(
          `Expected function as first argument to app.onUnmount(), but got ${typeof p}`
        ), l.push(p);
      },
      unmount() {
        f ? (He(
          l,
          d._instance,
          16
        ), e(null, d._container), process.env.NODE_ENV !== "production" && (d._instance = null, Qi(d)), delete d._container.__vue_app__) : process.env.NODE_ENV !== "production" && y("Cannot unmount an app that is not mounted.");
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
function Il(e, t) {
  if (!te)
    process.env.NODE_ENV !== "production" && y("provide() can only be used inside setup().");
  else {
    let n = te.provides;
    const o = te.parent && te.parent.provides;
    o === n && (n = te.provides = Object.create(o)), n[e] = t;
  }
}
function Ht(e, t, n = !1) {
  const o = Lr();
  if (o || Nt) {
    let s = Nt ? Nt._context.provides : o ? o.parent == null || o.ce ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : void 0;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return n && $(t) ? t.call(o && o.proxy) : t;
    process.env.NODE_ENV !== "production" && y(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && y("inject() can only be used inside setup() or functional components.");
}
const br = {}, Nr = () => Object.create(br), yr = (e) => Object.getPrototypeOf(e) === br;
function Pl(e, t, n, o = !1) {
  const s = {}, r = Nr();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Or(e, t, s, r);
  for (const i in e.propsOptions[0])
    i in s || (s[i] = void 0);
  process.env.NODE_ENV !== "production" && Dr(t || {}, s, e), n ? e.props = o ? s : Ai(s) : e.type.props ? e.props = s : e.props = r, e.attrs = r;
}
function Ml(e) {
  for (; e; ) {
    if (e.type.__hmrId) return !0;
    e = e.parent;
  }
}
function Rl(e, t, n, o) {
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
    !(process.env.NODE_ENV !== "production" && Ml(e)) && (o || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const p = e.vnode.dynamicProps;
      for (let a = 0; a < p.length; a++) {
        let g = p[a];
        if (Fn(e.emitsOptions, g))
          continue;
        const O = t[g];
        if (f)
          if (j(r, g))
            O !== r[g] && (r[g] = O, d = !0);
          else {
            const A = Oe(g);
            s[A] = uo(
              f,
              l,
              A,
              O,
              e,
              !1
            );
          }
        else
          O !== r[g] && (r[g] = O, d = !0);
      }
    }
  } else {
    Or(e, t, s, r) && (d = !0);
    let p;
    for (const a in l)
      (!t || // for camelCase
      !j(t, a) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((p = nt(a)) === a || !j(t, p))) && (f ? n && // for camelCase
      (n[a] !== void 0 || // for kebab-case
      n[p] !== void 0) && (s[a] = uo(
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
  d && Me(e.attrs, "set", ""), process.env.NODE_ENV !== "production" && Dr(t || {}, s, e);
}
function Or(e, t, n, o) {
  const [s, r] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let f in t) {
      if (Pt(f))
        continue;
      const d = t[f];
      let p;
      s && j(s, p = Oe(f)) ? !r || !r.includes(p) ? n[p] = d : (l || (l = {}))[p] = d : Fn(e.emitsOptions, f) || (!(f in o) || d !== o[f]) && (o[f] = d, i = !0);
    }
  if (r) {
    const f = P(n), d = l || k;
    for (let p = 0; p < r.length; p++) {
      const a = r[p];
      n[a] = uo(
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
function uo(e, t, n, o, s, r) {
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
    ] && (o === "" || o === nt(n)) && (o = !0));
  }
  return o;
}
const Fl = /* @__PURE__ */ new WeakMap();
function xr(e, t, n = !1) {
  const o = n ? Fl : t.propsCache, s = o.get(e);
  if (s)
    return s;
  const r = e.props, i = {}, l = [];
  let f = !1;
  if (!$(e)) {
    const p = (a) => {
      f = !0;
      const [g, O] = xr(a, t, !0);
      z(i, g), O && l.push(...O);
    };
    !n && t.mixins.length && t.mixins.forEach(p), e.extends && p(e.extends), e.mixins && e.mixins.forEach(p);
  }
  if (!r && !f)
    return K(e) && o.set(e, Et), Et;
  if (C(r))
    for (let p = 0; p < r.length; p++) {
      process.env.NODE_ENV !== "production" && !q(r[p]) && y("props must be strings when using array syntax.", r[p]);
      const a = Oe(r[p]);
      os(a) && (i[a] = k);
    }
  else if (r) {
    process.env.NODE_ENV !== "production" && !K(r) && y("invalid props options", r);
    for (const p in r) {
      const a = Oe(p);
      if (os(a)) {
        const g = r[p], O = i[a] = C(g) || $(g) ? { type: g } : z({}, g), A = O.type;
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
        O[
          0
          /* shouldCast */
        ] = V, O[
          1
          /* shouldCastTrue */
        ] = Z, (V || j(O, "default")) && l.push(a);
      }
    }
  }
  const d = [i, l];
  return K(e) && o.set(e, d), d;
}
function os(e) {
  return e[0] !== "$" && !Pt(e) ? !0 : (process.env.NODE_ENV !== "production" && y(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function jl(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function Dr(e, t, n) {
  const o = P(t), s = n.propsOptions[0], r = Object.keys(e).map((i) => Oe(i));
  for (const i in s) {
    let l = s[i];
    l != null && Hl(
      i,
      o[i],
      l,
      process.env.NODE_ENV !== "production" ? Re(o) : o,
      !r.includes(i)
    );
  }
}
function Hl(e, t, n, o, s) {
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
        const { valid: O, expectedType: A } = Ul(t, p[g]);
        a.push(A || ""), d = O;
      }
      if (!d) {
        y(Bl(e, t, a));
        return;
      }
    }
    l && !l(t, o) && y('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const Ll = /* @__PURE__ */ Ge(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function Ul(e, t) {
  let n;
  const o = jl(t);
  if (o === "null")
    n = e === null;
  else if (Ll(o)) {
    const s = typeof e;
    n = s === o.toLowerCase(), !n && s === "object" && (n = e instanceof t);
  } else o === "Object" ? n = K(e) : o === "Array" ? n = C(e) : n = e instanceof t;
  return {
    valid: n,
    expectedType: o
  };
}
function Bl(e, t, n) {
  if (n.length === 0)
    return `Prop type [] for prop "${e}" won't match anything. Did you mean to use type Array instead?`;
  let o = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(Sn).join(" | ")}`;
  const s = n[0], r = Eo(t), i = ss(t, s), l = ss(t, r);
  return n.length === 1 && rs(s) && !kl(s, r) && (o += ` with value ${i}`), o += `, got ${r} `, rs(r) && (o += `with value ${l}.`), o;
}
function ss(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function rs(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function kl(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const Po = (e) => e === "_" || e === "_ctx" || e === "$stable", Mo = (e) => C(e) ? e.map(Ne) : [Ne(e)], Kl = (e, t, n) => {
  if (t._n)
    return t;
  const o = il((...s) => (process.env.NODE_ENV !== "production" && te && !(n === null && he) && !(n && n.root !== te.root) && y(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), Mo(t(...s))), n);
  return o._c = !1, o;
}, wr = (e, t, n) => {
  const o = e._ctx;
  for (const s in e) {
    if (Po(s)) continue;
    const r = e[s];
    if ($(r))
      t[s] = Kl(s, r, o);
    else if (r != null) {
      process.env.NODE_ENV !== "production" && y(
        `Non-function value encountered for slot "${s}". Prefer function slots for better performance.`
      );
      const i = Mo(r);
      t[s] = () => i;
    }
  }
}, Vr = (e, t) => {
  process.env.NODE_ENV !== "production" && !Ao(e.vnode) && y(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = Mo(t);
  e.slots.default = () => n;
}, ao = (e, t, n) => {
  for (const o in t)
    (n || !Po(o)) && (e[o] = t[o]);
}, Wl = (e, t, n) => {
  const o = e.slots = Nr();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (ao(o, t, n), n && dn(o, "_", s, !0)) : wr(t, o);
  } else t && Vr(e, t);
}, Gl = (e, t, n) => {
  const { vnode: o, slots: s } = e;
  let r = !0, i = k;
  if (o.shapeFlag & 32) {
    const l = t._;
    l ? process.env.NODE_ENV !== "production" && Fe ? (ao(s, t, n), Me(e, "set", "$slots")) : n && l === 1 ? r = !1 : ao(s, t, n) : (r = !t.$stable, wr(t, s)), i = t;
  } else t && (Vr(e, t), i = { default: 1 });
  if (r)
    for (const l in s)
      !Po(l) && i[l] == null && delete s[l];
};
let Ct, ke;
function mt(e, t) {
  e.appContext.config.performance && yn() && ke.mark(`vue-${t}-${e.uid}`), process.env.NODE_ENV !== "production" && ol(e, t, yn() ? ke.now() : Date.now());
}
function _t(e, t) {
  if (e.appContext.config.performance && yn()) {
    const n = `vue-${t}-${e.uid}`, o = n + ":end", s = `<${Hn(e, e.type)}> ${t}`;
    ke.mark(o), ke.measure(s, n, o), ke.clearMeasures(s), ke.clearMarks(n), ke.clearMarks(o);
  }
  process.env.NODE_ENV !== "production" && sl(e, t, yn() ? ke.now() : Date.now());
}
function yn() {
  return Ct !== void 0 || (typeof window < "u" && window.performance ? (Ct = !0, ke = window.performance) : Ct = !1), Ct;
}
function ql() {
  const e = [];
  if (process.env.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(
      `Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const de = cc;
function Jl(e) {
  return zl(e);
}
function zl(e, t) {
  ql();
  const n = qt();
  n.__VUE__ = !0, process.env.NODE_ENV !== "production" && To(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
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
    setScopeId: O = X,
    insertStaticContent: A
  } = e, V = (c, u, h, v = null, m = null, _ = null, x = void 0, N = null, b = process.env.NODE_ENV !== "production" && Fe ? !1 : !!u.dynamicChildren) => {
    if (c === u)
      return;
    c && !$t(c, u) && (v = en(c), Ye(c, m, _, !0), c = null), u.patchFlag === -2 && (b = !1, u.dynamicChildren = null);
    const { type: E, ref: T, shapeFlag: D } = u;
    switch (E) {
      case Xt:
        Z(c, u, h, v);
        break;
      case me:
        G(c, u, h, v);
        break;
      case fn:
        c == null ? L(u, h, v, x) : process.env.NODE_ENV !== "production" && H(c, u, h, x);
        break;
      case ve:
        Qt(
          c,
          u,
          h,
          v,
          m,
          _,
          x,
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
          x,
          N,
          b
        ) : D & 6 ? Lo(
          c,
          u,
          h,
          v,
          m,
          _,
          x,
          N,
          b
        ) : D & 64 || D & 128 ? E.process(
          c,
          u,
          h,
          v,
          m,
          _,
          x,
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
  }, Q = (c, u, h, v, m, _, x, N, b) => {
    u.type === "svg" ? x = "svg" : u.type === "math" && (x = "mathml"), c == null ? _e(
      u,
      h,
      v,
      m,
      _,
      x,
      N,
      b
    ) : Le(
      c,
      u,
      m,
      _,
      x,
      N,
      b
    );
  }, _e = (c, u, h, v, m, _, x, N) => {
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
      Zn(c, _),
      x,
      N
    ), I && rt(c, null, v, "created"), ne(b, c, c.scopeId, x, v), T) {
      for (const W in T)
        W !== "value" && !Pt(W) && r(b, W, null, T[W], _, v);
      "value" in T && r(b, "value", null, T.value, _), (E = T.onVnodeBeforeMount) && Ie(E, v, c);
    }
    process.env.NODE_ENV !== "production" && (dn(b, "__vnode", c, !0), dn(b, "__vueParentComponent", v, !0)), I && rt(c, null, v, "beforeMount");
    const F = Yl(m, w);
    F && w.beforeEnter(b), o(b, u, h), ((E = T && T.onVnodeMounted) || F || I) && de(() => {
      E && Ie(E, v, c), F && w.enter(b), I && rt(c, null, v, "mounted");
    }, m);
  }, ne = (c, u, h, v, m) => {
    if (h && O(c, h), v)
      for (let _ = 0; _ < v.length; _++)
        O(c, v[_]);
    if (m) {
      let _ = m.subTree;
      if (process.env.NODE_ENV !== "production" && _.patchFlag > 0 && _.patchFlag & 2048 && (_ = Ro(_.children) || _), u === _ || Ir(_.type) && (_.ssContent === u || _.ssFallback === u)) {
        const x = m.vnode;
        ne(
          c,
          x,
          x.scopeId,
          x.slotScopeIds,
          m.parent
        );
      }
    }
  }, le = (c, u, h, v, m, _, x, N, b = 0) => {
    for (let E = b; E < c.length; E++) {
      const T = c[E] = N ? Ze(c[E]) : Ne(c[E]);
      V(
        null,
        T,
        u,
        h,
        v,
        m,
        _,
        x,
        N
      );
    }
  }, Le = (c, u, h, v, m, _, x) => {
    const N = u.el = c.el;
    process.env.NODE_ENV !== "production" && (N.__vnode = u);
    let { patchFlag: b, dynamicChildren: E, dirs: T } = u;
    b |= c.patchFlag & 16;
    const D = c.props || k, w = u.props || k;
    let I;
    if (h && it(h, !1), (I = w.onVnodeBeforeUpdate) && Ie(I, h, u, c), T && rt(u, c, h, "beforeUpdate"), h && it(h, !0), process.env.NODE_ENV !== "production" && Fe && (b = 0, x = !1, E = null), (D.innerHTML && w.innerHTML == null || D.textContent && w.textContent == null) && p(N, ""), E ? (Je(
      c.dynamicChildren,
      E,
      N,
      h,
      v,
      Zn(u, m),
      _
    ), process.env.NODE_ENV !== "production" && cn(c, u)) : x || Te(
      c,
      u,
      N,
      null,
      h,
      v,
      Zn(u, m),
      _,
      !1
    ), b > 0) {
      if (b & 16)
        be(N, D, w, h, m);
      else if (b & 2 && D.class !== w.class && r(N, "class", null, w.class, m), b & 4 && r(N, "style", D.style, w.style, m), b & 8) {
        const F = u.dynamicProps;
        for (let W = 0; W < F.length; W++) {
          const B = F[W], fe = D[B], ue = w[B];
          (ue !== fe || B === "value") && r(N, B, fe, ue, m, h);
        }
      }
      b & 1 && c.children !== u.children && p(N, u.children);
    } else !x && E == null && be(N, D, w, h, m);
    ((I = w.onVnodeUpdated) || T) && de(() => {
      I && Ie(I, h, u, c), T && rt(u, c, h, "updated");
    }, v);
  }, Je = (c, u, h, v, m, _, x) => {
    for (let N = 0; N < u.length; N++) {
      const b = c[N], E = u[N], T = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        b.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (b.type === ve || // - In the case of different nodes, there is going to be a replacement
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
        x,
        !0
      );
    }
  }, be = (c, u, h, v, m) => {
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
        const x = h[_], N = u[_];
        x !== N && _ !== "value" && r(c, _, N, x, m, v);
      }
      "value" in h && r(c, "value", u.value, h.value, m);
    }
  }, Qt = (c, u, h, v, m, _, x, N, b) => {
    const E = u.el = c ? c.el : l(""), T = u.anchor = c ? c.anchor : l("");
    let { patchFlag: D, dynamicChildren: w, slotScopeIds: I } = u;
    process.env.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (Fe || D & 2048) && (D = 0, b = !1, w = null), I && (N = N ? N.concat(I) : I), c == null ? (o(E, h, v), o(T, h, v), le(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      u.children || [],
      h,
      T,
      m,
      _,
      x,
      N,
      b
    )) : D > 0 && D & 64 && w && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren ? (Je(
      c.dynamicChildren,
      w,
      h,
      m,
      _,
      x,
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
    )) : Te(
      c,
      u,
      h,
      T,
      m,
      _,
      x,
      N,
      b
    );
  }, Lo = (c, u, h, v, m, _, x, N, b) => {
    u.slotScopeIds = N, c == null ? u.shapeFlag & 512 ? m.ctx.activate(
      u,
      h,
      v,
      x,
      b
    ) : ze(
      u,
      h,
      v,
      m,
      _,
      x,
      b
    ) : ce(c, u, b);
  }, ze = (c, u, h, v, m, _, x) => {
    const N = c.component = _c(
      c,
      v,
      m
    );
    if (process.env.NODE_ENV !== "production" && N.type.__hmrId && Ji(N), process.env.NODE_ENV !== "production" && (sn(c), mt(N, "mount")), Ao(c) && (N.ctx.renderer = wt), process.env.NODE_ENV !== "production" && mt(N, "init"), Ec(N, !1, x), process.env.NODE_ENV !== "production" && _t(N, "init"), process.env.NODE_ENV !== "production" && Fe && (c.el = null), N.asyncDep) {
      if (m && m.registerDep(N, R, x), !c.el) {
        const b = N.subTree = Ee(me);
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
        x
      );
    process.env.NODE_ENV !== "production" && (rn(), _t(N, "mount"));
  }, ce = (c, u, h) => {
    const v = u.component = c.component;
    if (ic(c, u, h))
      if (v.asyncDep && !v.asyncResolved) {
        process.env.NODE_ENV !== "production" && sn(u), M(v, u, h), process.env.NODE_ENV !== "production" && rn();
        return;
      } else
        v.next = u, v.update();
    else
      u.el = c.el, v.vnode = u;
  }, R = (c, u, h, v, m, _, x) => {
    const N = () => {
      if (c.isMounted) {
        let { next: D, bu: w, u: I, parent: F, vnode: W } = c;
        {
          const $e = Sr(c);
          if ($e) {
            D && (D.el = W.el, M(c, D, x)), $e.asyncDep.then(() => {
              c.isUnmounted || N();
            });
            return;
          }
        }
        let B = D, fe;
        process.env.NODE_ENV !== "production" && sn(D || c.vnode), it(c, !1), D ? (D.el = W.el, M(c, D, x)) : D = W, w && St(w), (fe = D.props && D.props.onVnodeBeforeUpdate) && Ie(fe, F, D, W), it(c, !0), process.env.NODE_ENV !== "production" && mt(c, "render");
        const ue = ls(c);
        process.env.NODE_ENV !== "production" && _t(c, "render");
        const Ce = c.subTree;
        c.subTree = ue, process.env.NODE_ENV !== "production" && mt(c, "patch"), V(
          Ce,
          ue,
          // parent may have changed if it's in a teleport
          a(Ce.el),
          // anchor may have changed if it's in a fragment
          en(Ce),
          c,
          m,
          _
        ), process.env.NODE_ENV !== "production" && _t(c, "patch"), D.el = ue.el, B === null && lc(c, ue.el), I && de(I, m), (fe = D.props && D.props.onVnodeUpdated) && de(
          () => Ie(fe, F, D, W),
          m
        ), process.env.NODE_ENV !== "production" && lr(c), process.env.NODE_ENV !== "production" && rn();
      } else {
        let D;
        const { el: w, props: I } = u, { bm: F, m: W, parent: B, root: fe, type: ue } = c, Ce = jt(u);
        it(c, !1), F && St(F), !Ce && (D = I && I.onVnodeBeforeMount) && Ie(D, B, u), it(c, !0);
        {
          fe.ce && // @ts-expect-error _def is private
          fe.ce._def.shadowRoot !== !1 && fe.ce._injectChildStyle(ue), process.env.NODE_ENV !== "production" && mt(c, "render");
          const $e = c.subTree = ls(c);
          process.env.NODE_ENV !== "production" && _t(c, "render"), process.env.NODE_ENV !== "production" && mt(c, "patch"), V(
            null,
            $e,
            h,
            v,
            c,
            m,
            _
          ), process.env.NODE_ENV !== "production" && _t(c, "patch"), u.el = $e.el;
        }
        if (W && de(W, m), !Ce && (D = I && I.onVnodeMounted)) {
          const $e = u;
          de(
            () => Ie(D, B, $e),
            m
          );
        }
        (u.shapeFlag & 256 || B && jt(B.vnode) && B.vnode.shapeFlag & 256) && c.a && de(c.a, m), c.isMounted = !0, process.env.NODE_ENV !== "production" && el(c), u = h = v = null;
      }
    };
    c.scope.on();
    const b = c.effect = new Ms(N);
    c.scope.off();
    const E = c.update = b.run.bind(b), T = c.job = b.runIfDirty.bind(b);
    T.i = c, T.id = c.uid, b.scheduler = () => Mn(T), it(c, !0), process.env.NODE_ENV !== "production" && (b.onTrack = c.rtc ? (D) => St(c.rtc, D) : void 0, b.onTrigger = c.rtg ? (D) => St(c.rtg, D) : void 0), E();
  }, M = (c, u, h) => {
    u.component = c;
    const v = c.vnode.props;
    c.vnode = u, c.next = null, Rl(c, u.props, v, h), Gl(c, u.children, h), Ve(), zo(c), Se();
  }, Te = (c, u, h, v, m, _, x, N, b = !1) => {
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
          x,
          N,
          b
        );
        return;
      } else if (w & 256) {
        Bn(
          E,
          D,
          h,
          v,
          m,
          _,
          x,
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
      x,
      N,
      b
    ) : Dt(E, m, _, !0) : (T & 8 && p(h, ""), I & 16 && le(
      D,
      h,
      v,
      m,
      _,
      x,
      N,
      b
    ));
  }, Bn = (c, u, h, v, m, _, x, N, b) => {
    c = c || Et, u = u || Et;
    const E = c.length, T = u.length, D = Math.min(E, T);
    let w;
    for (w = 0; w < D; w++) {
      const I = u[w] = b ? Ze(u[w]) : Ne(u[w]);
      V(
        c[w],
        I,
        h,
        null,
        m,
        _,
        x,
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
      x,
      N,
      b,
      D
    );
  }, xt = (c, u, h, v, m, _, x, N, b) => {
    let E = 0;
    const T = u.length;
    let D = c.length - 1, w = T - 1;
    for (; E <= D && E <= w; ) {
      const I = c[E], F = u[E] = b ? Ze(u[E]) : Ne(u[E]);
      if ($t(I, F))
        V(
          I,
          F,
          h,
          null,
          m,
          _,
          x,
          N,
          b
        );
      else
        break;
      E++;
    }
    for (; E <= D && E <= w; ) {
      const I = c[D], F = u[w] = b ? Ze(u[w]) : Ne(u[w]);
      if ($t(I, F))
        V(
          I,
          F,
          h,
          null,
          m,
          _,
          x,
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
            u[E] = b ? Ze(u[E]) : Ne(u[E]),
            h,
            F,
            m,
            _,
            x,
            N,
            b
          ), E++;
      }
    } else if (E > w)
      for (; E <= D; )
        Ye(c[E], m, _, !0), E++;
    else {
      const I = E, F = E, W = /* @__PURE__ */ new Map();
      for (E = F; E <= w; E++) {
        const oe = u[E] = b ? Ze(u[E]) : Ne(u[E]);
        oe.key != null && (process.env.NODE_ENV !== "production" && W.has(oe.key) && y(
          "Duplicate keys found during update:",
          JSON.stringify(oe.key),
          "Make sure keys are unique."
        ), W.set(oe.key, E));
      }
      let B, fe = 0;
      const ue = w - F + 1;
      let Ce = !1, $e = 0;
      const Vt = new Array(ue);
      for (E = 0; E < ue; E++) Vt[E] = 0;
      for (E = I; E <= D; E++) {
        const oe = c[E];
        if (fe >= ue) {
          Ye(oe, m, _, !0);
          continue;
        }
        let Ae;
        if (oe.key != null)
          Ae = W.get(oe.key);
        else
          for (B = F; B <= w; B++)
            if (Vt[B - F] === 0 && $t(oe, u[B])) {
              Ae = B;
              break;
            }
        Ae === void 0 ? Ye(oe, m, _, !0) : (Vt[Ae - F] = E + 1, Ae >= $e ? $e = Ae : Ce = !0, V(
          oe,
          u[Ae],
          h,
          null,
          m,
          _,
          x,
          N,
          b
        ), fe++);
      }
      const Bo = Ce ? Xl(Vt) : Et;
      for (B = Bo.length - 1, E = ue - 1; E >= 0; E--) {
        const oe = F + E, Ae = u[oe], ko = u[oe + 1], Ko = oe + 1 < T ? (
          // #13559, fallback to el placeholder for unresolved async component
          ko.el || ko.placeholder
        ) : v;
        Vt[E] === 0 ? V(
          null,
          Ae,
          h,
          Ko,
          m,
          _,
          x,
          N,
          b
        ) : Ce && (B < 0 || E !== Bo[B] ? ht(Ae, h, Ko, 2) : B--);
      }
    }
  }, ht = (c, u, h, v, m = null) => {
    const { el: _, type: x, transition: N, children: b, shapeFlag: E } = c;
    if (E & 6) {
      ht(c.component.subTree, u, h, v);
      return;
    }
    if (E & 128) {
      c.suspense.move(u, h, v);
      return;
    }
    if (E & 64) {
      x.move(c, u, h, wt);
      return;
    }
    if (x === ve) {
      o(_, u, h);
      for (let D = 0; D < b.length; D++)
        ht(b[D], u, h, v);
      o(c.anchor, u, h);
      return;
    }
    if (x === fn) {
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
          _._isLeaving && _[fl](
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
  }, Ye = (c, u, h, v = !1, m = !1) => {
    const {
      type: _,
      props: x,
      ref: N,
      children: b,
      dynamicChildren: E,
      shapeFlag: T,
      patchFlag: D,
      dirs: w,
      cacheIndex: I
    } = c;
    if (D === -2 && (m = !1), N != null && (Ve(), Ft(N, null, h, c, !0), Se()), I != null && (u.renderCache[I] = void 0), T & 256) {
      u.ctx.deactivate(c);
      return;
    }
    const F = T & 1 && w, W = !jt(c);
    let B;
    if (W && (B = x && x.onVnodeBeforeUnmount) && Ie(B, u, c), T & 6)
      Jr(c.component, h, v);
    else {
      if (T & 128) {
        c.suspense.unmount(h, v);
        return;
      }
      F && rt(c, null, u, "beforeUnmount"), T & 64 ? c.type.remove(
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
      (_ !== ve || D > 0 && D & 64) ? Dt(
        E,
        u,
        h,
        !1,
        !0
      ) : (_ === ve && D & 384 || !m && T & 16) && Dt(b, u, h), v && kn(c);
    }
    (W && (B = x && x.onVnodeUnmounted) || F) && de(() => {
      B && Ie(B, u, c), F && rt(c, null, u, "unmounted");
    }, h);
  }, kn = (c) => {
    const { type: u, el: h, anchor: v, transition: m } = c;
    if (u === ve) {
      process.env.NODE_ENV !== "production" && c.patchFlag > 0 && c.patchFlag & 2048 && m && !m.persisted ? c.children.forEach((x) => {
        x.type === me ? s(x.el) : kn(x);
      }) : qr(h, v);
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
      const { leave: x, delayLeave: N } = m, b = () => x(h, _);
      N ? N(c.el, _, b) : b();
    } else
      _();
  }, qr = (c, u) => {
    let h;
    for (; c !== u; )
      h = g(c), s(c), c = h;
    s(u);
  }, Jr = (c, u, h) => {
    process.env.NODE_ENV !== "production" && c.type.__hmrId && zi(c);
    const { bum: v, scope: m, job: _, subTree: x, um: N, m: b, a: E } = c;
    is(b), is(E), v && St(v), m.stop(), _ && (_.flags |= 8, Ye(x, c, u, h)), N && de(N, u), de(() => {
      c.isUnmounted = !0;
    }, u), process.env.NODE_ENV !== "production" && nl(c);
  }, Dt = (c, u, h, v = !1, m = !1, _ = 0) => {
    for (let x = _; x < c.length; x++)
      Ye(c[x], u, h, v, m);
  }, en = (c) => {
    if (c.shapeFlag & 6)
      return en(c.component.subTree);
    if (c.shapeFlag & 128)
      return c.suspense.next();
    const u = g(c.anchor || c.el), h = u && u[ll];
    return h ? g(h) : u;
  };
  let Kn = !1;
  const Uo = (c, u, h) => {
    c == null ? u._vnode && Ye(u._vnode, null, null, !0) : V(
      u._vnode || null,
      c,
      u,
      null,
      null,
      null,
      h
    ), u._vnode = c, Kn || (Kn = !0, zo(), sr(), Kn = !1);
  }, wt = {
    p: V,
    um: Ye,
    m: ht,
    r: kn,
    mt: ze,
    mc: le,
    pc: Te,
    pbc: Je,
    n: en,
    o: e
  };
  return {
    render: Uo,
    hydrate: void 0,
    createApp: Al(Uo)
  };
}
function Zn({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function it({ effect: e, job: t }, n) {
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
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = s[r] = Ze(s[r]), l.el = i.el), !n && l.patchFlag !== -2 && cn(i, l)), l.type === Xt && // avoid cached text nodes retaining detached dom nodes
      l.patchFlag !== -1 && (l.el = i.el), l.type === me && !l.el && (l.el = i.el), process.env.NODE_ENV !== "production" && l.el && (l.el.__vnode = l);
    }
}
function Xl(e) {
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
function Sr(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Sr(t);
}
function is(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const Zl = Symbol.for("v-scx"), Ql = () => {
  {
    const e = Ht(Zl);
    return e || process.env.NODE_ENV !== "production" && y(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function yt(e, t, n) {
  return process.env.NODE_ENV !== "production" && !$(t) && y(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), Tr(e, t, n);
}
function Tr(e, t, n = k) {
  const { immediate: o, deep: s, flush: r, once: i } = n;
  process.env.NODE_ENV !== "production" && !t && (o !== void 0 && y(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), s !== void 0 && y(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), i !== void 0 && y(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const l = z({}, n);
  process.env.NODE_ENV !== "production" && (l.onWarn = y);
  const f = t && o || !t && r !== "post";
  let d;
  if (Wt) {
    if (r === "sync") {
      const O = Ql();
      d = O.__watcherHandles || (O.__watcherHandles = []);
    } else if (!f) {
      const O = () => {
      };
      return O.stop = X, O.resume = X, O.pause = X, O;
    }
  }
  const p = te;
  l.call = (O, A, V) => He(O, p, A, V);
  let a = !1;
  r === "post" ? l.scheduler = (O) => {
    de(O, p && p.suspense);
  } : r !== "sync" && (a = !0, l.scheduler = (O, A) => {
    A ? O() : Mn(O);
  }), l.augmentJob = (O) => {
    t && (O.flags |= 4), a && (O.flags |= 2, p && (O.id = p.uid, O.i = p));
  };
  const g = Li(e, t, l);
  return Wt && (d ? d.push(g) : f && g()), g;
}
function ec(e, t, n) {
  const o = this.proxy, s = q(e) ? e.includes(".") ? Cr(o, e) : () => o[e] : e.bind(o, o);
  let r;
  $(t) ? r = t : (r = t.handler, n = t);
  const i = Zt(this), l = Tr(s, r.bind(o), n);
  return i(), l;
}
function Cr(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let s = 0; s < n.length && o; s++)
      o = o[n[s]];
    return o;
  };
}
const tc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Oe(t)}Modifiers`] || e[`${nt(t)}Modifiers`];
function nc(e, t, ...n) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || k;
  if (process.env.NODE_ENV !== "production") {
    const {
      emitsOptions: p,
      propsOptions: [a]
    } = e;
    if (p)
      if (!(t in p))
        (!a || !(lt(Oe(t)) in a)) && y(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${lt(Oe(t))}" prop.`
        );
      else {
        const g = p[t];
        $(g) && (g(...n) || y(
          `Invalid event arguments: event validation failed for event "${t}".`
        ));
      }
  }
  let s = n;
  const r = t.startsWith("update:"), i = r && tc(o, t.slice(7));
  if (i && (i.trim && (s = n.map((p) => q(p) ? p.trim() : p)), i.number && (s = n.map(Qr))), process.env.NODE_ENV !== "production" && rl(e, t, s), process.env.NODE_ENV !== "production") {
    const p = t.toLowerCase();
    p !== t && o[lt(p)] && y(
      `Event "${p}" is emitted in component ${Hn(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${nt(
        t
      )}" instead of "${t}".`
    );
  }
  let l, f = o[l = lt(t)] || // also try camelCase event handler (#2249)
  o[l = lt(Oe(t))];
  !f && r && (f = o[l = lt(nt(t))]), f && He(
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
    e.emitted[l] = !0, He(
      d,
      e,
      6,
      s
    );
  }
}
const oc = /* @__PURE__ */ new WeakMap();
function $r(e, t, n = !1) {
  const o = n ? oc : t.emitsCache, s = o.get(e);
  if (s !== void 0)
    return s;
  const r = e.emits;
  let i = {}, l = !1;
  if (!$(e)) {
    const f = (d) => {
      const p = $r(d, t, !0);
      p && (l = !0, z(i, p));
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  return !r && !l ? (K(e) && o.set(e, null), null) : (C(r) ? r.forEach((f) => i[f] = null) : z(i, r), K(e) && o.set(e, i), i);
}
function Fn(e, t) {
  return !e || !Gt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), j(e, t[0].toLowerCase() + t.slice(1)) || j(e, nt(t)) || j(e, t));
}
let po = !1;
function On() {
  po = !0;
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
    setupState: O,
    ctx: A,
    inheritAttrs: V
  } = e, Z = En(e);
  let G, L;
  process.env.NODE_ENV !== "production" && (po = !1);
  try {
    if (n.shapeFlag & 4) {
      const S = s || o, Q = process.env.NODE_ENV !== "production" && O.__isScriptSetup ? new Proxy(S, {
        get(_e, ne, le) {
          return y(
            `Property '${String(
              ne
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(_e, ne, le);
        }
      }) : S;
      G = Ne(
        d.call(
          Q,
          S,
          p,
          process.env.NODE_ENV !== "production" ? Re(a) : a,
          O,
          g,
          A
        )
      ), L = l;
    } else {
      const S = t;
      process.env.NODE_ENV !== "production" && l === a && On(), G = Ne(
        S.length > 1 ? S(
          process.env.NODE_ENV !== "production" ? Re(a) : a,
          process.env.NODE_ENV !== "production" ? {
            get attrs() {
              return On(), Re(l);
            },
            slots: i,
            emit: f
          } : { attrs: l, slots: i, emit: f }
        ) : S(
          process.env.NODE_ENV !== "production" ? Re(a) : a,
          null
        )
      ), L = t.props ? l : sc(l);
    }
  } catch (S) {
    Lt.length = 0, Jt(S, e, 1), G = Ee(me);
  }
  let H = G, pe;
  if (process.env.NODE_ENV !== "production" && G.patchFlag > 0 && G.patchFlag & 2048 && ([H, pe] = Ar(G)), L && V !== !1) {
    const S = Object.keys(L), { shapeFlag: Q } = H;
    if (S.length) {
      if (Q & 7)
        r && S.some(pn) && (L = rc(
          L,
          r
        )), H = ot(H, L, !1, !0);
      else if (process.env.NODE_ENV !== "production" && !po && H.type !== me) {
        const _e = Object.keys(l), ne = [], le = [];
        for (let Le = 0, Je = _e.length; Le < Je; Le++) {
          const be = _e[Le];
          Gt(be) ? pn(be) || ne.push(be[2].toLowerCase() + be.slice(3)) : le.push(be);
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
  ), H = ot(H, null, !1, !0), H.dirs = H.dirs ? H.dirs.concat(n.dirs) : n.dirs), n.transition && (process.env.NODE_ENV !== "production" && !cs(H) && y(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), $o(H, n.transition)), process.env.NODE_ENV !== "production" && pe ? pe(H) : G = H, En(Z), G;
}
const Ar = (e) => {
  const t = e.children, n = e.dynamicChildren, o = Ro(t, !1);
  if (o) {
    if (process.env.NODE_ENV !== "production" && o.patchFlag > 0 && o.patchFlag & 2048)
      return Ar(o);
  } else return [e, void 0];
  const s = t.indexOf(o), r = n ? n.indexOf(o) : -1, i = (l) => {
    t[s] = l, n && (r > -1 ? n[r] = l : l.patchFlag > 0 && (e.dynamicChildren = [...n, l]));
  };
  return [Ne(o), i];
};
function Ro(e, t = !0) {
  let n;
  for (let o = 0; o < e.length; o++) {
    const s = e[o];
    if (jn(s)) {
      if (s.type !== me || s.children === "v-if") {
        if (n)
          return;
        if (n = s, process.env.NODE_ENV !== "production" && t && n.patchFlag > 0 && n.patchFlag & 2048)
          return Ro(n.children);
      }
    } else
      return;
  }
  return n;
}
const sc = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Gt(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, rc = (e, t) => {
  const n = {};
  for (const o in e)
    (!pn(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
}, cs = (e) => e.shapeFlag & 7 || e.type === me;
function ic(e, t, n) {
  const { props: o, children: s, component: r } = e, { props: i, children: l, patchFlag: f } = t, d = r.emitsOptions;
  if (process.env.NODE_ENV !== "production" && (s || l) && Fe || t.dirs || t.transition)
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
        if (i[g] !== o[g] && !Fn(d, g))
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
    if (t[r] !== e[r] && !Fn(n, r))
      return !0;
  }
  return !1;
}
function lc({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.el = e.el), o === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const Ir = (e) => e.__isSuspense;
function cc(e, t) {
  t && t.pendingBranch ? C(e) ? t.effects.push(...e) : t.effects.push(e) : or(e);
}
const ve = Symbol.for("v-fgt"), Xt = Symbol.for("v-txt"), me = Symbol.for("v-cmt"), fn = Symbol.for("v-stc"), Lt = [];
let ge = null;
function De(e = !1) {
  Lt.push(ge = e ? null : []);
}
function fc() {
  Lt.pop(), ge = Lt[Lt.length - 1] || null;
}
let Kt = 1;
function us(e, t = !1) {
  Kt += e, e < 0 && ge && t && (ge.hasOnce = !0);
}
function Pr(e) {
  return e.dynamicChildren = Kt > 0 ? ge || Et : null, fc(), Kt > 0 && ge && ge.push(e), e;
}
function Ke(e, t, n, o, s, r) {
  return Pr(
    Fr(
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
function Mr(e, t, n, o, s) {
  return Pr(
    Ee(
      e,
      t,
      n,
      o,
      s,
      !0
    )
  );
}
function jn(e) {
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
const uc = (...e) => jr(
  ...e
), Rr = ({ key: e }) => e ?? null, un = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? q(e) || J(e) || $(e) ? { i: he, r: e, k: t, f: !!n } : e : null);
function Fr(e, t = null, n = null, o = 0, s = null, r = e === ve ? 0 : 1, i = !1, l = !1) {
  const f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Rr(t),
    ref: t && un(t),
    scopeId: fr,
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
const Ee = process.env.NODE_ENV !== "production" ? uc : jr;
function jr(e, t = null, n = null, o = 0, s = null, r = !1) {
  if ((!e || e === Nl) && (process.env.NODE_ENV !== "production" && !e && y(`Invalid vnode type when creating vnode: ${e}.`), e = me), jn(e)) {
    const l = ot(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Fo(l, n), Kt > 0 && !r && ge && (l.shapeFlag & 6 ? ge[ge.indexOf(e)] = l : ge.push(l)), l.patchFlag = -2, l;
  }
  if (Kr(e) && (e = e.__vccOpts), t) {
    t = ac(t);
    let { class: l, style: f } = t;
    l && !q(l) && (t.class = Cn(l)), K(f) && (hn(f) && !C(f) && (f = z({}, f)), t.style = Tn(f));
  }
  const i = q(e) ? 1 : Ir(e) ? 128 : cl(e) ? 64 : K(e) ? 4 : $(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && hn(e) && (e = P(e), y(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), Fr(
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
  return e ? hn(e) || yr(e) ? z({}, e) : e : null;
}
function ot(e, t, n = !1, o = !1) {
  const { props: s, ref: r, patchFlag: i, children: l, transition: f } = e, d = t ? hc(s || {}, t) : s, p = {
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
    children: process.env.NODE_ENV !== "production" && i === -1 && C(l) ? l.map(Hr) : l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== ve ? i === -1 ? 16 : i | 16 : i,
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
    ssContent: e.ssContent && ot(e.ssContent),
    ssFallback: e.ssFallback && ot(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return f && o && $o(
    p,
    f.clone(p)
  ), p;
}
function Hr(e) {
  const t = ot(e);
  return C(e.children) && (t.children = e.children.map(Hr)), t;
}
function pc(e = " ", t = 0) {
  return Ee(Xt, null, e, t);
}
function dc(e = "", t = !1) {
  return t ? (De(), Mr(me, null, e)) : Ee(me, null, e);
}
function Ne(e) {
  return e == null || typeof e == "boolean" ? Ee(me) : C(e) ? Ee(
    ve,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : jn(e) ? Ze(e) : Ee(Xt, null, String(e));
}
function Ze(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : ot(e);
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
      !s && !yr(t) ? t._ctx = he : s === 3 && he && (he.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else $(t) ? (t = { default: t, _ctx: he }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [pc(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function hc(...e) {
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
function Ie(e, t, n, o = null) {
  He(e, t, 7, [
    n,
    o
  ]);
}
const gc = Er();
let mc = 0;
function _c(e, t, n) {
  const o = e.type, s = (t ? t.appContext : e.appContext) || gc, r = {
    uid: mc++,
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
    scope: new pi(
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
    propsOptions: xr(o, s),
    emitsOptions: $r(o, s),
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
  return process.env.NODE_ENV !== "production" ? r.ctx = yl(r) : r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = nc.bind(null, r), e.ce && e.ce(r), r;
}
let te = null;
const Lr = () => te || he;
let xn, ho;
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
  ), ho = t(
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
}, vc = /* @__PURE__ */ Ge("slot,component");
function go(e, { isNativeTag: t }) {
  (vc(e) || t(e)) && y(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function Ur(e) {
  return e.vnode.shapeFlag & 4;
}
let Wt = !1;
function Ec(e, t = !1, n = !1) {
  t && ho(t);
  const { props: o, children: s } = e.vnode, r = Ur(e);
  Pl(e, o, r, t), Wl(e, s, n || t);
  const i = r ? bc(e, t) : void 0;
  return t && ho(!1), i;
}
function bc(e, t) {
  var n;
  const o = e.type;
  if (process.env.NODE_ENV !== "production") {
    if (o.name && go(o.name, e.appContext.config), o.components) {
      const r = Object.keys(o.components);
      for (let i = 0; i < r.length; i++)
        go(r[i], e.appContext.config);
    }
    if (o.directives) {
      const r = Object.keys(o.directives);
      for (let i = 0; i < r.length; i++)
        ur(r[i]);
    }
    o.compilerOptions && Nc() && y(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, mr), process.env.NODE_ENV !== "production" && Ol(e);
  const { setup: s } = o;
  if (s) {
    Ve();
    const r = e.setupContext = s.length > 1 ? Oc(e) : null, i = Zt(e), l = Ot(
      s,
      e,
      0,
      [
        process.env.NODE_ENV !== "production" ? Re(e.props) : e.props,
        r
      ]
    ), f = vo(l);
    if (Se(), i(), (f || e.sp) && !jt(e) && ar(e), f) {
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
    Br(e, t);
}
function ps(e, t, n) {
  $(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : K(t) ? (process.env.NODE_ENV !== "production" && jn(t) && y(
    "setup() should not return VNodes directly - return a render function instead."
  ), process.env.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = Zs(t), process.env.NODE_ENV !== "production" && xl(e)) : process.env.NODE_ENV !== "production" && t !== void 0 && y(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), Br(e, n);
}
const Nc = () => !0;
function Br(e, t, n) {
  const o = e.type;
  e.render || (e.render = o.render || X);
  {
    const s = Zt(e);
    Ve();
    try {
      wl(e);
    } finally {
      Se(), s();
    }
  }
  process.env.NODE_ENV !== "production" && !o.render && e.render === X && !t && (o.template ? y(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
  ) : y("Component is missing template or render function: ", o));
}
const ds = process.env.NODE_ENV !== "production" ? {
  get(e, t) {
    return On(), Y(e, "get", ""), e[t];
  },
  set() {
    return y("setupContext.attrs is readonly."), !1;
  },
  deleteProperty() {
    return y("setupContext.attrs is readonly."), !1;
  }
} : {
  get(e, t) {
    return Y(e, "get", ""), e[t];
  }
};
function yc(e) {
  return new Proxy(e.slots, {
    get(t, n) {
      return Y(e, "get", "$slots"), t[n];
    }
  });
}
function Oc(e) {
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
        return o || (o = yc(e));
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
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Zs(Ii(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in pt)
        return pt[n](e);
    },
    has(t, n) {
      return n in t || n in pt;
    }
  })) : e.proxy;
}
const xc = /(?:^|[-_])\w/g, Dc = (e) => e.replace(xc, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function kr(e, t = !0) {
  return $(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Hn(e, t, n = !1) {
  let o = kr(t);
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
  return o ? Dc(o) : n ? "App" : "Anonymous";
}
function Kr(e) {
  return $(e) && "__vccOpts" in e;
}
const Ho = (e, t) => {
  const n = ji(e, t, Wt);
  if (process.env.NODE_ENV !== "production") {
    const o = Lr();
    o && o.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function wc() {
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
        Ve();
        const g = a.value;
        return Se(), [
          "div",
          {},
          ["span", e, p(a)],
          "<",
          l(g),
          ">"
        ];
      } else {
        if (tt(a))
          return [
            "div",
            {},
            ["span", e, ie(a) ? "ShallowReactive" : "Reactive"],
            "<",
            l(a),
            `>${je(a) ? " (readonly)" : ""}`
          ];
        if (je(a))
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
    const O = f(a, "computed");
    O && g.push(i("computed", O));
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
    return g = z({}, g), Object.keys(g).length ? [
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
        ...Object.keys(g).map((O) => [
          "div",
          {},
          ["span", o, O + ": "],
          l(g[O], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function l(a, g = !0) {
    return typeof a == "number" ? ["span", t, a] : typeof a == "string" ? ["span", n, JSON.stringify(a)] : typeof a == "boolean" ? ["span", o, a] : K(a) ? ["object", { object: g ? P(a) : a }] : ["span", n, String(a)];
  }
  function f(a, g) {
    const O = a.type;
    if ($(O))
      return;
    const A = {};
    for (const V in a.ctx)
      d(O, V, g) && (A[V] = a.ctx[V]);
    return A;
  }
  function d(a, g, O) {
    const A = a[O];
    if (C(A) && A.includes(g) || K(A) && g in A || a.extends && d(a.extends, g, O) || a.mixins && a.mixins.some((V) => d(V, g, O)))
      return !0;
  }
  function p(a) {
    return ie(a) ? "ShallowRef" : a.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(s) : window.devtoolsFormatters = [s];
}
const hs = "3.5.22", We = process.env.NODE_ENV !== "production" ? y : X;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let mo;
const gs = typeof window < "u" && window.trustedTypes;
if (gs)
  try {
    mo = /* @__PURE__ */ gs.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch (e) {
    process.env.NODE_ENV !== "production" && We(`Error creating trusted types policy: ${e}`);
  }
const Wr = mo ? (e) => mo.createHTML(e) : (e) => e, Vc = "http://www.w3.org/2000/svg", Sc = "http://www.w3.org/1998/Math/MathML", Be = typeof document < "u" ? document : null, ms = Be && /* @__PURE__ */ Be.createElement("template"), Tc = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const s = t === "svg" ? Be.createElementNS(Vc, e) : t === "mathml" ? Be.createElementNS(Sc, e) : n ? Be.createElement(e, { is: n }) : Be.createElement(e);
    return e === "select" && o && o.multiple != null && s.setAttribute("multiple", o.multiple), s;
  },
  createText: (e) => Be.createTextNode(e),
  createComment: (e) => Be.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Be.querySelector(e),
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
      ms.innerHTML = Wr(
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
}, Cc = Symbol("_vtc");
function $c(e, t, n) {
  const o = e[Cc];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const _s = Symbol("_vod"), Ac = Symbol("_vsh"), Ic = Symbol(process.env.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : ""), Pc = /(?:^|;)\s*display\s*:/;
function Mc(e, t, n) {
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
      const i = o[Ic];
      i && (n += ";" + i), o.cssText = n, r = Pc.test(n);
    }
  } else t && e.removeAttribute("style");
  _s in e && (e[_s] = r ? o.display : "", e[Ac] && (o.display = "none"));
}
const Rc = /[^\\];\s*$/, vs = /\s*!important$/;
function an(e, t, n) {
  if (C(n))
    n.forEach((o) => an(e, t, o));
  else if (n == null && (n = ""), process.env.NODE_ENV !== "production" && Rc.test(n) && We(
    `Unexpected semicolon at the end of '${t}' style value: '${n}'`
  ), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = Fc(e, t);
    vs.test(n) ? e.setProperty(
      nt(o),
      n.replace(vs, ""),
      "important"
    ) : e[o] = n;
  }
}
const Es = ["Webkit", "Moz", "ms"], Qn = {};
function Fc(e, t) {
  const n = Qn[t];
  if (n)
    return n;
  let o = Oe(t);
  if (o !== "filter" && o in e)
    return Qn[t] = o;
  o = Sn(o);
  for (let s = 0; s < Es.length; s++) {
    const r = Es[s] + o;
    if (r in e)
      return Qn[t] = r;
  }
  return t;
}
const bs = "http://www.w3.org/1999/xlink";
function Ns(e, t, n, o, s, r = ai(t)) {
  o && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(bs, t.slice(6, t.length)) : e.setAttributeNS(bs, t, n) : n == null || r && !As(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : st(n) ? String(n) : n
  );
}
function ys(e, t, n, o, s) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Wr(n) : n);
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
    process.env.NODE_ENV !== "production" && !i && We(
      `Failed setting prop "${t}" on <${r.toLowerCase()}>: value ${n} is invalid.`,
      l
    );
  }
  i && e.removeAttribute(s || t);
}
function jc(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function Hc(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
const Os = Symbol("_vei");
function Lc(e, t, n, o, s = null) {
  const r = e[Os] || (e[Os] = {}), i = r[t];
  if (o && i)
    i.value = process.env.NODE_ENV !== "production" ? Ds(o, t) : o;
  else {
    const [l, f] = Uc(t);
    if (o) {
      const d = r[t] = Kc(
        process.env.NODE_ENV !== "production" ? Ds(o, t) : o,
        s
      );
      jc(e, l, d, f);
    } else i && (Hc(e, l, i, f), r[t] = void 0);
  }
}
const xs = /(?:Once|Passive|Capture)$/;
function Uc(e) {
  let t;
  if (xs.test(e)) {
    t = {};
    let o;
    for (; o = e.match(xs); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : nt(e.slice(2)), t];
}
let eo = 0;
const Bc = /* @__PURE__ */ Promise.resolve(), kc = () => eo || (Bc.then(() => eo = 0), eo = Date.now());
function Kc(e, t) {
  const n = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= n.attached)
      return;
    He(
      Wc(o, n.value),
      t,
      5,
      [o]
    );
  };
  return n.value = e, n.attached = kc(), n;
}
function Ds(e, t) {
  return $(e) || C(e) ? e : (We(
    `Wrong type passed as event handler to ${t} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof e}.`
  ), X);
}
function Wc(e, t) {
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
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Gc = (e, t, n, o, s, r) => {
  const i = s === "svg";
  t === "class" ? $c(e, o, i) : t === "style" ? Mc(e, n, o) : Gt(t) ? pn(t) || Lc(e, t, n, o, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : qc(e, t, o, i)) ? (ys(e, t, o), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Ns(e, t, o, i, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !q(o)) ? ys(e, Oe(t), o, r, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), Ns(e, t, o, i));
};
function qc(e, t, n, o) {
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
const Jc = ["ctrl", "shift", "alt", "meta"], zc = {
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
  exact: (e, t) => Jc.some((n) => e[`${n}Key`] && !t.includes(n))
}, Yc = (e, t) => {
  const n = e._withMods || (e._withMods = {}), o = t.join(".");
  return n[o] || (n[o] = ((s, ...r) => {
    for (let i = 0; i < t.length; i++) {
      const l = zc[t[i]];
      if (l && l(s, t)) return;
    }
    return e(s, ...r);
  }));
}, Xc = /* @__PURE__ */ z({ patchProp: Gc }, Tc);
let Vs;
function Zc() {
  return Vs || (Vs = Jl(Xc));
}
const Qc = ((...e) => {
  const t = Zc().createApp(...e);
  process.env.NODE_ENV !== "production" && (tf(t), nf(t));
  const { mount: n } = t;
  return t.mount = (o) => {
    const s = of(o);
    if (!s) return;
    const r = t._component;
    !$(r) && !r.render && !r.template && (r.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const i = n(s, !1, ef(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), i;
  }, t;
});
function ef(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function tf(e) {
  Object.defineProperty(e.config, "isNativeTag", {
    value: (t) => li(t) || ci(t) || fi(t),
    writable: !1
  });
}
function nf(e) {
  {
    const t = e.config.isCustomElement;
    Object.defineProperty(e.config, "isCustomElement", {
      get() {
        return t;
      },
      set() {
        We(
          "The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead."
        );
      }
    });
    const n = e.config.compilerOptions, o = 'The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader\'s `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc';
    Object.defineProperty(e.config, "compilerOptions", {
      get() {
        return We(o), n;
      },
      set() {
        We(o);
      }
    });
  }
}
function of(e) {
  if (q(e)) {
    const t = document.querySelector(e);
    return process.env.NODE_ENV !== "production" && !t && We(
      `Failed to mount app: mount target selector "${e}" returned null.`
    ), t;
  }
  return process.env.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && We(
    'mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs'
  ), e;
}
/**
* vue v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function sf() {
  wc();
}
process.env.NODE_ENV !== "production" && sf();
const rf = /* @__PURE__ */ Yt({
  __name: "ChatEntryText",
  props: {
    text: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => $n(t.text);
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
      case "fontSize":
        t.fontSize = typeof l == "number" || /^\d+(\.\d+)?$/.test(l) ? `${l}px` : l;
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
const Gr = Symbol("GlobalJsonConfig"), lf = {
  install(e, t) {
    e.provide(Gr, t);
  }
};
function Ln() {
  const e = Ht(Gr);
  if (!e)
    throw new Error("Plugin GlobalJsonConfig not found.");
  return e;
}
const cf = {
  key: 1,
  class: "typing"
}, ff = /* @__PURE__ */ Yt({
  __name: "ChatEntry",
  props: {
    entry: {}
  },
  setup(e) {
    const t = Ln(), n = e, o = {
      ...Dn(n.entry.type === "bot" ? t.botEntryStyle : t.userEntryStyle),
      marginTop: `${t.listGap}px`
    };
    return (s, r) => (De(), Ke("div", {
      class: Cn(["entrcont", n.entry.type])
    }, [
      n.entry.type !== "bot" || !n.entry.isStillTyping ? (De(), Ke("div", {
        key: 0,
        class: "entry",
        style: o
      }, [
        Ee(rf, {
          text: n.entry.text
        }, null, 8, ["text"])
      ])) : n.entry.type === "bot" && n.entry.isStillTyping ? (De(), Ke("div", cf, $n(wo(t).chatBotTypingText), 1)) : dc("", !0)
    ], 2));
  }
}), Un = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, s] of t)
    n[o] = s;
  return n;
}, uf = /* @__PURE__ */ Un(ff, [["__scopeId", "data-v-5647c0a8"]]), af = /* @__PURE__ */ Yt({
  __name: "ChatList",
  props: {
    list: {}
  },
  setup(e) {
    const t = Ln(), n = {
      ...Dn(t.listStyle),
      padding: `0 ${t.listGap}px ${t.listGap}px ${t.listGap}px`
    };
    t.listHeight && t.listHeight > 0 && (n.height = `${t.listHeight}px`);
    const o = e, s = Xs(null);
    return yt(
      // Nur scrollen, wenn ein Element hinzugefügt wurde oder "typing" beendet
      () => {
        const r = o.list.length, i = o.list[r - 1], l = i?.type === "bot" && i.isStillTyping;
        return [r, l];
      },
      (r, i) => {
        i && (r[0] > i[0] || r[1] !== i[1]) && tr(() => {
          s.value && (s.value.scrollTop = s.value.scrollHeight);
        });
      }
    ), (r, i) => (De(), Ke("div", {
      class: "chat-list",
      style: n,
      ref_key: "listContainer",
      ref: s
    }, [
      (De(!0), Ke(ve, null, gr(o.list, (l) => (De(), Mr(uf, {
        key: l.id,
        entry: l
      }, null, 8, ["entry"]))), 128))
    ], 512));
  }
}), pf = /* @__PURE__ */ Un(af, [["__scopeId", "data-v-7a55f65b"]]), df = ["onClick"], hf = /* @__PURE__ */ Yt({
  __name: "ChatInput",
  props: {
    label: {}
  },
  emits: ["addEntry"],
  setup(e, { emit: t }) {
    const n = Ln(), o = {
      ...Dn(n.inputStyle),
      minHeight: `${n.inputRows}rem`
    }, s = Dn(n.inputStyleUser), r = e, i = t, l = Ho(() => n.chat.user.filter((f) => f.label === r.label));
    return (f, d) => (De(), Ke("div", {
      class: "outer",
      style: o
    }, [
      (De(!0), Ke(ve, null, gr(l.value, (p, a) => (De(), Ke("div", {
        key: a,
        style: Tn(wo(s)),
        onClick: Yc((g) => i("addEntry", p), ["prevent"])
      }, $n(p.text), 13, df))), 128))
    ]));
  }
}), gf = /* @__PURE__ */ Un(hf, [["__scopeId", "data-v-e7e1cd12"]]), mf = /* @__PURE__ */ Yt({
  __name: "App",
  setup(e, { expose: t }) {
    const n = Ln();
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
          const p = o.value.curr.length > 0 && n.botDelay || 0, g = {
            id: o.value.curr.length + 1,
            type: "bot",
            isStillTyping: !0,
            text: d.text
          };
          o.value.curr.push(g);
          const O = o.value.curr.length, A = {
            event: "ENTRY_ADDED_BOT",
            text: d.text
          };
          n.fsm?.logEvent(A), setTimeout(() => {
            O === o.value.curr.length && delete o.value.curr[O - 1].isStillTyping;
          }, p);
        } else
          n.fsm?.logEvent(`BOT_RESPONSE_NOT_FOUND: ${f}`);
      },
      { immediate: !0 }
    );
    const s = Ho(() => {
      const f = o.value.curr.length;
      if (f === 0) return "";
      const d = o.value.curr[f - 1];
      return d?.type === "bot" && !d.isStillTyping ? o.value.currLabel : "";
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
    dr(() => i(o.value.currLabel));
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
    return (f, d) => (De(), Ke("div", null, [
      Ee(pf, {
        class: "list",
        list: o.value.curr
      }, null, 8, ["list"]),
      Ee(gf, {
        label: s.value,
        onAddEntry: l
      }, null, 8, ["label"])
    ]));
  }
}), _f = /* @__PURE__ */ Un(mf, [["__scopeId", "data-v-e0a57132"]]);
function vf(e) {
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
function Ef(e) {
  const t = {}, n = tt(e) ? P(e) : e;
  for (const o in n)
    if (Object.prototype.hasOwnProperty.call(n, o)) {
      const s = n[o];
      J(s) ? t[o] = s.value : t[o] = s;
    }
  return t;
}
const Nf = (e, t, n, o) => {
  o && (t.postMessagePayload = o), vf(t);
  const s = Qc(_f);
  s.use(lf, t);
  const i = s.mount(e);
  return n && yt(
    () => Ef(i),
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
  Nf as initializeAndMount
};
