// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClusterModule } from './cluster/cluster.module'; // ví dụ module bạn tạo
import { OwnerModule } from './owner/owner.module'; // thêm module Owner vào đây

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://huynguyen2004:3tjDjDwV828i3oRe@cluster0.uf4jyzj.mongodb.net/football?retryWrites=true&w=majority&appName=Cluster0'), // football là tên database
    ClusterModule,
    OwnerModule, // thêm module Owner vào đây
  ],
})
export class AppModule {}

