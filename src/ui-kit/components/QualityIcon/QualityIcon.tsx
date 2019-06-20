import * as React from 'react'
import injectSheet from 'react-jss'
import icons from '../../../app/components/assets/images/app-icons.svg'
import { Metrics, QualityLevel } from 'mysterium-vpn-js'
import { qualityCalculator } from '../../../utils/quality-calculator'

const classNames = require('classnames')

interface IStyles {
  root: string
  highlight: string
}

const styles = theme => ({
  root: {
    '& > div': {
      width: 24,
      height: 24,
      minWidth: 24,
      background: `url(${icons}) no-repeat`,
      backgroundSize: '184px 232px',
    },
    '& .quality-1': {
      backgroundPosition: '1px -116px',
    },
    '& .quality-2': {
      backgroundPosition: '-27px -116px',
    },
    '& .quality-3': {
      backgroundPosition: '-55px -116px',
    },
    '& .quality-4': {
      backgroundPosition: '-83px -116px',
    },
  },
  highlight: {
    '& .quality-1': {
      backgroundPosition: '1px -140px',
    },
    '& .quality-2': {
      backgroundPosition: '-27px -176px',
    },
    '& .quality-3': {
      backgroundPosition: '-55px -176px',
    },
    '& .quality-4': {
      backgroundPosition: '-83px -176px',
    },
  },
})

export interface IQualityProps {
  classes: IStyles
  style?: React.CSSProperties,
  metrics?: Metrics,
  active?: boolean
}

interface IQualityState {
  level?: QualityLevel
}

class Quality extends React.PureComponent<IQualityProps, IQualityState> {
  state: Readonly<IQualityState> = { level: QualityLevel.UNKNOWN }

  static getDerivedStateFromProps(props: IQualityProps, state: IQualityState): IQualityState {
    const { metrics } = props

    if (!metrics) {
      return { ...state, level: QualityLevel.UNKNOWN }
    }

    const value = qualityCalculator.calculateValue(metrics)

    return { ...state, level: qualityCalculator.calculateLevel(value) }
  }

  get levelClassName() {
    switch (this.state.level) {
      case QualityLevel.HIGH:
        return 'quality-4'
      case QualityLevel.MEDIUM:
        return 'quality-3'
      case QualityLevel.LOW:
        return 'quality-2'
      default:
        return 'quality-1'
    }
  }

  render() {
    const { classes, active } = this.props
    return (
      <div className={classNames(classes.root, { [classes.highlight]: active })}>
        <div className={this.levelClassName}/>
      </div>
    )
  }
}

export default injectSheet(styles)(Quality)
