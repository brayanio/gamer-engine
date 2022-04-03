import gamer from '../_gamer/gamer.js'
import animations from '../asset/progress/progress.js'

export default gamer.behavior(
  'progress-bar',
  {
    bar: null,
    initBar: (sprite, animation) => {
      let bar = gamer.sprite()
      animations.forEach(animation => bar.addAnimation(...animation))
      bar.setAnimation(animation)
      let b = sprite.getBounds()
      bar.setBounds(b.x, b.y, b.width, b.height)
      sprite.bar = bar
      sprite.addSprite(bar)
      return bar
    },
    updateBar: (sprite, value, max) => {
      const b = sprite.getBounds()
      const w = Math.round(b.width * (value / max))
      sprite.bar.setSize(
        w < 0 ? 0 : w,
        b.height
      )
    }
  }
)