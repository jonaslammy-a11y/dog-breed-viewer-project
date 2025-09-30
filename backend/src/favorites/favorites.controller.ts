import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly service: FavoritesService) {}

  @Get()
  async getAll(): Promise<string[]> {
    return this.service.getAll();
  }

  @Post()
  async add(@Body() dto: CreateFavoriteDto): Promise<string> {
    const favorite = await this.service.add(dto);
    return favorite.imageUrl; // Extract the imageUrl from the Favorite object
  }

  @Delete(':imageUrl')
  async remove(@Param('imageUrl') imageUrl: string): Promise<void> {
    return this.service.remove(decodeURIComponent(imageUrl)); // Handle URL encoding
  }
}