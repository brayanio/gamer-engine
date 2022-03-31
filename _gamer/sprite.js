import CONSTANT from '../constant.js'

const sprite = (x, y, width, height) => {
  let animations = {}
  let index = 0, animationPriority = 0
  let currentAnimation
  let bounds = {x, y, width, height}
  let flipped = false
  let outline = false

  const flip = isFlip => {
    if(isFlip !== undefined)
      flipped = isFlip
    else flipped = !flipped
  }
  
  const setAnimation = (name, priority = 0, reset) => {
    if(priority >= animationPriority)
      if(currentAnimation !== name || reset){
        currentAnimation = name
        animationPriority = priority
        index = 0
      }
  }

  const addAnimation = (name, ...srcAr) => {
    animations[name] = srcAr
    if( !currentAnimation ) currentAnimation = name
  }

  const load = engine => {
    Object.values(animations).forEach(imgArray =>
      engine.loadImg( ...imgArray )
    )
  }

  const render = engine => {
    if(!flipped)
      engine.drawImg(
        animations[currentAnimation][index],
        bounds.x,
        bounds.y,
        bounds.width,
        bounds.height
      )
    else
      engine.inReverse(() => {
        engine.drawImg(
          animations[currentAnimation][index],
          -bounds.x,
          bounds.y,
          bounds.width,
          bounds.height,
          true
        )
      })
    if(outline){
      engine.drawOutline(
        bounds.x,
        bounds.y,
        bounds.width,
        bounds.height
      )
    }
  }

  const postRender = () => {
    index++
    if(index >= animations[currentAnimation].length )
      index = 0
  }

  const move = (x, y) => {
    bounds.x += x
    bounds.y += y
    checkBounds()
  }

  const getBounds = () => bounds

  const checkBounds = () => {
    const maxX = CONSTANT.RESOLUTION[0]
    const maxY = CONSTANT.RESOLUTION[1]
    if(bounds.x < 0)
      bounds.x = 0
    if(bounds.y < 0)
      bounds.y = 0
    if(bounds.x + bounds.width > maxX)
      bounds.x = maxX - bounds.width
    if(bounds.y + bounds.height > maxY)
      bounds.y = maxY - bounds.height
  }

  const setOutline = b => outline = b
  
  return {
    // properties
    animations, currentAnimation, index,
    // functions
    setAnimation, addAnimation, load, render,
    postRender, move, flip, getBounds, checkBounds,
    setOutline
  }
}

export default sprite