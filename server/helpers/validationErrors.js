const validationErrors = {
  recipientRequired: 'Sorry! the full name field is required',
  quantityError: 'The quantity of an item must be a number greater than zero',
  validNumber: 'Please your phone number can only contain numbers and cannot be greater than 15 or less than 8 characters',
  phoneRequired: 'Sorry! the phone number field is required',
  recipientLength: 'Sorry your fullname cannot be less than 8 characters and must contain a space',
  validRecipient: 'Please enter a valid full name. Your full name can only contain letters and spaces',
  addressRequired: 'Sorry! the Address field is required',
  addressLength: 'Sorry your address cannot be less than 10 characters',
  emailRequired: 'Sorry! the Email field is required',
  validAddress: 'Please enter a valid Address',
  validEmail: 'Please enter a valid email address',
  validStatus: 'Please enter a valid status. The status can only be Canceled or Declined or Accepted or Completed',
  itemsEmpty: 'Sorry! your order is invalid. You did not pick any items?',
  validItems: 'Sorry the items are invalid. Valid items must be objects.',
  validId: 'Please the orderId must be a number greater than zero',
  emptyStatus: 'Sorry the status is required',
};

export default validationErrors;
