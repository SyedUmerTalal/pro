import { InputType, PartialType, PickType } from '@nestjs/graphql';
import Plate from '../models/plate.model';

@InputType()
export default class FilterPlateInput extends PartialType(
  PickType(Plate, ['purpose', 'status'] as const, InputType),
) {}
