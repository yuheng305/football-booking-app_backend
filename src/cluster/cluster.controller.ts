import { Controller, Get, Param, UseGuards, Post, Query, Delete } from '@nestjs/common';
import { ClusterService } from './cluster.service';
import { Cluster } from '../schemas/cluster.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { JwtPayLoad } from 'src/common/model/jwt.payload';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { StaticService } from 'src/schemas/service.schema';
import { DynamicService } from 'src/schemas/service.schema';



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

  @Get('/:clusterId')
  @ApiOperation({ summary: 'Lấy thông tin cụm sân theo clusterId' })
  @ApiResponse({ status: 200, description: 'Thông tin cụm sân trả về thành công', type: Cluster })
  async getByClusterId(@GetUser() JwtPayLoad, @Param('clusterId') clusterId: string): Promise<Cluster | null> {
    return this.clusterService.getClusterByClusterId(clusterId);
  }

  @Get('/city/:city')
  @ApiOperation({ summary: 'Lấy danh sách cụm sân theo thành phố' })
  @ApiResponse({ status: 200, description: 'Danh sách cụm sân theo thành phố trả về thành công' })
  async getByCity(@GetUser() JwtPayLoad, @Param('city') city: string): Promise<Cluster[]> {
    return this.clusterService.getClusterByCity(city);
  }

  @Get('/owner/:ownerId')
  @ApiOperation({ summary: 'Lấy thông tin cụm sân theo ownerID' })
  @ApiResponse({ status: 200, description: 'Thông tin cụm sân trả về thành công', type: Cluster })
  async getById(@Param('id') id: string): Promise<Cluster[]> {
    return this.clusterService.getClusterById(id);
  }

  @Get(':clusterId/static-services')
  @ApiOperation({ summary: 'Lấy danh sách dịch vụ tĩnh của cụm sân' })
  @ApiResponse({ status: 200, description: 'Danh sách dịch vụ tĩnh trả về thành công' })
  async getStaticServices(@Param('clusterId') clusterId: string): Promise<StaticService[]> {
    return this.clusterService.getStaticServices(clusterId);
  }

  @Get(':clusterId/dynamic-services')
  @ApiOperation({ summary: 'Lấy danh sách dịch vụ động của cụm sân' })
  @ApiResponse({ status: 200, description: 'Danh sách dịch vụ động trả về thành công' })
  async getDynamicServices(@Param('clusterId') clusterId: string): Promise<DynamicService[]> {
    return this.clusterService.getDynamicServices(clusterId);
  }

  @Post(':clusterId/static-services')
  @ApiOperation({ summary: 'Thêm dịch vụ tĩnh vào cụm sân' })
  @ApiResponse({ status: 200, description: 'Dịch vụ tĩnh được thêm vào cụm sân thành công', type: Cluster })
  async addStaticServiceToCluster(
    @Param('clusterId') clusterId: string,
    @Query('name') name: string,
    @Query('price') price: number
  ): Promise<Cluster> {
    return this.clusterService.addStaticServiceToCluster(clusterId, name, price);
  }

  @Post(':clusterId/dynamic-services')
  @ApiOperation({ summary: 'Thêm dịch vụ động vào cụm sân' })
  @ApiResponse({ status: 200, description: 'Dịch vụ động được thêm vào cụm sân thành công', type: Cluster })
  async addDynamicServiceToCluster(
    @Param('clusterId') clusterId: string,
    @Query('name') name: string,
    @Query('price') price: number
  ): Promise<Cluster> {
    return this.clusterService.addDynamicServiceToCluster(clusterId, name, price);
  }

  // Edit static service
  @Post(':clusterId/static-services/edit')
  @ApiOperation({ summary: 'Chỉnh sửa dịch vụ tĩnh của cụm sân' })
  @ApiResponse({ status: 200, description: 'Dịch vụ tĩnh được chỉnh sửa thành công', type: Cluster })
  async editStaticService(
    @Param('clusterId') clusterId: string,
    @Query('name') name: string,
    @Query('price') price: number
  ): Promise<Cluster> {
    return this.clusterService.editStaticService(clusterId, name, price);
  }

  // Edit dynamic service
  @Post(':clusterId/dynamic-services/edit')
  @ApiOperation({ summary: 'Chỉnh sửa dịch vụ động của cụm sân' })
  @ApiResponse({ status: 200, description: 'Dịch vụ động được chỉnh sửa thành công', type: Cluster })
  async editDynamicService(
    @Param('clusterId') clusterId: string,
    @Query('name') name: string,
    @Query('price') price: number
  ): Promise<Cluster> {
    return this.clusterService.editDynamicService(clusterId, name, price);
  }

  //delete dynamic service
  @Delete(':clusterId/dynamic-services/delete')
  @ApiOperation({ summary: 'Xóa dịch vụ động của cụm sân' })
  @ApiResponse({ status: 200, description: 'Dịch vụ động được xóa thành công', type: Cluster })
  async deleteDynamicService(
    @Param('clusterId') clusterId: string,
    @Query('name') name: string
  ): Promise<Cluster> {
    return this.clusterService.deleteDynamicService(clusterId, name);
  }

}
