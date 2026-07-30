import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthServiceService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.prisma.users.findUnique({
      where: { username },
      include: {
        user_roles: {
          include: {
            roles: true
          }
        }
      }
    });

    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      
      // Determine role (default to ADMIN if none found for now)
      let roleCode = 'ADMIN';
      if (user.user_roles && user.user_roles.length > 0) {
         roleCode = user.user_roles[0].roles.code.toUpperCase();
      }

      return { ...result, role: roleCode };
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
        username: user.username, 
        sub: user.id,
        role: user.role,
        name: `${user.first_name} ${user.last_name || ''}`.trim()
    };
    return {
      access_token: this.jwtService.sign(payload),
      user_info: payload
    };
  }
}
