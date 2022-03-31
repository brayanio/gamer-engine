import engine from '../engine/engine.js'
import movable from '../behaviour/moveable.js'
import movepad from '../prefab/move-pad.js'
import dragon from '../prefab/dragon.js'

const scene = engine.scene( dragon )

const player = movable( dragon )
player.setSpeed(60)

scene.onPreRender(() => {
  player.movement()
})

movepad()

export default scene