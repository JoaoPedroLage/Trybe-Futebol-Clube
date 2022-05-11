import { ILeaderBoardService, DataLeaderBoard } from '../interfaces';
import Team from '../models/Teams.model';
import MatchesService from './Matches.service';

let leaderBoardArray: DataLeaderBoard[] = [];

export default class LeaderBoardService implements ILeaderBoardService {
  private _teamModel = Team;

  private _matches = new MatchesService();

  private _teamName = 'teamName';

  private _totalPoints = 0;

  private _totalGames = 0;

  private _totalVictories = 0;

  private _totalDraws = 0;

  private _totalLosses = 0;

  private _goalsFavor = 0;

  private _goalsOwn = 0;

  private _goalsBalance = 0;

  private efficiency = 0;

  private _resetTeamBoard() {
    this._teamName = '';
    this._totalPoints = 0;
    this._totalGames = 0;
    this._totalVictories = 0;
    this._totalDraws = 0;
    this._totalLosses = 0;
    this._goalsFavor = 0;
    this._goalsOwn = 0;
    this._goalsBalance = 0;
    this.efficiency = 0;
  }

  private _teamBoard() : DataLeaderBoard {
    return {
      name: this._teamName,
      totalPoints: this._totalPoints,
      totalGames: this._totalGames,
      totalVictories: this._totalVictories,
      totalDraws: this._totalDraws,
      totalLosses: this._totalLosses,
      goalsFavor: this._goalsFavor,
      goalsOwn: this._goalsOwn,
      goalsBalance: this._goalsBalance,
      efficiency: this.efficiency,
    };
  }

  private async businessRules() {
    const teamsFound = await this._teamModel.findAll();
    const { matchesFound } = await this._matches.findAll();

    const allTeams = teamsFound.map((team) => team.teamName);
    allTeams.forEach((_, idx) => {
      const matchData = matchesFound?.filter((match) => match.teamHome.teamName === allTeams[idx]);

      matchData?.forEach((_value, i) => {
        const homeTeamGoals = Number(matchData[i].homeTeamGoals);
        const awayTeamGoals = Number(matchData[i].awayTeamGoals);

        if (homeTeamGoals === awayTeamGoals) { this._totalPoints += 1; this._totalDraws += 1; }
        if (homeTeamGoals > awayTeamGoals) { this._totalPoints += 3; this._totalVictories += 1; }
        if (homeTeamGoals < awayTeamGoals) this._totalLosses += 1;

        this._teamName = allTeams[idx]; this._totalGames = matchData.length;
        this._goalsFavor += homeTeamGoals; this._goalsOwn += awayTeamGoals;
        this._goalsBalance = this._goalsFavor - this._goalsOwn;
        this.efficiency = Number(((this._totalPoints / (this._totalGames * 3)) * 100).toFixed(2));
      });
      leaderBoardArray.push(this._teamBoard()); this._resetTeamBoard();
    });
  }

  public async leaderBoard() {
    await this.businessRules();

    const orderlyLeaderBoard = (
      leaderBoardArray
        .sort((a, b) => b.goalsOwn - a.goalsOwn)
        .sort((a, b) => b.goalsFavor - a.goalsFavor)
        .sort((a, b) => b.goalsBalance - a.goalsBalance)
        .sort((a, b) => b.totalVictories - a.totalVictories)
        .sort((a, b) => b.totalPoints - a.totalPoints));

    leaderBoardArray = [];

    return { code: 200, orderlyLeaderBoard };
  }
}
