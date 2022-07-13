import gmr from '../_gmr/gmr.js'

const isMoveActive = () => {
  let key = gmr.keyManager.getKey()
  return (key.up || key.down || key.left || key.right)
}

export default gmr.behavior(
  'moveable',
  {
    speed: 12,
    setSpeed: (sprite, n) => sprite.speed = n,
    checkUserMovement: sprite => {
      //move
      const speed = sprite.speed
      if( gmr.keyManager.getKey().up ) 
        sprite.move(0, -speed)
      if( gmr.keyManager.getKey().down ) 
        sprite.move(0, speed)
      if( gmr.keyManager.getKey().left ) {
        sprite.move(-speed, 0)
        sprite.flip(true)
      }
      if( gmr.keyManager.getKey().right ) {
        sprite.move(speed, 0)
        sprite.flip(false)
      }
    
      // set animation
      if( isMoveActive() ) {
        sprite.setAnimation('Walking')
        // console.log(sprite.bar.getBounds())
      } else 
        sprite.setAnimation('Idle')
    }
  }
)