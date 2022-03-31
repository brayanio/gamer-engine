import gamer from '../_gamer/gamer.js'
//behavior
import behaviorMovable from '../behavior/moveable.js'
//sprites
import prefabRedMage from '../prefab/red-mage.js'
import prefabGreenMage from '../prefab/green-mage.js'
//ui
import uiMovepad from '../ui/move-pad.js'
import uiSkillbar from '../ui/skill-bar.js'

//init scene
const scene = gamer.scene()

//init prefabs
const enemy = prefabRedMage( 1000, 25, 300, 300 )
scene.addSprite( enemy )
const player = prefabGreenMage( 25, 25, 300, 300 )
behaviorMovable.attach( player )
player.setSpeed( 30 )
scene.addSprite( player )

//init ui
uiMovepad()
uiSkillbar(
  {img: './asset/skill/magicianSkill3.png', key: '1', fn: () => {}},
  {img: './asset/skill/magicianSkill4.png', key: '2', fn: () => {}},
)

//on pre-render
scene.onPreRender(() => {
  player.checkUserMovement()
})

export default scene