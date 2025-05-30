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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClusterModule } from './cluster/cluster.module';
import { OwnerModule } from './owner/owner.module';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { Field } from './schemas/field.schema';
import { FieldModule } from './field/field.module';
import { User } from './schemas/user.schema';
import { UserModule } from './user/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SentryModule } from '@sentry/nestjs/setup';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true, // Cho phép dùng ở toàn bộ app
    }),
    SentryModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'), 
      }),
    }),
    ClusterModule,
    OwnerModule,
    AuthModule,
    BookingModule,
    FieldModule,
    UserModule,
  ],
})
export class AppModule {}

