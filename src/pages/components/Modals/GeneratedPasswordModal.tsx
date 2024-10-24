/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import ConfirmationModal from '../../../components/Modals/ConfirmationModal'
import Label from '../../../components/Typography/Label'
import Text from '../../../components/Typography/Text'
import { useStores } from '../../../mobx/store'

export const GeneratedPasswordModal = observer(() => {
  const { clickBoardingStore: store } = useStores()
  const [show, setShow] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const generatedPassword = store.generatedPassword

  useEffect(() => {
    if (generatedPassword) {
      setShow(true)
    }
  }, [generatedPassword])

  if (!generatedPassword) {
    return null
  }

  return (
    <ConfirmationModal
      hideCancel
      isOpen={show}
      message={
        <div className="flex flex-col gap-2.5">
          <Label value={generatedPassword} className="text-pink-525" />
          <Text value="Please write down the password or use it to change to a new password in settings page." />
        </div>
      }
      title="Your NodeUI Password"
      onConfirm={() => {
        setShow(false)
        store.generatedPassword = undefined
        navigate(location.pathname, { replace: true })
      }}
    ></ConfirmationModal>
  )
})
