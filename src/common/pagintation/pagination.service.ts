import { PaginationResponseType } from './pagination.schema';

export class PaginationService {
  getPaginationResponse(paginationCountData: {
    take: number;
    count: number;
    skip: number;
  }): PaginationResponseType {
    const { count, take, skip } = paginationCountData;
    const pageCount = Math.ceil(count / take);
    return { pageCount, take, skip };
  }
}
