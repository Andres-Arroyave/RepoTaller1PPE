import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);
    const token = this.generateToken(user.id, user.email, user.nombre);

    return {
      message: 'Usuario registrado exitosamente',
      user,
      accessToken: token,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const { password, ...userWithoutPassword } = user;
    const token = this.generateToken(user.id, user.email, user.nombre);

    return {
      message: 'Inicio de sesión exitoso',
      user: userWithoutPassword,
      accessToken: token,
    };
  }

  private generateToken(userId: string, email: string, nombre: string) {
    const payload = { sub: userId, email, nombre };
    return this.jwtService.sign(payload);
  }
}
