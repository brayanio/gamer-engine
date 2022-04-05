import gamer from './_gamer/gamer.js'
import sceneTest from './scene/test.js'
import CONSTANT from './constant.js'

const canvas = document.body.querySelector('#app')

gamer.setup( canvas, CONSTANT )
gamer.openScene( sceneTest() )