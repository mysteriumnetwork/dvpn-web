/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReportIssueModal } from './ReportIssueModal'
import styled from 'styled-components'
import React, { useState } from 'react'
import { BugButtonIcon } from '../../../../Components/Icons/ButtonIcons'
import { IconButton } from '../../../../Components/Inputs/IconButton'
import { Media } from '../../../../commons/media'

const MobileLink = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${({ theme }) => theme.common.colorWhite};
  font-size: ${({ theme }) => theme.common.fontSizeBig};
  gap: 40px;
  margin-bottom: 30px;
`
export const ReportIssue = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  return (
    <>
      <Media.Desktop>
        <IconButton onClick={() => setShowModal(true)} icon={<BugButtonIcon />} />
        <ReportIssueModal show={showModal} onClose={() => setShowModal(false)} />
      </Media.Desktop>
      <Media.Mobile>
        <MobileLink onClick={() => setShowModal(true)}>
          <IconButton icon={<BugButtonIcon />} />
          Report Issue
        </MobileLink>
        <ReportIssueModal show={showModal} onClose={() => setShowModal(false)} />
      </Media.Mobile>
    </>
  )
}
