import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import style from '../index.css?inline';

@customElement('pokemon-list-size')
export class PokemonListSize extends LitElement {
  @property({ type: Number })
  value = 20;
  
  static styles = [
    unsafeCSS(style),
    css`
      :host {
        display: block;
      }
    `
  ];
  
  private handleChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    const newValue = parseInt(select.value, 10);
    this.value = newValue;
    this.dispatchEvent(new CustomEvent('size', {
      detail: { value: newValue }
    }));
  }
  
  render() {
    return html`
      <div class="mb-4">
        <label class="text-2xl font-bold mb-3 block text-white/90">Pokémon per Page</label>
        <div class="relative max-w-[200px]">
          <select
            class="w-full px-6 py-4 appearance-none rounded-xl bg-white/10 text-white
                   border-2 border-white/20 backdrop-blur-sm
                   focus:outline-none focus:border-white/40 focus:bg-white/20
                   transition-all duration-300 hover:cursor-pointer"
            .value=${this.value.toString()}
            @change=${this.handleChange}
          >
            <option value="10">10 Pokémon</option>
            <option value="20">20 Pokémon</option>
            <option value="50">50 Pokémon</option>
            <option value="100">100 Pokémon</option>
          </select>
          <div class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg class="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
        <p class="text-white/70 mt-3 text-sm">
          Choose how many Pokémon to load at once
        </p>
      </div>
    `;
  }
}