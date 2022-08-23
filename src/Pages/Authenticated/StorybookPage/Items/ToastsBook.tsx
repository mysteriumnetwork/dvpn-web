/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CenteredRow } from '../Components'
import { ErrorToast, InfoToast, SuccessToast, WarningToast } from '../../../../Components/Toasts/Toasts'
import { LayoutRow } from '../../Components/Layout/Layout'
import { Button } from '../../../../Components/Inputs/Button'
import toasts from '../../../../commons/toasts'

const ToastsBook = () => {
  return (
    <CenteredRow>
      <LayoutRow>
        <SuccessToast message="All is well!" />
        <Button label="Success" onClick={() => toasts.toastSuccess('All is well!')} />
      </LayoutRow>
      <LayoutRow>
        <WarningToast message="Caution!" />
        <Button label="Warning" onClick={() => toasts.toastWarning('Caution!')} />
      </LayoutRow>
      <LayoutRow>
        <ErrorToast message="All is not well!" />
        <Button label="Error" onClick={() => toasts.toastError('All is not well!')} />
      </LayoutRow>
      <LayoutRow>
        <InfoToast message="Information" />
        <Button label="Info" onClick={() => toasts.toastInfo('Information')} />
      </LayoutRow>
    </CenteredRow>
  )
}

export default ToastsBook
