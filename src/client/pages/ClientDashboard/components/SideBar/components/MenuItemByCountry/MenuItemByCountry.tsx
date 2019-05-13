import * as React from 'react'
import trans from '../../../../../../../trans'
import CountryItem from './CountryItem/CountryItem'

const styles = require('./MenuItemByCountry.module.scss')

const MenuItemByCountry = () => (
  <div className={styles.root}>
    <h3>{trans('app.client.side.bar.by.country')}</h3>
    <ul className={styles.menuList}>
      <CountryItem />
      <CountryItem />
    </ul>
  </div>
)

export default MenuItemByCountry
