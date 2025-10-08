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
}, Fs = () => !1, en = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Nn = (e) => e.startsWith("onUpdate:"), ee = Object.assign, xo = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, ri = Object.prototype.hasOwnProperty, H = (e, t) => ri.call(e, t), M = Array.isArray, ht = (e) => Pn(e) === "[object Map]", js = (e) => Pn(e) === "[object Set]", $ = (e) => typeof e == "function", z = (e) => typeof e == "string", ct = (e) => typeof e == "symbol", W = (e) => e !== null && typeof e == "object", wo = (e) => (W(e) || $(e)) && $(e.then) && $(e.catch), Hs = Object.prototype.toString, Pn = (e) => Hs.call(e), Do = (e) => Pn(e).slice(8, -1), ks = (e) => Pn(e) === "[object Object]", Vo = (e) => z(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, kt = /* @__PURE__ */ ze(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ii = /* @__PURE__ */ ze(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), Ln = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, li = /-\w/g, Se = Ln(
  (e) => e.replace(li, (t) => t.slice(1).toUpperCase())
), ci = /\B([A-Z])/g, Je = Ln(
  (e) => e.replace(ci, "-$1").toLowerCase()
), Fn = Ln((e) => e.charAt(0).toUpperCase() + e.slice(1)), at = Ln(
  (e) => e ? `on${Fn(e)}` : ""
), rt = (e, t) => !Object.is(e, t), It = (e, ...t) => {
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
let zo;
const tn = () => zo || (zo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function nn(e) {
  if (M(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], s = z(o) ? pi(o) : nn(o);
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
function jn(e) {
  let t = "";
  if (z(e))
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
function Us(e) {
  return !!e || e === "";
}
const Bs = (e) => !!(e && e.__v_isRef === !0), Ks = (e) => z(e) ? e : e == null ? "" : M(e) || W(e) && (e.toString === Hs || !$(e.toString)) ? Bs(e) ? Ks(e.value) : JSON.stringify(e, Ws, 2) : String(e), Ws = (e, t) => Bs(t) ? Ws(e, t.value) : ht(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [o, s], r) => (n[zn(o, r) + " =>"] = s, n),
    {}
  )
} : js(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => zn(n))
} : ct(t) ? zn(t) : W(t) && !M(t) && !ks(t) ? String(t) : t, zn = (e, t = "") => {
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
let me;
class Ni {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = me, !t && me && (this.index = (me.scopes || (me.scopes = [])).push(
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
      const n = me;
      try {
        return me = this, t();
      } finally {
        me = n;
      }
    } else process.env.NODE_ENV !== "production" && Te("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = me, me = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (me = this.prevScope, this.prevScope = void 0);
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
  return me;
}
let U;
const Xn = /* @__PURE__ */ new WeakSet();
class Gs {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, me && me.active && me.effects.push(this);
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
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ys(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Xo(this), qs(this);
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
      this.deps = this.depsTail = void 0, Xo(this), this.onStop && this.onStop(), this.flags &= -2;
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
let Zs = 0, Ut, Bt;
function Ys(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Bt, Bt = e;
    return;
  }
  e.next = Ut, Ut = e;
}
function So() {
  Zs++;
}
function Co() {
  if (--Zs > 0)
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
    if (t.dep.version !== t.version || t.dep.computed && (zs(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function zs(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Yt) || (e.globalVersion = Yt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !lo(e))))
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
const Xs = [];
function Me() {
  Xs.push(Ce), Ce = !1;
}
function $e() {
  const e = Xs.pop();
  Ce = e === void 0 ? !0 : e;
}
function Xo(e) {
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
    if (!U || !Ce || U === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== U)
      n = this.activeLink = new wi(U, this), U.deps ? (n.prevDep = U.depsTail, U.depsTail.nextDep = n, U.depsTail = n) : U.deps = U.depsTail = n, Qs(n);
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
    this.version++, Yt++, this.notify(t);
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
function Qs(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let o = t.deps; o; o = o.nextDep)
        Qs(o);
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
        (g === "length" || g === qt || !ct(g) && g >= d) && l(a);
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
function yt(e) {
  const t = R(e);
  return t === e ? t : (te(t, "iterate", qt), pe(e) ? t : t.map(se));
}
function Hn(e) {
  return te(e = R(e), "iterate", qt), e;
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
    return Qo(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Qo(this, "reduceRight", e, t);
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
  const o = Hn(e), s = o[t]();
  return o !== e && !pe(e) && (s._next = s.next, s.next = () => {
    const r = s._next();
    return r.done || (r.value = n(r.value)), r;
  }), s;
}
const Vi = Array.prototype;
function Ge(e, t, n, o, s, r) {
  const i = Hn(e), l = i !== e && !pe(e), u = i[t];
  if (u !== Vi[t]) {
    const a = u.apply(e, r);
    return l ? se(a) : a;
  }
  let p = n;
  i !== e && (l ? p = function(a, g) {
    return n.call(this, se(a), g, e);
  } : n.length > 2 && (p = function(a, g) {
    return n.call(this, a, g, e);
  }));
  const d = u.call(i, p, o);
  return l && s ? s(d) : d;
}
function Qo(e, t, n, o) {
  const s = Hn(e);
  let r = n;
  return s !== e && (pe(e) ? n.length > 3 && (r = function(i, l, u) {
    return n.call(this, i, l, u, e);
  }) : r = function(i, l, u) {
    return n.call(this, i, se(l), u, e);
  }), s[t](r, ...o);
}
function eo(e, t, n) {
  const o = R(e);
  te(o, "iterate", qt);
  const s = o[t](...n);
  return (s === -1 || s === !1) && xn(n[0]) ? (n[0] = R(n[0]), o[t](...n)) : s;
}
function Pt(e, t, n = []) {
  Me(), So();
  const o = R(e)[t].apply(e, n);
  return Co(), $e(), o;
}
const Si = /* @__PURE__ */ ze("__proto__,__v_isRef,__isVue"), er = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ct)
);
function Ci(e) {
  ct(e) || (e = String(e));
  const t = R(this);
  return te(t, "has", e), t.hasOwnProperty(e);
}
class tr {
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
      return o === (s ? r ? lr : ir : r ? rr : sr).get(t) || // receiver is not the reactive proxy, but has the same prototype
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
    if ((ct(n) ? er.has(n) : Si(n)) || (s || te(t, "get", n), r))
      return l;
    if (X(l)) {
      const u = i && Vo(n) ? l : l.value;
      return s && W(u) ? ao(u) : u;
    }
    return W(l) ? s ? ao(l) : $o(l) : l;
  }
}
class nr extends tr {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, o, s) {
    let r = t[n];
    if (!this._isShallow) {
      const u = Ke(r);
      if (!pe(o) && !Ke(o) && (r = R(r), o = R(o)), !M(t) && X(r) && !X(o))
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
    return t === R(s) && (i ? rt(o, r) && ke(t, "set", n, o, r) : ke(t, "add", n, o)), l;
  }
  deleteProperty(t, n) {
    const o = H(t, n), s = t[n], r = Reflect.deleteProperty(t, n);
    return r && o && ke(t, "delete", n, void 0, s), r;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!ct(n) || !er.has(n)) && te(t, "has", n), o;
  }
  ownKeys(t) {
    return te(
      t,
      "iterate",
      M(t) ? "length" : gt
    ), Reflect.ownKeys(t);
  }
}
class or extends tr {
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
const Ti = /* @__PURE__ */ new nr(), Mi = /* @__PURE__ */ new or(), $i = /* @__PURE__ */ new nr(!0), Ai = /* @__PURE__ */ new or(!0), fo = (e) => e, dn = (e) => Reflect.getPrototypeOf(e);
function Ri(e, t, n) {
  return function(...o) {
    const s = this.__v_raw, r = R(s), i = ht(r), l = e === "entries" || e === Symbol.iterator && i, u = e === "keys" && i, p = s[e](...o), d = n ? fo : t ? wn : se;
    return !t && te(
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
      Te(
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
      e || (rt(s, l) && te(i, "get", s), te(i, "get", l));
      const { has: u } = dn(i), p = t ? fo : e ? wn : se;
      if (u.call(i, s))
        return p(r.get(s));
      if (u.call(i, l))
        return p(r.get(l));
      r !== i && r.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !e && te(R(s), "iterate", gt), s.size;
    },
    has(s) {
      const r = this.__v_raw, i = R(r), l = R(s);
      return e || (rt(s, l) && te(i, "has", s), te(i, "has", l)), s === l ? r.has(s) : r.has(s) || r.has(l);
    },
    forEach(s, r) {
      const i = this, l = i.__v_raw, u = R(l), p = t ? fo : e ? wn : se;
      return !e && te(u, "iterate", gt), l.forEach((d, a) => s.call(r, p(d), p(a), i));
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
        !t && !pe(s) && !Ke(s) && (s = R(s));
        const r = R(this);
        return dn(r).has.call(r, s) || (r.add(s), ke(r, "add", s, s)), this;
      },
      set(s, r) {
        !t && !pe(r) && !Ke(r) && (r = R(r));
        const i = R(this), { has: l, get: u } = dn(i);
        let p = l.call(i, s);
        p ? process.env.NODE_ENV !== "production" && es(i, l, s) : (s = R(s), p = l.call(i, s));
        const d = u.call(i, s);
        return i.set(s, r), p ? rt(r, d) && ke(i, "set", s, r, d) : ke(i, "add", s, r), this;
      },
      delete(s) {
        const r = R(this), { has: i, get: l } = dn(r);
        let u = i.call(r, s);
        u ? process.env.NODE_ENV !== "production" && es(r, i, s) : (s = R(s), u = i.call(r, s));
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
function es(e, t, n) {
  const o = R(n);
  if (o !== n && t.call(e, o)) {
    const s = Do(e);
    Te(
      `Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const sr = /* @__PURE__ */ new WeakMap(), rr = /* @__PURE__ */ new WeakMap(), ir = /* @__PURE__ */ new WeakMap(), lr = /* @__PURE__ */ new WeakMap();
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
    sr
  );
}
function Ui(e) {
  return Un(
    e,
    !1,
    $i,
    Li,
    rr
  );
}
function ao(e) {
  return Un(
    e,
    !0,
    Mi,
    Fi,
    ir
  );
}
function Ue(e) {
  return Un(
    e,
    !0,
    Ai,
    ji,
    lr
  );
}
function Un(e, t, n, o, s) {
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
const se = (e) => W(e) ? $o(e) : e, wn = (e) => W(e) ? ao(e) : e;
function X(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function ae(e) {
  return Ki(e, !1);
}
function Ki(e, t) {
  return X(e) ? e : new Wi(e, t);
}
class Wi {
  constructor(t, n) {
    this.dep = new Mo(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : R(t), this._value = n ? t : se(t), this.__v_isShallow = n;
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
    t = o ? t : R(t), rt(t, n) && (this._rawValue = t, this._value = o ? t : se(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }) : this.dep.trigger());
  }
}
function pt(e) {
  return X(e) ? e.value : e;
}
const Gi = {
  get: (e, t, n) => t === "__v_raw" ? e : pt(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const s = e[t];
    return X(s) && !X(n) ? (s.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function cr(e) {
  return it(e) ? e : new Proxy(e, Gi);
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
      return Ys(this, !0), !0;
    process.env.NODE_ENV;
  }
  get value() {
    const t = process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track();
    return zs(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter ? this.setter(t) : process.env.NODE_ENV !== "production" && Te("Write operation failed: computed value is readonly");
  }
}
function Yi(e, t, n = !1) {
  let o, s;
  $(e) ? o = e : (o = e.get, s = e.set);
  const r = new Zi(o, s, n);
  return process.env.NODE_ENV, r;
}
const hn = {}, Dn = /* @__PURE__ */ new WeakMap();
let dt;
function qi(e, t = !1, n = dt) {
  if (n) {
    let o = Dn.get(n);
    o || Dn.set(n, o = []), o.push(e);
  } else process.env.NODE_ENV !== "production" && !t && Te(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function Ji(e, t, n = K) {
  const { immediate: o, deep: s, once: r, scheduler: i, augmentJob: l, call: u } = n, p = (S) => {
    (n.onWarn || Te)(
      "Invalid watch source: ",
      S,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, d = (S) => s ? S : pe(S) || s === !1 || s === 0 ? st(S, 1) : st(S);
  let a, g, v, V, D = !1, Z = !1;
  if (X(e) ? (g = () => e.value, D = pe(e)) : it(e) ? (g = () => d(e), D = !0) : M(e) ? (Z = !0, D = e.some((S) => it(S) || pe(S)), g = () => e.map((S) => {
    if (X(S))
      return S.value;
    if (it(S))
      return d(S);
    if ($(S))
      return u ? u(S, 2) : S();
    process.env.NODE_ENV !== "production" && p(S);
  })) : $(e) ? t ? g = u ? () => u(e, 2) : e : g = () => {
    if (v) {
      Me();
      try {
        v();
      } finally {
        $e();
      }
    }
    const S = dt;
    dt = a;
    try {
      return u ? u(e, 3, [V]) : e(V);
    } finally {
      dt = S;
    }
  } : (g = ne, process.env.NODE_ENV !== "production" && p(e)), t && s) {
    const S = g, Y = s === !0 ? 1 / 0 : s;
    g = () => st(S(), Y);
  }
  const k = Oi(), I = () => {
    a.stop(), k && k.active && xo(k.effects, a);
  };
  if (r && t) {
    const S = t;
    t = (...Y) => {
      S(...Y), I();
    };
  }
  let L = Z ? new Array(e.length).fill(hn) : hn;
  const ce = (S) => {
    if (!(!(a.flags & 1) || !a.dirty && !S))
      if (t) {
        const Y = a.run();
        if (s || D || (Z ? Y.some((ie, oe) => rt(ie, L[oe])) : rt(Y, L))) {
          v && v();
          const ie = dt;
          dt = a;
          try {
            const oe = [
              Y,
              // pass undefined as the old value when it's changed for the first time
              L === hn ? void 0 : Z && L[0] === hn ? [] : L,
              V
            ];
            L = Y, u ? u(t, 3, oe) : (
              // @ts-expect-error
              t(...oe)
            );
          } finally {
            dt = ie;
          }
        }
      } else
        a.run();
  };
  return l && l(ce), a = new Gs(g), a.scheduler = i ? () => i(ce, !1) : ce, V = (S) => qi(S, !1, a), v = a.onStop = () => {
    const S = Dn.get(a);
    if (S) {
      if (u)
        u(S, 4);
      else
        for (const Y of S) Y();
      Dn.delete(a);
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
  else if (js(e) || ht(e))
    e.forEach((o) => {
      st(o, t, n);
    });
  else if (ks(e)) {
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
function gn(e) {
  vt.push(e);
}
function vn() {
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
    t.push(...ur(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function ur(e, t, n) {
  return z(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : X(t) ? (t = ur(e, R(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : $(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = R(t), n ? t : [`${e}=`, t]);
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
      Me(), Ct(r, null, 10, [
        e,
        u,
        p
      ]), $e();
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
const de = [];
let je = -1;
const wt = [];
let tt = null, Ot = 0;
const fr = /* @__PURE__ */ Promise.resolve();
let Vn = null;
const nl = 100;
function ar(e) {
  const t = Vn || fr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ol(e) {
  let t = je + 1, n = de.length;
  for (; t < n; ) {
    const o = t + n >>> 1, s = de[o], r = Jt(s);
    r < e || r === e && s.flags & 2 ? t = o + 1 : n = o;
  }
  return t;
}
function Bn(e) {
  if (!(e.flags & 1)) {
    const t = Jt(e), n = de[de.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Jt(n) ? de.push(e) : de.splice(ol(t), 0, e), e.flags |= 1, dr();
  }
}
function dr() {
  Vn || (Vn = fr.then(gr));
}
function pr(e) {
  M(e) ? wt.push(...e) : tt && e.id === -1 ? tt.splice(Ot + 1, 0, e) : e.flags & 1 || (wt.push(e), e.flags |= 1), dr();
}
function ts(e, t, n = je + 1) {
  for (process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()); n < de.length; n++) {
    const o = de[n];
    if (o && o.flags & 2) {
      if (e && o.id !== e.uid || process.env.NODE_ENV !== "production" && Ro(t, o))
        continue;
      de.splice(n, 1), n--, o.flags & 4 && (o.flags &= -2), o(), o.flags & 4 || (o.flags &= -2);
    }
  }
}
function hr(e) {
  if (wt.length) {
    const t = [...new Set(wt)].sort(
      (n, o) => Jt(n) - Jt(o)
    );
    if (wt.length = 0, tt) {
      tt.push(...t);
      return;
    }
    for (tt = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), Ot = 0; Ot < tt.length; Ot++) {
      const n = tt[Ot];
      process.env.NODE_ENV !== "production" && Ro(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    tt = null, Ot = 0;
  }
}
const Jt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function gr(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => Ro(e, n) : ne;
  try {
    for (je = 0; je < de.length; je++) {
      const n = de[je];
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
    for (; je < de.length; je++) {
      const n = de[je];
      n && (n.flags &= -2);
    }
    je = -1, de.length = 0, hr(e), Vn = null, (de.length || wt.length) && gr(e);
  }
}
function Ro(e, t) {
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
const _t = /* @__PURE__ */ new Map();
function sl(e) {
  const t = e.type.__hmrId;
  let n = _t.get(t);
  n || (vr(t, e.type), n = _t.get(t)), n.instances.add(e);
}
function rl(e) {
  _t.get(e.type.__hmrId).instances.delete(e);
}
function vr(e, t) {
  return _t.has(e) ? !1 : (_t.set(e, {
    initialDef: Sn(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Sn(e) {
  return zr(e) ? e.__vccOpts : e;
}
function il(e, t) {
  const n = _t.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, Sn(o.type).render = t), o.renderCache = [], Be = !0, o.job.flags & 8 || o.update(), Be = !1;
  }));
}
function ll(e, t) {
  const n = _t.get(e);
  if (!n) return;
  t = Sn(t), ns(n.initialDef, t);
  const o = [...n.instances];
  for (let s = 0; s < o.length; s++) {
    const r = o[s], i = Sn(r.type);
    let l = mn.get(i);
    l || (i !== n.initialDef && ns(i, t), mn.set(i, l = /* @__PURE__ */ new Set())), l.add(r), r.appContext.propsCache.delete(r.type), r.appContext.emitsCache.delete(r.type), r.appContext.optionsCache.delete(r.type), r.ceReload ? (l.add(r), r.ceReload(t.styles), l.delete(r)) : r.parent ? Bn(() => {
      r.job.flags & 8 || (Be = !0, r.parent.update(), Be = !1, l.delete(r));
    }) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), r.root.ce && r !== r.root && r.root.ce._removeChildStyle(i);
  }
  pr(() => {
    mn.clear();
  });
}
function ns(e, t) {
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
    Static: En
  });
}
function ul(e) {
  sn("app:unmount", e);
}
const fl = /* @__PURE__ */ Po(
  "component:added"
  /* COMPONENT_ADDED */
), mr = /* @__PURE__ */ Po(
  "component:updated"
  /* COMPONENT_UPDATED */
), al = /* @__PURE__ */ Po(
  "component:removed"
  /* COMPONENT_REMOVED */
), dl = (e) => {
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
let ye = null, Er = null;
function Cn(e) {
  const t = ye;
  return ye = e, Er = e && e.type.__scopeId || null, t;
}
function vl(e, t = ye, n) {
  if (!t || e._n)
    return e;
  const o = (...s) => {
    o._d && vs(-1);
    const r = Cn(t);
    let i;
    try {
      i = e(...s);
    } finally {
      Cn(r), o._d && vs(1);
    }
    return process.env.NODE_ENV !== "production" && mr(t), i;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function yr(e) {
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
function br(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const os = /* @__PURE__ */ new WeakSet(), Tn = /* @__PURE__ */ new WeakMap();
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
  const r = o.shapeFlag & 4 ? Wo(o.component) : o.el, i = s ? null : r, { i: l, r: u } = e;
  if (process.env.NODE_ENV !== "production" && !l) {
    O(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const p = t && t.r, d = l.refs === K ? l.refs = {} : l.refs, a = l.setupState, g = R(a), v = a === K ? Fs : (D) => process.env.NODE_ENV !== "production" && (H(g, D) && !X(g[D]) && O(
    `Template ref "${D}" used on a non-ref value. It will not work in the production build.`
  ), os.has(g[D])) ? !1 : H(g, D), V = (D) => process.env.NODE_ENV === "production" || !os.has(D);
  if (p != null && p !== u) {
    if (ss(t), z(p))
      d[p] = null, v(p) && (a[p] = null);
    else if (X(p)) {
      V(p) && (p.value = null);
      const D = t;
      D.k && (d[D.k] = null);
    }
  }
  if ($(u))
    Ct(u, l, 12, [i, d]);
  else {
    const D = z(u), Z = X(u);
    if (D || Z) {
      const k = () => {
        if (e.f) {
          const I = D ? v(u) ? a[u] : d[u] : V(u) || !e.k ? u.value : d[e.k];
          if (s)
            M(I) && xo(I, r);
          else if (M(I))
            I.includes(r) || I.push(r);
          else if (D)
            d[u] = [r], v(u) && (a[u] = d[u]);
          else {
            const L = [r];
            V(u) && (u.value = L), e.k && (d[e.k] = L);
          }
        } else D ? (d[u] = i, v(u) && (a[u] = i)) : Z ? (V(u) && (u.value = i), e.k && (d[e.k] = i)) : process.env.NODE_ENV !== "production" && O("Invalid template ref type:", u, `(${typeof u})`);
      };
      if (i) {
        const I = () => {
          k(), Tn.delete(e);
        };
        I.id = -1, Tn.set(e, I), _e(I, n);
      } else
        ss(e), k();
    } else process.env.NODE_ENV !== "production" && O("Invalid template ref type:", u, `(${typeof u})`);
  }
}
function ss(e) {
  const t = Tn.get(e);
  t && (t.flags |= 8, Tn.delete(e));
}
tn().requestIdleCallback;
tn().cancelIdleCallback;
const Wt = (e) => !!e.type.__asyncLoader, Fo = (e) => e.type.__isKeepAlive;
function yl(e, t) {
  Nr(e, "a", t);
}
function bl(e, t) {
  Nr(e, "da", t);
}
function Nr(e, t, n = re) {
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
      Fo(s.parent.vnode) && Nl(o, t, n, s), s = s.parent;
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
function Kn(e, t, n = re, o = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...i) => {
      Me();
      const l = ln(n), u = We(t, n, e, i);
      return l(), $e(), u;
    });
    return o ? s.unshift(r) : s.push(r), r;
  } else if (process.env.NODE_ENV !== "production") {
    const s = at(Ao[e].replace(/ hook$/, ""));
    O(
      `${s} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const Xe = (e) => (t, n = re) => {
  (!Xt || e === "sp") && Kn(e, (...o) => t(...o), n);
}, Ol = Xe("bm"), jo = Xe("m"), xl = Xe(
  "bu"
), wl = Xe("u"), Dl = Xe(
  "bum"
), Or = Xe("um"), Vl = Xe(
  "sp"
), Sl = Xe("rtg"), Cl = Xe("rtc");
function Tl(e, t = re) {
  Kn("ec", e, t);
}
const Ml = Symbol.for("v-ndc");
function $l(e, t, n, o) {
  let s;
  const r = n, i = M(e);
  if (i || z(e)) {
    const l = i && it(e);
    let u = !1, p = !1;
    l && (u = !pe(e), p = Ke(e), e = Hn(e)), s = new Array(e.length);
    for (let d = 0, a = e.length; d < a; d++)
      s[d] = t(
        u ? p ? wn(se(e[d])) : se(e[d]) : e[d],
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
const ho = (e) => e ? Yr(e) ? Wo(e) : ho(e.parent) : null, mt = (
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
      Bn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = ar.bind(e.proxy)),
    $watch: (e) => ac.bind(e)
  })
), Ho = (e) => e === "_" || e === "$", oo = (e, t) => e !== K && !e.__isScriptSetup && H(e, t), xr = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: o, data: s, props: r, accessCache: i, type: l, appContext: u } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let p;
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
      return t === "$attrs" ? (te(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && An()) : process.env.NODE_ENV !== "production" && t === "$slots" && te(e, "get", t), d(e);
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
    t.indexOf("__v") !== 0) && (s !== K && Ho(t[0]) && H(s, t) ? O(
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
      set: ne
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
      set: ne
    });
  });
}
function Il(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(R(n)).forEach((o) => {
    if (!n.__isScriptSetup) {
      if (Ho(o[0])) {
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
function rs(e) {
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
  go = !1, t.beforeCreate && is(t.beforeCreate, e, "bc");
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
    beforeUpdate: v,
    updated: V,
    activated: D,
    deactivated: Z,
    beforeDestroy: k,
    beforeUnmount: I,
    destroyed: L,
    unmounted: ce,
    render: S,
    renderTracked: Y,
    renderTriggered: ie,
    errorCaptured: oe,
    serverPrefetch: q,
    // public API
    expose: J,
    inheritAttrs: Ae,
    // assets
    components: xe,
    directives: fn,
    filters: Go
  } = t, Qe = process.env.NODE_ENV !== "production" ? Pl() : null;
  if (process.env.NODE_ENV !== "production") {
    const [F] = e.propsOptions;
    if (F)
      for (const P in F)
        Qe("Props", P);
  }
  if (p && Fl(p, o, Qe), i)
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
        Qe("Data", P), Ho(P[0]) || Object.defineProperty(o, P, {
          configurable: !0,
          enumerable: !0,
          get: () => F[P],
          set: ne
        });
  }
  if (go = !0, r)
    for (const F in r) {
      const P = r[F], Re = $(P) ? P.bind(n, n) : $(P.get) ? P.get.bind(n, n) : ne;
      process.env.NODE_ENV !== "production" && Re === ne && O(`Computed property "${F}" has no getter.`);
      const Yn = !$(P) && $(P.set) ? P.set.bind(n) : process.env.NODE_ENV !== "production" ? () => {
        O(
          `Write operation failed: computed property "${F}" is readonly.`
        );
      } : ne, Mt = No({
        get: Re,
        set: Yn
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
  d && is(d, e, "c");
  function he(F, P) {
    M(P) ? P.forEach((Re) => F(Re.bind(n))) : P && F(P.bind(n));
  }
  if (he(Ol, a), he(jo, g), he(xl, v), he(wl, V), he(yl, D), he(bl, Z), he(Tl, oe), he(Cl, Y), he(Sl, ie), he(Dl, I), he(Or, ce), he(Vl, q), M(J))
    if (J.length) {
      const F = e.exposed || (e.exposed = {});
      J.forEach((P) => {
        Object.defineProperty(F, P, {
          get: () => n[P],
          set: (Re) => n[P] = Re,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  S && e.render === ne && (e.render = S), Ae != null && (e.inheritAttrs = Ae), xe && (e.components = xe), fn && (e.directives = fn), q && br(e);
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
function is(e, t, n) {
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
  data: ls,
  props: cs,
  emits: cs,
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
  provide: ls,
  inject: Hl
};
function ls(e, t) {
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
function cs(e, t) {
  return e ? M(e) && M(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ee(
    /* @__PURE__ */ Object.create(null),
    rs(e),
    rs(t ?? {})
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
      isNativeTag: Fs,
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
      version: ys,
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
          const v = p._ceVNode || Oe(o, s);
          return v.appContext = r, g === !0 ? g = "svg" : g === !1 && (g = void 0), process.env.NODE_ENV !== "production" && (r.reload = () => {
            const V = lt(v);
            V.el = null, e(V, d, g);
          }), e(v, d, g), u = !0, p._container = d, d.__vue_app__ = p, process.env.NODE_ENV !== "production" && (p._instance = v.component, cl(p, ys)), Wo(v.component);
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
        const a = Dt;
        Dt = p;
        try {
          return d();
        } finally {
          Dt = a;
        }
      }
    };
    return p;
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
        const v = t[g];
        if (u)
          if (H(r, g))
            v !== r[g] && (r[g] = v, p = !0);
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
          v !== r[g] && (r[g] = v, p = !0);
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
      s && H(s, d = Se(u)) ? !r || !r.includes(d) ? n[d] = p : (l || (l = {}))[d] = p : Wn(e.emitsOptions, u) || (!(u in o) || p !== o[u]) && (o[u] = p, i = !0);
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
      const [g, v] = $r(a, t, !0);
      ee(i, g), v && l.push(...v);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!r && !u)
    return W(e) && o.set(e, xt), xt;
  if (M(r))
    for (let d = 0; d < r.length; d++) {
      process.env.NODE_ENV !== "production" && !z(r[d]) && O("props must be strings when using array syntax.", r[d]);
      const a = Se(r[d]);
      us(a) && (i[a] = K);
    }
  else if (r) {
    process.env.NODE_ENV !== "production" && !W(r) && O("invalid props options", r);
    for (const d in r) {
      const a = Se(d);
      if (us(a)) {
        const g = r[d], v = i[a] = M(g) || $(g) ? { type: g } : ee({}, g), V = v.type;
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
  const p = [i, l];
  return W(e) && o.set(e, p), p;
}
function us(e) {
  return e[0] !== "$" && !kt(e) ? !0 : (process.env.NODE_ENV !== "production" && O(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function ql(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function Ar(e, t, n) {
  const o = R(t), s = n.propsOptions[0], r = Object.keys(e).map((i) => Se(i));
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
        const { valid: v, expectedType: V } = Xl(t, d[g]);
        a.push(V || ""), p = v;
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
  const s = n[0], r = Do(t), i = fs(t, s), l = fs(t, r);
  return n.length === 1 && as(s) && !ec(s, r) && (o += ` with value ${i}`), o += `, got ${r} `, as(r) && (o += `with value ${l}.`), o;
}
function fs(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function as(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function ec(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const ko = (e) => e === "_" || e === "_ctx" || e === "$stable", Uo = (e) => M(e) ? e.map(we) : [we(e)], tc = (e, t, n) => {
  if (t._n)
    return t;
  const o = vl((...s) => (process.env.NODE_ENV !== "production" && re && !(n === null && ye) && !(n && n.root !== re.root) && O(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), Uo(t(...s))), n);
  return o._c = !1, o;
}, Rr = (e, t, n) => {
  const o = e._ctx;
  for (const s in e) {
    if (ko(s)) continue;
    const r = e[s];
    if ($(r))
      t[s] = tc(s, r, o);
    else if (r != null) {
      process.env.NODE_ENV !== "production" && O(
        `Non-function value encountered for slot "${s}". Prefer function slots for better performance.`
      );
      const i = Uo(r);
      t[s] = () => i;
    }
  }
}, Ir = (e, t) => {
  process.env.NODE_ENV !== "production" && !Fo(e.vnode) && O(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = Uo(t);
  e.slots.default = () => n;
}, _o = (e, t, n) => {
  for (const o in t)
    (n || !ko(o)) && (e[o] = t[o]);
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
      !ko(l) && i[l] == null && delete s[l];
};
let Lt, Ye;
function bt(e, t) {
  e.appContext.config.performance && $n() && Ye.mark(`vue-${t}-${e.uid}`), process.env.NODE_ENV !== "production" && pl(e, t, $n() ? Ye.now() : Date.now());
}
function Nt(e, t) {
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
    setText: p,
    setElementText: d,
    parentNode: a,
    nextSibling: g,
    setScopeId: v = ne,
    insertStaticContent: V
  } = e, D = (c, f, h, E = null, m = null, _ = null, x = void 0, N = null, b = process.env.NODE_ENV !== "production" && Be ? !1 : !!f.dynamicChildren) => {
    if (c === f)
      return;
    c && !Ft(c, f) && (E = an(c), et(c, m, _, !0), c = null), f.patchFlag === -2 && (b = !1, f.dynamicChildren = null);
    const { type: y, ref: T, shapeFlag: w } = f;
    switch (y) {
      case rn:
        Z(c, f, h, E);
        break;
      case Ne:
        k(c, f, h, E);
        break;
      case En:
        c == null ? I(f, h, E, x) : process.env.NODE_ENV !== "production" && L(c, f, h, x);
        break;
      case Ee:
        fn(
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
        w & 1 ? Y(
          c,
          f,
          h,
          E,
          m,
          _,
          x,
          N,
          b
        ) : w & 6 ? Go(
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
          At
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
      f.children !== c.children && p(m, f.children);
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
  }, Y = (c, f, h, E, m, _, x, N, b) => {
    f.type === "svg" ? x = "svg" : f.type === "math" && (x = "mathml"), c == null ? ie(
      f,
      h,
      E,
      m,
      _,
      x,
      N,
      b
    ) : J(
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
    const { props: T, shapeFlag: w, transition: C, dirs: A } = c;
    if (b = c.el = i(
      c.type,
      _,
      T && T.is,
      T
    ), w & 8 ? d(b, c.children) : w & 16 && q(
      c.children,
      b,
      null,
      E,
      m,
      so(c, _),
      x,
      N
    ), A && ut(c, null, E, "created"), oe(b, c, c.scopeId, x, E), T) {
      for (const G in T)
        G !== "value" && !kt(G) && r(b, G, null, T[G], _, E);
      "value" in T && r(b, "value", null, T.value, _), (y = T.onVnodeBeforeMount) && Fe(y, E, c);
    }
    process.env.NODE_ENV !== "production" && (On(b, "__vnode", c, !0), On(b, "__vueParentComponent", E, !0)), A && ut(c, null, E, "beforeMount");
    const j = lc(m, C);
    j && C.beforeEnter(b), o(b, f, h), ((y = T && T.onVnodeMounted) || j || A) && _e(() => {
      y && Fe(y, E, c), j && C.enter(b), A && ut(c, null, E, "mounted");
    }, m);
  }, oe = (c, f, h, E, m) => {
    if (h && v(c, h), E)
      for (let _ = 0; _ < E.length; _++)
        v(c, E[_]);
    if (m) {
      let _ = m.subTree;
      if (process.env.NODE_ENV !== "production" && _.patchFlag > 0 && _.patchFlag & 2048 && (_ = Bo(_.children) || _), f === _ || kr(_.type) && (_.ssContent === f || _.ssFallback === f)) {
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
  }, q = (c, f, h, E, m, _, x, N, b = 0) => {
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
  }, J = (c, f, h, E, m, _, x) => {
    const N = f.el = c.el;
    process.env.NODE_ENV !== "production" && (N.__vnode = f);
    let { patchFlag: b, dynamicChildren: y, dirs: T } = f;
    b |= c.patchFlag & 16;
    const w = c.props || K, C = f.props || K;
    let A;
    if (h && ft(h, !1), (A = C.onVnodeBeforeUpdate) && Fe(A, h, f, c), T && ut(f, c, h, "beforeUpdate"), h && ft(h, !0), process.env.NODE_ENV !== "production" && Be && (b = 0, x = !1, y = null), (w.innerHTML && C.innerHTML == null || w.textContent && C.textContent == null) && d(N, ""), y ? (Ae(
      c.dynamicChildren,
      y,
      N,
      h,
      E,
      so(f, m),
      _
    ), process.env.NODE_ENV !== "production" && _n(c, f)) : x || Re(
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
          const B = j[G], ge = w[B], ve = C[B];
          (ve !== ge || B === "value") && r(N, B, ge, ve, m, h);
        }
      }
      b & 1 && c.children !== f.children && d(N, f.children);
    } else !x && y == null && xe(N, w, C, h, m);
    ((A = C.onVnodeUpdated) || T) && _e(() => {
      A && Fe(A, h, f, c), T && ut(f, c, h, "updated");
    }, E);
  }, Ae = (c, f, h, E, m, _, x) => {
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
  }, fn = (c, f, h, E, m, _, x, N, b) => {
    const y = f.el = c ? c.el : l(""), T = f.anchor = c ? c.anchor : l("");
    let { patchFlag: w, dynamicChildren: C, slotScopeIds: A } = f;
    process.env.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (Be || w & 2048) && (w = 0, b = !1, C = null), A && (N = N ? N.concat(A) : A), c == null ? (o(y, h, E), o(T, h, E), q(
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
    c.dynamicChildren ? (Ae(
      c.dynamicChildren,
      C,
      h,
      m,
      _,
      x,
      N
    ), process.env.NODE_ENV !== "production" ? _n(c, f) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (f.key != null || m && f === m.subTree) && _n(
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
      m,
      _,
      x,
      N,
      b
    );
  }, Go = (c, f, h, E, m, _, x, N, b) => {
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
    ) : he(c, f, b);
  }, Qe = (c, f, h, E, m, _, x) => {
    const N = c.component = Dc(
      c,
      E,
      m
    );
    if (process.env.NODE_ENV !== "production" && N.type.__hmrId && sl(N), process.env.NODE_ENV !== "production" && (gn(c), bt(N, "mount")), Fo(c) && (N.ctx.renderer = At), process.env.NODE_ENV !== "production" && bt(N, "init"), Sc(N, !1, x), process.env.NODE_ENV !== "production" && Nt(N, "init"), process.env.NODE_ENV !== "production" && Be && (c.el = null), N.asyncDep) {
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
    process.env.NODE_ENV !== "production" && (vn(), Nt(N, "mount"));
  }, he = (c, f, h) => {
    const E = f.component = c.component;
    if (mc(c, f, h))
      if (E.asyncDep && !E.asyncResolved) {
        process.env.NODE_ENV !== "production" && gn(f), P(E, f, h), process.env.NODE_ENV !== "production" && vn();
        return;
      } else
        E.next = f, E.update();
    else
      f.el = c.el, E.vnode = f;
  }, F = (c, f, h, E, m, _, x) => {
    const N = () => {
      if (c.isMounted) {
        let { next: w, bu: C, u: A, parent: j, vnode: G } = c;
        {
          const Pe = Pr(c);
          if (Pe) {
            w && (w.el = G.el, P(c, w, x)), Pe.asyncDep.then(() => {
              c.isUnmounted || N();
            });
            return;
          }
        }
        let B = w, ge;
        process.env.NODE_ENV !== "production" && gn(w || c.vnode), ft(c, !1), w ? (w.el = G.el, P(c, w, x)) : w = G, C && It(C), (ge = w.props && w.props.onVnodeBeforeUpdate) && Fe(ge, j, w, G), ft(c, !0), process.env.NODE_ENV !== "production" && bt(c, "render");
        const ve = ps(c);
        process.env.NODE_ENV !== "production" && Nt(c, "render");
        const Ie = c.subTree;
        c.subTree = ve, process.env.NODE_ENV !== "production" && bt(c, "patch"), D(
          Ie,
          ve,
          // parent may have changed if it's in a teleport
          a(Ie.el),
          // anchor may have changed if it's in a fragment
          an(Ie),
          c,
          m,
          _
        ), process.env.NODE_ENV !== "production" && Nt(c, "patch"), w.el = ve.el, B === null && _c(c, ve.el), A && _e(A, m), (ge = w.props && w.props.onVnodeUpdated) && _e(
          () => Fe(ge, j, w, G),
          m
        ), process.env.NODE_ENV !== "production" && mr(c), process.env.NODE_ENV !== "production" && vn();
      } else {
        let w;
        const { el: C, props: A } = f, { bm: j, m: G, parent: B, root: ge, type: ve } = c, Ie = Wt(f);
        ft(c, !1), j && It(j), !Ie && (w = A && A.onVnodeBeforeMount) && Fe(w, B, f), ft(c, !0);
        {
          ge.ce && // @ts-expect-error _def is private
          ge.ce._def.shadowRoot !== !1 && ge.ce._injectChildStyle(ve), process.env.NODE_ENV !== "production" && bt(c, "render");
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
        if (G && _e(G, m), !Ie && (w = A && A.onVnodeMounted)) {
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
    const b = c.effect = new Gs(N);
    c.scope.off();
    const y = c.update = b.run.bind(b), T = c.job = b.runIfDirty.bind(b);
    T.i = c, T.id = c.uid, b.scheduler = () => Bn(T), ft(c, !0), process.env.NODE_ENV !== "production" && (b.onTrack = c.rtc ? (w) => It(c.rtc, w) : void 0, b.onTrigger = c.rtg ? (w) => It(c.rtg, w) : void 0), y();
  }, P = (c, f, h) => {
    f.component = c;
    const E = c.vnode.props;
    c.vnode = f, c.next = null, Zl(c, f.props, E, h), oc(c, f.children, h), Me(), ts(c), $e();
  }, Re = (c, f, h, E, m, _, x, N, b = !1) => {
    const y = c && c.children, T = c ? c.shapeFlag : 0, w = f.children, { patchFlag: C, shapeFlag: A } = f;
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
        Yn(
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
    A & 8 ? (T & 16 && $t(y, m, _), w !== y && d(h, w)) : T & 16 ? A & 16 ? Mt(
      y,
      w,
      h,
      E,
      m,
      _,
      x,
      N,
      b
    ) : $t(y, m, _, !0) : (T & 8 && d(h, ""), A & 16 && q(
      w,
      h,
      E,
      m,
      _,
      x,
      N,
      b
    ));
  }, Yn = (c, f, h, E, m, _, x, N, b) => {
    c = c || xt, f = f || xt;
    const y = c.length, T = f.length, w = Math.min(y, T);
    let C;
    for (C = 0; C < w; C++) {
      const A = f[C] = b ? nt(f[C]) : we(f[C]);
      D(
        c[C],
        A,
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
    ) : q(
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
      const A = c[y], j = f[y] = b ? nt(f[y]) : we(f[y]);
      if (Ft(A, j))
        D(
          A,
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
      const A = c[w], j = f[C] = b ? nt(f[C]) : we(f[C]);
      if (Ft(A, j))
        D(
          A,
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
        const A = C + 1, j = A < T ? f[A].el : E;
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
      const A = y, j = y, G = /* @__PURE__ */ new Map();
      for (y = j; y <= C; y++) {
        const ue = f[y] = b ? nt(f[y]) : we(f[y]);
        ue.key != null && (process.env.NODE_ENV !== "production" && G.has(ue.key) && O(
          "Duplicate keys found during update:",
          JSON.stringify(ue.key),
          "Make sure keys are unique."
        ), G.set(ue.key, y));
      }
      let B, ge = 0;
      const ve = C - j + 1;
      let Ie = !1, Pe = 0;
      const Rt = new Array(ve);
      for (y = 0; y < ve; y++) Rt[y] = 0;
      for (y = A; y <= w; y++) {
        const ue = c[y];
        if (ge >= ve) {
          et(ue, m, _, !0);
          continue;
        }
        let Le;
        if (ue.key != null)
          Le = G.get(ue.key);
        else
          for (B = j; B <= C; B++)
            if (Rt[B - j] === 0 && Ft(ue, f[B])) {
              Le = B;
              break;
            }
        Le === void 0 ? et(ue, m, _, !0) : (Rt[Le - j] = y + 1, Le >= Pe ? Pe = Le : Ie = !0, D(
          ue,
          f[Le],
          h,
          null,
          m,
          _,
          x,
          N,
          b
        ), ge++);
      }
      const Yo = Ie ? cc(Rt) : xt;
      for (B = Yo.length - 1, y = ve - 1; y >= 0; y--) {
        const ue = j + y, Le = f[ue], qo = f[ue + 1], Jo = ue + 1 < T ? (
          // #13559, fallback to el placeholder for unresolved async component
          qo.el || qo.placeholder
        ) : E;
        Rt[y] === 0 ? D(
          null,
          Le,
          h,
          Jo,
          m,
          _,
          x,
          N,
          b
        ) : Ie && (B < 0 || y !== Yo[B] ? Et(Le, h, Jo, 2) : B--);
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
      x.move(c, f, h, At);
      return;
    }
    if (x === Ee) {
      o(_, f, h);
      for (let w = 0; w < b.length; w++)
        Et(b[w], f, h, E);
      o(c.anchor, f, h);
      return;
    }
    if (x === En) {
      ce(c, f, h);
      return;
    }
    if (E !== 2 && y & 1 && N)
      if (E === 0)
        N.beforeEnter(_), o(_, f, h), _e(() => N.enter(_), m);
      else {
        const { leave: w, delayLeave: C, afterLeave: A } = N, j = () => {
          c.ctx.isUnmounted ? s(_) : o(_, f, h);
        }, G = () => {
          _._isLeaving && _[El](
            !0
            /* cancelled */
          ), w(_, () => {
            j(), A && A();
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
      cacheIndex: A
    } = c;
    if (w === -2 && (m = !1), N != null && (Me(), Kt(N, null, h, c, !0), $e()), A != null && (f.renderCache[A] = void 0), T & 256) {
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
        At,
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
      ) : (_ === Ee && w & 384 || !m && T & 16) && $t(b, f, h), E && qn(c);
    }
    (G && (B = x && x.onVnodeUnmounted) || j) && _e(() => {
      B && Fe(B, f, c), j && ut(c, null, f, "unmounted");
    }, h);
  }, qn = (c) => {
    const { type: f, el: h, anchor: E, transition: m } = c;
    if (f === Ee) {
      process.env.NODE_ENV !== "production" && c.patchFlag > 0 && c.patchFlag & 2048 && m && !m.persisted ? c.children.forEach((x) => {
        x.type === Ne ? s(x.el) : qn(x);
      }) : oi(h, E);
      return;
    }
    if (f === En) {
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
    ds(b), ds(y), E && It(E), m.stop(), _ && (_.flags |= 8, et(x, c, f, h)), N && _e(N, f), _e(() => {
      c.isUnmounted = !0;
    }, f), process.env.NODE_ENV !== "production" && dl(c);
  }, $t = (c, f, h, E = !1, m = !1, _ = 0) => {
    for (let x = _; x < c.length; x++)
      et(c[x], f, h, E, m);
  }, an = (c) => {
    if (c.shapeFlag & 6)
      return an(c.component.subTree);
    if (c.shapeFlag & 128)
      return c.suspense.next();
    const f = g(c.anchor || c.el), h = f && f[ml];
    return h ? g(h) : f;
  };
  let Jn = !1;
  const Zo = (c, f, h) => {
    c == null ? f._vnode && et(f._vnode, null, null, !0) : D(
      f._vnode || null,
      c,
      f,
      null,
      null,
      null,
      h
    ), f._vnode = c, Jn || (Jn = !0, ts(), hr(), Jn = !1);
  }, At = {
    p: D,
    um: et,
    m: Et,
    r: qn,
    mt: Qe,
    mc: q,
    pc: Re,
    pbc: Ae,
    n: an,
    o: e
  };
  return {
    render: Zo,
    hydrate: void 0,
    createApp: Bl(Zo)
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
function _n(e, t, n = !1) {
  const o = e.children, s = t.children;
  if (M(o) && M(s))
    for (let r = 0; r < o.length; r++) {
      const i = o[r];
      let l = s[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = s[r] = nt(s[r]), l.el = i.el), !n && l.patchFlag !== -2 && _n(i, l)), l.type === rn && // avoid cached text nodes retaining detached dom nodes
      l.patchFlag !== -1 && (l.el = i.el), l.type === Ne && !l.el && (l.el = i.el), process.env.NODE_ENV !== "production" && l.el && (l.el.__vnode = l);
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
function ds(e) {
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
  let p;
  if (Xt) {
    if (r === "sync") {
      const v = fc();
      p = v.__watcherHandles || (v.__watcherHandles = []);
    } else if (!u) {
      const v = () => {
      };
      return v.stop = ne, v.resume = ne, v.pause = ne, v;
    }
  }
  const d = re;
  l.call = (v, V, D) => We(v, d, V, D);
  let a = !1;
  r === "post" ? l.scheduler = (v) => {
    _e(v, d && d.suspense);
  } : r !== "sync" && (a = !0, l.scheduler = (v, V) => {
    V ? v() : Bn(v);
  }), l.augmentJob = (v) => {
    t && (v.flags |= 4), a && (v.flags |= 2, d && (v.id = d.uid, v.i = d));
  };
  const g = Ji(e, t, l);
  return Xt && (p ? p.push(g) : u && g()), g;
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
const dc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Se(t)}Modifiers`] || e[`${Je(t)}Modifiers`];
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
        (!a || !(at(Se(t)) in a)) && O(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${at(Se(t))}" prop.`
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
    d !== t && o[at(d)] && O(
      `Event "${d}" is emitted in component ${Zn(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${Je(
        t
      )}" instead of "${t}".`
    );
  }
  let l, u = o[l = at(t)] || // also try camelCase event handler (#2249)
  o[l = at(Se(t))];
  !u && r && (u = o[l = at(Je(t))]), u && We(
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
      d && (l = !0, ee(i, d));
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !r && !l ? (W(e) && o.set(e, null), null) : (M(r) ? r.forEach((u) => i[u] = null) : ee(i, r), W(e) && o.set(e, i), i);
}
function Wn(e, t) {
  return !e || !en(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), H(e, t[0].toLowerCase() + t.slice(1)) || H(e, Je(t)) || H(e, t));
}
let Eo = !1;
function An() {
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
    render: p,
    renderCache: d,
    props: a,
    data: g,
    setupState: v,
    ctx: V,
    inheritAttrs: D
  } = e, Z = Cn(e);
  let k, I;
  process.env.NODE_ENV !== "production" && (Eo = !1);
  try {
    if (n.shapeFlag & 4) {
      const S = s || o, Y = process.env.NODE_ENV !== "production" && v.__isScriptSetup ? new Proxy(S, {
        get(ie, oe, q) {
          return O(
            `Property '${String(
              oe
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(ie, oe, q);
        }
      }) : S;
      k = we(
        p.call(
          Y,
          S,
          d,
          process.env.NODE_ENV !== "production" ? Ue(a) : a,
          v,
          g,
          V
        )
      ), I = l;
    } else {
      const S = t;
      process.env.NODE_ENV !== "production" && l === a && An(), k = we(
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
    Zt.length = 0, on(S, e, 1), k = Oe(Ne);
  }
  let L = k, ce;
  if (process.env.NODE_ENV !== "production" && k.patchFlag > 0 && k.patchFlag & 2048 && ([L, ce] = Hr(k)), I && D !== !1) {
    const S = Object.keys(I), { shapeFlag: Y } = L;
    if (S.length) {
      if (Y & 7)
        r && S.some(Nn) && (I = vc(
          I,
          r
        )), L = lt(L, I, !1, !0);
      else if (process.env.NODE_ENV !== "production" && !Eo && L.type !== Ne) {
        const ie = Object.keys(l), oe = [], q = [];
        for (let J = 0, Ae = ie.length; J < Ae; J++) {
          const xe = ie[J];
          en(xe) ? Nn(xe) || oe.push(xe[2].toLowerCase() + xe.slice(3)) : q.push(xe);
        }
        q.length && O(
          `Extraneous non-props attributes (${q.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`
        ), oe.length && O(
          `Extraneous non-emits event listeners (${oe.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return n.dirs && (process.env.NODE_ENV !== "production" && !hs(L) && O(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), L = lt(L, null, !1, !0), L.dirs = L.dirs ? L.dirs.concat(n.dirs) : n.dirs), n.transition && (process.env.NODE_ENV !== "production" && !hs(L) && O(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), Lo(L, n.transition)), process.env.NODE_ENV !== "production" && ce ? ce(L) : k = L, Cn(Z), k;
}
const Hr = (e) => {
  const t = e.children, n = e.dynamicChildren, o = Bo(t, !1);
  if (o) {
    if (process.env.NODE_ENV !== "production" && o.patchFlag > 0 && o.patchFlag & 2048)
      return Hr(o);
  } else return [e, void 0];
  const s = t.indexOf(o), r = n ? n.indexOf(o) : -1, i = (l) => {
    t[s] = l, n && (r > -1 ? n[r] = l : l.patchFlag > 0 && (e.dynamicChildren = [...n, l]));
  };
  return [we(o), i];
};
function Bo(e, t = !0) {
  let n;
  for (let o = 0; o < e.length; o++) {
    const s = e[o];
    if (Gn(s)) {
      if (s.type !== Ne || s.children === "v-if") {
        if (n)
          return;
        if (n = s, process.env.NODE_ENV !== "production" && t && n.patchFlag > 0 && n.patchFlag & 2048)
          return Bo(n.children);
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
}, hs = (e) => e.shapeFlag & 7 || e.type === Ne;
function mc(e, t, n) {
  const { props: o, children: s, component: r } = e, { props: i, children: l, patchFlag: u } = t, p = r.emitsOptions;
  if (process.env.NODE_ENV !== "production" && (s || l) && Be || t.dirs || t.transition)
    return !0;
  if (n && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return o ? gs(o, i, p) : !!i;
    if (u & 8) {
      const d = t.dynamicProps;
      for (let a = 0; a < d.length; a++) {
        const g = d[a];
        if (i[g] !== o[g] && !Wn(p, g))
          return !0;
      }
    }
  } else
    return (s || l) && (!l || !l.$stable) ? !0 : o === i ? !1 : o ? i ? gs(o, i, p) : !0 : !!i;
  return !1;
}
function gs(e, t, n) {
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
const Ee = Symbol.for("v-fgt"), rn = Symbol.for("v-txt"), Ne = Symbol.for("v-cmt"), En = Symbol.for("v-stc"), Zt = [];
let be = null;
function Q(e = !1) {
  Zt.push(be = e ? null : []);
}
function yc() {
  Zt.pop(), be = Zt[Zt.length - 1] || null;
}
let zt = 1;
function vs(e, t = !1) {
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
}) => (typeof e == "number" && (e = "" + e), e != null ? z(e) || X(e) || $(e) ? { i: ye, r: e, k: t, f: !!n } : e : null);
function Ve(e, t = null, n = null, o = 0, s = null, r = e === Ee ? 0 : 1, i = !1, l = !1) {
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
    ctx: ye
  };
  return l ? (Ko(u, n), r & 128 && e.normalize(u)) : n && (u.shapeFlag |= z(n) ? 8 : 16), process.env.NODE_ENV !== "production" && u.key !== u.key && O("VNode created with invalid key (NaN). VNode type:", u.type), zt > 0 && // avoid a block node from tracking itself
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
  if ((!e || e === Ml) && (process.env.NODE_ENV !== "production" && !e && O(`Invalid vnode type when creating vnode: ${e}.`), e = Ne), Gn(e)) {
    const l = lt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Ko(l, n), zt > 0 && !r && be && (l.shapeFlag & 6 ? be[be.indexOf(e)] = l : be.push(l)), l.patchFlag = -2, l;
  }
  if (zr(e) && (e = e.__vccOpts), t) {
    t = Nc(t);
    let { class: l, style: u } = t;
    l && !z(l) && (t.class = jn(l)), W(u) && (xn(u) && !M(u) && (u = ee({}, u)), t.style = nn(u));
  }
  const i = z(e) ? 1 : kr(e) ? 128 : _l(e) ? 64 : W(e) ? 4 : $(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && xn(e) && (e = R(e), O(
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
  return e ? xn(e) || Tr(e) ? ee({}, e) : e : null;
}
function lt(e, t, n = !1, o = !1) {
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
    d,
    u.clone(d)
  ), d;
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
  ) : Gn(e) ? nt(e) : Oe(rn, null, String(e));
}
function nt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : lt(e);
}
function Ko(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (M(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Ko(e, s()), s._c && (s._d = !0));
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
let re = null;
const Zr = () => re || ye;
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
    (n) => re = n
  ), yo = t(
    "__VUE_SSR_SETTERS__",
    (n) => Xt = n
  );
}
const ln = (e) => {
  const t = re;
  return In(e), e.scope.on(), () => {
    e.scope.off(), In(t);
  };
}, ms = () => {
  re && re.scope.off(), In(null);
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
    if ($e(), i(), (u || e.sp) && !Wt(e) && br(e), u) {
      if (l.then(ms, ms), t)
        return l.then((p) => {
          _s(e, p, t);
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
      _s(e, l, t);
  } else
    qr(e, t);
}
function _s(e, t, n) {
  $(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : W(t) ? (process.env.NODE_ENV !== "production" && Gn(t) && O(
    "setup() should not return VNodes directly - return a render function instead."
  ), process.env.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = cr(t), process.env.NODE_ENV !== "production" && Il(e)) : process.env.NODE_ENV !== "production" && t !== void 0 && O(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), qr(e, n);
}
const Tc = () => !0;
function qr(e, t, n) {
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
const Es = process.env.NODE_ENV !== "production" ? {
  get(e, t) {
    return An(), te(e, "get", ""), e[t];
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
        return n || (n = new Proxy(e.attrs, Es));
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
      attrs: new Proxy(e.attrs, Es),
      slots: e.slots,
      emit: e.emit,
      expose: t
    };
}
function Wo(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(cr(Bi(e.exposed)), {
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
      if (X(a)) {
        Me();
        const g = a.value;
        return $e(), [
          "div",
          {},
          ["span", e, d(a)],
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
    a.type.props && a.props && g.push(i("props", R(a.props))), a.setupState !== K && g.push(i("setup", a.setupState)), a.data !== K && g.push(i("data", R(a.data)));
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
    return typeof a == "number" ? ["span", t, a] : typeof a == "string" ? ["span", n, JSON.stringify(a)] : typeof a == "boolean" ? ["span", o, a] : W(a) ? ["object", { object: g ? R(a) : a }] : ["span", n, String(a)];
  }
  function u(a, g) {
    const v = a.type;
    if ($(v))
      return;
    const V = {};
    for (const D in a.ctx)
      p(v, D, g) && (V[D] = a.ctx[D]);
    return V;
  }
  function p(a, g, v) {
    const V = a[v];
    if (M(V) && V.includes(g) || W(V) && g in V || a.extends && p(a.extends, g, v) || a.mixins && a.mixins.some((D) => p(D, g, v)))
      return !0;
  }
  function d(a) {
    return pe(a) ? "ShallowRef" : a.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(s) : window.devtoolsFormatters = [s];
}
const ys = "3.5.22", qe = process.env.NODE_ENV !== "production" ? O : ne;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Oo;
const bs = typeof window < "u" && window.trustedTypes;
if (bs)
  try {
    Oo = /* @__PURE__ */ bs.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch (e) {
    process.env.NODE_ENV !== "production" && qe(`Error creating trusted types policy: ${e}`);
  }
const Xr = Oo ? (e) => Oo.createHTML(e) : (e) => e, Pc = "http://www.w3.org/2000/svg", Lc = "http://www.w3.org/1998/Math/MathML", Ze = typeof document < "u" ? document : null, Ns = Ze && /* @__PURE__ */ Ze.createElement("template"), Fc = {
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
      Ns.innerHTML = Xr(
        o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e
      );
      const l = Ns.content;
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
const Os = Symbol("_vod"), kc = Symbol("_vsh"), Uc = Symbol(process.env.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : ""), Bc = /(?:^|;)\s*display\s*:/;
function Kc(e, t, n) {
  const o = e.style, s = z(n);
  let r = !1;
  if (n && !s) {
    if (t)
      if (z(t))
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
  Os in e && (e[Os] = r ? o.display : "", e[kc] && (o.display = "none"));
}
const Wc = /[^\\];\s*$/, xs = /\s*!important$/;
function bn(e, t, n) {
  if (M(n))
    n.forEach((o) => bn(e, t, o));
  else if (n == null && (n = ""), process.env.NODE_ENV !== "production" && Wc.test(n) && qe(
    `Unexpected semicolon at the end of '${t}' style value: '${n}'`
  ), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = Gc(e, t);
    xs.test(n) ? e.setProperty(
      Je(o),
      n.replace(xs, ""),
      "important"
    ) : e[o] = n;
  }
}
const ws = ["Webkit", "Moz", "ms"], ro = {};
function Gc(e, t) {
  const n = ro[t];
  if (n)
    return n;
  let o = Se(t);
  if (o !== "filter" && o in e)
    return ro[t] = o;
  o = Fn(o);
  for (let s = 0; s < ws.length; s++) {
    const r = ws[s] + o;
    if (r in e)
      return ro[t] = r;
  }
  return t;
}
const Ds = "http://www.w3.org/1999/xlink";
function Vs(e, t, n, o, s, r = bi(t)) {
  o && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Ds, t.slice(6, t.length)) : e.setAttributeNS(Ds, t, n) : n == null || r && !Us(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : ct(n) ? String(n) : n
  );
}
function Ss(e, t, n, o, s) {
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
    l === "boolean" ? n = Us(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
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
const Cs = Symbol("_vei");
function qc(e, t, n, o, s = null) {
  const r = e[Cs] || (e[Cs] = {}), i = r[t];
  if (o && i)
    i.value = process.env.NODE_ENV !== "production" ? Ms(o, t) : o;
  else {
    const [l, u] = Jc(t);
    if (o) {
      const p = r[t] = Qc(
        process.env.NODE_ENV !== "production" ? Ms(o, t) : o,
        s
      );
      Zc(e, l, p, u);
    } else i && (Yc(e, l, i, u), r[t] = void 0);
  }
}
const Ts = /(?:Once|Passive|Capture)$/;
function Jc(e) {
  let t;
  if (Ts.test(e)) {
    t = {};
    let o;
    for (; o = e.match(Ts); )
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
function Ms(e, t) {
  return $(e) || M(e) ? e : (qe(
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
const $s = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, tu = (e, t, n, o, s, r) => {
  const i = s === "svg";
  t === "class" ? Hc(e, o, i) : t === "style" ? Kc(e, n, o) : en(t) ? Nn(t) || qc(e, t, n, o, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : nu(e, t, o, i)) ? (Ss(e, t, o), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Vs(e, t, o, i, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !z(o)) ? Ss(e, Se(t), o, r, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), Vs(e, t, o, i));
};
function nu(e, t, n, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && $s(t) && $(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
      return !1;
  }
  return $s(t) && z(n) ? !1 : t in e;
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
}, As = (e, t) => {
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
  if (z(e)) {
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
const gu = ["src"], vu = /* @__PURE__ */ Tt({
  __name: "ChatEntryAudio",
  props: {
    entry: {},
    id: {}
  },
  setup(e) {
    const t = cn(), n = e, o = ae(null);
    return jo(() => {
      const s = {
        ended: () => t.fsm?.logEvent({ event: "AUDIO_PLAY_ENDED", id: n.id }),
        play: () => t.fsm?.logEvent({ event: "AUDIO_PLAY_START", id: n.id }),
        pause: () => t.fsm?.logEvent({ event: "AUDIO_PLAY_PAUSE", id: n.id }),
        seeked: () => t.fsm?.logEvent({ event: "AUDIO_PLAY_SEEKED", id: n.id })
      };
      for (const r in s)
        o.value?.addEventListener(r, s[r]);
    }), (s, r) => (Q(), le("audio", {
      ref_key: "audioElement",
      ref: o,
      controls: "",
      controlslist: "nodownload",
      preload: "auto"
    }, [
      Ve("source", {
        src: n.entry.audioUrl
      }, null, 8, gu)
    ], 512));
  }
}), un = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, s] of t)
    n[o] = s;
  return n;
}, ei = /* @__PURE__ */ un(vu, [["__scopeId", "data-v-c5aa137c"]]), mu = /* @__PURE__ */ Tt({
  __name: "ChatEntryText",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => Ks(t.entry);
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
const ti = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M4%206H20M16%206L15.7294%205.18807C15.4671%204.40125%2015.3359%204.00784%2015.0927%203.71698C14.8779%203.46013%2014.6021%203.26132%2014.2905%203.13878C13.9376%203%2013.523%203%2012.6936%203H11.3064C10.477%203%2010.0624%203%209.70951%203.13878C9.39792%203.26132%209.12208%203.46013%208.90729%203.71698C8.66405%204.00784%208.53292%204.40125%208.27064%205.18807L8%206M18%206V16.2C18%2017.8802%2018%2018.7202%2017.673%2019.362C17.3854%2019.9265%2016.9265%2020.3854%2016.362%2020.673C15.7202%2021%2014.8802%2021%2013.2%2021H10.8C9.11984%2021%208.27976%2021%207.63803%2020.673C7.07354%2020.3854%206.6146%2019.9265%206.32698%2019.362C6%2018.7202%206%2017.8802%206%2016.2V6M14%2010V17M10%2010V17'%20stroke='%23000000'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e", _u = {
  key: 0,
  class: "deleting"
}, Eu = { class: "button" }, yu = ["src"], bu = 3510, Nu = /* @__PURE__ */ Tt({
  __name: "ChatEntry",
  props: {
    entry: {}
  },
  emits: ["updateEntryValue"],
  setup(e, { emit: t }) {
    const n = cn(), o = ae(null), s = {
      ...Qt(n.entryStyle),
      marginTop: `${n.listGap}px`
    }, r = ae(s), l = ae(e.entry), u = t, p = (v) => {
      l.value.status = v, u("updateEntryValue", l.value);
    };
    let d = null;
    const a = () => {
      p("deleting");
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
      l.value.type === "text" && (D.text = l.value.entry), d = setTimeout(() => {
        p("deleted"), r.value = s, D.event = "ENTRY_DELETED", n.fsm?.logEvent(D);
      }, bu), n.fsm?.logEvent(D);
    }, g = () => {
      if (d) {
        clearTimeout(d), d = null, p("active"), o.value.classList.remove("deleted"), r.value = s;
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
      e.entry.status === "deleting" ? (Q(), le("div", _u, [
        V[0] || (V[0] = Gr(" Eintrag Gelöscht. ", -1)),
        Ve("a", {
          href: "#",
          onClick: ot(g, ["prevent"])
        }, "Rückgängig machen")
      ])) : e.entry.status !== "deleted" ? (Q(), le(Ee, { key: 1 }, [
        l.value.type === "text" ? (Q(), Rn(mu, {
          key: 0,
          entry: l.value.entry
        }, null, 8, ["entry"])) : l.value.type === "audio" ? (Q(), Rn(ei, {
          key: 1,
          entry: l.value.entry,
          id: l.value.id
        }, null, 8, ["entry", "id"])) : He("", !0),
        Ve("div", Eu, [
          Ve("img", {
            src: pt(ti),
            onClick: ot(a, ["prevent"])
          }, null, 8, yu)
        ])
      ], 64)) : He("", !0)
    ], 4));
  }
}), Ou = /* @__PURE__ */ un(Nu, [["__scopeId", "data-v-6298b429"]]), xu = /* @__PURE__ */ Tt({
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
    const s = e, r = t, i = (l) => {
      r("updateEntryValue", l);
    };
    return (l, u) => (Q(), le("div", {
      class: "chat-list",
      style: o
    }, [
      (Q(!0), le(Ee, null, $l(s.list, (p) => (Q(), le(Ee, {
        key: p.id
      }, [
        p.status != "deleted" ? (Q(), Rn(Ou, {
          key: 0,
          entry: p,
          onUpdateEntryValue: i
        }, null, 8, ["entry"])) : He("", !0)
      ], 64))), 128))
    ]));
  }
}), wu = /* @__PURE__ */ un(xu, [["__scopeId", "data-v-16e11011"]]), ni = "__IB_ExtRes_MicroAllowed_stat";
let St = null;
function Du() {
  return navigator.mediaDevices?.getUserMedia ? St = sessionStorage.getItem(ni) ?? "prompt" : St = "not-supported", St;
}
function Is(e) {
  St = e, sessionStorage.setItem(ni, e);
}
function Vu() {
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
async function Su() {
  return new Promise((e, t) => {
    const n = (r) => {
      const i = "allowed";
      St !== i && Is(i), e(r);
    }, o = () => {
      const r = "denied";
      St !== r && Is(r), t();
    }, s = {
      audio: !0
    };
    navigator.mediaDevices.getUserMedia(s).then(n, o);
  });
}
async function Cu(e) {
  return new Promise((t, n) => {
    const o = new FileReader();
    o.onloadend = () => t(o.result), o.onerror = n, o.readAsDataURL(e);
  });
}
function Tu(e) {
  return Cu(e).catch((n) => console.error("convertToBase64: ", n));
}
const Ps = (e, t) => e ? { [t]: e } : {};
function Mu(e, t = void 0, n = void 0, o = 32e3, s = Vu()) {
  const r = new MediaRecorder(e, {
    audioBitsPerSecond: o,
    ...Ps(s, "mimeType")
  });
  if (!r)
    return r;
  const i = [], l = (p) => {
    i.push(p.data);
  }, u = () => {
    e.getTracks().forEach((d) => d.stop());
    const p = new Blob(i, Ps(s, "type"));
    if (t) {
      const d = URL.createObjectURL(p);
      t(d);
    }
    n && Tu(p).then((d) => {
      d && typeof d == "string" && n(d);
    });
  };
  return r.addEventListener("dataavailable", l), r.addEventListener("stop", u), r.start(), r;
}
function Ls(e) {
  e?.stop();
}
const $u = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M19%2010V12C19%2015.866%2015.866%2019%2012%2019M5%2010V12C5%2015.866%208.13401%2019%2012%2019M12%2019V22M8%2022H16M12%2015C10.3431%2015%209%2013.6569%209%2012V5C9%203.34315%2010.3431%202%2012%202C13.6569%202%2015%203.34315%2015%205V12C15%2013.6569%2013.6569%2015%2012%2015Z'%20stroke='%23000000'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e", Au = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%20-0.5%2025%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M19.1168%2012.1484C19.474%2012.3581%2019.9336%2012.2384%2020.1432%2011.8811C20.3528%2011.5238%2020.2331%2011.0643%2019.8758%2010.8547L19.1168%2012.1484ZM6.94331%204.13656L6.55624%204.77902L6.56378%204.78344L6.94331%204.13656ZM5.92408%204.1598L5.50816%203.5357L5.50816%203.5357L5.92408%204.1598ZM5.51031%205.09156L4.76841%205.20151C4.77575%205.25101%204.78802%205.29965%204.80505%205.34671L5.51031%205.09156ZM7.12405%2011.7567C7.26496%2012.1462%207.69495%2012.3477%208.08446%2012.2068C8.47397%2012.0659%208.67549%2011.6359%208.53458%2011.2464L7.12405%2011.7567ZM19.8758%2012.1484C20.2331%2011.9388%2020.3528%2011.4793%2020.1432%2011.122C19.9336%2010.7648%2019.474%2010.6451%2019.1168%2010.8547L19.8758%2012.1484ZM6.94331%2018.8666L6.56375%2018.2196L6.55627%2018.2241L6.94331%2018.8666ZM5.92408%2018.8433L5.50815%2019.4674H5.50815L5.92408%2018.8433ZM5.51031%2017.9116L4.80505%2017.6564C4.78802%2017.7035%204.77575%2017.7521%204.76841%2017.8016L5.51031%2017.9116ZM8.53458%2011.7567C8.67549%2011.3672%208.47397%2010.9372%208.08446%2010.7963C7.69495%2010.6554%207.26496%2010.8569%207.12405%2011.2464L8.53458%2011.7567ZM19.4963%2012.2516C19.9105%2012.2516%2020.2463%2011.9158%2020.2463%2011.5016C20.2463%2011.0873%2019.9105%2010.7516%2019.4963%2010.7516V12.2516ZM7.82931%2010.7516C7.4151%2010.7516%207.07931%2011.0873%207.07931%2011.5016C7.07931%2011.9158%207.4151%2012.2516%207.82931%2012.2516V10.7516ZM19.8758%2010.8547L7.32284%203.48968L6.56378%204.78344L19.1168%2012.1484L19.8758%2010.8547ZM7.33035%203.49414C6.76609%203.15419%206.05633%203.17038%205.50816%203.5357L6.34%204.78391C6.40506%204.74055%206.4893%204.73863%206.55627%204.77898L7.33035%203.49414ZM5.50816%203.5357C4.95998%203.90102%204.67184%204.54987%204.76841%205.20151L6.25221%204.98161C6.24075%204.90427%206.27494%204.82727%206.34%204.78391L5.50816%203.5357ZM4.80505%205.34671L7.12405%2011.7567L8.53458%2011.2464L6.21558%204.83641L4.80505%205.34671ZM19.1168%2010.8547L6.56378%2018.2197L7.32284%2019.5134L19.8758%2012.1484L19.1168%2010.8547ZM6.55627%2018.2241C6.4893%2018.2645%206.40506%2018.2626%206.34%2018.2192L5.50815%2019.4674C6.05633%2019.8327%206.76609%2019.8489%207.33035%2019.509L6.55627%2018.2241ZM6.34%2018.2192C6.27494%2018.1759%206.24075%2018.0988%206.25221%2018.0215L4.76841%2017.8016C4.67184%2018.4532%204.95998%2019.1021%205.50815%2019.4674L6.34%2018.2192ZM6.21558%2018.1667L8.53458%2011.7567L7.12405%2011.2464L4.80505%2017.6564L6.21558%2018.1667ZM19.4963%2010.7516H7.82931V12.2516H19.4963V10.7516Z'%20fill='%23000000'/%3e%3c/svg%3e", Ru = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20fill='%23dc143c'%20height='800px'%20width='800px'%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%20512%20512'%20enable-background='new%200%200%20512%20512'%20xml:space='preserve'%3e%3cpath%20d='M465.5,0H46.5C20.9,0,0,20.9,0,46.5v418.9C0,491.1,20.9,512,46.5,512h418.9c25.7,0,46.5-20.9,46.5-46.5V46.5%20C512,20.9,491.1,0,465.5,0z'/%3e%3c/svg%3e", Iu = ["value", "placeholder", "rows", "onKeydown"], Pu = {
  key: 1,
  class: "rectext"
}, Lu = {
  key: 2,
  class: "rectext"
}, Fu = {
  key: 3,
  class: "button"
}, ju = ["src"], Hu = {
  key: 4,
  class: "button"
}, ku = ["src"], Uu = {
  key: 5,
  class: "button"
}, Bu = ["src"], Ku = {
  key: 6,
  class: "button-stop"
}, Wu = ["src"], Gu = /* @__PURE__ */ Tt({
  __name: "ChatInput",
  emits: ["addEntry"],
  setup(e, { emit: t }) {
    const n = cn(), o = Qt(n.inputStyle), s = Qt(n.inputStyleTextinput || n.inputStyle), r = ae(null), i = ae({}), l = ae(!1), u = No(() => l.value ? {
      ...s,
      ...i.value
    } : {
      ...o,
      ...i.value
    }), p = ae(!0), d = No(() => p.value ? n.inputPlaceholder : void 0), a = ae(null);
    jo(() => {
      a.value.focus();
    });
    const g = ae({
      id: null,
      type: "text",
      entry: "Nochn Eintrag",
      status: "active"
    }), v = ae("none");
    Vt(v, (q) => {
      switch (q) {
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
    const V = ae(""), D = (q) => {
      const J = q.target.value;
      V.value = J, J.length === 0 ? v.value !== "none" && (v.value = "none") : v.value !== "texting" && (v.value = "texting"), p.value && (p.value = !1);
    }, Z = ae({
      base64: "",
      audioUrl: ""
    });
    let k;
    const I = ae(Du());
    Vt(I, (q) => {
      switch (q) {
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
      k || I.value === "not-supported" || I.value === "denied" || (Su().then((q) => {
        I.value = "allowed", k = Mu(
          q,
          (J) => Z.value.audioUrl = J,
          (J) => Z.value.base64 = J
        ), v.value = "recording";
      }).catch(() => {
        I.value = "denied", Y();
      }), i.value.height || (i.value.height = r.value.getBoundingClientRect().height + "px"));
    }, ce = () => {
      k ? (Ls(k), k = void 0, v.value = "recording_ack") : Y();
    }, S = t, Y = () => {
      k && (Ls(k), k = void 0), V.value = "", v.value = "none", ar(() => a.value.focus());
    }, ie = () => {
      if (v.value === "texting")
        g.value.type = "text", g.value.entry = V.value;
      else {
        if (!Z.value.base64)
          return;
        g.value.type = "audio", g.value.entry = Z.value;
      }
      S("addEntry", g.value), Y();
    }, oe = () => {
      Y();
    };
    return (q, J) => (Q(), le("div", {
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
        placeholder: d.value,
        rows: pt(n).inputRows || 2,
        onKeydown: [
          As(ot(ie, ["ctrl", "prevent"]), ["enter"]),
          As(ot(ie, ["meta", "prevent"]), ["enter"])
        ],
        onFocus: J[0] || (J[0] = (Ae) => l.value = !0),
        onBlur: J[1] || (J[1] = (Ae) => l.value = !1)
      }, null, 40, Iu)) : He("", !0),
      v.value === "recording" ? (Q(), le("div", Pu, [...J[2] || (J[2] = [
        Ve("div", null, "Aufnahme läuft", -1)
      ])])) : He("", !0),
      v.value === "recording_ack" ? (Q(), le("div", Lu, [
        Oe(ei, {
          entry: Z.value,
          id: null,
          style: { width: "100%" }
        }, null, 8, ["entry"])
      ])) : He("", !0),
      v.value == "texting" || v.value == "recording_ack" ? (Q(), le("div", Fu, [
        Ve("img", {
          src: pt(ti),
          onClick: ot(oe, ["prevent"])
        }, null, 8, ju)
      ])) : He("", !0),
      v.value === "texting" || v.value === "recording_ack" ? (Q(), le("div", Hu, [
        Ve("img", {
          src: pt(Au),
          onClick: ot(ie, ["prevent"])
        }, null, 8, ku)
      ])) : He("", !0),
      v.value === "none" ? (Q(), le("div", Uu, [
        Ve("img", {
          src: pt($u),
          class: jn({ striked: I.value === "not-supported" }),
          onClick: ot(L, ["prevent"])
        }, null, 10, Bu)
      ])) : He("", !0),
      v.value === "recording" ? (Q(), le("div", Ku, [
        Ve("img", {
          src: pt(Ru),
          onClick: ot(ce, ["prevent"])
        }, null, 8, Wu)
      ])) : He("", !0)
    ], 4));
  }
}), Zu = /* @__PURE__ */ un(Gu, [["__scopeId", "data-v-a0869e1c"]]), Yu = /* @__PURE__ */ Tt({
  __name: "App",
  setup(e, { expose: t }) {
    const n = cn(), o = ae([]);
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
      Oe(wu, {
        class: "list",
        list: o.value,
        onUpdateEntryValue: s
      }, null, 8, ["list"]),
      Oe(Zu, { onAddEntry: r })
    ]));
  }
}), qu = /* @__PURE__ */ un(Yu, [["__scopeId", "data-v-f4907ab0"]]);
function Ju(e) {
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
function zu(e) {
  const t = {}, n = it(e) ? R(e) : e;
  for (const o in n)
    if (Object.prototype.hasOwnProperty.call(n, o)) {
      const s = n[o];
      X(s) ? t[o] = s.value : t[o] = s;
    }
  return t;
}
const Qu = (e, t, n) => {
  Ju(t);
  const o = cu(qu);
  o.use(hu, t);
  const r = o.mount(e);
  return n && Vt(
    () => zu(r),
    () => {
      n(r);
    },
    {
      deep: !0,
      // Überwacht auch Änderungen an verschachtelten Properties
      immediate: !0
      // Optional: Ruft das Callback sofort beim Mount auf
    }
  ), { app: o, state: r };
};
export {
  Qu as initializeAndMount
};
