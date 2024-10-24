/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PropsWithChildren } from 'react'
import NodeStatusDescription from '../../components/Descriptions/NodeStatusDescription'
import NodeQualityDescription from '../../components/Descriptions/NodeQualityDescription'
import NATStatusDescription from '../../components/Descriptions/NATStatusDescription'
import NodeStatusIndicator from '../../components/Indicators/NodeStatusIndicator'
import NodeQualityIndicator from '../../components/Indicators/NodeQualityIndicator'
import Card, { CardProps } from '../../../components/Cards/Card'
import { Tooltip } from '../../../components/Tooltip/Tooltip'
import { InfoIcon } from '../../../components/Icons/Icons'
import Label from '../../../components/Typography/Label'
import Text from '../../../components/Typography/Text'
import { useAppSelector } from '../../../commons/hooks'
import { nat2Human } from '../../../commons/nat'
import { selectors } from '../../../redux/selectors'
import packageJson from '../../../../package.json'

const NodeOverviewCard = (props: CardProps) => {
  const { type } = useAppSelector(selectors.natType)
  const healthCheck = useAppSelector(selectors.healthCheck)
  const natInfo = nat2Human(type)

  return (
    <Card {...props}>
      <div className="divide-y">
        <CardRow>
          <Label value="Node Status" />
          <Tooltip content={<NodeStatusDescription />}>
            <div>
              <InfoIcon className="text-blue-225" />
            </div>
          </Tooltip>
          <NodeStatusIndicator />
        </CardRow>
        <CardRow>
          <Label value="Node Quality" />
          <Tooltip content={<NodeQualityDescription />}>
            <div>
              <InfoIcon className="text-blue-225" />
            </div>
          </Tooltip>
          <NodeQualityIndicator />
        </CardRow>
        <CardRow>
          <Label value="NAT" />
          <Tooltip content={<NATStatusDescription />}>
            <div>
              <InfoIcon className="text-blue-225" />
            </div>
          </Tooltip>
          <Text className="text-gray-550" value={natInfo.human} />
        </CardRow>
        <CardRow>
          <Label value="Node version" />
          <div></div>
          <Text className="text-gray-550" value={healthCheck.version} />
        </CardRow>
        <CardRow>
          <Label value="Node UI version" />
          <div></div>
          <Text className="text-gray-550" value={packageJson.version} />
        </CardRow>
      </div>
    </Card>
  )
}

const CardRow = ({ children }: PropsWithChildren) => (
  <div className="grid grid-cols-[4fr_1fr_4fr] md:grid-cols-[3fr_1fr_6fr] py-5 items-center">{children}</div>
)

export default NodeOverviewCard
