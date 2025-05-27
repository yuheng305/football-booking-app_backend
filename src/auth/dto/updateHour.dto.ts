// src/field/dto/update-field-status.dto.ts
import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateHourDto {
    @ApiProperty({ example: '08:00', description: 'Opening hour of the field' })
    openHour: number;
    
    @ApiProperty({ example: '20:00', description: 'Closing hour of the field' })
    closeHour: number;
}
