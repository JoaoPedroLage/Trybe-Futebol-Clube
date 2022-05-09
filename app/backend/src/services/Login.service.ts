import bcryptjs from 'bcryptjs';
import { ILoginService, IAuthMiddleware } from '../interfaces';
import UserModel from '../models/Users.model';

export default class LoginService implements ILoginService {
  private _userModel = UserModel;

  constructor(private authService: IAuthMiddleware) {}

  public async login(email: string, password: string) {
    const userFound = await this._userModel.findOne({ where: { email } });

    if (!userFound) return { code: 401, message: 'User not found' };

    const validatePassword = await bcryptjs.compare(password, userFound.password);

    if (!validatePassword) return { code: 400, message: 'Incorrect email or password' };

    const token = this.authService.createToken(userFound);

    const { id, username, role } = userFound;

    return { code: 200, user: { id, username, role, email }, token };
  }

  public async validate(token: string) {
    const validateToken = this.authService.verifyToken(token);

    if (!validateToken) return { code: 401, message: 'Token not found' };

    const { payload: { role } } = validateToken;

    return { code: 200, role };
  }
}
