import rules from '../helpers/validationRules';
import validationErrors from '../helpers/validationErrors';

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
   * @callback {Function} next
   * @return {Object} json
   */
  static validateOrder(request, response, next) {
    const {
      recipient,
      recipientEmail,
      recipientPhoneNumber,
      recipientAddress,
      items,
    } = request.body;

    let errors = ValidateOrder.validateRecipient(recipient,
      recipientEmail,
      recipientPhoneNumber,
      recipientAddress);

    const itemErrors = ValidateOrder.validateItems(items);
    errors = Object.assign(errors, itemErrors);

    ValidateOrder.checkValidationErrors(response, errors, next);
  }

  static validateRecipient(recipient, recipientEmail, recipientPhoneNumber, recipientAddress) {
    const errors = {};
    // recipient
    if (!recipient || !rules.empty.test(recipient)) {
      errors.recipientRequired = validationErrors.recipientRequired;
    }

    if (!rules.recipientLength.test(recipient)) {
      errors.recipientLength = validationErrors.recipientLength;
    }

    if (!rules.validRecipient.test(recipient)) {
      errors.validRecipient = validationErrors.validRecipient;
    }

    // recipient address
    if (!recipientAddress || !rules.empty.test(recipientAddress)) {
      errors.addressRequired = validationErrors.addressRequired;
    }

    if (!rules.addressLength.test(recipientAddress)) {
      errors.addressLength = validationErrors.addressLength;
    }

    if (!rules.validAddress.test(recipientAddress)) {
      errors.validAddress = validationErrors.validAddress;
    }

    // recipient email
    if (!recipientEmail || !rules.empty.test(recipientEmail)) {
      errors.emailRequired = validationErrors.emailRequired;
    }

    if (!rules.validEmail.test(recipientEmail)) errors.validEmail = validationErrors.validEmail;

    // recipient phone number
    if (!recipientPhoneNumber || !rules.empty.test(recipientPhoneNumber)) {
      errors.phoneRequired = validationErrors.phoneRequired;
    }

    if (!rules.validNumber.test(recipientPhoneNumber)) {
      errors.validNumber = validationErrors.validNumber;
    }
    return errors;
  }

  static validateItems(items) {
    const errors = {};
    const itemErrors = [];
    // order quantity
    if (!items || !rules.empty.test(items)) errors.itemsEmpty = validationErrors.itemsEmpty;

    if (typeof items !== 'object') errors.validItems = validationErrors.validItems;

    if (typeof items[0] !== 'object') errors.validItems = validationErrors.validItems;

    items.forEach((item) => {
      if (!Number.isInteger(item.quantity) || item.quantity < 1) {
        itemErrors.push(validationErrors.quantityError);
      }
    });
    if (itemErrors.length > 0) errors.itemErrors = itemErrors;
    return errors;
  }

  /**
   * validate ordersId
   * @param {Object} request
   * @param {Object} response
   * @callback {Function} next
   * @return {function} next()
   */
  static validateOrderStatus(request, response, next) {
    const errors = {};
    const validOrderStatus = ['Canceled', 'Declined', 'Accepted', 'Completed'];
    let { orderStatus } = request.body;
    orderStatus = orderStatus.toString() || '';
    if (!ValidateOrder.checkValidId(request)) errors.validId = validationErrors.validId;
    if (orderStatus) {
      if (!validOrderStatus.includes(orderStatus)) {
        errors.validStatus = validationErrors.validStatus;
      }
    } else {
      errors.emptyStatus = validationErrors.emptyStatus;
    }

    ValidateOrder.checkValidationErrors(response, errors, next);
  }

  /**
   * validate ordersId
   * @param {Object} request
   * @param {Object} response
   *
   * @callback {Function} next
   *
   * @return {Object} json
   */
  static validateOrderId(request, response, next) {
    if (!ValidateOrder.checkValidId(request)) {
      return response.status(406).json({
        statusCode: 406,
        success: false,
        error: validationErrors.validId,
      });
    }
    return next();
  }

  /**
   * check if id is valid
   * @param {Object} request
   * @return {boolean} true
   */
  static checkValidId(request) {
    const { orderId } = request.params;
    const validId = /^[1-9]{1,}/;
    if (!validId.test(orderId)) {
      return false;
    }
    return true;
  }

  /**
   * check if data validation produces any errors
   * @param {Object} request
   * @return {boolean} false
   */
  static checkValidationErrors(response, errors, next) {
    if (Object.keys(errors).length > 0) {
      return response.status(406).json({
        statusCode: 406,
        success: false,
        error: errors,
      });
    }
    return next();
  }
}
export default ValidateOrder;
