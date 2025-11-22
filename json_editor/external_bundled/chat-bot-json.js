/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function qe(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const K = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, bt = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], Z = () => {
}, Cs = () => !1, zt = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), gn = (e) => e.startsWith("onUpdate:"), Y = Object.assign, No = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Xr = Object.prototype.hasOwnProperty, j = (e, t) => Xr.call(e, t), C = Array.isArray, ft = (e) => Cn(e) === "[object Map]", $s = (e) => Cn(e) === "[object Set]", A = (e) => typeof e == "function", q = (e) => typeof e == "string", rt = (e) => typeof e == "symbol", W = (e) => e !== null && typeof e == "object", yo = (e) => (W(e) || A(e)) && A(e.then) && A(e.catch), As = Object.prototype.toString, Cn = (e) => As.call(e), Oo = (e) => Cn(e).slice(8, -1), Ms = (e) => Cn(e) === "[object Object]", Do = (e) => q(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ft = /* @__PURE__ */ qe(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Zr = /* @__PURE__ */ qe(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), $n = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, Qr = /-\w/g, Oe = $n(
  (e) => e.replace(Qr, (t) => t.slice(1).toUpperCase())
), ei = /\B([A-Z])/g, ot = $n(
  (e) => e.replace(ei, "-$1").toLowerCase()
), An = $n((e) => e.charAt(0).toUpperCase() + e.slice(1)), ct = $n(
  (e) => e ? `on${An(e)}` : ""
), tt = (e, t) => !Object.is(e, t), $t = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, mn = (e, t, n, o = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: o,
    value: n
  });
}, ti = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let qo;
const Yt = () => qo || (qo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function xt(e) {
  if (C(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], s = q(o) ? ri(o) : xt(o);
      if (s)
        for (const r in s)
          t[r] = s[r];
    }
    return t;
  } else if (q(e) || W(e))
    return e;
}
const ni = /;(?![^(]*\))/g, oi = /:([^]+)/, si = /\/\*[^]*?\*\//g;
function ri(e) {
  const t = {};
  return e.replace(si, "").split(ni).forEach((n) => {
    if (n) {
      const o = n.split(oi);
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
const ii = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", li = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", ci = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", ui = /* @__PURE__ */ qe(ii), fi = /* @__PURE__ */ qe(li), ai = /* @__PURE__ */ qe(ci), pi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", di = /* @__PURE__ */ qe(pi);
function Ps(e) {
  return !!e || e === "";
}
const Is = (e) => !!(e && e.__v_isRef === !0), _n = (e) => q(e) ? e : e == null ? "" : C(e) || W(e) && (e.toString === As || !A(e.toString)) ? Is(e) ? _n(e.value) : JSON.stringify(e, Rs, 2) : String(e), Rs = (e, t) => Is(t) ? Rs(e, t.value) : ft(t) ? {
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
class hi {
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
function gi() {
  return ae;
}
let U;
const zn = /* @__PURE__ */ new WeakSet();
class Fs {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ae && ae.active && ae.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, zn.has(this) && (zn.delete(this), this.trigger()));
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
    const t = U, n = De;
    U = this, De = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && U !== this && we(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), Us(this), U = t, De = n, this.flags &= -3;
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
    this.flags & 64 ? zn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
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
function xo() {
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
    o.version === -1 ? (o === n && (n = s), Vo(o), mi(o)) : t = o, o.dep.activeLink = o.prevActiveLink, o.prevActiveLink = void 0, o = s;
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
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Wt) || (e.globalVersion = Wt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !ro(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = U, o = De;
  U = e, De = !0;
  try {
    Ls(e);
    const s = e.fn(e._value);
    (t.version === 0 || tt(s, e._value)) && (e.flags |= 128, e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    U = n, De = o, Us(e), e.flags &= -3;
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
function mi(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let De = !0;
const Ks = [];
function Ve() {
  Ks.push(De), De = !1;
}
function Se() {
  const e = Ks.pop();
  De = e === void 0 ? !0 : e;
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
let Wt = 0;
class _i {
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
    if (!U || !De || U === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== U)
      n = this.activeLink = new _i(U, this), U.deps ? (n.prevDep = U.depsTail, U.depsTail.nextDep = n, U.depsTail = n) : U.deps = U.depsTail = n, Ws(n);
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
    this.version++, Wt++, this.notify(t);
  }
  notify(t) {
    xo();
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
), kt = Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function X(e, t, n) {
  if (De && U) {
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
function Ie(e, t, n, o, s, r) {
  const i = io.get(e);
  if (!i) {
    Wt++;
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
  if (xo(), t === "clear")
    i.forEach(l);
  else {
    const u = C(e), d = u && Do(n);
    if (u && n === "length") {
      const a = Number(o);
      i.forEach((p, g) => {
        (g === "length" || g === kt || !rt(g) && g >= a) && l(p);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), d && l(i.get(kt)), t) {
        case "add":
          u ? d && l(i.get("length")) : (l(i.get(at)), ft(e) && l(i.get(lo)));
          break;
        case "delete":
          u || (l(i.get(at)), ft(e) && l(i.get(lo)));
          break;
        case "set":
          ft(e) && l(i.get(at));
          break;
      }
  }
  wo();
}
function mt(e) {
  const t = P(e);
  return t === e ? t : (X(t, "iterate", kt), ie(e) ? t : t.map(ee));
}
function Pn(e) {
  return X(e = P(e), "iterate", kt), e;
}
const vi = {
  __proto__: null,
  [Symbol.iterator]() {
    return Yn(this, Symbol.iterator, ee);
  },
  concat(...e) {
    return mt(this).concat(
      ...e.map((t) => C(t) ? mt(t) : t)
    );
  },
  entries() {
    return Yn(this, "entries", (e) => (e[1] = ee(e[1]), e));
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
    return zo(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return zo(this, "reduceRight", e, t);
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
    return Yn(this, "values", ee);
  }
};
function Yn(e, t, n) {
  const o = Pn(e), s = o[t]();
  return o !== e && !ie(e) && (s._next = s.next, s.next = () => {
    const r = s._next();
    return r.done || (r.value = n(r.value)), r;
  }), s;
}
const Ei = Array.prototype;
function Ue(e, t, n, o, s, r) {
  const i = Pn(e), l = i !== e && !ie(e), u = i[t];
  if (u !== Ei[t]) {
    const p = u.apply(e, r);
    return l ? ee(p) : p;
  }
  let d = n;
  i !== e && (l ? d = function(p, g) {
    return n.call(this, ee(p), g, e);
  } : n.length > 2 && (d = function(p, g) {
    return n.call(this, p, g, e);
  }));
  const a = u.call(i, d, o);
  return l && s ? s(a) : a;
}
function zo(e, t, n, o) {
  const s = Pn(e);
  let r = n;
  return s !== e && (ie(e) ? n.length > 3 && (r = function(i, l, u) {
    return n.call(this, i, l, u, e);
  }) : r = function(i, l, u) {
    return n.call(this, i, ee(l), u, e);
  }), s[t](r, ...o);
}
function Xn(e, t, n) {
  const o = P(e);
  X(o, "iterate", kt);
  const s = o[t](...n);
  return (s === -1 || s === !1) && vn(n[0]) ? (n[0] = P(n[0]), o[t](...n)) : s;
}
function At(e, t, n = []) {
  Ve(), xo();
  const o = P(e)[t].apply(e, n);
  return wo(), Se(), o;
}
const bi = /* @__PURE__ */ qe("__proto__,__v_isRef,__isVue"), ks = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(rt)
);
function Ni(e) {
  rt(e) || (e = String(e));
  const t = P(this);
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
      return o === (s ? r ? Zs : Xs : r ? Ys : zs).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const i = C(t);
    if (!s) {
      let u;
      if (i && (u = vi[n]))
        return u;
      if (n === "hasOwnProperty")
        return Ni;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      z(t) ? t : o
    );
    if ((rt(n) ? ks.has(n) : bi(n)) || (s || X(t, "get", n), r))
      return l;
    if (z(l)) {
      const u = i && Do(n) ? l : l.value;
      return s && W(u) ? uo(u) : u;
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
      const u = je(r);
      if (!ie(o) && !je(o) && (r = P(r), o = P(o)), !C(t) && z(r) && !z(o))
        return u ? (process.env.NODE_ENV !== "production" && we(
          `Set operation on key "${String(n)}" failed: target is readonly.`,
          t[n]
        ), !0) : (r.value = o, !0);
    }
    const i = C(t) && Do(n) ? Number(n) < t.length : j(t, n), l = Reflect.set(
      t,
      n,
      o,
      z(t) ? t : s
    );
    return t === P(s) && (i ? tt(o, r) && Ie(t, "set", n, o, r) : Ie(t, "add", n, o)), l;
  }
  deleteProperty(t, n) {
    const o = j(t, n), s = t[n], r = Reflect.deleteProperty(t, n);
    return r && o && Ie(t, "delete", n, void 0, s), r;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!rt(n) || !ks.has(n)) && X(t, "has", n), o;
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
const yi = /* @__PURE__ */ new qs(), Oi = /* @__PURE__ */ new Js(), Di = /* @__PURE__ */ new qs(!0), xi = /* @__PURE__ */ new Js(!0), co = (e) => e, sn = (e) => Reflect.getPrototypeOf(e);
function wi(e, t, n) {
  return function(...o) {
    const s = this.__v_raw, r = P(s), i = ft(r), l = e === "entries" || e === Symbol.iterator && i, u = e === "keys" && i, d = s[e](...o), a = n ? co : t ? En : ee;
    return !t && X(
      r,
      "iterate",
      u ? lo : at
    ), {
      // iterator protocol
      next() {
        const { value: p, done: g } = d.next();
        return g ? { value: p, done: g } : {
          value: l ? [a(p[0]), a(p[1])] : a(p),
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
function rn(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      we(
        `${An(e)} operation ${n}failed: target is readonly.`,
        P(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Vi(e, t) {
  const n = {
    get(s) {
      const r = this.__v_raw, i = P(r), l = P(s);
      e || (tt(s, l) && X(i, "get", s), X(i, "get", l));
      const { has: u } = sn(i), d = t ? co : e ? En : ee;
      if (u.call(i, s))
        return d(r.get(s));
      if (u.call(i, l))
        return d(r.get(l));
      r !== i && r.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !e && X(P(s), "iterate", at), s.size;
    },
    has(s) {
      const r = this.__v_raw, i = P(r), l = P(s);
      return e || (tt(s, l) && X(i, "has", s), X(i, "has", l)), s === l ? r.has(s) : r.has(s) || r.has(l);
    },
    forEach(s, r) {
      const i = this, l = i.__v_raw, u = P(l), d = t ? co : e ? En : ee;
      return !e && X(u, "iterate", at), l.forEach((a, p) => s.call(r, d(a), d(p), i));
    }
  };
  return Y(
    n,
    e ? {
      add: rn("add"),
      set: rn("set"),
      delete: rn("delete"),
      clear: rn("clear")
    } : {
      add(s) {
        !t && !ie(s) && !je(s) && (s = P(s));
        const r = P(this);
        return sn(r).has.call(r, s) || (r.add(s), Ie(r, "add", s, s)), this;
      },
      set(s, r) {
        !t && !ie(r) && !je(r) && (r = P(r));
        const i = P(this), { has: l, get: u } = sn(i);
        let d = l.call(i, s);
        d ? process.env.NODE_ENV !== "production" && Yo(i, l, s) : (s = P(s), d = l.call(i, s));
        const a = u.call(i, s);
        return i.set(s, r), d ? tt(r, a) && Ie(i, "set", s, r, a) : Ie(i, "add", s, r), this;
      },
      delete(s) {
        const r = P(this), { has: i, get: l } = sn(r);
        let u = i.call(r, s);
        u ? process.env.NODE_ENV !== "production" && Yo(r, i, s) : (s = P(s), u = i.call(r, s));
        const d = l ? l.call(r, s) : void 0, a = r.delete(s);
        return u && Ie(r, "delete", s, void 0, d), a;
      },
      clear() {
        const s = P(this), r = s.size !== 0, i = process.env.NODE_ENV !== "production" ? ft(s) ? new Map(s) : new Set(s) : void 0, l = s.clear();
        return r && Ie(
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
    n[s] = wi(s, e, t);
  }), n;
}
function In(e, t) {
  const n = Vi(e, t);
  return (o, s, r) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get(
    j(n, s) && s in o ? n : o,
    s,
    r
  );
}
const Si = {
  get: /* @__PURE__ */ In(!1, !1)
}, Ti = {
  get: /* @__PURE__ */ In(!1, !0)
}, Ci = {
  get: /* @__PURE__ */ In(!0, !1)
}, $i = {
  get: /* @__PURE__ */ In(!0, !0)
};
function Yo(e, t, n) {
  const o = P(n);
  if (o !== n && t.call(e, o)) {
    const s = Oo(e);
    we(
      `Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const zs = /* @__PURE__ */ new WeakMap(), Ys = /* @__PURE__ */ new WeakMap(), Xs = /* @__PURE__ */ new WeakMap(), Zs = /* @__PURE__ */ new WeakMap();
function Ai(e) {
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
function Mi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ai(Oo(e));
}
function To(e) {
  return je(e) ? e : Rn(
    e,
    !1,
    yi,
    Si,
    zs
  );
}
function Pi(e) {
  return Rn(
    e,
    !1,
    Di,
    Ti,
    Ys
  );
}
function uo(e) {
  return Rn(
    e,
    !0,
    Oi,
    Ci,
    Xs
  );
}
function Re(e) {
  return Rn(
    e,
    !0,
    xi,
    $i,
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
  const r = Mi(e);
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
function P(e) {
  const t = e && e.__v_raw;
  return t ? P(t) : e;
}
function Ii(e) {
  return !j(e, "__v_skip") && Object.isExtensible(e) && mn(e, "__v_skip", !0), e;
}
const ee = (e) => W(e) ? To(e) : e, En = (e) => W(e) ? uo(e) : e;
function z(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function Qs(e) {
  return Ri(e, !1);
}
function Ri(e, t) {
  return z(e) ? e : new Fi(e, t);
}
class Fi {
  constructor(t, n) {
    this.dep = new So(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : P(t), this._value = n ? t : ee(t), this.__v_isShallow = n;
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
    t = o ? t : P(t), tt(t, n) && (this._rawValue = t, this._value = o ? t : ee(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }) : this.dep.trigger());
  }
}
function We(e) {
  return z(e) ? e.value : e;
}
const ji = {
  get: (e, t, n) => t === "__v_raw" ? e : We(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const s = e[t];
    return z(s) && !z(n) ? (s.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function er(e) {
  return nt(e) ? e : new Proxy(e, ji);
}
class Hi {
  constructor(t, n, o) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new So(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Wt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = o;
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
function Li(e, t, n = !1) {
  let o, s;
  A(e) ? o = e : (o = e.get, s = e.set);
  const r = new Hi(o, s, n);
  return process.env.NODE_ENV, r;
}
const ln = {}, bn = /* @__PURE__ */ new WeakMap();
let ut;
function Ui(e, t = !1, n = ut) {
  if (n) {
    let o = bn.get(n);
    o || bn.set(n, o = []), o.push(e);
  } else process.env.NODE_ENV !== "production" && !t && we(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function Bi(e, t, n = K) {
  const { immediate: o, deep: s, once: r, scheduler: i, augmentJob: l, call: u } = n, d = (S) => {
    (n.onWarn || we)(
      "Invalid watch source: ",
      S,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, a = (S) => s ? S : ie(S) || s === !1 || s === 0 ? et(S, 1) : et(S);
  let p, g, O, $, w = !1, J = !1;
  if (z(e) ? (g = () => e.value, w = ie(e)) : nt(e) ? (g = () => a(e), w = !0) : C(e) ? (J = !0, w = e.some((S) => nt(S) || ie(S)), g = () => e.map((S) => {
    if (z(S))
      return S.value;
    if (nt(S))
      return a(S);
    if (A(S))
      return u ? u(S, 2) : S();
    process.env.NODE_ENV !== "production" && d(S);
  })) : A(e) ? t ? g = u ? () => u(e, 2) : e : g = () => {
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
      return u ? u(e, 3, [$]) : e($);
    } finally {
      ut = S;
    }
  } : (g = Z, process.env.NODE_ENV !== "production" && d(e)), t && s) {
    const S = g, Q = s === !0 ? 1 / 0 : s;
    g = () => et(S(), Q);
  }
  const G = gi(), L = () => {
    p.stop(), G && G.active && No(G.effects, p);
  };
  if (r && t) {
    const S = t;
    t = (...Q) => {
      S(...Q), L();
    };
  }
  let H = J ? new Array(e.length).fill(ln) : ln;
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
              H === ln ? void 0 : J && H[0] === ln ? [] : H,
              $
            ];
            H = Q, u ? u(t, 3, ne) : (
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
  return l && l(pe), p = new Fs(g), p.scheduler = i ? () => i(pe, !1) : pe, $ = (S) => Ui(S, !1, p), O = p.onStop = () => {
    const S = bn.get(p);
    if (S) {
      if (u)
        u(S, 4);
      else
        for (const Q of S) Q();
      bn.delete(p);
    }
  }, process.env.NODE_ENV !== "production" && (p.onTrack = n.onTrack, p.onTrigger = n.onTrigger), t ? o ? pe(!0) : H = p.run() : i ? i(pe.bind(null, !0), !0) : p.run(), L.pause = p.pause.bind(p), L.resume = p.resume.bind(p), L.stop = L, L;
}
function et(e, t = 1 / 0, n) {
  if (t <= 0 || !W(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, z(e))
    et(e.value, t, n);
  else if (C(e))
    for (let o = 0; o < e.length; o++)
      et(e[o], t, n);
  else if ($s(e) || ft(e))
    e.forEach((o) => {
      et(o, t, n);
    });
  else if (Ms(e)) {
    for (const o in e)
      et(e[o], t, n);
    for (const o of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, o) && et(e[o], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const pt = [];
function cn(e) {
  pt.push(e);
}
function un() {
  pt.pop();
}
let Zn = !1;
function y(e, ...t) {
  if (Zn) return;
  Zn = !0, Ve();
  const n = pt.length ? pt[pt.length - 1].component : null, o = n && n.appContext.config.warnHandler, s = Ki();
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
`, ...Wi(s)), console.warn(...r);
  }
  Se(), Zn = !1;
}
function Ki() {
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
function Wi(e) {
  const t = [];
  return e.forEach((n, o) => {
    t.push(...o === 0 ? [] : [`
`], ...ki(n));
  }), t;
}
function ki({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, s = ` at <${Un(
    e.component,
    e.type,
    o
  )}`, r = ">" + n;
  return e.props ? [s, ...Gi(e.props), r] : [s + r];
}
function Gi(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((o) => {
    t.push(...tr(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function tr(e, t, n) {
  return q(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : z(t) ? (t = tr(e, P(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : A(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = P(t), n ? t : [`${e}=`, t]);
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
    Xt(s, t, n);
  }
}
function He(e, t, n, o) {
  if (A(e)) {
    const s = wt(e, t, n, o);
    return s && yo(s) && s.catch((r) => {
      Xt(r, t, n);
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
function Xt(e, t, n, o = !0) {
  const s = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: i } = t && t.appContext.config || K;
  if (t) {
    let l = t.parent;
    const u = t.proxy, d = process.env.NODE_ENV !== "production" ? Co[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const a = l.ec;
      if (a) {
        for (let p = 0; p < a.length; p++)
          if (a[p](e, u, d) === !1)
            return;
      }
      l = l.parent;
    }
    if (r) {
      Ve(), wt(r, null, 10, [
        e,
        u,
        d
      ]), Se();
      return;
    }
  }
  qi(e, n, s, o, i);
}
function qi(e, t, n, o = !0, s = !1) {
  if (process.env.NODE_ENV !== "production") {
    const r = Co[t];
    if (n && cn(n), y(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && un(), o)
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
const Nt = [];
let Ze = null, Et = 0;
const nr = /* @__PURE__ */ Promise.resolve();
let Nn = null;
const Ji = 100;
function or(e) {
  const t = Nn || nr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function zi(e) {
  let t = Pe + 1, n = re.length;
  for (; t < n; ) {
    const o = t + n >>> 1, s = re[o], r = Gt(s);
    r < e || r === e && s.flags & 2 ? t = o + 1 : n = o;
  }
  return t;
}
function Fn(e) {
  if (!(e.flags & 1)) {
    const t = Gt(e), n = re[re.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Gt(n) ? re.push(e) : re.splice(zi(t), 0, e), e.flags |= 1, sr();
  }
}
function sr() {
  Nn || (Nn = nr.then(lr));
}
function rr(e) {
  C(e) ? Nt.push(...e) : Ze && e.id === -1 ? Ze.splice(Et + 1, 0, e) : e.flags & 1 || (Nt.push(e), e.flags |= 1), sr();
}
function Xo(e, t, n = Pe + 1) {
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
      (n, o) => Gt(n) - Gt(o)
    );
    if (Nt.length = 0, Ze) {
      Ze.push(...t);
      return;
    }
    for (Ze = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), Et = 0; Et < Ze.length; Et++) {
      const n = Ze[Et];
      process.env.NODE_ENV !== "production" && $o(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    Ze = null, Et = 0;
  }
}
const Gt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function lr(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => $o(e, n) : Z;
  try {
    for (Pe = 0; Pe < re.length; Pe++) {
      const n = re[Pe];
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
    for (; Pe < re.length; Pe++) {
      const n = re[Pe];
      n && (n.flags &= -2);
    }
    Pe = -1, re.length = 0, ir(e), Nn = null, (re.length || Nt.length) && lr(e);
  }
}
function $o(e, t) {
  const n = e.get(t) || 0;
  if (n > Ji) {
    const o = t.i, s = o && Wr(o.type);
    return Xt(
      `Maximum recursive updates exceeded${s ? ` in component <${s}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
let Fe = !1;
const fn = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (Yt().__VUE_HMR_RUNTIME__ = {
  createRecord: Qn(cr),
  rerender: Qn(Zi),
  reload: Qn(Qi)
});
const ht = /* @__PURE__ */ new Map();
function Yi(e) {
  const t = e.type.__hmrId;
  let n = ht.get(t);
  n || (cr(t, e.type), n = ht.get(t)), n.instances.add(e);
}
function Xi(e) {
  ht.get(e.type.__hmrId).instances.delete(e);
}
function cr(e, t) {
  return ht.has(e) ? !1 : (ht.set(e, {
    initialDef: yn(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function yn(e) {
  return kr(e) ? e.__vccOpts : e;
}
function Zi(e, t) {
  const n = ht.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, yn(o.type).render = t), o.renderCache = [], Fe = !0, o.job.flags & 8 || o.update(), Fe = !1;
  }));
}
function Qi(e, t) {
  const n = ht.get(e);
  if (!n) return;
  t = yn(t), Zo(n.initialDef, t);
  const o = [...n.instances];
  for (let s = 0; s < o.length; s++) {
    const r = o[s], i = yn(r.type);
    let l = fn.get(i);
    l || (i !== n.initialDef && Zo(i, t), fn.set(i, l = /* @__PURE__ */ new Set())), l.add(r), r.appContext.propsCache.delete(r.type), r.appContext.emitsCache.delete(r.type), r.appContext.optionsCache.delete(r.type), r.ceReload ? (l.add(r), r.ceReload(t.styles), l.delete(r)) : r.parent ? Fn(() => {
      r.job.flags & 8 || (Fe = !0, r.parent.update(), Fe = !1, l.delete(r));
    }) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), r.root.ce && r !== r.root && r.root.ce._removeChildStyle(i);
  }
  rr(() => {
    fn.clear();
  });
}
function Zo(e, t) {
  Y(e, t);
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
let ye, It = [], fo = !1;
function Zt(e, ...t) {
  ye ? ye.emit(e, ...t) : fo || It.push({ event: e, args: t });
}
function Ao(e, t) {
  var n, o;
  ye = e, ye ? (ye.enabled = !0, It.forEach(({ event: s, args: r }) => ye.emit(s, ...r)), It = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((o = (n = window.navigator) == null ? void 0 : n.userAgent) != null && o.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((r) => {
    Ao(r, t);
  }), setTimeout(() => {
    ye || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, fo = !0, It = []);
  }, 3e3)) : (fo = !0, It = []);
}
function el(e, t) {
  Zt("app:init", e, t, {
    Fragment: ve,
    Text: en,
    Comment: me,
    Static: pn
  });
}
function tl(e) {
  Zt("app:unmount", e);
}
const nl = /* @__PURE__ */ Mo(
  "component:added"
  /* COMPONENT_ADDED */
), ur = /* @__PURE__ */ Mo(
  "component:updated"
  /* COMPONENT_UPDATED */
), ol = /* @__PURE__ */ Mo(
  "component:removed"
  /* COMPONENT_REMOVED */
), sl = (e) => {
  ye && typeof ye.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !ye.cleanupBuffer(e) && ol(e);
};
// @__NO_SIDE_EFFECTS__
function Mo(e) {
  return (t) => {
    Zt(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
const rl = /* @__PURE__ */ fr(
  "perf:start"
  /* PERFORMANCE_START */
), il = /* @__PURE__ */ fr(
  "perf:end"
  /* PERFORMANCE_END */
);
function fr(e) {
  return (t, n, o) => {
    Zt(e, t.appContext.app, t.uid, t, n, o);
  };
}
function ll(e, t, n) {
  Zt(
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
function cl(e, t = he, n) {
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
  Zr(e) && y("Do not use built-in directive ids as custom directive id: " + e);
}
function it(e, t, n, o) {
  const s = e.dirs, r = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const l = s[i];
    r && (l.oldValue = r[i].value);
    let u = l.dir[o];
    u && (Ve(), He(u, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Se());
  }
}
const ul = Symbol("_vte"), fl = (e) => e.__isTeleport, al = Symbol("_leaveCb");
function Po(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Po(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Qt(e, t) {
  return A(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Y({ name: e.name }, t, { setup: e })
  ) : e;
}
function dr(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const Qo = /* @__PURE__ */ new WeakSet(), Dn = /* @__PURE__ */ new WeakMap();
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
  const r = o.shapeFlag & 4 ? Uo(o.component) : o.el, i = s ? null : r, { i: l, r: u } = e;
  if (process.env.NODE_ENV !== "production" && !l) {
    y(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const d = t && t.r, a = l.refs === K ? l.refs = {} : l.refs, p = l.setupState, g = P(p), O = p === K ? Cs : (w) => process.env.NODE_ENV !== "production" && (j(g, w) && !z(g[w]) && y(
    `Template ref "${w}" used on a non-ref value. It will not work in the production build.`
  ), Qo.has(g[w])) ? !1 : j(g, w), $ = (w) => process.env.NODE_ENV === "production" || !Qo.has(w);
  if (d != null && d !== u) {
    if (es(t), q(d))
      a[d] = null, O(d) && (p[d] = null);
    else if (z(d)) {
      $(d) && (d.value = null);
      const w = t;
      w.k && (a[w.k] = null);
    }
  }
  if (A(u))
    wt(u, l, 12, [i, a]);
  else {
    const w = q(u), J = z(u);
    if (w || J) {
      const G = () => {
        if (e.f) {
          const L = w ? O(u) ? p[u] : a[u] : $(u) || !e.k ? u.value : a[e.k];
          if (s)
            C(L) && No(L, r);
          else if (C(L))
            L.includes(r) || L.push(r);
          else if (w)
            a[u] = [r], O(u) && (p[u] = a[u]);
          else {
            const H = [r];
            $(u) && (u.value = H), e.k && (a[e.k] = H);
          }
        } else w ? (a[u] = i, O(u) && (p[u] = i)) : J ? ($(u) && (u.value = i), e.k && (a[e.k] = i)) : process.env.NODE_ENV !== "production" && y("Invalid template ref type:", u, `(${typeof u})`);
      };
      if (i) {
        const L = () => {
          G(), Dn.delete(e);
        };
        L.id = -1, Dn.set(e, L), de(L, n);
      } else
        es(e), G();
    } else process.env.NODE_ENV !== "production" && y("Invalid template ref type:", u, `(${typeof u})`);
  }
}
function es(e) {
  const t = Dn.get(e);
  t && (t.flags |= 8, Dn.delete(e));
}
Yt().requestIdleCallback;
Yt().cancelIdleCallback;
const Ut = (e) => !!e.type.__asyncLoader, Io = (e) => e.type.__isKeepAlive;
function pl(e, t) {
  hr(e, "a", t);
}
function dl(e, t) {
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
      Io(s.parent.vnode) && hl(o, t, n, s), s = s.parent;
  }
}
function hl(e, t, n, o) {
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
      const l = tn(n), u = He(t, n, e, i);
      return l(), Se(), u;
    });
    return o ? s.unshift(r) : s.push(r), r;
  } else if (process.env.NODE_ENV !== "production") {
    const s = ct(Co[e].replace(/ hook$/, ""));
    y(
      `${s} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const Je = (e) => (t, n = te) => {
  (!Jt || e === "sp") && jn(e, (...o) => t(...o), n);
}, gl = Je("bm"), gr = Je("m"), ml = Je(
  "bu"
), _l = Je("u"), vl = Je(
  "bum"
), mr = Je("um"), El = Je(
  "sp"
), bl = Je("rtg"), Nl = Je("rtc");
function yl(e, t = te) {
  jn("ec", e, t);
}
const Ol = Symbol.for("v-ndc");
function _r(e, t, n, o) {
  let s;
  const r = n, i = C(e);
  if (i || q(e)) {
    const l = i && nt(e);
    let u = !1, d = !1;
    l && (u = !ie(e), d = je(e), e = Pn(e)), s = new Array(e.length);
    for (let a = 0, p = e.length; a < p; a++)
      s[a] = t(
        u ? d ? En(ee(e[a])) : ee(e[a]) : e[a],
        a,
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
        (l, u) => t(l, u, void 0, r)
      );
    else {
      const l = Object.keys(e);
      s = new Array(l.length);
      for (let u = 0, d = l.length; u < d; u++) {
        const a = l[u];
        s[u] = t(e[a], a, u, r);
      }
    }
  else
    s = [];
  return s;
}
const ao = (e) => e ? Br(e) ? Uo(e) : ao(e.parent) : null, dt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Y(/* @__PURE__ */ Object.create(null), {
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
    $watch: (e) => nc.bind(e)
  })
), Ro = (e) => e === "_" || e === "$", eo = (e, t) => e !== K && !e.__isScriptSetup && j(e, t), vr = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: o, data: s, props: r, accessCache: i, type: l, appContext: u } = e;
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
        if (s !== K && j(s, t))
          return i[t] = 2, s[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (d = e.propsOptions[0]) && j(d, t)
        )
          return i[t] = 3, r[t];
        if (n !== K && j(n, t))
          return i[t] = 4, n[t];
        po && (i[t] = 0);
      }
    }
    const a = dt[t];
    let p, g;
    if (a)
      return t === "$attrs" ? (X(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && Vn()) : process.env.NODE_ENV !== "production" && t === "$slots" && X(e, "get", t), a(e);
    if (
      // css module (injected by vue-loader)
      (p = l.__cssModules) && (p = p[t])
    )
      return p;
    if (n !== K && j(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      g = u.config.globalProperties, j(g, t)
    )
      return g[t];
    process.env.NODE_ENV !== "production" && he && (!q(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (s !== K && Ro(t[0]) && j(s, t) ? y(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === he && y(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: s, ctx: r } = e;
    return eo(s, t) ? (s[t] = n, !0) : process.env.NODE_ENV !== "production" && s.__isScriptSetup && j(s, t) ? (y(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : o !== K && j(o, t) ? (o[t] = n, !0) : j(e.props, t) ? (process.env.NODE_ENV !== "production" && y(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && y(
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
    let u, d;
    return !!(n[l] || e !== K && l[0] !== "$" && j(e, l) || eo(t, l) || (u = r[0]) && j(u, l) || j(o, l) || j(dt, l) || j(s.config.globalProperties, l) || (d = i.__cssModules) && d[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : j(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (vr.ownKeys = (e) => (y(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function Dl(e) {
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
function wl(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(P(n)).forEach((o) => {
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
function Vl() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? y(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let po = !0;
function Sl(e) {
  const t = br(e), n = e.proxy, o = e.ctx;
  po = !1, t.beforeCreate && ns(t.beforeCreate, e, "bc");
  const {
    // state
    data: s,
    computed: r,
    methods: i,
    watch: l,
    provide: u,
    inject: d,
    // lifecycle
    created: a,
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
    inheritAttrs: ze,
    // assets
    components: be,
    directives: nn,
    filters: Bo
  } = t, Ye = process.env.NODE_ENV !== "production" ? Vl() : null;
  if (process.env.NODE_ENV !== "production") {
    const [R] = e.propsOptions;
    if (R)
      for (const I in R)
        Ye("Props", I);
  }
  if (d && Tl(d, o, Ye), i)
    for (const R in i) {
      const I = i[R];
      A(I) ? (process.env.NODE_ENV !== "production" ? Object.defineProperty(o, R, {
        value: I.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : o[R] = I.bind(n), process.env.NODE_ENV !== "production" && Ye("Methods", R)) : process.env.NODE_ENV !== "production" && y(
        `Method "${R}" has type "${typeof I}" in the component definition. Did you reference the function correctly?`
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
      for (const I in R)
        Ye("Data", I), Ro(I[0]) || Object.defineProperty(o, I, {
          configurable: !0,
          enumerable: !0,
          get: () => R[I],
          set: Z
        });
  }
  if (po = !0, r)
    for (const R in r) {
      const I = r[R], Te = A(I) ? I.bind(n, n) : A(I.get) ? I.get.bind(n, n) : Z;
      process.env.NODE_ENV !== "production" && Te === Z && y(`Computed property "${R}" has no getter.`);
      const kn = !A(I) && A(I.set) ? I.set.bind(n) : process.env.NODE_ENV !== "production" ? () => {
        y(
          `Write operation failed: computed property "${R}" is readonly.`
        );
      } : Z, Vt = Bn({
        get: Te,
        set: kn
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
  if (u) {
    const R = A(u) ? u.call(n) : u;
    Reflect.ownKeys(R).forEach((I) => {
      Il(I, R[I]);
    });
  }
  a && ns(a, e, "c");
  function ce(R, I) {
    C(I) ? I.forEach((Te) => R(Te.bind(n))) : I && R(I.bind(n));
  }
  if (ce(gl, p), ce(gr, g), ce(ml, O), ce(_l, $), ce(pl, w), ce(dl, J), ce(yl, ne), ce(Nl, Q), ce(bl, _e), ce(vl, L), ce(mr, pe), ce(El, le), C(Le))
    if (Le.length) {
      const R = e.exposed || (e.exposed = {});
      Le.forEach((I) => {
        Object.defineProperty(R, I, {
          get: () => n[I],
          set: (Te) => n[I] = Te,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  S && e.render === Z && (e.render = S), ze != null && (e.inheritAttrs = ze), be && (e.components = be), nn && (e.directives = nn), le && dr(e);
}
function Tl(e, t, n = Z) {
  C(e) && (e = ho(e));
  for (const o in e) {
    const s = e[o];
    let r;
    W(s) ? "default" in s ? r = Bt(
      s.from || o,
      s.default,
      !0
    ) : r = Bt(s.from || o) : r = Bt(s), z(r) ? Object.defineProperty(t, o, {
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
  let u;
  return l ? u = l : !s.length && !n && !o ? u = t : (u = {}, s.length && s.forEach(
    (d) => xn(u, d, i, !0)
  ), xn(u, t, i)), W(t) && r.set(t, u), u;
}
function xn(e, t, n, o = !1) {
  const { mixins: s, extends: r } = t;
  r && xn(e, r, n, !0), s && s.forEach(
    (i) => xn(e, i, n, !0)
  );
  for (const i in t)
    if (o && i === "expose")
      process.env.NODE_ENV !== "production" && y(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const l = Cl[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Cl = {
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
  watch: Al,
  // provide / inject
  provide: os,
  inject: $l
};
function os(e, t) {
  return t ? e ? function() {
    return Y(
      A(e) ? e.call(this, this) : e,
      A(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function $l(e, t) {
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
  return e ? Y(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ss(e, t) {
  return e ? C(e) && C(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Y(
    /* @__PURE__ */ Object.create(null),
    ts(e),
    ts(t ?? {})
  ) : t;
}
function Al(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Y(/* @__PURE__ */ Object.create(null), e);
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
let Ml = 0;
function Pl(e, t) {
  return function(o, s = null) {
    A(o) || (o = Y({}, o)), s != null && !W(s) && (process.env.NODE_ENV !== "production" && y("root props passed to app.mount() must be an object."), s = null);
    const r = Nr(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let u = !1;
    const d = r.app = {
      _uid: Ml++,
      _component: o,
      _props: s,
      _container: null,
      _context: r,
      _instance: null,
      version: ms,
      get config() {
        return r.config;
      },
      set config(a) {
        process.env.NODE_ENV !== "production" && y(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(a, ...p) {
        return i.has(a) ? process.env.NODE_ENV !== "production" && y("Plugin has already been applied to target app.") : a && A(a.install) ? (i.add(a), a.install(d, ...p)) : A(a) ? (i.add(a), a(d, ...p)) : process.env.NODE_ENV !== "production" && y(
          'A plugin must either be a function or an object with an "install" function.'
        ), d;
      },
      mixin(a) {
        return r.mixins.includes(a) ? process.env.NODE_ENV !== "production" && y(
          "Mixin has already been applied to target app" + (a.name ? `: ${a.name}` : "")
        ) : r.mixins.push(a), d;
      },
      component(a, p) {
        return process.env.NODE_ENV !== "production" && Eo(a, r.config), p ? (process.env.NODE_ENV !== "production" && r.components[a] && y(`Component "${a}" has already been registered in target app.`), r.components[a] = p, d) : r.components[a];
      },
      directive(a, p) {
        return process.env.NODE_ENV !== "production" && pr(a), p ? (process.env.NODE_ENV !== "production" && r.directives[a] && y(`Directive "${a}" has already been registered in target app.`), r.directives[a] = p, d) : r.directives[a];
      },
      mount(a, p, g) {
        if (u)
          process.env.NODE_ENV !== "production" && y(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          process.env.NODE_ENV !== "production" && a.__vue_app__ && y(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const O = d._ceVNode || Ee(o, s);
          return O.appContext = r, g === !0 ? g = "svg" : g === !1 && (g = void 0), process.env.NODE_ENV !== "production" && (r.reload = () => {
            const $ = st(O);
            $.el = null, e($, a, g);
          }), e(O, a, g), u = !0, d._container = a, a.__vue_app__ = d, process.env.NODE_ENV !== "production" && (d._instance = O.component, el(d, ms)), Uo(O.component);
        }
      },
      onUnmount(a) {
        process.env.NODE_ENV !== "production" && typeof a != "function" && y(
          `Expected function as first argument to app.onUnmount(), but got ${typeof a}`
        ), l.push(a);
      },
      unmount() {
        u ? (He(
          l,
          d._instance,
          16
        ), e(null, d._container), process.env.NODE_ENV !== "production" && (d._instance = null, tl(d)), delete d._container.__vue_app__) : process.env.NODE_ENV !== "production" && y("Cannot unmount an app that is not mounted.");
      },
      provide(a, p) {
        return process.env.NODE_ENV !== "production" && a in r.provides && (j(r.provides, a) ? y(
          `App already provides property with key "${String(a)}". It will be overwritten with the new value.`
        ) : y(
          `App already provides property with key "${String(a)}" inherited from its parent element. It will be overwritten with the new value.`
        )), r.provides[a] = p, d;
      },
      runWithContext(a) {
        const p = yt;
        yt = d;
        try {
          return a();
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
const yr = {}, Or = () => Object.create(yr), Dr = (e) => Object.getPrototypeOf(e) === yr;
function Rl(e, t, n, o = !1) {
  const s = {}, r = Or();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), xr(e, t, s, r);
  for (const i in e.propsOptions[0])
    i in s || (s[i] = void 0);
  process.env.NODE_ENV !== "production" && Vr(t || {}, s, e), n ? e.props = o ? s : Pi(s) : e.type.props ? e.props = s : e.props = r, e.attrs = r;
}
function Fl(e) {
  for (; e; ) {
    if (e.type.__hmrId) return !0;
    e = e.parent;
  }
}
function jl(e, t, n, o) {
  const {
    props: s,
    attrs: r,
    vnode: { patchFlag: i }
  } = e, l = P(s), [u] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(process.env.NODE_ENV !== "production" && Fl(e)) && (o || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const a = e.vnode.dynamicProps;
      for (let p = 0; p < a.length; p++) {
        let g = a[p];
        if (Hn(e.emitsOptions, g))
          continue;
        const O = t[g];
        if (u)
          if (j(r, g))
            O !== r[g] && (r[g] = O, d = !0);
          else {
            const $ = Oe(g);
            s[$] = go(
              u,
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
    xr(e, t, s, r) && (d = !0);
    let a;
    for (const p in l)
      (!t || // for camelCase
      !j(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((a = ot(p)) === p || !j(t, a))) && (u ? n && // for camelCase
      (n[p] !== void 0 || // for kebab-case
      n[a] !== void 0) && (s[p] = go(
        u,
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
  d && Ie(e.attrs, "set", ""), process.env.NODE_ENV !== "production" && Vr(t || {}, s, e);
}
function xr(e, t, n, o) {
  const [s, r] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let u in t) {
      if (Ft(u))
        continue;
      const d = t[u];
      let a;
      s && j(s, a = Oe(u)) ? !r || !r.includes(a) ? n[a] = d : (l || (l = {}))[a] = d : Hn(e.emitsOptions, u) || (!(u in o) || d !== o[u]) && (o[u] = d, i = !0);
    }
  if (r) {
    const u = P(n), d = l || K;
    for (let a = 0; a < r.length; a++) {
      const p = r[a];
      n[p] = go(
        s,
        u,
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
      const u = i.default;
      if (i.type !== Function && !i.skipFactory && A(u)) {
        const { propsDefaults: d } = s;
        if (n in d)
          o = d[n];
        else {
          const a = tn(s);
          o = d[n] = u.call(
            null,
            t
          ), a();
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
    ] && (o === "" || o === ot(n)) && (o = !0));
  }
  return o;
}
const Hl = /* @__PURE__ */ new WeakMap();
function wr(e, t, n = !1) {
  const o = n ? Hl : t.propsCache, s = o.get(e);
  if (s)
    return s;
  const r = e.props, i = {}, l = [];
  let u = !1;
  if (!A(e)) {
    const a = (p) => {
      u = !0;
      const [g, O] = wr(p, t, !0);
      Y(i, g), O && l.push(...O);
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  if (!r && !u)
    return W(e) && o.set(e, bt), bt;
  if (C(r))
    for (let a = 0; a < r.length; a++) {
      process.env.NODE_ENV !== "production" && !q(r[a]) && y("props must be strings when using array syntax.", r[a]);
      const p = Oe(r[a]);
      rs(p) && (i[p] = K);
    }
  else if (r) {
    process.env.NODE_ENV !== "production" && !W(r) && y("invalid props options", r);
    for (const a in r) {
      const p = Oe(a);
      if (rs(p)) {
        const g = r[a], O = i[p] = C(g) || A(g) ? { type: g } : Y({}, g), $ = O.type;
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
function Ll(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function Vr(e, t, n) {
  const o = P(t), s = n.propsOptions[0], r = Object.keys(e).map((i) => Oe(i));
  for (const i in s) {
    let l = s[i];
    l != null && Ul(
      i,
      o[i],
      l,
      process.env.NODE_ENV !== "production" ? Re(o) : o,
      !r.includes(i)
    );
  }
}
function Ul(e, t, n, o, s) {
  const { type: r, required: i, validator: l, skipCheck: u } = n;
  if (i && s) {
    y('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !i)) {
    if (r != null && r !== !0 && !u) {
      let d = !1;
      const a = C(r) ? r : [r], p = [];
      for (let g = 0; g < a.length && !d; g++) {
        const { valid: O, expectedType: $ } = Kl(t, a[g]);
        p.push($ || ""), d = O;
      }
      if (!d) {
        y(Wl(e, t, p));
        return;
      }
    }
    l && !l(t, o) && y('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const Bl = /* @__PURE__ */ qe(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function Kl(e, t) {
  let n;
  const o = Ll(t);
  if (o === "null")
    n = e === null;
  else if (Bl(o)) {
    const s = typeof e;
    n = s === o.toLowerCase(), !n && s === "object" && (n = e instanceof t);
  } else o === "Object" ? n = W(e) : o === "Array" ? n = C(e) : n = e instanceof t;
  return {
    valid: n,
    expectedType: o
  };
}
function Wl(e, t, n) {
  if (n.length === 0)
    return `Prop type [] for prop "${e}" won't match anything. Did you mean to use type Array instead?`;
  let o = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(An).join(" | ")}`;
  const s = n[0], r = Oo(t), i = is(t, s), l = is(t, r);
  return n.length === 1 && ls(s) && !kl(s, r) && (o += ` with value ${i}`), o += `, got ${r} `, ls(r) && (o += `with value ${l}.`), o;
}
function is(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function ls(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function kl(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const Fo = (e) => e === "_" || e === "_ctx" || e === "$stable", jo = (e) => C(e) ? e.map(Ne) : [Ne(e)], Gl = (e, t, n) => {
  if (t._n)
    return t;
  const o = cl((...s) => (process.env.NODE_ENV !== "production" && te && !(n === null && he) && !(n && n.root !== te.root) && y(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), jo(t(...s))), n);
  return o._c = !1, o;
}, Sr = (e, t, n) => {
  const o = e._ctx;
  for (const s in e) {
    if (Fo(s)) continue;
    const r = e[s];
    if (A(r))
      t[s] = Gl(s, r, o);
    else if (r != null) {
      process.env.NODE_ENV !== "production" && y(
        `Non-function value encountered for slot "${s}". Prefer function slots for better performance.`
      );
      const i = jo(r);
      t[s] = () => i;
    }
  }
}, Tr = (e, t) => {
  process.env.NODE_ENV !== "production" && !Io(e.vnode) && y(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = jo(t);
  e.slots.default = () => n;
}, mo = (e, t, n) => {
  for (const o in t)
    (n || !Fo(o)) && (e[o] = t[o]);
}, ql = (e, t, n) => {
  const o = e.slots = Or();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (mo(o, t, n), n && mn(o, "_", s, !0)) : Sr(t, o);
  } else t && Tr(e, t);
}, Jl = (e, t, n) => {
  const { vnode: o, slots: s } = e;
  let r = !0, i = K;
  if (o.shapeFlag & 32) {
    const l = t._;
    l ? process.env.NODE_ENV !== "production" && Fe ? (mo(s, t, n), Ie(e, "set", "$slots")) : n && l === 1 ? r = !1 : mo(s, t, n) : (r = !t.$stable, Sr(t, s)), i = t;
  } else t && (Tr(e, t), i = { default: 1 });
  if (r)
    for (const l in s)
      !Fo(l) && i[l] == null && delete s[l];
};
let Mt, Ke;
function _t(e, t) {
  e.appContext.config.performance && wn() && Ke.mark(`vue-${t}-${e.uid}`), process.env.NODE_ENV !== "production" && rl(e, t, wn() ? Ke.now() : Date.now());
}
function vt(e, t) {
  if (e.appContext.config.performance && wn()) {
    const n = `vue-${t}-${e.uid}`, o = n + ":end", s = `<${Un(e, e.type)}> ${t}`;
    Ke.mark(o), Ke.measure(s, n, o), Ke.clearMeasures(s), Ke.clearMarks(n), Ke.clearMarks(o);
  }
  process.env.NODE_ENV !== "production" && il(e, t, wn() ? Ke.now() : Date.now());
}
function wn() {
  return Mt !== void 0 || (typeof window < "u" && window.performance ? (Mt = !0, Ke = window.performance) : Mt = !1), Mt;
}
function zl() {
  const e = [];
  if (process.env.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(
      `Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const de = fc;
function Yl(e) {
  return Xl(e);
}
function Xl(e, t) {
  zl();
  const n = Yt();
  n.__VUE__ = !0, process.env.NODE_ENV !== "production" && Ao(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const {
    insert: o,
    remove: s,
    patchProp: r,
    createElement: i,
    createText: l,
    createComment: u,
    setText: d,
    setElementText: a,
    parentNode: p,
    nextSibling: g,
    setScopeId: O = Z,
    insertStaticContent: $
  } = e, w = (c, f, h, v = null, m = null, _ = null, D = void 0, N = null, b = process.env.NODE_ENV !== "production" && Fe ? !1 : !!f.dynamicChildren) => {
    if (c === f)
      return;
    c && !Pt(c, f) && (v = on(c), Xe(c, m, _, !0), c = null), f.patchFlag === -2 && (b = !1, f.dynamicChildren = null);
    const { type: E, ref: T, shapeFlag: x } = f;
    switch (E) {
      case en:
        J(c, f, h, v);
        break;
      case me:
        G(c, f, h, v);
        break;
      case pn:
        c == null ? L(f, h, v, D) : process.env.NODE_ENV !== "production" && H(c, f, h, D);
        break;
      case ve:
        nn(
          c,
          f,
          h,
          v,
          m,
          _,
          D,
          N,
          b
        );
        break;
      default:
        x & 1 ? Q(
          c,
          f,
          h,
          v,
          m,
          _,
          D,
          N,
          b
        ) : x & 6 ? Bo(
          c,
          f,
          h,
          v,
          m,
          _,
          D,
          N,
          b
        ) : x & 64 || x & 128 ? E.process(
          c,
          f,
          h,
          v,
          m,
          _,
          D,
          N,
          b,
          Tt
        ) : process.env.NODE_ENV !== "production" && y("Invalid VNode type:", E, `(${typeof E})`);
    }
    T != null && m ? Lt(T, c && c.ref, _, f || c, !f) : T == null && c && c.ref != null && Lt(c.ref, null, _, c, !0);
  }, J = (c, f, h, v) => {
    if (c == null)
      o(
        f.el = l(f.children),
        h,
        v
      );
    else {
      const m = f.el = c.el;
      f.children !== c.children && d(m, f.children);
    }
  }, G = (c, f, h, v) => {
    c == null ? o(
      f.el = u(f.children || ""),
      h,
      v
    ) : f.el = c.el;
  }, L = (c, f, h, v) => {
    [c.el, c.anchor] = $(
      c.children,
      f,
      h,
      v,
      c.el,
      c.anchor
    );
  }, H = (c, f, h, v) => {
    if (f.children !== c.children) {
      const m = g(c.anchor);
      S(c), [f.el, f.anchor] = $(
        f.children,
        h,
        m,
        v
      );
    } else
      f.el = c.el, f.anchor = c.anchor;
  }, pe = ({ el: c, anchor: f }, h, v) => {
    let m;
    for (; c && c !== f; )
      m = g(c), o(c, h, v), c = m;
    o(f, h, v);
  }, S = ({ el: c, anchor: f }) => {
    let h;
    for (; c && c !== f; )
      h = g(c), s(c), c = h;
    s(f);
  }, Q = (c, f, h, v, m, _, D, N, b) => {
    f.type === "svg" ? D = "svg" : f.type === "math" && (D = "mathml"), c == null ? _e(
      f,
      h,
      v,
      m,
      _,
      D,
      N,
      b
    ) : Le(
      c,
      f,
      m,
      _,
      D,
      N,
      b
    );
  }, _e = (c, f, h, v, m, _, D, N) => {
    let b, E;
    const { props: T, shapeFlag: x, transition: V, dirs: M } = c;
    if (b = c.el = i(
      c.type,
      _,
      T && T.is,
      T
    ), x & 8 ? a(b, c.children) : x & 16 && le(
      c.children,
      b,
      null,
      v,
      m,
      to(c, _),
      D,
      N
    ), M && it(c, null, v, "created"), ne(b, c, c.scopeId, D, v), T) {
      for (const k in T)
        k !== "value" && !Ft(k) && r(b, k, null, T[k], _, v);
      "value" in T && r(b, "value", null, T.value, _), (E = T.onVnodeBeforeMount) && Me(E, v, c);
    }
    process.env.NODE_ENV !== "production" && (mn(b, "__vnode", c, !0), mn(b, "__vueParentComponent", v, !0)), M && it(c, null, v, "beforeMount");
    const F = Zl(m, V);
    F && V.beforeEnter(b), o(b, f, h), ((E = T && T.onVnodeMounted) || F || M) && de(() => {
      E && Me(E, v, c), F && V.enter(b), M && it(c, null, v, "mounted");
    }, m);
  }, ne = (c, f, h, v, m) => {
    if (h && O(c, h), v)
      for (let _ = 0; _ < v.length; _++)
        O(c, v[_]);
    if (m) {
      let _ = m.subTree;
      if (process.env.NODE_ENV !== "production" && _.patchFlag > 0 && _.patchFlag & 2048 && (_ = Ho(_.children) || _), f === _ || Ir(_.type) && (_.ssContent === f || _.ssFallback === f)) {
        const D = m.vnode;
        ne(
          c,
          D,
          D.scopeId,
          D.slotScopeIds,
          m.parent
        );
      }
    }
  }, le = (c, f, h, v, m, _, D, N, b = 0) => {
    for (let E = b; E < c.length; E++) {
      const T = c[E] = N ? Qe(c[E]) : Ne(c[E]);
      w(
        null,
        T,
        f,
        h,
        v,
        m,
        _,
        D,
        N
      );
    }
  }, Le = (c, f, h, v, m, _, D) => {
    const N = f.el = c.el;
    process.env.NODE_ENV !== "production" && (N.__vnode = f);
    let { patchFlag: b, dynamicChildren: E, dirs: T } = f;
    b |= c.patchFlag & 16;
    const x = c.props || K, V = f.props || K;
    let M;
    if (h && lt(h, !1), (M = V.onVnodeBeforeUpdate) && Me(M, h, f, c), T && it(f, c, h, "beforeUpdate"), h && lt(h, !0), process.env.NODE_ENV !== "production" && Fe && (b = 0, D = !1, E = null), (x.innerHTML && V.innerHTML == null || x.textContent && V.textContent == null) && a(N, ""), E ? (ze(
      c.dynamicChildren,
      E,
      N,
      h,
      v,
      to(f, m),
      _
    ), process.env.NODE_ENV !== "production" && an(c, f)) : D || Te(
      c,
      f,
      N,
      null,
      h,
      v,
      to(f, m),
      _,
      !1
    ), b > 0) {
      if (b & 16)
        be(N, x, V, h, m);
      else if (b & 2 && x.class !== V.class && r(N, "class", null, V.class, m), b & 4 && r(N, "style", x.style, V.style, m), b & 8) {
        const F = f.dynamicProps;
        for (let k = 0; k < F.length; k++) {
          const B = F[k], ue = x[B], fe = V[B];
          (fe !== ue || B === "value") && r(N, B, ue, fe, m, h);
        }
      }
      b & 1 && c.children !== f.children && a(N, f.children);
    } else !D && E == null && be(N, x, V, h, m);
    ((M = V.onVnodeUpdated) || T) && de(() => {
      M && Me(M, h, f, c), T && it(f, c, h, "updated");
    }, v);
  }, ze = (c, f, h, v, m, _, D) => {
    for (let N = 0; N < f.length; N++) {
      const b = c[N], E = f[N], T = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        b.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (b.type === ve || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Pt(b, E) || // - In the case of a component, it could contain anything.
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
        D,
        !0
      );
    }
  }, be = (c, f, h, v, m) => {
    if (f !== h) {
      if (f !== K)
        for (const _ in f)
          !Ft(_) && !(_ in h) && r(
            c,
            _,
            f[_],
            null,
            m,
            v
          );
      for (const _ in h) {
        if (Ft(_)) continue;
        const D = h[_], N = f[_];
        D !== N && _ !== "value" && r(c, _, N, D, m, v);
      }
      "value" in h && r(c, "value", f.value, h.value, m);
    }
  }, nn = (c, f, h, v, m, _, D, N, b) => {
    const E = f.el = c ? c.el : l(""), T = f.anchor = c ? c.anchor : l("");
    let { patchFlag: x, dynamicChildren: V, slotScopeIds: M } = f;
    process.env.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (Fe || x & 2048) && (x = 0, b = !1, V = null), M && (N = N ? N.concat(M) : M), c == null ? (o(E, h, v), o(T, h, v), le(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      f.children || [],
      h,
      T,
      m,
      _,
      D,
      N,
      b
    )) : x > 0 && x & 64 && V && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren ? (ze(
      c.dynamicChildren,
      V,
      h,
      m,
      _,
      D,
      N
    ), process.env.NODE_ENV !== "production" ? an(c, f) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (f.key != null || m && f === m.subTree) && an(
        c,
        f,
        !0
        /* shallow */
      )
    )) : Te(
      c,
      f,
      h,
      T,
      m,
      _,
      D,
      N,
      b
    );
  }, Bo = (c, f, h, v, m, _, D, N, b) => {
    f.slotScopeIds = N, c == null ? f.shapeFlag & 512 ? m.ctx.activate(
      f,
      h,
      v,
      D,
      b
    ) : Ye(
      f,
      h,
      v,
      m,
      _,
      D,
      b
    ) : ce(c, f, b);
  }, Ye = (c, f, h, v, m, _, D) => {
    const N = c.component = Ec(
      c,
      v,
      m
    );
    if (process.env.NODE_ENV !== "production" && N.type.__hmrId && Yi(N), process.env.NODE_ENV !== "production" && (cn(c), _t(N, "mount")), Io(c) && (N.ctx.renderer = Tt), process.env.NODE_ENV !== "production" && _t(N, "init"), Nc(N, !1, D), process.env.NODE_ENV !== "production" && vt(N, "init"), process.env.NODE_ENV !== "production" && Fe && (c.el = null), N.asyncDep) {
      if (m && m.registerDep(N, R, D), !c.el) {
        const b = N.subTree = Ee(me);
        G(null, b, f, h), c.placeholder = b.el;
      }
    } else
      R(
        N,
        c,
        f,
        h,
        m,
        _,
        D
      );
    process.env.NODE_ENV !== "production" && (un(), vt(N, "mount"));
  }, ce = (c, f, h) => {
    const v = f.component = c.component;
    if (cc(c, f, h))
      if (v.asyncDep && !v.asyncResolved) {
        process.env.NODE_ENV !== "production" && cn(f), I(v, f, h), process.env.NODE_ENV !== "production" && un();
        return;
      } else
        v.next = f, v.update();
    else
      f.el = c.el, v.vnode = f;
  }, R = (c, f, h, v, m, _, D) => {
    const N = () => {
      if (c.isMounted) {
        let { next: x, bu: V, u: M, parent: F, vnode: k } = c;
        {
          const $e = Cr(c);
          if ($e) {
            x && (x.el = k.el, I(c, x, D)), $e.asyncDep.then(() => {
              c.isUnmounted || N();
            });
            return;
          }
        }
        let B = x, ue;
        process.env.NODE_ENV !== "production" && cn(x || c.vnode), lt(c, !1), x ? (x.el = k.el, I(c, x, D)) : x = k, V && $t(V), (ue = x.props && x.props.onVnodeBeforeUpdate) && Me(ue, F, x, k), lt(c, !0), process.env.NODE_ENV !== "production" && _t(c, "render");
        const fe = us(c);
        process.env.NODE_ENV !== "production" && vt(c, "render");
        const Ce = c.subTree;
        c.subTree = fe, process.env.NODE_ENV !== "production" && _t(c, "patch"), w(
          Ce,
          fe,
          // parent may have changed if it's in a teleport
          p(Ce.el),
          // anchor may have changed if it's in a fragment
          on(Ce),
          c,
          m,
          _
        ), process.env.NODE_ENV !== "production" && vt(c, "patch"), x.el = fe.el, B === null && uc(c, fe.el), M && de(M, m), (ue = x.props && x.props.onVnodeUpdated) && de(
          () => Me(ue, F, x, k),
          m
        ), process.env.NODE_ENV !== "production" && ur(c), process.env.NODE_ENV !== "production" && un();
      } else {
        let x;
        const { el: V, props: M } = f, { bm: F, m: k, parent: B, root: ue, type: fe } = c, Ce = Ut(f);
        lt(c, !1), F && $t(F), !Ce && (x = M && M.onVnodeBeforeMount) && Me(x, B, f), lt(c, !0);
        {
          ue.ce && // @ts-expect-error _def is private
          ue.ce._def.shadowRoot !== !1 && ue.ce._injectChildStyle(fe), process.env.NODE_ENV !== "production" && _t(c, "render");
          const $e = c.subTree = us(c);
          process.env.NODE_ENV !== "production" && vt(c, "render"), process.env.NODE_ENV !== "production" && _t(c, "patch"), w(
            null,
            $e,
            h,
            v,
            c,
            m,
            _
          ), process.env.NODE_ENV !== "production" && vt(c, "patch"), f.el = $e.el;
        }
        if (k && de(k, m), !Ce && (x = M && M.onVnodeMounted)) {
          const $e = f;
          de(
            () => Me(x, B, $e),
            m
          );
        }
        (f.shapeFlag & 256 || B && Ut(B.vnode) && B.vnode.shapeFlag & 256) && c.a && de(c.a, m), c.isMounted = !0, process.env.NODE_ENV !== "production" && nl(c), f = h = v = null;
      }
    };
    c.scope.on();
    const b = c.effect = new Fs(N);
    c.scope.off();
    const E = c.update = b.run.bind(b), T = c.job = b.runIfDirty.bind(b);
    T.i = c, T.id = c.uid, b.scheduler = () => Fn(T), lt(c, !0), process.env.NODE_ENV !== "production" && (b.onTrack = c.rtc ? (x) => $t(c.rtc, x) : void 0, b.onTrigger = c.rtg ? (x) => $t(c.rtg, x) : void 0), E();
  }, I = (c, f, h) => {
    f.component = c;
    const v = c.vnode.props;
    c.vnode = f, c.next = null, jl(c, f.props, v, h), Jl(c, f.children, h), Ve(), Xo(c), Se();
  }, Te = (c, f, h, v, m, _, D, N, b = !1) => {
    const E = c && c.children, T = c ? c.shapeFlag : 0, x = f.children, { patchFlag: V, shapeFlag: M } = f;
    if (V > 0) {
      if (V & 128) {
        Vt(
          E,
          x,
          h,
          v,
          m,
          _,
          D,
          N,
          b
        );
        return;
      } else if (V & 256) {
        kn(
          E,
          x,
          h,
          v,
          m,
          _,
          D,
          N,
          b
        );
        return;
      }
    }
    M & 8 ? (T & 16 && St(E, m, _), x !== E && a(h, x)) : T & 16 ? M & 16 ? Vt(
      E,
      x,
      h,
      v,
      m,
      _,
      D,
      N,
      b
    ) : St(E, m, _, !0) : (T & 8 && a(h, ""), M & 16 && le(
      x,
      h,
      v,
      m,
      _,
      D,
      N,
      b
    ));
  }, kn = (c, f, h, v, m, _, D, N, b) => {
    c = c || bt, f = f || bt;
    const E = c.length, T = f.length, x = Math.min(E, T);
    let V;
    for (V = 0; V < x; V++) {
      const M = f[V] = b ? Qe(f[V]) : Ne(f[V]);
      w(
        c[V],
        M,
        h,
        null,
        m,
        _,
        D,
        N,
        b
      );
    }
    E > T ? St(
      c,
      m,
      _,
      !0,
      !1,
      x
    ) : le(
      f,
      h,
      v,
      m,
      _,
      D,
      N,
      b,
      x
    );
  }, Vt = (c, f, h, v, m, _, D, N, b) => {
    let E = 0;
    const T = f.length;
    let x = c.length - 1, V = T - 1;
    for (; E <= x && E <= V; ) {
      const M = c[E], F = f[E] = b ? Qe(f[E]) : Ne(f[E]);
      if (Pt(M, F))
        w(
          M,
          F,
          h,
          null,
          m,
          _,
          D,
          N,
          b
        );
      else
        break;
      E++;
    }
    for (; E <= x && E <= V; ) {
      const M = c[x], F = f[V] = b ? Qe(f[V]) : Ne(f[V]);
      if (Pt(M, F))
        w(
          M,
          F,
          h,
          null,
          m,
          _,
          D,
          N,
          b
        );
      else
        break;
      x--, V--;
    }
    if (E > x) {
      if (E <= V) {
        const M = V + 1, F = M < T ? f[M].el : v;
        for (; E <= V; )
          w(
            null,
            f[E] = b ? Qe(f[E]) : Ne(f[E]),
            h,
            F,
            m,
            _,
            D,
            N,
            b
          ), E++;
      }
    } else if (E > V)
      for (; E <= x; )
        Xe(c[E], m, _, !0), E++;
    else {
      const M = E, F = E, k = /* @__PURE__ */ new Map();
      for (E = F; E <= V; E++) {
        const oe = f[E] = b ? Qe(f[E]) : Ne(f[E]);
        oe.key != null && (process.env.NODE_ENV !== "production" && k.has(oe.key) && y(
          "Duplicate keys found during update:",
          JSON.stringify(oe.key),
          "Make sure keys are unique."
        ), k.set(oe.key, E));
      }
      let B, ue = 0;
      const fe = V - F + 1;
      let Ce = !1, $e = 0;
      const Ct = new Array(fe);
      for (E = 0; E < fe; E++) Ct[E] = 0;
      for (E = M; E <= x; E++) {
        const oe = c[E];
        if (ue >= fe) {
          Xe(oe, m, _, !0);
          continue;
        }
        let Ae;
        if (oe.key != null)
          Ae = k.get(oe.key);
        else
          for (B = F; B <= V; B++)
            if (Ct[B - F] === 0 && Pt(oe, f[B])) {
              Ae = B;
              break;
            }
        Ae === void 0 ? Xe(oe, m, _, !0) : (Ct[Ae - F] = E + 1, Ae >= $e ? $e = Ae : Ce = !0, w(
          oe,
          f[Ae],
          h,
          null,
          m,
          _,
          D,
          N,
          b
        ), ue++);
      }
      const Wo = Ce ? Ql(Ct) : bt;
      for (B = Wo.length - 1, E = fe - 1; E >= 0; E--) {
        const oe = F + E, Ae = f[oe], ko = f[oe + 1], Go = oe + 1 < T ? (
          // #13559, fallback to el placeholder for unresolved async component
          ko.el || ko.placeholder
        ) : v;
        Ct[E] === 0 ? w(
          null,
          Ae,
          h,
          Go,
          m,
          _,
          D,
          N,
          b
        ) : Ce && (B < 0 || E !== Wo[B] ? gt(Ae, h, Go, 2) : B--);
      }
    }
  }, gt = (c, f, h, v, m = null) => {
    const { el: _, type: D, transition: N, children: b, shapeFlag: E } = c;
    if (E & 6) {
      gt(c.component.subTree, f, h, v);
      return;
    }
    if (E & 128) {
      c.suspense.move(f, h, v);
      return;
    }
    if (E & 64) {
      D.move(c, f, h, Tt);
      return;
    }
    if (D === ve) {
      o(_, f, h);
      for (let x = 0; x < b.length; x++)
        gt(b[x], f, h, v);
      o(c.anchor, f, h);
      return;
    }
    if (D === pn) {
      pe(c, f, h);
      return;
    }
    if (v !== 2 && E & 1 && N)
      if (v === 0)
        N.beforeEnter(_), o(_, f, h), de(() => N.enter(_), m);
      else {
        const { leave: x, delayLeave: V, afterLeave: M } = N, F = () => {
          c.ctx.isUnmounted ? s(_) : o(_, f, h);
        }, k = () => {
          _._isLeaving && _[al](
            !0
            /* cancelled */
          ), x(_, () => {
            F(), M && M();
          });
        };
        V ? V(_, F, k) : k();
      }
    else
      o(_, f, h);
  }, Xe = (c, f, h, v = !1, m = !1) => {
    const {
      type: _,
      props: D,
      ref: N,
      children: b,
      dynamicChildren: E,
      shapeFlag: T,
      patchFlag: x,
      dirs: V,
      cacheIndex: M
    } = c;
    if (x === -2 && (m = !1), N != null && (Ve(), Lt(N, null, h, c, !0), Se()), M != null && (f.renderCache[M] = void 0), T & 256) {
      f.ctx.deactivate(c);
      return;
    }
    const F = T & 1 && V, k = !Ut(c);
    let B;
    if (k && (B = D && D.onVnodeBeforeUnmount) && Me(B, f, c), T & 6)
      Yr(c.component, h, v);
    else {
      if (T & 128) {
        c.suspense.unmount(h, v);
        return;
      }
      F && it(c, null, f, "beforeUnmount"), T & 64 ? c.type.remove(
        c,
        f,
        h,
        Tt,
        v
      ) : E && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !E.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== ve || x > 0 && x & 64) ? St(
        E,
        f,
        h,
        !1,
        !0
      ) : (_ === ve && x & 384 || !m && T & 16) && St(b, f, h), v && Gn(c);
    }
    (k && (B = D && D.onVnodeUnmounted) || F) && de(() => {
      B && Me(B, f, c), F && it(c, null, f, "unmounted");
    }, h);
  }, Gn = (c) => {
    const { type: f, el: h, anchor: v, transition: m } = c;
    if (f === ve) {
      process.env.NODE_ENV !== "production" && c.patchFlag > 0 && c.patchFlag & 2048 && m && !m.persisted ? c.children.forEach((D) => {
        D.type === me ? s(D.el) : Gn(D);
      }) : zr(h, v);
      return;
    }
    if (f === pn) {
      S(c);
      return;
    }
    const _ = () => {
      s(h), m && !m.persisted && m.afterLeave && m.afterLeave();
    };
    if (c.shapeFlag & 1 && m && !m.persisted) {
      const { leave: D, delayLeave: N } = m, b = () => D(h, _);
      N ? N(c.el, _, b) : b();
    } else
      _();
  }, zr = (c, f) => {
    let h;
    for (; c !== f; )
      h = g(c), s(c), c = h;
    s(f);
  }, Yr = (c, f, h) => {
    process.env.NODE_ENV !== "production" && c.type.__hmrId && Xi(c);
    const { bum: v, scope: m, job: _, subTree: D, um: N, m: b, a: E } = c;
    cs(b), cs(E), v && $t(v), m.stop(), _ && (_.flags |= 8, Xe(D, c, f, h)), N && de(N, f), de(() => {
      c.isUnmounted = !0;
    }, f), process.env.NODE_ENV !== "production" && sl(c);
  }, St = (c, f, h, v = !1, m = !1, _ = 0) => {
    for (let D = _; D < c.length; D++)
      Xe(c[D], f, h, v, m);
  }, on = (c) => {
    if (c.shapeFlag & 6)
      return on(c.component.subTree);
    if (c.shapeFlag & 128)
      return c.suspense.next();
    const f = g(c.anchor || c.el), h = f && f[ul];
    return h ? g(h) : f;
  };
  let qn = !1;
  const Ko = (c, f, h) => {
    c == null ? f._vnode && Xe(f._vnode, null, null, !0) : w(
      f._vnode || null,
      c,
      f,
      null,
      null,
      null,
      h
    ), f._vnode = c, qn || (qn = !0, Xo(), ir(), qn = !1);
  }, Tt = {
    p: w,
    um: Xe,
    m: gt,
    r: Gn,
    mt: Ye,
    mc: le,
    pc: Te,
    pbc: ze,
    n: on,
    o: e
  };
  return {
    render: Ko,
    hydrate: void 0,
    createApp: Pl(Ko)
  };
}
function to({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function lt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Zl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function an(e, t, n = !1) {
  const o = e.children, s = t.children;
  if (C(o) && C(s))
    for (let r = 0; r < o.length; r++) {
      const i = o[r];
      let l = s[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = s[r] = Qe(s[r]), l.el = i.el), !n && l.patchFlag !== -2 && an(i, l)), l.type === en && // avoid cached text nodes retaining detached dom nodes
      l.patchFlag !== -1 && (l.el = i.el), l.type === me && !l.el && (l.el = i.el), process.env.NODE_ENV !== "production" && l.el && (l.el.__vnode = l);
    }
}
function Ql(e) {
  const t = e.slice(), n = [0];
  let o, s, r, i, l;
  const u = e.length;
  for (o = 0; o < u; o++) {
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
const ec = Symbol.for("v-scx"), tc = () => {
  {
    const e = Bt(ec);
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
function $r(e, t, n = K) {
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
  const u = t && o || !t && r !== "post";
  let d;
  if (Jt) {
    if (r === "sync") {
      const O = tc();
      d = O.__watcherHandles || (O.__watcherHandles = []);
    } else if (!u) {
      const O = () => {
      };
      return O.stop = Z, O.resume = Z, O.pause = Z, O;
    }
  }
  const a = te;
  l.call = (O, $, w) => He(O, a, $, w);
  let p = !1;
  r === "post" ? l.scheduler = (O) => {
    de(O, a && a.suspense);
  } : r !== "sync" && (p = !0, l.scheduler = (O, $) => {
    $ ? O() : Fn(O);
  }), l.augmentJob = (O) => {
    t && (O.flags |= 4), p && (O.flags |= 2, a && (O.id = a.uid, O.i = a));
  };
  const g = Bi(e, t, l);
  return Jt && (d ? d.push(g) : u && g()), g;
}
function nc(e, t, n) {
  const o = this.proxy, s = q(e) ? e.includes(".") ? Ar(o, e) : () => o[e] : e.bind(o, o);
  let r;
  A(t) ? r = t : (r = t.handler, n = t);
  const i = tn(this), l = $r(s, r.bind(o), n);
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
const oc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Oe(t)}Modifiers`] || e[`${ot(t)}Modifiers`];
function sc(e, t, ...n) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || K;
  if (process.env.NODE_ENV !== "production") {
    const {
      emitsOptions: a,
      propsOptions: [p]
    } = e;
    if (a)
      if (!(t in a))
        (!p || !(ct(Oe(t)) in p)) && y(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${ct(Oe(t))}" prop.`
        );
      else {
        const g = a[t];
        A(g) && (g(...n) || y(
          `Invalid event arguments: event validation failed for event "${t}".`
        ));
      }
  }
  let s = n;
  const r = t.startsWith("update:"), i = r && oc(o, t.slice(7));
  if (i && (i.trim && (s = n.map((a) => q(a) ? a.trim() : a)), i.number && (s = n.map(ti))), process.env.NODE_ENV !== "production" && ll(e, t, s), process.env.NODE_ENV !== "production") {
    const a = t.toLowerCase();
    a !== t && o[ct(a)] && y(
      `Event "${a}" is emitted in component ${Un(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${ot(
        t
      )}" instead of "${t}".`
    );
  }
  let l, u = o[l = ct(t)] || // also try camelCase event handler (#2249)
  o[l = ct(Oe(t))];
  !u && r && (u = o[l = ct(ot(t))]), u && He(
    u,
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
const rc = /* @__PURE__ */ new WeakMap();
function Mr(e, t, n = !1) {
  const o = n ? rc : t.emitsCache, s = o.get(e);
  if (s !== void 0)
    return s;
  const r = e.emits;
  let i = {}, l = !1;
  if (!A(e)) {
    const u = (d) => {
      const a = Mr(d, t, !0);
      a && (l = !0, Y(i, a));
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !r && !l ? (W(e) && o.set(e, null), null) : (C(r) ? r.forEach((u) => i[u] = null) : Y(i, r), W(e) && o.set(e, i), i);
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
    emit: u,
    render: d,
    renderCache: a,
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
          a,
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
            emit: u
          } : { attrs: l, slots: i, emit: u }
        ) : S(
          process.env.NODE_ENV !== "production" ? Re(p) : p,
          null
        )
      ), L = t.props ? l : ic(l);
    }
  } catch (S) {
    Kt.length = 0, Xt(S, e, 1), G = Ee(me);
  }
  let H = G, pe;
  if (process.env.NODE_ENV !== "production" && G.patchFlag > 0 && G.patchFlag & 2048 && ([H, pe] = Pr(G)), L && w !== !1) {
    const S = Object.keys(L), { shapeFlag: Q } = H;
    if (S.length) {
      if (Q & 7)
        r && S.some(gn) && (L = lc(
          L,
          r
        )), H = st(H, L, !1, !0);
      else if (process.env.NODE_ENV !== "production" && !_o && H.type !== me) {
        const _e = Object.keys(l), ne = [], le = [];
        for (let Le = 0, ze = _e.length; Le < ze; Le++) {
          const be = _e[Le];
          zt(be) ? gn(be) || ne.push(be[2].toLowerCase() + be.slice(3)) : le.push(be);
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
  ), Po(H, n.transition)), process.env.NODE_ENV !== "production" && pe ? pe(H) : G = H, On(J), G;
}
const Pr = (e) => {
  const t = e.children, n = e.dynamicChildren, o = Ho(t, !1);
  if (o) {
    if (process.env.NODE_ENV !== "production" && o.patchFlag > 0 && o.patchFlag & 2048)
      return Pr(o);
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
const ic = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || zt(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, lc = (e, t) => {
  const n = {};
  for (const o in e)
    (!gn(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
}, fs = (e) => e.shapeFlag & 7 || e.type === me;
function cc(e, t, n) {
  const { props: o, children: s, component: r } = e, { props: i, children: l, patchFlag: u } = t, d = r.emitsOptions;
  if (process.env.NODE_ENV !== "production" && (s || l) && Fe || t.dirs || t.transition)
    return !0;
  if (n && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return o ? as(o, i, d) : !!i;
    if (u & 8) {
      const a = t.dynamicProps;
      for (let p = 0; p < a.length; p++) {
        const g = a[p];
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
function uc({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.el = e.el), o === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const Ir = (e) => e.__isSuspense;
function fc(e, t) {
  t && t.pendingBranch ? C(e) ? t.effects.push(...e) : t.effects.push(e) : rr(e);
}
const ve = Symbol.for("v-fgt"), en = Symbol.for("v-txt"), me = Symbol.for("v-cmt"), pn = Symbol.for("v-stc"), Kt = [];
let ge = null;
function xe(e = !1) {
  Kt.push(ge = e ? null : []);
}
function ac() {
  Kt.pop(), ge = Kt[Kt.length - 1] || null;
}
let qt = 1;
function ps(e, t = !1) {
  qt += e, e < 0 && ge && t && (ge.hasOnce = !0);
}
function Rr(e) {
  return e.dynamicChildren = qt > 0 ? ge || bt : null, ac(), qt > 0 && ge && ge.push(e), e;
}
function ke(e, t, n, o, s, r) {
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
function Pt(e, t) {
  if (process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && e.component) {
    const n = fn.get(t.type);
    if (n && n.has(e.component))
      return e.shapeFlag &= -257, t.shapeFlag &= -513, !1;
  }
  return e.type === t.type && e.key === t.key;
}
const pc = (...e) => Hr(
  ...e
), jr = ({ key: e }) => e ?? null, dn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? q(e) || z(e) || A(e) ? { i: he, r: e, k: t, f: !!n } : e : null);
function Sn(e, t = null, n = null, o = 0, s = null, r = e === ve ? 0 : 1, i = !1, l = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && jr(t),
    ref: t && dn(t),
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
  return l ? (Lo(u, n), r & 128 && e.normalize(u)) : n && (u.shapeFlag |= q(n) ? 8 : 16), process.env.NODE_ENV !== "production" && u.key !== u.key && y("VNode created with invalid key (NaN). VNode type:", u.type), qt > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  ge && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && ge.push(u), u;
}
const Ee = process.env.NODE_ENV !== "production" ? pc : Hr;
function Hr(e, t = null, n = null, o = 0, s = null, r = !1) {
  if ((!e || e === Ol) && (process.env.NODE_ENV !== "production" && !e && y(`Invalid vnode type when creating vnode: ${e}.`), e = me), Ln(e)) {
    const l = st(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Lo(l, n), qt > 0 && !r && ge && (l.shapeFlag & 6 ? ge[ge.indexOf(e)] = l : ge.push(l)), l.patchFlag = -2, l;
  }
  if (kr(e) && (e = e.__vccOpts), t) {
    t = dc(t);
    let { class: l, style: u } = t;
    l && !q(l) && (t.class = Mn(l)), W(u) && (vn(u) && !C(u) && (u = Y({}, u)), t.style = xt(u));
  }
  const i = q(e) ? 1 : Ir(e) ? 128 : fl(e) ? 64 : W(e) ? 4 : A(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && vn(e) && (e = P(e), y(
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
function dc(e) {
  return e ? vn(e) || Dr(e) ? Y({}, e) : e : null;
}
function st(e, t, n = !1, o = !1) {
  const { props: s, ref: r, patchFlag: i, children: l, transition: u } = e, d = t ? mc(s || {}, t) : s, a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && jr(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? C(r) ? r.concat(dn(t)) : [r, dn(t)] : dn(t)
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
    transition: u,
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
  return u && o && Po(
    a,
    u.clone(a)
  ), a;
}
function Lr(e) {
  const t = st(e);
  return C(e.children) && (t.children = e.children.map(Lr)), t;
}
function hc(e = " ", t = 0) {
  return Ee(en, null, e, t);
}
function gc(e = "", t = !1) {
  return t ? (xe(), Fr(me, null, e)) : Ee(me, null, e);
}
function Ne(e) {
  return e == null || typeof e == "boolean" ? Ee(me) : C(e) ? Ee(
    ve,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Ln(e) ? Qe(e) : Ee(en, null, String(e));
}
function Qe(e) {
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
      !s && !Dr(t) ? t._ctx = he : s === 3 && he && (he.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else A(t) ? (t = { default: t, _ctx: he }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [hc(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function mc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const s in o)
      if (s === "class")
        t.class !== o.class && (t.class = Mn([t.class, o.class]));
      else if (s === "style")
        t.style = xt([t.style, o.style]);
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
const _c = Nr();
let vc = 0;
function Ec(e, t, n) {
  const o = e.type, s = (t ? t.appContext : e.appContext) || _c, r = {
    uid: vc++,
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
    scope: new hi(
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
  return process.env.NODE_ENV !== "production" ? r.ctx = Dl(r) : r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = sc.bind(null, r), e.ce && e.ce(r), r;
}
let te = null;
const Ur = () => te || he;
let Tn, vo;
{
  const e = Yt(), t = (n, o) => {
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
    (n) => Jt = n
  );
}
const tn = (e) => {
  const t = te;
  return Tn(e), e.scope.on(), () => {
    e.scope.off(), Tn(t);
  };
}, ds = () => {
  te && te.scope.off(), Tn(null);
}, bc = /* @__PURE__ */ qe("slot,component");
function Eo(e, { isNativeTag: t }) {
  (bc(e) || t(e)) && y(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function Br(e) {
  return e.vnode.shapeFlag & 4;
}
let Jt = !1;
function Nc(e, t = !1, n = !1) {
  t && vo(t);
  const { props: o, children: s } = e.vnode, r = Br(e);
  Rl(e, o, r, t), ql(e, s, n || t);
  const i = r ? yc(e, t) : void 0;
  return t && vo(!1), i;
}
function yc(e, t) {
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
    o.compilerOptions && Oc() && y(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, vr), process.env.NODE_ENV !== "production" && xl(e);
  const { setup: s } = o;
  if (s) {
    Ve();
    const r = e.setupContext = s.length > 1 ? xc(e) : null, i = tn(e), l = wt(
      s,
      e,
      0,
      [
        process.env.NODE_ENV !== "production" ? Re(e.props) : e.props,
        r
      ]
    ), u = yo(l);
    if (Se(), i(), (u || e.sp) && !Ut(e) && dr(e), u) {
      if (l.then(ds, ds), t)
        return l.then((d) => {
          hs(e, d, t);
        }).catch((d) => {
          Xt(d, e, 0);
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
    Kr(e, t);
}
function hs(e, t, n) {
  A(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : W(t) ? (process.env.NODE_ENV !== "production" && Ln(t) && y(
    "setup() should not return VNodes directly - return a render function instead."
  ), process.env.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = er(t), process.env.NODE_ENV !== "production" && wl(e)) : process.env.NODE_ENV !== "production" && t !== void 0 && y(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), Kr(e, n);
}
const Oc = () => !0;
function Kr(e, t, n) {
  const o = e.type;
  e.render || (e.render = o.render || Z);
  {
    const s = tn(e);
    Ve();
    try {
      Sl(e);
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
function Dc(e) {
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
      o === "object" && (C(n) ? o = "array" : z(n) && (o = "ref")), o !== "object" && y(
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
        return o || (o = Dc(e));
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
const wc = /(?:^|[-_])\w/g, Vc = (e) => e.replace(wc, (t) => t.toUpperCase()).replace(/[-_]/g, "");
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
  return o ? Vc(o) : n ? "App" : "Anonymous";
}
function kr(e) {
  return A(e) && "__vccOpts" in e;
}
const Bn = (e, t) => {
  const n = Li(e, t, Jt);
  if (process.env.NODE_ENV !== "production") {
    const o = Ur();
    o && o.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function Sc() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, o = { style: "color:#eb2f96" }, s = {
    __vue_custom_formatter: !0,
    header(p) {
      if (!W(p))
        return null;
      if (p.__isVue)
        return ["div", e, "VueInstance"];
      if (z(p)) {
        Ve();
        const g = p.value;
        return Se(), [
          "div",
          {},
          ["span", e, a(p)],
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
    p.type.props && p.props && g.push(i("props", P(p.props))), p.setupState !== K && g.push(i("setup", p.setupState)), p.data !== K && g.push(i("data", P(p.data)));
    const O = u(p, "computed");
    O && g.push(i("computed", O));
    const $ = u(p, "inject");
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
    return g = Y({}, g), Object.keys(g).length ? [
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
    return typeof p == "number" ? ["span", t, p] : typeof p == "string" ? ["span", n, JSON.stringify(p)] : typeof p == "boolean" ? ["span", o, p] : W(p) ? ["object", { object: g ? P(p) : p }] : ["span", n, String(p)];
  }
  function u(p, g) {
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
  function a(p) {
    return ie(p) ? "ShallowRef" : p.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(s) : window.devtoolsFormatters = [s];
}
const ms = "3.5.22", Ge = process.env.NODE_ENV !== "production" ? y : Z;
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
    process.env.NODE_ENV !== "production" && Ge(`Error creating trusted types policy: ${e}`);
  }
const Gr = bo ? (e) => bo.createHTML(e) : (e) => e, Tc = "http://www.w3.org/2000/svg", Cc = "http://www.w3.org/1998/Math/MathML", Be = typeof document < "u" ? document : null, vs = Be && /* @__PURE__ */ Be.createElement("template"), $c = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const s = t === "svg" ? Be.createElementNS(Tc, e) : t === "mathml" ? Be.createElementNS(Cc, e) : n ? Be.createElement(e, { is: n }) : Be.createElement(e);
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
}, Ac = Symbol("_vtc");
function Mc(e, t, n) {
  const o = e[Ac];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Es = Symbol("_vod"), Pc = Symbol("_vsh"), Ic = Symbol(process.env.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : ""), Rc = /(?:^|;)\s*display\s*:/;
function Fc(e, t, n) {
  const o = e.style, s = q(n);
  let r = !1;
  if (n && !s) {
    if (t)
      if (q(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && hn(o, l, "");
        }
      else
        for (const i in t)
          n[i] == null && hn(o, i, "");
    for (const i in n)
      i === "display" && (r = !0), hn(o, i, n[i]);
  } else if (s) {
    if (t !== n) {
      const i = o[Ic];
      i && (n += ";" + i), o.cssText = n, r = Rc.test(n);
    }
  } else t && e.removeAttribute("style");
  Es in e && (e[Es] = r ? o.display : "", e[Pc] && (o.display = "none"));
}
const jc = /[^\\];\s*$/, bs = /\s*!important$/;
function hn(e, t, n) {
  if (C(n))
    n.forEach((o) => hn(e, t, o));
  else if (n == null && (n = ""), process.env.NODE_ENV !== "production" && jc.test(n) && Ge(
    `Unexpected semicolon at the end of '${t}' style value: '${n}'`
  ), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = Hc(e, t);
    bs.test(n) ? e.setProperty(
      ot(o),
      n.replace(bs, ""),
      "important"
    ) : e[o] = n;
  }
}
const Ns = ["Webkit", "Moz", "ms"], no = {};
function Hc(e, t) {
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
function Os(e, t, n, o, s, r = di(t)) {
  o && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(ys, t.slice(6, t.length)) : e.setAttributeNS(ys, t, n) : n == null || r && !Ps(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : rt(n) ? String(n) : n
  );
}
function Ds(e, t, n, o, s) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Gr(n) : n);
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
    l === "boolean" ? n = Ps(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch (l) {
    process.env.NODE_ENV !== "production" && !i && Ge(
      `Failed setting prop "${t}" on <${r.toLowerCase()}>: value ${n} is invalid.`,
      l
    );
  }
  i && e.removeAttribute(s || t);
}
function Lc(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function Uc(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
const xs = Symbol("_vei");
function Bc(e, t, n, o, s = null) {
  const r = e[xs] || (e[xs] = {}), i = r[t];
  if (o && i)
    i.value = process.env.NODE_ENV !== "production" ? Vs(o, t) : o;
  else {
    const [l, u] = Kc(t);
    if (o) {
      const d = r[t] = Gc(
        process.env.NODE_ENV !== "production" ? Vs(o, t) : o,
        s
      );
      Lc(e, l, d, u);
    } else i && (Uc(e, l, i, u), r[t] = void 0);
  }
}
const ws = /(?:Once|Passive|Capture)$/;
function Kc(e) {
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
const Wc = /* @__PURE__ */ Promise.resolve(), kc = () => oo || (Wc.then(() => oo = 0), oo = Date.now());
function Gc(e, t) {
  const n = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= n.attached)
      return;
    He(
      qc(o, n.value),
      t,
      5,
      [o]
    );
  };
  return n.value = e, n.attached = kc(), n;
}
function Vs(e, t) {
  return A(e) || C(e) ? e : (Ge(
    `Wrong type passed as event handler to ${t} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof e}.`
  ), Z);
}
function qc(e, t) {
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
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Jc = (e, t, n, o, s, r) => {
  const i = s === "svg";
  t === "class" ? Mc(e, o, i) : t === "style" ? Fc(e, n, o) : zt(t) ? gn(t) || Bc(e, t, n, o, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : zc(e, t, o, i)) ? (Ds(e, t, o), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Os(e, t, o, i, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !q(o)) ? Ds(e, Oe(t), o, r, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), Os(e, t, o, i));
};
function zc(e, t, n, o) {
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
const Yc = ["ctrl", "shift", "alt", "meta"], Xc = {
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
}, Zc = (e, t) => {
  const n = e._withMods || (e._withMods = {}), o = t.join(".");
  return n[o] || (n[o] = ((s, ...r) => {
    for (let i = 0; i < t.length; i++) {
      const l = Xc[t[i]];
      if (l && l(s, t)) return;
    }
    return e(s, ...r);
  }));
}, Qc = /* @__PURE__ */ Y({ patchProp: Jc }, $c);
let Ts;
function eu() {
  return Ts || (Ts = Yl(Qc));
}
const tu = ((...e) => {
  const t = eu().createApp(...e);
  process.env.NODE_ENV !== "production" && (ou(t), su(t));
  const { mount: n } = t;
  return t.mount = (o) => {
    const s = ru(o);
    if (!s) return;
    const r = t._component;
    !A(r) && !r.render && !r.template && (r.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const i = n(s, !1, nu(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), i;
  }, t;
});
function nu(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function ou(e) {
  Object.defineProperty(e.config, "isNativeTag", {
    value: (t) => ui(t) || fi(t) || ai(t),
    writable: !1
  });
}
function su(e) {
  {
    const t = e.config.isCustomElement;
    Object.defineProperty(e.config, "isCustomElement", {
      get() {
        return t;
      },
      set() {
        Ge(
          "The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead."
        );
      }
    });
    const n = e.config.compilerOptions, o = 'The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader\'s `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc';
    Object.defineProperty(e.config, "compilerOptions", {
      get() {
        return Ge(o), n;
      },
      set() {
        Ge(o);
      }
    });
  }
}
function ru(e) {
  if (q(e)) {
    const t = document.querySelector(e);
    return process.env.NODE_ENV !== "production" && !t && Ge(
      `Failed to mount app: mount target selector "${e}" returned null.`
    ), t;
  }
  return process.env.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && Ge(
    'mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs'
  ), e;
}
/**
* vue v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function iu() {
  Sc();
}
process.env.NODE_ENV !== "production" && iu();
function qr(e) {
  return e.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
const lu = /* @__PURE__ */ Qt({
  __name: "ChatEntryText",
  props: {
    text: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => _n(We(qr)(t.text));
  }
});
function Dt(e) {
  const t = {};
  if (!e)
    return t;
  const n = {
    marginVert: null,
    marginHorz: null,
    paddingHorz: null,
    paddingVert: null
  }, o = Object.keys(n), s = (i) => typeof i == "number" || /^\d+(\.\d+)?$/.test(i) ? `${i}px` : i;
  Object.keys(e).forEach((i) => {
    if (i.startsWith("_set_") || `_set_${i}` in e && !e[`_set_${i}`])
      return;
    let l = e[i];
    if (typeof l == "string" && (l = l.trim()), !(l == null || l === "")) {
      if (o.includes(i)) {
        n[i] = l;
        return;
      }
      switch (i) {
        case "opacity100":
          t.opacity = l / 100;
          break;
        case "fontWeight":
          t[i] = l;
          break;
        case "borderWidth":
          t.borderWidth = s(l), t.borderStyle = "solid";
          break;
        default:
          t[i] = s(l);
          break;
      }
    }
  });
  const r = (i) => {
    const l = n[`${i}Vert`], u = n[`${i}Horz`];
    if (l !== null) {
      const d = s(l);
      u !== null ? t[`${i}`] = `${d} ${s(u)}` : (t[`${i}Top`] = d, t[`${i}Bottom`] = d);
    } else if (u !== null) {
      const d = s(u);
      t[`${i}Left`] = d, t[`${i}Right`] = d;
    }
  };
  return r("margin"), r("padding"), t;
}
function so() {
  const e = /* @__PURE__ */ new Date();
  return e.getHours() * 3600 + e.getMinutes() * 60 + e.getSeconds();
}
function cu(e) {
  const t = Math.floor(e / 3600), o = Math.floor(e % 3600 / 60).toString().padStart(2, "0"), r = (e % 60).toString().padStart(2, "0");
  return `${t}:${o}:${r}`;
}
const Jr = Symbol("GlobalJsonConfig"), uu = {
  install(e, t) {
    e.provide(Jr, t);
  }
};
function Kn() {
  const e = Bt(Jr);
  if (!e)
    throw new Error("Plugin GlobalJsonConfig not found.");
  return e;
}
const fu = { class: "entry" }, au = {
  key: 1,
  class: "typing"
}, pu = /* @__PURE__ */ Qt({
  __name: "ChatEntry",
  props: {
    entry: {}
  },
  setup(e) {
    const t = Kn(), n = e, o = {
      ...Dt(n.entry.type === "bot" ? t.botEntryStyle : t.userEntryStyle),
      marginTop: `${t.listGap}px`
    }, s = Bn(() => n.entry.type === "bot" && n.entry.isStillTyping);
    return (r, i) => (xe(), ke("div", {
      class: Mn(["entrcont", n.entry.type])
    }, [
      s.value ? s.value ? (xe(), ke("div", au, _n(We(t).chatBotTypingText), 1)) : gc("", !0) : (xe(), ke("div", {
        key: 0,
        class: "entrtimecont",
        style: o
      }, [
        Sn("div", fu, [
          Ee(lu, {
            text: n.entry.text
          }, null, 8, ["text"])
        ]),
        Sn("div", {
          class: "time",
          style: xt(We(Dt)(We(t).timeStyle))
        }, _n(We(cu)(n.entry.time)), 5)
      ]))
    ], 2));
  }
}), Wn = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, s] of t)
    n[o] = s;
  return n;
}, du = /* @__PURE__ */ Wn(pu, [["__scopeId", "data-v-e8eb9013"]]), hu = /* @__PURE__ */ Qt({
  __name: "ChatList",
  props: {
    list: {}
  },
  setup(e) {
    const t = Kn(), n = {
      ...Dt(t.listStyle),
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
    ), (r, i) => (xe(), ke("div", {
      class: "chat-list",
      style: n,
      ref_key: "listContainer",
      ref: s
    }, [
      (xe(!0), ke(ve, null, _r(o.list, (l) => (xe(), Fr(du, {
        key: l.id,
        entry: l
      }, null, 8, ["entry"]))), 128))
    ], 512));
  }
}), gu = /* @__PURE__ */ Wn(hu, [["__scopeId", "data-v-09008aad"]]), mu = ["onClick", "innerHTML"], _u = /* @__PURE__ */ Qt({
  __name: "ChatInput",
  props: {
    label: {}
  },
  emits: ["addEntry"],
  setup(e, { emit: t }) {
    const n = Kn(), o = {
      ...Dt(n.inputStyle),
      minHeight: `${n.inputRows}rem`
    }, s = Dt(n.inputStyleUser), r = e, i = t, l = Bn(() => n.chat.user.filter((u) => u.label === r.label));
    return (u, d) => (xe(), ke("div", {
      class: "outer",
      style: o
    }, [
      (xe(!0), ke(ve, null, _r(l.value, (a, p) => (xe(), ke("div", {
        key: p,
        style: xt(We(s)),
        onClick: Zc((g) => i("addEntry", a), ["prevent"]),
        innerHTML: a.text
      }, null, 12, mu))), 128))
    ]));
  }
}), vu = /* @__PURE__ */ Wn(_u, [["__scopeId", "data-v-075ab567"]]), Eu = /* @__PURE__ */ Qt({
  __name: "App",
  setup(e, { expose: t }) {
    const n = Kn();
    n.chat.user.forEach((u) => {
      u.label = u.label.trim(), u.next = u.next?.trim();
    }), n.chat.bot.forEach((u) => {
      u.label = u.label.trim();
    });
    const o = Qs({
      curr: [],
      currLabel: "START",
      prev: []
    });
    Ot(
      () => o.value.currLabel,
      (u) => {
        const d = n.chat.bot.find((a) => a.label === u);
        if (d) {
          const a = o.value.curr.length;
          if (a > 0 && o.value.curr[a - 1]?.type === "bot" && o.value.curr[a - 1]?.text === d.text)
            return;
          const p = a > 0 && n.botDelay || 0, O = {
            id: a + 1,
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
          n.fsm?.logEvent(`BOT_RESPONSE_NOT_FOUND: ${u}`);
      },
      { immediate: !0 }
    );
    const s = Bn(() => {
      const u = o.value.curr.length;
      if (u === 0) return "";
      const d = o.value.curr[u - 1];
      return d?.type === "bot" && !d.isStillTyping ? o.value.currLabel : "";
    });
    t({
      chat: o
      // Freigegebene Property
    });
    const r = () => {
      o.value.curr.length > 0 && o.value.prev.push(o.value.curr), o.value.curr = [], o.value.currLabel = "START", n.fsm?.logEvent("CHAT_RESTARTED"), i(o.value.currLabel);
    }, i = (u) => {
      if (u === "RESTART") {
        r();
        return;
      } else if (u !== "END")
        if (u === "START") {
          const d = n.chat.bot.find((a) => a.label === "START") || n.chat.bot[0];
          d ? o.value.currLabel = d.label : (n.fsm?.logEvent("CHAT_START_LABEL_NOT_FOUND"), u = "END");
        } else if (u.length > 0) {
          const d = n.chat.bot.find((a) => a.label === u);
          d ? o.value.currLabel = d.label : (n.fsm?.logEvent(`CHAT_LABEL_NOT_FOUND: ${u}`), u = "END");
        } else {
          const d = n.chat.bot.findIndex(
            (a) => a.label === o.value.currLabel
          );
          d >= 0 && d < n.chat.bot.length - 1 ? o.value.currLabel = n.chat.bot[d + 1].label : u = "END";
        }
      if (u === "END") {
        n.fsm?.logEvent("CHAT_ENDED"), n.fsm?.triggerEvent("RESPONSE");
        return;
      }
    };
    gr(() => i(o.value.currLabel));
    const l = (u) => {
      if (u.next != "RESTART" && u.next !== "END") {
        const a = o.value.curr.length + 1;
        o.value.curr.push({
          id: a,
          type: "user",
          text: u.text,
          time: so()
        });
      }
      const d = {
        event: "ENTRY_ADDED_USER",
        text: qr(u.text)
      };
      n.fsm?.logEvent(d), i(u.next || "");
    };
    return (u, d) => (xe(), ke("div", {
      style: xt(We(Dt)(We(n).outerStyle))
    }, [
      Ee(gu, {
        class: "list",
        list: o.value.curr
      }, null, 8, ["list"]),
      Ee(vu, {
        label: s.value,
        onAddEntry: l
      }, null, 8, ["label"])
    ], 4));
  }
}), bu = /* @__PURE__ */ Wn(Eu, [["__scopeId", "data-v-dd9e4356"]]);
function Nu(e) {
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
function yu(e) {
  const t = {}, n = nt(e) ? P(e) : e;
  for (const o in n)
    if (Object.prototype.hasOwnProperty.call(n, o)) {
      const s = n[o];
      z(s) ? t[o] = s.value : t[o] = s;
    }
  return t;
}
const Du = (e, t, n, o) => {
  o && (t.postMessagePayload = o), Nu(t);
  const s = tu(bu);
  s.use(uu, t);
  const i = s.mount(e);
  return n && Ot(
    () => yu(i),
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
  Du as initializeAndMount
};
