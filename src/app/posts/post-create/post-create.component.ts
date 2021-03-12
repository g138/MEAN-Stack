import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredTitle = '';
  enteredContent = ''; 
  post: Post;
  private mode = 'create';
  private postId: string;
  

  constructor(public postsService: PostService, public route: ActivatedRoute) { }


  ngOnInit(): void {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.post = this.postsService.getPost(this.postId);
      } else {
        this.mode = "create";
        this.postId = null;
      }
    })
  }

  onSavePost(form: NgForm) {
    if(form.invalid) {
      return;
    }
    if(this.mode === "create") {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(this.postId, form.value.title, form.value.content);
    }
    
    form.resetForm();
  }

}
