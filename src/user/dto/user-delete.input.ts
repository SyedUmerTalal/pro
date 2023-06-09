import { InputType, PickType } from '@nestjs/graphql';
import { User } from '../model/user.model';

@InputType()
export class UserDeleteInput extends PickType(
  User,
  ['id'] as const,
  InputType,
) {}
