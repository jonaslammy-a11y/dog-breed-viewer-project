import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FavoritesService } from './favorites.service';
import { Favorite } from './entities/favorite.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GqlThrottlerGuard } from '../auth/gql-throttler.guard'; 

@Resolver(() => Favorite)
export class FavoritesResolver {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Query(() => [Favorite])
  @UseGuards(JwtAuthGuard, GqlThrottlerGuard) 
  async favorites(): Promise<Favorite[]> {
    return this.favoritesService.getAllFavorites();
  }

  @Query(() => [String])
  @UseGuards(JwtAuthGuard, GqlThrottlerGuard) 
  async favoritesUrls(): Promise<string[]> {
    const favorites = await this.favoritesService.getAllFavorites();
    return favorites.map(favorite => favorite.imageUrl);
  }

  @Mutation(() => Favorite)
  @UseGuards(JwtAuthGuard, GqlThrottlerGuard) 
  async addFavorite(@Args('input') createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
    return this.favoritesService.add(createFavoriteDto);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard, GqlThrottlerGuard) 
  async removeFavorite(@Args('imageUrl') imageUrl: string): Promise<boolean> {
    await this.favoritesService.remove(imageUrl);
    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard, GqlThrottlerGuard) 
  async removeFavoriteById(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    await this.favoritesService.removeById(id);
    return true;
  }
}