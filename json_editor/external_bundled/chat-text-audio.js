/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Xe(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const K = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, Dt = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], re = () => {
}, ks = () => !1, tn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), On = (e) => e.startsWith("onUpdate:"), ee = Object.assign, wo = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, ri = Object.prototype.hasOwnProperty, k = (e, t) => ri.call(e, t), M = Array.isArray, gt = (e) => Ln(e) === "[object Map]", Hs = (e) => Ln(e) === "[object Set]", $ = (e) => typeof e == "function", z = (e) => typeof e == "string", ft = (e) => typeof e == "symbol", W = (e) => e !== null && typeof e == "object", Do = (e) => (W(e) || $(e)) && $(e.then) && $(e.catch), Us = Object.prototype.toString, Ln = (e) => Us.call(e), Vo = (e) => Ln(e).slice(8, -1), Bs = (e) => Ln(e) === "[object Object]", So = (e) => z(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ut = /* @__PURE__ */ Xe(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ii = /* @__PURE__ */ Xe(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), Fn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, li = /-\w/g, Te = Fn(
  (e) => e.replace(li, (t) => t.slice(1).toUpperCase())
), ci = /\B([A-Z])/g, ze = Fn(
  (e) => e.replace(ci, "-$1").toLowerCase()
), jn = Fn((e) => e.charAt(0).toUpperCase() + e.slice(1)), pt = Fn(
  (e) => e ? `on${jn(e)}` : ""
), lt = (e, t) => !Object.is(e, t), Pt = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, xn = (e, t, n, o = !1) => {
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
let Qo;
const nn = () => Qo || (Qo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function on(e) {
  if (M(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], s = z(o) ? pi(o) : on(o);
      if (s)
        for (const r in s)
          t[r] = s[r];
    }
    return t;
  } else if (z(e) || W(e))
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
function kn(e) {
  let t = "";
  if (z(e))
    t = e;
  else if (M(e))
    for (let n = 0; n < e.length; n++) {
      const o = kn(e[n]);
      o && (t += o + " ");
    }
  else if (W(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const hi = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", gi = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", vi = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", mi = /* @__PURE__ */ Xe(hi), _i = /* @__PURE__ */ Xe(gi), Ei = /* @__PURE__ */ Xe(vi), yi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", bi = /* @__PURE__ */ Xe(yi);
function Ks(e) {
  return !!e || e === "";
}
const Ws = (e) => !!(e && e.__v_isRef === !0), Co = (e) => z(e) ? e : e == null ? "" : M(e) || W(e) && (e.toString === Us || !$(e.toString)) ? Ws(e) ? Co(e.value) : JSON.stringify(e, Gs, 2) : String(e), Gs = (e, t) => Ws(t) ? Gs(e, t.value) : gt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [o, s], r) => (n[Xn(o, r) + " =>"] = s, n),
    {}
  )
} : Hs(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Xn(n))
} : ft(t) ? Xn(t) : W(t) && !M(t) && !Bs(t) ? String(t) : t, Xn = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    ft(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function $e(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let Ee;
class Ni {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = Ee, !t && Ee && (this.index = (Ee.scopes || (Ee.scopes = [])).push(
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
      const n = Ee;
      try {
        return Ee = this, t();
      } finally {
        Ee = n;
      }
    } else process.env.NODE_ENV !== "production" && $e("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Ee, Ee = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (Ee = this.prevScope, this.prevScope = void 0);
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
  return Ee;
}
let U;
const Qn = /* @__PURE__ */ new WeakSet();
class Zs {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ee && Ee.active && Ee.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Qn.has(this) && (Qn.delete(this), this.trigger()));
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
    this.flags |= 2, es(this), Js(this);
    const t = U, n = Me;
    U = this, Me = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && U !== this && $e(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), zs(this), U = t, Me = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        $o(t);
      this.deps = this.depsTail = void 0, es(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Qn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    co(this) && this.run();
  }
  get dirty() {
    return co(this);
  }
}
let Ys = 0, Bt, Kt;
function qs(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Kt, Kt = e;
    return;
  }
  e.next = Bt, Bt = e;
}
function To() {
  Ys++;
}
function Mo() {
  if (--Ys > 0)
    return;
  if (Kt) {
    let t = Kt;
    for (Kt = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Bt; ) {
    let t = Bt;
    for (Bt = void 0; t; ) {
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
    o.version === -1 ? (o === n && (n = s), $o(o), xi(o)) : t = o, o.dep.activeLink = o.prevActiveLink, o.prevActiveLink = void 0, o = s;
  }
  e.deps = t, e.depsTail = n;
}
function co(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Xs(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Xs(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === qt) || (e.globalVersion = qt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !co(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = U, o = Me;
  U = e, Me = !0;
  try {
    Js(e);
    const s = e.fn(e._value);
    (t.version === 0 || lt(s, e._value)) && (e.flags |= 128, e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    U = n, Me = o, zs(e), e.flags &= -3;
  }
}
function $o(e, t = !1) {
  const { dep: n, prevSub: o, nextSub: s } = e;
  if (o && (o.nextSub = s, e.prevSub = void 0), s && (s.prevSub = o, e.nextSub = void 0), process.env.NODE_ENV !== "production" && n.subsHead === e && (n.subsHead = s), n.subs === e && (n.subs = o, !o && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep)
      $o(r, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function xi(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Me = !0;
const Qs = [];
function Ae() {
  Qs.push(Me), Me = !1;
}
function Re() {
  const e = Qs.pop();
  Me = e === void 0 ? !0 : e;
}
function es(e) {
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
let qt = 0;
class wi {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Ao {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!U || !Me || U === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== U)
      n = this.activeLink = new wi(U, this), U.deps ? (n.prevDep = U.depsTail, U.depsTail.nextDep = n, U.depsTail = n) : U.deps = U.depsTail = n, er(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const o = n.nextDep;
      o.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = o), n.prevDep = U.depsTail, n.nextDep = void 0, U.depsTail.nextDep = n, U.depsTail = n, U.deps === n && (U.deps = o);
    }
    return process.env.NODE_ENV !== "production" && U.onTrack && U.onTrack(
      ee(
        {
          effect: U
        },
        t
      )
    ), n;
  }
  trigger(t) {
    this.version++, qt++, this.notify(t);
  }
  notify(t) {
    To();
    try {
      if (process.env.NODE_ENV !== "production")
        for (let n = this.subsHead; n; n = n.nextSub)
          n.sub.onTrigger && !(n.sub.flags & 8) && n.sub.onTrigger(
            ee(
              {
                effect: n.sub
              },
              t
            )
          );
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Mo();
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
const uo = /* @__PURE__ */ new WeakMap(), vt = Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), fo = Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), Jt = Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function se(e, t, n) {
  if (Me && U) {
    let o = uo.get(e);
    o || uo.set(e, o = /* @__PURE__ */ new Map());
    let s = o.get(n);
    s || (o.set(n, s = new Ao()), s.map = o, s.key = n), process.env.NODE_ENV !== "production" ? s.track({
      target: e,
      type: t,
      key: n
    }) : s.track();
  }
}
function Ue(e, t, n, o, s, r) {
  const i = uo.get(e);
  if (!i) {
    qt++;
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
  if (To(), t === "clear")
    i.forEach(l);
  else {
    const u = M(e), p = u && So(n);
    if (u && n === "length") {
      const d = Number(o);
      i.forEach((a, g) => {
        (g === "length" || g === Jt || !ft(g) && g >= d) && l(a);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), p && l(i.get(Jt)), t) {
        case "add":
          u ? p && l(i.get("length")) : (l(i.get(vt)), gt(e) && l(i.get(fo)));
          break;
        case "delete":
          u || (l(i.get(vt)), gt(e) && l(i.get(fo)));
          break;
        case "set":
          gt(e) && l(i.get(vt));
          break;
      }
  }
  Mo();
}
function Nt(e) {
  const t = R(e);
  return t === e ? t : (se(t, "iterate", Jt), he(e) ? t : t.map(le));
}
function Hn(e) {
  return se(e = R(e), "iterate", Jt), e;
}
const Di = {
  __proto__: null,
  [Symbol.iterator]() {
    return eo(this, Symbol.iterator, le);
  },
  concat(...e) {
    return Nt(this).concat(
      ...e.map((t) => M(t) ? Nt(t) : t)
    );
  },
  entries() {
    return eo(this, "entries", (e) => (e[1] = le(e[1]), e));
  },
  every(e, t) {
    return Ze(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ze(this, "filter", e, t, (n) => n.map(le), arguments);
  },
  find(e, t) {
    return Ze(this, "find", e, t, le, arguments);
  },
  findIndex(e, t) {
    return Ze(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ze(this, "findLast", e, t, le, arguments);
  },
  findLastIndex(e, t) {
    return Ze(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ze(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return to(this, "includes", e);
  },
  indexOf(...e) {
    return to(this, "indexOf", e);
  },
  join(e) {
    return Nt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return to(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ze(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Lt(this, "pop");
  },
  push(...e) {
    return Lt(this, "push", e);
  },
  reduce(e, ...t) {
    return ts(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return ts(this, "reduceRight", e, t);
  },
  shift() {
    return Lt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ze(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Lt(this, "splice", e);
  },
  toReversed() {
    return Nt(this).toReversed();
  },
  toSorted(e) {
    return Nt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Nt(this).toSpliced(...e);
  },
  unshift(...e) {
    return Lt(this, "unshift", e);
  },
  values() {
    return eo(this, "values", le);
  }
};
function eo(e, t, n) {
  const o = Hn(e), s = o[t]();
  return o !== e && !he(e) && (s._next = s.next, s.next = () => {
    const r = s._next();
    return r.done || (r.value = n(r.value)), r;
  }), s;
}
const Vi = Array.prototype;
function Ze(e, t, n, o, s, r) {
  const i = Hn(e), l = i !== e && !he(e), u = i[t];
  if (u !== Vi[t]) {
    const a = u.apply(e, r);
    return l ? le(a) : a;
  }
  let p = n;
  i !== e && (l ? p = function(a, g) {
    return n.call(this, le(a), g, e);
  } : n.length > 2 && (p = function(a, g) {
    return n.call(this, a, g, e);
  }));
  const d = u.call(i, p, o);
  return l && s ? s(d) : d;
}
function ts(e, t, n, o) {
  const s = Hn(e);
  let r = n;
  return s !== e && (he(e) ? n.length > 3 && (r = function(i, l, u) {
    return n.call(this, i, l, u, e);
  }) : r = function(i, l, u) {
    return n.call(this, i, le(l), u, e);
  }), s[t](r, ...o);
}
function to(e, t, n) {
  const o = R(e);
  se(o, "iterate", Jt);
  const s = o[t](...n);
  return (s === -1 || s === !1) && wn(n[0]) ? (n[0] = R(n[0]), o[t](...n)) : s;
}
function Lt(e, t, n = []) {
  Ae(), To();
  const o = R(e)[t].apply(e, n);
  return Mo(), Re(), o;
}
const Si = /* @__PURE__ */ Xe("__proto__,__v_isRef,__isVue"), tr = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ft)
);
function Ci(e) {
  ft(e) || (e = String(e));
  const t = R(this);
  return se(t, "has", e), t.hasOwnProperty(e);
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
      X(t) ? t : o
    );
    if ((ft(n) ? tr.has(n) : Si(n)) || (s || se(t, "get", n), r))
      return l;
    if (X(l)) {
      const u = i && So(n) ? l : l.value;
      return s && W(u) ? po(u) : u;
    }
    return W(l) ? s ? po(l) : Ro(l) : l;
  }
}
class or extends nr {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, o, s) {
    let r = t[n];
    if (!this._isShallow) {
      const u = We(r);
      if (!he(o) && !We(o) && (r = R(r), o = R(o)), !M(t) && X(r) && !X(o))
        return u ? (process.env.NODE_ENV !== "production" && $e(
          `Set operation on key "${String(n)}" failed: target is readonly.`,
          t[n]
        ), !0) : (r.value = o, !0);
    }
    const i = M(t) && So(n) ? Number(n) < t.length : k(t, n), l = Reflect.set(
      t,
      n,
      o,
      X(t) ? t : s
    );
    return t === R(s) && (i ? lt(o, r) && Ue(t, "set", n, o, r) : Ue(t, "add", n, o)), l;
  }
  deleteProperty(t, n) {
    const o = k(t, n), s = t[n], r = Reflect.deleteProperty(t, n);
    return r && o && Ue(t, "delete", n, void 0, s), r;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!ft(n) || !tr.has(n)) && se(t, "has", n), o;
  }
  ownKeys(t) {
    return se(
      t,
      "iterate",
      M(t) ? "length" : vt
    ), Reflect.ownKeys(t);
  }
}
class sr extends nr {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && $e(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && $e(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const Ti = /* @__PURE__ */ new or(), Mi = /* @__PURE__ */ new sr(), $i = /* @__PURE__ */ new or(!0), Ai = /* @__PURE__ */ new sr(!0), ao = (e) => e, pn = (e) => Reflect.getPrototypeOf(e);
function Ri(e, t, n) {
  return function(...o) {
    const s = this.__v_raw, r = R(s), i = gt(r), l = e === "entries" || e === Symbol.iterator && i, u = e === "keys" && i, p = s[e](...o), d = n ? ao : t ? Dn : le;
    return !t && se(
      r,
      "iterate",
      u ? fo : vt
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
function hn(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      $e(
        `${jn(e)} operation ${n}failed: target is readonly.`,
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
      e || (lt(s, l) && se(i, "get", s), se(i, "get", l));
      const { has: u } = pn(i), p = t ? ao : e ? Dn : le;
      if (u.call(i, s))
        return p(r.get(s));
      if (u.call(i, l))
        return p(r.get(l));
      r !== i && r.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !e && se(R(s), "iterate", vt), s.size;
    },
    has(s) {
      const r = this.__v_raw, i = R(r), l = R(s);
      return e || (lt(s, l) && se(i, "has", s), se(i, "has", l)), s === l ? r.has(s) : r.has(s) || r.has(l);
    },
    forEach(s, r) {
      const i = this, l = i.__v_raw, u = R(l), p = t ? ao : e ? Dn : le;
      return !e && se(u, "iterate", vt), l.forEach((d, a) => s.call(r, p(d), p(a), i));
    }
  };
  return ee(
    n,
    e ? {
      add: hn("add"),
      set: hn("set"),
      delete: hn("delete"),
      clear: hn("clear")
    } : {
      add(s) {
        !t && !he(s) && !We(s) && (s = R(s));
        const r = R(this);
        return pn(r).has.call(r, s) || (r.add(s), Ue(r, "add", s, s)), this;
      },
      set(s, r) {
        !t && !he(r) && !We(r) && (r = R(r));
        const i = R(this), { has: l, get: u } = pn(i);
        let p = l.call(i, s);
        p ? process.env.NODE_ENV !== "production" && ns(i, l, s) : (s = R(s), p = l.call(i, s));
        const d = u.call(i, s);
        return i.set(s, r), p ? lt(r, d) && Ue(i, "set", s, r, d) : Ue(i, "add", s, r), this;
      },
      delete(s) {
        const r = R(this), { has: i, get: l } = pn(r);
        let u = i.call(r, s);
        u ? process.env.NODE_ENV !== "production" && ns(r, i, s) : (s = R(s), u = i.call(r, s));
        const p = l ? l.call(r, s) : void 0, d = r.delete(s);
        return u && Ue(r, "delete", s, void 0, p), d;
      },
      clear() {
        const s = R(this), r = s.size !== 0, i = process.env.NODE_ENV !== "production" ? gt(s) ? new Map(s) : new Set(s) : void 0, l = s.clear();
        return r && Ue(
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
function Un(e, t) {
  const n = Ii(e, t);
  return (o, s, r) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get(
    k(n, s) && s in o ? n : o,
    s,
    r
  );
}
const Pi = {
  get: /* @__PURE__ */ Un(!1, !1)
}, Li = {
  get: /* @__PURE__ */ Un(!1, !0)
}, Fi = {
  get: /* @__PURE__ */ Un(!0, !1)
}, ji = {
  get: /* @__PURE__ */ Un(!0, !0)
};
function ns(e, t, n) {
  const o = R(n);
  if (o !== n && t.call(e, o)) {
    const s = Vo(e);
    $e(
      `Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const rr = /* @__PURE__ */ new WeakMap(), ir = /* @__PURE__ */ new WeakMap(), lr = /* @__PURE__ */ new WeakMap(), cr = /* @__PURE__ */ new WeakMap();
function ki(e) {
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
function Hi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ki(Vo(e));
}
function Ro(e) {
  return We(e) ? e : Bn(
    e,
    !1,
    Ti,
    Pi,
    rr
  );
}
function Ui(e) {
  return Bn(
    e,
    !1,
    $i,
    Li,
    ir
  );
}
function po(e) {
  return Bn(
    e,
    !0,
    Mi,
    Fi,
    lr
  );
}
function Be(e) {
  return Bn(
    e,
    !0,
    Ai,
    ji,
    cr
  );
}
function Bn(e, t, n, o, s) {
  if (!W(e))
    return process.env.NODE_ENV !== "production" && $e(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = Hi(e);
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
function ct(e) {
  return We(e) ? ct(e.__v_raw) : !!(e && e.__v_isReactive);
}
function We(e) {
  return !!(e && e.__v_isReadonly);
}
function he(e) {
  return !!(e && e.__v_isShallow);
}
function wn(e) {
  return e ? !!e.__v_raw : !1;
}
function R(e) {
  const t = e && e.__v_raw;
  return t ? R(t) : e;
}
function Bi(e) {
  return !k(e, "__v_skip") && Object.isExtensible(e) && xn(e, "__v_skip", !0), e;
}
const le = (e) => W(e) ? Ro(e) : e, Dn = (e) => W(e) ? po(e) : e;
function X(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function ie(e) {
  return Ki(e, !1);
}
function Ki(e, t) {
  return X(e) ? e : new Wi(e, t);
}
class Wi {
  constructor(t, n) {
    this.dep = new Ao(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : R(t), this._value = n ? t : le(t), this.__v_isShallow = n;
  }
  get value() {
    return process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, o = this.__v_isShallow || he(t) || We(t);
    t = o ? t : R(t), lt(t, n) && (this._rawValue = t, this._value = o ? t : le(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }) : this.dep.trigger());
  }
}
function nt(e) {
  return X(e) ? e.value : e;
}
const Gi = {
  get: (e, t, n) => t === "__v_raw" ? e : nt(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const s = e[t];
    return X(s) && !X(n) ? (s.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function ur(e) {
  return ct(e) ? e : new Proxy(e, Gi);
}
class Zi {
  constructor(t, n, o) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Ao(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = qt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = o;
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
    this.setter ? this.setter(t) : process.env.NODE_ENV !== "production" && $e("Write operation failed: computed value is readonly");
  }
}
function Yi(e, t, n = !1) {
  let o, s;
  $(e) ? o = e : (o = e.get, s = e.set);
  const r = new Zi(o, s, n);
  return process.env.NODE_ENV, r;
}
const gn = {}, Vn = /* @__PURE__ */ new WeakMap();
let ht;
function qi(e, t = !1, n = ht) {
  if (n) {
    let o = Vn.get(n);
    o || Vn.set(n, o = []), o.push(e);
  } else process.env.NODE_ENV !== "production" && !t && $e(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function Ji(e, t, n = K) {
  const { immediate: o, deep: s, once: r, scheduler: i, augmentJob: l, call: u } = n, p = (S) => {
    (n.onWarn || $e)(
      "Invalid watch source: ",
      S,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, d = (S) => s ? S : he(S) || s === !1 || s === 0 ? it(S, 1) : it(S);
  let a, g, y, D, V = !1, Q = !1;
  if (X(e) ? (g = () => e.value, V = he(e)) : ct(e) ? (g = () => d(e), V = !0) : M(e) ? (Q = !0, V = e.some((S) => ct(S) || he(S)), g = () => e.map((S) => {
    if (X(S))
      return S.value;
    if (ct(S))
      return d(S);
    if ($(S))
      return u ? u(S, 2) : S();
    process.env.NODE_ENV !== "production" && p(S);
  })) : $(e) ? t ? g = u ? () => u(e, 2) : e : g = () => {
    if (y) {
      Ae();
      try {
        y();
      } finally {
        Re();
      }
    }
    const S = ht;
    ht = a;
    try {
      return u ? u(e, 3, [D]) : e(D);
    } finally {
      ht = S;
    }
  } : (g = re, process.env.NODE_ENV !== "production" && p(e)), t && s) {
    const S = g, Z = s === !0 ? 1 / 0 : s;
    g = () => it(S(), Z);
  }
  const H = Oi(), P = () => {
    a.stop(), H && H.active && wo(H.effects, a);
  };
  if (r && t) {
    const S = t;
    t = (...Z) => {
      S(...Z), P();
    };
  }
  let I = Q ? new Array(e.length).fill(gn) : gn;
  const te = (S) => {
    if (!(!(a.flags & 1) || !a.dirty && !S))
      if (t) {
        const Z = a.run();
        if (s || V || (Q ? Z.some((ue, ne) => lt(ue, I[ne])) : lt(Z, I))) {
          y && y();
          const ue = ht;
          ht = a;
          try {
            const ne = [
              Z,
              // pass undefined as the old value when it's changed for the first time
              I === gn ? void 0 : Q && I[0] === gn ? [] : I,
              D
            ];
            I = Z, u ? u(t, 3, ne) : (
              // @ts-expect-error
              t(...ne)
            );
          } finally {
            ht = ue;
          }
        }
      } else
        a.run();
  };
  return l && l(te), a = new Zs(g), a.scheduler = i ? () => i(te, !1) : te, D = (S) => qi(S, !1, a), y = a.onStop = () => {
    const S = Vn.get(a);
    if (S) {
      if (u)
        u(S, 4);
      else
        for (const Z of S) Z();
      Vn.delete(a);
    }
  }, process.env.NODE_ENV !== "production" && (a.onTrack = n.onTrack, a.onTrigger = n.onTrigger), t ? o ? te(!0) : I = a.run() : i ? i(te.bind(null, !0), !0) : a.run(), P.pause = a.pause.bind(a), P.resume = a.resume.bind(a), P.stop = P, P;
}
function it(e, t = 1 / 0, n) {
  if (t <= 0 || !W(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, X(e))
    it(e.value, t, n);
  else if (M(e))
    for (let o = 0; o < e.length; o++)
      it(e[o], t, n);
  else if (Hs(e) || gt(e))
    e.forEach((o) => {
      it(o, t, n);
    });
  else if (Bs(e)) {
    for (const o in e)
      it(e[o], t, n);
    for (const o of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, o) && it(e[o], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const mt = [];
function vn(e) {
  mt.push(e);
}
function mn() {
  mt.pop();
}
let no = !1;
function O(e, ...t) {
  if (no) return;
  no = !0, Ae();
  const n = mt.length ? mt[mt.length - 1].component : null, o = n && n.appContext.config.warnHandler, s = zi();
  if (o)
    Tt(
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
          ({ vnode: r }) => `at <${Yn(n, r.type)}>`
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
  Re(), no = !1;
}
function zi() {
  let e = mt[mt.length - 1];
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
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, s = ` at <${Yn(
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
  return z(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : X(t) ? (t = fr(e, R(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : $(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = R(t), n ? t : [`${e}=`, t]);
}
const Io = {
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
function Tt(e, t, n, o) {
  try {
    return o ? e(...o) : e();
  } catch (s) {
    sn(s, t, n);
  }
}
function Ge(e, t, n, o) {
  if ($(e)) {
    const s = Tt(e, t, n, o);
    return s && Do(s) && s.catch((r) => {
      sn(r, t, n);
    }), s;
  }
  if (M(e)) {
    const s = [];
    for (let r = 0; r < e.length; r++)
      s.push(Ge(e[r], t, n, o));
    return s;
  } else process.env.NODE_ENV !== "production" && O(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function sn(e, t, n, o = !0) {
  const s = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: i } = t && t.appContext.config || K;
  if (t) {
    let l = t.parent;
    const u = t.proxy, p = process.env.NODE_ENV !== "production" ? Io[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
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
      Ae(), Tt(r, null, 10, [
        e,
        u,
        p
      ]), Re();
      return;
    }
  }
  tl(e, n, s, o, i);
}
function tl(e, t, n, o = !0, s = !1) {
  if (process.env.NODE_ENV !== "production") {
    const r = Io[t];
    if (n && vn(n), O(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && mn(), o)
      throw e;
    console.error(e);
  } else {
    if (s)
      throw e;
    console.error(e);
  }
}
const pe = [];
let ke = -1;
const Vt = [];
let ot = null, wt = 0;
const ar = /* @__PURE__ */ Promise.resolve();
let Sn = null;
const nl = 100;
function Po(e) {
  const t = Sn || ar;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ol(e) {
  let t = ke + 1, n = pe.length;
  for (; t < n; ) {
    const o = t + n >>> 1, s = pe[o], r = zt(s);
    r < e || r === e && s.flags & 2 ? t = o + 1 : n = o;
  }
  return t;
}
function Kn(e) {
  if (!(e.flags & 1)) {
    const t = zt(e), n = pe[pe.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= zt(n) ? pe.push(e) : pe.splice(ol(t), 0, e), e.flags |= 1, dr();
  }
}
function dr() {
  Sn || (Sn = ar.then(gr));
}
function pr(e) {
  M(e) ? Vt.push(...e) : ot && e.id === -1 ? ot.splice(wt + 1, 0, e) : e.flags & 1 || (Vt.push(e), e.flags |= 1), dr();
}
function os(e, t, n = ke + 1) {
  for (process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()); n < pe.length; n++) {
    const o = pe[n];
    if (o && o.flags & 2) {
      if (e && o.id !== e.uid || process.env.NODE_ENV !== "production" && Lo(t, o))
        continue;
      pe.splice(n, 1), n--, o.flags & 4 && (o.flags &= -2), o(), o.flags & 4 || (o.flags &= -2);
    }
  }
}
function hr(e) {
  if (Vt.length) {
    const t = [...new Set(Vt)].sort(
      (n, o) => zt(n) - zt(o)
    );
    if (Vt.length = 0, ot) {
      ot.push(...t);
      return;
    }
    for (ot = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), wt = 0; wt < ot.length; wt++) {
      const n = ot[wt];
      process.env.NODE_ENV !== "production" && Lo(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    ot = null, wt = 0;
  }
}
const zt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function gr(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => Lo(e, n) : re;
  try {
    for (ke = 0; ke < pe.length; ke++) {
      const n = pe[ke];
      if (n && !(n.flags & 8)) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        n.flags & 4 && (n.flags &= -2), Tt(
          n,
          n.i,
          n.i ? 15 : 14
        ), n.flags & 4 || (n.flags &= -2);
      }
    }
  } finally {
    for (; ke < pe.length; ke++) {
      const n = pe[ke];
      n && (n.flags &= -2);
    }
    ke = -1, pe.length = 0, hr(e), Sn = null, (pe.length || Vt.length) && gr(e);
  }
}
function Lo(e, t) {
  const n = e.get(t) || 0;
  if (n > nl) {
    const o = t.i, s = o && Jr(o.type);
    return sn(
      `Maximum recursive updates exceeded${s ? ` in component <${s}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
let Ke = !1;
const _n = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (nn().__VUE_HMR_RUNTIME__ = {
  createRecord: oo(vr),
  rerender: oo(il),
  reload: oo(ll)
});
const yt = /* @__PURE__ */ new Map();
function sl(e) {
  const t = e.type.__hmrId;
  let n = yt.get(t);
  n || (vr(t, e.type), n = yt.get(t)), n.instances.add(e);
}
function rl(e) {
  yt.get(e.type.__hmrId).instances.delete(e);
}
function vr(e, t) {
  return yt.has(e) ? !1 : (yt.set(e, {
    initialDef: Cn(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Cn(e) {
  return zr(e) ? e.__vccOpts : e;
}
function il(e, t) {
  const n = yt.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, Cn(o.type).render = t), o.renderCache = [], Ke = !0, o.job.flags & 8 || o.update(), Ke = !1;
  }));
}
function ll(e, t) {
  const n = yt.get(e);
  if (!n) return;
  t = Cn(t), ss(n.initialDef, t);
  const o = [...n.instances];
  for (let s = 0; s < o.length; s++) {
    const r = o[s], i = Cn(r.type);
    let l = _n.get(i);
    l || (i !== n.initialDef && ss(i, t), _n.set(i, l = /* @__PURE__ */ new Set())), l.add(r), r.appContext.propsCache.delete(r.type), r.appContext.emitsCache.delete(r.type), r.appContext.optionsCache.delete(r.type), r.ceReload ? (l.add(r), r.ceReload(t.styles), l.delete(r)) : r.parent ? Kn(() => {
      r.job.flags & 8 || (Ke = !0, r.parent.update(), Ke = !1, l.delete(r));
    }) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), r.root.ce && r !== r.root && r.root.ce._removeChildStyle(i);
  }
  pr(() => {
    _n.clear();
  });
}
function ss(e, t) {
  ee(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function oo(e) {
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
let Se, kt = [], ho = !1;
function rn(e, ...t) {
  Se ? Se.emit(e, ...t) : ho || kt.push({ event: e, args: t });
}
function Fo(e, t) {
  var n, o;
  Se = e, Se ? (Se.enabled = !0, kt.forEach(({ event: s, args: r }) => Se.emit(s, ...r)), kt = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((o = (n = window.navigator) == null ? void 0 : n.userAgent) != null && o.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((r) => {
    Fo(r, t);
  }), setTimeout(() => {
    Se || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, ho = !0, kt = []);
  }, 3e3)) : (ho = !0, kt = []);
}
function cl(e, t) {
  rn("app:init", e, t, {
    Fragment: be,
    Text: ln,
    Comment: xe,
    Static: yn
  });
}
function ul(e) {
  rn("app:unmount", e);
}
const fl = /* @__PURE__ */ jo(
  "component:added"
  /* COMPONENT_ADDED */
), mr = /* @__PURE__ */ jo(
  "component:updated"
  /* COMPONENT_UPDATED */
), al = /* @__PURE__ */ jo(
  "component:removed"
  /* COMPONENT_REMOVED */
), dl = (e) => {
  Se && typeof Se.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !Se.cleanupBuffer(e) && al(e);
};
// @__NO_SIDE_EFFECTS__
function jo(e) {
  return (t) => {
    rn(
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
    rn(e, t.appContext.app, t.uid, t, n, o);
  };
}
function gl(e, t, n) {
  rn(
    "component:emit",
    e.appContext.app,
    e,
    t,
    n
  );
}
let Ne = null, Er = null;
function Tn(e) {
  const t = Ne;
  return Ne = e, Er = e && e.type.__scopeId || null, t;
}
function vl(e, t = Ne, n) {
  if (!t || e._n)
    return e;
  const o = (...s) => {
    o._d && _s(-1);
    const r = Tn(t);
    let i;
    try {
      i = e(...s);
    } finally {
      Tn(r), o._d && _s(1);
    }
    return process.env.NODE_ENV !== "production" && mr(t), i;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function yr(e) {
  ii(e) && O("Do not use built-in directive ids as custom directive id: " + e);
}
function at(e, t, n, o) {
  const s = e.dirs, r = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const l = s[i];
    r && (l.oldValue = r[i].value);
    let u = l.dir[o];
    u && (Ae(), Ge(u, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Re());
  }
}
const ml = Symbol("_vte"), _l = (e) => e.__isTeleport, El = Symbol("_leaveCb");
function ko(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, ko(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Mt(e, t) {
  return $(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ee({ name: e.name }, t, { setup: e })
  ) : e;
}
function br(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const rs = /* @__PURE__ */ new WeakSet(), Mn = /* @__PURE__ */ new WeakMap();
function Wt(e, t, n, o, s = !1) {
  if (M(e)) {
    e.forEach(
      (V, Q) => Wt(
        V,
        t && (M(t) ? t[Q] : t),
        n,
        o,
        s
      )
    );
    return;
  }
  if (Gt(o) && !s) {
    o.shapeFlag & 512 && o.type.__asyncResolved && o.component.subTree.component && Wt(e, t, n, o.component.subTree);
    return;
  }
  const r = o.shapeFlag & 4 ? Yo(o.component) : o.el, i = s ? null : r, { i: l, r: u } = e;
  if (process.env.NODE_ENV !== "production" && !l) {
    O(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const p = t && t.r, d = l.refs === K ? l.refs = {} : l.refs, a = l.setupState, g = R(a), y = a === K ? ks : (V) => process.env.NODE_ENV !== "production" && (k(g, V) && !X(g[V]) && O(
    `Template ref "${V}" used on a non-ref value. It will not work in the production build.`
  ), rs.has(g[V])) ? !1 : k(g, V), D = (V) => process.env.NODE_ENV === "production" || !rs.has(V);
  if (p != null && p !== u) {
    if (is(t), z(p))
      d[p] = null, y(p) && (a[p] = null);
    else if (X(p)) {
      D(p) && (p.value = null);
      const V = t;
      V.k && (d[V.k] = null);
    }
  }
  if ($(u))
    Tt(u, l, 12, [i, d]);
  else {
    const V = z(u), Q = X(u);
    if (V || Q) {
      const H = () => {
        if (e.f) {
          const P = V ? y(u) ? a[u] : d[u] : D(u) || !e.k ? u.value : d[e.k];
          if (s)
            M(P) && wo(P, r);
          else if (M(P))
            P.includes(r) || P.push(r);
          else if (V)
            d[u] = [r], y(u) && (a[u] = d[u]);
          else {
            const I = [r];
            D(u) && (u.value = I), e.k && (d[e.k] = I);
          }
        } else V ? (d[u] = i, y(u) && (a[u] = i)) : Q ? (D(u) && (u.value = i), e.k && (d[e.k] = i)) : process.env.NODE_ENV !== "production" && O("Invalid template ref type:", u, `(${typeof u})`);
      };
      if (i) {
        const P = () => {
          H(), Mn.delete(e);
        };
        P.id = -1, Mn.set(e, P), ye(P, n);
      } else
        is(e), H();
    } else process.env.NODE_ENV !== "production" && O("Invalid template ref type:", u, `(${typeof u})`);
  }
}
function is(e) {
  const t = Mn.get(e);
  t && (t.flags |= 8, Mn.delete(e));
}
nn().requestIdleCallback;
nn().cancelIdleCallback;
const Gt = (e) => !!e.type.__asyncLoader, Ho = (e) => e.type.__isKeepAlive;
function yl(e, t) {
  Nr(e, "a", t);
}
function bl(e, t) {
  Nr(e, "da", t);
}
function Nr(e, t, n = ce) {
  const o = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if (Wn(t, o, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      Ho(s.parent.vnode) && Nl(o, t, n, s), s = s.parent;
  }
}
function Nl(e, t, n, o) {
  const s = Wn(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  Or(() => {
    wo(o[t], s);
  }, n);
}
function Wn(e, t, n = ce, o = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...i) => {
      Ae();
      const l = cn(n), u = Ge(t, n, e, i);
      return l(), Re(), u;
    });
    return o ? s.unshift(r) : s.push(r), r;
  } else if (process.env.NODE_ENV !== "production") {
    const s = pt(Io[e].replace(/ hook$/, ""));
    O(
      `${s} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const Qe = (e) => (t, n = ce) => {
  (!Qt || e === "sp") && Wn(e, (...o) => t(...o), n);
}, Ol = Qe("bm"), Uo = Qe("m"), xl = Qe(
  "bu"
), wl = Qe("u"), Dl = Qe(
  "bum"
), Or = Qe("um"), Vl = Qe(
  "sp"
), Sl = Qe("rtg"), Cl = Qe("rtc");
function Tl(e, t = ce) {
  Wn("ec", e, t);
}
const Ml = Symbol.for("v-ndc");
function $l(e, t, n, o) {
  let s;
  const r = n, i = M(e);
  if (i || z(e)) {
    const l = i && ct(e);
    let u = !1, p = !1;
    l && (u = !he(e), p = We(e), e = Hn(e)), s = new Array(e.length);
    for (let d = 0, a = e.length; d < a; d++)
      s[d] = t(
        u ? p ? Dn(le(e[d])) : le(e[d]) : e[d],
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
const go = (e) => e ? Yr(e) ? Yo(e) : go(e.parent) : null, _t = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ee(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? Be(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? Be(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? Be(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? Be(e.refs) : e.refs,
    $parent: (e) => go(e.parent),
    $root: (e) => go(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Dr(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Kn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Po.bind(e.proxy)),
    $watch: (e) => ac.bind(e)
  })
), Bo = (e) => e === "_" || e === "$", so = (e, t) => e !== K && !e.__isScriptSetup && k(e, t), xr = {
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
        if (so(o, t))
          return i[t] = 1, o[t];
        if (s !== K && k(s, t))
          return i[t] = 2, s[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (p = e.propsOptions[0]) && k(p, t)
        )
          return i[t] = 3, r[t];
        if (n !== K && k(n, t))
          return i[t] = 4, n[t];
        vo && (i[t] = 0);
      }
    }
    const d = _t[t];
    let a, g;
    if (d)
      return t === "$attrs" ? (se(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && Rn()) : process.env.NODE_ENV !== "production" && t === "$slots" && se(e, "get", t), d(e);
    if (
      // css module (injected by vue-loader)
      (a = l.__cssModules) && (a = a[t])
    )
      return a;
    if (n !== K && k(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      g = u.config.globalProperties, k(g, t)
    )
      return g[t];
    process.env.NODE_ENV !== "production" && Ne && (!z(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (s !== K && Bo(t[0]) && k(s, t) ? O(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === Ne && O(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: s, ctx: r } = e;
    return so(s, t) ? (s[t] = n, !0) : process.env.NODE_ENV !== "production" && s.__isScriptSetup && k(s, t) ? (O(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : o !== K && k(o, t) ? (o[t] = n, !0) : k(e.props, t) ? (process.env.NODE_ENV !== "production" && O(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && O(
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
    return !!(n[l] || e !== K && l[0] !== "$" && k(e, l) || so(t, l) || (u = r[0]) && k(u, l) || k(o, l) || k(_t, l) || k(s.config.globalProperties, l) || (p = i.__cssModules) && p[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : k(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
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
  }), Object.keys(_t).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => _t[n](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: re
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
      set: re
    });
  });
}
function Il(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(R(n)).forEach((o) => {
    if (!n.__isScriptSetup) {
      if (Bo(o[0])) {
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
        set: re
      });
    }
  });
}
function ls(e) {
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
let vo = !0;
function Ll(e) {
  const t = Dr(e), n = e.proxy, o = e.ctx;
  vo = !1, t.beforeCreate && cs(t.beforeCreate, e, "bc");
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
    deactivated: Q,
    beforeDestroy: H,
    beforeUnmount: P,
    destroyed: I,
    unmounted: te,
    render: S,
    renderTracked: Z,
    renderTriggered: ue,
    errorCaptured: ne,
    serverPrefetch: fe,
    // public API
    expose: we,
    inheritAttrs: ge,
    // assets
    components: ve,
    directives: et,
    filters: an
  } = t, Y = process.env.NODE_ENV !== "production" ? Pl() : null;
  if (process.env.NODE_ENV !== "production") {
    const [L] = e.propsOptions;
    if (L)
      for (const F in L)
        Y("Props", F);
  }
  if (p && Fl(p, o, Y), i)
    for (const L in i) {
      const F = i[L];
      $(F) ? (process.env.NODE_ENV !== "production" ? Object.defineProperty(o, L, {
        value: F.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : o[L] = F.bind(n), process.env.NODE_ENV !== "production" && Y("Methods", L)) : process.env.NODE_ENV !== "production" && O(
        `Method "${L}" has type "${typeof F}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (s) {
    process.env.NODE_ENV !== "production" && !$(s) && O(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const L = s.call(n, n);
    if (process.env.NODE_ENV !== "production" && Do(L) && O(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !W(L))
      process.env.NODE_ENV !== "production" && O("data() should return an object.");
    else if (e.data = Ro(L), process.env.NODE_ENV !== "production")
      for (const F in L)
        Y("Data", F), Bo(F[0]) || Object.defineProperty(o, F, {
          configurable: !0,
          enumerable: !0,
          get: () => L[F],
          set: re
        });
  }
  if (vo = !0, r)
    for (const L in r) {
      const F = r[L], Ie = $(F) ? F.bind(n, n) : $(F.get) ? F.get.bind(n, n) : re;
      process.env.NODE_ENV !== "production" && Ie === re && O(`Computed property "${L}" has no getter.`);
      const qn = !$(F) && $(F.set) ? F.set.bind(n) : process.env.NODE_ENV !== "production" ? () => {
        O(
          `Write operation failed: computed property "${L}" is readonly.`
        );
      } : re, $t = Oo({
        get: Ie,
        set: qn
      });
      Object.defineProperty(o, L, {
        enumerable: !0,
        configurable: !0,
        get: () => $t.value,
        set: (bt) => $t.value = bt
      }), process.env.NODE_ENV !== "production" && Y("Computed", L);
    }
  if (l)
    for (const L in l)
      wr(l[L], o, n, L);
  if (u) {
    const L = $(u) ? u.call(n) : u;
    Reflect.ownKeys(L).forEach((F) => {
      Kl(F, L[F]);
    });
  }
  d && cs(d, e, "c");
  function q(L, F) {
    M(F) ? F.forEach((Ie) => L(Ie.bind(n))) : F && L(F.bind(n));
  }
  if (q(Ol, a), q(Uo, g), q(xl, y), q(wl, D), q(yl, V), q(bl, Q), q(Tl, ne), q(Cl, Z), q(Sl, ue), q(Dl, P), q(Or, te), q(Vl, fe), M(we))
    if (we.length) {
      const L = e.exposed || (e.exposed = {});
      we.forEach((F) => {
        Object.defineProperty(L, F, {
          get: () => n[F],
          set: (Ie) => n[F] = Ie,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  S && e.render === re && (e.render = S), ge != null && (e.inheritAttrs = ge), ve && (e.components = ve), et && (e.directives = et), fe && br(e);
}
function Fl(e, t, n = re) {
  M(e) && (e = mo(e));
  for (const o in e) {
    const s = e[o];
    let r;
    W(s) ? "default" in s ? r = Zt(
      s.from || o,
      s.default,
      !0
    ) : r = Zt(s.from || o) : r = Zt(s), X(r) ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (i) => r.value = i
    }) : t[o] = r, process.env.NODE_ENV !== "production" && n("Inject", o);
  }
}
function cs(e, t, n) {
  Ge(
    M(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function wr(e, t, n, o) {
  let s = o.includes(".") ? Fr(n, o) : () => n[o];
  if (z(e)) {
    const r = t[e];
    $(r) ? Et(s, r) : process.env.NODE_ENV !== "production" && O(`Invalid watch handler specified by key "${e}"`, r);
  } else if ($(e))
    Et(s, e.bind(n));
  else if (W(e))
    if (M(e))
      e.forEach((r) => wr(r, t, n, o));
    else {
      const r = $(e.handler) ? e.handler.bind(n) : t[e.handler];
      $(r) ? Et(s, r, e) : process.env.NODE_ENV !== "production" && O(`Invalid watch handler specified by key "${e.handler}"`, r);
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
    (p) => $n(u, p, i, !0)
  ), $n(u, t, i)), W(t) && r.set(t, u), u;
}
function $n(e, t, n, o = !1) {
  const { mixins: s, extends: r } = t;
  r && $n(e, r, n, !0), s && s.forEach(
    (i) => $n(e, i, n, !0)
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
  data: us,
  props: fs,
  emits: fs,
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
  watch: Hl,
  // provide / inject
  provide: us,
  inject: kl
};
function us(e, t) {
  return t ? e ? function() {
    return ee(
      $(e) ? e.call(this, this) : e,
      $(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function kl(e, t) {
  return Ht(mo(e), mo(t));
}
function mo(e) {
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
  return e ? ee(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function fs(e, t) {
  return e ? M(e) && M(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ee(
    /* @__PURE__ */ Object.create(null),
    ls(e),
    ls(t ?? {})
  ) : t;
}
function Hl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ee(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = de(e[o], t[o]);
  return n;
}
function Vr() {
  return {
    app: null,
    config: {
      isNativeTag: ks,
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
    $(o) || (o = ee({}, o)), s != null && !W(s) && (process.env.NODE_ENV !== "production" && O("root props passed to app.mount() must be an object."), s = null);
    const r = Vr(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let u = !1;
    const p = r.app = {
      _uid: Ul++,
      _component: o,
      _props: s,
      _container: null,
      _context: r,
      _instance: null,
      version: Ns,
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
        return process.env.NODE_ENV !== "production" && No(d, r.config), a ? (process.env.NODE_ENV !== "production" && r.components[d] && O(`Component "${d}" has already been registered in target app.`), r.components[d] = a, p) : r.components[d];
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
            const D = ut(y);
            D.el = null, e(D, d, g);
          }), e(y, d, g), u = !0, p._container = d, d.__vue_app__ = p, process.env.NODE_ENV !== "production" && (p._instance = y.component, cl(p, Ns)), Yo(y.component);
        }
      },
      onUnmount(d) {
        process.env.NODE_ENV !== "production" && typeof d != "function" && O(
          `Expected function as first argument to app.onUnmount(), but got ${typeof d}`
        ), l.push(d);
      },
      unmount() {
        u ? (Ge(
          l,
          p._instance,
          16
        ), e(null, p._container), process.env.NODE_ENV !== "production" && (p._instance = null, ul(p)), delete p._container.__vue_app__) : process.env.NODE_ENV !== "production" && O("Cannot unmount an app that is not mounted.");
      },
      provide(d, a) {
        return process.env.NODE_ENV !== "production" && d in r.provides && (k(r.provides, d) ? O(
          `App already provides property with key "${String(d)}". It will be overwritten with the new value.`
        ) : O(
          `App already provides property with key "${String(d)}" inherited from its parent element. It will be overwritten with the new value.`
        )), r.provides[d] = a, p;
      },
      runWithContext(d) {
        const a = St;
        St = p;
        try {
          return d();
        } finally {
          St = a;
        }
      }
    };
    return p;
  };
}
let St = null;
function Kl(e, t) {
  if (!ce)
    process.env.NODE_ENV !== "production" && O("provide() can only be used inside setup().");
  else {
    let n = ce.provides;
    const o = ce.parent && ce.parent.provides;
    o === n && (n = ce.provides = Object.create(o)), n[e] = t;
  }
}
function Zt(e, t, n = !1) {
  const o = Zr();
  if (o || St) {
    let s = St ? St._context.provides : o ? o.parent == null || o.ce ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : void 0;
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
        if (Gn(e.emitsOptions, g))
          continue;
        const y = t[g];
        if (u)
          if (k(r, g))
            y !== r[g] && (r[g] = y, p = !0);
          else {
            const D = Te(g);
            s[D] = _o(
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
      !k(t, a) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((d = ze(a)) === a || !k(t, d))) && (u ? n && // for camelCase
      (n[a] !== void 0 || // for kebab-case
      n[d] !== void 0) && (s[a] = _o(
        u,
        l,
        a,
        void 0,
        e,
        !0
      )) : delete s[a]);
    if (r !== l)
      for (const a in r)
        (!t || !k(t, a)) && (delete r[a], p = !0);
  }
  p && Ue(e.attrs, "set", ""), process.env.NODE_ENV !== "production" && Ar(t || {}, s, e);
}
function Mr(e, t, n, o) {
  const [s, r] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let u in t) {
      if (Ut(u))
        continue;
      const p = t[u];
      let d;
      s && k(s, d = Te(u)) ? !r || !r.includes(d) ? n[d] = p : (l || (l = {}))[d] = p : Gn(e.emitsOptions, u) || (!(u in o) || p !== o[u]) && (o[u] = p, i = !0);
    }
  if (r) {
    const u = R(n), p = l || K;
    for (let d = 0; d < r.length; d++) {
      const a = r[d];
      n[a] = _o(
        s,
        u,
        a,
        p[a],
        e,
        !k(p, a)
      );
    }
  }
  return i;
}
function _o(e, t, n, o, s, r) {
  const i = e[n];
  if (i != null) {
    const l = k(i, "default");
    if (l && o === void 0) {
      const u = i.default;
      if (i.type !== Function && !i.skipFactory && $(u)) {
        const { propsDefaults: p } = s;
        if (n in p)
          o = p[n];
        else {
          const d = cn(s);
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
    ] && (o === "" || o === ze(n)) && (o = !0));
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
      ee(i, g), y && l.push(...y);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!r && !u)
    return W(e) && o.set(e, Dt), Dt;
  if (M(r))
    for (let d = 0; d < r.length; d++) {
      process.env.NODE_ENV !== "production" && !z(r[d]) && O("props must be strings when using array syntax.", r[d]);
      const a = Te(r[d]);
      as(a) && (i[a] = K);
    }
  else if (r) {
    process.env.NODE_ENV !== "production" && !W(r) && O("invalid props options", r);
    for (const d in r) {
      const a = Te(d);
      if (as(a)) {
        const g = r[d], y = i[a] = M(g) || $(g) ? { type: g } : ee({}, g), D = y.type;
        let V = !1, Q = !0;
        if (M(D))
          for (let H = 0; H < D.length; ++H) {
            const P = D[H], I = $(P) && P.name;
            if (I === "Boolean") {
              V = !0;
              break;
            } else I === "String" && (Q = !1);
          }
        else
          V = $(D) && D.name === "Boolean";
        y[
          0
          /* shouldCast */
        ] = V, y[
          1
          /* shouldCastTrue */
        ] = Q, (V || k(y, "default")) && l.push(a);
      }
    }
  }
  const p = [i, l];
  return W(e) && o.set(e, p), p;
}
function as(e) {
  return e[0] !== "$" && !Ut(e) ? !0 : (process.env.NODE_ENV !== "production" && O(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function ql(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function Ar(e, t, n) {
  const o = R(t), s = n.propsOptions[0], r = Object.keys(e).map((i) => Te(i));
  for (const i in s) {
    let l = s[i];
    l != null && Jl(
      i,
      o[i],
      l,
      process.env.NODE_ENV !== "production" ? Be(o) : o,
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
const zl = /* @__PURE__ */ Xe(
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
  let o = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(jn).join(" | ")}`;
  const s = n[0], r = Vo(t), i = ds(t, s), l = ds(t, r);
  return n.length === 1 && ps(s) && !ec(s, r) && (o += ` with value ${i}`), o += `, got ${r} `, ps(r) && (o += `with value ${l}.`), o;
}
function ds(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function ps(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function ec(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const Ko = (e) => e === "_" || e === "_ctx" || e === "$stable", Wo = (e) => M(e) ? e.map(Ve) : [Ve(e)], tc = (e, t, n) => {
  if (t._n)
    return t;
  const o = vl((...s) => (process.env.NODE_ENV !== "production" && ce && !(n === null && Ne) && !(n && n.root !== ce.root) && O(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), Wo(t(...s))), n);
  return o._c = !1, o;
}, Rr = (e, t, n) => {
  const o = e._ctx;
  for (const s in e) {
    if (Ko(s)) continue;
    const r = e[s];
    if ($(r))
      t[s] = tc(s, r, o);
    else if (r != null) {
      process.env.NODE_ENV !== "production" && O(
        `Non-function value encountered for slot "${s}". Prefer function slots for better performance.`
      );
      const i = Wo(r);
      t[s] = () => i;
    }
  }
}, Ir = (e, t) => {
  process.env.NODE_ENV !== "production" && !Ho(e.vnode) && O(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = Wo(t);
  e.slots.default = () => n;
}, Eo = (e, t, n) => {
  for (const o in t)
    (n || !Ko(o)) && (e[o] = t[o]);
}, nc = (e, t, n) => {
  const o = e.slots = Cr();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (Eo(o, t, n), n && xn(o, "_", s, !0)) : Rr(t, o);
  } else t && Ir(e, t);
}, oc = (e, t, n) => {
  const { vnode: o, slots: s } = e;
  let r = !0, i = K;
  if (o.shapeFlag & 32) {
    const l = t._;
    l ? process.env.NODE_ENV !== "production" && Ke ? (Eo(s, t, n), Ue(e, "set", "$slots")) : n && l === 1 ? r = !1 : Eo(s, t, n) : (r = !t.$stable, Rr(t, s)), i = t;
  } else t && (Ir(e, t), i = { default: 1 });
  if (r)
    for (const l in s)
      !Ko(l) && i[l] == null && delete s[l];
};
let Ft, qe;
function Ot(e, t) {
  e.appContext.config.performance && An() && qe.mark(`vue-${t}-${e.uid}`), process.env.NODE_ENV !== "production" && pl(e, t, An() ? qe.now() : Date.now());
}
function xt(e, t) {
  if (e.appContext.config.performance && An()) {
    const n = `vue-${t}-${e.uid}`, o = n + ":end", s = `<${Yn(e, e.type)}> ${t}`;
    qe.mark(o), qe.measure(s, n, o), qe.clearMeasures(s), qe.clearMarks(n), qe.clearMarks(o);
  }
  process.env.NODE_ENV !== "production" && hl(e, t, An() ? qe.now() : Date.now());
}
function An() {
  return Ft !== void 0 || (typeof window < "u" && window.performance ? (Ft = !0, qe = window.performance) : Ft = !1), Ft;
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
  const n = nn();
  n.__VUE__ = !0, process.env.NODE_ENV !== "production" && Fo(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
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
    setScopeId: y = re,
    insertStaticContent: D
  } = e, V = (c, f, h, _ = null, v = null, m = null, x = void 0, N = null, b = process.env.NODE_ENV !== "production" && Ke ? !1 : !!f.dynamicChildren) => {
    if (c === f)
      return;
    c && !jt(c, f) && (_ = dn(c), tt(c, v, m, !0), c = null), f.patchFlag === -2 && (b = !1, f.dynamicChildren = null);
    const { type: E, ref: T, shapeFlag: w } = f;
    switch (E) {
      case ln:
        Q(c, f, h, _);
        break;
      case xe:
        H(c, f, h, _);
        break;
      case yn:
        c == null ? P(f, h, _, x) : process.env.NODE_ENV !== "production" && I(c, f, h, x);
        break;
      case be:
        et(
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
        w & 1 ? Z(
          c,
          f,
          h,
          _,
          v,
          m,
          x,
          N,
          b
        ) : w & 6 ? an(
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
          Rt
        ) : process.env.NODE_ENV !== "production" && O("Invalid VNode type:", E, `(${typeof E})`);
    }
    T != null && v ? Wt(T, c && c.ref, m, f || c, !f) : T == null && c && c.ref != null && Wt(c.ref, null, m, c, !0);
  }, Q = (c, f, h, _) => {
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
  }, H = (c, f, h, _) => {
    c == null ? o(
      f.el = u(f.children || ""),
      h,
      _
    ) : f.el = c.el;
  }, P = (c, f, h, _) => {
    [c.el, c.anchor] = D(
      c.children,
      f,
      h,
      _,
      c.el,
      c.anchor
    );
  }, I = (c, f, h, _) => {
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
  }, te = ({ el: c, anchor: f }, h, _) => {
    let v;
    for (; c && c !== f; )
      v = g(c), o(c, h, _), c = v;
    o(f, h, _);
  }, S = ({ el: c, anchor: f }) => {
    let h;
    for (; c && c !== f; )
      h = g(c), s(c), c = h;
    s(f);
  }, Z = (c, f, h, _, v, m, x, N, b) => {
    f.type === "svg" ? x = "svg" : f.type === "math" && (x = "mathml"), c == null ? ue(
      f,
      h,
      _,
      v,
      m,
      x,
      N,
      b
    ) : we(
      c,
      f,
      v,
      m,
      x,
      N,
      b
    );
  }, ue = (c, f, h, _, v, m, x, N) => {
    let b, E;
    const { props: T, shapeFlag: w, transition: C, dirs: A } = c;
    if (b = c.el = i(
      c.type,
      m,
      T && T.is,
      T
    ), w & 8 ? d(b, c.children) : w & 16 && fe(
      c.children,
      b,
      null,
      _,
      v,
      ro(c, m),
      x,
      N
    ), A && at(c, null, _, "created"), ne(b, c, c.scopeId, x, _), T) {
      for (const G in T)
        G !== "value" && !Ut(G) && r(b, G, null, T[G], m, _);
      "value" in T && r(b, "value", null, T.value, m), (E = T.onVnodeBeforeMount) && je(E, _, c);
    }
    process.env.NODE_ENV !== "production" && (xn(b, "__vnode", c, !0), xn(b, "__vueParentComponent", _, !0)), A && at(c, null, _, "beforeMount");
    const j = lc(v, C);
    j && C.beforeEnter(b), o(b, f, h), ((E = T && T.onVnodeMounted) || j || A) && ye(() => {
      E && je(E, _, c), j && C.enter(b), A && at(c, null, _, "mounted");
    }, v);
  }, ne = (c, f, h, _, v) => {
    if (h && y(c, h), _)
      for (let m = 0; m < _.length; m++)
        y(c, _[m]);
    if (v) {
      let m = v.subTree;
      if (process.env.NODE_ENV !== "production" && m.patchFlag > 0 && m.patchFlag & 2048 && (m = Go(m.children) || m), f === m || Hr(m.type) && (m.ssContent === f || m.ssFallback === f)) {
        const x = v.vnode;
        ne(
          c,
          x,
          x.scopeId,
          x.slotScopeIds,
          v.parent
        );
      }
    }
  }, fe = (c, f, h, _, v, m, x, N, b = 0) => {
    for (let E = b; E < c.length; E++) {
      const T = c[E] = N ? st(c[E]) : Ve(c[E]);
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
  }, we = (c, f, h, _, v, m, x) => {
    const N = f.el = c.el;
    process.env.NODE_ENV !== "production" && (N.__vnode = f);
    let { patchFlag: b, dynamicChildren: E, dirs: T } = f;
    b |= c.patchFlag & 16;
    const w = c.props || K, C = f.props || K;
    let A;
    if (h && dt(h, !1), (A = C.onVnodeBeforeUpdate) && je(A, h, f, c), T && at(f, c, h, "beforeUpdate"), h && dt(h, !0), process.env.NODE_ENV !== "production" && Ke && (b = 0, x = !1, E = null), (w.innerHTML && C.innerHTML == null || w.textContent && C.textContent == null) && d(N, ""), E ? (ge(
      c.dynamicChildren,
      E,
      N,
      h,
      _,
      ro(f, v),
      m
    ), process.env.NODE_ENV !== "production" && En(c, f)) : x || Ie(
      c,
      f,
      N,
      null,
      h,
      _,
      ro(f, v),
      m,
      !1
    ), b > 0) {
      if (b & 16)
        ve(N, w, C, h, v);
      else if (b & 2 && w.class !== C.class && r(N, "class", null, C.class, v), b & 4 && r(N, "style", w.style, C.style, v), b & 8) {
        const j = f.dynamicProps;
        for (let G = 0; G < j.length; G++) {
          const B = j[G], me = w[B], _e = C[B];
          (_e !== me || B === "value") && r(N, B, me, _e, v, h);
        }
      }
      b & 1 && c.children !== f.children && d(N, f.children);
    } else !x && E == null && ve(N, w, C, h, v);
    ((A = C.onVnodeUpdated) || T) && ye(() => {
      A && je(A, h, f, c), T && at(f, c, h, "updated");
    }, _);
  }, ge = (c, f, h, _, v, m, x) => {
    for (let N = 0; N < f.length; N++) {
      const b = c[N], E = f[N], T = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        b.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (b.type === be || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !jt(b, E) || // - In the case of a component, it could contain anything.
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
  }, ve = (c, f, h, _, v) => {
    if (f !== h) {
      if (f !== K)
        for (const m in f)
          !Ut(m) && !(m in h) && r(
            c,
            m,
            f[m],
            null,
            v,
            _
          );
      for (const m in h) {
        if (Ut(m)) continue;
        const x = h[m], N = f[m];
        x !== N && m !== "value" && r(c, m, N, x, v, _);
      }
      "value" in h && r(c, "value", f.value, h.value, v);
    }
  }, et = (c, f, h, _, v, m, x, N, b) => {
    const E = f.el = c ? c.el : l(""), T = f.anchor = c ? c.anchor : l("");
    let { patchFlag: w, dynamicChildren: C, slotScopeIds: A } = f;
    process.env.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (Ke || w & 2048) && (w = 0, b = !1, C = null), A && (N = N ? N.concat(A) : A), c == null ? (o(E, h, _), o(T, h, _), fe(
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
    c.dynamicChildren ? (ge(
      c.dynamicChildren,
      C,
      h,
      v,
      m,
      x,
      N
    ), process.env.NODE_ENV !== "production" ? En(c, f) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (f.key != null || v && f === v.subTree) && En(
        c,
        f,
        !0
        /* shallow */
      )
    )) : Ie(
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
  }, an = (c, f, h, _, v, m, x, N, b) => {
    f.slotScopeIds = N, c == null ? f.shapeFlag & 512 ? v.ctx.activate(
      f,
      h,
      _,
      x,
      b
    ) : Y(
      f,
      h,
      _,
      v,
      m,
      x,
      b
    ) : q(c, f, b);
  }, Y = (c, f, h, _, v, m, x) => {
    const N = c.component = Dc(
      c,
      _,
      v
    );
    if (process.env.NODE_ENV !== "production" && N.type.__hmrId && sl(N), process.env.NODE_ENV !== "production" && (vn(c), Ot(N, "mount")), Ho(c) && (N.ctx.renderer = Rt), process.env.NODE_ENV !== "production" && Ot(N, "init"), Sc(N, !1, x), process.env.NODE_ENV !== "production" && xt(N, "init"), process.env.NODE_ENV !== "production" && Ke && (c.el = null), N.asyncDep) {
      if (v && v.registerDep(N, L, x), !c.el) {
        const b = N.subTree = De(xe);
        H(null, b, f, h), c.placeholder = b.el;
      }
    } else
      L(
        N,
        c,
        f,
        h,
        v,
        m,
        x
      );
    process.env.NODE_ENV !== "production" && (mn(), xt(N, "mount"));
  }, q = (c, f, h) => {
    const _ = f.component = c.component;
    if (mc(c, f, h))
      if (_.asyncDep && !_.asyncResolved) {
        process.env.NODE_ENV !== "production" && vn(f), F(_, f, h), process.env.NODE_ENV !== "production" && mn();
        return;
      } else
        _.next = f, _.update();
    else
      f.el = c.el, _.vnode = f;
  }, L = (c, f, h, _, v, m, x) => {
    const N = () => {
      if (c.isMounted) {
        let { next: w, bu: C, u: A, parent: j, vnode: G } = c;
        {
          const Le = Pr(c);
          if (Le) {
            w && (w.el = G.el, F(c, w, x)), Le.asyncDep.then(() => {
              c.isUnmounted || N();
            });
            return;
          }
        }
        let B = w, me;
        process.env.NODE_ENV !== "production" && vn(w || c.vnode), dt(c, !1), w ? (w.el = G.el, F(c, w, x)) : w = G, C && Pt(C), (me = w.props && w.props.onVnodeBeforeUpdate) && je(me, j, w, G), dt(c, !0), process.env.NODE_ENV !== "production" && Ot(c, "render");
        const _e = gs(c);
        process.env.NODE_ENV !== "production" && xt(c, "render");
        const Pe = c.subTree;
        c.subTree = _e, process.env.NODE_ENV !== "production" && Ot(c, "patch"), V(
          Pe,
          _e,
          // parent may have changed if it's in a teleport
          a(Pe.el),
          // anchor may have changed if it's in a fragment
          dn(Pe),
          c,
          v,
          m
        ), process.env.NODE_ENV !== "production" && xt(c, "patch"), w.el = _e.el, B === null && _c(c, _e.el), A && ye(A, v), (me = w.props && w.props.onVnodeUpdated) && ye(
          () => je(me, j, w, G),
          v
        ), process.env.NODE_ENV !== "production" && mr(c), process.env.NODE_ENV !== "production" && mn();
      } else {
        let w;
        const { el: C, props: A } = f, { bm: j, m: G, parent: B, root: me, type: _e } = c, Pe = Gt(f);
        dt(c, !1), j && Pt(j), !Pe && (w = A && A.onVnodeBeforeMount) && je(w, B, f), dt(c, !0);
        {
          me.ce && // @ts-expect-error _def is private
          me.ce._def.shadowRoot !== !1 && me.ce._injectChildStyle(_e), process.env.NODE_ENV !== "production" && Ot(c, "render");
          const Le = c.subTree = gs(c);
          process.env.NODE_ENV !== "production" && xt(c, "render"), process.env.NODE_ENV !== "production" && Ot(c, "patch"), V(
            null,
            Le,
            h,
            _,
            c,
            v,
            m
          ), process.env.NODE_ENV !== "production" && xt(c, "patch"), f.el = Le.el;
        }
        if (G && ye(G, v), !Pe && (w = A && A.onVnodeMounted)) {
          const Le = f;
          ye(
            () => je(w, B, Le),
            v
          );
        }
        (f.shapeFlag & 256 || B && Gt(B.vnode) && B.vnode.shapeFlag & 256) && c.a && ye(c.a, v), c.isMounted = !0, process.env.NODE_ENV !== "production" && fl(c), f = h = _ = null;
      }
    };
    c.scope.on();
    const b = c.effect = new Zs(N);
    c.scope.off();
    const E = c.update = b.run.bind(b), T = c.job = b.runIfDirty.bind(b);
    T.i = c, T.id = c.uid, b.scheduler = () => Kn(T), dt(c, !0), process.env.NODE_ENV !== "production" && (b.onTrack = c.rtc ? (w) => Pt(c.rtc, w) : void 0, b.onTrigger = c.rtg ? (w) => Pt(c.rtg, w) : void 0), E();
  }, F = (c, f, h) => {
    f.component = c;
    const _ = c.vnode.props;
    c.vnode = f, c.next = null, Zl(c, f.props, _, h), oc(c, f.children, h), Ae(), os(c), Re();
  }, Ie = (c, f, h, _, v, m, x, N, b = !1) => {
    const E = c && c.children, T = c ? c.shapeFlag : 0, w = f.children, { patchFlag: C, shapeFlag: A } = f;
    if (C > 0) {
      if (C & 128) {
        $t(
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
        qn(
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
    A & 8 ? (T & 16 && At(E, v, m), w !== E && d(h, w)) : T & 16 ? A & 16 ? $t(
      E,
      w,
      h,
      _,
      v,
      m,
      x,
      N,
      b
    ) : At(E, v, m, !0) : (T & 8 && d(h, ""), A & 16 && fe(
      w,
      h,
      _,
      v,
      m,
      x,
      N,
      b
    ));
  }, qn = (c, f, h, _, v, m, x, N, b) => {
    c = c || Dt, f = f || Dt;
    const E = c.length, T = f.length, w = Math.min(E, T);
    let C;
    for (C = 0; C < w; C++) {
      const A = f[C] = b ? st(f[C]) : Ve(f[C]);
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
    E > T ? At(
      c,
      v,
      m,
      !0,
      !1,
      w
    ) : fe(
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
  }, $t = (c, f, h, _, v, m, x, N, b) => {
    let E = 0;
    const T = f.length;
    let w = c.length - 1, C = T - 1;
    for (; E <= w && E <= C; ) {
      const A = c[E], j = f[E] = b ? st(f[E]) : Ve(f[E]);
      if (jt(A, j))
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
      const A = c[w], j = f[C] = b ? st(f[C]) : Ve(f[C]);
      if (jt(A, j))
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
            f[E] = b ? st(f[E]) : Ve(f[E]),
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
        tt(c[E], v, m, !0), E++;
    else {
      const A = E, j = E, G = /* @__PURE__ */ new Map();
      for (E = j; E <= C; E++) {
        const ae = f[E] = b ? st(f[E]) : Ve(f[E]);
        ae.key != null && (process.env.NODE_ENV !== "production" && G.has(ae.key) && O(
          "Duplicate keys found during update:",
          JSON.stringify(ae.key),
          "Make sure keys are unique."
        ), G.set(ae.key, E));
      }
      let B, me = 0;
      const _e = C - j + 1;
      let Pe = !1, Le = 0;
      const It = new Array(_e);
      for (E = 0; E < _e; E++) It[E] = 0;
      for (E = A; E <= w; E++) {
        const ae = c[E];
        if (me >= _e) {
          tt(ae, v, m, !0);
          continue;
        }
        let Fe;
        if (ae.key != null)
          Fe = G.get(ae.key);
        else
          for (B = j; B <= C; B++)
            if (It[B - j] === 0 && jt(ae, f[B])) {
              Fe = B;
              break;
            }
        Fe === void 0 ? tt(ae, v, m, !0) : (It[Fe - j] = E + 1, Fe >= Le ? Le = Fe : Pe = !0, V(
          ae,
          f[Fe],
          h,
          null,
          v,
          m,
          x,
          N,
          b
        ), me++);
      }
      const Jo = Pe ? cc(It) : Dt;
      for (B = Jo.length - 1, E = _e - 1; E >= 0; E--) {
        const ae = j + E, Fe = f[ae], zo = f[ae + 1], Xo = ae + 1 < T ? (
          // #13559, fallback to el placeholder for unresolved async component
          zo.el || zo.placeholder
        ) : _;
        It[E] === 0 ? V(
          null,
          Fe,
          h,
          Xo,
          v,
          m,
          x,
          N,
          b
        ) : Pe && (B < 0 || E !== Jo[B] ? bt(Fe, h, Xo, 2) : B--);
      }
    }
  }, bt = (c, f, h, _, v = null) => {
    const { el: m, type: x, transition: N, children: b, shapeFlag: E } = c;
    if (E & 6) {
      bt(c.component.subTree, f, h, _);
      return;
    }
    if (E & 128) {
      c.suspense.move(f, h, _);
      return;
    }
    if (E & 64) {
      x.move(c, f, h, Rt);
      return;
    }
    if (x === be) {
      o(m, f, h);
      for (let w = 0; w < b.length; w++)
        bt(b[w], f, h, _);
      o(c.anchor, f, h);
      return;
    }
    if (x === yn) {
      te(c, f, h);
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
  }, tt = (c, f, h, _ = !1, v = !1) => {
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
    if (w === -2 && (v = !1), N != null && (Ae(), Wt(N, null, h, c, !0), Re()), A != null && (f.renderCache[A] = void 0), T & 256) {
      f.ctx.deactivate(c);
      return;
    }
    const j = T & 1 && C, G = !Gt(c);
    let B;
    if (G && (B = x && x.onVnodeBeforeUnmount) && je(B, f, c), T & 6)
      si(c.component, h, _);
    else {
      if (T & 128) {
        c.suspense.unmount(h, _);
        return;
      }
      j && at(c, null, f, "beforeUnmount"), T & 64 ? c.type.remove(
        c,
        f,
        h,
        Rt,
        _
      ) : E && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !E.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (m !== be || w > 0 && w & 64) ? At(
        E,
        f,
        h,
        !1,
        !0
      ) : (m === be && w & 384 || !v && T & 16) && At(b, f, h), _ && Jn(c);
    }
    (G && (B = x && x.onVnodeUnmounted) || j) && ye(() => {
      B && je(B, f, c), j && at(c, null, f, "unmounted");
    }, h);
  }, Jn = (c) => {
    const { type: f, el: h, anchor: _, transition: v } = c;
    if (f === be) {
      process.env.NODE_ENV !== "production" && c.patchFlag > 0 && c.patchFlag & 2048 && v && !v.persisted ? c.children.forEach((x) => {
        x.type === xe ? s(x.el) : Jn(x);
      }) : oi(h, _);
      return;
    }
    if (f === yn) {
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
    hs(b), hs(E), _ && Pt(_), v.stop(), m && (m.flags |= 8, tt(x, c, f, h)), N && ye(N, f), ye(() => {
      c.isUnmounted = !0;
    }, f), process.env.NODE_ENV !== "production" && dl(c);
  }, At = (c, f, h, _ = !1, v = !1, m = 0) => {
    for (let x = m; x < c.length; x++)
      tt(c[x], f, h, _, v);
  }, dn = (c) => {
    if (c.shapeFlag & 6)
      return dn(c.component.subTree);
    if (c.shapeFlag & 128)
      return c.suspense.next();
    const f = g(c.anchor || c.el), h = f && f[ml];
    return h ? g(h) : f;
  };
  let zn = !1;
  const qo = (c, f, h) => {
    c == null ? f._vnode && tt(f._vnode, null, null, !0) : V(
      f._vnode || null,
      c,
      f,
      null,
      null,
      null,
      h
    ), f._vnode = c, zn || (zn = !0, os(), hr(), zn = !1);
  }, Rt = {
    p: V,
    um: tt,
    m: bt,
    r: Jn,
    mt: Y,
    mc: fe,
    pc: Ie,
    pbc: ge,
    n: dn,
    o: e
  };
  return {
    render: qo,
    hydrate: void 0,
    createApp: Bl(qo)
  };
}
function ro({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function dt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function lc(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function En(e, t, n = !1) {
  const o = e.children, s = t.children;
  if (M(o) && M(s))
    for (let r = 0; r < o.length; r++) {
      const i = o[r];
      let l = s[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = s[r] = st(s[r]), l.el = i.el), !n && l.patchFlag !== -2 && En(i, l)), l.type === ln && // avoid cached text nodes retaining detached dom nodes
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
function hs(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const uc = Symbol.for("v-scx"), fc = () => {
  {
    const e = Zt(uc);
    return e || process.env.NODE_ENV !== "production" && O(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function Et(e, t, n) {
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
  const l = ee({}, n);
  process.env.NODE_ENV !== "production" && (l.onWarn = O);
  const u = t && o || !t && r !== "post";
  let p;
  if (Qt) {
    if (r === "sync") {
      const y = fc();
      p = y.__watcherHandles || (y.__watcherHandles = []);
    } else if (!u) {
      const y = () => {
      };
      return y.stop = re, y.resume = re, y.pause = re, y;
    }
  }
  const d = ce;
  l.call = (y, D, V) => Ge(y, d, D, V);
  let a = !1;
  r === "post" ? l.scheduler = (y) => {
    ye(y, d && d.suspense);
  } : r !== "sync" && (a = !0, l.scheduler = (y, D) => {
    D ? y() : Kn(y);
  }), l.augmentJob = (y) => {
    t && (y.flags |= 4), a && (y.flags |= 2, d && (y.id = d.uid, y.i = d));
  };
  const g = Ji(e, t, l);
  return Qt && (p ? p.push(g) : u && g()), g;
}
function ac(e, t, n) {
  const o = this.proxy, s = z(e) ? e.includes(".") ? Fr(o, e) : () => o[e] : e.bind(o, o);
  let r;
  $(t) ? r = t : (r = t.handler, n = t);
  const i = cn(this), l = Lr(s, r.bind(o), n);
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
const dc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Te(t)}Modifiers`] || e[`${ze(t)}Modifiers`];
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
        (!a || !(pt(Te(t)) in a)) && O(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${pt(Te(t))}" prop.`
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
  if (i && (i.trim && (s = n.map((d) => z(d) ? d.trim() : d)), i.number && (s = n.map(ui))), process.env.NODE_ENV !== "production" && gl(e, t, s), process.env.NODE_ENV !== "production") {
    const d = t.toLowerCase();
    d !== t && o[pt(d)] && O(
      `Event "${d}" is emitted in component ${Yn(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${ze(
        t
      )}" instead of "${t}".`
    );
  }
  let l, u = o[l = pt(t)] || // also try camelCase event handler (#2249)
  o[l = pt(Te(t))];
  !u && r && (u = o[l = pt(ze(t))]), u && Ge(
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
    e.emitted[l] = !0, Ge(
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
      d && (l = !0, ee(i, d));
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !r && !l ? (W(e) && o.set(e, null), null) : (M(r) ? r.forEach((u) => i[u] = null) : ee(i, r), W(e) && o.set(e, i), i);
}
function Gn(e, t) {
  return !e || !tn(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), k(e, t[0].toLowerCase() + t.slice(1)) || k(e, ze(t)) || k(e, t));
}
let yo = !1;
function Rn() {
  yo = !0;
}
function gs(e) {
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
  } = e, Q = Tn(e);
  let H, P;
  process.env.NODE_ENV !== "production" && (yo = !1);
  try {
    if (n.shapeFlag & 4) {
      const S = s || o, Z = process.env.NODE_ENV !== "production" && y.__isScriptSetup ? new Proxy(S, {
        get(ue, ne, fe) {
          return O(
            `Property '${String(
              ne
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(ue, ne, fe);
        }
      }) : S;
      H = Ve(
        p.call(
          Z,
          S,
          d,
          process.env.NODE_ENV !== "production" ? Be(a) : a,
          y,
          g,
          D
        )
      ), P = l;
    } else {
      const S = t;
      process.env.NODE_ENV !== "production" && l === a && Rn(), H = Ve(
        S.length > 1 ? S(
          process.env.NODE_ENV !== "production" ? Be(a) : a,
          process.env.NODE_ENV !== "production" ? {
            get attrs() {
              return Rn(), Be(l);
            },
            slots: i,
            emit: u
          } : { attrs: l, slots: i, emit: u }
        ) : S(
          process.env.NODE_ENV !== "production" ? Be(a) : a,
          null
        )
      ), P = t.props ? l : gc(l);
    }
  } catch (S) {
    Yt.length = 0, sn(S, e, 1), H = De(xe);
  }
  let I = H, te;
  if (process.env.NODE_ENV !== "production" && H.patchFlag > 0 && H.patchFlag & 2048 && ([I, te] = kr(H)), P && V !== !1) {
    const S = Object.keys(P), { shapeFlag: Z } = I;
    if (S.length) {
      if (Z & 7)
        r && S.some(On) && (P = vc(
          P,
          r
        )), I = ut(I, P, !1, !0);
      else if (process.env.NODE_ENV !== "production" && !yo && I.type !== xe) {
        const ue = Object.keys(l), ne = [], fe = [];
        for (let we = 0, ge = ue.length; we < ge; we++) {
          const ve = ue[we];
          tn(ve) ? On(ve) || ne.push(ve[2].toLowerCase() + ve.slice(3)) : fe.push(ve);
        }
        fe.length && O(
          `Extraneous non-props attributes (${fe.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`
        ), ne.length && O(
          `Extraneous non-emits event listeners (${ne.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return n.dirs && (process.env.NODE_ENV !== "production" && !vs(I) && O(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), I = ut(I, null, !1, !0), I.dirs = I.dirs ? I.dirs.concat(n.dirs) : n.dirs), n.transition && (process.env.NODE_ENV !== "production" && !vs(I) && O(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), ko(I, n.transition)), process.env.NODE_ENV !== "production" && te ? te(I) : H = I, Tn(Q), H;
}
const kr = (e) => {
  const t = e.children, n = e.dynamicChildren, o = Go(t, !1);
  if (o) {
    if (process.env.NODE_ENV !== "production" && o.patchFlag > 0 && o.patchFlag & 2048)
      return kr(o);
  } else return [e, void 0];
  const s = t.indexOf(o), r = n ? n.indexOf(o) : -1, i = (l) => {
    t[s] = l, n && (r > -1 ? n[r] = l : l.patchFlag > 0 && (e.dynamicChildren = [...n, l]));
  };
  return [Ve(o), i];
};
function Go(e, t = !0) {
  let n;
  for (let o = 0; o < e.length; o++) {
    const s = e[o];
    if (Zn(s)) {
      if (s.type !== xe || s.children === "v-if") {
        if (n)
          return;
        if (n = s, process.env.NODE_ENV !== "production" && t && n.patchFlag > 0 && n.patchFlag & 2048)
          return Go(n.children);
      }
    } else
      return;
  }
  return n;
}
const gc = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || tn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, vc = (e, t) => {
  const n = {};
  for (const o in e)
    (!On(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
}, vs = (e) => e.shapeFlag & 7 || e.type === xe;
function mc(e, t, n) {
  const { props: o, children: s, component: r } = e, { props: i, children: l, patchFlag: u } = t, p = r.emitsOptions;
  if (process.env.NODE_ENV !== "production" && (s || l) && Ke || t.dirs || t.transition)
    return !0;
  if (n && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return o ? ms(o, i, p) : !!i;
    if (u & 8) {
      const d = t.dynamicProps;
      for (let a = 0; a < d.length; a++) {
        const g = d[a];
        if (i[g] !== o[g] && !Gn(p, g))
          return !0;
      }
    }
  } else
    return (s || l) && (!l || !l.$stable) ? !0 : o === i ? !1 : o ? i ? ms(o, i, p) : !0 : !!i;
  return !1;
}
function ms(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let s = 0; s < o.length; s++) {
    const r = o[s];
    if (t[r] !== e[r] && !Gn(n, r))
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
const Hr = (e) => e.__isSuspense;
function Ec(e, t) {
  t && t.pendingBranch ? M(e) ? t.effects.push(...e) : t.effects.push(e) : pr(e);
}
const be = Symbol.for("v-fgt"), ln = Symbol.for("v-txt"), xe = Symbol.for("v-cmt"), yn = Symbol.for("v-stc"), Yt = [];
let Oe = null;
function J(e = !1) {
  Yt.push(Oe = e ? null : []);
}
function yc() {
  Yt.pop(), Oe = Yt[Yt.length - 1] || null;
}
let Xt = 1;
function _s(e, t = !1) {
  Xt += e, e < 0 && Oe && t && (Oe.hasOnce = !0);
}
function Ur(e) {
  return e.dynamicChildren = Xt > 0 ? Oe || Dt : null, yc(), Xt > 0 && Oe && Oe.push(e), e;
}
function oe(e, t, n, o, s, r) {
  return Ur(
    Ce(
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
function In(e, t, n, o, s) {
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
function Zn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function jt(e, t) {
  if (process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && e.component) {
    const n = _n.get(t.type);
    if (n && n.has(e.component))
      return e.shapeFlag &= -257, t.shapeFlag &= -513, !1;
  }
  return e.type === t.type && e.key === t.key;
}
const bc = (...e) => Kr(
  ...e
), Br = ({ key: e }) => e ?? null, bn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? z(e) || X(e) || $(e) ? { i: Ne, r: e, k: t, f: !!n } : e : null);
function Ce(e, t = null, n = null, o = 0, s = null, r = e === be ? 0 : 1, i = !1, l = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Br(t),
    ref: t && bn(t),
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
  return l ? (Zo(u, n), r & 128 && e.normalize(u)) : n && (u.shapeFlag |= z(n) ? 8 : 16), process.env.NODE_ENV !== "production" && u.key !== u.key && O("VNode created with invalid key (NaN). VNode type:", u.type), Xt > 0 && // avoid a block node from tracking itself
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
  if ((!e || e === Ml) && (process.env.NODE_ENV !== "production" && !e && O(`Invalid vnode type when creating vnode: ${e}.`), e = xe), Zn(e)) {
    const l = ut(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Zo(l, n), Xt > 0 && !r && Oe && (l.shapeFlag & 6 ? Oe[Oe.indexOf(e)] = l : Oe.push(l)), l.patchFlag = -2, l;
  }
  if (zr(e) && (e = e.__vccOpts), t) {
    t = Nc(t);
    let { class: l, style: u } = t;
    l && !z(l) && (t.class = kn(l)), W(u) && (wn(u) && !M(u) && (u = ee({}, u)), t.style = on(u));
  }
  const i = z(e) ? 1 : Hr(e) ? 128 : _l(e) ? 64 : W(e) ? 4 : $(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && wn(e) && (e = R(e), O(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), Ce(
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
  return e ? wn(e) || Tr(e) ? ee({}, e) : e : null;
}
function ut(e, t, n = !1, o = !1) {
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
      n && r ? M(r) ? r.concat(bn(t)) : [r, bn(t)] : bn(t)
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
    ssContent: e.ssContent && ut(e.ssContent),
    ssFallback: e.ssFallback && ut(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return u && o && ko(
    d,
    u.clone(d)
  ), d;
}
function Wr(e) {
  const t = ut(e);
  return M(e.children) && (t.children = e.children.map(Wr)), t;
}
function Gr(e = " ", t = 0) {
  return De(ln, null, e, t);
}
function He(e = "", t = !1) {
  return t ? (J(), In(xe, null, e)) : De(xe, null, e);
}
function Ve(e) {
  return e == null || typeof e == "boolean" ? De(xe) : M(e) ? De(
    be,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Zn(e) ? st(e) : De(ln, null, String(e));
}
function st(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : ut(e);
}
function Zo(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (M(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Zo(e, s()), s._c && (s._d = !0));
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
        t.class !== o.class && (t.class = kn([t.class, o.class]));
      else if (s === "style")
        t.style = on([t.style, o.style]);
      else if (tn(s)) {
        const r = t[s], i = o[s];
        i && r !== i && !(M(r) && r.includes(i)) && (t[s] = r ? [].concat(r, i) : i);
      } else s !== "" && (t[s] = o[s]);
  }
  return t;
}
function je(e, t, n, o = null) {
  Ge(e, t, 7, [
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
let ce = null;
const Zr = () => ce || Ne;
let Pn, bo;
{
  const e = nn(), t = (n, o) => {
    let s;
    return (s = e[n]) || (s = e[n] = []), s.push(o), (r) => {
      s.length > 1 ? s.forEach((i) => i(r)) : s[0](r);
    };
  };
  Pn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => ce = n
  ), bo = t(
    "__VUE_SSR_SETTERS__",
    (n) => Qt = n
  );
}
const cn = (e) => {
  const t = ce;
  return Pn(e), e.scope.on(), () => {
    e.scope.off(), Pn(t);
  };
}, Es = () => {
  ce && ce.scope.off(), Pn(null);
}, Vc = /* @__PURE__ */ Xe("slot,component");
function No(e, { isNativeTag: t }) {
  (Vc(e) || t(e)) && O(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function Yr(e) {
  return e.vnode.shapeFlag & 4;
}
let Qt = !1;
function Sc(e, t = !1, n = !1) {
  t && bo(t);
  const { props: o, children: s } = e.vnode, r = Yr(e);
  Wl(e, o, r, t), nc(e, s, n || t);
  const i = r ? Cc(e, t) : void 0;
  return t && bo(!1), i;
}
function Cc(e, t) {
  var n;
  const o = e.type;
  if (process.env.NODE_ENV !== "production") {
    if (o.name && No(o.name, e.appContext.config), o.components) {
      const r = Object.keys(o.components);
      for (let i = 0; i < r.length; i++)
        No(r[i], e.appContext.config);
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
    Ae();
    const r = e.setupContext = s.length > 1 ? $c(e) : null, i = cn(e), l = Tt(
      s,
      e,
      0,
      [
        process.env.NODE_ENV !== "production" ? Be(e.props) : e.props,
        r
      ]
    ), u = Do(l);
    if (Re(), i(), (u || e.sp) && !Gt(e) && br(e), u) {
      if (l.then(Es, Es), t)
        return l.then((p) => {
          ys(e, p, t);
        }).catch((p) => {
          sn(p, e, 0);
        });
      if (e.asyncDep = l, process.env.NODE_ENV !== "production" && !e.suspense) {
        const p = (n = o.name) != null ? n : "Anonymous";
        O(
          `Component <${p}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      ys(e, l, t);
  } else
    qr(e, t);
}
function ys(e, t, n) {
  $(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : W(t) ? (process.env.NODE_ENV !== "production" && Zn(t) && O(
    "setup() should not return VNodes directly - return a render function instead."
  ), process.env.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = ur(t), process.env.NODE_ENV !== "production" && Il(e)) : process.env.NODE_ENV !== "production" && t !== void 0 && O(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), qr(e, n);
}
const Tc = () => !0;
function qr(e, t, n) {
  const o = e.type;
  e.render || (e.render = o.render || re);
  {
    const s = cn(e);
    Ae();
    try {
      Ll(e);
    } finally {
      Re(), s();
    }
  }
  process.env.NODE_ENV !== "production" && !o.render && e.render === re && !t && (o.template ? O(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
  ) : O("Component is missing template or render function: ", o));
}
const bs = process.env.NODE_ENV !== "production" ? {
  get(e, t) {
    return Rn(), se(e, "get", ""), e[t];
  },
  set() {
    return O("setupContext.attrs is readonly."), !1;
  },
  deleteProperty() {
    return O("setupContext.attrs is readonly."), !1;
  }
} : {
  get(e, t) {
    return se(e, "get", ""), e[t];
  }
};
function Mc(e) {
  return new Proxy(e.slots, {
    get(t, n) {
      return se(e, "get", "$slots"), t[n];
    }
  });
}
function $c(e) {
  const t = (n) => {
    if (process.env.NODE_ENV !== "production" && (e.exposed && O("expose() should be called only once per setup()."), n != null)) {
      let o = typeof n;
      o === "object" && (M(n) ? o = "array" : X(n) && (o = "ref")), o !== "object" && O(
        `expose() should be passed a plain object, received ${o}.`
      );
    }
    e.exposed = n || {};
  };
  if (process.env.NODE_ENV !== "production") {
    let n, o;
    return Object.freeze({
      get attrs() {
        return n || (n = new Proxy(e.attrs, bs));
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
      attrs: new Proxy(e.attrs, bs),
      slots: e.slots,
      emit: e.emit,
      expose: t
    };
}
function Yo(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(ur(Bi(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in _t)
        return _t[n](e);
    },
    has(t, n) {
      return n in t || n in _t;
    }
  })) : e.proxy;
}
const Ac = /(?:^|[-_])\w/g, Rc = (e) => e.replace(Ac, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Jr(e, t = !0) {
  return $(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Yn(e, t, n = !1) {
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
const Oo = (e, t) => {
  const n = Yi(e, t, Qt);
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
      if (X(a)) {
        Ae();
        const g = a.value;
        return Re(), [
          "div",
          {},
          ["span", e, d(a)],
          "<",
          l(g),
          ">"
        ];
      } else {
        if (ct(a))
          return [
            "div",
            {},
            ["span", e, he(a) ? "ShallowReactive" : "Reactive"],
            "<",
            l(a),
            `>${We(a) ? " (readonly)" : ""}`
          ];
        if (We(a))
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
    return g = ee({}, g), Object.keys(g).length ? [
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
const Ns = "3.5.22", Je = process.env.NODE_ENV !== "production" ? O : re;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let xo;
const Os = typeof window < "u" && window.trustedTypes;
if (Os)
  try {
    xo = /* @__PURE__ */ Os.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch (e) {
    process.env.NODE_ENV !== "production" && Je(`Error creating trusted types policy: ${e}`);
  }
const Xr = xo ? (e) => xo.createHTML(e) : (e) => e, Pc = "http://www.w3.org/2000/svg", Lc = "http://www.w3.org/1998/Math/MathML", Ye = typeof document < "u" ? document : null, xs = Ye && /* @__PURE__ */ Ye.createElement("template"), Fc = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const s = t === "svg" ? Ye.createElementNS(Pc, e) : t === "mathml" ? Ye.createElementNS(Lc, e) : n ? Ye.createElement(e, { is: n }) : Ye.createElement(e);
    return e === "select" && o && o.multiple != null && s.setAttribute("multiple", o.multiple), s;
  },
  createText: (e) => Ye.createTextNode(e),
  createComment: (e) => Ye.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ye.querySelector(e),
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
      xs.innerHTML = Xr(
        o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e
      );
      const l = xs.content;
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
function kc(e, t, n) {
  const o = e[jc];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const ws = Symbol("_vod"), Hc = Symbol("_vsh"), Uc = Symbol(process.env.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : ""), Bc = /(?:^|;)\s*display\s*:/;
function Kc(e, t, n) {
  const o = e.style, s = z(n);
  let r = !1;
  if (n && !s) {
    if (t)
      if (z(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && Nn(o, l, "");
        }
      else
        for (const i in t)
          n[i] == null && Nn(o, i, "");
    for (const i in n)
      i === "display" && (r = !0), Nn(o, i, n[i]);
  } else if (s) {
    if (t !== n) {
      const i = o[Uc];
      i && (n += ";" + i), o.cssText = n, r = Bc.test(n);
    }
  } else t && e.removeAttribute("style");
  ws in e && (e[ws] = r ? o.display : "", e[Hc] && (o.display = "none"));
}
const Wc = /[^\\];\s*$/, Ds = /\s*!important$/;
function Nn(e, t, n) {
  if (M(n))
    n.forEach((o) => Nn(e, t, o));
  else if (n == null && (n = ""), process.env.NODE_ENV !== "production" && Wc.test(n) && Je(
    `Unexpected semicolon at the end of '${t}' style value: '${n}'`
  ), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = Gc(e, t);
    Ds.test(n) ? e.setProperty(
      ze(o),
      n.replace(Ds, ""),
      "important"
    ) : e[o] = n;
  }
}
const Vs = ["Webkit", "Moz", "ms"], io = {};
function Gc(e, t) {
  const n = io[t];
  if (n)
    return n;
  let o = Te(t);
  if (o !== "filter" && o in e)
    return io[t] = o;
  o = jn(o);
  for (let s = 0; s < Vs.length; s++) {
    const r = Vs[s] + o;
    if (r in e)
      return io[t] = r;
  }
  return t;
}
const Ss = "http://www.w3.org/1999/xlink";
function Cs(e, t, n, o, s, r = bi(t)) {
  o && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Ss, t.slice(6, t.length)) : e.setAttributeNS(Ss, t, n) : n == null || r && !Ks(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : ft(n) ? String(n) : n
  );
}
function Ts(e, t, n, o, s) {
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
    l === "boolean" ? n = Ks(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch (l) {
    process.env.NODE_ENV !== "production" && !i && Je(
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
const Ms = Symbol("_vei");
function qc(e, t, n, o, s = null) {
  const r = e[Ms] || (e[Ms] = {}), i = r[t];
  if (o && i)
    i.value = process.env.NODE_ENV !== "production" ? As(o, t) : o;
  else {
    const [l, u] = Jc(t);
    if (o) {
      const p = r[t] = Qc(
        process.env.NODE_ENV !== "production" ? As(o, t) : o,
        s
      );
      Zc(e, l, p, u);
    } else i && (Yc(e, l, i, u), r[t] = void 0);
  }
}
const $s = /(?:Once|Passive|Capture)$/;
function Jc(e) {
  let t;
  if ($s.test(e)) {
    t = {};
    let o;
    for (; o = e.match($s); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : ze(e.slice(2)), t];
}
let lo = 0;
const zc = /* @__PURE__ */ Promise.resolve(), Xc = () => lo || (zc.then(() => lo = 0), lo = Date.now());
function Qc(e, t) {
  const n = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= n.attached)
      return;
    Ge(
      eu(o, n.value),
      t,
      5,
      [o]
    );
  };
  return n.value = e, n.attached = Xc(), n;
}
function As(e, t) {
  return $(e) || M(e) ? e : (Je(
    `Wrong type passed as event handler to ${t} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof e}.`
  ), re);
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
const Rs = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, tu = (e, t, n, o, s, r) => {
  const i = s === "svg";
  t === "class" ? kc(e, o, i) : t === "style" ? Kc(e, n, o) : tn(t) ? On(t) || qc(e, t, n, o, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : nu(e, t, o, i)) ? (Ts(e, t, o), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Cs(e, t, o, i, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !z(o)) ? Ts(e, Te(t), o, r, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), Cs(e, t, o, i));
};
function nu(e, t, n, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Rs(t) && $(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
      return !1;
  }
  return Rs(t) && z(n) ? !1 : t in e;
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
}, rt = (e, t) => {
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
}, Is = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), o = t.join(".");
  return n[o] || (n[o] = ((s) => {
    if (!("key" in s))
      return;
    const r = ze(s.key);
    if (t.some(
      (i) => i === r || ru[i] === r
    ))
      return e(s);
  }));
}, iu = /* @__PURE__ */ ee({ patchProp: tu }, Fc);
let Ps;
function lu() {
  return Ps || (Ps = rc(iu));
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
        Je(
          "The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead."
        );
      }
    });
    const n = e.config.compilerOptions, o = 'The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader\'s `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc';
    Object.defineProperty(e.config, "compilerOptions", {
      get() {
        return Je(o), n;
      },
      set() {
        Je(o);
      }
    });
  }
}
function du(e) {
  if (z(e)) {
    const t = document.querySelector(e);
    return process.env.NODE_ENV !== "production" && !t && Je(
      `Failed to mount app: mount target selector "${e}" returned null.`
    ), t;
  }
  return process.env.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && Je(
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
function un() {
  const e = Zt(Qr);
  if (!e)
    throw new Error("Plugin GlobalJsonConfig not found.");
  return e;
}
const gu = ["src"], vu = {
  key: 1,
  class: "loader"
}, mu = /* @__PURE__ */ Mt({
  __name: "ChatEntryAudio",
  props: {
    entry: {},
    id: {}
  },
  setup(e) {
    const t = un(), n = e, o = ie(null);
    return Uo(() => {
      const s = {
        ended: () => t.fsm?.logEvent({ event: "AUDIO_PLAY_ENDED", id: n.id }),
        play: () => t.fsm?.logEvent({ event: "AUDIO_PLAY_START", id: n.id }),
        pause: () => t.fsm?.logEvent({ event: "AUDIO_PLAY_PAUSE", id: n.id }),
        seeked: () => t.fsm?.logEvent({ event: "AUDIO_PLAY_SEEKED", id: n.id })
      };
      for (const r in s)
        o.value?.addEventListener(r, s[r]);
    }), (s, r) => n.entry.length > 0 ? (J(), oe("audio", {
      key: 0,
      ref_key: "audioElement",
      ref: o,
      controls: "",
      controlslist: "nodownload",
      preload: "auto"
    }, [
      Ce("source", {
        src: n.entry
      }, null, 8, gu)
    ], 512)) : (J(), oe("div", vu, [...r[0] || (r[0] = [
      Ce("span", null, null, -1)
    ])]));
  }
}), fn = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, s] of t)
    n[o] = s;
  return n;
}, ei = /* @__PURE__ */ fn(mu, [["__scopeId", "data-v-c34464fb"]]), _u = /* @__PURE__ */ Mt({
  __name: "ChatEntryText",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => Co(t.entry);
  }
});
function en(e) {
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
}, yu = { class: "button" }, bu = ["src"], Nu = 3510, Ou = /* @__PURE__ */ Mt({
  __name: "ChatEntry",
  props: {
    entry: {}
  },
  emits: ["updateEntryValue"],
  setup(e, { emit: t }) {
    const n = un(), o = ie(null), s = {
      ...en(n.entryStyle),
      marginTop: `${n.listGap}px`
    }, r = ie(s), l = ie(e.entry), u = t, p = (y) => {
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
        ...en(n.deletingStyle || n.entryStyle)
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
    return (y, D) => (J(), oe("div", {
      ref_key: "entryDiv",
      ref: o,
      class: "entry",
      style: on(r.value)
    }, [
      e.entry.status === "deleting" ? (J(), oe("div", Eu, [
        D[0] || (D[0] = Gr(" Eintrag Gelöscht. ", -1)),
        Ce("a", {
          href: "#",
          onClick: rt(g, ["prevent"])
        }, "Rückgängig machen")
      ])) : e.entry.status !== "deleted" ? (J(), oe(be, { key: 1 }, [
        l.value.type === "text" ? (J(), In(_u, {
          key: 0,
          entry: l.value.entry
        }, null, 8, ["entry"])) : l.value.type === "audio" ? (J(), In(ei, {
          key: 1,
          entry: l.value.entry,
          id: l.value.id
        }, null, 8, ["entry", "id"])) : He("", !0),
        Ce("div", yu, [
          Ce("img", {
            src: nt(ti),
            onClick: rt(a, ["prevent"])
          }, null, 8, bu)
        ])
      ], 64)) : He("", !0)
    ], 4));
  }
}), xu = /* @__PURE__ */ fn(Ou, [["__scopeId", "data-v-6298b429"]]), wu = /* @__PURE__ */ Mt({
  __name: "ChatList",
  props: {
    list: {}
  },
  emits: ["updateEntryValue"],
  setup(e, { emit: t }) {
    const n = un(), o = {
      ...en(n.listStyle),
      padding: `0 ${n.listGap}px ${n.listGap}px ${n.listGap}px`
    };
    n.listHeight && n.listHeight > 0 && (o.height = `${n.listHeight}px`);
    const s = e, r = t, i = (u) => {
      r("updateEntryValue", u);
    }, l = ie(null);
    return Et(
      () => s.list.length,
      (u, p) => {
        u > p && Po(() => {
          l.value && (l.value.scrollTop = l.value.scrollHeight);
        });
      }
    ), (u, p) => (J(), oe("div", {
      class: "chat-list",
      style: o,
      ref_key: "listContainer",
      ref: l
    }, [
      (J(!0), oe(be, null, $l(s.list, (d) => (J(), oe(be, {
        key: d.id
      }, [
        d.status != "deleted" ? (J(), In(xu, {
          key: 0,
          entry: d,
          onUpdateEntryValue: i
        }, null, 8, ["entry"])) : He("", !0)
      ], 64))), 128))
    ], 512));
  }
}), Du = /* @__PURE__ */ fn(wu, [["__scopeId", "data-v-6c767312"]]), ni = "__IB_ExtRes_MicroAllowed_stat";
let Ct = null;
function Vu() {
  return navigator.mediaDevices?.getUserMedia ? Ct = sessionStorage.getItem(ni) ?? "prompt" : Ct = "not-supported", Ct;
}
function Ls(e) {
  Ct = e, e === "allowed" && sessionStorage.setItem(ni, e);
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
      Ct !== i && Ls(i), e(r);
    }, o = () => {
      const r = "denied";
      Ct !== r && Ls(r), t();
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
const Fs = (e, t) => e ? { [t]: e } : {};
function $u(e, t = void 0, n = 32e3, o = Su()) {
  const s = new MediaRecorder(e, {
    audioBitsPerSecond: n,
    ...Fs(o, "mimeType")
  });
  if (!s)
    return s;
  const r = [], i = (u) => {
    r.push(u.data);
  }, l = () => {
    e.getTracks().forEach((p) => p.stop());
    const u = new Blob(r, Fs(o, "type"));
    t && Mu(u).then((p) => {
      p && typeof p == "string" && t(p);
    });
  };
  return s.addEventListener("dataavailable", i), s.addEventListener("stop", l), s.start(), s;
}
function js(e) {
  e?.stop();
}
const Au = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M19%2010V12C19%2015.866%2015.866%2019%2012%2019M5%2010V12C5%2015.866%208.13401%2019%2012%2019M12%2019V22M8%2022H16M12%2015C10.3431%2015%209%2013.6569%209%2012V5C9%203.34315%2010.3431%202%2012%202C13.6569%202%2015%203.34315%2015%205V12C15%2013.6569%2013.6569%2015%2012%2015Z'%20stroke='%23000000'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e", Ru = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%20-0.5%2025%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M19.1168%2012.1484C19.474%2012.3581%2019.9336%2012.2384%2020.1432%2011.8811C20.3528%2011.5238%2020.2331%2011.0643%2019.8758%2010.8547L19.1168%2012.1484ZM6.94331%204.13656L6.55624%204.77902L6.56378%204.78344L6.94331%204.13656ZM5.92408%204.1598L5.50816%203.5357L5.50816%203.5357L5.92408%204.1598ZM5.51031%205.09156L4.76841%205.20151C4.77575%205.25101%204.78802%205.29965%204.80505%205.34671L5.51031%205.09156ZM7.12405%2011.7567C7.26496%2012.1462%207.69495%2012.3477%208.08446%2012.2068C8.47397%2012.0659%208.67549%2011.6359%208.53458%2011.2464L7.12405%2011.7567ZM19.8758%2012.1484C20.2331%2011.9388%2020.3528%2011.4793%2020.1432%2011.122C19.9336%2010.7648%2019.474%2010.6451%2019.1168%2010.8547L19.8758%2012.1484ZM6.94331%2018.8666L6.56375%2018.2196L6.55627%2018.2241L6.94331%2018.8666ZM5.92408%2018.8433L5.50815%2019.4674H5.50815L5.92408%2018.8433ZM5.51031%2017.9116L4.80505%2017.6564C4.78802%2017.7035%204.77575%2017.7521%204.76841%2017.8016L5.51031%2017.9116ZM8.53458%2011.7567C8.67549%2011.3672%208.47397%2010.9372%208.08446%2010.7963C7.69495%2010.6554%207.26496%2010.8569%207.12405%2011.2464L8.53458%2011.7567ZM19.4963%2012.2516C19.9105%2012.2516%2020.2463%2011.9158%2020.2463%2011.5016C20.2463%2011.0873%2019.9105%2010.7516%2019.4963%2010.7516V12.2516ZM7.82931%2010.7516C7.4151%2010.7516%207.07931%2011.0873%207.07931%2011.5016C7.07931%2011.9158%207.4151%2012.2516%207.82931%2012.2516V10.7516ZM19.8758%2010.8547L7.32284%203.48968L6.56378%204.78344L19.1168%2012.1484L19.8758%2010.8547ZM7.33035%203.49414C6.76609%203.15419%206.05633%203.17038%205.50816%203.5357L6.34%204.78391C6.40506%204.74055%206.4893%204.73863%206.55627%204.77898L7.33035%203.49414ZM5.50816%203.5357C4.95998%203.90102%204.67184%204.54987%204.76841%205.20151L6.25221%204.98161C6.24075%204.90427%206.27494%204.82727%206.34%204.78391L5.50816%203.5357ZM4.80505%205.34671L7.12405%2011.7567L8.53458%2011.2464L6.21558%204.83641L4.80505%205.34671ZM19.1168%2010.8547L6.56378%2018.2197L7.32284%2019.5134L19.8758%2012.1484L19.1168%2010.8547ZM6.55627%2018.2241C6.4893%2018.2645%206.40506%2018.2626%206.34%2018.2192L5.50815%2019.4674C6.05633%2019.8327%206.76609%2019.8489%207.33035%2019.509L6.55627%2018.2241ZM6.34%2018.2192C6.27494%2018.1759%206.24075%2018.0988%206.25221%2018.0215L4.76841%2017.8016C4.67184%2018.4532%204.95998%2019.1021%205.50815%2019.4674L6.34%2018.2192ZM6.21558%2018.1667L8.53458%2011.7567L7.12405%2011.2464L4.80505%2017.6564L6.21558%2018.1667ZM19.4963%2010.7516H7.82931V12.2516H19.4963V10.7516Z'%20fill='%23000000'/%3e%3c/svg%3e", Iu = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20fill='%23dc143c'%20height='800px'%20width='800px'%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%20512%20512'%20enable-background='new%200%200%20512%20512'%20xml:space='preserve'%3e%3cpath%20d='M465.5,0H46.5C20.9,0,0,20.9,0,46.5v418.9C0,491.1,20.9,512,46.5,512h418.9c25.7,0,46.5-20.9,46.5-46.5V46.5%20C512,20.9,491.1,0,465.5,0z'/%3e%3c/svg%3e", Pu = ["disabled", "value", "placeholder", "rows", "onKeydown"], Lu = {
  key: 1,
  class: "rectext"
}, Fu = { key: 0 }, ju = { key: 1 }, ku = {
  key: 2,
  class: "rectext"
}, Hu = {
  key: 3,
  class: "button"
}, Uu = ["src"], Bu = {
  key: 4,
  class: "button"
}, Ku = ["src"], Wu = {
  key: 5,
  class: "button"
}, Gu = ["src"], Zu = {
  key: 6,
  class: "button-stop"
}, Yu = ["src"], qu = /* @__PURE__ */ Mt({
  __name: "ChatInput",
  emits: ["addEntry"],
  setup(e, { emit: t }) {
    const n = un(), o = en(n.inputStyle), s = en(n.inputStyleTextinput || n.inputStyle), r = ie(null), i = ie({}), l = ie(!1), u = Oo(() => l.value ? {
      ...s,
      ...i.value
    } : {
      ...o,
      ...i.value
    }), p = ie(!0), d = Oo(() => p.value && n.textInputDisabled !== !0 ? n.inputPlaceholder : void 0), a = ie(null), g = () => {
      n.textInputDisabled !== !0 && a.value?.focus();
    };
    Uo(() => {
      g();
    });
    const y = ie({
      id: null,
      type: "text",
      entry: "Nochn Eintrag",
      status: "active"
    }), D = ie("none");
    Et(D, (Y) => {
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
    const V = ie(""), Q = (Y) => {
      const q = Y.target.value;
      V.value = q, q.length === 0 ? D.value !== "none" && (D.value = "none") : D.value !== "texting" && (D.value = "texting"), p.value && (p.value = !1);
    };
    let H = null;
    const P = ie(null), I = ie("");
    let te = !1, S;
    const Z = ie(Vu());
    Et(Z, (Y) => {
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
    const ue = () => {
      H && (clearTimeout(H), H = null, P.value = null), S ? (js(S), S = void 0, n.audioAck ? D.value = "recording_ack" : te = !0) : ge();
    }, ne = (Y) => {
      Y > 0 ? (P.value = Y, H = setTimeout(() => ne(Y - 1), 1e3)) : ue();
    }, fe = () => {
      S || Z.value === "not-supported" || Z.value === "denied" || (I.value = "", Cu().then((Y) => {
        Z.value = "allowed", te = !1, S = $u(Y, (q) => {
          I.value = q, n.fsm?.logEvent({
            event: "RECORDING_RECEIVED",
            b64: q
          }), te && ve();
        }), D.value = "recording", n.recLimit && (n.cntDwn ? H = setTimeout(
          () => ne(n.cntDwn),
          (n.recLimit - n.cntDwn) * 1e3 + 200
        ) : H = setTimeout(() => ue(), n.recLimit * 1e3 + 200));
      }).catch(() => {
        Z.value = "denied", ge();
      }), i.value.height || (i.value.height = r.value.getBoundingClientRect().height + "px"));
    }, we = t, ge = () => {
      S && (js(S), S = void 0), V.value = "", D.value = "none", Po(g);
    }, ve = () => {
      if (I.value)
        y.value.type = "audio", y.value.entry = I.value, we("addEntry", y.value);
      else if (!te) {
        te = !0;
        return;
      }
      ge();
    }, et = () => {
      D.value === "texting" ? (y.value.type = "text", y.value.entry = V.value, we("addEntry", y.value), ge()) : ve();
    }, an = () => {
      const Y = {
        event: "INPUT_DELETED",
        id: null,
        type: "audio"
      };
      D.value === "texting" && (Y.text = V.value, Y.type = "text"), n.fsm?.logEvent(Y), ge();
    };
    return (Y, q) => (J(), oe("div", {
      class: "outer",
      style: on(u.value),
      ref_key: "outerDiv",
      ref: r
    }, [
      D.value === "none" || D.value === "texting" ? (J(), oe("textarea", {
        key: 0,
        disabled: nt(n).textInputDisabled ? !0 : void 0,
        ref_key: "textareaRef",
        ref: a,
        value: V.value,
        onInput: Q,
        placeholder: d.value,
        rows: nt(n).inputRows || 2,
        onKeydown: [
          Is(rt(et, ["ctrl", "prevent"]), ["enter"]),
          Is(rt(et, ["meta", "prevent"]), ["enter"])
        ],
        onFocus: q[0] || (q[0] = (L) => l.value = !0),
        onBlur: q[1] || (q[1] = (L) => l.value = !1)
      }, null, 40, Pu)) : He("", !0),
      D.value === "recording" ? (J(), oe("div", Lu, [
        P.value === null ? (J(), oe("div", Fu, "Aufnahme läuft")) : (J(), oe("div", ju, "Aufnahme noch " + Co(P.value) + " Sekunden", 1))
      ])) : He("", !0),
      D.value === "recording_ack" ? (J(), oe("div", ku, [
        De(ei, {
          entry: I.value,
          id: null,
          style: { width: "100%" }
        }, null, 8, ["entry"])
      ])) : He("", !0),
      D.value == "texting" || D.value == "recording_ack" ? (J(), oe("div", Hu, [
        Ce("img", {
          src: nt(ti),
          onClick: rt(an, ["prevent"])
        }, null, 8, Uu)
      ])) : He("", !0),
      D.value === "texting" || D.value === "recording_ack" ? (J(), oe("div", Bu, [
        Ce("img", {
          src: nt(Ru),
          onClick: rt(et, ["prevent"])
        }, null, 8, Ku)
      ])) : He("", !0),
      D.value === "none" ? (J(), oe("div", Wu, [
        Ce("img", {
          src: nt(Au),
          class: kn({ striked: Z.value === "not-supported" }),
          onClick: rt(fe, ["prevent"])
        }, null, 10, Gu)
      ])) : He("", !0),
      D.value === "recording" ? (J(), oe("div", Zu, [
        Ce("img", {
          src: nt(Iu),
          onClick: rt(ue, ["prevent"])
        }, null, 8, Yu)
      ])) : He("", !0)
    ], 4));
  }
}), Ju = /* @__PURE__ */ fn(qu, [["__scopeId", "data-v-55c370d7"]]), zu = /* @__PURE__ */ Mt({
  __name: "App",
  setup(e, { expose: t }) {
    const n = un(), o = ie([]);
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
    return (i, l) => (J(), oe("div", null, [
      De(Du, {
        class: "list",
        list: o.value,
        onUpdateEntryValue: s
      }, null, 8, ["list"]),
      De(Ju, { onAddEntry: r })
    ]));
  }
}), Xu = /* @__PURE__ */ fn(zu, [["__scopeId", "data-v-f4907ab0"]]);
function Qu(e) {
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
function ef(e) {
  const t = {}, n = ct(e) ? R(e) : e;
  for (const o in n)
    if (Object.prototype.hasOwnProperty.call(n, o)) {
      const s = n[o];
      X(s) ? t[o] = s.value : t[o] = s;
    }
  return t;
}
const nf = (e, t, n, o) => {
  o && (t.postMessagePayload = o), Qu(t);
  const s = cu(Xu);
  s.use(hu, t);
  const i = s.mount(e);
  return n && Et(
    () => ef(i),
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
  nf as initializeAndMount
};
