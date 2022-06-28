import sprite from "./gmrSprite.js"

export default (name, fn, ...animations) => {
  const newSprite = (instance, bounds, ...props) => {
    const spriteObj = sprite()
    spriteObj.load(instance)
    animations.forEach(animation => 
      spriteObj.addAnimation(...animation)
    )
    if(bounds.length) spriteObj.setBounds(...bounds)
    fn(spriteObj, instance, ...props)
    return spriteObj
  }
  return instance => {
    return { name, sprite: (bounds, ...props) => newSprite(instance, bounds, ...props), animations }
  }
}