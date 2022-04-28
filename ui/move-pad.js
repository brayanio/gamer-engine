import gmr from '../gmr.js'

export default gmr.createUI( 'movepad',
  `
    <div class="top">
      <button id="up">Up</button>
    </div>
    <div class="bottom">
      <button id="left">Left</button>
      <button id="down">Down</button>
      <button id="right">Right</button>
    </div>
  `,
  () => ['up', 'left', 'right', 'down'].forEach( key => {
    gmr.getId(key).onmousedown = () => gmr.setKeyState(key, true)
    gmr.getId(key).onmouseup = () => gmr.setKeyState(key, false)
    gmr.getId(key).ontouchstart = () => gmr.setKeyState(key, true)
    gmr.getId(key).ontouchend = () => gmr.setKeyState(key, false)
  })
)