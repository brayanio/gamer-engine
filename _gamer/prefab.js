import gamer from "./gamer.js"

export default (name, fn, ...animations) => {
  const sprite = (...bounds) => {
    const sprite = gamer.sprite()
    animations.forEach(animation => 
      sprite.addAnimation(...animation)
    )
    fn(sprite)
    if(bounds.length) sprite.setBounds(...bounds)
    return sprite
  }
  return { name, sprite, animations }
}