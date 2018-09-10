const routes = (app) => {
  // GET routes
  app.get('/', (request, response) => response.status(200).send({
    statusCode: 200,
    success: true,
    message: 'Welcome to Fast-Food-Fast',
  }));
};
export default routes;
