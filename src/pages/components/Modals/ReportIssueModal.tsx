/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../../components/Buttons/Button'
import { TextArea } from '../../../components/Inputs/TextArea'
import { LabeledInput } from '../../../components/Inputs/LabeledInput'
import ModalV2 from '../../../components/Modals/ModalV2'
import { useIntercom } from '../../../intercom/intercom'
import errorz from '../../../commons/errors'
import { tequila } from '../../../api/tequila'

const { api } = tequila

type Props = {
  readonly show: boolean
  readonly onClose?: () => void
}

type FormData = {
  readonly email: string
  readonly description: string
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
    intercom.showNewMessage(
      (email || description) && `${email && `Email: ${email}`}${description && `${email && '\n'}${description}`}`,
    )
    handleClose()
  }
  return (
    <ModalV2 isOpen={show} title="Report Issue" onClose={handleClose} size="lg">
      <form onSubmit={handleSubmit((d) => reportIssue(d as FormData))} className="flex flex-col gap-6">
        <LabeledInput
          label="Email"
          fluid
          errorMessage={errors.email?.message}
          isError={!!errors.email?.message}
          register={register('email', {
            required: 'Field is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email',
            },
          })}
          required
          placeholder="node@runner.com"
        />
        <TextArea
          label={`Describe Your Issue (${description?.length || 0})`}
          placeholder="Describe what went wrong (minimum 30 characters)"
          register={register('description', {
            required: 'Field is required',
            minLength: {
              value: 30,
              message: 'Minimum 30 characters',
            },
          })}
          required
          isError={!!errors.description?.message}
          errorMessage={errors.description?.message}
          rows={5}
        />
        <div className="text-sm text-blue-850">
          By submitting this form, agree to send to Mysterium Network some account information like IP, country and
          system information which will be used to improve the services
        </div>

        <div className="flex gap-4">
          <Button loading={sending} label={sending ? 'Sending' : 'Send'} type="submit" />
          <Button variant="secondary-outlined" label="Talk to us via live chat" onClick={handleOpenIntercom} />
        </div>
      </form>
    </ModalV2>
  )
}
