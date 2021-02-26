import { Post } from "./post.model";
import { Subject } from 'rxjs'

export class PostService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>(); 

    getPost() {
        return [...this.posts];
    }

    getPostUpdatePostListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content: string) {
        const post: Post = {
            title: title,
            content: content
        };
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
    }
}