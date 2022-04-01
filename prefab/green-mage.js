import gamer from '../_gamer/gamer.js'
import animations from '../asset/green-mage/green-mage.js'

export default gamer.prefab(
  'green-mage',
  sprite => {
    sprite.setAnimation('Idle')
    sprite.setOutline(true)
  },
  ...animations
)