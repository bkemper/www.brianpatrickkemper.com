import React from 'react'
import { Text } from 'recharts'
import { DARK_GREY } from 'src/constants/colors'
import { toHour, toSimpleTime } from 'src/utils/time'
import HeartTick from './HeartTick'

export default function Tick(props) {
  const { value:time } = props.payload

  switch(toHour(time)) {
    case 6:
      return (
        <Text {...props} fill={DARK_GREY} fontSize="1.3em">
          {toSimpleTime(time)}
        </Text>
      )
    case 12:
      return <HeartTick {...props} />;
    default:
      return (
        <Text {...props} fill={DARK_GREY} fontSize="1em">
          |
        </Text>
      )
  }
}
