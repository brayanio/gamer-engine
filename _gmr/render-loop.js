import guid from './guid.js'

const setup = (constant) => {
  let isOn = false
  let renderFN
  let delays = []
  let loopId

  const onRender = fn => renderFN = fn
  const setOn = b => isOn = b
  const render = fn => {
    loopId = guid()
    isOn = true
    renderFN = fn
    onRenderLoop(
      () => renderFN(),
      () => {return {isOn, loopId}},
      constant, 
      () => delays,
      filterDelays
    )
  }
  const off = () => {
    isOn = false
    loopId = undefined
  }
  const filterDelays = () => delays = delays.filter(obj => obj.i < obj.frames)
  const on = () => {
    isOn = true
    onRenderLoop(
      () => renderFN(),
      () => {return {isOn, loopId}},
      constant,
      () => delays,
      filterDelays
    )
  }
  const delay = (frames, fn) => delays.push({i: 0, frames, fn})

  return {
    onRender, setOn, render, off, on, delay
  }
}

const onRenderLoop = (getFn, isRendering, constant, getDelays, filterDelays) => {
  const render = (loopId) => {
    if(isRendering().isOn && isRendering().loopId === loopId){
      const framerate = 1000 / constant.FRAMES_PER_SECOND
      const delta = Date.now()
      getFn()
      getDelays().forEach(obj => {
        obj.i++
        if(obj.i >= obj.frames)
          obj.fn()
      })
      filterDelays()
      const deltaTime = Date.now() - delta
      if ((deltaTime >= framerate)) 
          requestAnimationFrame(() => render(loopId))
      else setTimeout(
        () => requestAnimationFrame(() => render(loopId)), 
        framerate - deltaTime
      )
    }
  } 
  render(isRendering().loopId)
}

export default setup