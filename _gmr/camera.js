export default () => {
  let position = {x: 0, y:0}
  let zoom = 1
  const getPosition = () => position
  const getZoom = () => zoom

  const setPosition = (x, y) => {
    position = {x, y}
  }
  const setZoom = val => {
    zoom = val
  }
  return {
    getPosition, getZoom, setPosition, setZoom
  }
}