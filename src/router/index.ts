import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Pokedex from "../views/Pokedex.vue";
import Pokemon from "../views/Pokemon.vue";
import PokedexWrapper from "../views/PokedexWrapper.vue";
import PokemonWrapper from "../views/PokemonWrapper.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/pokedex/0/4"
  },
  {
    path: "/pokedex",
    name: "PokedexWrapper",
    component: PokedexWrapper,
    children: [
      {
        path: ":offset/:limit",
        name: "Pokedex",
        component: Pokedex,
        props: true
      }
    ]
  },
  {
    path: "/pokemon",
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
