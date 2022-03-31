const scene = (...sprites) => {
  sprites = sprites || []

  const addSprite = sprite => {
    sprites.push(sprite)
  }

  const removeSprite = sprite => {
    sprites = sprites.filter(s => s !== sprite)
  }

  const load = engine => {
    sprites.forEach(sprite => {
      sprite.load(engine)
    })
  }

  let preRenderFN, postRenderFN
  
  const render = engine => {
    if(preRenderFN) preRenderFN()
    sprites.forEach(sprite => sprite.render(engine))
  }

  const postRender = () => {
    if(postRenderFN) preRenderFN()
    sprites.forEach(sprite => sprite.postRender())
  }

  const onPreRender = fn => preRenderFN = fn
  const onPostRender = fn => postRenderFN = fn
  
  return {
    name, 
    render, postRender, addSprite, removeSprite, 
    load, onPreRender, onPostRender
  }
}

export default scene