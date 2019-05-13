import * as React from 'react'
import injectSheet from 'react-jss'
import ItemServer from './components/ItemServer'
import ItemQuality from './components/ItemQuality'
import ItemConnectionType from './components/ItemConnectionType'

interface IStyles {
  highlight: string
}

const styles = theme => ({
  highlight: {
    background: theme.colors.actionPurple,
  },
})

export interface IItemProps {
  classes: IStyles
  style?: React.CSSProperties
}

const ConnectionItem: React.SFC<IItemProps> = (props: IItemProps) => (
  <tr
  // set class highlight when item selected
  // className={props.classes.highlight}
  >
    <ItemServer />
    <ItemConnectionType />
    <ItemQuality />
  </tr>
)

export default injectSheet(styles)(ConnectionItem)
