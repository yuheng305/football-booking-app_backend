import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getClusterByClusterId(clusterId: string) {
    const cluster = this.clusterModel.findById(clusterId).exec();
    if (!cluster) {
      throw new NotFoundException('Cluster not found');
    }
    return cluster;
  }

  async getClusterById(id: string) {
    return this.clusterModel.find({ ownerID: id }).exec();
  }

  async addStaticServiceToCluster(clusterId: string, name: string, price: number) {
    const cluster = await this.clusterModel.findById(clusterId).exec();
    if (!cluster) {
      throw new NotFoundException('Cluster not found');
    }
    cluster.staticServices.push({ name, price });
    return cluster.save();
  }

  async addDynamicServiceToCluster(clusterId: string, name: string, price: number) {
    const cluster = await this.clusterModel.findById(clusterId).exec();
    if (!cluster) {
      throw new NotFoundException('Cluster not found');
    }
    cluster.dynamicServices.push({ name, price });
    return cluster.save();
  }

  async getStaticServices(clusterId: string) {
    const cluster = await this.clusterModel.findById(clusterId).exec();
    if (!cluster) {
      throw new NotFoundException('Cluster not found');
    }
    return cluster.staticServices;
  }

  async getDynamicServices(clusterId: string) {
    const cluster = await this.clusterModel.findById(clusterId).exec();
    if (!cluster) {
      throw new NotFoundException('Cluster not found');
    }
    return cluster.dynamicServices;
  }

  //edit services
  async editStaticService(clusterId: string, name: string, price: number) {
    const cluster = await this.clusterModel.findById(clusterId).exec();
    if (!cluster) {
      throw new NotFoundException('Cluster not found');
    }
    const serviceIndex = cluster.staticServices.findIndex(service => service.name === name);
    if (serviceIndex === -1) {
      throw new NotFoundException('Service not found');
    }
    cluster.staticServices[serviceIndex].price = price;
    return cluster.save();
  }

  async editDynamicService(clusterId: string, name: string, price: number) {
    const cluster = await this.clusterModel.findById(clusterId).exec();
    if (!cluster) {
      throw new NotFoundException('Cluster not found');
    }
    const serviceIndex = cluster.dynamicServices.findIndex(service => service.name === name);
    if (serviceIndex === -1) {
      throw new NotFoundException('Service not found');
    }
    cluster.dynamicServices[serviceIndex].price = price;
    return cluster.save();
  }

  //delete dynamic service
  async deleteDynamicService(clusterId: string, name: string) {
    const cluster = await this.clusterModel.findById(clusterId).exec();
    if (!cluster) {
      throw new NotFoundException('Cluster not found');
    }
    const serviceIndex = cluster.dynamicServices.findIndex(service => service.name === name);
    if (serviceIndex === -1) {
      throw new NotFoundException('Service not found');
    }
    cluster.dynamicServices.splice(serviceIndex, 1);
    return cluster.save();
  }
}
