import AuthMiddleware from '../middlewares/auth.middleware';
import { DataMatch, IMatchService } from '../interfaces';
import MatchModel from '../models/Matches.model';
import TeamModel from '../models/Teams.model';

export default class MatchService implements IMatchService {
  private _authorition = new AuthMiddleware();

  private _matchModel = MatchModel;

  private _teamModel = TeamModel;

  public async findAll(inProgress?: string | undefined) {
    let matchesFound;
    const includeToTable = [
      { model: this._teamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: this._teamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
    ];

    if (inProgress === 'true') {
      matchesFound = await this._matchModel.findAll({
        where: { inProgress: true },
        include: includeToTable });
    } else if (inProgress === 'false') {
      matchesFound = await this._matchModel.findAll({
        where: { inProgress: false },
        include: includeToTable });
    } else if (!inProgress) {
      matchesFound = await this._matchModel.findAll({ include: includeToTable });
    }

    if (!matchesFound) return { code: 401, message: 'Matches not found' };

    return { code: 201, matchesFound };
  }

  public async create(dataReq: DataMatch, token: string) {
    const validateToken = this._authorition.verifyToken(token);

    if (!validateToken) return { code: 401, message: 'Token not found' };

    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = dataReq;

    if (homeTeam === awayTeam) {
      return { code: 401, message: 'It is not possible to create a match with two equal teams' };
    }

    const matchFound1 = await this._teamModel.findOne({ where: { id: homeTeam } });
    const matchFound2 = await this._teamModel.findOne({ where: { id: awayTeam } });

    if (!matchFound1 || !matchFound2) {
      return { code: 404, message: 'There is no team with such id!' };
    }

    const createdMatch = await this._matchModel.create(
      { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress },
    );

    return { code: 201, createdMatch };
  }

  public async finish(id: number) {
    const matchFinished = await this._matchModel.update({ inProgress: false }, { where: { id } });

    if (!matchFinished) return { code: 401, message: 'There is no match with such id!' };

    return { code: 200, message: 'Match successfully finished' };
  }

  public async update(homeTeamGoals: string, awayTeamGoals: string, id:number) {
    const foundMatch = await this._matchModel.findByPk(id);

    if (!foundMatch) return { code: 401, message: 'There is no match with such id!' };

    await this._matchModel.update(
      { inProgress: true, homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );

    return { code: 200, message: 'Match successfully updated' };
  }
}
