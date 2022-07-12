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
import themes from '../../../../commons/themes'

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
  color: ${({ theme }) => theme.colorTextSecondary};
  font-size: ${themes.common.fontSizeSmaller};
`

const Footer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;
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

  return (
    <Modal show={show} title="Report Issue" subTitle="Describe your issue" onClickX={handleClose}>
      <Content>
        <InputGroup
          title="Email address (Optional)"
          input={<TextField value={email} placeholder="node@runner.com" onChange={(v) => setEmail(v)} />}
        />
        <InputGroup
          title={`Your message (${message.length})`}
          input={
            <TextField
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
          <Button variant="blue" rounded label={'Talk to us via live chat'} />
          <Button rounded label="Send" />
        </Footer>
      </Content>
    </Modal>
  )
}
