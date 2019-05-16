import * as React from 'react'
import injectSheet from 'react-jss'
import { Button } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import trans from '../../../trans'

const styles = (theme: any) => ({})

export interface ErrorDialogProps {
  title?: string
  children?: any
  onClose?: () => void
}

const ErrorDialog = (props: ErrorDialogProps) => (
  <Dialog
    open={true}
    keepMounted
  >
    <DialogTitle>
      {props.title || trans('error.title')}
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        {props.children}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.onClose} color="primary">
        {trans('close')}
      </Button>
    </DialogActions>
  </Dialog>
)

export default injectSheet(styles)(ErrorDialog)
