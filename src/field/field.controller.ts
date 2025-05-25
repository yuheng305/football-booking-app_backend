import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FieldService } from './field.service';
import { Field } from '../schemas/field.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { JwtPayLoad } from 'src/common/model/jwt.payload';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { FieldDto } from 'src/auth/dto/field.dto';

@ApiTags('fields') // <-- trùng với tag ở bước 2
@UseGuards(JwtGuard)
@Controller('fields')
@ApiBearerAuth()
export class FieldController {
  constructor(private readonly fieldService: FieldService) {}

  @Get(':clusterId')
  @ApiOperation({ summary: 'Get all fields in a cluster' })
  @ApiResponse({ status: 200, description: 'Get all fields in a cluster successfully', type: [Field] })
  async getAllFieldsInCluster(
    @Param('clusterId') clusterId: string
  ): Promise<Field[]> {
    return this.fieldService.getAllFieldsInCluster(clusterId);
  }

  @Get(':fieldId/:date/:startHour')
  @ApiOperation({ summary: 'Check field availability' })
  @ApiResponse({ status: 200, description: 'Check field availability successfully' })
  async checkFieldAvailability(
    @Param('fieldId') fieldId: string,
    @Param('date') date: string,
    @Param('startHour') startHour: number
  ): Promise<string> {
    return this.fieldService.checkFieldAvailability(fieldId, date, startHour);
  }

  @Post('')
  async createField(@Body() createFieldDto: FieldDto): Promise<Field> {
  return this.fieldService.createField(createFieldDto);
}
}
