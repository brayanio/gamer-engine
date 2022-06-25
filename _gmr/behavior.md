# Behavior

Behaviors serve to add modular functionality to sprites.

```
const behavior = gmrInstance.behavior(
  name, 
  cloneObj, 
  initFN, 
  ...requires 
)
```
> # gmrInstance.behavior | gmrBehavior
> name | string
> * Unique behavior name used to avoid adding the same behavior multiple times.
>
> cloneObj | object
> * Adds a clone of each key value pair to the attached sprite.
> * Functions passed will **always** pass the sprite as the first argument.
>
> initFN | function
> * Run a function that passes the sprite as the first argument.
> * Any arguments passed to the 'behavior.attach' will be passed to the initFN as well.
>
> ...requires | gmrBehavior
> * Any required behaviors will be attached to the sprite before the parent behavior attaches.

```
behavior.attach( sprite, ...props )
```

> # gmrBehavior.attach | undefined
> sprite | gmrSprite
> * Target sprite to add the behavior to.
>
> props | any
> * Arguments passed to the initFN of the behavior