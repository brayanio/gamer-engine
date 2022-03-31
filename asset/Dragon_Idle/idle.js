let imgs = []
for(let i = 0; i < 18; i++){
  let index = (i < 10) ? `0${i}` : i
  imgs.push(`./asset/Dragon_Idle/Idle_0${index}.png`)
}
export default imgs