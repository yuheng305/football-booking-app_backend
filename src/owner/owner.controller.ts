import { Controller, Get } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('owners')
@Controller('owners')
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
}
