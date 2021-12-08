/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react'
import { Fade, Modal } from '@material-ui/core'
import './GenericModal.scss'
import Button from '../Buttons/Button'
import ConfirmationDialogue from '../ConfirmationDialogue/ConfirmationDialogue'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSave?: () => void
  hideSave?: boolean
  hideClose?: boolean
  saveText?: string
  isLoading?: boolean
  title?: string
  children: any
  confirm?: boolean
  confirmMessage?: string
}

const GenericModal = ({
  isOpen,
  onClose,
  title,
  children,
  isLoading = false,
  hideSave = false,
  hideClose = false,
  onSave = () => {},
  saveText = 'Save',
  confirm = false,
  confirmMessage = 'Are you sure?',
}: Props) => {
  const [showConfirm, setShowConfirm] = useState<boolean>()
  return (
    <Modal
      className="settings-modal"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      disableAutoFocus={true}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <div className="settings-modal__block">
          <div className="settings-modal__title">{title}</div>
          <div className="settings-modal__row">{children}</div>
          <div className="settings-modal__footer">
            {!hideClose && (
              <Button onClick={onClose} extraStyle="gray">
                Close
              </Button>
            )}
            {!hideSave && (
              <Button isLoading={isLoading} onClick={() => (confirm ? setShowConfirm(true) : onSave())}>
                {saveText}
              </Button>
            )}
          </div>
          <ConfirmationDialogue
            message={confirmMessage}
            open={showConfirm}
            onCancel={() => {
              setShowConfirm(false)
            }}
            onConfirm={async () => {
              await onSave()
              setShowConfirm(false)
            }}
          />
        </div>
      </Fade>
    </Modal>
  )
}
export default GenericModal
