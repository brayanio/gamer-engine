import gamer from "./gamer.js"

export default (fn) => {
  return (...bounds) => {
    const sprite = gamer.sprite()
    fn(sprite)
    if(bounds.length) sprite.setBounds(...bounds)
    return sprite
  }
}