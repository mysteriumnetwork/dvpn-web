/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LocalVersion, RemoteVersion } from '../../../../api/ui-version-management'
import dates from '../../../../commons/dates'
import React from 'react'
import { Button } from '../../../../Components/Inputs/Button'
import styled from 'styled-components'

const { date2human } = dates

const Row = styled.div`
  padding: 35px;
  border-radius: 5px;
  background: #ffffff;

  width: 500px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`
const VersionBlock = styled.div`
  display: flex;
`
const ReleaseBlock = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  width: 200px;
`

const PreRelease = styled.div`
  color: red;
`
const Name = styled.div`
  margin-right: 15px;
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
  releaseNotes,
  onDownload,
  onSwitchVersion,
  isDownloadInProgress,
  isInUse,
  isLoading,
}: Props) => {
  const canSwitchTo = local && !isInUse
  return (
    <Row key={remote.name}>
      <div>
        <VersionBlock>
          <Name>{remote.name}</Name>
          {remote.name === bundledVersion && <PreRelease>(bundled)</PreRelease>}
          {remote.isPreRelease && <PreRelease>(pre-release)</PreRelease>}
        </VersionBlock>
        <ReleaseBlock>
          <div>({date2human(remote.releasedAt)})</div>
          {/*{releaseNotes && <Tooltip title={releaseNotes} />}*/}
        </ReleaseBlock>
      </div>
      <div>
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
          <Button
            loading={isLoading}
            onClick={onSwitchVersion}
            disabled={isDownloadInProgress}
            variant="blue"
            label="Switch"
          />
        )}
      </div>
    </Row>
  )
}
