import * as React from 'react'
import injectSheet from 'react-jss'
import { Proposal } from '../../../../../../../../../../api/data/proposal'

import classNames from 'classnames'
import FlagIcon from '../../../../../../../../../../ui-kit/components/FlagIcon'
import _ from 'lodash'

interface IStyles {
  ipItem: string
  highlight: string
}

const styles = theme => ({
  ipItem: {
    display: 'flex',
    alignItems: 'center',
    '& > p': {
      marginLeft: 8,
      fontFamily: `'mplus-1m', sans-serif`
    }
  },
  highlight: {
    '& > p': {
      color: theme.colors.whiteColor
    }
  }
})

export interface IItemServerProps {
  selected?: boolean
  classes: IStyles
  style?: React.CSSProperties
  proposal: Proposal
  active?: boolean
}

const ItemServer: React.FunctionComponent<IItemServerProps> = (props: IItemServerProps) => {
  const { providerId, serviceDefinition } = props.proposal

  const id = String(providerId).substr(-8)
  const code = String(_.get(serviceDefinition, 'locationOriginate.country')).toLowerCase()

  return (
    <td>
      <div
        className={classNames(props.classes.ipItem, {
          [props.classes.highlight]: props.active
        })}
      >
        <FlagIcon code={code}/>
        <p>{id}</p>
      </div>
    </td>
  )
}

export default injectSheet(styles)(ItemServer)
