import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export abstract class DataService {
  private url = environment.jsonServerURL;
  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(param: string): Observable<any>{
    return this.httpClient.get( this.url + param, {responseType: 'json'});
  }

  public sendDeleteRequest(param: string, id: number): Promise<any>{
    const delUrl = `${this.url + param}/${id}`;
    return this.httpClient.delete(delUrl)
      .pipe(
        catchError( this.handleError)
      ).toPromise();
  }

  public sendPutRequest(param, data): Promise<any> {
    const url = `${this.url + param}/${data.id}`;
    return  this.httpClient.put(url, data, {responseType: 'json'} ).toPromise();
  }
  public sendPostRequest(param, data): Promise<any> {
    const url = `${this.url + param}`;
    return  this.httpClient.post(url, data, {responseType: 'json'}).toPromise();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
  //
  // public getDictionary(): Observable<any>{
  //   return this.httpClient.get(this.REST_API_SERVER, {responseType: 'json'});
  // }
}
