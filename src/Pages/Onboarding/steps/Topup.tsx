/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect } from 'react'
import { QRCode } from 'react-qr-svg'
import Button from '../../../Components/Buttons/Button'
import { currentCurrency, displayMyst } from '../../../commons/money.utils'
import { tequilapiClient } from '../../../api/TequilApiClient'
import { Fees, Identity } from 'mysterium-vpn-js'

interface Props {
  callbacks: OnboardingChildProps
  channelAddress: string
  beneficiary: string
  stake: number
  fees: Fees
  identity: Identity
}

const Topup = ({ callbacks, channelAddress, fees, identity, stake, beneficiary }: Props) => {
  useEffect(() => {
    if (identity.balance >= fees.registration + stake) {
      tequilapiClient
        .identityRegister(identity.id, {
          beneficiary,
          stake,
        })
        .then(() => callbacks.nextStep())
    }
  }, [identity])

  return (
    <div className="step">
      <h1 className="step__title">Topup</h1>
      <p className="step__description">
        To activate your account, transfer {displayMyst(fees.registration + stake)} to your wallet (Görli Testnet
        blockchain)
      </p>
      <div className="step__content m-t-20">
        <div className="qr-code">
          <QRCode value={channelAddress} />
        </div>
        <p className="step__description">
          {`Do not send any other cryptocurrency to this address! Only ${currentCurrency()} tokens are accepted.`}
        </p>
        <div className="step__content-buttons step__content-buttons--center m-t-50">
          <Button isLoading={true}>Next</Button>
        </div>
      </div>
    </div>
  )
}

export default Topup
