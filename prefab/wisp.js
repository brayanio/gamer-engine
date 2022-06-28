import gmr from '../_gmr/gmr.js'
import behaviorMovable from '../behavior/moveable-chicken.js'

export default gmr.prefab(
  'wisp', 
  (sprite, app, rows) => {
    // sprite.setOutline(true, 'red')
    console.log(sprite.getBounds())
    for(let i = 0; i < rows; i++){
      const y = i * 24
      sprite.addAnimation(i+'-left', [0, y, 24, 24])
      sprite.addAnimation(i+'-right', [24, y, 24, 24])
    }
    behaviorMovable.attach( sprite )
    sprite.setSpeed( 30 )
  },
  gmr.animation('spritesheet', './asset/genesis-ss.png'),
)