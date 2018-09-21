import connection from '../helpers/conn';
import passwordHelper from '../helpers/password';
import generateToken from '../helpers/token';

const client = connection();
client.connect();
/**
 *    @fileOverview Class to manage users
 *    @class Users Controller
 *    @exports UsersController.js
 *    @requires /..helpers/conn
 *    @requires /..helpers/password
 *    @requires /..helpers/token
 *    
 * 
 */
class UsersController {
  /**
   *  Signup a user
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   *
   */
  static signup(request, response) {
    const {
      fullname,
      email,
    } = request.body;

    let {
      role,
      password,
    } = request.body;
    role = role || 0;
    password = passwordHelper.passwordHash(password.trim());

    const query = {
      text: 'INSERT INTO users(fullname, email, role, password) VALUES ($1, $2, $3, $4) RETURNING *',
      values: [fullname, email, role, password],
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
        if (dbResult.rowCount === 0) {
          return response.status(406).json({
            statusCode: 406,
            success: false,
            error: 'Could not create account!',
          });
        }
        const currentToken = generateToken(dbResult.rows[0]);
        return UsersController.signupSuccess(response, dbResult, currentToken);
      })
      .catch((error) => {
        response.status(500).send({
          status: 500,
          success: false,
          error: error.stack,
        });
      });
  }

  /**
   *  Return user signup response
   *  @param {Object} response
   *  @param {Object} dbResult
   *  @param {String} currentToken
   *  @return {Object} json
   *
   */
  static signupSuccess(response, dbResult, currentToken) {
    return response.status(201).json({
      status: 201,
      message: 'Account created successfully',
      success: true,
      token: currentToken,
    });
  }
}

export default UsersController;
