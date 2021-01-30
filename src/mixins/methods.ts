import { defineComponent } from "vue";
import "../mixins/interfaces";
import { AxiosPromise, AxiosResponse } from "axios";
interface Ability {
  ability: {
    name: string;
    url: string;
  };
}

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
      const abilitiesPromises: Array<AxiosPromise> = pokemon.abilities.map(
        (ability: Ability) => this.axios.get(ability.ability.url)
      );
      const abilities: Array<AxiosResponse> = await this.axios.all(
        abilitiesPromises
      );
      pokemon.species = pokemonSpecies.data;
      pokemon.abilities = abilities.map(response => response.data);
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
    },
    async previousPokemons() {
      this.$store.state.offset = Number(
        Number(this.$store.state.offset) - Number(this.$store.state.limit)
      );
    },
    rerouteToPokedex() {
      if (
        this.$store.state.id <= this.$store.state.offset ||
        this.$store.state.id >
          this.$store.state.offset + this.$store.state.limit
      ) {
        this.$store.state.offset = this.$store.state.id - 1;
      }
      this.$router.push({ name: "Pokedex" });
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
