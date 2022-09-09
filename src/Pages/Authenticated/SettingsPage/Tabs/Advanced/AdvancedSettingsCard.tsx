/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SettingsCard } from '../../SettingsCard'
import { Button } from '../../../../../Components/Inputs/Button'
import styled from 'styled-components'
import { InputGroup } from '../../../../../Components/Inputs/InputGroup'
import { useEffect, useMemo, useState } from 'react'
import { useAppSelector } from '../../../../../commons/hooks'
import { selectors } from '../../../../../redux/selectors'
import { configs } from '../../../../../commons/config'
import calls from '../../../../../commons/calls'
import complexActions from '../../../../../redux/complex.actions'
import { TextField } from '../../../../../Components/Inputs/TextField'
import { Config } from 'mysterium-vpn-js'

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
export interface AdvancedSettingsForms {
  udpRange: string
  l2RPCurls: string
  stunServerURLS: string
}

const INITIAL_FORM: AdvancedSettingsForms = {
  udpRange: '',
  l2RPCurls: '',
  stunServerURLS: '',
}

const rpcl2UrlsWithoutDefaults = (config: Config, defaultConfig: Config): string[] => {
  const all = configs.rpcl2(config)
  const defaults = configs.rpcl2(defaultConfig)

  return all.filter((u) => !defaults.includes(u))
}

export const AdvancedSettingsCard = () => {
  const [form, setForm] = useState<AdvancedSettingsForms>(INITIAL_FORM)
  const [loading, setLoading] = useState<boolean>(false)

  const config = useAppSelector(selectors.currentConfig)
  const defaultConfig = useAppSelector(selectors.defaultConfig)

  useEffect(() => {
    setForm((p) => ({
      ...p,
      udpRange: configs.udpPorts(config),
      l2RPCurls: rpcl2UrlsWithoutDefaults(config, defaultConfig).join(','),
      stunServerURLS: configs.stunServers(config).join(','),
    }))
  }, [])

  const rpcl2UrlsWithDefaults = (): string[] => {
    const rpcl2 = form.l2RPCurls.length > 0 ? form.l2RPCurls.split(',') : []
    return [...rpcl2, ...defaultData['ether.client.rpcl2']]
  }

  const defaultData = useMemo(
    () => ({
      'stun-servers': configs.stunServers(defaultConfig),
      'udp.ports': configs.udpPorts(defaultConfig),
      'ether.client.rpcl2': configs.rpcl2(defaultConfig),
    }),
    [],
  )

  const data = {
    'stun-servers': form.stunServerURLS.split(','),
    'udp.ports': form.udpRange,
    'ether.client.rpcl2': rpcl2UrlsWithDefaults(),
  }

  const handleUDPRangeChange = (udpRange: string) => setForm((p) => ({ ...p, udpRange }))
  const handleL2RPCurlsChange = (l2RPCurls: string) => setForm((p) => ({ ...p, l2RPCurls }))
  const handleStunServersChange = (stunServerURLS: string) => setForm((p) => ({ ...p, stunServerURLS }))

  const handleSave = async () => {
    setLoading(true)
    await calls.tryTo(() => complexActions.setUserConfig(data), { success: 'Settings saved' })
    setLoading(false)
  }

  const handleReset = async () => {
    setLoading(true)
    await calls.tryTo(() => complexActions.setUserConfig(defaultData), { success: 'Settings reset' })
    setForm((p) => ({
      ...p,
      udpRange: defaultData['udp.ports'],
      l2RPCurls: '',
      stunServerURLS: defaultData['stun-servers'].join(','),
      traversals: configs.natTraversals(defaultConfig),
    }))
    setLoading(false)
  }

  return (
    <SettingsCard
      loading={loading}
      footer={
        <Controls>
          <Button variant="outlined" label="Restore default" onClick={handleReset} />
          <Button variant="secondary" label="Save" onClick={handleSave} />
        </Controls>
      }
      title="Advanced Settings"
    >
      <InputGroup title="UDP Port range" input={<TextField value={form.udpRange} onChange={handleUDPRangeChange} />} />
      <InputGroup
        title="L2 RPC URLs (Requires NODE restart)"
        input={<TextField value={form.l2RPCurls} onChange={handleL2RPCurlsChange} />}
      />
      <InputGroup
        title="Stun Servers"
        input={<TextField value={form.stunServerURLS} onChange={handleStunServersChange} />}
      />
    </SettingsCard>
  )
}
