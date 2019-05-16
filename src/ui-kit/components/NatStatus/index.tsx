import * as React from 'react'
import injectSheet from 'react-jss'
import CircularProgress from '../CircularProgress'
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline'
import ErrorOutline from '@material-ui/icons/ErrorOutline'
import { NatStatuses } from '../../../api/data/nat-status'

const styles = (theme: any) => ({
  success: {
    color: '#4cac29'
  },
  notFinished: {
    width: '24px !important',
    height: '24px !important',
    color: '#ffe50e'
  }
})

export interface ErrorDialogProps {
  status?: string
  classes?: any
}

const NatStatus = (props: ErrorDialogProps) => {
  const { classes } = props
  const status = props.status
  if (status === NatStatuses.NOT_FINISHED) {
    return (
      <CircularProgress className={classes.notFinished}/>
    )
  }
  if (status === NatStatuses.FAILED) {
    return (
      <ErrorOutline color='secondary'/>
    )
  }
  if (status === NatStatuses.SUCCESSFUL)
    return (
      <CheckCircleOutline color={'primary'} className={classes.success}/>
    )
  return null
}

export default injectSheet(styles)(NatStatus)
