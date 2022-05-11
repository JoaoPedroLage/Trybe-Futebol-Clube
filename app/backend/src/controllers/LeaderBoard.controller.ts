import { Request, Response } from 'express';
import { ILeaderBoardController, ILeaderBoardService } from '../interfaces';

export default class LeaderBoardController implements ILeaderBoardController {
  constructor(private _leaderBoardService: ILeaderBoardService) {}

  public findAll = async (_req: Request, res: Response): Promise<object> => {
    const foundLeaderBoard = await this._leaderBoardService.leaderBoard();

    const { code, message, orderlyLeaderBoard } = foundLeaderBoard;

    if (message) return res.status(code).json({ message });

    return res.status(code).json(orderlyLeaderBoard);
  };
}
