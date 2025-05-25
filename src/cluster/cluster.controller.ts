import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ClusterService } from './cluster.service';
import { Cluster } from '../schemas/cluster.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { JwtPayLoad } from 'src/common/model/jwt.payload';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@ApiTags('clusters') // <-- trùng với tag ở bước 2
@UseGuards(JwtGuard)
@Controller('clusters')
@ApiBearerAuth()
export class ClusterController {
  constructor(private readonly clusterService: ClusterService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả cụm sân' })
  @ApiResponse({ status: 200, description: 'Danh sách cụm sân trả về thành công' })
  async getAll(@GetUser() JwtPayLoad): Promise<Cluster[]> {
    return this.clusterService.getAllClusters();

  }

  @Get(':city')
  @ApiOperation({ summary: 'Lấy danh sách cụm sân theo thành phố' })
  @ApiResponse({ status: 200, description: 'Danh sách cụm sân theo thành phố trả về thành công' })
  async getByCity(@GetUser() JwtPayLoad, @Param('city') city: string): Promise<Cluster[]> {
    return this.clusterService.getClusterByCity(city);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin cụm sân theo ownerID' })
  @ApiResponse({ status: 200, description: 'Thông tin cụm sân trả về thành công', type: Cluster })
  async getById(@Param('id') id: string): Promise<Cluster[]> {
    return this.clusterService.getClusterById(id);
  }
}
