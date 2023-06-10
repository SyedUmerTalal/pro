import { InputType, PartialType } from '@nestjs/graphql';
import FindPlateInput from './find-plate.input';

@InputType()
export default class ApproveListingPlateInput extends PartialType(
  FindPlateInput,
) {}
