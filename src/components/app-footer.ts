import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import style from '../index.css?inline';

@customElement('app-footer')
export class AppFooter extends LitElement {
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
      <footer class="bg-gray-800">
        <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div class="text-center">
            <p class="text-base text-gray-400">
              © ${new Date().getFullYear()} Lit Boilerplate. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    `;
  }
}