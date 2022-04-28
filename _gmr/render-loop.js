
const setup = (constant) => {
  let isOn = false
  let renderFN

  const onRender = fn => renderFN = fn
  const setOn = b => isOn = b
  const render = fn => {
    isOn = true
    renderFN = fn
    onRenderLoop(
      () => renderFN(),
      () => isOn,
      constant
    )
  }
  const off = () => isOn = false

  return {
    onRender, setOn, render, off
  }
}

const onRenderLoop = (getFn, isRendering, constant) => {
  const render = () => {
    if(isRendering()){
      const framerate = 1000 / constant.FRAMES_PER_SECOND
      const delta = Date.now()
      getFn()
      const deltaTime = Date.now() - delta
      if ((deltaTime >= framerate)) 
          requestAnimationFrame(render)
      else setTimeout(
        () => requestAnimationFrame(render), 
        framerate - deltaTime
      )
    }
  }
  render()
}

export default setup