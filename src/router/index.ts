import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Pokedex from "../views/Pokedex.vue";
import Pokemon from "../views/Pokemon.vue";
import PokedexWrapper from "../views/PokedexWrapper.vue";
import PokemonWrapper from "../views/PokemonWrapper.vue";

// TODO: there is an error in the live-version: when accessing the base url without a / vue can't seem to find an index
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "pokedex",
    component: PokedexWrapper,
    children: [
      {
        path: "pokedex",
        name: "Pokedex",
        component: Pokedex,
        props: true
      }
    ]
  },
  {
    path: "/pokedex/pokemon",
    redirect: "pokedex",
    component: PokemonWrapper,
    children: [
      {
        path: ":id",
        name: "Pokemon",
        component: Pokemon,
        props: true
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
