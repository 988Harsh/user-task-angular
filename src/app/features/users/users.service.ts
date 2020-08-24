import { User } from "./user.model";
import { Subject } from "rxjs";
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

    users: User[];

    constructor(private api: ApiService) { }
    currentUserLoginToken: string;
    private userSubject = new Subject<any>();

    sendUser(user: User) {
        // this.users.push(user);
        this.userSubject.next(user)
    }

    UsersChanged() {
        this.userSubject.next(this.users);
    }

    listenForUser() {
        return this.userSubject.asObservable();
    }

}