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

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http.post<{ message: string; }>('http://localhost:3000/api/posts', post)
      .subscribe((respData) => {
        console.log(respData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });

  }
}
