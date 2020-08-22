import { Task } from "./task.model";
export class TaskService {


    tasks: Task[] = [
        new Task('Buy Food!!', false),
        new Task('Buy Gross!', false)
    ];

    getTasks() {
        return this.tasks;
    }

}