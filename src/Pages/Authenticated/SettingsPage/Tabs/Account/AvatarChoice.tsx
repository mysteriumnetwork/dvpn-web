/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SettingsCard } from '../../SettingsCard'
import {
  AvatarBobCatIcon,
  AvatarCatIcon,
  AvatarDogIcon,
  AvatarFoxIcon,
  AvatarGorillaIcon,
  AvatarKoalaIcon,
  AvatarLionIcon,
  AvatarRabbitIcon,
} from '../../../../../Components/Icons/AvatarIcons'
import { useMemo } from 'react'
import styled from 'styled-components'

const AVATAR_ICONS = [
  <AvatarBobCatIcon key="a1" />,
  <AvatarCatIcon key="a2" />,
  <AvatarDogIcon key="a3" />,
  <AvatarFoxIcon key="a4" />,
  <AvatarGorillaIcon key="a5" />,
  <AvatarKoalaIcon key="a6" />,
  <AvatarLionIcon key="a7" />,
  <AvatarRabbitIcon key="a8" />,
]

const AvatarGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 30px;
`

export const AvatarChoice = () => {
  const icons = useMemo(() => AVATAR_ICONS.map((icon) => icon), [])
  return (
    <SettingsCard title="Select Avatar">
      <AvatarGrid>{icons}</AvatarGrid>
    </SettingsCard>
  )
}
