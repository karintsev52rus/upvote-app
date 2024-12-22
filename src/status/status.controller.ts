import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { StatusService } from './status.service';
import {
  CreateStatusDto,
  StatusListReponseDto,
  StatusReponseDto,
} from './dto/create-status.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('status')
@ApiTags('статусы')
@ApiBearerAuth('Authorization')
@UseGuards(JwtGuard)
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiOperation({ summary: 'Создание статуса' })
  @ApiResponse({ status: HttpStatus.OK, type: StatusReponseDto })
  @Post()
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @ApiOperation({ summary: 'Получение списка статусов' })
  @ApiResponse({ status: HttpStatus.OK, type: StatusListReponseDto })
  @Get()
  findAll() {
    return this.statusService.findAll();
  }

  @ApiOperation({ summary: 'Получение статуса по id' })
  @ApiResponse({ status: HttpStatus.OK, type: StatusReponseDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusService.findOne(id);
  }
}
