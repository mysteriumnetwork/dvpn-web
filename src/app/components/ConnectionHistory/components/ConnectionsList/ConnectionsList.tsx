import * as React from 'react'
import injectSheet from 'react-jss'
import { DialogContent } from '@material-ui/core'
import trans from '../../../../../trans'
import ConnectionItem from './ConnectionItem'

interface IStyles {
  rootStyled: string
  connectionTable: string
  ipItem: string
}

const styles = (theme: any) => ({
  rootStyled: {
    padding: '0 !important',
  },
  connectionTable: {
    '& table': {
      width: '100%',
      color: theme.colors.textSecondary,
      borderCollapse: 'collapse',
      '& th': {
        opacity: '0.7',
        padding: '8px 16px',
        textAlign: 'left',
        fontWeight: 'normal',
        fontSize: theme.typography.fontSizes.tableHeadFont,
        borderBottom: '1px solid rgba(230, 230, 230, 0.5)',
      },
      '& td': {
        textAlign: 'left',
        padding: '8px 16px',
        color: theme.colors.textMain,
        fontSize: theme.typography.fontSizes.buttonText,
        borderBottom: '1px solid rgba(230, 230, 230, 0.5)',
      },
    },
  },
  ipItem: {
    display: 'flex',
    '& > p': {
      marginLeft: 8,
    },
  },
})

export interface IConnectionsListProps {
  onChange?: any
  classes: IStyles
  style?: React.CSSProperties
}

// create two separate connections Tables for client and provider
const ConnectionsList: React.SFC<IConnectionsListProps> = (props: IConnectionsListProps) => (
  <DialogContent classes={{ root: props.classes.rootStyled }}>
    <div className={props.classes.connectionTable}>
      <table>
        <thead>
          <tr>
            <th>{trans('app.connection.history.client')}</th>
            <th>{trans('app.connection.history.started')}</th>
            <th>{trans('app.node.running.duration')}</th>
            <th>{trans('app.node.running.downloaded')}</th>
            <th>{trans('app.node.running.uploaded')}</th>
          </tr>
        </thead>
        <tbody>
          {/* render connections items */}
          <ConnectionItem />
        </tbody>
      </table>
    </div>
  </DialogContent>
)

export default injectSheet(styles)(ConnectionsList)
