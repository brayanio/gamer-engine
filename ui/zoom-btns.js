import gmr from '../_gmr/gmr.js'

export default gmr.ui.component( 'zoom-btn',
  `
  <h1 style="margin:0;margin-bottom:3px;">Camera</h1>
  <div style="flex-direction:row;">
    <div>
      <button id="p1">left</button>
      <button id="p2">right</button>
      <button id="p3">up</button>
      <button id="p4">down</button>
      <button id="p5">follow</button>
      <button id="fs">fullscreen</button>
    </div>
    <div>
      <button id="z1">0.5</button>
      <button id="z2">1</button>
      <button id="z3">2</button>
      <button id="fps1">20 fps</button>
      <button id="fps2">30 fps</button>
      <button id="fps3">60 fps</button>
      <button id="fps4">120 fps</button>
    </div>
  </div>
  `,
  (app, el, player) => {
    const pan = (x, y, frames) => {
      frames *= app.getOptions().FRAMES_PER_SECOND
      const pos = app.camera.getPosition()
      app.camera.pan(pos.x + x, pos.y + y, frames)
    }
    
    el.z1.onclick = () => app.camera.setZoom(.5)
    el.z2.onclick = () => app.camera.setZoom(1)
    el.z3.onclick = () => app.camera.setZoom(2)
    el.p1.onclick = () => pan(100, 0, .25)
    el.p2.onclick = () => pan(-100, 0, .25)
    el.p3.onclick = () => pan(0, 100, .25)
    el.p4.onclick = () => pan(0, -100, .25)
    el.p5.onclick = () => { 
      if(app.camera.followInfo().isFollowing){
        app.camera.clearFollow()
        app.camera.pan(0,0, app.getOptions().FRAMES_PER_SECOND * .1)
      } else
        app.camera.followSprite( player,  app.getOptions().FRAMES_PER_SECOND * .1 )
        player.move(0, 0)
    }
    el.p5.onclick()
    let fs = false
    el.fs.onclick = () => {
      fs = !fs
      app.setFullscreen(fs)
    }
    el.fps1.onclick = () => {app.setFPS(20);player.setAnimationBuffer(0);player.setSpeed(40)}
    el.fps2.onclick = () => {app.setFPS(30);player.setAnimationBuffer(1);player.setSpeed(36)}
    el.fps3.onclick = () => {app.setFPS(60);player.setAnimationBuffer(2);player.setSpeed(18)}
    el.fps4.onclick = () => {app.setFPS(120);player.setAnimationBuffer(3);player.setSpeed(12)}
  }
)