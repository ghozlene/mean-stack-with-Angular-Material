import { Component, Input } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';


@Component({
  selector: 'app-post-list',
  templateUrl: 'post-list.component.html',
  styleUrls: ['post-list.component.css']
})
export class PostListComponent {
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
  @Input() posts: Post[] = [];

  constructor(private postService: PostService) {

  }
}
