import canvas from './canvas.js'
import imgManager from './img-manager.js'
import keyManager from './key-manager.js'
import sprite from './sprite.js'
import scene from './scene.js'

export default {
  sprite,
  scene,
  ...canvas,
  ...imgManager,
  ...keyManager
}