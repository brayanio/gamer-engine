let animations = []
;[
    ['Attacking', 11],
    ['Dying', 14],
    ['Hurt', 11],
    ['Idle', 11],
    ['Jump Loop', 5],
    ['Jump Start', 5],
    ['Taunt', 17],
    ['Walking', 17],
]
.forEach(animation => {
    let imgs = []
    for(let i = 0; i <= animation[1]; i++){
        let index = (i < 10) ? `0${i}` : i
        imgs.push(`./asset/green-mage/${animation[0]}/${animation[0]}_0${index}.png`)
    }
    animations.push([animation[0], ...imgs])
})

export default animations