function Bn(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Ao } = Object.prototype, { getPrototypeOf: yr } = Object, { iterator: Xe, toStringTag: Un } = Symbol, Ze = /* @__PURE__ */ ((e) => (t) => {
  const r = Ao.call(t);
  return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), ae = (e) => (e = e.toLowerCase(), (t) => Ze(t) === e), Ye = (e) => (t) => typeof t === e, { isArray: Ne } = Array, Le = Ye("undefined");
function Me(e) {
  return e !== null && !Le(e) && e.constructor !== null && !Le(e.constructor) && Q(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Ln = ae("ArrayBuffer");
function Ro(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Ln(e.buffer), t;
}
const Po = Ye("string"), Q = Ye("function"), Mn = Ye("number"), $e = (e) => e !== null && typeof e == "object", To = (e) => e === !0 || e === !1, Ge = (e) => {
  if (Ze(e) !== "object")
    return !1;
  const t = yr(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Un in e) && !(Xe in e);
}, xo = (e) => {
  if (!$e(e) || Me(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, Co = ae("Date"), Fo = ae("File"), _o = ae("Blob"), No = ae("FileList"), qo = (e) => $e(e) && Q(e.pipe), Do = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || Q(e.append) && ((t = Ze(e)) === "formdata" || // detect form-data instance
  t === "object" && Q(e.toString) && e.toString() === "[object FormData]"));
}, Io = ae("URLSearchParams"), [Bo, Uo, Lo, Mo] = ["ReadableStream", "Request", "Response", "Headers"].map(ae), $o = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function ke(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let n, o;
  if (typeof e != "object" && (e = [e]), Ne(e))
    for (n = 0, o = e.length; n < o; n++)
      t.call(null, e[n], n, e);
  else {
    if (Me(e))
      return;
    const a = r ? Object.getOwnPropertyNames(e) : Object.keys(e), i = a.length;
    let u;
    for (n = 0; n < i; n++)
      u = a[n], t.call(null, e[u], u, e);
  }
}
function $n(e, t) {
  if (Me(e))
    return null;
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length, o;
  for (; n-- > 0; )
    if (o = r[n], t === o.toLowerCase())
      return o;
  return null;
}
const Oe = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, kn = (e) => !Le(e) && e !== Oe;
function ur() {
  const { caseless: e } = kn(this) && this || {}, t = {}, r = (n, o) => {
    const a = e && $n(t, o) || o;
    Ge(t[a]) && Ge(n) ? t[a] = ur(t[a], n) : Ge(n) ? t[a] = ur({}, n) : Ne(n) ? t[a] = n.slice() : t[a] = n;
  };
  for (let n = 0, o = arguments.length; n < o; n++)
    arguments[n] && ke(arguments[n], r);
  return t;
}
const ko = (e, t, r, { allOwnKeys: n } = {}) => (ke(t, (o, a) => {
  r && Q(o) ? e[a] = Bn(o, r) : e[a] = o;
}, { allOwnKeys: n }), e), jo = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Ho = (e, t, r, n) => {
  e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), r && Object.assign(e.prototype, r);
}, Wo = (e, t, r, n) => {
  let o, a, i;
  const u = {};
  if (t = t || {}, e == null) return t;
  do {
    for (o = Object.getOwnPropertyNames(e), a = o.length; a-- > 0; )
      i = o[a], (!n || n(i, e, t)) && !u[i] && (t[i] = e[i], u[i] = !0);
    e = r !== !1 && yr(e);
  } while (e && (!r || r(e, t)) && e !== Object.prototype);
  return t;
}, zo = (e, t, r) => {
  e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
  const n = e.indexOf(t, r);
  return n !== -1 && n === r;
}, Go = (e) => {
  if (!e) return null;
  if (Ne(e)) return e;
  let t = e.length;
  if (!Mn(t)) return null;
  const r = new Array(t);
  for (; t-- > 0; )
    r[t] = e[t];
  return r;
}, Vo = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && yr(Uint8Array)), Jo = (e, t) => {
  const n = (e && e[Xe]).call(e);
  let o;
  for (; (o = n.next()) && !o.done; ) {
    const a = o.value;
    t.call(e, a[0], a[1]);
  }
}, Ko = (e, t) => {
  let r;
  const n = [];
  for (; (r = e.exec(t)) !== null; )
    n.push(r);
  return n;
}, Qo = ae("HTMLFormElement"), Xo = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(r, n, o) {
    return n.toUpperCase() + o;
  }
), Fr = (({ hasOwnProperty: e }) => (t, r) => e.call(t, r))(Object.prototype), Zo = ae("RegExp"), jn = (e, t) => {
  const r = Object.getOwnPropertyDescriptors(e), n = {};
  ke(r, (o, a) => {
    let i;
    (i = t(o, a, e)) !== !1 && (n[a] = i || o);
  }), Object.defineProperties(e, n);
}, Yo = (e) => {
  jn(e, (t, r) => {
    if (Q(e) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const n = e[r];
    if (Q(n)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, ei = (e, t) => {
  const r = {}, n = (o) => {
    o.forEach((a) => {
      r[a] = !0;
    });
  };
  return Ne(e) ? n(e) : n(String(e).split(t)), r;
}, ti = () => {
}, ri = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function ni(e) {
  return !!(e && Q(e.append) && e[Un] === "FormData" && e[Xe]);
}
const oi = (e) => {
  const t = new Array(10), r = (n, o) => {
    if ($e(n)) {
      if (t.indexOf(n) >= 0)
        return;
      if (Me(n))
        return n;
      if (!("toJSON" in n)) {
        t[o] = n;
        const a = Ne(n) ? [] : {};
        return ke(n, (i, u) => {
          const b = r(i, o + 1);
          !Le(b) && (a[u] = b);
        }), t[o] = void 0, a;
      }
    }
    return n;
  };
  return r(e, 0);
}, ii = ae("AsyncFunction"), ai = (e) => e && ($e(e) || Q(e)) && Q(e.then) && Q(e.catch), Hn = ((e, t) => e ? setImmediate : t ? ((r, n) => (Oe.addEventListener("message", ({ source: o, data: a }) => {
  o === Oe && a === r && n.length && n.shift()();
}, !1), (o) => {
  n.push(o), Oe.postMessage(r, "*");
}))(`axios@${Math.random()}`, []) : (r) => setTimeout(r))(
  typeof setImmediate == "function",
  Q(Oe.postMessage)
), si = typeof queueMicrotask < "u" ? queueMicrotask.bind(Oe) : typeof process < "u" && process.nextTick || Hn, ui = (e) => e != null && Q(e[Xe]), y = {
  isArray: Ne,
  isArrayBuffer: Ln,
  isBuffer: Me,
  isFormData: Do,
  isArrayBufferView: Ro,
  isString: Po,
  isNumber: Mn,
  isBoolean: To,
  isObject: $e,
  isPlainObject: Ge,
  isEmptyObject: xo,
  isReadableStream: Bo,
  isRequest: Uo,
  isResponse: Lo,
  isHeaders: Mo,
  isUndefined: Le,
  isDate: Co,
  isFile: Fo,
  isBlob: _o,
  isRegExp: Zo,
  isFunction: Q,
  isStream: qo,
  isURLSearchParams: Io,
  isTypedArray: Vo,
  isFileList: No,
  forEach: ke,
  merge: ur,
  extend: ko,
  trim: $o,
  stripBOM: jo,
  inherits: Ho,
  toFlatObject: Wo,
  kindOf: Ze,
  kindOfTest: ae,
  endsWith: zo,
  toArray: Go,
  forEachEntry: Jo,
  matchAll: Ko,
  isHTMLForm: Qo,
  hasOwnProperty: Fr,
  hasOwnProp: Fr,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: jn,
  freezeMethods: Yo,
  toObjectSet: ei,
  toCamelCase: Xo,
  noop: ti,
  toFiniteNumber: ri,
  findKey: $n,
  global: Oe,
  isContextDefined: kn,
  isSpecCompliantForm: ni,
  toJSONObject: oi,
  isAsyncFn: ii,
  isThenable: ai,
  setImmediate: Hn,
  asap: si,
  isIterable: ui
};
function C(e, t, r, n, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), n && (this.request = n), o && (this.response = o, this.status = o.status ? o.status : null);
}
y.inherits(C, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: y.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const Wn = C.prototype, zn = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  zn[e] = { value: e };
});
Object.defineProperties(C, zn);
Object.defineProperty(Wn, "isAxiosError", { value: !0 });
C.from = (e, t, r, n, o, a) => {
  const i = Object.create(Wn);
  return y.toFlatObject(e, i, function(b) {
    return b !== Error.prototype;
  }, (u) => u !== "isAxiosError"), C.call(i, e.message, t, r, n, o), i.cause = e, i.name = e.name, a && Object.assign(i, a), i;
};
const li = null;
function lr(e) {
  return y.isPlainObject(e) || y.isArray(e);
}
function Gn(e) {
  return y.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function _r(e, t, r) {
  return e ? e.concat(t).map(function(o, a) {
    return o = Gn(o), !r && a ? "[" + o + "]" : o;
  }).join(r ? "." : "") : t;
}
function ci(e) {
  return y.isArray(e) && !e.some(lr);
}
const fi = y.toFlatObject(y, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function et(e, t, r) {
  if (!y.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), r = y.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(S, s) {
    return !y.isUndefined(s[S]);
  });
  const n = r.metaTokens, o = r.visitor || l, a = r.dots, i = r.indexes, b = (r.Blob || typeof Blob < "u" && Blob) && y.isSpecCompliantForm(t);
  if (!y.isFunction(o))
    throw new TypeError("visitor must be a function");
  function f(d) {
    if (d === null) return "";
    if (y.isDate(d))
      return d.toISOString();
    if (y.isBoolean(d))
      return d.toString();
    if (!b && y.isBlob(d))
      throw new C("Blob is not supported. Use a Buffer instead.");
    return y.isArrayBuffer(d) || y.isTypedArray(d) ? b && typeof Blob == "function" ? new Blob([d]) : Buffer.from(d) : d;
  }
  function l(d, S, s) {
    let h = d;
    if (d && !s && typeof d == "object") {
      if (y.endsWith(S, "{}"))
        S = n ? S : S.slice(0, -2), d = JSON.stringify(d);
      else if (y.isArray(d) && ci(d) || (y.isFileList(d) || y.endsWith(S, "[]")) && (h = y.toArray(d)))
        return S = Gn(S), h.forEach(function(E, O) {
          !(y.isUndefined(E) || E === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? _r([S], O, a) : i === null ? S : S + "[]",
            f(E)
          );
        }), !1;
    }
    return lr(d) ? !0 : (t.append(_r(s, S, a), f(d)), !1);
  }
  const g = [], w = Object.assign(fi, {
    defaultVisitor: l,
    convertValue: f,
    isVisitable: lr
  });
  function v(d, S) {
    if (!y.isUndefined(d)) {
      if (g.indexOf(d) !== -1)
        throw Error("Circular reference detected in " + S.join("."));
      g.push(d), y.forEach(d, function(h, m) {
        (!(y.isUndefined(h) || h === null) && o.call(
          t,
          h,
          y.isString(m) ? m.trim() : m,
          S,
          w
        )) === !0 && v(h, S ? S.concat(m) : [m]);
      }), g.pop();
    }
  }
  if (!y.isObject(e))
    throw new TypeError("data must be an object");
  return v(e), t;
}
function Nr(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(n) {
    return t[n];
  });
}
function hr(e, t) {
  this._pairs = [], e && et(e, this, t);
}
const Vn = hr.prototype;
Vn.append = function(t, r) {
  this._pairs.push([t, r]);
};
Vn.toString = function(t) {
  const r = t ? function(n) {
    return t.call(this, n, Nr);
  } : Nr;
  return this._pairs.map(function(o) {
    return r(o[0]) + "=" + r(o[1]);
  }, "").join("&");
};
function pi(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Jn(e, t, r) {
  if (!t)
    return e;
  const n = r && r.encode || pi;
  y.isFunction(r) && (r = {
    serialize: r
  });
  const o = r && r.serialize;
  let a;
  if (o ? a = o(t, r) : a = y.isURLSearchParams(t) ? t.toString() : new hr(t, r).toString(n), a) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)), e += (e.indexOf("?") === -1 ? "?" : "&") + a;
  }
  return e;
}
class qr {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, r, n) {
    return this.handlers.push({
      fulfilled: t,
      rejected: r,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    y.forEach(this.handlers, function(n) {
      n !== null && t(n);
    });
  }
}
const Kn = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, di = typeof URLSearchParams < "u" ? URLSearchParams : hr, yi = typeof FormData < "u" ? FormData : null, hi = typeof Blob < "u" ? Blob : null, mi = {
  isBrowser: !0,
  classes: {
    URLSearchParams: di,
    FormData: yi,
    Blob: hi
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, mr = typeof window < "u" && typeof document < "u", cr = typeof navigator == "object" && navigator || void 0, vi = mr && (!cr || ["ReactNative", "NativeScript", "NS"].indexOf(cr.product) < 0), gi = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", bi = mr && window.location.href || "http://localhost", wi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: mr,
  hasStandardBrowserEnv: vi,
  hasStandardBrowserWebWorkerEnv: gi,
  navigator: cr,
  origin: bi
}, Symbol.toStringTag, { value: "Module" })), J = {
  ...wi,
  ...mi
};
function Si(e, t) {
  return et(e, new J.classes.URLSearchParams(), {
    visitor: function(r, n, o, a) {
      return J.isNode && y.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : a.defaultVisitor.apply(this, arguments);
    },
    ...t
  });
}
function Ei(e) {
  return y.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Oi(e) {
  const t = {}, r = Object.keys(e);
  let n;
  const o = r.length;
  let a;
  for (n = 0; n < o; n++)
    a = r[n], t[a] = e[a];
  return t;
}
function Qn(e) {
  function t(r, n, o, a) {
    let i = r[a++];
    if (i === "__proto__") return !0;
    const u = Number.isFinite(+i), b = a >= r.length;
    return i = !i && y.isArray(o) ? o.length : i, b ? (y.hasOwnProp(o, i) ? o[i] = [o[i], n] : o[i] = n, !u) : ((!o[i] || !y.isObject(o[i])) && (o[i] = []), t(r, n, o[i], a) && y.isArray(o[i]) && (o[i] = Oi(o[i])), !u);
  }
  if (y.isFormData(e) && y.isFunction(e.entries)) {
    const r = {};
    return y.forEachEntry(e, (n, o) => {
      t(Ei(n), o, r, 0);
    }), r;
  }
  return null;
}
function Ai(e, t, r) {
  if (y.isString(e))
    try {
      return (t || JSON.parse)(e), y.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(e);
}
const je = {
  transitional: Kn,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, r) {
    const n = r.getContentType() || "", o = n.indexOf("application/json") > -1, a = y.isObject(t);
    if (a && y.isHTMLForm(t) && (t = new FormData(t)), y.isFormData(t))
      return o ? JSON.stringify(Qn(t)) : t;
    if (y.isArrayBuffer(t) || y.isBuffer(t) || y.isStream(t) || y.isFile(t) || y.isBlob(t) || y.isReadableStream(t))
      return t;
    if (y.isArrayBufferView(t))
      return t.buffer;
    if (y.isURLSearchParams(t))
      return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let u;
    if (a) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return Si(t, this.formSerializer).toString();
      if ((u = y.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
        const b = this.env && this.env.FormData;
        return et(
          u ? { "files[]": t } : t,
          b && new b(),
          this.formSerializer
        );
      }
    }
    return a || o ? (r.setContentType("application/json", !1), Ai(t)) : t;
  }],
  transformResponse: [function(t) {
    const r = this.transitional || je.transitional, n = r && r.forcedJSONParsing, o = this.responseType === "json";
    if (y.isResponse(t) || y.isReadableStream(t))
      return t;
    if (t && y.isString(t) && (n && !this.responseType || o)) {
      const i = !(r && r.silentJSONParsing) && o;
      try {
        return JSON.parse(t);
      } catch (u) {
        if (i)
          throw u.name === "SyntaxError" ? C.from(u, C.ERR_BAD_RESPONSE, this, null, this.response) : u;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: J.classes.FormData,
    Blob: J.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
y.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  je.headers[e] = {};
});
const Ri = y.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), Pi = (e) => {
  const t = {};
  let r, n, o;
  return e && e.split(`
`).forEach(function(i) {
    o = i.indexOf(":"), r = i.substring(0, o).trim().toLowerCase(), n = i.substring(o + 1).trim(), !(!r || t[r] && Ri[r]) && (r === "set-cookie" ? t[r] ? t[r].push(n) : t[r] = [n] : t[r] = t[r] ? t[r] + ", " + n : n);
  }), t;
}, Dr = Symbol("internals");
function Ue(e) {
  return e && String(e).trim().toLowerCase();
}
function Ve(e) {
  return e === !1 || e == null ? e : y.isArray(e) ? e.map(Ve) : String(e);
}
function Ti(e) {
  const t = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(e); )
    t[n[1]] = n[2];
  return t;
}
const xi = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function yt(e, t, r, n, o) {
  if (y.isFunction(n))
    return n.call(this, t, r);
  if (o && (t = r), !!y.isString(t)) {
    if (y.isString(n))
      return t.indexOf(n) !== -1;
    if (y.isRegExp(n))
      return n.test(t);
  }
}
function Ci(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function Fi(e, t) {
  const r = y.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + r, {
      value: function(o, a, i) {
        return this[n].call(this, t, o, a, i);
      },
      configurable: !0
    });
  });
}
let X = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, r, n) {
    const o = this;
    function a(u, b, f) {
      const l = Ue(b);
      if (!l)
        throw new Error("header name must be a non-empty string");
      const g = y.findKey(o, l);
      (!g || o[g] === void 0 || f === !0 || f === void 0 && o[g] !== !1) && (o[g || b] = Ve(u));
    }
    const i = (u, b) => y.forEach(u, (f, l) => a(f, l, b));
    if (y.isPlainObject(t) || t instanceof this.constructor)
      i(t, r);
    else if (y.isString(t) && (t = t.trim()) && !xi(t))
      i(Pi(t), r);
    else if (y.isObject(t) && y.isIterable(t)) {
      let u = {}, b, f;
      for (const l of t) {
        if (!y.isArray(l))
          throw TypeError("Object iterator must return a key-value pair");
        u[f = l[0]] = (b = u[f]) ? y.isArray(b) ? [...b, l[1]] : [b, l[1]] : l[1];
      }
      i(u, r);
    } else
      t != null && a(r, t, n);
    return this;
  }
  get(t, r) {
    if (t = Ue(t), t) {
      const n = y.findKey(this, t);
      if (n) {
        const o = this[n];
        if (!r)
          return o;
        if (r === !0)
          return Ti(o);
        if (y.isFunction(r))
          return r.call(this, o, n);
        if (y.isRegExp(r))
          return r.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, r) {
    if (t = Ue(t), t) {
      const n = y.findKey(this, t);
      return !!(n && this[n] !== void 0 && (!r || yt(this, this[n], n, r)));
    }
    return !1;
  }
  delete(t, r) {
    const n = this;
    let o = !1;
    function a(i) {
      if (i = Ue(i), i) {
        const u = y.findKey(n, i);
        u && (!r || yt(n, n[u], u, r)) && (delete n[u], o = !0);
      }
    }
    return y.isArray(t) ? t.forEach(a) : a(t), o;
  }
  clear(t) {
    const r = Object.keys(this);
    let n = r.length, o = !1;
    for (; n--; ) {
      const a = r[n];
      (!t || yt(this, this[a], a, t, !0)) && (delete this[a], o = !0);
    }
    return o;
  }
  normalize(t) {
    const r = this, n = {};
    return y.forEach(this, (o, a) => {
      const i = y.findKey(n, a);
      if (i) {
        r[i] = Ve(o), delete r[a];
        return;
      }
      const u = t ? Ci(a) : String(a).trim();
      u !== a && delete r[a], r[u] = Ve(o), n[u] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const r = /* @__PURE__ */ Object.create(null);
    return y.forEach(this, (n, o) => {
      n != null && n !== !1 && (r[o] = t && y.isArray(n) ? n.join(", ") : n);
    }), r;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, r]) => t + ": " + r).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...r) {
    const n = new this(t);
    return r.forEach((o) => n.set(o)), n;
  }
  static accessor(t) {
    const n = (this[Dr] = this[Dr] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function a(i) {
      const u = Ue(i);
      n[u] || (Fi(o, i), n[u] = !0);
    }
    return y.isArray(t) ? t.forEach(a) : a(t), this;
  }
};
X.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
y.reduceDescriptors(X.prototype, ({ value: e }, t) => {
  let r = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(n) {
      this[r] = n;
    }
  };
});
y.freezeMethods(X);
function ht(e, t) {
  const r = this || je, n = t || r, o = X.from(n.headers);
  let a = n.data;
  return y.forEach(e, function(u) {
    a = u.call(r, a, o.normalize(), t ? t.status : void 0);
  }), o.normalize(), a;
}
function Xn(e) {
  return !!(e && e.__CANCEL__);
}
function qe(e, t, r) {
  C.call(this, e ?? "canceled", C.ERR_CANCELED, t, r), this.name = "CanceledError";
}
y.inherits(qe, C, {
  __CANCEL__: !0
});
function Zn(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? e(r) : t(new C(
    "Request failed with status code " + r.status,
    [C.ERR_BAD_REQUEST, C.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
function _i(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Ni(e, t) {
  e = e || 10;
  const r = new Array(e), n = new Array(e);
  let o = 0, a = 0, i;
  return t = t !== void 0 ? t : 1e3, function(b) {
    const f = Date.now(), l = n[a];
    i || (i = f), r[o] = b, n[o] = f;
    let g = a, w = 0;
    for (; g !== o; )
      w += r[g++], g = g % e;
    if (o = (o + 1) % e, o === a && (a = (a + 1) % e), f - i < t)
      return;
    const v = l && f - l;
    return v ? Math.round(w * 1e3 / v) : void 0;
  };
}
function qi(e, t) {
  let r = 0, n = 1e3 / t, o, a;
  const i = (f, l = Date.now()) => {
    r = l, o = null, a && (clearTimeout(a), a = null), e(...f);
  };
  return [(...f) => {
    const l = Date.now(), g = l - r;
    g >= n ? i(f, l) : (o = f, a || (a = setTimeout(() => {
      a = null, i(o);
    }, n - g)));
  }, () => o && i(o)];
}
const Ke = (e, t, r = 3) => {
  let n = 0;
  const o = Ni(50, 250);
  return qi((a) => {
    const i = a.loaded, u = a.lengthComputable ? a.total : void 0, b = i - n, f = o(b), l = i <= u;
    n = i;
    const g = {
      loaded: i,
      total: u,
      progress: u ? i / u : void 0,
      bytes: b,
      rate: f || void 0,
      estimated: f && u && l ? (u - i) / f : void 0,
      event: a,
      lengthComputable: u != null,
      [t ? "download" : "upload"]: !0
    };
    e(g);
  }, r);
}, Ir = (e, t) => {
  const r = e != null;
  return [(n) => t[0]({
    lengthComputable: r,
    total: e,
    loaded: n
  }), t[1]];
}, Br = (e) => (...t) => y.asap(() => e(...t)), Di = J.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (r) => (r = new URL(r, J.origin), e.protocol === r.protocol && e.host === r.host && (t || e.port === r.port)))(
  new URL(J.origin),
  J.navigator && /(msie|trident)/i.test(J.navigator.userAgent)
) : () => !0, Ii = J.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, r, n, o, a) {
      const i = [e + "=" + encodeURIComponent(t)];
      y.isNumber(r) && i.push("expires=" + new Date(r).toGMTString()), y.isString(n) && i.push("path=" + n), y.isString(o) && i.push("domain=" + o), a === !0 && i.push("secure"), document.cookie = i.join("; ");
    },
    read(e) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function Bi(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Ui(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Yn(e, t, r) {
  let n = !Bi(t);
  return e && (n || r == !1) ? Ui(e, t) : t;
}
const Ur = (e) => e instanceof X ? { ...e } : e;
function Re(e, t) {
  t = t || {};
  const r = {};
  function n(f, l, g, w) {
    return y.isPlainObject(f) && y.isPlainObject(l) ? y.merge.call({ caseless: w }, f, l) : y.isPlainObject(l) ? y.merge({}, l) : y.isArray(l) ? l.slice() : l;
  }
  function o(f, l, g, w) {
    if (y.isUndefined(l)) {
      if (!y.isUndefined(f))
        return n(void 0, f, g, w);
    } else return n(f, l, g, w);
  }
  function a(f, l) {
    if (!y.isUndefined(l))
      return n(void 0, l);
  }
  function i(f, l) {
    if (y.isUndefined(l)) {
      if (!y.isUndefined(f))
        return n(void 0, f);
    } else return n(void 0, l);
  }
  function u(f, l, g) {
    if (g in t)
      return n(f, l);
    if (g in e)
      return n(void 0, f);
  }
  const b = {
    url: a,
    method: a,
    data: a,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: u,
    headers: (f, l, g) => o(Ur(f), Ur(l), g, !0)
  };
  return y.forEach(Object.keys({ ...e, ...t }), function(l) {
    const g = b[l] || o, w = g(e[l], t[l], l);
    y.isUndefined(w) && g !== u || (r[l] = w);
  }), r;
}
const eo = (e) => {
  const t = Re({}, e);
  let { data: r, withXSRFToken: n, xsrfHeaderName: o, xsrfCookieName: a, headers: i, auth: u } = t;
  t.headers = i = X.from(i), t.url = Jn(Yn(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), u && i.set(
    "Authorization",
    "Basic " + btoa((u.username || "") + ":" + (u.password ? unescape(encodeURIComponent(u.password)) : ""))
  );
  let b;
  if (y.isFormData(r)) {
    if (J.hasStandardBrowserEnv || J.hasStandardBrowserWebWorkerEnv)
      i.setContentType(void 0);
    else if ((b = i.getContentType()) !== !1) {
      const [f, ...l] = b ? b.split(";").map((g) => g.trim()).filter(Boolean) : [];
      i.setContentType([f || "multipart/form-data", ...l].join("; "));
    }
  }
  if (J.hasStandardBrowserEnv && (n && y.isFunction(n) && (n = n(t)), n || n !== !1 && Di(t.url))) {
    const f = o && a && Ii.read(a);
    f && i.set(o, f);
  }
  return t;
}, Li = typeof XMLHttpRequest < "u", Mi = Li && function(e) {
  return new Promise(function(r, n) {
    const o = eo(e);
    let a = o.data;
    const i = X.from(o.headers).normalize();
    let { responseType: u, onUploadProgress: b, onDownloadProgress: f } = o, l, g, w, v, d;
    function S() {
      v && v(), d && d(), o.cancelToken && o.cancelToken.unsubscribe(l), o.signal && o.signal.removeEventListener("abort", l);
    }
    let s = new XMLHttpRequest();
    s.open(o.method.toUpperCase(), o.url, !0), s.timeout = o.timeout;
    function h() {
      if (!s)
        return;
      const E = X.from(
        "getAllResponseHeaders" in s && s.getAllResponseHeaders()
      ), A = {
        data: !u || u === "text" || u === "json" ? s.responseText : s.response,
        status: s.status,
        statusText: s.statusText,
        headers: E,
        config: e,
        request: s
      };
      Zn(function(P) {
        r(P), S();
      }, function(P) {
        n(P), S();
      }, A), s = null;
    }
    "onloadend" in s ? s.onloadend = h : s.onreadystatechange = function() {
      !s || s.readyState !== 4 || s.status === 0 && !(s.responseURL && s.responseURL.indexOf("file:") === 0) || setTimeout(h);
    }, s.onabort = function() {
      s && (n(new C("Request aborted", C.ECONNABORTED, e, s)), s = null);
    }, s.onerror = function() {
      n(new C("Network Error", C.ERR_NETWORK, e, s)), s = null;
    }, s.ontimeout = function() {
      let O = o.timeout ? "timeout of " + o.timeout + "ms exceeded" : "timeout exceeded";
      const A = o.transitional || Kn;
      o.timeoutErrorMessage && (O = o.timeoutErrorMessage), n(new C(
        O,
        A.clarifyTimeoutError ? C.ETIMEDOUT : C.ECONNABORTED,
        e,
        s
      )), s = null;
    }, a === void 0 && i.setContentType(null), "setRequestHeader" in s && y.forEach(i.toJSON(), function(O, A) {
      s.setRequestHeader(A, O);
    }), y.isUndefined(o.withCredentials) || (s.withCredentials = !!o.withCredentials), u && u !== "json" && (s.responseType = o.responseType), f && ([w, d] = Ke(f, !0), s.addEventListener("progress", w)), b && s.upload && ([g, v] = Ke(b), s.upload.addEventListener("progress", g), s.upload.addEventListener("loadend", v)), (o.cancelToken || o.signal) && (l = (E) => {
      s && (n(!E || E.type ? new qe(null, e, s) : E), s.abort(), s = null);
    }, o.cancelToken && o.cancelToken.subscribe(l), o.signal && (o.signal.aborted ? l() : o.signal.addEventListener("abort", l)));
    const m = _i(o.url);
    if (m && J.protocols.indexOf(m) === -1) {
      n(new C("Unsupported protocol " + m + ":", C.ERR_BAD_REQUEST, e));
      return;
    }
    s.send(a || null);
  });
}, $i = (e, t) => {
  const { length: r } = e = e ? e.filter(Boolean) : [];
  if (t || r) {
    let n = new AbortController(), o;
    const a = function(f) {
      if (!o) {
        o = !0, u();
        const l = f instanceof Error ? f : this.reason;
        n.abort(l instanceof C ? l : new qe(l instanceof Error ? l.message : l));
      }
    };
    let i = t && setTimeout(() => {
      i = null, a(new C(`timeout ${t} of ms exceeded`, C.ETIMEDOUT));
    }, t);
    const u = () => {
      e && (i && clearTimeout(i), i = null, e.forEach((f) => {
        f.unsubscribe ? f.unsubscribe(a) : f.removeEventListener("abort", a);
      }), e = null);
    };
    e.forEach((f) => f.addEventListener("abort", a));
    const { signal: b } = n;
    return b.unsubscribe = () => y.asap(u), b;
  }
}, ki = function* (e, t) {
  let r = e.byteLength;
  if (r < t) {
    yield e;
    return;
  }
  let n = 0, o;
  for (; n < r; )
    o = n + t, yield e.slice(n, o), n = o;
}, ji = async function* (e, t) {
  for await (const r of Hi(e))
    yield* ki(r, t);
}, Hi = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: r, value: n } = await t.read();
      if (r)
        break;
      yield n;
    }
  } finally {
    await t.cancel();
  }
}, Lr = (e, t, r, n) => {
  const o = ji(e, t);
  let a = 0, i, u = (b) => {
    i || (i = !0, n && n(b));
  };
  return new ReadableStream({
    async pull(b) {
      try {
        const { done: f, value: l } = await o.next();
        if (f) {
          u(), b.close();
          return;
        }
        let g = l.byteLength;
        if (r) {
          let w = a += g;
          r(w);
        }
        b.enqueue(new Uint8Array(l));
      } catch (f) {
        throw u(f), f;
      }
    },
    cancel(b) {
      return u(b), o.return();
    }
  }, {
    highWaterMark: 2
  });
}, tt = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", to = tt && typeof ReadableStream == "function", Wi = tt && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), ro = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, zi = to && ro(() => {
  let e = !1;
  const t = new Request(J.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), Mr = 64 * 1024, fr = to && ro(() => y.isReadableStream(new Response("").body)), Qe = {
  stream: fr && ((e) => e.body)
};
tt && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !Qe[t] && (Qe[t] = y.isFunction(e[t]) ? (r) => r[t]() : (r, n) => {
      throw new C(`Response type '${t}' is not supported`, C.ERR_NOT_SUPPORT, n);
    });
  });
})(new Response());
const Gi = async (e) => {
  if (e == null)
    return 0;
  if (y.isBlob(e))
    return e.size;
  if (y.isSpecCompliantForm(e))
    return (await new Request(J.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (y.isArrayBufferView(e) || y.isArrayBuffer(e))
    return e.byteLength;
  if (y.isURLSearchParams(e) && (e = e + ""), y.isString(e))
    return (await Wi(e)).byteLength;
}, Vi = async (e, t) => {
  const r = y.toFiniteNumber(e.getContentLength());
  return r ?? Gi(t);
}, Ji = tt && (async (e) => {
  let {
    url: t,
    method: r,
    data: n,
    signal: o,
    cancelToken: a,
    timeout: i,
    onDownloadProgress: u,
    onUploadProgress: b,
    responseType: f,
    headers: l,
    withCredentials: g = "same-origin",
    fetchOptions: w
  } = eo(e);
  f = f ? (f + "").toLowerCase() : "text";
  let v = $i([o, a && a.toAbortSignal()], i), d;
  const S = v && v.unsubscribe && (() => {
    v.unsubscribe();
  });
  let s;
  try {
    if (b && zi && r !== "get" && r !== "head" && (s = await Vi(l, n)) !== 0) {
      let A = new Request(t, {
        method: "POST",
        body: n,
        duplex: "half"
      }), R;
      if (y.isFormData(n) && (R = A.headers.get("content-type")) && l.setContentType(R), A.body) {
        const [P, x] = Ir(
          s,
          Ke(Br(b))
        );
        n = Lr(A.body, Mr, P, x);
      }
    }
    y.isString(g) || (g = g ? "include" : "omit");
    const h = "credentials" in Request.prototype;
    d = new Request(t, {
      ...w,
      signal: v,
      method: r.toUpperCase(),
      headers: l.normalize().toJSON(),
      body: n,
      duplex: "half",
      credentials: h ? g : void 0
    });
    let m = await fetch(d, w);
    const E = fr && (f === "stream" || f === "response");
    if (fr && (u || E && S)) {
      const A = {};
      ["status", "statusText", "headers"].forEach((q) => {
        A[q] = m[q];
      });
      const R = y.toFiniteNumber(m.headers.get("content-length")), [P, x] = u && Ir(
        R,
        Ke(Br(u), !0)
      ) || [];
      m = new Response(
        Lr(m.body, Mr, P, () => {
          x && x(), S && S();
        }),
        A
      );
    }
    f = f || "text";
    let O = await Qe[y.findKey(Qe, f) || "text"](m, e);
    return !E && S && S(), await new Promise((A, R) => {
      Zn(A, R, {
        data: O,
        headers: X.from(m.headers),
        status: m.status,
        statusText: m.statusText,
        config: e,
        request: d
      });
    });
  } catch (h) {
    throw S && S(), h && h.name === "TypeError" && /Load failed|fetch/i.test(h.message) ? Object.assign(
      new C("Network Error", C.ERR_NETWORK, e, d),
      {
        cause: h.cause || h
      }
    ) : C.from(h, h && h.code, e, d);
  }
}), pr = {
  http: li,
  xhr: Mi,
  fetch: Ji
};
y.forEach(pr, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const $r = (e) => `- ${e}`, Ki = (e) => y.isFunction(e) || e === null || e === !1, no = {
  getAdapter: (e) => {
    e = y.isArray(e) ? e : [e];
    const { length: t } = e;
    let r, n;
    const o = {};
    for (let a = 0; a < t; a++) {
      r = e[a];
      let i;
      if (n = r, !Ki(r) && (n = pr[(i = String(r)).toLowerCase()], n === void 0))
        throw new C(`Unknown adapter '${i}'`);
      if (n)
        break;
      o[i || "#" + a] = n;
    }
    if (!n) {
      const a = Object.entries(o).map(
        ([u, b]) => `adapter ${u} ` + (b === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let i = t ? a.length > 1 ? `since :
` + a.map($r).join(`
`) : " " + $r(a[0]) : "as no adapter specified";
      throw new C(
        "There is no suitable adapter to dispatch the request " + i,
        "ERR_NOT_SUPPORT"
      );
    }
    return n;
  },
  adapters: pr
};
function mt(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new qe(null, e);
}
function kr(e) {
  return mt(e), e.headers = X.from(e.headers), e.data = ht.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), no.getAdapter(e.adapter || je.adapter)(e).then(function(n) {
    return mt(e), n.data = ht.call(
      e,
      e.transformResponse,
      n
    ), n.headers = X.from(n.headers), n;
  }, function(n) {
    return Xn(n) || (mt(e), n && n.response && (n.response.data = ht.call(
      e,
      e.transformResponse,
      n.response
    ), n.response.headers = X.from(n.response.headers))), Promise.reject(n);
  });
}
const oo = "1.11.0", rt = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  rt[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const jr = {};
rt.transitional = function(t, r, n) {
  function o(a, i) {
    return "[Axios v" + oo + "] Transitional option '" + a + "'" + i + (n ? ". " + n : "");
  }
  return (a, i, u) => {
    if (t === !1)
      throw new C(
        o(i, " has been removed" + (r ? " in " + r : "")),
        C.ERR_DEPRECATED
      );
    return r && !jr[i] && (jr[i] = !0, console.warn(
      o(
        i,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(a, i, u) : !0;
  };
};
rt.spelling = function(t) {
  return (r, n) => (console.warn(`${n} is likely a misspelling of ${t}`), !0);
};
function Qi(e, t, r) {
  if (typeof e != "object")
    throw new C("options must be an object", C.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let o = n.length;
  for (; o-- > 0; ) {
    const a = n[o], i = t[a];
    if (i) {
      const u = e[a], b = u === void 0 || i(u, a, e);
      if (b !== !0)
        throw new C("option " + a + " must be " + b, C.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new C("Unknown option " + a, C.ERR_BAD_OPTION);
  }
}
const Je = {
  assertOptions: Qi,
  validators: rt
}, se = Je.validators;
let Ae = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new qr(),
      response: new qr()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, r) {
    try {
      return await this._request(t, r);
    } catch (n) {
      if (n instanceof Error) {
        let o = {};
        Error.captureStackTrace ? Error.captureStackTrace(o) : o = new Error();
        const a = o.stack ? o.stack.replace(/^.+\n/, "") : "";
        try {
          n.stack ? a && !String(n.stack).endsWith(a.replace(/^.+\n.+\n/, "")) && (n.stack += `
` + a) : n.stack = a;
        } catch {
        }
      }
      throw n;
    }
  }
  _request(t, r) {
    typeof t == "string" ? (r = r || {}, r.url = t) : r = t || {}, r = Re(this.defaults, r);
    const { transitional: n, paramsSerializer: o, headers: a } = r;
    n !== void 0 && Je.assertOptions(n, {
      silentJSONParsing: se.transitional(se.boolean),
      forcedJSONParsing: se.transitional(se.boolean),
      clarifyTimeoutError: se.transitional(se.boolean)
    }, !1), o != null && (y.isFunction(o) ? r.paramsSerializer = {
      serialize: o
    } : Je.assertOptions(o, {
      encode: se.function,
      serialize: se.function
    }, !0)), r.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? r.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : r.allowAbsoluteUrls = !0), Je.assertOptions(r, {
      baseUrl: se.spelling("baseURL"),
      withXsrfToken: se.spelling("withXSRFToken")
    }, !0), r.method = (r.method || this.defaults.method || "get").toLowerCase();
    let i = a && y.merge(
      a.common,
      a[r.method]
    );
    a && y.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (d) => {
        delete a[d];
      }
    ), r.headers = X.concat(i, a);
    const u = [];
    let b = !0;
    this.interceptors.request.forEach(function(S) {
      typeof S.runWhen == "function" && S.runWhen(r) === !1 || (b = b && S.synchronous, u.unshift(S.fulfilled, S.rejected));
    });
    const f = [];
    this.interceptors.response.forEach(function(S) {
      f.push(S.fulfilled, S.rejected);
    });
    let l, g = 0, w;
    if (!b) {
      const d = [kr.bind(this), void 0];
      for (d.unshift(...u), d.push(...f), w = d.length, l = Promise.resolve(r); g < w; )
        l = l.then(d[g++], d[g++]);
      return l;
    }
    w = u.length;
    let v = r;
    for (g = 0; g < w; ) {
      const d = u[g++], S = u[g++];
      try {
        v = d(v);
      } catch (s) {
        S.call(this, s);
        break;
      }
    }
    try {
      l = kr.call(this, v);
    } catch (d) {
      return Promise.reject(d);
    }
    for (g = 0, w = f.length; g < w; )
      l = l.then(f[g++], f[g++]);
    return l;
  }
  getUri(t) {
    t = Re(this.defaults, t);
    const r = Yn(t.baseURL, t.url, t.allowAbsoluteUrls);
    return Jn(r, t.params, t.paramsSerializer);
  }
};
y.forEach(["delete", "get", "head", "options"], function(t) {
  Ae.prototype[t] = function(r, n) {
    return this.request(Re(n || {}, {
      method: t,
      url: r,
      data: (n || {}).data
    }));
  };
});
y.forEach(["post", "put", "patch"], function(t) {
  function r(n) {
    return function(a, i, u) {
      return this.request(Re(u || {}, {
        method: t,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: a,
        data: i
      }));
    };
  }
  Ae.prototype[t] = r(), Ae.prototype[t + "Form"] = r(!0);
});
let Xi = class io {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function(a) {
      r = a;
    });
    const n = this;
    this.promise.then((o) => {
      if (!n._listeners) return;
      let a = n._listeners.length;
      for (; a-- > 0; )
        n._listeners[a](o);
      n._listeners = null;
    }), this.promise.then = (o) => {
      let a;
      const i = new Promise((u) => {
        n.subscribe(u), a = u;
      }).then(o);
      return i.cancel = function() {
        n.unsubscribe(a);
      }, i;
    }, t(function(a, i, u) {
      n.reason || (n.reason = new qe(a, i, u), r(n.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const r = this._listeners.indexOf(t);
    r !== -1 && this._listeners.splice(r, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), r = (n) => {
      t.abort(n);
    };
    return this.subscribe(r), t.signal.unsubscribe = () => this.unsubscribe(r), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new io(function(o) {
        t = o;
      }),
      cancel: t
    };
  }
};
function Zi(e) {
  return function(r) {
    return e.apply(null, r);
  };
}
function Yi(e) {
  return y.isObject(e) && e.isAxiosError === !0;
}
const dr = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(dr).forEach(([e, t]) => {
  dr[t] = e;
});
function ao(e) {
  const t = new Ae(e), r = Bn(Ae.prototype.request, t);
  return y.extend(r, Ae.prototype, t, { allOwnKeys: !0 }), y.extend(r, t, null, { allOwnKeys: !0 }), r.create = function(o) {
    return ao(Re(e, o));
  }, r;
}
const $ = ao(je);
$.Axios = Ae;
$.CanceledError = qe;
$.CancelToken = Xi;
$.isCancel = Xn;
$.VERSION = oo;
$.toFormData = et;
$.AxiosError = C;
$.Cancel = $.CanceledError;
$.all = function(t) {
  return Promise.all(t);
};
$.spread = Zi;
$.isAxiosError = Yi;
$.mergeConfig = Re;
$.AxiosHeaders = X;
$.formToJSON = (e) => Qn(y.isHTMLForm(e) ? new FormData(e) : e);
$.getAdapter = no.getAdapter;
$.HttpStatusCode = dr;
$.default = $;
const {
  Axios: Ma,
  AxiosError: $a,
  CanceledError: ka,
  isCancel: ja,
  CancelToken: Ha,
  VERSION: Wa,
  all: za,
  Cancel: Ga,
  isAxiosError: Va,
  spread: Ja,
  toFormData: Ka,
  AxiosHeaders: Qa,
  HttpStatusCode: Xa,
  formToJSON: Za,
  getAdapter: Ya,
  mergeConfig: es
} = $;
var Hr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ea(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function ta(e) {
  if (Object.prototype.hasOwnProperty.call(e, "__esModule")) return e;
  var t = e.default;
  if (typeof t == "function") {
    var r = function n() {
      var o = !1;
      try {
        o = this instanceof n;
      } catch {
      }
      return o ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    r.prototype = t.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var o = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(r, n, o.get ? o : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), r;
}
var vt, Wr;
function De() {
  return Wr || (Wr = 1, vt = TypeError), vt;
}
const ra = {}, na = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ra
}, Symbol.toStringTag, { value: "Module" })), oa = /* @__PURE__ */ ta(na);
var gt, zr;
function nt() {
  if (zr) return gt;
  zr = 1;
  var e = typeof Map == "function" && Map.prototype, t = Object.getOwnPropertyDescriptor && e ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, r = e && t && typeof t.get == "function" ? t.get : null, n = e && Map.prototype.forEach, o = typeof Set == "function" && Set.prototype, a = Object.getOwnPropertyDescriptor && o ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, i = o && a && typeof a.get == "function" ? a.get : null, u = o && Set.prototype.forEach, b = typeof WeakMap == "function" && WeakMap.prototype, f = b ? WeakMap.prototype.has : null, l = typeof WeakSet == "function" && WeakSet.prototype, g = l ? WeakSet.prototype.has : null, w = typeof WeakRef == "function" && WeakRef.prototype, v = w ? WeakRef.prototype.deref : null, d = Boolean.prototype.valueOf, S = Object.prototype.toString, s = Function.prototype.toString, h = String.prototype.match, m = String.prototype.slice, E = String.prototype.replace, O = String.prototype.toUpperCase, A = String.prototype.toLowerCase, R = RegExp.prototype.test, P = Array.prototype.concat, x = Array.prototype.join, q = Array.prototype.slice, F = Math.floor, B = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, T = Object.getOwnPropertySymbols, z = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, j = typeof Symbol == "function" && typeof Symbol.iterator == "object", Z = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === j || !0) ? Symbol.toStringTag : null, ue = Object.prototype.propertyIsEnumerable, le = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(c) {
    return c.__proto__;
  } : null);
  function N(c, p) {
    if (c === 1 / 0 || c === -1 / 0 || c !== c || c && c > -1e3 && c < 1e3 || R.call(/e/, p))
      return p;
    var I = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof c == "number") {
      var L = c < 0 ? -F(-c) : F(c);
      if (L !== c) {
        var M = String(L), _ = m.call(p, M.length + 1);
        return E.call(M, I, "$&_") + "." + E.call(E.call(_, /([0-9]{3})/g, "$&_"), /_$/, "");
      }
    }
    return E.call(p, I, "$&_");
  }
  var Y = oa, ce = Y.custom, we = G(ce) ? ce : null, pe = {
    __proto__: null,
    double: '"',
    single: "'"
  }, de = {
    __proto__: null,
    double: /(["\\])/g,
    single: /(['\\])/g
  };
  gt = function c(p, I, L, M) {
    var _ = I || {};
    if (K(_, "quoteStyle") && !K(pe, _.quoteStyle))
      throw new TypeError('option "quoteStyle" must be "single" or "double"');
    if (K(_, "maxStringLength") && (typeof _.maxStringLength == "number" ? _.maxStringLength < 0 && _.maxStringLength !== 1 / 0 : _.maxStringLength !== null))
      throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    var ge = K(_, "customInspect") ? _.customInspect : !0;
    if (typeof ge != "boolean" && ge !== "symbol")
      throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
    if (K(_, "indent") && _.indent !== null && _.indent !== "	" && !(parseInt(_.indent, 10) === _.indent && _.indent > 0))
      throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    if (K(_, "numericSeparator") && typeof _.numericSeparator != "boolean")
      throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    var Se = _.numericSeparator;
    if (typeof p > "u")
      return "undefined";
    if (p === null)
      return "null";
    if (typeof p == "boolean")
      return p ? "true" : "false";
    if (typeof p == "string")
      return wr(p, _);
    if (typeof p == "number") {
      if (p === 0)
        return 1 / 0 / p > 0 ? "0" : "-0";
      var ee = String(p);
      return Se ? N(p, ee) : ee;
    }
    if (typeof p == "bigint") {
      var be = String(p) + "n";
      return Se ? N(p, be) : be;
    }
    var st = typeof _.depth > "u" ? 5 : _.depth;
    if (typeof L > "u" && (L = 0), L >= st && st > 0 && typeof p == "object")
      return he(p) ? "[Array]" : "[Object]";
    var Fe = So(_, L);
    if (typeof M > "u")
      M = [];
    else if (ve(M, p) >= 0)
      return "[Circular]";
    function ie(_e, ze, Oo) {
      if (ze && (M = q.call(M), M.push(ze)), Oo) {
        var Cr = {
          depth: _.depth
        };
        return K(_, "quoteStyle") && (Cr.quoteStyle = _.quoteStyle), c(_e, Cr, L + 1, M);
      }
      return c(_e, _, L + 1, M);
    }
    if (typeof p == "function" && !W(p)) {
      var Er = Pe(p), Or = He(p, ie);
      return "[Function" + (Er ? ": " + Er : " (anonymous)") + "]" + (Or.length > 0 ? " { " + x.call(Or, ", ") + " }" : "");
    }
    if (G(p)) {
      var Ar = j ? E.call(String(p), /^(Symbol\(.*\))_[^)]*$/, "$1") : z.call(p);
      return typeof p == "object" && !j ? Ie(Ar) : Ar;
    }
    if (go(p)) {
      for (var Be = "<" + A.call(String(p.nodeName)), ut = p.attributes || [], We = 0; We < ut.length; We++)
        Be += " " + ut[We].name + "=" + ye(fe(ut[We].value), "double", _);
      return Be += ">", p.childNodes && p.childNodes.length && (Be += "..."), Be += "</" + A.call(String(p.nodeName)) + ">", Be;
    }
    if (he(p)) {
      if (p.length === 0)
        return "[]";
      var lt = He(p, ie);
      return Fe && !wo(lt) ? "[" + at(lt, Fe) + "]" : "[ " + x.call(lt, ", ") + " ]";
    }
    if (D(p)) {
      var ct = He(p, ie);
      return !("cause" in Error.prototype) && "cause" in p && !ue.call(p, "cause") ? "{ [" + String(p) + "] " + x.call(P.call("[cause]: " + ie(p.cause), ct), ", ") + " }" : ct.length === 0 ? "[" + String(p) + "]" : "{ [" + String(p) + "] " + x.call(ct, ", ") + " }";
    }
    if (typeof p == "object" && ge) {
      if (we && typeof p[we] == "function" && Y)
        return Y(p, { depth: st - L });
      if (ge !== "symbol" && typeof p.inspect == "function")
        return p.inspect();
    }
    if (oe(p)) {
      var Rr = [];
      return n && n.call(p, function(_e, ze) {
        Rr.push(ie(ze, p, !0) + " => " + ie(_e, p));
      }), Sr("Map", r.call(p), Rr, Fe);
    }
    if (Ce(p)) {
      var Pr = [];
      return u && u.call(p, function(_e) {
        Pr.push(ie(_e, p));
      }), Sr("Set", i.call(p), Pr, Fe);
    }
    if (Te(p))
      return it("WeakMap");
    if (vo(p))
      return it("WeakSet");
    if (xe(p))
      return it("WeakRef");
    if (U(p))
      return Ie(ie(Number(p)));
    if (re(p))
      return Ie(ie(B.call(p)));
    if (H(p))
      return Ie(d.call(p));
    if (k(p))
      return Ie(ie(String(p)));
    if (typeof window < "u" && p === window)
      return "{ [object Window] }";
    if (typeof globalThis < "u" && p === globalThis || typeof Hr < "u" && p === Hr)
      return "{ [object globalThis] }";
    if (!me(p) && !W(p)) {
      var ft = He(p, ie), Tr = le ? le(p) === Object.prototype : p instanceof Object || p.constructor === Object, pt = p instanceof Object ? "" : "null prototype", xr = !Tr && Z && Object(p) === p && Z in p ? m.call(ne(p), 8, -1) : pt ? "Object" : "", Eo = Tr || typeof p.constructor != "function" ? "" : p.constructor.name ? p.constructor.name + " " : "", dt = Eo + (xr || pt ? "[" + x.call(P.call([], xr || [], pt || []), ": ") + "] " : "");
      return ft.length === 0 ? dt + "{}" : Fe ? dt + "{" + at(ft, Fe) + "}" : dt + "{ " + x.call(ft, ", ") + " }";
    }
    return String(p);
  };
  function ye(c, p, I) {
    var L = I.quoteStyle || p, M = pe[L];
    return M + c + M;
  }
  function fe(c) {
    return E.call(String(c), /"/g, "&quot;");
  }
  function te(c) {
    return !Z || !(typeof c == "object" && (Z in c || typeof c[Z] < "u"));
  }
  function he(c) {
    return ne(c) === "[object Array]" && te(c);
  }
  function me(c) {
    return ne(c) === "[object Date]" && te(c);
  }
  function W(c) {
    return ne(c) === "[object RegExp]" && te(c);
  }
  function D(c) {
    return ne(c) === "[object Error]" && te(c);
  }
  function k(c) {
    return ne(c) === "[object String]" && te(c);
  }
  function U(c) {
    return ne(c) === "[object Number]" && te(c);
  }
  function H(c) {
    return ne(c) === "[object Boolean]" && te(c);
  }
  function G(c) {
    if (j)
      return c && typeof c == "object" && c instanceof Symbol;
    if (typeof c == "symbol")
      return !0;
    if (!c || typeof c != "object" || !z)
      return !1;
    try {
      return z.call(c), !0;
    } catch {
    }
    return !1;
  }
  function re(c) {
    if (!c || typeof c != "object" || !B)
      return !1;
    try {
      return B.call(c), !0;
    } catch {
    }
    return !1;
  }
  var V = Object.prototype.hasOwnProperty || function(c) {
    return c in this;
  };
  function K(c, p) {
    return V.call(c, p);
  }
  function ne(c) {
    return S.call(c);
  }
  function Pe(c) {
    if (c.name)
      return c.name;
    var p = h.call(s.call(c), /^function\s*([\w$]+)/);
    return p ? p[1] : null;
  }
  function ve(c, p) {
    if (c.indexOf)
      return c.indexOf(p);
    for (var I = 0, L = c.length; I < L; I++)
      if (c[I] === p)
        return I;
    return -1;
  }
  function oe(c) {
    if (!r || !c || typeof c != "object")
      return !1;
    try {
      r.call(c);
      try {
        i.call(c);
      } catch {
        return !0;
      }
      return c instanceof Map;
    } catch {
    }
    return !1;
  }
  function Te(c) {
    if (!f || !c || typeof c != "object")
      return !1;
    try {
      f.call(c, f);
      try {
        g.call(c, g);
      } catch {
        return !0;
      }
      return c instanceof WeakMap;
    } catch {
    }
    return !1;
  }
  function xe(c) {
    if (!v || !c || typeof c != "object")
      return !1;
    try {
      return v.call(c), !0;
    } catch {
    }
    return !1;
  }
  function Ce(c) {
    if (!i || !c || typeof c != "object")
      return !1;
    try {
      i.call(c);
      try {
        r.call(c);
      } catch {
        return !0;
      }
      return c instanceof Set;
    } catch {
    }
    return !1;
  }
  function vo(c) {
    if (!g || !c || typeof c != "object")
      return !1;
    try {
      g.call(c, g);
      try {
        f.call(c, f);
      } catch {
        return !0;
      }
      return c instanceof WeakSet;
    } catch {
    }
    return !1;
  }
  function go(c) {
    return !c || typeof c != "object" ? !1 : typeof HTMLElement < "u" && c instanceof HTMLElement ? !0 : typeof c.nodeName == "string" && typeof c.getAttribute == "function";
  }
  function wr(c, p) {
    if (c.length > p.maxStringLength) {
      var I = c.length - p.maxStringLength, L = "... " + I + " more character" + (I > 1 ? "s" : "");
      return wr(m.call(c, 0, p.maxStringLength), p) + L;
    }
    var M = de[p.quoteStyle || "single"];
    M.lastIndex = 0;
    var _ = E.call(E.call(c, M, "\\$1"), /[\x00-\x1f]/g, bo);
    return ye(_, "single", p);
  }
  function bo(c) {
    var p = c.charCodeAt(0), I = {
      8: "b",
      9: "t",
      10: "n",
      12: "f",
      13: "r"
    }[p];
    return I ? "\\" + I : "\\x" + (p < 16 ? "0" : "") + O.call(p.toString(16));
  }
  function Ie(c) {
    return "Object(" + c + ")";
  }
  function it(c) {
    return c + " { ? }";
  }
  function Sr(c, p, I, L) {
    var M = L ? at(I, L) : x.call(I, ", ");
    return c + " (" + p + ") {" + M + "}";
  }
  function wo(c) {
    for (var p = 0; p < c.length; p++)
      if (ve(c[p], `
`) >= 0)
        return !1;
    return !0;
  }
  function So(c, p) {
    var I;
    if (c.indent === "	")
      I = "	";
    else if (typeof c.indent == "number" && c.indent > 0)
      I = x.call(Array(c.indent + 1), " ");
    else
      return null;
    return {
      base: I,
      prev: x.call(Array(p + 1), I)
    };
  }
  function at(c, p) {
    if (c.length === 0)
      return "";
    var I = `
` + p.prev + p.base;
    return I + x.call(c, "," + I) + `
` + p.prev;
  }
  function He(c, p) {
    var I = he(c), L = [];
    if (I) {
      L.length = c.length;
      for (var M = 0; M < c.length; M++)
        L[M] = K(c, M) ? p(c[M], c) : "";
    }
    var _ = typeof T == "function" ? T(c) : [], ge;
    if (j) {
      ge = {};
      for (var Se = 0; Se < _.length; Se++)
        ge["$" + _[Se]] = _[Se];
    }
    for (var ee in c)
      K(c, ee) && (I && String(Number(ee)) === ee && ee < c.length || j && ge["$" + ee] instanceof Symbol || (R.call(/[^\w$]/, ee) ? L.push(p(ee, c) + ": " + p(c[ee], c)) : L.push(ee + ": " + p(c[ee], c))));
    if (typeof T == "function")
      for (var be = 0; be < _.length; be++)
        ue.call(c, _[be]) && L.push("[" + p(_[be]) + "]: " + p(c[_[be]], c));
    return L;
  }
  return gt;
}
var bt, Gr;
function ia() {
  if (Gr) return bt;
  Gr = 1;
  var e = /* @__PURE__ */ nt(), t = /* @__PURE__ */ De(), r = function(u, b, f) {
    for (var l = u, g; (g = l.next) != null; l = g)
      if (g.key === b)
        return l.next = g.next, f || (g.next = /** @type {NonNullable<typeof list.next>} */
        u.next, u.next = g), g;
  }, n = function(u, b) {
    if (u) {
      var f = r(u, b);
      return f && f.value;
    }
  }, o = function(u, b, f) {
    var l = r(u, b);
    l ? l.value = f : u.next = /** @type {import('./list.d.ts').ListNode<typeof value, typeof key>} */
    {
      // eslint-disable-line no-param-reassign, no-extra-parens
      key: b,
      next: u.next,
      value: f
    };
  }, a = function(u, b) {
    return u ? !!r(u, b) : !1;
  }, i = function(u, b) {
    if (u)
      return r(u, b, !0);
  };
  return bt = function() {
    var b, f = {
      assert: function(l) {
        if (!f.has(l))
          throw new t("Side channel does not contain " + e(l));
      },
      delete: function(l) {
        var g = b && b.next, w = i(b, l);
        return w && g && g === w && (b = void 0), !!w;
      },
      get: function(l) {
        return n(b, l);
      },
      has: function(l) {
        return a(b, l);
      },
      set: function(l, g) {
        b || (b = {
          next: void 0
        }), o(
          /** @type {NonNullable<typeof $o>} */
          b,
          l,
          g
        );
      }
    };
    return f;
  }, bt;
}
var wt, Vr;
function so() {
  return Vr || (Vr = 1, wt = Object), wt;
}
var St, Jr;
function aa() {
  return Jr || (Jr = 1, St = Error), St;
}
var Et, Kr;
function sa() {
  return Kr || (Kr = 1, Et = EvalError), Et;
}
var Ot, Qr;
function ua() {
  return Qr || (Qr = 1, Ot = RangeError), Ot;
}
var At, Xr;
function la() {
  return Xr || (Xr = 1, At = ReferenceError), At;
}
var Rt, Zr;
function ca() {
  return Zr || (Zr = 1, Rt = SyntaxError), Rt;
}
var Pt, Yr;
function fa() {
  return Yr || (Yr = 1, Pt = URIError), Pt;
}
var Tt, en;
function pa() {
  return en || (en = 1, Tt = Math.abs), Tt;
}
var xt, tn;
function da() {
  return tn || (tn = 1, xt = Math.floor), xt;
}
var Ct, rn;
function ya() {
  return rn || (rn = 1, Ct = Math.max), Ct;
}
var Ft, nn;
function ha() {
  return nn || (nn = 1, Ft = Math.min), Ft;
}
var _t, on;
function ma() {
  return on || (on = 1, _t = Math.pow), _t;
}
var Nt, an;
function va() {
  return an || (an = 1, Nt = Math.round), Nt;
}
var qt, sn;
function ga() {
  return sn || (sn = 1, qt = Number.isNaN || function(t) {
    return t !== t;
  }), qt;
}
var Dt, un;
function ba() {
  if (un) return Dt;
  un = 1;
  var e = /* @__PURE__ */ ga();
  return Dt = function(r) {
    return e(r) || r === 0 ? r : r < 0 ? -1 : 1;
  }, Dt;
}
var It, ln;
function wa() {
  return ln || (ln = 1, It = Object.getOwnPropertyDescriptor), It;
}
var Bt, cn;
function uo() {
  if (cn) return Bt;
  cn = 1;
  var e = /* @__PURE__ */ wa();
  if (e)
    try {
      e([], "length");
    } catch {
      e = null;
    }
  return Bt = e, Bt;
}
var Ut, fn;
function Sa() {
  if (fn) return Ut;
  fn = 1;
  var e = Object.defineProperty || !1;
  if (e)
    try {
      e({}, "a", { value: 1 });
    } catch {
      e = !1;
    }
  return Ut = e, Ut;
}
var Lt, pn;
function Ea() {
  return pn || (pn = 1, Lt = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var t = {}, r = Symbol("test"), n = Object(r);
    if (typeof r == "string" || Object.prototype.toString.call(r) !== "[object Symbol]" || Object.prototype.toString.call(n) !== "[object Symbol]")
      return !1;
    var o = 42;
    t[r] = o;
    for (var a in t)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(t).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(t).length !== 0)
      return !1;
    var i = Object.getOwnPropertySymbols(t);
    if (i.length !== 1 || i[0] !== r || !Object.prototype.propertyIsEnumerable.call(t, r))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var u = (
        /** @type {PropertyDescriptor} */
        Object.getOwnPropertyDescriptor(t, r)
      );
      if (u.value !== o || u.enumerable !== !0)
        return !1;
    }
    return !0;
  }), Lt;
}
var Mt, dn;
function Oa() {
  if (dn) return Mt;
  dn = 1;
  var e = typeof Symbol < "u" && Symbol, t = Ea();
  return Mt = function() {
    return typeof e != "function" || typeof Symbol != "function" || typeof e("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : t();
  }, Mt;
}
var $t, yn;
function lo() {
  return yn || (yn = 1, $t = typeof Reflect < "u" && Reflect.getPrototypeOf || null), $t;
}
var kt, hn;
function co() {
  if (hn) return kt;
  hn = 1;
  var e = /* @__PURE__ */ so();
  return kt = e.getPrototypeOf || null, kt;
}
var jt, mn;
function Aa() {
  if (mn) return jt;
  mn = 1;
  var e = "Function.prototype.bind called on incompatible ", t = Object.prototype.toString, r = Math.max, n = "[object Function]", o = function(b, f) {
    for (var l = [], g = 0; g < b.length; g += 1)
      l[g] = b[g];
    for (var w = 0; w < f.length; w += 1)
      l[w + b.length] = f[w];
    return l;
  }, a = function(b, f) {
    for (var l = [], g = f, w = 0; g < b.length; g += 1, w += 1)
      l[w] = b[g];
    return l;
  }, i = function(u, b) {
    for (var f = "", l = 0; l < u.length; l += 1)
      f += u[l], l + 1 < u.length && (f += b);
    return f;
  };
  return jt = function(b) {
    var f = this;
    if (typeof f != "function" || t.apply(f) !== n)
      throw new TypeError(e + f);
    for (var l = a(arguments, 1), g, w = function() {
      if (this instanceof g) {
        var h = f.apply(
          this,
          o(l, arguments)
        );
        return Object(h) === h ? h : this;
      }
      return f.apply(
        b,
        o(l, arguments)
      );
    }, v = r(0, f.length - l.length), d = [], S = 0; S < v; S++)
      d[S] = "$" + S;
    if (g = Function("binder", "return function (" + i(d, ",") + "){ return binder.apply(this,arguments); }")(w), f.prototype) {
      var s = function() {
      };
      s.prototype = f.prototype, g.prototype = new s(), s.prototype = null;
    }
    return g;
  }, jt;
}
var Ht, vn;
function ot() {
  if (vn) return Ht;
  vn = 1;
  var e = Aa();
  return Ht = Function.prototype.bind || e, Ht;
}
var Wt, gn;
function vr() {
  return gn || (gn = 1, Wt = Function.prototype.call), Wt;
}
var zt, bn;
function fo() {
  return bn || (bn = 1, zt = Function.prototype.apply), zt;
}
var Gt, wn;
function Ra() {
  return wn || (wn = 1, Gt = typeof Reflect < "u" && Reflect && Reflect.apply), Gt;
}
var Vt, Sn;
function Pa() {
  if (Sn) return Vt;
  Sn = 1;
  var e = ot(), t = fo(), r = vr(), n = Ra();
  return Vt = n || e.call(r, t), Vt;
}
var Jt, En;
function po() {
  if (En) return Jt;
  En = 1;
  var e = ot(), t = /* @__PURE__ */ De(), r = vr(), n = Pa();
  return Jt = function(a) {
    if (a.length < 1 || typeof a[0] != "function")
      throw new t("a function is required");
    return n(e, r, a);
  }, Jt;
}
var Kt, On;
function Ta() {
  if (On) return Kt;
  On = 1;
  var e = po(), t = /* @__PURE__ */ uo(), r;
  try {
    r = /** @type {{ __proto__?: typeof Array.prototype }} */
    [].__proto__ === Array.prototype;
  } catch (i) {
    if (!i || typeof i != "object" || !("code" in i) || i.code !== "ERR_PROTO_ACCESS")
      throw i;
  }
  var n = !!r && t && t(
    Object.prototype,
    /** @type {keyof typeof Object.prototype} */
    "__proto__"
  ), o = Object, a = o.getPrototypeOf;
  return Kt = n && typeof n.get == "function" ? e([n.get]) : typeof a == "function" ? (
    /** @type {import('./get')} */
    function(u) {
      return a(u == null ? u : o(u));
    }
  ) : !1, Kt;
}
var Qt, An;
function xa() {
  if (An) return Qt;
  An = 1;
  var e = lo(), t = co(), r = /* @__PURE__ */ Ta();
  return Qt = e ? function(o) {
    return e(o);
  } : t ? function(o) {
    if (!o || typeof o != "object" && typeof o != "function")
      throw new TypeError("getProto: not an object");
    return t(o);
  } : r ? function(o) {
    return r(o);
  } : null, Qt;
}
var Xt, Rn;
function Ca() {
  if (Rn) return Xt;
  Rn = 1;
  var e = Function.prototype.call, t = Object.prototype.hasOwnProperty, r = ot();
  return Xt = r.call(e, t), Xt;
}
var Zt, Pn;
function gr() {
  if (Pn) return Zt;
  Pn = 1;
  var e, t = /* @__PURE__ */ so(), r = /* @__PURE__ */ aa(), n = /* @__PURE__ */ sa(), o = /* @__PURE__ */ ua(), a = /* @__PURE__ */ la(), i = /* @__PURE__ */ ca(), u = /* @__PURE__ */ De(), b = /* @__PURE__ */ fa(), f = /* @__PURE__ */ pa(), l = /* @__PURE__ */ da(), g = /* @__PURE__ */ ya(), w = /* @__PURE__ */ ha(), v = /* @__PURE__ */ ma(), d = /* @__PURE__ */ va(), S = /* @__PURE__ */ ba(), s = Function, h = function(W) {
    try {
      return s('"use strict"; return (' + W + ").constructor;")();
    } catch {
    }
  }, m = /* @__PURE__ */ uo(), E = /* @__PURE__ */ Sa(), O = function() {
    throw new u();
  }, A = m ? function() {
    try {
      return arguments.callee, O;
    } catch {
      try {
        return m(arguments, "callee").get;
      } catch {
        return O;
      }
    }
  }() : O, R = Oa()(), P = xa(), x = co(), q = lo(), F = fo(), B = vr(), T = {}, z = typeof Uint8Array > "u" || !P ? e : P(Uint8Array), j = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? e : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? e : ArrayBuffer,
    "%ArrayIteratorPrototype%": R && P ? P([][Symbol.iterator]()) : e,
    "%AsyncFromSyncIteratorPrototype%": e,
    "%AsyncFunction%": T,
    "%AsyncGenerator%": T,
    "%AsyncGeneratorFunction%": T,
    "%AsyncIteratorPrototype%": T,
    "%Atomics%": typeof Atomics > "u" ? e : Atomics,
    "%BigInt%": typeof BigInt > "u" ? e : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? e : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? e : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? e : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": r,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": n,
    "%Float16Array%": typeof Float16Array > "u" ? e : Float16Array,
    "%Float32Array%": typeof Float32Array > "u" ? e : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? e : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? e : FinalizationRegistry,
    "%Function%": s,
    "%GeneratorFunction%": T,
    "%Int8Array%": typeof Int8Array > "u" ? e : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? e : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? e : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": R && P ? P(P([][Symbol.iterator]())) : e,
    "%JSON%": typeof JSON == "object" ? JSON : e,
    "%Map%": typeof Map > "u" ? e : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !R || !P ? e : P((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": t,
    "%Object.getOwnPropertyDescriptor%": m,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? e : Promise,
    "%Proxy%": typeof Proxy > "u" ? e : Proxy,
    "%RangeError%": o,
    "%ReferenceError%": a,
    "%Reflect%": typeof Reflect > "u" ? e : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? e : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !R || !P ? e : P((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? e : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": R && P ? P(""[Symbol.iterator]()) : e,
    "%Symbol%": R ? Symbol : e,
    "%SyntaxError%": i,
    "%ThrowTypeError%": A,
    "%TypedArray%": z,
    "%TypeError%": u,
    "%Uint8Array%": typeof Uint8Array > "u" ? e : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? e : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? e : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? e : Uint32Array,
    "%URIError%": b,
    "%WeakMap%": typeof WeakMap > "u" ? e : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? e : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? e : WeakSet,
    "%Function.prototype.call%": B,
    "%Function.prototype.apply%": F,
    "%Object.defineProperty%": E,
    "%Object.getPrototypeOf%": x,
    "%Math.abs%": f,
    "%Math.floor%": l,
    "%Math.max%": g,
    "%Math.min%": w,
    "%Math.pow%": v,
    "%Math.round%": d,
    "%Math.sign%": S,
    "%Reflect.getPrototypeOf%": q
  };
  if (P)
    try {
      null.error;
    } catch (W) {
      var Z = P(P(W));
      j["%Error.prototype%"] = Z;
    }
  var ue = function W(D) {
    var k;
    if (D === "%AsyncFunction%")
      k = h("async function () {}");
    else if (D === "%GeneratorFunction%")
      k = h("function* () {}");
    else if (D === "%AsyncGeneratorFunction%")
      k = h("async function* () {}");
    else if (D === "%AsyncGenerator%") {
      var U = W("%AsyncGeneratorFunction%");
      U && (k = U.prototype);
    } else if (D === "%AsyncIteratorPrototype%") {
      var H = W("%AsyncGenerator%");
      H && P && (k = P(H.prototype));
    }
    return j[D] = k, k;
  }, le = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  }, N = ot(), Y = /* @__PURE__ */ Ca(), ce = N.call(B, Array.prototype.concat), we = N.call(F, Array.prototype.splice), pe = N.call(B, String.prototype.replace), de = N.call(B, String.prototype.slice), ye = N.call(B, RegExp.prototype.exec), fe = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, te = /\\(\\)?/g, he = function(D) {
    var k = de(D, 0, 1), U = de(D, -1);
    if (k === "%" && U !== "%")
      throw new i("invalid intrinsic syntax, expected closing `%`");
    if (U === "%" && k !== "%")
      throw new i("invalid intrinsic syntax, expected opening `%`");
    var H = [];
    return pe(D, fe, function(G, re, V, K) {
      H[H.length] = V ? pe(K, te, "$1") : re || G;
    }), H;
  }, me = function(D, k) {
    var U = D, H;
    if (Y(le, U) && (H = le[U], U = "%" + H[0] + "%"), Y(j, U)) {
      var G = j[U];
      if (G === T && (G = ue(U)), typeof G > "u" && !k)
        throw new u("intrinsic " + D + " exists, but is not available. Please file an issue!");
      return {
        alias: H,
        name: U,
        value: G
      };
    }
    throw new i("intrinsic " + D + " does not exist!");
  };
  return Zt = function(D, k) {
    if (typeof D != "string" || D.length === 0)
      throw new u("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof k != "boolean")
      throw new u('"allowMissing" argument must be a boolean');
    if (ye(/^%?[^%]*%?$/, D) === null)
      throw new i("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var U = he(D), H = U.length > 0 ? U[0] : "", G = me("%" + H + "%", k), re = G.name, V = G.value, K = !1, ne = G.alias;
    ne && (H = ne[0], we(U, ce([0, 1], ne)));
    for (var Pe = 1, ve = !0; Pe < U.length; Pe += 1) {
      var oe = U[Pe], Te = de(oe, 0, 1), xe = de(oe, -1);
      if ((Te === '"' || Te === "'" || Te === "`" || xe === '"' || xe === "'" || xe === "`") && Te !== xe)
        throw new i("property names with quotes must have matching quotes");
      if ((oe === "constructor" || !ve) && (K = !0), H += "." + oe, re = "%" + H + "%", Y(j, re))
        V = j[re];
      else if (V != null) {
        if (!(oe in V)) {
          if (!k)
            throw new u("base intrinsic for " + D + " exists, but the property is not available.");
          return;
        }
        if (m && Pe + 1 >= U.length) {
          var Ce = m(V, oe);
          ve = !!Ce, ve && "get" in Ce && !("originalValue" in Ce.get) ? V = Ce.get : V = V[oe];
        } else
          ve = Y(V, oe), V = V[oe];
        ve && !K && (j[re] = V);
      }
    }
    return V;
  }, Zt;
}
var Yt, Tn;
function yo() {
  if (Tn) return Yt;
  Tn = 1;
  var e = /* @__PURE__ */ gr(), t = po(), r = t([e("%String.prototype.indexOf%")]);
  return Yt = function(o, a) {
    var i = (
      /** @type {(this: unknown, ...args: unknown[]) => unknown} */
      e(o, !!a)
    );
    return typeof i == "function" && r(o, ".prototype.") > -1 ? t(
      /** @type {const} */
      [i]
    ) : i;
  }, Yt;
}
var er, xn;
function ho() {
  if (xn) return er;
  xn = 1;
  var e = /* @__PURE__ */ gr(), t = /* @__PURE__ */ yo(), r = /* @__PURE__ */ nt(), n = /* @__PURE__ */ De(), o = e("%Map%", !0), a = t("Map.prototype.get", !0), i = t("Map.prototype.set", !0), u = t("Map.prototype.has", !0), b = t("Map.prototype.delete", !0), f = t("Map.prototype.size", !0);
  return er = !!o && /** @type {Exclude<import('.'), false>} */
  function() {
    var g, w = {
      assert: function(v) {
        if (!w.has(v))
          throw new n("Side channel does not contain " + r(v));
      },
      delete: function(v) {
        if (g) {
          var d = b(g, v);
          return f(g) === 0 && (g = void 0), d;
        }
        return !1;
      },
      get: function(v) {
        if (g)
          return a(g, v);
      },
      has: function(v) {
        return g ? u(g, v) : !1;
      },
      set: function(v, d) {
        g || (g = new o()), i(g, v, d);
      }
    };
    return w;
  }, er;
}
var tr, Cn;
function Fa() {
  if (Cn) return tr;
  Cn = 1;
  var e = /* @__PURE__ */ gr(), t = /* @__PURE__ */ yo(), r = /* @__PURE__ */ nt(), n = ho(), o = /* @__PURE__ */ De(), a = e("%WeakMap%", !0), i = t("WeakMap.prototype.get", !0), u = t("WeakMap.prototype.set", !0), b = t("WeakMap.prototype.has", !0), f = t("WeakMap.prototype.delete", !0);
  return tr = a ? (
    /** @type {Exclude<import('.'), false>} */
    function() {
      var g, w, v = {
        assert: function(d) {
          if (!v.has(d))
            throw new o("Side channel does not contain " + r(d));
        },
        delete: function(d) {
          if (a && d && (typeof d == "object" || typeof d == "function")) {
            if (g)
              return f(g, d);
          } else if (n && w)
            return w.delete(d);
          return !1;
        },
        get: function(d) {
          return a && d && (typeof d == "object" || typeof d == "function") && g ? i(g, d) : w && w.get(d);
        },
        has: function(d) {
          return a && d && (typeof d == "object" || typeof d == "function") && g ? b(g, d) : !!w && w.has(d);
        },
        set: function(d, S) {
          a && d && (typeof d == "object" || typeof d == "function") ? (g || (g = new a()), u(g, d, S)) : n && (w || (w = n()), w.set(d, S));
        }
      };
      return v;
    }
  ) : n, tr;
}
var rr, Fn;
function _a() {
  if (Fn) return rr;
  Fn = 1;
  var e = /* @__PURE__ */ De(), t = /* @__PURE__ */ nt(), r = ia(), n = ho(), o = Fa(), a = o || n || r;
  return rr = function() {
    var u, b = {
      assert: function(f) {
        if (!b.has(f))
          throw new e("Side channel does not contain " + t(f));
      },
      delete: function(f) {
        return !!u && u.delete(f);
      },
      get: function(f) {
        return u && u.get(f);
      },
      has: function(f) {
        return !!u && u.has(f);
      },
      set: function(f, l) {
        u || (u = a()), u.set(f, l);
      }
    };
    return b;
  }, rr;
}
var nr, _n;
function br() {
  if (_n) return nr;
  _n = 1;
  var e = String.prototype.replace, t = /%20/g, r = {
    RFC1738: "RFC1738",
    RFC3986: "RFC3986"
  };
  return nr = {
    default: r.RFC3986,
    formatters: {
      RFC1738: function(n) {
        return e.call(n, t, "+");
      },
      RFC3986: function(n) {
        return String(n);
      }
    },
    RFC1738: r.RFC1738,
    RFC3986: r.RFC3986
  }, nr;
}
var or, Nn;
function mo() {
  if (Nn) return or;
  Nn = 1;
  var e = /* @__PURE__ */ br(), t = Object.prototype.hasOwnProperty, r = Array.isArray, n = function() {
    for (var s = [], h = 0; h < 256; ++h)
      s.push("%" + ((h < 16 ? "0" : "") + h.toString(16)).toUpperCase());
    return s;
  }(), o = function(h) {
    for (; h.length > 1; ) {
      var m = h.pop(), E = m.obj[m.prop];
      if (r(E)) {
        for (var O = [], A = 0; A < E.length; ++A)
          typeof E[A] < "u" && O.push(E[A]);
        m.obj[m.prop] = O;
      }
    }
  }, a = function(h, m) {
    for (var E = m && m.plainObjects ? { __proto__: null } : {}, O = 0; O < h.length; ++O)
      typeof h[O] < "u" && (E[O] = h[O]);
    return E;
  }, i = function s(h, m, E) {
    if (!m)
      return h;
    if (typeof m != "object" && typeof m != "function") {
      if (r(h))
        h.push(m);
      else if (h && typeof h == "object")
        (E && (E.plainObjects || E.allowPrototypes) || !t.call(Object.prototype, m)) && (h[m] = !0);
      else
        return [h, m];
      return h;
    }
    if (!h || typeof h != "object")
      return [h].concat(m);
    var O = h;
    return r(h) && !r(m) && (O = a(h, E)), r(h) && r(m) ? (m.forEach(function(A, R) {
      if (t.call(h, R)) {
        var P = h[R];
        P && typeof P == "object" && A && typeof A == "object" ? h[R] = s(P, A, E) : h.push(A);
      } else
        h[R] = A;
    }), h) : Object.keys(m).reduce(function(A, R) {
      var P = m[R];
      return t.call(A, R) ? A[R] = s(A[R], P, E) : A[R] = P, A;
    }, O);
  }, u = function(h, m) {
    return Object.keys(m).reduce(function(E, O) {
      return E[O] = m[O], E;
    }, h);
  }, b = function(s, h, m) {
    var E = s.replace(/\+/g, " ");
    if (m === "iso-8859-1")
      return E.replace(/%[0-9a-f]{2}/gi, unescape);
    try {
      return decodeURIComponent(E);
    } catch {
      return E;
    }
  }, f = 1024, l = function(h, m, E, O, A) {
    if (h.length === 0)
      return h;
    var R = h;
    if (typeof h == "symbol" ? R = Symbol.prototype.toString.call(h) : typeof h != "string" && (R = String(h)), E === "iso-8859-1")
      return escape(R).replace(/%u[0-9a-f]{4}/gi, function(z) {
        return "%26%23" + parseInt(z.slice(2), 16) + "%3B";
      });
    for (var P = "", x = 0; x < R.length; x += f) {
      for (var q = R.length >= f ? R.slice(x, x + f) : R, F = [], B = 0; B < q.length; ++B) {
        var T = q.charCodeAt(B);
        if (T === 45 || T === 46 || T === 95 || T === 126 || T >= 48 && T <= 57 || T >= 65 && T <= 90 || T >= 97 && T <= 122 || A === e.RFC1738 && (T === 40 || T === 41)) {
          F[F.length] = q.charAt(B);
          continue;
        }
        if (T < 128) {
          F[F.length] = n[T];
          continue;
        }
        if (T < 2048) {
          F[F.length] = n[192 | T >> 6] + n[128 | T & 63];
          continue;
        }
        if (T < 55296 || T >= 57344) {
          F[F.length] = n[224 | T >> 12] + n[128 | T >> 6 & 63] + n[128 | T & 63];
          continue;
        }
        B += 1, T = 65536 + ((T & 1023) << 10 | q.charCodeAt(B) & 1023), F[F.length] = n[240 | T >> 18] + n[128 | T >> 12 & 63] + n[128 | T >> 6 & 63] + n[128 | T & 63];
      }
      P += F.join("");
    }
    return P;
  }, g = function(h) {
    for (var m = [{ obj: { o: h }, prop: "o" }], E = [], O = 0; O < m.length; ++O)
      for (var A = m[O], R = A.obj[A.prop], P = Object.keys(R), x = 0; x < P.length; ++x) {
        var q = P[x], F = R[q];
        typeof F == "object" && F !== null && E.indexOf(F) === -1 && (m.push({ obj: R, prop: q }), E.push(F));
      }
    return o(m), h;
  }, w = function(h) {
    return Object.prototype.toString.call(h) === "[object RegExp]";
  }, v = function(h) {
    return !h || typeof h != "object" ? !1 : !!(h.constructor && h.constructor.isBuffer && h.constructor.isBuffer(h));
  }, d = function(h, m) {
    return [].concat(h, m);
  }, S = function(h, m) {
    if (r(h)) {
      for (var E = [], O = 0; O < h.length; O += 1)
        E.push(m(h[O]));
      return E;
    }
    return m(h);
  };
  return or = {
    arrayToObject: a,
    assign: u,
    combine: d,
    compact: g,
    decode: b,
    encode: l,
    isBuffer: v,
    isRegExp: w,
    maybeMap: S,
    merge: i
  }, or;
}
var ir, qn;
function Na() {
  if (qn) return ir;
  qn = 1;
  var e = _a(), t = /* @__PURE__ */ mo(), r = /* @__PURE__ */ br(), n = Object.prototype.hasOwnProperty, o = {
    brackets: function(s) {
      return s + "[]";
    },
    comma: "comma",
    indices: function(s, h) {
      return s + "[" + h + "]";
    },
    repeat: function(s) {
      return s;
    }
  }, a = Array.isArray, i = Array.prototype.push, u = function(S, s) {
    i.apply(S, a(s) ? s : [s]);
  }, b = Date.prototype.toISOString, f = r.default, l = {
    addQueryPrefix: !1,
    allowDots: !1,
    allowEmptyArrays: !1,
    arrayFormat: "indices",
    charset: "utf-8",
    charsetSentinel: !1,
    commaRoundTrip: !1,
    delimiter: "&",
    encode: !0,
    encodeDotInKeys: !1,
    encoder: t.encode,
    encodeValuesOnly: !1,
    filter: void 0,
    format: f,
    formatter: r.formatters[f],
    // deprecated
    indices: !1,
    serializeDate: function(s) {
      return b.call(s);
    },
    skipNulls: !1,
    strictNullHandling: !1
  }, g = function(s) {
    return typeof s == "string" || typeof s == "number" || typeof s == "boolean" || typeof s == "symbol" || typeof s == "bigint";
  }, w = {}, v = function S(s, h, m, E, O, A, R, P, x, q, F, B, T, z, j, Z, ue, le) {
    for (var N = s, Y = le, ce = 0, we = !1; (Y = Y.get(w)) !== void 0 && !we; ) {
      var pe = Y.get(s);
      if (ce += 1, typeof pe < "u") {
        if (pe === ce)
          throw new RangeError("Cyclic object value");
        we = !0;
      }
      typeof Y.get(w) > "u" && (ce = 0);
    }
    if (typeof q == "function" ? N = q(h, N) : N instanceof Date ? N = T(N) : m === "comma" && a(N) && (N = t.maybeMap(N, function(re) {
      return re instanceof Date ? T(re) : re;
    })), N === null) {
      if (A)
        return x && !Z ? x(h, l.encoder, ue, "key", z) : h;
      N = "";
    }
    if (g(N) || t.isBuffer(N)) {
      if (x) {
        var de = Z ? h : x(h, l.encoder, ue, "key", z);
        return [j(de) + "=" + j(x(N, l.encoder, ue, "value", z))];
      }
      return [j(h) + "=" + j(String(N))];
    }
    var ye = [];
    if (typeof N > "u")
      return ye;
    var fe;
    if (m === "comma" && a(N))
      Z && x && (N = t.maybeMap(N, x)), fe = [{ value: N.length > 0 ? N.join(",") || null : void 0 }];
    else if (a(q))
      fe = q;
    else {
      var te = Object.keys(N);
      fe = F ? te.sort(F) : te;
    }
    var he = P ? String(h).replace(/\./g, "%2E") : String(h), me = E && a(N) && N.length === 1 ? he + "[]" : he;
    if (O && a(N) && N.length === 0)
      return me + "[]";
    for (var W = 0; W < fe.length; ++W) {
      var D = fe[W], k = typeof D == "object" && D && typeof D.value < "u" ? D.value : N[D];
      if (!(R && k === null)) {
        var U = B && P ? String(D).replace(/\./g, "%2E") : String(D), H = a(N) ? typeof m == "function" ? m(me, U) : me : me + (B ? "." + U : "[" + U + "]");
        le.set(s, ce);
        var G = e();
        G.set(w, le), u(ye, S(
          k,
          H,
          m,
          E,
          O,
          A,
          R,
          P,
          m === "comma" && Z && a(N) ? null : x,
          q,
          F,
          B,
          T,
          z,
          j,
          Z,
          ue,
          G
        ));
      }
    }
    return ye;
  }, d = function(s) {
    if (!s)
      return l;
    if (typeof s.allowEmptyArrays < "u" && typeof s.allowEmptyArrays != "boolean")
      throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
    if (typeof s.encodeDotInKeys < "u" && typeof s.encodeDotInKeys != "boolean")
      throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
    if (s.encoder !== null && typeof s.encoder < "u" && typeof s.encoder != "function")
      throw new TypeError("Encoder has to be a function.");
    var h = s.charset || l.charset;
    if (typeof s.charset < "u" && s.charset !== "utf-8" && s.charset !== "iso-8859-1")
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    var m = r.default;
    if (typeof s.format < "u") {
      if (!n.call(r.formatters, s.format))
        throw new TypeError("Unknown format option provided.");
      m = s.format;
    }
    var E = r.formatters[m], O = l.filter;
    (typeof s.filter == "function" || a(s.filter)) && (O = s.filter);
    var A;
    if (s.arrayFormat in o ? A = s.arrayFormat : "indices" in s ? A = s.indices ? "indices" : "repeat" : A = l.arrayFormat, "commaRoundTrip" in s && typeof s.commaRoundTrip != "boolean")
      throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
    var R = typeof s.allowDots > "u" ? s.encodeDotInKeys === !0 ? !0 : l.allowDots : !!s.allowDots;
    return {
      addQueryPrefix: typeof s.addQueryPrefix == "boolean" ? s.addQueryPrefix : l.addQueryPrefix,
      allowDots: R,
      allowEmptyArrays: typeof s.allowEmptyArrays == "boolean" ? !!s.allowEmptyArrays : l.allowEmptyArrays,
      arrayFormat: A,
      charset: h,
      charsetSentinel: typeof s.charsetSentinel == "boolean" ? s.charsetSentinel : l.charsetSentinel,
      commaRoundTrip: !!s.commaRoundTrip,
      delimiter: typeof s.delimiter > "u" ? l.delimiter : s.delimiter,
      encode: typeof s.encode == "boolean" ? s.encode : l.encode,
      encodeDotInKeys: typeof s.encodeDotInKeys == "boolean" ? s.encodeDotInKeys : l.encodeDotInKeys,
      encoder: typeof s.encoder == "function" ? s.encoder : l.encoder,
      encodeValuesOnly: typeof s.encodeValuesOnly == "boolean" ? s.encodeValuesOnly : l.encodeValuesOnly,
      filter: O,
      format: m,
      formatter: E,
      serializeDate: typeof s.serializeDate == "function" ? s.serializeDate : l.serializeDate,
      skipNulls: typeof s.skipNulls == "boolean" ? s.skipNulls : l.skipNulls,
      sort: typeof s.sort == "function" ? s.sort : null,
      strictNullHandling: typeof s.strictNullHandling == "boolean" ? s.strictNullHandling : l.strictNullHandling
    };
  };
  return ir = function(S, s) {
    var h = S, m = d(s), E, O;
    typeof m.filter == "function" ? (O = m.filter, h = O("", h)) : a(m.filter) && (O = m.filter, E = O);
    var A = [];
    if (typeof h != "object" || h === null)
      return "";
    var R = o[m.arrayFormat], P = R === "comma" && m.commaRoundTrip;
    E || (E = Object.keys(h)), m.sort && E.sort(m.sort);
    for (var x = e(), q = 0; q < E.length; ++q) {
      var F = E[q], B = h[F];
      m.skipNulls && B === null || u(A, v(
        B,
        F,
        R,
        P,
        m.allowEmptyArrays,
        m.strictNullHandling,
        m.skipNulls,
        m.encodeDotInKeys,
        m.encode ? m.encoder : null,
        m.filter,
        m.sort,
        m.allowDots,
        m.serializeDate,
        m.format,
        m.formatter,
        m.encodeValuesOnly,
        m.charset,
        x
      ));
    }
    var T = A.join(m.delimiter), z = m.addQueryPrefix === !0 ? "?" : "";
    return m.charsetSentinel && (m.charset === "iso-8859-1" ? z += "utf8=%26%2310003%3B&" : z += "utf8=%E2%9C%93&"), T.length > 0 ? z + T : "";
  }, ir;
}
var ar, Dn;
function qa() {
  if (Dn) return ar;
  Dn = 1;
  var e = /* @__PURE__ */ mo(), t = Object.prototype.hasOwnProperty, r = Array.isArray, n = {
    allowDots: !1,
    allowEmptyArrays: !1,
    allowPrototypes: !1,
    allowSparse: !1,
    arrayLimit: 20,
    charset: "utf-8",
    charsetSentinel: !1,
    comma: !1,
    decodeDotInKeys: !1,
    decoder: e.decode,
    delimiter: "&",
    depth: 5,
    duplicates: "combine",
    ignoreQueryPrefix: !1,
    interpretNumericEntities: !1,
    parameterLimit: 1e3,
    parseArrays: !0,
    plainObjects: !1,
    strictDepth: !1,
    strictNullHandling: !1,
    throwOnLimitExceeded: !1
  }, o = function(w) {
    return w.replace(/&#(\d+);/g, function(v, d) {
      return String.fromCharCode(parseInt(d, 10));
    });
  }, a = function(w, v, d) {
    if (w && typeof w == "string" && v.comma && w.indexOf(",") > -1)
      return w.split(",");
    if (v.throwOnLimitExceeded && d >= v.arrayLimit)
      throw new RangeError("Array limit exceeded. Only " + v.arrayLimit + " element" + (v.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
    return w;
  }, i = "utf8=%26%2310003%3B", u = "utf8=%E2%9C%93", b = function(v, d) {
    var S = { __proto__: null }, s = d.ignoreQueryPrefix ? v.replace(/^\?/, "") : v;
    s = s.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    var h = d.parameterLimit === 1 / 0 ? void 0 : d.parameterLimit, m = s.split(
      d.delimiter,
      d.throwOnLimitExceeded ? h + 1 : h
    );
    if (d.throwOnLimitExceeded && m.length > h)
      throw new RangeError("Parameter limit exceeded. Only " + h + " parameter" + (h === 1 ? "" : "s") + " allowed.");
    var E = -1, O, A = d.charset;
    if (d.charsetSentinel)
      for (O = 0; O < m.length; ++O)
        m[O].indexOf("utf8=") === 0 && (m[O] === u ? A = "utf-8" : m[O] === i && (A = "iso-8859-1"), E = O, O = m.length);
    for (O = 0; O < m.length; ++O)
      if (O !== E) {
        var R = m[O], P = R.indexOf("]="), x = P === -1 ? R.indexOf("=") : P + 1, q, F;
        x === -1 ? (q = d.decoder(R, n.decoder, A, "key"), F = d.strictNullHandling ? null : "") : (q = d.decoder(R.slice(0, x), n.decoder, A, "key"), F = e.maybeMap(
          a(
            R.slice(x + 1),
            d,
            r(S[q]) ? S[q].length : 0
          ),
          function(T) {
            return d.decoder(T, n.decoder, A, "value");
          }
        )), F && d.interpretNumericEntities && A === "iso-8859-1" && (F = o(String(F))), R.indexOf("[]=") > -1 && (F = r(F) ? [F] : F);
        var B = t.call(S, q);
        B && d.duplicates === "combine" ? S[q] = e.combine(S[q], F) : (!B || d.duplicates === "last") && (S[q] = F);
      }
    return S;
  }, f = function(w, v, d, S) {
    var s = 0;
    if (w.length > 0 && w[w.length - 1] === "[]") {
      var h = w.slice(0, -1).join("");
      s = Array.isArray(v) && v[h] ? v[h].length : 0;
    }
    for (var m = S ? v : a(v, d, s), E = w.length - 1; E >= 0; --E) {
      var O, A = w[E];
      if (A === "[]" && d.parseArrays)
        O = d.allowEmptyArrays && (m === "" || d.strictNullHandling && m === null) ? [] : e.combine([], m);
      else {
        O = d.plainObjects ? { __proto__: null } : {};
        var R = A.charAt(0) === "[" && A.charAt(A.length - 1) === "]" ? A.slice(1, -1) : A, P = d.decodeDotInKeys ? R.replace(/%2E/g, ".") : R, x = parseInt(P, 10);
        !d.parseArrays && P === "" ? O = { 0: m } : !isNaN(x) && A !== P && String(x) === P && x >= 0 && d.parseArrays && x <= d.arrayLimit ? (O = [], O[x] = m) : P !== "__proto__" && (O[P] = m);
      }
      m = O;
    }
    return m;
  }, l = function(v, d, S, s) {
    if (v) {
      var h = S.allowDots ? v.replace(/\.([^.[]+)/g, "[$1]") : v, m = /(\[[^[\]]*])/, E = /(\[[^[\]]*])/g, O = S.depth > 0 && m.exec(h), A = O ? h.slice(0, O.index) : h, R = [];
      if (A) {
        if (!S.plainObjects && t.call(Object.prototype, A) && !S.allowPrototypes)
          return;
        R.push(A);
      }
      for (var P = 0; S.depth > 0 && (O = E.exec(h)) !== null && P < S.depth; ) {
        if (P += 1, !S.plainObjects && t.call(Object.prototype, O[1].slice(1, -1)) && !S.allowPrototypes)
          return;
        R.push(O[1]);
      }
      if (O) {
        if (S.strictDepth === !0)
          throw new RangeError("Input depth exceeded depth option of " + S.depth + " and strictDepth is true");
        R.push("[" + h.slice(O.index) + "]");
      }
      return f(R, d, S, s);
    }
  }, g = function(v) {
    if (!v)
      return n;
    if (typeof v.allowEmptyArrays < "u" && typeof v.allowEmptyArrays != "boolean")
      throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
    if (typeof v.decodeDotInKeys < "u" && typeof v.decodeDotInKeys != "boolean")
      throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
    if (v.decoder !== null && typeof v.decoder < "u" && typeof v.decoder != "function")
      throw new TypeError("Decoder has to be a function.");
    if (typeof v.charset < "u" && v.charset !== "utf-8" && v.charset !== "iso-8859-1")
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    if (typeof v.throwOnLimitExceeded < "u" && typeof v.throwOnLimitExceeded != "boolean")
      throw new TypeError("`throwOnLimitExceeded` option must be a boolean");
    var d = typeof v.charset > "u" ? n.charset : v.charset, S = typeof v.duplicates > "u" ? n.duplicates : v.duplicates;
    if (S !== "combine" && S !== "first" && S !== "last")
      throw new TypeError("The duplicates option must be either combine, first, or last");
    var s = typeof v.allowDots > "u" ? v.decodeDotInKeys === !0 ? !0 : n.allowDots : !!v.allowDots;
    return {
      allowDots: s,
      allowEmptyArrays: typeof v.allowEmptyArrays == "boolean" ? !!v.allowEmptyArrays : n.allowEmptyArrays,
      allowPrototypes: typeof v.allowPrototypes == "boolean" ? v.allowPrototypes : n.allowPrototypes,
      allowSparse: typeof v.allowSparse == "boolean" ? v.allowSparse : n.allowSparse,
      arrayLimit: typeof v.arrayLimit == "number" ? v.arrayLimit : n.arrayLimit,
      charset: d,
      charsetSentinel: typeof v.charsetSentinel == "boolean" ? v.charsetSentinel : n.charsetSentinel,
      comma: typeof v.comma == "boolean" ? v.comma : n.comma,
      decodeDotInKeys: typeof v.decodeDotInKeys == "boolean" ? v.decodeDotInKeys : n.decodeDotInKeys,
      decoder: typeof v.decoder == "function" ? v.decoder : n.decoder,
      delimiter: typeof v.delimiter == "string" || e.isRegExp(v.delimiter) ? v.delimiter : n.delimiter,
      // eslint-disable-next-line no-implicit-coercion, no-extra-parens
      depth: typeof v.depth == "number" || v.depth === !1 ? +v.depth : n.depth,
      duplicates: S,
      ignoreQueryPrefix: v.ignoreQueryPrefix === !0,
      interpretNumericEntities: typeof v.interpretNumericEntities == "boolean" ? v.interpretNumericEntities : n.interpretNumericEntities,
      parameterLimit: typeof v.parameterLimit == "number" ? v.parameterLimit : n.parameterLimit,
      parseArrays: v.parseArrays !== !1,
      plainObjects: typeof v.plainObjects == "boolean" ? v.plainObjects : n.plainObjects,
      strictDepth: typeof v.strictDepth == "boolean" ? !!v.strictDepth : n.strictDepth,
      strictNullHandling: typeof v.strictNullHandling == "boolean" ? v.strictNullHandling : n.strictNullHandling,
      throwOnLimitExceeded: typeof v.throwOnLimitExceeded == "boolean" ? v.throwOnLimitExceeded : !1
    };
  };
  return ar = function(w, v) {
    var d = g(v);
    if (w === "" || w === null || typeof w > "u")
      return d.plainObjects ? { __proto__: null } : {};
    for (var S = typeof w == "string" ? b(w, d) : w, s = d.plainObjects ? { __proto__: null } : {}, h = Object.keys(S), m = 0; m < h.length; ++m) {
      var E = h[m], O = l(E, S[E], d, typeof w == "string");
      s = e.merge(s, O, d);
    }
    return d.allowSparse === !0 ? s : e.compact(s);
  }, ar;
}
var sr, In;
function Da() {
  if (In) return sr;
  In = 1;
  var e = /* @__PURE__ */ Na(), t = /* @__PURE__ */ qa(), r = /* @__PURE__ */ br();
  return sr = {
    formats: r,
    parse: t,
    stringify: e
  }, sr;
}
var Ia = /* @__PURE__ */ Da();
const Ba = /* @__PURE__ */ ea(Ia), Ee = (e) => typeof e == "function";
class ts {
  axiosInstance;
  options;
  constructor(t) {
    this.options = t, this.axiosInstance = $.create(t), this.setupInterceptors();
  }
  /**
   * @description  create axios instance
   */
  createAxios(t) {
    this.axiosInstance = $.create(t);
  }
  /**
   * get transform options
   */
  getTransform() {
    const { transform: t } = this.options;
    return t;
  }
  /**
   * get instance
   */
  getAxios() {
    return this.axiosInstance;
  }
  /**
   * @description Reconfigure axios
   */
  configAxios(t) {
    this.axiosInstance && this.createAxios(t);
  }
  /**
   * @description set general header
   */
  setHeader(t) {
    this.axiosInstance && Object.assign(this.axiosInstance.defaults.headers, t);
  }
  supportFormData(t) {
    const r = t.headers || this.options.headers;
    return (r?.["Content-Type"] || r?.["content-type"]) !== "application/x-www-form-urlencoded;charset=UTF-8" || !Reflect.has(t, "data") || t.method?.toUpperCase() === "GET" ? t : {
      ...t,
      data: Ba.stringify(t.data, { arrayFormat: "brackets" })
    };
  }
  request(t, r) {
    let n = t;
    const o = this.getTransform(), { requestOptions: a } = this.options, i = { ...a, ...r }, { beforeRequestHook: u, requestCatchHook: b, transformResponseHook: f } = o || {};
    return u && Ee(u) && (n = u(n, i)), n.requestOptions = i, n = this.supportFormData(n), new Promise((l, g) => {
      this.axiosInstance.request(n).then((w) => {
        if (f && Ee(f)) {
          try {
            const v = f(w, i);
            l(v);
          } catch (v) {
            g(v || new Error("request error!"));
          }
          return;
        }
        l(w);
      }).catch((w) => {
        if (b && Ee(b)) {
          g(b(w, i));
          return;
        }
        g(w);
      });
    });
  }
  get(t, r) {
    return this.request({ ...t, method: "GET" }, r);
  }
  post(t, r) {
    return this.request({ ...t, method: "POST" }, r);
  }
  put(t, r) {
    return this.request({ ...t, method: "PUT" }, r);
  }
  delete(t, r) {
    return this.request({ ...t, method: "DELETE" }, r);
  }
  /**
   * @description Interceptor configuration
   */
  setupInterceptors() {
    const t = this.getTransform();
    if (!t) return;
    const { requestInterceptors: r, requestInterceptorsCatch: n, responseInterceptors: o, responseInterceptorsCatch: a } = t;
    this.axiosInstance.interceptors.request.use(
      (i) => {
        const {
          headers: { ignoreCancelToken: u }
        } = i, b = u !== void 0 ? u : this.options.requestOptions?.ignoreCancelToken;
        return console.log(b), r && Ee(r) && (i = r(i, this.options)), i;
      },
      (i) => {
        if (n && Ee(n)) return n(i);
      },
      {
        synchronous: !1,
        runWhen: (i) => (console.log(i), !0)
      }
    ), this.axiosInstance.interceptors.response.use(
      (i) => (o && Ee(o) && (i = o(i)), i),
      (i) => {
        if (a && Ee(a)) return a(i);
      }
    );
  }
}
export {
  ts as VAxios,
  ts as http
};
