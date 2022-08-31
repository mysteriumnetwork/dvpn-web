/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Card } from './Card'
import styled from 'styled-components'
import { WalletIcon } from '../../../Components/Icons/Icons'
import { useAppSelector } from '../../../commons/hooks'
import { selectors } from '../../../redux/selectors'
import { myst } from '../../../commons/mysts'
import { themeCommon } from '../../../theme/themeCommon'
import { feez } from '../../../commons/fees'
import { LockoutButton } from '../../../Components/Inputs/LockoutButton'
import { lockouts } from '../../../commons/lockout'
import { SettleModal } from '../Components/SettleModal/SettleModal'
import { useState } from 'react'
import { ReactComponent as WarningSVG } from '../../../assets/images/notifications/negative.svg'
import { media, Media } from '../../../commons/media'
import { devices } from '../../../theme/themes'
import { useMediaQuery } from 'react-responsive'

const { isDesktopQuery } = media

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 26px;
  @media ${devices.tablet} {
    gap: 40px;
  }
`
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const Column = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: column;
`

const Title = styled.div`
  max-width: 8em;
  color: ${({ theme }) => theme.text.colorSecondary};
`
const Value = styled.div`
  max-width: 8em;
  font-size: ${themeCommon.fontSizeHuge};
  font-weight: 700;
  color: ${({ theme }) => theme.text.colorMain};
`
const WarningIcon = styled(WarningSVG)`
  width: 34px;
  margin-left: 4px;
  path,
  circle {
    stroke: white;
  }
`
const SETTLE_LOCKOUT_ID = 'SETTLE_LOCKOUT_ID'

const { calculateSettled } = feez
export const TotalSettled = () => {
  const isDesktop = useMediaQuery(isDesktopQuery)

  const identity = useAppSelector(selectors.currentIdentity)
  const totalSettled = calculateSettled(identity.earningsTokens, identity.earningsTotalTokens)
  const { error } = useAppSelector(selectors.beneficiaryTxStatus)
  const [showModal, setShowModal] = useState(false)
  return (
    <Card>
      <Media.Mobile>
        <SettleModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={() => lockouts.lock({ id: SETTLE_LOCKOUT_ID, seconds: 60, refreshPage: true })}
        />
      </Media.Mobile>
      <Row>
        {isDesktop && (
          <IconContainer>
            <WalletIcon $accented />
          </IconContainer>
        )}
        <Column>
          <Title>Total settled</Title>
          <Value>{myst.display(totalSettled, { fractions: 2 })}</Value>
        </Column>
        <Media.Mobile>
          <LockoutButton
            id={SETTLE_LOCKOUT_ID}
            label={
              <>
                Settle Now
                {error && <WarningIcon />}
              </>
            }
            size={isDesktop ? 'medium' : 'small'}
            rounded
            onClick={() => setShowModal(true)}
          />
        </Media.Mobile>
      </Row>
    </Card>
  )
}
