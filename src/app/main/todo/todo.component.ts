import { Component, OnInit } from '@angular/core';
import { TodoItemDto, TodoServiceProxy } from '@shared/service-proxies/service-proxies';
import * as _ from 'lodash-es';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoItems: TodoItemDto[];
  newTodoText: string;
  isDeleted = [];
  check:boolean=false;
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
  value(val:number) {
       
    if(!this.check)
    {
        console.log("val= ",val);
        var u= this.isDeleted.push(val);
        console.log("u=",u);
        return u;
    }
    else{
   var e= this.isDeleted.pop();
   console.log("e=",e);
   return e;
    }
}
deleteTodoSelected() {
    console.log(this.isDeleted);
    this.todoService.deleteMultipleTodo(this.isDeleted).subscribe(() => {
        //this.notify.info(this.l('SuccessfullyDeleted'));
        this.isDeleted.forEach(element => {
            _.remove(this.todoItems, element);
        });
    });
    window.location.reload();
}
}
