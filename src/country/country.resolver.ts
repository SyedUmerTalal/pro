import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';
import { CountryService } from './country.service';
import { Country } from './model/country.model';
import { CityService } from 'src/common/services/city.service';

@Resolver(() => Country)
export class CountryResolver {
  constructor(
    private readonly countryService: CountryService,
    private readonly cityService: CityService,
  ) {}

  @Query(() => [Country], { name: 'countries' })
  findAll(@Args('countryCode', { nullable: true }) countryCode: string) {
    return this.countryService.findAll(countryCode);
  }

  @ResolveField()
  cities(@Parent() country: Country) {
    return this.cityService.findAll(country.code);
  }
}
