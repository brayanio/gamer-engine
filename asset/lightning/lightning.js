let animations = []
;[
  ['Idle', 3],
]
.forEach(animation => {
    let imgs = []
    for(let i = 1; i < animation[1]; i++){
      imgs.push(`./asset/lightning/lightning_${i}.png`)
      imgs.push(`./asset/lightning/lightning_${i}.png`)
      imgs.push(`./asset/lightning/lightning_${i}.png`)
    }
    animations.push([animation[0], ...imgs])
})

export default animations