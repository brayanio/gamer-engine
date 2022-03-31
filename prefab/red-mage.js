import gamer from '../_gamer/gamer.js'
import animations from '../asset/red-mage/red-mage.js'

const sprite = gamer.sprite(1000, 25, 300, 300)
console.log(animations)
animations.forEach(animation => sprite.addAnimation(...animation))
sprite.setAnimation('Idle')
sprite.setOutline(true)
sprite.flip()

export default sprite