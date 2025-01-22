import {LitElement, css, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import { tailwind } from '../tailwind'

@customElement('debounce-input')
export class DebounceInput extends LitElement {
  @property()
  value = '';
  
  @state()
  private inputValue = '';
  
  private debounceTimer?: number;
  private readonly debounceTime = 300; // 300ms debounce
  
  
  static styles = [
    tailwind,
    css`
    :host {
      display: block;
    }
    .search-section {
      @apply mb-4;
    }
    .search-label {
      @apply text-2xl font-bold mb-2 block;
    }
    .search-container {
      @apply relative max-w-xl;
    }
    .search-input {
      @apply w-full px-4 py-3 pr-12 rounded-lg
             bg-white text-gray-900
             border-2 border-gray-300
             focus:outline-none focus:border-blue-500;
    }
    .search-icon {
      @apply absolute right-4 top-1/2 transform -translate-y-1/2
             bg-[#ee6b2f] text-white
             w-8 h-8 flex items-center justify-center
             rounded-lg;
    }
    .search-hint {
      @apply text-gray-400 mt-2;
    }
  `
  ];
  
  private handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.inputValue = input.value;
    
    // Clear any existing timer
    if (this.debounceTimer) {
      window.clearTimeout(this.debounceTimer);
    }
    
    // Set new timer
    this.debounceTimer = window.setTimeout(() => {
      this.value = this.inputValue;
      this.dispatchEvent(new CustomEvent('search', {
        detail: {value: this.inputValue}
      }));
    }, this.debounceTime);
  }
  
  render() {
    return html`
      <div class="flex">
        <label class="search-label">Name or Number</label>
        <div class="search-container">
          <input
                  type="text"
                  class="search-input"
                  placeholder="Search Pokémon"
                  .value=${this.inputValue}
                  @input=${this.handleInput}
          />
          <div class="search-icon">🔍</div>
        </div>
        <p class="search-hint">Search for a Pokémon by name or using its National Pokédex number.</p>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "debounce-input": DebounceInput;
  }
}