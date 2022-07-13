import guid from './guid.js'

export default (getOptions, camera) => {
  let isOn = false
  let renderFN
  let delays = []
  let loopId

  const onRender = fn => renderFN = fn
  const setOn = b => isOn = b
  const render = fn => {
    if(fn) renderFN = fn
    if(renderFN){
      loopId = guid()
      isOn = true
      onRenderLoop(
        () => renderFN(),
        () => {return {isOn, loopId}},
        getOptions, camera,
        () => delays,
        filterDelays
      )
    }
  }
  const off = () => {
    isOn = false
    loopId = undefined
  }
  const filterDelays = () => delays = delays.filter(obj => obj.i < obj.frames)
  const delay = (frames, fn) => delays.push({i: 0, frames, fn})

  return {
    onRender, setOn, render, off, on: render, delay
  }
}

const onRenderLoop = (getFn, isRendering, getOptions, camera, getDelays, filterDelays) => {
  const render = (loopId) => {
    if(isRendering().isOn && isRendering().loopId === loopId){
      const framerate = 1000 / getOptions().FRAMES_PER_SECOND
      const delta = Date.now()
      if(camera.panInfo().isPanning) camera.pan()
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