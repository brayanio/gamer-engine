import sprite from "./gmrSprite.js"

export default (name, fn, ...animations) => {
  const newSprite = (instance, x, y, width, height, ...props) => {
    const spriteObj = sprite()
    spriteObj.load(instance)
    animations.forEach(animation => 
      spriteObj.addAnimation(...animation)
    )
    spriteObj.setBounds(x, y, width, height)
    fn(spriteObj, instance, ...props)
    return spriteObj
  }
  return instance => {
    return { name, sprite: (x, y, width, height, ...props) => newSprite(instance, x, y, width, height, ...props), animations }
  }
}