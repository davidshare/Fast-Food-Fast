/**
 *    @fileOverview Class to validate user input for order
 *    @class Orders validator
 *    @exports ValidateOrders
 */

class ValidateOrder {
  /**
   * validate orders input validity
   * @param {Object} request
   * @param {Object} response
   *
   * @callback {Function} next
   *
   * @return {Object} json
   */
  static validateOrder(request, response, next) {
    const {
      recipient,
      recipientEmail,
      recipientPhoneNumber,
      recipientAddress,
    } = request.body;

    let { items } = request.body;

    const errors = {};
    const rules = {
      validRecipient: /^[a-zA-Z][a-zA-Z\s]+$/,
      validAddress: /^[a-zA-Z][a-zA-Z0-9\s?.,:]+$/,
      empty: /^(\S+)/,
      addressLength: /^[a-zA-Z][a-zA-Z0-9\s?.,:]{10,150}$/,
      validEmail: /^[A-Za-z]\w{3,15}@\w{2,15}[.]\w{2,15}$/,
      recipientLength: /^[a-zA-Z][a-zA-Z\s]{8,}$/,
      validNumber: /^[0-9]{8,15}/,
      validId: /^[1-9]{1,}/,
    };

    // recipient
    if (!recipient || !rules.empty.test(recipient)) {
      errors.recipientRequired = 'Sorry! the full name field is required';
    }

    if (!rules.recipientLength.test(recipient)) {
      errors.recipientLength = 'Sorry your fullname cannot be less than 8 characters and must contain a space';
    }

    if (!rules.validRecipient.test(recipient)) {
      errors.validRecipient = 'Please enter a valid full name. Your full name can only contain letters and spaces';
    }

    // recipient address
    if (!recipientAddress || !rules.empty.test(recipientAddress)) {
      errors.addressRequired = 'Sorry! the Address field is required';
    }

    if (!rules.addressLength.test(recipientAddress)) {
      errors.addressLength = 'Sorry your address cannot be less than 10 characters';
    }

    if (!rules.validAddress.test(recipientAddress)) {
      errors.validRecipient = 'Please enter a valid Address';
    }

    // recipient email
    if (!recipientEmail || !rules.empty.test(recipientEmail)) {
      errors.emailRequired = 'Sorry! the Email field is required';
    }

    if (!rules.validEmail.test(recipientEmail)) {
      errors.validEmail = 'Please enter a valid Address';
    }

    // recipient phone number
    if (!recipientPhoneNumber || !rules.empty.test(recipientPhoneNumber)) {
      errors.phoneRequired = 'Sorry! the phone number field is required';
    }

    if (!rules.validNumber.test(recipientPhoneNumber)) {
      errors.validNumber = 'Please your phone number can only contain numbers and cannot be greater than 15 or less than 8 characters';
    }

    // order quantity
    if (!items || !rules.empty.test(items)) {
      errors.itemsEmpty = 'Sorry! your order is invalid. Where are your items?';
    }

    if (items) {
      items = Object.values(JSON.parse(items));
      const itemErrors = [];

      if (!Array.isArray(items)) {
        errors.validItems = 'Sorry the items are invalid. Enter valid items';
      }

      if (typeof items[0] !== 'object') {
        errors.validItems = 'Sorry the items are invalid. Valide items must be objects.';
      }

      items.forEach((item) => {
        if (!Number.isInteger(item.quantity) || item.quantity < 1) {
          itemErrors.push(`The quantity of the item '${item.item}' must be a number greater than zero`);
        }
      });
      if (itemErrors.length > 0) {
        errors.itemErrors = itemErrors;
      }
    }

    if (Object.keys(errors).length > 0) {
      return response.status(406).json({
        statusCode: 406,
        success: false,
        error: errors,
      });
    }
    return next();
  }

  static validateOrderStatus(request, response, next) {
    const errors = {};
    const validId = /^[1-9]{1,}/;
    let { orderStatus } = request.body;
    const { orderId } = request.params;
    orderStatus = orderStatus.toString();
    if (!validId.test(orderId)) {
      errors.validId = 'Please the orderId must be a number greater than zero';
    }

    if (orderStatus) {
      if (orderStatus !== 'Canceled' && orderStatus !== 'Declined' && orderStatus !== 'Accepted' && orderStatus !== 'Completed') {
        errors.validStatus = 'Please enter a valid status. The status can only be Canceled or Declined or Accepted or Completed';
      }
    } else {
      errors.emptyStatus = 'Sorry the status is required';
    }

    if (Object.keys(errors).length > 0) {
      return response.status(406).json({
        statusCode: 406,
        success: false,
        error: errors,
      });
    }
    return next();
  }

  static validateOrderId(request, response, next) {
    const { orderId } = request.params;
    const validId = /^[1-9]{1,}/;
    if (!validId.test(orderId)) {
      return response.status(406).json({
        statusCode: 406,
        success: false,
        error: 'Please the orderId must be a number greater than zero',
      });
    }
    return next();
  }
}
export default ValidateOrder;
