import { FormSubmitHandler, InjectedFormProps } from 'redux-form'

export const submit = (props: InjectedFormProps, func: FormSubmitHandler) => {
  const { handleSubmit } = props
  const submitter = handleSubmit(func)
  submitter()
}
