/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Link } from '../../../components/Common/Link'
import { NODE_STATUS } from '../../../constants/urls'

const NodeStatusDescription = () => (
  <div className="flex flex-col gap-0.5">
    <div>Indicates the status of your node.</div>
    <Link className="mt-1.5" href={NODE_STATUS} target="_blank">
      Learn more
    </Link>
  </div>
)

export default NodeStatusDescription
