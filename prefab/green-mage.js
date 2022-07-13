import gmr from '../_gmr/gmr.js'
import animations from '../asset/green-mage/green-mage.js'
import prefabProgress from './progress.js'
import behaviorStats from '../behavior/stats.js'

export default gmr.prefab(
  'green-mage',
  (sprite, instance) => {
    sprite.setAnimation('Idle')
    sprite.setOutline(true, 'red')

    const b = sprite.getBounds()
    const healthBar = prefabProgress(instance).sprite(
      b.x + (b.width / 4),
      b.y - 25,
      b.width / 2,
      33
    )
    sprite.addSprite( healthBar )

    behaviorStats.attach( sprite )
    sprite.initStats(100)
    sprite.onHealthChange(() => 
      healthBar.updateBar(sprite.health, sprite.maxHealth)
    )

    sprite.setAnimationBuffer(2)
    sprite.bar = healthBar.bar
  },
  ...animations
)