import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  template: `
    <header class="mb-12 text-center">
      <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
        {{ title() }}
      </h1>
      @if (subtitle()) {
        <p class="mt-2 text-slate-500 text-lg font-medium">{{ subtitle() }}</p>
      }
    </header>
  `,
})
export class PageHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>('');
}
