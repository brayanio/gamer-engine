import sprite from "./gmrSprite.js"

export default (name, fn, ...animations) => {
  let instance
  const load = i => instance = i
  const newSprite = (...bounds) => {
    const spriteObj = sprite(instance)
    animations.forEach(animation => 
      spriteObj.addAnimation(...animation)
    )
    if(bounds.length) spriteObj.setBounds(...bounds)
    fn(spriteObj, instance)
    return spriteObj
  }
  return { name, sprite: newSprite, animations, load }
}