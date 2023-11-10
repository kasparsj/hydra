import html from 'choo/html'
import Component from 'choo/component'
// import Hydra from 'hydra-synth'
// const HydraSynth = require('./../../../../../hydra-synth')
import PatchBay from './../lib/patch-bay/pb-live.js'

let pb

// const SERVER_URL = process.env['SERVER_URL']

export default class HydraCanvas extends Component {
  constructor(id, state, emit) {
    super(id)
    this.local = state.components[id] = {}
    state.hydra = this // hacky
    this.state = state
    this.emit = emit
  }

  load(element) {
    let isIOS =
      (/iPad|iPhone|iPod/.test(navigator.platform) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
      !window.MSStream;
    let precisionValue = isIOS ? 'highp' : 'mediump'


    let searchParams = new URLSearchParams(window.location.search)
    let webgl = sessionStorage.getItem('webgl')
    if (searchParams.has('webgl')) {
      webgl = searchParams.get('webgl')
      sessionStorage.setItem('webgl', webgl)
    }
    const hydraOptions = { detectAudio: true, canvas: element.querySelector("canvas"), precision: precisionValue, webgl }
    
    if (this.state.serverURL === null) {
      console.log('LOCAL ONLY, WILL NOT INIT webRTC and gallery')
      this.hydra = new Hydra(hydraOptions)
    } else {
      this.pb = new PatchBay()
      hydraOptions.pb = this.pb
      this.hydra = new Hydra(hydraOptions)
      this.pb.init(this.hydra.captureStream, {
        // server: window.location.origin,
        server: this.state.serverURL,
        room: 'iclc'
      })
      window.pb = this.pb
    }

    window.hydraSynth = this.hydra
    //  if(environment !== 'local') {
    // osc().out()

    // }

    // window.pb = pb

    this.emit('hydra loaded')
  }

  update(center) {
    return false
  }

  createElement({ width = window.innerWidth, height = window.innerHeight } = {}) {

    return html`<div style="width:100%;height:100%;">
        <canvas id="hydra-canvas" class="bg-black" style="image-rendering:pixelated; width:100%;height:100%" width="${width}" height="${height}"></canvas></div>`
  }
}
