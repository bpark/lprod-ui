export interface BaseEntityList<T> {
  totalCount: number;
  items: T[];
}

export abstract class BaseEntity {
  id: number;
}
