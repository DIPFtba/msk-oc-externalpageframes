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
const K = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, xt = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], ne = () => {
}, Ls = () => !1, en = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), bn = (e) => e.startsWith("onUpdate:"), ee = Object.assign, xo = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, ri = Object.prototype.hasOwnProperty, H = (e, t) => ri.call(e, t), M = Array.isArray, ht = (e) => In(e) === "[object Map]", Fs = (e) => In(e) === "[object Set]", $ = (e) => typeof e == "function", z = (e) => typeof e == "string", ct = (e) => typeof e == "symbol", W = (e) => e !== null && typeof e == "object", wo = (e) => (W(e) || $(e)) && $(e.then) && $(e.catch), js = Object.prototype.toString, In = (e) => js.call(e), Do = (e) => In(e).slice(8, -1), Hs = (e) => In(e) === "[object Object]", Vo = (e) => z(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, kt = /* @__PURE__ */ ze(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ii = /* @__PURE__ */ ze(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), Pn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, li = /-\w/g, Se = Pn(
  (e) => e.replace(li, (t) => t.slice(1).toUpperCase())
), ci = /\B([A-Z])/g, Ye = Pn(
  (e) => e.replace(ci, "-$1").toLowerCase()
), Ln = Pn((e) => e.charAt(0).toUpperCase() + e.slice(1)), at = Pn(
  (e) => e ? `on${Ln(e)}` : ""
), rt = (e, t) => !Object.is(e, t), It = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Nn = (e, t, n, o = !1) => {
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
let Yo;
const tn = () => Yo || (Yo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function nn(e) {
  if (M(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], s = z(o) ? di(o) : nn(o);
      if (s)
        for (const r in s)
          t[r] = s[r];
    }
    return t;
  } else if (z(e) || W(e))
    return e;
}
const fi = /;(?![^(]*\))/g, ai = /:([^]+)/, pi = /\/\*[^]*?\*\//g;
function di(e) {
  const t = {};
  return e.replace(pi, "").split(fi).forEach((n) => {
    if (n) {
      const o = n.split(ai);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function Fn(e) {
  let t = "";
  if (z(e))
    t = e;
  else if (M(e))
    for (let n = 0; n < e.length; n++) {
      const o = Fn(e[n]);
      o && (t += o + " ");
    }
  else if (W(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const hi = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", gi = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", vi = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", mi = /* @__PURE__ */ ze(hi), _i = /* @__PURE__ */ ze(gi), Ei = /* @__PURE__ */ ze(vi), yi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", bi = /* @__PURE__ */ ze(yi);
function ks(e) {
  return !!e || e === "";
}
const Us = (e) => !!(e && e.__v_isRef === !0), Bs = (e) => z(e) ? e : e == null ? "" : M(e) || W(e) && (e.toString === js || !$(e.toString)) ? Us(e) ? Bs(e.value) : JSON.stringify(e, Ks, 2) : String(e), Ks = (e, t) => Us(t) ? Ks(e, t.value) : ht(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [o, s], r) => (n[zn(o, r) + " =>"] = s, n),
    {}
  )
} : Fs(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => zn(n))
} : ct(t) ? zn(t) : W(t) && !M(t) && !Hs(t) ? String(t) : t, zn = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    ct(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Te(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let ve;
class Ni {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = ve, !t && ve && (this.index = (ve.scopes || (ve.scopes = [])).push(
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
      const n = ve;
      try {
        return ve = this, t();
      } finally {
        ve = n;
      }
    } else process.env.NODE_ENV !== "production" && Te("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = ve, ve = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (ve = this.prevScope, this.prevScope = void 0);
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
  return ve;
}
let U;
const Xn = /* @__PURE__ */ new WeakSet();
class Ws {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ve && ve.active && ve.effects.push(this);
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
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Zs(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, zo(this), qs(this);
    const t = U, n = Ce;
    U = this, Ce = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && U !== this && Te(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), Js(this), U = t, Ce = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        To(t);
      this.deps = this.depsTail = void 0, zo(this), this.onStop && this.onStop(), this.flags &= -2;
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
let Gs = 0, Ut, Bt;
function Zs(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Bt, Bt = e;
    return;
  }
  e.next = Ut, Ut = e;
}
function So() {
  Gs++;
}
function Co() {
  if (--Gs > 0)
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
function qs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Js(e) {
  let t, n = e.depsTail, o = n;
  for (; o; ) {
    const s = o.prevDep;
    o.version === -1 ? (o === n && (n = s), To(o), xi(o)) : t = o, o.dep.activeLink = o.prevActiveLink, o.prevActiveLink = void 0, o = s;
  }
  e.deps = t, e.depsTail = n;
}
function lo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Ys(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Ys(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === qt) || (e.globalVersion = qt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !lo(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = U, o = Ce;
  U = e, Ce = !0;
  try {
    qs(e);
    const s = e.fn(e._value);
    (t.version === 0 || rt(s, e._value)) && (e.flags |= 128, e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    U = n, Ce = o, Js(e), e.flags &= -3;
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
let Ce = !0;
const zs = [];
function Me() {
  zs.push(Ce), Ce = !1;
}
function $e() {
  const e = zs.pop();
  Ce = e === void 0 ? !0 : e;
}
function zo(e) {
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
class Mo {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!U || !Ce || U === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== U)
      n = this.activeLink = new wi(U, this), U.deps ? (n.prevDep = U.depsTail, U.depsTail.nextDep = n, U.depsTail = n) : U.deps = U.depsTail = n, Xs(n);
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
    So();
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
      Co();
    }
  }
}
function Xs(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let o = t.deps; o; o = o.nextDep)
        Xs(o);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const co = /* @__PURE__ */ new WeakMap(), gt = Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), uo = Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), Jt = Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function te(e, t, n) {
  if (Ce && U) {
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
  if (So(), t === "clear")
    i.forEach(l);
  else {
    const u = M(e), d = u && Vo(n);
    if (u && n === "length") {
      const p = Number(o);
      i.forEach((a, g) => {
        (g === "length" || g === Jt || !ct(g) && g >= p) && l(a);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), d && l(i.get(Jt)), t) {
        case "add":
          u ? d && l(i.get("length")) : (l(i.get(gt)), ht(e) && l(i.get(uo)));
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
function yt(e) {
  const t = A(e);
  return t === e ? t : (te(t, "iterate", Jt), pe(e) ? t : t.map(se));
}
function jn(e) {
  return te(e = A(e), "iterate", Jt), e;
}
const Di = {
  __proto__: null,
  [Symbol.iterator]() {
    return Qn(this, Symbol.iterator, se);
  },
  concat(...e) {
    return yt(this).concat(
      ...e.map((t) => M(t) ? yt(t) : t)
    );
  },
  entries() {
    return Qn(this, "entries", (e) => (e[1] = se(e[1]), e));
  },
  every(e, t) {
    return Ge(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ge(this, "filter", e, t, (n) => n.map(se), arguments);
  },
  find(e, t) {
    return Ge(this, "find", e, t, se, arguments);
  },
  findIndex(e, t) {
    return Ge(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ge(this, "findLast", e, t, se, arguments);
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
    return yt(this).join(e);
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
    return Xo(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Xo(this, "reduceRight", e, t);
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
    return yt(this).toReversed();
  },
  toSorted(e) {
    return yt(this).toSorted(e);
  },
  toSpliced(...e) {
    return yt(this).toSpliced(...e);
  },
  unshift(...e) {
    return Pt(this, "unshift", e);
  },
  values() {
    return Qn(this, "values", se);
  }
};
function Qn(e, t, n) {
  const o = jn(e), s = o[t]();
  return o !== e && !pe(e) && (s._next = s.next, s.next = () => {
    const r = s._next();
    return r.done || (r.value = n(r.value)), r;
  }), s;
}
const Vi = Array.prototype;
function Ge(e, t, n, o, s, r) {
  const i = jn(e), l = i !== e && !pe(e), u = i[t];
  if (u !== Vi[t]) {
    const a = u.apply(e, r);
    return l ? se(a) : a;
  }
  let d = n;
  i !== e && (l ? d = function(a, g) {
    return n.call(this, se(a), g, e);
  } : n.length > 2 && (d = function(a, g) {
    return n.call(this, a, g, e);
  }));
  const p = u.call(i, d, o);
  return l && s ? s(p) : p;
}
function Xo(e, t, n, o) {
  const s = jn(e);
  let r = n;
  return s !== e && (pe(e) ? n.length > 3 && (r = function(i, l, u) {
    return n.call(this, i, l, u, e);
  }) : r = function(i, l, u) {
    return n.call(this, i, se(l), u, e);
  }), s[t](r, ...o);
}
function eo(e, t, n) {
  const o = A(e);
  te(o, "iterate", Jt);
  const s = o[t](...n);
  return (s === -1 || s === !1) && On(n[0]) ? (n[0] = A(n[0]), o[t](...n)) : s;
}
function Pt(e, t, n = []) {
  Me(), So();
  const o = A(e)[t].apply(e, n);
  return Co(), $e(), o;
}
const Si = /* @__PURE__ */ ze("__proto__,__v_isRef,__isVue"), Qs = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ct)
);
function Ci(e) {
  ct(e) || (e = String(e));
  const t = A(this);
  return te(t, "has", e), t.hasOwnProperty(e);
}
class er {
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
      return o === (s ? r ? ir : rr : r ? sr : or).get(t) || // receiver is not the reactive proxy, but has the same prototype
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
    if ((ct(n) ? Qs.has(n) : Si(n)) || (s || te(t, "get", n), r))
      return l;
    if (X(l)) {
      const u = i && Vo(n) ? l : l.value;
      return s && W(u) ? ao(u) : u;
    }
    return W(l) ? s ? ao(l) : $o(l) : l;
  }
}
class tr extends er {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, o, s) {
    let r = t[n];
    if (!this._isShallow) {
      const u = Ke(r);
      if (!pe(o) && !Ke(o) && (r = A(r), o = A(o)), !M(t) && X(r) && !X(o))
        return u ? (process.env.NODE_ENV !== "production" && Te(
          `Set operation on key "${String(n)}" failed: target is readonly.`,
          t[n]
        ), !0) : (r.value = o, !0);
    }
    const i = M(t) && Vo(n) ? Number(n) < t.length : H(t, n), l = Reflect.set(
      t,
      n,
      o,
      X(t) ? t : s
    );
    return t === A(s) && (i ? rt(o, r) && ke(t, "set", n, o, r) : ke(t, "add", n, o)), l;
  }
  deleteProperty(t, n) {
    const o = H(t, n), s = t[n], r = Reflect.deleteProperty(t, n);
    return r && o && ke(t, "delete", n, void 0, s), r;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!ct(n) || !Qs.has(n)) && te(t, "has", n), o;
  }
  ownKeys(t) {
    return te(
      t,
      "iterate",
      M(t) ? "length" : gt
    ), Reflect.ownKeys(t);
  }
}
class nr extends er {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && Te(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && Te(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const Ti = /* @__PURE__ */ new tr(), Mi = /* @__PURE__ */ new nr(), $i = /* @__PURE__ */ new tr(!0), Ri = /* @__PURE__ */ new nr(!0), fo = (e) => e, an = (e) => Reflect.getPrototypeOf(e);
function Ai(e, t, n) {
  return function(...o) {
    const s = this.__v_raw, r = A(s), i = ht(r), l = e === "entries" || e === Symbol.iterator && i, u = e === "keys" && i, d = s[e](...o), p = n ? fo : t ? xn : se;
    return !t && te(
      r,
      "iterate",
      u ? uo : gt
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
function pn(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      Te(
        `${Ln(e)} operation ${n}failed: target is readonly.`,
        A(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Ii(e, t) {
  const n = {
    get(s) {
      const r = this.__v_raw, i = A(r), l = A(s);
      e || (rt(s, l) && te(i, "get", s), te(i, "get", l));
      const { has: u } = an(i), d = t ? fo : e ? xn : se;
      if (u.call(i, s))
        return d(r.get(s));
      if (u.call(i, l))
        return d(r.get(l));
      r !== i && r.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !e && te(A(s), "iterate", gt), s.size;
    },
    has(s) {
      const r = this.__v_raw, i = A(r), l = A(s);
      return e || (rt(s, l) && te(i, "has", s), te(i, "has", l)), s === l ? r.has(s) : r.has(s) || r.has(l);
    },
    forEach(s, r) {
      const i = this, l = i.__v_raw, u = A(l), d = t ? fo : e ? xn : se;
      return !e && te(u, "iterate", gt), l.forEach((p, a) => s.call(r, d(p), d(a), i));
    }
  };
  return ee(
    n,
    e ? {
      add: pn("add"),
      set: pn("set"),
      delete: pn("delete"),
      clear: pn("clear")
    } : {
      add(s) {
        !t && !pe(s) && !Ke(s) && (s = A(s));
        const r = A(this);
        return an(r).has.call(r, s) || (r.add(s), ke(r, "add", s, s)), this;
      },
      set(s, r) {
        !t && !pe(r) && !Ke(r) && (r = A(r));
        const i = A(this), { has: l, get: u } = an(i);
        let d = l.call(i, s);
        d ? process.env.NODE_ENV !== "production" && Qo(i, l, s) : (s = A(s), d = l.call(i, s));
        const p = u.call(i, s);
        return i.set(s, r), d ? rt(r, p) && ke(i, "set", s, r, p) : ke(i, "add", s, r), this;
      },
      delete(s) {
        const r = A(this), { has: i, get: l } = an(r);
        let u = i.call(r, s);
        u ? process.env.NODE_ENV !== "production" && Qo(r, i, s) : (s = A(s), u = i.call(r, s));
        const d = l ? l.call(r, s) : void 0, p = r.delete(s);
        return u && ke(r, "delete", s, void 0, d), p;
      },
      clear() {
        const s = A(this), r = s.size !== 0, i = process.env.NODE_ENV !== "production" ? ht(s) ? new Map(s) : new Set(s) : void 0, l = s.clear();
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
    n[s] = Ai(s, e, t);
  }), n;
}
function Hn(e, t) {
  const n = Ii(e, t);
  return (o, s, r) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get(
    H(n, s) && s in o ? n : o,
    s,
    r
  );
}
const Pi = {
  get: /* @__PURE__ */ Hn(!1, !1)
}, Li = {
  get: /* @__PURE__ */ Hn(!1, !0)
}, Fi = {
  get: /* @__PURE__ */ Hn(!0, !1)
}, ji = {
  get: /* @__PURE__ */ Hn(!0, !0)
};
function Qo(e, t, n) {
  const o = A(n);
  if (o !== n && t.call(e, o)) {
    const s = Do(e);
    Te(
      `Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const or = /* @__PURE__ */ new WeakMap(), sr = /* @__PURE__ */ new WeakMap(), rr = /* @__PURE__ */ new WeakMap(), ir = /* @__PURE__ */ new WeakMap();
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
  return Ke(e) ? e : kn(
    e,
    !1,
    Ti,
    Pi,
    or
  );
}
function Ui(e) {
  return kn(
    e,
    !1,
    $i,
    Li,
    sr
  );
}
function ao(e) {
  return kn(
    e,
    !0,
    Mi,
    Fi,
    rr
  );
}
function Ue(e) {
  return kn(
    e,
    !0,
    Ri,
    ji,
    ir
  );
}
function kn(e, t, n, o, s) {
  if (!W(e))
    return process.env.NODE_ENV !== "production" && Te(
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
function it(e) {
  return Ke(e) ? it(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Ke(e) {
  return !!(e && e.__v_isReadonly);
}
function pe(e) {
  return !!(e && e.__v_isShallow);
}
function On(e) {
  return e ? !!e.__v_raw : !1;
}
function A(e) {
  const t = e && e.__v_raw;
  return t ? A(t) : e;
}
function Bi(e) {
  return !H(e, "__v_skip") && Object.isExtensible(e) && Nn(e, "__v_skip", !0), e;
}
const se = (e) => W(e) ? $o(e) : e, xn = (e) => W(e) ? ao(e) : e;
function X(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function me(e) {
  return Ki(e, !1);
}
function Ki(e, t) {
  return X(e) ? e : new Wi(e, t);
}
class Wi {
  constructor(t, n) {
    this.dep = new Mo(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : A(t), this._value = n ? t : se(t), this.__v_isShallow = n;
  }
  get value() {
    return process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, o = this.__v_isShallow || pe(t) || Ke(t);
    t = o ? t : A(t), rt(t, n) && (this._rawValue = t, this._value = o ? t : se(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }) : this.dep.trigger());
  }
}
function dt(e) {
  return X(e) ? e.value : e;
}
const Gi = {
  get: (e, t, n) => t === "__v_raw" ? e : dt(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const s = e[t];
    return X(s) && !X(n) ? (s.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function lr(e) {
  return it(e) ? e : new Proxy(e, Gi);
}
class Zi {
  constructor(t, n, o) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Mo(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = qt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = o;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    U !== this)
      return Zs(this, !0), !0;
    process.env.NODE_ENV;
  }
  get value() {
    const t = process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track();
    return Ys(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter ? this.setter(t) : process.env.NODE_ENV !== "production" && Te("Write operation failed: computed value is readonly");
  }
}
function qi(e, t, n = !1) {
  let o, s;
  $(e) ? o = e : (o = e.get, s = e.set);
  const r = new Zi(o, s, n);
  return process.env.NODE_ENV, r;
}
const dn = {}, wn = /* @__PURE__ */ new WeakMap();
let pt;
function Ji(e, t = !1, n = pt) {
  if (n) {
    let o = wn.get(n);
    o || wn.set(n, o = []), o.push(e);
  } else process.env.NODE_ENV !== "production" && !t && Te(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function Yi(e, t, n = K) {
  const { immediate: o, deep: s, once: r, scheduler: i, augmentJob: l, call: u } = n, d = (S) => {
    (n.onWarn || Te)(
      "Invalid watch source: ",
      S,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, p = (S) => s ? S : pe(S) || s === !1 || s === 0 ? st(S, 1) : st(S);
  let a, g, v, V, D = !1, Z = !1;
  if (X(e) ? (g = () => e.value, D = pe(e)) : it(e) ? (g = () => p(e), D = !0) : M(e) ? (Z = !0, D = e.some((S) => it(S) || pe(S)), g = () => e.map((S) => {
    if (X(S))
      return S.value;
    if (it(S))
      return p(S);
    if ($(S))
      return u ? u(S, 2) : S();
    process.env.NODE_ENV !== "production" && d(S);
  })) : $(e) ? t ? g = u ? () => u(e, 2) : e : g = () => {
    if (v) {
      Me();
      try {
        v();
      } finally {
        $e();
      }
    }
    const S = pt;
    pt = a;
    try {
      return u ? u(e, 3, [V]) : e(V);
    } finally {
      pt = S;
    }
  } : (g = ne, process.env.NODE_ENV !== "production" && d(e)), t && s) {
    const S = g, q = s === !0 ? 1 / 0 : s;
    g = () => st(S(), q);
  }
  const k = Oi(), I = () => {
    a.stop(), k && k.active && xo(k.effects, a);
  };
  if (r && t) {
    const S = t;
    t = (...q) => {
      S(...q), I();
    };
  }
  let L = Z ? new Array(e.length).fill(dn) : dn;
  const ce = (S) => {
    if (!(!(a.flags & 1) || !a.dirty && !S))
      if (t) {
        const q = a.run();
        if (s || D || (Z ? q.some((ie, oe) => rt(ie, L[oe])) : rt(q, L))) {
          v && v();
          const ie = pt;
          pt = a;
          try {
            const oe = [
              q,
              // pass undefined as the old value when it's changed for the first time
              L === dn ? void 0 : Z && L[0] === dn ? [] : L,
              V
            ];
            L = q, u ? u(t, 3, oe) : (
              // @ts-expect-error
              t(...oe)
            );
          } finally {
            pt = ie;
          }
        }
      } else
        a.run();
  };
  return l && l(ce), a = new Ws(g), a.scheduler = i ? () => i(ce, !1) : ce, V = (S) => Ji(S, !1, a), v = a.onStop = () => {
    const S = wn.get(a);
    if (S) {
      if (u)
        u(S, 4);
      else
        for (const q of S) q();
      wn.delete(a);
    }
  }, process.env.NODE_ENV !== "production" && (a.onTrack = n.onTrack, a.onTrigger = n.onTrigger), t ? o ? ce(!0) : L = a.run() : i ? i(ce.bind(null, !0), !0) : a.run(), I.pause = a.pause.bind(a), I.resume = a.resume.bind(a), I.stop = I, I;
}
function st(e, t = 1 / 0, n) {
  if (t <= 0 || !W(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, X(e))
    st(e.value, t, n);
  else if (M(e))
    for (let o = 0; o < e.length; o++)
      st(e[o], t, n);
  else if (Fs(e) || ht(e))
    e.forEach((o) => {
      st(o, t, n);
    });
  else if (Hs(e)) {
    for (const o in e)
      st(e[o], t, n);
    for (const o of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, o) && st(e[o], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const vt = [];
function hn(e) {
  vt.push(e);
}
function gn() {
  vt.pop();
}
let to = !1;
function O(e, ...t) {
  if (to) return;
  to = !0, Me();
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
          ({ vnode: r }) => `at <${Gn(n, r.type)}>`
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
  $e(), to = !1;
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
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, s = ` at <${Gn(
    e.component,
    e.type,
    o
  )}`, r = ">" + n;
  return e.props ? [s, ...el(e.props), r] : [s + r];
}
function el(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((o) => {
    t.push(...cr(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function cr(e, t, n) {
  return z(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : X(t) ? (t = cr(e, A(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : $(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = A(t), n ? t : [`${e}=`, t]);
}
const Ro = {
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
    const u = t.proxy, d = process.env.NODE_ENV !== "production" ? Ro[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const p = l.ec;
      if (p) {
        for (let a = 0; a < p.length; a++)
          if (p[a](e, u, d) === !1)
            return;
      }
      l = l.parent;
    }
    if (r) {
      Me(), Ct(r, null, 10, [
        e,
        u,
        d
      ]), $e();
      return;
    }
  }
  tl(e, n, s, o, i);
}
function tl(e, t, n, o = !0, s = !1) {
  if (process.env.NODE_ENV !== "production") {
    const r = Ro[t];
    if (n && hn(n), O(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && gn(), o)
      throw e;
    console.error(e);
  } else {
    if (s)
      throw e;
    console.error(e);
  }
}
const ae = [];
let je = -1;
const wt = [];
let tt = null, Ot = 0;
const ur = /* @__PURE__ */ Promise.resolve();
let Dn = null;
const nl = 100;
function fr(e) {
  const t = Dn || ur;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ol(e) {
  let t = je + 1, n = ae.length;
  for (; t < n; ) {
    const o = t + n >>> 1, s = ae[o], r = Yt(s);
    r < e || r === e && s.flags & 2 ? t = o + 1 : n = o;
  }
  return t;
}
function Un(e) {
  if (!(e.flags & 1)) {
    const t = Yt(e), n = ae[ae.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Yt(n) ? ae.push(e) : ae.splice(ol(t), 0, e), e.flags |= 1, ar();
  }
}
function ar() {
  Dn || (Dn = ur.then(hr));
}
function pr(e) {
  M(e) ? wt.push(...e) : tt && e.id === -1 ? tt.splice(Ot + 1, 0, e) : e.flags & 1 || (wt.push(e), e.flags |= 1), ar();
}
function es(e, t, n = je + 1) {
  for (process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()); n < ae.length; n++) {
    const o = ae[n];
    if (o && o.flags & 2) {
      if (e && o.id !== e.uid || process.env.NODE_ENV !== "production" && Ao(t, o))
        continue;
      ae.splice(n, 1), n--, o.flags & 4 && (o.flags &= -2), o(), o.flags & 4 || (o.flags &= -2);
    }
  }
}
function dr(e) {
  if (wt.length) {
    const t = [...new Set(wt)].sort(
      (n, o) => Yt(n) - Yt(o)
    );
    if (wt.length = 0, tt) {
      tt.push(...t);
      return;
    }
    for (tt = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), Ot = 0; Ot < tt.length; Ot++) {
      const n = tt[Ot];
      process.env.NODE_ENV !== "production" && Ao(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    tt = null, Ot = 0;
  }
}
const Yt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function hr(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => Ao(e, n) : ne;
  try {
    for (je = 0; je < ae.length; je++) {
      const n = ae[je];
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
    for (; je < ae.length; je++) {
      const n = ae[je];
      n && (n.flags &= -2);
    }
    je = -1, ae.length = 0, dr(e), Dn = null, (ae.length || wt.length) && hr(e);
  }
}
function Ao(e, t) {
  const n = e.get(t) || 0;
  if (n > nl) {
    const o = t.i, s = o && Yr(o.type);
    return on(
      `Maximum recursive updates exceeded${s ? ` in component <${s}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
let Be = !1;
const vn = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (tn().__VUE_HMR_RUNTIME__ = {
  createRecord: no(gr),
  rerender: no(il),
  reload: no(ll)
});
const _t = /* @__PURE__ */ new Map();
function sl(e) {
  const t = e.type.__hmrId;
  let n = _t.get(t);
  n || (gr(t, e.type), n = _t.get(t)), n.instances.add(e);
}
function rl(e) {
  _t.get(e.type.__hmrId).instances.delete(e);
}
function gr(e, t) {
  return _t.has(e) ? !1 : (_t.set(e, {
    initialDef: Vn(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Vn(e) {
  return zr(e) ? e.__vccOpts : e;
}
function il(e, t) {
  const n = _t.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, Vn(o.type).render = t), o.renderCache = [], Be = !0, o.job.flags & 8 || o.update(), Be = !1;
  }));
}
function ll(e, t) {
  const n = _t.get(e);
  if (!n) return;
  t = Vn(t), ts(n.initialDef, t);
  const o = [...n.instances];
  for (let s = 0; s < o.length; s++) {
    const r = o[s], i = Vn(r.type);
    let l = vn.get(i);
    l || (i !== n.initialDef && ts(i, t), vn.set(i, l = /* @__PURE__ */ new Set())), l.add(r), r.appContext.propsCache.delete(r.type), r.appContext.emitsCache.delete(r.type), r.appContext.optionsCache.delete(r.type), r.ceReload ? (l.add(r), r.ceReload(t.styles), l.delete(r)) : r.parent ? Un(() => {
      r.job.flags & 8 || (Be = !0, r.parent.update(), Be = !1, l.delete(r));
    }) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), r.root.ce && r !== r.root && r.root.ce._removeChildStyle(i);
  }
  pr(() => {
    vn.clear();
  });
}
function ts(e, t) {
  ee(e, t);
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
let De, jt = [], po = !1;
function sn(e, ...t) {
  De ? De.emit(e, ...t) : po || jt.push({ event: e, args: t });
}
function Io(e, t) {
  var n, o;
  De = e, De ? (De.enabled = !0, jt.forEach(({ event: s, args: r }) => De.emit(s, ...r)), jt = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((o = (n = window.navigator) == null ? void 0 : n.userAgent) != null && o.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((r) => {
    Io(r, t);
  }), setTimeout(() => {
    De || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, po = !0, jt = []);
  }, 3e3)) : (po = !0, jt = []);
}
function cl(e, t) {
  sn("app:init", e, t, {
    Fragment: Ee,
    Text: rn,
    Comment: Ne,
    Static: _n
  });
}
function ul(e) {
  sn("app:unmount", e);
}
const fl = /* @__PURE__ */ Po(
  "component:added"
  /* COMPONENT_ADDED */
), vr = /* @__PURE__ */ Po(
  "component:updated"
  /* COMPONENT_UPDATED */
), al = /* @__PURE__ */ Po(
  "component:removed"
  /* COMPONENT_REMOVED */
), pl = (e) => {
  De && typeof De.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !De.cleanupBuffer(e) && al(e);
};
// @__NO_SIDE_EFFECTS__
function Po(e) {
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
const dl = /* @__PURE__ */ mr(
  "perf:start"
  /* PERFORMANCE_START */
), hl = /* @__PURE__ */ mr(
  "perf:end"
  /* PERFORMANCE_END */
);
function mr(e) {
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
let ye = null, _r = null;
function Sn(e) {
  const t = ye;
  return ye = e, _r = e && e.type.__scopeId || null, t;
}
function vl(e, t = ye, n) {
  if (!t || e._n)
    return e;
  const o = (...s) => {
    o._d && gs(-1);
    const r = Sn(t);
    let i;
    try {
      i = e(...s);
    } finally {
      Sn(r), o._d && gs(1);
    }
    return process.env.NODE_ENV !== "production" && vr(t), i;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function Er(e) {
  ii(e) && O("Do not use built-in directive ids as custom directive id: " + e);
}
function ut(e, t, n, o) {
  const s = e.dirs, r = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const l = s[i];
    r && (l.oldValue = r[i].value);
    let u = l.dir[o];
    u && (Me(), We(u, n, 8, [
      e.el,
      l,
      e,
      t
    ]), $e());
  }
}
const ml = Symbol("_vte"), _l = (e) => e.__isTeleport, El = Symbol("_leaveCb");
function Lo(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Lo(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Tt(e, t) {
  return $(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ee({ name: e.name }, t, { setup: e })
  ) : e;
}
function yr(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const ns = /* @__PURE__ */ new WeakSet(), Cn = /* @__PURE__ */ new WeakMap();
function Kt(e, t, n, o, s = !1) {
  if (M(e)) {
    e.forEach(
      (D, Z) => Kt(
        D,
        t && (M(t) ? t[Z] : t),
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
  const r = o.shapeFlag & 4 ? Ko(o.component) : o.el, i = s ? null : r, { i: l, r: u } = e;
  if (process.env.NODE_ENV !== "production" && !l) {
    O(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const d = t && t.r, p = l.refs === K ? l.refs = {} : l.refs, a = l.setupState, g = A(a), v = a === K ? Ls : (D) => process.env.NODE_ENV !== "production" && (H(g, D) && !X(g[D]) && O(
    `Template ref "${D}" used on a non-ref value. It will not work in the production build.`
  ), ns.has(g[D])) ? !1 : H(g, D), V = (D) => process.env.NODE_ENV === "production" || !ns.has(D);
  if (d != null && d !== u) {
    if (os(t), z(d))
      p[d] = null, v(d) && (a[d] = null);
    else if (X(d)) {
      V(d) && (d.value = null);
      const D = t;
      D.k && (p[D.k] = null);
    }
  }
  if ($(u))
    Ct(u, l, 12, [i, p]);
  else {
    const D = z(u), Z = X(u);
    if (D || Z) {
      const k = () => {
        if (e.f) {
          const I = D ? v(u) ? a[u] : p[u] : V(u) || !e.k ? u.value : p[e.k];
          if (s)
            M(I) && xo(I, r);
          else if (M(I))
            I.includes(r) || I.push(r);
          else if (D)
            p[u] = [r], v(u) && (a[u] = p[u]);
          else {
            const L = [r];
            V(u) && (u.value = L), e.k && (p[e.k] = L);
          }
        } else D ? (p[u] = i, v(u) && (a[u] = i)) : Z ? (V(u) && (u.value = i), e.k && (p[e.k] = i)) : process.env.NODE_ENV !== "production" && O("Invalid template ref type:", u, `(${typeof u})`);
      };
      if (i) {
        const I = () => {
          k(), Cn.delete(e);
        };
        I.id = -1, Cn.set(e, I), _e(I, n);
      } else
        os(e), k();
    } else process.env.NODE_ENV !== "production" && O("Invalid template ref type:", u, `(${typeof u})`);
  }
}
function os(e) {
  const t = Cn.get(e);
  t && (t.flags |= 8, Cn.delete(e));
}
tn().requestIdleCallback;
tn().cancelIdleCallback;
const Wt = (e) => !!e.type.__asyncLoader, Fo = (e) => e.type.__isKeepAlive;
function yl(e, t) {
  br(e, "a", t);
}
function bl(e, t) {
  br(e, "da", t);
}
function br(e, t, n = re) {
  const o = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if (Bn(t, o, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      Fo(s.parent.vnode) && Nl(o, t, n, s), s = s.parent;
  }
}
function Nl(e, t, n, o) {
  const s = Bn(
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
function Bn(e, t, n = re, o = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...i) => {
      Me();
      const l = ln(n), u = We(t, n, e, i);
      return l(), $e(), u;
    });
    return o ? s.unshift(r) : s.push(r), r;
  } else if (process.env.NODE_ENV !== "production") {
    const s = at(Ro[e].replace(/ hook$/, ""));
    O(
      `${s} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const Xe = (e) => (t, n = re) => {
  (!Xt || e === "sp") && Bn(e, (...o) => t(...o), n);
}, Ol = Xe("bm"), Nr = Xe("m"), xl = Xe(
  "bu"
), wl = Xe("u"), Dl = Xe(
  "bum"
), Or = Xe("um"), Vl = Xe(
  "sp"
), Sl = Xe("rtg"), Cl = Xe("rtc");
function Tl(e, t = re) {
  Bn("ec", e, t);
}
const Ml = Symbol.for("v-ndc");
function $l(e, t, n, o) {
  let s;
  const r = n, i = M(e);
  if (i || z(e)) {
    const l = i && it(e);
    let u = !1, d = !1;
    l && (u = !pe(e), d = Ke(e), e = jn(e)), s = new Array(e.length);
    for (let p = 0, a = e.length; p < a; p++)
      s[p] = t(
        u ? d ? xn(se(e[p])) : se(e[p]) : e[p],
        p,
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
      for (let u = 0, d = l.length; u < d; u++) {
        const p = l[u];
        s[u] = t(e[p], p, u, r);
      }
    }
  else
    s = [];
  return s;
}
const ho = (e) => e ? qr(e) ? Ko(e) : ho(e.parent) : null, mt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ee(/* @__PURE__ */ Object.create(null), {
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
      Un(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = fr.bind(e.proxy)),
    $watch: (e) => ac.bind(e)
  })
), jo = (e) => e === "_" || e === "$", oo = (e, t) => e !== K && !e.__isScriptSetup && H(e, t), xr = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: o, data: s, props: r, accessCache: i, type: l, appContext: u } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let d;
    if (t[0] !== "$") {
      const v = i[t];
      if (v !== void 0)
        switch (v) {
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
          (d = e.propsOptions[0]) && H(d, t)
        )
          return i[t] = 3, r[t];
        if (n !== K && H(n, t))
          return i[t] = 4, n[t];
        go && (i[t] = 0);
      }
    }
    const p = mt[t];
    let a, g;
    if (p)
      return t === "$attrs" ? (te(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && $n()) : process.env.NODE_ENV !== "production" && t === "$slots" && te(e, "get", t), p(e);
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
    process.env.NODE_ENV !== "production" && ye && (!z(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (s !== K && jo(t[0]) && H(s, t) ? O(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === ye && O(
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
    let u, d;
    return !!(n[l] || e !== K && l[0] !== "$" && H(e, l) || oo(t, l) || (u = r[0]) && H(u, l) || H(o, l) || H(mt, l) || H(s.config.globalProperties, l) || (d = i.__cssModules) && d[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : H(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (xr.ownKeys = (e) => (O(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function Rl(e) {
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
      set: ne
    });
  }), t;
}
function Al(e) {
  const {
    ctx: t,
    propsOptions: [n]
  } = e;
  n && Object.keys(n).forEach((o) => {
    Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[o],
      set: ne
    });
  });
}
function Il(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(A(n)).forEach((o) => {
    if (!n.__isScriptSetup) {
      if (jo(o[0])) {
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
        set: ne
      });
    }
  });
}
function ss(e) {
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
  go = !1, t.beforeCreate && rs(t.beforeCreate, e, "bc");
  const {
    // state
    data: s,
    computed: r,
    methods: i,
    watch: l,
    provide: u,
    inject: d,
    // lifecycle
    created: p,
    beforeMount: a,
    mounted: g,
    beforeUpdate: v,
    updated: V,
    activated: D,
    deactivated: Z,
    beforeDestroy: k,
    beforeUnmount: I,
    destroyed: L,
    unmounted: ce,
    render: S,
    renderTracked: q,
    renderTriggered: ie,
    errorCaptured: oe,
    serverPrefetch: J,
    // public API
    expose: Y,
    inheritAttrs: Re,
    // assets
    components: xe,
    directives: un,
    filters: Wo
  } = t, Qe = process.env.NODE_ENV !== "production" ? Pl() : null;
  if (process.env.NODE_ENV !== "production") {
    const [F] = e.propsOptions;
    if (F)
      for (const P in F)
        Qe("Props", P);
  }
  if (d && Fl(d, o, Qe), i)
    for (const F in i) {
      const P = i[F];
      $(P) ? (process.env.NODE_ENV !== "production" ? Object.defineProperty(o, F, {
        value: P.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : o[F] = P.bind(n), process.env.NODE_ENV !== "production" && Qe("Methods", F)) : process.env.NODE_ENV !== "production" && O(
        `Method "${F}" has type "${typeof P}" in the component definition. Did you reference the function correctly?`
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
      for (const P in F)
        Qe("Data", P), jo(P[0]) || Object.defineProperty(o, P, {
          configurable: !0,
          enumerable: !0,
          get: () => F[P],
          set: ne
        });
  }
  if (go = !0, r)
    for (const F in r) {
      const P = r[F], Ae = $(P) ? P.bind(n, n) : $(P.get) ? P.get.bind(n, n) : ne;
      process.env.NODE_ENV !== "production" && Ae === ne && O(`Computed property "${F}" has no getter.`);
      const qn = !$(P) && $(P.set) ? P.set.bind(n) : process.env.NODE_ENV !== "production" ? () => {
        O(
          `Write operation failed: computed property "${F}" is readonly.`
        );
      } : ne, Mt = No({
        get: Ae,
        set: qn
      });
      Object.defineProperty(o, F, {
        enumerable: !0,
        configurable: !0,
        get: () => Mt.value,
        set: (Et) => Mt.value = Et
      }), process.env.NODE_ENV !== "production" && Qe("Computed", F);
    }
  if (l)
    for (const F in l)
      wr(l[F], o, n, F);
  if (u) {
    const F = $(u) ? u.call(n) : u;
    Reflect.ownKeys(F).forEach((P) => {
      Kl(P, F[P]);
    });
  }
  p && rs(p, e, "c");
  function de(F, P) {
    M(P) ? P.forEach((Ae) => F(Ae.bind(n))) : P && F(P.bind(n));
  }
  if (de(Ol, a), de(Nr, g), de(xl, v), de(wl, V), de(yl, D), de(bl, Z), de(Tl, oe), de(Cl, q), de(Sl, ie), de(Dl, I), de(Or, ce), de(Vl, J), M(Y))
    if (Y.length) {
      const F = e.exposed || (e.exposed = {});
      Y.forEach((P) => {
        Object.defineProperty(F, P, {
          get: () => n[P],
          set: (Ae) => n[P] = Ae,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  S && e.render === ne && (e.render = S), Re != null && (e.inheritAttrs = Re), xe && (e.components = xe), un && (e.directives = un), J && yr(e);
}
function Fl(e, t, n = ne) {
  M(e) && (e = vo(e));
  for (const o in e) {
    const s = e[o];
    let r;
    W(s) ? "default" in s ? r = Gt(
      s.from || o,
      s.default,
      !0
    ) : r = Gt(s.from || o) : r = Gt(s), X(r) ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (i) => r.value = i
    }) : t[o] = r, process.env.NODE_ENV !== "production" && n("Inject", o);
  }
}
function rs(e, t, n) {
  We(
    M(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function wr(e, t, n, o) {
  let s = o.includes(".") ? Fr(n, o) : () => n[o];
  if (z(e)) {
    const r = t[e];
    $(r) ? Vt(s, r) : process.env.NODE_ENV !== "production" && O(`Invalid watch handler specified by key "${e}"`, r);
  } else if ($(e))
    Vt(s, e.bind(n));
  else if (W(e))
    if (M(e))
      e.forEach((r) => wr(r, t, n, o));
    else {
      const r = $(e.handler) ? e.handler.bind(n) : t[e.handler];
      $(r) ? Vt(s, r, e) : process.env.NODE_ENV !== "production" && O(`Invalid watch handler specified by key "${e.handler}"`, r);
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
    (d) => Tn(u, d, i, !0)
  ), Tn(u, t, i)), W(t) && r.set(t, u), u;
}
function Tn(e, t, n, o = !1) {
  const { mixins: s, extends: r } = t;
  r && Tn(e, r, n, !0), s && s.forEach(
    (i) => Tn(e, i, n, !0)
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
  data: is,
  props: ls,
  emits: ls,
  // objects
  methods: Ht,
  computed: Ht,
  // lifecycle
  beforeCreate: fe,
  created: fe,
  beforeMount: fe,
  mounted: fe,
  beforeUpdate: fe,
  updated: fe,
  beforeDestroy: fe,
  beforeUnmount: fe,
  destroyed: fe,
  unmounted: fe,
  activated: fe,
  deactivated: fe,
  errorCaptured: fe,
  serverPrefetch: fe,
  // assets
  components: Ht,
  directives: Ht,
  // watch
  watch: kl,
  // provide / inject
  provide: is,
  inject: Hl
};
function is(e, t) {
  return t ? e ? function() {
    return ee(
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
function fe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Ht(e, t) {
  return e ? ee(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ls(e, t) {
  return e ? M(e) && M(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ee(
    /* @__PURE__ */ Object.create(null),
    ss(e),
    ss(t ?? {})
  ) : t;
}
function kl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ee(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = fe(e[o], t[o]);
  return n;
}
function Vr() {
  return {
    app: null,
    config: {
      isNativeTag: Ls,
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
    const d = r.app = {
      _uid: Ul++,
      _component: o,
      _props: s,
      _container: null,
      _context: r,
      _instance: null,
      version: Es,
      get config() {
        return r.config;
      },
      set config(p) {
        process.env.NODE_ENV !== "production" && O(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(p, ...a) {
        return i.has(p) ? process.env.NODE_ENV !== "production" && O("Plugin has already been applied to target app.") : p && $(p.install) ? (i.add(p), p.install(d, ...a)) : $(p) ? (i.add(p), p(d, ...a)) : process.env.NODE_ENV !== "production" && O(
          'A plugin must either be a function or an object with an "install" function.'
        ), d;
      },
      mixin(p) {
        return r.mixins.includes(p) ? process.env.NODE_ENV !== "production" && O(
          "Mixin has already been applied to target app" + (p.name ? `: ${p.name}` : "")
        ) : r.mixins.push(p), d;
      },
      component(p, a) {
        return process.env.NODE_ENV !== "production" && bo(p, r.config), a ? (process.env.NODE_ENV !== "production" && r.components[p] && O(`Component "${p}" has already been registered in target app.`), r.components[p] = a, d) : r.components[p];
      },
      directive(p, a) {
        return process.env.NODE_ENV !== "production" && Er(p), a ? (process.env.NODE_ENV !== "production" && r.directives[p] && O(`Directive "${p}" has already been registered in target app.`), r.directives[p] = a, d) : r.directives[p];
      },
      mount(p, a, g) {
        if (u)
          process.env.NODE_ENV !== "production" && O(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          process.env.NODE_ENV !== "production" && p.__vue_app__ && O(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const v = d._ceVNode || Oe(o, s);
          return v.appContext = r, g === !0 ? g = "svg" : g === !1 && (g = void 0), process.env.NODE_ENV !== "production" && (r.reload = () => {
            const V = lt(v);
            V.el = null, e(V, p, g);
          }), e(v, p, g), u = !0, d._container = p, p.__vue_app__ = d, process.env.NODE_ENV !== "production" && (d._instance = v.component, cl(d, Es)), Ko(v.component);
        }
      },
      onUnmount(p) {
        process.env.NODE_ENV !== "production" && typeof p != "function" && O(
          `Expected function as first argument to app.onUnmount(), but got ${typeof p}`
        ), l.push(p);
      },
      unmount() {
        u ? (We(
          l,
          d._instance,
          16
        ), e(null, d._container), process.env.NODE_ENV !== "production" && (d._instance = null, ul(d)), delete d._container.__vue_app__) : process.env.NODE_ENV !== "production" && O("Cannot unmount an app that is not mounted.");
      },
      provide(p, a) {
        return process.env.NODE_ENV !== "production" && p in r.provides && (H(r.provides, p) ? O(
          `App already provides property with key "${String(p)}". It will be overwritten with the new value.`
        ) : O(
          `App already provides property with key "${String(p)}" inherited from its parent element. It will be overwritten with the new value.`
        )), r.provides[p] = a, d;
      },
      runWithContext(p) {
        const a = Dt;
        Dt = d;
        try {
          return p();
        } finally {
          Dt = a;
        }
      }
    };
    return d;
  };
}
let Dt = null;
function Kl(e, t) {
  if (!re)
    process.env.NODE_ENV !== "production" && O("provide() can only be used inside setup().");
  else {
    let n = re.provides;
    const o = re.parent && re.parent.provides;
    o === n && (n = re.provides = Object.create(o)), n[e] = t;
  }
}
function Gt(e, t, n = !1) {
  const o = Zr();
  if (o || Dt) {
    let s = Dt ? Dt._context.provides : o ? o.parent == null || o.ce ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : void 0;
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
  process.env.NODE_ENV !== "production" && Rr(t || {}, s, e), n ? e.props = o ? s : Ui(s) : e.type.props ? e.props = s : e.props = r, e.attrs = r;
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
  } = e, l = A(s), [u] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(process.env.NODE_ENV !== "production" && Gl(e)) && (o || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const p = e.vnode.dynamicProps;
      for (let a = 0; a < p.length; a++) {
        let g = p[a];
        if (Kn(e.emitsOptions, g))
          continue;
        const v = t[g];
        if (u)
          if (H(r, g))
            v !== r[g] && (r[g] = v, d = !0);
          else {
            const V = Se(g);
            s[V] = mo(
              u,
              l,
              V,
              v,
              e,
              !1
            );
          }
        else
          v !== r[g] && (r[g] = v, d = !0);
      }
    }
  } else {
    Mr(e, t, s, r) && (d = !0);
    let p;
    for (const a in l)
      (!t || // for camelCase
      !H(t, a) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((p = Ye(a)) === a || !H(t, p))) && (u ? n && // for camelCase
      (n[a] !== void 0 || // for kebab-case
      n[p] !== void 0) && (s[a] = mo(
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
  d && ke(e.attrs, "set", ""), process.env.NODE_ENV !== "production" && Rr(t || {}, s, e);
}
function Mr(e, t, n, o) {
  const [s, r] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let u in t) {
      if (kt(u))
        continue;
      const d = t[u];
      let p;
      s && H(s, p = Se(u)) ? !r || !r.includes(p) ? n[p] = d : (l || (l = {}))[p] = d : Kn(e.emitsOptions, u) || (!(u in o) || d !== o[u]) && (o[u] = d, i = !0);
    }
  if (r) {
    const u = A(n), d = l || K;
    for (let p = 0; p < r.length; p++) {
      const a = r[p];
      n[a] = mo(
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
function mo(e, t, n, o, s, r) {
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
          const p = ln(s);
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
    ] && (r && !l ? o = !1 : i[
      1
      /* shouldCastTrue */
    ] && (o === "" || o === Ye(n)) && (o = !0));
  }
  return o;
}
const ql = /* @__PURE__ */ new WeakMap();
function $r(e, t, n = !1) {
  const o = n ? ql : t.propsCache, s = o.get(e);
  if (s)
    return s;
  const r = e.props, i = {}, l = [];
  let u = !1;
  if (!$(e)) {
    const p = (a) => {
      u = !0;
      const [g, v] = $r(a, t, !0);
      ee(i, g), v && l.push(...v);
    };
    !n && t.mixins.length && t.mixins.forEach(p), e.extends && p(e.extends), e.mixins && e.mixins.forEach(p);
  }
  if (!r && !u)
    return W(e) && o.set(e, xt), xt;
  if (M(r))
    for (let p = 0; p < r.length; p++) {
      process.env.NODE_ENV !== "production" && !z(r[p]) && O("props must be strings when using array syntax.", r[p]);
      const a = Se(r[p]);
      cs(a) && (i[a] = K);
    }
  else if (r) {
    process.env.NODE_ENV !== "production" && !W(r) && O("invalid props options", r);
    for (const p in r) {
      const a = Se(p);
      if (cs(a)) {
        const g = r[p], v = i[a] = M(g) || $(g) ? { type: g } : ee({}, g), V = v.type;
        let D = !1, Z = !0;
        if (M(V))
          for (let k = 0; k < V.length; ++k) {
            const I = V[k], L = $(I) && I.name;
            if (L === "Boolean") {
              D = !0;
              break;
            } else L === "String" && (Z = !1);
          }
        else
          D = $(V) && V.name === "Boolean";
        v[
          0
          /* shouldCast */
        ] = D, v[
          1
          /* shouldCastTrue */
        ] = Z, (D || H(v, "default")) && l.push(a);
      }
    }
  }
  const d = [i, l];
  return W(e) && o.set(e, d), d;
}
function cs(e) {
  return e[0] !== "$" && !kt(e) ? !0 : (process.env.NODE_ENV !== "production" && O(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function Jl(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function Rr(e, t, n) {
  const o = A(t), s = n.propsOptions[0], r = Object.keys(e).map((i) => Se(i));
  for (const i in s) {
    let l = s[i];
    l != null && Yl(
      i,
      o[i],
      l,
      process.env.NODE_ENV !== "production" ? Ue(o) : o,
      !r.includes(i)
    );
  }
}
function Yl(e, t, n, o, s) {
  const { type: r, required: i, validator: l, skipCheck: u } = n;
  if (i && s) {
    O('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !i)) {
    if (r != null && r !== !0 && !u) {
      let d = !1;
      const p = M(r) ? r : [r], a = [];
      for (let g = 0; g < p.length && !d; g++) {
        const { valid: v, expectedType: V } = Xl(t, p[g]);
        a.push(V || ""), d = v;
      }
      if (!d) {
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
  const o = Jl(t);
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
  let o = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(Ln).join(" | ")}`;
  const s = n[0], r = Do(t), i = us(t, s), l = us(t, r);
  return n.length === 1 && fs(s) && !ec(s, r) && (o += ` with value ${i}`), o += `, got ${r} `, fs(r) && (o += `with value ${l}.`), o;
}
function us(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function fs(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function ec(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const Ho = (e) => e === "_" || e === "_ctx" || e === "$stable", ko = (e) => M(e) ? e.map(we) : [we(e)], tc = (e, t, n) => {
  if (t._n)
    return t;
  const o = vl((...s) => (process.env.NODE_ENV !== "production" && re && !(n === null && ye) && !(n && n.root !== re.root) && O(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), ko(t(...s))), n);
  return o._c = !1, o;
}, Ar = (e, t, n) => {
  const o = e._ctx;
  for (const s in e) {
    if (Ho(s)) continue;
    const r = e[s];
    if ($(r))
      t[s] = tc(s, r, o);
    else if (r != null) {
      process.env.NODE_ENV !== "production" && O(
        `Non-function value encountered for slot "${s}". Prefer function slots for better performance.`
      );
      const i = ko(r);
      t[s] = () => i;
    }
  }
}, Ir = (e, t) => {
  process.env.NODE_ENV !== "production" && !Fo(e.vnode) && O(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = ko(t);
  e.slots.default = () => n;
}, _o = (e, t, n) => {
  for (const o in t)
    (n || !Ho(o)) && (e[o] = t[o]);
}, nc = (e, t, n) => {
  const o = e.slots = Cr();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (_o(o, t, n), n && Nn(o, "_", s, !0)) : Ar(t, o);
  } else t && Ir(e, t);
}, oc = (e, t, n) => {
  const { vnode: o, slots: s } = e;
  let r = !0, i = K;
  if (o.shapeFlag & 32) {
    const l = t._;
    l ? process.env.NODE_ENV !== "production" && Be ? (_o(s, t, n), ke(e, "set", "$slots")) : n && l === 1 ? r = !1 : _o(s, t, n) : (r = !t.$stable, Ar(t, s)), i = t;
  } else t && (Ir(e, t), i = { default: 1 });
  if (r)
    for (const l in s)
      !Ho(l) && i[l] == null && delete s[l];
};
let Lt, qe;
function bt(e, t) {
  e.appContext.config.performance && Mn() && qe.mark(`vue-${t}-${e.uid}`), process.env.NODE_ENV !== "production" && dl(e, t, Mn() ? qe.now() : Date.now());
}
function Nt(e, t) {
  if (e.appContext.config.performance && Mn()) {
    const n = `vue-${t}-${e.uid}`, o = n + ":end", s = `<${Gn(e, e.type)}> ${t}`;
    qe.mark(o), qe.measure(s, n, o), qe.clearMeasures(s), qe.clearMarks(n), qe.clearMarks(o);
  }
  process.env.NODE_ENV !== "production" && hl(e, t, Mn() ? qe.now() : Date.now());
}
function Mn() {
  return Lt !== void 0 || (typeof window < "u" && window.performance ? (Lt = !0, qe = window.performance) : Lt = !1), Lt;
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
const _e = Ec;
function rc(e) {
  return ic(e);
}
function ic(e, t) {
  sc();
  const n = tn();
  n.__VUE__ = !0, process.env.NODE_ENV !== "production" && Io(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const {
    insert: o,
    remove: s,
    patchProp: r,
    createElement: i,
    createText: l,
    createComment: u,
    setText: d,
    setElementText: p,
    parentNode: a,
    nextSibling: g,
    setScopeId: v = ne,
    insertStaticContent: V
  } = e, D = (c, f, h, E = null, m = null, _ = null, x = void 0, N = null, b = process.env.NODE_ENV !== "production" && Be ? !1 : !!f.dynamicChildren) => {
    if (c === f)
      return;
    c && !Ft(c, f) && (E = fn(c), et(c, m, _, !0), c = null), f.patchFlag === -2 && (b = !1, f.dynamicChildren = null);
    const { type: y, ref: T, shapeFlag: w } = f;
    switch (y) {
      case rn:
        Z(c, f, h, E);
        break;
      case Ne:
        k(c, f, h, E);
        break;
      case _n:
        c == null ? I(f, h, E, x) : process.env.NODE_ENV !== "production" && L(c, f, h, x);
        break;
      case Ee:
        un(
          c,
          f,
          h,
          E,
          m,
          _,
          x,
          N,
          b
        );
        break;
      default:
        w & 1 ? q(
          c,
          f,
          h,
          E,
          m,
          _,
          x,
          N,
          b
        ) : w & 6 ? Wo(
          c,
          f,
          h,
          E,
          m,
          _,
          x,
          N,
          b
        ) : w & 64 || w & 128 ? y.process(
          c,
          f,
          h,
          E,
          m,
          _,
          x,
          N,
          b,
          Rt
        ) : process.env.NODE_ENV !== "production" && O("Invalid VNode type:", y, `(${typeof y})`);
    }
    T != null && m ? Kt(T, c && c.ref, _, f || c, !f) : T == null && c && c.ref != null && Kt(c.ref, null, _, c, !0);
  }, Z = (c, f, h, E) => {
    if (c == null)
      o(
        f.el = l(f.children),
        h,
        E
      );
    else {
      const m = f.el = c.el;
      f.children !== c.children && d(m, f.children);
    }
  }, k = (c, f, h, E) => {
    c == null ? o(
      f.el = u(f.children || ""),
      h,
      E
    ) : f.el = c.el;
  }, I = (c, f, h, E) => {
    [c.el, c.anchor] = V(
      c.children,
      f,
      h,
      E,
      c.el,
      c.anchor
    );
  }, L = (c, f, h, E) => {
    if (f.children !== c.children) {
      const m = g(c.anchor);
      S(c), [f.el, f.anchor] = V(
        f.children,
        h,
        m,
        E
      );
    } else
      f.el = c.el, f.anchor = c.anchor;
  }, ce = ({ el: c, anchor: f }, h, E) => {
    let m;
    for (; c && c !== f; )
      m = g(c), o(c, h, E), c = m;
    o(f, h, E);
  }, S = ({ el: c, anchor: f }) => {
    let h;
    for (; c && c !== f; )
      h = g(c), s(c), c = h;
    s(f);
  }, q = (c, f, h, E, m, _, x, N, b) => {
    f.type === "svg" ? x = "svg" : f.type === "math" && (x = "mathml"), c == null ? ie(
      f,
      h,
      E,
      m,
      _,
      x,
      N,
      b
    ) : Y(
      c,
      f,
      m,
      _,
      x,
      N,
      b
    );
  }, ie = (c, f, h, E, m, _, x, N) => {
    let b, y;
    const { props: T, shapeFlag: w, transition: C, dirs: R } = c;
    if (b = c.el = i(
      c.type,
      _,
      T && T.is,
      T
    ), w & 8 ? p(b, c.children) : w & 16 && J(
      c.children,
      b,
      null,
      E,
      m,
      so(c, _),
      x,
      N
    ), R && ut(c, null, E, "created"), oe(b, c, c.scopeId, x, E), T) {
      for (const G in T)
        G !== "value" && !kt(G) && r(b, G, null, T[G], _, E);
      "value" in T && r(b, "value", null, T.value, _), (y = T.onVnodeBeforeMount) && Fe(y, E, c);
    }
    process.env.NODE_ENV !== "production" && (Nn(b, "__vnode", c, !0), Nn(b, "__vueParentComponent", E, !0)), R && ut(c, null, E, "beforeMount");
    const j = lc(m, C);
    j && C.beforeEnter(b), o(b, f, h), ((y = T && T.onVnodeMounted) || j || R) && _e(() => {
      y && Fe(y, E, c), j && C.enter(b), R && ut(c, null, E, "mounted");
    }, m);
  }, oe = (c, f, h, E, m) => {
    if (h && v(c, h), E)
      for (let _ = 0; _ < E.length; _++)
        v(c, E[_]);
    if (m) {
      let _ = m.subTree;
      if (process.env.NODE_ENV !== "production" && _.patchFlag > 0 && _.patchFlag & 2048 && (_ = Uo(_.children) || _), f === _ || kr(_.type) && (_.ssContent === f || _.ssFallback === f)) {
        const x = m.vnode;
        oe(
          c,
          x,
          x.scopeId,
          x.slotScopeIds,
          m.parent
        );
      }
    }
  }, J = (c, f, h, E, m, _, x, N, b = 0) => {
    for (let y = b; y < c.length; y++) {
      const T = c[y] = N ? nt(c[y]) : we(c[y]);
      D(
        null,
        T,
        f,
        h,
        E,
        m,
        _,
        x,
        N
      );
    }
  }, Y = (c, f, h, E, m, _, x) => {
    const N = f.el = c.el;
    process.env.NODE_ENV !== "production" && (N.__vnode = f);
    let { patchFlag: b, dynamicChildren: y, dirs: T } = f;
    b |= c.patchFlag & 16;
    const w = c.props || K, C = f.props || K;
    let R;
    if (h && ft(h, !1), (R = C.onVnodeBeforeUpdate) && Fe(R, h, f, c), T && ut(f, c, h, "beforeUpdate"), h && ft(h, !0), process.env.NODE_ENV !== "production" && Be && (b = 0, x = !1, y = null), (w.innerHTML && C.innerHTML == null || w.textContent && C.textContent == null) && p(N, ""), y ? (Re(
      c.dynamicChildren,
      y,
      N,
      h,
      E,
      so(f, m),
      _
    ), process.env.NODE_ENV !== "production" && mn(c, f)) : x || Ae(
      c,
      f,
      N,
      null,
      h,
      E,
      so(f, m),
      _,
      !1
    ), b > 0) {
      if (b & 16)
        xe(N, w, C, h, m);
      else if (b & 2 && w.class !== C.class && r(N, "class", null, C.class, m), b & 4 && r(N, "style", w.style, C.style, m), b & 8) {
        const j = f.dynamicProps;
        for (let G = 0; G < j.length; G++) {
          const B = j[G], he = w[B], ge = C[B];
          (ge !== he || B === "value") && r(N, B, he, ge, m, h);
        }
      }
      b & 1 && c.children !== f.children && p(N, f.children);
    } else !x && y == null && xe(N, w, C, h, m);
    ((R = C.onVnodeUpdated) || T) && _e(() => {
      R && Fe(R, h, f, c), T && ut(f, c, h, "updated");
    }, E);
  }, Re = (c, f, h, E, m, _, x) => {
    for (let N = 0; N < f.length; N++) {
      const b = c[N], y = f[N], T = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        b.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (b.type === Ee || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Ft(b, y) || // - In the case of a component, it could contain anything.
        b.shapeFlag & 198) ? a(b.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          h
        )
      );
      D(
        b,
        y,
        T,
        null,
        E,
        m,
        _,
        x,
        !0
      );
    }
  }, xe = (c, f, h, E, m) => {
    if (f !== h) {
      if (f !== K)
        for (const _ in f)
          !kt(_) && !(_ in h) && r(
            c,
            _,
            f[_],
            null,
            m,
            E
          );
      for (const _ in h) {
        if (kt(_)) continue;
        const x = h[_], N = f[_];
        x !== N && _ !== "value" && r(c, _, N, x, m, E);
      }
      "value" in h && r(c, "value", f.value, h.value, m);
    }
  }, un = (c, f, h, E, m, _, x, N, b) => {
    const y = f.el = c ? c.el : l(""), T = f.anchor = c ? c.anchor : l("");
    let { patchFlag: w, dynamicChildren: C, slotScopeIds: R } = f;
    process.env.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (Be || w & 2048) && (w = 0, b = !1, C = null), R && (N = N ? N.concat(R) : R), c == null ? (o(y, h, E), o(T, h, E), J(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      f.children || [],
      h,
      T,
      m,
      _,
      x,
      N,
      b
    )) : w > 0 && w & 64 && C && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren ? (Re(
      c.dynamicChildren,
      C,
      h,
      m,
      _,
      x,
      N
    ), process.env.NODE_ENV !== "production" ? mn(c, f) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (f.key != null || m && f === m.subTree) && mn(
        c,
        f,
        !0
        /* shallow */
      )
    )) : Ae(
      c,
      f,
      h,
      T,
      m,
      _,
      x,
      N,
      b
    );
  }, Wo = (c, f, h, E, m, _, x, N, b) => {
    f.slotScopeIds = N, c == null ? f.shapeFlag & 512 ? m.ctx.activate(
      f,
      h,
      E,
      x,
      b
    ) : Qe(
      f,
      h,
      E,
      m,
      _,
      x,
      b
    ) : de(c, f, b);
  }, Qe = (c, f, h, E, m, _, x) => {
    const N = c.component = Dc(
      c,
      E,
      m
    );
    if (process.env.NODE_ENV !== "production" && N.type.__hmrId && sl(N), process.env.NODE_ENV !== "production" && (hn(c), bt(N, "mount")), Fo(c) && (N.ctx.renderer = Rt), process.env.NODE_ENV !== "production" && bt(N, "init"), Sc(N, !1, x), process.env.NODE_ENV !== "production" && Nt(N, "init"), process.env.NODE_ENV !== "production" && Be && (c.el = null), N.asyncDep) {
      if (m && m.registerDep(N, F, x), !c.el) {
        const b = N.subTree = Oe(Ne);
        k(null, b, f, h), c.placeholder = b.el;
      }
    } else
      F(
        N,
        c,
        f,
        h,
        m,
        _,
        x
      );
    process.env.NODE_ENV !== "production" && (gn(), Nt(N, "mount"));
  }, de = (c, f, h) => {
    const E = f.component = c.component;
    if (mc(c, f, h))
      if (E.asyncDep && !E.asyncResolved) {
        process.env.NODE_ENV !== "production" && hn(f), P(E, f, h), process.env.NODE_ENV !== "production" && gn();
        return;
      } else
        E.next = f, E.update();
    else
      f.el = c.el, E.vnode = f;
  }, F = (c, f, h, E, m, _, x) => {
    const N = () => {
      if (c.isMounted) {
        let { next: w, bu: C, u: R, parent: j, vnode: G } = c;
        {
          const Pe = Pr(c);
          if (Pe) {
            w && (w.el = G.el, P(c, w, x)), Pe.asyncDep.then(() => {
              c.isUnmounted || N();
            });
            return;
          }
        }
        let B = w, he;
        process.env.NODE_ENV !== "production" && hn(w || c.vnode), ft(c, !1), w ? (w.el = G.el, P(c, w, x)) : w = G, C && It(C), (he = w.props && w.props.onVnodeBeforeUpdate) && Fe(he, j, w, G), ft(c, !0), process.env.NODE_ENV !== "production" && bt(c, "render");
        const ge = ps(c);
        process.env.NODE_ENV !== "production" && Nt(c, "render");
        const Ie = c.subTree;
        c.subTree = ge, process.env.NODE_ENV !== "production" && bt(c, "patch"), D(
          Ie,
          ge,
          // parent may have changed if it's in a teleport
          a(Ie.el),
          // anchor may have changed if it's in a fragment
          fn(Ie),
          c,
          m,
          _
        ), process.env.NODE_ENV !== "production" && Nt(c, "patch"), w.el = ge.el, B === null && _c(c, ge.el), R && _e(R, m), (he = w.props && w.props.onVnodeUpdated) && _e(
          () => Fe(he, j, w, G),
          m
        ), process.env.NODE_ENV !== "production" && vr(c), process.env.NODE_ENV !== "production" && gn();
      } else {
        let w;
        const { el: C, props: R } = f, { bm: j, m: G, parent: B, root: he, type: ge } = c, Ie = Wt(f);
        ft(c, !1), j && It(j), !Ie && (w = R && R.onVnodeBeforeMount) && Fe(w, B, f), ft(c, !0);
        {
          he.ce && // @ts-expect-error _def is private
          he.ce._def.shadowRoot !== !1 && he.ce._injectChildStyle(ge), process.env.NODE_ENV !== "production" && bt(c, "render");
          const Pe = c.subTree = ps(c);
          process.env.NODE_ENV !== "production" && Nt(c, "render"), process.env.NODE_ENV !== "production" && bt(c, "patch"), D(
            null,
            Pe,
            h,
            E,
            c,
            m,
            _
          ), process.env.NODE_ENV !== "production" && Nt(c, "patch"), f.el = Pe.el;
        }
        if (G && _e(G, m), !Ie && (w = R && R.onVnodeMounted)) {
          const Pe = f;
          _e(
            () => Fe(w, B, Pe),
            m
          );
        }
        (f.shapeFlag & 256 || B && Wt(B.vnode) && B.vnode.shapeFlag & 256) && c.a && _e(c.a, m), c.isMounted = !0, process.env.NODE_ENV !== "production" && fl(c), f = h = E = null;
      }
    };
    c.scope.on();
    const b = c.effect = new Ws(N);
    c.scope.off();
    const y = c.update = b.run.bind(b), T = c.job = b.runIfDirty.bind(b);
    T.i = c, T.id = c.uid, b.scheduler = () => Un(T), ft(c, !0), process.env.NODE_ENV !== "production" && (b.onTrack = c.rtc ? (w) => It(c.rtc, w) : void 0, b.onTrigger = c.rtg ? (w) => It(c.rtg, w) : void 0), y();
  }, P = (c, f, h) => {
    f.component = c;
    const E = c.vnode.props;
    c.vnode = f, c.next = null, Zl(c, f.props, E, h), oc(c, f.children, h), Me(), es(c), $e();
  }, Ae = (c, f, h, E, m, _, x, N, b = !1) => {
    const y = c && c.children, T = c ? c.shapeFlag : 0, w = f.children, { patchFlag: C, shapeFlag: R } = f;
    if (C > 0) {
      if (C & 128) {
        Mt(
          y,
          w,
          h,
          E,
          m,
          _,
          x,
          N,
          b
        );
        return;
      } else if (C & 256) {
        qn(
          y,
          w,
          h,
          E,
          m,
          _,
          x,
          N,
          b
        );
        return;
      }
    }
    R & 8 ? (T & 16 && $t(y, m, _), w !== y && p(h, w)) : T & 16 ? R & 16 ? Mt(
      y,
      w,
      h,
      E,
      m,
      _,
      x,
      N,
      b
    ) : $t(y, m, _, !0) : (T & 8 && p(h, ""), R & 16 && J(
      w,
      h,
      E,
      m,
      _,
      x,
      N,
      b
    ));
  }, qn = (c, f, h, E, m, _, x, N, b) => {
    c = c || xt, f = f || xt;
    const y = c.length, T = f.length, w = Math.min(y, T);
    let C;
    for (C = 0; C < w; C++) {
      const R = f[C] = b ? nt(f[C]) : we(f[C]);
      D(
        c[C],
        R,
        h,
        null,
        m,
        _,
        x,
        N,
        b
      );
    }
    y > T ? $t(
      c,
      m,
      _,
      !0,
      !1,
      w
    ) : J(
      f,
      h,
      E,
      m,
      _,
      x,
      N,
      b,
      w
    );
  }, Mt = (c, f, h, E, m, _, x, N, b) => {
    let y = 0;
    const T = f.length;
    let w = c.length - 1, C = T - 1;
    for (; y <= w && y <= C; ) {
      const R = c[y], j = f[y] = b ? nt(f[y]) : we(f[y]);
      if (Ft(R, j))
        D(
          R,
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
      y++;
    }
    for (; y <= w && y <= C; ) {
      const R = c[w], j = f[C] = b ? nt(f[C]) : we(f[C]);
      if (Ft(R, j))
        D(
          R,
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
      w--, C--;
    }
    if (y > w) {
      if (y <= C) {
        const R = C + 1, j = R < T ? f[R].el : E;
        for (; y <= C; )
          D(
            null,
            f[y] = b ? nt(f[y]) : we(f[y]),
            h,
            j,
            m,
            _,
            x,
            N,
            b
          ), y++;
      }
    } else if (y > C)
      for (; y <= w; )
        et(c[y], m, _, !0), y++;
    else {
      const R = y, j = y, G = /* @__PURE__ */ new Map();
      for (y = j; y <= C; y++) {
        const ue = f[y] = b ? nt(f[y]) : we(f[y]);
        ue.key != null && (process.env.NODE_ENV !== "production" && G.has(ue.key) && O(
          "Duplicate keys found during update:",
          JSON.stringify(ue.key),
          "Make sure keys are unique."
        ), G.set(ue.key, y));
      }
      let B, he = 0;
      const ge = C - j + 1;
      let Ie = !1, Pe = 0;
      const At = new Array(ge);
      for (y = 0; y < ge; y++) At[y] = 0;
      for (y = R; y <= w; y++) {
        const ue = c[y];
        if (he >= ge) {
          et(ue, m, _, !0);
          continue;
        }
        let Le;
        if (ue.key != null)
          Le = G.get(ue.key);
        else
          for (B = j; B <= C; B++)
            if (At[B - j] === 0 && Ft(ue, f[B])) {
              Le = B;
              break;
            }
        Le === void 0 ? et(ue, m, _, !0) : (At[Le - j] = y + 1, Le >= Pe ? Pe = Le : Ie = !0, D(
          ue,
          f[Le],
          h,
          null,
          m,
          _,
          x,
          N,
          b
        ), he++);
      }
      const Zo = Ie ? cc(At) : xt;
      for (B = Zo.length - 1, y = ge - 1; y >= 0; y--) {
        const ue = j + y, Le = f[ue], qo = f[ue + 1], Jo = ue + 1 < T ? (
          // #13559, fallback to el placeholder for unresolved async component
          qo.el || qo.placeholder
        ) : E;
        At[y] === 0 ? D(
          null,
          Le,
          h,
          Jo,
          m,
          _,
          x,
          N,
          b
        ) : Ie && (B < 0 || y !== Zo[B] ? Et(Le, h, Jo, 2) : B--);
      }
    }
  }, Et = (c, f, h, E, m = null) => {
    const { el: _, type: x, transition: N, children: b, shapeFlag: y } = c;
    if (y & 6) {
      Et(c.component.subTree, f, h, E);
      return;
    }
    if (y & 128) {
      c.suspense.move(f, h, E);
      return;
    }
    if (y & 64) {
      x.move(c, f, h, Rt);
      return;
    }
    if (x === Ee) {
      o(_, f, h);
      for (let w = 0; w < b.length; w++)
        Et(b[w], f, h, E);
      o(c.anchor, f, h);
      return;
    }
    if (x === _n) {
      ce(c, f, h);
      return;
    }
    if (E !== 2 && y & 1 && N)
      if (E === 0)
        N.beforeEnter(_), o(_, f, h), _e(() => N.enter(_), m);
      else {
        const { leave: w, delayLeave: C, afterLeave: R } = N, j = () => {
          c.ctx.isUnmounted ? s(_) : o(_, f, h);
        }, G = () => {
          _._isLeaving && _[El](
            !0
            /* cancelled */
          ), w(_, () => {
            j(), R && R();
          });
        };
        C ? C(_, j, G) : G();
      }
    else
      o(_, f, h);
  }, et = (c, f, h, E = !1, m = !1) => {
    const {
      type: _,
      props: x,
      ref: N,
      children: b,
      dynamicChildren: y,
      shapeFlag: T,
      patchFlag: w,
      dirs: C,
      cacheIndex: R
    } = c;
    if (w === -2 && (m = !1), N != null && (Me(), Kt(N, null, h, c, !0), $e()), R != null && (f.renderCache[R] = void 0), T & 256) {
      f.ctx.deactivate(c);
      return;
    }
    const j = T & 1 && C, G = !Wt(c);
    let B;
    if (G && (B = x && x.onVnodeBeforeUnmount) && Fe(B, f, c), T & 6)
      si(c.component, h, E);
    else {
      if (T & 128) {
        c.suspense.unmount(h, E);
        return;
      }
      j && ut(c, null, f, "beforeUnmount"), T & 64 ? c.type.remove(
        c,
        f,
        h,
        Rt,
        E
      ) : y && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !y.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== Ee || w > 0 && w & 64) ? $t(
        y,
        f,
        h,
        !1,
        !0
      ) : (_ === Ee && w & 384 || !m && T & 16) && $t(b, f, h), E && Jn(c);
    }
    (G && (B = x && x.onVnodeUnmounted) || j) && _e(() => {
      B && Fe(B, f, c), j && ut(c, null, f, "unmounted");
    }, h);
  }, Jn = (c) => {
    const { type: f, el: h, anchor: E, transition: m } = c;
    if (f === Ee) {
      process.env.NODE_ENV !== "production" && c.patchFlag > 0 && c.patchFlag & 2048 && m && !m.persisted ? c.children.forEach((x) => {
        x.type === Ne ? s(x.el) : Jn(x);
      }) : oi(h, E);
      return;
    }
    if (f === _n) {
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
  }, oi = (c, f) => {
    let h;
    for (; c !== f; )
      h = g(c), s(c), c = h;
    s(f);
  }, si = (c, f, h) => {
    process.env.NODE_ENV !== "production" && c.type.__hmrId && rl(c);
    const { bum: E, scope: m, job: _, subTree: x, um: N, m: b, a: y } = c;
    as(b), as(y), E && It(E), m.stop(), _ && (_.flags |= 8, et(x, c, f, h)), N && _e(N, f), _e(() => {
      c.isUnmounted = !0;
    }, f), process.env.NODE_ENV !== "production" && pl(c);
  }, $t = (c, f, h, E = !1, m = !1, _ = 0) => {
    for (let x = _; x < c.length; x++)
      et(c[x], f, h, E, m);
  }, fn = (c) => {
    if (c.shapeFlag & 6)
      return fn(c.component.subTree);
    if (c.shapeFlag & 128)
      return c.suspense.next();
    const f = g(c.anchor || c.el), h = f && f[ml];
    return h ? g(h) : f;
  };
  let Yn = !1;
  const Go = (c, f, h) => {
    c == null ? f._vnode && et(f._vnode, null, null, !0) : D(
      f._vnode || null,
      c,
      f,
      null,
      null,
      null,
      h
    ), f._vnode = c, Yn || (Yn = !0, es(), dr(), Yn = !1);
  }, Rt = {
    p: D,
    um: et,
    m: Et,
    r: Jn,
    mt: Qe,
    mc: J,
    pc: Ae,
    pbc: Re,
    n: fn,
    o: e
  };
  return {
    render: Go,
    hydrate: void 0,
    createApp: Bl(Go)
  };
}
function so({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function ft({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function lc(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function mn(e, t, n = !1) {
  const o = e.children, s = t.children;
  if (M(o) && M(s))
    for (let r = 0; r < o.length; r++) {
      const i = o[r];
      let l = s[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = s[r] = nt(s[r]), l.el = i.el), !n && l.patchFlag !== -2 && mn(i, l)), l.type === rn && // avoid cached text nodes retaining detached dom nodes
      l.patchFlag !== -1 && (l.el = i.el), l.type === Ne && !l.el && (l.el = i.el), process.env.NODE_ENV !== "production" && l.el && (l.el.__vnode = l);
    }
}
function cc(e) {
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
function Pr(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Pr(t);
}
function as(e) {
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
function Vt(e, t, n) {
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
  let d;
  if (Xt) {
    if (r === "sync") {
      const v = fc();
      d = v.__watcherHandles || (v.__watcherHandles = []);
    } else if (!u) {
      const v = () => {
      };
      return v.stop = ne, v.resume = ne, v.pause = ne, v;
    }
  }
  const p = re;
  l.call = (v, V, D) => We(v, p, V, D);
  let a = !1;
  r === "post" ? l.scheduler = (v) => {
    _e(v, p && p.suspense);
  } : r !== "sync" && (a = !0, l.scheduler = (v, V) => {
    V ? v() : Un(v);
  }), l.augmentJob = (v) => {
    t && (v.flags |= 4), a && (v.flags |= 2, p && (v.id = p.uid, v.i = p));
  };
  const g = Yi(e, t, l);
  return Xt && (d ? d.push(g) : u && g()), g;
}
function ac(e, t, n) {
  const o = this.proxy, s = z(e) ? e.includes(".") ? Fr(o, e) : () => o[e] : e.bind(o, o);
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
const pc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Se(t)}Modifiers`] || e[`${Ye(t)}Modifiers`];
function dc(e, t, ...n) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || K;
  if (process.env.NODE_ENV !== "production") {
    const {
      emitsOptions: p,
      propsOptions: [a]
    } = e;
    if (p)
      if (!(t in p))
        (!a || !(at(Se(t)) in a)) && O(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${at(Se(t))}" prop.`
        );
      else {
        const g = p[t];
        $(g) && (g(...n) || O(
          `Invalid event arguments: event validation failed for event "${t}".`
        ));
      }
  }
  let s = n;
  const r = t.startsWith("update:"), i = r && pc(o, t.slice(7));
  if (i && (i.trim && (s = n.map((p) => z(p) ? p.trim() : p)), i.number && (s = n.map(ui))), process.env.NODE_ENV !== "production" && gl(e, t, s), process.env.NODE_ENV !== "production") {
    const p = t.toLowerCase();
    p !== t && o[at(p)] && O(
      `Event "${p}" is emitted in component ${Gn(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${Ye(
        t
      )}" instead of "${t}".`
    );
  }
  let l, u = o[l = at(t)] || // also try camelCase event handler (#2249)
  o[l = at(Se(t))];
  !u && r && (u = o[l = at(Ye(t))]), u && We(
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
    e.emitted[l] = !0, We(
      d,
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
    const u = (d) => {
      const p = jr(d, t, !0);
      p && (l = !0, ee(i, p));
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !r && !l ? (W(e) && o.set(e, null), null) : (M(r) ? r.forEach((u) => i[u] = null) : ee(i, r), W(e) && o.set(e, i), i);
}
function Kn(e, t) {
  return !e || !en(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), H(e, t[0].toLowerCase() + t.slice(1)) || H(e, Ye(t)) || H(e, t));
}
let Eo = !1;
function $n() {
  Eo = !0;
}
function ps(e) {
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
    renderCache: p,
    props: a,
    data: g,
    setupState: v,
    ctx: V,
    inheritAttrs: D
  } = e, Z = Sn(e);
  let k, I;
  process.env.NODE_ENV !== "production" && (Eo = !1);
  try {
    if (n.shapeFlag & 4) {
      const S = s || o, q = process.env.NODE_ENV !== "production" && v.__isScriptSetup ? new Proxy(S, {
        get(ie, oe, J) {
          return O(
            `Property '${String(
              oe
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(ie, oe, J);
        }
      }) : S;
      k = we(
        d.call(
          q,
          S,
          p,
          process.env.NODE_ENV !== "production" ? Ue(a) : a,
          v,
          g,
          V
        )
      ), I = l;
    } else {
      const S = t;
      process.env.NODE_ENV !== "production" && l === a && $n(), k = we(
        S.length > 1 ? S(
          process.env.NODE_ENV !== "production" ? Ue(a) : a,
          process.env.NODE_ENV !== "production" ? {
            get attrs() {
              return $n(), Ue(l);
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
    Zt.length = 0, on(S, e, 1), k = Oe(Ne);
  }
  let L = k, ce;
  if (process.env.NODE_ENV !== "production" && k.patchFlag > 0 && k.patchFlag & 2048 && ([L, ce] = Hr(k)), I && D !== !1) {
    const S = Object.keys(I), { shapeFlag: q } = L;
    if (S.length) {
      if (q & 7)
        r && S.some(bn) && (I = vc(
          I,
          r
        )), L = lt(L, I, !1, !0);
      else if (process.env.NODE_ENV !== "production" && !Eo && L.type !== Ne) {
        const ie = Object.keys(l), oe = [], J = [];
        for (let Y = 0, Re = ie.length; Y < Re; Y++) {
          const xe = ie[Y];
          en(xe) ? bn(xe) || oe.push(xe[2].toLowerCase() + xe.slice(3)) : J.push(xe);
        }
        J.length && O(
          `Extraneous non-props attributes (${J.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`
        ), oe.length && O(
          `Extraneous non-emits event listeners (${oe.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return n.dirs && (process.env.NODE_ENV !== "production" && !ds(L) && O(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), L = lt(L, null, !1, !0), L.dirs = L.dirs ? L.dirs.concat(n.dirs) : n.dirs), n.transition && (process.env.NODE_ENV !== "production" && !ds(L) && O(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), Lo(L, n.transition)), process.env.NODE_ENV !== "production" && ce ? ce(L) : k = L, Sn(Z), k;
}
const Hr = (e) => {
  const t = e.children, n = e.dynamicChildren, o = Uo(t, !1);
  if (o) {
    if (process.env.NODE_ENV !== "production" && o.patchFlag > 0 && o.patchFlag & 2048)
      return Hr(o);
  } else return [e, void 0];
  const s = t.indexOf(o), r = n ? n.indexOf(o) : -1, i = (l) => {
    t[s] = l, n && (r > -1 ? n[r] = l : l.patchFlag > 0 && (e.dynamicChildren = [...n, l]));
  };
  return [we(o), i];
};
function Uo(e, t = !0) {
  let n;
  for (let o = 0; o < e.length; o++) {
    const s = e[o];
    if (Wn(s)) {
      if (s.type !== Ne || s.children === "v-if") {
        if (n)
          return;
        if (n = s, process.env.NODE_ENV !== "production" && t && n.patchFlag > 0 && n.patchFlag & 2048)
          return Uo(n.children);
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
    (!bn(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
}, ds = (e) => e.shapeFlag & 7 || e.type === Ne;
function mc(e, t, n) {
  const { props: o, children: s, component: r } = e, { props: i, children: l, patchFlag: u } = t, d = r.emitsOptions;
  if (process.env.NODE_ENV !== "production" && (s || l) && Be || t.dirs || t.transition)
    return !0;
  if (n && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return o ? hs(o, i, d) : !!i;
    if (u & 8) {
      const p = t.dynamicProps;
      for (let a = 0; a < p.length; a++) {
        const g = p[a];
        if (i[g] !== o[g] && !Kn(d, g))
          return !0;
      }
    }
  } else
    return (s || l) && (!l || !l.$stable) ? !0 : o === i ? !1 : o ? i ? hs(o, i, d) : !0 : !!i;
  return !1;
}
function hs(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let s = 0; s < o.length; s++) {
    const r = o[s];
    if (t[r] !== e[r] && !Kn(n, r))
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
const Ee = Symbol.for("v-fgt"), rn = Symbol.for("v-txt"), Ne = Symbol.for("v-cmt"), _n = Symbol.for("v-stc"), Zt = [];
let be = null;
function Q(e = !1) {
  Zt.push(be = e ? null : []);
}
function yc() {
  Zt.pop(), be = Zt[Zt.length - 1] || null;
}
let zt = 1;
function gs(e, t = !1) {
  zt += e, e < 0 && be && t && (be.hasOnce = !0);
}
function Ur(e) {
  return e.dynamicChildren = zt > 0 ? be || xt : null, yc(), zt > 0 && be && be.push(e), e;
}
function le(e, t, n, o, s, r) {
  return Ur(
    Ve(
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
    Oe(
      e,
      t,
      n,
      o,
      s,
      !0
    )
  );
}
function Wn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ft(e, t) {
  if (process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && e.component) {
    const n = vn.get(t.type);
    if (n && n.has(e.component))
      return e.shapeFlag &= -257, t.shapeFlag &= -513, !1;
  }
  return e.type === t.type && e.key === t.key;
}
const bc = (...e) => Kr(
  ...e
), Br = ({ key: e }) => e ?? null, En = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? z(e) || X(e) || $(e) ? { i: ye, r: e, k: t, f: !!n } : e : null);
function Ve(e, t = null, n = null, o = 0, s = null, r = e === Ee ? 0 : 1, i = !1, l = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Br(t),
    ref: t && En(t),
    scopeId: _r,
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
    ctx: ye
  };
  return l ? (Bo(u, n), r & 128 && e.normalize(u)) : n && (u.shapeFlag |= z(n) ? 8 : 16), process.env.NODE_ENV !== "production" && u.key !== u.key && O("VNode created with invalid key (NaN). VNode type:", u.type), zt > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  be && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && be.push(u), u;
}
const Oe = process.env.NODE_ENV !== "production" ? bc : Kr;
function Kr(e, t = null, n = null, o = 0, s = null, r = !1) {
  if ((!e || e === Ml) && (process.env.NODE_ENV !== "production" && !e && O(`Invalid vnode type when creating vnode: ${e}.`), e = Ne), Wn(e)) {
    const l = lt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Bo(l, n), zt > 0 && !r && be && (l.shapeFlag & 6 ? be[be.indexOf(e)] = l : be.push(l)), l.patchFlag = -2, l;
  }
  if (zr(e) && (e = e.__vccOpts), t) {
    t = Nc(t);
    let { class: l, style: u } = t;
    l && !z(l) && (t.class = Fn(l)), W(u) && (On(u) && !M(u) && (u = ee({}, u)), t.style = nn(u));
  }
  const i = z(e) ? 1 : kr(e) ? 128 : _l(e) ? 64 : W(e) ? 4 : $(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && On(e) && (e = A(e), O(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), Ve(
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
  return e ? On(e) || Tr(e) ? ee({}, e) : e : null;
}
function lt(e, t, n = !1, o = !1) {
  const { props: s, ref: r, patchFlag: i, children: l, transition: u } = e, d = t ? Oc(s || {}, t) : s, p = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Br(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? M(r) ? r.concat(En(t)) : [r, En(t)] : En(t)
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
    patchFlag: t && e.type !== Ee ? i === -1 ? 16 : i | 16 : i,
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
    ssContent: e.ssContent && lt(e.ssContent),
    ssFallback: e.ssFallback && lt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return u && o && Lo(
    p,
    u.clone(p)
  ), p;
}
function Wr(e) {
  const t = lt(e);
  return M(e.children) && (t.children = e.children.map(Wr)), t;
}
function Gr(e = " ", t = 0) {
  return Oe(rn, null, e, t);
}
function He(e = "", t = !1) {
  return t ? (Q(), Rn(Ne, null, e)) : Oe(Ne, null, e);
}
function we(e) {
  return e == null || typeof e == "boolean" ? Oe(Ne) : M(e) ? Oe(
    Ee,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Wn(e) ? nt(e) : Oe(rn, null, String(e));
}
function nt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : lt(e);
}
function Bo(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (M(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Bo(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !Tr(t) ? t._ctx = ye : s === 3 && ye && (ye.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else $(t) ? (t = { default: t, _ctx: ye }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [Gr(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Oc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const s in o)
      if (s === "class")
        t.class !== o.class && (t.class = Fn([t.class, o.class]));
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
  return process.env.NODE_ENV !== "production" ? r.ctx = Rl(r) : r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = dc.bind(null, r), e.ce && e.ce(r), r;
}
let re = null;
const Zr = () => re || ye;
let An, yo;
{
  const e = tn(), t = (n, o) => {
    let s;
    return (s = e[n]) || (s = e[n] = []), s.push(o), (r) => {
      s.length > 1 ? s.forEach((i) => i(r)) : s[0](r);
    };
  };
  An = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => re = n
  ), yo = t(
    "__VUE_SSR_SETTERS__",
    (n) => Xt = n
  );
}
const ln = (e) => {
  const t = re;
  return An(e), e.scope.on(), () => {
    e.scope.off(), An(t);
  };
}, vs = () => {
  re && re.scope.off(), An(null);
}, Vc = /* @__PURE__ */ ze("slot,component");
function bo(e, { isNativeTag: t }) {
  (Vc(e) || t(e)) && O(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function qr(e) {
  return e.vnode.shapeFlag & 4;
}
let Xt = !1;
function Sc(e, t = !1, n = !1) {
  t && yo(t);
  const { props: o, children: s } = e.vnode, r = qr(e);
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
        Er(r[i]);
    }
    o.compilerOptions && Tc() && O(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, xr), process.env.NODE_ENV !== "production" && Al(e);
  const { setup: s } = o;
  if (s) {
    Me();
    const r = e.setupContext = s.length > 1 ? $c(e) : null, i = ln(e), l = Ct(
      s,
      e,
      0,
      [
        process.env.NODE_ENV !== "production" ? Ue(e.props) : e.props,
        r
      ]
    ), u = wo(l);
    if ($e(), i(), (u || e.sp) && !Wt(e) && yr(e), u) {
      if (l.then(vs, vs), t)
        return l.then((d) => {
          ms(e, d, t);
        }).catch((d) => {
          on(d, e, 0);
        });
      if (e.asyncDep = l, process.env.NODE_ENV !== "production" && !e.suspense) {
        const d = (n = o.name) != null ? n : "Anonymous";
        O(
          `Component <${d}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      ms(e, l, t);
  } else
    Jr(e, t);
}
function ms(e, t, n) {
  $(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : W(t) ? (process.env.NODE_ENV !== "production" && Wn(t) && O(
    "setup() should not return VNodes directly - return a render function instead."
  ), process.env.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = lr(t), process.env.NODE_ENV !== "production" && Il(e)) : process.env.NODE_ENV !== "production" && t !== void 0 && O(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), Jr(e, n);
}
const Tc = () => !0;
function Jr(e, t, n) {
  const o = e.type;
  e.render || (e.render = o.render || ne);
  {
    const s = ln(e);
    Me();
    try {
      Ll(e);
    } finally {
      $e(), s();
    }
  }
  process.env.NODE_ENV !== "production" && !o.render && e.render === ne && !t && (o.template ? O(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
  ) : O("Component is missing template or render function: ", o));
}
const _s = process.env.NODE_ENV !== "production" ? {
  get(e, t) {
    return $n(), te(e, "get", ""), e[t];
  },
  set() {
    return O("setupContext.attrs is readonly."), !1;
  },
  deleteProperty() {
    return O("setupContext.attrs is readonly."), !1;
  }
} : {
  get(e, t) {
    return te(e, "get", ""), e[t];
  }
};
function Mc(e) {
  return new Proxy(e.slots, {
    get(t, n) {
      return te(e, "get", "$slots"), t[n];
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
        return n || (n = new Proxy(e.attrs, _s));
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
      attrs: new Proxy(e.attrs, _s),
      slots: e.slots,
      emit: e.emit,
      expose: t
    };
}
function Ko(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(lr(Bi(e.exposed)), {
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
const Rc = /(?:^|[-_])\w/g, Ac = (e) => e.replace(Rc, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Yr(e, t = !0) {
  return $(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Gn(e, t, n = !1) {
  let o = Yr(t);
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
  return o ? Ac(o) : n ? "App" : "Anonymous";
}
function zr(e) {
  return $(e) && "__vccOpts" in e;
}
const No = (e, t) => {
  const n = qi(e, t, Xt);
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
        Me();
        const g = a.value;
        return $e(), [
          "div",
          {},
          ["span", e, p(a)],
          "<",
          l(g),
          ">"
        ];
      } else {
        if (it(a))
          return [
            "div",
            {},
            ["span", e, pe(a) ? "ShallowReactive" : "Reactive"],
            "<",
            l(a),
            `>${Ke(a) ? " (readonly)" : ""}`
          ];
        if (Ke(a))
          return [
            "div",
            {},
            ["span", e, pe(a) ? "ShallowReadonly" : "Readonly"],
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
    a.type.props && a.props && g.push(i("props", A(a.props))), a.setupState !== K && g.push(i("setup", a.setupState)), a.data !== K && g.push(i("data", A(a.data)));
    const v = u(a, "computed");
    v && g.push(i("computed", v));
    const V = u(a, "inject");
    return V && g.push(i("injected", V)), g.push([
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
        ...Object.keys(g).map((v) => [
          "div",
          {},
          ["span", o, v + ": "],
          l(g[v], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function l(a, g = !0) {
    return typeof a == "number" ? ["span", t, a] : typeof a == "string" ? ["span", n, JSON.stringify(a)] : typeof a == "boolean" ? ["span", o, a] : W(a) ? ["object", { object: g ? A(a) : a }] : ["span", n, String(a)];
  }
  function u(a, g) {
    const v = a.type;
    if ($(v))
      return;
    const V = {};
    for (const D in a.ctx)
      d(v, D, g) && (V[D] = a.ctx[D]);
    return V;
  }
  function d(a, g, v) {
    const V = a[v];
    if (M(V) && V.includes(g) || W(V) && g in V || a.extends && d(a.extends, g, v) || a.mixins && a.mixins.some((D) => d(D, g, v)))
      return !0;
  }
  function p(a) {
    return pe(a) ? "ShallowRef" : a.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(s) : window.devtoolsFormatters = [s];
}
const Es = "3.5.22", Je = process.env.NODE_ENV !== "production" ? O : ne;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Oo;
const ys = typeof window < "u" && window.trustedTypes;
if (ys)
  try {
    Oo = /* @__PURE__ */ ys.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch (e) {
    process.env.NODE_ENV !== "production" && Je(`Error creating trusted types policy: ${e}`);
  }
const Xr = Oo ? (e) => Oo.createHTML(e) : (e) => e, Pc = "http://www.w3.org/2000/svg", Lc = "http://www.w3.org/1998/Math/MathML", Ze = typeof document < "u" ? document : null, bs = Ze && /* @__PURE__ */ Ze.createElement("template"), Fc = {
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
      bs.innerHTML = Xr(
        o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e
      );
      const l = bs.content;
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
const Ns = Symbol("_vod"), kc = Symbol("_vsh"), Uc = Symbol(process.env.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : ""), Bc = /(?:^|;)\s*display\s*:/;
function Kc(e, t, n) {
  const o = e.style, s = z(n);
  let r = !1;
  if (n && !s) {
    if (t)
      if (z(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && yn(o, l, "");
        }
      else
        for (const i in t)
          n[i] == null && yn(o, i, "");
    for (const i in n)
      i === "display" && (r = !0), yn(o, i, n[i]);
  } else if (s) {
    if (t !== n) {
      const i = o[Uc];
      i && (n += ";" + i), o.cssText = n, r = Bc.test(n);
    }
  } else t && e.removeAttribute("style");
  Ns in e && (e[Ns] = r ? o.display : "", e[kc] && (o.display = "none"));
}
const Wc = /[^\\];\s*$/, Os = /\s*!important$/;
function yn(e, t, n) {
  if (M(n))
    n.forEach((o) => yn(e, t, o));
  else if (n == null && (n = ""), process.env.NODE_ENV !== "production" && Wc.test(n) && Je(
    `Unexpected semicolon at the end of '${t}' style value: '${n}'`
  ), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = Gc(e, t);
    Os.test(n) ? e.setProperty(
      Ye(o),
      n.replace(Os, ""),
      "important"
    ) : e[o] = n;
  }
}
const xs = ["Webkit", "Moz", "ms"], ro = {};
function Gc(e, t) {
  const n = ro[t];
  if (n)
    return n;
  let o = Se(t);
  if (o !== "filter" && o in e)
    return ro[t] = o;
  o = Ln(o);
  for (let s = 0; s < xs.length; s++) {
    const r = xs[s] + o;
    if (r in e)
      return ro[t] = r;
  }
  return t;
}
const ws = "http://www.w3.org/1999/xlink";
function Ds(e, t, n, o, s, r = bi(t)) {
  o && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(ws, t.slice(6, t.length)) : e.setAttributeNS(ws, t, n) : n == null || r && !ks(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : ct(n) ? String(n) : n
  );
}
function Vs(e, t, n, o, s) {
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
    l === "boolean" ? n = ks(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
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
function qc(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
const Ss = Symbol("_vei");
function Jc(e, t, n, o, s = null) {
  const r = e[Ss] || (e[Ss] = {}), i = r[t];
  if (o && i)
    i.value = process.env.NODE_ENV !== "production" ? Ts(o, t) : o;
  else {
    const [l, u] = Yc(t);
    if (o) {
      const d = r[t] = Qc(
        process.env.NODE_ENV !== "production" ? Ts(o, t) : o,
        s
      );
      Zc(e, l, d, u);
    } else i && (qc(e, l, i, u), r[t] = void 0);
  }
}
const Cs = /(?:Once|Passive|Capture)$/;
function Yc(e) {
  let t;
  if (Cs.test(e)) {
    t = {};
    let o;
    for (; o = e.match(Cs); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Ye(e.slice(2)), t];
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
function Ts(e, t) {
  return $(e) || M(e) ? e : (Je(
    `Wrong type passed as event handler to ${t} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof e}.`
  ), ne);
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
const Ms = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, tu = (e, t, n, o, s, r) => {
  const i = s === "svg";
  t === "class" ? Hc(e, o, i) : t === "style" ? Kc(e, n, o) : en(t) ? bn(t) || Jc(e, t, n, o, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : nu(e, t, o, i)) ? (Vs(e, t, o), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Ds(e, t, o, i, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !z(o)) ? Vs(e, Se(t), o, r, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), Ds(e, t, o, i));
};
function nu(e, t, n, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Ms(t) && $(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
      return !1;
  }
  return Ms(t) && z(n) ? !1 : t in e;
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
}, ot = (e, t) => {
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
}, $s = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), o = t.join(".");
  return n[o] || (n[o] = ((s) => {
    if (!("key" in s))
      return;
    const r = Ye(s.key);
    if (t.some(
      (i) => i === r || ru[i] === r
    ))
      return e(s);
  }));
}, iu = /* @__PURE__ */ ee({ patchProp: tu }, Fc);
let Rs;
function lu() {
  return Rs || (Rs = rc(iu));
}
const cu = ((...e) => {
  const t = lu().createApp(...e);
  process.env.NODE_ENV !== "production" && (fu(t), au(t));
  const { mount: n } = t;
  return t.mount = (o) => {
    const s = pu(o);
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
function pu(e) {
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
function du() {
  Ic();
}
process.env.NODE_ENV !== "production" && du();
const hu = { controls: "" }, gu = ["src"], vu = /* @__PURE__ */ Tt({
  __name: "ChatEntryAudio",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => (Q(), le("audio", hu, [
      Ve("source", {
        src: t.entry.audioUrl
      }, null, 8, gu)
    ]));
  }
}), cn = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, s] of t)
    n[o] = s;
  return n;
}, Qr = /* @__PURE__ */ cn(vu, [["__scopeId", "data-v-8c103ecb"]]), mu = /* @__PURE__ */ Tt({
  __name: "ChatEntryText",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => Bs(t.entry);
  }
});
function Qt(e) {
  const t = {};
  if (!e)
    return t;
  let n = null, o = null, s = null, r = null;
  if (Object.keys(e).forEach((i) => {
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
const ei = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M4%206H20M16%206L15.7294%205.18807C15.4671%204.40125%2015.3359%204.00784%2015.0927%203.71698C14.8779%203.46013%2014.6021%203.26132%2014.2905%203.13878C13.9376%203%2013.523%203%2012.6936%203H11.3064C10.477%203%2010.0624%203%209.70951%203.13878C9.39792%203.26132%209.12208%203.46013%208.90729%203.71698C8.66405%204.00784%208.53292%204.40125%208.27064%205.18807L8%206M18%206V16.2C18%2017.8802%2018%2018.7202%2017.673%2019.362C17.3854%2019.9265%2016.9265%2020.3854%2016.362%2020.673C15.7202%2021%2014.8802%2021%2013.2%2021H10.8C9.11984%2021%208.27976%2021%207.63803%2020.673C7.07354%2020.3854%206.6146%2019.9265%206.32698%2019.362C6%2018.7202%206%2017.8802%206%2016.2V6M14%2010V17M10%2010V17'%20stroke='%23000000'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e", ti = Symbol("GlobalJsonConfig"), _u = {
  install(e, t) {
    e.provide(ti, t);
  }
};
function Zn() {
  const e = Gt(ti);
  if (!e)
    throw new Error("Plugin GlobalJsonConfig not found.");
  return e;
}
const Eu = {
  key: 0,
  class: "deleting"
}, yu = { class: "button" }, bu = ["src"], Nu = 3510, Ou = /* @__PURE__ */ Tt({
  __name: "ChatEntry",
  props: {
    entry: {}
  },
  emits: ["updateEntryValue"],
  setup(e, { emit: t }) {
    const n = Zn(), o = me(null), s = {
      ...Qt(n.entryStyle),
      marginTop: `${n.listGap}px`
    }, r = me(s), l = me(e.entry), u = t, d = (v) => {
      l.value.status = v, u("updateEntryValue", l.value);
    };
    let p = null;
    const a = () => {
      d("deleting");
      const v = o.value;
      v.scrollIntoView({ behavior: "smooth", block: "nearest" });
      const V = `${v.getBoundingClientRect().height}px`;
      r.value = {
        minHeight: V,
        maxHeight: V,
        height: V,
        marginTop: `${n.listGap}px`,
        ...Qt(n.deletingStyle || n.entryStyle)
      }, v.classList.add("deleted");
      const D = {
        event: "ENTRY_DELETING",
        id: l.value.id,
        type: l.value.type
      };
      l.value.type === "text" && (D.text = l.value.entry), p = setTimeout(() => {
        d("deleted"), r.value = s, D.event = "ENTRY_DELETED", n.fsm?.logEvent(D);
      }, Nu), n.fsm?.logEvent(D);
    }, g = () => {
      if (p) {
        clearTimeout(p), p = null, d("active"), o.value.classList.remove("deleted"), r.value = s;
        const v = {
          event: "ENTRY_DELETE_CANCEL",
          id: l.value.id,
          type: l.value.type
        };
        l.value.type === "text" && (v.text = l.value.entry), n.fsm?.logEvent(v);
      }
    };
    return (v, V) => (Q(), le("div", {
      ref_key: "entryDiv",
      ref: o,
      class: "entry",
      style: nn(r.value)
    }, [
      e.entry.status === "deleting" ? (Q(), le("div", Eu, [
        V[0] || (V[0] = Gr(" Eintrag Gelöscht. ", -1)),
        Ve("a", {
          href: "#",
          onClick: ot(g, ["prevent"])
        }, "Rückgängig machen")
      ])) : e.entry.status !== "deleted" ? (Q(), le(Ee, { key: 1 }, [
        l.value.type === "text" ? (Q(), Rn(mu, {
          key: 0,
          entry: l.value.entry
        }, null, 8, ["entry"])) : l.value.type === "audio" ? (Q(), Rn(Qr, {
          key: 1,
          entry: l.value.entry
        }, null, 8, ["entry"])) : He("", !0),
        Ve("div", yu, [
          Ve("img", {
            src: dt(ei),
            onClick: ot(a, ["prevent"])
          }, null, 8, bu)
        ])
      ], 64)) : He("", !0)
    ], 4));
  }
}), xu = /* @__PURE__ */ cn(Ou, [["__scopeId", "data-v-8e1990d0"]]), wu = /* @__PURE__ */ Tt({
  __name: "ChatList",
  props: {
    list: {}
  },
  emits: ["updateEntryValue"],
  setup(e, { emit: t }) {
    const n = Zn(), o = {
      ...Qt(n.listStyle),
      padding: `0 ${n.listGap}px ${n.listGap}px ${n.listGap}px`
    };
    n.listHeight && n.listHeight > 0 && (o.height = `${n.listHeight}px`);
    const s = e, r = t, i = (l) => {
      r("updateEntryValue", l);
    };
    return (l, u) => (Q(), le("div", {
      class: "chat-list",
      style: o
    }, [
      (Q(!0), le(Ee, null, $l(s.list, (d) => (Q(), le(Ee, {
        key: d.id
      }, [
        d.status != "deleted" ? (Q(), Rn(xu, {
          key: 0,
          entry: d,
          onUpdateEntryValue: i
        }, null, 8, ["entry"])) : He("", !0)
      ], 64))), 128))
    ]));
  }
}), Du = /* @__PURE__ */ cn(wu, [["__scopeId", "data-v-16e11011"]]), ni = "__IB_ExtRes_MicroAllowed_stat";
let St = null;
function Vu() {
  return navigator.mediaDevices?.getUserMedia ? St = sessionStorage.getItem(ni) ?? "prompt" : St = "not-supported", St;
}
function As(e) {
  St = e, sessionStorage.setItem(ni, e);
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
      St !== i && As(i), e(r);
    }, o = () => {
      const r = "denied";
      St !== r && As(r), t();
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
const Is = (e, t) => e ? { [t]: e } : {};
function $u(e, t = void 0, n = void 0, o = 32e3, s = Su()) {
  const r = new MediaRecorder(e, {
    audioBitsPerSecond: o,
    ...Is(s, "mimeType")
  });
  if (!r)
    return r;
  const i = [], l = (d) => {
    i.push(d.data);
  }, u = () => {
    e.getTracks().forEach((p) => p.stop());
    const d = new Blob(i, Is(s, "type"));
    if (t) {
      const p = URL.createObjectURL(d);
      t(p);
    }
    n && Mu(d).then((p) => {
      p && typeof p == "string" && n(p);
    });
  };
  return r.addEventListener("dataavailable", l), r.addEventListener("stop", u), r.start(), r;
}
function Ps(e) {
  e?.stop();
}
const Ru = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M19%2010V12C19%2015.866%2015.866%2019%2012%2019M5%2010V12C5%2015.866%208.13401%2019%2012%2019M12%2019V22M8%2022H16M12%2015C10.3431%2015%209%2013.6569%209%2012V5C9%203.34315%2010.3431%202%2012%202C13.6569%202%2015%203.34315%2015%205V12C15%2013.6569%2013.6569%2015%2012%2015Z'%20stroke='%23000000'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e", Au = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%20-0.5%2025%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M19.1168%2012.1484C19.474%2012.3581%2019.9336%2012.2384%2020.1432%2011.8811C20.3528%2011.5238%2020.2331%2011.0643%2019.8758%2010.8547L19.1168%2012.1484ZM6.94331%204.13656L6.55624%204.77902L6.56378%204.78344L6.94331%204.13656ZM5.92408%204.1598L5.50816%203.5357L5.50816%203.5357L5.92408%204.1598ZM5.51031%205.09156L4.76841%205.20151C4.77575%205.25101%204.78802%205.29965%204.80505%205.34671L5.51031%205.09156ZM7.12405%2011.7567C7.26496%2012.1462%207.69495%2012.3477%208.08446%2012.2068C8.47397%2012.0659%208.67549%2011.6359%208.53458%2011.2464L7.12405%2011.7567ZM19.8758%2012.1484C20.2331%2011.9388%2020.3528%2011.4793%2020.1432%2011.122C19.9336%2010.7648%2019.474%2010.6451%2019.1168%2010.8547L19.8758%2012.1484ZM6.94331%2018.8666L6.56375%2018.2196L6.55627%2018.2241L6.94331%2018.8666ZM5.92408%2018.8433L5.50815%2019.4674H5.50815L5.92408%2018.8433ZM5.51031%2017.9116L4.80505%2017.6564C4.78802%2017.7035%204.77575%2017.7521%204.76841%2017.8016L5.51031%2017.9116ZM8.53458%2011.7567C8.67549%2011.3672%208.47397%2010.9372%208.08446%2010.7963C7.69495%2010.6554%207.26496%2010.8569%207.12405%2011.2464L8.53458%2011.7567ZM19.4963%2012.2516C19.9105%2012.2516%2020.2463%2011.9158%2020.2463%2011.5016C20.2463%2011.0873%2019.9105%2010.7516%2019.4963%2010.7516V12.2516ZM7.82931%2010.7516C7.4151%2010.7516%207.07931%2011.0873%207.07931%2011.5016C7.07931%2011.9158%207.4151%2012.2516%207.82931%2012.2516V10.7516ZM19.8758%2010.8547L7.32284%203.48968L6.56378%204.78344L19.1168%2012.1484L19.8758%2010.8547ZM7.33035%203.49414C6.76609%203.15419%206.05633%203.17038%205.50816%203.5357L6.34%204.78391C6.40506%204.74055%206.4893%204.73863%206.55627%204.77898L7.33035%203.49414ZM5.50816%203.5357C4.95998%203.90102%204.67184%204.54987%204.76841%205.20151L6.25221%204.98161C6.24075%204.90427%206.27494%204.82727%206.34%204.78391L5.50816%203.5357ZM4.80505%205.34671L7.12405%2011.7567L8.53458%2011.2464L6.21558%204.83641L4.80505%205.34671ZM19.1168%2010.8547L6.56378%2018.2197L7.32284%2019.5134L19.8758%2012.1484L19.1168%2010.8547ZM6.55627%2018.2241C6.4893%2018.2645%206.40506%2018.2626%206.34%2018.2192L5.50815%2019.4674C6.05633%2019.8327%206.76609%2019.8489%207.33035%2019.509L6.55627%2018.2241ZM6.34%2018.2192C6.27494%2018.1759%206.24075%2018.0988%206.25221%2018.0215L4.76841%2017.8016C4.67184%2018.4532%204.95998%2019.1021%205.50815%2019.4674L6.34%2018.2192ZM6.21558%2018.1667L8.53458%2011.7567L7.12405%2011.2464L4.80505%2017.6564L6.21558%2018.1667ZM19.4963%2010.7516H7.82931V12.2516H19.4963V10.7516Z'%20fill='%23000000'/%3e%3c/svg%3e", Iu = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20fill='%23dc143c'%20height='800px'%20width='800px'%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%20512%20512'%20enable-background='new%200%200%20512%20512'%20xml:space='preserve'%3e%3cpath%20d='M465.5,0H46.5C20.9,0,0,20.9,0,46.5v418.9C0,491.1,20.9,512,46.5,512h418.9c25.7,0,46.5-20.9,46.5-46.5V46.5%20C512,20.9,491.1,0,465.5,0z'/%3e%3c/svg%3e", Pu = ["value", "placeholder", "rows", "onKeydown"], Lu = {
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
    const n = Zn(), o = Qt(n.inputStyle), s = Qt(n.inputStyleTextinput || n.inputStyle), r = me(null), i = me({}), l = me(!1), u = No(() => l.value ? {
      ...s,
      ...i.value
    } : {
      ...o,
      ...i.value
    }), d = me(!0), p = No(() => d.value ? n.inputPlaceholder : void 0), a = me(null);
    Nr(() => {
      a.value.focus();
    });
    const g = me({
      id: null,
      type: "text",
      entry: "Nochn Eintrag",
      status: "active"
    }), v = me("none");
    Vt(v, (J) => {
      switch (J) {
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
    const V = me(""), D = (J) => {
      const Y = J.target.value;
      V.value = Y, Y.length === 0 ? v.value !== "none" && (v.value = "none") : v.value !== "texting" && (v.value = "texting"), d.value && (d.value = !1);
    }, Z = me({
      base64: "",
      audioUrl: ""
    });
    let k;
    const I = me(Vu());
    Vt(I, (J) => {
      switch (J) {
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
    const L = () => {
      k || I.value === "not-supported" || I.value === "denied" || (Cu().then((J) => {
        I.value = "allowed", k = $u(
          J,
          (Y) => Z.value.audioUrl = Y,
          (Y) => Z.value.base64 = Y
        ), v.value = "recording";
      }).catch(() => {
        I.value = "denied", q();
      }), i.value.height || (i.value.height = r.value.getBoundingClientRect().height + "px"));
    }, ce = () => {
      k ? (Ps(k), k = void 0, v.value = "recording_ack") : q();
    }, S = t, q = () => {
      k && (Ps(k), k = void 0), V.value = "", v.value = "none", fr(() => a.value.focus());
    }, ie = () => {
      if (v.value === "texting")
        g.value.type = "text", g.value.entry = V.value;
      else {
        if (!Z.value.base64)
          return;
        g.value.type = "audio", g.value.entry = Z.value;
      }
      S("addEntry", g.value), q();
    }, oe = () => {
      q();
    };
    return (J, Y) => (Q(), le("div", {
      class: "outer",
      style: nn(u.value),
      ref_key: "outerDiv",
      ref: r
    }, [
      v.value === "none" || v.value === "texting" ? (Q(), le("textarea", {
        key: 0,
        ref_key: "textareaRef",
        ref: a,
        value: V.value,
        onInput: D,
        placeholder: p.value,
        rows: dt(n).inputRows || 2,
        onKeydown: [
          $s(ot(ie, ["ctrl", "prevent"]), ["enter"]),
          $s(ot(ie, ["meta", "prevent"]), ["enter"])
        ],
        onFocus: Y[0] || (Y[0] = (Re) => l.value = !0),
        onBlur: Y[1] || (Y[1] = (Re) => l.value = !1)
      }, null, 40, Pu)) : He("", !0),
      v.value === "recording" ? (Q(), le("div", Lu, [...Y[2] || (Y[2] = [
        Ve("div", null, "Aufnahme läuft", -1)
      ])])) : He("", !0),
      v.value === "recording_ack" ? (Q(), le("div", Fu, [
        Oe(Qr, {
          entry: Z.value,
          style: { width: "100%" }
        }, null, 8, ["entry"])
      ])) : He("", !0),
      v.value == "texting" || v.value == "recording_ack" ? (Q(), le("div", ju, [
        Ve("img", {
          src: dt(ei),
          onClick: ot(oe, ["prevent"])
        }, null, 8, Hu)
      ])) : He("", !0),
      v.value === "texting" || v.value === "recording_ack" ? (Q(), le("div", ku, [
        Ve("img", {
          src: dt(Au),
          onClick: ot(ie, ["prevent"])
        }, null, 8, Uu)
      ])) : He("", !0),
      v.value === "none" ? (Q(), le("div", Bu, [
        Ve("img", {
          src: dt(Ru),
          class: Fn({ striked: I.value === "not-supported" }),
          onClick: ot(L, ["prevent"])
        }, null, 10, Ku)
      ])) : He("", !0),
      v.value === "recording" ? (Q(), le("div", Wu, [
        Ve("img", {
          src: dt(Iu),
          onClick: ot(ce, ["prevent"])
        }, null, 8, Gu)
      ])) : He("", !0)
    ], 4));
  }
}), qu = /* @__PURE__ */ cn(Zu, [["__scopeId", "data-v-fc33d01f"]]), Ju = /* @__PURE__ */ Tt({
  __name: "App",
  setup(e, { expose: t }) {
    const n = Zn(), o = me([]);
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
    return (i, l) => (Q(), le("div", null, [
      Oe(Du, {
        class: "list",
        list: o.value,
        onUpdateEntryValue: s
      }, null, 8, ["list"]),
      Oe(qu, { onAddEntry: r })
    ]));
  }
}), Yu = /* @__PURE__ */ cn(Ju, [["__scopeId", "data-v-f4907ab0"]]);
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
      microfinEvent: t
    }),
    logAndTriggerEvent(t) {
      e.fsm.logEvent(t), e.fsm.triggerEvent(`EV_${t}`);
    }
  });
}
function Xu(e) {
  const t = {}, n = it(e) ? A(e) : e;
  for (const o in n)
    if (Object.prototype.hasOwnProperty.call(n, o)) {
      const s = n[o];
      X(s) ? t[o] = s.value : t[o] = s;
    }
  return t;
}
const ef = (e, t, n) => {
  zu(t);
  const o = cu(Yu);
  o.use(_u, t);
  const r = o.mount(e);
  n && Vt(
    () => Xu(r),
    () => {
      n(r);
    },
    {
      deep: !0,
      // Überwacht auch Änderungen an verschachtelten Properties
      immediate: !0
      // Optional: Ruft das Callback sofort beim Mount auf
    }
  );
};
export {
  ef as initializeAndMount
};
