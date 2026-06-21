/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function ft(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ee = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, zt = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], de = () => {
}, su = () => !1, Fn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), uo = (e) => e.startsWith("onUpdate:"), ae = Object.assign, Ar = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, dc = Object.prototype.hasOwnProperty, Y = (e, t) => dc.call(e, t), j = Array.isArray, Gt = (e) => Oo(e) === "[object Map]", pc = (e) => Oo(e) === "[object Set]", B = (e) => typeof e == "function", ce = (e) => typeof e == "string", Qt = (e) => typeof e == "symbol", oe = (e) => e !== null && typeof e == "object", Cr = (e) => (oe(e) || B(e)) && B(e.then) && B(e.catch), hc = Object.prototype.toString, Oo = (e) => hc.call(e), wr = (e) => Oo(e).slice(8, -1), _c = (e) => Oo(e) === "[object Object]", Tr = (e) => ce(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, En = /* @__PURE__ */ ft(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Ec = /* @__PURE__ */ ft(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), No = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, gc = /-\w/g, Ue = No(
  (e) => e.replace(gc, (t) => t.slice(1).toUpperCase())
), mc = /\B([A-Z])/g, Ot = No(
  (e) => e.replace(mc, "-$1").toLowerCase()
), Do = No((e) => e.charAt(0).toUpperCase() + e.slice(1)), Ct = No(
  (e) => e ? `on${Do(e)}` : ""
), yt = (e, t) => !Object.is(e, t), ln = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, lo = (e, t, n, o = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: o,
    value: n
  });
}, vc = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let ds;
const $n = () => ds || (ds = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function So(e) {
  if (j(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], r = ce(o) ? Nc(o) : So(o);
      if (r)
        for (const s in r)
          t[s] = r[s];
    }
    return t;
  } else if (ce(e) || oe(e))
    return e;
}
const yc = /;(?![^(]*\))/g, bc = /:([^]+)/, Oc = /\/\*[^]*?\*\//g;
function Nc(e) {
  const t = {};
  return e.replace(Oc, "").split(yc).forEach((n) => {
    if (n) {
      const o = n.split(bc);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function Vr(e) {
  let t = "";
  if (ce(e))
    t = e;
  else if (j(e))
    for (let n = 0; n < e.length; n++) {
      const o = Vr(e[n]);
      o && (t += o + " ");
    }
  else if (oe(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Dc = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", Sc = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", Ac = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", Cc = /* @__PURE__ */ ft(Dc), wc = /* @__PURE__ */ ft(Sc), Tc = /* @__PURE__ */ ft(Ac), Vc = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", xc = /* @__PURE__ */ ft(Vc);
function iu(e) {
  return !!e || e === "";
}
/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function ke(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let ge;
class uu {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = ge, !t && ge && (this.index = (ge.scopes || (ge.scopes = [])).push(
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
      const n = ge;
      try {
        return ge = this, t();
      } finally {
        ge = n;
      }
    } else process.env.NODE_ENV !== "production" && ke("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = ge, ge = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (ge = this.prevScope, this.prevScope = void 0);
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
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function lu(e) {
  return new uu(e);
}
function cu() {
  return ge;
}
function Ic(e, t = !1) {
  ge ? ge.cleanups.push(e) : process.env.NODE_ENV !== "production" && !t && ke(
    "onScopeDispose() is called when there is no active effect scope to be associated with."
  );
}
let X;
const Mo = /* @__PURE__ */ new WeakSet();
class au {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ge && ge.active && ge.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Mo.has(this) && (Mo.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || du(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, ps(this), pu(this);
    const t = X, n = Be;
    X = this, Be = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && X !== this && ke(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), hu(this), X = t, Be = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Pr(t);
      this.deps = this.depsTail = void 0, ps(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Mo.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Qo(this) && this.run();
  }
  get dirty() {
    return Qo(this);
  }
}
let fu = 0, gn, mn;
function du(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = mn, mn = e;
    return;
  }
  e.next = gn, gn = e;
}
function xr() {
  fu++;
}
function Ir() {
  if (--fu > 0)
    return;
  if (mn) {
    let t = mn;
    for (mn = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; gn; ) {
    let t = gn;
    for (gn = void 0; t; ) {
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
function pu(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function hu(e) {
  let t, n = e.depsTail, o = n;
  for (; o; ) {
    const r = o.prevDep;
    o.version === -1 ? (o === n && (n = r), Pr(o), Pc(o)) : t = o, o.dep.activeLink = o.prevActiveLink, o.prevActiveLink = void 0, o = r;
  }
  e.deps = t, e.depsTail = n;
}
function Qo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (_u(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function _u(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Sn) || (e.globalVersion = Sn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Qo(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = X, o = Be;
  X = e, Be = !0;
  try {
    pu(e);
    const r = e.fn(e._value);
    (t.version === 0 || yt(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    X = n, Be = o, hu(e), e.flags &= -3;
  }
}
function Pr(e, t = !1) {
  const { dep: n, prevSub: o, nextSub: r } = e;
  if (o && (o.nextSub = r, e.prevSub = void 0), r && (r.prevSub = o, e.nextSub = void 0), process.env.NODE_ENV !== "production" && n.subsHead === e && (n.subsHead = r), n.subs === e && (n.subs = o, !o && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      Pr(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Pc(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Be = !0;
const Eu = [];
function He() {
  Eu.push(Be), Be = !1;
}
function Ke() {
  const e = Eu.pop();
  Be = e === void 0 ? !0 : e;
}
function ps(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = X;
    X = void 0;
    try {
      t();
    } finally {
      X = n;
    }
  }
}
let Sn = 0;
class Rc {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Rr {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!X || !Be || X === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== X)
      n = this.activeLink = new Rc(X, this), X.deps ? (n.prevDep = X.depsTail, X.depsTail.nextDep = n, X.depsTail = n) : X.deps = X.depsTail = n, gu(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const o = n.nextDep;
      o.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = o), n.prevDep = X.depsTail, n.nextDep = void 0, X.depsTail.nextDep = n, X.depsTail = n, X.deps === n && (X.deps = o);
    }
    return process.env.NODE_ENV !== "production" && X.onTrack && X.onTrack(
      ae(
        {
          effect: X
        },
        t
      )
    ), n;
  }
  trigger(t) {
    this.version++, Sn++, this.notify(t);
  }
  notify(t) {
    xr();
    try {
      if (process.env.NODE_ENV !== "production")
        for (let n = this.subsHead; n; n = n.nextSub)
          n.sub.onTrigger && !(n.sub.flags & 8) && n.sub.onTrigger(
            ae(
              {
                effect: n.sub
              },
              t
            )
          );
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Ir();
    }
  }
}
function gu(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let o = t.deps; o; o = o.nextDep)
        gu(o);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const co = /* @__PURE__ */ new WeakMap(), xt = Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), er = Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), An = Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function fe(e, t, n) {
  if (Be && X) {
    let o = co.get(e);
    o || co.set(e, o = /* @__PURE__ */ new Map());
    let r = o.get(n);
    r || (o.set(n, r = new Rr()), r.map = o, r.key = n), process.env.NODE_ENV !== "production" ? r.track({
      target: e,
      type: t,
      key: n
    }) : r.track();
  }
}
function Qe(e, t, n, o, r, s) {
  const i = co.get(e);
  if (!i) {
    Sn++;
    return;
  }
  const u = (l) => {
    l && (process.env.NODE_ENV !== "production" ? l.trigger({
      target: e,
      type: t,
      key: n,
      newValue: o,
      oldValue: r,
      oldTarget: s
    }) : l.trigger());
  };
  if (xr(), t === "clear")
    i.forEach(u);
  else {
    const l = j(e), d = l && Tr(n);
    if (l && n === "length") {
      const f = Number(o);
      i.forEach((c, h) => {
        (h === "length" || h === An || !Qt(h) && h >= f) && u(c);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && u(i.get(n)), d && u(i.get(An)), t) {
        case "add":
          l ? d && u(i.get("length")) : (u(i.get(xt)), Gt(e) && u(i.get(er)));
          break;
        case "delete":
          l || (u(i.get(xt)), Gt(e) && u(i.get(er)));
          break;
        case "set":
          Gt(e) && u(i.get(xt));
          break;
      }
  }
  Ir();
}
function kc(e, t) {
  const n = co.get(e);
  return n && n.get(t);
}
function Mt(e) {
  const t = K(e);
  return t === e ? t : (fe(t, "iterate", An), Ve(e) ? t : t.map(Ne));
}
function kr(e) {
  return fe(e = K(e), "iterate", An), e;
}
const Fc = {
  __proto__: null,
  [Symbol.iterator]() {
    return Uo(this, Symbol.iterator, Ne);
  },
  concat(...e) {
    return Mt(this).concat(
      ...e.map((t) => j(t) ? Mt(t) : t)
    );
  },
  entries() {
    return Uo(this, "entries", (e) => (e[1] = Ne(e[1]), e));
  },
  every(e, t) {
    return rt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return rt(this, "filter", e, t, (n) => n.map(Ne), arguments);
  },
  find(e, t) {
    return rt(this, "find", e, t, Ne, arguments);
  },
  findIndex(e, t) {
    return rt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return rt(this, "findLast", e, t, Ne, arguments);
  },
  findLastIndex(e, t) {
    return rt(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return rt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Bo(this, "includes", e);
  },
  indexOf(...e) {
    return Bo(this, "indexOf", e);
  },
  join(e) {
    return Mt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Bo(this, "lastIndexOf", e);
  },
  map(e, t) {
    return rt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return cn(this, "pop");
  },
  push(...e) {
    return cn(this, "push", e);
  },
  reduce(e, ...t) {
    return hs(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return hs(this, "reduceRight", e, t);
  },
  shift() {
    return cn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return rt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return cn(this, "splice", e);
  },
  toReversed() {
    return Mt(this).toReversed();
  },
  toSorted(e) {
    return Mt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Mt(this).toSpliced(...e);
  },
  unshift(...e) {
    return cn(this, "unshift", e);
  },
  values() {
    return Uo(this, "values", Ne);
  }
};
function Uo(e, t, n) {
  const o = kr(e), r = o[t]();
  return o !== e && !Ve(e) && (r._next = r.next, r.next = () => {
    const s = r._next();
    return s.done || (s.value = n(s.value)), s;
  }), r;
}
const $c = Array.prototype;
function rt(e, t, n, o, r, s) {
  const i = kr(e), u = i !== e && !Ve(e), l = i[t];
  if (l !== $c[t]) {
    const c = l.apply(e, s);
    return u ? Ne(c) : c;
  }
  let d = n;
  i !== e && (u ? d = function(c, h) {
    return n.call(this, Ne(c), h, e);
  } : n.length > 2 && (d = function(c, h) {
    return n.call(this, c, h, e);
  }));
  const f = l.call(i, d, o);
  return u && r ? r(f) : f;
}
function hs(e, t, n, o) {
  const r = kr(e);
  let s = n;
  return r !== e && (Ve(e) ? n.length > 3 && (s = function(i, u, l) {
    return n.call(this, i, u, l, e);
  }) : s = function(i, u, l) {
    return n.call(this, i, Ne(u), l, e);
  }), r[t](s, ...o);
}
function Bo(e, t, n) {
  const o = K(e);
  fe(o, "iterate", An);
  const r = o[t](...n);
  return (r === -1 || r === !1) && Cn(n[0]) ? (n[0] = K(n[0]), o[t](...n)) : r;
}
function cn(e, t, n = []) {
  He(), xr();
  const o = K(e)[t].apply(e, n);
  return Ir(), Ke(), o;
}
const Lc = /* @__PURE__ */ ft("__proto__,__v_isRef,__isVue"), mu = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Qt)
);
function Mc(e) {
  Qt(e) || (e = String(e));
  const t = K(this);
  return fe(t, "has", e), t.hasOwnProperty(e);
}
class vu {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, o) {
    if (n === "__v_skip") return t.__v_skip;
    const r = this._isReadonly, s = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return s;
    if (n === "__v_raw")
      return o === (r ? s ? Su : Du : s ? Nu : Ou).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const i = j(t);
    if (!r) {
      let l;
      if (i && (l = Fc[n]))
        return l;
      if (n === "hasOwnProperty")
        return Mc;
    }
    const u = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      re(t) ? t : o
    );
    if ((Qt(n) ? mu.has(n) : Lc(n)) || (r || fe(t, "get", n), s))
      return u;
    if (re(u)) {
      const l = i && Tr(n) ? u : u.value;
      return r && oe(l) ? nr(l) : l;
    }
    return oe(u) ? r ? nr(u) : Co(u) : u;
  }
}
class yu extends vu {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, o, r) {
    let s = t[n];
    if (!this._isShallow) {
      const l = at(s);
      if (!Ve(o) && !at(o) && (s = K(s), o = K(o)), !j(t) && re(s) && !re(o))
        return l ? (process.env.NODE_ENV !== "production" && ke(
          `Set operation on key "${String(n)}" failed: target is readonly.`,
          t[n]
        ), !0) : (s.value = o, !0);
    }
    const i = j(t) && Tr(n) ? Number(n) < t.length : Y(t, n), u = Reflect.set(
      t,
      n,
      o,
      re(t) ? t : r
    );
    return t === K(r) && (i ? yt(o, s) && Qe(t, "set", n, o, s) : Qe(t, "add", n, o)), u;
  }
  deleteProperty(t, n) {
    const o = Y(t, n), r = t[n], s = Reflect.deleteProperty(t, n);
    return s && o && Qe(t, "delete", n, void 0, r), s;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!Qt(n) || !mu.has(n)) && fe(t, "has", n), o;
  }
  ownKeys(t) {
    return fe(
      t,
      "iterate",
      j(t) ? "length" : xt
    ), Reflect.ownKeys(t);
  }
}
class bu extends vu {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && ke(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && ke(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const Uc = /* @__PURE__ */ new yu(), Bc = /* @__PURE__ */ new bu(), jc = /* @__PURE__ */ new yu(!0), Hc = /* @__PURE__ */ new bu(!0), tr = (e) => e, Kn = (e) => Reflect.getPrototypeOf(e);
function Kc(e, t, n) {
  return function(...o) {
    const r = this.__v_raw, s = K(r), i = Gt(s), u = e === "entries" || e === Symbol.iterator && i, l = e === "keys" && i, d = r[e](...o), f = n ? tr : t ? or : Ne;
    return !t && fe(
      s,
      "iterate",
      l ? er : xt
    ), {
      // iterator protocol
      next() {
        const { value: c, done: h } = d.next();
        return h ? { value: c, done: h } : {
          value: u ? [f(c[0]), f(c[1])] : f(c),
          done: h
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Wn(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      ke(
        `${Do(e)} operation ${n}failed: target is readonly.`,
        K(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Wc(e, t) {
  const n = {
    get(r) {
      const s = this.__v_raw, i = K(s), u = K(r);
      e || (yt(r, u) && fe(i, "get", r), fe(i, "get", u));
      const { has: l } = Kn(i), d = t ? tr : e ? or : Ne;
      if (l.call(i, r))
        return d(s.get(r));
      if (l.call(i, u))
        return d(s.get(u));
      s !== i && s.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && fe(K(r), "iterate", xt), r.size;
    },
    has(r) {
      const s = this.__v_raw, i = K(s), u = K(r);
      return e || (yt(r, u) && fe(i, "has", r), fe(i, "has", u)), r === u ? s.has(r) : s.has(r) || s.has(u);
    },
    forEach(r, s) {
      const i = this, u = i.__v_raw, l = K(u), d = t ? tr : e ? or : Ne;
      return !e && fe(l, "iterate", xt), u.forEach((f, c) => r.call(s, d(f), d(c), i));
    }
  };
  return ae(
    n,
    e ? {
      add: Wn("add"),
      set: Wn("set"),
      delete: Wn("delete"),
      clear: Wn("clear")
    } : {
      add(r) {
        !t && !Ve(r) && !at(r) && (r = K(r));
        const s = K(this);
        return Kn(s).has.call(s, r) || (s.add(r), Qe(s, "add", r, r)), this;
      },
      set(r, s) {
        !t && !Ve(s) && !at(s) && (s = K(s));
        const i = K(this), { has: u, get: l } = Kn(i);
        let d = u.call(i, r);
        d ? process.env.NODE_ENV !== "production" && _s(i, u, r) : (r = K(r), d = u.call(i, r));
        const f = l.call(i, r);
        return i.set(r, s), d ? yt(s, f) && Qe(i, "set", r, s, f) : Qe(i, "add", r, s), this;
      },
      delete(r) {
        const s = K(this), { has: i, get: u } = Kn(s);
        let l = i.call(s, r);
        l ? process.env.NODE_ENV !== "production" && _s(s, i, r) : (r = K(r), l = i.call(s, r));
        const d = u ? u.call(s, r) : void 0, f = s.delete(r);
        return l && Qe(s, "delete", r, void 0, d), f;
      },
      clear() {
        const r = K(this), s = r.size !== 0, i = process.env.NODE_ENV !== "production" ? Gt(r) ? new Map(r) : new Set(r) : void 0, u = r.clear();
        return s && Qe(
          r,
          "clear",
          void 0,
          void 0,
          i
        ), u;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((r) => {
    n[r] = Kc(r, e, t);
  }), n;
}
function Ao(e, t) {
  const n = Wc(e, t);
  return (o, r, s) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? o : Reflect.get(
    Y(n, r) && r in o ? n : o,
    r,
    s
  );
}
const zc = {
  get: /* @__PURE__ */ Ao(!1, !1)
}, Gc = {
  get: /* @__PURE__ */ Ao(!1, !0)
}, qc = {
  get: /* @__PURE__ */ Ao(!0, !1)
}, Yc = {
  get: /* @__PURE__ */ Ao(!0, !0)
};
function _s(e, t, n) {
  const o = K(n);
  if (o !== n && t.call(e, o)) {
    const r = wr(e);
    ke(
      `Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Ou = /* @__PURE__ */ new WeakMap(), Nu = /* @__PURE__ */ new WeakMap(), Du = /* @__PURE__ */ new WeakMap(), Su = /* @__PURE__ */ new WeakMap();
function Jc(e) {
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
function Xc(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Jc(wr(e));
}
function Co(e) {
  return at(e) ? e : wo(
    e,
    !1,
    Uc,
    zc,
    Ou
  );
}
function Zc(e) {
  return wo(
    e,
    !1,
    jc,
    Gc,
    Nu
  );
}
function nr(e) {
  return wo(
    e,
    !0,
    Bc,
    qc,
    Du
  );
}
function et(e) {
  return wo(
    e,
    !0,
    Hc,
    Yc,
    Su
  );
}
function wo(e, t, n, o, r) {
  if (!oe(e))
    return process.env.NODE_ENV !== "production" && ke(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const s = Xc(e);
  if (s === 0)
    return e;
  const i = r.get(e);
  if (i)
    return i;
  const u = new Proxy(
    e,
    s === 2 ? o : n
  );
  return r.set(e, u), u;
}
function lt(e) {
  return at(e) ? lt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function at(e) {
  return !!(e && e.__v_isReadonly);
}
function Ve(e) {
  return !!(e && e.__v_isShallow);
}
function Cn(e) {
  return e ? !!e.__v_raw : !1;
}
function K(e) {
  const t = e && e.__v_raw;
  return t ? K(t) : e;
}
function gt(e) {
  return !Y(e, "__v_skip") && Object.isExtensible(e) && lo(e, "__v_skip", !0), e;
}
const Ne = (e) => oe(e) ? Co(e) : e, or = (e) => oe(e) ? nr(e) : e;
function re(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function Yt(e) {
  return Qc(e, !1);
}
function Qc(e, t) {
  return re(e) ? e : new ea(e, t);
}
class ea {
  constructor(t, n) {
    this.dep = new Rr(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : K(t), this._value = n ? t : Ne(t), this.__v_isShallow = n;
  }
  get value() {
    return process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, o = this.__v_isShallow || Ve(t) || at(t);
    t = o ? t : K(t), yt(t, n) && (this._rawValue = t, this._value = o ? t : Ne(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }) : this.dep.trigger());
  }
}
function pt(e) {
  return re(e) ? e.value : e;
}
const ta = {
  get: (e, t, n) => t === "__v_raw" ? e : pt(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const r = e[t];
    return re(r) && !re(n) ? (r.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function Au(e) {
  return lt(e) ? e : new Proxy(e, ta);
}
function Es(e) {
  process.env.NODE_ENV !== "production" && !Cn(e) && ke("toRefs() expects a reactive object but received a plain one.");
  const t = j(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = Cu(e, n);
  return t;
}
class na {
  constructor(t, n, o) {
    this._object = t, this._key = n, this._defaultValue = o, this.__v_isRef = !0, this._value = void 0;
  }
  get value() {
    const t = this._object[this._key];
    return this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return kc(K(this._object), this._key);
  }
}
class oa {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
function jo(e, t, n) {
  return re(e) ? e : B(e) ? new oa(e) : oe(e) && arguments.length > 1 ? Cu(e, t, n) : Yt(e);
}
function Cu(e, t, n) {
  const o = e[t];
  return re(o) ? o : new na(e, t, n);
}
class ra {
  constructor(t, n, o) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Rr(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Sn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = o;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    X !== this)
      return du(this, !0), !0;
    process.env.NODE_ENV;
  }
  get value() {
    const t = process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track();
    return _u(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter ? this.setter(t) : process.env.NODE_ENV !== "production" && ke("Write operation failed: computed value is readonly");
  }
}
function sa(e, t, n = !1) {
  let o, r;
  B(e) ? o = e : (o = e.get, r = e.set);
  const s = new ra(o, r, n);
  return process.env.NODE_ENV, s;
}
const zn = {}, ao = /* @__PURE__ */ new WeakMap();
let wt;
function ia(e, t = !1, n = wt) {
  if (n) {
    let o = ao.get(n);
    o || ao.set(n, o = []), o.push(e);
  } else process.env.NODE_ENV !== "production" && !t && ke(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function ua(e, t, n = ee) {
  const { immediate: o, deep: r, once: s, scheduler: i, augmentJob: u, call: l } = n, d = (F) => {
    (n.onWarn || ke)(
      "Invalid watch source: ",
      F,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, f = (F) => r ? F : Ve(F) || r === !1 || r === 0 ? Et(F, 1) : Et(F);
  let c, h, _, g, b = !1, w = !1;
  if (re(e) ? (h = () => e.value, b = Ve(e)) : lt(e) ? (h = () => f(e), b = !0) : j(e) ? (w = !0, b = e.some((F) => lt(F) || Ve(F)), h = () => e.map((F) => {
    if (re(F))
      return F.value;
    if (lt(F))
      return f(F);
    if (B(F))
      return l ? l(F, 2) : F();
    process.env.NODE_ENV !== "production" && d(F);
  })) : B(e) ? t ? h = l ? () => l(e, 2) : e : h = () => {
    if (_) {
      He();
      try {
        _();
      } finally {
        Ke();
      }
    }
    const F = wt;
    wt = c;
    try {
      return l ? l(e, 3, [g]) : e(g);
    } finally {
      wt = F;
    }
  } : (h = de, process.env.NODE_ENV !== "production" && d(e)), t && r) {
    const F = h, J = r === !0 ? 1 / 0 : r;
    h = () => Et(F(), J);
  }
  const S = cu(), $ = () => {
    c.stop(), S && S.active && Ar(S.effects, c);
  };
  if (s && t) {
    const F = t;
    t = (...J) => {
      F(...J), $();
    };
  }
  let k = w ? new Array(e.length).fill(zn) : zn;
  const te = (F) => {
    if (!(!(c.flags & 1) || !c.dirty && !F))
      if (t) {
        const J = c.run();
        if (r || b || (w ? J.some((L, le) => yt(L, k[le])) : yt(J, k))) {
          _ && _();
          const L = wt;
          wt = c;
          try {
            const le = [
              J,
              // pass undefined as the old value when it's changed for the first time
              k === zn ? void 0 : w && k[0] === zn ? [] : k,
              g
            ];
            k = J, l ? l(t, 3, le) : (
              // @ts-expect-error
              t(...le)
            );
          } finally {
            wt = L;
          }
        }
      } else
        c.run();
  };
  return u && u(te), c = new au(h), c.scheduler = i ? () => i(te, !1) : te, g = (F) => ia(F, !1, c), _ = c.onStop = () => {
    const F = ao.get(c);
    if (F) {
      if (l)
        l(F, 4);
      else
        for (const J of F) J();
      ao.delete(c);
    }
  }, process.env.NODE_ENV !== "production" && (c.onTrack = n.onTrack, c.onTrigger = n.onTrigger), t ? o ? te(!0) : k = c.run() : i ? i(te.bind(null, !0), !0) : c.run(), $.pause = c.pause.bind(c), $.resume = c.resume.bind(c), $.stop = $, $;
}
function Et(e, t = 1 / 0, n) {
  if (t <= 0 || !oe(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, re(e))
    Et(e.value, t, n);
  else if (j(e))
    for (let o = 0; o < e.length; o++)
      Et(e[o], t, n);
  else if (pc(e) || Gt(e))
    e.forEach((o) => {
      Et(o, t, n);
    });
  else if (_c(e)) {
    for (const o in e)
      Et(e[o], t, n);
    for (const o of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, o) && Et(e[o], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const It = [];
function qn(e) {
  It.push(e);
}
function Yn() {
  It.pop();
}
let Ho = !1;
function C(e, ...t) {
  if (Ho) return;
  Ho = !0, He();
  const n = It.length ? It[It.length - 1].component : null, o = n && n.appContext.config.warnHandler, r = la();
  if (o)
    en(
      o,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((s) => {
          var i, u;
          return (u = (i = s.toString) == null ? void 0 : i.call(s)) != null ? u : JSON.stringify(s);
        }).join(""),
        n && n.proxy,
        r.map(
          ({ vnode: s }) => `at <${Ro(n, s.type)}>`
        ).join(`
`),
        r
      ]
    );
  else {
    const s = [`[Vue warn]: ${e}`, ...t];
    r.length && s.push(`
`, ...ca(r)), console.warn(...s);
  }
  Ke(), Ho = !1;
}
function la() {
  let e = It[It.length - 1];
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
function ca(e) {
  const t = [];
  return e.forEach((n, o) => {
    t.push(...o === 0 ? [] : [`
`], ...aa(n));
  }), t;
}
function aa({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, r = ` at <${Ro(
    e.component,
    e.type,
    o
  )}`, s = ">" + n;
  return e.props ? [r, ...fa(e.props), s] : [r + s];
}
function fa(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((o) => {
    t.push(...wu(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function wu(e, t, n) {
  return ce(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : re(t) ? (t = wu(e, K(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : B(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = K(t), n ? t : [`${e}=`, t]);
}
const Fr = {
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
function en(e, t, n, o) {
  try {
    return o ? e(...o) : e();
  } catch (r) {
    Ln(r, t, n);
  }
}
function ot(e, t, n, o) {
  if (B(e)) {
    const r = en(e, t, n, o);
    return r && Cr(r) && r.catch((s) => {
      Ln(s, t, n);
    }), r;
  }
  if (j(e)) {
    const r = [];
    for (let s = 0; s < e.length; s++)
      r.push(ot(e[s], t, n, o));
    return r;
  } else process.env.NODE_ENV !== "production" && C(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function Ln(e, t, n, o = !0) {
  const r = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: i } = t && t.appContext.config || ee;
  if (t) {
    let u = t.parent;
    const l = t.proxy, d = process.env.NODE_ENV !== "production" ? Fr[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; u; ) {
      const f = u.ec;
      if (f) {
        for (let c = 0; c < f.length; c++)
          if (f[c](e, l, d) === !1)
            return;
      }
      u = u.parent;
    }
    if (s) {
      He(), en(s, null, 10, [
        e,
        l,
        d
      ]), Ke();
      return;
    }
  }
  da(e, n, r, o, i);
}
function da(e, t, n, o = !0, r = !1) {
  if (process.env.NODE_ENV !== "production") {
    const s = Fr[t];
    if (n && qn(n), C(`Unhandled error${s ? ` during execution of ${s}` : ""}`), n && Yn(), o)
      throw e;
    console.error(e);
  } else {
    if (r)
      throw e;
    console.error(e);
  }
}
const De = [];
let Xe = -1;
const qt = [];
let ht = null, Ht = 0;
const Tu = /* @__PURE__ */ Promise.resolve();
let fo = null;
const pa = 100;
function rr(e) {
  const t = fo || Tu;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ha(e) {
  let t = Xe + 1, n = De.length;
  for (; t < n; ) {
    const o = t + n >>> 1, r = De[o], s = wn(r);
    s < e || s === e && r.flags & 2 ? t = o + 1 : n = o;
  }
  return t;
}
function To(e) {
  if (!(e.flags & 1)) {
    const t = wn(e), n = De[De.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= wn(n) ? De.push(e) : De.splice(ha(t), 0, e), e.flags |= 1, Vu();
  }
}
function Vu() {
  fo || (fo = Tu.then(Pu));
}
function xu(e) {
  j(e) ? qt.push(...e) : ht && e.id === -1 ? ht.splice(Ht + 1, 0, e) : e.flags & 1 || (qt.push(e), e.flags |= 1), Vu();
}
function gs(e, t, n = Xe + 1) {
  for (process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()); n < De.length; n++) {
    const o = De[n];
    if (o && o.flags & 2) {
      if (e && o.id !== e.uid || process.env.NODE_ENV !== "production" && $r(t, o))
        continue;
      De.splice(n, 1), n--, o.flags & 4 && (o.flags &= -2), o(), o.flags & 4 || (o.flags &= -2);
    }
  }
}
function Iu(e) {
  if (qt.length) {
    const t = [...new Set(qt)].sort(
      (n, o) => wn(n) - wn(o)
    );
    if (qt.length = 0, ht) {
      ht.push(...t);
      return;
    }
    for (ht = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), Ht = 0; Ht < ht.length; Ht++) {
      const n = ht[Ht];
      process.env.NODE_ENV !== "production" && $r(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    ht = null, Ht = 0;
  }
}
const wn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Pu(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => $r(e, n) : de;
  try {
    for (Xe = 0; Xe < De.length; Xe++) {
      const n = De[Xe];
      if (n && !(n.flags & 8)) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        n.flags & 4 && (n.flags &= -2), en(
          n,
          n.i,
          n.i ? 15 : 14
        ), n.flags & 4 || (n.flags &= -2);
      }
    }
  } finally {
    for (; Xe < De.length; Xe++) {
      const n = De[Xe];
      n && (n.flags &= -2);
    }
    Xe = -1, De.length = 0, Iu(e), fo = null, (De.length || qt.length) && Pu(e);
  }
}
function $r(e, t) {
  const n = e.get(t) || 0;
  if (n > pa) {
    const o = t.i, r = o && _l(o.type);
    return Ln(
      `Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
let tt = !1;
const Jn = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && ($n().__VUE_HMR_RUNTIME__ = {
  createRecord: Ko(Ru),
  rerender: Ko(ga),
  reload: Ko(ma)
});
const kt = /* @__PURE__ */ new Map();
function _a(e) {
  const t = e.type.__hmrId;
  let n = kt.get(t);
  n || (Ru(t, e.type), n = kt.get(t)), n.instances.add(e);
}
function Ea(e) {
  kt.get(e.type.__hmrId).instances.delete(e);
}
function Ru(e, t) {
  return kt.has(e) ? !1 : (kt.set(e, {
    initialDef: po(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function po(e) {
  return El(e) ? e.__vccOpts : e;
}
function ga(e, t) {
  const n = kt.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, po(o.type).render = t), o.renderCache = [], tt = !0, o.job.flags & 8 || o.update(), tt = !1;
  }));
}
function ma(e, t) {
  const n = kt.get(e);
  if (!n) return;
  t = po(t), ms(n.initialDef, t);
  const o = [...n.instances];
  for (let r = 0; r < o.length; r++) {
    const s = o[r], i = po(s.type);
    let u = Jn.get(i);
    u || (i !== n.initialDef && ms(i, t), Jn.set(i, u = /* @__PURE__ */ new Set())), u.add(s), s.appContext.propsCache.delete(s.type), s.appContext.emitsCache.delete(s.type), s.appContext.optionsCache.delete(s.type), s.ceReload ? (u.add(s), s.ceReload(t.styles), u.delete(s)) : s.parent ? To(() => {
      s.job.flags & 8 || (tt = !0, s.parent.update(), tt = !1, u.delete(s));
    }) : s.appContext.reload ? s.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), s.root.ce && s !== s.root && s.root.ce._removeChildStyle(i);
  }
  xu(() => {
    Jn.clear();
  });
}
function ms(e, t) {
  ae(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Ko(e) {
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
let Me, dn = [], sr = !1;
function Mn(e, ...t) {
  Me ? Me.emit(e, ...t) : sr || dn.push({ event: e, args: t });
}
function Lr(e, t) {
  var n, o;
  Me = e, Me ? (Me.enabled = !0, dn.forEach(({ event: r, args: s }) => Me.emit(r, ...s)), dn = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((o = (n = window.navigator) == null ? void 0 : n.userAgent) != null && o.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((s) => {
    Lr(s, t);
  }), setTimeout(() => {
    Me || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, sr = !0, dn = []);
  }, 3e3)) : (sr = !0, dn = []);
}
function va(e, t) {
  Mn("app:init", e, t, {
    Fragment: Ze,
    Text: Un,
    Comment: je,
    Static: Zn
  });
}
function ya(e) {
  Mn("app:unmount", e);
}
const ba = /* @__PURE__ */ Mr(
  "component:added"
  /* COMPONENT_ADDED */
), ku = /* @__PURE__ */ Mr(
  "component:updated"
  /* COMPONENT_UPDATED */
), Oa = /* @__PURE__ */ Mr(
  "component:removed"
  /* COMPONENT_REMOVED */
), Na = (e) => {
  Me && typeof Me.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !Me.cleanupBuffer(e) && Oa(e);
};
// @__NO_SIDE_EFFECTS__
function Mr(e) {
  return (t) => {
    Mn(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
const Da = /* @__PURE__ */ Fu(
  "perf:start"
  /* PERFORMANCE_START */
), Sa = /* @__PURE__ */ Fu(
  "perf:end"
  /* PERFORMANCE_END */
);
function Fu(e) {
  return (t, n, o) => {
    Mn(e, t.appContext.app, t.uid, t, n, o);
  };
}
function Aa(e, t, n) {
  Mn(
    "component:emit",
    e.appContext.app,
    e,
    t,
    n
  );
}
let Pe = null, $u = null;
function ho(e) {
  const t = Pe;
  return Pe = e, $u = e && e.type.__scopeId || null, t;
}
function Ca(e, t = Pe, n) {
  if (!t || e._n)
    return e;
  const o = (...r) => {
    o._d && Is(-1);
    const s = ho(t);
    let i;
    try {
      i = e(...r);
    } finally {
      ho(s), o._d && Is(1);
    }
    return process.env.NODE_ENV !== "production" && ku(t), i;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function Lu(e) {
  Ec(e) && C("Do not use built-in directive ids as custom directive id: " + e);
}
function St(e, t, n, o) {
  const r = e.dirs, s = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const u = r[i];
    s && (u.oldValue = s[i].value);
    let l = u.dir[o];
    l && (He(), ot(l, n, 8, [
      e.el,
      u,
      e,
      t
    ]), Ke());
  }
}
const wa = Symbol("_vte"), Ta = (e) => e.__isTeleport, Va = Symbol("_leaveCb");
function Ur(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Ur(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Mu(e, t) {
  return B(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ae({ name: e.name }, t, { setup: e })
  ) : e;
}
function Uu(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const vs = /* @__PURE__ */ new WeakSet(), _o = /* @__PURE__ */ new WeakMap();
function vn(e, t, n, o, r = !1) {
  if (j(e)) {
    e.forEach(
      (b, w) => vn(
        b,
        t && (j(t) ? t[w] : t),
        n,
        o,
        r
      )
    );
    return;
  }
  if (yn(o) && !r) {
    o.shapeFlag & 512 && o.type.__asyncResolved && o.component.subTree.component && vn(e, t, n, o.component.subTree);
    return;
  }
  const s = o.shapeFlag & 4 ? Gr(o.component) : o.el, i = r ? null : s, { i: u, r: l } = e;
  if (process.env.NODE_ENV !== "production" && !u) {
    C(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const d = t && t.r, f = u.refs === ee ? u.refs = {} : u.refs, c = u.setupState, h = K(c), _ = c === ee ? su : (b) => process.env.NODE_ENV !== "production" && (Y(h, b) && !re(h[b]) && C(
    `Template ref "${b}" used on a non-ref value. It will not work in the production build.`
  ), vs.has(h[b])) ? !1 : Y(h, b), g = (b) => process.env.NODE_ENV === "production" || !vs.has(b);
  if (d != null && d !== l) {
    if (ys(t), ce(d))
      f[d] = null, _(d) && (c[d] = null);
    else if (re(d)) {
      g(d) && (d.value = null);
      const b = t;
      b.k && (f[b.k] = null);
    }
  }
  if (B(l))
    en(l, u, 12, [i, f]);
  else {
    const b = ce(l), w = re(l);
    if (b || w) {
      const S = () => {
        if (e.f) {
          const $ = b ? _(l) ? c[l] : f[l] : g(l) || !e.k ? l.value : f[e.k];
          if (r)
            j($) && Ar($, s);
          else if (j($))
            $.includes(s) || $.push(s);
          else if (b)
            f[l] = [s], _(l) && (c[l] = f[l]);
          else {
            const k = [s];
            g(l) && (l.value = k), e.k && (f[e.k] = k);
          }
        } else b ? (f[l] = i, _(l) && (c[l] = i)) : w ? (g(l) && (l.value = i), e.k && (f[e.k] = i)) : process.env.NODE_ENV !== "production" && C("Invalid template ref type:", l, `(${typeof l})`);
      };
      if (i) {
        const $ = () => {
          S(), _o.delete(e);
        };
        $.id = -1, _o.set(e, $), xe($, n);
      } else
        ys(e), S();
    } else process.env.NODE_ENV !== "production" && C("Invalid template ref type:", l, `(${typeof l})`);
  }
}
function ys(e) {
  const t = _o.get(e);
  t && (t.flags |= 8, _o.delete(e));
}
$n().requestIdleCallback;
$n().cancelIdleCallback;
const yn = (e) => !!e.type.__asyncLoader, Br = (e) => e.type.__isKeepAlive;
function xa(e, t) {
  Bu(e, "a", t);
}
function Ia(e, t) {
  Bu(e, "da", t);
}
function Bu(e, t, n = Ee) {
  const o = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (Vo(t, o, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      Br(r.parent.vnode) && Pa(o, t, n, r), r = r.parent;
  }
}
function Pa(e, t, n, o) {
  const r = Vo(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  ju(() => {
    Ar(o[t], r);
  }, n);
}
function Vo(e, t, n = Ee, o = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      He();
      const u = Bn(n), l = ot(t, n, e, i);
      return u(), Ke(), l;
    });
    return o ? r.unshift(s) : r.push(s), s;
  } else if (process.env.NODE_ENV !== "production") {
    const r = Ct(Fr[e].replace(/ hook$/, ""));
    C(
      `${r} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const dt = (e) => (t, n = Ee) => {
  (!Vn || e === "sp") && Vo(e, (...o) => t(...o), n);
}, Ra = dt("bm"), ka = dt("m"), Fa = dt(
  "bu"
), $a = dt("u"), La = dt(
  "bum"
), ju = dt("um"), Ma = dt(
  "sp"
), Ua = dt("rtg"), Ba = dt("rtc");
function ja(e, t = Ee) {
  Vo("ec", e, t);
}
const Ha = Symbol.for("v-ndc"), ir = (e) => e ? pl(e) ? Gr(e) : ir(e.parent) : null, Pt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ae(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? et(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? et(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? et(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? et(e.refs) : e.refs,
    $parent: (e) => ir(e.parent),
    $root: (e) => ir(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Wu(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      To(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = rr.bind(e.proxy)),
    $watch: (e) => Df.bind(e)
  })
), jr = (e) => e === "_" || e === "$", Wo = (e, t) => e !== ee && !e.__isScriptSetup && Y(e, t), Hu = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: o, data: r, props: s, accessCache: i, type: u, appContext: l } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let d;
    if (t[0] !== "$") {
      const _ = i[t];
      if (_ !== void 0)
        switch (_) {
          case 1:
            return o[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return s[t];
        }
      else {
        if (Wo(o, t))
          return i[t] = 1, o[t];
        if (r !== ee && Y(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (d = e.propsOptions[0]) && Y(d, t)
        )
          return i[t] = 3, s[t];
        if (n !== ee && Y(n, t))
          return i[t] = 4, n[t];
        ur && (i[t] = 0);
      }
    }
    const f = Pt[t];
    let c, h;
    if (f)
      return t === "$attrs" ? (fe(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && mo()) : process.env.NODE_ENV !== "production" && t === "$slots" && fe(e, "get", t), f(e);
    if (
      // css module (injected by vue-loader)
      (c = u.__cssModules) && (c = c[t])
    )
      return c;
    if (n !== ee && Y(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      h = l.config.globalProperties, Y(h, t)
    )
      return h[t];
    process.env.NODE_ENV !== "production" && Pe && (!ce(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== ee && jr(t[0]) && Y(r, t) ? C(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === Pe && C(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: r, ctx: s } = e;
    return Wo(r, t) ? (r[t] = n, !0) : process.env.NODE_ENV !== "production" && r.__isScriptSetup && Y(r, t) ? (C(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : o !== ee && Y(o, t) ? (o[t] = n, !0) : Y(e.props, t) ? (process.env.NODE_ENV !== "production" && C(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && C(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(s, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: r, propsOptions: s, type: i }
  }, u) {
    let l, d;
    return !!(n[u] || e !== ee && u[0] !== "$" && Y(e, u) || Wo(t, u) || (l = s[0]) && Y(l, u) || Y(o, u) || Y(Pt, u) || Y(r.config.globalProperties, u) || (d = i.__cssModules) && d[u]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : Y(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (Hu.ownKeys = (e) => (C(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function Ka(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys(Pt).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => Pt[n](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: de
    });
  }), t;
}
function Wa(e) {
  const {
    ctx: t,
    propsOptions: [n]
  } = e;
  n && Object.keys(n).forEach((o) => {
    Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[o],
      set: de
    });
  });
}
function za(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(K(n)).forEach((o) => {
    if (!n.__isScriptSetup) {
      if (jr(o[0])) {
        C(
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
        set: de
      });
    }
  });
}
function bs(e) {
  return j(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function Ga() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? C(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let ur = !0;
function qa(e) {
  const t = Wu(e), n = e.proxy, o = e.ctx;
  ur = !1, t.beforeCreate && Os(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: s,
    methods: i,
    watch: u,
    provide: l,
    inject: d,
    // lifecycle
    created: f,
    beforeMount: c,
    mounted: h,
    beforeUpdate: _,
    updated: g,
    activated: b,
    deactivated: w,
    beforeDestroy: S,
    beforeUnmount: $,
    destroyed: k,
    unmounted: te,
    render: F,
    renderTracked: J,
    renderTriggered: L,
    errorCaptured: le,
    serverPrefetch: Z,
    // public API
    expose: P,
    inheritAttrs: x,
    // assets
    components: z,
    directives: ue,
    filters: ve
  } = t, ye = process.env.NODE_ENV !== "production" ? Ga() : null;
  if (process.env.NODE_ENV !== "production") {
    const [I] = e.propsOptions;
    if (I)
      for (const H in I)
        ye("Props", H);
  }
  if (d && Ya(d, o, ye), i)
    for (const I in i) {
      const H = i[I];
      B(H) ? (process.env.NODE_ENV !== "production" ? Object.defineProperty(o, I, {
        value: H.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : o[I] = H.bind(n), process.env.NODE_ENV !== "production" && ye("Methods", I)) : process.env.NODE_ENV !== "production" && C(
        `Method "${I}" has type "${typeof H}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (r) {
    process.env.NODE_ENV !== "production" && !B(r) && C(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const I = r.call(n, n);
    if (process.env.NODE_ENV !== "production" && Cr(I) && C(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !oe(I))
      process.env.NODE_ENV !== "production" && C("data() should return an object.");
    else if (e.data = Co(I), process.env.NODE_ENV !== "production")
      for (const H in I)
        ye("Data", H), jr(H[0]) || Object.defineProperty(o, H, {
          configurable: !0,
          enumerable: !0,
          get: () => I[H],
          set: de
        });
  }
  if (ur = !0, s)
    for (const I in s) {
      const H = s[I], G = B(H) ? H.bind(n, n) : B(H.get) ? H.get.bind(n, n) : de;
      process.env.NODE_ENV !== "production" && G === de && C(`Computed property "${I}" has no getter.`);
      const We = !B(H) && B(H.set) ? H.set.bind(n) : process.env.NODE_ENV !== "production" ? () => {
        C(
          `Write operation failed: computed property "${I}" is readonly.`
        );
      } : de, Ae = qr({
        get: G,
        set: We
      });
      Object.defineProperty(o, I, {
        enumerable: !0,
        configurable: !0,
        get: () => Ae.value,
        set: (he) => Ae.value = he
      }), process.env.NODE_ENV !== "production" && ye("Computed", I);
    }
  if (u)
    for (const I in u)
      Ku(u[I], o, n, I);
  if (l) {
    const I = B(l) ? l.call(n) : l;
    Reflect.ownKeys(I).forEach((H) => {
      tf(H, I[H]);
    });
  }
  f && Os(f, e, "c");
  function se(I, H) {
    j(H) ? H.forEach((G) => I(G.bind(n))) : H && I(H.bind(n));
  }
  if (se(Ra, c), se(ka, h), se(Fa, _), se($a, g), se(xa, b), se(Ia, w), se(ja, le), se(Ba, J), se(Ua, L), se(La, $), se(ju, te), se(Ma, Z), j(P))
    if (P.length) {
      const I = e.exposed || (e.exposed = {});
      P.forEach((H) => {
        Object.defineProperty(I, H, {
          get: () => n[H],
          set: (G) => n[H] = G,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  F && e.render === de && (e.render = F), x != null && (e.inheritAttrs = x), z && (e.components = z), ue && (e.directives = ue), Z && Uu(e);
}
function Ya(e, t, n = de) {
  j(e) && (e = lr(e));
  for (const o in e) {
    const r = e[o];
    let s;
    oe(r) ? "default" in r ? s = bn(
      r.from || o,
      r.default,
      !0
    ) : s = bn(r.from || o) : s = bn(r), re(s) ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (i) => s.value = i
    }) : t[o] = s, process.env.NODE_ENV !== "production" && n("Inject", o);
  }
}
function Os(e, t, n) {
  ot(
    j(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Ku(e, t, n, o) {
  let r = o.includes(".") ? ol(n, o) : () => n[o];
  if (ce(e)) {
    const s = t[e];
    B(s) ? On(r, s) : process.env.NODE_ENV !== "production" && C(`Invalid watch handler specified by key "${e}"`, s);
  } else if (B(e))
    On(r, e.bind(n));
  else if (oe(e))
    if (j(e))
      e.forEach((s) => Ku(s, t, n, o));
    else {
      const s = B(e.handler) ? e.handler.bind(n) : t[e.handler];
      B(s) ? On(r, s, e) : process.env.NODE_ENV !== "production" && C(`Invalid watch handler specified by key "${e.handler}"`, s);
    }
  else process.env.NODE_ENV !== "production" && C(`Invalid watch option: "${o}"`, e);
}
function Wu(e) {
  const t = e.type, { mixins: n, extends: o } = t, {
    mixins: r,
    optionsCache: s,
    config: { optionMergeStrategies: i }
  } = e.appContext, u = s.get(t);
  let l;
  return u ? l = u : !r.length && !n && !o ? l = t : (l = {}, r.length && r.forEach(
    (d) => Eo(l, d, i, !0)
  ), Eo(l, t, i)), oe(t) && s.set(t, l), l;
}
function Eo(e, t, n, o = !1) {
  const { mixins: r, extends: s } = t;
  s && Eo(e, s, n, !0), r && r.forEach(
    (i) => Eo(e, i, n, !0)
  );
  for (const i in t)
    if (o && i === "expose")
      process.env.NODE_ENV !== "production" && C(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const u = Ja[i] || n && n[i];
      e[i] = u ? u(e[i], t[i]) : t[i];
    }
  return e;
}
const Ja = {
  data: Ns,
  props: Ds,
  emits: Ds,
  // objects
  methods: pn,
  computed: pn,
  // lifecycle
  beforeCreate: Oe,
  created: Oe,
  beforeMount: Oe,
  mounted: Oe,
  beforeUpdate: Oe,
  updated: Oe,
  beforeDestroy: Oe,
  beforeUnmount: Oe,
  destroyed: Oe,
  unmounted: Oe,
  activated: Oe,
  deactivated: Oe,
  errorCaptured: Oe,
  serverPrefetch: Oe,
  // assets
  components: pn,
  directives: pn,
  // watch
  watch: Za,
  // provide / inject
  provide: Ns,
  inject: Xa
};
function Ns(e, t) {
  return t ? e ? function() {
    return ae(
      B(e) ? e.call(this, this) : e,
      B(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Xa(e, t) {
  return pn(lr(e), lr(t));
}
function lr(e) {
  if (j(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Oe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function pn(e, t) {
  return e ? ae(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Ds(e, t) {
  return e ? j(e) && j(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ae(
    /* @__PURE__ */ Object.create(null),
    bs(e),
    bs(t ?? {})
  ) : t;
}
function Za(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ae(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = Oe(e[o], t[o]);
  return n;
}
function zu() {
  return {
    app: null,
    config: {
      isNativeTag: su,
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
let Qa = 0;
function ef(e, t) {
  return function(o, r = null) {
    B(o) || (o = ae({}, o)), r != null && !oe(r) && (process.env.NODE_ENV !== "production" && C("root props passed to app.mount() must be an object."), r = null);
    const s = zu(), i = /* @__PURE__ */ new WeakSet(), u = [];
    let l = !1;
    const d = s.app = {
      _uid: Qa++,
      _component: o,
      _props: r,
      _container: null,
      _context: s,
      _instance: null,
      version: Fs,
      get config() {
        return s.config;
      },
      set config(f) {
        process.env.NODE_ENV !== "production" && C(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(f, ...c) {
        return i.has(f) ? process.env.NODE_ENV !== "production" && C("Plugin has already been applied to target app.") : f && B(f.install) ? (i.add(f), f.install(d, ...c)) : B(f) ? (i.add(f), f(d, ...c)) : process.env.NODE_ENV !== "production" && C(
          'A plugin must either be a function or an object with an "install" function.'
        ), d;
      },
      mixin(f) {
        return s.mixins.includes(f) ? process.env.NODE_ENV !== "production" && C(
          "Mixin has already been applied to target app" + (f.name ? `: ${f.name}` : "")
        ) : s.mixins.push(f), d;
      },
      component(f, c) {
        return process.env.NODE_ENV !== "production" && pr(f, s.config), c ? (process.env.NODE_ENV !== "production" && s.components[f] && C(`Component "${f}" has already been registered in target app.`), s.components[f] = c, d) : s.components[f];
      },
      directive(f, c) {
        return process.env.NODE_ENV !== "production" && Lu(f), c ? (process.env.NODE_ENV !== "production" && s.directives[f] && C(`Directive "${f}" has already been registered in target app.`), s.directives[f] = c, d) : s.directives[f];
      },
      mount(f, c, h) {
        if (l)
          process.env.NODE_ENV !== "production" && C(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          process.env.NODE_ENV !== "production" && f.__vue_app__ && C(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const _ = d._ceVNode || bt(o, r);
          return _.appContext = s, h === !0 ? h = "svg" : h === !1 && (h = void 0), process.env.NODE_ENV !== "production" && (s.reload = () => {
            const g = Nt(_);
            g.el = null, e(g, f, h);
          }), e(_, f, h), l = !0, d._container = f, f.__vue_app__ = d, process.env.NODE_ENV !== "production" && (d._instance = _.component, va(d, Fs)), Gr(_.component);
        }
      },
      onUnmount(f) {
        process.env.NODE_ENV !== "production" && typeof f != "function" && C(
          `Expected function as first argument to app.onUnmount(), but got ${typeof f}`
        ), u.push(f);
      },
      unmount() {
        l ? (ot(
          u,
          d._instance,
          16
        ), e(null, d._container), process.env.NODE_ENV !== "production" && (d._instance = null, ya(d)), delete d._container.__vue_app__) : process.env.NODE_ENV !== "production" && C("Cannot unmount an app that is not mounted.");
      },
      provide(f, c) {
        return process.env.NODE_ENV !== "production" && f in s.provides && (Y(s.provides, f) ? C(
          `App already provides property with key "${String(f)}". It will be overwritten with the new value.`
        ) : C(
          `App already provides property with key "${String(f)}" inherited from its parent element. It will be overwritten with the new value.`
        )), s.provides[f] = c, d;
      },
      runWithContext(f) {
        const c = Rt;
        Rt = d;
        try {
          return f();
        } finally {
          Rt = c;
        }
      }
    };
    return d;
  };
}
let Rt = null;
function tf(e, t) {
  if (!Ee)
    process.env.NODE_ENV !== "production" && C("provide() can only be used inside setup().");
  else {
    let n = Ee.provides;
    const o = Ee.parent && Ee.parent.provides;
    o === n && (n = Ee.provides = Object.create(o)), n[e] = t;
  }
}
function bn(e, t, n = !1) {
  const o = Po();
  if (o || Rt) {
    let r = Rt ? Rt._context.provides : o ? o.parent == null || o.ce ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && B(t) ? t.call(o && o.proxy) : t;
    process.env.NODE_ENV !== "production" && C(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && C("inject() can only be used inside setup() or functional components.");
}
function nf() {
  return !!(Po() || Rt);
}
const Gu = {}, qu = () => Object.create(Gu), Yu = (e) => Object.getPrototypeOf(e) === Gu;
function of(e, t, n, o = !1) {
  const r = {}, s = qu();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Ju(e, t, r, s);
  for (const i in e.propsOptions[0])
    i in r || (r[i] = void 0);
  process.env.NODE_ENV !== "production" && Zu(t || {}, r, e), n ? e.props = o ? r : Zc(r) : e.type.props ? e.props = r : e.props = s, e.attrs = s;
}
function rf(e) {
  for (; e; ) {
    if (e.type.__hmrId) return !0;
    e = e.parent;
  }
}
function sf(e, t, n, o) {
  const {
    props: r,
    attrs: s,
    vnode: { patchFlag: i }
  } = e, u = K(r), [l] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(process.env.NODE_ENV !== "production" && rf(e)) && (o || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const f = e.vnode.dynamicProps;
      for (let c = 0; c < f.length; c++) {
        let h = f[c];
        if (xo(e.emitsOptions, h))
          continue;
        const _ = t[h];
        if (l)
          if (Y(s, h))
            _ !== s[h] && (s[h] = _, d = !0);
          else {
            const g = Ue(h);
            r[g] = cr(
              l,
              u,
              g,
              _,
              e,
              !1
            );
          }
        else
          _ !== s[h] && (s[h] = _, d = !0);
      }
    }
  } else {
    Ju(e, t, r, s) && (d = !0);
    let f;
    for (const c in u)
      (!t || // for camelCase
      !Y(t, c) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = Ot(c)) === c || !Y(t, f))) && (l ? n && // for camelCase
      (n[c] !== void 0 || // for kebab-case
      n[f] !== void 0) && (r[c] = cr(
        l,
        u,
        c,
        void 0,
        e,
        !0
      )) : delete r[c]);
    if (s !== u)
      for (const c in s)
        (!t || !Y(t, c)) && (delete s[c], d = !0);
  }
  d && Qe(e.attrs, "set", ""), process.env.NODE_ENV !== "production" && Zu(t || {}, r, e);
}
function Ju(e, t, n, o) {
  const [r, s] = e.propsOptions;
  let i = !1, u;
  if (t)
    for (let l in t) {
      if (En(l))
        continue;
      const d = t[l];
      let f;
      r && Y(r, f = Ue(l)) ? !s || !s.includes(f) ? n[f] = d : (u || (u = {}))[f] = d : xo(e.emitsOptions, l) || (!(l in o) || d !== o[l]) && (o[l] = d, i = !0);
    }
  if (s) {
    const l = K(n), d = u || ee;
    for (let f = 0; f < s.length; f++) {
      const c = s[f];
      n[c] = cr(
        r,
        l,
        c,
        d[c],
        e,
        !Y(d, c)
      );
    }
  }
  return i;
}
function cr(e, t, n, o, r, s) {
  const i = e[n];
  if (i != null) {
    const u = Y(i, "default");
    if (u && o === void 0) {
      const l = i.default;
      if (i.type !== Function && !i.skipFactory && B(l)) {
        const { propsDefaults: d } = r;
        if (n in d)
          o = d[n];
        else {
          const f = Bn(r);
          o = d[n] = l.call(
            null,
            t
          ), f();
        }
      } else
        o = l;
      r.ce && r.ce._setProp(n, o);
    }
    i[
      0
      /* shouldCast */
    ] && (s && !u ? o = !1 : i[
      1
      /* shouldCastTrue */
    ] && (o === "" || o === Ot(n)) && (o = !0));
  }
  return o;
}
const uf = /* @__PURE__ */ new WeakMap();
function Xu(e, t, n = !1) {
  const o = n ? uf : t.propsCache, r = o.get(e);
  if (r)
    return r;
  const s = e.props, i = {}, u = [];
  let l = !1;
  if (!B(e)) {
    const f = (c) => {
      l = !0;
      const [h, _] = Xu(c, t, !0);
      ae(i, h), _ && u.push(..._);
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!s && !l)
    return oe(e) && o.set(e, zt), zt;
  if (j(s))
    for (let f = 0; f < s.length; f++) {
      process.env.NODE_ENV !== "production" && !ce(s[f]) && C("props must be strings when using array syntax.", s[f]);
      const c = Ue(s[f]);
      Ss(c) && (i[c] = ee);
    }
  else if (s) {
    process.env.NODE_ENV !== "production" && !oe(s) && C("invalid props options", s);
    for (const f in s) {
      const c = Ue(f);
      if (Ss(c)) {
        const h = s[f], _ = i[c] = j(h) || B(h) ? { type: h } : ae({}, h), g = _.type;
        let b = !1, w = !0;
        if (j(g))
          for (let S = 0; S < g.length; ++S) {
            const $ = g[S], k = B($) && $.name;
            if (k === "Boolean") {
              b = !0;
              break;
            } else k === "String" && (w = !1);
          }
        else
          b = B(g) && g.name === "Boolean";
        _[
          0
          /* shouldCast */
        ] = b, _[
          1
          /* shouldCastTrue */
        ] = w, (b || Y(_, "default")) && u.push(c);
      }
    }
  }
  const d = [i, u];
  return oe(e) && o.set(e, d), d;
}
function Ss(e) {
  return e[0] !== "$" && !En(e) ? !0 : (process.env.NODE_ENV !== "production" && C(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function lf(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function Zu(e, t, n) {
  const o = K(t), r = n.propsOptions[0], s = Object.keys(e).map((i) => Ue(i));
  for (const i in r) {
    let u = r[i];
    u != null && cf(
      i,
      o[i],
      u,
      process.env.NODE_ENV !== "production" ? et(o) : o,
      !s.includes(i)
    );
  }
}
function cf(e, t, n, o, r) {
  const { type: s, required: i, validator: u, skipCheck: l } = n;
  if (i && r) {
    C('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !i)) {
    if (s != null && s !== !0 && !l) {
      let d = !1;
      const f = j(s) ? s : [s], c = [];
      for (let h = 0; h < f.length && !d; h++) {
        const { valid: _, expectedType: g } = ff(t, f[h]);
        c.push(g || ""), d = _;
      }
      if (!d) {
        C(df(e, t, c));
        return;
      }
    }
    u && !u(t, o) && C('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const af = /* @__PURE__ */ ft(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function ff(e, t) {
  let n;
  const o = lf(t);
  if (o === "null")
    n = e === null;
  else if (af(o)) {
    const r = typeof e;
    n = r === o.toLowerCase(), !n && r === "object" && (n = e instanceof t);
  } else o === "Object" ? n = oe(e) : o === "Array" ? n = j(e) : n = e instanceof t;
  return {
    valid: n,
    expectedType: o
  };
}
function df(e, t, n) {
  if (n.length === 0)
    return `Prop type [] for prop "${e}" won't match anything. Did you mean to use type Array instead?`;
  let o = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(Do).join(" | ")}`;
  const r = n[0], s = wr(t), i = As(t, r), u = As(t, s);
  return n.length === 1 && Cs(r) && !pf(r, s) && (o += ` with value ${i}`), o += `, got ${s} `, Cs(s) && (o += `with value ${u}.`), o;
}
function As(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function Cs(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function pf(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const Hr = (e) => e === "_" || e === "_ctx" || e === "$stable", Kr = (e) => j(e) ? e.map(Le) : [Le(e)], hf = (e, t, n) => {
  if (t._n)
    return t;
  const o = Ca((...r) => (process.env.NODE_ENV !== "production" && Ee && !(n === null && Pe) && !(n && n.root !== Ee.root) && C(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), Kr(t(...r))), n);
  return o._c = !1, o;
}, Qu = (e, t, n) => {
  const o = e._ctx;
  for (const r in e) {
    if (Hr(r)) continue;
    const s = e[r];
    if (B(s))
      t[r] = hf(r, s, o);
    else if (s != null) {
      process.env.NODE_ENV !== "production" && C(
        `Non-function value encountered for slot "${r}". Prefer function slots for better performance.`
      );
      const i = Kr(s);
      t[r] = () => i;
    }
  }
}, el = (e, t) => {
  process.env.NODE_ENV !== "production" && !Br(e.vnode) && C(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = Kr(t);
  e.slots.default = () => n;
}, ar = (e, t, n) => {
  for (const o in t)
    (n || !Hr(o)) && (e[o] = t[o]);
}, _f = (e, t, n) => {
  const o = e.slots = qu();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (ar(o, t, n), n && lo(o, "_", r, !0)) : Qu(t, o);
  } else t && el(e, t);
}, Ef = (e, t, n) => {
  const { vnode: o, slots: r } = e;
  let s = !0, i = ee;
  if (o.shapeFlag & 32) {
    const u = t._;
    u ? process.env.NODE_ENV !== "production" && tt ? (ar(r, t, n), Qe(e, "set", "$slots")) : n && u === 1 ? s = !1 : ar(r, t, n) : (s = !t.$stable, Qu(t, r)), i = t;
  } else t && (el(e, t), i = { default: 1 });
  if (s)
    for (const u in r)
      !Hr(u) && i[u] == null && delete r[u];
};
let an, ut;
function Ut(e, t) {
  e.appContext.config.performance && go() && ut.mark(`vue-${t}-${e.uid}`), process.env.NODE_ENV !== "production" && Da(e, t, go() ? ut.now() : Date.now());
}
function Bt(e, t) {
  if (e.appContext.config.performance && go()) {
    const n = `vue-${t}-${e.uid}`, o = n + ":end", r = `<${Ro(e, e.type)}> ${t}`;
    ut.mark(o), ut.measure(r, n, o), ut.clearMeasures(r), ut.clearMarks(n), ut.clearMarks(o);
  }
  process.env.NODE_ENV !== "production" && Sa(e, t, go() ? ut.now() : Date.now());
}
function go() {
  return an !== void 0 || (typeof window < "u" && window.performance ? (an = !0, ut = window.performance) : an = !1), an;
}
function gf() {
  const e = [];
  if (process.env.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(
      `Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const xe = If;
function mf(e) {
  return vf(e);
}
function vf(e, t) {
  gf();
  const n = $n();
  n.__VUE__ = !0, process.env.NODE_ENV !== "production" && Lr(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const {
    insert: o,
    remove: r,
    patchProp: s,
    createElement: i,
    createText: u,
    createComment: l,
    setText: d,
    setElementText: f,
    parentNode: c,
    nextSibling: h,
    setScopeId: _ = de,
    insertStaticContent: g
  } = e, b = (a, p, E, O = null, m = null, v = null, T = void 0, A = null, D = process.env.NODE_ENV !== "production" && tt ? !1 : !!p.dynamicChildren) => {
    if (a === p)
      return;
    a && !fn(a, p) && (O = Hn(a), Ce(a, m, v, !0), a = null), p.patchFlag === -2 && (D = !1, p.dynamicChildren = null);
    const { type: N, ref: U, shapeFlag: V } = p;
    switch (N) {
      case Un:
        w(a, p, E, O);
        break;
      case je:
        S(a, p, E, O);
        break;
      case Zn:
        a == null ? $(p, E, O, T) : process.env.NODE_ENV !== "production" && k(a, p, E, T);
        break;
      case Ze:
        ue(
          a,
          p,
          E,
          O,
          m,
          v,
          T,
          A,
          D
        );
        break;
      default:
        V & 1 ? J(
          a,
          p,
          E,
          O,
          m,
          v,
          T,
          A,
          D
        ) : V & 6 ? ve(
          a,
          p,
          E,
          O,
          m,
          v,
          T,
          A,
          D
        ) : V & 64 || V & 128 ? N.process(
          a,
          p,
          E,
          O,
          m,
          v,
          T,
          A,
          D,
          sn
        ) : process.env.NODE_ENV !== "production" && C("Invalid VNode type:", N, `(${typeof N})`);
    }
    U != null && m ? vn(U, a && a.ref, v, p || a, !p) : U == null && a && a.ref != null && vn(a.ref, null, v, a, !0);
  }, w = (a, p, E, O) => {
    if (a == null)
      o(
        p.el = u(p.children),
        E,
        O
      );
    else {
      const m = p.el = a.el;
      p.children !== a.children && d(m, p.children);
    }
  }, S = (a, p, E, O) => {
    a == null ? o(
      p.el = l(p.children || ""),
      E,
      O
    ) : p.el = a.el;
  }, $ = (a, p, E, O) => {
    [a.el, a.anchor] = g(
      a.children,
      p,
      E,
      O,
      a.el,
      a.anchor
    );
  }, k = (a, p, E, O) => {
    if (p.children !== a.children) {
      const m = h(a.anchor);
      F(a), [p.el, p.anchor] = g(
        p.children,
        E,
        m,
        O
      );
    } else
      p.el = a.el, p.anchor = a.anchor;
  }, te = ({ el: a, anchor: p }, E, O) => {
    let m;
    for (; a && a !== p; )
      m = h(a), o(a, E, O), a = m;
    o(p, E, O);
  }, F = ({ el: a, anchor: p }) => {
    let E;
    for (; a && a !== p; )
      E = h(a), r(a), a = E;
    r(p);
  }, J = (a, p, E, O, m, v, T, A, D) => {
    p.type === "svg" ? T = "svg" : p.type === "math" && (T = "mathml"), a == null ? L(
      p,
      E,
      O,
      m,
      v,
      T,
      A,
      D
    ) : P(
      a,
      p,
      m,
      v,
      T,
      A,
      D
    );
  }, L = (a, p, E, O, m, v, T, A) => {
    let D, N;
    const { props: U, shapeFlag: V, transition: M, dirs: W } = a;
    if (D = a.el = i(
      a.type,
      v,
      U && U.is,
      U
    ), V & 8 ? f(D, a.children) : V & 16 && Z(
      a.children,
      D,
      null,
      O,
      m,
      zo(a, v),
      T,
      A
    ), W && St(a, null, O, "created"), le(D, a, a.scopeId, T, O), U) {
      for (const ne in U)
        ne !== "value" && !En(ne) && s(D, ne, null, U[ne], v, O);
      "value" in U && s(D, "value", null, U.value, v), (N = U.onVnodeBeforeMount) && Ye(N, O, a);
    }
    process.env.NODE_ENV !== "production" && (lo(D, "__vnode", a, !0), lo(D, "__vueParentComponent", O, !0)), W && St(a, null, O, "beforeMount");
    const q = yf(m, M);
    q && M.beforeEnter(D), o(D, p, E), ((N = U && U.onVnodeMounted) || q || W) && xe(() => {
      N && Ye(N, O, a), q && M.enter(D), W && St(a, null, O, "mounted");
    }, m);
  }, le = (a, p, E, O, m) => {
    if (E && _(a, E), O)
      for (let v = 0; v < O.length; v++)
        _(a, O[v]);
    if (m) {
      let v = m.subTree;
      if (process.env.NODE_ENV !== "production" && v.patchFlag > 0 && v.patchFlag & 2048 && (v = Wr(v.children) || v), p === v || il(v.type) && (v.ssContent === p || v.ssFallback === p)) {
        const T = m.vnode;
        le(
          a,
          T,
          T.scopeId,
          T.slotScopeIds,
          m.parent
        );
      }
    }
  }, Z = (a, p, E, O, m, v, T, A, D = 0) => {
    for (let N = D; N < a.length; N++) {
      const U = a[N] = A ? _t(a[N]) : Le(a[N]);
      b(
        null,
        U,
        p,
        E,
        O,
        m,
        v,
        T,
        A
      );
    }
  }, P = (a, p, E, O, m, v, T) => {
    const A = p.el = a.el;
    process.env.NODE_ENV !== "production" && (A.__vnode = p);
    let { patchFlag: D, dynamicChildren: N, dirs: U } = p;
    D |= a.patchFlag & 16;
    const V = a.props || ee, M = p.props || ee;
    let W;
    if (E && At(E, !1), (W = M.onVnodeBeforeUpdate) && Ye(W, E, p, a), U && St(p, a, E, "beforeUpdate"), E && At(E, !0), process.env.NODE_ENV !== "production" && tt && (D = 0, T = !1, N = null), (V.innerHTML && M.innerHTML == null || V.textContent && M.textContent == null) && f(A, ""), N ? (x(
      a.dynamicChildren,
      N,
      A,
      E,
      O,
      zo(p, m),
      v
    ), process.env.NODE_ENV !== "production" && Xn(a, p)) : T || G(
      a,
      p,
      A,
      null,
      E,
      O,
      zo(p, m),
      v,
      !1
    ), D > 0) {
      if (D & 16)
        z(A, V, M, E, m);
      else if (D & 2 && V.class !== M.class && s(A, "class", null, M.class, m), D & 4 && s(A, "style", V.style, M.style, m), D & 8) {
        const q = p.dynamicProps;
        for (let ne = 0; ne < q.length; ne++) {
          const Q = q[ne], we = V[Q], Te = M[Q];
          (Te !== we || Q === "value") && s(A, Q, we, Te, m, E);
        }
      }
      D & 1 && a.children !== p.children && f(A, p.children);
    } else !T && N == null && z(A, V, M, E, m);
    ((W = M.onVnodeUpdated) || U) && xe(() => {
      W && Ye(W, E, p, a), U && St(p, a, E, "updated");
    }, O);
  }, x = (a, p, E, O, m, v, T) => {
    for (let A = 0; A < p.length; A++) {
      const D = a[A], N = p[A], U = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        D.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (D.type === Ze || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !fn(D, N) || // - In the case of a component, it could contain anything.
        D.shapeFlag & 198) ? c(D.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          E
        )
      );
      b(
        D,
        N,
        U,
        null,
        O,
        m,
        v,
        T,
        !0
      );
    }
  }, z = (a, p, E, O, m) => {
    if (p !== E) {
      if (p !== ee)
        for (const v in p)
          !En(v) && !(v in E) && s(
            a,
            v,
            p[v],
            null,
            m,
            O
          );
      for (const v in E) {
        if (En(v)) continue;
        const T = E[v], A = p[v];
        T !== A && v !== "value" && s(a, v, A, T, m, O);
      }
      "value" in E && s(a, "value", p.value, E.value, m);
    }
  }, ue = (a, p, E, O, m, v, T, A, D) => {
    const N = p.el = a ? a.el : u(""), U = p.anchor = a ? a.anchor : u("");
    let { patchFlag: V, dynamicChildren: M, slotScopeIds: W } = p;
    process.env.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (tt || V & 2048) && (V = 0, D = !1, M = null), W && (A = A ? A.concat(W) : W), a == null ? (o(N, E, O), o(U, E, O), Z(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      p.children || [],
      E,
      U,
      m,
      v,
      T,
      A,
      D
    )) : V > 0 && V & 64 && M && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    a.dynamicChildren ? (x(
      a.dynamicChildren,
      M,
      E,
      m,
      v,
      T,
      A
    ), process.env.NODE_ENV !== "production" ? Xn(a, p) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (p.key != null || m && p === m.subTree) && Xn(
        a,
        p,
        !0
        /* shallow */
      )
    )) : G(
      a,
      p,
      E,
      U,
      m,
      v,
      T,
      A,
      D
    );
  }, ve = (a, p, E, O, m, v, T, A, D) => {
    p.slotScopeIds = A, a == null ? p.shapeFlag & 512 ? m.ctx.activate(
      p,
      E,
      O,
      T,
      D
    ) : ye(
      p,
      E,
      O,
      m,
      v,
      T,
      D
    ) : se(a, p, D);
  }, ye = (a, p, E, O, m, v, T) => {
    const A = a.component = jf(
      a,
      O,
      m
    );
    if (process.env.NODE_ENV !== "production" && A.type.__hmrId && _a(A), process.env.NODE_ENV !== "production" && (qn(a), Ut(A, "mount")), Br(a) && (A.ctx.renderer = sn), process.env.NODE_ENV !== "production" && Ut(A, "init"), Kf(A, !1, T), process.env.NODE_ENV !== "production" && Bt(A, "init"), process.env.NODE_ENV !== "production" && tt && (a.el = null), A.asyncDep) {
      if (m && m.registerDep(A, I, T), !a.el) {
        const D = A.subTree = bt(je);
        S(null, D, p, E), a.placeholder = D.el;
      }
    } else
      I(
        A,
        a,
        p,
        E,
        m,
        v,
        T
      );
    process.env.NODE_ENV !== "production" && (Yn(), Bt(A, "mount"));
  }, se = (a, p, E) => {
    const O = p.component = a.component;
    if (Vf(a, p, E))
      if (O.asyncDep && !O.asyncResolved) {
        process.env.NODE_ENV !== "production" && qn(p), H(O, p, E), process.env.NODE_ENV !== "production" && Yn();
        return;
      } else
        O.next = p, O.update();
    else
      p.el = a.el, O.vnode = p;
  }, I = (a, p, E, O, m, v, T) => {
    const A = () => {
      if (a.isMounted) {
        let { next: V, bu: M, u: W, parent: q, vnode: ne } = a;
        {
          const Ge = tl(a);
          if (Ge) {
            V && (V.el = ne.el, H(a, V, T)), Ge.asyncDep.then(() => {
              a.isUnmounted || A();
            });
            return;
          }
        }
        let Q = V, we;
        process.env.NODE_ENV !== "production" && qn(V || a.vnode), At(a, !1), V ? (V.el = ne.el, H(a, V, T)) : V = ne, M && ln(M), (we = V.props && V.props.onVnodeBeforeUpdate) && Ye(we, q, V, ne), At(a, !0), process.env.NODE_ENV !== "production" && Ut(a, "render");
        const Te = Ts(a);
        process.env.NODE_ENV !== "production" && Bt(a, "render");
        const ze = a.subTree;
        a.subTree = Te, process.env.NODE_ENV !== "production" && Ut(a, "patch"), b(
          ze,
          Te,
          // parent may have changed if it's in a teleport
          c(ze.el),
          // anchor may have changed if it's in a fragment
          Hn(ze),
          a,
          m,
          v
        ), process.env.NODE_ENV !== "production" && Bt(a, "patch"), V.el = Te.el, Q === null && xf(a, Te.el), W && xe(W, m), (we = V.props && V.props.onVnodeUpdated) && xe(
          () => Ye(we, q, V, ne),
          m
        ), process.env.NODE_ENV !== "production" && ku(a), process.env.NODE_ENV !== "production" && Yn();
      } else {
        let V;
        const { el: M, props: W } = p, { bm: q, m: ne, parent: Q, root: we, type: Te } = a, ze = yn(p);
        At(a, !1), q && ln(q), !ze && (V = W && W.onVnodeBeforeMount) && Ye(V, Q, p), At(a, !0);
        {
          we.ce && // @ts-expect-error _def is private
          we.ce._def.shadowRoot !== !1 && we.ce._injectChildStyle(Te), process.env.NODE_ENV !== "production" && Ut(a, "render");
          const Ge = a.subTree = Ts(a);
          process.env.NODE_ENV !== "production" && Bt(a, "render"), process.env.NODE_ENV !== "production" && Ut(a, "patch"), b(
            null,
            Ge,
            E,
            O,
            a,
            m,
            v
          ), process.env.NODE_ENV !== "production" && Bt(a, "patch"), p.el = Ge.el;
        }
        if (ne && xe(ne, m), !ze && (V = W && W.onVnodeMounted)) {
          const Ge = p;
          xe(
            () => Ye(V, Q, Ge),
            m
          );
        }
        (p.shapeFlag & 256 || Q && yn(Q.vnode) && Q.vnode.shapeFlag & 256) && a.a && xe(a.a, m), a.isMounted = !0, process.env.NODE_ENV !== "production" && ba(a), p = E = O = null;
      }
    };
    a.scope.on();
    const D = a.effect = new au(A);
    a.scope.off();
    const N = a.update = D.run.bind(D), U = a.job = D.runIfDirty.bind(D);
    U.i = a, U.id = a.uid, D.scheduler = () => To(U), At(a, !0), process.env.NODE_ENV !== "production" && (D.onTrack = a.rtc ? (V) => ln(a.rtc, V) : void 0, D.onTrigger = a.rtg ? (V) => ln(a.rtg, V) : void 0), N();
  }, H = (a, p, E) => {
    p.component = a;
    const O = a.vnode.props;
    a.vnode = p, a.next = null, sf(a, p.props, O, E), Ef(a, p.children, E), He(), gs(a), Ke();
  }, G = (a, p, E, O, m, v, T, A, D = !1) => {
    const N = a && a.children, U = a ? a.shapeFlag : 0, V = p.children, { patchFlag: M, shapeFlag: W } = p;
    if (M > 0) {
      if (M & 128) {
        Ae(
          N,
          V,
          E,
          O,
          m,
          v,
          T,
          A,
          D
        );
        return;
      } else if (M & 256) {
        We(
          N,
          V,
          E,
          O,
          m,
          v,
          T,
          A,
          D
        );
        return;
      }
    }
    W & 8 ? (U & 16 && rn(N, m, v), V !== N && f(E, V)) : U & 16 ? W & 16 ? Ae(
      N,
      V,
      E,
      O,
      m,
      v,
      T,
      A,
      D
    ) : rn(N, m, v, !0) : (U & 8 && f(E, ""), W & 16 && Z(
      V,
      E,
      O,
      m,
      v,
      T,
      A,
      D
    ));
  }, We = (a, p, E, O, m, v, T, A, D) => {
    a = a || zt, p = p || zt;
    const N = a.length, U = p.length, V = Math.min(N, U);
    let M;
    for (M = 0; M < V; M++) {
      const W = p[M] = D ? _t(p[M]) : Le(p[M]);
      b(
        a[M],
        W,
        E,
        null,
        m,
        v,
        T,
        A,
        D
      );
    }
    N > U ? rn(
      a,
      m,
      v,
      !0,
      !1,
      V
    ) : Z(
      p,
      E,
      O,
      m,
      v,
      T,
      A,
      D,
      V
    );
  }, Ae = (a, p, E, O, m, v, T, A, D) => {
    let N = 0;
    const U = p.length;
    let V = a.length - 1, M = U - 1;
    for (; N <= V && N <= M; ) {
      const W = a[N], q = p[N] = D ? _t(p[N]) : Le(p[N]);
      if (fn(W, q))
        b(
          W,
          q,
          E,
          null,
          m,
          v,
          T,
          A,
          D
        );
      else
        break;
      N++;
    }
    for (; N <= V && N <= M; ) {
      const W = a[V], q = p[M] = D ? _t(p[M]) : Le(p[M]);
      if (fn(W, q))
        b(
          W,
          q,
          E,
          null,
          m,
          v,
          T,
          A,
          D
        );
      else
        break;
      V--, M--;
    }
    if (N > V) {
      if (N <= M) {
        const W = M + 1, q = W < U ? p[W].el : O;
        for (; N <= M; )
          b(
            null,
            p[N] = D ? _t(p[N]) : Le(p[N]),
            E,
            q,
            m,
            v,
            T,
            A,
            D
          ), N++;
      }
    } else if (N > M)
      for (; N <= V; )
        Ce(a[N], m, v, !0), N++;
    else {
      const W = N, q = N, ne = /* @__PURE__ */ new Map();
      for (N = q; N <= M; N++) {
        const be = p[N] = D ? _t(p[N]) : Le(p[N]);
        be.key != null && (process.env.NODE_ENV !== "production" && ne.has(be.key) && C(
          "Duplicate keys found during update:",
          JSON.stringify(be.key),
          "Make sure keys are unique."
        ), ne.set(be.key, N));
      }
      let Q, we = 0;
      const Te = M - q + 1;
      let ze = !1, Ge = 0;
      const un = new Array(Te);
      for (N = 0; N < Te; N++) un[N] = 0;
      for (N = W; N <= V; N++) {
        const be = a[N];
        if (we >= Te) {
          Ce(be, m, v, !0);
          continue;
        }
        let qe;
        if (be.key != null)
          qe = ne.get(be.key);
        else
          for (Q = q; Q <= M; Q++)
            if (un[Q - q] === 0 && fn(be, p[Q])) {
              qe = Q;
              break;
            }
        qe === void 0 ? Ce(be, m, v, !0) : (un[qe - q] = N + 1, qe >= Ge ? Ge = qe : ze = !0, b(
          be,
          p[qe],
          E,
          null,
          m,
          v,
          T,
          A,
          D
        ), we++);
      }
      const cs = ze ? bf(un) : zt;
      for (Q = cs.length - 1, N = Te - 1; N >= 0; N--) {
        const be = q + N, qe = p[be], as = p[be + 1], fs = be + 1 < U ? (
          // #13559, fallback to el placeholder for unresolved async component
          as.el || as.placeholder
        ) : O;
        un[N] === 0 ? b(
          null,
          qe,
          E,
          fs,
          m,
          v,
          T,
          A,
          D
        ) : ze && (Q < 0 || N !== cs[Q] ? he(qe, E, fs, 2) : Q--);
      }
    }
  }, he = (a, p, E, O, m = null) => {
    const { el: v, type: T, transition: A, children: D, shapeFlag: N } = a;
    if (N & 6) {
      he(a.component.subTree, p, E, O);
      return;
    }
    if (N & 128) {
      a.suspense.move(p, E, O);
      return;
    }
    if (N & 64) {
      T.move(a, p, E, sn);
      return;
    }
    if (T === Ze) {
      o(v, p, E);
      for (let V = 0; V < D.length; V++)
        he(D[V], p, E, O);
      o(a.anchor, p, E);
      return;
    }
    if (T === Zn) {
      te(a, p, E);
      return;
    }
    if (O !== 2 && N & 1 && A)
      if (O === 0)
        A.beforeEnter(v), o(v, p, E), xe(() => A.enter(v), m);
      else {
        const { leave: V, delayLeave: M, afterLeave: W } = A, q = () => {
          a.ctx.isUnmounted ? r(v) : o(v, p, E);
        }, ne = () => {
          v._isLeaving && v[Va](
            !0
            /* cancelled */
          ), V(v, () => {
            q(), W && W();
          });
        };
        M ? M(v, q, ne) : ne();
      }
    else
      o(v, p, E);
  }, Ce = (a, p, E, O = !1, m = !1) => {
    const {
      type: v,
      props: T,
      ref: A,
      children: D,
      dynamicChildren: N,
      shapeFlag: U,
      patchFlag: V,
      dirs: M,
      cacheIndex: W
    } = a;
    if (V === -2 && (m = !1), A != null && (He(), vn(A, null, E, a, !0), Ke()), W != null && (p.renderCache[W] = void 0), U & 256) {
      p.ctx.deactivate(a);
      return;
    }
    const q = U & 1 && M, ne = !yn(a);
    let Q;
    if (ne && (Q = T && T.onVnodeBeforeUnmount) && Ye(Q, p, a), U & 6)
      fc(a.component, E, O);
    else {
      if (U & 128) {
        a.suspense.unmount(E, O);
        return;
      }
      q && St(a, null, p, "beforeUnmount"), U & 64 ? a.type.remove(
        a,
        p,
        E,
        sn,
        O
      ) : N && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !N.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (v !== Ze || V > 0 && V & 64) ? rn(
        N,
        p,
        E,
        !1,
        !0
      ) : (v === Ze && V & 384 || !m && U & 16) && rn(D, p, E), O && Lt(a);
    }
    (ne && (Q = T && T.onVnodeUnmounted) || q) && xe(() => {
      Q && Ye(Q, p, a), q && St(a, null, p, "unmounted");
    }, E);
  }, Lt = (a) => {
    const { type: p, el: E, anchor: O, transition: m } = a;
    if (p === Ze) {
      process.env.NODE_ENV !== "production" && a.patchFlag > 0 && a.patchFlag & 2048 && m && !m.persisted ? a.children.forEach((T) => {
        T.type === je ? r(T.el) : Lt(T);
      }) : on(E, O);
      return;
    }
    if (p === Zn) {
      F(a);
      return;
    }
    const v = () => {
      r(E), m && !m.persisted && m.afterLeave && m.afterLeave();
    };
    if (a.shapeFlag & 1 && m && !m.persisted) {
      const { leave: T, delayLeave: A } = m, D = () => T(E, v);
      A ? A(a.el, v, D) : D();
    } else
      v();
  }, on = (a, p) => {
    let E;
    for (; a !== p; )
      E = h(a), r(a), a = E;
    r(p);
  }, fc = (a, p, E) => {
    process.env.NODE_ENV !== "production" && a.type.__hmrId && Ea(a);
    const { bum: O, scope: m, job: v, subTree: T, um: A, m: D, a: N } = a;
    ws(D), ws(N), O && ln(O), m.stop(), v && (v.flags |= 8, Ce(T, a, p, E)), A && xe(A, p), xe(() => {
      a.isUnmounted = !0;
    }, p), process.env.NODE_ENV !== "production" && Na(a);
  }, rn = (a, p, E, O = !1, m = !1, v = 0) => {
    for (let T = v; T < a.length; T++)
      Ce(a[T], p, E, O, m);
  }, Hn = (a) => {
    if (a.shapeFlag & 6)
      return Hn(a.component.subTree);
    if (a.shapeFlag & 128)
      return a.suspense.next();
    const p = h(a.anchor || a.el), E = p && p[wa];
    return E ? h(E) : p;
  };
  let Lo = !1;
  const ls = (a, p, E) => {
    a == null ? p._vnode && Ce(p._vnode, null, null, !0) : b(
      p._vnode || null,
      a,
      p,
      null,
      null,
      null,
      E
    ), p._vnode = a, Lo || (Lo = !0, gs(), Iu(), Lo = !1);
  }, sn = {
    p: b,
    um: Ce,
    m: he,
    r: Lt,
    mt: ye,
    mc: Z,
    pc: G,
    pbc: x,
    n: Hn,
    o: e
  };
  return {
    render: ls,
    hydrate: void 0,
    createApp: ef(ls)
  };
}
function zo({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function At({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function yf(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Xn(e, t, n = !1) {
  const o = e.children, r = t.children;
  if (j(o) && j(r))
    for (let s = 0; s < o.length; s++) {
      const i = o[s];
      let u = r[s];
      u.shapeFlag & 1 && !u.dynamicChildren && ((u.patchFlag <= 0 || u.patchFlag === 32) && (u = r[s] = _t(r[s]), u.el = i.el), !n && u.patchFlag !== -2 && Xn(i, u)), u.type === Un && // avoid cached text nodes retaining detached dom nodes
      u.patchFlag !== -1 && (u.el = i.el), u.type === je && !u.el && (u.el = i.el), process.env.NODE_ENV !== "production" && u.el && (u.el.__vnode = u);
    }
}
function bf(e) {
  const t = e.slice(), n = [0];
  let o, r, s, i, u;
  const l = e.length;
  for (o = 0; o < l; o++) {
    const d = e[o];
    if (d !== 0) {
      if (r = n[n.length - 1], e[r] < d) {
        t[o] = r, n.push(o);
        continue;
      }
      for (s = 0, i = n.length - 1; s < i; )
        u = s + i >> 1, e[n[u]] < d ? s = u + 1 : i = u;
      d < e[n[s]] && (s > 0 && (t[o] = n[s - 1]), n[s] = o);
    }
  }
  for (s = n.length, i = n[s - 1]; s-- > 0; )
    n[s] = i, i = t[i];
  return n;
}
function tl(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : tl(t);
}
function ws(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const Of = Symbol.for("v-scx"), Nf = () => {
  {
    const e = bn(Of);
    return e || process.env.NODE_ENV !== "production" && C(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function On(e, t, n) {
  return process.env.NODE_ENV !== "production" && !B(t) && C(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), nl(e, t, n);
}
function nl(e, t, n = ee) {
  const { immediate: o, deep: r, flush: s, once: i } = n;
  process.env.NODE_ENV !== "production" && !t && (o !== void 0 && C(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), r !== void 0 && C(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), i !== void 0 && C(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const u = ae({}, n);
  process.env.NODE_ENV !== "production" && (u.onWarn = C);
  const l = t && o || !t && s !== "post";
  let d;
  if (Vn) {
    if (s === "sync") {
      const _ = Nf();
      d = _.__watcherHandles || (_.__watcherHandles = []);
    } else if (!l) {
      const _ = () => {
      };
      return _.stop = de, _.resume = de, _.pause = de, _;
    }
  }
  const f = Ee;
  u.call = (_, g, b) => ot(_, f, g, b);
  let c = !1;
  s === "post" ? u.scheduler = (_) => {
    xe(_, f && f.suspense);
  } : s !== "sync" && (c = !0, u.scheduler = (_, g) => {
    g ? _() : To(_);
  }), u.augmentJob = (_) => {
    t && (_.flags |= 4), c && (_.flags |= 2, f && (_.id = f.uid, _.i = f));
  };
  const h = ua(e, t, u);
  return Vn && (d ? d.push(h) : l && h()), h;
}
function Df(e, t, n) {
  const o = this.proxy, r = ce(e) ? e.includes(".") ? ol(o, e) : () => o[e] : e.bind(o, o);
  let s;
  B(t) ? s = t : (s = t.handler, n = t);
  const i = Bn(this), u = nl(r, s.bind(o), n);
  return i(), u;
}
function ol(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let r = 0; r < n.length && o; r++)
      o = o[n[r]];
    return o;
  };
}
const Sf = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ue(t)}Modifiers`] || e[`${Ot(t)}Modifiers`];
function Af(e, t, ...n) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || ee;
  if (process.env.NODE_ENV !== "production") {
    const {
      emitsOptions: f,
      propsOptions: [c]
    } = e;
    if (f)
      if (!(t in f))
        (!c || !(Ct(Ue(t)) in c)) && C(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${Ct(Ue(t))}" prop.`
        );
      else {
        const h = f[t];
        B(h) && (h(...n) || C(
          `Invalid event arguments: event validation failed for event "${t}".`
        ));
      }
  }
  let r = n;
  const s = t.startsWith("update:"), i = s && Sf(o, t.slice(7));
  if (i && (i.trim && (r = n.map((f) => ce(f) ? f.trim() : f)), i.number && (r = n.map(vc))), process.env.NODE_ENV !== "production" && Aa(e, t, r), process.env.NODE_ENV !== "production") {
    const f = t.toLowerCase();
    f !== t && o[Ct(f)] && C(
      `Event "${f}" is emitted in component ${Ro(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${Ot(
        t
      )}" instead of "${t}".`
    );
  }
  let u, l = o[u = Ct(t)] || // also try camelCase event handler (#2249)
  o[u = Ct(Ue(t))];
  !l && s && (l = o[u = Ct(Ot(t))]), l && ot(
    l,
    e,
    6,
    r
  );
  const d = o[u + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[u])
      return;
    e.emitted[u] = !0, ot(
      d,
      e,
      6,
      r
    );
  }
}
const Cf = /* @__PURE__ */ new WeakMap();
function rl(e, t, n = !1) {
  const o = n ? Cf : t.emitsCache, r = o.get(e);
  if (r !== void 0)
    return r;
  const s = e.emits;
  let i = {}, u = !1;
  if (!B(e)) {
    const l = (d) => {
      const f = rl(d, t, !0);
      f && (u = !0, ae(i, f));
    };
    !n && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !s && !u ? (oe(e) && o.set(e, null), null) : (j(s) ? s.forEach((l) => i[l] = null) : ae(i, s), oe(e) && o.set(e, i), i);
}
function xo(e, t) {
  return !e || !Fn(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Y(e, t[0].toLowerCase() + t.slice(1)) || Y(e, Ot(t)) || Y(e, t));
}
let fr = !1;
function mo() {
  fr = !0;
}
function Ts(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: r,
    propsOptions: [s],
    slots: i,
    attrs: u,
    emit: l,
    render: d,
    renderCache: f,
    props: c,
    data: h,
    setupState: _,
    ctx: g,
    inheritAttrs: b
  } = e, w = ho(e);
  let S, $;
  process.env.NODE_ENV !== "production" && (fr = !1);
  try {
    if (n.shapeFlag & 4) {
      const F = r || o, J = process.env.NODE_ENV !== "production" && _.__isScriptSetup ? new Proxy(F, {
        get(L, le, Z) {
          return C(
            `Property '${String(
              le
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(L, le, Z);
        }
      }) : F;
      S = Le(
        d.call(
          J,
          F,
          f,
          process.env.NODE_ENV !== "production" ? et(c) : c,
          _,
          h,
          g
        )
      ), $ = u;
    } else {
      const F = t;
      process.env.NODE_ENV !== "production" && u === c && mo(), S = Le(
        F.length > 1 ? F(
          process.env.NODE_ENV !== "production" ? et(c) : c,
          process.env.NODE_ENV !== "production" ? {
            get attrs() {
              return mo(), et(u);
            },
            slots: i,
            emit: l
          } : { attrs: u, slots: i, emit: l }
        ) : F(
          process.env.NODE_ENV !== "production" ? et(c) : c,
          null
        )
      ), $ = t.props ? u : wf(u);
    }
  } catch (F) {
    Nn.length = 0, Ln(F, e, 1), S = bt(je);
  }
  let k = S, te;
  if (process.env.NODE_ENV !== "production" && S.patchFlag > 0 && S.patchFlag & 2048 && ([k, te] = sl(S)), $ && b !== !1) {
    const F = Object.keys($), { shapeFlag: J } = k;
    if (F.length) {
      if (J & 7)
        s && F.some(uo) && ($ = Tf(
          $,
          s
        )), k = Nt(k, $, !1, !0);
      else if (process.env.NODE_ENV !== "production" && !fr && k.type !== je) {
        const L = Object.keys(u), le = [], Z = [];
        for (let P = 0, x = L.length; P < x; P++) {
          const z = L[P];
          Fn(z) ? uo(z) || le.push(z[2].toLowerCase() + z.slice(3)) : Z.push(z);
        }
        Z.length && C(
          `Extraneous non-props attributes (${Z.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`
        ), le.length && C(
          `Extraneous non-emits event listeners (${le.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return n.dirs && (process.env.NODE_ENV !== "production" && !Vs(k) && C(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), k = Nt(k, null, !1, !0), k.dirs = k.dirs ? k.dirs.concat(n.dirs) : n.dirs), n.transition && (process.env.NODE_ENV !== "production" && !Vs(k) && C(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), Ur(k, n.transition)), process.env.NODE_ENV !== "production" && te ? te(k) : S = k, ho(w), S;
}
const sl = (e) => {
  const t = e.children, n = e.dynamicChildren, o = Wr(t, !1);
  if (o) {
    if (process.env.NODE_ENV !== "production" && o.patchFlag > 0 && o.patchFlag & 2048)
      return sl(o);
  } else return [e, void 0];
  const r = t.indexOf(o), s = n ? n.indexOf(o) : -1, i = (u) => {
    t[r] = u, n && (s > -1 ? n[s] = u : u.patchFlag > 0 && (e.dynamicChildren = [...n, u]));
  };
  return [Le(o), i];
};
function Wr(e, t = !0) {
  let n;
  for (let o = 0; o < e.length; o++) {
    const r = e[o];
    if (Io(r)) {
      if (r.type !== je || r.children === "v-if") {
        if (n)
          return;
        if (n = r, process.env.NODE_ENV !== "production" && t && n.patchFlag > 0 && n.patchFlag & 2048)
          return Wr(n.children);
      }
    } else
      return;
  }
  return n;
}
const wf = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Fn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Tf = (e, t) => {
  const n = {};
  for (const o in e)
    (!uo(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
}, Vs = (e) => e.shapeFlag & 7 || e.type === je;
function Vf(e, t, n) {
  const { props: o, children: r, component: s } = e, { props: i, children: u, patchFlag: l } = t, d = s.emitsOptions;
  if (process.env.NODE_ENV !== "production" && (r || u) && tt || t.dirs || t.transition)
    return !0;
  if (n && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return o ? xs(o, i, d) : !!i;
    if (l & 8) {
      const f = t.dynamicProps;
      for (let c = 0; c < f.length; c++) {
        const h = f[c];
        if (i[h] !== o[h] && !xo(d, h))
          return !0;
      }
    }
  } else
    return (r || u) && (!u || !u.$stable) ? !0 : o === i ? !1 : o ? i ? xs(o, i, d) : !0 : !!i;
  return !1;
}
function xs(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < o.length; r++) {
    const s = o[r];
    if (t[s] !== e[s] && !xo(n, s))
      return !0;
  }
  return !1;
}
function xf({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.el = e.el), o === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const il = (e) => e.__isSuspense;
function If(e, t) {
  t && t.pendingBranch ? j(e) ? t.effects.push(...e) : t.effects.push(e) : xu(e);
}
const Ze = Symbol.for("v-fgt"), Un = Symbol.for("v-txt"), je = Symbol.for("v-cmt"), Zn = Symbol.for("v-stc"), Nn = [];
let Re = null;
function ul(e = !1) {
  Nn.push(Re = e ? null : []);
}
function Pf() {
  Nn.pop(), Re = Nn[Nn.length - 1] || null;
}
let Tn = 1;
function Is(e, t = !1) {
  Tn += e, e < 0 && Re && t && (Re.hasOnce = !0);
}
function ll(e) {
  return e.dynamicChildren = Tn > 0 ? Re || zt : null, Pf(), Tn > 0 && Re && Re.push(e), e;
}
function Rf(e, t, n, o, r, s) {
  return ll(
    al(
      e,
      t,
      n,
      o,
      r,
      s,
      !0
    )
  );
}
function kf(e, t, n, o, r) {
  return ll(
    bt(
      e,
      t,
      n,
      o,
      r,
      !0
    )
  );
}
function Io(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function fn(e, t) {
  if (process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && e.component) {
    const n = Jn.get(t.type);
    if (n && n.has(e.component))
      return e.shapeFlag &= -257, t.shapeFlag &= -513, !1;
  }
  return e.type === t.type && e.key === t.key;
}
const Ff = (...e) => fl(
  ...e
), cl = ({ key: e }) => e ?? null, Qn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? ce(e) || re(e) || B(e) ? { i: Pe, r: e, k: t, f: !!n } : e : null);
function al(e, t = null, n = null, o = 0, r = null, s = e === Ze ? 0 : 1, i = !1, u = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && cl(t),
    ref: t && Qn(t),
    scopeId: $u,
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
    shapeFlag: s,
    patchFlag: o,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: Pe
  };
  return u ? (zr(l, n), s & 128 && e.normalize(l)) : n && (l.shapeFlag |= ce(n) ? 8 : 16), process.env.NODE_ENV !== "production" && l.key !== l.key && C("VNode created with invalid key (NaN). VNode type:", l.type), Tn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Re && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && Re.push(l), l;
}
const bt = process.env.NODE_ENV !== "production" ? Ff : fl;
function fl(e, t = null, n = null, o = 0, r = null, s = !1) {
  if ((!e || e === Ha) && (process.env.NODE_ENV !== "production" && !e && C(`Invalid vnode type when creating vnode: ${e}.`), e = je), Io(e)) {
    const u = Nt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && zr(u, n), Tn > 0 && !s && Re && (u.shapeFlag & 6 ? Re[Re.indexOf(e)] = u : Re.push(u)), u.patchFlag = -2, u;
  }
  if (El(e) && (e = e.__vccOpts), t) {
    t = $f(t);
    let { class: u, style: l } = t;
    u && !ce(u) && (t.class = Vr(u)), oe(l) && (Cn(l) && !j(l) && (l = ae({}, l)), t.style = So(l));
  }
  const i = ce(e) ? 1 : il(e) ? 128 : Ta(e) ? 64 : oe(e) ? 4 : B(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && Cn(e) && (e = K(e), C(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), al(
    e,
    t,
    n,
    o,
    r,
    i,
    s,
    !0
  );
}
function $f(e) {
  return e ? Cn(e) || Yu(e) ? ae({}, e) : e : null;
}
function Nt(e, t, n = !1, o = !1) {
  const { props: r, ref: s, patchFlag: i, children: u, transition: l } = e, d = t ? Mf(r || {}, t) : r, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && cl(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? j(s) ? s.concat(Qn(t)) : [s, Qn(t)] : Qn(t)
    ) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && i === -1 && j(u) ? u.map(dl) : u,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Ze ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: l,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Nt(e.ssContent),
    ssFallback: e.ssFallback && Nt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return l && o && Ur(
    f,
    l.clone(f)
  ), f;
}
function dl(e) {
  const t = Nt(e);
  return j(e.children) && (t.children = e.children.map(dl)), t;
}
function Lf(e = " ", t = 0) {
  return bt(Un, null, e, t);
}
function Le(e) {
  return e == null || typeof e == "boolean" ? bt(je) : j(e) ? bt(
    Ze,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Io(e) ? _t(e) : bt(Un, null, String(e));
}
function _t(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Nt(e);
}
function zr(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (j(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), zr(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !Yu(t) ? t._ctx = Pe : r === 3 && Pe && (Pe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else B(t) ? (t = { default: t, _ctx: Pe }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [Lf(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Mf(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const r in o)
      if (r === "class")
        t.class !== o.class && (t.class = Vr([t.class, o.class]));
      else if (r === "style")
        t.style = So([t.style, o.style]);
      else if (Fn(r)) {
        const s = t[r], i = o[r];
        i && s !== i && !(j(s) && s.includes(i)) && (t[r] = s ? [].concat(s, i) : i);
      } else r !== "" && (t[r] = o[r]);
  }
  return t;
}
function Ye(e, t, n, o = null) {
  ot(e, t, 7, [
    n,
    o
  ]);
}
const Uf = zu();
let Bf = 0;
function jf(e, t, n) {
  const o = e.type, r = (t ? t.appContext : e.appContext) || Uf, s = {
    uid: Bf++,
    vnode: e,
    type: o,
    parent: t,
    appContext: r,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new uu(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Xu(o, r),
    emitsOptions: rl(o, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ee,
    // inheritAttrs
    inheritAttrs: o.inheritAttrs,
    // state
    ctx: ee,
    data: ee,
    props: ee,
    attrs: ee,
    slots: ee,
    refs: ee,
    setupState: ee,
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
  return process.env.NODE_ENV !== "production" ? s.ctx = Ka(s) : s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = Af.bind(null, s), e.ce && e.ce(s), s;
}
let Ee = null;
const Po = () => Ee || Pe;
let vo, dr;
{
  const e = $n(), t = (n, o) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(o), (s) => {
      r.length > 1 ? r.forEach((i) => i(s)) : r[0](s);
    };
  };
  vo = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Ee = n
  ), dr = t(
    "__VUE_SSR_SETTERS__",
    (n) => Vn = n
  );
}
const Bn = (e) => {
  const t = Ee;
  return vo(e), e.scope.on(), () => {
    e.scope.off(), vo(t);
  };
}, Ps = () => {
  Ee && Ee.scope.off(), vo(null);
}, Hf = /* @__PURE__ */ ft("slot,component");
function pr(e, { isNativeTag: t }) {
  (Hf(e) || t(e)) && C(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function pl(e) {
  return e.vnode.shapeFlag & 4;
}
let Vn = !1;
function Kf(e, t = !1, n = !1) {
  t && dr(t);
  const { props: o, children: r } = e.vnode, s = pl(e);
  of(e, o, s, t), _f(e, r, n || t);
  const i = s ? Wf(e, t) : void 0;
  return t && dr(!1), i;
}
function Wf(e, t) {
  var n;
  const o = e.type;
  if (process.env.NODE_ENV !== "production") {
    if (o.name && pr(o.name, e.appContext.config), o.components) {
      const s = Object.keys(o.components);
      for (let i = 0; i < s.length; i++)
        pr(s[i], e.appContext.config);
    }
    if (o.directives) {
      const s = Object.keys(o.directives);
      for (let i = 0; i < s.length; i++)
        Lu(s[i]);
    }
    o.compilerOptions && zf() && C(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Hu), process.env.NODE_ENV !== "production" && Wa(e);
  const { setup: r } = o;
  if (r) {
    He();
    const s = e.setupContext = r.length > 1 ? qf(e) : null, i = Bn(e), u = en(
      r,
      e,
      0,
      [
        process.env.NODE_ENV !== "production" ? et(e.props) : e.props,
        s
      ]
    ), l = Cr(u);
    if (Ke(), i(), (l || e.sp) && !yn(e) && Uu(e), l) {
      if (u.then(Ps, Ps), t)
        return u.then((d) => {
          Rs(e, d, t);
        }).catch((d) => {
          Ln(d, e, 0);
        });
      if (e.asyncDep = u, process.env.NODE_ENV !== "production" && !e.suspense) {
        const d = (n = o.name) != null ? n : "Anonymous";
        C(
          `Component <${d}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      Rs(e, u, t);
  } else
    hl(e, t);
}
function Rs(e, t, n) {
  B(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : oe(t) ? (process.env.NODE_ENV !== "production" && Io(t) && C(
    "setup() should not return VNodes directly - return a render function instead."
  ), process.env.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = Au(t), process.env.NODE_ENV !== "production" && za(e)) : process.env.NODE_ENV !== "production" && t !== void 0 && C(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), hl(e, n);
}
const zf = () => !0;
function hl(e, t, n) {
  const o = e.type;
  e.render || (e.render = o.render || de);
  {
    const r = Bn(e);
    He();
    try {
      qa(e);
    } finally {
      Ke(), r();
    }
  }
  process.env.NODE_ENV !== "production" && !o.render && e.render === de && !t && (o.template ? C(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
  ) : C("Component is missing template or render function: ", o));
}
const ks = process.env.NODE_ENV !== "production" ? {
  get(e, t) {
    return mo(), fe(e, "get", ""), e[t];
  },
  set() {
    return C("setupContext.attrs is readonly."), !1;
  },
  deleteProperty() {
    return C("setupContext.attrs is readonly."), !1;
  }
} : {
  get(e, t) {
    return fe(e, "get", ""), e[t];
  }
};
function Gf(e) {
  return new Proxy(e.slots, {
    get(t, n) {
      return fe(e, "get", "$slots"), t[n];
    }
  });
}
function qf(e) {
  const t = (n) => {
    if (process.env.NODE_ENV !== "production" && (e.exposed && C("expose() should be called only once per setup()."), n != null)) {
      let o = typeof n;
      o === "object" && (j(n) ? o = "array" : re(n) && (o = "ref")), o !== "object" && C(
        `expose() should be passed a plain object, received ${o}.`
      );
    }
    e.exposed = n || {};
  };
  if (process.env.NODE_ENV !== "production") {
    let n, o;
    return Object.freeze({
      get attrs() {
        return n || (n = new Proxy(e.attrs, ks));
      },
      get slots() {
        return o || (o = Gf(e));
      },
      get emit() {
        return (r, ...s) => e.emit(r, ...s);
      },
      expose: t
    });
  } else
    return {
      attrs: new Proxy(e.attrs, ks),
      slots: e.slots,
      emit: e.emit,
      expose: t
    };
}
function Gr(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Au(gt(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Pt)
        return Pt[n](e);
    },
    has(t, n) {
      return n in t || n in Pt;
    }
  })) : e.proxy;
}
const Yf = /(?:^|[-_])\w/g, Jf = (e) => e.replace(Yf, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function _l(e, t = !0) {
  return B(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Ro(e, t, n = !1) {
  let o = _l(t);
  if (!o && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (o = r[1]);
  }
  if (!o && e && e.parent) {
    const r = (s) => {
      for (const i in s)
        if (s[i] === t)
          return i;
    };
    o = r(
      e.components || e.parent.type.components
    ) || r(e.appContext.components);
  }
  return o ? Jf(o) : n ? "App" : "Anonymous";
}
function El(e) {
  return B(e) && "__vccOpts" in e;
}
const qr = (e, t) => {
  const n = sa(e, t, Vn);
  if (process.env.NODE_ENV !== "production") {
    const o = Po();
    o && o.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function Xf() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, o = { style: "color:#eb2f96" }, r = {
    __vue_custom_formatter: !0,
    header(c) {
      if (!oe(c))
        return null;
      if (c.__isVue)
        return ["div", e, "VueInstance"];
      if (re(c)) {
        He();
        const h = c.value;
        return Ke(), [
          "div",
          {},
          ["span", e, f(c)],
          "<",
          u(h),
          ">"
        ];
      } else {
        if (lt(c))
          return [
            "div",
            {},
            ["span", e, Ve(c) ? "ShallowReactive" : "Reactive"],
            "<",
            u(c),
            `>${at(c) ? " (readonly)" : ""}`
          ];
        if (at(c))
          return [
            "div",
            {},
            ["span", e, Ve(c) ? "ShallowReadonly" : "Readonly"],
            "<",
            u(c),
            ">"
          ];
      }
      return null;
    },
    hasBody(c) {
      return c && c.__isVue;
    },
    body(c) {
      if (c && c.__isVue)
        return [
          "div",
          {},
          ...s(c.$)
        ];
    }
  };
  function s(c) {
    const h = [];
    c.type.props && c.props && h.push(i("props", K(c.props))), c.setupState !== ee && h.push(i("setup", c.setupState)), c.data !== ee && h.push(i("data", K(c.data)));
    const _ = l(c, "computed");
    _ && h.push(i("computed", _));
    const g = l(c, "inject");
    return g && h.push(i("injected", g)), h.push([
      "div",
      {},
      [
        "span",
        {
          style: o.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: c }]
    ]), h;
  }
  function i(c, h) {
    return h = ae({}, h), Object.keys(h).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        c
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(h).map((_) => [
          "div",
          {},
          ["span", o, _ + ": "],
          u(h[_], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function u(c, h = !0) {
    return typeof c == "number" ? ["span", t, c] : typeof c == "string" ? ["span", n, JSON.stringify(c)] : typeof c == "boolean" ? ["span", o, c] : oe(c) ? ["object", { object: h ? K(c) : c }] : ["span", n, String(c)];
  }
  function l(c, h) {
    const _ = c.type;
    if (B(_))
      return;
    const g = {};
    for (const b in c.ctx)
      d(_, b, h) && (g[b] = c.ctx[b]);
    return g;
  }
  function d(c, h, _) {
    const g = c[_];
    if (j(g) && g.includes(h) || oe(g) && h in g || c.extends && d(c.extends, h, _) || c.mixins && c.mixins.some((b) => d(b, h, _)))
      return !0;
  }
  function f(c) {
    return Ve(c) ? "ShallowRef" : c.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
const Fs = "3.5.22", ct = process.env.NODE_ENV !== "production" ? C : de;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let hr;
const $s = typeof window < "u" && window.trustedTypes;
if ($s)
  try {
    hr = /* @__PURE__ */ $s.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch (e) {
    process.env.NODE_ENV !== "production" && ct(`Error creating trusted types policy: ${e}`);
  }
const gl = hr ? (e) => hr.createHTML(e) : (e) => e, Zf = "http://www.w3.org/2000/svg", Qf = "http://www.w3.org/1998/Math/MathML", it = typeof document < "u" ? document : null, Ls = it && /* @__PURE__ */ it.createElement("template"), ed = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const r = t === "svg" ? it.createElementNS(Zf, e) : t === "mathml" ? it.createElementNS(Qf, e) : n ? it.createElement(e, { is: n }) : it.createElement(e);
    return e === "select" && o && o.multiple != null && r.setAttribute("multiple", o.multiple), r;
  },
  createText: (e) => it.createTextNode(e),
  createComment: (e) => it.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => it.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, o, r, s) {
    const i = n ? n.previousSibling : t.lastChild;
    if (r && (r === s || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), n), !(r === s || !(r = r.nextSibling)); )
        ;
    else {
      Ls.innerHTML = gl(
        o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e
      );
      const u = Ls.content;
      if (o === "svg" || o === "mathml") {
        const l = u.firstChild;
        for (; l.firstChild; )
          u.appendChild(l.firstChild);
        u.removeChild(l);
      }
      t.insertBefore(u, n);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, td = Symbol("_vtc");
function nd(e, t, n) {
  const o = e[td];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Ms = Symbol("_vod"), od = Symbol("_vsh"), rd = Symbol(process.env.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : ""), sd = /(?:^|;)\s*display\s*:/;
function id(e, t, n) {
  const o = e.style, r = ce(n);
  let s = !1;
  if (n && !r) {
    if (t)
      if (ce(t))
        for (const i of t.split(";")) {
          const u = i.slice(0, i.indexOf(":")).trim();
          n[u] == null && eo(o, u, "");
        }
      else
        for (const i in t)
          n[i] == null && eo(o, i, "");
    for (const i in n)
      i === "display" && (s = !0), eo(o, i, n[i]);
  } else if (r) {
    if (t !== n) {
      const i = o[rd];
      i && (n += ";" + i), o.cssText = n, s = sd.test(n);
    }
  } else t && e.removeAttribute("style");
  Ms in e && (e[Ms] = s ? o.display : "", e[od] && (o.display = "none"));
}
const ud = /[^\\];\s*$/, Us = /\s*!important$/;
function eo(e, t, n) {
  if (j(n))
    n.forEach((o) => eo(e, t, o));
  else if (n == null && (n = ""), process.env.NODE_ENV !== "production" && ud.test(n) && ct(
    `Unexpected semicolon at the end of '${t}' style value: '${n}'`
  ), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = ld(e, t);
    Us.test(n) ? e.setProperty(
      Ot(o),
      n.replace(Us, ""),
      "important"
    ) : e[o] = n;
  }
}
const Bs = ["Webkit", "Moz", "ms"], Go = {};
function ld(e, t) {
  const n = Go[t];
  if (n)
    return n;
  let o = Ue(t);
  if (o !== "filter" && o in e)
    return Go[t] = o;
  o = Do(o);
  for (let r = 0; r < Bs.length; r++) {
    const s = Bs[r] + o;
    if (s in e)
      return Go[t] = s;
  }
  return t;
}
const js = "http://www.w3.org/1999/xlink";
function Hs(e, t, n, o, r, s = xc(t)) {
  o && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(js, t.slice(6, t.length)) : e.setAttributeNS(js, t, n) : n == null || s && !iu(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : Qt(n) ? String(n) : n
  );
}
function Ks(e, t, n, o, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? gl(n) : n);
    return;
  }
  const s = e.tagName;
  if (t === "value" && s !== "PROGRESS" && // custom elements may use _value internally
  !s.includes("-")) {
    const u = s === "OPTION" ? e.getAttribute("value") || "" : e.value, l = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (u !== l || !("_value" in e)) && (e.value = l), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let i = !1;
  if (n === "" || n == null) {
    const u = typeof e[t];
    u === "boolean" ? n = iu(n) : n == null && u === "string" ? (n = "", i = !0) : u === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch (u) {
    process.env.NODE_ENV !== "production" && !i && ct(
      `Failed setting prop "${t}" on <${s.toLowerCase()}>: value ${n} is invalid.`,
      u
    );
  }
  i && e.removeAttribute(r || t);
}
function cd(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function ad(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
const Ws = Symbol("_vei");
function fd(e, t, n, o, r = null) {
  const s = e[Ws] || (e[Ws] = {}), i = s[t];
  if (o && i)
    i.value = process.env.NODE_ENV !== "production" ? Gs(o, t) : o;
  else {
    const [u, l] = dd(t);
    if (o) {
      const d = s[t] = _d(
        process.env.NODE_ENV !== "production" ? Gs(o, t) : o,
        r
      );
      cd(e, u, d, l);
    } else i && (ad(e, u, i, l), s[t] = void 0);
  }
}
const zs = /(?:Once|Passive|Capture)$/;
function dd(e) {
  let t;
  if (zs.test(e)) {
    t = {};
    let o;
    for (; o = e.match(zs); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Ot(e.slice(2)), t];
}
let qo = 0;
const pd = /* @__PURE__ */ Promise.resolve(), hd = () => qo || (pd.then(() => qo = 0), qo = Date.now());
function _d(e, t) {
  const n = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= n.attached)
      return;
    ot(
      Ed(o, n.value),
      t,
      5,
      [o]
    );
  };
  return n.value = e, n.attached = hd(), n;
}
function Gs(e, t) {
  return B(e) || j(e) ? e : (ct(
    `Wrong type passed as event handler to ${t} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof e}.`
  ), de);
}
function Ed(e, t) {
  if (j(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (o) => (r) => !r._stopped && o && o(r)
    );
  } else
    return t;
}
const qs = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, gd = (e, t, n, o, r, s) => {
  const i = r === "svg";
  t === "class" ? nd(e, o, i) : t === "style" ? id(e, n, o) : Fn(t) ? uo(t) || fd(e, t, n, o, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : md(e, t, o, i)) ? (Ks(e, t, o), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Hs(e, t, o, i, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !ce(o)) ? Ks(e, Ue(t), o, s, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), Hs(e, t, o, i));
};
function md(e, t, n, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && qs(t) && B(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return qs(t) && ce(n) ? !1 : t in e;
}
const vd = /* @__PURE__ */ ae({ patchProp: gd }, ed);
let Ys;
function yd() {
  return Ys || (Ys = mf(vd));
}
const bd = ((...e) => {
  const t = yd().createApp(...e);
  process.env.NODE_ENV !== "production" && (Nd(t), Dd(t));
  const { mount: n } = t;
  return t.mount = (o) => {
    const r = Sd(o);
    if (!r) return;
    const s = t._component;
    !B(s) && !s.render && !s.template && (s.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const i = n(r, !1, Od(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), i;
  }, t;
});
function Od(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Nd(e) {
  Object.defineProperty(e.config, "isNativeTag", {
    value: (t) => Cc(t) || wc(t) || Tc(t),
    writable: !1
  });
}
function Dd(e) {
  {
    const t = e.config.isCustomElement;
    Object.defineProperty(e.config, "isCustomElement", {
      get() {
        return t;
      },
      set() {
        ct(
          "The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead."
        );
      }
    });
    const n = e.config.compilerOptions, o = 'The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader\'s `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc';
    Object.defineProperty(e.config, "compilerOptions", {
      get() {
        return ct(o), n;
      },
      set() {
        ct(o);
      }
    });
  }
}
function Sd(e) {
  if (ce(e)) {
    const t = document.querySelector(e);
    return process.env.NODE_ENV !== "production" && !t && ct(
      `Failed to mount app: mount target selector "${e}" returned null.`
    ), t;
  }
  return process.env.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && ct(
    'mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs'
  ), e;
}
/**
* vue v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Ad() {
  Xf();
}
process.env.NODE_ENV !== "production" && Ad();
var Cd = Object.create, ml = Object.defineProperty, wd = Object.getOwnPropertyDescriptor, Yr = Object.getOwnPropertyNames, Td = Object.getPrototypeOf, Vd = Object.prototype.hasOwnProperty, xd = (e, t) => function() {
  return e && (t = (0, e[Yr(e)[0]])(e = 0)), t;
}, Id = (e, t) => function() {
  return t || (0, e[Yr(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, Pd = (e, t, n, o) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let r of Yr(t))
      !Vd.call(e, r) && r !== n && ml(e, r, { get: () => t[r], enumerable: !(o = wd(t, r)) || o.enumerable });
  return e;
}, Rd = (e, t, n) => (n = e != null ? Cd(Td(e)) : {}, Pd(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  ml(n, "default", { value: e, enumerable: !0 }),
  e
)), jn = xd({
  "../../node_modules/.pnpm/tsup@8.4.0_@microsoft+api-extractor@7.51.1_@types+node@22.13.14__jiti@2.4.2_postcss@8.5_96eb05a9d65343021e53791dd83f3773/node_modules/tsup/assets/esm_shims.js"() {
  }
}), kd = Id({
  "../../node_modules/.pnpm/rfdc@1.4.1/node_modules/rfdc/index.js"(e, t) {
    jn(), t.exports = o;
    function n(s) {
      return s instanceof Buffer ? Buffer.from(s) : new s.constructor(s.buffer.slice(), s.byteOffset, s.length);
    }
    function o(s) {
      if (s = s || {}, s.circles) return r(s);
      const i = /* @__PURE__ */ new Map();
      if (i.set(Date, (c) => new Date(c)), i.set(Map, (c, h) => new Map(l(Array.from(c), h))), i.set(Set, (c, h) => new Set(l(Array.from(c), h))), s.constructorHandlers)
        for (const c of s.constructorHandlers)
          i.set(c[0], c[1]);
      let u = null;
      return s.proto ? f : d;
      function l(c, h) {
        const _ = Object.keys(c), g = new Array(_.length);
        for (let b = 0; b < _.length; b++) {
          const w = _[b], S = c[w];
          typeof S != "object" || S === null ? g[w] = S : S.constructor !== Object && (u = i.get(S.constructor)) ? g[w] = u(S, h) : ArrayBuffer.isView(S) ? g[w] = n(S) : g[w] = h(S);
        }
        return g;
      }
      function d(c) {
        if (typeof c != "object" || c === null) return c;
        if (Array.isArray(c)) return l(c, d);
        if (c.constructor !== Object && (u = i.get(c.constructor)))
          return u(c, d);
        const h = {};
        for (const _ in c) {
          if (Object.hasOwnProperty.call(c, _) === !1) continue;
          const g = c[_];
          typeof g != "object" || g === null ? h[_] = g : g.constructor !== Object && (u = i.get(g.constructor)) ? h[_] = u(g, d) : ArrayBuffer.isView(g) ? h[_] = n(g) : h[_] = d(g);
        }
        return h;
      }
      function f(c) {
        if (typeof c != "object" || c === null) return c;
        if (Array.isArray(c)) return l(c, f);
        if (c.constructor !== Object && (u = i.get(c.constructor)))
          return u(c, f);
        const h = {};
        for (const _ in c) {
          const g = c[_];
          typeof g != "object" || g === null ? h[_] = g : g.constructor !== Object && (u = i.get(g.constructor)) ? h[_] = u(g, f) : ArrayBuffer.isView(g) ? h[_] = n(g) : h[_] = f(g);
        }
        return h;
      }
    }
    function r(s) {
      const i = [], u = [], l = /* @__PURE__ */ new Map();
      if (l.set(Date, (_) => new Date(_)), l.set(Map, (_, g) => new Map(f(Array.from(_), g))), l.set(Set, (_, g) => new Set(f(Array.from(_), g))), s.constructorHandlers)
        for (const _ of s.constructorHandlers)
          l.set(_[0], _[1]);
      let d = null;
      return s.proto ? h : c;
      function f(_, g) {
        const b = Object.keys(_), w = new Array(b.length);
        for (let S = 0; S < b.length; S++) {
          const $ = b[S], k = _[$];
          if (typeof k != "object" || k === null)
            w[$] = k;
          else if (k.constructor !== Object && (d = l.get(k.constructor)))
            w[$] = d(k, g);
          else if (ArrayBuffer.isView(k))
            w[$] = n(k);
          else {
            const te = i.indexOf(k);
            te !== -1 ? w[$] = u[te] : w[$] = g(k);
          }
        }
        return w;
      }
      function c(_) {
        if (typeof _ != "object" || _ === null) return _;
        if (Array.isArray(_)) return f(_, c);
        if (_.constructor !== Object && (d = l.get(_.constructor)))
          return d(_, c);
        const g = {};
        i.push(_), u.push(g);
        for (const b in _) {
          if (Object.hasOwnProperty.call(_, b) === !1) continue;
          const w = _[b];
          if (typeof w != "object" || w === null)
            g[b] = w;
          else if (w.constructor !== Object && (d = l.get(w.constructor)))
            g[b] = d(w, c);
          else if (ArrayBuffer.isView(w))
            g[b] = n(w);
          else {
            const S = i.indexOf(w);
            S !== -1 ? g[b] = u[S] : g[b] = c(w);
          }
        }
        return i.pop(), u.pop(), g;
      }
      function h(_) {
        if (typeof _ != "object" || _ === null) return _;
        if (Array.isArray(_)) return f(_, h);
        if (_.constructor !== Object && (d = l.get(_.constructor)))
          return d(_, h);
        const g = {};
        i.push(_), u.push(g);
        for (const b in _) {
          const w = _[b];
          if (typeof w != "object" || w === null)
            g[b] = w;
          else if (w.constructor !== Object && (d = l.get(w.constructor)))
            g[b] = d(w, h);
          else if (ArrayBuffer.isView(w))
            g[b] = n(w);
          else {
            const S = i.indexOf(w);
            S !== -1 ? g[b] = u[S] : g[b] = h(w);
          }
        }
        return i.pop(), u.pop(), g;
      }
    }
  }
});
jn();
jn();
jn();
var vl = typeof navigator < "u", R = typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : typeof global < "u" ? global : {};
typeof R.chrome < "u" && R.chrome.devtools;
vl && (R.self, R.top);
var Js;
typeof navigator < "u" && ((Js = navigator.userAgent) == null || Js.toLowerCase().includes("electron"));
jn();
var Fd = Rd(kd()), $d = /(?:^|[-_/])(\w)/g;
function Ld(e, t) {
  return t ? t.toUpperCase() : "";
}
function Md(e) {
  return e && `${e}`.replace($d, Ld);
}
function Ud(e, t) {
  let n = e.replace(/^[a-z]:/i, "").replace(/\\/g, "/");
  n.endsWith(`index${t}`) && (n = n.replace(`/index${t}`, t));
  const o = n.lastIndexOf("/"), r = n.substring(o + 1);
  {
    const s = r.lastIndexOf(t);
    return r.substring(0, s);
  }
}
var Xs = (0, Fd.default)({ circles: !0 });
const Bd = {
  trailing: !0
};
function Jt(e, t = 25, n = {}) {
  if (n = { ...Bd, ...n }, !Number.isFinite(t))
    throw new TypeError("Expected `wait` to be a finite number");
  let o, r, s = [], i, u;
  const l = (d, f) => (i = jd(e, d, f), i.finally(() => {
    if (i = null, n.trailing && u && !r) {
      const c = l(d, u);
      return u = null, c;
    }
  }), i);
  return function(...d) {
    return i ? (n.trailing && (u = d), i) : new Promise((f) => {
      const c = !r && n.leading;
      clearTimeout(r), r = setTimeout(() => {
        r = null;
        const h = n.leading ? o : l(this, d);
        for (const _ of s)
          _(h);
        s = [];
      }, t), c ? (o = l(this, d), f(o)) : s.push(f);
    });
  };
}
async function jd(e, t, n) {
  return await e.apply(t, n);
}
function _r(e, t = {}, n) {
  for (const o in e) {
    const r = e[o], s = n ? `${n}:${o}` : o;
    typeof r == "object" && r !== null ? _r(r, t, s) : typeof r == "function" && (t[s] = r);
  }
  return t;
}
const Hd = { run: (e) => e() }, Kd = () => Hd, yl = typeof console.createTask < "u" ? console.createTask : Kd;
function Wd(e, t) {
  const n = t.shift(), o = yl(n);
  return e.reduce(
    (r, s) => r.then(() => o.run(() => s(...t))),
    Promise.resolve()
  );
}
function zd(e, t) {
  const n = t.shift(), o = yl(n);
  return Promise.all(e.map((r) => o.run(() => r(...t))));
}
function Yo(e, t) {
  for (const n of [...e])
    n(t);
}
class Gd {
  constructor() {
    this._hooks = {}, this._before = void 0, this._after = void 0, this._deprecatedMessages = void 0, this._deprecatedHooks = {}, this.hook = this.hook.bind(this), this.callHook = this.callHook.bind(this), this.callHookWith = this.callHookWith.bind(this);
  }
  hook(t, n, o = {}) {
    if (!t || typeof n != "function")
      return () => {
      };
    const r = t;
    let s;
    for (; this._deprecatedHooks[t]; )
      s = this._deprecatedHooks[t], t = s.to;
    if (s && !o.allowDeprecated) {
      let i = s.message;
      i || (i = `${r} hook has been deprecated` + (s.to ? `, please use ${s.to}` : "")), this._deprecatedMessages || (this._deprecatedMessages = /* @__PURE__ */ new Set()), this._deprecatedMessages.has(i) || (console.warn(i), this._deprecatedMessages.add(i));
    }
    if (!n.name)
      try {
        Object.defineProperty(n, "name", {
          get: () => "_" + t.replace(/\W+/g, "_") + "_hook_cb",
          configurable: !0
        });
      } catch {
      }
    return this._hooks[t] = this._hooks[t] || [], this._hooks[t].push(n), () => {
      n && (this.removeHook(t, n), n = void 0);
    };
  }
  hookOnce(t, n) {
    let o, r = (...s) => (typeof o == "function" && o(), o = void 0, r = void 0, n(...s));
    return o = this.hook(t, r), o;
  }
  removeHook(t, n) {
    if (this._hooks[t]) {
      const o = this._hooks[t].indexOf(n);
      o !== -1 && this._hooks[t].splice(o, 1), this._hooks[t].length === 0 && delete this._hooks[t];
    }
  }
  deprecateHook(t, n) {
    this._deprecatedHooks[t] = typeof n == "string" ? { to: n } : n;
    const o = this._hooks[t] || [];
    delete this._hooks[t];
    for (const r of o)
      this.hook(t, r);
  }
  deprecateHooks(t) {
    Object.assign(this._deprecatedHooks, t);
    for (const n in t)
      this.deprecateHook(n, t[n]);
  }
  addHooks(t) {
    const n = _r(t), o = Object.keys(n).map(
      (r) => this.hook(r, n[r])
    );
    return () => {
      for (const r of o.splice(0, o.length))
        r();
    };
  }
  removeHooks(t) {
    const n = _r(t);
    for (const o in n)
      this.removeHook(o, n[o]);
  }
  removeAllHooks() {
    for (const t in this._hooks)
      delete this._hooks[t];
  }
  callHook(t, ...n) {
    return n.unshift(t), this.callHookWith(Wd, t, ...n);
  }
  callHookParallel(t, ...n) {
    return n.unshift(t), this.callHookWith(zd, t, ...n);
  }
  callHookWith(t, n, ...o) {
    const r = this._before || this._after ? { name: n, args: o, context: {} } : void 0;
    this._before && Yo(this._before, r);
    const s = t(
      n in this._hooks ? [...this._hooks[n]] : [],
      o
    );
    return s instanceof Promise ? s.finally(() => {
      this._after && r && Yo(this._after, r);
    }) : (this._after && r && Yo(this._after, r), s);
  }
  beforeEach(t) {
    return this._before = this._before || [], this._before.push(t), () => {
      if (this._before !== void 0) {
        const n = this._before.indexOf(t);
        n !== -1 && this._before.splice(n, 1);
      }
    };
  }
  afterEach(t) {
    return this._after = this._after || [], this._after.push(t), () => {
      if (this._after !== void 0) {
        const n = this._after.indexOf(t);
        n !== -1 && this._after.splice(n, 1);
      }
    };
  }
}
function bl() {
  return new Gd();
}
var qd = Object.create, Ol = Object.defineProperty, Yd = Object.getOwnPropertyDescriptor, Jr = Object.getOwnPropertyNames, Jd = Object.getPrototypeOf, Xd = Object.prototype.hasOwnProperty, Zd = (e, t) => function() {
  return e && (t = (0, e[Jr(e)[0]])(e = 0)), t;
}, Nl = (e, t) => function() {
  return t || (0, e[Jr(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, Qd = (e, t, n, o) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let r of Jr(t))
      !Xd.call(e, r) && r !== n && Ol(e, r, { get: () => t[r], enumerable: !(o = Yd(t, r)) || o.enumerable });
  return e;
}, ep = (e, t, n) => (n = e != null ? qd(Jd(e)) : {}, Qd(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  Ol(n, "default", { value: e, enumerable: !0 }),
  e
)), y = Zd({
  "../../node_modules/.pnpm/tsup@8.4.0_@microsoft+api-extractor@7.51.1_@types+node@22.13.14__jiti@2.4.2_postcss@8.5_96eb05a9d65343021e53791dd83f3773/node_modules/tsup/assets/esm_shims.js"() {
  }
}), tp = Nl({
  "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/lib/speakingurl.js"(e, t) {
    y(), (function(n) {
      var o = {
        // latin
        À: "A",
        Á: "A",
        Â: "A",
        Ã: "A",
        Ä: "Ae",
        Å: "A",
        Æ: "AE",
        Ç: "C",
        È: "E",
        É: "E",
        Ê: "E",
        Ë: "E",
        Ì: "I",
        Í: "I",
        Î: "I",
        Ï: "I",
        Ð: "D",
        Ñ: "N",
        Ò: "O",
        Ó: "O",
        Ô: "O",
        Õ: "O",
        Ö: "Oe",
        Ő: "O",
        Ø: "O",
        Ù: "U",
        Ú: "U",
        Û: "U",
        Ü: "Ue",
        Ű: "U",
        Ý: "Y",
        Þ: "TH",
        ß: "ss",
        à: "a",
        á: "a",
        â: "a",
        ã: "a",
        ä: "ae",
        å: "a",
        æ: "ae",
        ç: "c",
        è: "e",
        é: "e",
        ê: "e",
        ë: "e",
        ì: "i",
        í: "i",
        î: "i",
        ï: "i",
        ð: "d",
        ñ: "n",
        ò: "o",
        ó: "o",
        ô: "o",
        õ: "o",
        ö: "oe",
        ő: "o",
        ø: "o",
        ù: "u",
        ú: "u",
        û: "u",
        ü: "ue",
        ű: "u",
        ý: "y",
        þ: "th",
        ÿ: "y",
        "ẞ": "SS",
        // language specific
        // Arabic
        ا: "a",
        أ: "a",
        إ: "i",
        آ: "aa",
        ؤ: "u",
        ئ: "e",
        ء: "a",
        ب: "b",
        ت: "t",
        ث: "th",
        ج: "j",
        ح: "h",
        خ: "kh",
        د: "d",
        ذ: "th",
        ر: "r",
        ز: "z",
        س: "s",
        ش: "sh",
        ص: "s",
        ض: "dh",
        ط: "t",
        ظ: "z",
        ع: "a",
        غ: "gh",
        ف: "f",
        ق: "q",
        ك: "k",
        ل: "l",
        م: "m",
        ن: "n",
        ه: "h",
        و: "w",
        ي: "y",
        ى: "a",
        ة: "h",
        ﻻ: "la",
        ﻷ: "laa",
        ﻹ: "lai",
        ﻵ: "laa",
        // Persian additional characters than Arabic
        گ: "g",
        چ: "ch",
        پ: "p",
        ژ: "zh",
        ک: "k",
        ی: "y",
        // Arabic diactrics
        "َ": "a",
        "ً": "an",
        "ِ": "e",
        "ٍ": "en",
        "ُ": "u",
        "ٌ": "on",
        "ْ": "",
        // Arabic numbers
        "٠": "0",
        "١": "1",
        "٢": "2",
        "٣": "3",
        "٤": "4",
        "٥": "5",
        "٦": "6",
        "٧": "7",
        "٨": "8",
        "٩": "9",
        // Persian numbers
        "۰": "0",
        "۱": "1",
        "۲": "2",
        "۳": "3",
        "۴": "4",
        "۵": "5",
        "۶": "6",
        "۷": "7",
        "۸": "8",
        "۹": "9",
        // Burmese consonants
        က: "k",
        ခ: "kh",
        ဂ: "g",
        ဃ: "ga",
        င: "ng",
        စ: "s",
        ဆ: "sa",
        ဇ: "z",
        "စျ": "za",
        ည: "ny",
        ဋ: "t",
        ဌ: "ta",
        ဍ: "d",
        ဎ: "da",
        ဏ: "na",
        တ: "t",
        ထ: "ta",
        ဒ: "d",
        ဓ: "da",
        န: "n",
        ပ: "p",
        ဖ: "pa",
        ဗ: "b",
        ဘ: "ba",
        မ: "m",
        ယ: "y",
        ရ: "ya",
        လ: "l",
        ဝ: "w",
        သ: "th",
        ဟ: "h",
        ဠ: "la",
        အ: "a",
        // consonant character combos
        "ြ": "y",
        "ျ": "ya",
        "ွ": "w",
        "ြွ": "yw",
        "ျွ": "ywa",
        "ှ": "h",
        // independent vowels
        ဧ: "e",
        "၏": "-e",
        ဣ: "i",
        ဤ: "-i",
        ဉ: "u",
        ဦ: "-u",
        ဩ: "aw",
        "သြော": "aw",
        ဪ: "aw",
        // numbers
        "၀": "0",
        "၁": "1",
        "၂": "2",
        "၃": "3",
        "၄": "4",
        "၅": "5",
        "၆": "6",
        "၇": "7",
        "၈": "8",
        "၉": "9",
        // virama and tone marks which are silent in transliteration
        "္": "",
        "့": "",
        "း": "",
        // Czech
        č: "c",
        ď: "d",
        ě: "e",
        ň: "n",
        ř: "r",
        š: "s",
        ť: "t",
        ů: "u",
        ž: "z",
        Č: "C",
        Ď: "D",
        Ě: "E",
        Ň: "N",
        Ř: "R",
        Š: "S",
        Ť: "T",
        Ů: "U",
        Ž: "Z",
        // Dhivehi
        ހ: "h",
        ށ: "sh",
        ނ: "n",
        ރ: "r",
        ބ: "b",
        ޅ: "lh",
        ކ: "k",
        އ: "a",
        ވ: "v",
        މ: "m",
        ފ: "f",
        ދ: "dh",
        ތ: "th",
        ލ: "l",
        ގ: "g",
        ޏ: "gn",
        ސ: "s",
        ޑ: "d",
        ޒ: "z",
        ޓ: "t",
        ޔ: "y",
        ޕ: "p",
        ޖ: "j",
        ޗ: "ch",
        ޘ: "tt",
        ޙ: "hh",
        ޚ: "kh",
        ޛ: "th",
        ޜ: "z",
        ޝ: "sh",
        ޞ: "s",
        ޟ: "d",
        ޠ: "t",
        ޡ: "z",
        ޢ: "a",
        ޣ: "gh",
        ޤ: "q",
        ޥ: "w",
        "ަ": "a",
        "ާ": "aa",
        "ި": "i",
        "ީ": "ee",
        "ު": "u",
        "ޫ": "oo",
        "ެ": "e",
        "ޭ": "ey",
        "ޮ": "o",
        "ޯ": "oa",
        "ް": "",
        // Georgian https://en.wikipedia.org/wiki/Romanization_of_Georgian
        // National system (2002)
        ა: "a",
        ბ: "b",
        გ: "g",
        დ: "d",
        ე: "e",
        ვ: "v",
        ზ: "z",
        თ: "t",
        ი: "i",
        კ: "k",
        ლ: "l",
        მ: "m",
        ნ: "n",
        ო: "o",
        პ: "p",
        ჟ: "zh",
        რ: "r",
        ს: "s",
        ტ: "t",
        უ: "u",
        ფ: "p",
        ქ: "k",
        ღ: "gh",
        ყ: "q",
        შ: "sh",
        ჩ: "ch",
        ც: "ts",
        ძ: "dz",
        წ: "ts",
        ჭ: "ch",
        ხ: "kh",
        ჯ: "j",
        ჰ: "h",
        // Greek
        α: "a",
        β: "v",
        γ: "g",
        δ: "d",
        ε: "e",
        ζ: "z",
        η: "i",
        θ: "th",
        ι: "i",
        κ: "k",
        λ: "l",
        μ: "m",
        ν: "n",
        ξ: "ks",
        ο: "o",
        π: "p",
        ρ: "r",
        σ: "s",
        τ: "t",
        υ: "y",
        φ: "f",
        χ: "x",
        ψ: "ps",
        ω: "o",
        ά: "a",
        έ: "e",
        ί: "i",
        ό: "o",
        ύ: "y",
        ή: "i",
        ώ: "o",
        ς: "s",
        ϊ: "i",
        ΰ: "y",
        ϋ: "y",
        ΐ: "i",
        Α: "A",
        Β: "B",
        Γ: "G",
        Δ: "D",
        Ε: "E",
        Ζ: "Z",
        Η: "I",
        Θ: "TH",
        Ι: "I",
        Κ: "K",
        Λ: "L",
        Μ: "M",
        Ν: "N",
        Ξ: "KS",
        Ο: "O",
        Π: "P",
        Ρ: "R",
        Σ: "S",
        Τ: "T",
        Υ: "Y",
        Φ: "F",
        Χ: "X",
        Ψ: "PS",
        Ω: "O",
        Ά: "A",
        Έ: "E",
        Ί: "I",
        Ό: "O",
        Ύ: "Y",
        Ή: "I",
        Ώ: "O",
        Ϊ: "I",
        Ϋ: "Y",
        // Latvian
        ā: "a",
        // 'č': 'c', // duplicate
        ē: "e",
        ģ: "g",
        ī: "i",
        ķ: "k",
        ļ: "l",
        ņ: "n",
        // 'š': 's', // duplicate
        ū: "u",
        // 'ž': 'z', // duplicate
        Ā: "A",
        // 'Č': 'C', // duplicate
        Ē: "E",
        Ģ: "G",
        Ī: "I",
        Ķ: "k",
        Ļ: "L",
        Ņ: "N",
        // 'Š': 'S', // duplicate
        Ū: "U",
        // 'Ž': 'Z', // duplicate
        // Macedonian
        Ќ: "Kj",
        ќ: "kj",
        Љ: "Lj",
        љ: "lj",
        Њ: "Nj",
        њ: "nj",
        Тс: "Ts",
        тс: "ts",
        // Polish
        ą: "a",
        ć: "c",
        ę: "e",
        ł: "l",
        ń: "n",
        // 'ó': 'o', // duplicate
        ś: "s",
        ź: "z",
        ż: "z",
        Ą: "A",
        Ć: "C",
        Ę: "E",
        Ł: "L",
        Ń: "N",
        Ś: "S",
        Ź: "Z",
        Ż: "Z",
        // Ukranian
        Є: "Ye",
        І: "I",
        Ї: "Yi",
        Ґ: "G",
        є: "ye",
        і: "i",
        ї: "yi",
        ґ: "g",
        // Romanian
        ă: "a",
        Ă: "A",
        ș: "s",
        Ș: "S",
        // 'ş': 's', // duplicate
        // 'Ş': 'S', // duplicate
        ț: "t",
        Ț: "T",
        ţ: "t",
        Ţ: "T",
        // Russian https://en.wikipedia.org/wiki/Romanization_of_Russian
        // ICAO
        а: "a",
        б: "b",
        в: "v",
        г: "g",
        д: "d",
        е: "e",
        ё: "yo",
        ж: "zh",
        з: "z",
        и: "i",
        й: "i",
        к: "k",
        л: "l",
        м: "m",
        н: "n",
        о: "o",
        п: "p",
        р: "r",
        с: "s",
        т: "t",
        у: "u",
        ф: "f",
        х: "kh",
        ц: "c",
        ч: "ch",
        ш: "sh",
        щ: "sh",
        ъ: "",
        ы: "y",
        ь: "",
        э: "e",
        ю: "yu",
        я: "ya",
        А: "A",
        Б: "B",
        В: "V",
        Г: "G",
        Д: "D",
        Е: "E",
        Ё: "Yo",
        Ж: "Zh",
        З: "Z",
        И: "I",
        Й: "I",
        К: "K",
        Л: "L",
        М: "M",
        Н: "N",
        О: "O",
        П: "P",
        Р: "R",
        С: "S",
        Т: "T",
        У: "U",
        Ф: "F",
        Х: "Kh",
        Ц: "C",
        Ч: "Ch",
        Ш: "Sh",
        Щ: "Sh",
        Ъ: "",
        Ы: "Y",
        Ь: "",
        Э: "E",
        Ю: "Yu",
        Я: "Ya",
        // Serbian
        ђ: "dj",
        ј: "j",
        // 'љ': 'lj',  // duplicate
        // 'њ': 'nj', // duplicate
        ћ: "c",
        џ: "dz",
        Ђ: "Dj",
        Ј: "j",
        // 'Љ': 'Lj', // duplicate
        // 'Њ': 'Nj', // duplicate
        Ћ: "C",
        Џ: "Dz",
        // Slovak
        ľ: "l",
        ĺ: "l",
        ŕ: "r",
        Ľ: "L",
        Ĺ: "L",
        Ŕ: "R",
        // Turkish
        ş: "s",
        Ş: "S",
        ı: "i",
        İ: "I",
        // 'ç': 'c', // duplicate
        // 'Ç': 'C', // duplicate
        // 'ü': 'u', // duplicate, see langCharMap
        // 'Ü': 'U', // duplicate, see langCharMap
        // 'ö': 'o', // duplicate, see langCharMap
        // 'Ö': 'O', // duplicate, see langCharMap
        ğ: "g",
        Ğ: "G",
        // Vietnamese
        ả: "a",
        Ả: "A",
        ẳ: "a",
        Ẳ: "A",
        ẩ: "a",
        Ẩ: "A",
        đ: "d",
        Đ: "D",
        ẹ: "e",
        Ẹ: "E",
        ẽ: "e",
        Ẽ: "E",
        ẻ: "e",
        Ẻ: "E",
        ế: "e",
        Ế: "E",
        ề: "e",
        Ề: "E",
        ệ: "e",
        Ệ: "E",
        ễ: "e",
        Ễ: "E",
        ể: "e",
        Ể: "E",
        ỏ: "o",
        ọ: "o",
        Ọ: "o",
        ố: "o",
        Ố: "O",
        ồ: "o",
        Ồ: "O",
        ổ: "o",
        Ổ: "O",
        ộ: "o",
        Ộ: "O",
        ỗ: "o",
        Ỗ: "O",
        ơ: "o",
        Ơ: "O",
        ớ: "o",
        Ớ: "O",
        ờ: "o",
        Ờ: "O",
        ợ: "o",
        Ợ: "O",
        ỡ: "o",
        Ỡ: "O",
        Ở: "o",
        ở: "o",
        ị: "i",
        Ị: "I",
        ĩ: "i",
        Ĩ: "I",
        ỉ: "i",
        Ỉ: "i",
        ủ: "u",
        Ủ: "U",
        ụ: "u",
        Ụ: "U",
        ũ: "u",
        Ũ: "U",
        ư: "u",
        Ư: "U",
        ứ: "u",
        Ứ: "U",
        ừ: "u",
        Ừ: "U",
        ự: "u",
        Ự: "U",
        ữ: "u",
        Ữ: "U",
        ử: "u",
        Ử: "ư",
        ỷ: "y",
        Ỷ: "y",
        ỳ: "y",
        Ỳ: "Y",
        ỵ: "y",
        Ỵ: "Y",
        ỹ: "y",
        Ỹ: "Y",
        ạ: "a",
        Ạ: "A",
        ấ: "a",
        Ấ: "A",
        ầ: "a",
        Ầ: "A",
        ậ: "a",
        Ậ: "A",
        ẫ: "a",
        Ẫ: "A",
        // 'ă': 'a', // duplicate
        // 'Ă': 'A', // duplicate
        ắ: "a",
        Ắ: "A",
        ằ: "a",
        Ằ: "A",
        ặ: "a",
        Ặ: "A",
        ẵ: "a",
        Ẵ: "A",
        "⓪": "0",
        "①": "1",
        "②": "2",
        "③": "3",
        "④": "4",
        "⑤": "5",
        "⑥": "6",
        "⑦": "7",
        "⑧": "8",
        "⑨": "9",
        "⑩": "10",
        "⑪": "11",
        "⑫": "12",
        "⑬": "13",
        "⑭": "14",
        "⑮": "15",
        "⑯": "16",
        "⑰": "17",
        "⑱": "18",
        "⑲": "18",
        "⑳": "18",
        "⓵": "1",
        "⓶": "2",
        "⓷": "3",
        "⓸": "4",
        "⓹": "5",
        "⓺": "6",
        "⓻": "7",
        "⓼": "8",
        "⓽": "9",
        "⓾": "10",
        "⓿": "0",
        "⓫": "11",
        "⓬": "12",
        "⓭": "13",
        "⓮": "14",
        "⓯": "15",
        "⓰": "16",
        "⓱": "17",
        "⓲": "18",
        "⓳": "19",
        "⓴": "20",
        "Ⓐ": "A",
        "Ⓑ": "B",
        "Ⓒ": "C",
        "Ⓓ": "D",
        "Ⓔ": "E",
        "Ⓕ": "F",
        "Ⓖ": "G",
        "Ⓗ": "H",
        "Ⓘ": "I",
        "Ⓙ": "J",
        "Ⓚ": "K",
        "Ⓛ": "L",
        "Ⓜ": "M",
        "Ⓝ": "N",
        "Ⓞ": "O",
        "Ⓟ": "P",
        "Ⓠ": "Q",
        "Ⓡ": "R",
        "Ⓢ": "S",
        "Ⓣ": "T",
        "Ⓤ": "U",
        "Ⓥ": "V",
        "Ⓦ": "W",
        "Ⓧ": "X",
        "Ⓨ": "Y",
        "Ⓩ": "Z",
        "ⓐ": "a",
        "ⓑ": "b",
        "ⓒ": "c",
        "ⓓ": "d",
        "ⓔ": "e",
        "ⓕ": "f",
        "ⓖ": "g",
        "ⓗ": "h",
        "ⓘ": "i",
        "ⓙ": "j",
        "ⓚ": "k",
        "ⓛ": "l",
        "ⓜ": "m",
        "ⓝ": "n",
        "ⓞ": "o",
        "ⓟ": "p",
        "ⓠ": "q",
        "ⓡ": "r",
        "ⓢ": "s",
        "ⓣ": "t",
        "ⓤ": "u",
        "ⓦ": "v",
        "ⓥ": "w",
        "ⓧ": "x",
        "ⓨ": "y",
        "ⓩ": "z",
        // symbols
        "“": '"',
        "”": '"',
        "‘": "'",
        "’": "'",
        "∂": "d",
        ƒ: "f",
        "™": "(TM)",
        "©": "(C)",
        œ: "oe",
        Œ: "OE",
        "®": "(R)",
        "†": "+",
        "℠": "(SM)",
        "…": "...",
        "˚": "o",
        º: "o",
        ª: "a",
        "•": "*",
        "၊": ",",
        "။": ".",
        // currency
        $: "USD",
        "€": "EUR",
        "₢": "BRN",
        "₣": "FRF",
        "£": "GBP",
        "₤": "ITL",
        "₦": "NGN",
        "₧": "ESP",
        "₩": "KRW",
        "₪": "ILS",
        "₫": "VND",
        "₭": "LAK",
        "₮": "MNT",
        "₯": "GRD",
        "₱": "ARS",
        "₲": "PYG",
        "₳": "ARA",
        "₴": "UAH",
        "₵": "GHS",
        "¢": "cent",
        "¥": "CNY",
        元: "CNY",
        円: "YEN",
        "﷼": "IRR",
        "₠": "EWE",
        "฿": "THB",
        "₨": "INR",
        "₹": "INR",
        "₰": "PF",
        "₺": "TRY",
        "؋": "AFN",
        "₼": "AZN",
        лв: "BGN",
        "៛": "KHR",
        "₡": "CRC",
        "₸": "KZT",
        ден: "MKD",
        zł: "PLN",
        "₽": "RUB",
        "₾": "GEL"
      }, r = [
        // burmese
        "်",
        // Dhivehi
        "ް"
      ], s = {
        // Burmese
        // dependent vowels
        "ာ": "a",
        "ါ": "a",
        "ေ": "e",
        "ဲ": "e",
        "ိ": "i",
        "ီ": "i",
        "ို": "o",
        "ု": "u",
        "ူ": "u",
        "ေါင်": "aung",
        "ော": "aw",
        "ော်": "aw",
        "ေါ": "aw",
        "ေါ်": "aw",
        "်": "်",
        // this is special case but the character will be converted to latin in the code
        "က်": "et",
        "ိုက်": "aik",
        "ောက်": "auk",
        "င်": "in",
        "ိုင်": "aing",
        "ောင်": "aung",
        "စ်": "it",
        "ည်": "i",
        "တ်": "at",
        "ိတ်": "eik",
        "ုတ်": "ok",
        "ွတ်": "ut",
        "ေတ်": "it",
        "ဒ်": "d",
        "ိုဒ်": "ok",
        "ုဒ်": "ait",
        "န်": "an",
        "ာန်": "an",
        "ိန်": "ein",
        "ုန်": "on",
        "ွန်": "un",
        "ပ်": "at",
        "ိပ်": "eik",
        "ုပ်": "ok",
        "ွပ်": "ut",
        "န်ုပ်": "nub",
        "မ်": "an",
        "ိမ်": "ein",
        "ုမ်": "on",
        "ွမ်": "un",
        "ယ်": "e",
        "ိုလ်": "ol",
        "ဉ်": "in",
        "ံ": "an",
        "ိံ": "ein",
        "ုံ": "on",
        // Dhivehi
        "ައް": "ah",
        "ަށް": "ah"
      }, i = {
        en: {},
        // default language
        az: {
          // Azerbaijani
          ç: "c",
          ə: "e",
          ğ: "g",
          ı: "i",
          ö: "o",
          ş: "s",
          ü: "u",
          Ç: "C",
          Ə: "E",
          Ğ: "G",
          İ: "I",
          Ö: "O",
          Ş: "S",
          Ü: "U"
        },
        cs: {
          // Czech
          č: "c",
          ď: "d",
          ě: "e",
          ň: "n",
          ř: "r",
          š: "s",
          ť: "t",
          ů: "u",
          ž: "z",
          Č: "C",
          Ď: "D",
          Ě: "E",
          Ň: "N",
          Ř: "R",
          Š: "S",
          Ť: "T",
          Ů: "U",
          Ž: "Z"
        },
        fi: {
          // Finnish
          // 'å': 'a', duplicate see charMap/latin
          // 'Å': 'A', duplicate see charMap/latin
          ä: "a",
          // ok
          Ä: "A",
          // ok
          ö: "o",
          // ok
          Ö: "O"
          // ok
        },
        hu: {
          // Hungarian
          ä: "a",
          // ok
          Ä: "A",
          // ok
          // 'á': 'a', duplicate see charMap/latin
          // 'Á': 'A', duplicate see charMap/latin
          ö: "o",
          // ok
          Ö: "O",
          // ok
          // 'ő': 'o', duplicate see charMap/latin
          // 'Ő': 'O', duplicate see charMap/latin
          ü: "u",
          Ü: "U",
          ű: "u",
          Ű: "U"
        },
        lt: {
          // Lithuanian
          ą: "a",
          č: "c",
          ę: "e",
          ė: "e",
          į: "i",
          š: "s",
          ų: "u",
          ū: "u",
          ž: "z",
          Ą: "A",
          Č: "C",
          Ę: "E",
          Ė: "E",
          Į: "I",
          Š: "S",
          Ų: "U",
          Ū: "U"
        },
        lv: {
          // Latvian
          ā: "a",
          č: "c",
          ē: "e",
          ģ: "g",
          ī: "i",
          ķ: "k",
          ļ: "l",
          ņ: "n",
          š: "s",
          ū: "u",
          ž: "z",
          Ā: "A",
          Č: "C",
          Ē: "E",
          Ģ: "G",
          Ī: "i",
          Ķ: "k",
          Ļ: "L",
          Ņ: "N",
          Š: "S",
          Ū: "u",
          Ž: "Z"
        },
        pl: {
          // Polish
          ą: "a",
          ć: "c",
          ę: "e",
          ł: "l",
          ń: "n",
          ó: "o",
          ś: "s",
          ź: "z",
          ż: "z",
          Ą: "A",
          Ć: "C",
          Ę: "e",
          Ł: "L",
          Ń: "N",
          Ó: "O",
          Ś: "S",
          Ź: "Z",
          Ż: "Z"
        },
        sv: {
          // Swedish
          // 'å': 'a', duplicate see charMap/latin
          // 'Å': 'A', duplicate see charMap/latin
          ä: "a",
          // ok
          Ä: "A",
          // ok
          ö: "o",
          // ok
          Ö: "O"
          // ok
        },
        sk: {
          // Slovak
          ä: "a",
          Ä: "A"
        },
        sr: {
          // Serbian
          љ: "lj",
          њ: "nj",
          Љ: "Lj",
          Њ: "Nj",
          đ: "dj",
          Đ: "Dj"
        },
        tr: {
          // Turkish
          Ü: "U",
          Ö: "O",
          ü: "u",
          ö: "o"
        }
      }, u = {
        ar: {
          "∆": "delta",
          "∞": "la-nihaya",
          "♥": "hob",
          "&": "wa",
          "|": "aw",
          "<": "aqal-men",
          ">": "akbar-men",
          "∑": "majmou",
          "¤": "omla"
        },
        az: {},
        ca: {
          "∆": "delta",
          "∞": "infinit",
          "♥": "amor",
          "&": "i",
          "|": "o",
          "<": "menys que",
          ">": "mes que",
          "∑": "suma dels",
          "¤": "moneda"
        },
        cs: {
          "∆": "delta",
          "∞": "nekonecno",
          "♥": "laska",
          "&": "a",
          "|": "nebo",
          "<": "mensi nez",
          ">": "vetsi nez",
          "∑": "soucet",
          "¤": "mena"
        },
        de: {
          "∆": "delta",
          "∞": "unendlich",
          "♥": "Liebe",
          "&": "und",
          "|": "oder",
          "<": "kleiner als",
          ">": "groesser als",
          "∑": "Summe von",
          "¤": "Waehrung"
        },
        dv: {
          "∆": "delta",
          "∞": "kolunulaa",
          "♥": "loabi",
          "&": "aai",
          "|": "noonee",
          "<": "ah vure kuda",
          ">": "ah vure bodu",
          "∑": "jumula",
          "¤": "faisaa"
        },
        en: {
          "∆": "delta",
          "∞": "infinity",
          "♥": "love",
          "&": "and",
          "|": "or",
          "<": "less than",
          ">": "greater than",
          "∑": "sum",
          "¤": "currency"
        },
        es: {
          "∆": "delta",
          "∞": "infinito",
          "♥": "amor",
          "&": "y",
          "|": "u",
          "<": "menos que",
          ">": "mas que",
          "∑": "suma de los",
          "¤": "moneda"
        },
        fa: {
          "∆": "delta",
          "∞": "bi-nahayat",
          "♥": "eshgh",
          "&": "va",
          "|": "ya",
          "<": "kamtar-az",
          ">": "bishtar-az",
          "∑": "majmooe",
          "¤": "vahed"
        },
        fi: {
          "∆": "delta",
          "∞": "aarettomyys",
          "♥": "rakkaus",
          "&": "ja",
          "|": "tai",
          "<": "pienempi kuin",
          ">": "suurempi kuin",
          "∑": "summa",
          "¤": "valuutta"
        },
        fr: {
          "∆": "delta",
          "∞": "infiniment",
          "♥": "Amour",
          "&": "et",
          "|": "ou",
          "<": "moins que",
          ">": "superieure a",
          "∑": "somme des",
          "¤": "monnaie"
        },
        ge: {
          "∆": "delta",
          "∞": "usasruloba",
          "♥": "siqvaruli",
          "&": "da",
          "|": "an",
          "<": "naklebi",
          ">": "meti",
          "∑": "jami",
          "¤": "valuta"
        },
        gr: {},
        hu: {
          "∆": "delta",
          "∞": "vegtelen",
          "♥": "szerelem",
          "&": "es",
          "|": "vagy",
          "<": "kisebb mint",
          ">": "nagyobb mint",
          "∑": "szumma",
          "¤": "penznem"
        },
        it: {
          "∆": "delta",
          "∞": "infinito",
          "♥": "amore",
          "&": "e",
          "|": "o",
          "<": "minore di",
          ">": "maggiore di",
          "∑": "somma",
          "¤": "moneta"
        },
        lt: {
          "∆": "delta",
          "∞": "begalybe",
          "♥": "meile",
          "&": "ir",
          "|": "ar",
          "<": "maziau nei",
          ">": "daugiau nei",
          "∑": "suma",
          "¤": "valiuta"
        },
        lv: {
          "∆": "delta",
          "∞": "bezgaliba",
          "♥": "milestiba",
          "&": "un",
          "|": "vai",
          "<": "mazak neka",
          ">": "lielaks neka",
          "∑": "summa",
          "¤": "valuta"
        },
        my: {
          "∆": "kwahkhyaet",
          "∞": "asaonasme",
          "♥": "akhyait",
          "&": "nhin",
          "|": "tho",
          "<": "ngethaw",
          ">": "kyithaw",
          "∑": "paungld",
          "¤": "ngwekye"
        },
        mk: {},
        nl: {
          "∆": "delta",
          "∞": "oneindig",
          "♥": "liefde",
          "&": "en",
          "|": "of",
          "<": "kleiner dan",
          ">": "groter dan",
          "∑": "som",
          "¤": "valuta"
        },
        pl: {
          "∆": "delta",
          "∞": "nieskonczonosc",
          "♥": "milosc",
          "&": "i",
          "|": "lub",
          "<": "mniejsze niz",
          ">": "wieksze niz",
          "∑": "suma",
          "¤": "waluta"
        },
        pt: {
          "∆": "delta",
          "∞": "infinito",
          "♥": "amor",
          "&": "e",
          "|": "ou",
          "<": "menor que",
          ">": "maior que",
          "∑": "soma",
          "¤": "moeda"
        },
        ro: {
          "∆": "delta",
          "∞": "infinit",
          "♥": "dragoste",
          "&": "si",
          "|": "sau",
          "<": "mai mic ca",
          ">": "mai mare ca",
          "∑": "suma",
          "¤": "valuta"
        },
        ru: {
          "∆": "delta",
          "∞": "beskonechno",
          "♥": "lubov",
          "&": "i",
          "|": "ili",
          "<": "menshe",
          ">": "bolshe",
          "∑": "summa",
          "¤": "valjuta"
        },
        sk: {
          "∆": "delta",
          "∞": "nekonecno",
          "♥": "laska",
          "&": "a",
          "|": "alebo",
          "<": "menej ako",
          ">": "viac ako",
          "∑": "sucet",
          "¤": "mena"
        },
        sr: {},
        tr: {
          "∆": "delta",
          "∞": "sonsuzluk",
          "♥": "ask",
          "&": "ve",
          "|": "veya",
          "<": "kucuktur",
          ">": "buyuktur",
          "∑": "toplam",
          "¤": "para birimi"
        },
        uk: {
          "∆": "delta",
          "∞": "bezkinechnist",
          "♥": "lubov",
          "&": "i",
          "|": "abo",
          "<": "menshe",
          ">": "bilshe",
          "∑": "suma",
          "¤": "valjuta"
        },
        vn: {
          "∆": "delta",
          "∞": "vo cuc",
          "♥": "yeu",
          "&": "va",
          "|": "hoac",
          "<": "nho hon",
          ">": "lon hon",
          "∑": "tong",
          "¤": "tien te"
        }
      }, l = [";", "?", ":", "@", "&", "=", "+", "$", ",", "/"].join(""), d = [";", "?", ":", "@", "&", "=", "+", "$", ","].join(""), f = [".", "!", "~", "*", "'", "(", ")"].join(""), c = function(w, S) {
        var $ = "-", k = "", te = "", F = !0, J = {}, L, le, Z, P, x, z, ue, ve, ye, se, I, H, G, We, Ae = "";
        if (typeof w != "string")
          return "";
        if (typeof S == "string" && ($ = S), ue = u.en, ve = i.en, typeof S == "object") {
          L = S.maintainCase || !1, J = S.custom && typeof S.custom == "object" ? S.custom : J, Z = +S.truncate > 1 && S.truncate || !1, P = S.uric || !1, x = S.uricNoSlash || !1, z = S.mark || !1, F = !(S.symbols === !1 || S.lang === !1), $ = S.separator || $, P && (Ae += l), x && (Ae += d), z && (Ae += f), ue = S.lang && u[S.lang] && F ? u[S.lang] : F ? u.en : {}, ve = S.lang && i[S.lang] ? i[S.lang] : S.lang === !1 || S.lang === !0 ? {} : i.en, S.titleCase && typeof S.titleCase.length == "number" && Array.prototype.toString.call(S.titleCase) ? (S.titleCase.forEach(function(he) {
            J[he + ""] = he + "";
          }), le = !0) : le = !!S.titleCase, S.custom && typeof S.custom.length == "number" && Array.prototype.toString.call(S.custom) && S.custom.forEach(function(he) {
            J[he + ""] = he + "";
          }), Object.keys(J).forEach(function(he) {
            var Ce;
            he.length > 1 ? Ce = new RegExp("\\b" + _(he) + "\\b", "gi") : Ce = new RegExp(_(he), "gi"), w = w.replace(Ce, J[he]);
          });
          for (I in J)
            Ae += I;
        }
        for (Ae += $, Ae = _(Ae), w = w.replace(/(^\s+|\s+$)/g, ""), G = !1, We = !1, se = 0, H = w.length; se < H; se++)
          I = w[se], g(I, J) ? G = !1 : ve[I] ? (I = G && ve[I].match(/[A-Za-z0-9]/) ? " " + ve[I] : ve[I], G = !1) : I in o ? (se + 1 < H && r.indexOf(w[se + 1]) >= 0 ? (te += I, I = "") : We === !0 ? (I = s[te] + o[I], te = "") : I = G && o[I].match(/[A-Za-z0-9]/) ? " " + o[I] : o[I], G = !1, We = !1) : I in s ? (te += I, I = "", se === H - 1 && (I = s[te]), We = !0) : /* process symbol chars */ ue[I] && !(P && l.indexOf(I) !== -1) && !(x && d.indexOf(I) !== -1) ? (I = G || k.substr(-1).match(/[A-Za-z0-9]/) ? $ + ue[I] : ue[I], I += w[se + 1] !== void 0 && w[se + 1].match(/[A-Za-z0-9]/) ? $ : "", G = !0) : (We === !0 ? (I = s[te] + I, te = "", We = !1) : G && (/[A-Za-z0-9]/.test(I) || k.substr(-1).match(/A-Za-z0-9]/)) && (I = " " + I), G = !1), k += I.replace(new RegExp("[^\\w\\s" + Ae + "_-]", "g"), $);
        return le && (k = k.replace(/(\w)(\S*)/g, function(he, Ce, Lt) {
          var on = Ce.toUpperCase() + (Lt !== null ? Lt : "");
          return Object.keys(J).indexOf(on.toLowerCase()) < 0 ? on : on.toLowerCase();
        })), k = k.replace(/\s+/g, $).replace(new RegExp("\\" + $ + "+", "g"), $).replace(new RegExp("(^\\" + $ + "+|\\" + $ + "+$)", "g"), ""), Z && k.length > Z && (ye = k.charAt(Z) === $, k = k.slice(0, Z), ye || (k = k.slice(0, k.lastIndexOf($)))), !L && !le && (k = k.toLowerCase()), k;
      }, h = function(w) {
        return function($) {
          return c($, w);
        };
      }, _ = function(w) {
        return w.replace(/[-\\^$*+?.()|[\]{}\/]/g, "\\$&");
      }, g = function(b, w) {
        for (var S in w)
          if (w[S] === b)
            return !0;
      };
      if (typeof t < "u" && t.exports)
        t.exports = c, t.exports.createSlug = h;
      else if (typeof define < "u" && define.amd)
        define([], function() {
          return c;
        });
      else
        try {
          if (n.getSlug || n.createSlug)
            throw "speakingurl: globals exists /(getSlug|createSlug)/";
          n.getSlug = c, n.createSlug = h;
        } catch {
        }
    })(e);
  }
}), np = Nl({
  "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/index.js"(e, t) {
    y(), t.exports = tp();
  }
});
y();
y();
y();
y();
y();
y();
y();
y();
function op(e) {
  var t;
  const n = e.name || e._componentTag || e.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ || e.__name;
  return n === "index" && ((t = e.__file) != null && t.endsWith("index.vue")) ? "" : n;
}
function rp(e) {
  const t = e.__file;
  if (t)
    return Md(Ud(t, ".vue"));
}
function Zs(e, t) {
  return e.type.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ = t, t;
}
function Xr(e) {
  if (e.__VUE_DEVTOOLS_NEXT_APP_RECORD__)
    return e.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
  if (e.root)
    return e.appContext.app.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
}
function Dl(e) {
  var t, n;
  const o = (t = e.subTree) == null ? void 0 : t.type, r = Xr(e);
  return r ? ((n = r?.types) == null ? void 0 : n.Fragment) === o : !1;
}
function ko(e) {
  var t, n, o;
  const r = op(e?.type || {});
  if (r)
    return r;
  if (e?.root === e)
    return "Root";
  for (const i in (n = (t = e.parent) == null ? void 0 : t.type) == null ? void 0 : n.components)
    if (e.parent.type.components[i] === e?.type)
      return Zs(e, i);
  for (const i in (o = e.appContext) == null ? void 0 : o.components)
    if (e.appContext.components[i] === e?.type)
      return Zs(e, i);
  const s = rp(e?.type || {});
  return s || "Anonymous Component";
}
function sp(e) {
  var t, n, o;
  const r = (o = (n = (t = e?.appContext) == null ? void 0 : t.app) == null ? void 0 : n.__VUE_DEVTOOLS_NEXT_APP_RECORD_ID__) != null ? o : 0, s = e === e?.root ? "root" : e.uid;
  return `${r}:${s}`;
}
function Er(e, t) {
  return t = t || `${e.id}:root`, e.instanceMap.get(t) || e.instanceMap.get(":root");
}
function ip() {
  const e = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    get width() {
      return e.right - e.left;
    },
    get height() {
      return e.bottom - e.top;
    }
  };
  return e;
}
var Gn;
function up(e) {
  return Gn || (Gn = document.createRange()), Gn.selectNode(e), Gn.getBoundingClientRect();
}
function lp(e) {
  const t = ip();
  if (!e.children)
    return t;
  for (let n = 0, o = e.children.length; n < o; n++) {
    const r = e.children[n];
    let s;
    if (r.component)
      s = Ft(r.component);
    else if (r.el) {
      const i = r.el;
      i.nodeType === 1 || i.getBoundingClientRect ? s = i.getBoundingClientRect() : i.nodeType === 3 && i.data.trim() && (s = up(i));
    }
    s && cp(t, s);
  }
  return t;
}
function cp(e, t) {
  return (!e.top || t.top < e.top) && (e.top = t.top), (!e.bottom || t.bottom > e.bottom) && (e.bottom = t.bottom), (!e.left || t.left < e.left) && (e.left = t.left), (!e.right || t.right > e.right) && (e.right = t.right), e;
}
var Qs = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: 0,
  height: 0
};
function Ft(e) {
  const t = e.subTree.el;
  return typeof window > "u" ? Qs : Dl(e) ? lp(e.subTree) : t?.nodeType === 1 ? t?.getBoundingClientRect() : e.subTree.component ? Ft(e.subTree.component) : Qs;
}
y();
function Zr(e) {
  return Dl(e) ? ap(e.subTree) : e.subTree ? [e.subTree.el] : [];
}
function ap(e) {
  if (!e.children)
    return [];
  const t = [];
  return e.children.forEach((n) => {
    n.component ? t.push(...Zr(n.component)) : n?.el && t.push(n.el);
  }), t;
}
var Sl = "__vue-devtools-component-inspector__", Al = "__vue-devtools-component-inspector__card__", Cl = "__vue-devtools-component-inspector__name__", wl = "__vue-devtools-component-inspector__indicator__", Tl = {
  display: "block",
  zIndex: 2147483640,
  position: "fixed",
  backgroundColor: "#42b88325",
  border: "1px solid #42b88350",
  borderRadius: "5px",
  transition: "all 0.1s ease-in",
  pointerEvents: "none"
}, fp = {
  fontFamily: "Arial, Helvetica, sans-serif",
  padding: "5px 8px",
  borderRadius: "4px",
  textAlign: "left",
  position: "absolute",
  left: 0,
  color: "#e9e9e9",
  fontSize: "14px",
  fontWeight: 600,
  lineHeight: "24px",
  backgroundColor: "#42b883",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
}, dp = {
  display: "inline-block",
  fontWeight: 400,
  fontStyle: "normal",
  fontSize: "12px",
  opacity: 0.7
};
function tn() {
  return document.getElementById(Sl);
}
function pp() {
  return document.getElementById(Al);
}
function hp() {
  return document.getElementById(wl);
}
function _p() {
  return document.getElementById(Cl);
}
function Qr(e) {
  return {
    left: `${Math.round(e.left * 100) / 100}px`,
    top: `${Math.round(e.top * 100) / 100}px`,
    width: `${Math.round(e.width * 100) / 100}px`,
    height: `${Math.round(e.height * 100) / 100}px`
  };
}
function es(e) {
  var t;
  const n = document.createElement("div");
  n.id = (t = e.elementId) != null ? t : Sl, Object.assign(n.style, {
    ...Tl,
    ...Qr(e.bounds),
    ...e.style
  });
  const o = document.createElement("span");
  o.id = Al, Object.assign(o.style, {
    ...fp,
    top: e.bounds.top < 35 ? 0 : "-35px"
  });
  const r = document.createElement("span");
  r.id = Cl, r.innerHTML = `&lt;${e.name}&gt;&nbsp;&nbsp;`;
  const s = document.createElement("i");
  return s.id = wl, s.innerHTML = `${Math.round(e.bounds.width * 100) / 100} x ${Math.round(e.bounds.height * 100) / 100}`, Object.assign(s.style, dp), o.appendChild(r), o.appendChild(s), n.appendChild(o), document.body.appendChild(n), n;
}
function ts(e) {
  const t = tn(), n = pp(), o = _p(), r = hp();
  t && (Object.assign(t.style, {
    ...Tl,
    ...Qr(e.bounds)
  }), Object.assign(n.style, {
    top: e.bounds.top < 35 ? 0 : "-35px"
  }), o.innerHTML = `&lt;${e.name}&gt;&nbsp;&nbsp;`, r.innerHTML = `${Math.round(e.bounds.width * 100) / 100} x ${Math.round(e.bounds.height * 100) / 100}`);
}
function Ep(e) {
  const t = Ft(e);
  if (!t.width && !t.height)
    return;
  const n = ko(e);
  tn() ? ts({ bounds: t, name: n }) : es({ bounds: t, name: n });
}
function Vl() {
  const e = tn();
  e && (e.style.display = "none");
}
var gr = null;
function mr(e) {
  const t = e.target;
  if (t) {
    const n = t.__vueParentComponent;
    if (n && (gr = n, n.vnode.el)) {
      const r = Ft(n), s = ko(n);
      tn() ? ts({ bounds: r, name: s }) : es({ bounds: r, name: s });
    }
  }
}
function gp(e, t) {
  if (e.preventDefault(), e.stopPropagation(), gr) {
    const n = sp(gr);
    t(n);
  }
}
var yo = null;
function mp() {
  Vl(), window.removeEventListener("mouseover", mr), window.removeEventListener("click", yo, !0), yo = null;
}
function vp() {
  return window.addEventListener("mouseover", mr), new Promise((e) => {
    function t(n) {
      n.preventDefault(), n.stopPropagation(), gp(n, (o) => {
        window.removeEventListener("click", t, !0), yo = null, window.removeEventListener("mouseover", mr);
        const r = tn();
        r && (r.style.display = "none"), e(JSON.stringify({ id: o }));
      });
    }
    yo = t, window.addEventListener("click", t, !0);
  });
}
function yp(e) {
  const t = Er(Se.value, e.id);
  if (t) {
    const [n] = Zr(t);
    if (typeof n.scrollIntoView == "function")
      n.scrollIntoView({
        behavior: "smooth"
      });
    else {
      const o = Ft(t), r = document.createElement("div"), s = {
        ...Qr(o),
        position: "absolute"
      };
      Object.assign(r.style, s), document.body.appendChild(r), r.scrollIntoView({
        behavior: "smooth"
      }), setTimeout(() => {
        document.body.removeChild(r);
      }, 2e3);
    }
    setTimeout(() => {
      const o = Ft(t);
      if (o.width || o.height) {
        const r = ko(t), s = tn();
        s ? ts({ ...e, name: r, bounds: o }) : es({ ...e, name: r, bounds: o }), setTimeout(() => {
          s && (s.style.display = "none");
        }, 1500);
      }
    }, 1200);
  }
}
y();
var ei, ti;
(ti = (ei = R).__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__) != null || (ei.__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__ = !0);
function bp(e) {
  let t = 0;
  const n = setInterval(() => {
    R.__VUE_INSPECTOR__ && (clearInterval(n), t += 30, e()), t >= /* 5s */
    5e3 && clearInterval(n);
  }, 30);
}
function Op() {
  const e = R.__VUE_INSPECTOR__, t = e.openInEditor;
  e.openInEditor = async (...n) => {
    e.disable(), t(...n);
  };
}
function Np() {
  return new Promise((e) => {
    function t() {
      Op(), e(R.__VUE_INSPECTOR__);
    }
    R.__VUE_INSPECTOR__ ? t() : bp(() => {
      t();
    });
  });
}
y();
y();
function Dp(e) {
  return !!(e && e.__v_isReadonly);
}
function xl(e) {
  return Dp(e) ? xl(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Jo(e) {
  return !!(e && e.__v_isRef === !0);
}
function hn(e) {
  const t = e && e.__v_raw;
  return t ? hn(t) : e;
}
var Sp = class {
  constructor() {
    this.refEditor = new Ap();
  }
  set(e, t, n, o) {
    const r = Array.isArray(t) ? t : t.split(".");
    for (; r.length > 1; ) {
      const u = r.shift();
      e instanceof Map ? e = e.get(u) : e instanceof Set ? e = Array.from(e.values())[u] : e = e[u], this.refEditor.isRef(e) && (e = this.refEditor.get(e));
    }
    const s = r[0], i = this.refEditor.get(e)[s];
    o ? o(e, s, n) : this.refEditor.isRef(i) ? this.refEditor.set(i, n) : e[s] = n;
  }
  get(e, t) {
    const n = Array.isArray(t) ? t : t.split(".");
    for (let o = 0; o < n.length; o++)
      if (e instanceof Map ? e = e.get(n[o]) : e = e[n[o]], this.refEditor.isRef(e) && (e = this.refEditor.get(e)), !e)
        return;
    return e;
  }
  has(e, t, n = !1) {
    if (typeof e > "u")
      return !1;
    const o = Array.isArray(t) ? t.slice() : t.split("."), r = n ? 2 : 1;
    for (; e && o.length > r; ) {
      const s = o.shift();
      e = e[s], this.refEditor.isRef(e) && (e = this.refEditor.get(e));
    }
    return e != null && Object.prototype.hasOwnProperty.call(e, o[0]);
  }
  createDefaultSetCallback(e) {
    return (t, n, o) => {
      if ((e.remove || e.newKey) && (Array.isArray(t) ? t.splice(n, 1) : hn(t) instanceof Map ? t.delete(n) : hn(t) instanceof Set ? t.delete(Array.from(t.values())[n]) : Reflect.deleteProperty(t, n)), !e.remove) {
        const r = t[e.newKey || n];
        this.refEditor.isRef(r) ? this.refEditor.set(r, o) : hn(t) instanceof Map ? t.set(e.newKey || n, o) : hn(t) instanceof Set ? t.add(o) : t[e.newKey || n] = o;
      }
    };
  }
}, Ap = class {
  set(e, t) {
    if (Jo(e))
      e.value = t;
    else {
      if (e instanceof Set && Array.isArray(t)) {
        e.clear(), t.forEach((r) => e.add(r));
        return;
      }
      const n = Object.keys(t);
      if (e instanceof Map) {
        const r = new Set(e.keys());
        n.forEach((s) => {
          e.set(s, Reflect.get(t, s)), r.delete(s);
        }), r.forEach((s) => e.delete(s));
        return;
      }
      const o = new Set(Object.keys(e));
      n.forEach((r) => {
        Reflect.set(e, r, Reflect.get(t, r)), o.delete(r);
      }), o.forEach((r) => Reflect.deleteProperty(e, r));
    }
  }
  get(e) {
    return Jo(e) ? e.value : e;
  }
  isRef(e) {
    return Jo(e) || xl(e);
  }
};
y();
y();
y();
var Cp = "__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS_STATE__";
function wp() {
  if (!vl || typeof localStorage > "u" || localStorage === null)
    return {
      recordingState: !1,
      mouseEventEnabled: !1,
      keyboardEventEnabled: !1,
      componentEventEnabled: !1,
      performanceEventEnabled: !1,
      selected: ""
    };
  const e = localStorage.getItem(Cp);
  return e ? JSON.parse(e) : {
    recordingState: !1,
    mouseEventEnabled: !1,
    keyboardEventEnabled: !1,
    componentEventEnabled: !1,
    performanceEventEnabled: !1,
    selected: ""
  };
}
y();
y();
y();
var ni, oi;
(oi = (ni = R).__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS) != null || (ni.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS = []);
var Tp = new Proxy(R.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS, {
  get(e, t, n) {
    return Reflect.get(e, t, n);
  }
});
function Vp(e, t) {
  pe.timelineLayersState[t.id] = !1, Tp.push({
    ...e,
    descriptorId: t.id,
    appRecord: Xr(t.app)
  });
}
var ri, si;
(si = (ri = R).__VUE_DEVTOOLS_KIT_INSPECTOR__) != null || (ri.__VUE_DEVTOOLS_KIT_INSPECTOR__ = []);
var ns = new Proxy(R.__VUE_DEVTOOLS_KIT_INSPECTOR__, {
  get(e, t, n) {
    return Reflect.get(e, t, n);
  }
}), Il = Jt(() => {
  nn.hooks.callHook("sendInspectorToClient", Pl());
});
function xp(e, t) {
  var n, o;
  ns.push({
    options: e,
    descriptor: t,
    treeFilterPlaceholder: (n = e.treeFilterPlaceholder) != null ? n : "Search tree...",
    stateFilterPlaceholder: (o = e.stateFilterPlaceholder) != null ? o : "Search state...",
    treeFilter: "",
    selectedNodeId: "",
    appRecord: Xr(t.app)
  }), Il();
}
function Pl() {
  return ns.filter((e) => e.descriptor.app === Se.value.app).filter((e) => e.descriptor.id !== "components").map((e) => {
    var t;
    const n = e.descriptor, o = e.options;
    return {
      id: o.id,
      label: o.label,
      logo: n.logo,
      icon: `custom-ic-baseline-${(t = o?.icon) == null ? void 0 : t.replace(/_/g, "-")}`,
      packageName: n.packageName,
      homepage: n.homepage,
      pluginId: n.id
    };
  });
}
function to(e, t) {
  return ns.find((n) => n.options.id === e && (t ? n.descriptor.app === t : !0));
}
function Ip() {
  const e = bl();
  e.hook("addInspector", ({ inspector: o, plugin: r }) => {
    xp(o, r.descriptor);
  });
  const t = Jt(async ({ inspectorId: o, plugin: r }) => {
    var s;
    if (!o || !((s = r?.descriptor) != null && s.app) || pe.highPerfModeEnabled)
      return;
    const i = to(o, r.descriptor.app), u = {
      app: r.descriptor.app,
      inspectorId: o,
      filter: i?.treeFilter || "",
      rootNodes: []
    };
    await new Promise((l) => {
      e.callHookWith(
        async (d) => {
          await Promise.all(d.map((f) => f(u))), l();
        },
        "getInspectorTree"
        /* GET_INSPECTOR_TREE */
      );
    }), e.callHookWith(
      async (l) => {
        await Promise.all(l.map((d) => d({
          inspectorId: o,
          rootNodes: u.rootNodes
        })));
      },
      "sendInspectorTreeToClient"
      /* SEND_INSPECTOR_TREE_TO_CLIENT */
    );
  }, 120);
  e.hook("sendInspectorTree", t);
  const n = Jt(async ({ inspectorId: o, plugin: r }) => {
    var s;
    if (!o || !((s = r?.descriptor) != null && s.app) || pe.highPerfModeEnabled)
      return;
    const i = to(o, r.descriptor.app), u = {
      app: r.descriptor.app,
      inspectorId: o,
      nodeId: i?.selectedNodeId || "",
      state: null
    }, l = {
      currentTab: `custom-inspector:${o}`
    };
    u.nodeId && await new Promise((d) => {
      e.callHookWith(
        async (f) => {
          await Promise.all(f.map((c) => c(u, l))), d();
        },
        "getInspectorState"
        /* GET_INSPECTOR_STATE */
      );
    }), e.callHookWith(
      async (d) => {
        await Promise.all(d.map((f) => f({
          inspectorId: o,
          nodeId: u.nodeId,
          state: u.state
        })));
      },
      "sendInspectorStateToClient"
      /* SEND_INSPECTOR_STATE_TO_CLIENT */
    );
  }, 120);
  return e.hook("sendInspectorState", n), e.hook("customInspectorSelectNode", ({ inspectorId: o, nodeId: r, plugin: s }) => {
    const i = to(o, s.descriptor.app);
    i && (i.selectedNodeId = r);
  }), e.hook("timelineLayerAdded", ({ options: o, plugin: r }) => {
    Vp(o, r.descriptor);
  }), e.hook("timelineEventAdded", ({ options: o, plugin: r }) => {
    var s;
    const i = ["performance", "component-event", "keyboard", "mouse"];
    pe.highPerfModeEnabled || !((s = pe.timelineLayersState) != null && s[r.descriptor.id]) && !i.includes(o.layerId) || e.callHookWith(
      async (u) => {
        await Promise.all(u.map((l) => l(o)));
      },
      "sendTimelineEventToClient"
      /* SEND_TIMELINE_EVENT_TO_CLIENT */
    );
  }), e.hook("getComponentInstances", async ({ app: o }) => {
    const r = o.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
    if (!r)
      return null;
    const s = r.id.toString();
    return [...r.instanceMap].filter(([u]) => u.split(":")[0] === s).map(([, u]) => u);
  }), e.hook("getComponentBounds", async ({ instance: o }) => Ft(o)), e.hook("getComponentName", ({ instance: o }) => ko(o)), e.hook("componentHighlight", ({ uid: o }) => {
    const r = Se.value.instanceMap.get(o);
    r && Ep(r);
  }), e.hook("componentUnhighlight", () => {
    Vl();
  }), e;
}
var ii, ui;
(ui = (ii = R).__VUE_DEVTOOLS_KIT_APP_RECORDS__) != null || (ii.__VUE_DEVTOOLS_KIT_APP_RECORDS__ = []);
var li, ci;
(ci = (li = R).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__) != null || (li.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = {});
var ai, fi;
(fi = (ai = R).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__) != null || (ai.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = "");
var di, pi;
(pi = (di = R).__VUE_DEVTOOLS_KIT_CUSTOM_TABS__) != null || (di.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ = []);
var hi, _i;
(_i = (hi = R).__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__) != null || (hi.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ = []);
var Vt = "__VUE_DEVTOOLS_KIT_GLOBAL_STATE__";
function Pp() {
  return {
    connected: !1,
    clientConnected: !1,
    vitePluginDetected: !0,
    appRecords: [],
    activeAppRecordId: "",
    tabs: [],
    commands: [],
    highPerfModeEnabled: !0,
    devtoolsClientDetected: {},
    perfUniqueGroupId: 0,
    timelineLayersState: wp()
  };
}
var Ei, gi;
(gi = (Ei = R)[Vt]) != null || (Ei[Vt] = Pp());
var Rp = Jt((e) => {
  nn.hooks.callHook("devtoolsStateUpdated", { state: e });
});
Jt((e, t) => {
  nn.hooks.callHook("devtoolsConnectedUpdated", { state: e, oldState: t });
});
var Fo = new Proxy(R.__VUE_DEVTOOLS_KIT_APP_RECORDS__, {
  get(e, t, n) {
    return t === "value" ? R.__VUE_DEVTOOLS_KIT_APP_RECORDS__ : R.__VUE_DEVTOOLS_KIT_APP_RECORDS__[t];
  }
}), Se = new Proxy(R.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__, {
  get(e, t, n) {
    return t === "value" ? R.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ : t === "id" ? R.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ : R.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__[t];
  }
});
function Rl() {
  Rp({
    ...R[Vt],
    appRecords: Fo.value,
    activeAppRecordId: Se.id,
    tabs: R.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__,
    commands: R.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__
  });
}
function kp(e) {
  R.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = e, Rl();
}
function Fp(e) {
  R.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = e, Rl();
}
var pe = new Proxy(R[Vt], {
  get(e, t) {
    return t === "appRecords" ? Fo : t === "activeAppRecordId" ? Se.id : t === "tabs" ? R.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ : t === "commands" ? R.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ : R[Vt][t];
  },
  deleteProperty(e, t) {
    return delete e[t], !0;
  },
  set(e, t, n) {
    return { ...R[Vt] }, e[t] = n, R[Vt][t] = n, !0;
  }
});
function $p(e = {}) {
  var t, n, o;
  const { file: r, host: s, baseUrl: i = window.location.origin, line: u = 0, column: l = 0 } = e;
  if (r) {
    if (s === "chrome-extension") {
      const d = r.replace(/\\/g, "\\\\"), f = (n = (t = window.VUE_DEVTOOLS_CONFIG) == null ? void 0 : t.openInEditorHost) != null ? n : "/";
      fetch(`${f}__open-in-editor?file=${encodeURI(r)}`).then((c) => {
        if (!c.ok) {
          const h = `Opening component ${d} failed`;
          // console.log(`%c${h}`, "color:red");
        }
      });
    } else if (pe.vitePluginDetected) {
      const d = (o = R.__VUE_DEVTOOLS_OPEN_IN_EDITOR_BASE_URL__) != null ? o : i;
      R.__VUE_INSPECTOR__.openInEditor(d, r, u, l);
    }
  }
}
y();
y();
y();
y();
y();
var mi, vi;
(vi = (mi = R).__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__) != null || (mi.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__ = []);
var os = new Proxy(R.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__, {
  get(e, t, n) {
    return Reflect.get(e, t, n);
  }
});
function vr(e) {
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = e[n].defaultValue;
  }), t;
}
function rs(e) {
  return `__VUE_DEVTOOLS_NEXT_PLUGIN_SETTINGS__${e}__`;
}
function Lp(e) {
  var t, n, o;
  const r = (n = (t = os.find((s) => {
    var i;
    return s[0].id === e && !!((i = s[0]) != null && i.settings);
  })) == null ? void 0 : t[0]) != null ? n : null;
  return (o = r?.settings) != null ? o : null;
}
function kl(e, t) {
  var n, o, r;
  const s = rs(e);
  if (s) {
    const i = localStorage.getItem(s);
    if (i)
      return JSON.parse(i);
  }
  if (e) {
    const i = (o = (n = os.find((u) => u[0].id === e)) == null ? void 0 : n[0]) != null ? o : null;
    return vr((r = i?.settings) != null ? r : {});
  }
  return vr(t);
}
function Mp(e, t) {
  const n = rs(e);
  localStorage.getItem(n) || localStorage.setItem(n, JSON.stringify(vr(t)));
}
function Up(e, t, n) {
  const o = rs(e), r = localStorage.getItem(o), s = JSON.parse(r || "{}"), i = {
    ...s,
    [t]: n
  };
  localStorage.setItem(o, JSON.stringify(i)), nn.hooks.callHookWith(
    (u) => {
      u.forEach((l) => l({
        pluginId: e,
        key: t,
        oldValue: s[t],
        newValue: n,
        settings: i
      }));
    },
    "setPluginSettings"
    /* SET_PLUGIN_SETTINGS */
  );
}
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
var yi, bi, Ie = (bi = (yi = R).__VUE_DEVTOOLS_HOOK) != null ? bi : yi.__VUE_DEVTOOLS_HOOK = bl(), Bp = {
  vueAppInit(e) {
    Ie.hook("app:init", e);
  },
  vueAppUnmount(e) {
    Ie.hook("app:unmount", e);
  },
  vueAppConnected(e) {
    Ie.hook("app:connected", e);
  },
  componentAdded(e) {
    return Ie.hook("component:added", e);
  },
  componentEmit(e) {
    return Ie.hook("component:emit", e);
  },
  componentUpdated(e) {
    return Ie.hook("component:updated", e);
  },
  componentRemoved(e) {
    return Ie.hook("component:removed", e);
  },
  setupDevtoolsPlugin(e) {
    Ie.hook("devtools-plugin:setup", e);
  },
  perfStart(e) {
    return Ie.hook("perf:start", e);
  },
  perfEnd(e) {
    return Ie.hook("perf:end", e);
  }
}, Fl = {
  on: Bp,
  setupDevToolsPlugin(e, t) {
    return Ie.callHook("devtools-plugin:setup", e, t);
  }
}, jp = class {
  constructor({ plugin: e, ctx: t }) {
    this.hooks = t.hooks, this.plugin = e;
  }
  get on() {
    return {
      // component inspector
      visitComponentTree: (e) => {
        this.hooks.hook("visitComponentTree", e);
      },
      inspectComponent: (e) => {
        this.hooks.hook("inspectComponent", e);
      },
      editComponentState: (e) => {
        this.hooks.hook("editComponentState", e);
      },
      // custom inspector
      getInspectorTree: (e) => {
        this.hooks.hook("getInspectorTree", e);
      },
      getInspectorState: (e) => {
        this.hooks.hook("getInspectorState", e);
      },
      editInspectorState: (e) => {
        this.hooks.hook("editInspectorState", e);
      },
      // timeline
      inspectTimelineEvent: (e) => {
        this.hooks.hook("inspectTimelineEvent", e);
      },
      timelineCleared: (e) => {
        this.hooks.hook("timelineCleared", e);
      },
      // settings
      setPluginSettings: (e) => {
        this.hooks.hook("setPluginSettings", e);
      }
    };
  }
  // component inspector
  notifyComponentUpdate(e) {
    var t;
    if (pe.highPerfModeEnabled)
      return;
    const n = Pl().find((o) => o.packageName === this.plugin.descriptor.packageName);
    if (n?.id) {
      if (e) {
        const o = [
          e.appContext.app,
          e.uid,
          (t = e.parent) == null ? void 0 : t.uid,
          e
        ];
        Ie.callHook("component:updated", ...o);
      } else
        Ie.callHook(
          "component:updated"
          /* COMPONENT_UPDATED */
        );
      this.hooks.callHook("sendInspectorState", { inspectorId: n.id, plugin: this.plugin });
    }
  }
  // custom inspector
  addInspector(e) {
    this.hooks.callHook("addInspector", { inspector: e, plugin: this.plugin }), this.plugin.descriptor.settings && Mp(e.id, this.plugin.descriptor.settings);
  }
  sendInspectorTree(e) {
    pe.highPerfModeEnabled || this.hooks.callHook("sendInspectorTree", { inspectorId: e, plugin: this.plugin });
  }
  sendInspectorState(e) {
    pe.highPerfModeEnabled || this.hooks.callHook("sendInspectorState", { inspectorId: e, plugin: this.plugin });
  }
  selectInspectorNode(e, t) {
    this.hooks.callHook("customInspectorSelectNode", { inspectorId: e, nodeId: t, plugin: this.plugin });
  }
  visitComponentTree(e) {
    return this.hooks.callHook("visitComponentTree", e);
  }
  // timeline
  now() {
    return pe.highPerfModeEnabled ? 0 : Date.now();
  }
  addTimelineLayer(e) {
    this.hooks.callHook("timelineLayerAdded", { options: e, plugin: this.plugin });
  }
  addTimelineEvent(e) {
    pe.highPerfModeEnabled || this.hooks.callHook("timelineEventAdded", { options: e, plugin: this.plugin });
  }
  // settings
  getSettings(e) {
    return kl(e ?? this.plugin.descriptor.id, this.plugin.descriptor.settings);
  }
  // utilities
  getComponentInstances(e) {
    return this.hooks.callHook("getComponentInstances", { app: e });
  }
  getComponentBounds(e) {
    return this.hooks.callHook("getComponentBounds", { instance: e });
  }
  getComponentName(e) {
    return this.hooks.callHook("getComponentName", { instance: e });
  }
  highlightElement(e) {
    const t = e.__VUE_DEVTOOLS_NEXT_UID__;
    return this.hooks.callHook("componentHighlight", { uid: t });
  }
  unhighlightElement() {
    return this.hooks.callHook(
      "componentUnhighlight"
      /* COMPONENT_UNHIGHLIGHT */
    );
  }
}, Hp = jp;
y();
y();
y();
y();
var Kp = "__vue_devtool_undefined__", Wp = "__vue_devtool_infinity__", zp = "__vue_devtool_negative_infinity__", Gp = "__vue_devtool_nan__";
y();
y();
var qp = {
  [Kp]: "undefined",
  [Gp]: "NaN",
  [Wp]: "Infinity",
  [zp]: "-Infinity"
};
Object.entries(qp).reduce((e, [t, n]) => (e[n] = t, e), {});
y();
y();
y();
y();
y();
var Oi, Ni;
(Ni = (Oi = R).__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__) != null || (Oi.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__ = /* @__PURE__ */ new Set());
function $l(e, t) {
  return Fl.setupDevToolsPlugin(e, t);
}
function Yp(e, t) {
  const [n, o] = e;
  if (n.app !== t)
    return;
  const r = new Hp({
    plugin: {
      setupFn: o,
      descriptor: n
    },
    ctx: nn
  });
  n.packageName === "vuex" && r.on.editInspectorState((s) => {
    r.sendInspectorState(s.inspectorId);
  }), o(r);
}
function Ll(e, t) {
  R.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.has(e) || pe.highPerfModeEnabled && !t?.inspectingComponent || (R.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.add(e), os.forEach((n) => {
    Yp(n, e);
  }));
}
y();
y();
var xn = "__VUE_DEVTOOLS_ROUTER__", Xt = "__VUE_DEVTOOLS_ROUTER_INFO__", Di, Si;
(Si = (Di = R)[Xt]) != null || (Di[Xt] = {
  currentRoute: null,
  routes: []
});
var Ai, Ci;
(Ci = (Ai = R)[xn]) != null || (Ai[xn] = {});
new Proxy(R[Xt], {
  get(e, t) {
    return R[Xt][t];
  }
});
new Proxy(R[xn], {
  get(e, t) {
    if (t === "value")
      return R[xn];
  }
});
function Jp(e) {
  const t = /* @__PURE__ */ new Map();
  return (e?.getRoutes() || []).filter((n) => !t.has(n.path) && t.set(n.path, 1));
}
function ss(e) {
  return e.map((t) => {
    let { path: n, name: o, children: r, meta: s } = t;
    return r?.length && (r = ss(r)), {
      path: n,
      name: o,
      children: r,
      meta: s
    };
  });
}
function Xp(e) {
  if (e) {
    const { fullPath: t, hash: n, href: o, path: r, name: s, matched: i, params: u, query: l } = e;
    return {
      fullPath: t,
      hash: n,
      href: o,
      path: r,
      name: s,
      params: u,
      query: l,
      matched: ss(i)
    };
  }
  return e;
}
function Zp(e, t) {
  function n() {
    var o;
    const r = (o = e.app) == null ? void 0 : o.config.globalProperties.$router, s = Xp(r?.currentRoute.value), i = ss(Jp(r)), u = console.warn;
    console.warn = () => {
    }, R[Xt] = {
      currentRoute: s ? Xs(s) : {},
      routes: Xs(i)
    }, R[xn] = r, console.warn = u;
  }
  n(), Fl.on.componentUpdated(Jt(() => {
    var o;
    ((o = t.value) == null ? void 0 : o.app) === e.app && (n(), !pe.highPerfModeEnabled && nn.hooks.callHook("routerInfoUpdated", { state: R[Xt] }));
  }, 200));
}
function Qp(e) {
  return {
    // get inspector tree
    async getInspectorTree(t) {
      const n = {
        ...t,
        app: Se.value.app,
        rootNodes: []
      };
      return await new Promise((o) => {
        e.callHookWith(
          async (r) => {
            await Promise.all(r.map((s) => s(n))), o();
          },
          "getInspectorTree"
          /* GET_INSPECTOR_TREE */
        );
      }), n.rootNodes;
    },
    // get inspector state
    async getInspectorState(t) {
      const n = {
        ...t,
        app: Se.value.app,
        state: null
      }, o = {
        currentTab: `custom-inspector:${t.inspectorId}`
      };
      return await new Promise((r) => {
        e.callHookWith(
          async (s) => {
            await Promise.all(s.map((i) => i(n, o))), r();
          },
          "getInspectorState"
          /* GET_INSPECTOR_STATE */
        );
      }), n.state;
    },
    // edit inspector state
    editInspectorState(t) {
      const n = new Sp(), o = {
        ...t,
        app: Se.value.app,
        set: (r, s = t.path, i = t.state.value, u) => {
          n.set(r, s, i, u || n.createDefaultSetCallback(t.state));
        }
      };
      e.callHookWith(
        (r) => {
          r.forEach((s) => s(o));
        },
        "editInspectorState"
        /* EDIT_INSPECTOR_STATE */
      );
    },
    // send inspector state
    sendInspectorState(t) {
      const n = to(t);
      e.callHook("sendInspectorState", { inspectorId: t, plugin: {
        descriptor: n.descriptor,
        setupFn: () => ({})
      } });
    },
    // inspect component inspector
    inspectComponentInspector() {
      return vp();
    },
    // cancel inspect component inspector
    cancelInspectComponentInspector() {
      return mp();
    },
    // get component render code
    getComponentRenderCode(t) {
      const n = Er(Se.value, t);
      if (n)
        return typeof n?.type != "function" ? n.render.toString() : n.type.toString();
    },
    // scroll to component
    scrollToComponent(t) {
      return yp({ id: t });
    },
    // open in editor
    openInEditor: $p,
    // get vue inspector
    getVueInspector: Np,
    // toggle app
    toggleApp(t, n) {
      const o = Fo.value.find((r) => r.id === t);
      o && (Fp(t), kp(o), Zp(o, Se), Il(), Ll(o.app, n));
    },
    // inspect dom
    inspectDOM(t) {
      const n = Er(Se.value, t);
      if (n) {
        const [o] = Zr(n);
        o && (R.__VUE_DEVTOOLS_INSPECT_DOM_TARGET__ = o);
      }
    },
    updatePluginSettings(t, n, o) {
      Up(t, n, o);
    },
    getPluginSettings(t) {
      return {
        options: Lp(t),
        values: kl(t)
      };
    }
  };
}
y();
var wi, Ti;
(Ti = (wi = R).__VUE_DEVTOOLS_ENV__) != null || (wi.__VUE_DEVTOOLS_ENV__ = {
  vitePluginDetected: !1
});
var Vi = Ip(), xi, Ii;
(Ii = (xi = R).__VUE_DEVTOOLS_KIT_CONTEXT__) != null || (xi.__VUE_DEVTOOLS_KIT_CONTEXT__ = {
  hooks: Vi,
  get state() {
    return {
      ...pe,
      activeAppRecordId: Se.id,
      activeAppRecord: Se.value,
      appRecords: Fo.value
    };
  },
  api: Qp(Vi)
});
var nn = R.__VUE_DEVTOOLS_KIT_CONTEXT__;
y();
ep(np());
var Pi, Ri;
(Ri = (Pi = R).__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__) != null || (Pi.__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__ = {
  id: 0,
  appIds: /* @__PURE__ */ new Set()
});
y();
y();
function eh(e) {
  pe.highPerfModeEnabled = e ?? !pe.highPerfModeEnabled, !e && Se.value && Ll(Se.value.app);
}
y();
y();
y();
function th(e) {
  pe.devtoolsClientDetected = {
    ...pe.devtoolsClientDetected,
    ...e
  };
  const t = Object.values(pe.devtoolsClientDetected).some(Boolean);
  eh(!t);
}
var ki, Fi;
(Fi = (ki = R).__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__) != null || (ki.__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__ = th);
y();
y();
y();
y();
y();
y();
y();
var nh = class {
  constructor() {
    this.keyToValue = /* @__PURE__ */ new Map(), this.valueToKey = /* @__PURE__ */ new Map();
  }
  set(e, t) {
    this.keyToValue.set(e, t), this.valueToKey.set(t, e);
  }
  getByKey(e) {
    return this.keyToValue.get(e);
  }
  getByValue(e) {
    return this.valueToKey.get(e);
  }
  clear() {
    this.keyToValue.clear(), this.valueToKey.clear();
  }
}, Ml = class {
  constructor(e) {
    this.generateIdentifier = e, this.kv = new nh();
  }
  register(e, t) {
    this.kv.getByValue(e) || (t || (t = this.generateIdentifier(e)), this.kv.set(t, e));
  }
  clear() {
    this.kv.clear();
  }
  getIdentifier(e) {
    return this.kv.getByValue(e);
  }
  getValue(e) {
    return this.kv.getByKey(e);
  }
}, oh = class extends Ml {
  constructor() {
    super((e) => e.name), this.classToAllowedProps = /* @__PURE__ */ new Map();
  }
  register(e, t) {
    typeof t == "object" ? (t.allowProps && this.classToAllowedProps.set(e, t.allowProps), super.register(e, t.identifier)) : super.register(e, t);
  }
  getAllowedProps(e) {
    return this.classToAllowedProps.get(e);
  }
};
y();
y();
function rh(e) {
  if ("values" in Object)
    return Object.values(e);
  const t = [];
  for (const n in e)
    e.hasOwnProperty(n) && t.push(e[n]);
  return t;
}
function sh(e, t) {
  const n = rh(e);
  if ("find" in n)
    return n.find(t);
  const o = n;
  for (let r = 0; r < o.length; r++) {
    const s = o[r];
    if (t(s))
      return s;
  }
}
function Zt(e, t) {
  Object.entries(e).forEach(([n, o]) => t(o, n));
}
function no(e, t) {
  return e.indexOf(t) !== -1;
}
function $i(e, t) {
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    if (t(o))
      return o;
  }
}
var ih = class {
  constructor() {
    this.transfomers = {};
  }
  register(e) {
    this.transfomers[e.name] = e;
  }
  findApplicable(e) {
    return sh(this.transfomers, (t) => t.isApplicable(e));
  }
  findByName(e) {
    return this.transfomers[e];
  }
};
y();
y();
var uh = (e) => Object.prototype.toString.call(e).slice(8, -1), Ul = (e) => typeof e > "u", lh = (e) => e === null, In = (e) => typeof e != "object" || e === null || e === Object.prototype ? !1 : Object.getPrototypeOf(e) === null ? !0 : Object.getPrototypeOf(e) === Object.prototype, yr = (e) => In(e) && Object.keys(e).length === 0, Dt = (e) => Array.isArray(e), ch = (e) => typeof e == "string", ah = (e) => typeof e == "number" && !isNaN(e), fh = (e) => typeof e == "boolean", dh = (e) => e instanceof RegExp, Pn = (e) => e instanceof Map, Rn = (e) => e instanceof Set, Bl = (e) => uh(e) === "Symbol", ph = (e) => e instanceof Date && !isNaN(e.valueOf()), hh = (e) => e instanceof Error, Li = (e) => typeof e == "number" && isNaN(e), _h = (e) => fh(e) || lh(e) || Ul(e) || ah(e) || ch(e) || Bl(e), Eh = (e) => typeof e == "bigint", gh = (e) => e === 1 / 0 || e === -1 / 0, mh = (e) => ArrayBuffer.isView(e) && !(e instanceof DataView), vh = (e) => e instanceof URL;
y();
var jl = (e) => e.replace(/\./g, "\\."), Xo = (e) => e.map(String).map(jl).join("."), Dn = (e) => {
  const t = [];
  let n = "";
  for (let r = 0; r < e.length; r++) {
    let s = e.charAt(r);
    if (s === "\\" && e.charAt(r + 1) === ".") {
      n += ".", r++;
      continue;
    }
    if (s === ".") {
      t.push(n), n = "";
      continue;
    }
    n += s;
  }
  const o = n;
  return t.push(o), t;
};
y();
function Je(e, t, n, o) {
  return {
    isApplicable: e,
    annotation: t,
    transform: n,
    untransform: o
  };
}
var Hl = [
  Je(Ul, "undefined", () => null, () => {
  }),
  Je(Eh, "bigint", (e) => e.toString(), (e) => typeof BigInt < "u" ? BigInt(e) : (console.error("Please add a BigInt polyfill."), e)),
  Je(ph, "Date", (e) => e.toISOString(), (e) => new Date(e)),
  Je(hh, "Error", (e, t) => {
    const n = {
      name: e.name,
      message: e.message
    };
    return t.allowedErrorProps.forEach((o) => {
      n[o] = e[o];
    }), n;
  }, (e, t) => {
    const n = new Error(e.message);
    return n.name = e.name, n.stack = e.stack, t.allowedErrorProps.forEach((o) => {
      n[o] = e[o];
    }), n;
  }),
  Je(dh, "regexp", (e) => "" + e, (e) => {
    const t = e.slice(1, e.lastIndexOf("/")), n = e.slice(e.lastIndexOf("/") + 1);
    return new RegExp(t, n);
  }),
  Je(
    Rn,
    "set",
    // (sets only exist in es6+)
    // eslint-disable-next-line es5/no-es6-methods
    (e) => [...e.values()],
    (e) => new Set(e)
  ),
  Je(Pn, "map", (e) => [...e.entries()], (e) => new Map(e)),
  Je((e) => Li(e) || gh(e), "number", (e) => Li(e) ? "NaN" : e > 0 ? "Infinity" : "-Infinity", Number),
  Je((e) => e === 0 && 1 / e === -1 / 0, "number", () => "-0", Number),
  Je(vh, "URL", (e) => e.toString(), (e) => new URL(e))
];
function $o(e, t, n, o) {
  return {
    isApplicable: e,
    annotation: t,
    transform: n,
    untransform: o
  };
}
var Kl = $o((e, t) => Bl(e) ? !!t.symbolRegistry.getIdentifier(e) : !1, (e, t) => ["symbol", t.symbolRegistry.getIdentifier(e)], (e) => e.description, (e, t, n) => {
  const o = n.symbolRegistry.getValue(t[1]);
  if (!o)
    throw new Error("Trying to deserialize unknown symbol");
  return o;
}), yh = [
  Int8Array,
  Uint8Array,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array,
  Uint8ClampedArray
].reduce((e, t) => (e[t.name] = t, e), {}), Wl = $o(mh, (e) => ["typed-array", e.constructor.name], (e) => [...e], (e, t) => {
  const n = yh[t[1]];
  if (!n)
    throw new Error("Trying to deserialize unknown typed array");
  return new n(e);
});
function zl(e, t) {
  return e?.constructor ? !!t.classRegistry.getIdentifier(e.constructor) : !1;
}
var Gl = $o(zl, (e, t) => ["class", t.classRegistry.getIdentifier(e.constructor)], (e, t) => {
  const n = t.classRegistry.getAllowedProps(e.constructor);
  if (!n)
    return { ...e };
  const o = {};
  return n.forEach((r) => {
    o[r] = e[r];
  }), o;
}, (e, t, n) => {
  const o = n.classRegistry.getValue(t[1]);
  if (!o)
    throw new Error(`Trying to deserialize unknown class '${t[1]}' - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564`);
  return Object.assign(Object.create(o.prototype), e);
}), ql = $o((e, t) => !!t.customTransformerRegistry.findApplicable(e), (e, t) => ["custom", t.customTransformerRegistry.findApplicable(e).name], (e, t) => t.customTransformerRegistry.findApplicable(e).serialize(e), (e, t, n) => {
  const o = n.customTransformerRegistry.findByName(t[1]);
  if (!o)
    throw new Error("Trying to deserialize unknown custom value");
  return o.deserialize(e);
}), bh = [Gl, Kl, ql, Wl], Mi = (e, t) => {
  const n = $i(bh, (r) => r.isApplicable(e, t));
  if (n)
    return {
      value: n.transform(e, t),
      type: n.annotation(e, t)
    };
  const o = $i(Hl, (r) => r.isApplicable(e, t));
  if (o)
    return {
      value: o.transform(e, t),
      type: o.annotation
    };
}, Yl = {};
Hl.forEach((e) => {
  Yl[e.annotation] = e;
});
var Oh = (e, t, n) => {
  if (Dt(t))
    switch (t[0]) {
      case "symbol":
        return Kl.untransform(e, t, n);
      case "class":
        return Gl.untransform(e, t, n);
      case "custom":
        return ql.untransform(e, t, n);
      case "typed-array":
        return Wl.untransform(e, t, n);
      default:
        throw new Error("Unknown transformation: " + t);
    }
  else {
    const o = Yl[t];
    if (!o)
      throw new Error("Unknown transformation: " + t);
    return o.untransform(e, n);
  }
};
y();
var Kt = (e, t) => {
  if (t > e.size)
    throw new Error("index out of bounds");
  const n = e.keys();
  for (; t > 0; )
    n.next(), t--;
  return n.next().value;
};
function Jl(e) {
  if (no(e, "__proto__"))
    throw new Error("__proto__ is not allowed as a property");
  if (no(e, "prototype"))
    throw new Error("prototype is not allowed as a property");
  if (no(e, "constructor"))
    throw new Error("constructor is not allowed as a property");
}
var Nh = (e, t) => {
  Jl(t);
  for (let n = 0; n < t.length; n++) {
    const o = t[n];
    if (Rn(e))
      e = Kt(e, +o);
    else if (Pn(e)) {
      const r = +o, s = +t[++n] == 0 ? "key" : "value", i = Kt(e, r);
      switch (s) {
        case "key":
          e = i;
          break;
        case "value":
          e = e.get(i);
          break;
      }
    } else
      e = e[o];
  }
  return e;
}, br = (e, t, n) => {
  if (Jl(t), t.length === 0)
    return n(e);
  let o = e;
  for (let s = 0; s < t.length - 1; s++) {
    const i = t[s];
    if (Dt(o)) {
      const u = +i;
      o = o[u];
    } else if (In(o))
      o = o[i];
    else if (Rn(o)) {
      const u = +i;
      o = Kt(o, u);
    } else if (Pn(o)) {
      if (s === t.length - 2)
        break;
      const l = +i, d = +t[++s] == 0 ? "key" : "value", f = Kt(o, l);
      switch (d) {
        case "key":
          o = f;
          break;
        case "value":
          o = o.get(f);
          break;
      }
    }
  }
  const r = t[t.length - 1];
  if (Dt(o) ? o[+r] = n(o[+r]) : In(o) && (o[r] = n(o[r])), Rn(o)) {
    const s = Kt(o, +r), i = n(s);
    s !== i && (o.delete(s), o.add(i));
  }
  if (Pn(o)) {
    const s = +t[t.length - 2], i = Kt(o, s);
    switch (+r == 0 ? "key" : "value") {
      case "key": {
        const l = n(i);
        o.set(l, o.get(i)), l !== i && o.delete(i);
        break;
      }
      case "value": {
        o.set(i, n(o.get(i)));
        break;
      }
    }
  }
  return e;
};
function Or(e, t, n = []) {
  if (!e)
    return;
  if (!Dt(e)) {
    Zt(e, (s, i) => Or(s, t, [...n, ...Dn(i)]));
    return;
  }
  const [o, r] = e;
  r && Zt(r, (s, i) => {
    Or(s, t, [...n, ...Dn(i)]);
  }), t(o, n);
}
function Dh(e, t, n) {
  return Or(t, (o, r) => {
    e = br(e, r, (s) => Oh(s, o, n));
  }), e;
}
function Sh(e, t) {
  function n(o, r) {
    const s = Nh(e, Dn(r));
    o.map(Dn).forEach((i) => {
      e = br(e, i, () => s);
    });
  }
  if (Dt(t)) {
    const [o, r] = t;
    o.forEach((s) => {
      e = br(e, Dn(s), () => e);
    }), r && Zt(r, n);
  } else
    Zt(t, n);
  return e;
}
var Ah = (e, t) => In(e) || Dt(e) || Pn(e) || Rn(e) || zl(e, t);
function Ch(e, t, n) {
  const o = n.get(e);
  o ? o.push(t) : n.set(e, [t]);
}
function wh(e, t) {
  const n = {};
  let o;
  return e.forEach((r) => {
    if (r.length <= 1)
      return;
    t || (r = r.map((u) => u.map(String)).sort((u, l) => u.length - l.length));
    const [s, ...i] = r;
    s.length === 0 ? o = i.map(Xo) : n[Xo(s)] = i.map(Xo);
  }), o ? yr(n) ? [o] : [o, n] : yr(n) ? void 0 : n;
}
var Xl = (e, t, n, o, r = [], s = [], i = /* @__PURE__ */ new Map()) => {
  var u;
  const l = _h(e);
  if (!l) {
    Ch(e, r, t);
    const g = i.get(e);
    if (g)
      return o ? {
        transformedValue: null
      } : g;
  }
  if (!Ah(e, n)) {
    const g = Mi(e, n), b = g ? {
      transformedValue: g.value,
      annotations: [g.type]
    } : {
      transformedValue: e
    };
    return l || i.set(e, b), b;
  }
  if (no(s, e))
    return {
      transformedValue: null
    };
  const d = Mi(e, n), f = (u = d?.value) != null ? u : e, c = Dt(f) ? [] : {}, h = {};
  Zt(f, (g, b) => {
    if (b === "__proto__" || b === "constructor" || b === "prototype")
      throw new Error(`Detected property ${b}. This is a prototype pollution risk, please remove it from your object.`);
    const w = Xl(g, t, n, o, [...r, b], [...s, e], i);
    c[b] = w.transformedValue, Dt(w.annotations) ? h[b] = w.annotations : In(w.annotations) && Zt(w.annotations, (S, $) => {
      h[jl(b) + "." + $] = S;
    });
  });
  const _ = yr(h) ? {
    transformedValue: c,
    annotations: d ? [d.type] : void 0
  } : {
    transformedValue: c,
    annotations: d ? [d.type, h] : h
  };
  return l || i.set(e, _), _;
};
y();
y();
function Zl(e) {
  return Object.prototype.toString.call(e).slice(8, -1);
}
function Ui(e) {
  return Zl(e) === "Array";
}
function Th(e) {
  if (Zl(e) !== "Object")
    return !1;
  const t = Object.getPrototypeOf(e);
  return !!t && t.constructor === Object && t === Object.prototype;
}
function Vh(e, t, n, o, r) {
  const s = {}.propertyIsEnumerable.call(o, t) ? "enumerable" : "nonenumerable";
  s === "enumerable" && (e[t] = n), r && s === "nonenumerable" && Object.defineProperty(e, t, {
    value: n,
    enumerable: !1,
    writable: !0,
    configurable: !0
  });
}
function Nr(e, t = {}) {
  if (Ui(e))
    return e.map((r) => Nr(r, t));
  if (!Th(e))
    return e;
  const n = Object.getOwnPropertyNames(e), o = Object.getOwnPropertySymbols(e);
  return [...n, ...o].reduce((r, s) => {
    if (Ui(t.props) && !t.props.includes(s))
      return r;
    const i = e[s], u = Nr(i, t);
    return Vh(r, s, u, e, t.nonenumerable), r;
  }, {});
}
var ie = class {
  /**
   * @param dedupeReferentialEqualities  If true, SuperJSON will make sure only one instance of referentially equal objects are serialized and the rest are replaced with `null`.
   */
  constructor({ dedupe: e = !1 } = {}) {
    this.classRegistry = new oh(), this.symbolRegistry = new Ml((t) => {
      var n;
      return (n = t.description) != null ? n : "";
    }), this.customTransformerRegistry = new ih(), this.allowedErrorProps = [], this.dedupe = e;
  }
  serialize(e) {
    const t = /* @__PURE__ */ new Map(), n = Xl(e, t, this, this.dedupe), o = {
      json: n.transformedValue
    };
    n.annotations && (o.meta = {
      ...o.meta,
      values: n.annotations
    });
    const r = wh(t, this.dedupe);
    return r && (o.meta = {
      ...o.meta,
      referentialEqualities: r
    }), o;
  }
  deserialize(e) {
    const { json: t, meta: n } = e;
    let o = Nr(t);
    return n?.values && (o = Dh(o, n.values, this)), n?.referentialEqualities && (o = Sh(o, n.referentialEqualities)), o;
  }
  stringify(e) {
    return JSON.stringify(this.serialize(e));
  }
  parse(e) {
    return this.deserialize(JSON.parse(e));
  }
  registerClass(e, t) {
    this.classRegistry.register(e, t);
  }
  registerSymbol(e, t) {
    this.symbolRegistry.register(e, t);
  }
  registerCustom(e, t) {
    this.customTransformerRegistry.register({
      name: t,
      ...e
    });
  }
  allowErrorProps(...e) {
    this.allowedErrorProps.push(...e);
  }
};
ie.defaultInstance = new ie();
ie.serialize = ie.defaultInstance.serialize.bind(ie.defaultInstance);
ie.deserialize = ie.defaultInstance.deserialize.bind(ie.defaultInstance);
ie.stringify = ie.defaultInstance.stringify.bind(ie.defaultInstance);
ie.parse = ie.defaultInstance.parse.bind(ie.defaultInstance);
ie.registerClass = ie.defaultInstance.registerClass.bind(ie.defaultInstance);
ie.registerSymbol = ie.defaultInstance.registerSymbol.bind(ie.defaultInstance);
ie.registerCustom = ie.defaultInstance.registerCustom.bind(ie.defaultInstance);
ie.allowErrorProps = ie.defaultInstance.allowErrorProps.bind(ie.defaultInstance);
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
var Bi, ji;
(ji = (Bi = R).__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__) != null || (Bi.__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__ = []);
var Hi, Ki;
(Ki = (Hi = R).__VUE_DEVTOOLS_KIT_RPC_CLIENT__) != null || (Hi.__VUE_DEVTOOLS_KIT_RPC_CLIENT__ = null);
var Wi, zi;
(zi = (Wi = R).__VUE_DEVTOOLS_KIT_RPC_SERVER__) != null || (Wi.__VUE_DEVTOOLS_KIT_RPC_SERVER__ = null);
var Gi, qi;
(qi = (Gi = R).__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__) != null || (Gi.__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__ = null);
var Yi, Ji;
(Ji = (Yi = R).__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__) != null || (Yi.__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__ = null);
var Xi, Zi;
(Zi = (Xi = R).__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__) != null || (Xi.__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__ = null);
y();
y();
y();
y();
y();
y();
y();
/*!
 * pinia v3.0.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let _n;
const kn = (e) => _n = e, Ql = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function $t(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var nt;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(nt || (nt = {}));
const mt = typeof window < "u", Qi = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function xh(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function is(e, t, n) {
  const o = new XMLHttpRequest();
  o.open("GET", e), o.responseType = "blob", o.onload = function() {
    nc(o.response, t, n);
  }, o.onerror = function() {
    console.error("could not download file");
  }, o.send();
}
function ec(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function oo(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const n = new MouseEvent("click", {
      bubbles: !0,
      cancelable: !0,
      view: window,
      detail: 0,
      screenX: 80,
      screenY: 20,
      clientX: 80,
      clientY: 20,
      ctrlKey: !1,
      altKey: !1,
      shiftKey: !1,
      metaKey: !1,
      button: 0,
      relatedTarget: null
    });
    e.dispatchEvent(n);
  }
}
const ro = typeof navigator == "object" ? navigator : { userAgent: "" }, tc = /Macintosh/.test(ro.userAgent) && /AppleWebKit/.test(ro.userAgent) && !/Safari/.test(ro.userAgent), nc = mt ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !tc ? Ih : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in ro ? Ph : (
      // Fallback to using FileReader and a popup
      Rh
    )
  )
) : () => {
};
function Ih(e, t = "download", n) {
  const o = document.createElement("a");
  o.download = t, o.rel = "noopener", typeof e == "string" ? (o.href = e, o.origin !== location.origin ? ec(o.href) ? is(e, t, n) : (o.target = "_blank", oo(o)) : oo(o)) : (o.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(o.href);
  }, 4e4), setTimeout(function() {
    oo(o);
  }, 0));
}
function Ph(e, t = "download", n) {
  if (typeof e == "string")
    if (ec(e))
      is(e, t, n);
    else {
      const o = document.createElement("a");
      o.href = e, o.target = "_blank", setTimeout(function() {
        oo(o);
      });
    }
  else
    navigator.msSaveOrOpenBlob(xh(e, n), t);
}
function Rh(e, t, n, o) {
  if (o = o || open("", "_blank"), o && (o.document.title = o.document.body.innerText = "downloading..."), typeof e == "string")
    return is(e, t, n);
  const r = e.type === "application/octet-stream", s = /constructor/i.test(String(Qi.HTMLElement)) || "safari" in Qi, i = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((i || r && s || tc) && typeof FileReader < "u") {
    const u = new FileReader();
    u.onloadend = function() {
      let l = u.result;
      if (typeof l != "string")
        throw o = null, new Error("Wrong reader.result type");
      l = i ? l : l.replace(/^data:[^;]*;/, "data:attachment/file;"), o ? o.location.href = l : location.assign(l), o = null;
    }, u.readAsDataURL(e);
  } else {
    const u = URL.createObjectURL(e);
    o ? o.location.assign(u) : location.href = u, o = null, setTimeout(function() {
      URL.revokeObjectURL(u);
    }, 4e4);
  }
}
function _e(e, t) {
  const n = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(n, t) : t === "error" ? console.error(n) : t === "warn" ? console.warn(n) : console.log(n);
}
function us(e) {
  return "_a" in e && "install" in e;
}
function oc() {
  if (!("clipboard" in navigator))
    return _e("Your browser doesn't support the Clipboard API", "error"), !0;
}
function rc(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (_e('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function kh(e) {
  if (!oc())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), _e("Global state copied to clipboard.");
    } catch (t) {
      if (rc(t))
        return;
      _e("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function Fh(e) {
  if (!oc())
    try {
      sc(e, JSON.parse(await navigator.clipboard.readText())), _e("Global state pasted from clipboard.");
    } catch (t) {
      if (rc(t))
        return;
      _e("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function $h(e) {
  try {
    nc(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    _e("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let st;
function Lh() {
  st || (st = document.createElement("input"), st.type = "file", st.accept = ".json");
  function e() {
    return new Promise((t, n) => {
      st.onchange = async () => {
        const o = st.files;
        if (!o)
          return t(null);
        const r = o.item(0);
        return t(r ? { text: await r.text(), file: r } : null);
      }, st.oncancel = () => t(null), st.onerror = n, st.click();
    });
  }
  return e;
}
async function Mh(e) {
  try {
    const n = await Lh()();
    if (!n)
      return;
    const { text: o, file: r } = n;
    sc(e, JSON.parse(o)), _e(`Global state imported from "${r.name}".`);
  } catch (t) {
    _e("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function sc(e, t) {
  for (const n in t) {
    const o = e.state.value[n];
    o ? Object.assign(o, t[n]) : e.state.value[n] = t[n];
  }
}
function $e(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const ic = "🍍 Pinia (root)", so = "_root";
function Uh(e) {
  return us(e) ? {
    id: so,
    label: ic
  } : {
    id: e.$id,
    label: e.$id
  };
}
function Bh(e) {
  if (us(e)) {
    const n = Array.from(e._s.keys()), o = e._s;
    return {
      state: n.map((s) => ({
        editable: !0,
        key: s,
        value: e.state.value[s]
      })),
      getters: n.filter((s) => o.get(s)._getters).map((s) => {
        const i = o.get(s);
        return {
          editable: !1,
          key: s,
          value: i._getters.reduce((u, l) => (u[l] = i[l], u), {})
        };
      })
    };
  }
  const t = {
    state: Object.keys(e.$state).map((n) => ({
      editable: !0,
      key: n,
      value: e.$state[n]
    }))
  };
  return e._getters && e._getters.length && (t.getters = e._getters.map((n) => ({
    editable: !1,
    key: n,
    value: e[n]
  }))), e._customProperties.size && (t.customProperties = Array.from(e._customProperties).map((n) => ({
    editable: !0,
    key: n,
    value: e[n]
  }))), t;
}
function jh(e) {
  return e ? Array.isArray(e) ? e.reduce((t, n) => (t.keys.push(n.key), t.operations.push(n.type), t.oldValue[n.key] = n.oldValue, t.newValue[n.key] = n.newValue, t), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: $e(e.type),
    key: $e(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function Hh(e) {
  switch (e) {
    case nt.direct:
      return "mutation";
    case nt.patchFunction:
      return "$patch";
    case nt.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let Wt = !0;
const io = [], Tt = "pinia:mutations", me = "pinia", { assign: Kh } = Object, bo = (e) => "🍍 " + e;
function Wh(e, t) {
  $l({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: io,
    app: e
  }, (n) => {
    typeof n.now != "function" && _e("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), n.addTimelineLayer({
      id: Tt,
      label: "Pinia 🍍",
      color: 15064968
    }), n.addInspector({
      id: me,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            kh(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await Fh(t), n.sendInspectorTree(me), n.sendInspectorState(me);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            $h(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await Mh(t), n.sendInspectorTree(me), n.sendInspectorState(me);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (o) => {
            const r = t._s.get(o);
            r ? typeof r.$reset != "function" ? _e(`Cannot reset "${o}" store because it doesn't have a "$reset" method implemented.`, "warn") : (r.$reset(), _e(`Store "${o}" reset.`)) : _e(`Cannot reset "${o}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), n.on.inspectComponent((o) => {
      const r = o.componentInstance && o.componentInstance.proxy;
      if (r && r._pStores) {
        const s = o.componentInstance.proxy._pStores;
        Object.values(s).forEach((i) => {
          o.instanceData.state.push({
            type: bo(i.$id),
            key: "state",
            editable: !0,
            value: i._isOptionsAPI ? {
              _custom: {
                value: K(i.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => i.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(i.$state).reduce((u, l) => (u[l] = i.$state[l], u), {})
            )
          }), i._getters && i._getters.length && o.instanceData.state.push({
            type: bo(i.$id),
            key: "getters",
            editable: !1,
            value: i._getters.reduce((u, l) => {
              try {
                u[l] = i[l];
              } catch (d) {
                u[l] = d;
              }
              return u;
            }, {})
          });
        });
      }
    }), n.on.getInspectorTree((o) => {
      if (o.app === e && o.inspectorId === me) {
        let r = [t];
        r = r.concat(Array.from(t._s.values())), o.rootNodes = (o.filter ? r.filter((s) => "$id" in s ? s.$id.toLowerCase().includes(o.filter.toLowerCase()) : ic.toLowerCase().includes(o.filter.toLowerCase())) : r).map(Uh);
      }
    }), globalThis.$pinia = t, n.on.getInspectorState((o) => {
      if (o.app === e && o.inspectorId === me) {
        const r = o.nodeId === so ? t : t._s.get(o.nodeId);
        if (!r)
          return;
        r && (o.nodeId !== so && (globalThis.$store = K(r)), o.state = Bh(r));
      }
    }), n.on.editInspectorState((o) => {
      if (o.app === e && o.inspectorId === me) {
        const r = o.nodeId === so ? t : t._s.get(o.nodeId);
        if (!r)
          return _e(`store "${o.nodeId}" not found`, "error");
        const { path: s } = o;
        us(r) ? s.unshift("state") : (s.length !== 1 || !r._customProperties.has(s[0]) || s[0] in r.$state) && s.unshift("$state"), Wt = !1, o.set(r, s, o.state.value), Wt = !0;
      }
    }), n.on.editComponentState((o) => {
      if (o.type.startsWith("🍍")) {
        const r = o.type.replace(/^🍍\s*/, ""), s = t._s.get(r);
        if (!s)
          return _e(`store "${r}" not found`, "error");
        const { path: i } = o;
        if (i[0] !== "state")
          return _e(`Invalid path for store "${r}":
${i}
Only state can be modified.`);
        i[0] = "$state", Wt = !1, o.set(s, i, o.state.value), Wt = !0;
      }
    });
  });
}
function zh(e, t) {
  io.includes(bo(t.$id)) || io.push(bo(t.$id)), $l({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: io,
    app: e,
    settings: {
      logStoreChanges: {
        label: "Notify about new/deleted stores",
        type: "boolean",
        defaultValue: !0
      }
      // useEmojis: {
      //   label: 'Use emojis in messages ⚡️',
      //   type: 'boolean',
      //   defaultValue: true,
      // },
    }
  }, (n) => {
    const o = typeof n.now == "function" ? n.now.bind(n) : Date.now;
    t.$onAction(({ after: i, onError: u, name: l, args: d }) => {
      const f = uc++;
      n.addTimelineEvent({
        layerId: Tt,
        event: {
          time: o(),
          title: "🛫 " + l,
          subtitle: "start",
          data: {
            store: $e(t.$id),
            action: $e(l),
            args: d
          },
          groupId: f
        }
      }), i((c) => {
        vt = void 0, n.addTimelineEvent({
          layerId: Tt,
          event: {
            time: o(),
            title: "🛬 " + l,
            subtitle: "end",
            data: {
              store: $e(t.$id),
              action: $e(l),
              args: d,
              result: c
            },
            groupId: f
          }
        });
      }), u((c) => {
        vt = void 0, n.addTimelineEvent({
          layerId: Tt,
          event: {
            time: o(),
            logType: "error",
            title: "💥 " + l,
            subtitle: "end",
            data: {
              store: $e(t.$id),
              action: $e(l),
              args: d,
              error: c
            },
            groupId: f
          }
        });
      });
    }, !0), t._customProperties.forEach((i) => {
      On(() => pt(t[i]), (u, l) => {
        n.notifyComponentUpdate(), n.sendInspectorState(me), Wt && n.addTimelineEvent({
          layerId: Tt,
          event: {
            time: o(),
            title: "Change",
            subtitle: i,
            data: {
              newValue: u,
              oldValue: l
            },
            groupId: vt
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: i, type: u }, l) => {
      if (n.notifyComponentUpdate(), n.sendInspectorState(me), !Wt)
        return;
      const d = {
        time: o(),
        title: Hh(u),
        data: Kh({ store: $e(t.$id) }, jh(i)),
        groupId: vt
      };
      u === nt.patchFunction ? d.subtitle = "⤵️" : u === nt.patchObject ? d.subtitle = "🧩" : i && !Array.isArray(i) && (d.subtitle = i.type), i && (d.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: i
        }
      }), n.addTimelineEvent({
        layerId: Tt,
        event: d
      });
    }, { detached: !0, flush: "sync" });
    const r = t._hotUpdate;
    t._hotUpdate = gt((i) => {
      r(i), n.addTimelineEvent({
        layerId: Tt,
        event: {
          time: o(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: $e(t.$id),
            info: $e("HMR update")
          }
        }
      }), n.notifyComponentUpdate(), n.sendInspectorTree(me), n.sendInspectorState(me);
    });
    const { $dispose: s } = t;
    t.$dispose = () => {
      s(), n.notifyComponentUpdate(), n.sendInspectorTree(me), n.sendInspectorState(me), n.getSettings().logStoreChanges && _e(`Disposed "${t.$id}" store 🗑`);
    }, n.notifyComponentUpdate(), n.sendInspectorTree(me), n.sendInspectorState(me), n.getSettings().logStoreChanges && _e(`"${t.$id}" store installed 🆕`);
  });
}
let uc = 0, vt;
function eu(e, t, n) {
  const o = t.reduce((r, s) => (r[s] = K(e)[s], r), {});
  for (const r in o)
    e[r] = function() {
      const s = uc, i = n ? new Proxy(e, {
        get(...l) {
          return vt = s, Reflect.get(...l);
        },
        set(...l) {
          return vt = s, Reflect.set(...l);
        }
      }) : e;
      vt = s;
      const u = o[r].apply(i, arguments);
      return vt = void 0, u;
    };
}
function Gh({ app: e, store: t, options: n }) {
  if (!t.$id.startsWith("__hot:")) {
    if (t._isOptionsAPI = !!n.state, !t._p._testing) {
      eu(t, Object.keys(n.actions), t._isOptionsAPI);
      const o = t._hotUpdate;
      K(t)._hotUpdate = function(r) {
        o.apply(this, arguments), eu(t, Object.keys(r._hmrPayload.actions), !!t._isOptionsAPI);
      };
    }
    zh(
      e,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      t
    );
  }
}
function qh() {
  const e = lu(!0), t = e.run(() => Yt({}));
  let n = [], o = [];
  const r = gt({
    install(s) {
      kn(r), r._a = s, s.provide(Ql, r), s.config.globalProperties.$pinia = r, process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && mt && Wh(s, r), o.forEach((i) => n.push(i)), o = [];
    },
    use(s) {
      return this._a ? n.push(s) : o.push(s), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && mt && typeof Proxy < "u" && r.use(Gh), r;
}
function lc(e, t) {
  for (const n in t) {
    const o = t[n];
    if (!(n in e))
      continue;
    const r = e[n];
    $t(r) && $t(o) && !re(o) && !lt(o) ? e[n] = lc(r, o) : e[n] = o;
  }
  return e;
}
const cc = () => {
};
function tu(e, t, n, o = cc) {
  e.push(t);
  const r = () => {
    const s = e.indexOf(t);
    s > -1 && (e.splice(s, 1), o());
  };
  return !n && cu() && Ic(r), r;
}
function jt(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const Yh = (e) => e(), nu = Symbol(), Zo = Symbol();
function Dr(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, o) => e.set(o, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const o = t[n], r = e[n];
    $t(r) && $t(o) && e.hasOwnProperty(n) && !re(o) && !lt(o) ? e[n] = Dr(r, o) : e[n] = o;
  }
  return e;
}
const Jh = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function Xh(e) {
  return !$t(e) || !Object.prototype.hasOwnProperty.call(e, Jh);
}
const { assign: Fe } = Object;
function ou(e) {
  return !!(re(e) && e.effect);
}
function ru(e, t, n, o) {
  const { state: r, actions: s, getters: i } = t, u = n.state.value[e];
  let l;
  function d() {
    !u && (process.env.NODE_ENV === "production" || !o) && (n.state.value[e] = r ? r() : {});
    const f = process.env.NODE_ENV !== "production" && o ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Es(Yt(r ? r() : {}).value)
    ) : Es(n.state.value[e]);
    return Fe(f, s, Object.keys(i || {}).reduce((c, h) => (process.env.NODE_ENV !== "production" && h in f && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${h}" in store "${e}".`), c[h] = gt(qr(() => {
      kn(n);
      const _ = n._s.get(e);
      return i[h].call(_, _);
    })), c), {}));
  }
  return l = Sr(e, d, t, n, o, !0), l;
}
function Sr(e, t, n = {}, o, r, s) {
  let i;
  const u = Fe({ actions: {} }, n);
  if (process.env.NODE_ENV !== "production" && !o._e.active)
    throw new Error("Pinia destroyed");
  const l = { deep: !0 };
  process.env.NODE_ENV !== "production" && (l.onTrigger = (P) => {
    d ? _ = P : d == !1 && !L._hotUpdating && (Array.isArray(_) ? _.push(P) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let d, f, c = [], h = [], _;
  const g = o.state.value[e];
  !s && !g && (process.env.NODE_ENV === "production" || !r) && (o.state.value[e] = {});
  const b = Yt({});
  let w;
  function S(P) {
    let x;
    d = f = !1, process.env.NODE_ENV !== "production" && (_ = []), typeof P == "function" ? (P(o.state.value[e]), x = {
      type: nt.patchFunction,
      storeId: e,
      events: _
    }) : (Dr(o.state.value[e], P), x = {
      type: nt.patchObject,
      payload: P,
      storeId: e,
      events: _
    });
    const z = w = Symbol();
    rr().then(() => {
      w === z && (d = !0);
    }), f = !0, jt(c, x, o.state.value[e]);
  }
  const $ = s ? function() {
    const { state: x } = n, z = x ? x() : {};
    this.$patch((ue) => {
      Fe(ue, z);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : cc
  );
  function k() {
    i.stop(), c = [], h = [], o._s.delete(e);
  }
  const te = (P, x = "") => {
    if (nu in P)
      return P[Zo] = x, P;
    const z = function() {
      kn(o);
      const ue = Array.from(arguments), ve = [], ye = [];
      function se(G) {
        ve.push(G);
      }
      function I(G) {
        ye.push(G);
      }
      jt(h, {
        args: ue,
        name: z[Zo],
        store: L,
        after: se,
        onError: I
      });
      let H;
      try {
        H = P.apply(this && this.$id === e ? this : L, ue);
      } catch (G) {
        throw jt(ye, G), G;
      }
      return H instanceof Promise ? H.then((G) => (jt(ve, G), G)).catch((G) => (jt(ye, G), Promise.reject(G))) : (jt(ve, H), H);
    };
    return z[nu] = !0, z[Zo] = x, z;
  }, F = /* @__PURE__ */ gt({
    actions: {},
    getters: {},
    state: [],
    hotState: b
  }), J = {
    _p: o,
    // _s: scope,
    $id: e,
    $onAction: tu.bind(null, h),
    $patch: S,
    $reset: $,
    $subscribe(P, x = {}) {
      const z = tu(c, P, x.detached, () => ue()), ue = i.run(() => On(() => o.state.value[e], (ve) => {
        (x.flush === "sync" ? f : d) && P({
          storeId: e,
          type: nt.direct,
          events: _
        }, ve);
      }, Fe({}, l, x)));
      return z;
    },
    $dispose: k
  }, L = Co(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && mt ? Fe(
    {
      _hmrPayload: F,
      _customProperties: gt(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    J
    // must be added later
    // setupStore
  ) : J);
  o._s.set(e, L);
  const Z = (o._a && o._a.runWithContext || Yh)(() => o._e.run(() => (i = lu()).run(() => t({ action: te }))));
  for (const P in Z) {
    const x = Z[P];
    if (re(x) && !ou(x) || lt(x))
      process.env.NODE_ENV !== "production" && r ? b.value[P] = jo(Z, P) : s || (g && Xh(x) && (re(x) ? x.value = g[P] : Dr(x, g[P])), o.state.value[e][P] = x), process.env.NODE_ENV !== "production" && F.state.push(P);
    else if (typeof x == "function") {
      const z = process.env.NODE_ENV !== "production" && r ? x : te(x, P);
      Z[P] = z, process.env.NODE_ENV !== "production" && (F.actions[P] = x), u.actions[P] = x;
    } else process.env.NODE_ENV !== "production" && ou(x) && (F.getters[P] = s ? (
      // @ts-expect-error
      n.getters[P]
    ) : x, mt && (Z._getters || // @ts-expect-error: same
    (Z._getters = gt([]))).push(P));
  }
  if (Fe(L, Z), Fe(K(L), Z), Object.defineProperty(L, "$state", {
    get: () => process.env.NODE_ENV !== "production" && r ? b.value : o.state.value[e],
    set: (P) => {
      if (process.env.NODE_ENV !== "production" && r)
        throw new Error("cannot set hotState");
      S((x) => {
        Fe(x, P);
      });
    }
  }), process.env.NODE_ENV !== "production" && (L._hotUpdate = gt((P) => {
    L._hotUpdating = !0, P._hmrPayload.state.forEach((x) => {
      if (x in L.$state) {
        const z = P.$state[x], ue = L.$state[x];
        typeof z == "object" && $t(z) && $t(ue) ? lc(z, ue) : P.$state[x] = ue;
      }
      L[x] = jo(P.$state, x);
    }), Object.keys(L.$state).forEach((x) => {
      x in P.$state || delete L[x];
    }), d = !1, f = !1, o.state.value[e] = jo(P._hmrPayload, "hotState"), f = !0, rr().then(() => {
      d = !0;
    });
    for (const x in P._hmrPayload.actions) {
      const z = P[x];
      L[x] = //
      te(z, x);
    }
    for (const x in P._hmrPayload.getters) {
      const z = P._hmrPayload.getters[x], ue = s ? (
        // special handling of options api
        qr(() => (kn(o), z.call(L, L)))
      ) : z;
      L[x] = //
      ue;
    }
    Object.keys(L._hmrPayload.getters).forEach((x) => {
      x in P._hmrPayload.getters || delete L[x];
    }), Object.keys(L._hmrPayload.actions).forEach((x) => {
      x in P._hmrPayload.actions || delete L[x];
    }), L._hmrPayload = P._hmrPayload, L._getters = P._getters, L._hotUpdating = !1;
  })), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && mt) {
    const P = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((x) => {
      Object.defineProperty(L, x, Fe({ value: L[x] }, P));
    });
  }
  return o._p.forEach((P) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && mt) {
      const x = i.run(() => P({
        store: L,
        app: o._a,
        pinia: o,
        options: u
      }));
      Object.keys(x || {}).forEach((z) => L._customProperties.add(z)), Fe(L, x);
    } else
      Fe(L, i.run(() => P({
        store: L,
        app: o._a,
        pinia: o,
        options: u
      })));
  }), process.env.NODE_ENV !== "production" && L.$state && typeof L.$state == "object" && typeof L.$state.constructor == "function" && !L.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${L.$id}".`), g && s && n.hydrate && n.hydrate(L.$state, g), d = !0, f = !0, L;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Zh(e, t, n) {
  let o;
  const r = typeof t == "function";
  o = r ? n : t;
  function s(i, u) {
    const l = nf();
    if (i = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && _n && _n._testing ? null : i) || (l ? bn(Ql, null) : null), i && kn(i), process.env.NODE_ENV !== "production" && !_n)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    i = _n, i._s.has(e) || (r ? Sr(e, t, o, i) : ru(e, o, i), process.env.NODE_ENV !== "production" && (s._pinia = i));
    const d = i._s.get(e);
    if (process.env.NODE_ENV !== "production" && u) {
      const f = "__hot:" + e, c = r ? Sr(f, t, o, i, !0) : ru(f, Fe({}, o), i, !0);
      u._hotUpdate(c), delete i.state.value[f], i._s.delete(f);
    }
    if (process.env.NODE_ENV !== "production" && mt) {
      const f = Po();
      if (f && f.proxy && // avoid adding stores that are just built for hot module replacement
      !u) {
        const c = f.proxy, h = "_pStores" in c ? c._pStores : c._pStores = {};
        h[e] = d;
      }
    }
    return d;
  }
  return s.$id = e, s;
}
const ac = /* @__PURE__ */ Zh("my-store", () => {
  const e = Yt(null);
  function t(r) {
    e.value = r;
  }
  const n = Yt("Anfangstext");
  function o(r) {
    n.value = r;
  }
  return {
    jsonConfig: e,
    setConfig: t,
    // ... andere State-Elemente ...
    textValue: n,
    updateTextValue: o
  };
}), Qh = ["value"], e_ = /* @__PURE__ */ Mu({
  __name: "cfgDiv",
  setup(e) {
    const t = ac();
    return (n, o) => (ul(), Rf("textarea", {
      style: So({
        backgroundColor: pt(t)?.jsonConfig?.backgroundColor,
        color: pt(t)?.jsonConfig?.textColor,
        width: pt(t)?.jsonConfig?.width + "px",
        height: pt(t)?.jsonConfig?.height + "px"
      }),
      value: pt(t)?.textValue,
      onInput: o[0] || (o[0] = (r) => pt(t)?.updateTextValue(r.target?.value))
    }, "    ", 44, Qh));
  }
}), t_ = /* @__PURE__ */ Mu({
  __name: "example-pinia",
  setup(e) {
    return (t, n) => (ul(), kf(e_));
  }
}), o_ = (e, t, n) => {
  const o = bd(t_), r = qh();
  o.use(r);
  const s = ac();
  return s.setConfig(t), n && s.$subscribe((i, u) => {
    n(u);
  }, { immediate: !0 }), o.mount(e), {
    app: o,
    pinia: r,
    store: s
  };
};
export {
  o_ as initializeAndMount
};
