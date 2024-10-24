/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Link } from '../../../components/Common/Link'
import { NODE_QUALITY } from '../../../constants/urls'

const NodeQualityTooltip = () => (
  <div className="flex flex-col gap-0.5">
    <div className="mb-1.5">Node service quality indicates your node’s accessibility to consumers.</div>
    <div>
      <b>Green</b> - quality is great and can be used by any consumer.
    </div>
    <div>
      <b>Orange</b> - quality is satisfactory and can be used by most consumers.
    </div>
    <div>
      <b>Red</b> - poor quality and is unlikely to be utilized.
    </div>
    <Link className="mt-1.5" href={NODE_QUALITY} target="_blank">
      Learn more
    </Link>
  </div>
)

export default NodeQualityTooltip
