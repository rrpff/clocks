const CLOCK_MODULES = [
  () => import("./clocks/simple-analogue.js"),
  () => import("./clocks/coloured-analogue.js"),
  () => import("./clocks/simple-digital.js"),
  () => import("./clocks/alarm-clock-digital.js"),
  () => import("./clocks/happening.js"),
  // () => import("./clocks/24-hour-single-use-timer.js"),
  () => import("./clocks/arcs.js"),
  () => import("./clocks/arcs-spin.js"),
]

const FPS_LABEL_EL = document.getElementById("fps-label")
const SPEED_LABEL_EL = document.getElementById("time-speed-label")
const SPEED_RANGE_EL = document.getElementById("time-speed")
const RESET_BUTTON_EL = document.getElementById("reset")

let STATE = {
  currentTimeSpeed: 1
}

const throttle = (fn, ms) => {
  let mayRun = true
  return (...args) => {
    if (!mayRun) return

    fn(...args)
    mayRun = false
    setTimeout(() => mayRun = true, ms)
  }
}

const renderDateFrame = (date, draw, next) => {
  const dayMs = date.getMilliseconds() + date.getSeconds() * 1000 + date.getMinutes() * 60 * 1000 + date.getHours() * 60 * 60 * 1000
  const hours = dayMs / 60 / 60 / 1000 % 24
  const minutes = dayMs / 60 / 1000 % 60
  const seconds = dayMs / 1000 % 60
  const milliseconds = dayMs % 1000

  if (draw) draw(hours, minutes, seconds, milliseconds)
  requestAnimationFrame(next)
}

const createClock = async loader => {
  const { default: render, WIDTH: width, HEIGHT: height } = await loader()

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  canvas.width = width
  canvas.height = height

  return {
    mount: container => container.appendChild(canvas),
    render: (...args) => render(ctx, ...args)
  }
}

const setTimeSpeed = e => {
  STATE.currentTimeSpeed = e.target.value
  SPEED_LABEL_EL.innerText = `time speed: x${e.target.value}`
}

const renderFrameContext = ({ fps }) => {
  FPS_LABEL_EL.innerText = `fps: ${fps}`
}

const reset = () => {
  SPEED_RANGE_EL.value = 1
  SPEED_LABEL_EL.innerText = "time speed: x1"
  STATE.currentTimeSpeed = 1
}

const createRenderer = fn => {
  let listeners = []
  let lastFrameTime = null

  const onframe = fn => {
    listeners.push(fn)
  }

  const render = ts => {
    const now = Date.now()
    const date = STATE.currentTimeSpeed === 1 ? new Date() : new Date(now + ts * STATE.currentTimeSpeed)
    const fps = lastFrameTime === null ? 0 : Math.round(1000 / (now - lastFrameTime))
    lastFrameTime = now

    renderDateFrame(date, fn, render)

    listeners.forEach(l => l({ fps }))
  }

  return { render, onframe }
}

SPEED_RANGE_EL.addEventListener("change", setTimeSpeed)
SPEED_RANGE_EL.addEventListener("mousemove", setTimeSpeed)
RESET_BUTTON_EL.addEventListener("click", reset)

;(async () => {
  const clocks = await Promise.all(CLOCK_MODULES.map(createClock))
  const container = document.querySelector(".container")
  clocks.forEach(clock => clock.mount(container))

  const renderer = createRenderer((...args) => clocks.forEach(clock => clock.render(...args)))
  renderer.onframe(throttle(renderFrameContext, 250))
  renderer.render()
})()
