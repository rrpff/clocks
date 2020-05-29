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
  const r = (hours / 24) * 256 - 1
  const g = (minutes / 60) * 256 - 1
  const b = (seconds / 60) * 256 - 1

  const faceColour = `${255 - r}, ${255 - g}, ${255 - b}`
  const handColour = `${r}, ${g}, ${b}`

  ctx.clearRect(0, 0, WIDTH, HEIGHT)

  ctx.fillStyle = `rgba(${faceColour}, 0.5)`
  ctx.beginPath()
  ctx.arc(RADIUS, RADIUS, RADIUS, 0, 2 * Math.PI)
  ctx.fill()

  ctx.font = "bold 20px sans-serif"
  ctx.fillStyle = `rgba(${handColour}, 0.5)`
  ctx.textAlign = "center"

  for (let i = 1; i <= 12; i++) {
    const degrees = i * 30
    const radians = Math.PI - Math.PI * (degrees / 180)
    const currentHour = i === Math.floor(hours) % 12
    ctx.font = currentHour ? "bold 20px sans-serif" : "20px sans-serif"

    ctx.fillText(i, RADIUS + RADIUS * Math.sin(radians) * 0.86, 8 + RADIUS + RADIUS * Math.cos(radians) * 0.86)
  }

  ctx.fillStyle = `rgb(${handColour})`
  ctx.beginPath()
  ctx.arc(RADIUS, RADIUS, RADIUS * 0.04, 0, 2 * Math.PI)
  ctx.fill()

  const hourRotation = Math.PI - (hours / 12 * 2 * Math.PI)
  ctx.strokeStyle = `rgb(${handColour})`
  ctx.lineWidth = HOUR_HAND_WIDTH
  ctx.beginPath()
  ctx.moveTo(RADIUS, RADIUS)
  ctx.lineTo(HOUR_HAND_LENGTH * Math.sin(hourRotation) + RADIUS, HOUR_HAND_LENGTH * Math.cos(hourRotation) + RADIUS)
  ctx.stroke()

  const minuteRotation = Math.PI - (minutes / 60 * 2 * Math.PI)
  ctx.strokeStyle = `rgb(${handColour})`
  ctx.lineWidth = MINUTE_HAND_WIDTH
  ctx.beginPath()
  ctx.moveTo(RADIUS, RADIUS)
  ctx.lineTo(MINUTE_HAND_LENGTH * Math.sin(minuteRotation) + RADIUS, MINUTE_HAND_LENGTH * Math.cos(minuteRotation) + RADIUS)
  ctx.stroke()

  const secondRotation = Math.PI - (Math.floor(seconds) / 60 * 2 * Math.PI)
  ctx.strokeStyle = `rgb(${handColour})`
  ctx.lineWidth = SECOND_HAND_WIDTH
  ctx.beginPath()
  ctx.moveTo(RADIUS, RADIUS)
  ctx.lineTo(SECOND_HAND_LENGTH * Math.sin(secondRotation) + RADIUS, SECOND_HAND_LENGTH * Math.cos(secondRotation) + RADIUS)
  ctx.stroke()
}
