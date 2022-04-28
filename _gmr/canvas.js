export default (constant, imgManager) => {
  let canvas = document.createElement('canvas')
  canvas.classList.add('gmr-canvas')
  canvas.setAttribute('width', constant.RESOLUTION[0])
  canvas.setAttribute('height', constant.RESOLUTION[1])
  if(constant.FULLSCREEN) canvas.classList.add('gmr-fullscreen')
  let ctx = canvas.getContext("2d")

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
  
  const inReverse = (fn) => {
    ctx.save()
    ctx.scale(-1, 1)
    fn()
    ctx.restore()
  }

  const clear = () => 
    ctx.clearRect(0, 0, constant.RESOLUTION[0], constant.RESOLUTION[1])

  return {
    el: canvas, 
    clear,
    drawOutline, drawImg, inReverse
  }
}