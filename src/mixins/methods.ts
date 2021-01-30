import { defineComponent } from "vue";
import "../mixins/interfaces";

export default defineComponent({
  methods: {
    async loadPokemon(id = "1") {
      const response = await this.axios.get(
        `${this.$store.state.apiUrl}/pokemon/${id}`
      );
      const pokemon = response.data;
      const pokemonSpecies = await this.axios.get(
        `${this.$store.state.apiUrl}/pokemon-species/${id}`
      );
      pokemon.species = pokemonSpecies.data;
      return pokemon as Pokemon;
    },
    pad(
      stringToPad: string,
      length: number,
      character: string,
      start: boolean
    ) {
      let returnString = new String();
      const charsToAdd = new Number(length - stringToPad.length);
      for (let index = 0; index < charsToAdd; index++) {
        returnString += character;
      }
      if (start === true) {
        returnString += stringToPad;
      } else {
        returnString = stringToPad + returnString;
      }
      return returnString;
    },
    async nextPokemons() {
      this.$store.state.offset = Number(
        Number(this.$store.state.offset) + Number(this.$store.state.limit)
      );
      this.rerouteToPokedex();
    },
    async previousPokemons() {
      this.$store.state.offset = Number(
        Number(this.$store.state.offset) - Number(this.$store.state.limit)
      );
      this.rerouteToPokedex();
    },
    rerouteToPokedex() {
      this.$router.push({
        name: "Pokedex",
        params: {
          offset: this.$store.state.offset,
          limit: this.$store.state.limit
        }
      });
    },
    rerouteToPokemon() {
      this.$router.push({
        name: "Pokemon",
        params: {
          id: this.$store.state.id
        }
      });
    },
    // eslint-disable-next-line
    getValueByLanguage(array: Array<any>) {
      return array.filter(element => {
        return (
          String(element.language.name) === String(this.$store.state.language)
        );
      });
    }
  }
});
