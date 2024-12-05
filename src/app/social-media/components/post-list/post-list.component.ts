import { Component, OnInit } from '@angular/core'; 
import { map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post.model';
import { PostListItemComponent } from "../post-list-item/post-list-item.component";
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PostsService } from '../../services/post.service';


@Component({
    selector: 'app-post-list',
    imports: [PostListItemComponent, CommonModule, MatCardModule],
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})


export class PostListComponent implements OnInit {

  posts$!: Observable<Post[]>;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.posts$ = this.route.data.pipe(
      map(data => data['posts'])
    );
  }

  onPostCommented(postCommented: { comment: string, postId: number }) {
    this.postsService.addNewComment(postCommented);
}

}
