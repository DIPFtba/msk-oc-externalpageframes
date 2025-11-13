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
const k = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, bt = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], Z = () => {
}, Cs = () => !1, zt = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), mn = (e) => e.startsWith("onUpdate:"), z = Object.assign, No = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, zr = Object.prototype.hasOwnProperty, j = (e, t) => zr.call(e, t), C = Array.isArray, ft = (e) => Cn(e) === "[object Map]", $s = (e) => Cn(e) === "[object Set]", A = (e) => typeof e == "function", q = (e) => typeof e == "string", rt = (e) => typeof e == "symbol", W = (e) => e !== null && typeof e == "object", yo = (e) => (W(e) || A(e)) && A(e.then) && A(e.catch), As = Object.prototype.toString, Cn = (e) => As.call(e), Oo = (e) => Cn(e).slice(8, -1), Ms = (e) => Cn(e) === "[object Object]", xo = (e) => q(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ft = /* @__PURE__ */ Ge(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Xr = /* @__PURE__ */ Ge(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), $n = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, Zr = /-\w/g, Oe = $n(
  (e) => e.replace(Zr, (t) => t.slice(1).toUpperCase())
), Qr = /\B([A-Z])/g, ot = $n(
  (e) => e.replace(Qr, "-$1").toLowerCase()
), An = $n((e) => e.charAt(0).toUpperCase() + e.slice(1)), ct = $n(
  (e) => e ? `on${An(e)}` : ""
), tt = (e, t) => !Object.is(e, t), $t = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, _n = (e, t, n, o = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: o,
    value: n
  });
}, ei = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let qo;
const Xt = () => qo || (qo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Dt(e) {
  if (C(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], s = q(o) ? si(o) : Dt(o);
      if (s)
        for (const r in s)
          t[r] = s[r];
    }
    return t;
  } else if (q(e) || W(e))
    return e;
}
const ti = /;(?![^(]*\))/g, ni = /:([^]+)/, oi = /\/\*[^]*?\*\//g;
function si(e) {
  const t = {};
  return e.replace(oi, "").split(ti).forEach((n) => {
    if (n) {
      const o = n.split(ni);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function Mn(e) {
  let t = "";
  if (q(e))
    t = e;
  else if (C(e))
    for (let n = 0; n < e.length; n++) {
      const o = Mn(e[n]);
      o && (t += o + " ");
    }
  else if (W(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const ri = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", ii = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", li = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", ci = /* @__PURE__ */ Ge(ri), ui = /* @__PURE__ */ Ge(ii), fi = /* @__PURE__ */ Ge(li), ai = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", pi = /* @__PURE__ */ Ge(ai);
function Is(e) {
  return !!e || e === "";
}
const Ps = (e) => !!(e && e.__v_isRef === !0), Wt = (e) => q(e) ? e : e == null ? "" : C(e) || W(e) && (e.toString === As || !A(e.toString)) ? Ps(e) ? Wt(e.value) : JSON.stringify(e, Rs, 2) : String(e), Rs = (e, t) => Ps(t) ? Rs(e, t.value) : ft(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [o, s], r) => (n[Jn(o, r) + " =>"] = s, n),
    {}
  )
} : $s(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Jn(n))
} : rt(t) ? Jn(t) : W(t) && !C(t) && !Ms(t) ? String(t) : t, Jn = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    rt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
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
class di {
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
function hi() {
  return ae;
}
let U;
const Yn = /* @__PURE__ */ new WeakSet();
class Fs {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ae && ae.active && ae.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Yn.has(this) && (Yn.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Hs(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Jo(this), Ls(this);
    const t = U, n = xe;
    U = this, xe = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && U !== this && we(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), Us(this), U = t, xe = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Vo(t);
      this.deps = this.depsTail = void 0, Jo(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Yn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    ro(this) && this.run();
  }
  get dirty() {
    return ro(this);
  }
}
let js = 0, jt, Ht;
function Hs(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Ht, Ht = e;
    return;
  }
  e.next = jt, jt = e;
}
function Do() {
  js++;
}
function wo() {
  if (--js > 0)
    return;
  if (Ht) {
    let t = Ht;
    for (Ht = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; jt; ) {
    let t = jt;
    for (jt = void 0; t; ) {
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
function Ls(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Us(e) {
  let t, n = e.depsTail, o = n;
  for (; o; ) {
    const s = o.prevDep;
    o.version === -1 ? (o === n && (n = s), Vo(o), gi(o)) : t = o, o.dep.activeLink = o.prevActiveLink, o.prevActiveLink = void 0, o = s;
  }
  e.deps = t, e.depsTail = n;
}
function ro(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Bs(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Bs(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Kt) || (e.globalVersion = Kt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !ro(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = U, o = xe;
  U = e, xe = !0;
  try {
    Ls(e);
    const s = e.fn(e._value);
    (t.version === 0 || tt(s, e._value)) && (e.flags |= 128, e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    U = n, xe = o, Us(e), e.flags &= -3;
  }
}
function Vo(e, t = !1) {
  const { dep: n, prevSub: o, nextSub: s } = e;
  if (o && (o.nextSub = s, e.prevSub = void 0), s && (s.prevSub = o, e.nextSub = void 0), process.env.NODE_ENV !== "production" && n.subsHead === e && (n.subsHead = s), n.subs === e && (n.subs = o, !o && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep)
      Vo(r, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function gi(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let xe = !0;
const ks = [];
function Ve() {
  ks.push(xe), xe = !1;
}
function Se() {
  const e = ks.pop();
  xe = e === void 0 ? !0 : e;
}
function Jo(e) {
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
let Kt = 0;
class mi {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class So {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!U || !xe || U === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== U)
      n = this.activeLink = new mi(U, this), U.deps ? (n.prevDep = U.depsTail, U.depsTail.nextDep = n, U.depsTail = n) : U.deps = U.depsTail = n, Ws(n);
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
    this.version++, Kt++, this.notify(t);
  }
  notify(t) {
    Do();
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
      wo();
    }
  }
}
function Ws(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let o = t.deps; o; o = o.nextDep)
        Ws(o);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const io = /* @__PURE__ */ new WeakMap(), at = Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), lo = Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), Gt = Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function X(e, t, n) {
  if (xe && U) {
    let o = io.get(e);
    o || io.set(e, o = /* @__PURE__ */ new Map());
    let s = o.get(n);
    s || (o.set(n, s = new So()), s.map = o, s.key = n), process.env.NODE_ENV !== "production" ? s.track({
      target: e,
      type: t,
      key: n
    }) : s.track();
  }
}
function Pe(e, t, n, o, s, r) {
  const i = io.get(e);
  if (!i) {
    Kt++;
    return;
  }
  const l = (c) => {
    c && (process.env.NODE_ENV !== "production" ? c.trigger({
      target: e,
      type: t,
      key: n,
      newValue: o,
      oldValue: s,
      oldTarget: r
    }) : c.trigger());
  };
  if (Do(), t === "clear")
    i.forEach(l);
  else {
    const c = C(e), d = c && xo(n);
    if (c && n === "length") {
      const f = Number(o);
      i.forEach((p, g) => {
        (g === "length" || g === Gt || !rt(g) && g >= f) && l(p);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), d && l(i.get(Gt)), t) {
        case "add":
          c ? d && l(i.get("length")) : (l(i.get(at)), ft(e) && l(i.get(lo)));
          break;
        case "delete":
          c || (l(i.get(at)), ft(e) && l(i.get(lo)));
          break;
        case "set":
          ft(e) && l(i.get(at));
          break;
      }
  }
  wo();
}
function mt(e) {
  const t = I(e);
  return t === e ? t : (X(t, "iterate", Gt), ie(e) ? t : t.map(ee));
}
function In(e) {
  return X(e = I(e), "iterate", Gt), e;
}
const _i = {
  __proto__: null,
  [Symbol.iterator]() {
    return zn(this, Symbol.iterator, ee);
  },
  concat(...e) {
    return mt(this).concat(
      ...e.map((t) => C(t) ? mt(t) : t)
    );
  },
  entries() {
    return zn(this, "entries", (e) => (e[1] = ee(e[1]), e));
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
    return Xn(this, "includes", e);
  },
  indexOf(...e) {
    return Xn(this, "indexOf", e);
  },
  join(e) {
    return mt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Xn(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ue(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return At(this, "pop");
  },
  push(...e) {
    return At(this, "push", e);
  },
  reduce(e, ...t) {
    return Yo(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Yo(this, "reduceRight", e, t);
  },
  shift() {
    return At(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ue(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return At(this, "splice", e);
  },
  toReversed() {
    return mt(this).toReversed();
  },
  toSorted(e) {
    return mt(this).toSorted(e);
  },
  toSpliced(...e) {
    return mt(this).toSpliced(...e);
  },
  unshift(...e) {
    return At(this, "unshift", e);
  },
  values() {
    return zn(this, "values", ee);
  }
};
function zn(e, t, n) {
  const o = In(e), s = o[t]();
  return o !== e && !ie(e) && (s._next = s.next, s.next = () => {
    const r = s._next();
    return r.done || (r.value = n(r.value)), r;
  }), s;
}
const vi = Array.prototype;
function Ue(e, t, n, o, s, r) {
  const i = In(e), l = i !== e && !ie(e), c = i[t];
  if (c !== vi[t]) {
    const p = c.apply(e, r);
    return l ? ee(p) : p;
  }
  let d = n;
  i !== e && (l ? d = function(p, g) {
    return n.call(this, ee(p), g, e);
  } : n.length > 2 && (d = function(p, g) {
    return n.call(this, p, g, e);
  }));
  const f = c.call(i, d, o);
  return l && s ? s(f) : f;
}
function Yo(e, t, n, o) {
  const s = In(e);
  let r = n;
  return s !== e && (ie(e) ? n.length > 3 && (r = function(i, l, c) {
    return n.call(this, i, l, c, e);
  }) : r = function(i, l, c) {
    return n.call(this, i, ee(l), c, e);
  }), s[t](r, ...o);
}
function Xn(e, t, n) {
  const o = I(e);
  X(o, "iterate", Gt);
  const s = o[t](...n);
  return (s === -1 || s === !1) && vn(n[0]) ? (n[0] = I(n[0]), o[t](...n)) : s;
}
function At(e, t, n = []) {
  Ve(), Do();
  const o = I(e)[t].apply(e, n);
  return wo(), Se(), o;
}
const Ei = /* @__PURE__ */ Ge("__proto__,__v_isRef,__isVue"), Ks = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(rt)
);
function bi(e) {
  rt(e) || (e = String(e));
  const t = I(this);
  return X(t, "has", e), t.hasOwnProperty(e);
}
class Gs {
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
      return o === (s ? r ? Zs : Xs : r ? zs : Ys).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const i = C(t);
    if (!s) {
      let c;
      if (i && (c = _i[n]))
        return c;
      if (n === "hasOwnProperty")
        return bi;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      Y(t) ? t : o
    );
    if ((rt(n) ? Ks.has(n) : Ei(n)) || (s || X(t, "get", n), r))
      return l;
    if (Y(l)) {
      const c = i && xo(n) ? l : l.value;
      return s && W(c) ? uo(c) : c;
    }
    return W(l) ? s ? uo(l) : To(l) : l;
  }
}
class qs extends Gs {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, o, s) {
    let r = t[n];
    if (!this._isShallow) {
      const c = je(r);
      if (!ie(o) && !je(o) && (r = I(r), o = I(o)), !C(t) && Y(r) && !Y(o))
        return c ? (process.env.NODE_ENV !== "production" && we(
          `Set operation on key "${String(n)}" failed: target is readonly.`,
          t[n]
        ), !0) : (r.value = o, !0);
    }
    const i = C(t) && xo(n) ? Number(n) < t.length : j(t, n), l = Reflect.set(
      t,
      n,
      o,
      Y(t) ? t : s
    );
    return t === I(s) && (i ? tt(o, r) && Pe(t, "set", n, o, r) : Pe(t, "add", n, o)), l;
  }
  deleteProperty(t, n) {
    const o = j(t, n), s = t[n], r = Reflect.deleteProperty(t, n);
    return r && o && Pe(t, "delete", n, void 0, s), r;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!rt(n) || !Ks.has(n)) && X(t, "has", n), o;
  }
  ownKeys(t) {
    return X(
      t,
      "iterate",
      C(t) ? "length" : at
    ), Reflect.ownKeys(t);
  }
}
class Js extends Gs {
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
const Ni = /* @__PURE__ */ new qs(), yi = /* @__PURE__ */ new Js(), Oi = /* @__PURE__ */ new qs(!0), xi = /* @__PURE__ */ new Js(!0), co = (e) => e, rn = (e) => Reflect.getPrototypeOf(e);
function Di(e, t, n) {
  return function(...o) {
    const s = this.__v_raw, r = I(s), i = ft(r), l = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, d = s[e](...o), f = n ? co : t ? En : ee;
    return !t && X(
      r,
      "iterate",
      c ? lo : at
    ), {
      // iterator protocol
      next() {
        const { value: p, done: g } = d.next();
        return g ? { value: p, done: g } : {
          value: l ? [f(p[0]), f(p[1])] : f(p),
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
function ln(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      we(
        `${An(e)} operation ${n}failed: target is readonly.`,
        I(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function wi(e, t) {
  const n = {
    get(s) {
      const r = this.__v_raw, i = I(r), l = I(s);
      e || (tt(s, l) && X(i, "get", s), X(i, "get", l));
      const { has: c } = rn(i), d = t ? co : e ? En : ee;
      if (c.call(i, s))
        return d(r.get(s));
      if (c.call(i, l))
        return d(r.get(l));
      r !== i && r.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !e && X(I(s), "iterate", at), s.size;
    },
    has(s) {
      const r = this.__v_raw, i = I(r), l = I(s);
      return e || (tt(s, l) && X(i, "has", s), X(i, "has", l)), s === l ? r.has(s) : r.has(s) || r.has(l);
    },
    forEach(s, r) {
      const i = this, l = i.__v_raw, c = I(l), d = t ? co : e ? En : ee;
      return !e && X(c, "iterate", at), l.forEach((f, p) => s.call(r, d(f), d(p), i));
    }
  };
  return z(
    n,
    e ? {
      add: ln("add"),
      set: ln("set"),
      delete: ln("delete"),
      clear: ln("clear")
    } : {
      add(s) {
        !t && !ie(s) && !je(s) && (s = I(s));
        const r = I(this);
        return rn(r).has.call(r, s) || (r.add(s), Pe(r, "add", s, s)), this;
      },
      set(s, r) {
        !t && !ie(r) && !je(r) && (r = I(r));
        const i = I(this), { has: l, get: c } = rn(i);
        let d = l.call(i, s);
        d ? process.env.NODE_ENV !== "production" && zo(i, l, s) : (s = I(s), d = l.call(i, s));
        const f = c.call(i, s);
        return i.set(s, r), d ? tt(r, f) && Pe(i, "set", s, r, f) : Pe(i, "add", s, r), this;
      },
      delete(s) {
        const r = I(this), { has: i, get: l } = rn(r);
        let c = i.call(r, s);
        c ? process.env.NODE_ENV !== "production" && zo(r, i, s) : (s = I(s), c = i.call(r, s));
        const d = l ? l.call(r, s) : void 0, f = r.delete(s);
        return c && Pe(r, "delete", s, void 0, d), f;
      },
      clear() {
        const s = I(this), r = s.size !== 0, i = process.env.NODE_ENV !== "production" ? ft(s) ? new Map(s) : new Set(s) : void 0, l = s.clear();
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
    n[s] = Di(s, e, t);
  }), n;
}
function Pn(e, t) {
  const n = wi(e, t);
  return (o, s, r) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get(
    j(n, s) && s in o ? n : o,
    s,
    r
  );
}
const Vi = {
  get: /* @__PURE__ */ Pn(!1, !1)
}, Si = {
  get: /* @__PURE__ */ Pn(!1, !0)
}, Ti = {
  get: /* @__PURE__ */ Pn(!0, !1)
}, Ci = {
  get: /* @__PURE__ */ Pn(!0, !0)
};
function zo(e, t, n) {
  const o = I(n);
  if (o !== n && t.call(e, o)) {
    const s = Oo(e);
    we(
      `Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Ys = /* @__PURE__ */ new WeakMap(), zs = /* @__PURE__ */ new WeakMap(), Xs = /* @__PURE__ */ new WeakMap(), Zs = /* @__PURE__ */ new WeakMap();
function $i(e) {
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
function Ai(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : $i(Oo(e));
}
function To(e) {
  return je(e) ? e : Rn(
    e,
    !1,
    Ni,
    Vi,
    Ys
  );
}
function Mi(e) {
  return Rn(
    e,
    !1,
    Oi,
    Si,
    zs
  );
}
function uo(e) {
  return Rn(
    e,
    !0,
    yi,
    Ti,
    Xs
  );
}
function Re(e) {
  return Rn(
    e,
    !0,
    xi,
    Ci,
    Zs
  );
}
function Rn(e, t, n, o, s) {
  if (!W(e))
    return process.env.NODE_ENV !== "production" && we(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = Ai(e);
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
function nt(e) {
  return je(e) ? nt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function je(e) {
  return !!(e && e.__v_isReadonly);
}
function ie(e) {
  return !!(e && e.__v_isShallow);
}
function vn(e) {
  return e ? !!e.__v_raw : !1;
}
function I(e) {
  const t = e && e.__v_raw;
  return t ? I(t) : e;
}
function Ii(e) {
  return !j(e, "__v_skip") && Object.isExtensible(e) && _n(e, "__v_skip", !0), e;
}
const ee = (e) => W(e) ? To(e) : e, En = (e) => W(e) ? uo(e) : e;
function Y(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function Qs(e) {
  return Pi(e, !1);
}
function Pi(e, t) {
  return Y(e) ? e : new Ri(e, t);
}
class Ri {
  constructor(t, n) {
    this.dep = new So(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : I(t), this._value = n ? t : ee(t), this.__v_isShallow = n;
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
    t = o ? t : I(t), tt(t, n) && (this._rawValue = t, this._value = o ? t : ee(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }) : this.dep.trigger());
  }
}
function et(e) {
  return Y(e) ? e.value : e;
}
const Fi = {
  get: (e, t, n) => t === "__v_raw" ? e : et(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const s = e[t];
    return Y(s) && !Y(n) ? (s.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function er(e) {
  return nt(e) ? e : new Proxy(e, Fi);
}
class ji {
  constructor(t, n, o) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new So(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Kt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = o;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    U !== this)
      return Hs(this, !0), !0;
    process.env.NODE_ENV;
  }
  get value() {
    const t = process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track();
    return Bs(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter ? this.setter(t) : process.env.NODE_ENV !== "production" && we("Write operation failed: computed value is readonly");
  }
}
function Hi(e, t, n = !1) {
  let o, s;
  A(e) ? o = e : (o = e.get, s = e.set);
  const r = new ji(o, s, n);
  return process.env.NODE_ENV, r;
}
const cn = {}, bn = /* @__PURE__ */ new WeakMap();
let ut;
function Li(e, t = !1, n = ut) {
  if (n) {
    let o = bn.get(n);
    o || bn.set(n, o = []), o.push(e);
  } else process.env.NODE_ENV !== "production" && !t && we(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function Ui(e, t, n = k) {
  const { immediate: o, deep: s, once: r, scheduler: i, augmentJob: l, call: c } = n, d = (S) => {
    (n.onWarn || we)(
      "Invalid watch source: ",
      S,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, f = (S) => s ? S : ie(S) || s === !1 || s === 0 ? Qe(S, 1) : Qe(S);
  let p, g, O, $, w = !1, J = !1;
  if (Y(e) ? (g = () => e.value, w = ie(e)) : nt(e) ? (g = () => f(e), w = !0) : C(e) ? (J = !0, w = e.some((S) => nt(S) || ie(S)), g = () => e.map((S) => {
    if (Y(S))
      return S.value;
    if (nt(S))
      return f(S);
    if (A(S))
      return c ? c(S, 2) : S();
    process.env.NODE_ENV !== "production" && d(S);
  })) : A(e) ? t ? g = c ? () => c(e, 2) : e : g = () => {
    if (O) {
      Ve();
      try {
        O();
      } finally {
        Se();
      }
    }
    const S = ut;
    ut = p;
    try {
      return c ? c(e, 3, [$]) : e($);
    } finally {
      ut = S;
    }
  } : (g = Z, process.env.NODE_ENV !== "production" && d(e)), t && s) {
    const S = g, Q = s === !0 ? 1 / 0 : s;
    g = () => Qe(S(), Q);
  }
  const G = hi(), L = () => {
    p.stop(), G && G.active && No(G.effects, p);
  };
  if (r && t) {
    const S = t;
    t = (...Q) => {
      S(...Q), L();
    };
  }
  let H = J ? new Array(e.length).fill(cn) : cn;
  const pe = (S) => {
    if (!(!(p.flags & 1) || !p.dirty && !S))
      if (t) {
        const Q = p.run();
        if (s || w || (J ? Q.some((_e, ne) => tt(_e, H[ne])) : tt(Q, H))) {
          O && O();
          const _e = ut;
          ut = p;
          try {
            const ne = [
              Q,
              // pass undefined as the old value when it's changed for the first time
              H === cn ? void 0 : J && H[0] === cn ? [] : H,
              $
            ];
            H = Q, c ? c(t, 3, ne) : (
              // @ts-expect-error
              t(...ne)
            );
          } finally {
            ut = _e;
          }
        }
      } else
        p.run();
  };
  return l && l(pe), p = new Fs(g), p.scheduler = i ? () => i(pe, !1) : pe, $ = (S) => Li(S, !1, p), O = p.onStop = () => {
    const S = bn.get(p);
    if (S) {
      if (c)
        c(S, 4);
      else
        for (const Q of S) Q();
      bn.delete(p);
    }
  }, process.env.NODE_ENV !== "production" && (p.onTrack = n.onTrack, p.onTrigger = n.onTrigger), t ? o ? pe(!0) : H = p.run() : i ? i(pe.bind(null, !0), !0) : p.run(), L.pause = p.pause.bind(p), L.resume = p.resume.bind(p), L.stop = L, L;
}
function Qe(e, t = 1 / 0, n) {
  if (t <= 0 || !W(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, Y(e))
    Qe(e.value, t, n);
  else if (C(e))
    for (let o = 0; o < e.length; o++)
      Qe(e[o], t, n);
  else if ($s(e) || ft(e))
    e.forEach((o) => {
      Qe(o, t, n);
    });
  else if (Ms(e)) {
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
const pt = [];
function un(e) {
  pt.push(e);
}
function fn() {
  pt.pop();
}
let Zn = !1;
function y(e, ...t) {
  if (Zn) return;
  Zn = !0, Ve();
  const n = pt.length ? pt[pt.length - 1].component : null, o = n && n.appContext.config.warnHandler, s = Bi();
  if (o)
    wt(
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
          ({ vnode: r }) => `at <${Un(n, r.type)}>`
        ).join(`
`),
        s
      ]
    );
  else {
    const r = [`[Vue warn]: ${e}`, ...t];
    s.length && r.push(`
`, ...ki(s)), console.warn(...r);
  }
  Se(), Zn = !1;
}
function Bi() {
  let e = pt[pt.length - 1];
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
function ki(e) {
  const t = [];
  return e.forEach((n, o) => {
    t.push(...o === 0 ? [] : [`
`], ...Wi(n));
  }), t;
}
function Wi({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, s = ` at <${Un(
    e.component,
    e.type,
    o
  )}`, r = ">" + n;
  return e.props ? [s, ...Ki(e.props), r] : [s + r];
}
function Ki(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((o) => {
    t.push(...tr(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function tr(e, t, n) {
  return q(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : Y(t) ? (t = tr(e, I(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : A(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = I(t), n ? t : [`${e}=`, t]);
}
const Co = {
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
function wt(e, t, n, o) {
  try {
    return o ? e(...o) : e();
  } catch (s) {
    Zt(s, t, n);
  }
}
function He(e, t, n, o) {
  if (A(e)) {
    const s = wt(e, t, n, o);
    return s && yo(s) && s.catch((r) => {
      Zt(r, t, n);
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
function Zt(e, t, n, o = !0) {
  const s = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: i } = t && t.appContext.config || k;
  if (t) {
    let l = t.parent;
    const c = t.proxy, d = process.env.NODE_ENV !== "production" ? Co[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const f = l.ec;
      if (f) {
        for (let p = 0; p < f.length; p++)
          if (f[p](e, c, d) === !1)
            return;
      }
      l = l.parent;
    }
    if (r) {
      Ve(), wt(r, null, 10, [
        e,
        c,
        d
      ]), Se();
      return;
    }
  }
  Gi(e, n, s, o, i);
}
function Gi(e, t, n, o = !0, s = !1) {
  if (process.env.NODE_ENV !== "production") {
    const r = Co[t];
    if (n && un(n), y(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && fn(), o)
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
const Nt = [];
let Xe = null, Et = 0;
const nr = /* @__PURE__ */ Promise.resolve();
let Nn = null;
const qi = 100;
function or(e) {
  const t = Nn || nr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ji(e) {
  let t = Ie + 1, n = re.length;
  for (; t < n; ) {
    const o = t + n >>> 1, s = re[o], r = qt(s);
    r < e || r === e && s.flags & 2 ? t = o + 1 : n = o;
  }
  return t;
}
function Fn(e) {
  if (!(e.flags & 1)) {
    const t = qt(e), n = re[re.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= qt(n) ? re.push(e) : re.splice(Ji(t), 0, e), e.flags |= 1, sr();
  }
}
function sr() {
  Nn || (Nn = nr.then(lr));
}
function rr(e) {
  C(e) ? Nt.push(...e) : Xe && e.id === -1 ? Xe.splice(Et + 1, 0, e) : e.flags & 1 || (Nt.push(e), e.flags |= 1), sr();
}
function Xo(e, t, n = Ie + 1) {
  for (process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()); n < re.length; n++) {
    const o = re[n];
    if (o && o.flags & 2) {
      if (e && o.id !== e.uid || process.env.NODE_ENV !== "production" && $o(t, o))
        continue;
      re.splice(n, 1), n--, o.flags & 4 && (o.flags &= -2), o(), o.flags & 4 || (o.flags &= -2);
    }
  }
}
function ir(e) {
  if (Nt.length) {
    const t = [...new Set(Nt)].sort(
      (n, o) => qt(n) - qt(o)
    );
    if (Nt.length = 0, Xe) {
      Xe.push(...t);
      return;
    }
    for (Xe = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), Et = 0; Et < Xe.length; Et++) {
      const n = Xe[Et];
      process.env.NODE_ENV !== "production" && $o(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    Xe = null, Et = 0;
  }
}
const qt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function lr(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => $o(e, n) : Z;
  try {
    for (Ie = 0; Ie < re.length; Ie++) {
      const n = re[Ie];
      if (n && !(n.flags & 8)) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        n.flags & 4 && (n.flags &= -2), wt(
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
    Ie = -1, re.length = 0, ir(e), Nn = null, (re.length || Nt.length) && lr(e);
  }
}
function $o(e, t) {
  const n = e.get(t) || 0;
  if (n > qi) {
    const o = t.i, s = o && Wr(o.type);
    return Zt(
      `Maximum recursive updates exceeded${s ? ` in component <${s}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
let Fe = !1;
const an = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (Xt().__VUE_HMR_RUNTIME__ = {
  createRecord: Qn(cr),
  rerender: Qn(Xi),
  reload: Qn(Zi)
});
const ht = /* @__PURE__ */ new Map();
function Yi(e) {
  const t = e.type.__hmrId;
  let n = ht.get(t);
  n || (cr(t, e.type), n = ht.get(t)), n.instances.add(e);
}
function zi(e) {
  ht.get(e.type.__hmrId).instances.delete(e);
}
function cr(e, t) {
  return ht.has(e) ? !1 : (ht.set(e, {
    initialDef: yn(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function yn(e) {
  return Kr(e) ? e.__vccOpts : e;
}
function Xi(e, t) {
  const n = ht.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, yn(o.type).render = t), o.renderCache = [], Fe = !0, o.job.flags & 8 || o.update(), Fe = !1;
  }));
}
function Zi(e, t) {
  const n = ht.get(e);
  if (!n) return;
  t = yn(t), Zo(n.initialDef, t);
  const o = [...n.instances];
  for (let s = 0; s < o.length; s++) {
    const r = o[s], i = yn(r.type);
    let l = an.get(i);
    l || (i !== n.initialDef && Zo(i, t), an.set(i, l = /* @__PURE__ */ new Set())), l.add(r), r.appContext.propsCache.delete(r.type), r.appContext.emitsCache.delete(r.type), r.appContext.optionsCache.delete(r.type), r.ceReload ? (l.add(r), r.ceReload(t.styles), l.delete(r)) : r.parent ? Fn(() => {
      r.job.flags & 8 || (Fe = !0, r.parent.update(), Fe = !1, l.delete(r));
    }) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), r.root.ce && r !== r.root && r.root.ce._removeChildStyle(i);
  }
  rr(() => {
    an.clear();
  });
}
function Zo(e, t) {
  z(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Qn(e) {
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
let ye, Pt = [], fo = !1;
function Qt(e, ...t) {
  ye ? ye.emit(e, ...t) : fo || Pt.push({ event: e, args: t });
}
function Ao(e, t) {
  var n, o;
  ye = e, ye ? (ye.enabled = !0, Pt.forEach(({ event: s, args: r }) => ye.emit(s, ...r)), Pt = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((o = (n = window.navigator) == null ? void 0 : n.userAgent) != null && o.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((r) => {
    Ao(r, t);
  }), setTimeout(() => {
    ye || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, fo = !0, Pt = []);
  }, 3e3)) : (fo = !0, Pt = []);
}
function Qi(e, t) {
  Qt("app:init", e, t, {
    Fragment: ve,
    Text: tn,
    Comment: me,
    Static: dn
  });
}
function el(e) {
  Qt("app:unmount", e);
}
const tl = /* @__PURE__ */ Mo(
  "component:added"
  /* COMPONENT_ADDED */
), ur = /* @__PURE__ */ Mo(
  "component:updated"
  /* COMPONENT_UPDATED */
), nl = /* @__PURE__ */ Mo(
  "component:removed"
  /* COMPONENT_REMOVED */
), ol = (e) => {
  ye && typeof ye.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !ye.cleanupBuffer(e) && nl(e);
};
// @__NO_SIDE_EFFECTS__
function Mo(e) {
  return (t) => {
    Qt(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
const sl = /* @__PURE__ */ fr(
  "perf:start"
  /* PERFORMANCE_START */
), rl = /* @__PURE__ */ fr(
  "perf:end"
  /* PERFORMANCE_END */
);
function fr(e) {
  return (t, n, o) => {
    Qt(e, t.appContext.app, t.uid, t, n, o);
  };
}
function il(e, t, n) {
  Qt(
    "component:emit",
    e.appContext.app,
    e,
    t,
    n
  );
}
let he = null, ar = null;
function On(e) {
  const t = he;
  return he = e, ar = e && e.type.__scopeId || null, t;
}
function ll(e, t = he, n) {
  if (!t || e._n)
    return e;
  const o = (...s) => {
    o._d && ps(-1);
    const r = On(t);
    let i;
    try {
      i = e(...s);
    } finally {
      On(r), o._d && ps(1);
    }
    return process.env.NODE_ENV !== "production" && ur(t), i;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function pr(e) {
  Xr(e) && y("Do not use built-in directive ids as custom directive id: " + e);
}
function it(e, t, n, o) {
  const s = e.dirs, r = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const l = s[i];
    r && (l.oldValue = r[i].value);
    let c = l.dir[o];
    c && (Ve(), He(c, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Se());
  }
}
const cl = Symbol("_vte"), ul = (e) => e.__isTeleport, fl = Symbol("_leaveCb");
function Io(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Io(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function en(e, t) {
  return A(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    z({ name: e.name }, t, { setup: e })
  ) : e;
}
function dr(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const Qo = /* @__PURE__ */ new WeakSet(), xn = /* @__PURE__ */ new WeakMap();
function Lt(e, t, n, o, s = !1) {
  if (C(e)) {
    e.forEach(
      (w, J) => Lt(
        w,
        t && (C(t) ? t[J] : t),
        n,
        o,
        s
      )
    );
    return;
  }
  if (Ut(o) && !s) {
    o.shapeFlag & 512 && o.type.__asyncResolved && o.component.subTree.component && Lt(e, t, n, o.component.subTree);
    return;
  }
  const r = o.shapeFlag & 4 ? Uo(o.component) : o.el, i = s ? null : r, { i: l, r: c } = e;
  if (process.env.NODE_ENV !== "production" && !l) {
    y(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const d = t && t.r, f = l.refs === k ? l.refs = {} : l.refs, p = l.setupState, g = I(p), O = p === k ? Cs : (w) => process.env.NODE_ENV !== "production" && (j(g, w) && !Y(g[w]) && y(
    `Template ref "${w}" used on a non-ref value. It will not work in the production build.`
  ), Qo.has(g[w])) ? !1 : j(g, w), $ = (w) => process.env.NODE_ENV === "production" || !Qo.has(w);
  if (d != null && d !== c) {
    if (es(t), q(d))
      f[d] = null, O(d) && (p[d] = null);
    else if (Y(d)) {
      $(d) && (d.value = null);
      const w = t;
      w.k && (f[w.k] = null);
    }
  }
  if (A(c))
    wt(c, l, 12, [i, f]);
  else {
    const w = q(c), J = Y(c);
    if (w || J) {
      const G = () => {
        if (e.f) {
          const L = w ? O(c) ? p[c] : f[c] : $(c) || !e.k ? c.value : f[e.k];
          if (s)
            C(L) && No(L, r);
          else if (C(L))
            L.includes(r) || L.push(r);
          else if (w)
            f[c] = [r], O(c) && (p[c] = f[c]);
          else {
            const H = [r];
            $(c) && (c.value = H), e.k && (f[e.k] = H);
          }
        } else w ? (f[c] = i, O(c) && (p[c] = i)) : J ? ($(c) && (c.value = i), e.k && (f[e.k] = i)) : process.env.NODE_ENV !== "production" && y("Invalid template ref type:", c, `(${typeof c})`);
      };
      if (i) {
        const L = () => {
          G(), xn.delete(e);
        };
        L.id = -1, xn.set(e, L), de(L, n);
      } else
        es(e), G();
    } else process.env.NODE_ENV !== "production" && y("Invalid template ref type:", c, `(${typeof c})`);
  }
}
function es(e) {
  const t = xn.get(e);
  t && (t.flags |= 8, xn.delete(e));
}
Xt().requestIdleCallback;
Xt().cancelIdleCallback;
const Ut = (e) => !!e.type.__asyncLoader, Po = (e) => e.type.__isKeepAlive;
function al(e, t) {
  hr(e, "a", t);
}
function pl(e, t) {
  hr(e, "da", t);
}
function hr(e, t, n = te) {
  const o = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if (jn(t, o, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      Po(s.parent.vnode) && dl(o, t, n, s), s = s.parent;
  }
}
function dl(e, t, n, o) {
  const s = jn(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  mr(() => {
    No(o[t], s);
  }, n);
}
function jn(e, t, n = te, o = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...i) => {
      Ve();
      const l = nn(n), c = He(t, n, e, i);
      return l(), Se(), c;
    });
    return o ? s.unshift(r) : s.push(r), r;
  } else if (process.env.NODE_ENV !== "production") {
    const s = ct(Co[e].replace(/ hook$/, ""));
    y(
      `${s} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const qe = (e) => (t, n = te) => {
  (!Yt || e === "sp") && jn(e, (...o) => t(...o), n);
}, hl = qe("bm"), gr = qe("m"), gl = qe(
  "bu"
), ml = qe("u"), _l = qe(
  "bum"
), mr = qe("um"), vl = qe(
  "sp"
), El = qe("rtg"), bl = qe("rtc");
function Nl(e, t = te) {
  jn("ec", e, t);
}
const yl = Symbol.for("v-ndc");
function _r(e, t, n, o) {
  let s;
  const r = n, i = C(e);
  if (i || q(e)) {
    const l = i && nt(e);
    let c = !1, d = !1;
    l && (c = !ie(e), d = je(e), e = In(e)), s = new Array(e.length);
    for (let f = 0, p = e.length; f < p; f++)
      s[f] = t(
        c ? d ? En(ee(e[f])) : ee(e[f]) : e[f],
        f,
        void 0,
        r
      );
  } else if (typeof e == "number") {
    process.env.NODE_ENV !== "production" && !Number.isInteger(e) && y(`The v-for range expect an integer value but got ${e}.`), s = new Array(e);
    for (let l = 0; l < e; l++)
      s[l] = t(l + 1, l, void 0, r);
  } else if (W(e))
    if (e[Symbol.iterator])
      s = Array.from(
        e,
        (l, c) => t(l, c, void 0, r)
      );
    else {
      const l = Object.keys(e);
      s = new Array(l.length);
      for (let c = 0, d = l.length; c < d; c++) {
        const f = l[c];
        s[c] = t(e[f], f, c, r);
      }
    }
  else
    s = [];
  return s;
}
const ao = (e) => e ? Br(e) ? Uo(e) : ao(e.parent) : null, dt = (
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
    $parent: (e) => ao(e.parent),
    $root: (e) => ao(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => br(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Fn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = or.bind(e.proxy)),
    $watch: (e) => tc.bind(e)
  })
), Ro = (e) => e === "_" || e === "$", eo = (e, t) => e !== k && !e.__isScriptSetup && j(e, t), vr = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: o, data: s, props: r, accessCache: i, type: l, appContext: c } = e;
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
        if (eo(o, t))
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
        po && (i[t] = 0);
      }
    }
    const f = dt[t];
    let p, g;
    if (f)
      return t === "$attrs" ? (X(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && Vn()) : process.env.NODE_ENV !== "production" && t === "$slots" && X(e, "get", t), f(e);
    if (
      // css module (injected by vue-loader)
      (p = l.__cssModules) && (p = p[t])
    )
      return p;
    if (n !== k && j(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      g = c.config.globalProperties, j(g, t)
    )
      return g[t];
    process.env.NODE_ENV !== "production" && he && (!q(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (s !== k && Ro(t[0]) && j(s, t) ? y(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === he && y(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: s, ctx: r } = e;
    return eo(s, t) ? (s[t] = n, !0) : process.env.NODE_ENV !== "production" && s.__isScriptSetup && j(s, t) ? (y(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : o !== k && j(o, t) ? (o[t] = n, !0) : j(e.props, t) ? (process.env.NODE_ENV !== "production" && y(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && y(
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
    let c, d;
    return !!(n[l] || e !== k && l[0] !== "$" && j(e, l) || eo(t, l) || (c = r[0]) && j(c, l) || j(o, l) || j(dt, l) || j(s.config.globalProperties, l) || (d = i.__cssModules) && d[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : j(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (vr.ownKeys = (e) => (y(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function Ol(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys(dt).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => dt[n](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: Z
    });
  }), t;
}
function xl(e) {
  const {
    ctx: t,
    propsOptions: [n]
  } = e;
  n && Object.keys(n).forEach((o) => {
    Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[o],
      set: Z
    });
  });
}
function Dl(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(I(n)).forEach((o) => {
    if (!n.__isScriptSetup) {
      if (Ro(o[0])) {
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
        set: Z
      });
    }
  });
}
function ts(e) {
  return C(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function wl() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? y(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let po = !0;
function Vl(e) {
  const t = br(e), n = e.proxy, o = e.ctx;
  po = !1, t.beforeCreate && ns(t.beforeCreate, e, "bc");
  const {
    // state
    data: s,
    computed: r,
    methods: i,
    watch: l,
    provide: c,
    inject: d,
    // lifecycle
    created: f,
    beforeMount: p,
    mounted: g,
    beforeUpdate: O,
    updated: $,
    activated: w,
    deactivated: J,
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
    directives: on,
    filters: Bo
  } = t, Ye = process.env.NODE_ENV !== "production" ? wl() : null;
  if (process.env.NODE_ENV !== "production") {
    const [R] = e.propsOptions;
    if (R)
      for (const P in R)
        Ye("Props", P);
  }
  if (d && Sl(d, o, Ye), i)
    for (const R in i) {
      const P = i[R];
      A(P) ? (process.env.NODE_ENV !== "production" ? Object.defineProperty(o, R, {
        value: P.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : o[R] = P.bind(n), process.env.NODE_ENV !== "production" && Ye("Methods", R)) : process.env.NODE_ENV !== "production" && y(
        `Method "${R}" has type "${typeof P}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (s) {
    process.env.NODE_ENV !== "production" && !A(s) && y(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const R = s.call(n, n);
    if (process.env.NODE_ENV !== "production" && yo(R) && y(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !W(R))
      process.env.NODE_ENV !== "production" && y("data() should return an object.");
    else if (e.data = To(R), process.env.NODE_ENV !== "production")
      for (const P in R)
        Ye("Data", P), Ro(P[0]) || Object.defineProperty(o, P, {
          configurable: !0,
          enumerable: !0,
          get: () => R[P],
          set: Z
        });
  }
  if (po = !0, r)
    for (const R in r) {
      const P = r[R], Te = A(P) ? P.bind(n, n) : A(P.get) ? P.get.bind(n, n) : Z;
      process.env.NODE_ENV !== "production" && Te === Z && y(`Computed property "${R}" has no getter.`);
      const Kn = !A(P) && A(P.set) ? P.set.bind(n) : process.env.NODE_ENV !== "production" ? () => {
        y(
          `Write operation failed: computed property "${R}" is readonly.`
        );
      } : Z, Vt = Bn({
        get: Te,
        set: Kn
      });
      Object.defineProperty(o, R, {
        enumerable: !0,
        configurable: !0,
        get: () => Vt.value,
        set: (gt) => Vt.value = gt
      }), process.env.NODE_ENV !== "production" && Ye("Computed", R);
    }
  if (l)
    for (const R in l)
      Er(l[R], o, n, R);
  if (c) {
    const R = A(c) ? c.call(n) : c;
    Reflect.ownKeys(R).forEach((P) => {
      Il(P, R[P]);
    });
  }
  f && ns(f, e, "c");
  function ce(R, P) {
    C(P) ? P.forEach((Te) => R(Te.bind(n))) : P && R(P.bind(n));
  }
  if (ce(hl, p), ce(gr, g), ce(gl, O), ce(ml, $), ce(al, w), ce(pl, J), ce(Nl, ne), ce(bl, Q), ce(El, _e), ce(_l, L), ce(mr, pe), ce(vl, le), C(Le))
    if (Le.length) {
      const R = e.exposed || (e.exposed = {});
      Le.forEach((P) => {
        Object.defineProperty(R, P, {
          get: () => n[P],
          set: (Te) => n[P] = Te,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  S && e.render === Z && (e.render = S), Je != null && (e.inheritAttrs = Je), be && (e.components = be), on && (e.directives = on), le && dr(e);
}
function Sl(e, t, n = Z) {
  C(e) && (e = ho(e));
  for (const o in e) {
    const s = e[o];
    let r;
    W(s) ? "default" in s ? r = Bt(
      s.from || o,
      s.default,
      !0
    ) : r = Bt(s.from || o) : r = Bt(s), Y(r) ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (i) => r.value = i
    }) : t[o] = r, process.env.NODE_ENV !== "production" && n("Inject", o);
  }
}
function ns(e, t, n) {
  He(
    C(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Er(e, t, n, o) {
  let s = o.includes(".") ? Ar(n, o) : () => n[o];
  if (q(e)) {
    const r = t[e];
    A(r) ? Ot(s, r) : process.env.NODE_ENV !== "production" && y(`Invalid watch handler specified by key "${e}"`, r);
  } else if (A(e))
    Ot(s, e.bind(n));
  else if (W(e))
    if (C(e))
      e.forEach((r) => Er(r, t, n, o));
    else {
      const r = A(e.handler) ? e.handler.bind(n) : t[e.handler];
      A(r) ? Ot(s, r, e) : process.env.NODE_ENV !== "production" && y(`Invalid watch handler specified by key "${e.handler}"`, r);
    }
  else process.env.NODE_ENV !== "production" && y(`Invalid watch option: "${o}"`, e);
}
function br(e) {
  const t = e.type, { mixins: n, extends: o } = t, {
    mixins: s,
    optionsCache: r,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = r.get(t);
  let c;
  return l ? c = l : !s.length && !n && !o ? c = t : (c = {}, s.length && s.forEach(
    (d) => Dn(c, d, i, !0)
  ), Dn(c, t, i)), W(t) && r.set(t, c), c;
}
function Dn(e, t, n, o = !1) {
  const { mixins: s, extends: r } = t;
  r && Dn(e, r, n, !0), s && s.forEach(
    (i) => Dn(e, i, n, !0)
  );
  for (const i in t)
    if (o && i === "expose")
      process.env.NODE_ENV !== "production" && y(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const l = Tl[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Tl = {
  data: os,
  props: ss,
  emits: ss,
  // objects
  methods: Rt,
  computed: Rt,
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
  components: Rt,
  directives: Rt,
  // watch
  watch: $l,
  // provide / inject
  provide: os,
  inject: Cl
};
function os(e, t) {
  return t ? e ? function() {
    return z(
      A(e) ? e.call(this, this) : e,
      A(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Cl(e, t) {
  return Rt(ho(e), ho(t));
}
function ho(e) {
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
function Rt(e, t) {
  return e ? z(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ss(e, t) {
  return e ? C(e) && C(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : z(
    /* @__PURE__ */ Object.create(null),
    ts(e),
    ts(t ?? {})
  ) : t;
}
function $l(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = z(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = se(e[o], t[o]);
  return n;
}
function Nr() {
  return {
    app: null,
    config: {
      isNativeTag: Cs,
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
let Al = 0;
function Ml(e, t) {
  return function(o, s = null) {
    A(o) || (o = z({}, o)), s != null && !W(s) && (process.env.NODE_ENV !== "production" && y("root props passed to app.mount() must be an object."), s = null);
    const r = Nr(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const d = r.app = {
      _uid: Al++,
      _component: o,
      _props: s,
      _container: null,
      _context: r,
      _instance: null,
      version: ms,
      get config() {
        return r.config;
      },
      set config(f) {
        process.env.NODE_ENV !== "production" && y(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(f, ...p) {
        return i.has(f) ? process.env.NODE_ENV !== "production" && y("Plugin has already been applied to target app.") : f && A(f.install) ? (i.add(f), f.install(d, ...p)) : A(f) ? (i.add(f), f(d, ...p)) : process.env.NODE_ENV !== "production" && y(
          'A plugin must either be a function or an object with an "install" function.'
        ), d;
      },
      mixin(f) {
        return r.mixins.includes(f) ? process.env.NODE_ENV !== "production" && y(
          "Mixin has already been applied to target app" + (f.name ? `: ${f.name}` : "")
        ) : r.mixins.push(f), d;
      },
      component(f, p) {
        return process.env.NODE_ENV !== "production" && Eo(f, r.config), p ? (process.env.NODE_ENV !== "production" && r.components[f] && y(`Component "${f}" has already been registered in target app.`), r.components[f] = p, d) : r.components[f];
      },
      directive(f, p) {
        return process.env.NODE_ENV !== "production" && pr(f), p ? (process.env.NODE_ENV !== "production" && r.directives[f] && y(`Directive "${f}" has already been registered in target app.`), r.directives[f] = p, d) : r.directives[f];
      },
      mount(f, p, g) {
        if (c)
          process.env.NODE_ENV !== "production" && y(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          process.env.NODE_ENV !== "production" && f.__vue_app__ && y(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const O = d._ceVNode || Ee(o, s);
          return O.appContext = r, g === !0 ? g = "svg" : g === !1 && (g = void 0), process.env.NODE_ENV !== "production" && (r.reload = () => {
            const $ = st(O);
            $.el = null, e($, f, g);
          }), e(O, f, g), c = !0, d._container = f, f.__vue_app__ = d, process.env.NODE_ENV !== "production" && (d._instance = O.component, Qi(d, ms)), Uo(O.component);
        }
      },
      onUnmount(f) {
        process.env.NODE_ENV !== "production" && typeof f != "function" && y(
          `Expected function as first argument to app.onUnmount(), but got ${typeof f}`
        ), l.push(f);
      },
      unmount() {
        c ? (He(
          l,
          d._instance,
          16
        ), e(null, d._container), process.env.NODE_ENV !== "production" && (d._instance = null, el(d)), delete d._container.__vue_app__) : process.env.NODE_ENV !== "production" && y("Cannot unmount an app that is not mounted.");
      },
      provide(f, p) {
        return process.env.NODE_ENV !== "production" && f in r.provides && (j(r.provides, f) ? y(
          `App already provides property with key "${String(f)}". It will be overwritten with the new value.`
        ) : y(
          `App already provides property with key "${String(f)}" inherited from its parent element. It will be overwritten with the new value.`
        )), r.provides[f] = p, d;
      },
      runWithContext(f) {
        const p = yt;
        yt = d;
        try {
          return f();
        } finally {
          yt = p;
        }
      }
    };
    return d;
  };
}
let yt = null;
function Il(e, t) {
  if (!te)
    process.env.NODE_ENV !== "production" && y("provide() can only be used inside setup().");
  else {
    let n = te.provides;
    const o = te.parent && te.parent.provides;
    o === n && (n = te.provides = Object.create(o)), n[e] = t;
  }
}
function Bt(e, t, n = !1) {
  const o = Ur();
  if (o || yt) {
    let s = yt ? yt._context.provides : o ? o.parent == null || o.ce ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : void 0;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return n && A(t) ? t.call(o && o.proxy) : t;
    process.env.NODE_ENV !== "production" && y(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && y("inject() can only be used inside setup() or functional components.");
}
const yr = {}, Or = () => Object.create(yr), xr = (e) => Object.getPrototypeOf(e) === yr;
function Pl(e, t, n, o = !1) {
  const s = {}, r = Or();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Dr(e, t, s, r);
  for (const i in e.propsOptions[0])
    i in s || (s[i] = void 0);
  process.env.NODE_ENV !== "production" && Vr(t || {}, s, e), n ? e.props = o ? s : Mi(s) : e.type.props ? e.props = s : e.props = r, e.attrs = r;
}
function Rl(e) {
  for (; e; ) {
    if (e.type.__hmrId) return !0;
    e = e.parent;
  }
}
function Fl(e, t, n, o) {
  const {
    props: s,
    attrs: r,
    vnode: { patchFlag: i }
  } = e, l = I(s), [c] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(process.env.NODE_ENV !== "production" && Rl(e)) && (o || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const f = e.vnode.dynamicProps;
      for (let p = 0; p < f.length; p++) {
        let g = f[p];
        if (Hn(e.emitsOptions, g))
          continue;
        const O = t[g];
        if (c)
          if (j(r, g))
            O !== r[g] && (r[g] = O, d = !0);
          else {
            const $ = Oe(g);
            s[$] = go(
              c,
              l,
              $,
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
    Dr(e, t, s, r) && (d = !0);
    let f;
    for (const p in l)
      (!t || // for camelCase
      !j(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = ot(p)) === p || !j(t, f))) && (c ? n && // for camelCase
      (n[p] !== void 0 || // for kebab-case
      n[f] !== void 0) && (s[p] = go(
        c,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete s[p]);
    if (r !== l)
      for (const p in r)
        (!t || !j(t, p)) && (delete r[p], d = !0);
  }
  d && Pe(e.attrs, "set", ""), process.env.NODE_ENV !== "production" && Vr(t || {}, s, e);
}
function Dr(e, t, n, o) {
  const [s, r] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let c in t) {
      if (Ft(c))
        continue;
      const d = t[c];
      let f;
      s && j(s, f = Oe(c)) ? !r || !r.includes(f) ? n[f] = d : (l || (l = {}))[f] = d : Hn(e.emitsOptions, c) || (!(c in o) || d !== o[c]) && (o[c] = d, i = !0);
    }
  if (r) {
    const c = I(n), d = l || k;
    for (let f = 0; f < r.length; f++) {
      const p = r[f];
      n[p] = go(
        s,
        c,
        p,
        d[p],
        e,
        !j(d, p)
      );
    }
  }
  return i;
}
function go(e, t, n, o, s, r) {
  const i = e[n];
  if (i != null) {
    const l = j(i, "default");
    if (l && o === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && A(c)) {
        const { propsDefaults: d } = s;
        if (n in d)
          o = d[n];
        else {
          const f = nn(s);
          o = d[n] = c.call(
            null,
            t
          ), f();
        }
      } else
        o = c;
      s.ce && s.ce._setProp(n, o);
    }
    i[
      0
      /* shouldCast */
    ] && (r && !l ? o = !1 : i[
      1
      /* shouldCastTrue */
    ] && (o === "" || o === ot(n)) && (o = !0));
  }
  return o;
}
const jl = /* @__PURE__ */ new WeakMap();
function wr(e, t, n = !1) {
  const o = n ? jl : t.propsCache, s = o.get(e);
  if (s)
    return s;
  const r = e.props, i = {}, l = [];
  let c = !1;
  if (!A(e)) {
    const f = (p) => {
      c = !0;
      const [g, O] = wr(p, t, !0);
      z(i, g), O && l.push(...O);
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!r && !c)
    return W(e) && o.set(e, bt), bt;
  if (C(r))
    for (let f = 0; f < r.length; f++) {
      process.env.NODE_ENV !== "production" && !q(r[f]) && y("props must be strings when using array syntax.", r[f]);
      const p = Oe(r[f]);
      rs(p) && (i[p] = k);
    }
  else if (r) {
    process.env.NODE_ENV !== "production" && !W(r) && y("invalid props options", r);
    for (const f in r) {
      const p = Oe(f);
      if (rs(p)) {
        const g = r[f], O = i[p] = C(g) || A(g) ? { type: g } : z({}, g), $ = O.type;
        let w = !1, J = !0;
        if (C($))
          for (let G = 0; G < $.length; ++G) {
            const L = $[G], H = A(L) && L.name;
            if (H === "Boolean") {
              w = !0;
              break;
            } else H === "String" && (J = !1);
          }
        else
          w = A($) && $.name === "Boolean";
        O[
          0
          /* shouldCast */
        ] = w, O[
          1
          /* shouldCastTrue */
        ] = J, (w || j(O, "default")) && l.push(p);
      }
    }
  }
  const d = [i, l];
  return W(e) && o.set(e, d), d;
}
function rs(e) {
  return e[0] !== "$" && !Ft(e) ? !0 : (process.env.NODE_ENV !== "production" && y(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function Hl(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function Vr(e, t, n) {
  const o = I(t), s = n.propsOptions[0], r = Object.keys(e).map((i) => Oe(i));
  for (const i in s) {
    let l = s[i];
    l != null && Ll(
      i,
      o[i],
      l,
      process.env.NODE_ENV !== "production" ? Re(o) : o,
      !r.includes(i)
    );
  }
}
function Ll(e, t, n, o, s) {
  const { type: r, required: i, validator: l, skipCheck: c } = n;
  if (i && s) {
    y('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !i)) {
    if (r != null && r !== !0 && !c) {
      let d = !1;
      const f = C(r) ? r : [r], p = [];
      for (let g = 0; g < f.length && !d; g++) {
        const { valid: O, expectedType: $ } = Bl(t, f[g]);
        p.push($ || ""), d = O;
      }
      if (!d) {
        y(kl(e, t, p));
        return;
      }
    }
    l && !l(t, o) && y('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const Ul = /* @__PURE__ */ Ge(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function Bl(e, t) {
  let n;
  const o = Hl(t);
  if (o === "null")
    n = e === null;
  else if (Ul(o)) {
    const s = typeof e;
    n = s === o.toLowerCase(), !n && s === "object" && (n = e instanceof t);
  } else o === "Object" ? n = W(e) : o === "Array" ? n = C(e) : n = e instanceof t;
  return {
    valid: n,
    expectedType: o
  };
}
function kl(e, t, n) {
  if (n.length === 0)
    return `Prop type [] for prop "${e}" won't match anything. Did you mean to use type Array instead?`;
  let o = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(An).join(" | ")}`;
  const s = n[0], r = Oo(t), i = is(t, s), l = is(t, r);
  return n.length === 1 && ls(s) && !Wl(s, r) && (o += ` with value ${i}`), o += `, got ${r} `, ls(r) && (o += `with value ${l}.`), o;
}
function is(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function ls(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function Wl(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const Fo = (e) => e === "_" || e === "_ctx" || e === "$stable", jo = (e) => C(e) ? e.map(Ne) : [Ne(e)], Kl = (e, t, n) => {
  if (t._n)
    return t;
  const o = ll((...s) => (process.env.NODE_ENV !== "production" && te && !(n === null && he) && !(n && n.root !== te.root) && y(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), jo(t(...s))), n);
  return o._c = !1, o;
}, Sr = (e, t, n) => {
  const o = e._ctx;
  for (const s in e) {
    if (Fo(s)) continue;
    const r = e[s];
    if (A(r))
      t[s] = Kl(s, r, o);
    else if (r != null) {
      process.env.NODE_ENV !== "production" && y(
        `Non-function value encountered for slot "${s}". Prefer function slots for better performance.`
      );
      const i = jo(r);
      t[s] = () => i;
    }
  }
}, Tr = (e, t) => {
  process.env.NODE_ENV !== "production" && !Po(e.vnode) && y(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = jo(t);
  e.slots.default = () => n;
}, mo = (e, t, n) => {
  for (const o in t)
    (n || !Fo(o)) && (e[o] = t[o]);
}, Gl = (e, t, n) => {
  const o = e.slots = Or();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (mo(o, t, n), n && _n(o, "_", s, !0)) : Sr(t, o);
  } else t && Tr(e, t);
}, ql = (e, t, n) => {
  const { vnode: o, slots: s } = e;
  let r = !0, i = k;
  if (o.shapeFlag & 32) {
    const l = t._;
    l ? process.env.NODE_ENV !== "production" && Fe ? (mo(s, t, n), Pe(e, "set", "$slots")) : n && l === 1 ? r = !1 : mo(s, t, n) : (r = !t.$stable, Sr(t, s)), i = t;
  } else t && (Tr(e, t), i = { default: 1 });
  if (r)
    for (const l in s)
      !Fo(l) && i[l] == null && delete s[l];
};
let Mt, ke;
function _t(e, t) {
  e.appContext.config.performance && wn() && ke.mark(`vue-${t}-${e.uid}`), process.env.NODE_ENV !== "production" && sl(e, t, wn() ? ke.now() : Date.now());
}
function vt(e, t) {
  if (e.appContext.config.performance && wn()) {
    const n = `vue-${t}-${e.uid}`, o = n + ":end", s = `<${Un(e, e.type)}> ${t}`;
    ke.mark(o), ke.measure(s, n, o), ke.clearMeasures(s), ke.clearMarks(n), ke.clearMarks(o);
  }
  process.env.NODE_ENV !== "production" && rl(e, t, wn() ? ke.now() : Date.now());
}
function wn() {
  return Mt !== void 0 || (typeof window < "u" && window.performance ? (Mt = !0, ke = window.performance) : Mt = !1), Mt;
}
function Jl() {
  const e = [];
  if (process.env.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(
      `Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const de = uc;
function Yl(e) {
  return zl(e);
}
function zl(e, t) {
  Jl();
  const n = Xt();
  n.__VUE__ = !0, process.env.NODE_ENV !== "production" && Ao(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const {
    insert: o,
    remove: s,
    patchProp: r,
    createElement: i,
    createText: l,
    createComment: c,
    setText: d,
    setElementText: f,
    parentNode: p,
    nextSibling: g,
    setScopeId: O = Z,
    insertStaticContent: $
  } = e, w = (u, a, h, v = null, m = null, _ = null, x = void 0, N = null, b = process.env.NODE_ENV !== "production" && Fe ? !1 : !!a.dynamicChildren) => {
    if (u === a)
      return;
    u && !It(u, a) && (v = sn(u), ze(u, m, _, !0), u = null), a.patchFlag === -2 && (b = !1, a.dynamicChildren = null);
    const { type: E, ref: T, shapeFlag: D } = a;
    switch (E) {
      case tn:
        J(u, a, h, v);
        break;
      case me:
        G(u, a, h, v);
        break;
      case dn:
        u == null ? L(a, h, v, x) : process.env.NODE_ENV !== "production" && H(u, a, h, x);
        break;
      case ve:
        on(
          u,
          a,
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
          u,
          a,
          h,
          v,
          m,
          _,
          x,
          N,
          b
        ) : D & 6 ? Bo(
          u,
          a,
          h,
          v,
          m,
          _,
          x,
          N,
          b
        ) : D & 64 || D & 128 ? E.process(
          u,
          a,
          h,
          v,
          m,
          _,
          x,
          N,
          b,
          Tt
        ) : process.env.NODE_ENV !== "production" && y("Invalid VNode type:", E, `(${typeof E})`);
    }
    T != null && m ? Lt(T, u && u.ref, _, a || u, !a) : T == null && u && u.ref != null && Lt(u.ref, null, _, u, !0);
  }, J = (u, a, h, v) => {
    if (u == null)
      o(
        a.el = l(a.children),
        h,
        v
      );
    else {
      const m = a.el = u.el;
      a.children !== u.children && d(m, a.children);
    }
  }, G = (u, a, h, v) => {
    u == null ? o(
      a.el = c(a.children || ""),
      h,
      v
    ) : a.el = u.el;
  }, L = (u, a, h, v) => {
    [u.el, u.anchor] = $(
      u.children,
      a,
      h,
      v,
      u.el,
      u.anchor
    );
  }, H = (u, a, h, v) => {
    if (a.children !== u.children) {
      const m = g(u.anchor);
      S(u), [a.el, a.anchor] = $(
        a.children,
        h,
        m,
        v
      );
    } else
      a.el = u.el, a.anchor = u.anchor;
  }, pe = ({ el: u, anchor: a }, h, v) => {
    let m;
    for (; u && u !== a; )
      m = g(u), o(u, h, v), u = m;
    o(a, h, v);
  }, S = ({ el: u, anchor: a }) => {
    let h;
    for (; u && u !== a; )
      h = g(u), s(u), u = h;
    s(a);
  }, Q = (u, a, h, v, m, _, x, N, b) => {
    a.type === "svg" ? x = "svg" : a.type === "math" && (x = "mathml"), u == null ? _e(
      a,
      h,
      v,
      m,
      _,
      x,
      N,
      b
    ) : Le(
      u,
      a,
      m,
      _,
      x,
      N,
      b
    );
  }, _e = (u, a, h, v, m, _, x, N) => {
    let b, E;
    const { props: T, shapeFlag: D, transition: V, dirs: M } = u;
    if (b = u.el = i(
      u.type,
      _,
      T && T.is,
      T
    ), D & 8 ? f(b, u.children) : D & 16 && le(
      u.children,
      b,
      null,
      v,
      m,
      to(u, _),
      x,
      N
    ), M && it(u, null, v, "created"), ne(b, u, u.scopeId, x, v), T) {
      for (const K in T)
        K !== "value" && !Ft(K) && r(b, K, null, T[K], _, v);
      "value" in T && r(b, "value", null, T.value, _), (E = T.onVnodeBeforeMount) && Me(E, v, u);
    }
    process.env.NODE_ENV !== "production" && (_n(b, "__vnode", u, !0), _n(b, "__vueParentComponent", v, !0)), M && it(u, null, v, "beforeMount");
    const F = Xl(m, V);
    F && V.beforeEnter(b), o(b, a, h), ((E = T && T.onVnodeMounted) || F || M) && de(() => {
      E && Me(E, v, u), F && V.enter(b), M && it(u, null, v, "mounted");
    }, m);
  }, ne = (u, a, h, v, m) => {
    if (h && O(u, h), v)
      for (let _ = 0; _ < v.length; _++)
        O(u, v[_]);
    if (m) {
      let _ = m.subTree;
      if (process.env.NODE_ENV !== "production" && _.patchFlag > 0 && _.patchFlag & 2048 && (_ = Ho(_.children) || _), a === _ || Pr(_.type) && (_.ssContent === a || _.ssFallback === a)) {
        const x = m.vnode;
        ne(
          u,
          x,
          x.scopeId,
          x.slotScopeIds,
          m.parent
        );
      }
    }
  }, le = (u, a, h, v, m, _, x, N, b = 0) => {
    for (let E = b; E < u.length; E++) {
      const T = u[E] = N ? Ze(u[E]) : Ne(u[E]);
      w(
        null,
        T,
        a,
        h,
        v,
        m,
        _,
        x,
        N
      );
    }
  }, Le = (u, a, h, v, m, _, x) => {
    const N = a.el = u.el;
    process.env.NODE_ENV !== "production" && (N.__vnode = a);
    let { patchFlag: b, dynamicChildren: E, dirs: T } = a;
    b |= u.patchFlag & 16;
    const D = u.props || k, V = a.props || k;
    let M;
    if (h && lt(h, !1), (M = V.onVnodeBeforeUpdate) && Me(M, h, a, u), T && it(a, u, h, "beforeUpdate"), h && lt(h, !0), process.env.NODE_ENV !== "production" && Fe && (b = 0, x = !1, E = null), (D.innerHTML && V.innerHTML == null || D.textContent && V.textContent == null) && f(N, ""), E ? (Je(
      u.dynamicChildren,
      E,
      N,
      h,
      v,
      to(a, m),
      _
    ), process.env.NODE_ENV !== "production" && pn(u, a)) : x || Te(
      u,
      a,
      N,
      null,
      h,
      v,
      to(a, m),
      _,
      !1
    ), b > 0) {
      if (b & 16)
        be(N, D, V, h, m);
      else if (b & 2 && D.class !== V.class && r(N, "class", null, V.class, m), b & 4 && r(N, "style", D.style, V.style, m), b & 8) {
        const F = a.dynamicProps;
        for (let K = 0; K < F.length; K++) {
          const B = F[K], ue = D[B], fe = V[B];
          (fe !== ue || B === "value") && r(N, B, ue, fe, m, h);
        }
      }
      b & 1 && u.children !== a.children && f(N, a.children);
    } else !x && E == null && be(N, D, V, h, m);
    ((M = V.onVnodeUpdated) || T) && de(() => {
      M && Me(M, h, a, u), T && it(a, u, h, "updated");
    }, v);
  }, Je = (u, a, h, v, m, _, x) => {
    for (let N = 0; N < a.length; N++) {
      const b = u[N], E = a[N], T = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        b.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (b.type === ve || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !It(b, E) || // - In the case of a component, it could contain anything.
        b.shapeFlag & 198) ? p(b.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          h
        )
      );
      w(
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
  }, be = (u, a, h, v, m) => {
    if (a !== h) {
      if (a !== k)
        for (const _ in a)
          !Ft(_) && !(_ in h) && r(
            u,
            _,
            a[_],
            null,
            m,
            v
          );
      for (const _ in h) {
        if (Ft(_)) continue;
        const x = h[_], N = a[_];
        x !== N && _ !== "value" && r(u, _, N, x, m, v);
      }
      "value" in h && r(u, "value", a.value, h.value, m);
    }
  }, on = (u, a, h, v, m, _, x, N, b) => {
    const E = a.el = u ? u.el : l(""), T = a.anchor = u ? u.anchor : l("");
    let { patchFlag: D, dynamicChildren: V, slotScopeIds: M } = a;
    process.env.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (Fe || D & 2048) && (D = 0, b = !1, V = null), M && (N = N ? N.concat(M) : M), u == null ? (o(E, h, v), o(T, h, v), le(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      a.children || [],
      h,
      T,
      m,
      _,
      x,
      N,
      b
    )) : D > 0 && D & 64 && V && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    u.dynamicChildren ? (Je(
      u.dynamicChildren,
      V,
      h,
      m,
      _,
      x,
      N
    ), process.env.NODE_ENV !== "production" ? pn(u, a) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (a.key != null || m && a === m.subTree) && pn(
        u,
        a,
        !0
        /* shallow */
      )
    )) : Te(
      u,
      a,
      h,
      T,
      m,
      _,
      x,
      N,
      b
    );
  }, Bo = (u, a, h, v, m, _, x, N, b) => {
    a.slotScopeIds = N, u == null ? a.shapeFlag & 512 ? m.ctx.activate(
      a,
      h,
      v,
      x,
      b
    ) : Ye(
      a,
      h,
      v,
      m,
      _,
      x,
      b
    ) : ce(u, a, b);
  }, Ye = (u, a, h, v, m, _, x) => {
    const N = u.component = vc(
      u,
      v,
      m
    );
    if (process.env.NODE_ENV !== "production" && N.type.__hmrId && Yi(N), process.env.NODE_ENV !== "production" && (un(u), _t(N, "mount")), Po(u) && (N.ctx.renderer = Tt), process.env.NODE_ENV !== "production" && _t(N, "init"), bc(N, !1, x), process.env.NODE_ENV !== "production" && vt(N, "init"), process.env.NODE_ENV !== "production" && Fe && (u.el = null), N.asyncDep) {
      if (m && m.registerDep(N, R, x), !u.el) {
        const b = N.subTree = Ee(me);
        G(null, b, a, h), u.placeholder = b.el;
      }
    } else
      R(
        N,
        u,
        a,
        h,
        m,
        _,
        x
      );
    process.env.NODE_ENV !== "production" && (fn(), vt(N, "mount"));
  }, ce = (u, a, h) => {
    const v = a.component = u.component;
    if (lc(u, a, h))
      if (v.asyncDep && !v.asyncResolved) {
        process.env.NODE_ENV !== "production" && un(a), P(v, a, h), process.env.NODE_ENV !== "production" && fn();
        return;
      } else
        v.next = a, v.update();
    else
      a.el = u.el, v.vnode = a;
  }, R = (u, a, h, v, m, _, x) => {
    const N = () => {
      if (u.isMounted) {
        let { next: D, bu: V, u: M, parent: F, vnode: K } = u;
        {
          const $e = Cr(u);
          if ($e) {
            D && (D.el = K.el, P(u, D, x)), $e.asyncDep.then(() => {
              u.isUnmounted || N();
            });
            return;
          }
        }
        let B = D, ue;
        process.env.NODE_ENV !== "production" && un(D || u.vnode), lt(u, !1), D ? (D.el = K.el, P(u, D, x)) : D = K, V && $t(V), (ue = D.props && D.props.onVnodeBeforeUpdate) && Me(ue, F, D, K), lt(u, !0), process.env.NODE_ENV !== "production" && _t(u, "render");
        const fe = us(u);
        process.env.NODE_ENV !== "production" && vt(u, "render");
        const Ce = u.subTree;
        u.subTree = fe, process.env.NODE_ENV !== "production" && _t(u, "patch"), w(
          Ce,
          fe,
          // parent may have changed if it's in a teleport
          p(Ce.el),
          // anchor may have changed if it's in a fragment
          sn(Ce),
          u,
          m,
          _
        ), process.env.NODE_ENV !== "production" && vt(u, "patch"), D.el = fe.el, B === null && cc(u, fe.el), M && de(M, m), (ue = D.props && D.props.onVnodeUpdated) && de(
          () => Me(ue, F, D, K),
          m
        ), process.env.NODE_ENV !== "production" && ur(u), process.env.NODE_ENV !== "production" && fn();
      } else {
        let D;
        const { el: V, props: M } = a, { bm: F, m: K, parent: B, root: ue, type: fe } = u, Ce = Ut(a);
        lt(u, !1), F && $t(F), !Ce && (D = M && M.onVnodeBeforeMount) && Me(D, B, a), lt(u, !0);
        {
          ue.ce && // @ts-expect-error _def is private
          ue.ce._def.shadowRoot !== !1 && ue.ce._injectChildStyle(fe), process.env.NODE_ENV !== "production" && _t(u, "render");
          const $e = u.subTree = us(u);
          process.env.NODE_ENV !== "production" && vt(u, "render"), process.env.NODE_ENV !== "production" && _t(u, "patch"), w(
            null,
            $e,
            h,
            v,
            u,
            m,
            _
          ), process.env.NODE_ENV !== "production" && vt(u, "patch"), a.el = $e.el;
        }
        if (K && de(K, m), !Ce && (D = M && M.onVnodeMounted)) {
          const $e = a;
          de(
            () => Me(D, B, $e),
            m
          );
        }
        (a.shapeFlag & 256 || B && Ut(B.vnode) && B.vnode.shapeFlag & 256) && u.a && de(u.a, m), u.isMounted = !0, process.env.NODE_ENV !== "production" && tl(u), a = h = v = null;
      }
    };
    u.scope.on();
    const b = u.effect = new Fs(N);
    u.scope.off();
    const E = u.update = b.run.bind(b), T = u.job = b.runIfDirty.bind(b);
    T.i = u, T.id = u.uid, b.scheduler = () => Fn(T), lt(u, !0), process.env.NODE_ENV !== "production" && (b.onTrack = u.rtc ? (D) => $t(u.rtc, D) : void 0, b.onTrigger = u.rtg ? (D) => $t(u.rtg, D) : void 0), E();
  }, P = (u, a, h) => {
    a.component = u;
    const v = u.vnode.props;
    u.vnode = a, u.next = null, Fl(u, a.props, v, h), ql(u, a.children, h), Ve(), Xo(u), Se();
  }, Te = (u, a, h, v, m, _, x, N, b = !1) => {
    const E = u && u.children, T = u ? u.shapeFlag : 0, D = a.children, { patchFlag: V, shapeFlag: M } = a;
    if (V > 0) {
      if (V & 128) {
        Vt(
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
      } else if (V & 256) {
        Kn(
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
    M & 8 ? (T & 16 && St(E, m, _), D !== E && f(h, D)) : T & 16 ? M & 16 ? Vt(
      E,
      D,
      h,
      v,
      m,
      _,
      x,
      N,
      b
    ) : St(E, m, _, !0) : (T & 8 && f(h, ""), M & 16 && le(
      D,
      h,
      v,
      m,
      _,
      x,
      N,
      b
    ));
  }, Kn = (u, a, h, v, m, _, x, N, b) => {
    u = u || bt, a = a || bt;
    const E = u.length, T = a.length, D = Math.min(E, T);
    let V;
    for (V = 0; V < D; V++) {
      const M = a[V] = b ? Ze(a[V]) : Ne(a[V]);
      w(
        u[V],
        M,
        h,
        null,
        m,
        _,
        x,
        N,
        b
      );
    }
    E > T ? St(
      u,
      m,
      _,
      !0,
      !1,
      D
    ) : le(
      a,
      h,
      v,
      m,
      _,
      x,
      N,
      b,
      D
    );
  }, Vt = (u, a, h, v, m, _, x, N, b) => {
    let E = 0;
    const T = a.length;
    let D = u.length - 1, V = T - 1;
    for (; E <= D && E <= V; ) {
      const M = u[E], F = a[E] = b ? Ze(a[E]) : Ne(a[E]);
      if (It(M, F))
        w(
          M,
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
    for (; E <= D && E <= V; ) {
      const M = u[D], F = a[V] = b ? Ze(a[V]) : Ne(a[V]);
      if (It(M, F))
        w(
          M,
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
      D--, V--;
    }
    if (E > D) {
      if (E <= V) {
        const M = V + 1, F = M < T ? a[M].el : v;
        for (; E <= V; )
          w(
            null,
            a[E] = b ? Ze(a[E]) : Ne(a[E]),
            h,
            F,
            m,
            _,
            x,
            N,
            b
          ), E++;
      }
    } else if (E > V)
      for (; E <= D; )
        ze(u[E], m, _, !0), E++;
    else {
      const M = E, F = E, K = /* @__PURE__ */ new Map();
      for (E = F; E <= V; E++) {
        const oe = a[E] = b ? Ze(a[E]) : Ne(a[E]);
        oe.key != null && (process.env.NODE_ENV !== "production" && K.has(oe.key) && y(
          "Duplicate keys found during update:",
          JSON.stringify(oe.key),
          "Make sure keys are unique."
        ), K.set(oe.key, E));
      }
      let B, ue = 0;
      const fe = V - F + 1;
      let Ce = !1, $e = 0;
      const Ct = new Array(fe);
      for (E = 0; E < fe; E++) Ct[E] = 0;
      for (E = M; E <= D; E++) {
        const oe = u[E];
        if (ue >= fe) {
          ze(oe, m, _, !0);
          continue;
        }
        let Ae;
        if (oe.key != null)
          Ae = K.get(oe.key);
        else
          for (B = F; B <= V; B++)
            if (Ct[B - F] === 0 && It(oe, a[B])) {
              Ae = B;
              break;
            }
        Ae === void 0 ? ze(oe, m, _, !0) : (Ct[Ae - F] = E + 1, Ae >= $e ? $e = Ae : Ce = !0, w(
          oe,
          a[Ae],
          h,
          null,
          m,
          _,
          x,
          N,
          b
        ), ue++);
      }
      const Wo = Ce ? Zl(Ct) : bt;
      for (B = Wo.length - 1, E = fe - 1; E >= 0; E--) {
        const oe = F + E, Ae = a[oe], Ko = a[oe + 1], Go = oe + 1 < T ? (
          // #13559, fallback to el placeholder for unresolved async component
          Ko.el || Ko.placeholder
        ) : v;
        Ct[E] === 0 ? w(
          null,
          Ae,
          h,
          Go,
          m,
          _,
          x,
          N,
          b
        ) : Ce && (B < 0 || E !== Wo[B] ? gt(Ae, h, Go, 2) : B--);
      }
    }
  }, gt = (u, a, h, v, m = null) => {
    const { el: _, type: x, transition: N, children: b, shapeFlag: E } = u;
    if (E & 6) {
      gt(u.component.subTree, a, h, v);
      return;
    }
    if (E & 128) {
      u.suspense.move(a, h, v);
      return;
    }
    if (E & 64) {
      x.move(u, a, h, Tt);
      return;
    }
    if (x === ve) {
      o(_, a, h);
      for (let D = 0; D < b.length; D++)
        gt(b[D], a, h, v);
      o(u.anchor, a, h);
      return;
    }
    if (x === dn) {
      pe(u, a, h);
      return;
    }
    if (v !== 2 && E & 1 && N)
      if (v === 0)
        N.beforeEnter(_), o(_, a, h), de(() => N.enter(_), m);
      else {
        const { leave: D, delayLeave: V, afterLeave: M } = N, F = () => {
          u.ctx.isUnmounted ? s(_) : o(_, a, h);
        }, K = () => {
          _._isLeaving && _[fl](
            !0
            /* cancelled */
          ), D(_, () => {
            F(), M && M();
          });
        };
        V ? V(_, F, K) : K();
      }
    else
      o(_, a, h);
  }, ze = (u, a, h, v = !1, m = !1) => {
    const {
      type: _,
      props: x,
      ref: N,
      children: b,
      dynamicChildren: E,
      shapeFlag: T,
      patchFlag: D,
      dirs: V,
      cacheIndex: M
    } = u;
    if (D === -2 && (m = !1), N != null && (Ve(), Lt(N, null, h, u, !0), Se()), M != null && (a.renderCache[M] = void 0), T & 256) {
      a.ctx.deactivate(u);
      return;
    }
    const F = T & 1 && V, K = !Ut(u);
    let B;
    if (K && (B = x && x.onVnodeBeforeUnmount) && Me(B, a, u), T & 6)
      Yr(u.component, h, v);
    else {
      if (T & 128) {
        u.suspense.unmount(h, v);
        return;
      }
      F && it(u, null, a, "beforeUnmount"), T & 64 ? u.type.remove(
        u,
        a,
        h,
        Tt,
        v
      ) : E && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !E.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== ve || D > 0 && D & 64) ? St(
        E,
        a,
        h,
        !1,
        !0
      ) : (_ === ve && D & 384 || !m && T & 16) && St(b, a, h), v && Gn(u);
    }
    (K && (B = x && x.onVnodeUnmounted) || F) && de(() => {
      B && Me(B, a, u), F && it(u, null, a, "unmounted");
    }, h);
  }, Gn = (u) => {
    const { type: a, el: h, anchor: v, transition: m } = u;
    if (a === ve) {
      process.env.NODE_ENV !== "production" && u.patchFlag > 0 && u.patchFlag & 2048 && m && !m.persisted ? u.children.forEach((x) => {
        x.type === me ? s(x.el) : Gn(x);
      }) : Jr(h, v);
      return;
    }
    if (a === dn) {
      S(u);
      return;
    }
    const _ = () => {
      s(h), m && !m.persisted && m.afterLeave && m.afterLeave();
    };
    if (u.shapeFlag & 1 && m && !m.persisted) {
      const { leave: x, delayLeave: N } = m, b = () => x(h, _);
      N ? N(u.el, _, b) : b();
    } else
      _();
  }, Jr = (u, a) => {
    let h;
    for (; u !== a; )
      h = g(u), s(u), u = h;
    s(a);
  }, Yr = (u, a, h) => {
    process.env.NODE_ENV !== "production" && u.type.__hmrId && zi(u);
    const { bum: v, scope: m, job: _, subTree: x, um: N, m: b, a: E } = u;
    cs(b), cs(E), v && $t(v), m.stop(), _ && (_.flags |= 8, ze(x, u, a, h)), N && de(N, a), de(() => {
      u.isUnmounted = !0;
    }, a), process.env.NODE_ENV !== "production" && ol(u);
  }, St = (u, a, h, v = !1, m = !1, _ = 0) => {
    for (let x = _; x < u.length; x++)
      ze(u[x], a, h, v, m);
  }, sn = (u) => {
    if (u.shapeFlag & 6)
      return sn(u.component.subTree);
    if (u.shapeFlag & 128)
      return u.suspense.next();
    const a = g(u.anchor || u.el), h = a && a[cl];
    return h ? g(h) : a;
  };
  let qn = !1;
  const ko = (u, a, h) => {
    u == null ? a._vnode && ze(a._vnode, null, null, !0) : w(
      a._vnode || null,
      u,
      a,
      null,
      null,
      null,
      h
    ), a._vnode = u, qn || (qn = !0, Xo(), ir(), qn = !1);
  }, Tt = {
    p: w,
    um: ze,
    m: gt,
    r: Gn,
    mt: Ye,
    mc: le,
    pc: Te,
    pbc: Je,
    n: sn,
    o: e
  };
  return {
    render: ko,
    hydrate: void 0,
    createApp: Ml(ko)
  };
}
function to({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function lt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Xl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function pn(e, t, n = !1) {
  const o = e.children, s = t.children;
  if (C(o) && C(s))
    for (let r = 0; r < o.length; r++) {
      const i = o[r];
      let l = s[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = s[r] = Ze(s[r]), l.el = i.el), !n && l.patchFlag !== -2 && pn(i, l)), l.type === tn && // avoid cached text nodes retaining detached dom nodes
      l.patchFlag !== -1 && (l.el = i.el), l.type === me && !l.el && (l.el = i.el), process.env.NODE_ENV !== "production" && l.el && (l.el.__vnode = l);
    }
}
function Zl(e) {
  const t = e.slice(), n = [0];
  let o, s, r, i, l;
  const c = e.length;
  for (o = 0; o < c; o++) {
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
function Cr(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Cr(t);
}
function cs(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const Ql = Symbol.for("v-scx"), ec = () => {
  {
    const e = Bt(Ql);
    return e || process.env.NODE_ENV !== "production" && y(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function Ot(e, t, n) {
  return process.env.NODE_ENV !== "production" && !A(t) && y(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), $r(e, t, n);
}
function $r(e, t, n = k) {
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
  const c = t && o || !t && r !== "post";
  let d;
  if (Yt) {
    if (r === "sync") {
      const O = ec();
      d = O.__watcherHandles || (O.__watcherHandles = []);
    } else if (!c) {
      const O = () => {
      };
      return O.stop = Z, O.resume = Z, O.pause = Z, O;
    }
  }
  const f = te;
  l.call = (O, $, w) => He(O, f, $, w);
  let p = !1;
  r === "post" ? l.scheduler = (O) => {
    de(O, f && f.suspense);
  } : r !== "sync" && (p = !0, l.scheduler = (O, $) => {
    $ ? O() : Fn(O);
  }), l.augmentJob = (O) => {
    t && (O.flags |= 4), p && (O.flags |= 2, f && (O.id = f.uid, O.i = f));
  };
  const g = Ui(e, t, l);
  return Yt && (d ? d.push(g) : c && g()), g;
}
function tc(e, t, n) {
  const o = this.proxy, s = q(e) ? e.includes(".") ? Ar(o, e) : () => o[e] : e.bind(o, o);
  let r;
  A(t) ? r = t : (r = t.handler, n = t);
  const i = nn(this), l = $r(s, r.bind(o), n);
  return i(), l;
}
function Ar(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let s = 0; s < n.length && o; s++)
      o = o[n[s]];
    return o;
  };
}
const nc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Oe(t)}Modifiers`] || e[`${ot(t)}Modifiers`];
function oc(e, t, ...n) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || k;
  if (process.env.NODE_ENV !== "production") {
    const {
      emitsOptions: f,
      propsOptions: [p]
    } = e;
    if (f)
      if (!(t in f))
        (!p || !(ct(Oe(t)) in p)) && y(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${ct(Oe(t))}" prop.`
        );
      else {
        const g = f[t];
        A(g) && (g(...n) || y(
          `Invalid event arguments: event validation failed for event "${t}".`
        ));
      }
  }
  let s = n;
  const r = t.startsWith("update:"), i = r && nc(o, t.slice(7));
  if (i && (i.trim && (s = n.map((f) => q(f) ? f.trim() : f)), i.number && (s = n.map(ei))), process.env.NODE_ENV !== "production" && il(e, t, s), process.env.NODE_ENV !== "production") {
    const f = t.toLowerCase();
    f !== t && o[ct(f)] && y(
      `Event "${f}" is emitted in component ${Un(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${ot(
        t
      )}" instead of "${t}".`
    );
  }
  let l, c = o[l = ct(t)] || // also try camelCase event handler (#2249)
  o[l = ct(Oe(t))];
  !c && r && (c = o[l = ct(ot(t))]), c && He(
    c,
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
const sc = /* @__PURE__ */ new WeakMap();
function Mr(e, t, n = !1) {
  const o = n ? sc : t.emitsCache, s = o.get(e);
  if (s !== void 0)
    return s;
  const r = e.emits;
  let i = {}, l = !1;
  if (!A(e)) {
    const c = (d) => {
      const f = Mr(d, t, !0);
      f && (l = !0, z(i, f));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !r && !l ? (W(e) && o.set(e, null), null) : (C(r) ? r.forEach((c) => i[c] = null) : z(i, r), W(e) && o.set(e, i), i);
}
function Hn(e, t) {
  return !e || !zt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), j(e, t[0].toLowerCase() + t.slice(1)) || j(e, ot(t)) || j(e, t));
}
let _o = !1;
function Vn() {
  _o = !0;
}
function us(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: s,
    propsOptions: [r],
    slots: i,
    attrs: l,
    emit: c,
    render: d,
    renderCache: f,
    props: p,
    data: g,
    setupState: O,
    ctx: $,
    inheritAttrs: w
  } = e, J = On(e);
  let G, L;
  process.env.NODE_ENV !== "production" && (_o = !1);
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
          f,
          process.env.NODE_ENV !== "production" ? Re(p) : p,
          O,
          g,
          $
        )
      ), L = l;
    } else {
      const S = t;
      process.env.NODE_ENV !== "production" && l === p && Vn(), G = Ne(
        S.length > 1 ? S(
          process.env.NODE_ENV !== "production" ? Re(p) : p,
          process.env.NODE_ENV !== "production" ? {
            get attrs() {
              return Vn(), Re(l);
            },
            slots: i,
            emit: c
          } : { attrs: l, slots: i, emit: c }
        ) : S(
          process.env.NODE_ENV !== "production" ? Re(p) : p,
          null
        )
      ), L = t.props ? l : rc(l);
    }
  } catch (S) {
    kt.length = 0, Zt(S, e, 1), G = Ee(me);
  }
  let H = G, pe;
  if (process.env.NODE_ENV !== "production" && G.patchFlag > 0 && G.patchFlag & 2048 && ([H, pe] = Ir(G)), L && w !== !1) {
    const S = Object.keys(L), { shapeFlag: Q } = H;
    if (S.length) {
      if (Q & 7)
        r && S.some(mn) && (L = ic(
          L,
          r
        )), H = st(H, L, !1, !0);
      else if (process.env.NODE_ENV !== "production" && !_o && H.type !== me) {
        const _e = Object.keys(l), ne = [], le = [];
        for (let Le = 0, Je = _e.length; Le < Je; Le++) {
          const be = _e[Le];
          zt(be) ? mn(be) || ne.push(be[2].toLowerCase() + be.slice(3)) : le.push(be);
        }
        le.length && y(
          `Extraneous non-props attributes (${le.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`
        ), ne.length && y(
          `Extraneous non-emits event listeners (${ne.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return n.dirs && (process.env.NODE_ENV !== "production" && !fs(H) && y(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), H = st(H, null, !1, !0), H.dirs = H.dirs ? H.dirs.concat(n.dirs) : n.dirs), n.transition && (process.env.NODE_ENV !== "production" && !fs(H) && y(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), Io(H, n.transition)), process.env.NODE_ENV !== "production" && pe ? pe(H) : G = H, On(J), G;
}
const Ir = (e) => {
  const t = e.children, n = e.dynamicChildren, o = Ho(t, !1);
  if (o) {
    if (process.env.NODE_ENV !== "production" && o.patchFlag > 0 && o.patchFlag & 2048)
      return Ir(o);
  } else return [e, void 0];
  const s = t.indexOf(o), r = n ? n.indexOf(o) : -1, i = (l) => {
    t[s] = l, n && (r > -1 ? n[r] = l : l.patchFlag > 0 && (e.dynamicChildren = [...n, l]));
  };
  return [Ne(o), i];
};
function Ho(e, t = !0) {
  let n;
  for (let o = 0; o < e.length; o++) {
    const s = e[o];
    if (Ln(s)) {
      if (s.type !== me || s.children === "v-if") {
        if (n)
          return;
        if (n = s, process.env.NODE_ENV !== "production" && t && n.patchFlag > 0 && n.patchFlag & 2048)
          return Ho(n.children);
      }
    } else
      return;
  }
  return n;
}
const rc = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || zt(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, ic = (e, t) => {
  const n = {};
  for (const o in e)
    (!mn(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
}, fs = (e) => e.shapeFlag & 7 || e.type === me;
function lc(e, t, n) {
  const { props: o, children: s, component: r } = e, { props: i, children: l, patchFlag: c } = t, d = r.emitsOptions;
  if (process.env.NODE_ENV !== "production" && (s || l) && Fe || t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return o ? as(o, i, d) : !!i;
    if (c & 8) {
      const f = t.dynamicProps;
      for (let p = 0; p < f.length; p++) {
        const g = f[p];
        if (i[g] !== o[g] && !Hn(d, g))
          return !0;
      }
    }
  } else
    return (s || l) && (!l || !l.$stable) ? !0 : o === i ? !1 : o ? i ? as(o, i, d) : !0 : !!i;
  return !1;
}
function as(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let s = 0; s < o.length; s++) {
    const r = o[s];
    if (t[r] !== e[r] && !Hn(n, r))
      return !0;
  }
  return !1;
}
function cc({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.el = e.el), o === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const Pr = (e) => e.__isSuspense;
function uc(e, t) {
  t && t.pendingBranch ? C(e) ? t.effects.push(...e) : t.effects.push(e) : rr(e);
}
const ve = Symbol.for("v-fgt"), tn = Symbol.for("v-txt"), me = Symbol.for("v-cmt"), dn = Symbol.for("v-stc"), kt = [];
let ge = null;
function De(e = !1) {
  kt.push(ge = e ? null : []);
}
function fc() {
  kt.pop(), ge = kt[kt.length - 1] || null;
}
let Jt = 1;
function ps(e, t = !1) {
  Jt += e, e < 0 && ge && t && (ge.hasOnce = !0);
}
function Rr(e) {
  return e.dynamicChildren = Jt > 0 ? ge || bt : null, fc(), Jt > 0 && ge && ge.push(e), e;
}
function We(e, t, n, o, s, r) {
  return Rr(
    Sn(
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
function Fr(e, t, n, o, s) {
  return Rr(
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
function Ln(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function It(e, t) {
  if (process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && e.component) {
    const n = an.get(t.type);
    if (n && n.has(e.component))
      return e.shapeFlag &= -257, t.shapeFlag &= -513, !1;
  }
  return e.type === t.type && e.key === t.key;
}
const ac = (...e) => Hr(
  ...e
), jr = ({ key: e }) => e ?? null, hn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? q(e) || Y(e) || A(e) ? { i: he, r: e, k: t, f: !!n } : e : null);
function Sn(e, t = null, n = null, o = 0, s = null, r = e === ve ? 0 : 1, i = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && jr(t),
    ref: t && hn(t),
    scopeId: ar,
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
  return l ? (Lo(c, n), r & 128 && e.normalize(c)) : n && (c.shapeFlag |= q(n) ? 8 : 16), process.env.NODE_ENV !== "production" && c.key !== c.key && y("VNode created with invalid key (NaN). VNode type:", c.type), Jt > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  ge && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && ge.push(c), c;
}
const Ee = process.env.NODE_ENV !== "production" ? ac : Hr;
function Hr(e, t = null, n = null, o = 0, s = null, r = !1) {
  if ((!e || e === yl) && (process.env.NODE_ENV !== "production" && !e && y(`Invalid vnode type when creating vnode: ${e}.`), e = me), Ln(e)) {
    const l = st(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Lo(l, n), Jt > 0 && !r && ge && (l.shapeFlag & 6 ? ge[ge.indexOf(e)] = l : ge.push(l)), l.patchFlag = -2, l;
  }
  if (Kr(e) && (e = e.__vccOpts), t) {
    t = pc(t);
    let { class: l, style: c } = t;
    l && !q(l) && (t.class = Mn(l)), W(c) && (vn(c) && !C(c) && (c = z({}, c)), t.style = Dt(c));
  }
  const i = q(e) ? 1 : Pr(e) ? 128 : ul(e) ? 64 : W(e) ? 4 : A(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && vn(e) && (e = I(e), y(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), Sn(
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
function pc(e) {
  return e ? vn(e) || xr(e) ? z({}, e) : e : null;
}
function st(e, t, n = !1, o = !1) {
  const { props: s, ref: r, patchFlag: i, children: l, transition: c } = e, d = t ? gc(s || {}, t) : s, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && jr(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? C(r) ? r.concat(hn(t)) : [r, hn(t)] : hn(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && i === -1 && C(l) ? l.map(Lr) : l,
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
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && st(e.ssContent),
    ssFallback: e.ssFallback && st(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && o && Io(
    f,
    c.clone(f)
  ), f;
}
function Lr(e) {
  const t = st(e);
  return C(e.children) && (t.children = e.children.map(Lr)), t;
}
function dc(e = " ", t = 0) {
  return Ee(tn, null, e, t);
}
function hc(e = "", t = !1) {
  return t ? (De(), Fr(me, null, e)) : Ee(me, null, e);
}
function Ne(e) {
  return e == null || typeof e == "boolean" ? Ee(me) : C(e) ? Ee(
    ve,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Ln(e) ? Ze(e) : Ee(tn, null, String(e));
}
function Ze(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : st(e);
}
function Lo(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (C(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Lo(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !xr(t) ? t._ctx = he : s === 3 && he && (he.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else A(t) ? (t = { default: t, _ctx: he }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [dc(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function gc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const s in o)
      if (s === "class")
        t.class !== o.class && (t.class = Mn([t.class, o.class]));
      else if (s === "style")
        t.style = Dt([t.style, o.style]);
      else if (zt(s)) {
        const r = t[s], i = o[s];
        i && r !== i && !(C(r) && r.includes(i)) && (t[s] = r ? [].concat(r, i) : i);
      } else s !== "" && (t[s] = o[s]);
  }
  return t;
}
function Me(e, t, n, o = null) {
  He(e, t, 7, [
    n,
    o
  ]);
}
const mc = Nr();
let _c = 0;
function vc(e, t, n) {
  const o = e.type, s = (t ? t.appContext : e.appContext) || mc, r = {
    uid: _c++,
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
    scope: new di(
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
    propsOptions: wr(o, s),
    emitsOptions: Mr(o, s),
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
  return process.env.NODE_ENV !== "production" ? r.ctx = Ol(r) : r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = oc.bind(null, r), e.ce && e.ce(r), r;
}
let te = null;
const Ur = () => te || he;
let Tn, vo;
{
  const e = Xt(), t = (n, o) => {
    let s;
    return (s = e[n]) || (s = e[n] = []), s.push(o), (r) => {
      s.length > 1 ? s.forEach((i) => i(r)) : s[0](r);
    };
  };
  Tn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => te = n
  ), vo = t(
    "__VUE_SSR_SETTERS__",
    (n) => Yt = n
  );
}
const nn = (e) => {
  const t = te;
  return Tn(e), e.scope.on(), () => {
    e.scope.off(), Tn(t);
  };
}, ds = () => {
  te && te.scope.off(), Tn(null);
}, Ec = /* @__PURE__ */ Ge("slot,component");
function Eo(e, { isNativeTag: t }) {
  (Ec(e) || t(e)) && y(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function Br(e) {
  return e.vnode.shapeFlag & 4;
}
let Yt = !1;
function bc(e, t = !1, n = !1) {
  t && vo(t);
  const { props: o, children: s } = e.vnode, r = Br(e);
  Pl(e, o, r, t), Gl(e, s, n || t);
  const i = r ? Nc(e, t) : void 0;
  return t && vo(!1), i;
}
function Nc(e, t) {
  var n;
  const o = e.type;
  if (process.env.NODE_ENV !== "production") {
    if (o.name && Eo(o.name, e.appContext.config), o.components) {
      const r = Object.keys(o.components);
      for (let i = 0; i < r.length; i++)
        Eo(r[i], e.appContext.config);
    }
    if (o.directives) {
      const r = Object.keys(o.directives);
      for (let i = 0; i < r.length; i++)
        pr(r[i]);
    }
    o.compilerOptions && yc() && y(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, vr), process.env.NODE_ENV !== "production" && xl(e);
  const { setup: s } = o;
  if (s) {
    Ve();
    const r = e.setupContext = s.length > 1 ? xc(e) : null, i = nn(e), l = wt(
      s,
      e,
      0,
      [
        process.env.NODE_ENV !== "production" ? Re(e.props) : e.props,
        r
      ]
    ), c = yo(l);
    if (Se(), i(), (c || e.sp) && !Ut(e) && dr(e), c) {
      if (l.then(ds, ds), t)
        return l.then((d) => {
          hs(e, d, t);
        }).catch((d) => {
          Zt(d, e, 0);
        });
      if (e.asyncDep = l, process.env.NODE_ENV !== "production" && !e.suspense) {
        const d = (n = o.name) != null ? n : "Anonymous";
        y(
          `Component <${d}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      hs(e, l, t);
  } else
    kr(e, t);
}
function hs(e, t, n) {
  A(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : W(t) ? (process.env.NODE_ENV !== "production" && Ln(t) && y(
    "setup() should not return VNodes directly - return a render function instead."
  ), process.env.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = er(t), process.env.NODE_ENV !== "production" && Dl(e)) : process.env.NODE_ENV !== "production" && t !== void 0 && y(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), kr(e, n);
}
const yc = () => !0;
function kr(e, t, n) {
  const o = e.type;
  e.render || (e.render = o.render || Z);
  {
    const s = nn(e);
    Ve();
    try {
      Vl(e);
    } finally {
      Se(), s();
    }
  }
  process.env.NODE_ENV !== "production" && !o.render && e.render === Z && !t && (o.template ? y(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
  ) : y("Component is missing template or render function: ", o));
}
const gs = process.env.NODE_ENV !== "production" ? {
  get(e, t) {
    return Vn(), X(e, "get", ""), e[t];
  },
  set() {
    return y("setupContext.attrs is readonly."), !1;
  },
  deleteProperty() {
    return y("setupContext.attrs is readonly."), !1;
  }
} : {
  get(e, t) {
    return X(e, "get", ""), e[t];
  }
};
function Oc(e) {
  return new Proxy(e.slots, {
    get(t, n) {
      return X(e, "get", "$slots"), t[n];
    }
  });
}
function xc(e) {
  const t = (n) => {
    if (process.env.NODE_ENV !== "production" && (e.exposed && y("expose() should be called only once per setup()."), n != null)) {
      let o = typeof n;
      o === "object" && (C(n) ? o = "array" : Y(n) && (o = "ref")), o !== "object" && y(
        `expose() should be passed a plain object, received ${o}.`
      );
    }
    e.exposed = n || {};
  };
  if (process.env.NODE_ENV !== "production") {
    let n, o;
    return Object.freeze({
      get attrs() {
        return n || (n = new Proxy(e.attrs, gs));
      },
      get slots() {
        return o || (o = Oc(e));
      },
      get emit() {
        return (s, ...r) => e.emit(s, ...r);
      },
      expose: t
    });
  } else
    return {
      attrs: new Proxy(e.attrs, gs),
      slots: e.slots,
      emit: e.emit,
      expose: t
    };
}
function Uo(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(er(Ii(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in dt)
        return dt[n](e);
    },
    has(t, n) {
      return n in t || n in dt;
    }
  })) : e.proxy;
}
const Dc = /(?:^|[-_])\w/g, wc = (e) => e.replace(Dc, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Wr(e, t = !0) {
  return A(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Un(e, t, n = !1) {
  let o = Wr(t);
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
  return o ? wc(o) : n ? "App" : "Anonymous";
}
function Kr(e) {
  return A(e) && "__vccOpts" in e;
}
const Bn = (e, t) => {
  const n = Hi(e, t, Yt);
  if (process.env.NODE_ENV !== "production") {
    const o = Ur();
    o && o.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function Vc() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, o = { style: "color:#eb2f96" }, s = {
    __vue_custom_formatter: !0,
    header(p) {
      if (!W(p))
        return null;
      if (p.__isVue)
        return ["div", e, "VueInstance"];
      if (Y(p)) {
        Ve();
        const g = p.value;
        return Se(), [
          "div",
          {},
          ["span", e, f(p)],
          "<",
          l(g),
          ">"
        ];
      } else {
        if (nt(p))
          return [
            "div",
            {},
            ["span", e, ie(p) ? "ShallowReactive" : "Reactive"],
            "<",
            l(p),
            `>${je(p) ? " (readonly)" : ""}`
          ];
        if (je(p))
          return [
            "div",
            {},
            ["span", e, ie(p) ? "ShallowReadonly" : "Readonly"],
            "<",
            l(p),
            ">"
          ];
      }
      return null;
    },
    hasBody(p) {
      return p && p.__isVue;
    },
    body(p) {
      if (p && p.__isVue)
        return [
          "div",
          {},
          ...r(p.$)
        ];
    }
  };
  function r(p) {
    const g = [];
    p.type.props && p.props && g.push(i("props", I(p.props))), p.setupState !== k && g.push(i("setup", p.setupState)), p.data !== k && g.push(i("data", I(p.data)));
    const O = c(p, "computed");
    O && g.push(i("computed", O));
    const $ = c(p, "inject");
    return $ && g.push(i("injected", $)), g.push([
      "div",
      {},
      [
        "span",
        {
          style: o.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: p }]
    ]), g;
  }
  function i(p, g) {
    return g = z({}, g), Object.keys(g).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        p
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
  function l(p, g = !0) {
    return typeof p == "number" ? ["span", t, p] : typeof p == "string" ? ["span", n, JSON.stringify(p)] : typeof p == "boolean" ? ["span", o, p] : W(p) ? ["object", { object: g ? I(p) : p }] : ["span", n, String(p)];
  }
  function c(p, g) {
    const O = p.type;
    if (A(O))
      return;
    const $ = {};
    for (const w in p.ctx)
      d(O, w, g) && ($[w] = p.ctx[w]);
    return $;
  }
  function d(p, g, O) {
    const $ = p[O];
    if (C($) && $.includes(g) || W($) && g in $ || p.extends && d(p.extends, g, O) || p.mixins && p.mixins.some((w) => d(w, g, O)))
      return !0;
  }
  function f(p) {
    return ie(p) ? "ShallowRef" : p.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(s) : window.devtoolsFormatters = [s];
}
const ms = "3.5.22", Ke = process.env.NODE_ENV !== "production" ? y : Z;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let bo;
const _s = typeof window < "u" && window.trustedTypes;
if (_s)
  try {
    bo = /* @__PURE__ */ _s.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch (e) {
    process.env.NODE_ENV !== "production" && Ke(`Error creating trusted types policy: ${e}`);
  }
const Gr = bo ? (e) => bo.createHTML(e) : (e) => e, Sc = "http://www.w3.org/2000/svg", Tc = "http://www.w3.org/1998/Math/MathML", Be = typeof document < "u" ? document : null, vs = Be && /* @__PURE__ */ Be.createElement("template"), Cc = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const s = t === "svg" ? Be.createElementNS(Sc, e) : t === "mathml" ? Be.createElementNS(Tc, e) : n ? Be.createElement(e, { is: n }) : Be.createElement(e);
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
      vs.innerHTML = Gr(
        o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e
      );
      const l = vs.content;
      if (o === "svg" || o === "mathml") {
        const c = l.firstChild;
        for (; c.firstChild; )
          l.appendChild(c.firstChild);
        l.removeChild(c);
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
}, $c = Symbol("_vtc");
function Ac(e, t, n) {
  const o = e[$c];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Es = Symbol("_vod"), Mc = Symbol("_vsh"), Ic = Symbol(process.env.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : ""), Pc = /(?:^|;)\s*display\s*:/;
function Rc(e, t, n) {
  const o = e.style, s = q(n);
  let r = !1;
  if (n && !s) {
    if (t)
      if (q(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && gn(o, l, "");
        }
      else
        for (const i in t)
          n[i] == null && gn(o, i, "");
    for (const i in n)
      i === "display" && (r = !0), gn(o, i, n[i]);
  } else if (s) {
    if (t !== n) {
      const i = o[Ic];
      i && (n += ";" + i), o.cssText = n, r = Pc.test(n);
    }
  } else t && e.removeAttribute("style");
  Es in e && (e[Es] = r ? o.display : "", e[Mc] && (o.display = "none"));
}
const Fc = /[^\\];\s*$/, bs = /\s*!important$/;
function gn(e, t, n) {
  if (C(n))
    n.forEach((o) => gn(e, t, o));
  else if (n == null && (n = ""), process.env.NODE_ENV !== "production" && Fc.test(n) && Ke(
    `Unexpected semicolon at the end of '${t}' style value: '${n}'`
  ), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = jc(e, t);
    bs.test(n) ? e.setProperty(
      ot(o),
      n.replace(bs, ""),
      "important"
    ) : e[o] = n;
  }
}
const Ns = ["Webkit", "Moz", "ms"], no = {};
function jc(e, t) {
  const n = no[t];
  if (n)
    return n;
  let o = Oe(t);
  if (o !== "filter" && o in e)
    return no[t] = o;
  o = An(o);
  for (let s = 0; s < Ns.length; s++) {
    const r = Ns[s] + o;
    if (r in e)
      return no[t] = r;
  }
  return t;
}
const ys = "http://www.w3.org/1999/xlink";
function Os(e, t, n, o, s, r = pi(t)) {
  o && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(ys, t.slice(6, t.length)) : e.setAttributeNS(ys, t, n) : n == null || r && !Is(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : rt(n) ? String(n) : n
  );
}
function xs(e, t, n, o, s) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Gr(n) : n);
    return;
  }
  const r = e.tagName;
  if (t === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const l = r === "OPTION" ? e.getAttribute("value") || "" : e.value, c = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== c || !("_value" in e)) && (e.value = c), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let i = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = Is(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch (l) {
    process.env.NODE_ENV !== "production" && !i && Ke(
      `Failed setting prop "${t}" on <${r.toLowerCase()}>: value ${n} is invalid.`,
      l
    );
  }
  i && e.removeAttribute(s || t);
}
function Hc(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function Lc(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
const Ds = Symbol("_vei");
function Uc(e, t, n, o, s = null) {
  const r = e[Ds] || (e[Ds] = {}), i = r[t];
  if (o && i)
    i.value = process.env.NODE_ENV !== "production" ? Vs(o, t) : o;
  else {
    const [l, c] = Bc(t);
    if (o) {
      const d = r[t] = Kc(
        process.env.NODE_ENV !== "production" ? Vs(o, t) : o,
        s
      );
      Hc(e, l, d, c);
    } else i && (Lc(e, l, i, c), r[t] = void 0);
  }
}
const ws = /(?:Once|Passive|Capture)$/;
function Bc(e) {
  let t;
  if (ws.test(e)) {
    t = {};
    let o;
    for (; o = e.match(ws); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : ot(e.slice(2)), t];
}
let oo = 0;
const kc = /* @__PURE__ */ Promise.resolve(), Wc = () => oo || (kc.then(() => oo = 0), oo = Date.now());
function Kc(e, t) {
  const n = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= n.attached)
      return;
    He(
      Gc(o, n.value),
      t,
      5,
      [o]
    );
  };
  return n.value = e, n.attached = Wc(), n;
}
function Vs(e, t) {
  return A(e) || C(e) ? e : (Ke(
    `Wrong type passed as event handler to ${t} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof e}.`
  ), Z);
}
function Gc(e, t) {
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
const Ss = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, qc = (e, t, n, o, s, r) => {
  const i = s === "svg";
  t === "class" ? Ac(e, o, i) : t === "style" ? Rc(e, n, o) : zt(t) ? mn(t) || Uc(e, t, n, o, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Jc(e, t, o, i)) ? (xs(e, t, o), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Os(e, t, o, i, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !q(o)) ? xs(e, Oe(t), o, r, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), Os(e, t, o, i));
};
function Jc(e, t, n, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Ss(t) && A(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
      return !1;
  }
  return Ss(t) && q(n) ? !1 : t in e;
}
const Yc = ["ctrl", "shift", "alt", "meta"], zc = {
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
  exact: (e, t) => Yc.some((n) => e[`${n}Key`] && !t.includes(n))
}, Xc = (e, t) => {
  const n = e._withMods || (e._withMods = {}), o = t.join(".");
  return n[o] || (n[o] = ((s, ...r) => {
    for (let i = 0; i < t.length; i++) {
      const l = zc[t[i]];
      if (l && l(s, t)) return;
    }
    return e(s, ...r);
  }));
}, Zc = /* @__PURE__ */ z({ patchProp: qc }, Cc);
let Ts;
function Qc() {
  return Ts || (Ts = Yl(Zc));
}
const eu = ((...e) => {
  const t = Qc().createApp(...e);
  process.env.NODE_ENV !== "production" && (nu(t), ou(t));
  const { mount: n } = t;
  return t.mount = (o) => {
    const s = su(o);
    if (!s) return;
    const r = t._component;
    !A(r) && !r.render && !r.template && (r.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const i = n(s, !1, tu(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), i;
  }, t;
});
function tu(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function nu(e) {
  Object.defineProperty(e.config, "isNativeTag", {
    value: (t) => ci(t) || ui(t) || fi(t),
    writable: !1
  });
}
function ou(e) {
  {
    const t = e.config.isCustomElement;
    Object.defineProperty(e.config, "isCustomElement", {
      get() {
        return t;
      },
      set() {
        Ke(
          "The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead."
        );
      }
    });
    const n = e.config.compilerOptions, o = 'The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader\'s `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc';
    Object.defineProperty(e.config, "compilerOptions", {
      get() {
        return Ke(o), n;
      },
      set() {
        Ke(o);
      }
    });
  }
}
function su(e) {
  if (q(e)) {
    const t = document.querySelector(e);
    return process.env.NODE_ENV !== "production" && !t && Ke(
      `Failed to mount app: mount target selector "${e}" returned null.`
    ), t;
  }
  return process.env.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && Ke(
    'mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs'
  ), e;
}
/**
* vue v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function ru() {
  Vc();
}
process.env.NODE_ENV !== "production" && ru();
const iu = /* @__PURE__ */ en({
  __name: "ChatEntryText",
  props: {
    text: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => Wt(t.text);
  }
});
function xt(e) {
  const t = {};
  if (!e)
    return t;
  let n = null, o = null, s = null, r = null;
  Object.keys(e).forEach((l) => {
    if (l.startsWith("_set_") || `_set_${l}` in e && !e[`_set_${l}`])
      return;
    const c = e[l];
    switch (l) {
      case "marginVert":
        n = c;
        break;
      case "marginHorz":
        o = c;
        break;
      case "paddingVert":
        r = c;
        break;
      case "paddingHorz":
        s = c;
        break;
      case "borderWidth":
        t.borderWidth = `${c}px`, t.borderStyle = "solid";
        break;
      case "borderRadius":
        t.borderRadius = `${c}px`;
        break;
      case "fontSize":
        t.fontSize = typeof c == "number" || /^\d+(\.\d+)?$/.test(c) ? `${c}px` : c;
        break;
      case "opacity100":
        t.opacity = c / 100;
        break;
      default:
        t[l] = (l.startsWith("padding") || l.startsWith("margin")) && (typeof c == "number" || /^\d+(\.\d+)?$/.test(c)) ? `${c}px` : c;
        break;
    }
  });
  const i = (l, c, d) => {
    if (l !== null) {
      const f = `${l}px`;
      c !== null ? t[`${d}`] = `${f} ${c}px` : (t[`${d}Top`] = f, t[`${d}Bottom`] = f);
    } else if (c !== null) {
      const f = `${c}px`;
      t[`${d}Left`] = f, t[`${d}Right`] = f;
    }
  };
  return i(n, o, "margin"), i(r, s, "padding"), t;
}
function so() {
  const e = /* @__PURE__ */ new Date();
  return e.getHours() * 3600 + e.getMinutes() * 60 + e.getSeconds();
}
function lu(e) {
  const t = Math.floor(e / 3600), o = Math.floor(e % 3600 / 60).toString().padStart(2, "0"), r = (e % 60).toString().padStart(2, "0");
  return `${t}:${o}:${r}`;
}
const qr = Symbol("GlobalJsonConfig"), cu = {
  install(e, t) {
    e.provide(qr, t);
  }
};
function kn() {
  const e = Bt(qr);
  if (!e)
    throw new Error("Plugin GlobalJsonConfig not found.");
  return e;
}
const uu = { class: "entry" }, fu = {
  key: 1,
  class: "typing"
}, au = /* @__PURE__ */ en({
  __name: "ChatEntry",
  props: {
    entry: {}
  },
  setup(e) {
    const t = kn(), n = e, o = {
      ...xt(n.entry.type === "bot" ? t.botEntryStyle : t.userEntryStyle),
      marginTop: `${t.listGap}px`
    }, s = Bn(() => n.entry.type === "bot" && n.entry.isStillTyping);
    return (r, i) => (De(), We("div", {
      class: Mn(["entrcont", n.entry.type])
    }, [
      s.value ? s.value ? (De(), We("div", fu, Wt(et(t).chatBotTypingText), 1)) : hc("", !0) : (De(), We("div", {
        key: 0,
        class: "entrtimecont",
        style: o
      }, [
        Sn("div", uu, [
          Ee(iu, {
            text: n.entry.text
          }, null, 8, ["text"])
        ]),
        Sn("div", {
          class: "time",
          style: Dt(et(xt)(et(t).timeStyle))
        }, Wt(et(lu)(n.entry.time)), 5)
      ]))
    ], 2));
  }
}), Wn = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, s] of t)
    n[o] = s;
  return n;
}, pu = /* @__PURE__ */ Wn(au, [["__scopeId", "data-v-e8eb9013"]]), du = /* @__PURE__ */ en({
  __name: "ChatList",
  props: {
    list: {}
  },
  setup(e) {
    const t = kn(), n = {
      ...xt(t.listStyle),
      padding: `0 ${t.listGap}px ${t.listGap}px ${t.listGap}px`
    };
    t.listHeight && t.listHeight > 0 && (n.height = `${t.listHeight}px`);
    const o = e, s = Qs(null);
    return Ot(
      // Nur scrollen, wenn ein Element hinzugefügt wurde oder "typing" beendet
      () => {
        const r = o.list.length, i = o.list[r - 1], l = i?.type === "bot" && i.isStillTyping;
        return [r, l];
      },
      (r, i) => {
        i && (r[0] > i[0] || r[1] !== i[1]) && or(() => {
          s.value && (s.value.scrollTop = s.value.scrollHeight);
        });
      }
    ), (r, i) => (De(), We("div", {
      class: "chat-list",
      style: n,
      ref_key: "listContainer",
      ref: s
    }, [
      (De(!0), We(ve, null, _r(o.list, (l) => (De(), Fr(pu, {
        key: l.id,
        entry: l
      }, null, 8, ["entry"]))), 128))
    ], 512));
  }
}), hu = /* @__PURE__ */ Wn(du, [["__scopeId", "data-v-09008aad"]]), gu = ["onClick"], mu = /* @__PURE__ */ en({
  __name: "ChatInput",
  props: {
    label: {}
  },
  emits: ["addEntry"],
  setup(e, { emit: t }) {
    const n = kn(), o = {
      ...xt(n.inputStyle),
      minHeight: `${n.inputRows}rem`
    }, s = xt(n.inputStyleUser), r = e, i = t, l = Bn(() => n.chat.user.filter((c) => c.label === r.label));
    return (c, d) => (De(), We("div", {
      class: "outer",
      style: o
    }, [
      (De(!0), We(ve, null, _r(l.value, (f, p) => (De(), We("div", {
        key: p,
        style: Dt(et(s)),
        onClick: Xc((g) => i("addEntry", f), ["prevent"])
      }, Wt(f.text), 13, gu))), 128))
    ]));
  }
}), _u = /* @__PURE__ */ Wn(mu, [["__scopeId", "data-v-e4cde896"]]), vu = /* @__PURE__ */ en({
  __name: "App",
  setup(e, { expose: t }) {
    const n = kn();
    n.chat.user.forEach((c) => {
      c.label = c.label.trim(), c.next = c.next?.trim();
    }), n.chat.bot.forEach((c) => {
      c.label = c.label.trim();
    });
    const o = Qs({
      curr: [],
      currLabel: "START",
      prev: []
    });
    Ot(
      () => o.value.currLabel,
      (c) => {
        const d = n.chat.bot.find((f) => f.label === c);
        if (d) {
          const f = o.value.curr.length;
          if (f > 0 && o.value.curr[f - 1]?.type === "bot" && o.value.curr[f - 1]?.text === d.text)
            return;
          const p = f > 0 && n.botDelay || 0, O = {
            id: f + 1,
            type: "bot",
            isStillTyping: !0,
            text: d.text,
            time: so()
          };
          o.value.curr.push(O);
          const $ = o.value.curr.length, w = {
            event: "ENTRY_ADDED_BOT",
            text: d.text
          };
          n.fsm?.logEvent(w), setTimeout(() => {
            if ($ === o.value.curr.length) {
              const J = o.value.curr[$ - 1];
              delete J.isStillTyping, J.time = so();
            }
          }, p);
        } else
          n.fsm?.logEvent(`BOT_RESPONSE_NOT_FOUND: ${c}`);
      },
      { immediate: !0 }
    );
    const s = Bn(() => {
      const c = o.value.curr.length;
      if (c === 0) return "";
      const d = o.value.curr[c - 1];
      return d?.type === "bot" && !d.isStillTyping ? o.value.currLabel : "";
    });
    t({
      chat: o
      // Freigegebene Property
    });
    const r = () => {
      o.value.curr.length > 0 && o.value.prev.push(o.value.curr), o.value.curr = [], o.value.currLabel = "START", n.fsm?.logEvent("CHAT_RESTARTED"), i(o.value.currLabel);
    }, i = (c) => {
      if (c === "RESTART") {
        r();
        return;
      } else if (c !== "END")
        if (c === "START") {
          const d = n.chat.bot.find((f) => f.label === "START") || n.chat.bot[0];
          d ? o.value.currLabel = d.label : (n.fsm?.logEvent("CHAT_START_LABEL_NOT_FOUND"), c = "END");
        } else if (c.length > 0) {
          const d = n.chat.bot.find((f) => f.label === c);
          d ? o.value.currLabel = d.label : (n.fsm?.logEvent(`CHAT_LABEL_NOT_FOUND: ${c}`), c = "END");
        } else {
          const d = n.chat.bot.findIndex(
            (f) => f.label === o.value.currLabel
          );
          d >= 0 && d < n.chat.bot.length - 1 ? o.value.currLabel = n.chat.bot[d + 1].label : c = "END";
        }
      if (c === "END") {
        n.fsm?.logEvent("CHAT_ENDED"), n.fsm?.triggerEvent("RESPONSE");
        return;
      }
    };
    gr(() => i(o.value.currLabel));
    const l = (c) => {
      if (c.next != "RESTART" && c.next !== "END") {
        const f = o.value.curr.length + 1;
        o.value.curr.push({
          id: f,
          type: "user",
          text: c.text,
          time: so()
        });
      }
      const d = {
        event: "ENTRY_ADDED_USER",
        text: c.text
      };
      n.fsm?.logEvent(d), i(c.next || "");
    };
    return (c, d) => (De(), We("div", {
      style: Dt(et(xt)(et(n).outerStyle))
    }, [
      Ee(hu, {
        class: "list",
        list: o.value.curr
      }, null, 8, ["list"]),
      Ee(_u, {
        label: s.value,
        onAddEntry: l
      }, null, 8, ["label"])
    ], 4));
  }
}), Eu = /* @__PURE__ */ Wn(vu, [["__scopeId", "data-v-e75c98ca"]]);
function bu(e) {
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
function Nu(e) {
  const t = {}, n = nt(e) ? I(e) : e;
  for (const o in n)
    if (Object.prototype.hasOwnProperty.call(n, o)) {
      const s = n[o];
      Y(s) ? t[o] = s.value : t[o] = s;
    }
  return t;
}
const Ou = (e, t, n, o) => {
  o && (t.postMessagePayload = o), bu(t);
  const s = eu(Eu);
  s.use(cu, t);
  const i = s.mount(e);
  return n && Ot(
    () => Nu(i),
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
  Ou as initializeAndMount
};
