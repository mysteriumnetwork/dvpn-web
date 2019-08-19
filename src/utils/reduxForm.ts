import { InjectedFormProps } from 'redux-form'

export const submit = (props: InjectedFormProps, func: () => any) => {
  const { handleSubmit } = props
  const submitter = handleSubmit(func)
  submitter()
}
