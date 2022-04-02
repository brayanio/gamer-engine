import gamer from '../_gamer/gamer.js'

const emptyfn = () => {}
export default gamer.behavior(
  'projectile',
  {
    speed: 12,
    setSpeed: (sprite, n) => {
      sprite.speed = n
    },
    target: null,
    setTarget: (sprite, t) => {
      sprite.target = t
    },
    projectileHitFN: emptyfn,
    onProjectileHit: (sprite, fn) => sprite.projectileHitFN = fn,

    projectileMovement: sprite => {
      if(sprite.target){
        sprite.move(
          -((sprite.getBounds().x - sprite.target.getBounds().x) / sprite.speed),
          -((sprite.getBounds().y - sprite.target.getBounds().y) / sprite.speed)
        )
        if(sprite.isTouching( sprite.target )){
          sprite.projectileHitFN()
          sprite.destroy()
        }
      }
    }
  }
)