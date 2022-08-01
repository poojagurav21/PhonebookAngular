import {NgModule} from '@angular/core';
import {AppSharedModule} from '@app/shared/app-shared.module';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';

@NgModule({
    declarations: [TodoComponent],
    imports: [AppSharedModule,TodoRoutingModule]
})
export class TodoModule {}
