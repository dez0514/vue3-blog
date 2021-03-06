export const randomInterval = (min: number, max: number, decimal?: number) => {
  if (decimal) {
    return Number((Math.random() * (max - min) + min).toFixed(decimal))
  }
  return Number(Math.random() * (max - min) + min)
}

export const createBubble = ({
  width,
  height,
  direction,
  interval
}: {
  width: number
  height: number
  direction: 'vertical' | 'horizontal'
  interval?: number[]
}) => {
  // console.log('interval==', height)
  const r = randomInterval(6, 12)
  // console.log('interval==', r)
  // console.log('width==', width)
  let x
  let y
  const isVertical = direction === 'vertical'
  if (isVertical) {
    const start = interval && interval.length > 0 ? interval[0] : r
    const end = interval && interval.length > 1 ? interval[1] : width - r
    x = randomInterval(start, end)
    // console.log('xxxxx==', start, end, x)
    y = randomInterval(height + r, height * 2 - r)
  } else {
    const start = interval && interval.length > 0 ? interval[0] : r
    const end = interval && interval.length > 1 ? interval[1] : height - r
    x = -randomInterval(r, 400)
    y = randomInterval(start, end)
  }
  return {
    r,
    x,
    y,
    y_speed: randomInterval(0.2, 0.6),
    x_speed: randomInterval(0.2, 0.6),
    alpha: randomInterval(0.1, 0.4),
    alpha_speed: isVertical ? randomInterval(0.0002, 0.0007) : randomInterval(0.0001, 0.0004)
  }
}