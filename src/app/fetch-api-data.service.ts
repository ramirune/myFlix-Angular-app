import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring the api url that will provide data for client app
const apiUrl = 'https://movie-api-by-tammy.herokuapp.com';
export interface User {
  _id: string;
  FavoriteMovies: Array<string>;
  Username: string;
  Email: string;
  Birthday: Date;
}

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  /**
   * Inject the HttpClient module to the constructor params
  This will provide HttpClient to the entire class, making it available via this.http
   * @param http 
   */
  constructor(private http: HttpClient) {}

  /**
   * call API end-point to register a new user
   * @function userRegistration
   * @param userDetails {any}
   * @returns a new user object in json format
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + '/users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * call API end-point to log in a user
   * @param userDetails {any}
   * @returns user's data in json format
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + '/login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * call API end-point to get all movies
   * @function getAllMovies
   * @return array of movies object in json format
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies', {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call API end-point to get a specific movie by Title
   * @function getMovie
   * @param Title {any}
   * @returns a movie object in json format
   */
  getMovie(Title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies/' + Title, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call API end-point to get a director data by dirctor's name
   * @function getDirector
   * @param Name {any}
   * @returns a director's data in json format
   */
  getDirector(Name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/directors/' + Name, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call API end-point to get a genre data
   * @param Name {any}
   * @returns a genre data in json format
   */
  getGenre(Name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/genres/' + Name, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call API end-point to get a user's informations
   * @param Username {any}
   * @returns a user's information in json format
   */
  getUser(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/users/' + Username, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call API end-point to get a user's favorite movies list
   * @param Username {any}
   * @returns a list of the user's favorite movies in json format
   */
  getFavoriteMovies(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/users/' + Username + '/movies', {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call API end-point to add a movie to the user's favorite list
   * @param MovieID {any}
   * @returns the user's favorite list in json format
   */
  addFavoriteMovie(MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    return this.http
      .put(apiUrl + '/users/' + Username + '/movies/' + MovieID, null, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call API end-point to edit the user's informations
   * @param Username {any}
   * @param userDetails {any}
   * @returns updated user's informations in json format
   */
  editUser(Username: any, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + '/users/' + Username, userDetails, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call API end-point to delete the current user
   * @param Username {any}
   * @returns delete status
   */
  deleteUser(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + '/users/' + Username, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call API end-point to delete a user's favorite movie
   * @param MovieID {any}
   * @returns updated user's information after removed a movie from the list in json format
   */
  deleteFavoriteMovie(MovieID: any): Observable<any> {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + '/users/' + Username + '/movies/' + MovieID, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Non-typed response extracttion
   * @param res {any}
   * @returns response || empty object
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
  // handle error
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
