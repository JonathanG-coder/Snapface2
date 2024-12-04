import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from "../../../shared/shared.module";



@Component({
  selector: 'app-post-list-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, SharedModule],
  templateUrl: './post-list-item.component.html',
  styleUrl: './post-list-item.component.scss'
})


export class PostListItemComponent implements OnInit {

  @Input() post!: Post;

  constructor () {}

  ngOnInit(): void {
  }

  

}
