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
import { SettlementListResponse } from 'mysterium-vpn-js'
import { toCsv } from './csv.mapper'
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 26px;
`

const Title = styled.div`
  max-width: 8em;
  color: ${({ theme }) => theme.text.colorSecondary};
`
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

interface Props {
  data: SettlementListResponse
  isDesktop: boolean
}
interface State {
  isLoading: boolean
  downloadLink: string
}
export const DownloadTransactionCSV = ({ data, isDesktop }: Props) => {
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
    <Card>
      <Row>
        {isDesktop && (
          <IconContainer>
            <FileIcon />
          </IconContainer>
        )}
        <Title>Record of transactions</Title>
        <Button
          variant="blue"
          label="Download CSV"
          rounded
          size={isDesktop ? 'medium' : 'small'}
          onClick={() => {
            handleDownload(data)
          }}
        />
      </Row>
    </Card>
  )
}
