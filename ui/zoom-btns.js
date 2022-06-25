import gmr from '../gmr.js'

export default gmr.ui.component( 'zoom-btn',
  `
    <div>
      <h1>Camera</h1>
      <button id="z1">0.5</button>
      <button id="z2">1</button>
      <button id="z3">2</button>
      <button id="p1">left</button>
      <button id="p2">right</button>
      <button id="p3">up</button>
      <button id="p4">down</button>
      <button id="p5">follow</button>
      <button id="fs">fullscreen</button>
      <button id="fps1">20 fps</button>
      <button id="fps2">30 fps</button>
      <button id="fps3">60 fps</button>
      <button id="fps4">120 fps</button>
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
    gmr.ui.query(el, '#p5').onclick()
    let fs = false
    gmr.ui.query(el, '#fs').onclick = () => {
      fs = !fs
      gmr.setFullscreen(fs)
    }
    gmr.ui.query(el, '#fps1').onclick = () => {gmr.setFPS(20);player.setAnimationBuffer(0);player.setSpeed(40)}
    gmr.ui.query(el, '#fps2').onclick = () => {gmr.setFPS(30);player.setAnimationBuffer(1);player.setSpeed(36)}
    gmr.ui.query(el, '#fps3').onclick = () => {gmr.setFPS(60);player.setAnimationBuffer(2);player.setSpeed(18)}
    gmr.ui.query(el, '#fps4').onclick = () => {gmr.setFPS(120);player.setAnimationBuffer(3);player.setSpeed(12)}
  }
)