export default (getOptions, imgManager) => {
  let canvas = document.createElement('canvas')
  canvas.classList.add('gmr-canvas')
  canvas.setAttribute('width', getOptions().RESOLUTION[0])
  canvas.setAttribute('height', getOptions().RESOLUTION[1])
  if(getOptions().FULLSCREEN) canvas.classList.add('gmr-fullscreen')
  let ctx = canvas.getContext("2d")

  const drawOutline = (color, x, y, w, h) => {
    ctx.save()
    ctx.strokeStyle = color
    ctx.strokeRect(x, y, w, h)
    ctx.stroke()
    ctx.restore()
  }
  
  const drawImg = (src, x, y, width, height, isFlipped, oX, oY, oW, oH) => {
    let img = imgManager.el.querySelector(`[src="${src}"]`)
    if( img ){
      const imgWidth = img.getBoundingClientRect().width
      const imgHeight = img.getBoundingClientRect().height
      if(isFlipped)
        x -= width
      ctx.drawImage(img, oX || 0, oY || 0, oW ? oW : imgWidth, oH ? oH : imgHeight, x, y, width, height)
    }
  }

  const drawRect = (color, x, y, w, h) => {
    ctx.save()
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, h)
    ctx.stroke()
    ctx.restore()
  }
  
  const inReverse = (fn) => {
    ctx.save()
    ctx.scale(-1, 1)
    fn()
    ctx.restore()
  }

  const clear = () => 
    ctx.clearRect(0, 0, getOptions().RESOLUTION[0], getOptions().RESOLUTION[1])

  return {
    el: canvas, 
    clear,
    drawOutline, drawImg, inReverse, drawRect
  }
}