import { Controller, Get } from '@nestjs/common';
import { ClusterService } from './cluster.service';
import { Cluster } from '../schemas/cluster.schema';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('clusters') // <-- trùng với tag ở bước 2
@Controller('clusters')
export class ClusterController {
  constructor(private readonly clusterService: ClusterService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả cụm sân' })
  @ApiResponse({ status: 200, description: 'Danh sách cụm sân trả về thành công' })
  async getAll(): Promise<Cluster[]> {
    return this.clusterService.getAllClusters();

  }
}
