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
  isLoading = false;

  constructor(private postService: PostService, private route: ActivatedRoute) {

  }

  onSavePost(form) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode == 'create') {
      this.postService.addPost(form.value.title, form.value.content);

    } else {
      this.postService.updatePost(this.postId, form.value.title, form.value.content);

    }
    form.resetForm();

  }


  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'updatePost';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getSinglePost(this.postId).subscribe(postData => {
          this.post = { id: postData._id, title: postData.title, content: postData.content };
          this.isLoading = false;
          console.log(this.post);
        });
      } else {
        this.mode;
        this.postId = null;
      }
    });

  }

}
