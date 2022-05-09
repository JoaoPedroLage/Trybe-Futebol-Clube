import { Request, Response } from 'express';

export type DataMatch = {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number | string,
  inProgress: boolean,
  teamHome?: {
    teamName: string
  },
  teamAway?: {
    teamName: string
  };
};

export interface IMatch {
  createdMatch?: DataMatch;
  dataTeam?: DataMatch;
  matchesFound?: DataMatch[],
  matchFound?: DataMatch,
  code: number,
  message?: string,
  homeTeamGoals?: number,
  awayTeamGoals?: number | string,
}

export interface IMatchService {
  findAll(inProgress?: string): Promise<IMatch>;
  create(dataReq?: object, token?: string): Promise<IMatch>;
  finish(id: number): Promise<IMatch>;
  update(homeTeamGoals: string, awayTeamGoals: string, id: number): Promise<IMatch>;
}

export interface IMatchController {
  findAll(req: Request, res: Response): Promise<object>;
  create(req: Request, res: Response): Promise<object>;
  finish(req: Request, res: Response): Promise<object>;
  update(req: Request, res: Response): Promise<object>;
}
