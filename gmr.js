import gmr from './_gmr/gmr.js'
import CONSTANT from './constant.js'

const div = document.body.querySelector('#app')
const app = gmr( div, CONSTANT )
app.startKeyListener()

export default app