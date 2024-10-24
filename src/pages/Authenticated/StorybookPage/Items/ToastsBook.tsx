/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ErrorToast, InfoToast, SuccessToast, WarningToast } from '../../../../components/Toasts/Toasts'
import Button from '../../../../components/Buttons/Button'
import Card from '../../../../components/Cards/Card'
import toasts from '../../../../commons/toasts'

const ToastsBook = () => {
  return (
    <div className="flex justify-between mt-10">
      <Card className="gap-5">
        <SuccessToast message="All is well!" />
        <Button label="Show toast" size="sm" fluid onClick={() => toasts.toastSuccess('All is well!')} />
      </Card>
      <Card className="gap-5">
        <WarningToast message="Caution!" />
        <Button label="Show toast" size="sm" fluid onClick={() => toasts.toastWarning('Caution!')} />
      </Card>
      <Card className="gap-5">
        <ErrorToast message="All is not well!" />
        <Button label="Show toast" size="sm" fluid onClick={() => toasts.toastError('All is not well!')} />
      </Card>
      <Card className="gap-5">
        <InfoToast message="Information" />
        <Button label="Show toast" size="sm" fluid onClick={() => toasts.toastInfo('Information')} />
      </Card>
    </div>
  )
}

export default ToastsBook
