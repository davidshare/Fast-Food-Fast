import OrdersController from '../controllers/OrdersController';

/**
 * @fileOverview index file for routes - it hosts all routes
 * @requires OrdersController
 * @requires ../controllsers/OrdersController
 * @param {object} app
 * @exports routes What is exported
 */

const routes = (app) => {
  app.get('/', (request, response) => response.status(200).send({
    statusCode: 200,
    success: true,
    message: 'Welcome to Fast-Food-Fast',
  }));

  app.get('/api/v1/orders', OrdersController.getAllOrders);
  app.get('/api/v1/orders/:orderId', OrdersController.getOrderById);
};
export default routes;
