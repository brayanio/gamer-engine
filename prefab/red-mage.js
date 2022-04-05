import gamer from '../_gamer/gamer.js'
import animations from '../asset/red-mage/red-mage.js'
import prefabProgress from './progress.js'
import behaviorStats from '../behavior/stats.js'
import behaviorTargetable from '../behavior/targetable.js'

export default gamer.prefab(
  'red-mage',
  sprite => {
    sprite.setAnimation('Idle')
    // sprite.setOutline(true)
    sprite.flip()
    
    const b = sprite.getBounds()
    const healthBar = prefabProgress.sprite( 
      b.x + (b.width / 4),
      b.y - 25,
      b.width / 2,
      33
    )
    sprite.addSprite( healthBar )

    behaviorStats.attach( sprite )
    sprite.initStats(100)
    sprite.onHealthChange((hp, mhp) => 
      healthBar.updateBar( hp, mhp )
    )

    behaviorTargetable.attach( sprite )

  },
  ...animations
)