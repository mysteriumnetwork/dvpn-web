/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Identity } from 'mysterium-vpn-js'
import { useState } from 'react'
import { ReactComponent as Wallet } from '../../../../assets/icons/WithdrawalWallet.svg'
import Button from '../../../../Components/Buttons/Button'
import './Statistic.scss'
import WithdrawalModal from './WithdrawalModal'

interface Props {
  stat: string
  name: string
  identity: Identity
}

const EarningsStatCard = ({ stat, name, identity }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const toggleModal = () => setModalOpen(!modalOpen)

  return (
    <div className="dashboard-statistic-hero">
      <div className="dashboard-statistic-hero__icon">
        <Wallet />
      </div>
      <div className="dashboard-statistic-hero__stat">
        <p className="dashboard-statistic-hero__value-hero">{stat}</p>
        <p className="dashboard-statistic-hero__label-hero">{name}</p>
      </div>
      <div>
        <Button onClick={toggleModal} extraStyle="gray">
          Withdraw
        </Button>
      </div>
      <WithdrawalModal identity={identity} isOpen={modalOpen} onClose={toggleModal} />
    </div>
  )
}

export default EarningsStatCard
