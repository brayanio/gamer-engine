import gamer from '../_gamer/gamer.js'
import animations from '../asset/progress/progress.js'
import behaviorProgressBar from '../behavior/progress-bar.js'

export default gamer.prefab(
  'progress',
  sprite => {
    behaviorProgressBar.attach( sprite )
    sprite.setAnimation('Background')
    const bar = sprite.initBar( 'Life' )
  },
  ...animations
)