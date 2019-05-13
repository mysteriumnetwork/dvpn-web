import * as React from 'react'
import injectSheet from 'react-jss'

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
      background: 'url("app/components/assets/images/app-icons.svg") no-repeat',
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
  selected?: boolean
  classes: IStyles
  style?: React.CSSProperties
}

const Quality: React.SFC<IQualityProps> = (props: IQualityProps) => (
  <div
    className={classNames(props.classes.root, {
      // set class highlight when item selected
      // selected&&[props.classes.highlight]
    })}
  >
    {/* //render Quality icon class quality-1/quality-2/quality-3/quality-4 */}
    <div className="quality-1" />
  </div>
)

export default injectSheet(styles)(Quality)
