import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { pipe, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";
import { response } from "express";
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
            id: post._id,
            imagePath: post.imagePath
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
    return this.http.get<{ _id: string, title: string, content: string, imagePath: string; }>
      ('http://localhost:3000/api/posts/' + id);

  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);

    this.http.post<{ message: string, post: Post; }>('http://localhost:3000/api/posts', postData)
      .subscribe((respData) => {
        const post: Post = {
          id: respData.post.id,
          title: title,
          content: content,
          imagePath: respData.post.imagePath
        };
        console.log(respData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });

  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof (image) === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = { id: id, title: title, content: content, imagePath: image };
    }
    this.http.put('http://localhost:3000/api/posts/' + id, postData).subscribe(
      (result) => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex((p) => {
          p.id == id;
        });
        const post: Post = { id: id, title: title, content: content, imagePath: "" };
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
