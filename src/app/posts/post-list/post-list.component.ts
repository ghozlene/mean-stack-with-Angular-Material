import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: 'post-list.component.html',
  styleUrls: ['post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [{
  //   title: 'firs Post', description: 'wooow', content: 'this is my first post here get our hand dirty'
  // },
  // {
  //   title: 'firs Post', description: 'wooow', content: 'this is my first post here get our hand dirty'
  // },
  // {
  //   title: 'firs Post', description: 'wooow', content: 'this is my first post here get our hand dirty'
  // },

  // ];
  posts: Post[] = [];
  private postSubscription: Subscription;

  constructor(private postService: PostService) {

  }
  ngOnInit(): void {
    this.posts = this.postService.getPost();
    this.postSubscription = this.postService.getPostUpdateListener().subscribe({

      next: (posts) => {
        this.posts = posts;
      },
      error: (err) => {
        console.log(err);
      }

    });

  }
  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }
}
