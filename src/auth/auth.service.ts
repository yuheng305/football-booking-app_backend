import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config"; // <--- thêm dòng này
import { JwtPayLoad } from "src/common/model/jwt.payload";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService, // <--- thêm lại vào constructor
  ) {}

  async signToken(userid: string) {
    const tokenPayload = {
      email: userid,
    } as JwtPayLoad;

    return this.jwtService.signAsync(tokenPayload, {
      secret: this.configService.get<string>("JWT_SECRET"), // <--- dùng this.configService
      expiresIn: "300d",
    });
  }
}
