import CONSTANT from '../constant.js'
let key = {
  left: false, 
  right: false, 
  up: false, 
  down: false
}

const startKeyListener = () => {
  onkeydown = event => {
    if(event.key === CONSTANT.MOVEMENT_KEY.LEFT) 
      key.left = true
    if(event.key === CONSTANT.MOVEMENT_KEY.RIGHT) 
      key.right = true
    if(event.key === CONSTANT.MOVEMENT_KEY.UP) 
      key.up = true
    if(event.key === CONSTANT.MOVEMENT_KEY.DOWN) 
      key.down = true
  }
  
  onkeyup = e => {
    if(event.key === CONSTANT.MOVEMENT_KEY.LEFT) 
      key.left = false
    if(event.key === CONSTANT.MOVEMENT_KEY.RIGHT) 
      key.right = false
    if(event.key === CONSTANT.MOVEMENT_KEY.UP) 
      key.up = false
    if(event.key === CONSTANT.MOVEMENT_KEY.DOWN) 
      key.down = false
  }
}


const isMoveActive = () => (key.up || key.down || key.left || key.right)

const getKey = () => key
const setKeyState = (k, state) => key[k] = state

export default { startKeyListener, getKey, setKeyState, isMoveActive }