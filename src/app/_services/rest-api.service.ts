import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Give, Message, User } from '../_models';

@Injectable({
    providedIn: 'root'
})

export class RestApiService {

    // Define API
    // private apiURL = 'https://sleepy-thicket-33930.herokuapp.com';
    private apiURL = 'http://192.168.43.19:8080';
    // Http Options
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    constructor(private http: HttpClient) { }

    // Gives API
    getGives(): Observable<Array<Give>> {
        return this.http.get<Array<Give>>(this.apiURL + '/gives')
            .pipe(
                catchError(this.handleError)
            );
    }

    // User API
    getWishes(idUser: string): Observable<Array<Give>> {
        return this.http.get<Array<Give>>(this.apiURL + '/users/' + idUser + '/wishes/')
            .pipe(
                catchError(this.handleError)
            );
    }

    getUser(idUser: string): Observable<User> {
        return this.http.get<User>(this.apiURL + '/users/' + idUser)
            .pipe(
                catchError(this.handleError)
            );
    }

    // /:id/wish/:idGive
    wish(idUser: string, idGive: string) {
        return this.http.put(this.apiURL + '/users/' + idUser + '/wish/' + idGive, this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    // /:id/unwish/:idGive
    unwish(idUser: string, idGive: string) {
        return this.http.put(this.apiURL + '/users/' + idUser + '/unwish/' + idGive, this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }


    // Messages API
    getMessages(idUser: string): Observable<Message[]> {
        return this.http.get<Array<Message>>(this.apiURL + '/messages/user/' + idUser)
            .pipe(
                catchError(this.handleError)
            );
    }

    getMessagesBetweenUsers(idUser1: string, idUser2: string): Observable<Message[]> {
        return this.http.get<Array<Message>>(this.apiURL + '/messages/user/' + idUser1 + '/with/' + idUser2)
            .pipe(
                catchError(this.handleError)
            );
    }

    sendMessage(message: Message): Observable<Message> {
        return this.http.post<Message>(this.apiURL + '/messages/', JSON.stringify(message), this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }



    // // HttpClient API get() method => Fetch employees list
    // getEmployees(): Observable<Employee> {
    //     return this.http.get<Employee>(this.apiURL + '/employees')
    //         .pipe(
    //             retry(1),
    //             catchError(this.handleError)
    //         )
    // }

    // // HttpClient API get() method => Fetch employee
    // getEmployee(id): Observable<Employee> {
    //     return this.http.get<Employee>(this.apiURL + '/employees/' + id)
    //         .pipe(
    //             retry(1),
    //             catchError(this.handleError)
    //         )
    // }

    // // HttpClient API post() method => Create employee
    // createEmployee(employee): Observable<Employee> {
    //     return this.http.post<Employee>(this.apiURL + '/employees', JSON.stringify(employee), this.httpOptions)
    //         .pipe(
    //             retry(1),
    //             catchError(this.handleError)
    //         )
    // }

    // // HttpClient API put() method => Update employee
    // updateEmployee(id, employee): Observable<Employee> {
    //     return this.http.put<Employee>(this.apiURL + '/employees/' + id, JSON.stringify(employee), this.httpOptions)
    //         .pipe(
    //             retry(1),
    //             catchError(this.handleError)
    //         )
    // }

    // // HttpClient API delete() method => Delete employee
    // deleteEmployee(id) {
    //     return this.http.delete<Employee>(this.apiURL + '/employees/' + id, this.httpOptions)
    //         .pipe(
    //             retry(1),
    //             catchError(this.handleError)
    //         )
    // }

    // Error handling
    handleError(error: { error: { message: string; }; status: any; message: any; }): Observable<never> {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        // TODO send error to api, manage log error dans la base.
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}
