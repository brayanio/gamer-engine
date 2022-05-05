import gmr from '../gmr.js'

export default gmr.createUI( 'zoom-btn',
  `
    <div>
      <button id="z1">0.5</button>
      <button id="z2">1</button>
      <button id="z3">2</button>
      <button id="p1">pan left</button>
      <button id="p2">pan right</button>
      <button id="p3">pan up</button>
      <button id="p4">pan down</button>
    </div>
  `,
  () => {
    const pan = (x, y) => {
      const pos = gmr.cameraPosition()
      gmr.pan(pos.x + x, pos.y + y)
    }
    gmr.getId('z1').onclick = () => gmr.zoom(.5)
    gmr.getId('z2').onclick = () => gmr.zoom(1)
    gmr.getId('z3').onclick = () => gmr.zoom(2)
    gmr.getId('p1').onclick = () => pan(100, 0)
    gmr.getId('p2').onclick = () => pan(-100, 0)
    gmr.getId('p3').onclick = () => pan(0, 100)
    gmr.getId('p4').onclick = () => pan(0, -100)
  }
)