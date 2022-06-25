import gmr from '../gmr.js'
import animations from '../asset/fireball/fireball.js'
import behaviorProjectile from '../behavior/projectile.js'

export default gmr.prefab(
  'fireball', 
  sprite => {
    sprite.setAnimation('Idle')
    // sprite.setOutline(true)
    behaviorProjectile.attach( sprite )
    sprite.setSpeed(70)

    sprite.onProjectileHit( target => {
      target.changeHealth( -10 )
      if(target.health <= 0)
        target.destroy()
      sprite.destroy()
      gmr.camera.shake()
      gmr.renderLoop.delay( gmr.getOptions().FRAMES_PER_SECOND * .25, () => gmr.camera.shake(false))
    })

    sprite.setAnimationBuffer(2)
  },
  ...animations
)