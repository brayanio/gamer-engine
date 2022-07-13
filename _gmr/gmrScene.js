export default (init) => {
  return (...props) => {
    let sprites = [], prefabs = {},
    preRenderFN, postRenderFN,
    instance
  
    const addPrefab = (...prefab) => prefab.forEach(p => {
      let loadedPrefab = p(instance)
      prefabs[loadedPrefab.name] = loadedPrefab
  })

    const removePrefab = name => {
      delete prefabs[name]
    }

    const addSprite = (...sprite) => {
      sprites.push(...sprite)
      sprite.forEach(s => {
        s.setParent(exportable)
        s.load(instance)
      })
    }
  
    const removeSprite = sprite => {
      sprites = sprites.filter(s => s !== sprite)
    }
1
    const spawn = (name, x, y, width, height, ...props) => {
      if(prefabs[name]){
        const sprite = prefabs[name].sprite(x, y, width, height, ...props)
        sprite.load(instance)
        sprites.push(sprite)
        if(sprite.parent === undefined) sprite.setParent( exportable )
        return sprite
      } else console.error(`No prefab named "${name}" has been added to the scene.`)
    }
  
    const load = (app) => {
      instance = app
      if(init) init(exportable, instance, ...props)
      let imgAr = []
      sprites.forEach(sprite => {
        sprite.load(instance, imgAr)
      })
      Object.values(prefabs).forEach(prefab => 
        prefab.animations.forEach(animation => {
          let ar = [...animation]
          ar.shift()
          ar = ar.filter(s => typeof s === 'string')
          imgAr.push(...ar)
        })
      )

      instance.imgManager.loadImg(instance.container, ...imgAr)
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

    const updateUI = () => {
      sprites.forEach(sprite => {
        sprite.updateUI()
      })
    }

    const loadUI = (fn, ...props) => {
      const el = fn( instance, ...props )
      instance.ui.el.appendChild(el)
    }

    const children = () => sprites

    const getSprites = () => {
      let ar = [...sprites]
      ar.forEach(s => ar.push(...s.getSprites()))
      return ar
    }
    
    const exportable = {
      render, postRender, addSprite, removeSprite, children, getSprites,
      load, onPreRender, onPostRender,
      addPrefab, removePrefab, spawn, updateUI, loadUI
    }
    
    return exportable
  }
}