import gmr from '../_gmr/gmr.js'
import behaviorMovable from '../behavior/moveable.js'
import behaviorCastFireball from '../behavior/cast-fireball.js'
import behaviorCastLightning from '../behavior/cast-lightning.js'
import prefabBG from '../prefab/bg.js'
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

export default gmr.scene( ( scene, app ) => {
  //init prefabs
  app.setResolution(1920, 1080)
  scene.addPrefab(
    prefabRedMage,
    prefabGreenMage,
    prefabFireball,
    prefabLightning,
    prefabProgress,
    prefabDoor,
    prefabBG
  )
  scene.spawn( 'bg', 0, 0, ...app.getOptions().RESOLUTION)
  
  const enemy = scene.spawn( 'red-mage', 75, 375, 300, 300 )
  const player = scene.spawn( 'green-mage', 1220, 500, 300, 300 )
  behaviorMovable.attach( player )
  behaviorCastFireball.attach( player )
  behaviorCastLightning.attach( player )
  player.setSpeed( 12 )
  enemy.flip()
  player.flip()

  const doorTestTwo = scene.spawn('door', 1720, 500, 200, 400)

  let projectiles = []

  //init ui
  scene.loadUI( uiLogo )
  scene.loadUI( uiMovepad )
  scene.loadUI( uiSkillbar, 
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
      app.closeScene()
      app.openScene( sceneTestTwo() )
    }
  })

})