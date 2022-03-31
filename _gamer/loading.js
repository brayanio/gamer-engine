const el = document.createElement('div')
el.classList.add('loading')

const progress = document.createElement('progress')
el.appendChild(progress)

const label = document.createElement('label')
el.appendChild(label)

document.body.appendChild(el)

export default onImgLoad => {
  document.body.appendChild(el)
  onImgLoad((loading, expected, percentage) => {
    progress.setAttribute('value', loading)
    progress.setAttribute('max', expected)
    label.innerText = Math.ceil(percentage * 100) + '%'
    if(percentage === 1 || !percentage)
      document.body.removeChild(el)
  })
}