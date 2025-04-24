import { Controller, Get } from '@nestjs/common';
import { ClusterService } from './cluster.service';

@Controller('clusters')
export class ClusterController {
  constructor(private readonly clusterService: ClusterService) {}

  @Get()
  async getAll() {
    return this.clusterService.getAllClusters();
  }
}
