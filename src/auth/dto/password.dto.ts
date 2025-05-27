import { ApiProperty } from '@nestjs/swagger';

export class PasswordDto {
    @ApiProperty({ example: '12345678', description: 'Mật khẩu cũ của chủ sân' })
    oldPassword: string;
    
    @ApiProperty({ example: '12345678', description: 'Mật khẩu mới của chủ sân' })
    newPassword: string;

    @ApiProperty({ example: '12345678', description: 'Xác nhận mật khẩu mới của chủ sân' })
    confirmNewPassword: string;
}