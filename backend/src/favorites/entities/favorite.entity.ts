import { Entity, PrimaryGeneratedColumn, Column, ObjectType } from 'typeorm';
import { Field, Int, ObjectType as GraphQLObjectType } from '@nestjs/graphql';

@GraphQLObjectType()
@Entity()
export class Favorite {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  imageUrl: string;
}
