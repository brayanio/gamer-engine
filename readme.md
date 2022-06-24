# gmr 

## Ecosystem

> gmr uses a simple ecosystem of data types to quickly create powerful scenes.

The gmr ecosystem includes:

* gmr
* scene
* sprite
* behavior
* ui

### gmr

gmr takes a div and returns a gmrInstance. You can use the gmrInstance to create scenes, sprites, behaviors, or ui for your canvas.

### scene

A scene holds all sprites and initialization code for one "page" of the game (home scene, play scene, credits scene, ...etc).

### sprite

A sprite is an object within the scene. They contain important information like positioning. Usually sprites contain images / animations.

### behavior

Adds functionality to a sprite (movement behavior, healthbar behavior, projectile behavior, ...etc).

### ui

Creates HTML that sits above your canvas.

## Flow

> gmr will have you coding reusable code in no time.

The best way to organize gmr is to create lots of focused one-goal specific behaviors. You can quickly create complex sprites that share many of the same functionalities.