import gamer from "./gamer.js"

export default (name, fn, ...animations) => {
  const sprite = (...bounds) => {
    const sprite = gamer.sprite()
    animations.forEach(animation => 
      sprite.addAnimation(...animation)
    )
    if(bounds.length) sprite.setBounds(...bounds)
    fn(sprite)
    return sprite
  }
  return { name, sprite, animations }
}