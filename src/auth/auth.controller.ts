import { BadRequestException, Body, Controller, Post, SetMetadata } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./dto/auth.dto";
import { ApiTags } from "@nestjs/swagger";
import { InjectModel } from "@nestjs/mongoose";
import { Owner } from "src/schemas/owner.schema";
import { User } from "src/schemas/user.schema";
import { Model } from "mongoose";

@ApiTags("Auth")
@SetMetadata('isPublic', true)
@Controller("auth")
export class AuthController {
  constructor(
    @InjectModel(Owner.name) private ownerModel: Model<Owner>,
    @InjectModel(User.name) private userModel: Model<User>,
    private authService: AuthService,
  ) {}

  @Post("login")
  async login(@Body() { username, password }: LoginDto) {
    let user:any = await this.ownerModel.findOne({ username }).exec();
    let role = 'owner';

    if (!user) {
      user = await this.userModel.findOne({ username }).exec();
      role = 'user';
    }

    if (!user) throw new BadRequestException("Tên người dùng không tồn tại!");
    if (password !== user.password) throw new BadRequestException("Mật khẩu không đúng!");

    const token = await this.authService.signToken(user.email);

    return {
      message: "Đăng nhập thành công!",
      user,
      role,
      token,
    };
  }


  @Post("register")
  async register(@Body() { fullName, username, email, password ,phone}: RegisterDto) {
    // if (!username || !email || !password) throw new BadRequestException("Vui lòng điền đầy đủ thông tin!");
    const existingUsername = await this.userModel.findOne({ username }).exec();
    if (existingUsername) throw new BadRequestException("Tên người dùng đã tồn tại!");

    const existingUseremail = await this.userModel.findOne({ email }).exec();
    if (existingUseremail) throw new BadRequestException("Email đã tồn tại!");

    const existingUserphone = await this.userModel.findOne({ phone }).exec();
    if (existingUserphone) throw new BadRequestException("Phone đã tồn tại!");

    const newUser = await this.userModel.create({
      fullName,
      username,
      email,
      password,
      phone,
    });

    const token = await this.authService.signToken(newUser.email);

    return {
      message: "Đăng ký thành công!",
      user: newUser,
      token,
    };
  }
}
