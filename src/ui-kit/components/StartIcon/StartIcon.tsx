import * as React from 'react'
import injectSheet from 'react-jss'
import icons from '../../../app/components/assets/images/app-icons.svg'

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
  active?: boolean
  favorite?: boolean
  classes: IStyles
  style?: React.CSSProperties
}

const StartIcon: React.FunctionComponent<IStartIconProps> = (props: IStartIconProps) => (
  <div className={classNames(props.classes.root, { [props.classes.highlight]: props.active })}>
    <div className={props.favorite ? 'favorite' : 'minor'}/>
  </div>
)

export default injectSheet(styles)(StartIcon)
