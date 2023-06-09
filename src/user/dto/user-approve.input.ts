import { InputType, PartialType } from '@nestjs/graphql';
import { UserDeleteInput } from './user-delete.input';

@InputType()
export class UserApproveArgs extends PartialType(UserDeleteInput) {}
