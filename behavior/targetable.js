import gmr from '../_gmr/gmr.js'

const emptyfn = () => {}
export default gmr.behavior(
  'targetable',
  {
    targetSelectFn: emptyfn,
    targetSelect: sprite => {
      sprite.trackUI('target-select', 'button')
      sprite.getUI('target-select').classList.add('target-select')
      sprite.getUI('target-select').focus()
      sprite.getUI('target-select').onclick = () => {
        sprite.clearUI('target-select')
        sprite.targetSelectFn()
      }
    },
    targetClear: sprite => sprite.clearUI('target-select'),
    onTargetSelect: (sprite, fn) => sprite.targetSelectFn = fn
  }
)