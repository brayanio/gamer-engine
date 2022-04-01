export default (init) => {
  return () => {
    let sprites = [], preRenderFN, postRenderFN
  
    const addSprite = (...sprite) => {
      sprites.push(...sprite)
    }
  
    const removeSprite = sprite => {
      sprites = sprites.filter(s => s !== sprite)
    }
  
    const load = engine => {
      sprites.forEach(sprite => {
        sprite.load(engine)
      })
      onresize = () => sprites.forEach(sprite => sprite.updateUI())
    }
    
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
    
    const exportable = {
      render, postRender, addSprite, removeSprite, 
      load, onPreRender, onPostRender
    }
    if(init) init(exportable)
    return exportable
  }
}