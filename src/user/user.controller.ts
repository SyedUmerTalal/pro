import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: RegisterUserDto })
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.create(registerUserDto);
  }
}
