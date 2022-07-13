import gmr from '../_gmr/gmr.js'
import behaviorMovable from '../behavior/moveable.js'
import prefabBG from '../prefab/bg.js'
import prefabDoor from '../prefab/door.js'
import prefabGreenMage from '../prefab/green-mage.js'
import uiMovepad from '../ui/move-pad.js'
import uiLogo from '../ui/logo.js'
import sceneTest from '../scene/test.js'
import sceneTestThree from '../scene/test-three.js'
import uiZoomBtns from '../ui/zoom-btns.js'

export default gmr.scene( ( scene, app, entrance ) => {
  //init prefabs
  app.setResolution(1920*2, 1080*2)
  scene.addPrefab(
    prefabDoor,
    prefabGreenMage,
    prefabBG
  )
  scene.spawn( 'bg', 0, 0, ...app.getOptions().RESOLUTION)
  
  const playerStartPos = {
    'left': [400, 1500, 300, 300],
    'right': [(1920*2)-800, 500, 300, 300]
  }

  // console.log(entrance)

  const player = scene.spawn( 'green-mage', ...playerStartPos[entrance] )
  behaviorMovable.attach( player )
  player.setSpeed( 18 )

  const doorTest = scene.spawn('door', 0, 1500, 200, 400)
  const doorTestThree = scene.spawn('door', (1920*2)-200, 500, 200, 400)

  const resetCameraSettings = () => {
    app.camera.setZoom(1)
    app.camera.clearFollow()
    app.camera.pan(0,0, app.getOptions().FRAMES_PER_SECOND * .1)
    app.setFPS(60);
  }

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
      resetCameraSettings()
      app.openScene( sceneTest() )
    }
    if( player.isTouching( doorTestThree ) ) {
      app.closeScene()
      resetCameraSettings()
      app.openScene( sceneTestThree() )
    }
  })
})