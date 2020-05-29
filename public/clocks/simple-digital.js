const FONT_SIZE = 60

export const WIDTH = 300
export const HEIGHT = 70

const formatUnit = unit => ("0" + Math.floor(unit)).slice(-2)
export default (ctx, ...units) => {
  const text = units.slice(0, 3).map(formatUnit).join(":")

  const yellow = ctx.createLinearGradient(0, 0, 0, HEIGHT)
  yellow.addColorStop(0.0, "yellow")
  yellow.addColorStop(1.0, "orange")

  const pink = ctx.createLinearGradient(0, 0, 0, HEIGHT)
  pink.addColorStop(0.0, "magenta")
  pink.addColorStop(1.0, "purple")

  ctx.clearRect(0, 0, WIDTH, HEIGHT)

  // ctx.fillStyle = "magenta"
  // ctx.rect(0, 0, WIDTH, HEIGHT)
  // ctx.fill()

  ctx.font = "80px cursive"
  ctx.strokeStyle = pink
  ctx.lineWidth = 4
  ctx.strokeText(text, 2, HEIGHT - 20 + 2, WIDTH - 20)

  ctx.font = "80px cursive"
  ctx.fillStyle = yellow
  ctx.fillText(text, 0, HEIGHT - 20, WIDTH - 20)
}
