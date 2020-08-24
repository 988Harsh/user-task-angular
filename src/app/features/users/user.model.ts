import { Token } from '@angular/compiler/src/ml_parser/lexer';

export class User {
    _id: number;
    name: string;
    age: number;
    email: string;
    password: string;
    tokens: any[];
    createdAt: Date;
    updatedAt: Date;

    constructor(name: string, age: number, email: string, password: string) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.password = password;
    }
}