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
          setMessage('fff_signup', `${data.message} Please login to access your account`);
          redirect(loginPage);
        })     
    })
    .catch((error) => {
      if (error.status === 409 || error.status === 406) showMessage(formatErrors(error.error));
    });
};

document.getElementById('signup-btn').addEventListener('click', signup);
