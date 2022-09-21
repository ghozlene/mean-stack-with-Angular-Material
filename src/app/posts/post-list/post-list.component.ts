import { Component } from '@angular/core';



@Component({
  selector: 'app-post-list',
  templateUrl: 'post-list.component.html',
  styleUrls: ['post-list.component.css']
})
export class PostListComponent {
  post = [{
    title: 'firs Post', Content: 'this is my first post here get our hand dirty'
  },
  {
    title: 'firs Post', Content: 'this is my first post here get our hand dirty'
  },
  {
    title: 'firs Post', Content: 'this is my first post here get our hand dirty'
  },

  ];


}
