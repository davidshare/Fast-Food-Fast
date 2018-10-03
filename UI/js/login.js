showMessage(getMessage('ff_signup'));

const getLoginInput = () => {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  return { email, password };
}
 
const login = (event) => {
  event.preventDefault();
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
        showMessage(formatErrors(error.error));
      }
      return error;
    });
};

document.getElementById('login-btn').addEventListener('click', login);
