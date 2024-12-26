import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(@Inject() private readonly categoryRepo: CategoryRepository) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepo.create(createCategoryDto);
  }

  findAll() {
    return this.categoryRepo.findAll();
  }

  findOne(id: string) {
    return this.categoryRepo.findById(id);
  }
}
