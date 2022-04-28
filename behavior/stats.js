import gmr from '../gmr.js'

const emptyfn = () => {}
export default gmr.behavior(
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