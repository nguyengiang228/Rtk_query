export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface IUserData {
  name: string;
  email: string;
}

export interface IUserEditForm {
  isEdit: boolean;
  id: number;
}
