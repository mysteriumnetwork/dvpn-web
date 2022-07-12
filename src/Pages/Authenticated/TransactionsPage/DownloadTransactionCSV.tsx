/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Card } from './Card'
import styled from 'styled-components'
import { FileIcon } from '../../../Components/Icons/Icons'
import { Button } from '../../../Components/Inputs/Button'

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 26px;
`

const Title = styled.div`
  max-width: 8em;
  color: ${({ theme }) => theme.colorTextSecondary};
`

export const DownloadTransactionCSV = () => {
  return (
    <Card>
      <Row>
        <FileIcon />
        <Title>Record of transactions</Title>
        <Button variant="blue" label="Download CSV" rounded />
      </Row>
    </Card>
  )
}
