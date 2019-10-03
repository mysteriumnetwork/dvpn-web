import React, { FC } from 'react'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '../../../../../app/components/ReduxForm/TextField'
import Button from '../../../../../ui-kit/components/Button/Button'
import trans from '../../../../../trans'

const styles = require('./ReportIssueForm.module.scss')

type ReportIssueFormProps = {
  submitting: boolean
  invalid: boolean
  onSubmit?: () => void
}

export const ReportIssueForm: FC<ReportIssueFormProps> = ({ submitting, invalid, onSubmit }) => (
  <DialogContent classes={{ root: styles.root }}>
    <h3 className={styles.title}>
      {trans('app.menu.report.issue')}
    </h3>
    <TextField
      rows={5}
      multiline
      fullWidth
      placeholder={trans('report.issue.description.placeholder')}
      name="description"
      disabled={submitting}
    />
    <TextField
      fullWidth
      placeholder={trans('report.issue.email.placeholder')}
      helperText={trans('report.issue.email.helper')}
      name="email"
      disabled={submitting}
    />
    <div className={styles.info}>
      {trans('report.issue.info')}
    </div>
    <div className={styles.actions}>
      <Button disabled={submitting || invalid} color="primary" onClick={onSubmit} type="submit">
        {
          submitting
            ? (<i className="tree-balls-loader"/>)
            : trans('action.send')
        }
      </Button>
    </div>
  </DialogContent>
)
