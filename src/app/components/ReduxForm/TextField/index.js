import React from 'react'
import _ from 'lodash'
import { Field } from 'redux-form/immutable'
import AppTextField from '../../../../ui-kit/components/AppTextField'

const TextField = (props) => {
  console.log(props)
  const error = _.get(props, 'meta.touched') && _.get(props, 'meta.error')

  return (
    <AppTextField {...props} {...props.input} error={error}/>
  )
}

export default (props) => (
  <Field component={TextField} {...props}/>
)
