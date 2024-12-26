import { ICreateUpvoteRespositoryResponse } from '../interfaces/create-upvote-repository-response.interface';

export class UpvoteResponseMapper {
  id: string;
  postId: string;
  userId: string;
  upvotesNumber: number;
  createdAt: string;
  constructor(upvote: ICreateUpvoteRespositoryResponse) {
    const { feedbackPost, id, postId, userId, createdAt } = upvote;
    this.id = id;
    this.postId = postId;
    this.userId = userId;
    this.createdAt = createdAt.toLocaleDateString();
    this.upvotesNumber = feedbackPost.upvotesNumber;
  }
}
