import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cluster } from '../schemas/cluster.schema';

@Injectable()
export class ClusterService {
  constructor(
    @InjectModel(Cluster.name) private clusterModel: Model<Cluster>,
  ) {}

  async getAllClusters() {
    return this.clusterModel.find().exec();
  }
}
