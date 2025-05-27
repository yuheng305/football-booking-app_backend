import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { ApiTags, ApiOkResponse, ApiOperation , ApiBearerAuth} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { OwnerDto } from 'src/auth/dto/owner.dto';


@UseGuards(JwtGuard)
@ApiTags('owners')
@Controller('owners')
@ApiBearerAuth()
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy thông tin tất cả các chủ sân' })
  @ApiOkResponse({
    description: 'Danh sách tất cả các chủ sân',
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
          clusterName: { type: 'string' },
          address: { type: 'string' },
        },
      },
    },
  })
  async getAllOwners() {
    return this.ownerService.getAllBasicInfo(); // hoặc findAll() tuỳ theo bạn
  }





  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin chủ sân theo ID' })
  async getOwnerById(@Param('id') id: string) {
    return this.ownerService.getOwnerById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Chỉnh sửa thông tin chủ sân theo ID' })
  async editOwner(@Param('id') id: string, @Body() dto: OwnerDto) {
    return this.ownerService.editOwner(id, dto);
  }
}
