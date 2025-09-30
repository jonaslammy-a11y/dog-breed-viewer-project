import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { DummyJsonStrategy } from './dummyjson.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    HttpModule, 
  ],
  providers: [DummyJsonStrategy, JwtAuthGuard, AuthService], 
  exports: [DummyJsonStrategy, JwtAuthGuard, AuthService], 
})
export class AuthModule {}