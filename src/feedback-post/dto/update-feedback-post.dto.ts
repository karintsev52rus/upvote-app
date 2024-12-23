import { PartialType } from '@nestjs/swagger';
import { CreateFeedbackPostDto } from './create-feedback-post.dto';

export class UpdateFeedbackPostDto extends PartialType(CreateFeedbackPostDto) {}
