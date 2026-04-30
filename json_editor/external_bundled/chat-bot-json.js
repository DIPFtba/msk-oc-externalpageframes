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
}, $s = () => !1, zt = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), gn = (e) => e.startsWith("onUpdate:"), Y = Object.assign, bo = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Zr = Object.prototype.hasOwnProperty, H = (e, t) => Zr.call(e, t), C = Array.isArray, ft = (e) => Tn(e) === "[object Map]", As = (e) => Tn(e) === "[object Set]", $ = (e) => typeof e == "function", q = (e) => typeof e == "string", rt = (e) => typeof e == "symbol", W = (e) => e !== null && typeof e == "object", No = (e) => (W(e) || $(e)) && $(e.then) && $(e.catch), Ms = Object.prototype.toString, Tn = (e) => Ms.call(e), yo = (e) => Tn(e).slice(8, -1), Ps = (e) => Tn(e) === "[object Object]", Oo = (e) => q(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ft = /* @__PURE__ */ qe(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Qr = /* @__PURE__ */ qe(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), Cn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, ei = /-\w/g, xe = Cn(
  (e) => e.replace(ei, (t) => t.slice(1).toUpperCase())
), ti = /\B([A-Z])/g, ot = Cn(
  (e) => e.replace(ti, "-$1").toLowerCase()
), $n = Cn((e) => e.charAt(0).toUpperCase() + e.slice(1)), ct = Cn(
  (e) => e ? `on${$n(e)}` : ""
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
}, ni = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let qo;
const Yt = () => qo || (qo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Dt(e) {
  if (C(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], s = q(o) ? ii(o) : Dt(o);
      if (s)
        for (const r in s)
          t[r] = s[r];
    }
    return t;
  } else if (q(e) || W(e))
    return e;
}
const oi = /;(?![^(]*\))/g, si = /:([^]+)/, ri = /\/\*[^]*?\*\//g;
function ii(e) {
  const t = {};
  return e.replace(ri, "").split(oi).forEach((n) => {
    if (n) {
      const o = n.split(si);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function An(e) {
  let t = "";
  if (q(e))
    t = e;
  else if (C(e))
    for (let n = 0; n < e.length; n++) {
      const o = An(e[n]);
      o && (t += o + " ");
    }
  else if (W(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const li = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", ci = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", ui = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", fi = /* @__PURE__ */ qe(li), ai = /* @__PURE__ */ qe(ci), pi = /* @__PURE__ */ qe(ui), di = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", hi = /* @__PURE__ */ qe(di);
function Is(e) {
  return !!e || e === "";
}
const Rs = (e) => !!(e && e.__v_isRef === !0), _n = (e) => q(e) ? e : e == null ? "" : C(e) || W(e) && (e.toString === Ms || !$(e.toString)) ? Rs(e) ? _n(e.value) : JSON.stringify(e, Fs, 2) : String(e), Fs = (e, t) => Rs(t) ? Fs(e, t.value) : ft(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [o, s], r) => (n[qn(o, r) + " =>"] = s, n),
    {}
  )
} : As(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => qn(n))
} : rt(t) ? qn(t) : W(t) && !C(t) && !Ps(t) ? String(t) : t, qn = (e, t = "") => {
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
class gi {
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
function mi() {
  return ae;
}
let U;
const Jn = /* @__PURE__ */ new WeakSet();
class js {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ae && ae.active && ae.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Jn.has(this) && (Jn.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ls(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Jo(this), Us(this);
    const t = U, n = De;
    U = this, De = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && U !== this && we(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), Bs(this), U = t, De = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        wo(t);
      this.deps = this.depsTail = void 0, Jo(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Jn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    so(this) && this.run();
  }
  get dirty() {
    return so(this);
  }
}
let Hs = 0, jt, Ht;
function Ls(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Ht, Ht = e;
    return;
  }
  e.next = jt, jt = e;
}
function xo() {
  Hs++;
}
function Do() {
  if (--Hs > 0)
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
function Us(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Bs(e) {
  let t, n = e.depsTail, o = n;
  for (; o; ) {
    const s = o.prevDep;
    o.version === -1 ? (o === n && (n = s), wo(o), _i(o)) : t = o, o.dep.activeLink = o.prevActiveLink, o.prevActiveLink = void 0, o = s;
  }
  e.deps = t, e.depsTail = n;
}
function so(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Ks(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Ks(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Wt) || (e.globalVersion = Wt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !so(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = U, o = De;
  U = e, De = !0;
  try {
    Us(e);
    const s = e.fn(e._value);
    (t.version === 0 || tt(s, e._value)) && (e.flags |= 128, e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    U = n, De = o, Bs(e), e.flags &= -3;
  }
}
function wo(e, t = !1) {
  const { dep: n, prevSub: o, nextSub: s } = e;
  if (o && (o.nextSub = s, e.prevSub = void 0), s && (s.prevSub = o, e.nextSub = void 0), process.env.NODE_ENV !== "production" && n.subsHead === e && (n.subsHead = s), n.subs === e && (n.subs = o, !o && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep)
      wo(r, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function _i(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let De = !0;
const Ws = [];
function Ve() {
  Ws.push(De), De = !1;
}
function Se() {
  const e = Ws.pop();
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
class vi {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Vo {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!U || !De || U === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== U)
      n = this.activeLink = new vi(U, this), U.deps ? (n.prevDep = U.depsTail, U.depsTail.nextDep = n, U.depsTail = n) : U.deps = U.depsTail = n, ks(n);
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
      Do();
    }
  }
}
function ks(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let o = t.deps; o; o = o.nextDep)
        ks(o);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const ro = /* @__PURE__ */ new WeakMap(), at = Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), io = Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), kt = Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function X(e, t, n) {
  if (De && U) {
    let o = ro.get(e);
    o || ro.set(e, o = /* @__PURE__ */ new Map());
    let s = o.get(n);
    s || (o.set(n, s = new Vo()), s.map = o, s.key = n), process.env.NODE_ENV !== "production" ? s.track({
      target: e,
      type: t,
      key: n
    }) : s.track();
  }
}
function Ie(e, t, n, o, s, r) {
  const i = ro.get(e);
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
    const u = C(e), d = u && Oo(n);
    if (u && n === "length") {
      const f = Number(o);
      i.forEach((a, g) => {
        (g === "length" || g === kt || !rt(g) && g >= f) && l(a);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), d && l(i.get(kt)), t) {
        case "add":
          u ? d && l(i.get("length")) : (l(i.get(at)), ft(e) && l(i.get(io)));
          break;
        case "delete":
          u || (l(i.get(at)), ft(e) && l(i.get(io)));
          break;
        case "set":
          ft(e) && l(i.get(at));
          break;
      }
  }
  Do();
}
function mt(e) {
  const t = P(e);
  return t === e ? t : (X(t, "iterate", kt), ie(e) ? t : t.map(ee));
}
function Mn(e) {
  return X(e = P(e), "iterate", kt), e;
}
const Ei = {
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
    return Be(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Be(this, "filter", e, t, (n) => n.map(ee), arguments);
  },
  find(e, t) {
    return Be(this, "find", e, t, ee, arguments);
  },
  findIndex(e, t) {
    return Be(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Be(this, "findLast", e, t, ee, arguments);
  },
  findLastIndex(e, t) {
    return Be(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Be(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Yn(this, "includes", e);
  },
  indexOf(...e) {
    return Yn(this, "indexOf", e);
  },
  join(e) {
    return mt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Yn(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Be(this, "map", e, t, void 0, arguments);
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
    return Be(this, "some", e, t, void 0, arguments);
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
  const o = Mn(e), s = o[t]();
  return o !== e && !ie(e) && (s._next = s.next, s.next = () => {
    const r = s._next();
    return r.done || (r.value = n(r.value)), r;
  }), s;
}
const bi = Array.prototype;
function Be(e, t, n, o, s, r) {
  const i = Mn(e), l = i !== e && !ie(e), u = i[t];
  if (u !== bi[t]) {
    const a = u.apply(e, r);
    return l ? ee(a) : a;
  }
  let d = n;
  i !== e && (l ? d = function(a, g) {
    return n.call(this, ee(a), g, e);
  } : n.length > 2 && (d = function(a, g) {
    return n.call(this, a, g, e);
  }));
  const f = u.call(i, d, o);
  return l && s ? s(f) : f;
}
function zo(e, t, n, o) {
  const s = Mn(e);
  let r = n;
  return s !== e && (ie(e) ? n.length > 3 && (r = function(i, l, u) {
    return n.call(this, i, l, u, e);
  }) : r = function(i, l, u) {
    return n.call(this, i, ee(l), u, e);
  }), s[t](r, ...o);
}
function Yn(e, t, n) {
  const o = P(e);
  X(o, "iterate", kt);
  const s = o[t](...n);
  return (s === -1 || s === !1) && vn(n[0]) ? (n[0] = P(n[0]), o[t](...n)) : s;
}
function At(e, t, n = []) {
  Ve(), xo();
  const o = P(e)[t].apply(e, n);
  return Do(), Se(), o;
}
const Ni = /* @__PURE__ */ qe("__proto__,__v_isRef,__isVue"), Gs = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(rt)
);
function yi(e) {
  rt(e) || (e = String(e));
  const t = P(this);
  return X(t, "has", e), t.hasOwnProperty(e);
}
class qs {
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
      return o === (s ? r ? Qs : Zs : r ? Xs : Ys).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const i = C(t);
    if (!s) {
      let u;
      if (i && (u = Ei[n]))
        return u;
      if (n === "hasOwnProperty")
        return yi;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      z(t) ? t : o
    );
    if ((rt(n) ? Gs.has(n) : Ni(n)) || (s || X(t, "get", n), r))
      return l;
    if (z(l)) {
      const u = i && Oo(n) ? l : l.value;
      return s && W(u) ? co(u) : u;
    }
    return W(l) ? s ? co(l) : So(l) : l;
  }
}
class Js extends qs {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, o, s) {
    let r = t[n];
    if (!this._isShallow) {
      const u = He(r);
      if (!ie(o) && !He(o) && (r = P(r), o = P(o)), !C(t) && z(r) && !z(o))
        return u ? (process.env.NODE_ENV !== "production" && we(
          `Set operation on key "${String(n)}" failed: target is readonly.`,
          t[n]
        ), !0) : (r.value = o, !0);
    }
    const i = C(t) && Oo(n) ? Number(n) < t.length : H(t, n), l = Reflect.set(
      t,
      n,
      o,
      z(t) ? t : s
    );
    return t === P(s) && (i ? tt(o, r) && Ie(t, "set", n, o, r) : Ie(t, "add", n, o)), l;
  }
  deleteProperty(t, n) {
    const o = H(t, n), s = t[n], r = Reflect.deleteProperty(t, n);
    return r && o && Ie(t, "delete", n, void 0, s), r;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!rt(n) || !Gs.has(n)) && X(t, "has", n), o;
  }
  ownKeys(t) {
    return X(
      t,
      "iterate",
      C(t) ? "length" : at
    ), Reflect.ownKeys(t);
  }
}
class zs extends qs {
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
const Oi = /* @__PURE__ */ new Js(), xi = /* @__PURE__ */ new zs(), Di = /* @__PURE__ */ new Js(!0), wi = /* @__PURE__ */ new zs(!0), lo = (e) => e, sn = (e) => Reflect.getPrototypeOf(e);
function Vi(e, t, n) {
  return function(...o) {
    const s = this.__v_raw, r = P(s), i = ft(r), l = e === "entries" || e === Symbol.iterator && i, u = e === "keys" && i, d = s[e](...o), f = n ? lo : t ? En : ee;
    return !t && X(
      r,
      "iterate",
      u ? io : at
    ), {
      // iterator protocol
      next() {
        const { value: a, done: g } = d.next();
        return g ? { value: a, done: g } : {
          value: l ? [f(a[0]), f(a[1])] : f(a),
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
        `${$n(e)} operation ${n}failed: target is readonly.`,
        P(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Si(e, t) {
  const n = {
    get(s) {
      const r = this.__v_raw, i = P(r), l = P(s);
      e || (tt(s, l) && X(i, "get", s), X(i, "get", l));
      const { has: u } = sn(i), d = t ? lo : e ? En : ee;
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
      const i = this, l = i.__v_raw, u = P(l), d = t ? lo : e ? En : ee;
      return !e && X(u, "iterate", at), l.forEach((f, a) => s.call(r, d(f), d(a), i));
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
        !t && !ie(s) && !He(s) && (s = P(s));
        const r = P(this);
        return sn(r).has.call(r, s) || (r.add(s), Ie(r, "add", s, s)), this;
      },
      set(s, r) {
        !t && !ie(r) && !He(r) && (r = P(r));
        const i = P(this), { has: l, get: u } = sn(i);
        let d = l.call(i, s);
        d ? process.env.NODE_ENV !== "production" && Yo(i, l, s) : (s = P(s), d = l.call(i, s));
        const f = u.call(i, s);
        return i.set(s, r), d ? tt(r, f) && Ie(i, "set", s, r, f) : Ie(i, "add", s, r), this;
      },
      delete(s) {
        const r = P(this), { has: i, get: l } = sn(r);
        let u = i.call(r, s);
        u ? process.env.NODE_ENV !== "production" && Yo(r, i, s) : (s = P(s), u = i.call(r, s));
        const d = l ? l.call(r, s) : void 0, f = r.delete(s);
        return u && Ie(r, "delete", s, void 0, d), f;
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
    n[s] = Vi(s, e, t);
  }), n;
}
function Pn(e, t) {
  const n = Si(e, t);
  return (o, s, r) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get(
    H(n, s) && s in o ? n : o,
    s,
    r
  );
}
const Ti = {
  get: /* @__PURE__ */ Pn(!1, !1)
}, Ci = {
  get: /* @__PURE__ */ Pn(!1, !0)
}, $i = {
  get: /* @__PURE__ */ Pn(!0, !1)
}, Ai = {
  get: /* @__PURE__ */ Pn(!0, !0)
};
function Yo(e, t, n) {
  const o = P(n);
  if (o !== n && t.call(e, o)) {
    const s = yo(e);
    we(
      `Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Ys = /* @__PURE__ */ new WeakMap(), Xs = /* @__PURE__ */ new WeakMap(), Zs = /* @__PURE__ */ new WeakMap(), Qs = /* @__PURE__ */ new WeakMap();
function Mi(e) {
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
function Pi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Mi(yo(e));
}
function So(e) {
  return He(e) ? e : In(
    e,
    !1,
    Oi,
    Ti,
    Ys
  );
}
function Ii(e) {
  return In(
    e,
    !1,
    Di,
    Ci,
    Xs
  );
}
function co(e) {
  return In(
    e,
    !0,
    xi,
    $i,
    Zs
  );
}
function Re(e) {
  return In(
    e,
    !0,
    wi,
    Ai,
    Qs
  );
}
function In(e, t, n, o, s) {
  if (!W(e))
    return process.env.NODE_ENV !== "production" && we(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = Pi(e);
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
  return He(e) ? nt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function He(e) {
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
function Ri(e) {
  return !H(e, "__v_skip") && Object.isExtensible(e) && mn(e, "__v_skip", !0), e;
}
const ee = (e) => W(e) ? So(e) : e, En = (e) => W(e) ? co(e) : e;
function z(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function er(e) {
  return Fi(e, !1);
}
function Fi(e, t) {
  return z(e) ? e : new ji(e, t);
}
class ji {
  constructor(t, n) {
    this.dep = new Vo(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : P(t), this._value = n ? t : ee(t), this.__v_isShallow = n;
  }
  get value() {
    return process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, o = this.__v_isShallow || ie(t) || He(t);
    t = o ? t : P(t), tt(t, n) && (this._rawValue = t, this._value = o ? t : ee(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }) : this.dep.trigger());
  }
}
function ke(e) {
  return z(e) ? e.value : e;
}
const Hi = {
  get: (e, t, n) => t === "__v_raw" ? e : ke(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const s = e[t];
    return z(s) && !z(n) ? (s.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function tr(e) {
  return nt(e) ? e : new Proxy(e, Hi);
}
class Li {
  constructor(t, n, o) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Vo(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Wt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = o;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    U !== this)
      return Ls(this, !0), !0;
    process.env.NODE_ENV;
  }
  get value() {
    const t = process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track();
    return Ks(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter ? this.setter(t) : process.env.NODE_ENV !== "production" && we("Write operation failed: computed value is readonly");
  }
}
function Ui(e, t, n = !1) {
  let o, s;
  $(e) ? o = e : (o = e.get, s = e.set);
  const r = new Li(o, s, n);
  return process.env.NODE_ENV, r;
}
const ln = {}, bn = /* @__PURE__ */ new WeakMap();
let ut;
function Bi(e, t = !1, n = ut) {
  if (n) {
    let o = bn.get(n);
    o || bn.set(n, o = []), o.push(e);
  } else process.env.NODE_ENV !== "production" && !t && we(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function Ki(e, t, n = K) {
  const { immediate: o, deep: s, once: r, scheduler: i, augmentJob: l, call: u } = n, d = (S) => {
    (n.onWarn || we)(
      "Invalid watch source: ",
      S,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, f = (S) => s ? S : ie(S) || s === !1 || s === 0 ? et(S, 1) : et(S);
  let a, g, O, A, w = !1, J = !1;
  if (z(e) ? (g = () => e.value, w = ie(e)) : nt(e) ? (g = () => f(e), w = !0) : C(e) ? (J = !0, w = e.some((S) => nt(S) || ie(S)), g = () => e.map((S) => {
    if (z(S))
      return S.value;
    if (nt(S))
      return f(S);
    if ($(S))
      return u ? u(S, 2) : S();
    process.env.NODE_ENV !== "production" && d(S);
  })) : $(e) ? t ? g = u ? () => u(e, 2) : e : g = () => {
    if (O) {
      Ve();
      try {
        O();
      } finally {
        Se();
      }
    }
    const S = ut;
    ut = a;
    try {
      return u ? u(e, 3, [A]) : e(A);
    } finally {
      ut = S;
    }
  } : (g = Z, process.env.NODE_ENV !== "production" && d(e)), t && s) {
    const S = g, Q = s === !0 ? 1 / 0 : s;
    g = () => et(S(), Q);
  }
  const G = mi(), R = () => {
    a.stop(), G && G.active && bo(G.effects, a);
  };
  if (r && t) {
    const S = t;
    t = (...Q) => {
      S(...Q), R();
    };
  }
  let L = J ? new Array(e.length).fill(ln) : ln;
  const pe = (S) => {
    if (!(!(a.flags & 1) || !a.dirty && !S))
      if (t) {
        const Q = a.run();
        if (s || w || (J ? Q.some((_e, ne) => tt(_e, L[ne])) : tt(Q, L))) {
          O && O();
          const _e = ut;
          ut = a;
          try {
            const ne = [
              Q,
              // pass undefined as the old value when it's changed for the first time
              L === ln ? void 0 : J && L[0] === ln ? [] : L,
              A
            ];
            L = Q, u ? u(t, 3, ne) : (
              // @ts-expect-error
              t(...ne)
            );
          } finally {
            ut = _e;
          }
        }
      } else
        a.run();
  };
  return l && l(pe), a = new js(g), a.scheduler = i ? () => i(pe, !1) : pe, A = (S) => Bi(S, !1, a), O = a.onStop = () => {
    const S = bn.get(a);
    if (S) {
      if (u)
        u(S, 4);
      else
        for (const Q of S) Q();
      bn.delete(a);
    }
  }, process.env.NODE_ENV !== "production" && (a.onTrack = n.onTrack, a.onTrigger = n.onTrigger), t ? o ? pe(!0) : L = a.run() : i ? i(pe.bind(null, !0), !0) : a.run(), R.pause = a.pause.bind(a), R.resume = a.resume.bind(a), R.stop = R, R;
}
function et(e, t = 1 / 0, n) {
  if (t <= 0 || !W(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, z(e))
    et(e.value, t, n);
  else if (C(e))
    for (let o = 0; o < e.length; o++)
      et(e[o], t, n);
  else if (As(e) || ft(e))
    e.forEach((o) => {
      et(o, t, n);
    });
  else if (Ps(e)) {
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
let Xn = !1;
function y(e, ...t) {
  if (Xn) return;
  Xn = !0, Ve();
  const n = pt.length ? pt[pt.length - 1].component : null, o = n && n.appContext.config.warnHandler, s = Wi();
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
          ({ vnode: r }) => `at <${Ln(n, r.type)}>`
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
  Se(), Xn = !1;
}
function Wi() {
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
`], ...Gi(n));
  }), t;
}
function Gi({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, s = ` at <${Ln(
    e.component,
    e.type,
    o
  )}`, r = ">" + n;
  return e.props ? [s, ...qi(e.props), r] : [s + r];
}
function qi(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((o) => {
    t.push(...nr(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function nr(e, t, n) {
  return q(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : z(t) ? (t = nr(e, P(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : $(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = P(t), n ? t : [`${e}=`, t]);
}
const To = {
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
function Le(e, t, n, o) {
  if ($(e)) {
    const s = wt(e, t, n, o);
    return s && No(s) && s.catch((r) => {
      Xt(r, t, n);
    }), s;
  }
  if (C(e)) {
    const s = [];
    for (let r = 0; r < e.length; r++)
      s.push(Le(e[r], t, n, o));
    return s;
  } else process.env.NODE_ENV !== "production" && y(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function Xt(e, t, n, o = !0) {
  const s = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: i } = t && t.appContext.config || K;
  if (t) {
    let l = t.parent;
    const u = t.proxy, d = process.env.NODE_ENV !== "production" ? To[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const f = l.ec;
      if (f) {
        for (let a = 0; a < f.length; a++)
          if (f[a](e, u, d) === !1)
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
  Ji(e, n, s, o, i);
}
function Ji(e, t, n, o = !0, s = !1) {
  if (process.env.NODE_ENV !== "production") {
    const r = To[t];
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
const or = /* @__PURE__ */ Promise.resolve();
let Nn = null;
const zi = 100;
function sr(e) {
  const t = Nn || or;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Yi(e) {
  let t = Pe + 1, n = re.length;
  for (; t < n; ) {
    const o = t + n >>> 1, s = re[o], r = Gt(s);
    r < e || r === e && s.flags & 2 ? t = o + 1 : n = o;
  }
  return t;
}
function Rn(e) {
  if (!(e.flags & 1)) {
    const t = Gt(e), n = re[re.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Gt(n) ? re.push(e) : re.splice(Yi(t), 0, e), e.flags |= 1, rr();
  }
}
function rr() {
  Nn || (Nn = or.then(cr));
}
function ir(e) {
  C(e) ? Nt.push(...e) : Ze && e.id === -1 ? Ze.splice(Et + 1, 0, e) : e.flags & 1 || (Nt.push(e), e.flags |= 1), rr();
}
function Xo(e, t, n = Pe + 1) {
  for (process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()); n < re.length; n++) {
    const o = re[n];
    if (o && o.flags & 2) {
      if (e && o.id !== e.uid || process.env.NODE_ENV !== "production" && Co(t, o))
        continue;
      re.splice(n, 1), n--, o.flags & 4 && (o.flags &= -2), o(), o.flags & 4 || (o.flags &= -2);
    }
  }
}
function lr(e) {
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
      process.env.NODE_ENV !== "production" && Co(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    Ze = null, Et = 0;
  }
}
const Gt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function cr(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => Co(e, n) : Z;
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
    Pe = -1, re.length = 0, lr(e), Nn = null, (re.length || Nt.length) && cr(e);
  }
}
function Co(e, t) {
  const n = e.get(t) || 0;
  if (n > zi) {
    const o = t.i, s = o && kr(o.type);
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
  createRecord: Zn(ur),
  rerender: Zn(Qi),
  reload: Zn(el)
});
const ht = /* @__PURE__ */ new Map();
function Xi(e) {
  const t = e.type.__hmrId;
  let n = ht.get(t);
  n || (ur(t, e.type), n = ht.get(t)), n.instances.add(e);
}
function Zi(e) {
  ht.get(e.type.__hmrId).instances.delete(e);
}
function ur(e, t) {
  return ht.has(e) ? !1 : (ht.set(e, {
    initialDef: yn(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function yn(e) {
  return Gr(e) ? e.__vccOpts : e;
}
function Qi(e, t) {
  const n = ht.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, yn(o.type).render = t), o.renderCache = [], Fe = !0, o.job.flags & 8 || o.update(), Fe = !1;
  }));
}
function el(e, t) {
  const n = ht.get(e);
  if (!n) return;
  t = yn(t), Zo(n.initialDef, t);
  const o = [...n.instances];
  for (let s = 0; s < o.length; s++) {
    const r = o[s], i = yn(r.type);
    let l = fn.get(i);
    l || (i !== n.initialDef && Zo(i, t), fn.set(i, l = /* @__PURE__ */ new Set())), l.add(r), r.appContext.propsCache.delete(r.type), r.appContext.emitsCache.delete(r.type), r.appContext.optionsCache.delete(r.type), r.ceReload ? (l.add(r), r.ceReload(t.styles), l.delete(r)) : r.parent ? Rn(() => {
      r.job.flags & 8 || (Fe = !0, r.parent.update(), Fe = !1, l.delete(r));
    }) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), r.root.ce && r !== r.root && r.root.ce._removeChildStyle(i);
  }
  ir(() => {
    fn.clear();
  });
}
function Zo(e, t) {
  Y(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Zn(e) {
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
let Oe, It = [], uo = !1;
function Zt(e, ...t) {
  Oe ? Oe.emit(e, ...t) : uo || It.push({ event: e, args: t });
}
function $o(e, t) {
  var n, o;
  Oe = e, Oe ? (Oe.enabled = !0, It.forEach(({ event: s, args: r }) => Oe.emit(s, ...r)), It = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((o = (n = window.navigator) == null ? void 0 : n.userAgent) != null && o.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((r) => {
    $o(r, t);
  }), setTimeout(() => {
    Oe || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, uo = !0, It = []);
  }, 3e3)) : (uo = !0, It = []);
}
function tl(e, t) {
  Zt("app:init", e, t, {
    Fragment: ve,
    Text: en,
    Comment: me,
    Static: pn
  });
}
function nl(e) {
  Zt("app:unmount", e);
}
const ol = /* @__PURE__ */ Ao(
  "component:added"
  /* COMPONENT_ADDED */
), fr = /* @__PURE__ */ Ao(
  "component:updated"
  /* COMPONENT_UPDATED */
), sl = /* @__PURE__ */ Ao(
  "component:removed"
  /* COMPONENT_REMOVED */
), rl = (e) => {
  Oe && typeof Oe.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !Oe.cleanupBuffer(e) && sl(e);
};
// @__NO_SIDE_EFFECTS__
function Ao(e) {
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
const il = /* @__PURE__ */ ar(
  "perf:start"
  /* PERFORMANCE_START */
), ll = /* @__PURE__ */ ar(
  "perf:end"
  /* PERFORMANCE_END */
);
function ar(e) {
  return (t, n, o) => {
    Zt(e, t.appContext.app, t.uid, t, n, o);
  };
}
function cl(e, t, n) {
  Zt(
    "component:emit",
    e.appContext.app,
    e,
    t,
    n
  );
}
let he = null, pr = null;
function On(e) {
  const t = he;
  return he = e, pr = e && e.type.__scopeId || null, t;
}
function ul(e, t = he, n) {
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
    return process.env.NODE_ENV !== "production" && fr(t), i;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function dr(e) {
  Qr(e) && y("Do not use built-in directive ids as custom directive id: " + e);
}
function it(e, t, n, o) {
  const s = e.dirs, r = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const l = s[i];
    r && (l.oldValue = r[i].value);
    let u = l.dir[o];
    u && (Ve(), Le(u, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Se());
  }
}
const fl = Symbol("_vte"), al = (e) => e.__isTeleport, pl = Symbol("_leaveCb");
function Mo(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Mo(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Qt(e, t) {
  return $(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Y({ name: e.name }, t, { setup: e })
  ) : e;
}
function hr(e) {
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
  const r = o.shapeFlag & 4 ? Uo(o.component) : o.el, i = s ? null : r, { i: l, r: u } = e;
  if (process.env.NODE_ENV !== "production" && !l) {
    y(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const d = t && t.r, f = l.refs === K ? l.refs = {} : l.refs, a = l.setupState, g = P(a), O = a === K ? $s : (w) => process.env.NODE_ENV !== "production" && (H(g, w) && !z(g[w]) && y(
    `Template ref "${w}" used on a non-ref value. It will not work in the production build.`
  ), Qo.has(g[w])) ? !1 : H(g, w), A = (w) => process.env.NODE_ENV === "production" || !Qo.has(w);
  if (d != null && d !== u) {
    if (es(t), q(d))
      f[d] = null, O(d) && (a[d] = null);
    else if (z(d)) {
      A(d) && (d.value = null);
      const w = t;
      w.k && (f[w.k] = null);
    }
  }
  if ($(u))
    wt(u, l, 12, [i, f]);
  else {
    const w = q(u), J = z(u);
    if (w || J) {
      const G = () => {
        if (e.f) {
          const R = w ? O(u) ? a[u] : f[u] : A(u) || !e.k ? u.value : f[e.k];
          if (s)
            C(R) && bo(R, r);
          else if (C(R))
            R.includes(r) || R.push(r);
          else if (w)
            f[u] = [r], O(u) && (a[u] = f[u]);
          else {
            const L = [r];
            A(u) && (u.value = L), e.k && (f[e.k] = L);
          }
        } else w ? (f[u] = i, O(u) && (a[u] = i)) : J ? (A(u) && (u.value = i), e.k && (f[e.k] = i)) : process.env.NODE_ENV !== "production" && y("Invalid template ref type:", u, `(${typeof u})`);
      };
      if (i) {
        const R = () => {
          G(), xn.delete(e);
        };
        R.id = -1, xn.set(e, R), de(R, n);
      } else
        es(e), G();
    } else process.env.NODE_ENV !== "production" && y("Invalid template ref type:", u, `(${typeof u})`);
  }
}
function es(e) {
  const t = xn.get(e);
  t && (t.flags |= 8, xn.delete(e));
}
Yt().requestIdleCallback;
Yt().cancelIdleCallback;
const Ut = (e) => !!e.type.__asyncLoader, Po = (e) => e.type.__isKeepAlive;
function dl(e, t) {
  gr(e, "a", t);
}
function hl(e, t) {
  gr(e, "da", t);
}
function gr(e, t, n = te) {
  const o = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if (Fn(t, o, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      Po(s.parent.vnode) && gl(o, t, n, s), s = s.parent;
  }
}
function gl(e, t, n, o) {
  const s = Fn(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  _r(() => {
    bo(o[t], s);
  }, n);
}
function Fn(e, t, n = te, o = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...i) => {
      Ve();
      const l = tn(n), u = Le(t, n, e, i);
      return l(), Se(), u;
    });
    return o ? s.unshift(r) : s.push(r), r;
  } else if (process.env.NODE_ENV !== "production") {
    const s = ct(To[e].replace(/ hook$/, ""));
    y(
      `${s} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const Je = (e) => (t, n = te) => {
  (!Jt || e === "sp") && Fn(e, (...o) => t(...o), n);
}, ml = Je("bm"), mr = Je("m"), _l = Je(
  "bu"
), vl = Je("u"), El = Je(
  "bum"
), _r = Je("um"), bl = Je(
  "sp"
), Nl = Je("rtg"), yl = Je("rtc");
function Ol(e, t = te) {
  Fn("ec", e, t);
}
const xl = Symbol.for("v-ndc");
function vr(e, t, n, o) {
  let s;
  const r = n, i = C(e);
  if (i || q(e)) {
    const l = i && nt(e);
    let u = !1, d = !1;
    l && (u = !ie(e), d = He(e), e = Mn(e)), s = new Array(e.length);
    for (let f = 0, a = e.length; f < a; f++)
      s[f] = t(
        u ? d ? En(ee(e[f])) : ee(e[f]) : e[f],
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
        (l, u) => t(l, u, void 0, r)
      );
    else {
      const l = Object.keys(e);
      s = new Array(l.length);
      for (let u = 0, d = l.length; u < d; u++) {
        const f = l[u];
        s[u] = t(e[f], f, u, r);
      }
    }
  else
    s = [];
  return s;
}
const fo = (e) => e ? Kr(e) ? Uo(e) : fo(e.parent) : null, dt = (
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
    $parent: (e) => fo(e.parent),
    $root: (e) => fo(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Nr(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Rn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = sr.bind(e.proxy)),
    $watch: (e) => oc.bind(e)
  })
), Io = (e) => e === "_" || e === "$", Qn = (e, t) => e !== K && !e.__isScriptSetup && H(e, t), Er = {
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
        if (Qn(o, t))
          return i[t] = 1, o[t];
        if (s !== K && H(s, t))
          return i[t] = 2, s[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (d = e.propsOptions[0]) && H(d, t)
        )
          return i[t] = 3, r[t];
        if (n !== K && H(n, t))
          return i[t] = 4, n[t];
        ao && (i[t] = 0);
      }
    }
    const f = dt[t];
    let a, g;
    if (f)
      return t === "$attrs" ? (X(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && Vn()) : process.env.NODE_ENV !== "production" && t === "$slots" && X(e, "get", t), f(e);
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
    process.env.NODE_ENV !== "production" && he && (!q(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (s !== K && Io(t[0]) && H(s, t) ? y(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === he && y(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: s, ctx: r } = e;
    return Qn(s, t) ? (s[t] = n, !0) : process.env.NODE_ENV !== "production" && s.__isScriptSetup && H(s, t) ? (y(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : o !== K && H(o, t) ? (o[t] = n, !0) : H(e.props, t) ? (process.env.NODE_ENV !== "production" && y(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && y(
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
    return !!(n[l] || e !== K && l[0] !== "$" && H(e, l) || Qn(t, l) || (u = r[0]) && H(u, l) || H(o, l) || H(dt, l) || H(s.config.globalProperties, l) || (d = i.__cssModules) && d[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : H(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (Er.ownKeys = (e) => (y(
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
function wl(e) {
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
function Vl(e) {
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
function Sl() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? y(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let ao = !0;
function Tl(e) {
  const t = Nr(e), n = e.proxy, o = e.ctx;
  ao = !1, t.beforeCreate && ns(t.beforeCreate, e, "bc");
  const {
    // state
    data: s,
    computed: r,
    methods: i,
    watch: l,
    provide: u,
    inject: d,
    // lifecycle
    created: f,
    beforeMount: a,
    mounted: g,
    beforeUpdate: O,
    updated: A,
    activated: w,
    deactivated: J,
    beforeDestroy: G,
    beforeUnmount: R,
    destroyed: L,
    unmounted: pe,
    render: S,
    renderTracked: Q,
    renderTriggered: _e,
    errorCaptured: ne,
    serverPrefetch: le,
    // public API
    expose: Ue,
    inheritAttrs: ze,
    // assets
    components: Ne,
    directives: nn,
    filters: Bo
  } = t, Ye = process.env.NODE_ENV !== "production" ? Sl() : null;
  if (process.env.NODE_ENV !== "production") {
    const [F] = e.propsOptions;
    if (F)
      for (const I in F)
        Ye("Props", I);
  }
  if (d && Cl(d, o, Ye), i)
    for (const F in i) {
      const I = i[F];
      $(I) ? (process.env.NODE_ENV !== "production" ? Object.defineProperty(o, F, {
        value: I.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : o[F] = I.bind(n), process.env.NODE_ENV !== "production" && Ye("Methods", F)) : process.env.NODE_ENV !== "production" && y(
        `Method "${F}" has type "${typeof I}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (s) {
    process.env.NODE_ENV !== "production" && !$(s) && y(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const F = s.call(n, n);
    if (process.env.NODE_ENV !== "production" && No(F) && y(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !W(F))
      process.env.NODE_ENV !== "production" && y("data() should return an object.");
    else if (e.data = So(F), process.env.NODE_ENV !== "production")
      for (const I in F)
        Ye("Data", I), Io(I[0]) || Object.defineProperty(o, I, {
          configurable: !0,
          enumerable: !0,
          get: () => F[I],
          set: Z
        });
  }
  if (ao = !0, r)
    for (const F in r) {
      const I = r[F], Te = $(I) ? I.bind(n, n) : $(I.get) ? I.get.bind(n, n) : Z;
      process.env.NODE_ENV !== "production" && Te === Z && y(`Computed property "${F}" has no getter.`);
      const Wn = !$(I) && $(I.set) ? I.set.bind(n) : process.env.NODE_ENV !== "production" ? () => {
        y(
          `Write operation failed: computed property "${F}" is readonly.`
        );
      } : Z, Vt = Un({
        get: Te,
        set: Wn
      });
      Object.defineProperty(o, F, {
        enumerable: !0,
        configurable: !0,
        get: () => Vt.value,
        set: (gt) => Vt.value = gt
      }), process.env.NODE_ENV !== "production" && Ye("Computed", F);
    }
  if (l)
    for (const F in l)
      br(l[F], o, n, F);
  if (u) {
    const F = $(u) ? u.call(n) : u;
    Reflect.ownKeys(F).forEach((I) => {
      Rl(I, F[I]);
    });
  }
  f && ns(f, e, "c");
  function ce(F, I) {
    C(I) ? I.forEach((Te) => F(Te.bind(n))) : I && F(I.bind(n));
  }
  if (ce(ml, a), ce(mr, g), ce(_l, O), ce(vl, A), ce(dl, w), ce(hl, J), ce(Ol, ne), ce(yl, Q), ce(Nl, _e), ce(El, R), ce(_r, pe), ce(bl, le), C(Ue))
    if (Ue.length) {
      const F = e.exposed || (e.exposed = {});
      Ue.forEach((I) => {
        Object.defineProperty(F, I, {
          get: () => n[I],
          set: (Te) => n[I] = Te,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  S && e.render === Z && (e.render = S), ze != null && (e.inheritAttrs = ze), Ne && (e.components = Ne), nn && (e.directives = nn), le && hr(e);
}
function Cl(e, t, n = Z) {
  C(e) && (e = po(e));
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
  Le(
    C(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function br(e, t, n, o) {
  let s = o.includes(".") ? Mr(n, o) : () => n[o];
  if (q(e)) {
    const r = t[e];
    $(r) ? Ot(s, r) : process.env.NODE_ENV !== "production" && y(`Invalid watch handler specified by key "${e}"`, r);
  } else if ($(e))
    Ot(s, e.bind(n));
  else if (W(e))
    if (C(e))
      e.forEach((r) => br(r, t, n, o));
    else {
      const r = $(e.handler) ? e.handler.bind(n) : t[e.handler];
      $(r) ? Ot(s, r, e) : process.env.NODE_ENV !== "production" && y(`Invalid watch handler specified by key "${e.handler}"`, r);
    }
  else process.env.NODE_ENV !== "production" && y(`Invalid watch option: "${o}"`, e);
}
function Nr(e) {
  const t = e.type, { mixins: n, extends: o } = t, {
    mixins: s,
    optionsCache: r,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = r.get(t);
  let u;
  return l ? u = l : !s.length && !n && !o ? u = t : (u = {}, s.length && s.forEach(
    (d) => Dn(u, d, i, !0)
  ), Dn(u, t, i)), W(t) && r.set(t, u), u;
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
      const l = $l[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const $l = {
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
  watch: Ml,
  // provide / inject
  provide: os,
  inject: Al
};
function os(e, t) {
  return t ? e ? function() {
    return Y(
      $(e) ? e.call(this, this) : e,
      $(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Al(e, t) {
  return Rt(po(e), po(t));
}
function po(e) {
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
function Ml(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Y(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = se(e[o], t[o]);
  return n;
}
function yr() {
  return {
    app: null,
    config: {
      isNativeTag: $s,
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
let Pl = 0;
function Il(e, t) {
  return function(o, s = null) {
    $(o) || (o = Y({}, o)), s != null && !W(s) && (process.env.NODE_ENV !== "production" && y("root props passed to app.mount() must be an object."), s = null);
    const r = yr(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let u = !1;
    const d = r.app = {
      _uid: Pl++,
      _component: o,
      _props: s,
      _container: null,
      _context: r,
      _instance: null,
      version: _s,
      get config() {
        return r.config;
      },
      set config(f) {
        process.env.NODE_ENV !== "production" && y(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(f, ...a) {
        return i.has(f) ? process.env.NODE_ENV !== "production" && y("Plugin has already been applied to target app.") : f && $(f.install) ? (i.add(f), f.install(d, ...a)) : $(f) ? (i.add(f), f(d, ...a)) : process.env.NODE_ENV !== "production" && y(
          'A plugin must either be a function or an object with an "install" function.'
        ), d;
      },
      mixin(f) {
        return r.mixins.includes(f) ? process.env.NODE_ENV !== "production" && y(
          "Mixin has already been applied to target app" + (f.name ? `: ${f.name}` : "")
        ) : r.mixins.push(f), d;
      },
      component(f, a) {
        return process.env.NODE_ENV !== "production" && vo(f, r.config), a ? (process.env.NODE_ENV !== "production" && r.components[f] && y(`Component "${f}" has already been registered in target app.`), r.components[f] = a, d) : r.components[f];
      },
      directive(f, a) {
        return process.env.NODE_ENV !== "production" && dr(f), a ? (process.env.NODE_ENV !== "production" && r.directives[f] && y(`Directive "${f}" has already been registered in target app.`), r.directives[f] = a, d) : r.directives[f];
      },
      mount(f, a, g) {
        if (u)
          process.env.NODE_ENV !== "production" && y(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          process.env.NODE_ENV !== "production" && f.__vue_app__ && y(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const O = d._ceVNode || be(o, s);
          return O.appContext = r, g === !0 ? g = "svg" : g === !1 && (g = void 0), process.env.NODE_ENV !== "production" && (r.reload = () => {
            const A = st(O);
            A.el = null, e(A, f, g);
          }), e(O, f, g), u = !0, d._container = f, f.__vue_app__ = d, process.env.NODE_ENV !== "production" && (d._instance = O.component, tl(d, _s)), Uo(O.component);
        }
      },
      onUnmount(f) {
        process.env.NODE_ENV !== "production" && typeof f != "function" && y(
          `Expected function as first argument to app.onUnmount(), but got ${typeof f}`
        ), l.push(f);
      },
      unmount() {
        u ? (Le(
          l,
          d._instance,
          16
        ), e(null, d._container), process.env.NODE_ENV !== "production" && (d._instance = null, nl(d)), delete d._container.__vue_app__) : process.env.NODE_ENV !== "production" && y("Cannot unmount an app that is not mounted.");
      },
      provide(f, a) {
        return process.env.NODE_ENV !== "production" && f in r.provides && (H(r.provides, f) ? y(
          `App already provides property with key "${String(f)}". It will be overwritten with the new value.`
        ) : y(
          `App already provides property with key "${String(f)}" inherited from its parent element. It will be overwritten with the new value.`
        )), r.provides[f] = a, d;
      },
      runWithContext(f) {
        const a = yt;
        yt = d;
        try {
          return f();
        } finally {
          yt = a;
        }
      }
    };
    return d;
  };
}
let yt = null;
function Rl(e, t) {
  if (!te)
    process.env.NODE_ENV !== "production" && y("provide() can only be used inside setup().");
  else {
    let n = te.provides;
    const o = te.parent && te.parent.provides;
    o === n && (n = te.provides = Object.create(o)), n[e] = t;
  }
}
function Bt(e, t, n = !1) {
  const o = Br();
  if (o || yt) {
    let s = yt ? yt._context.provides : o ? o.parent == null || o.ce ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : void 0;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return n && $(t) ? t.call(o && o.proxy) : t;
    process.env.NODE_ENV !== "production" && y(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && y("inject() can only be used inside setup() or functional components.");
}
const Or = {}, xr = () => Object.create(Or), Dr = (e) => Object.getPrototypeOf(e) === Or;
function Fl(e, t, n, o = !1) {
  const s = {}, r = xr();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), wr(e, t, s, r);
  for (const i in e.propsOptions[0])
    i in s || (s[i] = void 0);
  process.env.NODE_ENV !== "production" && Sr(t || {}, s, e), n ? e.props = o ? s : Ii(s) : e.type.props ? e.props = s : e.props = r, e.attrs = r;
}
function jl(e) {
  for (; e; ) {
    if (e.type.__hmrId) return !0;
    e = e.parent;
  }
}
function Hl(e, t, n, o) {
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
    !(process.env.NODE_ENV !== "production" && jl(e)) && (o || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const f = e.vnode.dynamicProps;
      for (let a = 0; a < f.length; a++) {
        let g = f[a];
        if (jn(e.emitsOptions, g))
          continue;
        const O = t[g];
        if (u)
          if (H(r, g))
            O !== r[g] && (r[g] = O, d = !0);
          else {
            const A = xe(g);
            s[A] = ho(
              u,
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
    wr(e, t, s, r) && (d = !0);
    let f;
    for (const a in l)
      (!t || // for camelCase
      !H(t, a) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = ot(a)) === a || !H(t, f))) && (u ? n && // for camelCase
      (n[a] !== void 0 || // for kebab-case
      n[f] !== void 0) && (s[a] = ho(
        u,
        l,
        a,
        void 0,
        e,
        !0
      )) : delete s[a]);
    if (r !== l)
      for (const a in r)
        (!t || !H(t, a)) && (delete r[a], d = !0);
  }
  d && Ie(e.attrs, "set", ""), process.env.NODE_ENV !== "production" && Sr(t || {}, s, e);
}
function wr(e, t, n, o) {
  const [s, r] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let u in t) {
      if (Ft(u))
        continue;
      const d = t[u];
      let f;
      s && H(s, f = xe(u)) ? !r || !r.includes(f) ? n[f] = d : (l || (l = {}))[f] = d : jn(e.emitsOptions, u) || (!(u in o) || d !== o[u]) && (o[u] = d, i = !0);
    }
  if (r) {
    const u = P(n), d = l || K;
    for (let f = 0; f < r.length; f++) {
      const a = r[f];
      n[a] = ho(
        s,
        u,
        a,
        d[a],
        e,
        !H(d, a)
      );
    }
  }
  return i;
}
function ho(e, t, n, o, s, r) {
  const i = e[n];
  if (i != null) {
    const l = H(i, "default");
    if (l && o === void 0) {
      const u = i.default;
      if (i.type !== Function && !i.skipFactory && $(u)) {
        const { propsDefaults: d } = s;
        if (n in d)
          o = d[n];
        else {
          const f = tn(s);
          o = d[n] = u.call(
            null,
            t
          ), f();
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
const Ll = /* @__PURE__ */ new WeakMap();
function Vr(e, t, n = !1) {
  const o = n ? Ll : t.propsCache, s = o.get(e);
  if (s)
    return s;
  const r = e.props, i = {}, l = [];
  let u = !1;
  if (!$(e)) {
    const f = (a) => {
      u = !0;
      const [g, O] = Vr(a, t, !0);
      Y(i, g), O && l.push(...O);
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!r && !u)
    return W(e) && o.set(e, bt), bt;
  if (C(r))
    for (let f = 0; f < r.length; f++) {
      process.env.NODE_ENV !== "production" && !q(r[f]) && y("props must be strings when using array syntax.", r[f]);
      const a = xe(r[f]);
      rs(a) && (i[a] = K);
    }
  else if (r) {
    process.env.NODE_ENV !== "production" && !W(r) && y("invalid props options", r);
    for (const f in r) {
      const a = xe(f);
      if (rs(a)) {
        const g = r[f], O = i[a] = C(g) || $(g) ? { type: g } : Y({}, g), A = O.type;
        let w = !1, J = !0;
        if (C(A))
          for (let G = 0; G < A.length; ++G) {
            const R = A[G], L = $(R) && R.name;
            if (L === "Boolean") {
              w = !0;
              break;
            } else L === "String" && (J = !1);
          }
        else
          w = $(A) && A.name === "Boolean";
        O[
          0
          /* shouldCast */
        ] = w, O[
          1
          /* shouldCastTrue */
        ] = J, (w || H(O, "default")) && l.push(a);
      }
    }
  }
  const d = [i, l];
  return W(e) && o.set(e, d), d;
}
function rs(e) {
  return e[0] !== "$" && !Ft(e) ? !0 : (process.env.NODE_ENV !== "production" && y(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function Ul(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function Sr(e, t, n) {
  const o = P(t), s = n.propsOptions[0], r = Object.keys(e).map((i) => xe(i));
  for (const i in s) {
    let l = s[i];
    l != null && Bl(
      i,
      o[i],
      l,
      process.env.NODE_ENV !== "production" ? Re(o) : o,
      !r.includes(i)
    );
  }
}
function Bl(e, t, n, o, s) {
  const { type: r, required: i, validator: l, skipCheck: u } = n;
  if (i && s) {
    y('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !i)) {
    if (r != null && r !== !0 && !u) {
      let d = !1;
      const f = C(r) ? r : [r], a = [];
      for (let g = 0; g < f.length && !d; g++) {
        const { valid: O, expectedType: A } = Wl(t, f[g]);
        a.push(A || ""), d = O;
      }
      if (!d) {
        y(kl(e, t, a));
        return;
      }
    }
    l && !l(t, o) && y('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const Kl = /* @__PURE__ */ qe(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function Wl(e, t) {
  let n;
  const o = Ul(t);
  if (o === "null")
    n = e === null;
  else if (Kl(o)) {
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
  let o = `Invalid prop: type check failed for prop "${e}". Expected ${n.map($n).join(" | ")}`;
  const s = n[0], r = yo(t), i = is(t, s), l = is(t, r);
  return n.length === 1 && ls(s) && !Gl(s, r) && (o += ` with value ${i}`), o += `, got ${r} `, ls(r) && (o += `with value ${l}.`), o;
}
function is(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function ls(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function Gl(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const Ro = (e) => e === "_" || e === "_ctx" || e === "$stable", Fo = (e) => C(e) ? e.map(ye) : [ye(e)], ql = (e, t, n) => {
  if (t._n)
    return t;
  const o = ul((...s) => (process.env.NODE_ENV !== "production" && te && !(n === null && he) && !(n && n.root !== te.root) && y(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), Fo(t(...s))), n);
  return o._c = !1, o;
}, Tr = (e, t, n) => {
  const o = e._ctx;
  for (const s in e) {
    if (Ro(s)) continue;
    const r = e[s];
    if ($(r))
      t[s] = ql(s, r, o);
    else if (r != null) {
      process.env.NODE_ENV !== "production" && y(
        `Non-function value encountered for slot "${s}". Prefer function slots for better performance.`
      );
      const i = Fo(r);
      t[s] = () => i;
    }
  }
}, Cr = (e, t) => {
  process.env.NODE_ENV !== "production" && !Po(e.vnode) && y(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = Fo(t);
  e.slots.default = () => n;
}, go = (e, t, n) => {
  for (const o in t)
    (n || !Ro(o)) && (e[o] = t[o]);
}, Jl = (e, t, n) => {
  const o = e.slots = xr();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (go(o, t, n), n && mn(o, "_", s, !0)) : Tr(t, o);
  } else t && Cr(e, t);
}, zl = (e, t, n) => {
  const { vnode: o, slots: s } = e;
  let r = !0, i = K;
  if (o.shapeFlag & 32) {
    const l = t._;
    l ? process.env.NODE_ENV !== "production" && Fe ? (go(s, t, n), Ie(e, "set", "$slots")) : n && l === 1 ? r = !1 : go(s, t, n) : (r = !t.$stable, Tr(t, s)), i = t;
  } else t && (Cr(e, t), i = { default: 1 });
  if (r)
    for (const l in s)
      !Ro(l) && i[l] == null && delete s[l];
};
let Mt, We;
function _t(e, t) {
  e.appContext.config.performance && wn() && We.mark(`vue-${t}-${e.uid}`), process.env.NODE_ENV !== "production" && il(e, t, wn() ? We.now() : Date.now());
}
function vt(e, t) {
  if (e.appContext.config.performance && wn()) {
    const n = `vue-${t}-${e.uid}`, o = n + ":end", s = `<${Ln(e, e.type)}> ${t}`;
    We.mark(o), We.measure(s, n, o), We.clearMeasures(s), We.clearMarks(n), We.clearMarks(o);
  }
  process.env.NODE_ENV !== "production" && ll(e, t, wn() ? We.now() : Date.now());
}
function wn() {
  return Mt !== void 0 || (typeof window < "u" && window.performance ? (Mt = !0, We = window.performance) : Mt = !1), Mt;
}
function Yl() {
  const e = [];
  if (process.env.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(
      `Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const de = ac;
function Xl(e) {
  return Zl(e);
}
function Zl(e, t) {
  Yl();
  const n = Yt();
  n.__VUE__ = !0, process.env.NODE_ENV !== "production" && $o(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const {
    insert: o,
    remove: s,
    patchProp: r,
    createElement: i,
    createText: l,
    createComment: u,
    setText: d,
    setElementText: f,
    parentNode: a,
    nextSibling: g,
    setScopeId: O = Z,
    insertStaticContent: A
  } = e, w = (c, p, h, v = null, m = null, _ = null, x = void 0, N = null, b = process.env.NODE_ENV !== "production" && Fe ? !1 : !!p.dynamicChildren) => {
    if (c === p)
      return;
    c && !Pt(c, p) && (v = on(c), Xe(c, m, _, !0), c = null), p.patchFlag === -2 && (b = !1, p.dynamicChildren = null);
    const { type: E, ref: T, shapeFlag: D } = p;
    switch (E) {
      case en:
        J(c, p, h, v);
        break;
      case me:
        G(c, p, h, v);
        break;
      case pn:
        c == null ? R(p, h, v, x) : process.env.NODE_ENV !== "production" && L(c, p, h, x);
        break;
      case ve:
        nn(
          c,
          p,
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
          p,
          h,
          v,
          m,
          _,
          x,
          N,
          b
        ) : D & 6 ? Bo(
          c,
          p,
          h,
          v,
          m,
          _,
          x,
          N,
          b
        ) : D & 64 || D & 128 ? E.process(
          c,
          p,
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
    T != null && m ? Lt(T, c && c.ref, _, p || c, !p) : T == null && c && c.ref != null && Lt(c.ref, null, _, c, !0);
  }, J = (c, p, h, v) => {
    if (c == null)
      o(
        p.el = l(p.children),
        h,
        v
      );
    else {
      const m = p.el = c.el;
      p.children !== c.children && d(m, p.children);
    }
  }, G = (c, p, h, v) => {
    c == null ? o(
      p.el = u(p.children || ""),
      h,
      v
    ) : p.el = c.el;
  }, R = (c, p, h, v) => {
    [c.el, c.anchor] = A(
      c.children,
      p,
      h,
      v,
      c.el,
      c.anchor
    );
  }, L = (c, p, h, v) => {
    if (p.children !== c.children) {
      const m = g(c.anchor);
      S(c), [p.el, p.anchor] = A(
        p.children,
        h,
        m,
        v
      );
    } else
      p.el = c.el, p.anchor = c.anchor;
  }, pe = ({ el: c, anchor: p }, h, v) => {
    let m;
    for (; c && c !== p; )
      m = g(c), o(c, h, v), c = m;
    o(p, h, v);
  }, S = ({ el: c, anchor: p }) => {
    let h;
    for (; c && c !== p; )
      h = g(c), s(c), c = h;
    s(p);
  }, Q = (c, p, h, v, m, _, x, N, b) => {
    p.type === "svg" ? x = "svg" : p.type === "math" && (x = "mathml"), c == null ? _e(
      p,
      h,
      v,
      m,
      _,
      x,
      N,
      b
    ) : Ue(
      c,
      p,
      m,
      _,
      x,
      N,
      b
    );
  }, _e = (c, p, h, v, m, _, x, N) => {
    let b, E;
    const { props: T, shapeFlag: D, transition: V, dirs: M } = c;
    if (b = c.el = i(
      c.type,
      _,
      T && T.is,
      T
    ), D & 8 ? f(b, c.children) : D & 16 && le(
      c.children,
      b,
      null,
      v,
      m,
      eo(c, _),
      x,
      N
    ), M && it(c, null, v, "created"), ne(b, c, c.scopeId, x, v), T) {
      for (const k in T)
        k !== "value" && !Ft(k) && r(b, k, null, T[k], _, v);
      "value" in T && r(b, "value", null, T.value, _), (E = T.onVnodeBeforeMount) && Me(E, v, c);
    }
    process.env.NODE_ENV !== "production" && (mn(b, "__vnode", c, !0), mn(b, "__vueParentComponent", v, !0)), M && it(c, null, v, "beforeMount");
    const j = Ql(m, V);
    j && V.beforeEnter(b), o(b, p, h), ((E = T && T.onVnodeMounted) || j || M) && de(() => {
      E && Me(E, v, c), j && V.enter(b), M && it(c, null, v, "mounted");
    }, m);
  }, ne = (c, p, h, v, m) => {
    if (h && O(c, h), v)
      for (let _ = 0; _ < v.length; _++)
        O(c, v[_]);
    if (m) {
      let _ = m.subTree;
      if (process.env.NODE_ENV !== "production" && _.patchFlag > 0 && _.patchFlag & 2048 && (_ = jo(_.children) || _), p === _ || Rr(_.type) && (_.ssContent === p || _.ssFallback === p)) {
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
  }, le = (c, p, h, v, m, _, x, N, b = 0) => {
    for (let E = b; E < c.length; E++) {
      const T = c[E] = N ? Qe(c[E]) : ye(c[E]);
      w(
        null,
        T,
        p,
        h,
        v,
        m,
        _,
        x,
        N
      );
    }
  }, Ue = (c, p, h, v, m, _, x) => {
    const N = p.el = c.el;
    process.env.NODE_ENV !== "production" && (N.__vnode = p);
    let { patchFlag: b, dynamicChildren: E, dirs: T } = p;
    b |= c.patchFlag & 16;
    const D = c.props || K, V = p.props || K;
    let M;
    if (h && lt(h, !1), (M = V.onVnodeBeforeUpdate) && Me(M, h, p, c), T && it(p, c, h, "beforeUpdate"), h && lt(h, !0), process.env.NODE_ENV !== "production" && Fe && (b = 0, x = !1, E = null), (D.innerHTML && V.innerHTML == null || D.textContent && V.textContent == null) && f(N, ""), E ? (ze(
      c.dynamicChildren,
      E,
      N,
      h,
      v,
      eo(p, m),
      _
    ), process.env.NODE_ENV !== "production" && an(c, p)) : x || Te(
      c,
      p,
      N,
      null,
      h,
      v,
      eo(p, m),
      _,
      !1
    ), b > 0) {
      if (b & 16)
        Ne(N, D, V, h, m);
      else if (b & 2 && D.class !== V.class && r(N, "class", null, V.class, m), b & 4 && r(N, "style", D.style, V.style, m), b & 8) {
        const j = p.dynamicProps;
        for (let k = 0; k < j.length; k++) {
          const B = j[k], ue = D[B], fe = V[B];
          (fe !== ue || B === "value") && r(N, B, ue, fe, m, h);
        }
      }
      b & 1 && c.children !== p.children && f(N, p.children);
    } else !x && E == null && Ne(N, D, V, h, m);
    ((M = V.onVnodeUpdated) || T) && de(() => {
      M && Me(M, h, p, c), T && it(p, c, h, "updated");
    }, v);
  }, ze = (c, p, h, v, m, _, x) => {
    for (let N = 0; N < p.length; N++) {
      const b = c[N], E = p[N], T = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        b.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (b.type === ve || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Pt(b, E) || // - In the case of a component, it could contain anything.
        b.shapeFlag & 198) ? a(b.el) : (
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
  }, Ne = (c, p, h, v, m) => {
    if (p !== h) {
      if (p !== K)
        for (const _ in p)
          !Ft(_) && !(_ in h) && r(
            c,
            _,
            p[_],
            null,
            m,
            v
          );
      for (const _ in h) {
        if (Ft(_)) continue;
        const x = h[_], N = p[_];
        x !== N && _ !== "value" && r(c, _, N, x, m, v);
      }
      "value" in h && r(c, "value", p.value, h.value, m);
    }
  }, nn = (c, p, h, v, m, _, x, N, b) => {
    const E = p.el = c ? c.el : l(""), T = p.anchor = c ? c.anchor : l("");
    let { patchFlag: D, dynamicChildren: V, slotScopeIds: M } = p;
    process.env.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (Fe || D & 2048) && (D = 0, b = !1, V = null), M && (N = N ? N.concat(M) : M), c == null ? (o(E, h, v), o(T, h, v), le(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      p.children || [],
      h,
      T,
      m,
      _,
      x,
      N,
      b
    )) : D > 0 && D & 64 && V && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren ? (ze(
      c.dynamicChildren,
      V,
      h,
      m,
      _,
      x,
      N
    ), process.env.NODE_ENV !== "production" ? an(c, p) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (p.key != null || m && p === m.subTree) && an(
        c,
        p,
        !0
        /* shallow */
      )
    )) : Te(
      c,
      p,
      h,
      T,
      m,
      _,
      x,
      N,
      b
    );
  }, Bo = (c, p, h, v, m, _, x, N, b) => {
    p.slotScopeIds = N, c == null ? p.shapeFlag & 512 ? m.ctx.activate(
      p,
      h,
      v,
      x,
      b
    ) : Ye(
      p,
      h,
      v,
      m,
      _,
      x,
      b
    ) : ce(c, p, b);
  }, Ye = (c, p, h, v, m, _, x) => {
    const N = c.component = Ec(
      c,
      v,
      m
    );
    if (process.env.NODE_ENV !== "production" && N.type.__hmrId && Xi(N), process.env.NODE_ENV !== "production" && (cn(c), _t(N, "mount")), Po(c) && (N.ctx.renderer = Tt), process.env.NODE_ENV !== "production" && _t(N, "init"), Nc(N, !1, x), process.env.NODE_ENV !== "production" && vt(N, "init"), process.env.NODE_ENV !== "production" && Fe && (c.el = null), N.asyncDep) {
      if (m && m.registerDep(N, F, x), !c.el) {
        const b = N.subTree = be(me);
        G(null, b, p, h), c.placeholder = b.el;
      }
    } else
      F(
        N,
        c,
        p,
        h,
        m,
        _,
        x
      );
    process.env.NODE_ENV !== "production" && (un(), vt(N, "mount"));
  }, ce = (c, p, h) => {
    const v = p.component = c.component;
    if (uc(c, p, h))
      if (v.asyncDep && !v.asyncResolved) {
        process.env.NODE_ENV !== "production" && cn(p), I(v, p, h), process.env.NODE_ENV !== "production" && un();
        return;
      } else
        v.next = p, v.update();
    else
      p.el = c.el, v.vnode = p;
  }, F = (c, p, h, v, m, _, x) => {
    const N = () => {
      if (c.isMounted) {
        let { next: D, bu: V, u: M, parent: j, vnode: k } = c;
        {
          const $e = $r(c);
          if ($e) {
            D && (D.el = k.el, I(c, D, x)), $e.asyncDep.then(() => {
              c.isUnmounted || N();
            });
            return;
          }
        }
        let B = D, ue;
        process.env.NODE_ENV !== "production" && cn(D || c.vnode), lt(c, !1), D ? (D.el = k.el, I(c, D, x)) : D = k, V && $t(V), (ue = D.props && D.props.onVnodeBeforeUpdate) && Me(ue, j, D, k), lt(c, !0), process.env.NODE_ENV !== "production" && _t(c, "render");
        const fe = us(c);
        process.env.NODE_ENV !== "production" && vt(c, "render");
        const Ce = c.subTree;
        c.subTree = fe, process.env.NODE_ENV !== "production" && _t(c, "patch"), w(
          Ce,
          fe,
          // parent may have changed if it's in a teleport
          a(Ce.el),
          // anchor may have changed if it's in a fragment
          on(Ce),
          c,
          m,
          _
        ), process.env.NODE_ENV !== "production" && vt(c, "patch"), D.el = fe.el, B === null && fc(c, fe.el), M && de(M, m), (ue = D.props && D.props.onVnodeUpdated) && de(
          () => Me(ue, j, D, k),
          m
        ), process.env.NODE_ENV !== "production" && fr(c), process.env.NODE_ENV !== "production" && un();
      } else {
        let D;
        const { el: V, props: M } = p, { bm: j, m: k, parent: B, root: ue, type: fe } = c, Ce = Ut(p);
        lt(c, !1), j && $t(j), !Ce && (D = M && M.onVnodeBeforeMount) && Me(D, B, p), lt(c, !0);
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
          ), process.env.NODE_ENV !== "production" && vt(c, "patch"), p.el = $e.el;
        }
        if (k && de(k, m), !Ce && (D = M && M.onVnodeMounted)) {
          const $e = p;
          de(
            () => Me(D, B, $e),
            m
          );
        }
        (p.shapeFlag & 256 || B && Ut(B.vnode) && B.vnode.shapeFlag & 256) && c.a && de(c.a, m), c.isMounted = !0, process.env.NODE_ENV !== "production" && ol(c), p = h = v = null;
      }
    };
    c.scope.on();
    const b = c.effect = new js(N);
    c.scope.off();
    const E = c.update = b.run.bind(b), T = c.job = b.runIfDirty.bind(b);
    T.i = c, T.id = c.uid, b.scheduler = () => Rn(T), lt(c, !0), process.env.NODE_ENV !== "production" && (b.onTrack = c.rtc ? (D) => $t(c.rtc, D) : void 0, b.onTrigger = c.rtg ? (D) => $t(c.rtg, D) : void 0), E();
  }, I = (c, p, h) => {
    p.component = c;
    const v = c.vnode.props;
    c.vnode = p, c.next = null, Hl(c, p.props, v, h), zl(c, p.children, h), Ve(), Xo(c), Se();
  }, Te = (c, p, h, v, m, _, x, N, b = !1) => {
    const E = c && c.children, T = c ? c.shapeFlag : 0, D = p.children, { patchFlag: V, shapeFlag: M } = p;
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
        Wn(
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
  }, Wn = (c, p, h, v, m, _, x, N, b) => {
    c = c || bt, p = p || bt;
    const E = c.length, T = p.length, D = Math.min(E, T);
    let V;
    for (V = 0; V < D; V++) {
      const M = p[V] = b ? Qe(p[V]) : ye(p[V]);
      w(
        c[V],
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
      c,
      m,
      _,
      !0,
      !1,
      D
    ) : le(
      p,
      h,
      v,
      m,
      _,
      x,
      N,
      b,
      D
    );
  }, Vt = (c, p, h, v, m, _, x, N, b) => {
    let E = 0;
    const T = p.length;
    let D = c.length - 1, V = T - 1;
    for (; E <= D && E <= V; ) {
      const M = c[E], j = p[E] = b ? Qe(p[E]) : ye(p[E]);
      if (Pt(M, j))
        w(
          M,
          j,
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
      const M = c[D], j = p[V] = b ? Qe(p[V]) : ye(p[V]);
      if (Pt(M, j))
        w(
          M,
          j,
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
        const M = V + 1, j = M < T ? p[M].el : v;
        for (; E <= V; )
          w(
            null,
            p[E] = b ? Qe(p[E]) : ye(p[E]),
            h,
            j,
            m,
            _,
            x,
            N,
            b
          ), E++;
      }
    } else if (E > V)
      for (; E <= D; )
        Xe(c[E], m, _, !0), E++;
    else {
      const M = E, j = E, k = /* @__PURE__ */ new Map();
      for (E = j; E <= V; E++) {
        const oe = p[E] = b ? Qe(p[E]) : ye(p[E]);
        oe.key != null && (process.env.NODE_ENV !== "production" && k.has(oe.key) && y(
          "Duplicate keys found during update:",
          JSON.stringify(oe.key),
          "Make sure keys are unique."
        ), k.set(oe.key, E));
      }
      let B, ue = 0;
      const fe = V - j + 1;
      let Ce = !1, $e = 0;
      const Ct = new Array(fe);
      for (E = 0; E < fe; E++) Ct[E] = 0;
      for (E = M; E <= D; E++) {
        const oe = c[E];
        if (ue >= fe) {
          Xe(oe, m, _, !0);
          continue;
        }
        let Ae;
        if (oe.key != null)
          Ae = k.get(oe.key);
        else
          for (B = j; B <= V; B++)
            if (Ct[B - j] === 0 && Pt(oe, p[B])) {
              Ae = B;
              break;
            }
        Ae === void 0 ? Xe(oe, m, _, !0) : (Ct[Ae - j] = E + 1, Ae >= $e ? $e = Ae : Ce = !0, w(
          oe,
          p[Ae],
          h,
          null,
          m,
          _,
          x,
          N,
          b
        ), ue++);
      }
      const Wo = Ce ? ec(Ct) : bt;
      for (B = Wo.length - 1, E = fe - 1; E >= 0; E--) {
        const oe = j + E, Ae = p[oe], ko = p[oe + 1], Go = oe + 1 < T ? (
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
          x,
          N,
          b
        ) : Ce && (B < 0 || E !== Wo[B] ? gt(Ae, h, Go, 2) : B--);
      }
    }
  }, gt = (c, p, h, v, m = null) => {
    const { el: _, type: x, transition: N, children: b, shapeFlag: E } = c;
    if (E & 6) {
      gt(c.component.subTree, p, h, v);
      return;
    }
    if (E & 128) {
      c.suspense.move(p, h, v);
      return;
    }
    if (E & 64) {
      x.move(c, p, h, Tt);
      return;
    }
    if (x === ve) {
      o(_, p, h);
      for (let D = 0; D < b.length; D++)
        gt(b[D], p, h, v);
      o(c.anchor, p, h);
      return;
    }
    if (x === pn) {
      pe(c, p, h);
      return;
    }
    if (v !== 2 && E & 1 && N)
      if (v === 0)
        N.beforeEnter(_), o(_, p, h), de(() => N.enter(_), m);
      else {
        const { leave: D, delayLeave: V, afterLeave: M } = N, j = () => {
          c.ctx.isUnmounted ? s(_) : o(_, p, h);
        }, k = () => {
          _._isLeaving && _[pl](
            !0
            /* cancelled */
          ), D(_, () => {
            j(), M && M();
          });
        };
        V ? V(_, j, k) : k();
      }
    else
      o(_, p, h);
  }, Xe = (c, p, h, v = !1, m = !1) => {
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
    } = c;
    if (D === -2 && (m = !1), N != null && (Ve(), Lt(N, null, h, c, !0), Se()), M != null && (p.renderCache[M] = void 0), T & 256) {
      p.ctx.deactivate(c);
      return;
    }
    const j = T & 1 && V, k = !Ut(c);
    let B;
    if (k && (B = x && x.onVnodeBeforeUnmount) && Me(B, p, c), T & 6)
      Xr(c.component, h, v);
    else {
      if (T & 128) {
        c.suspense.unmount(h, v);
        return;
      }
      j && it(c, null, p, "beforeUnmount"), T & 64 ? c.type.remove(
        c,
        p,
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
        p,
        h,
        !1,
        !0
      ) : (_ === ve && D & 384 || !m && T & 16) && St(b, p, h), v && kn(c);
    }
    (k && (B = x && x.onVnodeUnmounted) || j) && de(() => {
      B && Me(B, p, c), j && it(c, null, p, "unmounted");
    }, h);
  }, kn = (c) => {
    const { type: p, el: h, anchor: v, transition: m } = c;
    if (p === ve) {
      process.env.NODE_ENV !== "production" && c.patchFlag > 0 && c.patchFlag & 2048 && m && !m.persisted ? c.children.forEach((x) => {
        x.type === me ? s(x.el) : kn(x);
      }) : Yr(h, v);
      return;
    }
    if (p === pn) {
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
  }, Yr = (c, p) => {
    let h;
    for (; c !== p; )
      h = g(c), s(c), c = h;
    s(p);
  }, Xr = (c, p, h) => {
    process.env.NODE_ENV !== "production" && c.type.__hmrId && Zi(c);
    const { bum: v, scope: m, job: _, subTree: x, um: N, m: b, a: E } = c;
    cs(b), cs(E), v && $t(v), m.stop(), _ && (_.flags |= 8, Xe(x, c, p, h)), N && de(N, p), de(() => {
      c.isUnmounted = !0;
    }, p), process.env.NODE_ENV !== "production" && rl(c);
  }, St = (c, p, h, v = !1, m = !1, _ = 0) => {
    for (let x = _; x < c.length; x++)
      Xe(c[x], p, h, v, m);
  }, on = (c) => {
    if (c.shapeFlag & 6)
      return on(c.component.subTree);
    if (c.shapeFlag & 128)
      return c.suspense.next();
    const p = g(c.anchor || c.el), h = p && p[fl];
    return h ? g(h) : p;
  };
  let Gn = !1;
  const Ko = (c, p, h) => {
    c == null ? p._vnode && Xe(p._vnode, null, null, !0) : w(
      p._vnode || null,
      c,
      p,
      null,
      null,
      null,
      h
    ), p._vnode = c, Gn || (Gn = !0, Xo(), lr(), Gn = !1);
  }, Tt = {
    p: w,
    um: Xe,
    m: gt,
    r: kn,
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
    createApp: Il(Ko)
  };
}
function eo({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function lt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Ql(e, t) {
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
function ec(e) {
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
function $r(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : $r(t);
}
function cs(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const tc = Symbol.for("v-scx"), nc = () => {
  {
    const e = Bt(tc);
    return e || process.env.NODE_ENV !== "production" && y(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function Ot(e, t, n) {
  return process.env.NODE_ENV !== "production" && !$(t) && y(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), Ar(e, t, n);
}
function Ar(e, t, n = K) {
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
      const O = nc();
      d = O.__watcherHandles || (O.__watcherHandles = []);
    } else if (!u) {
      const O = () => {
      };
      return O.stop = Z, O.resume = Z, O.pause = Z, O;
    }
  }
  const f = te;
  l.call = (O, A, w) => Le(O, f, A, w);
  let a = !1;
  r === "post" ? l.scheduler = (O) => {
    de(O, f && f.suspense);
  } : r !== "sync" && (a = !0, l.scheduler = (O, A) => {
    A ? O() : Rn(O);
  }), l.augmentJob = (O) => {
    t && (O.flags |= 4), a && (O.flags |= 2, f && (O.id = f.uid, O.i = f));
  };
  const g = Ki(e, t, l);
  return Jt && (d ? d.push(g) : u && g()), g;
}
function oc(e, t, n) {
  const o = this.proxy, s = q(e) ? e.includes(".") ? Mr(o, e) : () => o[e] : e.bind(o, o);
  let r;
  $(t) ? r = t : (r = t.handler, n = t);
  const i = tn(this), l = Ar(s, r.bind(o), n);
  return i(), l;
}
function Mr(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let s = 0; s < n.length && o; s++)
      o = o[n[s]];
    return o;
  };
}
const sc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${xe(t)}Modifiers`] || e[`${ot(t)}Modifiers`];
function rc(e, t, ...n) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || K;
  if (process.env.NODE_ENV !== "production") {
    const {
      emitsOptions: f,
      propsOptions: [a]
    } = e;
    if (f)
      if (!(t in f))
        (!a || !(ct(xe(t)) in a)) && y(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${ct(xe(t))}" prop.`
        );
      else {
        const g = f[t];
        $(g) && (g(...n) || y(
          `Invalid event arguments: event validation failed for event "${t}".`
        ));
      }
  }
  let s = n;
  const r = t.startsWith("update:"), i = r && sc(o, t.slice(7));
  if (i && (i.trim && (s = n.map((f) => q(f) ? f.trim() : f)), i.number && (s = n.map(ni))), process.env.NODE_ENV !== "production" && cl(e, t, s), process.env.NODE_ENV !== "production") {
    const f = t.toLowerCase();
    f !== t && o[ct(f)] && y(
      `Event "${f}" is emitted in component ${Ln(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${ot(
        t
      )}" instead of "${t}".`
    );
  }
  let l, u = o[l = ct(t)] || // also try camelCase event handler (#2249)
  o[l = ct(xe(t))];
  !u && r && (u = o[l = ct(ot(t))]), u && Le(
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
    e.emitted[l] = !0, Le(
      d,
      e,
      6,
      s
    );
  }
}
const ic = /* @__PURE__ */ new WeakMap();
function Pr(e, t, n = !1) {
  const o = n ? ic : t.emitsCache, s = o.get(e);
  if (s !== void 0)
    return s;
  const r = e.emits;
  let i = {}, l = !1;
  if (!$(e)) {
    const u = (d) => {
      const f = Pr(d, t, !0);
      f && (l = !0, Y(i, f));
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !r && !l ? (W(e) && o.set(e, null), null) : (C(r) ? r.forEach((u) => i[u] = null) : Y(i, r), W(e) && o.set(e, i), i);
}
function jn(e, t) {
  return !e || !zt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), H(e, t[0].toLowerCase() + t.slice(1)) || H(e, ot(t)) || H(e, t));
}
let mo = !1;
function Vn() {
  mo = !0;
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
    renderCache: f,
    props: a,
    data: g,
    setupState: O,
    ctx: A,
    inheritAttrs: w
  } = e, J = On(e);
  let G, R;
  process.env.NODE_ENV !== "production" && (mo = !1);
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
      G = ye(
        d.call(
          Q,
          S,
          f,
          process.env.NODE_ENV !== "production" ? Re(a) : a,
          O,
          g,
          A
        )
      ), R = l;
    } else {
      const S = t;
      process.env.NODE_ENV !== "production" && l === a && Vn(), G = ye(
        S.length > 1 ? S(
          process.env.NODE_ENV !== "production" ? Re(a) : a,
          process.env.NODE_ENV !== "production" ? {
            get attrs() {
              return Vn(), Re(l);
            },
            slots: i,
            emit: u
          } : { attrs: l, slots: i, emit: u }
        ) : S(
          process.env.NODE_ENV !== "production" ? Re(a) : a,
          null
        )
      ), R = t.props ? l : lc(l);
    }
  } catch (S) {
    Kt.length = 0, Xt(S, e, 1), G = be(me);
  }
  let L = G, pe;
  if (process.env.NODE_ENV !== "production" && G.patchFlag > 0 && G.patchFlag & 2048 && ([L, pe] = Ir(G)), R && w !== !1) {
    const S = Object.keys(R), { shapeFlag: Q } = L;
    if (S.length) {
      if (Q & 7)
        r && S.some(gn) && (R = cc(
          R,
          r
        )), L = st(L, R, !1, !0);
      else if (process.env.NODE_ENV !== "production" && !mo && L.type !== me) {
        const _e = Object.keys(l), ne = [], le = [];
        for (let Ue = 0, ze = _e.length; Ue < ze; Ue++) {
          const Ne = _e[Ue];
          zt(Ne) ? gn(Ne) || ne.push(Ne[2].toLowerCase() + Ne.slice(3)) : le.push(Ne);
        }
        le.length && y(
          `Extraneous non-props attributes (${le.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`
        ), ne.length && y(
          `Extraneous non-emits event listeners (${ne.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return n.dirs && (process.env.NODE_ENV !== "production" && !fs(L) && y(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), L = st(L, null, !1, !0), L.dirs = L.dirs ? L.dirs.concat(n.dirs) : n.dirs), n.transition && (process.env.NODE_ENV !== "production" && !fs(L) && y(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), Mo(L, n.transition)), process.env.NODE_ENV !== "production" && pe ? pe(L) : G = L, On(J), G;
}
const Ir = (e) => {
  const t = e.children, n = e.dynamicChildren, o = jo(t, !1);
  if (o) {
    if (process.env.NODE_ENV !== "production" && o.patchFlag > 0 && o.patchFlag & 2048)
      return Ir(o);
  } else return [e, void 0];
  const s = t.indexOf(o), r = n ? n.indexOf(o) : -1, i = (l) => {
    t[s] = l, n && (r > -1 ? n[r] = l : l.patchFlag > 0 && (e.dynamicChildren = [...n, l]));
  };
  return [ye(o), i];
};
function jo(e, t = !0) {
  let n;
  for (let o = 0; o < e.length; o++) {
    const s = e[o];
    if (Hn(s)) {
      if (s.type !== me || s.children === "v-if") {
        if (n)
          return;
        if (n = s, process.env.NODE_ENV !== "production" && t && n.patchFlag > 0 && n.patchFlag & 2048)
          return jo(n.children);
      }
    } else
      return;
  }
  return n;
}
const lc = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || zt(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, cc = (e, t) => {
  const n = {};
  for (const o in e)
    (!gn(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
}, fs = (e) => e.shapeFlag & 7 || e.type === me;
function uc(e, t, n) {
  const { props: o, children: s, component: r } = e, { props: i, children: l, patchFlag: u } = t, d = r.emitsOptions;
  if (process.env.NODE_ENV !== "production" && (s || l) && Fe || t.dirs || t.transition)
    return !0;
  if (n && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return o ? as(o, i, d) : !!i;
    if (u & 8) {
      const f = t.dynamicProps;
      for (let a = 0; a < f.length; a++) {
        const g = f[a];
        if (i[g] !== o[g] && !jn(d, g))
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
    if (t[r] !== e[r] && !jn(n, r))
      return !0;
  }
  return !1;
}
function fc({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.el = e.el), o === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const Rr = (e) => e.__isSuspense;
function ac(e, t) {
  t && t.pendingBranch ? C(e) ? t.effects.push(...e) : t.effects.push(e) : ir(e);
}
const ve = Symbol.for("v-fgt"), en = Symbol.for("v-txt"), me = Symbol.for("v-cmt"), pn = Symbol.for("v-stc"), Kt = [];
let ge = null;
function Ee(e = !1) {
  Kt.push(ge = e ? null : []);
}
function pc() {
  Kt.pop(), ge = Kt[Kt.length - 1] || null;
}
let qt = 1;
function ps(e, t = !1) {
  qt += e, e < 0 && ge && t && (ge.hasOnce = !0);
}
function Fr(e) {
  return e.dynamicChildren = qt > 0 ? ge || bt : null, pc(), qt > 0 && ge && ge.push(e), e;
}
function je(e, t, n, o, s, r) {
  return Fr(
    Ho(
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
function jr(e, t, n, o, s) {
  return Fr(
    be(
      e,
      t,
      n,
      o,
      s,
      !0
    )
  );
}
function Hn(e) {
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
const dc = (...e) => Lr(
  ...e
), Hr = ({ key: e }) => e ?? null, dn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? q(e) || z(e) || $(e) ? { i: he, r: e, k: t, f: !!n } : e : null);
function Ho(e, t = null, n = null, o = 0, s = null, r = e === ve ? 0 : 1, i = !1, l = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Hr(t),
    ref: t && dn(t),
    scopeId: pr,
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
const be = process.env.NODE_ENV !== "production" ? dc : Lr;
function Lr(e, t = null, n = null, o = 0, s = null, r = !1) {
  if ((!e || e === xl) && (process.env.NODE_ENV !== "production" && !e && y(`Invalid vnode type when creating vnode: ${e}.`), e = me), Hn(e)) {
    const l = st(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Lo(l, n), qt > 0 && !r && ge && (l.shapeFlag & 6 ? ge[ge.indexOf(e)] = l : ge.push(l)), l.patchFlag = -2, l;
  }
  if (Gr(e) && (e = e.__vccOpts), t) {
    t = hc(t);
    let { class: l, style: u } = t;
    l && !q(l) && (t.class = An(l)), W(u) && (vn(u) && !C(u) && (u = Y({}, u)), t.style = Dt(u));
  }
  const i = q(e) ? 1 : Rr(e) ? 128 : al(e) ? 64 : W(e) ? 4 : $(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && vn(e) && (e = P(e), y(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), Ho(
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
function hc(e) {
  return e ? vn(e) || Dr(e) ? Y({}, e) : e : null;
}
function st(e, t, n = !1, o = !1) {
  const { props: s, ref: r, patchFlag: i, children: l, transition: u } = e, d = t ? mc(s || {}, t) : s, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Hr(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? C(r) ? r.concat(dn(t)) : [r, dn(t)] : dn(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && i === -1 && C(l) ? l.map(Ur) : l,
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
  return u && o && Mo(
    f,
    u.clone(f)
  ), f;
}
function Ur(e) {
  const t = st(e);
  return C(e.children) && (t.children = e.children.map(Ur)), t;
}
function gc(e = " ", t = 0) {
  return be(en, null, e, t);
}
function ds(e = "", t = !1) {
  return t ? (Ee(), jr(me, null, e)) : be(me, null, e);
}
function ye(e) {
  return e == null || typeof e == "boolean" ? be(me) : C(e) ? be(
    ve,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Hn(e) ? Qe(e) : be(en, null, String(e));
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
  else $(t) ? (t = { default: t, _ctx: he }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [gc(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function mc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const s in o)
      if (s === "class")
        t.class !== o.class && (t.class = An([t.class, o.class]));
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
  Le(e, t, 7, [
    n,
    o
  ]);
}
const _c = yr();
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
    scope: new gi(
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
    propsOptions: Vr(o, s),
    emitsOptions: Pr(o, s),
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
  return process.env.NODE_ENV !== "production" ? r.ctx = Dl(r) : r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = rc.bind(null, r), e.ce && e.ce(r), r;
}
let te = null;
const Br = () => te || he;
let Sn, _o;
{
  const e = Yt(), t = (n, o) => {
    let s;
    return (s = e[n]) || (s = e[n] = []), s.push(o), (r) => {
      s.length > 1 ? s.forEach((i) => i(r)) : s[0](r);
    };
  };
  Sn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => te = n
  ), _o = t(
    "__VUE_SSR_SETTERS__",
    (n) => Jt = n
  );
}
const tn = (e) => {
  const t = te;
  return Sn(e), e.scope.on(), () => {
    e.scope.off(), Sn(t);
  };
}, hs = () => {
  te && te.scope.off(), Sn(null);
}, bc = /* @__PURE__ */ qe("slot,component");
function vo(e, { isNativeTag: t }) {
  (bc(e) || t(e)) && y(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function Kr(e) {
  return e.vnode.shapeFlag & 4;
}
let Jt = !1;
function Nc(e, t = !1, n = !1) {
  t && _o(t);
  const { props: o, children: s } = e.vnode, r = Kr(e);
  Fl(e, o, r, t), Jl(e, s, n || t);
  const i = r ? yc(e, t) : void 0;
  return t && _o(!1), i;
}
function yc(e, t) {
  var n;
  const o = e.type;
  if (process.env.NODE_ENV !== "production") {
    if (o.name && vo(o.name, e.appContext.config), o.components) {
      const r = Object.keys(o.components);
      for (let i = 0; i < r.length; i++)
        vo(r[i], e.appContext.config);
    }
    if (o.directives) {
      const r = Object.keys(o.directives);
      for (let i = 0; i < r.length; i++)
        dr(r[i]);
    }
    o.compilerOptions && Oc() && y(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Er), process.env.NODE_ENV !== "production" && wl(e);
  const { setup: s } = o;
  if (s) {
    Ve();
    const r = e.setupContext = s.length > 1 ? Dc(e) : null, i = tn(e), l = wt(
      s,
      e,
      0,
      [
        process.env.NODE_ENV !== "production" ? Re(e.props) : e.props,
        r
      ]
    ), u = No(l);
    if (Se(), i(), (u || e.sp) && !Ut(e) && hr(e), u) {
      if (l.then(hs, hs), t)
        return l.then((d) => {
          gs(e, d, t);
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
      gs(e, l, t);
  } else
    Wr(e, t);
}
function gs(e, t, n) {
  $(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : W(t) ? (process.env.NODE_ENV !== "production" && Hn(t) && y(
    "setup() should not return VNodes directly - return a render function instead."
  ), process.env.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = tr(t), process.env.NODE_ENV !== "production" && Vl(e)) : process.env.NODE_ENV !== "production" && t !== void 0 && y(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), Wr(e, n);
}
const Oc = () => !0;
function Wr(e, t, n) {
  const o = e.type;
  e.render || (e.render = o.render || Z);
  {
    const s = tn(e);
    Ve();
    try {
      Tl(e);
    } finally {
      Se(), s();
    }
  }
  process.env.NODE_ENV !== "production" && !o.render && e.render === Z && !t && (o.template ? y(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
  ) : y("Component is missing template or render function: ", o));
}
const ms = process.env.NODE_ENV !== "production" ? {
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
function xc(e) {
  return new Proxy(e.slots, {
    get(t, n) {
      return X(e, "get", "$slots"), t[n];
    }
  });
}
function Dc(e) {
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
        return n || (n = new Proxy(e.attrs, ms));
      },
      get slots() {
        return o || (o = xc(e));
      },
      get emit() {
        return (s, ...r) => e.emit(s, ...r);
      },
      expose: t
    });
  } else
    return {
      attrs: new Proxy(e.attrs, ms),
      slots: e.slots,
      emit: e.emit,
      expose: t
    };
}
function Uo(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(tr(Ri(e.exposed)), {
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
function kr(e, t = !0) {
  return $(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Ln(e, t, n = !1) {
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
  return o ? Vc(o) : n ? "App" : "Anonymous";
}
function Gr(e) {
  return $(e) && "__vccOpts" in e;
}
const Un = (e, t) => {
  const n = Ui(e, t, Jt);
  if (process.env.NODE_ENV !== "production") {
    const o = Br();
    o && o.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function Sc() {
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
        Ve();
        const g = a.value;
        return Se(), [
          "div",
          {},
          ["span", e, f(a)],
          "<",
          l(g),
          ">"
        ];
      } else {
        if (nt(a))
          return [
            "div",
            {},
            ["span", e, ie(a) ? "ShallowReactive" : "Reactive"],
            "<",
            l(a),
            `>${He(a) ? " (readonly)" : ""}`
          ];
        if (He(a))
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
    a.type.props && a.props && g.push(i("props", P(a.props))), a.setupState !== K && g.push(i("setup", a.setupState)), a.data !== K && g.push(i("data", P(a.data)));
    const O = u(a, "computed");
    O && g.push(i("computed", O));
    const A = u(a, "inject");
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
    return typeof a == "number" ? ["span", t, a] : typeof a == "string" ? ["span", n, JSON.stringify(a)] : typeof a == "boolean" ? ["span", o, a] : W(a) ? ["object", { object: g ? P(a) : a }] : ["span", n, String(a)];
  }
  function u(a, g) {
    const O = a.type;
    if ($(O))
      return;
    const A = {};
    for (const w in a.ctx)
      d(O, w, g) && (A[w] = a.ctx[w]);
    return A;
  }
  function d(a, g, O) {
    const A = a[O];
    if (C(A) && A.includes(g) || W(A) && g in A || a.extends && d(a.extends, g, O) || a.mixins && a.mixins.some((w) => d(w, g, O)))
      return !0;
  }
  function f(a) {
    return ie(a) ? "ShallowRef" : a.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(s) : window.devtoolsFormatters = [s];
}
const _s = "3.5.22", Ge = process.env.NODE_ENV !== "production" ? y : Z;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Eo;
const vs = typeof window < "u" && window.trustedTypes;
if (vs)
  try {
    Eo = /* @__PURE__ */ vs.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch (e) {
    process.env.NODE_ENV !== "production" && Ge(`Error creating trusted types policy: ${e}`);
  }
const qr = Eo ? (e) => Eo.createHTML(e) : (e) => e, Tc = "http://www.w3.org/2000/svg", Cc = "http://www.w3.org/1998/Math/MathML", Ke = typeof document < "u" ? document : null, Es = Ke && /* @__PURE__ */ Ke.createElement("template"), $c = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const s = t === "svg" ? Ke.createElementNS(Tc, e) : t === "mathml" ? Ke.createElementNS(Cc, e) : n ? Ke.createElement(e, { is: n }) : Ke.createElement(e);
    return e === "select" && o && o.multiple != null && s.setAttribute("multiple", o.multiple), s;
  },
  createText: (e) => Ke.createTextNode(e),
  createComment: (e) => Ke.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ke.querySelector(e),
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
      Es.innerHTML = qr(
        o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e
      );
      const l = Es.content;
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
const bs = Symbol("_vod"), Pc = Symbol("_vsh"), Ic = Symbol(process.env.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : ""), Rc = /(?:^|;)\s*display\s*:/;
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
  bs in e && (e[bs] = r ? o.display : "", e[Pc] && (o.display = "none"));
}
const jc = /[^\\];\s*$/, Ns = /\s*!important$/;
function hn(e, t, n) {
  if (C(n))
    n.forEach((o) => hn(e, t, o));
  else if (n == null && (n = ""), process.env.NODE_ENV !== "production" && jc.test(n) && Ge(
    `Unexpected semicolon at the end of '${t}' style value: '${n}'`
  ), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = Hc(e, t);
    Ns.test(n) ? e.setProperty(
      ot(o),
      n.replace(Ns, ""),
      "important"
    ) : e[o] = n;
  }
}
const ys = ["Webkit", "Moz", "ms"], to = {};
function Hc(e, t) {
  const n = to[t];
  if (n)
    return n;
  let o = xe(t);
  if (o !== "filter" && o in e)
    return to[t] = o;
  o = $n(o);
  for (let s = 0; s < ys.length; s++) {
    const r = ys[s] + o;
    if (r in e)
      return to[t] = r;
  }
  return t;
}
const Os = "http://www.w3.org/1999/xlink";
function xs(e, t, n, o, s, r = hi(t)) {
  o && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Os, t.slice(6, t.length)) : e.setAttributeNS(Os, t, n) : n == null || r && !Is(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : rt(n) ? String(n) : n
  );
}
function Ds(e, t, n, o, s) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? qr(n) : n);
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
    l === "boolean" ? n = Is(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
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
const ws = Symbol("_vei");
function Bc(e, t, n, o, s = null) {
  const r = e[ws] || (e[ws] = {}), i = r[t];
  if (o && i)
    i.value = process.env.NODE_ENV !== "production" ? Ss(o, t) : o;
  else {
    const [l, u] = Kc(t);
    if (o) {
      const d = r[t] = Gc(
        process.env.NODE_ENV !== "production" ? Ss(o, t) : o,
        s
      );
      Lc(e, l, d, u);
    } else i && (Uc(e, l, i, u), r[t] = void 0);
  }
}
const Vs = /(?:Once|Passive|Capture)$/;
function Kc(e) {
  let t;
  if (Vs.test(e)) {
    t = {};
    let o;
    for (; o = e.match(Vs); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : ot(e.slice(2)), t];
}
let no = 0;
const Wc = /* @__PURE__ */ Promise.resolve(), kc = () => no || (Wc.then(() => no = 0), no = Date.now());
function Gc(e, t) {
  const n = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= n.attached)
      return;
    Le(
      qc(o, n.value),
      t,
      5,
      [o]
    );
  };
  return n.value = e, n.attached = kc(), n;
}
function Ss(e, t) {
  return $(e) || C(e) ? e : (Ge(
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
const Ts = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Jc = (e, t, n, o, s, r) => {
  const i = s === "svg";
  t === "class" ? Mc(e, o, i) : t === "style" ? Fc(e, n, o) : zt(t) ? gn(t) || Bc(e, t, n, o, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : zc(e, t, o, i)) ? (Ds(e, t, o), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && xs(e, t, o, i, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !q(o)) ? Ds(e, xe(t), o, r, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), xs(e, t, o, i));
};
function zc(e, t, n, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Ts(t) && $(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
      return !1;
  }
  return Ts(t) && q(n) ? !1 : t in e;
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
let Cs;
function eu() {
  return Cs || (Cs = Xl(Qc));
}
const tu = ((...e) => {
  const t = eu().createApp(...e);
  process.env.NODE_ENV !== "production" && (ou(t), su(t));
  const { mount: n } = t;
  return t.mount = (o) => {
    const s = ru(o);
    if (!s) return;
    const r = t._component;
    !$(r) && !r.render && !r.template && (r.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
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
    value: (t) => fi(t) || ai(t) || pi(t),
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
function Jr(e) {
  return e.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
const lu = /* @__PURE__ */ Qt({
  __name: "ChatEntryText",
  props: {
    text: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => _n(ke(Jr)(t.text));
  }
});
function xt(e) {
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
function oo() {
  const e = /* @__PURE__ */ new Date();
  return e.getHours() * 3600 + e.getMinutes() * 60 + e.getSeconds();
}
function cu(e) {
  const t = Math.floor(e / 3600), o = Math.floor(e % 3600 / 60).toString().padStart(2, "0"), r = (e % 60).toString().padStart(2, "0");
  return `${t}:${o}:${r}`;
}
const zr = Symbol("GlobalJsonConfig"), uu = {
  install(e, t) {
    e.provide(zr, t);
  }
};
function Bn() {
  const e = Bt(zr);
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
    const t = Bn(), n = e, o = {
      ...xt(n.entry.type === "bot" ? t.botEntryStyle : t.userEntryStyle),
      marginTop: `${t.listGap}px`
    }, s = Un(() => n.entry.type === "bot" && n.entry.isStillTyping);
    return (r, i) => (Ee(), je("div", {
      class: An(["entrcont", n.entry.type])
    }, [
      s.value ? s.value ? (Ee(), je("div", au, _n(ke(t).chatBotTypingText), 1)) : ds("", !0) : (Ee(), je("div", {
        key: 0,
        class: "entrtimecont",
        style: o
      }, [
        Ho("div", fu, [
          be(lu, {
            text: n.entry.text
          }, null, 8, ["text"])
        ]),
        n.entry.time ? (Ee(), je("div", {
          key: 0,
          class: "time",
          style: Dt(ke(xt)(ke(t).timeStyle))
        }, _n(ke(cu)(n.entry.time)), 5)) : ds("", !0)
      ]))
    ], 2));
  }
}), Kn = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, s] of t)
    n[o] = s;
  return n;
}, du = /* @__PURE__ */ Kn(pu, [["__scopeId", "data-v-b61214c8"]]), hu = /* @__PURE__ */ Qt({
  __name: "ChatList",
  props: {
    list: {}
  },
  setup(e) {
    const t = Bn(), n = {
      ...xt(t.listStyle),
      padding: `0 ${t.listGap}px ${t.listGap}px ${t.listGap}px`
    };
    t.listHeight && t.listHeight > 0 && (n.height = `${t.listHeight}px`);
    const o = e, s = er(null);
    return Ot(
      // Nur scrollen, wenn ein Element hinzugefügt wurde oder "typing" beendet
      () => {
        const r = o.list.length, i = o.list[r - 1], l = i?.type === "bot" && i.isStillTyping;
        return [r, l];
      },
      (r, i) => {
        i && (r[0] > i[0] || r[1] !== i[1]) && sr(() => {
          s.value && (s.value.scrollTop = s.value.scrollHeight);
        });
      }
    ), (r, i) => (Ee(), je("div", {
      class: "chat-list",
      style: n,
      ref_key: "listContainer",
      ref: s
    }, [
      (Ee(!0), je(ve, null, vr(o.list, (l) => (Ee(), jr(du, {
        key: l.id,
        entry: l
      }, null, 8, ["entry"]))), 128))
    ], 512));
  }
}), gu = /* @__PURE__ */ Kn(hu, [["__scopeId", "data-v-09008aad"]]), mu = ["onClick", "innerHTML"], _u = /* @__PURE__ */ Qt({
  __name: "ChatInput",
  props: {
    label: {}
  },
  emits: ["addEntry"],
  setup(e, { emit: t }) {
    const n = Bn(), o = {
      ...xt(n.inputStyle),
      minHeight: `${n.inputRows}rem`
    }, s = xt(n.inputStyleUser), r = e, i = t, l = Un(() => n.chat.user.filter((u) => u.label === r.label));
    return (u, d) => (Ee(), je("div", {
      class: "outer",
      style: o
    }, [
      (Ee(!0), je(ve, null, vr(l.value, (f, a) => (Ee(), je("div", {
        key: a,
        style: Dt(ke(s)),
        onClick: Zc((g) => i("addEntry", f), ["prevent"]),
        innerHTML: f.text
      }, null, 12, mu))), 128))
    ]));
  }
}), vu = /* @__PURE__ */ Kn(_u, [["__scopeId", "data-v-075ab567"]]), Eu = /* @__PURE__ */ Qt({
  __name: "App",
  setup(e, { expose: t }) {
    const n = Bn();
    n.chat.user.forEach((f) => {
      f.label = f.label.trim(), f.next = f.next?.trim();
    }), n.chat.bot.forEach((f) => {
      f.label = f.label.trim();
    });
    const o = er({
      curr: [],
      currLabel: "",
      prev: []
    });
    Ot(
      () => o.value.currLabel,
      (f) => {
        const a = n.chat.bot.find((g) => g.label === f);
        if (a) {
          const g = o.value.curr.length;
          if (g > 0 && o.value.curr[g - 1]?.type === "bot" && o.value.curr[g - 1]?.text === a.text)
            return;
          const O = g > 0 && n.botDelay || 0, w = {
            id: g + 1,
            type: "bot",
            isStillTyping: !0,
            text: a.text,
            time: oo()
          };
          o.value.curr.push(w);
          const J = o.value.curr.length, G = {
            event: "ENTRY_ADDED_BOT",
            text: a.text
          };
          n.fsm?.logEvent(G), setTimeout(() => {
            if (J === o.value.curr.length) {
              const R = o.value.curr[J - 1];
              delete R.isStillTyping, R.time = oo();
            }
          }, O);
        } else
          n.fsm?.logEvent(`BOT_RESPONSE_NOT_FOUND: ${f}`);
      },
      { immediate: !1 }
    );
    const s = Un(() => {
      const f = o.value.curr.length;
      if (f === 0) return "";
      const a = o.value.curr[f - 1];
      return a?.type === "bot" && !a.isStillTyping ? o.value.currLabel : "";
    });
    t({
      chat: o,
      // Freigegebene Property
      loadChat: (f, a = !0) => {
        o.value.curr = [], a && u(), o.value.curr.push(...f.curr), o.value.prev = f.prev || [], o.value.currLabel = f.currLabel || "START";
      }
    });
    const i = () => {
      const f = o.value.curr.filter((a) => !a.isPrechat);
      f.length > 0 && o.value.prev.push(f), o.value.curr = [], o.value.currLabel = "START", n.fsm?.logEvent("CHAT_RESTARTED"), u(), l(o.value.currLabel);
    }, l = (f) => {
      if (f === "RESTART") {
        i();
        return;
      } else if (f !== "END")
        if (f === "START")
          o.value.currLabel = f;
        else if (f.length > 0) {
          const a = n.chat.bot.find((g) => g.label === f);
          a ? o.value.currLabel = a.label : (n.fsm?.logEvent(`CHAT_LABEL_NOT_FOUND: ${f}`), f = "END");
        } else {
          const a = n.chat.bot.findIndex(
            (g) => g.label === o.value.currLabel
          );
          a >= 0 && a < n.chat.bot.length - 1 ? o.value.currLabel = n.chat.bot[a + 1].label : o.value.currLabel === "START" && a < 0 && n.chat.bot.length > 0 ? o.value.currLabel = n.chat.bot[0].label : f = "END";
        }
      if (f === "END") {
        n.fsm?.logEvent("CHAT_ENDED"), n.fsm?.triggerEvent("RESPONSE");
        return;
      }
    }, u = () => {
      n.prechat && n.prechat.forEach((f) => {
        const a = o.value.curr.length + 1;
        o.value.curr.push({
          id: a,
          type: f.role,
          text: f.text,
          isPrechat: !0
        });
      });
    };
    mr(() => {
      u(), l("START");
    });
    const d = (f) => {
      if (f.next != "RESTART" && f.next !== "END") {
        const g = o.value.curr.length + 1;
        o.value.curr.push({
          id: g,
          type: "user",
          text: f.text,
          time: oo()
        });
      }
      const a = {
        event: "ENTRY_ADDED_USER",
        text: Jr(f.text)
      };
      n.fsm?.logEvent(a), l(f.next || "");
    };
    return (f, a) => (Ee(), je("div", {
      style: Dt(ke(xt)(ke(n).outerStyle))
    }, [
      be(gu, {
        class: "list",
        list: o.value.curr
      }, null, 8, ["list"]),
      be(vu, {
        label: s.value,
        onAddEntry: d
      }, null, 8, ["label"])
    ], 4));
  }
}), bu = /* @__PURE__ */ Kn(Eu, [["__scopeId", "data-v-e94c5460"]]);
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
const xu = (e, t, n, o) => {
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
  xu as initializeAndMount
};
