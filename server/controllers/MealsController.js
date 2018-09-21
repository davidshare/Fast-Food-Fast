import connection from '../helpers/conn';
import validationErrors from '../helpers/validationErrors';

const client = connection();
client.connect();
/**
 *    @fileOverview Class to manage Meal functions
 *    @class MealsController
 *    @exports MealsController
 *    @requires /..helpers/conn
 */
class MealsController {
  /**
   *  add a meal
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   *
   */
  static addMeal(request, response) {
    const {
      userId,
      name,
      description,
      price,
    } = request.body;

    const query = {
      text: 'INSERT INTO meals(name, description, price, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      values: [name, description, price, userId],
    };
    MealsController.runAddMealQuery(response, query);
  }

  /**
   *  Run user signup query
   *  @param {Object} request
   *  @param {Object} response
   * @param {String} query
   *  @return {Object} json
   *
   */
  static runAddMealQuery(response, query) {
    client.query(query)
      .then((dbResult) => {
        if (dbResult.rowCount === 0) {
          return response.status(406).json({
            statusCode: 406,
            success: false,
            error: 'Could not add the meal!',
          });
        }
        return MealsController.mealsSuccess(response, dbResult);
      })
      .catch((error) => {
        response.status(406).send({
          status: 400,
          success: false,
          error: validationErrors.mealExists,
          dbError: error.stack,
        });
      });
  }

  /**
   *  Return meal success response
   *  @param {Object} response
   *  @param {Object} dbResult
   *  @return {Object} json
   *
   */
  static mealsSuccess(response, dbResult) {
    return response.status(201).json({
      status: 201,
      message: 'Meal added successfully',
      success: true,
      newMeal: dbResult.rows[0],
    });
  }

  /**
   *  Get menu
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   */
  static getMenu(request, response) {
    const query = 'SELECT * from meals';

    client.query(query)
      .then((dbResult) => {
        if (!dbResult.rows[0]) {
          return response.status(404).json({
            statusCode: 404,
            success: false,
            error: 'Could not get menu',
          });
        }
        return MealsController.menuSuccess(response, dbResult);
      })
      .catch((error) => {
        response.status(500).send({
          statusCode: 500,
          success: false,
          error: error.stack,
        });
      });
  }

  /**
   *  Return menu success response
   *  @param {Object} response
   *  @param {Object} dbResult
   *  @return {Object} json
   *
   */
  static menuSuccess(response, dbResult) {
    return response.status(200).json({
      status: 200,
      message: 'Menu gotten successfuly',
      success: true,
      menu: dbResult.rows,
    });
  }
}

export default MealsController;