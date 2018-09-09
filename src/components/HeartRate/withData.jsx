import React from 'react'
import axios from 'axios'
import { mapEachMinute, today } from 'src/utils/time'

// fill missing data with previous rate and future times with null
const fill = (today, data) => {
  let prevRate = null

  return mapEachMinute(today, time => {
    if (data[0] && data[0].time === time) {
      prevRate = data[0].rate
      return data.shift()
    } else {
      return {
        rate: data.length !== 0 ? prevRate : null,
        time,
      }
    }
  })
}

// see, https://reactjs.org/docs/higher-order-components.html
export default function withData(WrappedComponent) {
  return class extends React.Component {
    state = {
      today: today()
    }

    componentDidMount() {
      const { today } = this.state

      axios
        .get(`https://s3.amazonaws.com/bpk-heartrate/${today}.json`)
        .then(({ data }) => {
          this.setState({
            current: data[data.length - 1],
            data: fill(today, data)
          })
        })
    }

    render() {
      if (!this.state.current) {
        return null
      }

      return <WrappedComponent {...this.state} />
    }
  }
}
