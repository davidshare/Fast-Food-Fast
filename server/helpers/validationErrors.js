const validationErrors = {
  nameRequired: 'Sorry! the full name field is required',
  quantityError: 'The quantity of an item must be a number greater than zero',
  validNumber: 'Please your phone number can only contain numbers and cannot be greater than 15 or less than 8 characters',
  phoneRequired: 'Sorry! the phone number field is required',
  nameLength: 'Sorry your fullname cannot be less than 8 characters and must contain a space',
  validName: 'Please enter a valid full name. Your full name can only contain letters and spaces',
  addressRequired: 'Sorry! the Address field is required',
  addressLength: 'Sorry your address cannot be less than 10 characters',
  emailRequired: 'Sorry! the Email field is required',
  validAddress: 'Please enter a valid Address',
  validEmail: 'Please enter a valid email address',
  validStatus: 'Please enter a valid status. The status can only be Canceled or Declined or Accepted or Completed',
  itemsEmpty: 'Sorry! your order is invalid. You did not pick any items?',
  validItems: 'Sorry the items are invalid. Valid items must be objects.',
  validOrderId: 'Please the orderId must be a number greater than zero',
  emptyStatus: 'Sorry the status is required',
  passwordEmpty: 'Your password is required',
  validPassword: 'Sorry, your password cannot contain spaces.',
  passwordLength: 'Sorry noOrderyour password must not be less than 8 characters',
  validRole: 'Invalid user role. The role can only be the values: 0, 1 or 2 ',
  emailExists: 'Sorry, this email address has already been registered',
  noOrder: 'Sorry! Order not found.',
  mealRequired: 'Sorry the name of the meal is required',
  validMeal: 'Please enter a valid meal name. It can only contain letters and spaces',
  mealLength: 'Sorry the meal name must not be less than 5 characters or more than 50',
  descRequired: 'Sorry the meal description is required',
  validDesc: 'Sorry, your description must be a string of alphanumeric, and special characters and must start with a letter',
  descLength: 'Sorry your description must not be less than 30 or more than 255 characters',
  priceRequired: 'Sorry the price is required',
  validPrice: 'Sorry, the price can only be positive numbers greater than 0',
  mealExists: 'Sorry either the name or description of this meal exists. They cannot be duplicates',
  validMealId: 'Please the mealId must be a number greater than zero',
  noMeal: 'Sorry! Meal not found.',
};

export default validationErrors;
