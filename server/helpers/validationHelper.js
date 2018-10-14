import rules from './validationRules';
import validationErrors from './validationErrors';

/**
 *    @fileOverview Class to hold general validation methods
 *    @class ValidationHelper
 *    @exports ValidationHelper
 */

class ValidateHelper {
  /**
   * validate user email and name
   * @param {String} name
   * @param {String} email
   * @return {Object} errors
   */
  static validateUser(firstName, lastName, email, isSignup) {
    const errors = {};
    if (!firstName || !rules.empty.test(firstName)) {
      errors.fnameRequired = validationErrors.fnameRequired;
    }
    if (!rules.nameLength.test(firstName)) errors.nameLength = validationErrors.nameLength;
    if (!rules.validName.test(firstName)) errors.validName = validationErrors.validName;

    if (!lastName || !rules.empty.test(lastName)) {
      errors.lnameRequired = validationErrors.lnameRequired;
    }
    if (!rules.nameLength.test(lastName)) errors.lnameLength = validationErrors.lnameLength;
    if (!rules.validName.test(lastName)) errors.validLName = validationErrors.validLName;

    if ((!email || !rules.empty.test(email)) && isSignup) errors.emailRequired = validationErrors.emailRequired;
    if (!rules.validEmail.test(email)) errors.validEmail = validationErrors.validEmail;
    return errors;
  }

  /**
   * check if id is valid
   * @param {Object} request
   * @return {boolean} true
   */
  static checkValidId(request, id) {
    const validId = /^[1-9]{1,}/;
    if (!validId.test(id)) {
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
        status: 406,
        success: false,
        error: errors,
      });
    }
    return next();
  }
}
export default ValidateHelper;
