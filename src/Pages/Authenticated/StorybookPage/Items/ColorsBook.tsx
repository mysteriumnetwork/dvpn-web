/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CenteredColumn } from '../Components'
import { themeCommon } from '../../../../theme/themeCommon'
import styled from 'styled-components'

const NoGapCenteredColumn = styled(CenteredColumn)`
  gap: 0;
`

const COLORS = [
  themeCommon.yankeeBlue,
  themeCommon.color2F2A48,
  themeCommon.color393453,
  themeCommon.color3B3755,
  themeCommon.colorNavActiveStroke,
  themeCommon.color444161,
]

const Stripe = ({ color }: { color: string }) => (
  <div
    style={{
      backgroundColor: color,
      width: '100%',
      height: '100px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
    }}
  >
    {color}
  </div>
)

const ColorsBOok = () => {
  return (
    <NoGapCenteredColumn>
      {COLORS.map((cc) => (
        <Stripe key={cc} color={cc} />
      ))}
    </NoGapCenteredColumn>
  )
}

export default ColorsBOok
