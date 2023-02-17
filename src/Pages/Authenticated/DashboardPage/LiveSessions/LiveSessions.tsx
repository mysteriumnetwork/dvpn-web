/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Link } from 'react-router-dom'
import { ComponentType, useMemo } from 'react'
import { myst } from '../../../../commons/mysts'
import bytes from '../../../../commons/bytes'
import location from '../../../../commons/location'
import dates from '../../../../commons/dates'
import { useAppSelector } from '../../../../commons/hooks'
import { selectors } from '../../../../redux/selectors'
import styled from 'styled-components'
import { themeCommon } from '../../../../theme/themeCommon'
import { HISTORY } from '../../../../constants/routes'
import { Cells } from '../../../../Components/Table/cells'
import services from '../../../../commons/services'
import { useMediaQuery } from 'react-responsive'
import { media } from '../../../../commons/media'
import { LiveSessionCard } from './LiveSessionCard'
import { List } from '../../../../Components/List/List'
import { ReactComponent as Ongoing } from '../../../../assets/images/ongoing.svg'
import { Session } from 'mysterium-vpn-js'
import { ColumnDef, Row } from '@tanstack/react-table'
import { Table } from '../../../../Components/Table/Table'
const { Primary, Secondary, Default } = Cells
const { seconds2Time } = dates
const { countryName } = location
const { format, add } = bytes
const { isDesktopQuery } = media

interface Props {
  $show?: boolean
}
const Card = styled.div<Props>`
  display: ${({ $show }) => ($show ? 'flex' : 'none')};
  background: ${({ theme }) => theme.liveSessions.card.bg};
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  flex-direction: column;
  overflow-x: auto;
  overflow-y: hidden;
`
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 14px;
`
const Title = styled.div`
  font-size: ${themeCommon.fontSizeBig};
  font-weight: 700;
  font-style: normal;
  color: ${({ theme }) => theme.text.colorMain};
`
const SubTitle = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-size: ${themeCommon.fontSizeSmaller};
  color: ${({ theme }) => theme.text.colorSecondary};
`
const OngoingSession = styled.tr`
  background-color: ${({ theme }) => theme.table.bgRowOngoing};
  :hover {
    background-color: ${({ theme }) => theme.table.bgRowOngoingHover};
  }
  td:nth-child(1) {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  td:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`
const rowProvider = (row: Row<Session>): ComponentType<any> => OngoingSession

export const LiveSessions = () => {
  const liveSessions = useAppSelector(selectors.liveSessions)
  const isDesktop = useMediaQuery(isDesktopQuery)

  const showContent = liveSessions.length > 0

  const ColumnsV2 = useMemo<ColumnDef<Session>[]>(
    () => [
      {
        id: 'country',
        header: () => <Default $ml="15px">Country</Default>,
        cell: ({ row: { original } }) => <Primary $ml="20px">{countryName(original.consumerCountry)}</Primary>,
      },
      {
        id: 'Duration',
        maxSize: 75,
        header: () => <Default>Duration</Default>,
        cell: ({ row: { original } }) => <Secondary>{seconds2Time(original.duration)}</Secondary>,
      },
      {
        id: 'ongoing',
        maxSize: 75,
        cell: () => (
          <Secondary>
            <Ongoing />
          </Secondary>
        ),
      },
      {
        id: 'Services',
        header: () => <Default>Services</Default>,
        cell: ({ row: { original } }) => <Secondary>{services.name(original.serviceType)}</Secondary>,
      },
      {
        id: 'Earnings',
        header: () => <Default>Earnings</Default>,
        cell: ({ row: { original } }) => <Primary>{myst.display(original.tokens, { fractions: 3 })}</Primary>,
      },

      {
        id: 'Data transferred',
        header: () => <Default>Data transferred</Default>,
        cell: ({ row: { original } }) => <Primary>{format(add(original.bytesSent, original.bytesReceived))}</Primary>,
      },
      {
        id: 'Session ID',
        header: () => <Default>Session ID</Default>,
        cell: ({ row: { original } }) => <Secondary>{original.id}</Secondary>,
      },
    ],
    [],
  )

  return (
    <Card $show={showContent}>
      <Header>
        <Title>Ongoing Sessions</Title>
        <SubTitle to={HISTORY}>Session history</SubTitle>
      </Header>
      {isDesktop && <Table rowProvider={rowProvider} data={liveSessions} columns={ColumnsV2} />}
      {!isDesktop && <List items={liveSessions} mapper={(item) => <LiveSessionCard item={item} />} />}
    </Card>
  )
}
