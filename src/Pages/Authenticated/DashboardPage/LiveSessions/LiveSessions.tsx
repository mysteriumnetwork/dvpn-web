/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Table } from '../../../../Components/Table/Table'
import { Column } from 'react-table'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { myst } from '../../../../commons/mysts'
import bytes from '../../../../commons/bytes'
import location from '../../../../commons/location'
import dates from '../../../../commons/dates'
import { useAppSelector } from '../../../../commons/hooks'
import { selectors } from '../../../../redux/selectors'
import styled from 'styled-components'
import { themeCommon } from '../../../../theme/themeCommon'
import { HISTORY } from '../../../../constants/routes'
import { cells } from '../../../../Components/Table/cells'
import services from '../../../../commons/services'
import { useMediaQuery } from 'react-responsive'
import { media } from '../../../../commons/media'
import { LiveSessionCard } from './LiveSessionCard'
import { List } from '../../../../Components/List/List'

const { PrimaryCell, SecondaryCell } = cells
const { seconds2Time } = dates
const { countryName } = location
const { format, add } = bytes
const { isDesktopQuery } = media
// TODO Rethink how to show full session/have full session copyable
const session2human = (session: string) => {
  return session.split('-')[0]
}
interface Props {
  $show?: boolean
}
const Card = styled.div<Props>`
  display: ${({ $show }) => ($show ? 'flex' : 'none')};
  background: ${({ theme }) => theme.bgLayoutCardCss};
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

export const LiveSessions = () => {
  const liveSessions = useAppSelector(selectors.liveSessions)
  const isDesktop = useMediaQuery(isDesktopQuery)

  const showContent = liveSessions.length > 0
  const Columns: Column<any>[] = useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'consumerCountry',
        Cell: (c) => <PrimaryCell>{countryName(c.value)}</PrimaryCell>,
      },
      { Header: 'Duration', accessor: 'duration', Cell: (c) => <SecondaryCell>{seconds2Time(c.value)}</SecondaryCell> },
      {
        Header: 'Services',
        accessor: 'serviceType',
        Cell: (c) => <SecondaryCell>{services.name(c.value)}</SecondaryCell>,
      },
      {
        Header: 'Earnings',
        accessor: 'tokens',
        Cell: (c) => <PrimaryCell>{myst.display(c.value, { fractionDigits: 3 })}</PrimaryCell>,
      },

      {
        Header: 'Data transferred',
        accessor: (row): any => add(row.bytesSent, row.bytesReceived),
        Cell: (c) => <PrimaryCell>{format(c.value)}</PrimaryCell>,
      },
      { Header: 'Session ID', accessor: 'id', Cell: (c) => <SecondaryCell>{session2human(c.value)}</SecondaryCell> },
    ],

    [],
  )

  return (
    <Card $show={showContent}>
      <Header>
        <Title>Ongoing Sessions</Title>
        <SubTitle to={HISTORY}>Session history</SubTitle>
      </Header>
      {isDesktop && <Table columns={Columns} data={liveSessions} />}
      {!isDesktop && <List items={liveSessions} mapper={(item) => <LiveSessionCard item={item} />} />}
    </Card>
  )
}
