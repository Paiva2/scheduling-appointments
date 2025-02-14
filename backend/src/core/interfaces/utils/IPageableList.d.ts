export interface IPageableList<T> {
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
  data: T[];
}
