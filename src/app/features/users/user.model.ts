import { Task } from '../tasks/task.model';

export class User {
    id: number;
    name: string;
    age: number;
    email: string;
    tasks: Task[];



    constructor(id: number, name: string, age: number, email: string, tasks: Task[]) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.email = email;
        this.tasks = tasks;
    }
}