import gmr from '../_gmr/gmr.js'
import animations from '../asset/fireball/fireball.js'
import behaviorProjectile from '../behavior/projectile.js'

export default gmr.prefab(
  'fireball', 
  (sprite, instance) => {
    sprite.setAnimation('Idle')
    // sprite.setOutline(true)
    behaviorProjectile.attach( sprite )
    sprite.setSpeed(70)

    sprite.onProjectileHit( target => {
      target.changeHealth( -10 )
      if(target.health <= 0)
        target.destroy()
      sprite.destroy()
      instance.camera.shake()
      instance.renderLoop.delay( instance.getOptions().FRAMES_PER_SECOND * .25, () => instance.camera.shake(false))
    })

    sprite.setAnimationBuffer(2)
  },
  ...animations
)