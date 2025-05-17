import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Field } from '../schemas/field.schema';

@Injectable()
export class FieldService {
  constructor(
    @InjectModel(Field.name) private fieldModel: Model<Field>,
  ) {}

  // async getAllFieldsByClusterIdAndTime(clusterId: string, time: ): Promise<Field[]> {
}
