import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post, User, generatePost, generateUser } from '@shared-store/utilities';
import { CommentsComponent } from '../Comments/Comments.component';

@Component({
  selector: 'shared-store-post',
  standalone: true,
  imports: [CommonModule, CommentsComponent],
  templateUrl: './Post.component.html',
  styleUrls: ['./Post.component.scss'],
})
export class PostComponent {
  user: User = generateUser();
  @Input() 
  public set userData(data: User | null) {
    if (data) {
      this.user = data;
    }
  }
  public get userData(): User {
    return this.user;
  }


  post: Post = generatePost();
  @Input() 
  public set postData(data: Post | null) {
    if (data) {
      this.post = data;
    }
  }
  public get postData(): Post {
    return this.post;
  }
}
