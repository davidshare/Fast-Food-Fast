import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import testData from './testData';
import validationErrors from '../helpers/validationErrors';

const { expect } = chai;
chai.use(chaiHttp);
const mealsURL = '/api/v1/menu';

describe('MEALS CONTROLLER', () => {
  describe('GET /menu endpoint', () => {
    it('It should return an error if no meal is found', (done) => {
      chai.request(app)
        .get(`${mealsURL}`)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal('Could not get menu');
          done();
        });
    });
  });

  describe('POST /menu endpoint', () => {
    it('It should add a meal', (done) => {
      chai.request(app)
        .post(`${mealsURL}`)
        .send(testData.newMeals[0])
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('newMeal');
          expect(response.body.message).to.equal('Meal added successfully');
          done();
        });
    });

    it('it should not add a meal with an empty name', (done) => {
      chai.request(app)
        .post(`${mealsURL}`)
        .send({
          userId: testData.newMeals[0].useId,
          name: '',
          description: testData.newMeals[0].description,
          price: testData.newMeals[0].price,
        })
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.mealRequired).to.equal(validationErrors.mealRequired);
          done();
        });
    });

    it('it should not add a meal with an invalid name', (done) => {
      chai.request(app)
        .post(`${mealsURL}`)
        .send({
          userId: testData.newMeals[0].useId,
          name: '3434rdfdf',
          description: testData.newMeals[0].description,
          price: testData.newMeals[0].price,
        })
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.validMeal).to.equal(validationErrors.validMeal);
          done();
        });
    });

    it('it should not add a meal with name less than 5 characters', (done) => {
      chai.request(app)
        .post(`${mealsURL}`)
        .send({
          userId: testData.newMeals[0].useId,
          name: 'bean',
          description: testData.newMeals[0].description,
          price: testData.newMeals[0].price,
        })
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.mealLength).to.equal(validationErrors.mealLength);
          done();
        });
    });

    it('it should not add a meal with an empty description', (done) => {
      chai.request(app)
        .post(`${mealsURL}`)
        .send({
          userId: testData.newMeals[0].useId,
          name: testData.newMeals[0].name,
          description: '',
          price: testData.newMeals[0].price,
        })
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.descRequired).to.equal(validationErrors.descRequired);
          done();
        });
    });

    it('it should not add a meal with an invalid description', (done) => {
      chai.request(app)
        .post(`${mealsURL}`)
        .send({
          userId: testData.newMeals[0].useId,
          name: testData.newMeals[0].name,
          description: '##$$3443',
          price: testData.newMeals[0].price,
        })
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.validDesc).to.equal(validationErrors.validDesc);
          done();
        });
    });

    it('it should not add a meal with description less than 30 characters', (done) => {
      chai.request(app)
        .post(`${mealsURL}`)
        .send({
          userId: testData.newMeals[0].useId,
          name: testData.newMeals[0].name,
          description: 'description',
          price: testData.newMeals[0].price,
        })
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.descLength).to.equal(validationErrors.descLength);
          done();
        });
    });

    it('it should not add a meal with an empty price', (done) => {
      chai.request(app)
        .post(`${mealsURL}`)
        .send({
          userId: testData.newMeals[0].useId,
          name: testData.newMeals[0].name,
          description: testData.newMeals[0].description,
          price: '',
        })
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.priceRequired).to.equal(validationErrors.priceRequired);
          done();
        });
    });

    it('it should not add a meal with an invalid price', (done) => {
      chai.request(app)
        .post(`${mealsURL}`)
        .send({
          userId: testData.newMeals[0].useId,
          name: testData.newMeals[0].name,
          description: testData.newMeals[0].description,
          price: 'e',
        })
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.validPrice).to.equal(validationErrors.validPrice);
          done();
        });
    });

    it('it should not add a meal with an existing meal name', (done) => {
      chai.request(app)
        .post(`${mealsURL}`)
        .send({
          userId: testData.newMeals[1].userId,
          name: testData.newMeals[0].name,
          description: testData.newMeals[1].description,
          price: 5000,
        })
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error).to.equal(validationErrors.mealExists);
          done();
        });
    });

    it('it should not add a meal with an existing meal description', (done) => {
      chai.request(app)
        .post(`${mealsURL}`)
        .send({
          userId: testData.newMeals[1].userId,
          name: testData.newMeals[1].name,
          description: testData.newMeals[0].description,
          price: testData.newMeals[1].price,
        })
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error).to.equal(validationErrors.mealExists);
          done();
        });
    });
  });

  describe('GET /menu endpoint', () => {
    it('It should get all meals', (done) => {
      chai.request(app)
        .get(`${mealsURL}`)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Menu gotten successfuly');
          done();
        });
    });
  });

  describe('GET /menu/:mealId endpoint', () => {
    it('it should get a meal by its id', (done) => {
      chai.request(app)
        .get(`${mealsURL}/1`)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('meal');
          expect(response.body.message).to.equal('Successfully got meal');
          done();
        });
    });

    it('it should return an error for invalid mealId', (done) => {
      chai.request(app)
        .get(`${mealsURL}/e`)
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.validMealId);
          done();
        });
    });

    it('it should return an error if mealId does not exist', (done) => {
      chai.request(app)
        .get(`${mealsURL}/10`)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.noMeal);
          done();
        });
    });
  });
});
