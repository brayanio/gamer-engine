import gamer from '../_gamer/gamer.js'

export default gamer.prefab(
  'door', 
  sprite => {
    sprite.setOutline(true)
  },
  ['Idle', './asset/door.png']
)