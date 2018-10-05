const getSignupInput = () => {
  const fullname = document.getElementById('fullname').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const role = getUserRole();
  return {
    fullname, email, password, role,
  };
};

const signup = (event) => {
  event.preventDefault();
  if (validateUser(getSignupInput())) {
    fetch(signupURL, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(getSignupInput()),
    })
      .then((response) => {
        return response.json()
          .then((signupResponse) => {
            if (response.ok) return signupResponse;
            throw signupResponse;
          })
          .then((data) => {
            setMessage('login-message', `${data.message}. Please login to access your account`);
            redirect(loginPage);
          })
      })
      .catch((error) => {
        if (error.status === 409 || error.status === 406) {
          showMessage(formatErrors(error.error), 'error-text');
        }
      });
  }
};

document.getElementById('signup-btn').addEventListener('click', signup);

const validateUser = (userObject) => {
  let errorFlag = true;
  const { fullname, email, password } = userObject;

  document.getElementById('name_msg').innerHTML = '';
  document.getElementById('email_msg').innerHTML = '';
  document.getElementById('paswd_msg').innerHTML = '';
  document.getElementById('message').innerHTML = '';

  if (fullname === '' || email === '' || password === '') {
    showMessage('Sorry all the fields are required', 'error-text');
    return false;
  }

  if (!rules.validName.test(fullname)) {
    errorFlag = false;
    document.getElementById('name_msg').innerHTML = errorsMessages.invalidFullname;
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
