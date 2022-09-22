import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { pipe, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";
@Injectable({ providedIn: 'root' })
export class PostService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {

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
    return this.http.get<{ _id: string, title: string, content: string; }>('http://localhost:3000/api/posts/' + id);

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
        this.router.navigate(['/']);
      });

  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content };
    this.http.put('http://localhost:3000/api/posts/' + id, post).subscribe(
      (result) => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex((p) => {
          p.id == post.id;
        });
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      }
    );
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
