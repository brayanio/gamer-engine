import canvas from "./canvas.js"

export default (className, innerHTML, init) => {
  const el = document.createElement('section')
  el.classList.add(className)
  if(innerHTML !== null) el.innerHTML = innerHTML || `${innerHTML}`
  return (...props) => {
    canvas.uiLayer.appendChild(el)
    if(init) init(el, ...props)
  }
}