import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from './dto/login.input';
import { LoginResult } from './model/login-result.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginInput: LoginInput) {
    const user = await this.userService.findOneByEmail(loginInput.email);
    if (user && (await bcrypt.compare(loginInput.password, user.password))) {
      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;
      return user;
    }

    return null;
  }

  login(user: User) {
    const payload = { sub: user.id, email: user.email };
    const result: LoginResult = {
      accessToken: this.jwtService.sign(payload),
    };

    return result;
  }
}
