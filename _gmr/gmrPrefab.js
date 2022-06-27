import sprite from "./gmrSprite.js"

export default (name, fn, ...animations) => {
  const newSprite = (instance, ...bounds) => {
    const spriteObj = sprite(instance)
    animations.forEach(animation => 
      spriteObj.addAnimation(...animation)
    )
    if(bounds.length) spriteObj.setBounds(...bounds)
    fn(spriteObj, instance)
    return spriteObj
  }
  return instance => {
    return { name, sprite: (...bounds) => newSprite(instance, ...bounds), animations, load }
  }
}