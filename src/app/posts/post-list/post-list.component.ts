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
  isLoading = false;
  constructor(private postService: PostService) {

  }
  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPost();

    this.postSubscription = this.postService.getPostUpdateListener().subscribe({

      next: (posts) => {
        this.isLoading = false;
        this.posts = posts;
      },
      error: (err) => {
        console.log(err);
      }

    });

  }
  onDelete(postId) {
    this.postService.deletePost(postId);
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }
}
