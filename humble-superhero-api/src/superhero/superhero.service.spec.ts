import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroService } from './superhero.service';

describe('SuperheroService', () => {
  let service: SuperheroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperheroService],
    }).compile();

    service = module.get<SuperheroService>(SuperheroService);
  });

  it('should create a superhero and sort by humility score', () => {
    const hero1 = service.create({
      name: 'Humble Hero',
      superpower: 'Modesty',
      humilityScore: 9,
    });

    const hero2 = service.create({
      name: 'Less Humble Hero',
      superpower: 'Bragging',
      humilityScore: 3,
    });

    const heroes = service.findAll();

    expect(heroes[0].name).toBe('Humble Hero');
    expect(heroes[1].name).toBe('Less Humble Hero');
  });
});
