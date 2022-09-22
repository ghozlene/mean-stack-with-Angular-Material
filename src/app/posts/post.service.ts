import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { pipe, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class PostService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {

  }

  getPost() {
    this.http.get<{ message: string, posts: any; }>
      ('http://localhost:3000/api/posts')

      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });

      }))
      .subscribe((TransformPosts) => {
        console.log(TransformPosts);
        this.posts = TransformPosts;
        this.postsUpdated.next([...this.posts]);
      }
      );
  }
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getSinglePost(id: string) {
    return { ...this.posts.find(p => p.id == id) };

  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http.post<{ message: string, postId: string; }>('http://localhost:3000/api/posts', post)
      .subscribe((respData) => {
        console.log(respData.message);
        const postId = respData.postId;
        post.id = postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });

  }

  deletePost(postId) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
