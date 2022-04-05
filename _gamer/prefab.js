import sprite from "./sprite.js"

export default (name, fn, ...animations) => {
  const newSprite = (...bounds) => {
    const spriteObj = sprite()
    animations.forEach(animation => 
      spriteObj.addAnimation(...animation)
    )
    if(bounds.length) spriteObj.setBounds(...bounds)
    fn(spriteObj)
    return spriteObj
  }
  return { name, sprite: newSprite, animations }
}