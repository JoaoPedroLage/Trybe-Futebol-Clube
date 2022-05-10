import sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../models/Users.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests the login route', () => {
  const HTTPResponse = async (_reqBody: object) => chai.request(app).post('/matches').send(_reqBody);
  const requestBodyMock = {
    'id': 1,
    'username': 'Admin',
    'role': 'admin',
    'email': 'admin@admin.com',
    'password': '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
   }

  it('It is not possible to save a match without a token', async () => {
    const reqBody = {
      "homeTeam": 16,
      "awayTeam": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
      "inProgress": true
    };
    const { body, status} = await HTTPResponse(reqBody);

    expect(status).to.be.equal(401);
    expect(body.message).to.be.equal('Token not found');
  });

  describe('Test get methot of Matches route', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(requestBodyMock as User);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('Correct response by API', async () => {
      const response = await chai.request(app).get('/matches');
      const { body, status } = response;

      expect(status).to.be.equal(201);
      expect(body[0]).to.have.property('id');
      expect(body[0]).to.have.property('homeTeam');
      expect(body[0]).to.have.property('homeTeamGoals');
      expect(body[0]).to.have.property('awayTeam');
      expect(body[0]).to.have.property('awayTeamGoals');
      expect(body[0]).to.have.property('inProgress');
    });
  });
});
