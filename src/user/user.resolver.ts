import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from './model/user.model';
import { UserService } from './user.service';
import { RegisterUserInput } from './dto/user-register.input';
import { UserDeleteInput } from './dto/user-delete.input';
import { UserFilterInput } from './dto/user-filter.input';
import { UserApproveArgs } from './dto/user-approve.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  registerUser(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ) {
    return this.userService.create(registerUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll(@Args('userFilterInput') userFilterInput: UserFilterInput) {
    return this.userService.findAllByStatus(userFilterInput);
  }

  @Mutation(() => User)
  removeUser(@Args('userDeleteArgs') userDeleteArgs: UserDeleteInput) {
    return this.userService.remove(userDeleteArgs);
  }

  @Mutation(() => User)
  approveUser(@Args('userApproveArgs') userApproveArgs: UserApproveArgs) {
    return this.userService.approve(userApproveArgs);
  }

  @ResolveField()
  cityName(@Parent() user: User) {
    return user.city.name;
  }

  @ResolveField()
  countryName(@Parent() user: User) {
    return user.country.name;
  }
}
