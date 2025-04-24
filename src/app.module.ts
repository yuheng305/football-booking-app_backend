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

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://huynguyen2004:3tjDjDwV828i3oRe@cluster0.uf4jyzj.mongodb.net/football?retryWrites=true&w=majority&appName=Cluster0'), // football là tên database
    ClusterModule,
  ],
})
export class AppModule {}

