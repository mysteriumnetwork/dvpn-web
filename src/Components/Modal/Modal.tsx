/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styles from './Modal.module.scss'
import { Fade, Modal as MUIModal } from '@material-ui/core'

interface Props {
  open: boolean
  children: any
  onClose?: () => void
  closeAfterTransition?: boolean
  disableAutoFocus?: boolean
}

export const Modal = ({ open, children, onClose = () => {}, closeAfterTransition, disableAutoFocus }: Props) => (
  <MUIModal
    open={open}
    className={styles.modal}
    disableAutoFocus={disableAutoFocus}
    onClose={(_, reason) => {
      if (reason !== 'backdropClick') {
        onClose()
      }
    }}
    closeAfterTransition={closeAfterTransition}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={open}>{children}</Fade>
  </MUIModal>
)
