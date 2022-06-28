import gmr from '../_gmr/gmr.js'

export default gmr.behavior(
  'idle',
  {
    idleStep: 0, 
    idleState: 'asc',
    idleHeight: 0,
    idleY: 0,
    idleWait: 0,
    idle: (sprite) => {
      if(sprite.moving) return null
      sprite.idleWait++
      if(sprite.idleWait < 3) return null
      sprite.idleWait = 0
      if(sprite.idleState === 'asc'){
        sprite.idleStep ++
        if(sprite.idleStep >= 10) sprite.idleState = 'des'
      } else {
        sprite.idleStep --
        if(sprite.idleStep <= 0) sprite.idleState = 'asc'
      }
      let b = sprite.getBounds()
      sprite.setBounds( b.x, sprite.idleY - sprite.idleStep, b.width, sprite.idleHeight + sprite.idleStep)
    }
  },
  (sprite) => {
    sprite.idleHeight = sprite.getBounds().height
    sprite.idleY = sprite.getBounds().y
  }
)