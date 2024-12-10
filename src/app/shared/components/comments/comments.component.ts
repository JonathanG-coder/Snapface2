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
import { animate, animateChild, group, query, sequence, stagger, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { Comment } from '../../../core/models/comment.model';
import { flashAnimation } from '../../animations/flash.animation';
import { slideAndFadeAnimation } from '../../animations/slide-and-fade.animation';
import { time } from 'console';

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
    trigger('list', [
      transition(':enter', [      // (':enter', [] = transition('default => active', [] 
        query('@listItem', [    // query permet de recuperer les enfants.
          stagger(50, [       // Stagger permet de decaler le demarage de chaque elements d'une liste.
            animateChild()  // animateChild() permet de dire si un element à une animation execute la, sinon non.
          ])
        ])
      ])
    ]),
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
      transition('deleting => *', [
        animate('200ms')
      ]),
      transition('* => deleting', [
        animate('2000ms ease-in-out')
      ]),
      transition(':enter', [
        query('.comment-text, .comment-date', style({ opacity: 0 })),
        useAnimation(slideAndFadeAnimation, {     // permet l'appel d'une animation réutilisable et parametrable grâce à useanimation.
          params: {
            time: '1000ms',
            startColor: 'rgb(201,157,242)'

          }
        }),
        group([
          useAnimation(flashAnimation, {
            params: {
              time: '1000ms',
              flashColor: 'rgb(249,179,111)'
            }
          }),    // permet l'appel à l'animation qui est réutilisable.
          query('.comment-text', [
            animate('250ms', style({
              opacity: 1
            }))
          ]),
          query('.comment-date', [
            animate('500ms', style({
              opacity: 1
            }))
          ]),
        ]),
      ])
    ])
  ]
})
export class CommentsComponent implements OnInit {
  @Input() comments!: Comment[];
  @Output() newComment = new EventEmitter<string>();

  commentCtrl!: FormControl;
  animationStates: { [key: number]: 'default' | 'active' } = {};

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.commentCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(10)
    ]);
    this.comments.forEach((_, index) => {
      this.animationStates[index] = 'default';
    });
  }

  onLeaveComment(): void {
    if (this.commentCtrl.invalid) {
      return;
    }
    const maxId = this.comments.length
      ? Math.max(...this.comments.map(comment => comment.id))
      : 0;
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
