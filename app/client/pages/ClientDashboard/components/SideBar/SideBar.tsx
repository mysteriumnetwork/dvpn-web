import * as React from 'react'
import MenuItemAll from './components/MenuItemAll/MenuItemAll'
import MenuItemFavorite from './components/MenuItemFavorite/MenuItemFavorite'
import MenuByConnectionType from './components/MenuByConnectionType/MenuByConnectionType'
import MenuItemByCountry from './components/MenuItemByCountry/MenuItemByCountry'

const styles = require('./SideBar.scss')

const SideBar = () => (
  <div className={styles.sideBarRoot}>
    <MenuItemAll />
    <MenuItemFavorite />
    <MenuByConnectionType />
    <MenuItemByCountry />
  </div>
)

export default SideBar
