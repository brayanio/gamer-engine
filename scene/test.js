import gamer from '../_gamer/gamer.js'
import behaviorMovable from '../behavior/moveable.js'
import behaviorCastFireball from '../behavior/cast-fireball.js'
import behaviorCastLightning from '../behavior/cast-lightning.js'
import prefabDoor from '../prefab/door.js'
import prefabFireball from '../prefab/fireball.js'
import prefabLightning from '../prefab/lightning.js'
import prefabGreenMage from '../prefab/green-mage.js'
import prefabProgress from '../prefab/progress.js'
import prefabRedMage from '../prefab/red-mage.js'
import uiMovepad from '../ui/move-pad.js'
import uiSkillbar from '../ui/skill-bar.js'
import uiLogo from '../ui/logo.js'
import sceneTestTwo from '../scene/test-two.js'

export default gamer.scene( scene => {
  //init prefabs
  scene.addPrefab(
    prefabRedMage,
    prefabGreenMage,
    prefabFireball,
    prefabLightning,
    prefabProgress,
    prefabDoor
  )
  
  const enemy = scene.spawn( 'red-mage', 1000, 325, 300, 300 )
  const player = scene.spawn( 'green-mage', 25, 175, 300, 300 )
  behaviorMovable.attach( player )
  behaviorCastFireball.attach( player )
  behaviorCastLightning.attach( player )
  player.setSpeed( 30 )

  const doorTestTwo = scene.spawn('door', 1720, 500, 200, 400)

  let projectiles = []

  //init ui
  uiLogo()
  uiMovepad()
  uiSkillbar(
    {img: 'magicianSkill3', key: '1', fn: () => {
      if(!enemy.getParent()) return null
      enemy.targetSelect()
      enemy.onTargetSelect(() => {
        player.setAnimation('Attacking', 2, false, true)
        const projectile = player.castFireball( scene, enemy )
        projectiles.push( projectile )
      })
    }},
    {img: 'magicianSkill1', key: '2', fn: () => {
      if(!enemy.getParent()) return null
      enemy.targetSelect()
      enemy.onTargetSelect(() => {
        player.setAnimation('Attacking', 2, false, true)
        const projectile = player.castLightning( scene, enemy )
        projectiles.push( projectile )
      })
    }}
  )

  //on pre-render
  scene.onPreRender(() => {
    player.checkUserMovement()
    projectiles = projectiles.filter( p => p.getParent() )
    projectiles.forEach( projectile => projectile.projectileMovement() )
  })

  scene.onPostRender(() => {
    if( player.isTouching( doorTestTwo ) ) {
      gamer.closeScene()
      gamer.openScene( sceneTestTwo() )
    }
  })

})