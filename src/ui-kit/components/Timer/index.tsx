import * as React from 'react'
import { createAction } from 'redux-actions'
import typeToReducer from 'type-to-reducer'
import { connect } from 'react-redux'
import { FormattedTime } from 'react-intl'

type Props = {
  leader?: boolean
  onUpdate?: Function
  value?: number
}

type State = {
  timer?: number
}

class Timer extends React.PureComponent<Props, State> {

  componentDidMount() {
    if (this.props.leader && this.props.onUpdate) {
      this.setState({
        timer: setInterval(this.props.onUpdate, 1000)
      })
    }
  }

  componentWillUnmount() {
    if (this.state && this.state.timer) {
      clearInterval(this.state.timer)
    }
  }

  render() {
    if (this.props.leader) {
      return null
    }

    if (typeof this.props.children === 'function') {
      return this.props.children(this.props.value)
    }

    return (
      <FormattedTime value={this.props.value}/>
    )
  }
}

export const TIMER_UPDATE = 'timer/UPDATE'

export const updateTimerAction = createAction(TIMER_UPDATE)

export const timerReducer = typeToReducer({
  [TIMER_UPDATE]: () => Date.now()
}, 0)

const mapStateToProps = (state) => ({ value: state.timer || 0 })
const mapDispatchToProps = (dispatch) => ({
  onUpdate: () => dispatch(updateTimerAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(Timer)
