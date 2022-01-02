import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getContacts() {
    return this.http.get('http://localhost:8080/contacts').pipe(
      catchError((err) => {
        if (err) {
          return throwError(err);
        }
      })
    );
  }

  createContact(contact) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http
      .post('http://localhost:8080/contact', JSON.stringify(contact), {
        headers,
      })
      .pipe(
        catchError((err) => {
          if (err) {
            return throwError(err);
          }
        })
      );
  }

  deleteContact(id) {
    return this.http.delete('http://localhost:8080/contact/' + id).pipe(
      catchError((err) => {
        if (err) {
          return throwError(err);
        }
      })
    );
  }

  updateContact(contact) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http
      .put(
        'http://localhost:8080/contact/' + contact.id,
        JSON.stringify(contact),
        {
          headers,
        }
      )
      .pipe(
        catchError((err) => {
          if (err) {
            return throwError(err);
          }
        })
      );
  }
}
