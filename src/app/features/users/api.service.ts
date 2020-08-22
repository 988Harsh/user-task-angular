import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    token: string;

    constructor(private httpClient: HttpClient) { }

    public addUser(data: User) {
        return this.httpClient.post("http://localhost:3002/users", data, { observe: 'response', withCredentials: true });
    }

    public getUsers() {
        return this.httpClient.get("http://localhost:3002/users");
    }

}