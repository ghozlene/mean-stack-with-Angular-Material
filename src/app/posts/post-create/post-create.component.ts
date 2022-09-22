import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Post } from "../post.model";
import { PostService } from "../post.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']

})
export class PostCreateComponent implements OnInit {
  entredContent = '';
  entredTitle = '';
  private mode = "create";
  private postId: string;
  post: Post;

  constructor(private postService: PostService, private route: ActivatedRoute) {

  }

  onAddPost(form) {
    if (form.invalid) {
      return;
    }

    this.postService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'updatePost';
        this.postId = paramMap.get('postId');

        this.post = this.postService.getSinglePost(this.postId);
      } else {
        this.mode;
        this.postId = null;
      }
    });

  }

}
