import { User } from '../users/user.model';

export class Task {

    _id: string;
    description: string;
    completed: boolean;
    owner: string;

    constructor(text, completed) {
        this.description = text;
        this.completed = completed;
    }
}