import gmr from '../_gmr/gmr.js'
import animations from '../asset/lightning/lightning.js'
import behaviorProjectile from '../behavior/projectile.js'

export default gmr.prefab(
  'lightning', 
  (sprite, app) => {
    sprite.setAnimation('Idle')
    // sprite.setOutline(true)
    behaviorProjectile.attach( sprite )
    sprite.setSpeed(50)

    sprite.onProjectileHit( target => {
      target.changeHealth( -5 )
      if(target.health <= 0)
        target.destroy()
      sprite.destroy()
      app.camera.shake()
      app.renderLoop.delay( app.getOptions().FRAMES_PER_SECOND * .1, () => app.camera.shake(false))
    })

    sprite.setAnimationBuffer(1)
  },
  ...animations
)