import gamer from '../_gamer/gamer.js'
import behaviorMovable from '../behavior/moveable.js'
import prefabRedMage from '../sprite/red-mage.js'
import prefabGreenMage from '../sprite/green-mage.js'
import uiMovepad from '../ui/move-pad.js'
import uiSkillbar from '../ui/skill-bar.js'

export default gamer.scene( scene => {
  //init prefabs
  const enemy = prefabRedMage( 1000, 25, 300, 300 )
  const player = prefabGreenMage( 25, 25, 300, 300 )
  behaviorMovable.attach( player )
  player.setSpeed( 30 )
  player.trackUI('button')
  enemy.trackUI('button')
  enemy.getUI().onclick = () => {
    console.log('click')
  }

  scene.addSprite( enemy, player )

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
})