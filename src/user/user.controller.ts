import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UserDto } from 'src/auth/dto/user.dto';
import { PasswordDto } from 'src/auth/dto/password.dto';

@UseGuards(JwtGuard)
@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy thông tin tất cả người dùng' })
  @ApiOkResponse({
    description: 'Danh sách tất cả người dùng',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          fullName: { type: 'string' },
          username: { type: 'string' },
          phone: { type: 'string' },
          email: { type: 'string' },
          // Thêm các trường khác nếu cần
        },
      },
    },
  })
  async getAllUsers() {
    return this.userService.getAllBasicInfo(); // hoặc findAll() tuỳ theo bạn
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin người dùng theo ID' })
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Chỉnh sửa thông tin người dùng theo ID' })
  async editUser(@Param('id') id: string, @Body() dto: UserDto) {
    return this.userService.editUser(id, dto);
  }
  
  @Patch(':id/password')
  @ApiOperation({ summary: 'Thay đổi mật khẩu người dùng' })
  async changePassword(@Param('id') id: string, @Body() dto: PasswordDto) {
    return this.userService.changePassword(id, dto);
  }
}