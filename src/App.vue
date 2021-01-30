<template>
  <div class="container py-4 text-center">
    <div class="bg-white border rounded mb-4 position-relative">
      <h1>Mock-édex</h1>
      <languages class="position-absolute top-50 right-0 mr-3" />
    </div>
    <router-view v-slot="routerParams">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <component
            :is="routerParams.Component"
            :key="$route.fullPath"
          ></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Languages from "./components/Languages.vue";

export default defineComponent({
  name: "Mockedex",
  components: { Languages }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
