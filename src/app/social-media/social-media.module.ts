import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialMediaRoutingModule } from './social-media-routing.module';
import { PostsService } from './services/post.service';
import { PostsResolver } from './resolvers/posts.resolver';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SocialMediaRoutingModule,
    HttpClientModule
  ],
  providers: [
    PostsService,
    PostsResolver 
  ]
})
export class SocialMediaModule { }
