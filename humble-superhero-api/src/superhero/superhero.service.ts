import { Injectable } from '@nestjs/common';
import { Superhero } from './superhero.model';
import { CreateSuperheroDto } from './dto/create-superhero.dto';

@Injectable()
export class SuperheroService {
  private superheroes: Superhero[] = [];
  private nextId = 1;

  create(createSuperheroDto: CreateSuperheroDto): Superhero {
    const existingHero = this.superheroes.find(
      (hero) =>
        hero.name.toLowerCase() === createSuperheroDto.name.toLowerCase(),
    );

    if (existingHero) {
      throw new Error('A superhero with this name already exists.');
    }

    const newSuperhero: Superhero = {
      id: this.nextId++,
      ...createSuperheroDto,
    };
    this.superheroes.push(newSuperhero);
    return newSuperhero;
  }

  findAll(): Superhero[] {
    return this.superheroes
      .slice()
      .sort((a, b) => b.humilityScore - a.humilityScore);
  }
}
