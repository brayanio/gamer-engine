import sprite from "./sprite.js"

export default (constant, canvas, ui, name, fn, ...animations) => {
  const newSprite = (...bounds) => {
    const spriteObj = sprite(constant, canvas, ui)
    animations.forEach(animation => 
      spriteObj.addAnimation(...animation)
    )
    if(bounds.length) spriteObj.setBounds(...bounds)
    fn(spriteObj)
    return spriteObj
  }
  return { name, sprite: newSprite, animations }
}