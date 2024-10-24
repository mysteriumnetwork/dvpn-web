/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PropsWithChildren, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { PageLayout } from '../../components/Layout/PageLayout'
import { ReportIssueModal } from '../../components/Modals/ReportIssueModal'
import Title from '../../../components/Typography/Title'
import Label from '../../../components/Typography/Label'
import Card from '../../../components/Cards/Card'
import Button from '../../../components/Buttons/Button'
import { DOCS } from '../../../constants/urls'
import { useIntercom } from '../../../intercom/intercom'

const HelpPage = () => {
  const { show, hide, open } = useIntercom()
  const [showReportModal, setShowReportModal] = useState<boolean>(false)

  const handleReportModal = () => {
    if (open) {
      hide()
    }
    setShowReportModal((value) => !value)
  }

  return (
    <PageLayout>
      <Title value="Help" />
      <Label value="Help" className="text-pink-525 mb-4" />
      <Card fluid>
        <div className="flex flex-col divide-y">
          <CardRow>
            <Label value="Report Issue" />
            <Button
              variant="primary-outlined"
              shape="circle"
              size="sm"
              icon={<FontAwesomeIcon icon={faAngleRight} />}
              onClick={handleReportModal}
            />
          </CardRow>
          <CardRow>
            <Label value="Chat" />
            <Button
              variant="primary-outlined"
              shape="circle"
              size="sm"
              icon={<FontAwesomeIcon icon={faAngleRight} />}
              onClick={() => (open ? hide() : show())}
            />
          </CardRow>
          <CardRow>
            <Label value="Help center" />
            <Button
              variant="primary-outlined"
              shape="circle"
              size="sm"
              icon={<FontAwesomeIcon icon={faAngleRight} />}
              onClick={() => window.open(DOCS, '_blank', 'noopener, noreferrer')}
            />
          </CardRow>
        </div>
      </Card>
      <ReportIssueModal show={showReportModal} onClose={() => setShowReportModal(false)} />
    </PageLayout>
  )
}

const CardRow = ({ children }: PropsWithChildren) => (
  <div className="flex justify-between items-center py-6">{children}</div>
)

export default HelpPage
