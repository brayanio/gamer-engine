import gmr from '../_gmr/gmr.js'
import animations from '../asset/progress/progress.js'
import behaviorProgressBar from '../behavior/progress-bar.js'

export default gmr.prefab(
  'progress',
  sprite => {
    behaviorProgressBar.attach( sprite )
    sprite.setAnimation('Background')
    const bar = sprite.initBar( 'Life' )
  },
  ...animations
)