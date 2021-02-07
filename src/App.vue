<template>
  <div class="container py-4 text-center">
    <div class="bg-white border rounded mb-4 position-relative">
      <!-- app-title -->
      <h1 class="p-0 m-0">Mock-édex</h1>
      <!-- app-languages -->
      <languages
        class="position-absolute top-50 right-0 mr-2 translate-y-m-50"
      />
    </div>
    <!-- base-router-view -->
    <router-view v-slot="routerParams">
      <transition name="fade" mode="out-in">
        <keep-alive include="PokedexWrapper,PokemonWrapper">
          <component
            :is="routerParams.Component"
            :key="$route.name"
          ></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Languages from "./components/Languages.vue";
/**
 * the base-app-component used to load all other components/routes inside
 */
export default defineComponent({
  name: "Mockedex",
  components: { Languages }
});
</script>
