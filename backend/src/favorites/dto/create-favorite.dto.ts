import { IsUrl } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateFavoriteDto {
  @Field()
  @IsUrl()
  imageUrl: string;
}
