import gmrCanvas from './canvas.js'
import gmrImgManager from './img-manager.js'
import gmrKeyManager from './key-manager.js'
import gmrRenderLoop from './render-loop.js'

import gmrBehavior from './behavior.js'
import gmrScene from './scene.js'
import gmrPrefab from './prefab.js'
import gmrSprite from './sprite.js'

const setup = (container, constant) => {
  container.classList.add('gmr')
  let imgManager = gmrImgManager()
  let canvas = gmrCanvas(constant, imgManager)
  let ui = document.createElement('ui')
  ui.classList.add('gmr-ui')
  container.appendChild( imgManager.el )
  container.appendChild( canvas.el )
  container.appendChild( ui )

  let renderLoop = gmrRenderLoop(constant)

  const getId = id => ui.querySelector(`#${id}`)

  const clearUI = () => {
    while(ui.lastChild)
    ui.removeChild(ui.lastChild)
  }

  const openScene = scene => {
    imgManager.switchScene( scene )
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

  const keyManager = gmrKeyManager(constant)

  return {
    container, canvas, imgManager, ui, constant,
    clearUI, getId, openScene, closeScene, createUI,
    scene: init => gmrScene(constant, imgManager, init),
    prefab: (name, fn, ...animations) => gmrPrefab(constant, canvas.el, ui, name, fn, ...animations),
    sprite: () => gmrSprite(constant, canvas.el, ui),
    behavior: gmrBehavior, ...keyManager
  }
}

export default setup

// const app = gmr( div, CONSTANTS )
// app.openScene( scene )