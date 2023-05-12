/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LogoutNavIcon } from '../../../Components/Icons/NavigationIcons'
import { ExpandableControl } from '../../../Components/Navigation/ExpandableControl'
import complexActions from '../../../redux/complex.actions'

interface Props {
  title: string
  expanded: boolean
}

export const LogoutButton = ({ title, expanded }: Props) => {
  return (
    <ExpandableControl
      title={title}
      expanded={expanded}
      icon={<LogoutNavIcon />}
      onClick={async () => await complexActions.logout()}
      ignoreOverlay
      border
    />
  )
}
