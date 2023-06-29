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

module.exports = {
  init: (el) => {
    // logElement = document.createElement('div')
    // logElement.className = "console cm-s-tomorrow-night-eighties"
    // document.body.appendChild(logElement)
    logElement = el
    if (logElement) {
      window.requestAnimationFrame(tick);
    }
  },
  log: (msg, className = "") => {
    console.log('logging', msg, className)
    lastMsg = `<span className=${className}> ${msg} </span>`;
    draw();
  },
  hide: () => {
    if(logElement) logElement.style.display = 'none'
  },
  show: () => {
    if(logElement) logElement.style.display = 'block'
  },
  toggle: () => {
    if(logElement.style.display == 'none') {
      logElement.style.display = 'block'
    } else {
      logElement.style.display = 'none'
    }
  }
}
