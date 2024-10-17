/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import NodeServiceControl from './NodeServiceControl'
import Card, { CardProps } from '../../../components/Cards/Card'
import { selectors } from '../../../redux/selectors'
import { useAppSelector } from '../../../commons/hooks'
import { configs } from '../../../commons/config'
import FEATURES from '../../../commons/features'
import { SUPPORTED_SERVICES, SUPPORTED_SERVICES_MOBILE } from '../../../constants/service'

const NodeServicesCard = (props: CardProps) => {
  const config = useAppSelector(selectors.currentConfig)
  const publicDisabled = configs.isFeatureEnabled(config, FEATURES.MOBILE_PROVIDER.name)
  const servicesToShow = publicDisabled ? SUPPORTED_SERVICES_MOBILE : SUPPORTED_SERVICES

  return (
    <Card {...props}>
      <div className="divide-y">
        {servicesToShow.map((sd) => (
          <div className="flex justify-between py-5 items-center" key={sd.type}>
            <NodeServiceControl name={sd.name} description={sd.description} serviceType={sd.type} />
          </div>
        ))}
      </div>
    </Card>
  )
}

export default NodeServicesCard
