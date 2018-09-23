import OrdersController from '../controllers/OrdersController';
import UsersController from '../controllers/UsersController';
import MealsController from '../controllers/MealsController';
import ValidateOrder from '../middleware/orderValidator';
import ValidateUser from '../middleware/userValidator';
import ValidateMeals from '../middleware/mealValidator';

/**
 * @fileOverview index file for routes - it hosts all routes
 * @requires OrdersController
 * @requires ../controllsers/OrdersController
 * @requires ../controllers/UsersController
 * @requires ../middleware/orderValidator
 * @requires ../middleware/userValidator
 * @requires ../middleware/mealValidator
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
  app.get('/api/v1/orders/:orderId', ValidateOrder.validateOrderId, OrdersController.getOrderById);
  app.get('/api/v1/menu/:mealId', ValidateMeals.validateMealId, MealsController.getMealById);
  app.get('/api/v1/menu', MealsController.getMenu);

  app.post('/api/v1/auth/signup', ValidateUser.validateSignup, ValidateUser.checkDuplicateEmail, UsersController.signup);
  app.post('/api/v1/menu', ValidateMeals.validateMeal, MealsController.addMeal);
  app.post('/api/v1/orders', ValidateOrder.validateOrder, OrdersController.postOrder);

  app.put('/api/v1/orders/:orderId', ValidateOrder.validateOrderStatus, OrdersController.updateOrderStatus);
};
export default routes;
