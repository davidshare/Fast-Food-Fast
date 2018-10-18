const getCheckoutInfo = () => {
  const firstName = document.getElementById('firstname').value;
  const lastName = document.getElementById('lastname').value;
  const recipientEmail = document.getElementById('email').value;
  const recipientPhoneNumber = document.getElementById('phone').value;
  const recipientAddress = document.getElementById('address').value;
  const items = calculateItemsTotal(getCart());

  return {
    firstName, lastName, recipientEmail, recipientPhoneNumber, recipientAddress, items,
  };
};

const validateOrder = (checkoutObject) => {
  let errorFlag = true;
  const {
    firstName, lastName, recipientEmail, recipientPhoneNumber, recipientAddress,
  } = checkoutObject;

  document.getElementById('fname_msg').innerHTML = '';
  document.getElementById('lname_msg').innerHTML = '';
  document.getElementById('email_msg').innerHTML = '';
  document.getElementById('phone_msg').innerHTML = '';
  document.getElementById('address_msg').innerHTML = '';
  document.getElementById('message').innerHTML = '';

  if (firstName === '' || lastName === '' || recipientPhoneNumber === '' || recipientAddress === '') {
    showMessage('Sorry all the fields are required', 'error-text');
    return false;
  }

  if (!rules.validName.test(firstName)) {
    errorFlag = false;
    document.getElementById('fname_msg').innerHTML = `${errorsMessages.invalidFirstName}<br/>`;
  }

  if (!rules.validName.test(lastName)) {
    errorFlag = false;
    document.getElementById('lname_msg').innerHTML = errorsMessages.invalidLastName;
  }

  if (recipientEmail && !rules.validEmail.test(recipientEmail)) {
    errorFlag = false;
    document.getElementById('email_msg').innerHTML = errorsMessages.invalidEmail;
  }

  if (!rules.validNumber.test(recipientPhoneNumber)) {
    errorFlag = false;
    document.getElementById('phone_msg').innerHTML = `${errorsMessages.invalidPhone}<br/>`;
  }

  if (!rules.validAddress.test(recipientAddress)) {
    errorFlag = false;
    document.getElementById('address_msg').innerHTML = errorsMessages.invalidAddress;
  }
  return errorFlag;
};

const placeOrder = (event) => {
  event.preventDefault();
  const checkoutInfo = getCheckoutInfo();
  if (validateOrder(checkoutInfo)) {
    fetch(ordersURL, {
      method: 'POST',
      mode: 'cors',
      headers: { 
        'Content-Type': 'application/json',
        'x-access': getUserToken(),
      },
      body: JSON.stringify(checkoutInfo),
    })
      .then((response) => {
        return response.json()
          .then((orderResponse) => {
            if (response.ok) return orderResponse;
            throw orderResponse;
          })
          .then((data) => {
            clearCart(false);
            redirect(`${orderPage}?orderId=${data.order.id}`);
          })
      })
      .catch((error) => {
        if (error.status === 401 || error.status === 406) {
          showMessage(formatErrors(error.error), 'error-text');
        }
      });
  }
};

document.getElementById('checkout').addEventListener('submit', placeOrder);
