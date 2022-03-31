import gamer from '../_gamer/gamer.js'
import movable from '../behavior/moveable.js'
import movepad from '../prefab/move-pad.js'
import dragon from '../prefab/dragon.js'

const scene = gamer.scene( dragon )

const player = movable( dragon )
player.setSpeed(60)

scene.onPreRender(() => {
  player.movement()
})

movepad()

export default scene