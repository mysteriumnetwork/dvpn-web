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
    '& .favorite': {
      backgroundPosition: '4px -61px',
    },
    '& .minor': {
      backgroundPosition: '4px -84px',
    },
  },
  highlight: {
    '& .favorite': {
      backgroundPosition: '-20px -61px',
    },
    '& .minor': {
      backgroundPosition: '-20px -84px',
    },
  },
})

export interface IStartIconProps {
  selected: boolean
  classes: IStyles
  style?: React.CSSProperties
}

const StartIcon: React.SFC<IStartIconProps> = (props: IStartIconProps) => (
  <div
    className={classNames(props.classes.root, {
      // set class highlight when item selected
      // selected&&[props.classes.highlight]
    })}
  >
    {/* //render icon class favorite/minor */}
    <div className="minor" />
  </div>
)

export default injectSheet(styles)(StartIcon)
