import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Owner } from '../schemas/owner.schema';

@Injectable()
export class OwnerService {
  constructor(@InjectModel(Owner.name) private ownerModel: Model<Owner>) {}

  async getAllBasicInfo() {
    return this.ownerModel.find({}, 'fullName username phone email clusterName address').exec();
  }
}
