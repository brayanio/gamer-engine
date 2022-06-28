import gmrCamera from './gmrCamera.js'
import gmrCanvas from './gmrCanvas.js'
import gmrImgManager from './gmrImgManager.js'
import gmrRenderLoop from './gmrRenderLoop.js'

import gmrBehavior from './gmrBehavior.js'
import gmrScene from './gmrScene.js'
import gmrPrefab from './gmrPrefab.js'
import gmrSprite from './gmrSprite.js'
import gmrUI from './gmrUI.js'

export default (container, fn) => {
  const options = { // default engine settings
    RESOLUTION: [800, 600],
    FRAMES_PER_SECOND: 30,
    FULLSCREEN: false
  }
  const getOptions = () => options

  container.classList.add('gmr')
  let imgManager = gmrImgManager(container)
  let canvas = gmrCanvas(imgManager, getOptions)
  let ui = gmrUI()
  container.appendChild( canvas.el )
  container.appendChild( ui.el )

  const camera = gmrCamera( val => {
    if(!options.FULLSCREEN) ui.shake(container, val)
    else {
      ui.shake(canvas.el, val)
      ui.shake(ui.el, val)
    }
  }, getOptions )
  let currentScene

  let renderLoop = gmrRenderLoop(getOptions, camera)

  const openScene = scene => {
    currentScene = scene
    imgManager.onSceneLoad(() => {
      renderLoop.render(() => {
        canvas.clear()
        scene.render(canvas)
        scene.postRender(canvas)
      })
    })
    scene.load( exportable )
  }

  const closeScene = () => {
    ui.clear()
    renderLoop.off()
  }

  const setResolution = (x, y) =>  {
    options.RESOLUTION = [x, y]
    canvas.el.setAttribute('width', getOptions().RESOLUTION[0])
    canvas.el.setAttribute('height', getOptions().RESOLUTION[1])
  }
  const setFPS = fps =>  options.FRAMES_PER_SECOND = fps
  const setFullscreen = b => {
    options.FULLSCREEN = b
    canvas.el.classList[b?'add':'remove']('fullscreen')
    ui.el.classList[b?'add':'remove']('fullscreen')
  }

  const sprite = () => {
    let s = gmrSprite()
    s.load(exportable)
    return s
  }

  let setPixelMode = bool => {
    canvas.ctx.mozImageSmoothingEnabled = !bool;
    canvas.ctx.webkitImageSmoothingEnabled = !bool;
    canvas.ctx.msImageSmoothingEnabled = !bool;
    canvas.ctx.imageSmoothingEnabled = !bool;
    console.log('pixel mode', !bool === false)
  }

  const exportable = {
    container, canvas, imgManager, camera, renderLoop, ui,
    getOptions,
    scene: init => gmrScene(getOptions, imgManager, init), openScene, closeScene,
    prefab: (name, fn, ...animations) => gmrPrefab({getOptions, canvas: canvas.el, ui: ui.el, camera}, name, fn, ...animations),
    behavior: gmrBehavior,
    sprite,
    setResolution, setFPS, setFullscreen, setPixelMode
  }
  
  if(fn) fn(exportable)
  return exportable
}