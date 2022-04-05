import loadScreen from './loading.js'

const imgManager = document.getElementById('imgs')
let expected = 0
let loading = 0
let onImgLoadFN, onSceneLoadFN

const loadImg = (...srcArray) => {
  loadScreen(onImgLoad)
  const filteredSrcArray = [...new Set(srcArray)]
  expected += filteredSrcArray.length
  filteredSrcArray.forEach(src => {
    const img = document.createElement('img')
    img.src = src
    img.onload = () => {
      loading++
      onImgLoadFN(loading, expected, loading / expected)
      if(loading === expected){
        onSceneLoadFN()
        onSceneLoadFN = undefined
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

const clearImgManager = () => {
  Array.from( imgManager.querySelectorAll(`:not([gamer-keep])`) )
    .forEach( el => imgManager.removeChild( el ))
}

const switchScene = (...srcArray) => {
  srcArray.forEach(src => {
    let el = imgManager.querySelector(`[src="${src}"]`)
    if(el) el.addAttribute('gamer-keep', true)
  })
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
  onImgLoad, clearImgManager, switchScene
}