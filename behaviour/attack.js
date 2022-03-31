import engine from '../engine/engine.js'

let sprite

const cooldown = 30

const attack = () => {
  sprite.setAnimation('attack', 2, true)
}

export default selectedSprite => {
  sprite = selectedSprite
  return { sprite }
}