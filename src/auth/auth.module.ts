import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { MongooseModule } from "@nestjs/mongoose";
import { Owner, OwnerSchema } from "src/schemas/owner.schema";
import { User, UserSchema } from "src/schemas/user.schema"; // Thêm dòng này

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: Owner.name, schema: OwnerSchema },
      { name: User.name, schema: UserSchema }, // Thêm dòng này
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}