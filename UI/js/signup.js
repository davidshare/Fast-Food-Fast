const getSignupInput = () => {
  const firstName = document.getElementById('firstname').value.trim();
  const lastName = document.getElementById('firstname').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const role = getUserRole();
  return {
    firstName, lastName, email, password, role,
  };
};

const signup = (event) => {
  const signupButton = document.getElementById('signup-btn');
  const buttonContent = addLoader(signupButton);
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
        removeLoader(signupButton, buttonContent);
        if (error.status === 409 || error.status === 406) {
          showMessage(formatErrors(error.error), 'error-text');
        }
      });
  }else{
    removeLoader(signupButton, buttonContent);
  }
};

document.getElementById('signup-btn').addEventListener('click', signup);

const validateUser = (userObject) => {
  let errorFlag = true;
  const { firstName, lastName, email, password, role, } = userObject;

  document.getElementById('fname_msg').innerHTML = '';
  document.getElementById('lname_msg').innerHTML = '';
  document.getElementById('email_msg').innerHTML = '';
  document.getElementById('paswd_msg').innerHTML = '';
  document.getElementById('message').innerHTML = '';

  if (firstName === '' || lastName === '' || email === '' || password === '') {
    showMessage('Sorry all the fields are required', 'error-text');
    return false;
  }

  if (!rules.validName.test(firstName)) {
    errorFlag = false;
    document.getElementById('fname_msg').innerHTML = errorsMessages.invalidFirstName;
  }

  if (!rules.validName.test(lastName)) {
    errorFlag = false;
    document.getElementById('lname_msg').innerHTML = errorsMessages.invalidLastName;
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
