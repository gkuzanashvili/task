import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export abstract class DataService {
  private url = environment.jsonServerURL;

  constructor(private httpClient: HttpClient) {
  }

  public sendGetRequest(param: string): Promise<any> {
    return this.httpClient.get(this.url + param, {responseType: 'json'}).pipe(
      catchError(this.handleError)
    ).toPromise();
  }

  public sendDeleteRequest(param: string, id: number): Promise<any> {
    const delUrl = `${this.url + param}/${id}`;
    return this.httpClient.delete(delUrl)
      .pipe(
        catchError(this.handleError)
      ).toPromise();
  }

  public sendPutRequest(param, data): Promise<any> {
    const url = `${this.url + param}/${data.id}`;
    return this.httpClient.put(url, data, {responseType: 'json'}).pipe(
      catchError(this.handleError)
    ).toPromise();
  }

  public sendPostRequest(param, data): Promise<any> {
    const url = `${this.url + param}`;
    return this.httpClient.post(url, data, {responseType: 'json'}).pipe(
      catchError(this.handleError)
    ).toPromise();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
