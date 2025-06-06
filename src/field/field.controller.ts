import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { FieldService } from './field.service';
import { Field } from '../schemas/field.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { JwtPayLoad } from 'src/common/model/jwt.payload';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { FieldDto } from 'src/auth/dto/field.dto';
import { FieldResponseDto } from 'src/auth/dto/fieldresponse.dto';
import { UpdateFieldStatusDto } from 'src/auth/dto/updateFieldStatus.dto';
import { UpdateHourDto } from 'src/auth/dto/updateHour.dto';

@ApiTags('fields') // <-- trùng với tag ở bước 2
@UseGuards(JwtGuard)
@Controller('fields')
@ApiBearerAuth()
export class FieldController {
  constructor(private readonly fieldService: FieldService) {}

  // @Get(':clusterId')
  // @ApiOperation({ summary: 'Get all fields in a cluster' })
  // @ApiResponse({ status: 200, description: 'Get all fields in a cluster successfully', type: [Field] })
  // @ApiParam({
  // name: 'clusterId',
  // required: true,
  // description: 'The ID of the cluster to fetch fields from',
  // example: '6809b04e7456305b0fb34f5b',
  // })
  // async getAllFieldsInCluster(
  //   @Param('clusterId') clusterId: string
  // ): Promise<Field[]> {
  //   return this.fieldService.getAllFieldsInCluster(clusterId);
  // }


  @Post('')
  async createField(@Body() createFieldDto: FieldDto): Promise<Field> {
  return this.fieldService.createField(createFieldDto);
}

  // @Patch(':fieldId/available')
  // @ApiOperation({ summary: 'Update field to available' })
  // @ApiResponse({ status: 200, description: 'Field updated to available successfully', type: Field })
  // async updateFieldToAvailable(
  //   @Param('fieldId') fieldId: string
  // ): Promise<Field> {
  //   return this.fieldService.updateFieldToAvailable(fieldId);
  // }

  // @Patch(':fieldId/maintenance')
  // @ApiOperation({ summary: 'Update field to maintenance' })
  // @ApiResponse({ status: 200, description: 'Field updated to maintenance successfully', type: Field })
  // async updateFieldToMaintenance(
  //   @Param('fieldId') fieldId: string
  // ): Promise<Field> {
  //   return this.fieldService.updateFieldToMaintain(fieldId);
  // }

  @Patch(':fieldId/status')
  @ApiOperation({ summary: 'Update field status' })
  @ApiResponse({ status: 200, description: 'Field status updated successfully', type: Field })
  async updateFieldToMaintenance(
    @Param('fieldId') fieldId: string,
    @Body() dto: UpdateFieldStatusDto 
  ): Promise<Field> {
    return this.fieldService.updateFieldStatus(fieldId, dto);
  }

  @Patch(':fieldId/hour')
  @ApiOperation({ summary: 'Update field start and close hour' })
  @ApiResponse({ status: 200, description: 'Field hour updated successfully', type: Field })
  async updateHourOfField(
    @Param('fieldId') fieldId: string,
    @Body() dto: UpdateHourDto 
  ): Promise<Field> {
    return this.fieldService.updateFieldHours(fieldId, dto);
  }


  @Get(':clusterId')
  @ApiOperation({ summary: 'Get all fields in a cluster in a day at a hour' })
  @ApiResponse({ status: 200, description: 'Get all fields in a cluster successfully', type: [FieldResponseDto] })
  @ApiParam({
    name: 'clusterId',
    required: true,
    description: 'The ID of the cluster to fetch fields from',
    example: '6809b04e7456305b0fb34f5b',
  })
  @ApiQuery({
    name: 'date',
    required: true,
    description: 'Ngày cần kiểm tra (YYYY-MM-DD)',
    example: '2025-04-24',
  })
  @ApiQuery({
    name: 'hour',
    required: true,
    description: 'Giờ cần kiểm tra (ví dụ: 7 cho 7:00)',
    example: 7,
  })
  async getAllFieldsInClusterByDateAndHour(
    @Param('clusterId') clusterId: string,
    @Query('date') date: string,
    @Query('hour') hour: number
  ): Promise<FieldResponseDto[]> {
    return this.fieldService.getAllFieldsInClusterByDateAndHour(clusterId, date, hour);
  }

  @Get('owner/:ownerId')
  @ApiOperation({ summary: 'Get all fields of a owner' })
  @ApiResponse({ status: 200, description: 'Get all fields of a owner successfully', type: [Field] })
  async getAllFieldsOfOwner(
    @Param('ownerId') ownerId: string
  ): Promise<Field[]> {
    return this.fieldService.getAllFieldsOfOwner(ownerId);
  }

  //delete field
  @Delete(':fieldId')
  @ApiOperation({ summary: 'Delete a field' })
  @ApiResponse({ status: 200, description: 'Field deleted successfully', type: Field })
  async deleteField(
    @Param('fieldId') fieldId: string
  ): Promise<string> {
    return this.fieldService.deleteField(fieldId);
  }
}
