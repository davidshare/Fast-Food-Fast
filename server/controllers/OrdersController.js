import data from '../models/index';
import dateTimeHelper from '../helpers/date';

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

  /**
   *  Get a single order using it's id
   *  @param {Object} request
   *  @param {Object} response
   *
   *
   *  @return {Object} json
   */
  static getOrderById(request, response) {
    const { orderId } = request.params;
    if (parseInt(orderId, 10) > data.orders.length - 1 || parseInt(orderId, 10) < 0) {
      return response.status(404).json({
        statusCode: 404,
        error: 'Sorry! Order not found.',
      });
    }
    if (orderId && parseInt(orderId, 10)) {
      return response.status(200).json({
        statusCode: 200,
        message: 'Successfully got order',
        orders: data.orders[orderId],
      });
    }
    return response.status(400).json({
      statusCode: 400,
      error: 'Error getting order. The orderId must be an integer.',
    });
  }

  /**
   *  Post an order
   *  @param {Object} request
   *  @param {Object} response
   *
   *
   *  @return {Object} json
   */
  static postOrder(request, response) {
    const {
      recipient,
      recipientEmail,
      recipientPhoneNumber,
      recipientAddress,
      items,
    } = request.body;

    const order = {
      orderId: data.orders.length,
      status: 'Pending',
      recipient,
      recipientPhoneNumber,
      recipientEmail,
      recipientAddress,
      items,
      dateTimeOrder: dateTimeHelper.formattedDateTime(new Date()),
      dateTimeDelivery: dateTimeHelper.formattedDateTime(new Date()),
    };
    if (data.orders.push(order)) {
      response.status(201).json({
        statusCode: 201,
        message: 'Order placed successfully',
        success: true,
        order,
      });
    }
    return response.status(400).json({
      statusCode: 400,
      error: 'Sorry! Could not place the order',
    });
  }
}

export default OrdersController;
