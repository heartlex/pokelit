import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import style from '../index.css?inline';

@customElement('pokemon-search')
export class PokemonSearch extends LitElement {
  @property()
  value = '';
  
  @property()
  withButton = false;

  @state()
  private inputValue = '';

  private debounceTimer?: number;
  private readonly debounceTime = 300;

  static styles = [
    unsafeCSS(style),
    css`
      :host {
        display: block;
      }
    `
  ];

  private handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.inputValue = input.value;
  }
  
  private handleClick() {
    this.value = this.inputValue;
    this.dispatchEvent(new CustomEvent('search', {
      detail: { value: this.inputValue }
    }));
  }

  render() {
    return html`
      <div class="mb-4">
        <label class="text-2xl font-bold mb-3 block text-white/90">Search Pokémon</label>
        <div class="relative max-w-xl">
          <input
            type="text"
            class="w-full px-6 py-4 pr-14 rounded-xl bg-white/10 text-white placeholder-white/50 
                   border-2 border-white/20 backdrop-blur-sm
                   focus:outline-none focus:border-white/40 focus:bg-white/20
                   transition-all duration-300"
            placeholder="Enter name or number..."
            .value=${this.inputValue}
            @input=${this.handleInput}
          />
          <button class="absolute right-4 top-1/2 transform -translate-y-1/2
                      bg-white/20 text-white w-10 h-10 flex items-center justify-center 
                      rounded-lg backdrop-blur-sm hover:bg-white/40"
          @click="${this.handleClick}">
            🔍
          </button>
        </div>
        <p class="text-white/70 mt-3 text-sm">
          Search for a Pokémon by name or using its National Pokédex number
        </p>
      </div>
    `;
  }
}