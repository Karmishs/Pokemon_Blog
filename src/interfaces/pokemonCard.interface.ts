export interface PokemonAbility {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }
  
  export interface PokemonForm {
    name: string;
    url: string;
  }
  
  export interface PokemonSpecies {
    name: string;
    url: string;
  }
  
  export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }
  
  export interface PokemonType {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }
  
  export interface PokemonSprites {
    front_default: string;
    front_shiny: string;
    other: {
      home: {
        front_default: string;
        front_shiny: string;
      };
      ["official-artwork"]: {
        front_default: string;
        front_shiny: string;
      };
      showdown: {
        front_default: string;
        front_shiny: string;
      }
    };
  }
  
  
  export interface IPokemonCard {
    abilities: PokemonAbility[];
    base_experience: number;
    forms: PokemonForm[];
    height: number;
    held_items: any[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    name: string;
    url: string;
    order: number;
    species: PokemonSpecies;
    sprites: PokemonSprites;
    stats: PokemonStat[];
    types: PokemonType[];
    weight: number;
  }
  

// export interface IPokemonCard {
//   name: string;
//   url: string;
//   sprites: {
//     front_default: string;
//   };
// }