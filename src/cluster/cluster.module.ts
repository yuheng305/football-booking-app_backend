import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cluster, ClusterSchema } from '../schemas/cluster.schema';
import { ClusterService } from './cluster.service';
import { ClusterController } from './cluster.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cluster.name, schema: ClusterSchema }]),
  ],
  controllers: [ClusterController],
  providers: [ClusterService],
})
export class ClusterModule {}
