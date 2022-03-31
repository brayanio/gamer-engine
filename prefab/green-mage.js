import gamer from '../_gamer/gamer.js'
import animations from '../asset/green-mage/green-mage.js'

const sprite = gamer.sprite(25, 25, 300, 300)
console.log(animations)
animations.forEach(animation => sprite.addAnimation(...animation))
sprite.setAnimation('Idle')
sprite.setOutline(true)

export default sprite