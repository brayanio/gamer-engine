const el = document.createElement('div')
el.classList.add('loading')

const progress = document.createElement('progress')
el.appendChild(progress)

document.body.appendChild(el)

export default onImgLoad => {
  document.body.appendChild(el)
  onImgLoad((loading, expected, percentage) => {
    progress.setAttribute('value', loading)
    progress.setAttribute('max', expected)
    progress.innerText = Math.ceil(percentage * 100) + '%'
    if(percentage === 1 || !percentage)
      document.body.removeChild(el)
  })
}