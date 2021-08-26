function e(e, t) {
  const n = Object.create(null),
    r = e.split(',')
  for (let s = 0; s < r.length; s++) n[r[s]] = !0
  return t ? (e) => !!n[e.toLowerCase()] : (e) => !!n[e]
}
function t(e) {
  if (u(e)) {
    const n = {}
    for (let r = 0; r < e.length; r++) {
      const o = e[r],
        i = t(d(o) ? s(o) : o)
      if (i) for (const e in i) n[e] = i[e]
    }
    return n
  }
  if (g(e)) return e
}
const n = /;(?![^(]*\))/g,
  r = /:(.+)/
function s(e) {
  const t = {}
  return (
    e.split(n).forEach((e) => {
      if (e) {
        const n = e.split(r)
        n.length > 1 && (t[n[0].trim()] = n[1].trim())
      }
    }),
    t
  )
}
function o(e) {
  let t = ''
  if (d(e)) t = e
  else if (u(e))
    for (let n = 0; n < e.length; n++) {
      const r = o(e[n])
      r && (t += r + ' ')
    }
  else if (g(e)) for (const n in e) e[n] && (t += n + ' ')
  return t.trim()
}
function i(e, t) {
  if (e === t) return !0
  let n = h(e),
    r = h(t)
  if (n || r) return !(!n || !r) && e.getTime() === t.getTime()
  if (((n = u(e)), (r = u(t)), n || r))
    return (
      !(!n || !r) &&
      (function (e, t) {
        if (e.length !== t.length) return !1
        let n = !0
        for (let r = 0; n && r < e.length; r++) n = i(e[r], t[r])
        return n
      })(e, t)
    )
  if (((n = g(e)), (r = g(t)), n || r)) {
    if (!n || !r) return !1
    if (Object.keys(e).length !== Object.keys(t).length) return !1
    for (const n in e) {
      const r = e.hasOwnProperty(n),
        s = t.hasOwnProperty(n)
      if ((r && !s) || (!r && s) || !i(e[n], t[n])) return !1
    }
  }
  return String(e) === String(t)
}
function c(e, t) {
  return e.findIndex((e) => i(e, t))
}
const l = {},
  f = Object.prototype.hasOwnProperty,
  a = (e, t) => f.call(e, t),
  u = Array.isArray,
  p = (e) => '[object Map]' === y(e),
  h = (e) => e instanceof Date,
  d = (e) => 'string' == typeof e,
  m = (e) => 'symbol' == typeof e,
  g = (e) => null !== e && 'object' == typeof e,
  v = Object.prototype.toString,
  y = (e) => v.call(e),
  b = (e) => d(e) && 'NaN' !== e && '-' !== e[0] && '' + parseInt(e, 10) === e,
  x = (e) => {
    const t = Object.create(null)
    return (n) => t[n] || (t[n] = e(n))
  },
  w = /-(\w)/g,
  _ = x((e) => e.replace(w, (e, t) => (t ? t.toUpperCase() : ''))),
  k = /\B([A-Z])/g,
  $ = x((e) => e.replace(k, '-$1').toLowerCase()),
  S = (e) => {
    const t = parseFloat(e)
    return isNaN(t) ? e : t
  },
  E = new WeakMap(),
  O = []
let A
const j = Symbol(''),
  C = Symbol('')
function N(e, t = l) {
  ;(function (e) {
    return e && !0 === e._isEffect
  })(e) && (e = e.raw)
  const n = (function (e, t) {
    const n = function () {
      if (!n.active) return e()
      if (!O.includes(n)) {
        T(n)
        try {
          return B.push(M), (M = !0), O.push(n), (A = n), e()
        } finally {
          O.pop(), L(), (A = O[O.length - 1])
        }
      }
    }
    return (
      (n.id = P++),
      (n.allowRecurse = !!t.allowRecurse),
      (n._isEffect = !0),
      (n.active = !0),
      (n.raw = e),
      (n.deps = []),
      (n.options = t),
      n
    )
  })(e, t)
  return t.lazy || n(), n
}
function R(e) {
  e.active && (T(e), e.options.onStop && e.options.onStop(), (e.active = !1))
}
let P = 0
function T(e) {
  const { deps: t } = e
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e)
    t.length = 0
  }
}
let M = !0
const B = []
function L() {
  const e = B.pop()
  M = void 0 === e || e
}
function W(e, t, n) {
  if (!M || void 0 === A) return
  let r = E.get(e)
  r || E.set(e, (r = new Map()))
  let s = r.get(n)
  s || r.set(n, (s = new Set())), s.has(A) || (s.add(A), A.deps.push(s))
}
function I(e, t, n, r, s, o) {
  const i = E.get(e)
  if (!i) return
  const c = new Set(),
    l = (e) => {
      e &&
        e.forEach((e) => {
          ;(e !== A || e.allowRecurse) && c.add(e)
        })
    }
  if ('clear' === t) i.forEach(l)
  else if ('length' === n && u(e))
    i.forEach((e, t) => {
      ;('length' === t || t >= r) && l(e)
    })
  else
    switch ((void 0 !== n && l(i.get(n)), t)) {
      case 'add':
        u(e) ? b(n) && l(i.get('length')) : (l(i.get(j)), p(e) && l(i.get(C)))
        break
      case 'delete':
        u(e) || (l(i.get(j)), p(e) && l(i.get(C)))
        break
      case 'set':
        p(e) && l(i.get(j))
    }
  c.forEach((e) => {
    e.options.scheduler ? e.options.scheduler(e) : e()
  })
}
const K = e('__proto__,__v_isRef,__isVue'),
  V = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map((e) => Symbol[e])
      .filter(m)
  ),
  z = J(),
  F = J(!0),
  q = H()
function H() {
  const e = {}
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
      const n = Array.prototype[t]
      e[t] = function (...e) {
        const t = re(this)
        for (let n = 0, s = this.length; n < s; n++) W(t, 0, n + '')
        const r = n.apply(t, e)
        return -1 === r || !1 === r ? n.apply(t, e.map(re)) : r
      }
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
      const n = Array.prototype[t]
      e[t] = function (...e) {
        B.push(M), (M = !1)
        const t = n.apply(this, e)
        return L(), t
      }
    }),
    e
  )
}
function J(e = !1, t = !1) {
  return function (n, r, s) {
    if ('__v_isReactive' === r) return !e
    if ('__v_isReadonly' === r) return e
    if ('__v_raw' === r && s === (e ? (t ? Y : X) : t ? Q : U).get(n)) return n
    const o = u(n)
    if (!e && o && a(q, r)) return Reflect.get(q, r, s)
    const i = Reflect.get(n, r, s)
    if (m(r) ? V.has(r) : K(r)) return i
    if ((e || W(n, 0, r), t)) return i
    if (se(i)) {
      return !o || !b(r) ? i.value : i
    }
    return g(i)
      ? e
        ? (function (e) {
            return ne(e, !0, G, null, X)
          })(i)
        : te(i)
      : i
  }
}
function Z(e = !1) {
  return function (t, n, r, s) {
    let o = t[n]
    if (!e && ((r = re(r)), (o = re(o)), !u(t) && se(o) && !se(r)))
      return (o.value = r), !0
    const i = u(t) && b(n) ? Number(n) < t.length : a(t, n),
      c = Reflect.set(t, n, r, s)
    return (
      t === re(s) &&
        (i
          ? ((e, t) => e !== t && (e == e || t == t))(r, o) && I(t, 'set', n, r)
          : I(t, 'add', n, r)),
      c
    )
  }
}
const D = {
    get: z,
    set: Z(),
    deleteProperty: function (e, t) {
      const n = a(e, t)
      e[t]
      const r = Reflect.deleteProperty(e, t)
      return r && n && I(e, 'delete', t, void 0), r
    },
    has: function (e, t) {
      const n = Reflect.has(e, t)
      return (m(t) && V.has(t)) || W(e, 0, t), n
    },
    ownKeys: function (e) {
      return W(e, 0, u(e) ? 'length' : j), Reflect.ownKeys(e)
    },
  },
  G = { get: F, set: (e, t) => !0, deleteProperty: (e, t) => !0 },
  U = new WeakMap(),
  Q = new WeakMap(),
  X = new WeakMap(),
  Y = new WeakMap()
function ee(e) {
  return e.__v_skip || !Object.isExtensible(e)
    ? 0
    : (function (e) {
        switch (e) {
          case 'Object':
          case 'Array':
            return 1
          case 'Map':
          case 'Set':
          case 'WeakMap':
          case 'WeakSet':
            return 2
          default:
            return 0
        }
      })(((e) => y(e).slice(8, -1))(e))
}
function te(e) {
  return e && e.__v_isReadonly ? e : ne(e, !1, D, null, U)
}
function ne(e, t, n, r, s) {
  if (!g(e)) return e
  if (e.__v_raw && (!t || !e.__v_isReactive)) return e
  const o = s.get(e)
  if (o) return o
  const i = ee(e)
  if (0 === i) return e
  const c = new Proxy(e, 2 === i ? r : n)
  return s.set(e, c), c
}
function re(e) {
  return (e && re(e.__v_raw)) || e
}
function se(e) {
  return Boolean(e && !0 === e.__v_isRef)
}
let oe = !1
const ie = [],
  ce = Promise.resolve(),
  le = (e) => ce.then(e),
  fe = (e) => {
    ie.includes(e) || ie.push(e), oe || ((oe = !0), le(ae))
  },
  ae = () => {
    for (let e = 0; e < ie.length; e++) ie[e]()
    ;(ie.length = 0), (oe = !1)
  },
  ue = /^(spellcheck|draggable|form|list|type)$/,
  pe = ({ el: e, get: t, effect: n, arg: r, modifiers: s }) => {
    let o
    'class' === r && (e._class = e.className),
      n(() => {
        let n = t()
        if (r) (null == s ? void 0 : s.camel) && (r = _(r)), he(e, r, n, o)
        else {
          for (const t in n) he(e, t, n[t], o && o[t])
          for (const t in o) (n && t in n) || he(e, t, null)
        }
        o = n
      })
  },
  he = (e, n, r, s) => {
    if ('class' === n)
      e.setAttribute('class', o(e._class ? [e._class, r] : r) || '')
    else if ('style' === n) {
      r = t(r)
      const { style: n } = e
      if (r) {
        if (d(r)) r !== s && (n.cssText = r)
        else {
          for (const e in r) me(n, e, r[e])
          if (s && !d(s)) for (const e in s) null == r[e] && me(n, e, '')
        }
      } else e.removeAttribute('style')
    } else
      e instanceof SVGElement || !(n in e) || ue.test(n)
        ? 'true-value' === n
          ? (e._trueValue = r)
          : 'false-value' === n
          ? (e._falseValue = r)
          : null != r
          ? e.setAttribute(n, r)
          : e.removeAttribute(n)
        : ((e[n] = r), 'value' === n && (e._value = r))
  },
  de = /\s*!important$/,
  me = (e, t, n) => {
    u(n)
      ? n.forEach((n) => me(e, t, n))
      : t.startsWith('--')
      ? e.setProperty(t, n)
      : de.test(n)
      ? e.setProperty($(t), n.replace(de, ''), 'important')
      : (e[t] = n)
  },
  ge = (e, t) => {
    const n = e.getAttribute(t)
    return null != n && e.removeAttribute(t), n
  },
  ve = (e, t, n, r) => {
    e.addEventListener(t, n, r)
  },
  ye =
    /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/,
  be = ['ctrl', 'shift', 'alt', 'meta'],
  xe = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => 'button' in e && 0 !== e.button,
    middle: (e) => 'button' in e && 1 !== e.button,
    right: (e) => 'button' in e && 2 !== e.button,
    exact: (e, t) => be.some((n) => e[`${n}Key`] && !t[n]),
  },
  we = ({ el: e, get: t, exp: n, arg: r, modifiers: s }) => {
    if (!r) return
    let o = ye.test(n) ? t(`(e => ${n}(e))`) : t(`($event => { ${n} })`)
    if ('mounted' !== r) {
      if ('unmounted' === r) return () => o()
      if (s) {
        'click' === r &&
          (s.right && (r = 'contextmenu'), s.middle && (r = 'mouseup'))
        const e = o
        o = (t) => {
          if (!('key' in t) || $(t.key) in s) {
            for (const e in s) {
              const n = xe[e]
              if (n && n(t, s)) return
            }
            return e(t)
          }
        }
      }
      ve(e, r, o, s)
    } else le(o)
  },
  _e = ({ el: e, get: t, effect: n }) => {
    n(() => {
      e.textContent = ke(t())
    })
  },
  ke = (e) => (null == e ? '' : g(e) ? JSON.stringify(e, null, 2) : String(e)),
  $e = (e) => ('_value' in e ? e._value : e.value),
  Se = (e, t) => {
    const n = t ? '_trueValue' : '_falseValue'
    return n in e ? e[n] : t
  },
  Ee = (e) => {
    e.target.composing = !0
  },
  Oe = (e) => {
    const t = e.target
    t.composing && ((t.composing = !1), Ae(t, 'input'))
  },
  Ae = (e, t) => {
    const n = document.createEvent('HTMLEvents')
    n.initEvent(t, !0, !0), e.dispatchEvent(n)
  },
  je = Object.create(null),
  Ce = (e, t, n) => Ne(e, `return(${t})`, n),
  Ne = (e, t, n) => {
    const r = je[t] || (je[t] = Re(t))
    try {
      return r(e, n)
    } catch (s) {
      console.error(s)
    }
  },
  Re = (e) => {
    try {
      return new Function('$data', '$el', `with($data){${e}}`)
    } catch (t) {
      return console.error(`${t.message} in expression: ${e}`), () => {}
    }
  },
  Pe = {
    bind: pe,
    on: we,
    show: ({ el: e, get: t, effect: n }) => {
      const r = e.style.display
      n(() => {
        e.style.display = t() ? r : 'none'
      })
    },
    text: _e,
    html: ({ el: e, get: t, effect: n }) => {
      n(() => {
        e.innerHTML = t()
      })
    },
    model: ({ el: e, exp: t, get: n, effect: r, modifiers: s }) => {
      const o = e.type,
        l = n(`(val) => { ${t} = val }`),
        { trim: f, number: a = 'number' === o } = s || {}
      if ('SELECT' === e.tagName) {
        const t = e
        ve(e, 'change', () => {
          const e = Array.prototype.filter
            .call(t.options, (e) => e.selected)
            .map((e) => (a ? S($e(e)) : $e(e)))
          l(t.multiple ? e : e[0])
        }),
          r(() => {
            const e = n(),
              r = t.multiple
            for (let n = 0, s = t.options.length; n < s; n++) {
              const s = t.options[n],
                o = $e(s)
              if (r)
                u(e) ? (s.selected = c(e, o) > -1) : (s.selected = e.has(o))
              else if (i($e(s), e))
                return void (t.selectedIndex !== n && (t.selectedIndex = n))
            }
            r || -1 === t.selectedIndex || (t.selectedIndex = -1)
          })
      } else if ('checkbox' === o) {
        let t
        ve(e, 'change', () => {
          const t = n(),
            r = e.checked
          if (u(t)) {
            const n = $e(e),
              s = c(t, n),
              o = -1 !== s
            if (r && !o) l(t.concat(n))
            else if (!r && o) {
              const e = [...t]
              e.splice(s, 1), l(e)
            }
          } else l(Se(e, r))
        }),
          r(() => {
            const r = n()
            u(r)
              ? (e.checked = c(r, $e(e)) > -1)
              : r !== t && (e.checked = i(r, Se(e, !0))),
              (t = r)
          })
      } else if ('radio' === o) {
        let t
        ve(e, 'change', () => {
          l($e(e))
        }),
          r(() => {
            const r = n()
            r !== t && (e.checked = i(r, $e(e)))
          })
      } else {
        const t = (e) => (f ? e.trim() : a ? S(e) : e)
        ve(e, 'compositionstart', Ee),
          ve(e, 'compositionend', Oe),
          ve(e, (null == s ? void 0 : s.lazy) ? 'change' : 'input', () => {
            e.composing || l(t(e.value))
          }),
          f &&
            ve(e, 'change', () => {
              e.value = e.value.trim()
            }),
          r(() => {
            if (e.composing) return
            const r = e.value,
              s = n()
            ;(document.activeElement === e && t(r) === s) ||
              (r !== s && (e.value = s))
          })
      }
    },
    effect: ({ el: e, ctx: t, exp: n, effect: r }) => {
      le(() => r(() => Ne(t.scope, n, e)))
    },
  },
  Te = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
  Me = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
  Be = /^\(|\)$/g,
  Le = /^[{[]\s*((?:[\w_$]+\s*,?\s*)+)[\]}]$/,
  We = (e, t, n) => {
    const r = t.match(Te)
    if (!r) return
    const s = e.nextSibling,
      o = e.parentElement,
      i = new Text('')
    o.insertBefore(i, e), o.removeChild(e)
    const c = r[2].trim()
    let l,
      f,
      a,
      p,
      h = r[1].trim().replace(Be, '').trim(),
      d = !1,
      m = 'key',
      v =
        e.getAttribute(m) ||
        e.getAttribute((m = ':key')) ||
        e.getAttribute((m = 'v-bind:key'))
    v && (e.removeAttribute(m), 'key' === m && (v = JSON.stringify(v))),
      (p = h.match(Me)) &&
        ((h = h.replace(Me, '').trim()),
        (f = p[1].trim()),
        p[2] && (a = p[2].trim())),
      (p = h.match(Le)) &&
        ((l = p[1].split(',').map((e) => e.trim())), (d = '[' === h[0]))
    let y,
      b,
      x,
      w = !1
    const _ = (e, t, r, s) => {
        const o = {}
        l ? l.forEach((e, n) => (o[e] = t[d ? n : e])) : (o[h] = t),
          s ? (f && (o[f] = s), a && (o[a] = r)) : f && (o[f] = r)
        const i = Ue(n, o),
          c = v ? Ce(i.scope, v) : r
        return e.set(c, r), (i.key = c), i
      },
      k = (t, n) => {
        const r = new Qe(e, t)
        return (r.key = t.key), r.insert(o, n), r
      }
    return (
      n.effect(() => {
        const e = Ce(n.scope, c),
          t = x
        if (
          (([b, x] = ((e) => {
            const t = new Map(),
              n = []
            if (u(e)) for (let r = 0; r < e.length; r++) n.push(_(t, e[r], r))
            else if ('number' == typeof e)
              for (let r = 0; r < e; r++) n.push(_(t, r + 1, r))
            else if (g(e)) {
              let r = 0
              for (const s in e) n.push(_(t, e[s], r++, s))
            }
            return [n, t]
          })(e)),
          w)
        ) {
          const e = []
          for (let t = 0; t < y.length; t++) x.has(y[t].key) || y[t].remove()
          let n = b.length
          for (; n--; ) {
            const r = b[n],
              s = t.get(r.key),
              c = b[n + 1],
              l = c && t.get(c.key),
              f = null == l ? void 0 : y[l]
            if (null == s) e[n] = k(r, f ? f.el : i)
            else {
              const t = (e[n] = y[s])
              Object.assign(t.ctx.scope, r.scope),
                s !== n && y[s + 1] !== f && t.insert(o, f ? f.el : i)
            }
          }
          y = e
        } else (y = b.map((e) => k(e, i))), (w = !0)
      }),
      s
    )
  },
  Ie = ({
    el: e,
    ctx: {
      scope: { $refs: t },
    },
    get: n,
    effect: r,
  }) => {
    let s
    return (
      r(() => {
        const r = n()
        ;(t[r] = e), s && r !== s && delete t[s], (s = r)
      }),
      () => {
        s && delete t[s]
      }
    )
  },
  Ke = /^(?:v-|:|@)/,
  Ve = /\.([\w-]+)/g,
  ze = /\{\{([^]+?)\}\}/g
let Fe = !1
const qe = (e, t) => {
    const n = e.nodeType
    if (1 === n) {
      const n = e
      if (n.hasAttribute('v-pre')) return
      let r
      if ((r = ge(n, 'v-if')))
        return ((e, t, n) => {
          const r = e.parentElement,
            s = new Comment('v-if')
          r.insertBefore(s, e)
          const o = [{ exp: t, el: e }]
          let i, c
          for (
            ;
            (i = e.nextElementSibling) &&
            ((c = null), '' === ge(i, 'v-else') || (c = ge(i, 'v-else-if')));

          )
            r.removeChild(i), o.push({ exp: c, el: i })
          const l = e.nextSibling
          let f
          r.removeChild(e)
          let a = -1
          const u = () => {
            f && (r.insertBefore(s, f.el), f.remove(), (f = void 0))
          }
          return (
            n.effect(() => {
              for (let e = 0; e < o.length; e++) {
                const { exp: t, el: i } = o[e]
                if (!t || Ce(n.scope, t))
                  return void (
                    e !== a &&
                    (u(),
                    (f = new Qe(i, n)),
                    f.insert(r, s),
                    r.removeChild(s),
                    (a = e))
                  )
              }
              ;(a = -1), u()
            }),
            l
          )
        })(n, r, t)
      if ((r = ge(n, 'v-for'))) return We(n, r, t)
      if ((r = ge(n, 'v-scope')) || '' === r) {
        const e = r ? Ce(t.scope, r) : {}
        ;(t = Ue(t, e)), e.$template && De(n, e.$template)
      }
      const s = null != ge(n, 'v-once')
      let o
      s && (Fe = !0), (r = ge(n, 'ref')) && Ze(n, Ie, `"${r}"`, t), He(n, t)
      for (const { name: e, value: i } of [...n.attributes])
        Ke.test(e) &&
          'v-cloak' !== e &&
          ('v-model' === e ? (o = i) : Je(n, e, i, t))
      o && Je(n, 'v-model', o, t), s && (Fe = !1)
    } else if (3 === n) {
      const n = e.data
      if (n.includes('{{')) {
        let r,
          s = [],
          o = 0
        for (; (r = ze.exec(n)); ) {
          const e = n.slice(o, r.index)
          e && s.push(JSON.stringify(e)),
            s.push(`$s(${r[1]})`),
            (o = r.index + r[0].length)
        }
        o < n.length && s.push(JSON.stringify(n.slice(o))),
          Ze(e, _e, s.join('+'), t)
      }
    } else 11 === n && He(e, t)
  },
  He = (e, t) => {
    let n = e.firstChild
    for (; n; ) n = qe(n, t) || n.nextSibling
  },
  Je = (e, t, n, r) => {
    let s,
      o,
      i,
      c = null
    for (; (c = Ve.exec(t)); )
      ((i || (i = {}))[c[1]] = !0), (t = t.slice(0, c.index))
    if (':' === t[0]) (s = pe), (o = t.slice(1))
    else if ('@' === t[0]) (s = we), (o = t.slice(1))
    else {
      const e = t.indexOf(':'),
        n = e > 0 ? t.slice(2, e) : t.slice(2)
      ;(s = Pe[n] || r.dirs[n]), (o = e > 0 ? t.slice(e + 1) : void 0)
    }
    s &&
      (s === pe && 'ref' === o && (s = Ie),
      Ze(e, s, n, r, o, i),
      e.removeAttribute(t))
  },
  Ze = (e, t, n, r, s, o) => {
    const i = t({
      el: e,
      get: (t = n) => Ce(r.scope, t, e),
      effect: r.effect,
      ctx: r,
      exp: n,
      arg: s,
      modifiers: o,
    })
    i && r.cleanups.push(i)
  },
  De = (e, t) => {
    if ('#' !== t[0]) e.innerHTML = t
    else {
      const n = document.querySelector(t)
      e.appendChild(n.content.cloneNode(!0))
    }
  },
  Ge = (e) => {
    const t = {
      ...e,
      scope: e ? e.scope : te({}),
      dirs: e ? e.dirs : {},
      effects: [],
      blocks: [],
      cleanups: [],
      effect: (e) => {
        if (Fe) return fe(e), e
        const n = N(e, { scheduler: () => fe(n) })
        return t.effects.push(n), n
      },
    }
    return t
  },
  Ue = (e, t = {}) => {
    const n = e.scope,
      r = Object.create(n)
    Object.defineProperties(r, Object.getOwnPropertyDescriptors(t)),
      (r.$refs = Object.create(n.$refs))
    const s = te(
      new Proxy(r, {
        set: (e, t, r, o) =>
          o !== s || e.hasOwnProperty(t)
            ? Reflect.set(e, t, r, o)
            : Reflect.set(n, t, r),
      })
    )
    return { ...e, scope: s }
  }
class Qe {
  get el() {
    return this.start || this.template
  }
  constructor(e, t, n = !1) {
    ;(this.isFragment = e instanceof HTMLTemplateElement),
      n
        ? (this.template = e)
        : this.isFragment
        ? (this.template = e.content.cloneNode(!0))
        : (this.template = e.cloneNode(!0)),
      n
        ? (this.ctx = t)
        : ((this.parentCtx = t), t.blocks.push(this), (this.ctx = Ge(t))),
      qe(this.template, this.ctx)
  }
  insert(e, t = null) {
    if (this.isFragment) {
      if (this.start) {
        let n,
          r = this.start
        for (
          ;
          r && ((n = r.nextSibling), e.insertBefore(r, t), r !== this.end);

        )
          r = n
      } else
        (this.start = new Text('')),
          (this.end = new Text('')),
          e.insertBefore(this.end, t),
          e.insertBefore(this.start, this.end),
          e.insertBefore(this.template, this.end)
    } else e.insertBefore(this.template, t)
  }
  remove() {
    if (
      (this.parentCtx &&
        ((e, t) => {
          const n = e.indexOf(t)
          n > -1 && e.splice(n, 1)
        })(this.parentCtx.blocks, this),
      this.start)
    ) {
      const e = this.start.parentNode
      let t,
        n = this.start
      for (; n && ((t = n.nextSibling), e.removeChild(n), n !== this.end); )
        n = t
    } else this.template.parentNode.removeChild(this.template)
    this.teardown()
  }
  teardown() {
    this.ctx.blocks.forEach((e) => {
      e.teardown()
    }),
      this.ctx.effects.forEach(R),
      this.ctx.cleanups.forEach((e) => e())
  }
}
const Xe = (e) => {
  const t = Ge()
  let n
  return (
    e && (t.scope = te(e)),
    (t.scope.$s = ke),
    (t.scope.$nextTick = le),
    (t.scope.$refs = Object.create(null)),
    {
      directive(e, n) {
        return n ? ((t.dirs[e] = n), this) : t.dirs[e]
      },
      mount(e) {
        if ('string' == typeof e && !(e = document.querySelector(e))) return
        let r
        return (
          (r = (e = e || document.documentElement).hasAttribute('v-scope')
            ? [e]
            : [...e.querySelectorAll('[v-scope]')].filter(
                (e) => !e.matches('[v-scope] [v-scope]')
              )),
          r.length || (r = [e]),
          (n = r.map((e) => new Qe(e, t, !0))),
          [e, ...e.querySelectorAll('[v-cloak]')].forEach((e) =>
            e.removeAttribute('v-cloak')
          ),
          this
        )
      },
      unmount() {
        n.forEach((e) => e.teardown())
      },
    }
  )
}
let Ye
;(Ye = document.currentScript) && Ye.hasAttribute('init') && Xe().mount()
export { Xe as createApp, le as nextTick, te as reactive }
