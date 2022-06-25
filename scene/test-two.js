import gmr from '../gmr.js'
import behaviorMovable from '../behavior/moveable.js'
import prefabBG from '../prefab/bg.js'
import prefabDoor from '../prefab/door.js'
import prefabGreenMage from '../prefab/green-mage.js'
import uiMovepad from '../ui/move-pad.js'
import uiLogo from '../ui/logo.js'
import sceneTest from '../scene/test.js'
import uiZoomBtns from '../ui/zoom-btns.js'

export default gmr.scene( scene => {
  //init prefabs
  gmr.setResolution(1920*2, 1080*2)
  scene.addPrefab(
    prefabDoor,
    prefabGreenMage,
    prefabBG
  )
  scene.spawn( 'bg', 0, 0, ...gmr.getOptions().RESOLUTION)
  
  const player = scene.spawn( 'green-mage', 400, 1500, 300, 300 )
  behaviorMovable.attach( player )
  player.setSpeed( 18 )

  const doorTest = scene.spawn('door', 0, 1500, 200, 400)

  //init ui
  uiLogo()
  uiMovepad()
  uiZoomBtns( player )

  //on pre-render
  scene.onPreRender(() => {
    player.checkUserMovement()
  })

  scene.onPostRender(() => {
    if( player.isTouching( doorTest ) ) {
      gmr.closeScene()
      gmr.openScene( sceneTest() )
      gmr.camera.setZoom(1)
      gmr.camera.clearFollow()
      gmr.camera.pan(0,0, gmr.getOptions().FRAMES_PER_SECOND * .1)
      gmr.setFPS(60);
      player.setAnimationBuffer(2)
    }
  })
})