import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  template: `
    <header class="page-header">
      <h1 class="page-header__title">{{ title() }}</h1>
      @if (subtitle()) {
        <p class="page-header__subtitle">{{ subtitle() }}</p>
      }
    </header>
  `,
  styles: `
    .page-header {
      margin-bottom: 2.5rem;
      text-align: center;

      &__title {
        font-size: 2rem;
        font-weight: 700;
        color: #1a1a2e;
        margin: 0 0 0.25rem 0;
        letter-spacing: -0.02em;
      }

      &__subtitle {
        font-size: 0.9rem;
        color: #6b7280;
        margin: 0;
        font-weight: 400;
      }
    }
  `,
})
export class PageHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>('');
}
