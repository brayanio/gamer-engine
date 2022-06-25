import gmr from '../gmr.js'

export default gmr.prefab(
  'door', 
  sprite => {
    sprite.setOutline(true)
  },
  gmr.animation('Idle', './asset/door.png')
)