import gamer from '../_gamer/gamer.js'

export default gamer.behavior(
  'projectile',
  {
    speed: 12,
    setSpeed: (sprite, n) => sprite.speed = n,
    target: null,
    setTarget: (sprite, t) => sprite.target = t,

    projectileMovement: sprite => {
      if(sprite.target){
        let x = sprite.getCenter().x > sprite.target.getCenter().x ? -sprite.speed : sprite.speed
        let y = sprite.getCenter().y > sprite.target.getCenter().y ? -sprite.speed : sprite.speed
        sprite.move(x, y)
      }
    }
  }
)