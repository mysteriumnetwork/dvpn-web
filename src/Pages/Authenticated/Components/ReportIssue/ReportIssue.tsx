/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReportIssueModal } from './ReportIssueModal'
import { useState } from 'react'
import { BugButtonIcon } from '../../../../Components/Icons/ButtonIcons'
import { ExpandableControl } from '../../../../Components/Navigation/ExpandableControl'

interface Props {
  title: string
  expanded: boolean
}

export const ReportIssue = ({ title, expanded }: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  return (
    <>
      <ReportIssueModal show={showModal} onClose={() => setShowModal(false)} />
      <ExpandableControl
        title={title}
        expanded={expanded}
        icon={<BugButtonIcon />}
        onClick={() => setShowModal(true)}
      />
    </>
  )
}
