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
import errorz from '../../../../commons/errors'
import { useForm } from 'react-hook-form'

const { api } = tequila

const Content = styled.form`
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

interface Props {
  show: boolean
  onClose?: () => void
}

type FormData = {
  email: string
  description: string
}

export const ReportIssueModal = ({ show, onClose }: Props) => {
  const intercom = useIntercom()
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()

  const email = watch('email')
  const description = watch('description')

  const [sending, setSending] = useState(false)

  const handleClose = () => {
    if (!onClose) {
      return
    }

    onClose()
    reset()
  }

  const reportIssue = async ({ email, description }: FormData) => {
    setSending(true)
    try {
      const res = await api.reportIssueSupport({ email, description }, 60000)
      intercom.reportIssue(res)
    } catch (err: any) {
      errorz.parseToastError(err)
      setSending(false)
      return
    }
    setSending(false)
    handleClose()
  }

  const handleOpenIntercom = () => {
    intercom.showNewMessage(`${email && `Email: ${email}`}${description && `${email && '\n'}${description}`}`)
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
      <Content onSubmit={handleSubmit((d) => reportIssue(d as FormData))}>
        <InputGroup
          error={errors.email?.type === 'required' ? 'Required' : ''}
          input={
            <TextField register={register('email', { required: true })} type="email" placeholder="node@runner.com" />
          }
        />
        <InputGroup
          fluid
          error={errors.description?.type === 'required' ? 'Required' : ''}
          title={`Your message (${description?.length || 0})`}
          input={
            <TextArea
              register={register('description', { required: true })}
              textarea
              rows={5}
              placeholder="Describe what went wrong (minimum 30 characters)"
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
          <Button loading={sending} rounded label={sending ? 'Sending' : 'Send'} type="submit" />
        </Footer>
      </Content>
    </Modal>
  )
}
