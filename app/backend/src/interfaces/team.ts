import { Request, Response } from 'express';

type DataTeam = {
  id: number,
  teamName: string,
};

interface ITeam {
  teams?: DataTeam[],
  team?: DataTeam,
  code: number,
  message?: string,
}

export interface ITeamService {
  findAll(): Promise<ITeam>;
  findOne(id: number): Promise<ITeam>;
}

export interface ITeamController {
  findAll(req: Request, res: Response): Promise<object | unknown>;
  findOne(req: Request, res: Response): Promise<object | unknown>;
}
