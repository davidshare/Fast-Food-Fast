import data from '../models/index';

/**
 *    @fileOverview Class to manage orders
 *    @class Orders Controller
 *    @exports OrdersController
 *    @requires ../models/index.js
 */
class OrdersController {
  /**
   *  Get all orders
   *  @param {Object} request
   *  @param {Object} response
   *
   *
   *  @return {Object} json
   */
  static getAllOrders(request, response) {
    return response.status(200).json({
      statusCode: 200,
      message: 'Successfully got orders',
      orders: data.orders,
    });
  }
}

export default OrdersController;
