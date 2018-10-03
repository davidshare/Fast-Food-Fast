const rules = {
  validAddress: /^[a-zA-Z][a-zA-Z0-9\s?.,:]+$/,
  empty: /^(\S+)/,
  addressLength: /^[a-zA-Z][a-zA-Z0-9\s?.,:]{10,150}$/,
  validEmail: /^[A-Za-z]\w{3,15}@\w{2,15}[.]\w{2,15}$/,
  validName: /^[a-zA-Z][a-zA-Z\s]{8,}$/,
  validNumber: /^[0-9]{8,15}/,
  validId: /^[1-9]{1,}/,
  validPassword: /^[\S]+$/,
  passwordLength: /^.{8,}$/,
  validMeal: /^[a-zA-Z][a-zA-Z0-9\s?.,:]+$/,
  validDesc: /^[a-zA-Z][a-zA-Z0-9!$&%\\\s`()*.+,'-]+$/,
  mealLength: /^[a-zA-Z][a-zA-Z0-9\s]{5,50}$/,
  descLength: /^[a-zA-Z][a-zA-Z0-9!$&%\\\s`()*.+,'-]{39,255}$/,
};

const errorsMessages = {
  invalidPassword: 'Please enter a valid password. Your password cannot contain spaces and must be more than 8 characters',
  invalidEmail: 'Please enter a valid email addresss.',
  invalidFullname: 'Please enter a valid fullanem. Your fullname can only contain spaces and words',
};
