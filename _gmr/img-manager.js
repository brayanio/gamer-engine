import loadScreen from "./load-screen.js"

let el

export default () => {
  if(!el) {
    el = document.createElement('div')
    el.classList.add('gmr-img-manager')
  }

  let expected = 0
  let loading = 0
  let onImgLoadFN, onSceneLoadFN

  const onSceneLoad = fn => onSceneLoadFN = fn
  const onImgLoad = fn => onImgLoadFN = fn
  const getExpected = () => expected
  const getLoading = () => loading
  const sceneLoad = (...props) => onSceneLoadFN(...props)
  const imgLoad = (...props) => onImgLoadFN(...props)
  const reset = () => {
    onSceneLoadFN = undefined
    onImgLoadFN = undefined
    expected = 0
    loading = 0
  }
  const clear = () => 
    Array.from( el.querySelectorAll(`:not([gamer-keep])`) )
      .forEach( e => el.removeChild( e ))
  
  const switchScene = (...srcArray) => {
    srcArray.forEach(src => {
      let e = el.querySelector(`[src="${src}"]`)
      if(e) e.addAttribute('gamer-keep', true)
    })
    clear()
    Array.from(el.children).forEach(child => child.removeAttribute('gamer-keep'))
  }

  const loadImg = (...srcArray) => {
    loadScreen(onImgLoad)
    const filteredSrcArray = [...new Set(srcArray)]
    expected += filteredSrcArray.length
    filteredSrcArray.forEach(src => {
      const img = document.createElement('img')
      img.src = src
      img.onload = () => {
        loading++
        imgLoad(
          loading, 
          expected, 
          loading / expected
        )
        if(loading === expected){
          sceneLoad()
        }
      }
      el.appendChild(img)
    })
  }

  return {
    el, onSceneLoad, onImgLoad, 
    getExpected, getLoading,
    sceneLoad, imgLoad, reset,
    switchScene, loadImg, clear
  }
}