import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import testData from './testData';
import validationErrors from '../helpers/validationErrors';

const { expect } = chai;
const signupURL = '/api/v1/auth/signup';

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
});
