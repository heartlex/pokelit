/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'type-normal': {
          DEFAULT: '#A8A878',
          light: '#E6E6C6', // 400 lighter
        },
        'type-fire': {
          DEFAULT: '#F08030',
          light: '#FAD9C3',
        },
        'type-water': {
          DEFAULT: '#6890F0',
          light: '#C6DAF9',
        },
        'type-grass': {
          DEFAULT: '#78C850',
          light: '#D5EDC4',
        },
        'type-electric': {
          DEFAULT: '#F8D030',
          light: '#FDF2CC',
        },
        'type-ice': {
          DEFAULT: '#98D8D8',
          light: '#E1F4F4',
        },
        'type-fighting': {
          DEFAULT: '#C03028',
          light: '#EAB0AC',
        },
        'type-poison': {
          DEFAULT: '#A040A0',
          light: '#E0B9E0',
        },
        'type-ground': {
          DEFAULT: '#E0C068',
          light: '#F5EAC2',
        },
        'type-flying': {
          DEFAULT: '#A890F0',
          light: '#DED9F9',
        },
        'type-psychic': {
          DEFAULT: '#F85888',
          light: '#FDD0D8',
        },
        'type-bug': {
          DEFAULT: '#A8B820',
          light: '#E4E8AA',
        },
        'type-rock': {
          DEFAULT: '#B8A038',
          light: '#E8DCAB',
        },
        'type-ghost': {
          DEFAULT: '#705898',
          light: '#D0C9DD',
        },
        'type-dragon': {
          DEFAULT: '#7038F8',
          light: '#D3C4FB',
        },
        'type-dark': {
          DEFAULT: '#705848',
          light: '#D0C6BC',
        },
        'type-steel': {
          DEFAULT: '#B8B8D0',
          light: '#E8E8F0',
        },
        'type-fairy': {
          DEFAULT: '#EE99AC',
          light: '#F9D8DE',
        },
      },
    },
  },
  safelist: [
    {
      pattern: /text-type-(normal|fire|water|grass|electric|ice|fighting|poison|ground|flying|psychic|bug|rock|ghost|dragon|dark|steel|fairy)/,
    },
    {
      pattern: /border-type-(normal|fire|water|grass|electric|ice|fighting|poison|ground|flying|psychic|bug|rock|ghost|dragon|dark|steel|fairy)/,
    },
    {
      pattern: /bg-type-(normal|fire|water|grass|electric|ice|fighting|poison|ground|flying|psychic|bug|rock|ghost|dragon|dark|steel|fairy)-light/,
    }
  ],
  plugins: [],
};