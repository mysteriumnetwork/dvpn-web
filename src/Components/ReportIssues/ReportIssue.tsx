/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react'
import { IconButton } from '@material-ui/core'
import BugReportOutlinedIcon from '@material-ui/icons/BugReportOutlined'

import ReportIssueModal from './ReportIssueModal'

const ReportIssue = () => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const onClose = () => {
    setShowModal(false)
  }

  return (
    <div>
      <IconButton onClick={() => setShowModal(true)}>
        <BugReportOutlinedIcon style={{ color: '#FFF' }} />
      </IconButton>
      <ReportIssueModal onClose={onClose} open={showModal} />
    </div>
  )
}

export default ReportIssue
