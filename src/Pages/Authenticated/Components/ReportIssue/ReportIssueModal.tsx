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
import styled from 'styled-components'
import { Button } from '../../../../Components/Inputs/Button'
import { ChatIcon } from '../../../../Components/Icons/Icons'
import { BugButtonIcon } from '../../../../Components/Icons/ButtonIcons'
import { TextArea } from '../../../../Components/Inputs/TextArea'
import { themeCommon } from '../../../../theme/themeCommon'

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
`

const Note = styled.div`
  color: ${({ theme }) => theme.text.colorSecondary};
  font-size: ${themeCommon.fontSizeSmaller};
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
    fill: ${themeCommon.colorKey};
    opacity: 1;
  }
`

export const ReportIssueModal = ({ show, onClose }: Props) => {
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const handleClose = () => {
    if (!onClose) {
      return
    }

    onClose()
    setEmail('')
    setMessage('')
  }

  const handleOpenIntercom = () => {
    // @ts-ignore
    window.Intercom('showNewMessage', 'Hi there! I need some assistance.')
    handleClose()
  }

  return (
    <Modal
      show={show}
      title="Report Issue"
      subTitle="Describe your issue"
      icon={<StyledBugButtonIcon />}
      onClickX={handleClose}
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
          <Button rounded label="Send" />
        </Footer>
      </Content>
    </Modal>
  )
}
