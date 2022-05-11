import { IAuthMiddleware, DataToken } from './auth';
import { ILogin, ILoginController, ILoginService } from './login';
import { IUser, UserData } from './user';
import { ITeamService, ITeamController } from './team';
import { ILeaderBoardService, DataLeaderBoard, ILeaderBoardController } from './leaderBoard';
import { DataMatch, IMatchService, IMatchController } from './match';

export {
  IAuthMiddleware,
  DataToken,
  ILogin,
  ILoginController,
  ILoginService,
  IUser,
  UserData,
  ITeamService,
  ITeamController,
  DataMatch,
  IMatchService,
  IMatchController,
  ILeaderBoardService,
  DataLeaderBoard,
  ILeaderBoardController,
};
