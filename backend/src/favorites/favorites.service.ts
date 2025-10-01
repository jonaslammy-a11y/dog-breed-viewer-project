import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly repository: Repository<Favorite>,
  ) {}

  async getAllFavorites(): Promise<Favorite[]> {
    return this.repository.find();
  }

  async getAll(): Promise<string[]> {
    const favorites = await this.repository.find();
    return favorites.map((f) => f.imageUrl);
  }

  async add(dto: CreateFavoriteDto): Promise<Favorite> {
    const existing = await this.repository.findOneBy({
      imageUrl: dto.imageUrl,
    });
    if (existing) {
      throw new ConflictException('Image already favorited');
    }
    const favorite = this.repository.create(dto);
    return await this.repository.save(favorite);
  }

  async remove(imageUrl: string): Promise<void> {
    const result = await this.repository.delete({ imageUrl });
    if (result.affected === 0) {
      throw new NotFoundException('Favorite not found');
    }
  }

  async removeById(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Favorite not found');
    }
  }
}
