import { Category, Status, User } from '@prisma/client';

export interface IFeedbackPostRepositoryResponse {
  id: string;
  title: string;
  description: string;
  author: User;
  status: Status;
  categories: IFeedbackCategoriesRepositoryResponse[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IFeedbackCategoriesRepositoryResponse {
  feedbackPostId: string;
  categoryId: string;
  Category: Category;
}
