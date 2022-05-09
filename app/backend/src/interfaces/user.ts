export interface IUser {
  dataValues?: UserData;
  id?: number,
  username: string,
  role: string,
  password: string,
  email: string,
}
export type UserData = {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
};
