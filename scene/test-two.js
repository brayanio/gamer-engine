import gmr from '../gmr.js'
import behaviorMovable from '../behavior/moveable.js'
import prefabDoor from '../prefab/door.js'
import prefabGreenMage from '../prefab/green-mage.js'
import uiMovepad from '../ui/move-pad.js'
import uiLogo from '../ui/logo.js'
import sceneTest from '../scene/test.js'
import uiZoomBtns from '../ui/zoom-btns.js'

export default gmr.scene( scene => {
  //init prefabs
  scene.addPrefab(
    prefabDoor,
    prefabGreenMage
  )
  
  const player = scene.spawn( 'green-mage', 825, 125, 300, 300 )
  behaviorMovable.attach( player )
  player.setSpeed( 30 )

  const doorTest = scene.spawn('door', 0, 500, 200, 400)

  //init ui
  uiLogo()
  uiMovepad()
  uiZoomBtns()

  //on pre-render
  scene.onPreRender(() => {
    player.checkUserMovement()
  })

  scene.onPostRender(() => {
    if( player.isTouching( doorTest ) ) {
      gmr.closeScene()
      gmr.openScene( sceneTest() )
    }
  })
})