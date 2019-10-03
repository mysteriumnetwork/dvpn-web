import React, { FC } from 'react'
import DialogContent from '@material-ui/core/DialogContent'
import trans from '../../../../../trans'
import { FormattedHTMLMessage } from 'react-intl'

const styles = require('./ReportIssueMessage.module.scss')

type ReportIssueMessageProps = {
  failed?: boolean
}

export const ReportIssueMessage: FC<ReportIssueMessageProps> = ({ failed }) => (
  <DialogContent classes={{ root: styles.root }}>
    <h3 className={styles.title}>
      {trans(failed ? 'report.issue.fail.title' : 'report.issue.succeed.title')}
    </h3>
    <div className={styles.info}>
      <FormattedHTMLMessage id={failed ? 'report.issue.fail.info' : 'report.issue.succeed.info'}/>
    </div>
  </DialogContent>
)
