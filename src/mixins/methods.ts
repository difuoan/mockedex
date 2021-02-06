import { defineComponent } from "vue";
import "../mixins/interfaces";

export default defineComponent({
  computed: {
    stateIsValid() {
      if (
        this.$store.state.offset < 0 ||
        this.$store.state.id <= 0 ||
        this.$store.state.limit <= 0 ||
        this.$store.state.limit > 64 ||
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
    fixState() {
      if (this.stateIsValid === false) {
        this.resetStore();
      }
    },
    resetStore() {
      this.$store.state.offset = 0;
      this.$store.state.limit = 4;
      this.$store.state.id = 1;
    },
    async loadPokemon(id = "1"): Promise<Pokemon> {
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
      this.fixState();
      this.$store.state.offset = Number(
        Number(this.$store.state.offset) + Number(this.$store.state.limit)
      );
      this.rerouteToPokedex();
    },
    async previousPokemons() {
      this.fixState();
      this.$store.state.offset = Number(
        Number(this.$store.state.offset) - Number(this.$store.state.limit)
      );
      this.rerouteToPokedex();
    },
    rerouteToPokedex() {
      this.fixState();
      this.$router.push({
        name: "Pokedex",
        params: {
          offset: this.$store.state.offset,
          limit: this.$store.state.limit
        }
      });
    },
    rerouteToPokemon() {
      this.fixState();
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
