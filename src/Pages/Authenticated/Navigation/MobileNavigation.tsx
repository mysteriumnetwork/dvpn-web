/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { IconButton } from '../../../Components/Inputs/IconButton'
import { ReactComponent as Burger } from '../../../assets/images/input/burger.svg'
import { Link } from 'react-router-dom'
import { ProgressBar } from '../../../Components/ProgressBar/ProgressBar'
import { Notifications } from '../Components/Notifications/Notifications'
import { Profile } from '../Components/Profile/Profile'
import { alphaToHex, themeCommon } from '../../../theme/themeCommon'
import { DASHBOARD } from '../../../constants/routes'
import { useMemo, useState } from 'react'
import { ReactComponent as LogoDark } from '../../../assets/images/navigation/logo_dark.svg'
import { ReactComponent as LogoLight } from '../../../assets/images/navigation/logo_light.svg'
import { configs } from '../../../commons/config'
import { useAppSelector } from '../../../commons/hooks'
import { myst } from '../../../commons/mysts'
import { selectors } from '../../../redux/selectors'
import { MobileMenu } from './MobileMenu'
import zIndexes from '../../../constants/z-indexes'
import remoteStorage from '../../../commons/remoteStorage'
import { UI_THEME_KEY } from '../../../constants/remote-storage.keys'

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  position: fixed;
  height: 100px;
  top: 0;
  z-index: ${zIndexes.mobileNavigation};
  padding: 0 10px 0 10px;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.navigation.bg};
`
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const LogoLink = styled(Link)`
  margin-top: -30px;
  margin-right: 20px;
`
const InputGroupLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 25px;
`
const InputGroupRight = styled.div`
  margin-bottom: 25px;
`
const Progress = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  min-width: 300px;
  padding: 25px;
  position: absolute;
  top: 65px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.bgSettlementMobile};
  box-shadow: 0 5px 20px ${themeCommon.yankeeBlue + alphaToHex(0.15)};
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
`

const ProgressBarContainer = styled.div`
  width: 35%;
  margin-top: 5px;
`
const Info = styled.div`
  color: ${({ theme }) => theme.common.fontSizeSmall};
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  color: ${({ theme }) => theme.common.colorGrayBlue};
`
export const MobileNavigation = () => {
  const { earningsTokens } = useAppSelector(selectors.currentIdentity)
  const config = useAppSelector(selectors.currentConfig)
  const theme = useAppSelector(remoteStorage.selector(UI_THEME_KEY))
  const value = useMemo(() => Number(myst.toEtherBig(earningsTokens.wei).toFixed(2)), [earningsTokens.wei])
  const thresholdMyst = configs.zeroStakeSettlementThreshold(config)
  const [showMenu, setShowMenu] = useState(false)

  const isDark = theme === 'dark'

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }
  return (
    <Content>
      <MobileMenu show={showMenu} toggleMenu={toggleMenu} isDark={isDark} />
      <InputGroupLeft>
        <IconButton icon={<Burger />} onClick={toggleMenu} />
        <Profile />
      </InputGroupLeft>
      <LogoLink to={DASHBOARD}>
        <LogoContainer>{isDark ? <LogoDark /> : <LogoLight />}</LogoContainer>
      </LogoLink>
      <InputGroupRight>
        <Notifications />
      </InputGroupRight>
      <Progress>
        <Info>Next auto settlement ({myst.display(myst.toWeiBig(thresholdMyst), { fractions: 1 })})</Info>
        <ProgressBarContainer>
          <ProgressBar max={thresholdMyst} value={value} size="small" />
        </ProgressBarContainer>
      </Progress>
    </Content>
  )
}
