export default (CONSTANT) => {
  let key = {
    left: false, 
    right: false, 
    up: false, 
    down: false
  }

  let keyObj = {}

  const addKeyFn = (key, fn) => keyObj[key] = fn
  const removeKeyFn = key => delete keyObj[key]
  const clearKeyFn = () => keyObj = {}

  const startKeyListener = () => {
    onkeydown = event => {
      if(event.key === CONSTANT.MOVEMENT_KEY.LEFT) 
        key.left = true
      else if(event.key === CONSTANT.MOVEMENT_KEY.RIGHT) 
        key.right = true
      else if(event.key === CONSTANT.MOVEMENT_KEY.UP) 
        key.up = true
      else if(event.key === CONSTANT.MOVEMENT_KEY.DOWN) 
        key.down = true
      else if(event.key === CONSTANT.MOVEMENT_KEY.DOWN) 
        key.down = true
      else 
        Object.keys(keyObj).forEach(key => {
          if(event.key === key) keyObj[key]()
        })
    }
    
    onkeyup = event => {
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

  return { 
    startKeyListener, getKey, setKeyState, 
    isMoveActive, addKeyFn, removeKeyFn, 
    clearKeyFn 
  }
}