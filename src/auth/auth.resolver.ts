import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginResult } from './model/login-result.model';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { UnauthorizedException } from '@nestjs/common';

@Resolver(() => LoginResult)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResult)
  async login(@Args('loginInput') loginInput: LoginInput) {
    const user = await this.authService.validateUser(loginInput);

    if (!user) {
      return new UnauthorizedException();
    }

    return this.authService.login(user);
  }
}
