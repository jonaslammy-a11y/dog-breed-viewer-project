import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesService } from './favorites.service';
import { FavoritesResolver } from './favorites.resolver';
import { Favorite } from './entities/favorite.entity';
import { AuthModule } from '../auth/auth.module'; // Import AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite]),
    AuthModule, // Use AuthModule instead of ConfigModule directly
  ],
  providers: [FavoritesService, FavoritesResolver],
})
export class FavoritesModule {}