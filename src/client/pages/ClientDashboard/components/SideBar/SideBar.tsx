import * as React from 'react'
import MenuItemAll from './components/MenuItemAll/MenuItemAll'
import MenuItemFavorite from './components/MenuItemFavorite/MenuItemFavorite'
import MenuByConnectionType from './components/MenuByConnectionType/MenuByConnectionType'
import MenuItemByCountry from './components/MenuItemByCountry/MenuItemByCountry'

const styles = require('./SideBar.module.scss')

type Props = {
  proposals?: number,
  favorites?: number,
  byType?: {name: string, value: string}[]
  byCountry?: {name: string, value: string}[]
}

const SideBar = (props: Props) => (
  <div className={styles.sideBarRoot}>
    <MenuItemAll count={props.proposals}/>
    {props.favorites && (<MenuItemFavorite count={props.favorites}/>)}
    {(props.byType && props.byType.length && <MenuByConnectionType/>)}
    {(props.byCountry && props.byCountry.length && <MenuItemByCountry/>)}
  </div>
)

export default SideBar
