/**
 * Dateを hh:mm形式に変換
 * @param {Date} time
 */
export const getFormatedTime = time => {
  if (!(time instanceof Date)) return null
  const hour = `0${time.getHours()}`.slice(-2)
  const min = `0${time.getMinutes()}`.slice(-2)
  return `${hour}:${min}`
}

/**
 * Dateを yyyy-mm-dd形式に変換
 * @param {Date} time
 */
export const getFormatedDate = time => {
  if (!(time instanceof Date)) return null
  const year = time.getFullYear()
  const month = `0${time.getMonth() + 1}`.slice(-2)
  const date = `0${time.getDate()}`.slice(-2)
  return `${year}-${month}-${date}`
}
