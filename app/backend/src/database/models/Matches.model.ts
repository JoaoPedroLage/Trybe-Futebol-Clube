import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './Teams.model';

class Matches extends Model {
  public id!: number;

  public homeTeam!: number;

  public homeTeamGoals!: number;

  public awayTeam!: number;

  public awayTeamGoals!: string;

  public inProgress!: boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Matchs',
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'homeMatches' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'awayMatches' });

export default Matches;
