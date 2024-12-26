export interface IFindFeedbackPosts {
  take: number;
  skip: number;
  orderBy: string;
  categories: string[] | undefined;
  status: string | undefined;
  order: string;
}
