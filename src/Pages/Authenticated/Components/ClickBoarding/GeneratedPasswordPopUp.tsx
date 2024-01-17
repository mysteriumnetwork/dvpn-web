/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ConfirmationDialog } from '../../../../Components/ConfirmationDialog/ConfirmationDialog'
import { useStores } from '../../../../mobx/store'
import { observer } from 'mobx-react-lite'

const Password = styled.div`
  font-size: ${({ theme }) => theme.common.fontSizeBigger};
  font-weight: bold;
  color: ${({ theme }) => theme.generatedPassword.textColor};
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`

const Warning = styled.div`
  margin-top: 10px;
  font-size: ${({ theme }) => theme.common.fontSizeNormal};
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

export const GeneratedPasswordPopUp = observer(() => {
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
    return <></>
  }

  return (
    <ConfirmationDialog
      hideCancel
      disableBackdrop
      show={show}
      message={
        <Column>
          <Row>
            <Password>{generatedPassword}</Password>
          </Row>
          <Warning>Please write down the password or use it to change to a new password in settings page.</Warning>
        </Column>
      }
      title="Your NodeUI Password"
      onConfirm={() => {
        setShow(false)
        store.generatedPassword = undefined
        navigate(location.pathname, { replace: true })
      }}
    ></ConfirmationDialog>
  )
})
