import connection from '../helpers/conn';
import validationErrors from '../helpers/validationErrors';

const client = connection();
client.connect();
/**
 *    @fileOverview Class to manage ordeimport { join } from 'path';
rs
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
    const query = 'SELECT * from orders';

    client.query(query)
      .then((dbResult) => {
        if (!dbResult.rows[0]) {
          return response.status(404).json({
            status: 404,
            success: false,
            error: validationErrors.noOrder,
          });
        }
        return OrdersController.allOrdersSuccess(response, dbResult);
      })
      .catch();
  }

  /**
   *  Return all orders success response
   *  @param {Object} response
   *  @param {Object} dbResult
   *  @return {Object} json
   *
   */
  static allOrdersSuccess(response, dbResult) {
    return response.status(200).json({
      status: 200,
      success: true,
      message: 'Successfully got all orders',
      orders: dbResult.rows,
    });
  }

  /**
   *  Get order by orderId
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   */
  static getOrderById(request, response) {
    const { orderId } = request.params;
    const query = `SELECT * from orders WHERE id=${orderId}`;
    client.query(query)
      .then((dbResult) => {
        if (!dbResult.rows[0]) {
          return response.status(404).json({
            status: 404,
            success: false,
            error: validationErrors.noOrder,
          });
        }
        return OrdersController.oneOrdersSuccess(response, dbResult);
      })
      .catch();
  }

  /**
   *  Return one order success response
   *  @param {Object} response
   *  @param {Object} dbResult
   *  @return {Object} json
   *
   */
  static oneOrdersSuccess(response, dbResult) {
    return response.status(200).json({
      status: 200,
      success: true,
      message: 'Successfully got order',
      order: dbResult.rows[0],
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
      recipient,
      recipientEmail,
      recipientPhoneNumber,
      recipientAddress,
      items,
    } = request.body;
    const userId = 1;

    const {
      baseQuery,
      totalQuantity,
      totalPrice,
    } = OrdersController.generateItemsQuery(items);

    const query = `WITH new_recipient AS (
      insert into users (fullname, email, phone, address, status) 
      values ('${recipient}', '${recipientEmail}', ${recipientPhoneNumber}, '${recipientAddress}', 0)
      returning id as recipient_id
    ),    
    new_order AS(
      insert into orders(user_id, recipient_id, items, quantity, total_cost, status)
      values(${userId}, (select * from new_recipient), ${items.length}, ${totalQuantity}, ${totalPrice}, 'pending')
      returning id as order_id
    )
    ${baseQuery}`;

    OrdersController.runPlaceOrderQuery(response, query);
  }

  /**
   *  Run user signup query
   *  @param {Object} request
   *  @param {Object} response
   * @param {String} query
   *  @return {Object} json
   *
   */
  static runPlaceOrderQuery(response, query) {
    client.query(query)
      .then(dbResult => response.status(201).json({
        status: 201,
        message: 'Order placed successfully',
        success: true,
        order: dbResult.rows[0],
      }))
      .catch();
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
    const { orderId } = request.params;
    const { orderStatus } = request.body;
    const query = `UPDATE orders set status = '${orderStatus}' WHERE id=${orderId} RETURNING *`;

    client.query(query)
      .then((dbResult) => {
        if (!dbResult.rows[0]) {
          return response.status(404).json({
            status: 404,
            success: false,
            error: validationErrors.noOrder,
          });
        }
        return OrdersController.updateOrderSuccess(response, dbResult);
      })
      .catch();
  }

  /**
   *  Return update order status response
   *  @param {Object} response
   *  @param {Object} dbResult
   *  @return {Object} json
   *
   */
  static updateOrderSuccess(response, dbResult) {
    return response.status(202).json({
      status: 202,
      success: true,
      message: 'Order updated successfully',
      order: dbResult.rows[0],
    });
  }

  /**
   *  get order history for specific user
   *  @param {Object} requestuest
   *  @param {Object} response
   *  @return {Object} json
   */
  static getOrdersHistory(request, response) {
    const { userId } = request.params;
    const query = `SELECT * FROM orders WHERE user_id = ${userId}`;
    client.query(query)
      .then((dbResult) => {
        if (dbResult.rowCount === 0) {
          return response.status(404).json({
            status: 404,
            success: false,
            error: validationErrors.noOrder,
          });
        }
        return OrdersController.historySuccessResponse(response, dbResult);
      }).catch();
  }

  /**
   *  return message for successful order history
   *  @param {Object} response
   *  @return {Object} json
   */
  static historySuccessResponse(response, dbResult) {
    return response.status(200).json({
      status: 200,
      success: true,
      message: 'Successfully got orders',
      orders: dbResult.rows,
    });
  }

  static generateItemsQuery(items) {
    const queryArray = [];
    let totalQuantity = 0;
    let totalPrice = 0;
    let baseQuery = 'insert into items(order_id, item, quantity, price, total) values';
    items.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.total;
      const query = `((select * from new_order), '${item.item}', ${item.quantity}, ${item.price}, ${item.total})`;
      queryArray.push(query);
    });
    baseQuery = `${baseQuery} ${queryArray.join(', ')} RETURNING *;`;
    return { baseQuery, totalQuantity, totalPrice };
  }
}

export default OrdersController;
