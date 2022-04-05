import gamer from '../_gamer/gamer.js'

const emptyfn = () => {}
export default gamer.behavior(
  'stats',
  {
    maxHealth: 0,
    health: 0,
    initStats: (sprite, hp) => {
      sprite.maxHealth = hp
      sprite.health = hp
    },
    healthChangeFN: emptyfn,
    onHealthChange: (sprite, fn) => {
      sprite.healthChangeFN = fn
    },
    changeHealth: (sprite, v) => {
      sprite.health += v
      sprite.healthChangeFN(sprite.health, sprite.maxHealth)
    },
    setHealth: (sprite, v) => {
      sprite.health = v
      sprite.healthChangeFN(sprite.health, sprite.maxHealth)
    }
  }
)