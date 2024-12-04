import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Comment } from '../../../core/models/comment.model';
import { MatCardModule } from '@angular/material/card';



@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [MatListModule, CommonModule, MatCardModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {

  @Input() comments!: Comment[];

  constructor() {}

  ngOnInit(): void {
      
  }

}
