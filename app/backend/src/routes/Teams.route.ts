import { Request, Response, Router } from 'express';

import TeamsController from '../controllers/Teams.controller';
import TeamsService from '../services/Teams.service';

const teamsController = new TeamsController(new TeamsService());

const teamsRouter = Router();

teamsRouter.get(
  '/',
  async (req: Request, res: Response) => {
    await teamsController.findAll(req, res);
  },
);

teamsRouter.get(
  '/:id',
  async (req: Request, res: Response) => {
    await teamsController.findOne(req, res);
  },
);

export default teamsRouter;
