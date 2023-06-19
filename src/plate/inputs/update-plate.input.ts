import { InputType, PickType } from '@nestjs/graphql';
import Plate from '../models/plate.model';

@InputType()
export default class UpdatePlateInput extends PickType(
  Plate,
  ['status'] as const,
  InputType,
) {}
