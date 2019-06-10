import * as React from 'react'
import trans from '../../../../../../../trans'
import CountryItem from './CountryItem/CountryItem'

const styles = require('./MenuItemByCountry.module.scss')

type Props = {
  style?: React.CSSProperties,
  onClick?: Function
  counts?: Map<string, number>
  active?: string
}

const sortByCountry = (a, b) => {
  const valA = String(a.country).toUpperCase()
  const valB = String(b.country).toUpperCase()

  if (valA < valB) {
    return -1
  }

  if (valA > valB) {
    return 1
  }

  return 0
}

const MenuItemByCountry = (props: Props) => (
  <div className={styles.root}>
    <h3>{trans('app.client.side.bar.by.country')}</h3>
    <div className={styles.menuList}>
      {props.counts && Array.from(props.counts).sort(sortByCountry).map(([country, count]) => (
        <CountryItem key={country}
                     country={country}
                     count={count}
                     active={props.active === country}
                     onClick={() => props.onClick && props.onClick(country)}/>
      ))}
    </div>
  </div>
)

export default MenuItemByCountry
