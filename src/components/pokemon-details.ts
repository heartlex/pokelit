import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Pokemon } from '../types';
import style from '../index.css?inline';

@customElement('pokemon-details')
export class PokemonDetails extends LitElement {
  @property({ type: Object })
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
    //
    document.body.style.overflow = 'hidden';
    if (!this.pokemon) return null;

    return html`
      <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all">
          <div class="relative p-8 bg-gradient-to-br from-[#2e3192] to-[#1bffff]">
            <button 
              class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white text-2xl 
                     bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
              @click=${this._close}
            >×</button>
            <img 
              src="${this.pokemon.sprites.other['official-artwork'].front_default}"
              alt="${this.pokemon.name}"
              class="w-56 h-56 mx-auto drop-shadow-2xl transform transition-transform duration-500 hover:scale-110"
            />
            <h2 class="text-4xl font-bold text-center mt-6 capitalize text-white drop-shadow-lg">
              ${this.pokemon.name}
              <span class="block text-lg opacity-75 mt-2">
                #${this.pokemon.id.toString().padStart(4, '0')}
              </span>
            </h2>
          </div>

          <div class="p-8 space-y-6">
            ${this.pokemon.stats.map(
              stat => html`
                <div class="space-y-2">
                  <div class="text-gray-800 capitalize flex justify-between items-center">
                    <span class="font-medium">${stat.stat.name}</span>
                    <span class="font-bold text-lg">${stat.base_stat}</span>
                  </div>
                  <div class="bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div 
                      class="bg-gradient-to-r from-[#2e3192] to-[#1bffff] h-full transition-all duration-1000 ease-out"
                      style="width: ${(stat.base_stat / 255) * 100}%"
                    ></div>
                  </div>
                </div>
              `
            )}
          </div>

          <div class="grid grid-cols-2 gap-8 p-8 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
            <div class="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
              <span class="text-sm text-gray-500 mb-1">Height</span>
              <span class="text-2xl font-bold text-gray-800">${this.pokemon.height / 10}m</span>
            </div>
            <div class="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
              <span class="text-sm text-gray-500 mb-1">Weight</span>
              <span class="text-2xl font-bold text-gray-800">${this.pokemon.weight / 10}kg</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private _close() {
    document.body.style.overflow = 'auto';
    this.dispatchEvent(new CustomEvent('close'));
  }
}