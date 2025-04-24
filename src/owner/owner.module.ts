import { Controller, Get } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { Owner, OwnerSchema } from 'src/schemas/owner.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { Module } from '@nestjs/common';
import { OwnerController } from './owner.controller';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Owner.name, schema: OwnerSchema }]),
  ],
  controllers: [OwnerController],
  providers: [OwnerService],
})
export class OwnerModule {}
