import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import testData from './testData';

const { expect } = chai;
chai.use(chaiHttp);
const ordersURL = '/api/v1/orders';

describe('ORDERS CONTROLLER ', () => {
  describe('GET /orders endpoint', () => {
    it('it should get all orders', (done) => {
      chai.request(app)
        .get(`${ordersURL}`)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('orders');
          expect(response.body.message).to.equal('Successfully got all orders');
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

  describe('GET /orders/:orderId endpoint', () => {
    it('it should get an order by its id', (done) => {
      chai.request(app)
        .get(`${ordersURL}/1`)
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
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal('Please the orderId must be a number greater than zero');
          done();
        });
    });

    it('it should return an error for order an order not found', (done) => {
      chai.request(app)
        .get(`${ordersURL}/10`)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal('Sorry! Order not found.');
          done();
        });
    });
  });

  describe('POST /orders endpoint', () => {
    it('it should place a valid order', (done) => {
      chai.request(app)
        .post(`${ordersURL}`)
        .send(testData.newOrders[1])
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
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.recipientRequired).to.equal('Sorry! the full name field is required');
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
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.recipientLength).to.equal('Sorry your fullname cannot be less than 8 characters and must contain a space');
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
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.validRecipient).to.equal('Please enter a valid full name. Your full name can only contain letters and spaces');
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
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.addressRequired).to.equal('Sorry! the Address field is required');
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
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.addressLength).to.equal('Sorry your address cannot be less than 10 characters');
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
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.validAddress).to.equal('Please enter a valid Address');
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
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.emailRequired).to.equal('Sorry! the Email field is required');
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
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.validEmail).to.equal('Please enter a valid email address');
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
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.phoneRequired).to.equal('Sorry! the phone number field is required');
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
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.validNumber).to.equal('Please your phone number can only contain numbers and cannot be greater than 15 or less than 8 characters');
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
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.itemsEmpty).to.equal('Sorry! your order is invalid. You did not pick any items?');
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
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.validItems).to.equal('Sorry the items are invalid. Valid items must be objects.');
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
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(response.body.error.itemErrors[0]).to.equal('The quantity of an item must be a number greater than zero');
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
        .end((error, response) => {
          expect(response).to.have.status(202);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('currentOrder');
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
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body.error.validId).to.equal('Please the orderId must be a number greater than zero');
          done();
        });
    });

    it('it should not update the status of an order with invalid status', (done) => {
      chai.request(app)
        .put(`${ordersURL}/1`)
        .send({
          orderStatus: 'any status',
        })
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body.error.validStatus).to.equal('Please enter a valid status. The status can only be Canceled or Declined or Accepted or Completed');
          done();
        });
    });
  });
});
