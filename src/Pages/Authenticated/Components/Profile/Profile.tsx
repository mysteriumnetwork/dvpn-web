/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled, { css } from 'styled-components'
import { useAppSelector } from '../../../../commons/hooks'
import remoteStorage from '../../../../commons/remoteStorage'
import { AVATAR_ICONS_DEFINITIONS, AvatarNames, KEY_PROFILE_ICON } from '../../../../commons/profiles'

const iconCSS = css`
  width: 36px;
  height: 36px;
`
const PROFILE_AVATAR_ICONS_DEFINITIONS = AVATAR_ICONS_DEFINITIONS.map((def) => ({
  ...def,
  icon: styled(def.icon)`
    ${iconCSS}
  `,
}))

const StyledProfile = styled.div``

export const Profile = () => {
  const activeIconKey = useAppSelector(remoteStorage.selector<AvatarNames>(KEY_PROFILE_ICON)) || 'gorilla'
  const Icon = PROFILE_AVATAR_ICONS_DEFINITIONS.find((def) => def.key === activeIconKey)!.icon
  return (
    <StyledProfile data-test-id="Profile.avatarIcon">
      <Icon />
    </StyledProfile>
  )
}
