import canvas from './canvas.js'
import imgManager from './img-manager.js'
import keyManager from './key-manager.js'
import sprite from './sprite.js'
import scene from './scene.js'
import behavior from './behavior.js'
import ui from './ui.js'
import prefab from './prefab.js'

export default {
  sprite,
  scene,
  behavior,
  prefab,
  ...canvas,
  ...imgManager,
  ...keyManager,
  ui
}