import gamer from '../_gamer/gamer.js'
import animations from '../asset/red-mage/red-mage.js'
import prefabProgress from './progress.js'

export default gamer.prefab(
  'red-mage',
  sprite => {
    sprite.setAnimation('Idle')
    sprite.setOutline(true)
    sprite.flip()
    
    const b = sprite.getBounds()
    const healthBar = prefabProgress.sprite( 
      b.x,
      b.y - 100,
      b.width,
      75
    )
    sprite.addSprite( healthBar )
    
  },
  ...animations
)