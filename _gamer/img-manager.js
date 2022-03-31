import loadScreen from './loading.js'

const imgManager = document.getElementById('imgs')
let expected = 0
let loading = 0
let onImgLoadFN, onSceneLoadFN

const checkImgLoaded = src => imgManager.querySelector(`[src="${src}"]`)

const loadImg = (...srcArray) => {
  loadScreen(onImgLoad)
  const filteredSrcArray = srcArray.filter(src => !checkImgLoaded(src))
  expected += filteredSrcArray.length
  filteredSrcArray.forEach(src => {
    const img = document.createElement('img')
    img.src = src
    img.onload = () => {
      loading++
      onImgLoadFN(loading, expected, loading / expected)
      if(loading === expected){
        onSceneLoadFN()
        expected = 0
        loading = 0
      }
    }
    imgManager.appendChild(img)
  })
}

const unloadImg = src => {
  Array.from( imgManager.querySelectorAll(`[src="${src}"]`) )
    .forEach(el => imgManager.removeChild(el))
}

const onSceneLoad = fn => {
  onSceneLoadFN = fn
}

const onImgLoad = fn => {
  onImgLoadFN = fn
}

const progress = () => loading / expected
const progressObj = () => {
  return { loading, expected }
}

export default { 
  el: imgManager, unloadImg, loadImg, 
  onSceneLoad, progress, progressObj, 
  onImgLoad
}