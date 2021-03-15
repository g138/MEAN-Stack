import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts:Post[] = [];
  private postSub: Subscription;
  isLoading: boolean = true;

  constructor(public postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts();
    this.isLoading = true;
    this.postSub = this.postService.getPostUpdatePostListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts; 
      })
  }

  onDelete(postId:string) {
    console.log(postId);
    this.postService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

}
