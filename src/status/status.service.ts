import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { StatusRepository } from './status.repository';

@Injectable()
export class StatusService {
  constructor(@Inject() private readonly statusRepo: StatusRepository) {}
  create(createStatusDto: CreateStatusDto) {
    try {
      return this.statusRepo.create(createStatusDto);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`Ошибка при создании статуса`);
    }
  }

  findAll() {
    try {
      return this.statusRepo.findAll();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `Ошибка при получении списка статусов`,
      );
    }
  }

  findOne(id: string) {
    try {
      return this.statusRepo.findById(id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`Ошибка при получении статуса`);
    }
  }
}
