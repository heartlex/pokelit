export function getTypeClass(type: string): string {
  const typeClasses: Record<string, string> = {
    normal: 'type-normal',
    fire: 'type-fire',
    water: 'type-water',
    grass: 'type-grass',
    electric: 'type-electric',
    ice: 'type-ice',
    fighting: 'type-fighting',
    poison: 'type-poison',
    ground: 'type-ground',
    flying: 'type-flying',
    psychic: 'type-psychic',
    bug: 'type-bug',
    rock: 'type-rock',
    ghost: 'type-ghost',
    dragon: 'type-dragon',
    dark: 'type-dark',
    steel: 'type-steel',
    fairy: 'type-fairy',
  };
  
  return typeClasses[type] || 'gray-400'; // Fallback class
}