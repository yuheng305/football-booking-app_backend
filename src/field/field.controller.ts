import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FieldService } from './field.service';
import { Field } from '../schemas/field.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { JwtPayLoad } from 'src/common/model/jwt.payload';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@ApiTags('fields') // <-- trùng với tag ở bước 2
@UseGuards(JwtGuard)
@Controller('fields')
@ApiBearerAuth()
export class FieldController {
  constructor(private readonly fieldService: FieldService) {}

}
