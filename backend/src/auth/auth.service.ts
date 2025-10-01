import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private httpService: HttpService) {}

  async verifyToken(token: string): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.get('https://dummyjson.com/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new Error('Token verification failed');
    }
  }
}
