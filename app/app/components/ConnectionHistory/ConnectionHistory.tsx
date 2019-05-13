import * as React from 'react'
import { Dialog } from '@material-ui/core'
import injectSheet from 'react-jss'
import DialogHeader from './components/DialogHeader/DialogHeader'
import ConnectionsList from './components/ConnectionsList/ConnectionsList'

interface IStyles {
  rootStyled: string
  containerStyled: string
  paperFullScreen: string
  rootBackdrop: string
}

const styles = theme => ({
  rootStyled: {
    color: theme.colors.actionPurple,
  },
  containerStyled: {
    padding: 12,
  },
  paperFullScreen: {
    borderRadius: '4px !important',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3) !important',
  },
  rootBackdrop: {
    background: 'rgba(213, 213, 213, 0.7) !important',
  },
})

export interface IConnectionHistoryProps {
  classes: IStyles
  style?: React.CSSProperties
}

class ConnectionHistory extends React.Component<IConnectionHistoryProps> {
  public state = {
    open: false,
  }

  private handleDialogClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { open } = this.state
    const { classes } = this.props

    return (
      <Dialog
        open={open}
        fullScreen
        onClose={this.handleDialogClose}
        aria-labelledby="draggable-dialog-title"
        classes={{
          root: classes.rootStyled,
          container: classes.containerStyled,
          paperFullScreen: classes.paperFullScreen,
        }}
        BackdropProps={{
          classes: {
            root: classes.rootBackdrop,
          },
        }}
      >
        <DialogHeader />
        <ConnectionsList />
      </Dialog>
    )
  }
}

export default injectSheet(styles)(ConnectionHistory)
