import gmr from '../gmr.js'
import animations from '../asset/lightning/lightning.js'
import behaviorProjectile from '../behavior/projectile.js'

export default gmr.prefab(
  'lightning', 
  sprite => {
    sprite.setAnimation('Idle')
    // sprite.setOutline(true)
    behaviorProjectile.attach( sprite )
    sprite.setSpeed(25)

    sprite.onProjectileHit( target => {
      target.changeHealth( -5 )
      if(target.health <= 0)
        target.destroy()
      sprite.destroy()
    })

  },
  ...animations
)