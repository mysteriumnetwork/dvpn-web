/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styles from './Modal.module.scss'
import { CircularProgress, Fade, Modal as MUIModal } from '@material-ui/core'
import Button from '../Buttons/Button'
import React, { useState } from 'react'
import ConfirmationDialogue from '../ConfirmationDialogue/ConfirmationDialogue'

interface Props {
  open: boolean
  children: JSX.Element | JSX.Element[]
  closeAfterTransition?: boolean
  disableAutoFocus?: boolean
  title?: string
  isLoading?: boolean
  controls?: ControlsProps
  withConfirmation?: boolean
  confirmationMessage?: string
}

export const Modal = ({
  open,
  children,
  title,
  closeAfterTransition,
  disableAutoFocus,
  controls,
  isLoading,
  withConfirmation,
  confirmationMessage,
}: Props) => {
  const [showConfirm, setShowConfirm] = useState<boolean>(false)

  const confirmationAwareControls =
    withConfirmation && controls ? { ...controls, onSave: () => setShowConfirm(true) } : controls

  return (
    <MUIModal
      open={open}
      className={styles.modal}
      disableAutoFocus={disableAutoFocus}
      onClose={() => {}}
      closeAfterTransition={closeAfterTransition}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={styles.block}>
          {title && <div className={styles.title}>{title}</div>}
          <div className={styles.intractable}>
            <Spinner isLoading={isLoading} />
            <div className={styles.content}>{children}</div>
            {confirmationAwareControls && <Controls {...confirmationAwareControls} isLoading={isLoading} />}
            {withConfirmation && controls && (
              <ConfirmationDialogue
                open={showConfirm}
                onConfirm={() => {
                  controls.onSave()
                  setShowConfirm(false)
                }}
                isConfirmDisabled={isLoading}
                onCancel={() => setShowConfirm(false)}
                message={confirmationMessage}
              />
            )}
          </div>
        </div>
      </Fade>
    </MUIModal>
  )
}

const Spinner = ({ isLoading }: { isLoading?: boolean }) => {
  return isLoading ? (
    <>
      <div className={styles.overlay} />
      <CircularProgress size={150} thickness={1} className={styles.spinner} disableShrink />
    </>
  ) : (
    <></>
  )
}

type ControlsProps = {
  onSave: () => void
  onSaveLabel?: string
  onSaveDisabled?: boolean

  onClose: () => void
  onCloseLabel?: string
}

const Controls = ({
  onSave,
  onClose,
  onSaveLabel,
  onCloseLabel,
  onSaveDisabled,
  isLoading,
}: ControlsProps & { isLoading?: boolean }) => {
  return (
    <div className={styles.controls}>
      <Button onClick={onClose} extraStyle="gray">
        {onCloseLabel ? onCloseLabel : 'Close'}
      </Button>
      <Button isLoading={isLoading} disabled={isLoading || onSaveDisabled} onClick={onSave}>
        {onSaveLabel ? onSaveLabel : 'Save'}
      </Button>
    </div>
  )
}
