import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [HttpClientModule],  
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  
}
