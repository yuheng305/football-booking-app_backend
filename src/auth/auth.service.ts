import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayLoad } from "src/common/model/jwt.payload";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    // private config: ConfigService,
  ) {}
  async signToken(email: string) {
    const tokenPayload = {
      email: email,
    } as JwtPayLoad;

    return this.jwtService.signAsync(tokenPayload, {
      secret: "thisismysecret",
      expiresIn: "300d",
    });
  }
}
