import { ReactiveController, ReactiveControllerHost } from 'lit';
import {PokemonResponse} from "../types.ts";

export class PokemonApiController implements ReactiveController {
  
  async loadPokemon(pageSize, currentPage) {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${(currentPage - 1) * pageSize}`
      );
      const data = await response.json();
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          return response.json() as PokemonResponse;
        })
      );
      return [...pokemonDetails];
    } catch (error) {
      console.error('Error loading Pokémon:', error);
    }
  }
  
  async loadAllPokemon() {
    this.loading = true;
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10277');
      const data = await response.json();
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          return response.json();
        })
      );
      this.allPokemon = pokemonDetails;
    } catch (error) {
      console.error('Error loading all Pokémon:', error);
    }
    this.loading = false;
  }
  
  get filteredPokemon() {
    return this.searchQuery
      ? this.allPokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        pokemon.id.toString().includes(this.searchQuery)
      )
      : this.pokemon;
  }
  
  setSearchQuery(query) {
    this.searchQuery = query;
  }
  
  setPageSize(newSize) {
    if (newSize !== this.pageSize) {
      this.pageSize = newSize;
      this.pokemon = [];
      this.currentPage = 1;
      this.loadPokemon();
    }
  }
}
