import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class PostService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>(); 

    constructor(private http: HttpClient, private router: Router) {}

    getPosts() {
      this.http
      .get<{ message: string; posts: any }>(
        "http://localhost:3000/api/posts"
      )
      .pipe(map((postData) => {
        console.log(postData);
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          }
        })
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
    }

    getPostUpdatePostListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content: string) {
      const post: Post = { id: null, title: title, content: content };
      this.http
      .post<{ message: string, postId: string }>("http://localhost:3000/api/posts", post)
      .subscribe(responseData => {
        console.log(responseData);
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
    }

    deletePost(postId: string) {
      this.http.delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        const updatedPost = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPost;
        this.postsUpdated.next([...this.posts]);
      });
    }

    getPost(id: string) {
      return this.http.get<{_id: string, title: string, content: string}>("http://localhost:3000/api/posts/"+id);
    }

    updatePost(id: string, title: string, content: string) {
      const post: Post = {
        id: id,
        title: title,
        content: content
      };      
      this.http.put("http://localhost:3000/api/posts/"+id, post)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(["/"]);
      })
    }
  }