import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ShortenPipe } from './pipes/shorten.pipe';
import { UsernamePipe } from './pipes/username.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HighlightDirective } from './directives/highlight.directive';


@NgModule({
  declarations: [
    ShortenPipe,
    UsernamePipe,
    TimeAgoPipe,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    HighlightDirective


  ],
  exports: [
    MaterialModule,
    ShortenPipe,
    UsernamePipe,
    TimeAgoPipe,
    HighlightDirective

  ]
})
export class SharedModule { }