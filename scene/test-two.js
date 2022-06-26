import gmr from '../_gmr/gmr.js'
import behaviorMovable from '../behavior/moveable.js'
import prefabBG from '../prefab/bg.js'
import prefabDoor from '../prefab/door.js'
import prefabGreenMage from '../prefab/green-mage.js'
import uiMovepad from '../ui/move-pad.js'
import uiLogo from '../ui/logo.js'
import sceneTest from '../scene/test.js'
import uiZoomBtns from '../ui/zoom-btns.js'

export default gmr.scene( ( scene, app ) => {
  //init prefabs
  app.setResolution(1920*2, 1080*2)
  scene.addPrefab(
    prefabDoor,
    prefabGreenMage,
    prefabBG
  )
  scene.spawn( 'bg', 0, 0, ...app.getOptions().RESOLUTION)
  
  const player = scene.spawn( 'green-mage', 400, 1500, 300, 300 )
  behaviorMovable.attach( player )
  player.setSpeed( 18 )

  const doorTest = scene.spawn('door', 0, 1500, 200, 400)

  //init ui
  scene.loadUI( uiLogo )
  scene.loadUI( uiMovepad )
  scene.loadUI( uiZoomBtns, player )

  //on pre-render
  scene.onPreRender(() => {
    player.checkUserMovement()
  })

  scene.onPostRender(() => {
    if( player.isTouching( doorTest ) ) {
      app.closeScene()
      app.openScene( sceneTest() )
      app.camera.setZoom(1)
      app.camera.clearFollow()
      app.camera.pan(0,0, app.getOptions().FRAMES_PER_SECOND * .1)
      app.setFPS(60);
      player.setAnimationBuffer(2)
    }
  })
})