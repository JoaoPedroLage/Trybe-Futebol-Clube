import { Request, Response } from 'express';
import { ILogin, ILoginController, ILoginService } from '../interfaces';

export default class LoginController implements ILoginController {
  constructor(private _loginService: ILoginService) {}

  public create = async (req: Request, res: Response): Promise<object> => {
    const userLogin: ILogin = req.body;

    const { email, password } = userLogin;

    const foundUser = await this._loginService.login(email, password);

    const { code, message, user, token } = foundUser;

    if (message) return res.status(code).json({ message });

    return res.status(code).json({ user, token });
  };

  public validate = async (req: Request, res: Response): Promise<object> => {
    const { authorization } = req.headers;

    const tokenValid = await this._loginService.validate(authorization);

    const { code, message, role } = tokenValid;

    if (!tokenValid) return res.status(code).json({ message });

    return res.status(code).json(role);
  };
}
