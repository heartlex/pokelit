import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import style from '../index.css?inline';

@customElement('app-header')
export class AppHeader extends LitElement {
  static styles = [
    unsafeCSS(style),
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`
      <header class="bg-indigo-600">
        <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div class="flex w-full items-center justify-between py-6">
            <div class="flex items-center">
              <a href="#" class="text-white text-2xl font-bold">
                Lit Boilerplate
              </a>
            </div>
            <div class="ml-10 space-x-4">
              <a href="#" class="text-white hover:text-indigo-100">Home</a>
              <a href="#" class="text-white hover:text-indigo-100">About</a>
              <a href="#" class="text-white hover:text-indigo-100">Contact</a>
            </div>
          </div>
        </nav>
      </header>
    `;
  }
}