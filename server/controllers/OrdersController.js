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
   *  @return {Object} json
   */
  static getAllOrders(request, response) {
    return response.status(200).json({
      statusCode: 200,
      message: 'Successfully got all orders',
      orders: data.orders,
    });
  }

  /**
   *  Get a single order using it's id
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   */
  static getOrderById(request, response) {
    let { orderId } = request.params;
    orderId = parseInt(orderId, 10);
    if (orderId > data.orders.length - 1 || orderId < 0) {
      return response.status(404).json({
        statusCode: 404,
        error: 'Sorry! Order not found.',
      });
    }
    return response.status(200).json({
      statusCode: 200,
      message: 'Successfully got order',
      order: data.orders[orderId],
    });
  }

  /**
   *  Post an order
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   */
  static postOrder(request, response) {
    const {
      recipient, recipientEmail, recipientPhoneNumber, recipientAddress, items,
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
    data.orders.push(order);
    return response.status(201).json({
      statusCode: 201,
      message: 'Order placed successfully',
      success: true,
      order,
    });
  }

  /**
   *  Update order status
   *  @param {Object} request
   *  @param {Object} response
   *
   *
   *  @return {Object} json
   */

  static updateOrderStatus(request, response) {
    let { orderId } = request.params;
    const { orderStatus } = request.body;
    orderId = parseInt(orderId, 10);

    if (orderId > data.orders.length - 1 || orderId < 0) {
      return response.status(404).json({
        statusCode: 404,
        error: 'Sorry! Order not found.',
      });
    }

    const currentOrder = data.orders[orderId];
    currentOrder.orderStatus = orderStatus;
    return response.status(202).json({
      statusCode: 202,
      message: 'Order updated successfully',
      success: true,
      currentOrder,
    });
  }
}

export default OrdersController;
