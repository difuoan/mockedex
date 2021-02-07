/**
 * this seems to be the basic element of the poke-api/v2 used for pretty much anything
 */
interface ResultItem {
  name: string;
  url: string;
}
/**
 * basic stuff about the pokemon
 * note that this includes the pokemons sprites
 */
interface Pokemon {
  name: string;
  id: number;
  order: number;
  forms: Array<ResultItem>;
  sprites: Array<string>;
}
/**
 * small interface for the ability using the basic resultItem
 */
interface Ability {
  ability: ResultItem;
}
/**
 * small interface for the flavourText using the basic resultItem
 */
interface FlavourText {
  flavor_text: string;
  version: ResultItem;
}
/**
 * small interface for the sprites using the basic resultItem
 * note that the item also contains some sprites
 */
interface Item {
  item: ResultItem & {
    sprites: {
      url: string;
    };
  };
}
/**
 * small interface for the move using the basic resultItem
 */
interface Move {
  move: ResultItem;
}
/**
 * small interface for the language using the basic resultItem
 * note that the name is the translated value and the language is the identifier-object
 */
interface Language {
  name: string;
  language: ResultItem;
}
/**
 * an array of translations used to pick the one we want to display based on the current (store.state.)language
 */
interface Name extends ResultItem {
  names: Array<Language>;
}
/**
 * the extended pokemon including its translated values
 */
interface PokemonSpecies extends ResultItem {
  slot: number;
  type: ResultItem;
  names: Array<Language>;
}
