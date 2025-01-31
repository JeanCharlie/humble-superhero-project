import {
  Controller,
  Post,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SuperheroService } from './superhero.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { Superhero } from './superhero.model';

@Controller('superheroes')
export class SuperheroController {
  constructor(private readonly superheroService: SuperheroService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createSuperheroDto: CreateSuperheroDto): Superhero {
    return this.superheroService.create(createSuperheroDto);
  }

  @Get()
  findAll(): Superhero[] {
    return this.superheroService.findAll();
  }
}
