export interface ICreateUpvoteRespositoryResponse {
  id: string;
  postId: string;
  userId: string;
  createdAt: Date;
  feedbackPost: {
    id: string;
    createdAt: Date;
    upvotesNumber: number;
    title: string;
    description: string;
    authorId: string;
    statusId: string;
    updatedAt: Date;
  };
}
