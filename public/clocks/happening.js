// const MESSAGE = " ITIS HAPP ENIN GAGA IN-- ---- ITIS HAPP ENIN GAGA IN-- ----"
const MESSAGE = "ITISHAPPENINGAGAIN--ITISHAPPENINGAGAIN--ITISHAPPENINGAGAIN--"

const RADIUS = 150
const HOUR_HAND_LENGTH = RADIUS * 0.7
const HOUR_HAND_WIDTH = 3
const MINUTE_HAND_LENGTH = RADIUS * 0.9
const MINUTE_HAND_WIDTH = 3
const SECOND_HAND_CIRCLE_CENTER = RADIUS * 0.86
const SECOND_HAND_LENGTH = SECOND_HAND_CIRCLE_CENTER - 20
const SECOND_HAND_WIDTH = 1.5

export const WIDTH = 50 + RADIUS * 2
export const HEIGHT = 50 + RADIUS * 2

export default (ctx, hours, minutes, seconds) => {
  const handColour = `${255}, ${50}, ${50}`

  ctx.clearRect(0, 0, WIDTH, HEIGHT)

  ctx.fillStyle = "black"
  ctx.beginPath()
  ctx.arc(WIDTH / 2, HEIGHT / 2, RADIUS, 0, 2 * Math.PI)
  ctx.fill()

  ctx.textAlign = "center"

  for (let i = 0; i <= 59; i++) {
    const tickRotation = Math.PI - (i / 60 * 2 * Math.PI)
    const currentSecond = Math.floor(seconds) === i
    const onMinuteText = i % 5 === 0

    if (onMinuteText && !currentSecond) continue

    const length = currentSecond ? SECOND_HAND_LENGTH : RADIUS

    ctx.lineWidth = SECOND_HAND_WIDTH
    ctx.strokeStyle = currentSecond ? `rgb(${handColour})` : `rgba(${handColour}, 0.3)`
    ctx.beginPath()
    ctx.moveTo(WIDTH / 2, HEIGHT / 2)
    ctx.lineTo(length * Math.sin(tickRotation) + WIDTH / 2, length * Math.cos(tickRotation) + HEIGHT / 2)
    ctx.stroke()

    if (currentSecond) {
      const tickChar = MESSAGE[i]

      ctx.font = currentSecond ? "bold 16px sans-serif" : "16px sans-serif"
      ctx.fillStyle = currentSecond ? `rgba(${handColour}, 1)` : `rgba(${handColour}, 0.5)`
      ctx.fillText(tickChar, WIDTH / 2 + RADIUS * Math.sin(tickRotation) * 0.86, 8 + HEIGHT / 2 + RADIUS * Math.cos(tickRotation) * 0.86)

      ctx.beginPath()
      ctx.arc(SECOND_HAND_CIRCLE_CENTER * Math.sin(tickRotation) + WIDTH / 2, SECOND_HAND_CIRCLE_CENTER * Math.cos(tickRotation) + HEIGHT / 2, 20, 0, 2 * Math.PI)
      ctx.stroke()
    }

    // if (currentSecond && !onMinuteText) {

    // }
  }

  for (let i = 1; i <= 12; i++) {
    const degrees = i * 30
    const radians = Math.PI - Math.PI * (degrees / 180)
    const currentSecond = i * 5 === Math.floor(seconds) || i * 5 === 60 && Math.floor(seconds) === 0

    if (currentSecond) continue

    ctx.font = currentSecond ? "bold 16px sans-serif" : "16px sans-serif"
    ctx.fillStyle = currentSecond ? `rgba(${handColour}, 1)` : `rgba(${handColour}, 0.5)`
    ctx.fillText(i, WIDTH / 2 + RADIUS * Math.sin(radians) * 0.86, 8 + HEIGHT / 2 + RADIUS * Math.cos(radians) * 0.86)
  }

  ctx.fillStyle = `rgb(${handColour})`
  ctx.beginPath()
  ctx.arc(WIDTH / 2, HEIGHT / 2, RADIUS * 0.04, 0, 2 * Math.PI)
  ctx.fill()

  const hourRotation = Math.PI - (hours / 12 * 2 * Math.PI)
  ctx.strokeStyle = `rgb(${handColour})`
  ctx.lineWidth = HOUR_HAND_WIDTH
  ctx.beginPath()
  ctx.moveTo(WIDTH / 2, HEIGHT / 2)
  ctx.lineTo(HOUR_HAND_LENGTH * Math.sin(hourRotation) + WIDTH / 2, HOUR_HAND_LENGTH * Math.cos(hourRotation) + HEIGHT / 2)
  ctx.stroke()

  const minuteRotation = Math.PI - (minutes / 60 * 2 * Math.PI)
  ctx.strokeStyle = `rgb(${handColour})`
  ctx.lineWidth = MINUTE_HAND_WIDTH
  ctx.beginPath()
  ctx.moveTo(WIDTH / 2, HEIGHT / 2)
  ctx.lineTo(MINUTE_HAND_LENGTH * Math.sin(minuteRotation) + WIDTH / 2, MINUTE_HAND_LENGTH * Math.cos(minuteRotation) + HEIGHT / 2)
  ctx.stroke()
}
