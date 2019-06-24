import * as React from 'react'
import MenuItemAll from './components/MenuItemAll/MenuItemAll'
import MenuItemFavorite from './components/MenuItemFavorite/MenuItemFavorite'
import MenuByConnectionType from './components/MenuByConnectionType/MenuByConnectionType'
import MenuItemByCountry from './components/MenuItemByCountry/MenuItemByCountry'
import { ProposalsFilter } from '../../../../reducer'

const styles = require('./SideBar.module.scss')

type Props = {
  proposals?: number,
  favorites?: number,
  byType?: Map<string, number>
  byCountry?: Map<string, number>
  onChange?: Function
  filter?: ProposalsFilter
}

class SideBar extends React.PureComponent<Props> {

  protected changeFilter(filter?: ProposalsFilter) {
    const { onChange } = this.props
    if (process.env.NODE_ENV !== 'production') {
      console.log('changeFilter', filter)
    }
    return onChange && onChange(filter)
  }

  handleClickItemAll = () => this.changeFilter()

  handleItemFavorite = () => this.changeFilter({ favorite: true })

  handleConnectionType = (type) => this.changeFilter({ type })

  handleItemByCountry = (country) => this.changeFilter({ country })

  render() {
    const { proposals, favorites, byCountry, byType, filter } = this.props

    return (
      <div className={styles.sideBarRoot}>
        <MenuItemAll count={proposals || 0} onClick={this.handleClickItemAll} active={!filter}/>
        {
          favorites
            ? (
              <MenuItemFavorite count={favorites}
                                onClick={this.handleItemFavorite}
                                active={filter && filter.favorite}/>
            )
            : null
        }
        {
          byType && byType.size
            ? (
              <MenuByConnectionType counts={byType}
                                    onClick={this.handleConnectionType}
                                    active={filter && filter.type}/>
            )
            : null
        }
        {
          byCountry && byCountry.size
            ? (
              <MenuItemByCountry counts={byCountry}
                                 onClick={this.handleItemByCountry}
                                 active={filter && filter.country}/>
            )
            : null
        }
      </div>
    )
  }
}

export default SideBar
