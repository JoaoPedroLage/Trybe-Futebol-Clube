import { Request, Response } from 'express';
import { ITeamController, ITeamService } from '../interfaces';

export default class TeamController implements ITeamController {
  constructor(private _teamService: ITeamService) {}

  public findAll = async (_req: Request, res: Response): Promise<object> => {
    const foundTeam = await this._teamService.findAll();

    const { code, message, teams } = foundTeam;

    if (message) return res.status(code).json({ message });

    return res.status(code).json(teams);
  };

  public findOne = async (req: Request, res: Response): Promise<object> => {
    const { id } = req.params;
    const foundTeam = await this._teamService.findOne(Number(id));

    const { code, message, team } = foundTeam;

    if (message) return res.status(code).json({ message });

    return res.status(code).json(team);
  };
}
