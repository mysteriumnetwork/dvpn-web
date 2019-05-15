import React from 'react'
import { Field } from 'redux-form/immutable'
import AppTextField from '../../../../ui-kit/components/AppTextField'

const TextField = (props) => (
  <AppTextField {...props} {...props.input}/>
)

export default (props) => (
  <Field component={TextField} {...props}/>
)
