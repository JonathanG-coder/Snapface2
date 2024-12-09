import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router'; 




@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    
  ],
  exports: [
    
  ]
})
export class CoreModule {}
