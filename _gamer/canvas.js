import imgManager from './img-manager.js'
import keyManager from './key-manager.js'

let container, imgContainer, canvas, ctx, ui, constant

const getContainer = () => container
const getImgContainer = () => imgContainer
const getCanvas = () => canvas
const getCtx = () => ctx
const getUI = () => ui
const CONSTANT = () => constant

const getId = id => ui.querySelector(`#${id}`)

const setup = (containerElement, constants) => {
  container = containerElement
  canvas = document.createElement('canvas')
  constant = constants
  canvas.setAttribute('width', constant.RESOLUTION[0])
  canvas.setAttribute('height', constant.RESOLUTION[1])
  if(constant.FULLSCREEN) canvas.classList.add('fullscreen')
  ctx = canvas.getContext("2d")
  imgContainer = imgManager.createImgManager()
  ui = document.createElement('div')
  ui.classList.add('ui')
  container.appendChild(imgContainer)
  container.appendChild(canvas)
  container.appendChild(ui)
  keyManager.startKeyListener()
}

const drawLine = (startX, startY, endX, endY) => {
  ctx.moveTo(startX, startY)
  ctx.strokeStyle = 'red'
  ctx.lineTo(endX, endY)
  ctx.stroke()
}

const drawOutline = (x, y, w, h) => {
  ctx.save()
  ctx.strokeStyle = 'red'
  ctx.strokeRect(x, y, w, h)
  ctx.stroke()
  ctx.restore()
}

const drawImg = (src, x, y, width, height, isFlipped) => {
  let img = imgManager.el.querySelector(`[src="${src}"]`)
  if( img ){
    const imgWidth = img.getBoundingClientRect().width
    const imgHeight = img.getBoundingClientRect().height
    if(isFlipped)
      x -= width
    ctx.drawImage(img, 0, 0, imgWidth, imgHeight, x, y, width, height)
  }
}

const inReverse = fn => {
  ctx.save()
  ctx.scale(-1, 1)
  fn()
  ctx.restore()
}

let renderFN, isRendering = false

const onRenderLoop = fn => {
  renderFN = fn
  const render = () => {
    if(renderFN){
      const framerate = 1000 / constant.FRAMES_PER_SECOND
      const delta = Date.now()
      renderFN()
      const deltaTime = Date.now() - delta
      if ((deltaTime >= framerate)) 
          requestAnimationFrame(render)
      else setTimeout(
        () => requestAnimationFrame(render), 
        framerate - deltaTime
      )
    } else isRendering = false
  }
  if(!isRendering) {
    isRendering = true
    render()
  }
}

const clearUI = () => {
  while(ui.lastChild)
  ui.removeChild(ui.lastChild)
}

const openScene = (scene) => {
  imgManager.switchScene( scene )
  imgManager.clearImgManager()
  imgManager.onSceneLoad(() => {
    onRenderLoop(() => {
      clear()
      scene.render({drawImg, inReverse, drawOutline})
      scene.postRender({drawImg, inReverse})
    })
  })
  
  scene.load({...imgManager})
}

const closeScene = () => {
  renderFN = undefined
  clearUI()
  keyManager.clearKeyFn()
}

const clear = () => 
  ctx.clearRect(0, 0, constant.RESOLUTION[0], constant.RESOLUTION[1])

export default {
  getContainer,
  getImgContainer,
  getCanvas,
  getUI,
  getCtx,
  getId,
  CONSTANT,
  setup, 
  drawLine, 
  drawOutline, 
  drawImg, 
  onRenderLoop, 
  openScene,
  closeScene, 
  clear,
  inReverse
}