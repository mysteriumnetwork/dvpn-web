import * as React from 'react'
import { Dialog } from '@material-ui/core'
import injectSheet from 'react-jss'
import DialogHeader from './components/DialogHeader/DialogHeader'
import DialogContent from './components/DialogContent/DialogContent'
import withEvents, { EventsProps } from '../../../hocs/withEvents'
import { APP_EVENTS } from '../../../constants'
import { NodeHealthcheck } from 'mysterium-vpn-js'

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

export interface IAppAboutProps extends EventsProps {
  classes: IStyles
  style?: React.CSSProperties
  node: NodeHealthcheck
}

class AppAbout extends React.Component<IAppAboutProps> {
  public state = {
    open: false,
  }

  componentDidMount() {
    this.props.events.on(APP_EVENTS.ABOUT_DIALOG_SHOW, () => this.setState({ open: true }))
  }

  private handleDialogClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { open } = this.state
    const { classes, node } = this.props

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
        <DialogHeader onCloseClick={this.handleDialogClose}/>
        <DialogContent node={node}/>
      </Dialog>
    )
  }
}

export default injectSheet(styles)(withEvents(AppAbout))
