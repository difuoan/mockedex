interface ResultItem {
  name: string;
  url: string;
}
interface Pokemon {
  name: string;
  id: number;
  order: number;
  forms: Array<ResultItem>;
  sprites: Array<string>;
}
interface Ability {
  ability: ResultItem;
}
interface FlavourText {
  flavor_text: string;
  version: ResultItem;
}
interface Item {
  item: ResultItem & {
    sprites: {
      url: string;
    };
  };
}
interface Move {
  move: ResultItem;
}
interface Language {
  name: string;
  language: ResultItem;
}
interface Name extends ResultItem {
  names: Array<Language>;
}
interface PokemonSpecies extends ResultItem {
  slot: number;
  type: ResultItem;
  names: Array<Language>;
}
