import React from 'react' // eslint-disable-line

export const immutableToProps = (props) => {
  const newProps = {}
  for (const key of Object.keys(props)) {
    const value = props[key]
    if (value && typeof value.toJS === 'function') {
      newProps[key] = value.toJS()
    } else {
      newProps[key] = value
    }
  }
  return newProps
}

export default (BaseComponent) => (props) => (
  <BaseComponent {...immutableToProps(props)} />
)
