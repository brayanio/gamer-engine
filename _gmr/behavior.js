export default (name, initObj, initFn, ...requires) => {
  let behaviorObj = {...initObj}

  const attach = (sprite, ...props) => {
    requires.forEach(b => b.attach(sprite))
    let error = sprite.addBehavior(name, () => detatch(sprite))
    if(!error){
      const obj = {...behaviorObj}
      Object.keys(obj).forEach(key => {
        if(typeof obj[key] === 'function')
          sprite[key] = (...props) => obj[key](sprite, ...props)
        else 
          sprite[key] = obj[key]
      })
      if(initFn) initFn(sprite, ...props)
    }
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