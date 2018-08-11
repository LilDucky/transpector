import { Injectable } from '@angular/core';
import { Transmitter } from './transmitter';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransmitterService {
  private transmittersUrl = 'api/transmitters';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getTransmitters(): Observable<Transmitter[]> {
    // // TODO: send the message _after_ fetching the transmitters
    // this.messageService.add('TransmitterService: fetched transmitters');
    // return of(TRANSMITTERS);
    return this.http.get<Transmitter[]>(this.transmittersUrl)
    .pipe(
      tap(heroes => this.log('fetched transmitters')),
      catchError(this.handleError('getTransmitters', []))
    );
  }

  getTransmitter(id: string): Observable<Transmitter> {
    const url = `${this.transmittersUrl}/${id}`;
    return this.http.get<Transmitter>(url).pipe(
      tap(_ => this.log(`fetched transmitter id=${id}`)),
      catchError(this.handleError<Transmitter>(`getTransmitter id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateTransmitter(transmitter: Transmitter): Observable<any> {
    return this.http.put(this.transmittersUrl, transmitter, httpOptions).pipe(
      tap(_ => this.log(`updated transmitter id=${transmitter.id}`)),
      catchError(this.handleError<any>('updateTransmitter'))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`TransmitterService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}


// // THE BELOW FROM THE HEROKU EXAMPLE APP
// import { Injectable } from '@angular/core';
// import { Contact } from './contact';
// import { Http, Response } from '@angular/http';
//
// @Injectable()
// export class ContactService {
//     private contactsUrl = '/api/contacts';
//
//     constructor (private http: Http) {}
//
//     // get("/api/contacts")
//     getContacts(): Promise<void | Contact[]> {
//       return this.http.get(this.contactsUrl)
//                  .toPromise()
//                  .then(response => response.json() as Contact[])
//                  .catch(this.handleError);
//     }
//
//     // post("/api/contacts")
//     createContact(newContact: Contact): Promise<void | Contact> {
//       return this.http.post(this.contactsUrl, newContact)
//                  .toPromise()
//                  .then(response => response.json() as Contact)
//                  .catch(this.handleError);
//     }
//
//     // get("/api/contacts/:id") endpoint not used by Angular app
//
//     // delete("/api/contacts/:id")
//     deleteContact(delContactId: String): Promise<void | String> {
//       return this.http.delete(this.contactsUrl + '/' + delContactId)
//                  .toPromise()
//                  .then(response => response.json() as String)
//                  .catch(this.handleError);
//     }
//
//     // put("/api/contacts/:id")
//     updateContact(putContact: Contact): Promise<void | Contact> {
//       var putUrl = this.contactsUrl + '/' + putContact._id;
//       return this.http.put(putUrl, putContact)
//                  .toPromise()
//                  .then(response => response.json() as Contact)
//                  .catch(this.handleError);
//     }
//
//     private handleError (error: any) {
//       let errMsg = (error.message) ? error.message :
//       error.status ? `${error.status} - ${error.statusText}` : 'Server error';
//       console.error(errMsg); // log to console instead
//     }
// }
