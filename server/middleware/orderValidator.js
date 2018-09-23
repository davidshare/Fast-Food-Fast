import rules from '../helpers/validationRules';
import validationErrors from '../helpers/validationErrors';
import ValidationHelper from '../helpers/validationHelper';

/**
 *    @fileOverview Class to validate user input for order
 *    @class Orders validator
 *    @exports ValidateOrders
 */

class ValidateOrder {
  /**
   * validate orders input
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
    const userErrors = ValidationHelper.validateUser(recipient, recipientEmail);
    const itemErrors = ValidateOrder.validateItems(items);
    let errors = ValidateOrder.validateRecipient(recipientPhoneNumber, recipientAddress);

    errors = Object.assign(errors, itemErrors, userErrors);
    ValidationHelper.checkValidationErrors(response, errors, next);
  }

  static validateRecipient(recipientPhoneNumber, recipientAddress) {
    const errors = {};
    if (!recipientAddress || !rules.empty.test(recipientAddress)) {
      errors.addressRequired = validationErrors.addressRequired;
    }

    if (!rules.addressLength.test(recipientAddress)) {
      errors.addressLength = validationErrors.addressLength;
    }

    if (!rules.validAddress.test(recipientAddress)) {
      errors.validAddress = validationErrors.validAddress;
    }

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
    const { orderStatus } = request.body;
    if (!ValidationHelper.checkValidId(request, request.params.orderId)) {
      errors.validOrderId = validationErrors.validOrderId;
    }
    if (!validOrderStatus.includes(orderStatus)) {
      errors.validStatus = validationErrors.validStatus;
    }

    ValidationHelper.checkValidationErrors(response, errors, next);
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
    if (!ValidationHelper.checkValidId(request, request.params.orderId)) {
      return response.status(406).json({
        statusCode: 406,
        success: false,
        error: validationErrors.validOrderId,
      });
    }
    return next();
  }
}
export default ValidateOrder;
