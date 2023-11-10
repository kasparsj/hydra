let logElement, prefix, lastMsg;
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
    const fps = (fpsArr.reduce((a, b) => a + b, 0) / fpsCount).toFixed(1);
    prefix = `${fps} >> `;
    draw();
  }
}

const draw = () => {
  if (logElement) if(logElement) logElement.innerHTML =`${prefix} ${lastMsg}`;
}

const init = (el) => {
  // logElement = document.createElement('div')
  // logElement.className = "console cm-s-tomorrow-night-eighties"
  // document.body.appendChild(logElement)
  logElement = el
  if (logElement) {
    window.requestAnimationFrame(tick);
  }
}
const log = (msg, className = "") => {
  console.log('logging', msg, className)
  lastMsg = `<span className=${className}> ${msg} </span>`;
  draw();
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


const exports = { init, log, hide, show, toggle }
export { exports as default, log, hide, show, toggle }