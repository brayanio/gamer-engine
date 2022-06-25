import gmr from '../gmr.js'

export default gmr.ui.component( 'zoom-btn',
  `
    <div>
      <button id="z1">0.5</button>
      <button id="z2">1</button>
      <button id="z3">2</button>
      <button id="p1">left</button>
      <button id="p2">right</button>
      <button id="p3">up</button>
      <button id="p4">down</button>
      <button id="p5">follow player</button>
    </div>
  `,
  (el, player) => {
    const pan = (x, y, frames) => {
      frames *= gmr.getOptions().FRAMES_PER_SECOND
      const pos = gmr.camera.getPosition()
      gmr.camera.pan(pos.x + x, pos.y + y, frames)
    }
    gmr.ui.query(el, '#z1').onclick = () => gmr.camera.setZoom(.5)
    gmr.ui.query(el, '#z2').onclick = () => gmr.camera.setZoom(1)
    gmr.ui.query(el, '#z3').onclick = () => gmr.camera.setZoom(2)
    gmr.ui.query(el, '#p1').onclick = () => pan(100, 0, .25)
    gmr.ui.query(el, '#p2').onclick = () => pan(-100, 0, .25)
    gmr.ui.query(el, '#p3').onclick = () => pan(0, 100, .25)
    gmr.ui.query(el, '#p4').onclick = () => pan(0, -100, .25)
    gmr.ui.query(el, '#p5').onclick = () => {
      if(gmr.camera.followInfo().isFollowing){
        gmr.camera.clearFollow()
        gmr.camera.pan(0,0, gmr.getOptions().FRAMES_PER_SECOND * .1)
      } else
        gmr.camera.followSprite( player,  gmr.getOptions().FRAMES_PER_SECOND * .1 )
        player.move(0, 0)
    }
  }
)