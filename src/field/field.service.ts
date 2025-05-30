import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Field } from '../schemas/field.schema';
import { FieldDto } from 'src/auth/dto/field.dto';
import { FieldResponseDto } from 'src/auth/dto/fieldresponse.dto';
import { Booking } from 'src/schemas/booking.schema';
import { Owner } from 'src/schemas/owner.schema';
import { Cluster } from 'src/schemas/cluster.schema';
import { UpdateFieldStatusDto } from 'src/auth/dto/updateFieldStatus.dto';
import { UpdateHourDto } from 'src/auth/dto/updateHour.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class FieldService {
  constructor(
    @InjectModel(Field.name) private fieldModel: Model<Field>,
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
    @InjectModel(Owner.name) private ownerModel: Model<Owner>,
    @InjectModel(Cluster.name) private clusterModel: Model<Cluster>,
  ) {}

  async getAllFieldsInCluster(clusterId: string): Promise<Field[]> {
    return this.fieldModel.find({ clusterId }).exec();
  }


  async createField(createFieldDto: FieldDto): Promise<Field> {
  const newField = new this.fieldModel({
    name: createFieldDto.name,
    clusterId: createFieldDto.clusterId,
    isMaintain: createFieldDto.isMaintain,
    openHour: createFieldDto.openHour,
    closeHour: createFieldDto.closeHour,
  });

  return newField.save();
}
  // async updateFieldToAvailable(fieldId: string): Promise<Field> {
  //   const field = await this.fieldModel.findById(fieldId).exec();
  //   if (!field) {
  //     throw new NotFoundException('Field not found');
  //   }
  //   field.isMaintain = false;
  //   return field.save();
  // }

  // async updateFieldToMaintain(fieldId: string): Promise<Field> {
  //   const field = await this.fieldModel.findById(fieldId).exec();
  //   if (!field) {
  //     throw new NotFoundException('Field not found');
  //   }
  //   field.isMaintain = true;
  //   return field.save();
  // }

  async updateFieldStatus(fieldId: string, dto: UpdateFieldStatusDto): Promise<Field> {
    const field = await this.fieldModel.findById(fieldId).exec();
    if (!field) {
      throw new NotFoundException('Field not found');
    }
    field.isMaintain = dto.isMaintain;
    return field.save();
  }

  //update field start hour and close hour
  async updateFieldHours(fieldId: string, dto: UpdateHourDto): Promise<Field> {
    const field = await this.fieldModel.findById(fieldId).exec();
    if (!field) {
      throw new NotFoundException('Field not found');
    }
    if (dto.openHour) {
      field.openHour = dto.openHour;
    }
    if (dto.closeHour) {
      field.closeHour = dto.closeHour;
    }
    return field.save();
  }

  //edit field
  async editField(fieldId: string, updateFieldDto: FieldDto): Promise<Field> {
    const field = await this.fieldModel.findById(fieldId).exec();
    if (!field) {
      throw new NotFoundException('Field not found');
    }
    field.openHour = updateFieldDto.openHour || field.openHour;
    field.closeHour = updateFieldDto.closeHour || field.closeHour;

    return field.save();
  }

  async getAllFieldsInClusterByDateAndHour(
    clusterId: string,
    date: string,
    hour: number
  ): Promise<FieldResponseDto[]> {
    const fields = await this.fieldModel.find({ clusterId }).exec();
    const bookings= await this.bookingModel.find({
      date : date,
      startHour: hour,
    }).exec();
    // console.log('Bookings:');
    // console.log('Bookings:', bookings);
    let fieldResponses: FieldResponseDto[] = [];
    for( const field of fields) {
      let slotbooked:number=0;
      for (const booking of bookings) {
        let bookingFieldId = new ObjectId(booking.fieldId);
        // console.log('Booking Field ID:', bookingFieldId);
        // console.log('Field ID:', field._id);
        const fieldId = field._id as Types.ObjectId;
        if (bookingFieldId.equals(fieldId) && booking.status !== 'canceled') {
          slotbooked++; 
        }
      }
      fieldResponses.push({
        field,
        slotbooked
      });
    }


    return fieldResponses;
  }

  async getAllFieldsOfOwner(ownerId: string): Promise<Field[]> {
    const clusters = await this.clusterModel.find({ ownerId: ownerId }).exec();
    const clusterIds = clusters.map(cluster => cluster._id);
    let result: Field[] = [];

    for (const clusterId of clusterIds) {
      const fields = await this.fieldModel.find({ clusterId }).exec();
      result = result.concat(fields); // nối mảng thay vì push mảng
    }
    return result;
  }

  //delete field
  async deleteField(fieldId: string): Promise<string> {
    const field = await this.fieldModel.findById(fieldId).exec();
    if (!field) {
      throw new NotFoundException('Field not found');
    }
    await field.deleteOne();
    return 'Field deleted successfully';
  }
}
