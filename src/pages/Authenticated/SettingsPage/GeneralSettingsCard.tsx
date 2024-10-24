/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { ChangeWalletModal } from '../../components/Modals/ChangeWalletModal'
import Card from '../../../components/Cards/Card'
import { LabeledInput } from '../../../components/Inputs/LabeledInput'
import CopyToClipboardInputIcon from '../../../components/Inputs/CopyToClipboardInputIcon'
import { ClaimButton } from '../Components/Claim/ClaimButton'
import Label from '../../../components/Typography/Label'
import Text from '../../../components/Typography/Text'
import FormInput from '../../../components/Inputs/FormInput'
import { EditIcon } from '../../../components/Icons/Icons'
import { useAppSelector, useFetch } from '../../../commons/hooks'
import { selectors } from '../../../redux/selectors'
import { useStores } from '../../../mobx/store'
import { tequila } from '../../../api/tequila'

const { api } = tequila

const GeneralSettingsCard = observer(() => {
  const { beneficiaryStore } = useStores()
  const { id } = useAppSelector(selectors.currentIdentity)
  const [apiToken, dataLoading] = useFetch(() => api.getMMNApiKey(), [id])
  const [token, setToken] = useState<string>('')

  useEffect(() => {
    if (apiToken?.apiKey) {
      setToken(apiToken?.apiKey)
    }
  }, [apiToken?.apiKey])

  useEffect(() => {
    beneficiaryStore.fetchBeneficiaryAsyncAddress(id)
  }, [id])

  return (
    <Card fluid isLoading={dataLoading} className="mb-10">
      <LabeledInput
        label="API key"
        value={token}
        onChange={(value: string) => setToken(value)}
        fluid
        disabled
        errorMessagePadding={false}
        controls={<CopyToClipboardInputIcon text={token} />}
      />
      <ClaimButton label="Claim on my.mystnodes.com" className="my-8" />
      <Label value="Settlement wallet" className="mb-1.5" />
      <Text
        className="mb-5"
        value="Your earnings will automatically be paid out to the wallet address submitted below.
        If you have not set your wallet or would like to update it, please do it now."
      />
      <FormInput
        value={beneficiaryStore.address}
        placeholder="Beneficiary wallet has not been set"
        fluid
        disabled
        onChange={(v) => beneficiaryStore.setAddress(v)}
        onIconClick={() => beneficiaryStore.setShowChangeModal()}
        controls={<EditIcon />}
        errorMessagePadding={false}
      />
      <ChangeWalletModal
        error={beneficiaryStore.error}
        onChange={(address) => beneficiaryStore.updateBeneficiaryAsyncAddress({ identity: id, address })}
        onClose={() => beneficiaryStore.setShowChangeModal(false)}
        show={beneficiaryStore.showChangeModal}
      />
    </Card>
  )
})

export default GeneralSettingsCard
