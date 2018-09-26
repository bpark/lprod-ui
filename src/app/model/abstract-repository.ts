import {HttpClient, HttpParams} from '@angular/common/http';
import {JwtTokenStoreService} from './jwt-token-store.service';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {BaseEntity, BaseEntityList} from './base-entity';

/**
 * Abstract entity repository.
 */
export class AbstractRepository<T extends BaseEntity> {

  private static readonly page = 'page';
  private static readonly pageSize = 'pageSize';


  constructor(protected http: HttpClient, protected jwtTokenStore: JwtTokenStoreService, private apiUrl: string) {
  }

  /**
   * Returns a list of entities. The returned list is a subclass of BaseEntityList.
   * @param page the page to retrieve.
   * @param pageSize the pageSize of the page.
   * @param queryParams optional queryParameters added to the request.
   */
  list<S extends BaseEntityList<T>>(page: number, pageSize: number, queryParams?: HttpParams): Observable<S> {
    let httpParams = new HttpParams()
      .set(AbstractRepository.page, String(page))
      .set(AbstractRepository.pageSize, String(pageSize));

    if (queryParams !== undefined) {
      queryParams.keys().forEach(key => {
        httpParams = httpParams.set(key, queryParams.get(key));
      });
    }

    return this.http.get<S>(this.createConnectionUrl(), {
      headers: this.jwtTokenStore.createTokenHeader(),
      params: httpParams
    });
  }

  /**
   * Returns an entity by it's id.
   * @param id the entities id.
   */
  get(id: number): Observable<T> {
    return this.http.get<T>(this.createConnectionUrl(id), {
      headers: this.jwtTokenStore.createTokenHeader()
    });
  }

  /**
   * Persists a new entity.
   * @param entity the entity to persist.
   */
  create(entity: T): Observable<number> {
    return this.http.post<number>(this.createConnectionUrl(), entity, {
      headers: this.jwtTokenStore.createTokenHeader()
    });
  }

  /**
   * Updates an existing entity. The id of the entity must set.
   * @param entity the entity to update.
   */
  update(entity: T): Observable<void> {
    return this.http.put<void>(this.createConnectionUrl(entity.id), entity, {
      headers: this.jwtTokenStore.createTokenHeader()
    });
  }

  /**
   * Deletes an existing entity.
   * @param id the id of the entity to delete.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.createConnectionUrl(id), {
      headers: this.jwtTokenStore.createTokenHeader()
    });
  }

  private createConnectionUrl(id?: number): string {
    if (!environment.production) {
      if (id) {
        return 'http://localhost:3000/api/' + this.apiUrl + '/' + id;
      } else {
        return 'http://localhost:3000/api/' + this.apiUrl;
      }
    } else {
      if (id) {
        return 'https://lprod-v1.appspot.com/api/' + this.apiUrl + '/' + id;
      } else {
        return 'https://lprod-v1.appspot.com/api/' + this.apiUrl;
      }
      /*
      if (id) {
        return 'http://localhost:8080/api/' + this.apiUrl + '/' + id;
      } else {
        return 'http://localhost:8080/api/' + this.apiUrl;
      }*/
    }
  }
}
