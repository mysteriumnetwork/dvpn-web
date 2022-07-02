/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useFetch } from '../../../../commons/hooks'
import { tequila } from '../../../../api/tequila'
import Charts from '../Charts/Charts'

const { api } = tequila

export const Report = () => {
  const [data = []] = useFetch(() => Promise.all([api.sessionStatsDaily()]))

  const [{ items: statsDaily } = { items: {} }] = data

  return (
    <div>
      <Charts statsDaily={statsDaily} />
    </div>
  )
}
