import gamer from '../_gamer/gamer.js'
import animations from '../asset/green-mage/green-mage.js'
import prefabProgress from './progress.js'
import behaviorStats from '../behavior/stats.js'

export default gamer.prefab(
  'green-mage',
  sprite => {
    sprite.setAnimation('Idle')
    // sprite.setOutline(true)

    const b = sprite.getBounds()
    const healthBar = prefabProgress.sprite( 
      b.x,
      b.y - 100,
      b.width,
      75
    )
    sprite.addSprite( healthBar )

    behaviorStats.attach( sprite )
    sprite.initStats(100)
    sprite.onHealthChange(() => 
      healthBar.updateBar(sprite.health, sprite.maxHealth)
    )

  },
  ...animations
)