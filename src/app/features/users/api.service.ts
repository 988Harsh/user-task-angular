import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    userState: Subscription;
    token: string;
    server: string = environment.server;
    constructor(private http: HttpClient,
        private store: Store<{ userState: { isLoggedIn: boolean, isAdmin: boolean, token: string } }>) {
        this.userState = this.store.select('userState').subscribe(data => {
            this.token = data.token;
        })
    }

    setToken(token) {
        this.token = token;
    }

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