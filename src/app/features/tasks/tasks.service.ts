import { Task } from "./task.model";
import { Subject } from "rxjs";
export class TaskService {


    tasks: Task[];

    getTasks() {
        return this.tasks;
    }

    private taskSubject = new Subject<any>();

    sendTask(task: Task) {
        // this.tasks.push(task);
        this.taskSubject.next(task)
    }

    tasksChanged() {
        this.taskSubject.next(this.tasks);
    }

    listenForTask() {
        return this.taskSubject.asObservable();
    }

}