import { ApiProperty } from '@nestjs/swagger';

export class OwnerDto {
    
    @ApiProperty({ example: 'Trần Thị B', description: 'Họ và tên chủ sân' })
    fullName: string;

    @ApiProperty({ example: 'tranthib', description: 'Tên đăng nhập' })
    username: string;

    @ApiProperty({ example: '12345678', description: 'Mật khẩu chủ sân' })
    password: string;

    @ApiProperty({ example: '0987654321', description: 'Số điện thoại chủ sân' })
    phone: string;

    @ApiProperty({ example: 'abc@gmail.com', description: 'Email chủ sân' })
    email: string;

    @ApiProperty({ example: 'Sân bóng ABC', description: 'Tên sân bóng' })
    clusterName: string;

    @ApiProperty({ example: '123 Đường ABC, Quận 1, TP.HCM', description: 'Địa chỉ sân bóng' })
    address: string;
}