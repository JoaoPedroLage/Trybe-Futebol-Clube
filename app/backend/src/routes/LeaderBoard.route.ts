import { Request, Response, Router } from 'express';

import LeaderBoardController from '../controllers/LeaderBoard.controller';
import LeaderBoardService from '../services/LeaderBoard.service';

const leaderBoardController = new LeaderBoardController(new LeaderBoardService());

const leaderBoardRouter = Router();

leaderBoardRouter.get(
  '/home',
  async (req: Request, res: Response) => {
    await leaderBoardController.findAll(req, res);
  },
);

export default leaderBoardRouter;
