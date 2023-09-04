/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SettingsCard } from '../../SettingsCard'
import { useMemo } from 'react'
import styled, { css } from 'styled-components'
import remoteStorage from '../../../../../commons/remoteStorage'
import { AVATAR_ICONS_DEFINITIONS, AvatarNames, KEY_PROFILE_ICON } from '../../../../../commons/profiles'
import { useAppSelector } from '../../../../../commons/hooks'
import { ReactComponent as CheckSVG } from '../../../../../assets/images/check.svg'

const iconCSS = css`
  width: 100px;
  height: 100px;

  :hover {
    border: 2px solid ${({ theme }) => theme.common.colorKey};
    border-radius: 100%;
    padding: 3px;
    cursor: pointer;
  }
`

const AvatarGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 30px;
`

const Container = styled.div`
  position: relative;
`
const Active = styled(CheckSVG)`
  position: absolute;
  width: 20px;
  height: 20px;

  top: -15px;
  right: -15px;
`

const AVATAR_CLICKABLE_ICON_DEFINITIONS = AVATAR_ICONS_DEFINITIONS.map((def) => ({
  ...def,
  icon: styled(def.icon)`
    ${iconCSS}
  `,
}))

export const AvatarChoice = () => {
  const activeIconKey = useAppSelector(remoteStorage.selector<AvatarNames>(KEY_PROFILE_ICON)) || 'gorilla'
  const handleSelect = (key: string) => remoteStorage.put(KEY_PROFILE_ICON, key)

  const icons = useMemo(
    () =>
      AVATAR_CLICKABLE_ICON_DEFINITIONS.map(({ key, icon: Icon }) => (
        <Container key={key} onClick={() => key !== activeIconKey && handleSelect(key)}>
          <Icon />
          {key === activeIconKey && <Active />}
        </Container>
      )),
    [activeIconKey],
  )
  return (
    <SettingsCard title="Select Avatar">
      <AvatarGrid>{icons}</AvatarGrid>
    </SettingsCard>
  )
}
