/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'

import { tequilapiClient } from '../../../api/TequilApiClient'
import Header from '../../../Components/Header'
import { currentIdentity } from '../../../redux/app.slice'
import { RootState } from '../../../redux/store'
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/settings/logo.svg'
import { parseError, parseMMNError } from '../../../commons/error.utils'

import MMN from './Components/MMN'
import PasswordChange from './Components/PasswordChange'
import IdentityBackup from './Components/IdentityBackup'

import './Setings.scss'
import * as config from '../../../commons/config'
import PayoutAddress from './Components/PayoutAddress'
import { Fees, Identity } from 'mysterium-vpn-js'
import { CircularProgress } from '@material-ui/core'
import Version from './Components/Version'

interface StateInterface {
  apiKey: string
  beneficiary?: string
  fees?: Fees
  nodeVersion?: string
}

const canSettle = (identity?: Identity, fees?: Fees): boolean => {
  if (identity === undefined || fees === undefined) {
    return false
  }
  return identity?.earnings - fees?.settlement > 0
}

const Settings = (): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar()

  const hermesId = useSelector<RootState, string | undefined>(({ app }) => config.hermesId(app.config))
  const identity = useSelector<RootState, Identity | undefined>(({ app, sse }) =>
    currentIdentity(app.currentIdentityRef, sse.appState?.identities),
  )
  const mmnWebAddress = useSelector<RootState, string>(({ app }) => config.mmnWebAddress(app.config))

  const [loading, setLoading] = React.useState<boolean>(true)
  const [state, setState] = React.useState<StateInterface>({
    apiKey: '',
  })

  useEffect(() => {
    Promise.all([
      tequilapiClient.getMMNApiKey(),
      tequilapiClient.transactorFees(),
      tequilapiClient.healthCheck(15_000),
      !identity ? Promise.reject() : tequilapiClient.identityBeneficiary(identity.id),
    ])
      .then(([mmn, fees, healthcheck, { beneficiary }]) =>
        setState({
          ...state,
          apiKey: mmn.apiKey,
          fees: fees,
          nodeVersion: healthcheck.version,
          beneficiary: beneficiary,
        }),
      )
      .catch((err) => enqueueSnackbar(parseMMNError(err) || parseError(err), { variant: 'error' }))
      .finally(() => setLoading(false))
  }, [identity])

  if (loading) {
    return <CircularProgress className="spinner" />
  }

  return (
    <>
      <div className="main">
        <div className="main-block">
          <div className="settings-header">
            <Header logo={Logo} name="Settings" />
            <Version nodeVersion={state.nodeVersion} />
          </div>
          <div className="settings">
            <div className="settings__block">
              <p className="heading">Identity</p>
              <div className="content">
                <IdentityBackup identity={identity?.id || ''} />
              </div>

              <p className="heading m-t-20">Beneficiary (payout address)</p>
              <div className="content">
                <PayoutAddress
                  canSettle={canSettle(identity, state.fees)}
                  beneficiary={state.beneficiary!}
                  hermesId={hermesId!}
                  providerId={identity?.id!}
                  fees={state.fees!}
                />
              </div>
            </div>

            <div className="settings__block">
              <p className="heading">WebUI security</p>
              <div className="content">
                <PasswordChange />
              </div>
            </div>

            <div className="settings__block">
              <p className="heading">MMN integration</p>
              <div className="content">
                <MMN mmnUrl={mmnWebAddress} apiKey={state.apiKey} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings
