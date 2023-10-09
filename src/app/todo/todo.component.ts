import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TodoService } from '../todo.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @ViewChild('inputValue') input:ElementRef<HTMLInputElement>;

  todos: string[];
  newTodo: any;


  constructor(private todoService:TodoService ) {
    this.todos = this.todoService.getTodos();
  }

  ngOnInit(): void {
  }

  addTodo(todo: string): void {
    this.todoService.addTodo(todo);
    this.input.nativeElement.value = '';
  }

  removeTodo(index: number): void {
    this.todoService.removeTodo(index);
  }

}
