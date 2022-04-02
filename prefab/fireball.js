import gamer from '../_gamer/gamer.js'
import animations from '../asset/fireball/fireball.js'
import behaviorProjectile from '../behavior/projectile.js'

export default gamer.prefab(
  'fireball', 
  sprite => {
    sprite.setAnimation('Idle')
    sprite.setOutline(true)
    behaviorProjectile.attach( sprite )
    sprite.setSpeed(20)
  },
  ...animations
)