import connection from '../helpers/conn';
import passwordHelper from '../helpers/password';
import generateToken from '../helpers/token';
import validationErrors from '../helpers/validationErrors';

const client = connection();
client.connect();
/**
 *    @fileOverview Class to manage users
 *    @class Users Controller
 *    @exports UsersController.js
 *    @requires /..helpers/conn
 *    @requires /..helpers/password
 *    @requires /..helpers/token
 */
class UsersController {
  /**
   *  Signup a user
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   */
  static signup(request, response) {
    const {
      firstName,
      lastName,
      email,
    } = request.body;

    let {
      role,
      password,
    } = request.body;
    role = parseInt(role, 10) || 0;
    password = passwordHelper.passwordHash(password.trim());

    const query = {
      text: 'INSERT INTO users(firstname, lastname, email, role, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      values: [firstName, lastName, email, role, password],
    };
    UsersController.runSignupQuery(request, response, query);
  }

  /**
   *  Run user signup query
   *  @param {Object} request
   *  @param {Object} response
   * @param {String} query
   *  @return {Object} json
   *
   */
  static runSignupQuery(request, response, query) {
    client.query(query)
      .then((dbResult) => {
        const currentToken = generateToken(dbResult.rows[0]);
        process.env.CURRENT_TOKEN = currentToken;
        return response.status(201).json({
          status: 201,
          message: 'Account created successfully',
          success: true,
          token: currentToken,
        });
      })
      .catch();
  }

  /**
   *  Sign in user
   *  @param {Object} requestuest
   *  @param {Object} response
   *  @return {Object} json
   */
  static signIn(request, response) {
    const { email, password } = request.body;
    const query = `SELECT * FROM users WHERE email = '${email}'`;
    client.query(query)
      .then((dbResult) => {
        if (dbResult.rowCount === 0) return UsersController.wrongEmailResponse(response);
        if (!passwordHelper.comparePasswords(password.trim(), dbResult.rows[0].password)) {
          return UsersController.passwordFailureResponse(response);
        }
        const token = generateToken(dbResult.rows[0]);
        process.env.CURRENT_TOKEN = token;
        return UsersController.loginSuccessResponse(response, token);
      }).catch((error) => { response.status(500).send(error); });
  }

  /**
   *  Get all users
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   */
  static getUsers(request, response) {
    const userId = request.token.user.id;
    const query = `SELECT * from users where id != ${userId}`;

    client.query(query)
      .then((dbResult) => {
        if (!dbResult.rows[0]) {
          return response.status(404).json({
            status: 404,
            success: false,
            error: validationErrors.noUsers,
          });
        }
        return UsersController.usersSuccess(response, dbResult);
      })
      .catch((error) => { response.status(500).send(error); });
  }

  /**
   *  Delete users that are not admin
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   */
  static deleteUsers(request, response) {
    const query = 'DELETE from users WHERE role = 0';
    client.query(query)
      .then((dbResult) => {
        if (!dbResult.rowCount) {
          return response.status(404).json({
            status: 404,
            success: false,
            error: validationErrors.noUsers,
          });
        }
        return UsersController.deleteUsersSuccess(response);
      })
      .catch((error) => { response.status(500).send(error); });
  }

  /**
   *  Return delete users success response
   *  @param {Object} response
   *  @param {Object} dbResult
   *  @return {Object} json
   *
   */
  static deleteUsersSuccess(response) {
    return response.status(202).json({
      status: 202,
      success: true,
      message: 'Users deleted successfully',
    });
  }

  /**
   *  Return users success response
   *  @param {Object} response
   *  @param {Object} dbResult
   *  @return {Object} json
   *
   */
  static usersSuccess(response, dbResult) {
    return response.status(200).json({
      status: 200,
      success: true,
      message: 'Successfully got all users',
      users: dbResult.rows,
    });
  }

  /**
   *  return message for non existent email in login
   *  @param {Object} response
   *  @return {Object} json
   */
  static wrongEmailResponse(response) {
    return response.status(404).json({
      statusCode: 404,
      success: false,
      error: validationErrors.noEmail,
    });
  }

  /**
   *  return message for non matching password in login
   *  @param {Object} response
   *  @return {Object} json
   */
  static passwordFailureResponse(response) {
    return response.status(401).json({
      statusCode: 401,
      success: false,
      error: validationErrors.loginFailure,
    });
  }

  /**
   *  return message for successful login
   *  @param {Object} response
   *  @return {Object} json
   */
  static loginSuccessResponse(response, token) {
    return response.status(200).json({
      status: 200,
      success: true,
      message: 'You have been logged in successfully!',
      token,
    });
  }
}

export default UsersController;
