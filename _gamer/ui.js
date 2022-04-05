import canvas from "./canvas.js"

export default (className, innerHTML, init) => {
  return (...props) => {
    const el = document.createElement('section')
    el.classList.add(className)
    if(innerHTML !== null) el.innerHTML = innerHTML || `${innerHTML}`
    canvas.getUI().appendChild(el)
    if(init) init(el, ...props)
  }
}