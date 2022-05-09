// import sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../models/Users.model';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests the login route', () => {
  const HTTPResponse = async (_reqBody: object) => chai.request(app).post('/matches').send(_reqBody);

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
});

