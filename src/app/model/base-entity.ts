/**
 * Interface for all entity lists.
 *
 * A entity list contains the total count of available entities and a subset of retrieved entities defined by paging parameters.
 */
export interface BaseEntityList<T> {
  /** total count of available entities. */
  totalCount: number;
  /** amount of entities in this list, defined by paging parameters. */
  items: T[];
}

/**
 * Base class for all entities.
 *
 * The base class defines a set of common entity attributes shared by all entities.
 */
export abstract class BaseEntity {
  /** Id of the entity. */
  id: number;
}
