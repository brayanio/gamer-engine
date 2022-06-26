export default () => {
  let ui = document.createElement('ui')
  ui.classList.add('gmr-ui')

  const component = (className, innerHTML, init) => {
    return (instance, ...props) => {
      const el = document.createElement('section')
      el.classList.add(className)
      if(innerHTML !== null) el.innerHTML = innerHTML || `${innerHTML}`
      ui.appendChild(el)
      const elObj = {component: el}
      queryAr('[id]').forEach(el => elObj[el.getAttribute('id')] = el)
      if(init) init(instance, elObj, ...props)
      return el
    }
  }

  const queryAr = (...selectors) => {
    if(selectors.length === 1) return ui.querySelectorAll(selectors[0])
    else if (selectors.length > 1) {
      let el = ui
      selectors.find((selector, i) => {
        if(!el) return true
        console.log(el)
        if(typeof selector === 'string'){
          if(i !== (selectors.length - 1)) el = el.querySelector(selector)
          else el = el.querySelectorAll(selector)
        } else el = selector
      })
      return el
    }
  }
  const query = (...selector) => {
    let res = queryAr(...selector)
    if(res && res.length) return res[res.length - 1]
  }

  const clear = () => {
    while(ui.lastChild)
    ui.removeChild(ui.lastChild)
  }

  const shake = (el, val = true) => el.classList[val?'add':'remove']('gmr-shake')

  return { 
    el: ui, 
    component, queryAr, query, clear, shake
  }
}