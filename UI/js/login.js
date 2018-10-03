showMessage(getMessage('ff_signup'));

const getLoginInput = () => {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  return { email, password };
}
 
const login = (event) => {
  event.preventDefault();
  if(validateLogin(getLoginInput())) {
    fetch(loginURL, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(getLoginInput()),
    })
      .then((response) => {
        return response.json()
          .then((signinResponse) => {
            if(response.ok) return signinResponse;
            throw signinResponse;
          })
          .then((data) => {
            setAuthentication(data);
            redirect(landingPage);
          })
      })
      .catch((error) => {
        if (error.status === 404 || error.status === 406 || error.status === 401) {
          showMessage(formatErrors(error.error), 'error-text');
        }
        return error;
      });
  }
};

const validateLogin = (userObject) => {
  let errorFlag = true;
  const { email, password } = userObject;
  if (email === '' || password === '') {
    showMessage('Sorry all the fields are required', 'error-text');
    return false;
  }

  if (!rules.validEmail.test(email)) {
    errorFlag = false;
    document.getElementById('email_msg').innerHTML = errorsMessages.invalidEmail;
  } else {
    document.getElementById('email_msg').innerHTML = '';
  }

  if (!rules.validPassword.test(password) || !rules.passwordLength.test(password)) {
    errorFlag = false;
    document.getElementById('paswd_msg').innerHTML = errorsMessages.invalidPassword;
  } else {
    document.getElementById('paswd_msg').innerHTML = '';
  }

  return errorFlag;
};

document.getElementById('login-btn').addEventListener('click', login);
