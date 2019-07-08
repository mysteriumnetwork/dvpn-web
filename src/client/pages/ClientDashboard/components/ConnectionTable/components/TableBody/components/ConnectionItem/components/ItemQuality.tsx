import * as React from 'react'
import injectSheet from 'react-jss'
import Quality from '../../../../../../../../../../ui-kit/components/QualityIcon/QualityIcon'
import StartIcon from '../../../../../../../../../../ui-kit/components/StartIcon/StartIcon'
import { Proposal } from 'mysterium-vpn-js'
import favoriteProposals from '../../../../../../../../../../utils/favoriteProposals'

interface IStyles {
  ipItem: string
}

const styles = theme => ({
  ipItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    '& > div:first-child': {
      marginRight: 10,
    },
  },
})

export interface IItemProps {
  classes: IStyles
  style?: React.CSSProperties
  proposal: Proposal
  active?: boolean
}

const ItemQuality: React.FunctionComponent<IItemProps> = (props: IItemProps) => (
  <td>
    <div className={props.classes.ipItem}>
      <Quality metrics={props.proposal.metrics}/>
      <StartIcon active={props.active} favorite={favoriteProposals.isFavorite(props.proposal)}/>
    </div>
  </td>
)

export default injectSheet(styles)(ItemQuality)
