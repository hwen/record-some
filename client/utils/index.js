export function scrollTo (element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = difference / duration * 10
  setTimeout(() => {
    console.log(new Date())
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

export function getTime (type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * more pretty log for console.log
 * and only log on dev mode
 * 如果 force 为 true 则总是会打印
 * @param {*} info
 */
export function logSome (info, force = false) {
  const type = {}.toString.call(info).slice(8, -1)
  if (force || process.env.NODE_ENV === 'development') {
    if (type !== 'Object') {
      console.log(`%c${info}`, 'color: #8b80f9;font-weight:bold;')
    } else {
      console.log(`%c====== log ======`, 'color: #8b80f9;font-weight:bold;')
      console.log(info)
    }
  }
}
