/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { displayMyst } from '../../../commons/money.utils'
import './TotalMystCard.scss'

interface Props {
  myst?: number
}

const TotalMystCard = ({ myst }: Props) => {
  return (
    <>
      <div className="myst-and-data__footer__sum-block">
        <div className="name">{displayMyst(myst || 0)}</div>
        <div className="explanation">Total Earnings</div>
      </div>
    </>
  )
}

export default TotalMystCard
