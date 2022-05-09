import { Request, Response } from 'express';

export interface ILogin {
  email: string,
  password: string,
}

interface ILoginResponse {
  code: number;
  message?: string | unknown;
  user?: object | unknown;
  token?: string | unknown;
  role?: string | unknown;
}

export interface ILoginController {
  create(req: Request, res: Response): Promise<object | unknown>;
  validate(req: Request, res: Response): Promise<object | unknown>;
}

export interface ILoginService {
  login(email: string, password: string): Promise<ILoginResponse>;
  validate(token: string | undefined): Promise<ILoginResponse>;
}
