import gmr from '../_gmr/gmr.js'
import behaviorMovable from '../behavior/moveable-chicken.js'
import prefabBG from '../prefab/bg.js'
import prefabChicken from '../prefab/chicken.js'
import prefabRedMage from '../prefab/red-mage.js'
import uiLogo from '../ui/logo.js'
import uiMovepad from '../ui/move-pad.js'

export default gmr.scene( ( scene, app ) => {
  gmr.setFPS(6)
  gmr.setResolution(400, 300)
  //init prefabs
  scene.addPrefab(
    prefabChicken,
    // prefabRedMage,
    prefabBG
  )
  scene.spawn( 'bg', 0, 0, ...gmr.getOptions().RESOLUTION)
  
  // const enemy = scene.spawn( 'red-mage', 1000, 325, 300, 300 )
  const player = scene.spawn( 'chicken', 825, 125, 100, 100 )
  behaviorMovable.attach( player )
  player.setSpeed( 30 )

  //init ui
  scene.loadUI( uiLogo )
  scene.loadUI( uiMovepad )
  // uiZoomBtns( player )

  //on pre-render
  scene.onPreRender(() => {
    player.checkUserMovement()
  })

  scene.onPostRender(() => {
    
  })
})