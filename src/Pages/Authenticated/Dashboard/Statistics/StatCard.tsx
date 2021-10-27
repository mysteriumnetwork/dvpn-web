/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import './Statistic.scss'

interface Props {
  stat: string
  name: string
}

const StatCard = ({ stat, name }: Props) => {
  return (
    <div className="dashboard-statistic">
      <p className="dashboard-statistic__value">{stat}</p>
      <p className="dashboard-statistic__label">{name}</p>
    </div>
  )
}

export default StatCard
