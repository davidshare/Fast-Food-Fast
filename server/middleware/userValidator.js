import connection from '../helpers/conn';
import rules from '../helpers/validationRules';
import validationErrors from '../helpers/validationErrors';
import ValidationHelper from '../helpers/validationHelper';

const client = connection();
client.connect();

/**
 *    @fileOverview Class to validate user signup inputr
 *    @class ValidateUser
 *    @exports ValidateUser
 */

class ValidateUser {
  /**
   * validate signup input
   * @param {Object} request
   * @param {Object} response
   * @callback {Function} next
   * @return {String} errors
   */

  static validateSignup(request, response, next) {
    const {
      firstName,
      lastName,
      email,
      password,
    } = request.body;
    const userErrors = ValidationHelper.validateUser(firstName, lastName, email, true);

    let errors = {};

    if (!password || !rules.empty.test(password)) {
      errors.passwordEmpty = validationErrors.passwordEmpty;
    }
    if (!rules.validPassword.test(password)) errors.validPassword = validationErrors.validPassword;
    if (!rules.passwordLength.test(password)) {
      errors.passwordLength = validationErrors.passwordLength;
    }

    errors = Object.assign(errors, userErrors);
    ValidationHelper.checkValidationErrors(response, errors, next);
  }

  /**
   * validate user signin input length and content
   * @param {Object} request
   * @param {Object} response
   *
   * @callback {Function} next
   *
   * @return {Object} json
   */
  static validateSignin(request, response, next) {
    const {
      email,
      password,
    } = request.body;

    if (email && password) {
      const errors = {};

      if (!rules.validEmail.test(email)) errors.validEmail = validationErrors.validEmail;

      if (Object.keys(errors).length > 0) {
        return response.status(406).json({
          statusCode: 406,
          success: false,
          error: errors,
        });
      }
      return next();
    }
    return ValidateUser.loginRequiredResponse(response);
  }

  static loginRequiredResponse(response) {
    return response.status(406).json({
      statusCode: 406,
      success: false,
      error: validationErrors.loginRequired,
    });
  }

  /**
   * check if user email already exists
   * @param {String} email
   * @return {object}
   */
  static checkDuplicateEmail(request, response, next) {
    const query = `SELECT email FROM users WHERE email ='${request.body.email}'`;
    client.query(query)
      .then((dbResult) => {
        if (dbResult.rows[0]) {
          return response.status(406)
            .json({
              status: 406,
              error: validationErrors.emailExists,
              success: false,
            });
        }
        return next();
      }).catch();
  }

  /**
   * validate userId
   * @param {Object} request
   * @param {Object} response
   *
   * @callback {Function} next
   *
   * @return {Object} json
   */
  static validateUserId(request, response, next) {
    if (!ValidationHelper.checkValidId(request, request.params.userId)) {
      return response.status(406).json({
        statusCode: 406,
        success: false,
        error: validationErrors.validUserId,
      });
    }
    return next();
  }
}

export default ValidateUser;
