/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SettingsCard } from '../../SettingsCard'
import { InputGroup } from '../../../../../Components/Inputs/InputGroup'
import { TextField } from '../../../../../Components/Inputs/TextField'
import { useAppSelector } from '../../../../../commons/hooks'
import { useEffect } from 'react'
import { configs } from '../../../../../commons/config'
import { Config } from 'mysterium-vpn-js'
import { AdvancedSettingsForms } from './AdvancedSettings'
import { selectors } from '../../../../../redux/selectors'

interface Props {
  loading?: boolean
  form: AdvancedSettingsForms
  onChange: (udpRange: string, l2RPCurls: string, stunServers: string) => void
}

const rpcl2UrlsWithoutDefaults = (config: Config, defaultConfig: Config): string[] => {
  const all = configs.rpcl2(config)
  const defaults = configs.rpcl2(defaultConfig)

  return all.filter((u) => !defaults.includes(u))
}

export const Left = ({ onChange, loading, form }: Props) => {
  const config = useAppSelector(selectors.configSelector)
  const defaultConfig = useAppSelector(selectors.defaultConfigSelector)

  useEffect(() => {
    onChange(
      configs.udpPorts(config),
      rpcl2UrlsWithoutDefaults(config, defaultConfig).join(','),
      configs.stunServers(config).join(','),
    )
  }, [])

  return (
    <SettingsCard loading={loading} title="Advanced Settings">
      <InputGroup title="UDP Port range" input={<TextField value={form.udpRange} />} />
      <InputGroup title="L2 RPC URLs (Requires NODE restart)" input={<TextField value={form.l2RPCurls} />} />
      <InputGroup title="Stun Servers" input={<TextField value={form.stunServerURLS} />} />
    </SettingsCard>
  )
}
