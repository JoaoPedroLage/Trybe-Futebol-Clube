import sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import { before, after } from 'mocha';

import { app } from '../app';
import User from '../models/Users.model';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests the login route', () => {
  const HTTPResponse = async (_reqBody: object) => chai.request(app).post('/login').send(_reqBody);
  // const requestBodyMock = {
  //   'id': 1,
  //   'username': 'Admin',
  //   'role': 'admin',
  //   'email': 'admin@admin.com',
  //   'password': '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  //  }

  it('Login attempt with incompatible password', async () => {
    const reqBody = { email: 'admin@admin.com', password: 'wrongPassarword' };
    const { body, status} = await HTTPResponse(reqBody);

    expect(status).to.be.equal(400);
    expect(body.message).to.be.equal('Incorrect email or password');
  });

  it("Can't log in without the email field correctly filled in", async () => {
    const reqBody = { email: '', password: 'wrongPassarword' };
    const { body, status} = await HTTPResponse(reqBody);

    expect(status).to.be.equal(400);
    expect(body.message).to.be.equal('All fields must be filled');
  });

  // describe('Correct input of a system user', () => {
  //   before(async () => {
  //     sinon.stub(User, 'findOne').resolves(requestBodyMock as User);
  //   });

  //   after(() => {
  //     (User.findOne as sinon.SinonStub).restore();
  //   });

  //   it('Successfully logged in', async () => {
  //     const reqBody = { email: 'admin@admin.com', password: 'secret_admin' };
  //     const { body, status} = await HTTPResponse(reqBody);

  //     expect(status).to.be.equal(200);
  //     expect(body).to.have.property('user');
  //     expect(body).to.have.property('token');
  //   });
  // });

  // describe('Validate login', () => {
  //   before(async () => {
  //     sinon.stub(User, 'findOne').resolves(requestBodyMock as User);
  //   });
  
  //   after(() => {
  //     (User.findOne as sinon.SinonStub).restore();
  //   });
  
  //   it('Validate login and the response body return the user role', async () => {
  //     const reqBody = { email: 'admin@admin.com', password: 'secret_admin' };
  //     const { body: { token }} = await HTTPResponse(reqBody);
  
  //     const { body, status } = (
  //       await chai.request(app).get('/login/validate').set({Authorization: token})
  //       );
  
  //     expect(status).to.be.equal(200);
  //     expect(body).to.be.equal('admin');
  //   });
});

