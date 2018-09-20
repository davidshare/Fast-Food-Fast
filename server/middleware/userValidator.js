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
      fullname,
      email,
      password,
    } = request.body;
    const userErrors = ValidationHelper.validateUser(fullname, email);

    let { role } = request.body;
    let errors = {};

    if (!password || !rules.empty.test(password)) {
      errors.passwordEmpty = validationErrors.passwordEmpty;
    }
    if (!rules.validPassword.test(password)) errors.validPassword = validationErrors.validPassword;
    if (!rules.passwordLength.test(password)) {
      errors.passwordLength = validationErrors.passwordLength;
    }

    role = parseInt(role, 10);
    if (role !== 0 && role !== 1 && role !== 2) errors.validRole = validationErrors.validRole;

    errors = Object.assign(errors, userErrors);
    ValidationHelper.checkValidationErrors(response, errors, next);
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
      }).catch((error) => {
        response.status(500).send(error.message);
      });
  }
}

export default ValidateUser;
