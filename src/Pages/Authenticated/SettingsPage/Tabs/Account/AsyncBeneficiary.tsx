/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { InputGroup } from '../../../../../Components/Inputs/InputGroup'
import { TextField } from '../../../../../Components/Inputs/TextField'
import { SettingsCard } from '../../SettingsCard'
import { useEffect } from 'react'

import { useAppSelector } from '../../../../../commons/hooks'
import { selectors } from '../../../../../redux/selectors'
import { AsyncBeneficiaryStore } from './asyncBeneficiary.store'
import { observer } from 'mobx-react-lite'
import { ReactComponent as EditIcon } from '../../../../../assets/images/edit.svg'
import styled from 'styled-components'
import { AsyncBeneficiaryUpdateModal } from './AsyncBeneficiaryUpdateModal'

const StyledEditIcon = styled(EditIcon)`
  cursor: pointer;
`

const store = new AsyncBeneficiaryStore()

export const AsyncBeneficiary = observer(() => {
  const { id } = useAppSelector(selectors.currentIdentity)

  useEffect(() => {
    store.fetchBeneficiaryAsyncAddress(id)
  }, [id])

  return (
    <SettingsCard loading={store.loading} title="Settlement Wallet">
      <InputGroup
        input={
          <TextField
            disabled
            value={store.address}
            icon={<StyledEditIcon onClick={() => store.setShowChangeModal()} />}
            onChange={(v) => store.setAddress(v)}
            placeholder="Enter your settlement wallet address..."
          />
        }
      />
      <AsyncBeneficiaryUpdateModal
        error={store.error}
        onChange={(address) => store.updateBeneficiaryAsyncAddress({ identity: id, address })}
        onClose={() => store.setShowChangeModal(false)}
        show={store.showChangeModal}
      />
    </SettingsCard>
  )
})
