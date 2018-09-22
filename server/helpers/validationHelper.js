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
  static validateUser(name, email) {
    const errors = {};
    if (!name || !rules.empty.test(name)) errors.nameRequired = validationErrors.nameRequired;
    if (!rules.nameLength.test(name)) errors.nameLength = validationErrors.nameLength;
    if (!rules.validName.test(name)) errors.validName = validationErrors.validName;

    if (!email || !rules.empty.test(email)) errors.emailRequired = validationErrors.emailRequired;
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
        statusCode: 406,
        success: false,
        error: errors,
      });
    }
    return next();
  }
}
export default ValidateHelper;
