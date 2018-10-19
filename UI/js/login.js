showMessage(getMessage('auth'));

const getLoginInput = () => {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  return { email, password };
};

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
            if (response.ok) return signinResponse;
            throw signinResponse;
          })
          .then((data) => {
            setAuthentication(data);
            if (getDecodedUser().user.role === 0) {
              redirect(appUrl);
            } else {
              redirect(`${appUrl}/admin`);
            }
          })
      })
      .catch((error) => {
        if (error.statusCode === 404 || error.statusCode === 406 || error.statusCode === 401) {
          showMessage(formatErrors(error.error), 'error-text');
        }
        return error;
      });
  }else{
    showMessage('Please enter a valid username and password', 'error-text');
  }
};

const validateLogin = (userObject) => {
  let errorFlag = true;
  const { email, password } = userObject;

  document.getElementById('paswd_msg').innerHTML = '';
  document.getElementById('email_msg').innerHTML = '';
  document.getElementById('message').innerHTML = '';

  if (email === '' || password === '') {
    showMessage('Sorry all the fields are required', 'error-text');
    return false;
  }

  if (!rules.validEmail.test(email)) {
    errorFlag = false;
    document.getElementById('email_msg').innerHTML = errorsMessages.invalidEmail;
  }

  if (!rules.validPassword.test(password) || !rules.passwordLength.test(password)) {
    errorFlag = false;
    document.getElementById('paswd_msg').innerHTML = errorsMessages.invalidPassword;
  }

  return errorFlag;
};

document.getElementById('login-btn').addEventListener('click', login);
if(getUserToken()) redirect('index.html');
