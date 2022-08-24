import { Test, TestingModule } from '@nestjs/testing';
import { Image } from './image';

describe('Image', () => {
  let provider: Image;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Image],
    }).compile();

    provider = module.get<Image>(Image);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
