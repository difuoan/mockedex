<template>
  <div class="container py-4 text-center">
    <h1 class="bg-white border rounded mb-4">Mock-édex</h1>
    <router-view v-slot="routerParams">
      <transition name="fade" mode="out-in">
        <component :is="routerParams.Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
