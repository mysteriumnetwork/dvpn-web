/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { ChangeEvent, useState } from 'react'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@material-ui/core'
import { Issue } from 'mysterium-vpn-js/lib/feedback/issue'
import { useSnackbar } from 'notistack'
import ChatIcon from '@material-ui/icons/Chat'
import CloseIcon from '@material-ui/icons/Close'

import { TextField } from '../TextField'
import Button from '../Buttons/Button'
import { tequilapiClient } from '../../api/TequilApiClient'
import { parseError } from '../../commons/error.utils'

import './ReportIssueModal.scss'

interface Props {
  open: boolean
  onClose: () => void
}

interface StateProps extends Issue {
  sending: boolean
}

const ReportIssueModal = ({ open, onClose }: Props) => {
  const [state, setState] = useState<StateProps>({
    description: '',
    email: '',
    sending: false,
  })

  const { enqueueSnackbar } = useSnackbar()

  const handleTextFieldsChange = (prop: keyof StateProps) => (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [prop]: event.target.value })
  }

  const resetState = () => {
    setState({ ...state, description: '', email: '', sending: false })
  }

  const handleClose = () => {
    onClose()
    resetState()
  }

  const reportIssue = () => {
    Promise.resolve(setState({ ...state, sending: true }))
      .then(() => {
        return tequilapiClient.reportIssue(state, 60000)
      })
      .then(() => {
        enqueueSnackbar('Thank you! Your report has been sent.', { variant: 'success' })
      })
      .catch((err) => {
        enqueueSnackbar('Error: ' + parseError(err), { variant: 'error' })
      })
      .finally(() => {
        handleClose()
      })
  }

  const openChat = () => {
    // @ts-ignore
    window.Intercom('showNewMessage', 'Hi there! I need some assistance.')
    handleClose()
  }

  return (
    <Dialog disableBackdropClick fullWidth={true} maxWidth="md" open={open} onClose={handleClose}>
      <DialogTitle>
        <div className="report-issue__header">
          <div className="title">
            Report issue
            <p className="title__description">Describe your issue</p>
          </div>
          <div className="chat">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" onClick={() => openChat()}>
              <ChatIcon className="chat__icon" />
              Talk to us via live chat
            </a>
          </div>
          <div className="close">
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="report-issue">
          <form
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <div className="input-group">
              <div className="input-group__label">Email address (optional)</div>
              <TextField
                placeholder="node@runner.com"
                handleChange={handleTextFieldsChange}
                value={state.email || ''}
                stateName="email"
              />
            </div>
            <div className="input-group">
              <div className="input-group__label">Your message</div>
              <TextField
                placeholder=""
                handleChange={handleTextFieldsChange}
                value={state.description}
                stateName="description"
                rows={4}
                multiline
              />
              <div className="input-group__help m-t-5">Describe what went wrong (minimum 30 characters)</div>
            </div>
            <div className="report-issue__footer m-t-50 p-b-15">
              <p className="agreement">
                By submitting this form, agree to send to Mysterium Network some account information like IP, country
                and system information which will be used to improve the services.
              </p>
              <Button disabled={state.description.length < 30} isLoading={state.sending} onClick={reportIssue}>
                Send
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ReportIssueModal
