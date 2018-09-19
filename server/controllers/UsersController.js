import data from '../models/index';
import dateTimeHelper from '../helpers/date';

/**
 *    @fileOverview Class to manage users
 *    @class Users Controller
 *    @exports UsersController.js
 *    @requires ../models/index.js
 */
class UsersController {
  /**
   *  Get all orders
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   *
   */
  static signup(request, response) {
    const {
      fullname, email, password, role,
    } = request.body;

    const newUser = {
      userId: data.users.length,
      fullname,
      email,
      password,
      role,
      createdAt: dateTimeHelper.formattedDateTime(new Date()),
    };
    data.users.push(newUser);
    return response.status(201).json({
      statusCode: 201,
      message: 'Account created successfully',
      success: true,
      newUser,
    });
  }
}

export default UsersController;
