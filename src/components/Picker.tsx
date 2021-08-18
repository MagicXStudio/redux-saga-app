import * as React from 'react'
import {Card} from 'antd'
type Props = {
    options: Array<string>,
    value: number,
    onChange: Function,
}
type State = {
}

export default class Picker extends React.Component<Props, State> {
  render() {
    const { value, onChange, options } = this.props
    return (
      <Card>
        <h1>{value}</h1>
        <select onChange={e => onChange(e.target.value)} value={value}>
          {options.map(option => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </Card>
    )
  }
}


