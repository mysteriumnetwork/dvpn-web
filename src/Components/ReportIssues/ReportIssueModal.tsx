/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Dialog, DialogContent, DialogTitle, IconButton } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import CloseIcon from '@material-ui/icons/Close'
import { IntercomIssue } from 'mysterium-vpn-js'
import { useImmer } from 'use-immer'
import { tequilaClient } from '../../api/tequila-client'
import { parseError } from '../../commons/error.utils'
import { toastError } from '../../commons/toast.utils'
import { localStorageKeys } from '../../constants/local_storage_keys'
import Button from '../Buttons/Button'

import { TextField } from '../TextField/TextField'

import './ReportIssueModal.scss'

interface Props {
  open: boolean
  onClose: () => void
}

interface StateProps extends IntercomIssue {
  sending: boolean
}

const ReportIssueModal = ({ open, onClose }: Props) => {
  const [state, setState] = useImmer<StateProps>({
    description: '',
    email: '',
    sending: false,
  })

  const resetState = () => {
    setState((d) => {
      d.description = ''
      d.email = ''
      d.sending = false
    })
  }

  const handleClose = () => {
    onClose()
    resetState()
  }

  const reportIssue = async () => {
    setState((d) => {
      d.sending = true
    })
    try {
      // @ts-ignore
      const userId = window.Intercom('getVisitorId')
      await tequilaClient.reportIssueIntercom({ ...state, userId: userId }, 60000)
      localStorage.setItem(localStorageKeys.INTERCOM_USER_ID, userId)
      // @ts-ignore
      window.Intercom('update')
      // @ts-ignore
      window.Intercom('showMessages')
    } catch (err) {
      toastError(parseError(err))
    }
    handleClose()
  }

  const openChat = () => {
    // @ts-ignore
    window.Intercom('showNewMessage', 'Hi there! I need some assistance.')
    handleClose()
  }

  const typedIn = state.description?.length || 0

  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={open}
      onClose={(_, reason) => {
        if (reason !== 'backdropClick') {
          handleClose()
        }
      }}
    >
      <DialogTitle>
        <div className="report-issue__header">
          <div className="report-issue__header__flex">
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
              <div className="input-group__label">
                Email address (optional - enter your email if you would like to receive follow up on your issue)
              </div>
              <TextField
                placeholder="node@runner.com"
                onChange={(value) => {
                  setState((d) => {
                    d.email = value
                  })
                }}
                value={state.email || ''}
              />
            </div>
            <div className="input-group">
              <div className="input-group__label">Your message ({typedIn})</div>
              <TextField
                onChange={(value) => {
                  setState((d) => {
                    d.description = value
                  })
                }}
                value={state.description}
                rows={4}
                multiline
              />
              <div className="input-group__help m-t-5">Describe what went wrong (minimum 30 characters)</div>
            </div>
            <div className="report-issue__footer p-b-15">
              <p className="agreement">
                By submitting this form, agree to send to Mysterium Network some account information like IP, country
                and system information which will be used to improve the services.
              </p>
              <Button
                className="report-issue__send_button"
                disabled={state.description.length < 30}
                isLoading={state.sending}
                onClick={reportIssue}
              >
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
