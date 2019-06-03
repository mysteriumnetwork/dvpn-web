import * as React from 'react'
import injectSheet from 'react-jss'
import { Location as OriginalLocation } from 'mysterium-vpn-js'
import FlagIcon from '../../../../../../../../ui-kit/components/FlagIcon'
import _ from 'lodash'

interface IStyles {
  root?: string
  flagIcon?: string
}

const styles = theme => ({
  root: {
    display: 'flex',
    marginRight: 16,
    '& > p': {
      opacity: '0.9',
      color: theme.colors.textSecondary,
      fontSize: theme.typography.fontSizes.tableHeadFont,
    },
    '& .flag-icon': {
      marginRight: 6
    }
  }
})

export interface ICountryItemProps {
  onChange?: any
  classes: IStyles
  style?: React.CSSProperties,
  location: OriginalLocation
}

const CountryItem: React.FunctionComponent<ICountryItemProps> = (props: ICountryItemProps) => {
  const country = _.get(props, 'location.country')
  return country ? (
    <div className={props.classes.root}>
      <FlagIcon code={String(country).toLowerCase()}/>
      <p>{country}</p>
    </div>
  ) : null
}

// @ts-ignore
export default injectSheet(styles)(CountryItem)
