import gmrCamera from './camera.js'
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
  document.body.insertBefore( imgManager.el, document.querySelector('app') )
  container.appendChild( canvas.el )
  container.appendChild( ui )
  const camera = gmrCamera()
  let currentScene

  let renderLoop = gmrRenderLoop(constant)

  const getId = id => ui.querySelector(`#${id}`)

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

  const keyManager = gmrKeyManager(constant)

  const zoom = val => {
    camera.setZoom(val)
    currentScene.updateUI()
  }
  const pan = (x, y) => {
    camera.setPosition(x, y)
    currentScene.updateUI()
  }
  const cameraPosition = camera.getPosition

  const start = () => imgManager.sceneLoad()

  const off = renderLoop.off
  const on = renderLoop.on
  const delay = renderLoop.delay

  const setResolution = (x, y) =>  constant.RESOLUTION = [x, y]
  const setFPS = fps =>  constant.FRAMES_PER_SECOND = fps

  return {
    container, canvas, imgManager, ui, constant,
    clearUI, getId, openScene, closeScene, createUI,
    scene: init => gmrScene(constant, imgManager, init),
    prefab: (name, fn, ...animations) => gmrPrefab(constant, canvas.el, ui, camera, name, fn, ...animations),
    sprite: () => gmrSprite(constant, canvas.el, ui, camera),
    behavior: gmrBehavior, ...keyManager,
    zoom, pan, cameraPosition,
    start, off, on, delay,
    setResolution, setFPS
  }
}

export default setup

// const app = gmr( div, CONSTANTS )
// app.openScene( scene )