import sprite from "./sprite.js"

export default (constant, canvas, ui, camera, name, fn, ...animations) => {
  const newSprite = (...bounds) => {
    const spriteObj = sprite(constant, canvas, ui, camera)
    animations.forEach(animation => 
      spriteObj.addAnimation(...animation)
    )
    if(bounds.length) spriteObj.setBounds(...bounds)
    fn(spriteObj)
    return spriteObj
  }
  return { name, sprite: newSprite, animations }
}