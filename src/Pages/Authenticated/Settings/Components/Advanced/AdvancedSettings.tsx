/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react'
import { InputGroup } from '../../../../../Components/InputGroups/InputGroup'
import { TextField } from '../../../../../Components/TextField/TextField'
import styles from './AdvancedSettings.module.scss'
import Button from '../../../../../Components/Buttons/Button'
import { useSelector } from 'react-redux'
import { selectors } from '../../../../../redux/selectors'
import { configParser } from '../../../../../commons/config'
import { tequila } from '../../../../../api/wrapped-calls'
import { Config } from 'mysterium-vpn-js'
import calls from '../../../../../commons/calls'
import { NATTraversalOrder, TraversalProp } from './NATTraversalOrder'

const { setUserConfig } = tequila

interface Form {
  udpPortRange: string
  stunServers: string
  rpcl2Urls: string
  traversals: TraversalProp[]
}

const initialForm: Form = {
  udpPortRange: '',
  stunServers: '',
  rpcl2Urls: '',
  traversals: [],
}

const rpcl2UrlsWithoutDefaults = (config: Config, defaultConfig: Config): string[] => {
  const all = configParser.rpcl2(config)
  const defaults = configParser.rpcl2(defaultConfig)

  return all.filter((u) => !defaults.includes(u))
}

export const AdvancedSettings = () => {
  const config = useSelector(selectors.configSelector)
  const defaultConfig = useSelector(selectors.defaultConfigSelector)

  const [form, setForm] = useState<Form>(initialForm)
  const [isLoading, setLoading] = useState<boolean>(true)

  const rpcl2UrlsWithDefaults = (): string[] => {
    const rpcl2 = form.rpcl2Urls.length > 0 ? form.rpcl2Urls.split(',') : []
    return [...rpcl2, ...defaultData['ether.client.rpcl2']]
  }

  const mapTraversals = (): TraversalProp[] => {
    const traversalSetting = configParser.natTraversals(config)
    if (traversalSetting?.length === 0) {
      return []
    }
    return traversalSetting.split(',').map((s) => ({ key: s, label: s }))
  }

  const udpPortRange = configParser.udpPorts(config)
  const stunServers = configParser.stunServers(config).join(',')
  const traversals = mapTraversals()
  const rpcl2Urls = rpcl2UrlsWithoutDefaults(config, defaultConfig).join(',')

  useEffect(() => {
    ;(async () => {
      setForm((p) => ({
        ...p,
        udpPortRange,
        stunServers,
        rpcl2Urls,
        traversals,
      }))
      setLoading(false)
    })()
  }, [config])

  const defaultData = {
    'stun-servers': configParser.stunServers(defaultConfig),
    'udp.ports': configParser.udpPorts(defaultConfig),
    traversal: configParser.natTraversals(defaultConfig),
    'ether.client.rpcl2': configParser.rpcl2(defaultConfig),
  }

  const data = {
    'stun-servers': form.stunServers.split(','),
    'udp.ports': form.udpPortRange,
    traversal: form.traversals.map((st) => st.key).join(','),
    'ether.client.rpcl2': rpcl2UrlsWithDefaults(),
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await calls.tryTo(() => setUserConfig(data), { success: 'Settings saved' })
    setLoading(false)
  }

  const resetToDefault = async () => {
    setLoading(true)
    await calls.tryTo(() => setUserConfig(defaultConfig.data), { success: 'Settings reset' })
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup label="UDP Port Range">
        <TextField onChange={(udpPortRange) => setForm((p) => ({ ...p, udpPortRange }))} value={form.udpPortRange} />
      </InputGroup>
      <InputGroup label="STUN Servers">
        <TextField onChange={(stunServers) => setForm((p) => ({ ...p, stunServers }))} value={form.stunServers} />
      </InputGroup>
      <InputGroup>
        <NATTraversalOrder items={form.traversals} onDrop={(traversals) => setForm((p) => ({ ...p, traversals }))} />
      </InputGroup>
      <InputGroup label="L2 RPC URLs (Requires NODE restart)">
        <TextField
          onChange={(rpcl2Urls) => setForm((p) => ({ ...p, rpcl2Urls }))}
          value={form.rpcl2Urls}
          placeholder="http://rpc-1,http://rpc-2"
        />
      </InputGroup>
      <div className={styles.buttons}>
        <Button onClick={resetToDefault} isLoading={isLoading} extraStyle="gray" type="reset">
          Restore Default
        </Button>
        <Button type="submit" isLoading={isLoading}>
          Save
        </Button>
      </div>
    </form>
  )
}
