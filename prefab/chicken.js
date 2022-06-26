import gmr from '../_gmr/gmr.js'

export default gmr.prefab(
  'chicken', 
  sprite => {
    // sprite.setOutline(true, 'red')
    sprite.addAnimation('down', [0, 0, 50, 30], [50, 0, 50, 30], [100, 0, 50, 30])
    sprite.addAnimation('left', [0, 30, 50, 30], [50, 30, 50, 30], [100, 30, 50, 30])
    sprite.addAnimation('right', [0, 60, 50, 30], [50, 60, 50, 30], [100, 60, 50, 30])
    sprite.addAnimation('up', [0, 90, 50, 30], [50, 90, 50, 30], [100, 90, 50, 30])
  },
  gmr.animation('spritesheet', './asset/chicken-ss.png'),
)