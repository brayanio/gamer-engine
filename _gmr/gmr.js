import _css from './gmrStylesheet.js'
import animation from './gmrAnimation.js'
import behavior from './gmrBehavior.js'
import imgManager from './gmrImgManager.js'
import instance from './gmrInstance.js'
import keyManager from './gmrKeyManager.js'
import prefab from './gmrPrefab.js'
import scene from './gmrScene.js'
import sprite from './gmrSprite.js'
import ui from './gmrUI.js'

let mapUI = () => {
  let o = ui()
  delete o.el
  return o
}

export default {
  animation,
  behavior,
  imgManager,
  instance,
  keyManager,
  prefab,
  scene,
  sprite,
  ui: mapUI()
}

