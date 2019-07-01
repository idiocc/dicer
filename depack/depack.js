'use strict';
let DEPACK_EXPORT;
const stream = require('stream');
const events = require('events');'use strict';
const {Readable:m, Writable:n} = stream;
const {EventEmitter:p} = events;
/*
 MIT streamsearch by Brian White
 https://github.com/mscdex/streamsearch
*/
function q(a, c, d, e, f) {
  for (var b = 0; b < f; ++b, ++c, ++e) {
    if (a[c] !== d[e]) {
      return !1;
    }
  }
  return !0;
}
function r(a, c) {
  var d = c.length, e = a.h, f = e.length, b = -a.a, g = e[f - 1], l = a.g, k = a.f;
  if (0 > b) {
    for (; 0 > b && b <= d - f;) {
      var h = b + f - 1;
      h = 0 > h ? a.f[a.a + h] : c[h];
      if (h === g && t(a, c, b, f - 1)) {
        return a.a = 0, ++a.c, b > -a.a ? a.emit("info", !0, k, 0, a.a + b) : a.emit("info", !0), a.b = b + f;
      }
      b += l[h];
    }
    if (0 > b) {
      for (; 0 > b && !t(a, c, b, d - b);) {
        b++;
      }
    }
    if (0 <= b) {
      a.emit("info", !1, k, 0, a.a), a.a = 0;
    } else {
      return e = a.a + b, 0 < e && a.emit("info", !1, k, 0, e), k.copy(k, 0, e, a.a - e), a.a -= e, c.copy(k, a.a), a.a += d, a.b = d;
    }
  }
  for (0 <= b && (b += a.b); b <= d - f;) {
    h = c[b + f - 1];
    if (h === g && c[b] === e[0] && q(e, 0, c, b, f - 1)) {
      return ++a.c, 0 < b ? a.emit("info", !0, c, a.b, b) : a.emit("info", !0), a.b = b + f;
    }
    b += l[h];
  }
  if (b < d) {
    for (; b < d && (c[b] !== e[0] || !q(c, b, e, 0, d - b));) {
      ++b;
    }
    b < d && (c.copy(k, 0, b, b + (d - b)), a.a = d - b);
  }
  0 < b && a.emit("info", !1, c, a.b, b < d ? b : d);
  return a.b = d;
}
function t(a, c, d, e) {
  for (var f = 0; f < e;) {
    var b = d + f;
    if ((0 > b ? a.f[a.a + b] : c[b]) === a.h[f]) {
      ++f;
    } else {
      return !1;
    }
  }
  return !0;
}
class u extends p {
  constructor(a) {
    super();
    "string" === typeof a && (a = new Buffer(a));
    var c, d = a.length;
    this.i = Infinity;
    this.c = 0;
    this.g = Array(256);
    this.a = 0;
    this.h = a;
    this.b = 0;
    this.f = new Buffer(d);
    for (c = 0; 256 > c; ++c) {
      this.g[c] = d;
    }
    if (1 <= d) {
      for (c = 0; c < d - 1; ++c) {
        this.g[a[c]] = d - 1 - c;
      }
    }
  }
  push(a, c = 0) {
    Buffer.isBuffer(a) || (a = new Buffer(a, "binary"));
    var d = a.length;
    for (this.b = c; e !== d && this.c < this.i;) {
      var e = r(this, a);
    }
    return e;
  }
}
;class v extends m {
  constructor(a) {
    super(a);
  }
  _read() {
  }
}
;const w = Buffer.from("\r\n\r\n"), x = /\r\n/g, y = /^([^:]+):[ \t]?([\x00-\xFF]+)?$/;
function z(a) {
  a.g = !1;
  a.b = "";
  a.a = {};
  a = a.f;
  a.a = 0;
  a.c = 0;
  a.b = 0;
}
class A extends p {
  constructor(a = {}) {
    super();
    ({maxHeaderPairs:a = 2000} = a);
    this.c = 0;
    this.h = !1;
    this.i = 0;
    this.maxHeaderPairs = a;
    this.b = "";
    this.a = {};
    this.g = !1;
    this.f = new u(w);
    this.f.on("info", (c, d, e, f) => {
      d && !this.h && (81920 < this.c + (f - e) ? (f = 81920 - this.c, this.c = 81920) : this.c += f - e, 81920 === this.c && (this.h = !0), this.b += d.toString("binary", e, f));
      if (c) {
        if (this.b && this.i !== this.maxHeaderPairs) {
          c = this.b.split(x);
          d = c.length;
          f = !1;
          for (let g = 0; g < d; ++g) {
            if (0 !== c[g].length) {
              if ("\t" == c[g][0] || " " == c[g][0]) {
                this.a[b][this.a[b].length - 1] += c[g];
              } else {
                if (e = y.exec(c[g])) {
                  var b = e[1].toLowerCase();
                  e[2] ? void 0 === this.a[b] ? this.a[b] = [e[2]] : this.a[b].push(e[2]) : this.a[b] = [""];
                  if (++this.i === this.maxHeaderPairs) {
                    break;
                  }
                } else {
                  this.b = c[g];
                  f = !0;
                  break;
                }
              }
            }
          }
          f || (this.b = "");
        }
        this.f.c = this.f.i;
        b = this.a;
        this.a = {};
        this.b = "";
        this.g = !0;
        this.c = this.i = 0;
        this.h = !1;
        this.emit("header", b);
      }
    });
  }
  push(a) {
    a = this.f.push(a);
    if (this.g) {
      return a;
    }
  }
}
;/*
 MIT dicer by Brian White
 https://github.com/mscdex/dicer
*/
const B = Buffer.from("-"), C = Buffer.from("\r\n"), D = () => {
};
function E(a) {
  a.a = void 0;
  a.h = void 0;
  a.g = void 0;
}
function F(a, c, d, e, f) {
  var b, g = 0, l = !0;
  if (!a.a && a.m && d) {
    for (; 2 > a.f && e + g < f;) {
      if (45 === d[e + g]) {
        ++g, ++a.f;
      } else {
        a.f && (b = B);
        a.f = 0;
        break;
      }
    }
    2 === a.f && (e + g < f && a._events.trailer && a.emit("trailer", d.slice(e + g, f)), E(a), a.s = !0, 0 === a.u && (a.b = !0, a.emit("finish"), a.b = !1));
    if (a.f) {
      return;
    }
  }
  a.m && (a.m = !1);
  a.a || (a.a = new v(a.w), a.a._read = () => {
    G(a);
  }, g = a.c ? "preamble" : "part", a._events[g] ? a.emit(g, a.a) : a._ignore(), a.c || (a.i = !0));
  d && e < f && !a.j && (a.c || !a.i ? (b && (l = a.a.push(b)), l = a.a.push(d.slice(e, f)), l || (a.o = !0)) : !a.c && a.i && (b && a.g.push(b), b = a.g.push(d.slice(e, f)), !a.i && void 0 !== b && b < f && F(a, !1, d, e + b, f)));
  c && (z(a.g), a.c ? a.c = !1 : (++a.u, a.a.on("end", () => {
    0 === --a.u && (a.s ? (a.b = !0, a.emit("finish"), a.b = !1) : G(a));
  })), a.a.push(null), a.a = void 0, a.j = !1, a.m = !0, a.f = 0);
}
function G(a) {
  if (a.o && (a.o = !1, a.l)) {
    const c = a.l;
    a.l = void 0;
    c();
  }
}
class H extends n {
  constructor(a) {
    super(a);
    if (!a || !a.headerFirst && "string" != typeof a.boundary) {
      throw new TypeError("Boundary required");
    }
    "string" == typeof a.boundary ? this.setBoundary(a.boundary) : this.h = void 0;
    this.A = a.headerFirst;
    this.u = this.f = 0;
    this.b = this.s = !1;
    this.c = !0;
    this.m = !1;
    this.i = this.v = !0;
    this.l = this.a = void 0;
    this.j = !1;
    this.w = "number" == typeof a.partHwm ? {highWaterMark:a.partHwm} : {};
    this.o = !1;
    this.g = new A(a);
    this.g.on("header", c => {
      this.i = !1;
      this.a.emit("header", c);
    });
  }
  emit(a) {
    "finish" != a || this.b ? n.prototype.emit.apply(this, arguments) : this.s || process.nextTick(() => {
      this.emit("error", Error("Unexpected end of multipart data"));
      this.a && !this.j ? (this.a.emit("error", Error((this.c ? "Preamble" : "Part") + " terminated early due to unexpected end of multipart data")), this.a.push(null), process.nextTick(() => {
        this.b = !0;
        this.emit("finish");
        this.b = !1;
      })) : (this.b = !0, this.emit("finish"), this.b = !1);
    });
    return !1;
  }
  _write(a, c, d) {
    if (!this.g && !this.h) {
      return d();
    }
    if (this.A && this.c) {
      if (this.a || (this.a = new v(this.w), this._events.preamble ? this.emit("preamble", this.a) : this._ignore()), c = this.g.push(a), !this.i && void 0 !== c && c < a.length) {
        a = a.slice(c);
      } else {
        return d();
      }
    }
    this.v && (this.h.push(C), this.v = !1);
    this.h.push(a);
    this.o ? this.l = d : d();
  }
  setBoundary(a) {
    this.h = new u("\r\n--" + a);
    this.h.on("info", (c, d, e, f) => {
      F(this, c, d, e, f);
    });
  }
  _ignore() {
    this.a && !this.j && (this.j = !0, this.a.on("error", D), this.a.resume());
  }
}
;DEPACK_EXPORT = H;


module.exports = DEPACK_EXPORT