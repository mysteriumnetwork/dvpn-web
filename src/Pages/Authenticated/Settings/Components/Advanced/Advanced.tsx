/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from 'mysterium-vpn-js'
import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'
import * as utils from '../../../../../commons/config'
import { callWithToast } from '../../../../../commons/promise.utils'
import Button from '../../../../../Components/Buttons/Button'
import { TextField } from '../../../../../Components/TextField/TextField'
import Errors from '../../../../../Components/Validation/Errors'
import { validateData } from './advanced.utils'
import { TraversalProp, NATTraversalOrder } from './NATTraversalOrder'
import styles from './Advanced.module.scss'
import classNames from 'classnames'

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
  rpcl2: string
  natTraversalSelected: TraversalProp[]

  saving: boolean
  error: boolean
  errorMessage: string
}

const initialState: State = {
  udpPorts: '',
  stunServers: '',
  natTraversalSelected: [],
  rpcl2: '',
  saving: false,

  error: false,
  errorMessage: '',
}

const mapTraversals = (config: Config): TraversalProp[] => {
  const traversalSetting = utils.natTraversals(config)
  if (traversalSetting?.length === 0) {
    return []
  }
  return traversalSetting.split(',').map((s) => ({ key: s, label: s }))
}

export const Advanced = ({ config, defaultConfig, onSave }: Props) => {
  const [state, setState] = useImmer<State>(initialState)

  useEffect(() => {
    setState((d) => {
      d.stunServers = utils.stunServers(config).join(',')
      d.udpPorts = utils.udpPorts(config)
      d.natTraversalSelected = mapTraversals(config)
      d.rpcl2 = rpcl2UrlsWithoutDefaults().join(',')
    })
  }, [config])

  const rpcl2UrlsWithDefaults = (): string[] => {
    const rpcl2 = state.rpcl2.length > 0 ? state.rpcl2.split(',') : []
    return [...rpcl2, ...defaultData['ether.client.rpcl2']]
  }

  const rpcl2UrlsWithoutDefaults = (): string[] => {
    const all = utils.rpcl2(config)
    const defaults = utils.rpcl2(defaultConfig)
    return all.filter((u) => defaults.indexOf(u) === -1)
  }

  const defaultData: Data = {
    'stun-servers': utils.stunServers(defaultConfig),
    'udp.ports': utils.udpPorts(defaultConfig),
    traversal: utils.natTraversals(defaultConfig),
    'ether.client.rpcl2': utils.rpcl2(defaultConfig),
  }

  const data: Data = {
    'stun-servers': state.stunServers.split(','),
    'udp.ports': state.udpPorts,
    traversal: state.natTraversalSelected.map((st) => st.key).join(','),
    'ether.client.rpcl2': rpcl2UrlsWithDefaults(),
  }

  const updateUserConfig = async (data: Data, successMessage: string) => {
    setState((p) => {
      p.saving = true
    })

    try {
      await callWithToast(() => onSave(data), { success: successMessage })
    } finally {
      setState((p) => {
        p.saving = false
      })
    }
  }

  const isValid = async (): Promise<boolean> => {
    const errors = await validateData(state)

    if (errors.length > 0) {
      setState((p) => {
        p.error = true
        p.errorMessage = errors[0] // TODO no support for multi error display
      })
      return false
    }

    setState((p) => {
      p.error = false
      p.errorMessage = ''
    })

    return true
  }

  const handleSave = async () => {
    const valid = await isValid()
    if (valid) {
      await updateUserConfig(data, 'Settings updated')
    }
  }

  const availableNATTraversals =
    state.natTraversalSelected.length > 0 ? state.natTraversalSelected : mapTraversals(defaultConfig)

  return (
    <form onSubmit={handleSave}>
      <Errors error={state.error} errorMessage={state.errorMessage} />
      <div className="input-group">
        <div className="input-group__label">UDP Port Range</div>
        <TextField
          onChange={(value) => {
            setState((p) => {
              p.udpPorts = value
            })
          }}
          value={state.udpPorts}
        />
      </div>
      <div className="input-group">
        <div className="input-group__label">STUN Servers</div>
        <TextField
          onChange={(value) => {
            setState((p) => {
              p.stunServers = value
            })
          }}
          value={state.stunServers}
        />
      </div>
      <div className="input-group">
        <div className="input-group__label">NAT Traversal Order</div>
        <NATTraversalOrder
          items={availableNATTraversals}
          onDrop={(items) => {
            setState((p) => {
              p.natTraversalSelected = items
            })
          }}
        />
      </div>
      <div className="input-group">
        <div className="input-group__label">L2 RPC URLs (Requires NODE restart)</div>
        <TextField
          placeholder="http://rpc-1,http://rpc-2"
          onChange={(value) => {
            setState((p) => {
              p.rpcl2 = value
            })
          }}
          value={state.rpcl2}
        />
      </div>

      <div className={classNames(styles.buttons, 'm-t-40')}>
        <Button
          onClick={() => updateUserConfig(defaultData, 'Settings reset')}
          isLoading={state.saving}
          extraStyle="gray"
          type="reset"
        >
          Restore Default
        </Button>
        <div className="flex-grow" />
        <Button type="submit" isLoading={state.saving}>
          Save
        </Button>
      </div>
    </form>
  )
}
