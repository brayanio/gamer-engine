# Ecosystem

> gmr uses a simple ecosystem of data types to quickly create powerful scenes.

The gmr ecosystem includes:

* gmr
  * A function that takes a HTMLElement (div) and returns a gmrInstance. 
  * Use the gmrInstance to create scenes, sprites, behaviors, or ui for your canvas.
* scene
  * Holds all sprites and initialization code for one "page" of the game (home scene, play scene, credits scene, ...etc).
* sprite
  * An object within the scene. 
  * Contains information like positioning. 
  * Usually display images / animations.
* prefab
  * Serves as a factory for creating and instantiating sprites.
  * Usually add behaviors to a sprite before returning the sprite.
  * Used for loading images (animations) the scene / canvas will need to render sprites.
* behavior
  * Adds functionality to a sprite (movement behavior, healthbar behavior, projectile behavior, ...etc).
* ui
  * Creates HTML that sits above your canvas.

## Flow

> gmr will have you coding reusable scripts in no time.

The best way to organize gmr is to create lots of focused one-goal specific behaviors. You can quickly create complex sprites that share many of the same functionalities.

## Documentation

* gmr
* gmrAnimation
* gmrBehavior
* gmrCamera
* gmrCanvas
* gmrImgManager
* gmrInstance
* gmrKeyManager
* gmrPrefab
* gmrRenderLoop
* gmrScene
* gmrSprite
* gmrUI