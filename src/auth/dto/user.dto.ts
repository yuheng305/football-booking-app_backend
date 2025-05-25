import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    
    @ApiProperty({ example: 'Nguyen Van A', description: 'Họ và tên người dùng' })
    fullName: string;

    @ApiProperty({ example: 'nguyenvana', description: 'Tên đăng nhập' })
    username: string;
    
    @ApiProperty({ example: '12345678', description: 'Mật khẩu người dùng' })
    password: string;
    
    @ApiProperty({ example: '0123456789', description: 'Số điện thoại người dùng' })
    phone: string;
    
    @ApiProperty({ example: 'abc@gmail.com', description: 'Email người dùng' })
    email: string;

}