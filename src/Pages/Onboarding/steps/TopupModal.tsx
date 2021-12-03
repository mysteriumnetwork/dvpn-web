/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CircularProgress, Fade, Modal, Tooltip } from '@material-ui/core'
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline'
import { Identity } from 'mysterium-vpn-js'
import React, { ReactFragment, useEffect, useMemo, useState } from 'react'
import { QRCode } from 'react-qr-svg'
import { useSelector } from 'react-redux'
import { api } from '../../../api/Api'
import storage from '../../../commons/localStorage.utils'
import { displayMyst, toFixedMoney, toMyst } from '../../../commons/money.utils'
import Button from '../../../Components/Buttons/Button'
import { Radio } from '../../../Components/Radio/Radio'
import { feesSelector } from '../../../redux/selectors'
import styles from './TopupModal.module.scss'

interface Props {
  onTopup: () => Promise<void>
  onClose: () => void
  identity: Identity
  open: boolean
  currentChainName?: string
  isFreeRegistrationEligible: boolean
}

const REGISTRATION_FEE_KEY = 'registration_fee'

interface RegistrationFee {
  timestamp: number
  fee: number
}

const _60_MINUTES = 60 * 60 * 1000

const isStale = (rf: RegistrationFee) => {
  return rf.timestamp + _60_MINUTES < Date.now()
}

const howToGetMyst = (): ReactFragment => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div>
        To avoid transaction fees on Ethereum network, we recommend to use Polygon network for MYST transfers. Follow
        these steps to buy MYST tokens needed for registration:
      </div>
      <div>
        1. Buy MATIC token for amount of $ you'd like to spend for MYST on Binance or any other exchange supporting
        Polygon network withdrawal.
      </div>
      <div>
        2. Install Metamask wallet. Configure it work with Polygon (
        <a
          href="https://docs.mysterium.network/node-runners/payout-guide/#link-metamask-to-the-polygon-network"
          target="_blank"
          rel="noreferrer"
        >
          see here
        </a>
        ).
      </div>
      <div>
        3. Withdraw your MATIC into wallet address generated by MetaMask. Don't forget to choose Polygon (not Ethereum)
        in Binance withdrawal interface.
      </div>
      <div>
        4. Go to{' '}
        <a
          href="https://quickswap.exchange/#/swap?outputCurrency=0x1379e8886a944d2d9d440b3d88df536aea08d9f3"
          target="_blank"
          rel="noreferrer"
        >
          QuickSwap
        </a>{' '}
        and swap your MATIC to MYST.
      </div>
      <div>5. Send required MYST amount for your node registration.</div>
    </div>
  )
}
const TopupModal = ({ identity, onTopup, open, onClose, isFreeRegistrationEligible, currentChainName }: Props) => {
  const [isFree, setIsFree] = useState<boolean>(isFreeRegistrationEligible)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const fees = useSelector(feesSelector)

  useEffect(() => {
    const interval = setInterval(() => {
      api.identityBalanceRefresh(identity.id)
    }, 5 * 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setIsFree(isFreeRegistrationEligible)
  }, [isFreeRegistrationEligible])

  // use 2x registration fee for insurance
  const storedOrNewFee = useMemo((): RegistrationFee => {
    const stored = storage.get<RegistrationFee>(REGISTRATION_FEE_KEY)
    const registrationFee = toMyst(fees.registration, 3)
    return stored && !isStale(stored)
      ? stored
      : storage.put<RegistrationFee>(REGISTRATION_FEE_KEY, {
          timestamp: Date.now(),
          fee: registrationFee > 0.15 ? toFixedMoney(registrationFee * 1.5, 3) : 0.2, // double amount - tx prises are unstable
        })
  }, [fees])

  const isMYSTReceived = useMemo(() => (isFree ? false : toMyst(identity.balance, 3) < storedOrNewFee.fee), [
    isFree,
    identity,
    storedOrNewFee,
  ])

  return (
    <Modal
      open={open}
      className={styles.modal}
      disableAutoFocus={true}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={styles.content}>
          <div className={styles.title}>Network registration</div>
          <div className={styles.subTitle}>
            To register your node you can either use free registration subsidised by Mysterium Network or deposit a
            small amount of MYST token to cover registration fee.
          </div>
          <div className={styles.note}>
            Note: free registrations are capped per day and might not be always available.
          </div>
          <div className={styles.options}>
            <Radio
              options={[
                { value: 'free', label: 'Register for free', disabled: !isFreeRegistrationEligible },
                { value: 'paid', label: 'Deposit MYST token' },
              ]}
              checked={isFreeRegistrationEligible ? 'free' : 'paid'}
              onChange={(value) => {
                if (value === 'free') {
                  setIsFree(true)
                } else {
                  setIsFree(false)
                }
              }}
            />
          </div>
          {!isFree && (
            <>
              <div className={styles.topup}>
                <div>
                  1. Send not less than {storedOrNewFee.fee} MYST to your identity balance on {currentChainName}
                </div>
                <div className={styles.topupChannelAddress}>{identity.channelAddress}</div>
                <div className={styles.topupQR}>
                  <QRCode value={identity.channelAddress} />
                </div>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a>
                  <Tooltip
                    title={howToGetMyst()}
                    style={{ backgroundColor: '#FFFFFF !important', fill: '#9D9D9D' }}
                    placement="bottom"
                    arrow
                    interactive
                    children={<div>Don't have any MYST? Read here how to get it</div>}
                  />
                </a>
                <div>2. Wait for the confirmation (might take a couple of minutes)</div>
                <div className={styles.topupReceived}>
                  {displayMyst(identity.balance)}{' '}
                  {isMYSTReceived ? (
                    <>
                      received...
                      <CircularProgress disableShrink />
                    </>
                  ) : (
                    <CheckCircleOutline fontSize="large" />
                  )}
                </div>
              </div>
            </>
          )}
          <div className="flex-grow" />
          <div className={styles.footer}>
            <Button onClick={onClose} extraStyle="gray">
              Back
            </Button>
            <Button
              onClick={async () => {
                setIsLoading(true)
                await onTopup()
                setIsLoading(false)
              }}
              isLoading={isLoading}
              disabled={isMYSTReceived}
            >
              Next
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

export default TopupModal
