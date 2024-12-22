import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  CategoryListReponseDto,
  CategoryReponseDto,
  CreateCategoryDto,
} from './dto/create-category.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('category')
@ApiTags('категории')
@ApiBearerAuth('Authorization')
@UseGuards(JwtGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Создание категории' })
  @ApiResponse({ status: HttpStatus.OK, type: CategoryReponseDto })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Получение списка категорий' })
  @ApiResponse({ status: HttpStatus.OK, type: CategoryListReponseDto })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'Получение категории по id' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: HttpStatus.OK, type: CategoryReponseDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }
}
