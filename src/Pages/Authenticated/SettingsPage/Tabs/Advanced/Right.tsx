/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SettingsCard } from '../../SettingsCard'
import { Button } from '../../../../../Components/Inputs/Button'
import { DNDList, DNDListItem } from '../../../../../Components/Inputs/DNDList'
import styled from 'styled-components'
import calls from '../../../../../commons/calls'
import { tequila } from '../../../../../api/tequila'
import { useAppSelector } from '../../../../../commons/hooks'
import { selectors } from '../../../../../redux/selectors'
import { AdvancedSettingsForms } from './AdvancedSettings'
import { useEffect } from 'react'
import { configs } from '../../../../../commons/config'
import { InputGroup } from '../../../../../Components/Inputs/InputGroup'
import themes from '../../../../../commons/themes'

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const SubTitle = styled.div`
  color: ${({ theme }) => theme.colorTextSecondary};
  font-size: ${themes.common.fontSizeSmall};
`

const MarginTop = styled.div`
  margin-top: 20px;
`

interface Props {
  loading?: boolean
  form: AdvancedSettingsForms
  onChange: (traversals: string) => void
  handleSave: () => void
}

export const Right = ({ handleSave, loading, onChange, form }: Props) => {
  const config = useAppSelector(selectors.configSelector)
  const defaultConfig = useAppSelector(selectors.defaultConfigSelector)

  const resetToDefaults = async () => {
    await calls.tryTo(() => tequila.setUserConfig(defaultConfig.data), { success: 'Settings reset' })
  }

  useEffect(() => {
    onChange(configs.natTraversals(config))
  }, [])

  const handleChange = (items: DNDListItem[]) => {
    onChange(items.map((i) => i.id).join(','))
  }

  return (
    <SettingsCard
      loading={loading}
      footer={
        <Controls>
          <Button variant="outlined" label="Restore default" onClick={resetToDefaults} />
          <Button variant="secondary" label="Save" onClick={handleSave} />
        </Controls>
      }
    >
      <InputGroup
        title="NAT Traversal Order"
        titleRight={<SubTitle>Drag items to reorder</SubTitle>}
        input={
          <>
            <MarginTop />
            <DNDList
              items={configs
                .natTraversals(config)
                .split(',')
                .map((v) => ({ id: v, label: v }))}
              onChange={handleChange}
            />
          </>
        }
      />
    </SettingsCard>
  )
}
