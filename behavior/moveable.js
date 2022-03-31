import gamer from '../_gamer/gamer.js'

const behavior = gamer.behavior('moveable')

behavior.add('speed', 12)
behavior.add('setSpeed', (sprite, n) => {
  console.log(sprite)
  sprite.speed = n
})

behavior.add('checkUserMovement', (sprite) => {
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
})

export default behavior