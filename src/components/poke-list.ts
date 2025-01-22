import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './pokemon-card';
import './debounce-input';
import { Pokemon, PokemonListResponse } from '../types';

@customElement('poke-list')
export class PokeList extends LitElement {
  @state()
  private pokemon: Pokemon[] = [];
  
  @state()
  private loading = true;
  
  @state()
  private searchQuery = '';
  
  @state()
  private selectedPokemon?: Pokemon;
  
  @state()
  private currentPage = 1;
  
  private readonly pageSize = 20;
  
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
    }
    .header {
      @apply py-6;
    }
    .header-content {
      @apply max-w-7xl mx-auto px-4;
    }
    .title {
      @apply text-3xl font-bold mb-4;
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
    .content {
      @apply max-w-7xl mx-auto px-4 py-8;
    }
    .grid {
      @apply grid grid-cols-2 gap-4 sm:gap-6
             sm:grid-cols-2
             md:grid-cols-3
             lg:grid-cols-4
             xl:grid-cols-5;
    }
    .load-more {
      @apply mt-12 flex justify-center;
    }
    .load-more button {
      @apply px-8 py-3 bg-[#ee6b2f] text-white rounded-lg font-bold
             hover:bg-[#da5c20] transition-colors
             focus:outline-none focus:ring-2 focus:ring-[#ee6b2f] focus:ring-offset-2;
    }
    .loading {
      @apply text-center mt-8 text-gray-600 text-xl;
    }
  `;
  
  connectedCallback() {
    super.connectedCallback();
    this.loadPokemon();
  }
  
  async loadPokemon() {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${this.pageSize}&offset=${(this.currentPage - 1) * this.pageSize}`
      );
      const data: PokemonListResponse = await response.json();
      
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          return response.json();
        })
      );
      
      this.pokemon = [...this.pokemon, ...pokemonDetails];
      this.loading = false;
    } catch (error) {
      console.error('Error loading Pokemon:', error);
      this.loading = false;
    }
  }
  
  private get filteredPokemon() {
    return this.pokemon.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      pokemon.id.toString().includes(this.searchQuery)
    );
  }
  
  private handleSearch(e: CustomEvent) {
    this.searchQuery = e.detail.value;
  }
  
  render() {
    return html`
      <div class="flex bg-blue-200">
        <div class="header-content">
          <h1 class="title">Pokédex</h1>
          <debounce-input
                  .value=${this.searchQuery}
                  @search=${this.handleSearch}
          >
          </debounce-input>
        </div>
      </div>

      <div class="content">
        <div class="flex">
          ${this.filteredPokemon.map(
      pokemon => html`
              <pokemon-card
                .pokemon=${pokemon}
                @click=${() => this.selectedPokemon = pokemon}
              ></pokemon-card>
            `
    )}
        </div>

        ${this.loading
      ? html`<div class="loading">Loading Pokémon data...</div>`
      : html`
              <div class="load-more">
                <button @click=${() => {
        this.currentPage++;
        this.loadPokemon();
      }}>
                  Load More Pokémon
                </button>
              </div>
            `
    }
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "poke-list": PokeList;
  }
}