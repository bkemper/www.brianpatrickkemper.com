import React from 'react'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { RED } from 'src/constants/colors'
import { toISO } from 'src/utils/time'
import Dot from './Dot'
import FixedContainer from './FixedContainer'
import Tick from './Tick'

export default function HeartRateLineChart({ current = {}, data, today }) {
  return (
    <FixedContainer>
      <ResponsiveContainer>
        <LineChart data={data}>
          <Line
            dataKey="rate"
            dot={(props) => <Dot {...props} current={current} />}
            isAnimationActive={true}
            stroke={RED}
            strokeWidth={1.5}
            type="basis"
          />
          <XAxis
            axisLine={false}
            dataKey="time"
            height={15} // relative?
            tick={(props) => <Tick {...props} current={current} />}
            tickFormatter={() => null} // ugh, prevents my ticks from being scaled
            tickSize={0}
            ticks={Array.from(Array(23), (value, index) =>
              toISO({ date: today, hour: index + 1 })
            )}
          />
          <YAxis domain={[30, 130]} hide={true} type="number" />
        </LineChart>
      </ResponsiveContainer>
    </FixedContainer>
  )
}
