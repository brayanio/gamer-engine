import gmr from '../gmr.js'

export default gmr.behavior(
  'moveable',
  {
    speed: 12,
    setSpeed: (sprite, n) => sprite.speed = n,

    checkUserMovement: sprite => {
      //move
      const speed = sprite.speed
      if( gmr.getKey().up ) {
        sprite.setAnimation('up')
        sprite.move(0, -speed)
      }
      if( gmr.getKey().down ) {
        sprite.setAnimation('down')
        sprite.move(0, speed)
      }
      if( gmr.getKey().left ) {
        sprite.setAnimation('left')
        sprite.move(-speed, 0)
      }
      if( gmr.getKey().right ) {
        sprite.setAnimation('right')
        sprite.move(speed, 0)
      }
    }
  }
)