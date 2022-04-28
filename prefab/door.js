import gmr from '../gmr.js'

export default gmr.prefab(
  'door', 
  sprite => {
    sprite.setOutline(true)
  },
  ['Idle', './asset/door.png']
)