import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findUserByEmail(email);

    const passwordMatch = await compare(pass, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    const resp = {
      user: user.email,
      access_token: await this.jwtService.signAsync(payload),
    };
    return resp;
  }
}
