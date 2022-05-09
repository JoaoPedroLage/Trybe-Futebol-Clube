import { Request, Response, Router } from 'express';

import LoginController from '../controllers/Login.controller';
import LoginService from '../services/Login.service';
import Auth from '../middlewares/auth.middleware';
import validateRequest from '../middlewares/validateReq.middleware';
import validateLogin from '../schemas/validationLogin';

const loginController = new LoginController(new LoginService(new Auth()));

const loginRouter = Router();

loginRouter.post(
  '/',
  validateRequest(validateLogin),
  async (req: Request, res: Response) => {
    await loginController.create(req, res);
  },
);

loginRouter.get(
  '/validate',
  async (req: Request, res: Response) => {
    await loginController.validate(req, res);
  },
);

export default loginRouter;
