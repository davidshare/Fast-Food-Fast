import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import testData from './testData';
import validationErrors from '../helpers/validationErrors';

const { expect } = chai;
const signupURL = '/api/v1/auth/signup';
const loginURL = '/api/v1/auth/login';
const usersURL = '/api/v1/users';
let currentToken;

chai.use(chaiHttp);

describe('USER CONTROLLER ', () => {
  describe('POST /api/v1/auth/signup', () => {
    it('it should register a user with correct and complete information', (done) => {
      chai.request(app)
        .post(`${signupURL}`)
        .send(testData.newUsers[0])
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Account created successfully');
          done();
        });
    });

    it('should not register a user with an empty full name field', (done) => {
      chai.request(app)
        .post(`${signupURL}`)
        .send({
          fullname: '',
          email: 'kspeedo@gmail.com',
          role: 0,
          password: 'kspeed230',
        })
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body.error.nameRequired).to.equal(validationErrors.nameRequired);
          expect(response.body.success).to.equal(false);
          done();
        });
    });

    it('should not register a user with fullname less than 10 characters', (done) => {
      chai.request(app)
        .post(`${signupURL}`)
        .send({
          fullname: 'Korfi',
          email: 'kspeeded@gm.com',
          role: 0,
          password: 'kspeed230',
        })
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body.error).to.be.an('object');
          expect(response.body.error.nameLength).to.equal(validationErrors.nameLength);
          expect(response.body.success).to.equal(false);
          done();
        });
    });

    it('should not register a user with an invalid full name', (done) => {
      chai.request(app)
        .post(`${signupURL}`)
        .send({
          fullname: '2Korfi #Essien',
          username: 'kspeed',
          email: 'kspeed@gmail.com',
          password: 'kspeed230',
        })
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body.error.validName).to.equal(validationErrors.validName);
          expect(response.body.success).to.equal(false);
          done();
        });
    });

    it('should not register a user with an existing email address', (done) => {
      chai.request(app)
        .post(`${signupURL}`)
        .send(testData.newUsers[0])
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.emailExists);
          expect(response.body.success).to.equal(false);
          done();
        });
    });

    it('should not register a user with an invalid email address', (done) => {
      chai.request(app)
        .post(`${signupURL}`)
        .send({
          fullname: 'Korfi Essien',
          email: 'kspeed@gmail',
          role: 1,
          password: 'kspeed230',
        })
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body.error.validEmail).to.equal(validationErrors.validEmail);
          expect(response.body.success).to.equal(false);
          done();
        });
    });

    it('should not register a user with an empty email address field', (done) => {
      chai.request(app)
        .post(`${signupURL}`)
        .send({
          fullname: 'Korfi Essien',
          email: '',
          role: 0,
          password: 'kspeed230',
        })
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body.error.emailRequired).to.equal(validationErrors.emailRequired);
          expect(response.body.success).to.equal(false);
          done();
        });
    });

    it('should not register a user with password less than 8 characters', (done) => {
      chai.request(app)
        .post(`${signupURL}`)
        .send({
          fullname: 'Korfi Essien',
          username: 'kspeed',
          email: 'ed@gm.com',
          password: 'kspeed',
        })
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body.error).to.be.an('object');
          expect(response.body.error.passwordLength).to.equal(validationErrors.passwordLength);
          expect(response.body.success).to.equal(false);
          done();
        });
    });

    it('should not register a user with an empty password field', (done) => {
      chai.request(app)
        .post(`${signupURL}`)
        .send({
          fullname: 'Korfi Essien',
          username: 'kspeed',
          email: 'ed@gm.com',
          password: '',
        })
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body.error.passwordRequired).to.equal(validationErrors.passwordRequired);
          expect(response.body.success).to.equal(false);
          done();
        });
    });
  });

  describe('POST /api/v1/auth/signin', () => {
    it('it should signin a user with correct and complete information', (done) => {
      chai.request(app)
        .post(`${loginURL}`)
        .send({
          email: testData.newUsers[0].email,
          password: testData.newUsers[0].password,
        })
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('You have been logged in successfully!');
          done();
        });
    });
    it('should not signin a user with an invalid email address', (done) => {
      chai.request(app)
        .post(`${loginURL}`)
        .send({
          email: '@kspeed',
          password: testData.newUsers[0].password,
        })
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body.error.validEmail).to.equal(validationErrors.validEmail);
          expect(response.body.success).to.equal(false);
          done();
        });
    });

    it('should not signin a user without an email address', (done) => {
      chai.request(app)
        .post(`${loginURL}`)
        .send({
          email: '',
          password: testData.newUsers[0].password,
        })
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.loginRequired);
          expect(response.body.success).to.equal(false);
          done();
        });
    });

    it('should not signin a user with an empty password field', (done) => {
      chai.request(app)
        .post(`${loginURL}`)
        .send({
          email: testData.newUsers[0].email,
          password: '',
        })
        .end((error, response) => {
          expect(response).to.have.status(406);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.loginRequired);
          expect(response.body.success).to.equal(false);
          done();
        });
    });

    it('should not signin a user where email and password do not match', (done) => {
      chai.request(app)
        .post(`${loginURL}`)
        .send({
          email: testData.newUsers[0].email,
          password: 'sorrywhatisthis',
        })
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.loginFailure);
          expect(response.body.success).to.equal(false);
          done();
        });
    });

    it('should not signin a user where email does not exist in the database', (done) => {
      chai.request(app)
        .post(`${loginURL}`)
        .send({
          email: 'ebamnjar@gmail.com',
          password: testData.newUsers[1].password,
        })
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.noEmail);
          expect(response.body.success).to.equal(false);
          done();
        });
    });
  });

  describe('GET /users endpoint', () => {
    before((done) => {
      chai.request(app)
        .post(`${loginURL}`)
        .send(testData.newUsers[3])
        .end((error, response) => {
          currentToken = response.body.token;
          done();
        });
    });

    it('it should get all users', (done) => {
      chai.request(app)
        .get(`${usersURL}`)
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('users');
          expect(response.body.message).to.equal('Successfully got all users');
          done();
        });
    });
  });

  describe('DELETE /users endpoint', () => {
    it('it should delete all users that are not admin', (done) => {
      chai.request(app)
        .delete(`${usersURL}`)
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(202);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Users deleted successfully');
          done();
        });
    });

    it('it should return an error if there are no users to delete', (done) => {
      chai.request(app)
        .delete(`${usersURL}`)
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.noUsers);
          done();
        });
    });
  });

  describe('GET /users endpoint', () => {
    it('It should return an error if no users have been registered', (done) => {
      chai.request(app)
        .get(`${usersURL}`)
        .set('token', currentToken)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal(validationErrors.noUsers);
          done();
        });
    });
  });
});
