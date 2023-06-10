import { InputType, PickType } from '@nestjs/graphql';
import Plate from '../models/plate.model';

@InputType()
export default class FindPlateInput extends PickType(
  Plate,
  ['id'] as const,
  InputType,
) {}
