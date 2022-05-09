import 'dotenv/config';
import jwt from 'jsonwebtoken';
import fs = require('fs');
import { IAuthMiddleware, IUser, UserData, DataToken } from '../interfaces';

export default class AuthMiddleware implements IAuthMiddleware {
  private jwtConfig = { expiresIn: '1d' };

  private SECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8');

  public createToken(dataUser: IUser) {
    const { dataValues } = dataUser;
    const { password, ...payload } = dataValues as UserData;

    if (this.SECRET !== undefined) {
      const token = jwt.sign({ payload }, this.SECRET, this.jwtConfig);

      return token;
    }
  }

  public verifyToken(token: string) {
    try {
      if (this.SECRET !== undefined) {
        const dataUserOK = jwt.verify(token, this.SECRET) as DataToken;

        return dataUserOK;
      }
    } catch (error) {
      console.log(error);

      return undefined;
    }
  }
}
