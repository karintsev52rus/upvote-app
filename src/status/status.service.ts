import { Inject, Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { StatusRepository } from './status.repository';

@Injectable()
export class StatusService {
  constructor(@Inject() private readonly statusRepo: StatusRepository) {}
  create(createStatusDto: CreateStatusDto) {
    return this.statusRepo.create(createStatusDto);
  }

  findAll() {
    return this.statusRepo.findAll();
  }

  findOne(id: string) {
    return this.statusRepo.findById(id);
  }
}
