/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import './Bubble.scss'
import { BubbleStatus } from './nat-status.utils'

interface Props {
  status?: BubbleStatus
}

const Bubble = ({ status }: Props): JSX.Element => {
  return <div className={`bubble bubble--${status}`} />
}

export default Bubble
