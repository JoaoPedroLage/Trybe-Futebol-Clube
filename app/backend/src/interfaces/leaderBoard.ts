import { Request, Response } from 'express';

export type DataLeaderBoard = {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
};

interface ILeaderBoard {
  orderlyLeaderBoard: DataLeaderBoard[],
  code: number,
  message?: string,
}

export interface ILeaderBoardService {
  leaderBoard(): Promise<ILeaderBoard>;
}

export interface ILeaderBoardController {
  findAll(req: Request, res: Response): Promise<object | unknown>;
}
