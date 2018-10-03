const formatErrors = (errorObject) => {
  if (typeof errorObject === 'string') return errorObject;
  let errorString;
  for (key in errorObject) {
    errorString+= `<li>${errorObject[key]}</li>`;
  }
  return `<ul>${errorString}</ul>`;
};

const redirect = (link) => {
  window.location.href = link;
};

const setMessage = (key, message) => {
  if (window.localStorage) {
    localStorage.setItem(key, message);
  }
};

const getUserToken = () => localStorage.getItem('userToken') || null;

const getMessage = (key) => {
  let currentMessage;
  if (window.localStorage) {
    currentMessage = localStorage.getItem(key);
    localStorage.removeItem(key);
  }
  return currentMessage;
};
const showMessage = (message, type) => {
  const messageObj = document.getElementById('message');
  messageObj.innerHTML = message;
  messageObj.classList.add(type);
};

const getUserRole = () => {
  const role = window.location.href === adminSignUpPage? 1 : 0;
  return role;
};

const removeAuthLinks = () =>{
  const adminAuth = document.querySelectorAll('.admin-auth');
  const userAuth = document.querySelectorAll('.auth');
  if (adminAuth) {
    adminAuth.forEach((link) => {
      link.className = 'display-hide';
    });
  }

  if (userAuth) {
    userAuth.forEach((link) => {
      link.className = 'display-hide';
    });
  }
};

const removeLogoutLink = () => {
  const logoutLink = document.querySelector('.no-auth');
  if (!getUserToken() && logoutLink) {
    logoutLink.className = 'display-hide';
  }
};

const authenticateUser = (url) => {
  if (getUserToken()) {
    removeAuthLinks();
  } else if (window.location.href !== 'http://localhost:3000/public/index.html') {
    setMessage('auth', 'Sorry you are not authorized to access this section.\nKindly login into your account');
    redirect(url);
  }
};

const setAuthentication = (userData) => {
  setMessage('userToken', userData.token);
};

const logout = () => {
  localStorage.removeItem('userToken');
  redirect('http://localhost:3000/public/index.html');
};

const getDecodedUser = () => {
  if(localStorage.getItem('userToken')) {
    return jwt_decode(localStorage.getItem('userToken'));
  }  
};