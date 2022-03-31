import gamer from '../_gamer/gamer.js'
//behavior
import movable from '../behavior/moveable.js'
//sprites
import redMage from '../prefab/red-mage.js'
import greenMage from '../prefab/green-mage.js'
//ui
import movepad from '../ui/move-pad.js'
import skillbar from '../ui/skill-bar.js'

const scene = gamer.scene()
scene.addSprite(redMage)
scene.addSprite(greenMage)

const player = movable( greenMage )
player.setSpeed(30)

scene.onPreRender(() => {
  player.movement()
})

movepad()
skillbar(
  {img: './asset/skill/magicianSkill3.png', key: '1', fn: () => {}},
  {img: './asset/skill/magicianSkill4.png', key: '2', fn: () => {}},
)

export default scene