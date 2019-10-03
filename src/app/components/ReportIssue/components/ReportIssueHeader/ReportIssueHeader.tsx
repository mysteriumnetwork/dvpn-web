import React, { FC } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'

const styles = require('./ReportIssueHeader.module.scss')

export type ReportIssueHeaderProps = {
  onCloseClick: () => void
}

export const ReportIssueHeader: FC<ReportIssueHeaderProps> = (props) => (
  <DialogTitle classes={{ root: styles.root }}>
    <IconButton onClick={props.onCloseClick}>
      <i className="app-icons close-icon"/>
    </IconButton>
  </DialogTitle>
)

