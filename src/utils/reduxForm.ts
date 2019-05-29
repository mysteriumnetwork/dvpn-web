export const submit = (props, func) => {
  const {handleSubmit} = props
  const submitter = handleSubmit(func)
  submitter()
}