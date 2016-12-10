const errorMessage = {
  'required': 'Veuillez spécifier cette entrée',
}


const validate = values => {
  const errors = {}

  if (!values.username) {
    errors.username = errorMessage.required;
  }

  if (!values.password) {
    errors.password = errorMessage.required;
  }

  return errors;
}

export default validate;
