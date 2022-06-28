import gmr from '../_gmr/gmr.js'
import prefabBG from '../prefab/bg.js'
import prefabChicken from '../prefab/chicken.js'
import prefabDoor from '../prefab/door.js'
import prefabWisp from '../prefab/wisp.js'
import uiLogo from '../ui/logo.js'
import uiMovepad from '../ui/move-pad.js'
import sceneTestTwo from '../scene/test-two.js'

export default gmr.scene( ( scene, app ) => {
  //init prefabs
  app.setPixelMode(true)
  scene.addPrefab(
    prefabWisp,
    prefabDoor,
    prefabBG
  )
  scene.spawn( 'bg', 0, 0, ...app.getOptions().RESOLUTION)
  
  // const player = scene.spawn( 'chicken', 825, 125, 300, 300 )
  const player = scene.spawn( 'wisp', 500, 1200, 450, 450, 23 )

  const doorTest = scene.spawn('door', 0, 1200, 250, 500)

  //init ui
  scene.loadUI( uiLogo )
  scene.loadUI( uiMovepad )

  let wispIndex = 0, wispCount = 23
  gmr.keyManager.addKeyFn('q', () => {
    wispIndex--
    if(wispIndex < 0) wispIndex = wispCount-1
    player.setAnimation(`${wispIndex}-left`)
  })
  gmr.keyManager.addKeyFn('e', () => {
    wispIndex++
    if(wispIndex >= wispCount) wispIndex = 0
    player.setAnimation(`${wispIndex}-right`)
  })

  //on pre-render
  scene.onPreRender(() => {
    player.checkUserMovement(wispIndex)
    player.idle()
  })

  scene.onPostRender(() => {
    if( player.isTouching( doorTest ) ) {
      app.closeScene()
      app.openScene( sceneTestTwo('right') )
    }
  })
})