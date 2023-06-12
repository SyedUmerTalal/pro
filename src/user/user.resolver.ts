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
import FilterUserInput from './dto/filter-user.input';
import { CityService } from 'src/common/services/city.service';
import { CountryService } from 'src/country/country.service';
import FindUserInput from './dto/find-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly cityService: CityService,
    private readonly countryService: CountryService,
  ) {}

  @Mutation(() => User)
  registerUser(@Args('data') registerUserInput: RegisterUserInput) {
    return this.userService.create(registerUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll(@Args('where', { nullable: true }) filterUserInput: FilterUserInput) {
    return this.userService.findAll(filterUserInput);
  }

  @Query(() => User, { name: 'user', nullable: true })
  findOne(@Args('where') findUserInput: FindUserInput) {
    return this.userService.findOne(findUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('where') findUserInput: FindUserInput) {
    return this.userService.remove(findUserInput);
  }

  @Mutation(() => User)
  approveUser(@Args('where') findUserInput: FindUserInput) {
    return this.userService.approve(findUserInput);
  }

  @ResolveField()
  async city(@Parent() user: User) {
    const city = await this.cityService.findOne(user.cityCode);
    return city.name;
  }

  @ResolveField()
  async country(@Parent() user: User) {
    const country = await this.countryService.findOne(user.countryCode);
    return country.name;
  }
}
