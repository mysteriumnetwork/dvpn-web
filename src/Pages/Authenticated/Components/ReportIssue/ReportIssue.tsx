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
import { useIntercom } from '../../../../intercom/intercom'

interface Props {
  title: string
  expanded: boolean
}

export const ReportIssue = ({ title, expanded }: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const { hide, open } = useIntercom()

  const handleOpenModal = () => {
    if (open) {
      hide()
    }
    setShowModal((value) => !value)
  }

  return (
    <>
      <ReportIssueModal show={showModal} onClose={() => setShowModal(false)} />
      <ExpandableControl
        title={title}
        expanded={expanded}
        icon={<BugButtonIcon />}
        onClick={handleOpenModal}
        ignoreOverlay
      />
    </>
  )
}
