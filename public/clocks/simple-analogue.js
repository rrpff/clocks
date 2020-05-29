const RADIUS = 150
const HOUR_HAND_LENGTH = RADIUS * 0.7
const HOUR_HAND_WIDTH = 3
const MINUTE_HAND_LENGTH = RADIUS * 0.9
const MINUTE_HAND_WIDTH = 3
const SECOND_HAND_LENGTH = RADIUS * 0.8
const SECOND_HAND_WIDTH = 1

export const WIDTH = RADIUS * 2
export const HEIGHT = RADIUS * 2

export default (ctx, hours, minutes, seconds) => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT)

  ctx.fillStyle = "#ddd"
  ctx.beginPath()
  ctx.arc(RADIUS, RADIUS, RADIUS, 0, 2 * Math.PI)
  ctx.fill()

  ctx.fillStyle = "white"
  ctx.beginPath()
  ctx.arc(RADIUS, RADIUS, RADIUS * 0.985, 0, 2 * Math.PI)
  ctx.fill()

  ctx.font = "20px sans-serif"
  ctx.fillStyle = "#ccc"
  ctx.textAlign = "center"

  for (let i = 1; i <= 12; i++) {
    const degrees = i * 30
    const radians = Math.PI - Math.PI * (degrees / 180)
    ctx.fillText(i, RADIUS + RADIUS * Math.sin(radians) * 0.86, 8 + RADIUS + RADIUS * Math.cos(radians) * 0.86)
  }

  const hourRotation = Math.PI - (hours / 12 * 2 * Math.PI)
  ctx.strokeStyle = "black"
  ctx.lineWidth = HOUR_HAND_WIDTH
  ctx.beginPath()
  ctx.moveTo(RADIUS, RADIUS)
  ctx.lineTo(HOUR_HAND_LENGTH * Math.sin(hourRotation) + RADIUS, HOUR_HAND_LENGTH * Math.cos(hourRotation) + RADIUS)
  ctx.stroke()

  const minuteRotation = Math.PI - (minutes / 60 * 2 * Math.PI)
  ctx.strokeStyle = "black"
  ctx.lineWidth = MINUTE_HAND_WIDTH
  ctx.beginPath()
  ctx.moveTo(RADIUS, RADIUS)
  ctx.lineTo(MINUTE_HAND_LENGTH * Math.sin(minuteRotation) + RADIUS, MINUTE_HAND_LENGTH * Math.cos(minuteRotation) + RADIUS)
  ctx.stroke()

  ctx.fillStyle = "red"
  ctx.beginPath()
  ctx.arc(RADIUS, RADIUS, RADIUS * 0.04, 0, 2 * Math.PI)
  ctx.fill()

  const secondRotation = Math.PI - (seconds / 60 * 2 * Math.PI)
  ctx.strokeStyle = "red"
  ctx.lineWidth = SECOND_HAND_WIDTH
  ctx.beginPath()
  ctx.moveTo(RADIUS, RADIUS)
  ctx.lineTo(SECOND_HAND_LENGTH * Math.sin(secondRotation) + RADIUS, SECOND_HAND_LENGTH * Math.cos(secondRotation) + RADIUS)
  ctx.stroke()
}
