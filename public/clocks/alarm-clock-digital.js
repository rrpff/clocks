const FONT_SIZE = 60

export const WIDTH = 320
export const HEIGHT = 80

const formatUnit = unit => ("0" + Math.floor(unit)).slice(-2)
export default (ctx, hours, minutes, seconds, ms) => {
  ctx.fillStyle = "black"
  ctx.rect(0, 0, WIDTH, HEIGHT)
  ctx.fill()

  ctx.font = "60px monospace"
  ctx.textAlign = "center"

  ctx.fillStyle = `rgba(0, 255, 0, 1)`
  ctx.fillText(formatUnit(hours), WIDTH / 2 - 100, HEIGHT - 20)
  ctx.fillText(formatUnit(minutes), WIDTH / 2, HEIGHT - 20)
  ctx.fillText(formatUnit(seconds), WIDTH / 2 + 100, HEIGHT - 20)

  const flash = 0.5 + Math.abs((ms % 1000 / 1000) - 0.5)
  ctx.fillStyle = `rgba(0, 255, 0, ${flash})`
  ctx.fillText(":", WIDTH / 2 - 50, HEIGHT - 25)
  ctx.fillText(":", WIDTH / 2 + 50, HEIGHT - 25)
}
