import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    isLoggedIn = false;
    token: string;
    server: string = "http://localhost:3000/";
    constructor(private http: HttpClient) { }

    public login(credentials) {
        return this.http.post(`${this.server}users/login`, credentials);
    }

    public addUser(data) {
        return this.http.post(`${this.server}users`, data);
    }

    public getUsers(page: number) {
        return this.http.get(`${this.server}users?page=${page}`);
    }

    public deleteApiUser(token) {
        this.token = token;
        return this.http.delete(`${this.server}users/me`);
    }

    public getUser(token) {
        this.token = token;
        return this.http.get(`${this.server}users/me`);
    }

    public updateUser(user, token) {
        this.token = token;
        return this.http.patch(`${this.server}users/me`, user);
    }

}