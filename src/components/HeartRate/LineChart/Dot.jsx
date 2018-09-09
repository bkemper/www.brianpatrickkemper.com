import React from 'react'
import { DARK_GREY } from 'src/constants/colors'
import Em from 'src/components/Em'

export default function Dot(props) {
  if (props.payload.time === props.current.time) {
    const rateLength = String(props.payload.rate).length;

    return ( // annotate current rate
      <Em svg render={(px) => [
        <line
          key="current-rate-underline"
          x1={props.cx + px}
          x2={props.cx + px + (rateLength * px)}
          y1={props.cy}
          y2={props.cy}
          stroke={DARK_GREY}
          strokeWidth="1"
        />,
        <text
          key="current-rate"
          x={props.cx + (1.25 * px)}
          y={props.cy - px}
          fontSize="1.5em"
          fill={DARK_GREY}
        >
          {props.payload.rate}
        </text>
      ]} />
    );
  }

  return null;
}
