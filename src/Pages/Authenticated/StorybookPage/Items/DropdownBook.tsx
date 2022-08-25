/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CenteredRow } from '../Components'
import { Select } from '../../../../Components/Inputs/Select'
import { Option } from '../../../../types/common'
import { useState } from 'react'

const OPTIONS: Option[] = [
  { label: 'one', value: 'one' },
  { label: 'two', value: 'two' },
  { label: 'three', value: 'three' },
  { label: 'four', value: 'four' },
]

const DropdownBook = () => {
  const [option, setOption] = useState(OPTIONS[0])
  return (
    <CenteredRow style={{ height: '80%' }}>
      <Select options={OPTIONS} value={option} onChange={setOption} />
      <Select options={[]} />
    </CenteredRow>
  )
}

export default DropdownBook
