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
import { AdvancedSettingsForms } from './AdvancedSettings'
import { InputGroup } from '../../../../../Components/Inputs/InputGroup'
import { themeCommon } from '../../../../../theme/themeCommon'

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const SubTitle = styled.div`
  color: ${({ theme }) => theme.text.colorSecondary};
  font-size: ${themeCommon.fontSizeSmall};
`

const MarginTop = styled.div`
  margin-top: 20px;
`

interface Props {
  loading?: boolean
  form: AdvancedSettingsForms
  onChange: (traversals: string) => void
  handleSave: () => void
  handleReset: () => void
}

export const NATTraversalOrder = ({ handleSave, loading, onChange, form, handleReset }: Props) => {
  const handleChange = (items: DNDListItem[]) => {
    onChange(items.map((i) => i.id).join(','))
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
    >
      <InputGroup
        title="NAT Traversal Order"
        subTitle={<SubTitle>Drag items to reorder</SubTitle>}
        input={
          <>
            <MarginTop />
            {!loading && form.traversals && (
              <DNDList items={form.traversals.split(',').map((v) => ({ id: v, label: v }))} onChange={handleChange} />
            )}
          </>
        }
      />
    </SettingsCard>
  )
}