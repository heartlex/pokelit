import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import style from '../index.css?inline';

@customElement('app-content')
export class AppContent extends LitElement {
  static styles = [
    unsafeCSS(style),
    css`
      :host {
        display: block;
        flex: 1;
      }
    `
  ];

  render() {
    return html`
      <main class="flex-grow">
        <div class="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Welcome to Lit Boilerplate
            </h1>
            <p class="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              Start building your web components with Lit, Vite, and Tailwind CSS.
            </p>
          </div>
        </div>
      </main>
    `;
  }
}