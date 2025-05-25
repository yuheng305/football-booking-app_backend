import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { UserDto } from '../auth/dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAllBasicInfo() {
    return this.userModel.find({}, 'fullName username phone email clusterName address').exec();
  }

  async getUserById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async editUser(id: string, dto: UserDto) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.fullName = dto.fullName;
    user.username = dto.username;
    user.password = dto.password; // Note: In a real application, you should hash the password before saving
    user.phone = dto.phone;
    user.email = dto.email;
    return user.save();
  }
}
