import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlertStackComponent} from './alert-stack/alert-stack.component';
import { TimesPipe } from './times.pipe';
import {PaginatorComponent} from './paginator/paginator.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SideNavComponent} from './side-nav/side-nav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    AlertStackComponent,
    PaginatorComponent,
    SideNavComponent,
    TimesPipe
  ],
  exports: [
    AlertStackComponent,
    PaginatorComponent,
    SideNavComponent,
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
