interface ValidateResultInterface {
  success: boolean,
  passwordBlank: boolean,
  passwordNotSame: boolean,
  passwordShort: boolean,
  errorMessage: string
}

export const validatePassword = (password: string, passwordRepeat: string): ValidateResultInterface => {
  let response = {
    success: true,
    passwordBlank: false,
    passwordNotSame: false,
    passwordShort: false,
    errorMessage: ''

  };

  if (isPasswordsNotBlank(password, passwordRepeat)) {
    response.success = false;
    response.passwordBlank = true;
    response.errorMessage = "password blank";

    return response;
  }

  if (isPasswordsSame(password, passwordRepeat)) {
    response.success = false;
    response.passwordNotSame = true;
    response.errorMessage = "password not the same";

    return response;
  }


  if (isPasswordValid(password)) {
    response.success = false;
    response.passwordShort = true;
    response.errorMessage = "password are short";

    return response;
  }

  return response
};

const isPasswordsSame = (password: string, passwordRepeat: string): boolean => {
  return password !== passwordRepeat;
};

const isPasswordValid = (password: string): boolean => {
  return password.length < 10;
};

const isPasswordsNotBlank = (password: string, passwordRepeat: string): boolean => {
  return !(password !== "" || passwordRepeat !== "");
};