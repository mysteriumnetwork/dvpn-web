import * as React from 'react'
import { Dialog } from '@material-ui/core'
import injectSheet from 'react-jss'
import DialogHeader from './components/DialogHeader/DialogHeader'
import DialogContent from './components/DialogContent/DialogContent'

interface IStyles {
  containerStyled: string
  paperStyled: string
  rootBackdrop: string
}

const styles = () => ({
  containerStyled: {
    padding: 12,
  },
  paperStyled: {
    overflowY: 'unset !important',
    borderRadius: '4px  !important',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3) !important',
  },
  rootBackdrop: {
    background: 'rgba(213, 213, 213, 0.7) !important',
  },
})

export interface IAppAboutProps {
  classes: IStyles
  style?: React.CSSProperties
}

class AppAbout extends React.Component<IAppAboutProps> {
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
        onClose={this.handleDialogClose}
        classes={{
          container: classes.containerStyled,
          paper: classes.paperStyled,
        }}
        BackdropProps={{
          classes: {
            root: classes.rootBackdrop,
          },
        }}
      >
        <DialogHeader />
        <DialogContent />
      </Dialog>
    )
  }
}

export default injectSheet(styles)(AppAbout)
