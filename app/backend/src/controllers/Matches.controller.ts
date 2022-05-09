import { Request, Response } from 'express';
import { IMatchController, IMatchService } from '../interfaces';

export default class MatchController implements IMatchController {
  constructor(private _matchService: IMatchService) {}

  public findAll = async (_req: Request, res: Response): Promise<object> => {
    const { inProgress } = _req.query;
    let foundMatch;

    if (inProgress === 'true' || inProgress === 'false') {
      foundMatch = await this._matchService.findAll(inProgress);
    } else foundMatch = await this._matchService.findAll();

    const { code, message, matchesFound } = foundMatch;

    if (message) return res.status(code).json({ message });

    return res.status(code).json(matchesFound);
  };

  public create = async (req: Request, res: Response): Promise<object> => {
    const { authorization } = req.headers;

    const match = await this._matchService.create(req.body, authorization);

    const { code, message, createdMatch } = match;

    if (message) return res.status(code).json({ message });

    return res.status(code).json(createdMatch);
  };

  public finish = async (req: Request, res: Response): Promise<object> => {
    const { id } = req.params;

    const finishedMatch = await this._matchService.finish(Number(id));

    const { code, message } = finishedMatch;

    if (message) return res.status(code).json({ message });

    return res.status(code).json(message);
  };

  public update = async (req: Request, res: Response): Promise<object> => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const updatedMatch = await this._matchService.update(homeTeamGoals, awayTeamGoals, Number(id));

    const { code, message } = updatedMatch;

    if (message) return res.status(code).json(message);

    return res.status(code).json(message);
  };
}
