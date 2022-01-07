/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styles from './TableComponents.module.scss'
import HelpTooltip from '../HelpTooltip/HelpTooltip'

interface Props {
  name: string
  tooltip?: JSX.Element
}

export const Header = ({ name, tooltip }: Props) => {
  return (
    <div className={styles.header}>
      {name}
      {tooltip && <HelpTooltip title={tooltip} />}
    </div>
  )
}
