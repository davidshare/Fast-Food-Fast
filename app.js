// import modules
import Express from 'express';
import bodyParser from 'body-parser';
import routes from './server/routes';


// declare constants
const app = new Express();
const port = process.env.PORT || 3000;

// declare middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

routes(app);

// declare 404 route
app.all('*', (req, res) => res.status(404).json({
  statusCode: 404,
  message: 'The URL you are trying to access does not exist. Please enter a valid url',
}));

// listen to app port
app.listen(port, () => console.log(`App listening on port ${port}`));

export default app;
