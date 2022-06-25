export default (shake, getOptions) => {
  let position = {x: 0, y:0}
  let zoom = 1
  let isPanning = false, panTarget, panCurrent, panStep
  let isFollowing = false, followTarget, followFrames
  const getPosition = () => position
  const getZoom = () => zoom

  const panInfo = () => {
    return {
      isPanning,
      panTarget,
      panCurrent,
      panStep
    }
  }

  const followInfo = () => {
    return {
      isFollowing,
      followTarget,
      followFrames
    }
  }

  const pan = (x, y, frames) => {
    if(frames){
      isPanning = true
      panCurrent = 0
      panTarget = {x, y, frames, panCurrent, position: {...position}}
      panStep = {
        x: (x - position.x) / frames,
        y: (y - position.y) / frames
      }
    } else if(panCurrent < (panTarget.frames - 1)) {
      panCurrent ++
      setPosition(
        panTarget.position.x + (panStep.x * panCurrent),
        panTarget.position.y + (panStep.y * panCurrent)
      )
    } else {
      setPosition(panTarget.x, panTarget.y)
      isPanning = false
      panTarget = undefined
      panCurrent = undefined
      panStep = undefined
    }
  }

  const followSprite = (sprite, frames) => {
    isFollowing = true
    followTarget = sprite
    followFrames = frames
  }

  const clearFollow = () => {
    isFollowing = false
    followTarget = undefined
    followFrames = undefined
  }

  const panToSprite = (sprite, frames) => pan(
    (getOptions().RESOLUTION[0] / 2) + (sprite.getCenter().x * -1) * zoom,
    (getOptions().RESOLUTION[1] / 2) + (sprite.getCenter().y * -1) * zoom,
    frames
  )

  const setPosition = (x, y) => {
    position = {x, y}
  }
  const setZoom = val => {
    zoom = val
    if(followTarget) panToSprite(followTarget, followFrames)
  }

  return {
    getPosition, getZoom, setPosition, setZoom, 
    pan, panInfo, panToSprite,
    followSprite, clearFollow, followInfo,
    shake
  }
}