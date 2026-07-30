import { Controller, Post, Body, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/response.dto';
@ApiTags('Auth')
@ApiResponse({ status: 500, description: 'Internal Server Error.' })
@Controller()
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user and return JWT token' })
  @ApiBody({ schema: { type: 'object', properties: { username: { type: 'string', example: 'admin' }, password: { type: 'string', example: 'password123' } } } })
  @ApiResponse({ status: 200, description: 'Berhasil login.', type: LoginResponseDto })
  @ApiResponse({ status: 400, description: 'Bad Request - Username dan Password harus diisi.' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Kredensial tidak valid.' })
  async login(@Body() req: any) {
    const { username, password } = req;
    if(!username || !password) {
      throw new UnauthorizedException('Username dan password harus diisi');
    }

    const user = await this.authServiceService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Username atau password salah');
    }
    return this.authServiceService.login(user);
  }
}
