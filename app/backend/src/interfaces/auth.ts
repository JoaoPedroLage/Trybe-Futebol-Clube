import { IUser } from './user';

export interface IAuthMiddleware {
  createToken(payload: IUser): string | undefined;
  verifyToken(token: string): DataToken | undefined;
}

export type DataToken = {
  payload:{
    id: number;
    username: string;
    role: string;
    email: string;
  },
  iat: number;
  exp: number;
};
