import { defineComponent } from "vue";
import "../mixins/interfaces";

export default defineComponent({
  computed: {
    /**
     * checks whether the current state (id, limit, offset) is valid
     */
    stateIsValid() {
      if (
        // check limits
        this.$store.state.offset < 0 ||
        this.$store.state.id <= 0 ||
        this.$store.state.limit <= 0 ||
        this.$store.state.limit > 64 ||
        // check types
        isNaN(this.$store.state.offset) ||
        isNaN(this.$store.state.id) ||
        isNaN(this.$store.state.limit) ||
        isFinite(this.$store.state.offset) === false ||
        isFinite(this.$store.state.id) === false ||
        isFinite(this.$store.state.limit) === false
      ) {
        return false;
      }
      return true;
    }
  },
  methods: {
    /**
     * returns a comma, an ampersand or nothing at all, depending on how close to the end of the array(.length) we are
     * @param index
     * @param length
     */
    ampersandOrCommaSeperator(index: number, length: number): string {
      // nearly end of array, possibly further
      if (index + 2 >= length) {
        // end of array
        if (index + 1 >= length) {
          return "";
        } else {
          // last in array
          return " & ";
        }
      } else {
        // not close to the end
        return ", ";
      }
    },
    /**
     * checks whether the current state (id, limit, offset) is valid and fixes it if necessary
     */
    fixStateIfNecessary() {
      if (this.stateIsValid === false) {
        this.resetStore();
      }
    },
    /**
     * fix the (store.)state
     */
    resetStore() {
      this.$store.state.offset = 0;
      this.$store.state.limit = 4;
      this.$store.state.id = 1;
    },
    /**
     * loads one pokemon based on the text- or number-id and returns it
     * @param id
     */
    async loadPokemon(id = "1"): Promise<Pokemon> {
      // load the pokemon (including sprites)
      const response = await this.axios.get(
        `${this.$store.state.apiUrl}/pokemon/${id}`
      );
      // load the extended pokemon (including translated names)
      const pokemon = response.data;
      const pokemonSpecies = await this.axios.get(
        `${this.$store.state.apiUrl}/pokemon-species/${id}`
      );
      pokemon.species = pokemonSpecies.data;
      // return the newly created pokemon
      return pokemon as Pokemon;
    },
    /**
     * adds a character multiple times to the start or end of a passed string and returns the result
     * @param stringToPad
     * @param length
     * @param character
     * @param start
     */
    pad(
      stringToPad: string,
      length: number,
      character: string,
      start: boolean
    ) {
      // TODO: check the length of the passed characted (type it as char?)
      let returnString = new String();
      // calculate how many chars will fit
      const charsToAdd = new Number(length - stringToPad.length);
      // add the calculated amout of chars to the returnString
      for (let index = 0; index < charsToAdd; index++) {
        returnString += character;
      }
      // add the passed string to the returnString
      if (start === true) {
        returnString += stringToPad; // add it to the end
      } else {
        returnString = stringToPad + returnString; // in front
      }
      return returnString; // return the result
    },
    /**
     * reroutes to the next couple of pokemons in the pokedex (based on the state (limit, offset))
     */
    async nextPokemons() {
      this.fixStateIfNecessary();
      // calculate the new offset
      this.$store.state.offset = Number(
        Number(this.$store.state.offset) + Number(this.$store.state.limit)
      );
      this.rerouteToPokedex();
    },
    /**
     * reroutes to the previous couple of pokemons in the pokedex (based on the state (limit, offset))
     */
    async previousPokemons() {
      this.fixStateIfNecessary();
      // calculate the new offset
      this.$store.state.offset = Number(
        Number(this.$store.state.offset) - Number(this.$store.state.limit)
      );
      this.rerouteToPokedex();
    },
    /**
     * reroutes to the pokedex based on the current state (limit, offset)
     */
    rerouteToPokedex() {
      this.fixStateIfNecessary();
      this.$router.push({
        name: "Pokedex",
        params: {
          offset: this.$store.state.offset,
          limit: this.$store.state.limit
        }
      });
    },
    /**
     * reroutes to the pokemon based on the current state (id)
     */
    rerouteToPokemon() {
      this.fixStateIfNecessary();
      this.$router.push({
        name: "Pokemon",
        params: {
          id: this.$store.state.id
        }
      });
    },
    /**
     * returns an array of values based on the passed array and filtered by the current (store.state.)language
     * @param array
     */
    getValueByLanguage(array: Array<Language>) {
      return array.filter(element => {
        // return true if the value matches the vurrent (store.state.)language
        return (
          String(element.language.name) === String(this.$store.state.language)
        );
      });
    }
  }
});
