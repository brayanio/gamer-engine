export default (constant, canvas, ui, camera) => {
  let animations = {}
  let index = 0, animationPriority = 0
  let currentAnimation
  let bounds = {x: 0, y: 0, width: 0, height: 0}
  let offset = {x: 0, y: 0}
  let flipped = false
  let outline = false
  let behaviors = {}
  let loop = false

  // animation

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

  // behavior

  const addBehavior = (name, detatch) => behaviors[name] = detatch
  const removeBehavior = name => {
    if(behaviors[name]){
      behaviors[name]()
      delete behaviors[name]
    }
  }

  // sprites

  let sprites = []
  const addSprite = sprite => {
    sprites.push(sprite)
    sprite.setParent( exportable )
    sprite.setOffset(
      sprite.getBounds().x - (bounds.x + offset.x),
      sprite.getBounds().y - (bounds.y + offset.y),
    )
    updateSpriteBounds()
  }
  const removeSprite = sprite => {
    sprites = sprites.filter(s => s !== sprite)
  }

  // engine

  const load = engine => {
    Object.values(animations).forEach(imgArray =>
      engine.loadImg( ...imgArray )
    )
    sprites.forEach(sprite => {
      sprite.load( engine )
    })
  }

  const render = engine => {
    if(!flipped)
      engine.drawImg(
        animations[currentAnimation][index],
        bounds.x * camera.getZoom() + camera.getPosition().x,
        bounds.y * camera.getZoom() + camera.getPosition().y,
        bounds.width * camera.getZoom(),
        bounds.height * camera.getZoom()
      )
    else
      engine.inReverse(() => {
        engine.drawImg(
          animations[currentAnimation][index],
          -bounds.x * camera.getZoom() - camera.getPosition().x,
          bounds.y * camera.getZoom() + camera.getPosition().y,
          bounds.width * camera.getZoom(),
          bounds.height * camera.getZoom(),
          true
        )
      })
    if(outline){
      engine.drawOutline(
        bounds.x * camera.getZoom() + camera.getPosition().x,
        bounds.y * camera.getZoom() + camera.getPosition().y,
        bounds.width * camera.getZoom(),
        bounds.height * camera.getZoom()
      )
    }
    sprites.forEach(sprite => {
      sprite.render( engine )
    })
  }

  const postRender = () => {
    index++
    if(index >= animations[currentAnimation].length ){
      index = 0
      if(!loop)
        animationPriority = 0
    }
    sprites.forEach(sprite => sprite.postRender())
  }

  // bounds

  const updateSpriteBounds = () => {
    sprites.forEach(sprite => {
      sprite.setPosition(
        bounds.x + offset.x + sprite.getOffset().x,
        bounds.y + offset.y + sprite.getOffset().y
      )
    })
  }

  const move = (x, y) => {
    bounds.x += x
    bounds.y += y
    updateSpriteBounds()
    checkBounds()
  }

  const getOffset = () => offset

  const setOffset = (x, y) => {
    offset.x = x
    offset.y = y
    sprites.forEach(sprite => sprite.setOffset(
      sprite.getOffset().x - x,
      sprite.getOffset().y - y
    ))
    updateSpriteBounds()
    updateUI()
  }

  const setBounds = (x, y, width, height) => {
    bounds.x = x
    bounds.y = y
    bounds.width = width
    bounds.height = height
    updateSpriteBounds()
    updateUI()
  }
  const setPosition = (x, y) => {
    bounds.x = x
    bounds.y = y
    updateSpriteBounds()
    updateUI()
  }
  const setSize = (width, height) => {
    bounds.width = width
    bounds.height = height
    updateSpriteBounds()
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
    const maxX = constant.RESOLUTION[0]
    const maxY = constant.RESOLUTION[1]
    if(bounds.x < 0)
      bounds.x = 0
    if(bounds.y < 0)
      bounds.y = 0
    if(bounds.x + bounds.width > maxX)
      bounds.x = maxX - bounds.width
    if(bounds.y + bounds.height > maxY)
      bounds.y = maxY - bounds.height
    updateSpriteBounds()
    updateUI()
  }

  // util

  const setOutline = b => outline = b
  
  // ui

  let elements = {}
  const scale = (x, y) => {
    const screenBounds = canvas.getBoundingClientRect()
    return {
      x: x * (screenBounds.width / constant.RESOLUTION[0]),
      y: y * (screenBounds.height / constant.RESOLUTION[1])
    }
  }
  const trackUI = (id, tag, offset) => {
    if(!elements[id]){
      const el = document.createElement(tag)
      el.id = id
      if(tag === 'button') el.classList.add('ui-btn')
      if(offset){
        el.setAttribute('offset-x', offset.x)
        el.setAttribute('offset-y', offset.y)
        el.setAttribute('offset-width', offset.width)
        el.setAttribute('offset-height', offset.height)
      }
      elements[id] = el
      updateUI()
      ui.appendChild(el)
      return el
    }
  }
  const updateUI = () => {
    Object.values(elements).forEach(el => {
      const offset = {
        x: (el.getAttribute('offset-x') || 0),
        y: (el.getAttribute('offset-y') || 0),
        width: (el.getAttribute('offset-width') || 0),
        height: (el.getAttribute('offset-height') || 0)
      }
      el.style.top = scale(0, bounds.y + offset.y).y  * camera.getZoom() + scale(0, camera.getPosition().y).y + 'px'
      el.style.left = scale(bounds.x + offset.x, 0).x  * camera.getZoom() + scale(camera.getPosition().x, 0).x + 'px'
      el.style.width = scale(bounds.width + offset.width, 0).x  * camera.getZoom() + 'px'
      el.style.height = scale(0, bounds.height + offset.height).y  * camera.getZoom() + 'px'
    })
    sprites.forEach(sprite => sprite.updateUI())
  }
  const getUI = id => elements[id]
  const clearUI = (...id) => {
    if(!id.length) id = Object.keys(elements)
    id.forEach(id => {
      let el = elements[id]
      if(el) {
        ui.removeChild(el)
        delete elements[id]
      }
    })
  }

  // scene

  let parent
  const setParent = p => parent = p
  const getParent = () => parent
  const destroy = () => {
    if(parent && parent.removeSprite) parent.removeSprite(exportable)
    parent = undefined
  }

  const exportable = {
    setAnimation, addAnimation, load, render,
    postRender, move, flip, getBounds, checkBounds,
    setOutline, addBehavior, removeBehavior,
    setBounds, setPosition, setSize, getCenter,
    trackUI, updateUI, getUI, clearUI,
    getSize, getPosition, isTouching, setParent, destroy,
    addSprite, removeSprite, setOffset, getParent, getOffset
  }

  return exportable
}