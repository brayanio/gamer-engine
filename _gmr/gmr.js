import gmrCamera from './camera.js'
import gmrCanvas from './canvas.js'
import gmrImgManager from './img-manager.js'
import gmrKeyManager from './key-manager.js'
import gmrRenderLoop from './render-loop.js'

import gmrBehavior from './behavior.js'
import gmrScene from './scene.js'
import gmrPrefab from './prefab.js'
import gmrSprite from './sprite.js'

const setup = (container, options) => {
  if(!options){
    options = {
      RESOLUTION: [800, 600],
      FRAMES_PER_SECOND: 30,
      FULLSCREEN: false
    }
  }
  const getOptions = () => options
  container.classList.add('gmr')
  let imgManager = gmrImgManager(container)
  let canvas = gmrCanvas(getOptions, imgManager)
  let ui = document.createElement('ui')
  ui.classList.add('gmr-ui')
  document.body.insertBefore( imgManager.el, document.querySelector('app') )
  container.appendChild( canvas.el )
  container.appendChild( ui )

  // css
  let href = 'https://raw.githubusercontent.com/toddlewis-studio/gmr-engine/main/_style/gmr.css'
  let styleEl = document.querySelector(`[href="${href}"]`)
  if(!styleEl) {
    styleEl = document.createElement('link')
    styleEl.rel = 'stylesheet'
    // styleEl.type = 'text/css'
    styleEl.href = href
    document.head.appendChild(styleEl)
  }

  const shakeEl = (el, val = true) => el.classList[val?'add':'remove']('gmr-shake')
  const camera = gmrCamera( val => shakeEl(container, val), getOptions )
  let currentScene

  let renderLoop = gmrRenderLoop(getOptions, camera)

  const queryArUI = (...selectors) => {
    if(selectors.length === 1) return ui.querySelectorAll(selectors[0])
    else if (selectors.length > 1) {
      let el = ui
      selectors.find((selector, i) => {
        if(typeof selector === 'string'){
          if(i !== (selectors.length - 1)) el = el.querySelector(selector)
          else el = el.querySelectorAll(selector)
        } else el = selector
        if(!el) return true
      })
      return el
    }
  }
  const queryUI = (...selector) => {
    let res = queryArUI(...selector)
    if(res && res.length) return res[res.length - 1]
  }

  const clearUI = () => {
    while(ui.lastChild)
    ui.removeChild(ui.lastChild)
  }

  const openScene = scene => {
    currentScene = scene
    // imgManager.switchScene( scene )
    imgManager.onSceneLoad(() => {
      renderLoop.render(() => {
        canvas.clear()
        scene.render(canvas)
        scene.postRender(canvas)
      })
    })
    
    scene.load({...imgManager})
  }

  const closeScene = () => {
    clearUI()
    renderLoop.off()
    // keyManager.clearKeyFn()
  }

  const createUI = (className, innerHTML, init) => {
    return (...props) => {
      const el = document.createElement('section')
      el.classList.add(className)
      if(innerHTML !== null) el.innerHTML = innerHTML || `${innerHTML}`
      ui.appendChild(el)
      if(init) init(el, ...props)
      return el
    }
  }

  const keyManager = gmrKeyManager(getOptions)

  // camera.setZoom = val => {
  //   camera.setZoom(val)
  //   currentScene.updateUI()
  // }
  // camera.pan = (x, y, frames) => {
  //   camera.pan(x, y, frames)
  //   currentScene.updateUI()
  // }

  const animation = (name, ...img) => [name, ...img]

  const setResolution = (x, y) =>  {
    options.RESOLUTION = [x, y]
    canvas.el.setAttribute('width', getOptions().RESOLUTION[0])
    canvas.el.setAttribute('height', getOptions().RESOLUTION[1])
  }
  const setFPS = fps =>  options.FRAMES_PER_SECOND = fps

  return {
    container, canvas, imgManager, getOptions, camera, renderLoop,
    ui: {el: ui, clear: clearUI, queryAr: queryArUI, component: createUI, query: queryUI, shake: shakeEl},
    scene: init => gmrScene(getOptions, imgManager, init), openScene, closeScene,
    prefab: (name, fn, ...animations) => gmrPrefab(getOptions, canvas.el, ui, camera, name, fn, ...animations),
    sprite: () => gmrSprite(getOptions, canvas.el, ui, camera),
    behavior: gmrBehavior,
    animation,
    ...keyManager,
    setResolution, setFPS
  }
}

export default setup

// const app = gmr( div, options )
// app.openScene( scene )