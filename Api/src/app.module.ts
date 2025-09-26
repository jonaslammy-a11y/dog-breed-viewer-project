import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtModule } from '@nestjs/jwt'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Loads .env
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_PATH,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Auto-create tables (dev only)
    }),
    // FIX: The ThrottlerModule.forRoot() now expects an array of options.
    ThrottlerModule.forRoot([{
      ttl: 60, // 60s window
      limit: 100, // 100 requests
    }]),
    JwtModule.register({ // Add this configuration
      secret: process.env.JWT_SECRET, // Use JWT secret from .env
      signOptions: { expiresIn: '30m' }, // Token expiration time
    }),
    FavoritesModule, // Add after creating
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
