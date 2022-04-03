import gamer from '../_gamer/gamer.js'
import behaviorMovable from '../behavior/moveable.js'
import behaviorCastFireball from '../behavior/cast-fireball.js'
import prefabFireball from '../prefab/fireball.js'
import prefabGreenMage from '../prefab/green-mage.js'
import prefabProgress from '../prefab/progress.js'
import prefabRedMage from '../prefab/red-mage.js'
import uiMovepad from '../ui/move-pad.js'
import uiSkillbar from '../ui/skill-bar.js'

export default gamer.scene( scene => {
  //init prefabs
  scene.addPrefab(
    prefabRedMage,
    prefabGreenMage,
    prefabFireball,
    prefabProgress
  )
  
  const enemy = scene.spawn( 'red-mage', 1000, 325, 300, 300 )
  const player = scene.spawn( 'green-mage', 25, 125, 300, 300 )
  behaviorMovable.attach( player )
  behaviorCastFireball.attach( player )
  player.setSpeed( 30 )

  let projectiles = []

  //init ui
  uiMovepad()
  uiSkillbar(
    {img: 'magicianSkill3', key: '1', fn: () => {
      enemy.trackUI('target-select', 'button')
      enemy.getUI('target-select').style.background = 'rgba(255, 0, 0, .1)'
      enemy.getUI('target-select').onclick = () => {
        enemy.clearUI('target-select')
        projectiles.push( 
          player.castFireball( scene, enemy ) 
        )
      }
    }},
    {img: 'magicianSkill1', key: '2', fn: () => {

    }},
  )

  //on pre-render
  scene.onPreRender(() => {
    player.checkUserMovement()
    projectiles.forEach( projectile => {
      projectile.projectileMovement()
    })
  })
})