import { ApiProperty } from '@nestjs/swagger';
import { Field } from 'src/schemas/field.schema';


export class FieldResponseDto {
    field: Field;
    slotbooked: number;

}