import * as React from 'react'
import injectSheet from 'react-jss'
import trans from '../../../../../../../../trans'
import ConnectionTypeIcon from '../../../../../../../../ui-kit/components/ConnectionTypeIcon'

interface IStyles {
  root: string
  info: string
  flagIcon: string
}

const styles = theme => ({
  root: {
    display: 'flex',
    '& .connection-type-icon': {
      margin: '-5px 0',
      marginRight: 6
    },
    '& > p': {
      opacity: '0.9',
      color: theme.colors.textSecondary,
      fontSize: theme.typography.fontSizes.tableHeadFont,
    },
  }
})

export interface IInfoBlockProps {
  onChange?: any
  classes: IStyles
  style?: React.CSSProperties,
  type?: string
}

const InfoBlock: React.FunctionComponent<IInfoBlockProps> = (props: IInfoBlockProps) => props.type ? (
  <div className={props.classes.root}>
    <ConnectionTypeIcon type={props.type}/>
    <p>{trans(`connection.type.${props.type}`)}</p>
  </div>
) : null

export default injectSheet(styles)(InfoBlock)
