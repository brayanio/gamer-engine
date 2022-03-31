import gamer from '../_gamer/gamer.js'

let sprite, speed = 12

const movement = () => {
  //move
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
    sprite.setAnimation('move')
  else 
    sprite.setAnimation('idle')
}

const setSpeed = n => speed = n

export default selectedSprite => {
  sprite = selectedSprite
  return {sprite, movement, setSpeed}
}