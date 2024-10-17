/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Link } from '../../../components/Common/Link'
import { DOCS_NAT_FIX } from '../../../constants/urls'

const NATStatusDescription = () => (
  <div className="flex flex-col gap-0.5">
    <div className="mb-1.5">NAT determines with whom you can establish connections.</div>
    <div>
      <b>Open</b> - connects to any consumer.
    </div>
    <div>
      <b>Moderate</b> - connects to most consumers.
    </div>
    <div>
      <b>Strict</b> - connects only to Open-type consumers.
    </div>
    <Link className="mt-1.5" href={DOCS_NAT_FIX} target="_blank">
      Learn more
    </Link>
  </div>
)

export default NATStatusDescription
