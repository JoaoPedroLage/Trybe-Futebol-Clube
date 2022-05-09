import { ITeamService } from '../interfaces';
import TeamsModel from '../models/Teams.model';

export default class TeamsService implements ITeamService {
  private _teamsModel = TeamsModel;

  public async findAll() {
    const teamsFound = await this._teamsModel.findAll();

    if (!teamsFound) return { code: 401, message: 'Teams not found' };

    return { code: 200, teams: teamsFound };
  }

  public async findOne(id: number) {
    const teamFound = await this._teamsModel.findByPk(id);

    if (!teamFound) return { code: 401, message: 'Team not found' };

    return { code: 200, team: teamFound };
  }
}
