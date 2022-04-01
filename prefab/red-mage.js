import gamer from '../_gamer/gamer.js'
import animations from '../asset/red-mage/red-mage.js'

export default gamer.prefab(
  'red-mage',
  sprite => {
    sprite.setAnimation('Idle')
    sprite.setOutline(true)
    sprite.flip()
  },
  ...animations
)