export default () => {
  let instance
  let animations = {}
  let index = 0, animationPriority = 0, animationBuffer = 0, animationBufferIndex = 0
  let currentAnimation
  let bounds = {x: 0, y: 0, width: 0, height: 0}
  let flipped = false
  let outline = false
  let behaviors = {}
  let loop = false
  let background = false
  let outlineColor = 'red'
  let backgroundColor = '#000000'
  let hide = false
  let spritesheet = false
  let anchor = true
  let debug = false

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
    if(name === 'spritesheet') {
      spritesheet = srcAr[0]
    } else {
      animations[name] = srcAr
      if( !currentAnimation ) currentAnimation = name
    }
  }

  const setAnimationBuffer = val => animationBuffer = val

  const setHide = v => {
    hide = v
  }

  // behavior

  const addBehavior = (name, detatch) => {
    if(!behaviors[name]) behaviors[name] = detatch
    else return 'Error: behavior already added'
  }
  const removeBehavior = name => {
    if(behaviors[name]){
      behaviors[name]()
      delete behaviors[name]
    }
  }

  // sprites

  let sprites = []
  const children = () => sprites
  const getSprites = () => {
      let ar = [...sprites]
      ar.forEach(s => ar.push(...s.getSprites()))
      return ar
  }
  const addSprite = sprite => {
    if(sprite.getParent() && sprite.getParent().removeSprite) sprite.getParent().removeSprite(sprite)
    sprites.push(sprite)
    sprite.setParent( exportable )
  }
  const removeSprite = sprite => {
    sprites = sprites.filter(s => s !== sprite)
  }

  // engine

  const load = (app, imgAr) => {
    instance = app
    if(imgAr){
      if(spritesheet)
        imgAr.push(spritesheet)
      else 
        Object.values(animations).forEach(imgArray =>
          imgAr.push( ...imgArray )
        )
      sprites.forEach(sprite => {
        sprite.load( instance, imgAr )
      })
    }
  }

  const render = engine => {
    if(!instance) return null
    if(hide) return null
    if(background){
      engine.drawRect(
        backgroundColor,
        bounds.x * instance.camera.getZoom() + instance.camera.getPosition().x,
        bounds.y * instance.camera.getZoom() + instance.camera.getPosition().y,
        bounds.width * instance.camera.getZoom(),
        bounds.height * instance.camera.getZoom()
      )
    }
    if(animations[currentAnimation]){
      if(!flipped)
        if(!spritesheet)
          engine.drawImg(
            animations[currentAnimation][index],
            bounds.x * instance.camera.getZoom() + instance.camera.getPosition().x,
            bounds.y * instance.camera.getZoom() + instance.camera.getPosition().y,
            bounds.width * instance.camera.getZoom(),
            bounds.height * instance.camera.getZoom()
          )
        else
          engine.drawImg(
            spritesheet,
            bounds.x * instance.camera.getZoom() + instance.camera.getPosition().x,
            bounds.y * instance.camera.getZoom() + instance.camera.getPosition().y,
            bounds.width * instance.camera.getZoom(),
            bounds.height * instance.camera.getZoom(),
            false,
            ...animations[currentAnimation][index]
          )
      else
        engine.inReverse(() => {
          engine.drawImg(
            animations[currentAnimation][index],
            -bounds.x * instance.camera.getZoom() - instance.camera.getPosition().x,
            bounds.y * instance.camera.getZoom() + instance.camera.getPosition().y,
            bounds.width * instance.camera.getZoom(),
            bounds.height * instance.camera.getZoom(),
            true
          )
        })
    }
    if(outline){
      engine.drawOutline(
        outlineColor,
        bounds.x * instance.camera.getZoom() + instance.camera.getPosition().x,
        bounds.y * instance.camera.getZoom() + instance.camera.getPosition().y,
        bounds.width * instance.camera.getZoom(),
        bounds.height * instance.camera.getZoom()
      )
    }
    sprites.forEach(sprite => {
      sprite.render( engine )
    })
  }

  const postRender = () => {
    if(animations[currentAnimation]){
      if(animationBufferIndex >= animationBuffer){
        index++
        animationBufferIndex = 0
      } else animationBufferIndex++
      if(index >= animations[currentAnimation].length ){
        index = 0
        if(!loop)
          animationPriority = 0
      }
    }
    sprites.forEach(sprite => sprite.postRender())
  }

  // bounds

  const updateSpriteBounds = (x, y) => {
    if(x || y)
      sprites.forEach(sprite => {
        if(sprite.isAnchor()){
          sprite.setPosition(
            sprite.getBounds().x + x,
            sprite.getBounds().y + y
          )
        }
      })
  }

  const move = (x, y) => {
    bounds.x += x
    bounds.y += y
    updateSpriteBounds(x, y)
    checkBounds()
    
    if(instance){
      const info = instance.camera.followInfo()
      if(info.isFollowing && info.followTarget === exportable)
        instance.camera.panToSprite( info.followTarget, info.followFrames )
    }
  }

  const setBounds = (x, y, width, height) => {
    let delta = [
      bounds.x - x,
      bounds.y - y
    ]
    bounds.x = x
    bounds.y = y
    bounds.width = width
    bounds.height = height
    updateSpriteBounds(...delta)
    updateUI()
  }
  const setPosition = (x, y) => {
    let delta = [
      x - bounds.x,
      y - bounds.y
    ]
    bounds.x = x
    bounds.y = y
    updateSpriteBounds(...delta)
    updateUI()
  }
  const setSize = (width, height) => {
    bounds.width = width
    bounds.height = height
    // updateSpriteBounds()
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
    if(!instance) return null
    const maxX = instance.getOptions().RESOLUTION[0]
    const maxY = instance.getOptions().RESOLUTION[1]
    let delta = [0, 0]
    if(bounds.x < 0){
      delta[0] = bounds.x * -1
      bounds.x = 0
    }
    if(bounds.y < 0){
      delta[1] = bounds.y * -1
      bounds.y = 0
    }
    if(bounds.x + bounds.width > maxX){
      delta[0] = (bounds.x + bounds.width - maxX) * -1
      bounds.x = maxX - bounds.width
    }
    if(bounds.y + bounds.height > maxY){
      delta[1] = (bounds.y + bounds.height - maxY) * -1
      bounds.y = maxY - bounds.height
    }
    updateSpriteBounds(...delta)
    updateUI()
  }

  const setAnchor = bool => anchor = bool
  const isAnchor = () => anchor

  // util

  const setOutline = (b, color) => {
    outline = b
    if(b && color) outlineColor = color
  }
  const setBackground = (b, color) => {
    background = b
    if(b && color) backgroundColor = color
  }
  
  // ui 

  let elements = {}
  const scale = (x, y) => {
    const screenBounds = instance.canvas.el.getBoundingClientRect()
    return {
      x: x * (screenBounds.width / instance.getOptions().RESOLUTION[0]),
      y: y * (screenBounds.height / instance.getOptions().RESOLUTION[1])
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
      instance.ui.el.appendChild(el)
      return el
    }
  }
  const updateUI = () => {
    if(!instance) return null
    Object.values(elements).forEach(el => {
      const offset = {
        x: parseInt(el.getAttribute('offset-x') || '0'),
        y: parseInt(el.getAttribute('offset-y') || '0'),
        width: parseInt(el.getAttribute('offset-width') || '0'),
        height: parseInt(el.getAttribute('offset-height') || '0')
      }
      el.style.top = scale(0, bounds.y + offset.y).y  * instance.camera.getZoom() + scale(0, instance.camera.getPosition().y).y + 'px'
      el.style.left = scale(bounds.x + offset.x, 0).x  * instance.camera.getZoom() + scale(instance.camera.getPosition().x, 0).x + 'px'
      el.style.width = scale(bounds.width + offset.width, 0).x  * instance.camera.getZoom() + 'px'
      el.style.height = scale(0, bounds.height + offset.height).y  * instance.camera.getZoom() + 'px'
      if(hide){
        el.classList.add('d-none')
      }
    })
    sprites.forEach(sprite => sprite.updateUI())
  }
  const getUI = id => elements[id]
  const clearUI = (...id) => {
    if(!id.length) id = Object.keys(elements)
    id.forEach(id => {
      let el = elements[id]
      if(el) {
        instance.ui.el.removeChild(el)
        delete elements[id]
      }
    })
  }

  // scene

  let parent
  const setParent = p => parent = p
  const getParent = () => parent
  const destroy = () => {
    clearUI()
    if(parent && parent.removeSprite) parent.removeSprite(exportable)
    parent = undefined
    sprites.forEach(s => s.destroy())
    // Object.keys(exportable).forEach(val => delete exportable[val])
  }

  // getInstance
  const getInstance = () => instance

  let exportable = { isSprite: true,
    setAnimation, addAnimation, load, render,
    postRender, move, flip, getBounds, checkBounds,
    setOutline, setBackground, addBehavior, removeBehavior,
    setBounds, setPosition, setSize, getCenter,
    trackUI, updateUI, getUI, clearUI,
    getSize, getPosition, isTouching, setParent, destroy,
    addSprite, removeSprite, getParent,
    children, setHide, setAnimationBuffer, getInstance, getSprites,
    setAnchor, isAnchor
  }

  return exportable
}