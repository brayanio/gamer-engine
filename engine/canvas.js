import CONSTANT from '../constant.js'
import imgManager from './img-manager.js'
import keyManager from './key-manager.js'

let canvas, ctx, ui

canvas = document.createElement('canvas')
canvas.setAttribute('width', CONSTANT.RESOLUTION[0])
canvas.setAttribute('height', CONSTANT.RESOLUTION[1])
ctx = canvas.getContext("2d")

ui = document.createElement('div')
ui.classList.add('ui')

const getUI = (id, isSelector) => {
  let search = isSelector ? id : `#${id}`
  return ui.querySelector(search)
}
const getAllUI = selector => ui.querySelectorAll(selector)

const setup = () => {
  document.body.appendChild(canvas)
  document.body.appendChild(ui)
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

let isRenderLoopOn = false

const onRenderLoop = fn => {
  isRenderLoopOn = true
  const render = () => {
    if(isRenderLoopOn){
      const framerate = 1000 / CONSTANT.FRAMES_PER_SECOND
      const delta = Date.now()
      fn()
      const deltaTime = Date.now() - delta
      if ((deltaTime >= framerate)) 
          requestAnimationFrame(render)
      else setTimeout(
        () => requestAnimationFrame(render), 
        framerate - deltaTime
      )
    }
  }
  render()
}

const openScene = (scene) => {
  imgManager.onSceneLoad(() => {
    onRenderLoop(() => {
      clear()
      scene.render({drawImg, inReverse, drawOutline})
      scene.postRender({drawImg, inReverse})
    })
  })
  
  scene.load({...imgManager})
}

const closeScene = () => isRenderLoopOn = false

const clear = () => {
  ctx.clearRect(0, 0, CONSTANT.RESOLUTION[0], CONSTANT.RESOLUTION[1])
}

export default { 
  ui,
  getUI,
  getAllUI,
  ctx,
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