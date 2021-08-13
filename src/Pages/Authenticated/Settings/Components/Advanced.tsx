/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from 'mysterium-vpn-js/lib/config/config'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { SUPPORTED_TRAVERSALS } from '../../../../commons/config'
import { parseError, parseMMNError } from '../../../../commons/error.utils'
import Button from '../../../../Components/Buttons/Button'
import { TextField } from '../../../../Components/TextField'
import * as utils from '../../../../commons/config'
import Errors from '../../../../Components/Validation/Errors'

interface Data {
  [key: string]: any
}

interface Props {
  defaultConfig: Config
  config: Config
  onSave: (data: Data) => Promise<any>
}

interface State {
  stunServers: string
  udpPorts: string
  natTraversals: string
  saving: boolean

  error: boolean
  errorMessage: string
}

const initialState: State = {
  udpPorts: '',
  stunServers: '',
  natTraversals: '',
  saving: false,

  error: false,
  errorMessage: '',
}

export const Advanced = ({ config, defaultConfig, onSave }: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const [state, setState] = useState<State>(initialState)

  useEffect(() => {
    setState((p) => ({
      ...p,
      stunServers: utils.stunServers(config).join(','),
      udpPorts: utils.udpPorts(config),
      natTraversals: utils.natTraversals(config),
    }))
  }, [config])

  const defaultData: Data = {
    'stun-servers': utils.stunServers(defaultConfig),
    'udp.ports': utils.udpPorts(defaultConfig),
    traversal: utils.natTraversals(defaultConfig),
  }
  const data: Data = {
    'stun-servers': state.stunServers.split(','),
    'udp.ports': state.udpPorts,
    traversal: state.natTraversals,
  }

  const updateUserConfig = (data: Data, successMessage: string) => {
    setState((p) => ({ ...p, saving: true }))
    onSave(data)
      .then(() =>
        enqueueSnackbar(successMessage, {
          variant: 'success',
        }),
      )
      .catch((err) => enqueueSnackbar(parseMMNError(err) || parseError(err), { variant: 'error' }))
      .finally(() => setState((p) => ({ ...p, saving: false })))
  }

  const dataValid = (): boolean => {
    const { stunServers, udpPorts, natTraversals } = state

    stunServers.split(',').forEach((url) => {
      try {
        new URL(`http://${url}`)
      } catch (_) {
        setState((p) => ({ ...p, error: true, errorMessage: `Invalid stun server URL: ${url}` }))
        return false
      }
    })

    natTraversals.split(',').forEach((t) => {
      if (SUPPORTED_TRAVERSALS.indexOf(t) === -1) {
        setState((p) => ({ ...p, error: true, errorMessage: `Unsupported NAT traversal: ${t}` }))
        return false
      }
    })

    const ranges = udpPorts.split(':')
    if (ranges.length !== 2) {
      setState((p) => ({ ...p, error: true, errorMessage: `Invalid Port Range format '${udpPorts}'` }))
      return false
    }
    const lower = parseInt(ranges[0])
    const upper = parseInt(ranges[1])

    if (lower > upper || lower < 0 || lower > 65535 || upper < 0 || upper > 65535 || lower === upper) {
      setState((p) => ({ ...p, error: true, errorMessage: `Invalid Port Range '${udpPorts}'` }))
      return false
    }

    return true
  }

  return (
    <div>
      <Errors error={state.error} errorMessage={state.errorMessage} />
      <div className="input-group">
        <div className="input-group__label">Part Range</div>
        <TextField
          stateName="udpPorts"
          handleChange={(s: keyof State) => (e) => {
            const { value } = e.target
            setState((p) => ({ ...p, [s]: value }))
          }}
          value={state.udpPorts}
        />
      </div>
      <div className="input-group">
        <div className="input-group__label">STUN Servers</div>
        <TextField
          stateName="stunServers"
          handleChange={(s: keyof State) => (e) => {
            const { value } = e.target
            setState((p) => ({ ...p, [s]: value }))
          }}
          value={state.stunServers}
        />
      </div>
      <div className="input-group">
        <div className="input-group__label">NAT Traversal Order</div>
        <TextField
          stateName="natTraversals"
          handleChange={(s: keyof State) => (e) => {
            const { value } = e.target
            setState((p) => ({ ...p, [s]: value }))
          }}
          value={state.natTraversals}
        />
      </div>
      <div className="footer__buttons m-t-40">
        <Button onClick={() => updateUserConfig(defaultData, 'Settings reset')} extraStyle="gray">
          Restore Default
        </Button>
        <div className="flex-grow" />
        <Button
          onClick={() => {
            if (dataValid()) {
              updateUserConfig(data, 'Settings updated')
            }
          }}
          isLoading={state.saving}
        >
          Save
        </Button>
      </div>
    </div>
  )
}
