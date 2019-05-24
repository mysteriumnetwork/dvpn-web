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

const MenuItemByCountry = (props: Props) => (
  <div className={styles.root}>
    <h3>{trans('app.client.side.bar.by.country')}</h3>
    <ul className={styles.menuList}>
      {props.counts && Array.from(props.counts).map(([country, count]) => (
        <CountryItem country={country}
                     count={count}
                     active={props.active}
                     onClick={() => props.onClick && props.onClick(country)}/>
      ))}
    </ul>
  </div>
)

export default MenuItemByCountry
