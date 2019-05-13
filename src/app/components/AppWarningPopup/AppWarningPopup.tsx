import * as React from 'react'
import { Dialog } from '@material-ui/core'
import DialogContent from './components/DialogContent/DialogContent'

class AppWarningPopup extends React.Component {
  public state = {
    open: false,
  }

  private handleDialogClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { open } = this.state

    return (
      <Dialog open={open} fullScreen onClose={this.handleDialogClose}>
        <DialogContent />
      </Dialog>
    )
  }
}

export default AppWarningPopup
