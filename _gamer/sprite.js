import CONSTANT from '../constant.js'
import canvas from './canvas.js'

const sprite = () => {
  let animations = {}
  let index = 0, animationPriority = 0
  let currentAnimation
  let bounds = {x: 0, y: 0, width: 0, height: 0}
  let flipped = false
  let outline = false
  let behaviors = {}
  let loop = false

  const flip = isFlip => {
    if(isFlip !== undefined)
      flipped = isFlip
    else flipped = !flipped
  }
  
  const setAnimation = (name, priority = 0, loop, reset) => {
    if(priority >= animationPriority){
      loop = loop || false
      if(currentAnimation !== name || reset){
        currentAnimation = name
        animationPriority = priority
        index = 0
      }
    }
  }

  const addAnimation = (name, ...srcAr) => {
    animations[name] = srcAr
    if( !currentAnimation ) currentAnimation = name
  }

  const addBehavior = (name, detatch) => behaviors[name] = detatch
  const removeBehavior = name => {
    if(behaviors[name]){
      behaviors[name]()
      delete behaviors[name]
    }
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

  const setBounds = (x, y, width, height) => {
    bounds.x = x
    bounds.y = y
    bounds.width = width
    bounds.height = height
    updateUI()
  }
  const setPosition = (x, y) => {
    bounds.x = x
    bounds.y = y
    updateUI()
  }
  const setSize = (width, height) => {
    bounds.width = width
    bounds.height = height
    updateUI()
  }
  const getBounds = () => bounds
  const getSize = () => { return { width: bounds.width, height: bounds.height } }
  const getPosition = () => { return { x: bounds.x, y: bounds.y } }
  const getCenter = () => {
    return {
      x: bounds.x + (bounds.width / 2),
      y: bounds.y + (bounds.height / 2)
    }
  }

  const isTouching = bounds => {
    if(bounds.getBounds) bounds = bounds.getBounds()
    let a = getBounds(), b = bounds
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    )
  }

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
    updateUI()
  }

  const setOutline = b => outline = b
  
  let el
  const scale = (x, y) => {
    const screenBounds = canvas.canvas.getBoundingClientRect()
    return {
      x: x * (screenBounds.width / CONSTANT.RESOLUTION[0]),
      y: y * (screenBounds.height / CONSTANT.RESOLUTION[1]),
    }
  }
  const trackUI = (tag) => {
    if(el) canvas.ui.removeChild(el)
    el = document.createElement(tag)
    if(tag === 'button') el.classList.add('ui-btn')
    updateUI()
    canvas.ui.appendChild(el)
  }
  const updateUI = () => {
    if(el){
      el.style.top = scale(0, bounds.y).y + 'px'
      el.style.left = scale(bounds.x, 0).x + 'px'
      el.style.width = scale(bounds.width, 0).x + 'px'
      el.style.height = scale(0, bounds.height).y + 'px'
    }
  }
  const getUI = () => el
  const clearUI = () => {
    canvas.ui.removeChild(el)
    el = undefined
  }

  let scene
  const setScene = s => scene = s
  const destroy = () => {
    if(scene)
      scene.removeSprite(exportable)
  }

  const exportable = {
    // properties
    animations, currentAnimation, index,
    // functions
    setAnimation, addAnimation, load, render,
    postRender, move, flip, getBounds, checkBounds,
    setOutline, addBehavior, removeBehavior,
    setBounds, setPosition, setSize, getCenter,
    trackUI, updateUI, getUI, clearUI,
    getSize, getPosition, isTouching, setScene, destroy
  }

  return exportable
}

export default sprite