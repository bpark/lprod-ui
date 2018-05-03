import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlertStackComponent} from './alert-stack/alert-stack.component';
import { TimesPipe } from './times.pipe';
import {PaginatorComponent} from './paginator/paginator.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    AlertStackComponent,
    PaginatorComponent,
    TimesPipe
  ],
  exports: [
    AlertStackComponent,
    PaginatorComponent,
    TimesPipe
  ]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
