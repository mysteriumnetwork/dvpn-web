/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Table, PrimaryCell, SecondaryCell } from '../../../../Components/Table/Table'
import { Column } from 'react-table'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { myst } from '../../../../commons/mysts'
import bytes from '../../../../commons/bytes'
import countries from '../../../../commons/countries'
import dates from '../../../../commons/dates'
import { useAppSelector } from '../../../../commons/hooks'
import { selectors } from '../../../../redux/selectors'
import styled from 'styled-components'
import { themeCommon } from '../../../../theme/themeCommon'
import { HISTORY } from '../../../../constants/routes'
import _ from 'lodash'

const { seconds2Time } = dates
const { countryName } = countries
const { format, add } = bytes
// TODO: Move these to commons
const session2human = (session: string) => {
  return session.split('-')[0]
}
const service2human = (service: string) => {
  switch (service) {
    case 'wireguard':
      return 'Public'
  }
}
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
`
// TODO: Make overflow hidden if livesession is empty
// TODO: Mobile view for component :)
const Container = styled.div`
  display: flex;
  max-height: 150px;
  overflow-y: scroll;
  overflow-x: hidden;
  justify-content: center;
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
  const liveSessions = useAppSelector(selectors.liveSessionsSelector)
  const Columns: Column<any>[] = useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'consumerCountry',
        Cell: (c) => <PrimaryCell>{countryName(c.value)}</PrimaryCell>,
        maxWidth: 100,
      },
      { Header: 'Duration', accessor: 'duration', Cell: (c) => <SecondaryCell>{seconds2Time(c.value)}</SecondaryCell> },
      {
        Header: 'Services',
        accessor: 'serviceType',
        Cell: (c) => <SecondaryCell>{service2human(c.value)}</SecondaryCell>,
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
    <div>
      <Header>
        <Title>Current Sessions</Title>
        <SubTitle to={HISTORY}>Session history</SubTitle>
      </Header>
      <Container>
        {!_.isEmpty(liveSessions) ? (
          <Table columns={Columns} data={liveSessions} />
        ) : (
          <Title>No ongoing sessions</Title>
        )}
      </Container>
    </div>
  )
}
