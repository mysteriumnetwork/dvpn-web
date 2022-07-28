/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactComponent as BellSvg } from '../../../../assets/images/bell.svg'
import { IconButton } from '../../../../Components/Inputs/IconButton'
import styled from 'styled-components'
import { useState } from 'react'
import { List } from './List'
import { devices } from '../../../../theme/themes'

const BellIcon = styled(BellSvg)`
  width: 80%;
  height: 80%;

  :active {
    width: 70%;
    height: 70%;
  }
`

const Container = styled.div`
  position: relative;
  @media ${devices.tablet} {
    margin-bottom: 20px;
  }
`

const Dot = styled.div`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 100px;
  border: ${({ theme }) => theme.notifications.border};
  background: ${({ theme }) => theme.notifications.background};

  right: 10%;
  top: 0;
  z-index: 1;
`

const ListContainer = styled.div`
  position: absolute;
  width: 280px;
  z-index: 10;

  top: 48px;
  left: -260px;
`

export const Notifications = () => {
  const [open, setOpen] = useState(false)

  return (
    <Container>
      <Dot />
      <IconButton icon={<BellIcon />} onClick={() => setOpen((p) => !p)} />
      {open && (
        <ListContainer>
          <List />
        </ListContainer>
      )}
    </Container>
  )
}
