import { Component, OnInit } from '@angular/core';
import { TodoItemDto, TodoServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoItems: TodoItemDto[];
  newTodoText: string;

  constructor(private todoService: TodoServiceProxy) { }

  ngOnInit(): void {
    this.todoService.getList().subscribe(response => {
      this.todoItems = response;
    });
  }
  create(): void {
    this.todoService.create(this.newTodoText).subscribe((result) => {
      this.todoItems = this.todoItems.concat(result);
      this.newTodoText = null;
    });
  }

  delete(id: number): void {
    this.todoService.delete(id).subscribe(() => {
      this.todoItems = this.todoItems.filter(item => item.id !== id);
      //this.toasterService.info('Deleted the todo item.');
    });
  }
}
