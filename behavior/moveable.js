import gamer from '../_gamer/gamer.js'

export default gamer.behavior(
  'moveable',
  {
    speed: 12,
    setSpeed: (sprite, n) => sprite.speed = n,

    checkUserMovement: sprite => {
      //move
      const speed = sprite.speed
      if( gamer.getKey().up ) 
        sprite.move(0, -speed)
      if( gamer.getKey().down ) 
        sprite.move(0, speed)
      if( gamer.getKey().left ) {
        sprite.move(-speed, 0)
        sprite.flip(true)
      }
      if( gamer.getKey().right ) {
        sprite.move(speed, 0)
        sprite.flip(false)
      }
    
      // set animation
      if( gamer.isMoveActive() ) 
        sprite.setAnimation('Walking')
      else 
        sprite.setAnimation('Idle')
    }
  }
)