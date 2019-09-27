import React, { PureComponent } from 'react'
import { APP_EVENTS } from '../../../constants'
import { EventsProps } from '../../../hocs/withEvents'
import Dialog from '@material-ui/core/Dialog'
import { ReportIssueHeader } from './components/ReportIssueHeader/ReportIssueHeader'
import { InjectedFormProps } from 'redux-form'
import { ReportIssueMessage } from './components/ReportIssueMessage/ReportIssueMessage'
import { ReportIssueForm } from './components/ReportIssueForm/ReportIssueForm'
import { Issue } from 'mysterium-vpn-js/lib/feedback/issue'

const styles = require('./ReportIssue.module.scss')

export interface ReportIssueProps extends EventsProps, InjectedFormProps<Issue, {}, any> {
  pending: boolean
  onSubmit: (value: any) => any
}

export class ReportIssue extends PureComponent<ReportIssueProps> {
  public state = {
    open: false,
  }

  componentDidMount() {
    this.props.events.on(APP_EVENTS.REPORT_ISSUE_DIALOG_SHOW, () => {
      this.props.initialize({})

      this.setState({ open: true })
    })
  }

  get isOpen() {
    return this.state.open
  }

  handleDialogClose = () => {
    this.setState({ open: false })
  }

  render() {
    return (
      <Dialog
        open={this.isOpen}
        onClose={this.handleDialogClose}
        classes={{
          container: styles.containerStyled,
          paper: styles.paperStyled,
        }}
        BackdropProps={{
          classes: {
            root: styles.rootBackdrop,
          },
        }}
      >
        <ReportIssueHeader onCloseClick={this.handleDialogClose}/>
        {
          (this.props.submitFailed || this.props.submitSucceeded)
            ? (<ReportIssueMessage failed={this.props.submitFailed}/>)
            : (<ReportIssueForm submitting={this.props.submitting}
                                invalid={this.props.invalid || this.props.pristine}
                                onSubmit={this.props.handleSubmit(this.props.onSubmit)}/>)
        }
      </Dialog>
    )
  }
}
