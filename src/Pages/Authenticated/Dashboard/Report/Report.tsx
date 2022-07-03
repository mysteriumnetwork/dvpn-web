/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useFetch } from '../../../../commons/hooks'
import { tequila } from '../../../../api/tequila'
import Charts from '../Charts/Charts'
import { SessionStats } from 'mysterium-vpn-js/lib/session/session'
import { useMemo } from 'react'
import { ReportCard } from '../Stats/ReportCard'
import { ReactComponent as WalletIcon } from '../../../../assets/images/authenticated/components/wallet.svg'
import styled from 'styled-components'
import themes from '../../../../commons/themes'
const { api } = tequila

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
`

const BorderRight = styled.div`
  border-right: 1px dashed ${themes.current().colorGrayBlue2}80;
`

export const Report = () => {
  const [data = []] = useFetch(() => Promise.all([api.sessionStatsDaily()]))

  const [{ items: statsDaily } = { items: {} }] = data

  const sd: { [k: string]: SessionStats } = useMemo(() => {
    const day = 1000 * 60 * 60 * 24

    const period = 60

    const res: { [k: string]: SessionStats } = {}
    for (let i = 0; i < period; i++) {
      const d = new Date(Date.now() - day * (period / 2) + day * (i + 1)).toISOString().split('T')[0]
      res[d] = {
        count: Math.floor(Math.random() * 20),
        countConsumers: Math.floor(Math.random() * 30),
        sumBytesReceived: Math.floor(Math.random() * 100) * 1000,
        sumBytesSent: Math.floor(Math.random() * 100) * 500000,
        sumDuration: Math.floor(Math.random() * 100) * 10,
        sumTokens: Math.floor(Math.random() * 100) * 10000000000000000,
      }
    }

    return res
  }, [])

  return (
    <>
      <Charts statsDaily={sd} />
      <CardRow>
        <ReportCard icon={<WalletIcon />} value="35.34" title="Total seattled earnings" diff={0.56} />
        <BorderRight />
        <ReportCard icon={<WalletIcon />} value="35.34" title="Total seattled earnings" diff={0.56} />
        <BorderRight />
        <ReportCard icon={<WalletIcon />} value="35.34" title="Total seattled earnings" diff={0.56} />
        <BorderRight />
        <ReportCard icon={<WalletIcon />} value="-35.34" title="Total seattled earnings" diff={-0.56} />
      </CardRow>
    </>
  )
}
