export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface IUserInputDTO {
  name: string;
  email: string;
  password: string;
}