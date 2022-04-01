import gamer from '../_gamer/gamer.js'
import behaviorMovable from '../behavior/moveable.js'
import prefabRedMage from '../prefab/red-mage.js'
import prefabGreenMage from '../prefab/green-mage.js'
import uiMovepad from '../ui/move-pad.js'
import uiSkillbar from '../ui/skill-bar.js'

export default gamer.scene( scene => {
  //init prefabs
  const enemy = prefabRedMage( 1000, 25, 300, 300 )
  const player = prefabGreenMage( 25, 25, 300, 300 )
  behaviorMovable.attach( player )
  player.setSpeed( 30 )

  scene.addSprite( enemy, player )

  //init ui
  uiMovepad()
  uiSkillbar(
    {img: './asset/skill/magicianSkill3.png', key: '1', fn: () => {
      enemy.trackUI('button')
      enemy.getUI().style.background = 'rgba(255, 0, 0, .1)'
      enemy.getUI().onclick = () => {
        enemy.clearUI()
      }
    }},
    {img: './asset/skill/magicianSkill1.png', key: '2', fn: () => {

    }},
  )

  //on pre-render
  scene.onPreRender(() => {
    player.checkUserMovement()
  })
})