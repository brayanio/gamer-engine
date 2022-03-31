import gamer from '../_gamer/gamer.js'
import animations from '../asset/green-mage/green-mage.js'

export default gamer.prefab(sprite => {
  animations.forEach(animation => sprite.addAnimation(...animation))
  sprite.setAnimation('Idle')
  sprite.setOutline(true)
})