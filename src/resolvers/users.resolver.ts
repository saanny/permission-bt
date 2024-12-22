import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthResponseType } from 'src/resolvers/dto/auth-response.object';
import { LoginUserInput } from 'src/resolvers/dto/logn-user.input';
import { RegisterUserInput } from 'src/resolvers/dto/register-user.input';
import { IUsersService, UsersService } from 'src/services/interfaces';

@Resolver()
export class UsersResolver {
  constructor(
    @Inject(UsersService)
    private readonly usersService: IUsersService,
  ) {}
  @Mutation(() => AuthResponseType, {
    name: 'register',
    description: 'Register a user',
  })
  async register(@Args('RegisterUser') registerUser: RegisterUserInput) {
    return this.usersService.register(registerUser);
  }

  @Mutation(() => AuthResponseType, {
    name: 'login',
    description: 'Login user',
  })
  async login(@Args('LoginUser') loginUser: LoginUserInput) {
    return this.usersService.login(loginUser);
  }
}
