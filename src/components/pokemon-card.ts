import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Pokemon } from '../types';

@customElement('pokemon-card')
export class PokemonCard extends LitElement {
  @property({ type: Object })
  pokemon?: Pokemon;
  
  static styles = css`
    :host {
      display: block;
    }
    .pokemon-card {
      @apply bg-white rounded-xl overflow-hidden cursor-pointer
             transform transition-transform hover:scale-105
             border border-gray-200;
    }
    .pokemon-image {
      @apply w-full aspect-square object-contain p-4
             bg-[#f2f2f2];
    }
    .pokemon-info {
      @apply p-4;
    }
    .pokemon-number {
      @apply text-sm text-gray-400 font-mono mb-1;
    }
    .pokemon-name {
      @apply text-xl font-bold capitalize mb-2 text-[#313131];
    }
    .pokemon-types {
      @apply flex gap-2;
    }
    .type-badge {
      @apply px-3 py-1 rounded-full text-sm font-medium text-white;
    }
    .type-normal { @apply bg-[#A8A878]; }
    .type-fire { @apply bg-[#F08030]; }
    .type-water { @apply bg-[#6890F0]; }
    .type-grass { @apply bg-[#78C850]; }
    .type-electric { @apply bg-[#F8D030]; }
    .type-ice { @apply bg-[#98D8D8]; }
    .type-fighting { @apply bg-[#C03028]; }
    .type-poison { @apply bg-[#A040A0]; }
    .type-ground { @apply bg-[#E0C068]; }
    .type-flying { @apply bg-[#A890F0]; }
    .type-psychic { @apply bg-[#F85888]; }
    .type-bug { @apply bg-[#A8B820]; }
    .type-rock { @apply bg-[#B8A038]; }
    .type-ghost { @apply bg-[#705898]; }
    .type-dragon { @apply bg-[#7038F8]; }
    .type-dark { @apply bg-[#705848]; }
    .type-steel { @apply bg-[#B8B8D0]; }
    .type-fairy { @apply bg-[#EE99AC]; }
  `;
  
  render() {
    if (!this.pokemon) return html`<div>Loading...</div>`;
    
    return html`
      <div class="pokemon-card">
        <img
          class="pokemon-image"
          src="${this.pokemon.sprites.other['official-artwork'].front_default}"
          alt="${this.pokemon.name}"
        />
        <div class="pokemon-info">
          <div class="pokemon-number">#${this.pokemon.id.toString().padStart(4, '0')}</div>
          <h2 class="pokemon-name">${this.pokemon.name}</h2>
          <div class="pokemon-types">
            ${this.pokemon.types.map(
      ({ type }) => html`
                <span class="type-badge type-${type.name}">${type.name}</span>
              `
    )}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pokemon-card": PokemonCard;
  }
}