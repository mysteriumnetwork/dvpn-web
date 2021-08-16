/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from 'mysterium-vpn-js/lib/config/config'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { tequilapiClient } from '../../../../api/TequilApiClient'
import * as utils from '../../../../commons/config'
import { SUPPORTED_TRAVERSALS } from '../../../../commons/config'
import { parseError, parseMMNError } from '../../../../commons/error.utils'
import Button from '../../../../Components/Buttons/Button'
import { TextField } from '../../../../Components/TextField'
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
  rpcl2: string
  saving: boolean

  error: boolean
  errorMessage: string
}

const initialState: State = {
  udpPorts: '',
  stunServers: '',
  natTraversals: '',
  rpcl2: '',
  saving: false,

  error: false,
  errorMessage: '',
}

export const Advanced = ({ config, defaultConfig, onSave }: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const [state, setState] = useState<State>(initialState)

  const rpcl2UrlsWithoutDefaults = (): string[] => {
    const all = utils.rpcl2(config)
    const defaults = utils.rpcl2(defaultConfig)
    return all.filter((u) => defaults.indexOf(u) === -1)
  }

  useEffect(() => {
    setState((p) => ({
      ...p,
      stunServers: utils.stunServers(config).join(','),
      udpPorts: utils.udpPorts(config),
      natTraversals: utils.natTraversals(config),
      rpcl2: rpcl2UrlsWithoutDefaults().join(','),
    }))
  }, [config])

  const defaultData: Data = {
    'stun-servers': utils.stunServers(defaultConfig),
    'udp.ports': utils.udpPorts(defaultConfig),
    traversal: utils.natTraversals(defaultConfig),
    'ether.client.rpcl2': utils.rpcl2(defaultConfig),
  }

  const rpcl2UrlsWithDefaults = (): string[] => {
    const rpcl2 = state.rpcl2.length > 0 ? state.rpcl2.split(',') : []
    rpcl2.push(...defaultData['ether.client.rpcl2'])
    return rpcl2
  }

  const data: Data = {
    'stun-servers': state.stunServers.split(','),
    'udp.ports': state.udpPorts,
    traversal: state.natTraversals,
    'ether.client.rpcl2': rpcl2UrlsWithDefaults(),
  }

  const updateUserConfig = async (data: Data, successMessage: string) => {
    setState((p) => ({ ...p, saving: true }))
    try {
      await onSave(data)
      enqueueSnackbar(successMessage, {
        variant: 'success',
      })
    } catch (err) {
      enqueueSnackbar(parseMMNError(err) || parseError(err), { variant: 'error' })
    } finally {
      setState((p) => ({ ...p, saving: false }))
    }
  }

  const validateData = async (): Promise<boolean> => {
    setState((p) => ({ ...p, error: false, errorMessage: '' }))

    const { stunServers, udpPorts, natTraversals, rpcl2 } = state
    let isValid = true
    stunServers.split(',').forEach((url) => {
      try {
        new URL(`http://${url}`)
      } catch (_) {
        setState((p) => ({ ...p, error: true, errorMessage: `Invalid stun server URL: ${url}` }))
        isValid = false
      }
    })

    natTraversals.split(',').forEach((t) => {
      if (SUPPORTED_TRAVERSALS.indexOf(t) === -1) {
        setState((p) => ({
          ...p,
          error: true,
          errorMessage: `Unsupported NAT traversal: ${t}. Allowed: (${SUPPORTED_TRAVERSALS.join(',')}`,
        }))
        isValid = false
      }
    })

    const ranges = udpPorts.split(':')
    if (ranges.length !== 2) {
      setState((p) => ({ ...p, error: true, errorMessage: `Invalid Port Range format '${udpPorts}'` }))
      isValid = false
    }
    const lower = parseInt(ranges[0])
    const upper = parseInt(ranges[1])

    if (lower > upper || lower < 0 || lower > 65535 || upper < 0 || upper > 65535 || lower === upper) {
      setState((p) => ({ ...p, error: true, errorMessage: `Invalid Port Range '${udpPorts}'` }))
      isValid = false
    }

    if (rpcl2.length > 0) {
      rpcl2.split(',').forEach((url) => {
        try {
          new URL(url)
        } catch (e) {
          setState((p) => ({ ...p, error: true, errorMessage: `Invalid L2 RPC URL: ${url}` }))
          isValid = false
        }
      })

      if (!isValid) {
        return Promise.reject(false)
      }

      try {
        await tequilapiClient.validateEthRPCL2(rpcl2.split(','))
      } catch (e) {
        setState((p) => ({ ...p, error: true, errorMessage: e.message }))
        isValid = false
      }
    }

    return isValid ? Promise.resolve(true) : Promise.reject(false)
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
      <div className="input-group">
        <div className="input-group__label">
          L2 RPC URLS <span className="input-group__help-warning">*Requires NODE restart</span>
        </div>
        <TextField
          placeholder="http://rpc-1,http://rpc-2"
          stateName="rpcl2"
          handleChange={(s: keyof State) => (e) => {
            const { value } = e.target
            setState((p) => ({ ...p, [s]: value }))
          }}
          value={state.rpcl2}
        />
      </div>

      <div className="footer__buttons m-t-40">
        <Button
          onClick={() => updateUserConfig(defaultData, 'Settings reset')}
          isLoading={state.saving}
          extraStyle="gray"
        >
          Restore Default
        </Button>
        <div className="flex-grow" />
        <Button
          onClick={async () => {
            try {
              const valid = await validateData()
              if (valid) {
                await updateUserConfig(data, 'Settings updated')
              }
            } catch (_) {}
          }}
          isLoading={state.saving}
        >
          Save
        </Button>
      </div>
    </div>
  )
}
