import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Field } from '../schemas/field.schema';

@Injectable()
export class FieldService {
  constructor(
    @InjectModel(Field.name) private fieldModel: Model<Field>,
  ) {}

  async getAllFieldsInCluster(clusterId: string): Promise<Field[]> {
    return this.fieldModel.find({ clusterId }).exec();
  }

  async checkFieldAvailability(fieldId: string, date: string, startHour: number): Promise<string> {
    const field = await this.fieldModel.findById(fieldId).exec();
    
    if (!field) {
      throw new Error('Field not found');
    }

    if (field.isMaintain) {
      return 'maintenance';
    }

    const schedules = field.schedules;
    for (const schedule of schedules) {
      if (schedule.date.toISOString().split('T')[0] === date) {
        if (schedule.startTime <= startHour && schedule.endTime > startHour) {
          if (schedule.status === 'looking') {
            return 'looking';
          }else if (schedule.status === 'booked') {
            return 'booked';
          }
        }
      }
    }

    return 'available';
  }
}
