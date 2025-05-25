import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Owner } from '../schemas/owner.schema';

@Injectable()
export class OwnerService {
  constructor(@InjectModel(Owner.name) private ownerModel: Model<Owner>) {}

  async getAllBasicInfo() {
    return this.ownerModel.find({}, 'fullName username phone email clusterName address').exec();
  }

  async getOwnerById(id: string) {
    return this.ownerModel.findById(id).exec();
  }

  // Chỉnh sửa thông tin chủ sân theo ID
  async editOwner(id: string, dto: any) {
    const owner = await this.ownerModel.findById(id).exec();
    if (!owner) {
      throw new NotFoundException('Owner not found');
    }
    owner.fullName = dto.fullName;
    owner.username = dto.username;
    owner.password = dto.password; // Lưu ý: Trong ứng dụng thực tế, bạn nên mã hóa mật khẩu trước khi lưu
    owner.phone = dto.phone;
    owner.email = dto.email;
    owner.clusterName = dto.clusterName;
    owner.address = dto.address;
    return owner.save();
  }
}
