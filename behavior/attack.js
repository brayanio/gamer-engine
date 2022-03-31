import gamer from '../_gamer/gamer.js'
import CONSTANT from '../constant.js'

let sprite

const cooldown = 2 * CONSTANT.FRAMES_PER_SECOND

const attack = () => {
  sprite.setAnimation('attack', 2, true)
}

export default selectedSprite => {
  sprite = selectedSprite
  return { sprite }
}