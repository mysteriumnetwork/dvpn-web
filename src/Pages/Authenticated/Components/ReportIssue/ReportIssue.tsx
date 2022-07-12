/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReportIssueModal } from './ReportIssueModal'
import React, { useState } from 'react'
import { BugButtonIcon } from '../../../../Components/Icons/ButtonIcons'
import { IconButton } from '../../../../Components/Inputs/IconButton'

export const ReportIssue = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  return (
    <>
      <IconButton onClick={() => setShowModal(true)} icon={<BugButtonIcon />} />
      <ReportIssueModal show={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
