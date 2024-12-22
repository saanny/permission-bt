export interface RegisterInput {}
export interface RegisterResult {}
export interface LoginInput {}
export interface LoginResult {}

export interface MeInput {}
export interface MeResult {}

export interface IUsersService {
  register(input: RegisterInput): Promise<RegisterResult>;
  login(input: LoginInput): Promise<LoginResult>;
  me(input: MeInput): Promise<MeResult>;
}
export const UsersService = Symbol('UsersService');
