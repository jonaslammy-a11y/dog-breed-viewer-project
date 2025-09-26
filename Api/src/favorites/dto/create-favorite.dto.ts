import { IsUrl } from 'class-validator';

export class CreateFavoriteDto {
  @IsUrl()
  imageUrl: string;
}