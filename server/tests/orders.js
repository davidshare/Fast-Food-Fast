import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import testData from './testData';
import validationErrors from '../helpers/validationErrors';

const { expect } = chai;
chai.use(chaiHttp);
const ordersURL = '/api/v1/orders';
const loginURL = '/api/v1/auth/login';
const signupURL = '/api/v1/auth/signup';

let currentToken;

describe('HOME ROUTE', () => {
  it('it should take users to the landing page', (done) => {
    chai.request(app)
      .get('/')
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Welcome to Fast-Food-Fast');
        done();
      });
  });

  it('it should return an error for invalid url', (done) => {
    chai.request(app)
      .get('/api/v1/fakeorders')
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        done();
      });
  });
});
describe('GET /orders endpoint', () => {
  before((done) => {
    chai.request(app)
      .post(`${loginURL}`)
      .send(testData.newUsers[3])
      .end((error, response) => {
        currentToken = response.body.token;
        done();
      });
  });
  it('It should return an error if no order is found', (done) => {
    chai.request(app)
      .get(`${ordersURL}`)
      .set('token', currentToken)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body.error).to.equal(validationErrors.noOrder);
        done();
      });
  });
});
describe('ORDERS CONTROLLER ', () => {
  before((done) => {
    chai.request(app)
      .post(`${signupURL}`)
      .send(testData.newUsers[0])
      .end((error, response) => {
        currentToken = response.body.token;
        done();
      });
  });

  describe('POST /orders endpoint', () => {
    it('it should place a valid order', (done) => {
      chai.request(app)
        .post(`${ordersURL}`)
        .send(testData.newOrders[1])
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('order');
          expect(response.body.message).to.equal('Order placed successfully');
          done();
        });
    });

    /**
     * Test for recipent fullname
     */

    it('it should not place an order with  empty recipient', (done) => {
      chai.request(app)
        .post(`${ordersURL}`)
        .send({
          recipient: '',
          recipientEmail: 'faithgem@gmail.com',
          recipientPhoneNumber: '08138463582',
          recipientAddress: 'Andela Epic tower Lagos',
          items: [
            {
              itemId: 1,
              item: 'Abak soup and semovita',
              price: 3500,
              quantity: 2,
              total: 700,
            },
          ],
        })
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.nameRequired).to.equal(validationErrors.nameRequired);
          done();
        });
    });

    it('it should not place an order with recipient fullname less than 8 characters', (done) => {
      chai.request(app)
        .post(`${ordersURL}`)
        .send({
          recipient: 'David',
          recipientEmail: 'faithgem@gmail.com',
          recipientPhoneNumber: '08138463582',
          recipientAddress: 'Andela Epic tower Lagos',
          items: [
            {
              itemId: 1,
              item: 'Abak soup and semovita',
              price: 3500,
              quantity: 2,
              total: 700,
            },
          ],
        })
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.nameLength).to.equal(validationErrors.nameLength);
          done();
        });
    });

    it('it should not place an order with invalid recipient', (done) => {
      chai.request(app)
        .post(`${ordersURL}`)
        .send({
          recipient: '2 David korfi',
          recipientEmail: 'faithgem@gmail.com',
          recipientPhoneNumber: '08138463582',
          recipientAddress: 'Andela Epic tower Lagos',
          items: [
            {
              itemId: 1,
              item: 'Abak soup and semovita',
              price: 3500,
              quantity: 2,
              total: 700,
            },
          ],
        })
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.validName).to.equal(validationErrors.validName);
          done();
        });
    });

    /**
     * Test for recipent address
     */

    it('it should not place an order with  empty recipient address', (done) => {
      chai.request(app)
        .post(`${ordersURL}`)
        .send({
          recipient: 'David Essien',
          recipientEmail: 'faithgem@gmail.com',
          recipientPhoneNumber: '08138463582',
          recipientAddress: '',
          items: [
            {
              itemId: 1,
              item: 'Abak soup and semovita',
              price: 3500,
              quantity: 2,
              total: 700,
            },
          ],
        })
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.addressRequired).to.equal(validationErrors.addressRequired);
          done();
        });
    });

    it('it should not place an order with recipient address less than 10 characters', (done) => {
      chai.request(app)
        .post(`${ordersURL}`)
        .send({
          recipient: 'David Essien',
          recipientEmail: 'faithgem@gmail.com',
          recipientPhoneNumber: '08138463582',
          recipientAddress: 'Andela',
          items: [
            {
              itemId: 1,
              item: 'Abak soup and semovita',
              price: 3500,
              quantity: 2,
              total: 7000,
            },
          ],
        })
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.addressLength).to.equal(validationErrors.addressLength);
          done();
        });
    });

    it('it should not place an order with invalid address', (done) => {
      chai.request(app)
        .post(`${ordersURL}`)
        .send({
          recipient: 'David Essien',
          recipientEmail: 'faithgem@gmail.com',
          recipientPhoneNumber: '08138463582',
          recipientAddress: '9999999999999$%##',
          items: [
            {
              itemId: 1,
              item: 'Abak soup and semovita',
              price: 3500,
              quantity: 2,
              total: 700,
            },
          ],
        })
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.validAddress).to.equal(validationErrors.validAddress);
          done();
        });
    });

    /**
     * Test for recipent email address
     */

    it('it should not place an order with  empty email address', (done) => {
      chai.request(app)
        .post(`${ordersURL}`)
        .send({
          recipient: 'David Essien',
          recipientEmail: '',
          recipientPhoneNumber: '08138463582',
          recipientAddress: 'Andela Epic Tower',
          items: [
            {
              itemId: 1,
              item: 'Abak soup and semovita',
              price: 3500,
              quantity: 2,
              total: 700,
            },
          ],
        })
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.emailRequired).to.equal(validationErrors.emailRequired);
          done();
        });
    });

    it('it should not place an order with invalid email address', (done) => {
      chai.request(app)
        .post(`${ordersURL}`)
        .send({
          recipient: 'David Essien',
          recipientEmail: 'faithgem@gmail',
          recipientPhoneNumber: '08138463582',
          recipientAddress: 'Andela Epic Tower',
          items: [
            {
              itemId: 1,
              item: 'Abak soup and semovita',
              price: 3500,
              quantity: 2,
              total: 700,
            },
          ],
        })
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.validEmail).to.equal(validationErrors.validEmail);
          done();
        });
    });

    /**
     * Test for recipent phone number
     */

    it('it should not place an order with  empty phone number', (done) => {
      chai.request(app)
        .post(`${ordersURL}`)
        .send({
          recipient: 'David Essien',
          recipientEmail: 'davidessienshare@gmail.com',
          recipientPhoneNumber: '',
          recipientAddress: 'Andela Epic Tower',
          items: [
            {
              itemId: 1,
              item: 'Abak soup and semovita',
              price: 3500,
              quantity: 2,
              total: 700,
            },
          ],
        })
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.phoneRequired).to.equal(validationErrors.phoneRequired);
          done();
        });
    });

    it('it should not place an order with invalid phone number', (done) => {
      chai.request(app)
        .post(`${ordersURL}`)
        .send({
          recipient: 'David Essien',
          recipientEmail: 'faithgem@gmail',
          recipientPhoneNumber: '6358bbc2',
          recipientAddress: 'Andela Epic Tower',
          items: [
            {
              itemId: 1,
              item: 'Abak soup and semovita',
              price: 3500,
              quantity: 2,
              total: 700,
            },
          ],
        })
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.validNumber).to.equal(validationErrors.validNumber);
          done();
        });
    });


    /**
     * Test for orders
     */

    it('it should not place an order with  empty items', (done) => {
      chai.request(app)
        .post(`${ordersURL}`)
        .send({
          recipient: 'David Essien',
          recipientEmail: 'davidessienshare@gmail.com',
          recipientPhoneNumber: '08138463582',
          recipientAddress: 'Andela Epic Tower',
          items: [],
        })
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.itemsEmpty).to.equal(validationErrors.itemsEmpty);
          done();
        });
    });

    it('it should not place an order with invalid order items', (done) => {
      chai.request(app)
        .post(`${ordersURL}`)
        .send({
          recipient: 'David Essien',
          recipientEmail: 'faithgem@gmail',
          recipientPhoneNumber: '08138463582',
          recipientAddress: 'Andela Epic Tower',
          items: ['david'],
        })
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.validItems).to.equal(validationErrors.validItems);
          done();
        });
    });

    it('it should not place an order with invalid item quantity', (done) => {
      chai.request(app)
        .post(`${ordersURL}`)
        .send({
          recipient: 'David Essien',
          recipientEmail: 'faithgem@gmail',
          recipientPhoneNumber: '6358bbc2',
          recipientAddress: 'Andela Epic Tower',
          items: [
            {
              itemId: 1,
              item: 'Abak soup and semovita',
              price: 3500,
              quantity: 'e',
              total: 700,
            },
          ],
        })
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.itemErrors[0]).to.equal(validationErrors.quantityError);
          done();
        });
    });

    it('It should not place an order if the user is not authenticated', (done) => {
      chai.request(app)
        .post(`${ordersURL}`)
        .send(testData.newOrders[1])
        .set('token', 'currentToken')
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error).to.equal(validationErrors.notAuthenticated);
          done();
        });
    });
  });

  describe('GET /orders endpoint', () => {
    before((done) => {
      chai.request(app)
        .post(`${loginURL}`)
        .send(testData.newUsers[3])
        .end((error, response) => {
          currentToken = response.body.token;
          done();
        });
    });

    it('it should get all orders', (done) => {
      chai.request(app)
        .get(`${ordersURL}`)
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('orders');
          expect(response.body.message).to.equal('Successfully got all orders');
          done();
        });
    });
  });

  describe('GET /orders/:orderId endpoint', () => {
    it('it should get an order by its id', (done) => {
      chai.request(app)
        .get(`${ordersURL}/1`)
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('order');
          expect(response.body.message).to.equal('Successfully got order');
          done();
        });
    });

    it('it should return an error for invalid orderId', (done) => {
      chai.request(app)
        .get(`${ordersURL}/e`)
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.validOrderId);
          done();
        });
    });

    it('it should return an error for order an order not found', (done) => {
      chai.request(app)
        .get(`${ordersURL}/10`)
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.noOrder);
          done();
        });
    });
  });

  describe('GET /api/v1/users/<userId>/orders endpoint', () => {
    it('it should get all orders for a particular user', (done) => {
      chai.request(app)
        .get('/api/v1/users/3/orders')
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('orders');
          expect(response.body.message).to.equal('Successfully got orders');
          done();
        });
    });

    it('it should return an error for invalid id', (done) => {
      chai.request(app)
        .get('/api/v1/users/e/orders')
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.validUserId);
          done();
        });
    });

    it('it should return an error for order an order not found', (done) => {
      chai.request(app)
        .get('/api/v1/users/10/orders')
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.noUserOrder);
          done();
        });
    });
  });

  describe('PUT /orders/:orderId endpoint', () => {
    it('it should update the status of an order', (done) => {
      chai.request(app)
        .put(`${ordersURL}/1`)
        .send({
          orderStatus: 'Canceled',
        })
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(202);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('order');
          expect(response.body.message).to.equal('Order updated successfully');
          done();
        });
    });

    it('it should not update the status of an order with invalid id', (done) => {
      chai.request(app)
        .put(`${ordersURL}/e`)
        .send({
          orderStatus: 'Canceled',
        })
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body.error.validOrderId).to.equal(validationErrors.validOrderId);
          done();
        });
    });

    it('it should return an error for update of non existent orders', (done) => {
      chai.request(app)
        .put(`${ordersURL}/10`)
        .send({
          orderStatus: 'Canceled',
        })
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.noOrderId);
          done();
        });
    });

    it('it should not update the status of an order with invalid status', (done) => {
      chai.request(app)
        .put(`${ordersURL}/1`)
        .send({
          orderStatus: 'any status',
        })
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body.error.validStatus).to.equal(validationErrors.validStatus);
          done();
        });
    });
  });
});
