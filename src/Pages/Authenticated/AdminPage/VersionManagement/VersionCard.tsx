/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LocalVersion, RemoteVersion } from '../../../../api/ui-version-management'
import dates from '../../../../commons/dates'
import { Button } from '../../../../Components/Inputs/Button'
import styled from 'styled-components'
import { themeCommon } from '../../../../theme/themeCommon'

const { date2human } = dates

const Card = styled.div`
  padding: 20px;
  border-radius: 20px;
  background: ${({ theme }) => theme.bgSettingsCard};
  gap: 40px;
  width: 350px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Row = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80%;
`
const Status = styled.div`
  color: ${themeCommon.colorKey};
  font-size: ${({ theme }) => theme.common.fontSizeNormal};
  font-weight: 700;
`
const Name = styled.div`
  color: ${({ theme }) => theme.text.colorMain};
  font-weight: 600;
`
const Date = styled.div`
  color: ${({ theme }) => theme.text.colorSecondary};
  font-size: ${({ theme }) => theme.common.fontSizeNormal};
`
interface Props {
  remote: RemoteVersion
  local?: LocalVersion
  bundledVersion: string
  releaseNotes?: JSX.Element
  onDownload?: () => void
  onSwitchVersion: () => void
  isDownloadInProgress: boolean
  isInUse: boolean
  isLoading?: boolean
}

export const VersionCard = ({
  remote,
  local,
  bundledVersion,
  onDownload,
  onSwitchVersion,
  isDownloadInProgress,
  isInUse,
  isLoading,
}: Props) => {
  const canSwitchTo = local && !isInUse
  return (
    <Card key={remote.name}>
      <Column>
        <Row>
          <Name>{remote.name}</Name>
          <Status>{remote.name === bundledVersion ? 'bundled' : 'pre-release'}</Status>
        </Row>
        <Row>
          <Date>{date2human(remote.releasedAt)}</Date>
        </Row>
      </Column>
      {!local && (
        <Button
          loading={isLoading}
          onClick={onDownload}
          disabled={isDownloadInProgress}
          variant="outlined"
          label="Download"
        />
      )}
      {canSwitchTo && (
        <Button loading={isLoading} onClick={onSwitchVersion} disabled={isDownloadInProgress} label="Switch" />
      )}
    </Card>
  )
}
