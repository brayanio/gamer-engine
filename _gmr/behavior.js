export default (name, initObj, initFn, ...extend) => {
  let behaviorObj = {...initObj}

  const attach = sprite => {
    extend.forEach(b => b.attach(sprite))
    sprite.addBehavior(name, () => detatch(sprite))
    const obj = {...behaviorObj}
    Object.keys(obj).forEach(key => {
      if(typeof obj[key] === 'function')
        sprite[key] = (...props) => obj[key](sprite, ...props)
      else 
        sprite[key] = obj[key]
    })
    if(initFn) initFn(sprite)
  }

  const detatch = sprite => {
    Object.keys(behaviorObj).forEach(key => {
      delete sprite[key]
    })
    sprite.removeBehavior(name)
  }

  const add = (name, val) => {
    behaviorObj[name] = val
  }

  return {
    add, attach
  }
}