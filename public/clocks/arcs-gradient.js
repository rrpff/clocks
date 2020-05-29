const RADIUS = 150
export const WIDTH = 50 + RADIUS * 2
export const HEIGHT = 50 + RADIUS * 2
const CENTER = [WIDTH / 2, HEIGHT / 2]

export default (ctx, hours, minutes, seconds) => {
  const hourRotation = (hours / 24 * 2 * Math.PI)
  const minuteRotation = (minutes / 60 * 2 * Math.PI)
  const secondRotation = (seconds / 60 * 2 * Math.PI)

  const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT)
  gradient.addColorStop(0.0, "#ddd")
  gradient.addColorStop(1.0, "#000")

  ctx.lineWidth = 40
  ctx.strokeStyle = gradient

  ctx.clearRect(0, 0, WIDTH, HEIGHT)

  ctx.beginPath()
  ctx.arc(...CENTER, RADIUS * 0.99, 0, hourRotation)
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(...CENTER, RADIUS * 0.66, 0, minuteRotation)
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(...CENTER, RADIUS * 0.33, 0, secondRotation)
  ctx.stroke()
}
