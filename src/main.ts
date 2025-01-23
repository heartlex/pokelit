import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './components/pokemon-card';
import './components/pokemon-details';
import './components/pokemon-search';
import './components/pokemon-list-size';
import { Pokemon, PokemonListResponse } from './types';
import style from './index.css?inline';

@customElement('my-app')
export class MyApp extends LitElement {
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

  @state()
  private pageSize = 20;
  
  private pokemon151: Pokemon[] = [];

  static styles = [
    unsafeCSS(style),
    css`
      :host {
        display: block;
        min-height: 100vh;
        background: linear-gradient(135deg, #f6f8fc 0%, #ffffff 100%);
      }
    `
  ];

  connectedCallback() {
    super.connectedCallback();
    this.loadPokemon();
    this.load151Pokemon();
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
  async load151Pokemon() {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=151`
      );
      const data: PokemonListResponse = await response.json();
      
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          return response.json();
        })
      );
      
      this.pokemon151 = pokemonDetails;
      this.loading = false;
      
    } catch (error) {
      console.error('Error loading 1st gen Pokemons:', error);
      this.loading = false;
      
    }
  }

  private get filteredPokemon() {
    return !!this.searchQuery ? this.pokemon151.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      pokemon.id.toString().includes(this.searchQuery)
    ): this.pokemon.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      pokemon.id.toString().includes(this.searchQuery)
    );
  }

  private handleSearch(e: CustomEvent) {
    this.searchQuery = e.detail.value;
  }
  
  private handleSize(e: CustomEvent) {
    const newPageSize = e.detail.value
    if (newPageSize !== this.pageSize) {
      this.pageSize = newPageSize;
      this.pokemon = [];
      this.currentPage = 1;
      this.loadPokemon();
    }
  }

  render() {
    return html`
      <div class="min-h-screen">
        <div class="bg-gradient-to-r from-[#2e3192] to-[#1bffff] text-white py-8 shadow-lg">
          <div class="max-w-7xl mx-auto px-4">
            <h1 class="text-4xl font-bold mb-6 tracking-tight">Pokédex</h1>
            <pokemon-search
              .value=${this.searchQuery}
              @search=${this.handleSearch}
            ></pokemon-search>
            <pokemon-list-size
              .value=${this.pageSize}
              @size="${this.handleSize}"
            ></pokemon-list-size>
          </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 py-12">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
            ? html`
                <div class="flex justify-center items-center mt-12">
                  <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#ee6b2f] border-t-transparent"></div>
                </div>
              `
            : html`
                <div class="mt-12 flex justify-center">
                  <button
                    class="px-8 py-4 bg-gradient-to-r from-[#ee6b2f] to-[#f98c3f] text-white rounded-lg font-bold 
                           hover:from-[#da5c20] hover:to-[#e57d30] transition-all duration-300 transform hover:scale-105
                           focus:outline-none focus:ring-2 focus:ring-[#ee6b2f] focus:ring-offset-2 shadow-lg"
                    @click=${() => {
                      this.currentPage++;
                      this.loadPokemon();
                    }}
                  >
                    Load More Pokémon
                  </button>
                </div>
              `
          }

          ${this.selectedPokemon
            ? html`
                <pokemon-details
                  .pokemon=${this.selectedPokemon}
                  @close=${() => this.selectedPokemon = undefined}
                ></pokemon-details>
              `
            : null
          }
        </div>
      </div>
    `;
  }
}