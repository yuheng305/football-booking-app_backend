import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Post, SetMetadata } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./dto/auth.dto";
// import { Public } from "src/common/decorators/public.decorator";
import { ApiTags } from "@nestjs/swagger";
import { InjectModel } from "@nestjs/mongoose";
import { OwnerModule } from "src/owner/owner.module";
import { Owner } from "src/schemas/owner.schema";
import { Model } from "mongoose";

@ApiTags("Auth")
@SetMetadata('isPublic', true)
@Controller("auth")
export class AuthController {
  constructor(
    @InjectModel(Owner.name) private ownerModel: Model<Owner>,
    private authService: AuthService,
  ) {}

  @Post("login")
  async login(@Body() { username, password }: LoginDto) {
    // if (!username || !password) throw new BadRequestException("Vui lòng điền đầy đủ thông tin!");
    const user = await this.ownerModel.findOne({ username }).exec();
    if (!user) throw new BadRequestException("Tên người dùng không tồn tại!");

    if (password!=user.password) throw new BadRequestException("Mật khẩu không đúng!");

    console.log(user);

    const token = await this.authService.signToken(user.email);
    console.log(username, password, token);
    return {
      message: "Đăng nhập thành công!",
      user,
      token,
    };
  }

  // @Post("register")
  // async register(@Body() { username, email, password ,phone}: RegisterDto) {
  //   // if (!username || !email || !password) throw new BadRequestException("Vui lòng điền đầy đủ thông tin!");
  //   const existingUsername = await this.ownerModel.findOne({ username }).exec();
  //   if (existingUsername) throw new BadRequestException("Tên người dùng đã tồn tại!");

  //   const existingUseremail = await this.ownerModel.findOne({ email }).exec();
  //   if (existingUseremail) throw new BadRequestException("Email đã tồn tại!");

  //   const existingUserphone = await this.ownerModel.findOne({ phone }).exec();
  //   if (existingUserphone) throw new BadRequestException("Phone đã tồn tại!");

  //   const newUser = await this.ownerModel.create({
  //     username,
  //     email,
  //     password,
  //     phone,
  //   });

  //   const token = await this.authService.signToken(newUser.email);

  //   return {
  //     message: "Đăng ký thành công!",
  //     user: newUser,
  //     token,
  //   };
  // }
}
