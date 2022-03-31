import engine from '../engine/engine.js'

let sprite, speed = 12

const movement = () => {
  //move
  if( engine.getKey().up ) 
    sprite.move(0, -speed)
  if( engine.getKey().down ) 
    sprite.move(0, speed)
  if( engine.getKey().left ) {
    sprite.move(-speed, 0)
    sprite.flip(true)
  }
  if( engine.getKey().right ) {
    sprite.move(speed, 0)
    sprite.flip(false)
  }

  // set animation
  if( engine.isMoveActive() ) 
    sprite.setAnimation('move')
  else 
    sprite.setAnimation('idle')
}

const setSpeed = n => speed = n

export default selectedSprite => {
  sprite = selectedSprite
  return {sprite, movement, setSpeed}
}