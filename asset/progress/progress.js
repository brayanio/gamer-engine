let animations = []
;[
    ['Background', 'bg'],
    ['Exp', 'exp'],
    ['Life', 'life'],
    ['Mana', 'mana'],
]
.forEach(animation => 
  animations.push([animation[0],
    `./asset/progress/progress-${animation[1]}.png`
  ])
)

export default animations