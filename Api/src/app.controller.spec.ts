import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './favorites/favourites.controller';
import { AppService } from './favorites/favorites.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Select a breed to view images"', () => {
      expect(appController.getAll()).toBe('affenpinscher');
    });
  });
});
