/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect } from 'react'
import { useAppSelector } from '../../../../commons/hooks'
import { selectors } from '../../../../redux/selectors'
import { BeneficiaryTxStatus } from 'mysterium-vpn-js'

interface Props {
  onTxError: (status: BeneficiaryTxStatus) => void
}

export const BeneficiaryTxCheck = ({ onTxError }: Props) => {
  const beneficiaryTxStatus = useAppSelector(selectors.beneficiaryTxStatus)

  useEffect(() => {
    if (!beneficiaryTxStatus.error) {
      return
    }
    onTxError(beneficiaryTxStatus)
  }, [beneficiaryTxStatus.error])
  return <></>
}
