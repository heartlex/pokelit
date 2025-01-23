import {LitElement, css, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {Pokemon} from '../types';
import style from '../index.css?inline';
import {getTypeClass} from "../shared/utils.ts";

@customElement('pokemon-card')
export class PokemonCard extends LitElement {
  @property({type: Object})
  pokemon?: Pokemon;
  
  static styles = [
    unsafeCSS(style),
    css`
        :host {
            display: block;
        }
    `
  ];
  
  render() {
    if (!this.pokemon) return html`
      <div>Loading...</div>`;
    
    return html`
      <div class="group bg-white rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105
                  hover:shadow-xl border border-gray-100 relative">
        <div class="absolute top-3 right-3 text-sm font-mono text-gray-400 bg-white/80 px-2 py-1 rounded-full">
            #${this.pokemon.id.toString().padStart(4, '0')}
        </div>
        <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-6">
          <img
                  class="w-full aspect-square object-contain transform transition-transform duration-300 group-hover:scale-110"
                  src="${this.pokemon.sprites.other['official-artwork'].front_default}"
                  alt="${this.pokemon.name}"
          />
        </div>
        <div class="p-4">
          <h2 class="text-xl font-bold capitalize mb-3 text-gray-800">
            ${this.pokemon.name}
          </h2>
          <div class="flex gap-2 flex-wrap">
            ${this.pokemon.types.map(
                    ({type}) => html`
                      <span class="px-3 py-1 rounded-full text-sm font-medium
                        text-${getTypeClass(type.name)} border
                        border-${getTypeClass(type.name)}
                        bg-${getTypeClass(type.name)}-light"
                      >
                  ${type.name}
                </span>
                    `
            )}
          </div>
        </div>
      </div>
    `;
  }
  
}