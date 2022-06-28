import gmr from '../_gmr/gmr.js'

import behaviorIdle from './idle.js'

export default gmr.behavior(
  'moveable',
  {
    speed: 12,
    setSpeed: (sprite, n) => sprite.speed = n,
    moving: false,

    checkUserMovement: (sprite, i) => {
      //move
      const speed = sprite.speed
      let edit = false
      const k = gmr.keyManager.getKey()

      if(k.up || k.down || k.left || k.right){
        const b = sprite.getBounds()
        sprite.setBounds(b.x, sprite.idleY, b.width, b.height)
        sprite.moving = true
      } else {
        sprite.moving = false
      }
      
      if( k.up ) {
        sprite.move(0, -speed)
        edit = true
      }
      if( k.down ) {
        sprite.move(0, speed)
        edit = true
      }
      if( k.left ) {
        sprite.setAnimation(i+'-left')
        sprite.move(-speed, 0)
        edit = true
      }
      if( k.right ) {
        sprite.setAnimation(i+'-right')
        sprite.move(speed, 0)
        edit = true
      }
      if(edit){
        sprite.idleY = sprite.getBounds().y
      }
    }
  },
  null, behaviorIdle
)