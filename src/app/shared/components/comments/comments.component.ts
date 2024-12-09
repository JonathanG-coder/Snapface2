import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from "../../shared.module";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Comment } from '../../../core/models/comment.model';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    SharedModule
  ],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [
    trigger('listItem', [
      state('default', style({
        transform: 'scale(1)',
        'background-color': 'white',
        'z-index': 1
      })),
      state('active', style({
        transform: 'scale(1.05)',
        'background-color': 'rgb(201, 157, 242)',
        'z-index': 2
      })),
      transition('default => active', [
        animate('100ms ease-in-out')
      ]),
      transition('active => default', [
        animate('500ms ease-in-out')
      ]),
      transition('void => *', [
        style({
            transform: 'translateX(-100%)',
            opacity: 0,
            'background-color': 'rgb(201, 157, 242)',
        }),
        animate('250ms ease-out', style({
            transform: 'translateX(0)',
            opacity: 1,
            'background-color': 'white',
        }))
    ])
    ])
  ]
})
export class CommentsComponent implements OnInit {
  @Input() comments!: Comment[];
  @Output() newComment = new EventEmitter<string>();

  commentCtrl!: FormControl;
  animationStates: { [key: number]: 'default' | 'active' } = {};
  listItemAnimationState: 'default' | 'active' = 'default';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.commentCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(10)
    ]);
    for (let index in this.comments) {
      this.animationStates[index] = 'default';
  }
  }

  onLeaveComment() {
    if (this.commentCtrl.invalid) {
        return;
    }
    const maxId = Math.max(...this.comments.map(comment => comment.id));
    this.comments.unshift({
        id: maxId + 1,
        comment: this.commentCtrl.value,
        createdDate: new Date().toISOString(),
        userId: 1
    });
    this.newComment.emit(this.commentCtrl.value);
    this.commentCtrl.reset();
}

  onListItemMouseEnter(index: number): void {
    this.animationStates[index] = 'active';
  }

  onListItemMouseLeave(index: number): void {
    this.animationStates[index] = 'default';
  }
}
