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

  async getClusterByCity(city: string) {
    return this.clusterModel.find({ city }).exec();
  }

  async getClusterById(id: string) {
    return this.clusterModel.find({ ownerID: id }).exec();
  }

  async addStaticServiceToCluster(clusterId: string, name: string, price: number) {
    const cluster = await this.clusterModel.findById(clusterId).exec();
    if (!cluster) {
      throw new Error('Cluster not found');
    }
    cluster.staticServices.push({ name, price });
    return cluster.save();
  }

  async addDynamicServiceToCluster(clusterId: string, name: string, price: number) {
    const cluster = await this.clusterModel.findById(clusterId).exec();
    if (!cluster) {
      throw new Error('Cluster not found');
    }
    cluster.dynamicServices.push({ name, price });
    return cluster.save();
  }

  async getStaticServices(clusterId: string) {
    const cluster = await this.clusterModel.findById(clusterId).exec();
    if (!cluster) {
      throw new Error('Cluster not found');
    }
    return cluster.staticServices;
  }

  async getDynamicServices(clusterId: string) {
    const cluster = await this.clusterModel.findById(clusterId).exec();
    if (!cluster) {
      throw new Error('Cluster not found');
    }
    return cluster.dynamicServices;
  }
}
