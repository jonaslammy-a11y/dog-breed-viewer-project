import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesController } from './favorites/favorites.controller';
import { FavoritesService } from './favorites/favorites.service';

describe('FavoritesController', () => {
  let controller: FavoritesController;
  let service: FavoritesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritesController],
      providers: [
        {
          provide: FavoritesService,
          useValue: {
            getAll: jest.fn(),
            add: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FavoritesController>(FavoritesController);
    service = module.get<FavoritesService>(FavoritesService);
  });

  describe('getAll', () => {
    it('should return an array of favorite image URLs', async () => {
      const result = ['https://images.dog.ceo/breeds/bulldog/image1.jpg'];
      jest.spyOn(service, 'getAll').mockResolvedValue(result);

      expect(await controller.getAll()).toEqual(result);
      expect(service.getAll).toHaveBeenCalled();
    });
  });

  describe('add', () => {
    it('should add a favorite and return the image URL', async () => {
      const dto = { imageUrl: 'https://images.dog.ceo/breeds/bulldog/image1.jpg' };
      const result = dto.imageUrl;
      jest.spyOn(service, 'add').mockResolvedValue(result);

      expect(await controller.add(dto)).toEqual(result);
      expect(service.add).toHaveBeenCalledWith(dto);
    });
  });

  describe('remove', () => {
    it('should remove a favorite', async () => {
      const imageUrl = 'https://images.dog.ceo/breeds/bulldog/image1.jpg';
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await controller.remove(imageUrl);
      expect(service.remove).toHaveBeenCalledWith(imageUrl);
    });
  });
});