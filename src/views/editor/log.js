let appState, logElement, prefix, lastMsg;
const fpsArr = [];
const fpsCount = 60;
let lastUpdate = 0;

const tick = () => {
  window.requestAnimationFrame(tick);
  if (window.stats) {
    fpsArr.push(window.stats.fps);
    if (fpsArr.length > fpsCount) {
      fpsArr.shift();
    }
  }
  const now = Date.now();
  if (now - lastUpdate >= 1000) {
    lastUpdate = now;
    const out = appState ? appState.hydra.hydra.output.id : 0;
    const fps = (fpsArr.reduce((a, b) => a + b, 0) / fpsCount).toFixed(1);
    prefix = `out: ${out} | ${fps} >> `;
    draw();
  }
}

const draw = () => {
  if (logElement) logElement.innerHTML =`${prefix} ${lastMsg}`;
}

const init = (state, el) => {
  // logElement = document.createElement('div')
  // logElement.className = "console cm-s-tomorrow-night-eighties"
  // document.body.appendChild(logElement)
  appState = state
  logElement = el
  if (logElement) {
    window.requestAnimationFrame(tick);
  }
}
const log = (msg, className = "") => {
  console.log('logging', msg, className)
  lastMsg = `<span class=${className}> ${msg} </span>`;
  draw();
}
const error = (msg, className = "log-error") => {
  log(msg, className);
}
const hide = () => {
  if (logElement) logElement.style.display = 'none'
}
const show = () => {
  if (logElement) logElement.style.display = 'block'
}
const toggle = () => {
  if (logElement.style.display == 'none') {
    logElement.style.display = 'block'
  } else {
    logElement.style.display = 'none'
  }
}


const exports = { init, log, error, hide, show, toggle }
export { exports as default, log, error, hide, show, toggle }