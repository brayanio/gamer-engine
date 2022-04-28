export default (constant, imgManager, init) => {
  return () => {
    let sprites = [], prefabs = {},
    preRenderFN, postRenderFN
  
    const addPrefab = (...prefab) => {
      prefab.forEach(p => prefabs[p.name] = p)
    }

    const removePrefab = name => {
      delete prefabs[name]
    }

    const addSprite = (...sprite) => {
      sprites.push(...sprite)
      sprite.forEach(s => s.setParent(exportable))
    }
  
    const removeSprite = sprite => {
      sprites = sprites.filter(s => s !== sprite)
    }

    const spawn = (name, x, y, width, height, parent) => {
      if(prefabs[name]){
        const sprite = prefabs[name].sprite(x, y, width, height)
        sprites.push(sprite)
        if(!parent) sprite.setParent( exportable )
        else sprite.setParent( parent )
        return sprite
      } else console.error(`No prefab named "${name}" has been added to the scene.`)
    }
  
    const load = engine => {
      sprites.forEach(sprite => {
        sprite.load(engine)
      })
      Object.values(prefabs).forEach(prefab => 
        prefab.animations.forEach(animation => {
          const ar = [...animation]
          ar.shift()
          imgManager.loadImg(...ar)
        })
      )
      onresize = () => sprites.forEach(sprite => sprite.updateUI())
    }
    
    const render = engine => {
      if(preRenderFN) preRenderFN()
      sprites.forEach(sprite => sprite.render(engine))
    }
  
    const postRender = () => {
      if(postRenderFN) postRenderFN()
      sprites.forEach(sprite => sprite.postRender())
    }
  
    const onPreRender = fn => preRenderFN = fn
    const onPostRender = fn => postRenderFN = fn
    
    const exportable = {
      render, postRender, addSprite, removeSprite, 
      load, onPreRender, onPostRender,
      addPrefab, removePrefab, spawn
    }
    if(init) init(exportable)
    return exportable
  }
}