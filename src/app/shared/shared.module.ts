import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './components/comments/comments.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MaterialModule,
    CommentsComponent
  ],
  exports: [
    CommentsComponent,
    MaterialModule
  ]
})
export class SharedModule { }