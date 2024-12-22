import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(@Inject() private readonly categoryRepo: CategoryRepository) {}
  create(createCategoryDto: CreateCategoryDto) {
    try {
      return this.categoryRepo.create(createCategoryDto);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`Ошибка при создании категории`);
    }
  }

  findAll() {
    try {
      return this.categoryRepo.findAll();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `Ошибка при получении списка категорий`,
      );
    }
  }

  findOne(id: string) {
    try {
      return this.categoryRepo.findById(id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`Ошибка при получении категории`);
    }
  }
}
