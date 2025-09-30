import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { AuthService } from './auth.service'; 

@Injectable()
export class DummyJsonStrategy extends PassportStrategy(Strategy, 'dummyjson') {
  constructor(private authService: AuthService) { // Inject AuthService
    super();
  }

  async validate(token: string): Promise<any> {
    try {
      const user = await this.authService.verifyToken(token);
      return user;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}