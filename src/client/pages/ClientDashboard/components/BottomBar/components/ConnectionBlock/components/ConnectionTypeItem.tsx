import * as React from 'react'
import injectSheet from 'react-jss'

interface IStyles {
  root: string
  info: string
  flagIcon: string
}

const styles = theme => ({
  root: {
    display: 'flex',
    '& .iconWireGuard': {
      width: 16,
      height: 16,
      minWidth: 16,
      marginRight: 8,
      background: 'url("app/components/assets/images/app-icons.svg") no-repeat',
      backgroundSize: '160px 200px',
      backgroundPosition: '-48px -54px',
    },
    '& .iconOpenVPN': {
      width: 16,
      height: 16,
      minWidth: 16,
      marginRight: 8,
      background: 'url("app/components/assets/images/app-icons.svg") no-repeat',
      backgroundSize: '160px 200px',
      backgroundPosition: '-48px -33px',
    },
    '& > p': {
      opacity: '0.9',
      color: theme.colors.textSecondary,
      fontSize: theme.typography.fontSizes.tableHeadFont,
    },
  },
  flagIcon: {
    width: 32,
    height: 32,
    minWidth: 32,
    background: 'url("app/components/assets/images/flag-icon-temp.svg") no-repeat center',
  },
})

export interface IInfoBlockProps {
  onChange: any
  classes: IStyles
  style?: React.CSSProperties
}

const InfoBlock: React.SFC<IInfoBlockProps> = (props: IInfoBlockProps) => (
  <div className={props.classes.root}>
    {/* set connection type icon class iconWireGuard/iconOpenVPN */}
    <div className="iconWireGuard" />
    <p>WireGuard</p>
  </div>
)

export default injectSheet(styles)(InfoBlock)
