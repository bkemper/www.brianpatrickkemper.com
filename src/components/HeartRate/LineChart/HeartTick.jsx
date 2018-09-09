import React from 'react'
import { Heart } from 'react-feather'
import styled from 'styled-components'
import Em from 'src/components/Em'
import { RED } from 'src/constants/colors'

const Blink = styled.g`
  color: ${RED};

  path {
    @keyframes blink {
      0% {
        fill: ${RED};
      }
      100% {
        fill: transparent;
      }
    }

    animation-duration: ${({ rate }) => {
      if (rate > 150) return '.25s' // running
      if (rate > 100) return '.5s' // jogging
      if (rate > 80) return '1s' // walking
      return '2s' // resting
    }};
    animation-iteration-count: infinite;
    animation-name: blink;
  }
`

export default function HeartTick({ current, x, y }) {
  return (
    <Blink rate={current.rate}>
      <Em svg render={(px) => (
        <Heart
          size={px * 4}
          strokeWidth={0.5}
          x={x - px * 2}
          y={y - px * 2.2}
        />
      )} />
    </Blink>
  )
}
