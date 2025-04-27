import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // 🛠 Fake user dữ liệu cứng
  private readonly fakeUser = {
    username: 'admin',
    password: '123456',
    userId: '1',
  };

  // 🛠 Hàm login để xác thực và trả JWT
  async login(username: string, password: string) {
    if (username !== this.fakeUser.username || password !== this.fakeUser.password) {
      throw new UnauthorizedException('Tài khoản hoặc mật khẩu không đúng');
    }

    const payload = { username: this.fakeUser.username, sub: this.fakeUser.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
