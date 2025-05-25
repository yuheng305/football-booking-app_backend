import { ApiProperty } from '@nestjs/swagger';

export class FieldDto {
  @ApiProperty({ example: 'Sân 1', description: 'Tên sân bóng' })
  name: string;

  @ApiProperty({ example: 7, description: 'Giờ mở cửa (ví dụ: 7 cho 7:00)' })
  openHour: number;

  @ApiProperty({ example: 22, description: 'Giờ đóng cửa (ví dụ: 22 cho 22:00)' })
  closeHour: number;

  @ApiProperty({ example: false, description: 'Trạng thái bảo trì' })
  isMaintain: boolean;

  @ApiProperty({ example: '6809b04e7456305b0fb34f5b', description: 'ID chủ sở hữu sân' })
  clusterId: string;

  @ApiProperty({
    type: [Object], // Bạn có thể thay bằng ScheduleDto nếu có
    description: 'Danh sách lịch đặt sân'
  })
  schedules: any[]; // Thay bằng ScheduleDto[] nếu có định nghĩa
}