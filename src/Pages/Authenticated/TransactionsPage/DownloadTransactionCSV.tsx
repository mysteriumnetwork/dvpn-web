/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Card } from './Card'
import { useState } from 'react'
import styled from 'styled-components'
import { FileIcon } from '../../../Components/Icons/Icons'
import { Button } from '../../../Components/Inputs/Button'
import { SettlementListResponse, Settlement } from 'mysterium-vpn-js'
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 26px;
`

const Title = styled.div`
  max-width: 8em;
  color: ${({ theme }) => theme.text.colorSecondary};
`
const newLine = '\n'

const aliases: { [key: string]: string } = {
  beneficiary: 'externalWalletAddress',
}

const alias = (original: string): string => {
  const a = aliases[original]
  if (a) {
    return a
  }
  return original
}

const toCsv = (response: SettlementListResponse): string => {
  const { items } = response
  if (items.length === 0) {
    return 'No settlement history'
  }

  const columns = Object.keys(items[0]) as [keyof Settlement]

  let csv = `"${columns.map(alias).join(',')}"${newLine}`
  items.forEach((item) => {
    const values = columns.map((column) => `"${item[column]}"`).join(',')
    csv += `${values}${newLine}`
  })
  return csv
}
interface Props {
  data: SettlementListResponse
}
interface State {
  isLoading: boolean
  downloadLink: string
}
export const DownloadTransactionCSV = ({ data }: Props) => {
  const [state, setState] = useState<State>({
    isLoading: true,
    downloadLink: '',
  })
  const setIsLoading = (b: boolean = true) => setState((d) => ({ ...d, isLoading: b }))

  const handleDownload = (data: SettlementListResponse) => {
    setIsLoading()

    if (!data) {
      throw new Error('Unable to Download CSV: fetch data response is empty')
    }

    const csv = toCsv(data)
    const generatedData = new Blob([csv], { type: 'application/csv' })
    if (state.downloadLink === '') {
      window.URL.revokeObjectURL(state.downloadLink)
    }
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(generatedData)
    link.setAttribute('download', `settlement_history_${new Date().getTime()}.csv`)
    document.body.append(link)
    link.click()
    link.parentNode?.removeChild(link)
    setIsLoading(false)
  }

  return (
    <Card grow={0} fluid={false}>
      <Row>
        <FileIcon />
        <Title>Record of transactions</Title>
        <Button
          variant="blue"
          label="Download CSV"
          rounded
          onClick={() => {
            handleDownload(data)
          }}
        />
      </Row>
    </Card>
  )
}
