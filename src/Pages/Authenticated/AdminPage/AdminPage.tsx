/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import { Layout } from '../Components/Layout/Layout'
import { FeatureToggle } from './FeatureToggle/FeatureToggle'
import { VersionManagement } from './VersionManagement/VersionManagement'
import { ErrorLog } from './ErrorLog/ErrorLog'
import styled from 'styled-components'

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 15px;
`

const Column = styled.div`
  border: solid 1px ${({ theme }) => theme.common.colorGrayBlue2};
`

export const AdminPage = () => {
  return (
    <Layout title="Admin" loading={false}>
      <Row>
        <Column>
          <VersionManagement />
        </Column>
        <Column>
          <FeatureToggle />
        </Column>
        <Column>
          <ErrorLog />
        </Column>
      </Row>
    </Layout>
  )
}
