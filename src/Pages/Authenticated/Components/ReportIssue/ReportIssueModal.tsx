/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Modal } from '../../../../Components/Modals/Modal'
import { InputGroup } from '../../../../Components/Inputs/InputGroup'
import { TextField } from '../../../../Components/Inputs/TextField'
import { useState } from 'react'
import { tequila } from '../../../../api/tequila'
import styled from 'styled-components'
import { Button } from '../../../../Components/Inputs/Button'
import { ChatIcon } from '../../../../Components/Icons/Icons'
import { BugButtonIcon } from '../../../../Components/Icons/ButtonIcons'
import { TextArea } from '../../../../Components/Inputs/TextArea'
import { devices } from '../../../../theme/themes'
import { useIntercom } from '../../../../intercom/intercom'
import zIndexes from '../../../../constants/z-indexes'
import errors from '../../../../commons/errors'

const { api } = tequila

interface Props {
  show: boolean
  onClose?: () => void
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 80%;
  height: 70%;
  justify-content: space-between;
  @media ${devices.tablet} {
    justify-content: flex-start;
  }
`

const Note = styled.div`
  color: ${({ theme }) => theme.text.colorSecondary};
  font-size: ${({ theme }) => theme.common.fontSizeSmaller};
`

const Footer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

const StyledBugButtonIcon = styled(BugButtonIcon)`
  rect {
    fill: ${({ theme }) => theme.common.colorKey};
    opacity: 1;
  }
`

export const ReportIssueModal = ({ show, onClose }: Props) => {
  const intercom = useIntercom()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const handleClose = () => {
    if (!onClose) {
      return
    }

    onClose()
    setEmail('')
    setMessage('')
  }
  const reportIssue = async () => {
    setSending(true)
    try {
      await intercom.reportIssue((userId) =>
        api.reportIssueIntercom({ email: email, description: message, userId: userId, userType: 'provider' }, 60000),
      )
    } catch (err: any) {
      errors.parseToastError(err)
    }
    setSending(false)
  }
  const handleOpenIntercom = () => {
    intercom.show()
    handleClose()
  }

  return (
    <Modal
      show={show}
      title="Report Issue"
      subTitle="Describe your issue"
      icon={<StyledBugButtonIcon />}
      onClickX={handleClose}
      zIndex={zIndexes.overlay + 100}
    >
      <Content>
        <InputGroup
          title="Email address (Optional)"
          input={<TextField value={email} placeholder="node@runner.com" onChange={(v) => setEmail(v)} />}
        />
        <InputGroup
          fluid
          title={`Your message (${message.length})`}
          input={
            <TextArea
              textarea
              rows={5}
              value={message}
              placeholder="Describe what went wrong (minimum 30 characters)"
              onChange={(v) => setMessage(v)}
            />
          }
        />

        <Note>
          By submitting this form, agree to send to Mysterium Network some account information like IP, country and
          system information which will be used to improve the services
        </Note>

        <Footer>
          <Button
            variant="blue"
            rounded
            label={
              <Row>
                <ChatIcon /> Talk to us via live chat
              </Row>
            }
            onClick={handleOpenIntercom}
          />
          <Button loading={sending} rounded label="Send" onClick={reportIssue} />
        </Footer>
      </Content>
    </Modal>
  )
}
