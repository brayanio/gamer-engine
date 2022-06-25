> # Camera
> The camera is used to zoom and pan through a scene.
>
> > [`gmrInstance.camera.getPosition`](#getposition--x-number-y-number)
>
> > [`gmrInstance.camera.getZoom`](#getzoom--number)
>
> > [`gmrInstance.camera.setPosition`](#setposition--undefined)
>
> > [`gmrInstance.camera.setZoom`](#setzoom--undefined)
>
> > gmrInstance.camera.pan
>
> > gmrInstance.camera.panInfo
>
> > gmrInstance.camera.panToSprite
>
> > gmrInstance.camera.followSprite
>
> > gmrInstance.camera.clearFollow
>
> > gmrInstance.camera.followInfo
>
> > gmrInstance.camera.shake
> ---

> ## getPosition | `{x: number, y: number}`
> ```
> const pos = gmrInstance.camera.getPosition()
> ```
> ---

> ## getZoom | `number`
> ```
> const zoomVal = gmrInstance.camera.getZoom()
> ```
> ---

> ## setPosition | `undefined`
> ```
> gmrInstance.camera.setPosition( x, y )
> ```
> x | `number`
>
> * X axis position
>
> y | `number`
>
> * Y axis position
> ---

> ## setZoom | `undefined`
> ```
> gmrInstance.camera.setPosition( zoomValue )
> ```
> zoomValue | `number`
>
> * Set zoom *(0.5 - 2)*
> ---