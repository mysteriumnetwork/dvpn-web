/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styles from '../../Pages/Onboarding/steps/TopUpModal/TopUpModal.module.scss'
import { Fade, Modal as MUIModal } from '@material-ui/core'

export const Modal = ({ open, children }: { open: boolean; children: any }) => (
  <MUIModal
    open={open}
    className={styles.modal}
    disableAutoFocus={true}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={open}>{children}</Fade>
  </MUIModal>
)
