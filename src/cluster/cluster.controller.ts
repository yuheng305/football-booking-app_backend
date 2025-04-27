import { Controller, Get, UseGuards } from '@nestjs/common';
import { ClusterService } from './cluster.service';
import { Cluster } from '../schemas/cluster.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('clusters') // <-- trùng với tag ở bước 2
@Controller('clusters')
export class ClusterController {
  constructor(private readonly clusterService: ClusterService) {}

  @ApiBearerAuth() // <-- thêm Bearer token vào header
  @UseGuards(JwtAuthGuard) // <-- thêm bảo vệ route này bằng JwtAuthGuard
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả cụm sân' })
  @ApiResponse({ status: 200, description: 'Danh sách cụm sân trả về thành công' })
  async getAll(): Promise<Cluster[]> {
    return this.clusterService.getAllClusters();

  }
}
