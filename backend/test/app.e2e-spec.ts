import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { FavoritesModule } from './favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './favorites/entities/favorite.entity';

describe('FavoritesController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        FavoritesModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Favorite],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/favorites (GET) - should return empty array when no favorites', () => {
    return request(app.getHttpServer())
      .get('/favorites')
      .expect(200)
      .expect([]);
  });

  it('/favorites (POST) - should add a favorite', async () => {
    const imageUrl = 'https://images.dog.ceo/breeds/bulldog/image1.jpg';
    
    await request(app.getHttpServer())
      .post('/favorites')
      .send({ imageUrl })
      .expect(201)
      .expect(imageUrl);

    // Verify it was added by checking the GET endpoint
    const response = await request(app.getHttpServer())
      .get('/favorites')
      .expect(200);

    expect(response.body).toContain(imageUrl);
  });

  it('/favorites (POST) - should return conflict when adding duplicate', async () => {
    const imageUrl = 'https://images.dog.ceo/breeds/bulldog/image1.jpg';
    
    // Add first time
    await request(app.getHttpServer())
      .post('/favorites')
      .send({ imageUrl });

    // Try to add duplicate
    await request(app.getHttpServer())
      .post('/favorites')
      .send({ imageUrl })
      .expect(409);
  });

  it('/favorites/:imageUrl (DELETE) - should remove a favorite', async () => {
    const imageUrl = 'https://images.dog.ceo/breeds/bulldog/image2.jpg';
    
    // First add a favorite
    await request(app.getHttpServer())
      .post('/favorites')
      .send({ imageUrl });

    // Then remove it
    await request(app.getHttpServer())
      .delete(`/favorites/${encodeURIComponent(imageUrl)}`)
      .expect(200);

    // Verify it was removed
    const response = await request(app.getHttpServer())
      .get('/favorites')
      .expect(200);

    expect(response.body).not.toContain(imageUrl);
  });
});