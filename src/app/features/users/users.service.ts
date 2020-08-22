import { User } from "./user.model";
import { Task } from '../tasks/task.model';
import { Subject, Observable } from "rxjs";

export class UserService {


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

    idInc: number = 1;

    users: User[] = [new User(1, 'Harsh Patel', 22, 'harsh@gmail.com', [new Task('Buy gros!!', false), new Task('Buy something else!', false)])];

    addUser(user: User) {
        this.users.push(user);
    }
    saveUser(user: User) {
        const index = this.users.findIndex((eachUser) => eachUser.id === user.id)
        this.users.splice(index, 1, user)
    }
    getUsers() {
        this.UsersChanged()
    }
    deleteUser(id: number) {
        const index = this.users.findIndex((user) => user.id === id)
        this.users.splice(index, 1)
    }
    getUser(id: number) {
        const user = this.users.find((user) => user.id === id)
        return user;
    }


}