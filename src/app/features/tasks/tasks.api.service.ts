import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from "./task.model";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TasksApiService {

    server: string = environment.server;
    constructor(private http: HttpClient) { }

    addTask(task: Task) {
        return this.http.post(`${this.server}tasks`, task);
    }

    listTasks(page: number) {
        return this.http.get(`${this.server}tasks?page=${page}`);
    }

    fetchTask(id: string) {
        return this.http.get(`${this.server}tasks/${id}`);
    }

    updateTask(id, task) {
        return this.http.patch(`${this.server}tasks/${id}`, task)
    }

    deleteTask(id) {
        return this.http.delete(`${this.server}tasks/${id}`);
    }



}