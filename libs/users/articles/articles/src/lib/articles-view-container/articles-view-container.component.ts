import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesViewComponent } from '../articles-view/articles-view.component';
import { Store } from '@ngrx/store';
import { ArticleSelectors, ArticlesActions } from '@users/users/articles/data-access';
import { LetDirective } from '@ngrx/component';
import {MatProgressBarModule} from "@angular/material/progress-bar";

@Component({
  selector: 'users-articles-view-container',
  standalone: true,
  imports: [
    CommonModule,
    ArticlesViewComponent,
    LetDirective,
    MatProgressBarModule
  ],
  templateUrl: './articles-view-container.component.html',
  styleUrls: ['./articles-view-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesViewContainerComponent {
  private readonly store = inject(Store);
  public readonly articles$ = this.store.select(ArticleSelectors.selectArticles);
  public readonly status$ = this.store.select(ArticleSelectors.selectStatus);

  constructor() {
    this.store.dispatch(ArticlesActions.loadArticles());
  }
}
