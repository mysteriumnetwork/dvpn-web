/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactComponent as InfoSvg } from '../../assets/images/info.svg'
import { ReactComponent as BellSvg } from '../../assets/images/bell.svg'
import { ReactComponent as CopySvg } from '../../assets/images/copy.svg'
import { ReactComponent as GraphSvg } from '../../assets/images/graph.svg'
import { ReactComponent as EditSvg } from '../../assets/images/edit.svg'
import { ReactComponent as XSvg } from '../../assets/images/x.svg'
import { ReactComponent as LogoLightSvg } from '../../assets/images/logo-light.svg'
import { ReactComponent as LogoDarkSvg } from '../../assets/images/logo-dark.svg'
import { ReactComponent as NodeSvg } from '../../assets/images/navigation/node.svg'
import { ReactComponent as IdentityCardSvg } from '../../assets/images/navigation/identityCard.svg'
import { ReactComponent as MoneyPouchSvg } from '../../assets/images/navigation/moneyPouch.svg'
import { ReactComponent as ConnectedPointsSvg } from '../../assets/images/navigation/connectedPoints.svg'
import { ReactComponent as GearSvg } from '../../assets/images/navigation/gear.svg'
import { ReactComponent as CircledQuestionMarkSvg } from '../../assets/images/navigation/circledQuestionMark.svg'
import { ReactComponent as LogoutSvg } from '../../assets/images/navigation/logout.svg'

export type SvgProps = {
  readonly className?: string
  readonly width?: string
  readonly height?: string
  readonly text?: string
  readonly onClick?: () => void
}

export const InfoIcon = (props: SvgProps) => <InfoSvg {...props} />
export const BellIcon = (props: SvgProps) => <BellSvg {...props} />
export const CopyIcon = (props: SvgProps) => <CopySvg {...props} />
export const GraphIcon = (props: SvgProps) => <GraphSvg {...props} />
export const EditIcon = (props: SvgProps) => <EditSvg {...props} />
export const XIcon = (props: SvgProps) => <XSvg {...props} />
export const LogoLightIcon = (props: SvgProps) => <LogoLightSvg {...props} />
export const LogoDarkIcon = (props: SvgProps) => <LogoDarkSvg {...props} />
export const NodeIcon = (props: SvgProps) => <NodeSvg {...props} />
export const IdentityCardIcon = (props: SvgProps) => <IdentityCardSvg {...props} />
export const MoneyPouchIcon = (props: SvgProps) => <MoneyPouchSvg {...props} />
export const ConnectedPointsIcon = (props: SvgProps) => <ConnectedPointsSvg {...props} />
export const GearIcon = (props: SvgProps) => <GearSvg {...props} />
export const CircledQuestionMarkIcon = (props: SvgProps) => <CircledQuestionMarkSvg {...props} />
export const LogoutIcon = (props: SvgProps) => <LogoutSvg {...props} />
