import { Component } from "@angular/core";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']

})
export class PostCreateComponent {
  entredValue = '';
  newPost = 'test';
  onAddPost() {
    this.newPost = this.entredValue;
  }
}
