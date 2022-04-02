import gamer from '../_gamer/gamer.js'

export default gamer.behavior(
  'cast-fireball',
  {
    castFireball: (sprite, scene, enemy) => {
      const pBounds = sprite.getBounds()
      const projectile = scene.spawn('fireball', 
        pBounds.x + (pBounds.width / 2) - 75,
        pBounds.y + (pBounds.height / 2) - 75, 
        150, 150
      )
      projectile.setTarget( enemy )
      return projectile
    }
  }
)