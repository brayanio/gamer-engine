export default (CONSTANT) => {
  let key = {
    left: false, 
    right: false, 
    up: false, 
    down: false
  }

  let keyObj = {}
  let keyUpObj = {}

  const addKeyFn = (key, fn) => keyObj[key] = fn
  const removeKeyFn = key => delete keyObj[key]
  const clearKeyFn = () => keyObj = {}

  const addKeyUpFn = (key, fn) => keyUpObj[key] = fn
  const removeKeyUpFn = key => delete keyUpObj[key]
  const clearKeyUpFn = () => keyUpObj = {}

  let events = []
  const startKeyListener = () => {
    clearKeyListener()
    events.push(
      e => keyObj[e.key] ? keyObj[e.key]() : null, 
      e => keyUpObj[e.key] ? keyUpObj[e.key]() : null
    )
    addEventListener('keydown', events[0]),
    addEventListener('keyup', events[1])
  }
  const clearKeyListener = () => {
    events.forEach((e, i) => removeEventListener(i?'keyup':'keydown', events[i]))
    events = []
  }

  const isMoveActive = () => (key.up || key.down || key.left || key.right)

  const getKey = () => key
  const setKeyState = (k, state) => key[k] = state

  return { 
    startKeyListener, getKey, setKeyState, 
    isMoveActive, addKeyFn, removeKeyFn, 
    clearKeyFn, addKeyUpFn, removeKeyUpFn,
    clearKeyUpFn
  }
}