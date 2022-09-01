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
import { ReactComponent as Triangle } from '../../../../assets/images/triangle-down.svg'
import { useState } from 'react'

const { date2human } = dates
interface AccordionProps {
  $show: boolean
}
const Card = styled.div`
  padding: 20px;
  border-radius: 20px;
  background: ${({ theme }) => theme.adminPanel.bgCard};
  gap: 10px;
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const Arrow = styled(Triangle)<AccordionProps>`
  transform: ${({ $show }) => $show && 'rotate(180deg)'};
`
const Row = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
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
const AccordionSwitch = styled.div`
  display: flex;
  color: ${({ theme }) => theme.text.colorSecondary};
  align-items: center;
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  gap: 10px;
  cursor: pointer;
`
const Accordion = styled.div<AccordionProps>`
  display: ${({ $show }) => ($show ? 'flex' : 'none')};
`
interface Props {
  remote: RemoteVersion
  local?: LocalVersion
  bundledVersion: string
  releaseNotes?: JSX.Element
  onDownload?: () => void
  onSwitchVersion: () => void
  downloadInProgress: boolean
  inUse: boolean
  preRelease?: boolean
  loading?: boolean
}

export const VersionCard = ({
  remote,
  local,
  bundledVersion,
  onDownload,
  onSwitchVersion,
  downloadInProgress,
  releaseNotes,
  inUse,
  preRelease,
  loading,
}: Props) => {
  const canSwitchTo = local && !inUse
  const isBundled = remote.name === bundledVersion
  const canDownload = !local && !isBundled
  const [showNotes, setShowNotes] = useState(false)
  const handleAccordion = () => setShowNotes(!showNotes)
  return (
    <Card key={remote.name}>
      <Row>
        <div>
          <Name>{remote.name}</Name>
          <Status>
            {isBundled && 'bundled'}
            {preRelease && 'pre-release'}
          </Status>
        </div>

        {canDownload && (
          <Button
            loading={loading}
            onClick={onDownload}
            disabled={downloadInProgress}
            variant="outlined"
            label="Download"
          />
        )}
        {canSwitchTo && (
          <Button loading={loading} onClick={onSwitchVersion} disabled={downloadInProgress} label="Switch" />
        )}
      </Row>
      <Date>{date2human(remote.releasedAt)}</Date>
      <AccordionSwitch onClick={handleAccordion}>
        Show release notes
        <Arrow $show={showNotes} />
      </AccordionSwitch>
      <Accordion $show={showNotes}>{releaseNotes ? releaseNotes : 'No notes for this release'}</Accordion>
    </Card>
  )
}
