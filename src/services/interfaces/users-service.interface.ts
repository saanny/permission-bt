export interface RegisterInput {
  email: string;
  password: string;
  username: string;
}
export interface RegisterResult {
  user: {
    email: string;
    username: string;
  };
  token: string;
}
export interface LoginInput {
  email: string;
  password: string;
}
export interface LoginResult {
  user: {
    email: string;
    username: string;
  };
  token: string;
}

export interface MeInput {
  userId: string;
}
export interface MeResult {
  user: {
    email: string;
    username: string;
  };
}

export interface IUsersService {
  register(input: RegisterInput): Promise<RegisterResult>;
  login(input: LoginInput): Promise<LoginResult>;
  me(input: MeInput): Promise<MeResult>;
}
export const UsersService = Symbol('UsersService');
