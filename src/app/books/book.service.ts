import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IBook } from './book';

@Injectable({
  providedIn: 'root'
})

export class BookService {
private bookUrl = 'api/books/books.json';

constructor (private http: HttpClient) { }

  getBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.bookUrl)
    .pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
  );
}

getBook(isbn: number): Observable<IBook | undefined> {
  return this.getBooks()
    .pipe(
      map((books: IBook[]) => books.find(b => b.isbn === isbn))
    );
}

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occured
      errorMessage = `An error occured: ${err.error.message}`;
    }
    else {
      //
      errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }


}
