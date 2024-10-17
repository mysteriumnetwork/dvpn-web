/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import NATStatusDescription from '../../../components/Descriptions/NATStatusDescription'
import NodeQualityDescription from '../../../components/Descriptions/NodeQualityDescription'
import NodeStatusDescription from '../../../components/Descriptions/NodeStatusDescription'
import { Tooltip } from '../../../../components/Tooltip/Tooltip'
import { InfoIcon } from '../../../../components/Icons/Icons'
import Card from '../../../../components/Cards/Card'
import Label from '../../../../components/Typography/Label'

const TooltipsBook = () => {
  return (
    <Card fluid className="flex flex-row justify-center items-center w-full gap-10 mt-10">
      <Label value="Hover over" />
      <FontAwesomeIcon icon={faAngleRight} />
      <Tooltip content={<NATStatusDescription />}>
        <div>
          <InfoIcon className="text-blue-225" />
        </div>
      </Tooltip>
      <Tooltip content={<NodeQualityDescription />}>
        <div>
          <InfoIcon className="text-blue-225" />
        </div>
      </Tooltip>
      <Tooltip content={<NodeStatusDescription />}>
        <div>
          <InfoIcon className="text-blue-225" />
        </div>
      </Tooltip>
    </Card>
  )
}

export default TooltipsBook
