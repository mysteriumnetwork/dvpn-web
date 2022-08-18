/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect, useMemo, useState } from 'react'
import { Layout, LayoutUnstyledRow } from '../Components/Layout/Layout'
import { HistoryHeaderIcon } from '../../../Components/Icons/PageIcons'
import { Column } from 'react-table'
import { Table } from '../../../Components/Table/Table'
import { cells } from '../../../Components/Table/cells'
import { Pagination } from '../../../Components/Pagination/Pagination'
import { tequila } from '../../../api/tequila'
import dates from '../../../commons/dates'
import { useFetch } from '../../../commons/hooks'
import location from '../../../commons/location'
import { myst } from '../../../commons/mysts'
import bytes from '../../../commons/bytes'
import { Option } from '../../../types/common'
import { media } from '../../../commons/media'
import { useMediaQuery } from 'react-responsive'
import { SessionV2 } from 'mysterium-vpn-js'
import services from '../../../commons/services'
import { RangePicker } from '../../../Components/Inputs/RangePicker'
import { ReactComponent as Clock } from '../../../assets/images/sessions.svg'
import styled from 'styled-components'
import { devices } from '../../../theme/themes'

const { api } = tequila
const { date2human, seconds2Time } = dates
const { countryName } = location
const { format } = bytes
const { isDesktopQuery } = media
const { PrimaryCell, SecondaryCell, MobileCell, CellHeader, CellData, CardHeaderPrimary, CardHeaderSecondary } = cells

const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  width: 100%;
  background-color: ${({ theme }) => theme.table.bgBody};
  border-radius: 30px;
  @media ${devices.tablet} {
    height: 40vh;
  }
`
const PlaceholderIcon = styled(Clock)`
  width: 350px;
  @media ${devices.tablet} {
    width: 300px;
  }
`
const PlaceholderText = styled.div`
  color: ${({ theme }) => theme.common.colorGrayBlue};
  font-size: ${({ theme }) => theme.common.fontSizeBig};
  font-weight: 700;
  margin-top: 20px;
`
const session2human = (session: string) => {
  return session.split('-')[0]
}

const PAGE_SIZE = 10
const RANGE_OPTIONS = ['1d', '7d', '30d'].map<Option>((r) => ({ value: r, label: r }))

export const HistoryPage = () => {
  const isDesktop = useMediaQuery(isDesktopQuery)

  const [range, setRange] = useState<Option>(RANGE_OPTIONS[RANGE_OPTIONS.length - 1])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sessions, setSessions] = useState<SessionV2[]>([])

  const [data = { sessions: [] }, loading] = useFetch(() => api.provider.sessions({ range: range.value }), [
    range.value,
  ])

  useEffect(() => {
    if (data.sessions.length < 1 || loading) {
      return
    }
    setTotalPages(Math.ceil(data.sessions.length / PAGE_SIZE))
    setSessions(data.sessions.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page))
  }, [data.sessions.length, page, loading])
  const noData = data.sessions.length === 0 && !loading

  const DesktopColumns: Column<SessionV2>[] = useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'consumerCountry',
        Cell: (c) => <PrimaryCell>{countryName(c.value)}</PrimaryCell>,
        maxWidth: 100,
      },
      {
        Header: 'Duration',
        accessor: 'durationSeconds',
        Cell: (c) => <SecondaryCell>{seconds2Time(c.value)}</SecondaryCell>,
      },
      {
        Header: 'Started',
        accessor: 'startedAt',
        Cell: (c) => <SecondaryCell>{date2human(c.value)}</SecondaryCell>,
      },
      {
        Header: 'Services',
        accessor: 'serviceType',
        Cell: (c) => <SecondaryCell>{services.name(c.value)}</SecondaryCell>,
      },
      {
        Header: 'Earnings',
        accessor: 'earnings',
        Cell: (c) => <PrimaryCell>{myst.display(c.value.wei, { fractionDigits: 3 })}</PrimaryCell>,
      },
      {
        Header: 'Transferred',
        accessor: 'transferredBytes',
        Cell: (c) => <PrimaryCell>{format(c.value)}</PrimaryCell>,
      },
      {
        Header: 'Session ID',
        accessor: 'id',
        Cell: (c) => <SecondaryCell>{session2human(c.value)}</SecondaryCell>,
      },
    ],
    [],
  )
  const MobileColumns: Column<SessionV2>[] = useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'consumerCountry',
        Cell: (c) => (
          <MobileCell>
            <CardHeaderPrimary>{countryName(c.value)}</CardHeaderPrimary>
          </MobileCell>
        ),
      },
      {
        Header: 'Session ID',
        accessor: 'id',
        Cell: (c) => (
          <MobileCell>
            <CardHeaderSecondary>{session2human(c.value)}</CardHeaderSecondary>
          </MobileCell>
        ),
      },
      {
        Header: 'Started',
        accessor: 'startedAt',
        Cell: (c) => (
          <MobileCell>
            <CellHeader>Started</CellHeader>
            <CellData>{date2human(c.value)}</CellData>
          </MobileCell>
        ),
      },
      {
        Header: 'Duration',
        accessor: 'durationSeconds',
        Cell: (c) => (
          <MobileCell>
            <CellHeader>Duration</CellHeader>
            <CellData>{seconds2Time(c.value)}</CellData>
          </MobileCell>
        ),
      },
      {
        Header: 'Earnings',
        accessor: 'earnings',
        Cell: (c) => (
          <MobileCell>
            <CellHeader>Earnings</CellHeader>
            <CellData>{myst.display(c.value.wei, { fractionDigits: 3 })}</CellData>
          </MobileCell>
        ),
      },
      {
        Header: 'Transferred',
        accessor: 'transferredBytes',
        Cell: (c) => (
          <MobileCell>
            <CellHeader>Transferred</CellHeader>
            <CellData>{format(c.value)}</CellData>
          </MobileCell>
        ),
      },
    ],
    [],
  )
  return (
    <Layout logo={<HistoryHeaderIcon />} title="History">
      <LayoutUnstyledRow>
        <RangePicker options={RANGE_OPTIONS} value={range} onChange={(option: Option) => setRange(option)} />
      </LayoutUnstyledRow>
      <LayoutUnstyledRow>
        {noData ? (
          <Placeholder>
            <PlaceholderIcon />
            <PlaceholderText>No session history</PlaceholderText>
          </Placeholder>
        ) : (
          <Table
            columns={isDesktop ? DesktopColumns : MobileColumns}
            data={sessions}
            isLoading={loading}
            isDesktop={isDesktop}
          />
        )}
      </LayoutUnstyledRow>
      <LayoutUnstyledRow>
        <Pagination currentPage={page} totalPages={totalPages} handlePageChange={(page: number) => setPage(page)} />
      </LayoutUnstyledRow>
    </Layout>
  )
}
