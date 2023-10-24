import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Comment, Post, User, generatePost } from '@shared-store/utilities';
import { CommentsActions, selectAllPostComments } from '@shared-store/shared-store';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'shared-store-comments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Comments.component.html',
  styleUrls: ['./Comments.component.scss'],
})
export class CommentsComponent {
  @Input() user: User | null = null;
  @Input() 
  public set postData(data: Post | null) {
    if (data) {
      this.post = data;
      this.getComments(data.id);
      console.log('\n\ngetting the comments for post: ', data);
    }
  }
  public get postData(): Post {
    return this.post;
  }
  
  post: Post = generatePost();
  comments: Observable<Comment[]> = of();

  constructor(protected store: Store) {}

  protected getComments(id: number) {
    this.store.dispatch(CommentsActions['[PostsComments]GetAllComments']({ postId: id }));
    this.comments = this.store.select(selectAllPostComments(this.post.id));
  }

  printComments() {
    this.comments.subscribe(comments => console.log('\n\ncomments!: ', comments)).unsubscribe();
  }
}
