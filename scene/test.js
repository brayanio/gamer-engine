import gamer from '../_gamer/gamer.js'
import movable from '../behavior/moveable.js'
import movepad from '../prefab/move-pad.js'
import redMage from '../prefab/red-mage.js'
import greenMage from '../prefab/green-mage.js'

const scene = gamer.scene()
scene.addSprite(redMage)
scene.addSprite(greenMage)

const player = movable( greenMage )
player.setSpeed(30)

scene.onPreRender(() => {
  player.movement()
})

movepad()

export default scene