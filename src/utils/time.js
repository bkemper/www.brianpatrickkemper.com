import { DateTime, Settings } from 'luxon'

Settings.defaultZoneName = 'America/New_York'

const pad = number => {
  const int = Math.floor(number)
  return String(int).length === 1 ? `0${int}` : int
}

// loops for each minute in a day and returns time or result of callback
export const mapEachMinute = (date, callback = (t) => t) => (
  Array.from(Array(24 * 60), (_value, index) => {
    const time = toISO({
      date,
      hour: index / 60,
      minutes: index % 60
    })

    return callback(time)
  })
)

// returns, 2018-05-03
export const today = () => DateTime.local().toISODate()

// returns, 6
export const toHour = (time) => parseInt(DateTime.fromISO(time).toFormat('h'))

// returns, 6 AM
export const toSimpleTime = (time) => DateTime.fromISO(time).toFormat('h a')

// returns, 2018-12-21T00:00:00.000-04:00
export const toISO = ({ date, hour = 0, minutes = 0, seconds = 0 }) => (
  DateTime.fromSQL(`${date} ${pad(hour)}:${pad(minutes)}:${pad(seconds)}`).toISO()
)
