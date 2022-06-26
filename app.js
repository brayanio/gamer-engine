import gmr from './_gmr/gmr.js'
import sceneTest from './scene/test.js'
import sceneTestThree from './scene/test-three.js'

const div = document.body.querySelector('#app')

let app = gmr.instance( div, app => {
  if(innerWidth < 950){
    app.setFullscreen(true)
  }
  app.setFPS(60)
  app.setResolution(1920, 1080)
  app.openScene( sceneTest() )
})

export default app