let href = 'https://gmr-engine.blbbrayan.repl.co/_style/gmr.css'
let styleEl = document.querySelector(`[href="${href}"]`)
if(!styleEl) {
  styleEl = document.createElement('link')
  styleEl.rel = 'stylesheet'
  styleEl.type = 'text/css'
  styleEl.href = href
  document.head.appendChild(styleEl)
}
export default {}