import { InputType, PartialType, PickType } from '@nestjs/graphql';
import Plate from '../models/plate.model';

@InputType()
export default class FindPlateInput extends PartialType(
  PickType(Plate, ['id', 'combination'] as const, InputType),
) {}
