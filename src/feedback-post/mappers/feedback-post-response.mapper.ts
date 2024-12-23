import { IFeedbackPostRepositoryResponse } from '../interfaces/feedback-post-repository-response';

export class FeedbackPostResponseMapper {
  id: string;
  title: string;
  description: string;
  author: { id: string; email: string; avatar: string | null };
  status: { id: string; name: string };
  categories: { id: string; name: string }[];
  createdAt: string;
  updatedAt: string;
  constructor(feedbackPost: IFeedbackPostRepositoryResponse) {
    const {
      id,
      title,
      description,
      author,
      status,
      categories,
      createdAt,
      updatedAt,
    } = feedbackPost;

    this.id = id;
    this.title = title;
    this.description = description;
    this.author = {
      email: author.email,
      id: author.id,
      avatar: author.avatar,
    };
    this.status = { id: status.id, name: status.name };
    this.categories =
      categories && categories.length
        ? categories.map(({ Category }) => {
            return { id: Category.id, name: Category.name };
          })
        : [];
    this.createdAt = createdAt.toLocaleDateString();
    this.updatedAt = updatedAt.toLocaleDateString();
  }
}