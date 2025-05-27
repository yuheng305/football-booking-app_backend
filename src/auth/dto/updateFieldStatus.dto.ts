// src/field/dto/update-field-status.dto.ts
import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFieldStatusDto {
  @ApiProperty({ example: true, description: 'Whether the field is under maintenance' })
  @IsBoolean()
  isMaintain: boolean;
}
