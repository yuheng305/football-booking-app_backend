import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsDateString, IsNumber, ValidateNested } from "class-validator";

export class EachServiceDto {
  @ApiProperty({ example: 'Nước suối' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 10000 })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}

export class BookingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  clusterId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fieldId: string;

  @ApiProperty({ example: '2025-04-24' })
  @IsNotEmpty()
  @IsString()
  date: string;

  @ApiProperty({ example: 7 })
  @IsNotEmpty()
  @IsNumber()
  startHour: number;

  @ApiProperty({ type: [EachServiceDto] })
  @ValidateNested({ each: true })
  services: EachServiceDto[];
}
