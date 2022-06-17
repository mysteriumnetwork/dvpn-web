/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'

import { tequila } from '../../../api/tequila'
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/settings/logo.svg'
import { configs } from '../../../commons/config'
import FEATURES from '../../../commons/features'
import { PowerOffButton } from '../../../Components/PowerOffButton/PowerOffButton'
import { selectors } from '../../../redux/selectors'
import { Layout } from '../Layout'
import { AdvancedSettings } from './Components/Advanced/AdvancedSettings'
import IdentityInformation from './Components/IdentityInformation'

import MMN from './Components/MMN'
import PasswordChange from './Components/PasswordChange'
import Version from './Components/Version'

import styles from './SetingsPage.module.scss'
import { useAppSelector, useFetch } from '../../../commons/hooks'
import { HEALTHCHECK_EMPTY, MMN_KEY_RESPONSE_EMPTY } from '../../../constants/instances'

const { api } = tequila

interface CardProps {
  title: string
  children: any
}

const Card = ({ title, children }: CardProps) => (
  <>
    <p className={styles.heading}>{title}</p>
    <div className={styles.content}>{children}</div>
  </>
)

const SettingsPage = () => {
  const identity = useAppSelector(selectors.currentIdentitySelector)
  const config = useAppSelector(selectors.configSelector)
  const mmnWebAddress = configs.mmnWebAddress(config)

  const [data = [], loading] = useFetch(() => Promise.all([api.getMMNApiKey(), api.healthCheck(15_000)]), [identity.id])

  const [{ apiKey } = MMN_KEY_RESPONSE_EMPTY, { buildInfo, version } = HEALTHCHECK_EMPTY] = data

  return (
    <Layout
      title="Settings"
      logo={<Logo />}
      topRight={
        <div className={styles.topRight}>
          {configs.isFeatureEnabled(config, FEATURES.RESTART.name) && (
            <div className={styles.powerOff}>
              <PowerOffButton />
            </div>
          )}
          <Version nodeVersion={version} nodeCommit={buildInfo.commit} />
        </div>
      }
      isLoading={loading}
      main={
        <div className={styles.settings}>
          <div className={styles.settingsCard}>
            <Card title="Identity">
              <IdentityInformation identity={identity} />
            </Card>
          </div>

          <div className={styles.settingsCard}>
            <Card title="WebUI security">
              <PasswordChange />
            </Card>
            {/*<Card title="Settlement Settings">*/}
            {/*  <SettlementSettings />*/}
            {/*</Card>*/}
          </div>

          <div className={styles.settingsCard}>
            <Card title="Mystnodes.com integration">
              <MMN mmnUrl={mmnWebAddress} apiKey={apiKey} />
            </Card>
            <Card title="Advanced Settings Refactor">
              <AdvancedSettings />
            </Card>
          </div>
        </div>
      }
    />
  )
}

export default SettingsPage
