import { Request, Response, Router } from 'express';

import MatchesController from '../controllers/Matches.controller';
import MatchesService from '../services/Matches.service';

const matchesController = new MatchesController(new MatchesService());

const matchesRouter = Router();

matchesRouter.get(
  '/',
  async (req: Request, res: Response) => {
    await matchesController.findAll(req, res);
  },
);

matchesRouter.post(
  '/',
  async (req: Request, res: Response) => {
    await matchesController.create(req, res);
  },
);

matchesRouter.patch(
  '/:id',
  async (req: Request, res: Response) => {
    await matchesController.update(req, res);
  },
);

matchesRouter.patch(
  '/:id/finish',
  async (req: Request, res: Response) => {
    await matchesController.finish(req, res);
  },
);

export default matchesRouter;
