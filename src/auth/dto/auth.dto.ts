import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, isNotEmpty, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({
    example: "nguyenvana",
  })
  @IsNotEmpty({ message: "Username is required" })
  @IsString({ message: "Username must be a string" })
  username: string;

  @ApiProperty({
    example: "123",
  })
  @IsNotEmpty({ message: "Password is required" })
  @IsString({ message: "Password must be a string" })
  password: string;
}

export class RegisterDto {
  @ApiProperty({
    example: "Nguyen Van A",
    description: "Họ và tên người dùng"
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({
    example: "username123",
    description: "Tên đăng nhập"
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: "password123",
    description: "Mật khẩu"
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: "0123456789",
    description: "Số điện thoại"
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    example: "user@example.com",
    description: "Email người dùng"
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;
}
