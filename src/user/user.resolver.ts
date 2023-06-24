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
import FilterUserInput from './dto/filter-user.input';
import { CityService } from 'src/common/services/city.service';
import { CountryService } from 'src/country/country.service';
import FindUserInput from './dto/find-user.input';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PlateService } from 'src/plate/services/plate.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly cityService: CityService,
    private readonly countryService: CountryService,
    private readonly plateService: PlateService,
  ) {}

  // @Mutation(() => User)
  // registerUser(
  //   @Args('data') registerUserInput: RegisterUserInput,
  //   @Args('drivingLicense') drivingLicense: FileUpload,
  // ) {
  //   return this.userService.create(registerUserInput);
  // }

  @UseGuards(JwtAuthGuard)
  @Query(() => User, { name: 'me' })
  me(@CurrentUser('userId') userId: number) {
    return this.userService.findOne({ id: userId });
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

  @ResolveField()
  plates(@Parent() user: User) {
    return this.plateService.findAll({ userId: user.id });
  }
}
