export interface IPokemon {
  name: string;
  url: string;
}

export interface IPokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface IPokemonForm {
  name: string;
  url: string;
}

export interface IPokemonSpecies {
  name: string;
  url: string;
}

export interface IPokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface IPokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface IPokemonSprites {
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
  abilities: IPokemonAbility[];
  base_experience: number;
  forms: IPokemonForm[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  name: string;
  url: string;
  order: number;
  species: IPokemonSpecies;
  sprites: IPokemonSprites;
  stats: IPokemonStat[];
  types: IPokemonType[];
  weight: number;
}
