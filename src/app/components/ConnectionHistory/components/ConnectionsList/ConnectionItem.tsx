import * as React from 'react'
import injectSheet from 'react-jss'

interface IStyles {
  ipItem: string
}
const styles = theme => ({
  ipItem: {
    display: 'flex',
    '& > p': {
      marginLeft: 8,
      fontFamily: '"mplus-1m", sans-serif',
    },
  },
})

export interface IConnectionItemProps {
  classes: IStyles
  style?: React.CSSProperties
}

const ConnectionItem: React.SFC<IConnectionItemProps> = (props: IConnectionItemProps) => (
  <tr>
    <td>
      <div className={props.classes.ipItem}>
        <div className="flag-icon" />
        <p>43e7c67a00</p>
      </div>
    </td>
    <td>2018-12-28 12:21</td>
    <td>00:02:13:40</td>
    <td>12.32 GB</td>
    <td>2.32 GB</td>
  </tr>
)

export default injectSheet(styles)(ConnectionItem)
