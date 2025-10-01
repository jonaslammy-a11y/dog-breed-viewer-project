import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { AuthService } from './auth.service';

@Injectable()
export class DummyJsonStrategy extends PassportStrategy(Strategy, 'dummyjson') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(token: string): Promise<any> {
    console.log(
      'Backend - Received token:',
      token ? `Present (length: ${token.length})` : 'Missing',
    );

    try {
      // Use the injected AuthService instead of axios directly
      const userData = await this.authService.verifyToken(token);

      console.log('Backend - Token validation successful');
      return userData;
    } catch (error) {
      console.error('Backend - Token validation failed:', error.message);
      throw new Error('Invalid token');
    }
  }
}
