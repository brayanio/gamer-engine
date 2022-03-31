import engine from '../engine/engine.js'
import dragonIdleImages from '../asset/Dragon_Idle/idle.js'
import dragonMoveImages from '../asset/Dragon_Move/move.js'
import dragonFlamingImages from '../asset/Dragon_Flaming/flaming.js'

const sprite = engine.sprite(25, 25, 400, 400)
sprite.addAnimation('idle', ...dragonIdleImages)
sprite.addAnimation('move', ...dragonMoveImages)
sprite.addAnimation('attack', ...dragonFlamingImages)
sprite.setOutline(true)

export default sprite