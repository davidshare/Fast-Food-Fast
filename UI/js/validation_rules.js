const rules = {
  validAddress: /^[a-zA-Z][a-zA-Z0-9\s?.,:]{10,255}$/,
  empty: /^(\S+)/,
  validEmail: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/,
  validName: /^[a-zA-Z][a-zA-Z]{2,}$/,
  validNumber: /^[0-9]{8,15}/,
  validPrice: /^[1-9]{1,}/,
  validPassword: /^[\S]+$/,
  passwordLength: /^.{8,}$/,
  validMeal: /^[a-zA-Z][a-zA-Z0-9\s?.,:]+$/,
  validDesc: /^[a-zA-Z][a-zA-Z0-9!$&%\\\s`()*.+,'-]+$/,
  mealLength: /^.{5,50}$/,
  descLength: /^[a-zA-Z][a-zA-Z0-9!$&%\\\s`()*.+,'-]{39,255}$/,
  validUrl: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
  validPic: /^.*\.(jpg|jpeg|png|gif)$/i,
};

const errorsMessages = {
  invalidPassword: 'Please enter a valid password. Your password cannot contain spaces and must be more than 8 characters',
  invalidEmail: 'Please enter a valid email addresss.',
  invalidPhone: 'Please enter a valid phone number. It can only contain numbers',
  invalidFirstName: 'Please enter a valid first name. Your first name can only contain letters',
  invalidLastName: 'Please enter a valid last name. Your last name can only contain letters',
  invalidDesc: 'Sorry, the description of the meal must be a string of alphanumeric, and special characters and must start with a letter',
  invalidPrice: 'Sorry, the price can only be positive numbers greater than 0',
  invalidPic: 'Please upload a valid image. The accepted file types are jpg, jpeg, png, and gif.',
  mealLength: 'Sorry, the name of the meal must not be less than 5 characters or more than 50',
  descLength: 'Sorry, the description of the meal must not be less than 30 or more than 255 characters',
  invalidMeal: 'Sorry, the meal name can only contain alphanumeric characters and spaces',
  invalidAddress: 'Please enter a valid address. Addresses must be Alphanumeric characters not less than 10 or more than 255 characters',
};

//url regex: https://www.regextester.com/93652
//email regex: https://www.regextester.com/1922
