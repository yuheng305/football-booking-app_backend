import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Field } from '../schemas/field.schema';
import { FieldDto } from 'src/auth/dto/field.dto';

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
  async createField(createFieldDto: FieldDto): Promise<Field> {
  const newField = new this.fieldModel({
    name: createFieldDto.name,
    clusterId: createFieldDto.clusterId,
    isMaintain: createFieldDto.isMaintain,
    openHour: createFieldDto.openHour,
    closeHour: createFieldDto.closeHour,
    schedules: [] // Initialize schedules if not part of DTO
  });

  return newField.save();
}
  async updateFieldToAvailable(fieldId: string): Promise<Field> {
    const field = await this.fieldModel.findById(fieldId).exec();
    if (!field) {
      throw new Error('Field not found');
    }
    field.isMaintain = false;
    return field.save();
  }

  async updateFieldToMaintain(fieldId: string): Promise<Field> {
    const field = await this.fieldModel.findById(fieldId).exec();
    if (!field) {
      throw new Error('Field not found');
    }
    field.isMaintain = true;
    return field.save();
  }

  //edit field
  async editField(fieldId: string, updateFieldDto: FieldDto): Promise<Field> {
    const field = await this.fieldModel.findById(fieldId).exec();
    if (!field) {
      throw new Error('Field not found');
    }
    field.openHour = updateFieldDto.openHour || field.openHour;
    field.closeHour = updateFieldDto.closeHour || field.closeHour;

    return field.save();
  }

}
