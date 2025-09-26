import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { Favorite } from './entities/favorite.entity';

@Module({
  // The TypeOrmModule.forFeature() method is crucial here.
  // It registers the `Favorite` entity with the current module,
  // which makes its corresponding repository (`FavoriteRepository`)
  // available for dependency injection in the `FavoritesService`.
  imports: [TypeOrmModule.forFeature([Favorite])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
