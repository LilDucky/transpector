import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import * as io from 'socket.io-client';

import { Transmitter } from './transmitter';
import { Command } from './command';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TransmitterService {

  private transmittersUrl = 'api/transmitters';  // URL to web api
  private socket;

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getTransmitters(): Observable<Transmitter[]> {
    // // TODO: send the message _after_ fetching the transmitters
    // this.messageService.add('TransmitterService: fetched transmitters');
    // return of(TRANSMITTERS);
    return this.http.get<Transmitter[]>(this.transmittersUrl)
    .pipe(
      map(transmitters => {
        transmitters.forEach(t => {
          t.readDate = t.readDate ? new Date(t.readDate) : null;
          t.activationDate = t.activationDate ? new Date(t.activationDate) : null;
        })
        return transmitters;
      }),
      tap(transmitters => this.log('fetched transmitters')),
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

  /** PUT: reset a transmitter */
  resetTransmitter(transmitter: Transmitter | string): Observable<Transmitter> {
    const id = typeof transmitter === 'string' ? transmitter : transmitter.id;
    const url = `${this.transmittersUrl}/${id}`;

    const command: Command = {date: new Date(), action: 'reset'}

    return this.http.put<Transmitter>(url, command, httpOptions).pipe(
      tap(_ => this.log(`reset transmitter id=${id}`)),
      catchError(this.handleError<any>('resetTransmitter'))
    );
  }

  /** POST: add a new transmitter to the server */
  addTransmitter (transmitter: Transmitter): Observable<Transmitter> {
    console.log(`adding transmitter ${transmitter}`);
    return this.http.post<Transmitter>(this.transmittersUrl, transmitter, httpOptions).pipe(
      tap((transmitter: Transmitter) => this.log(`added transmitter w/ id=${transmitter.id}`)),
      catchError(this.handleError<Transmitter>('addTransmitter'))
    );
  }

  /** DELETE: delete the transmitter from the server */
  deleteTransmitter (transmitter: Transmitter | string): Observable<Transmitter> {
    console.log(`deleting transmitter`);
    const id = typeof transmitter === 'string' ? transmitter : transmitter.id;
    const url = `${this.transmittersUrl}/${id}`;

    return this.http.delete<Transmitter>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted transmitter id=${id}`)),
      catchError(this.handleError<Transmitter>('deleteTransmitter'))
    );
  }

  subscribe() {
    let observable = new Observable(observer => {
      console.log('subscribing');
      // TODO: should this be on init?
      this.socket = io();
      this.socket.on('glucose', (data) => {
        console.log(`got data from ${data.id}: ${data.glucose.transmitterStartDate}`);
        console.log(`last read date: ${data.glucose.readDate}`);
        observer.next(data);
      });
      this.socket.on('sawTransmitter', (data) => {
        console.log(`saw transmitter ${data}`);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
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
