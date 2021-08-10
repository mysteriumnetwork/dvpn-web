/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Bubble from './Bubble'
import { bubbleStatus, statusText } from './nat-status.utils'
import './NatStatus.scss'

interface Props {
  status: string
  natFixUrl: string
}

const NatStatus = ({ status, natFixUrl }: Props) => {
  // const bStatus = bubbleStatus(status)
  return (
    <div className="nat-status">
      {/*<Bubble status={bStatus} />*/}
      {/*{statusText(status)}*/}
    </div>
  )
}

export default NatStatus
