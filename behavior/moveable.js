import gmr from '../gmr.js'

export default gmr.behavior(
  'moveable',
  {
    speed: 12,
    setSpeed: (sprite, n) => sprite.speed = n,

    checkUserMovement: sprite => {
      //move
      const speed = sprite.speed
      if( gmr.getKey().up ) 
        sprite.move(0, -speed)
      if( gmr.getKey().down ) 
        sprite.move(0, speed)
      if( gmr.getKey().left ) {
        sprite.move(-speed, 0)
        sprite.flip(true)
      }
      if( gmr.getKey().right ) {
        sprite.move(speed, 0)
        sprite.flip(false)
      }
    
      // set animation
      if( gmr.isMoveActive() ) 
        sprite.setAnimation('Walking')
      else 
        sprite.setAnimation('Idle')
    }
  }
)