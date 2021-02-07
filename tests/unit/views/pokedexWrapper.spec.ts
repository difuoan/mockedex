import { shallowMount, VueWrapper, flushPromises } from "@vue/test-utils";
import PokedexWrapper from "@/views/PokedexWrapper.vue";
import { createStore, Store } from "vuex";
import methods from "@/mixins/methods";
import router from "@/router";

describe("PokedexWrapper.vue", () => {
  // prepare the store
  const store: Store<{
    apiUrl: string;
    language: string;
  }> = createStore({
    state: {
      apiUrl: "url 1",
      language: "lang 1",
      id: 1,
      offset: 0,
      limit: 4
    }
  });
  // prepare the vue-instance
  const wrapper: VueWrapper<any> = shallowMount(PokedexWrapper, {
    global: {
      plugins: [store, router],
      mixins: [methods]
    }
  } as any);
  // spy on the router
  const mockRouterSpy = jest.spyOn(router, "push");
  // use await so jest doesn't get confused when chaining the tests
  it(`simulates the pokedeWrapper-component
      clicks around in it
      and checks whether the routing has worked correctly`, async () => {
    expect(mockRouterSpy).toHaveBeenCalledTimes(0);
    const nextButtons = wrapper.findAll("button[title=Next]");
    await nextButtons[0].trigger("click");
    await router.isReady(); // await the route-change
    await flushPromises(); // the router returns promises
    await wrapper.vm.$nextTick(); // await changes
    expect(router.push).toHaveBeenLastCalledWith({
      name: "Pokedex",
      params: { limit: 4, offset: 4 }
    });
    expect(mockRouterSpy).toHaveBeenCalledTimes(1);
    let backButtons = wrapper.findAll("button[title=Back]");
    await backButtons[0].trigger("click");
    await router.isReady(); // await the route-change
    await flushPromises(); // the router returns promises
    await wrapper.vm.$nextTick(); // await changes
    expect(router.push).toHaveBeenLastCalledWith({
      name: "Pokedex",
      params: { limit: 4, offset: 0 }
    });
    expect(mockRouterSpy).toHaveBeenCalledTimes(2);
    backButtons = wrapper.findAll("button[title=Back]");
    await backButtons[0].trigger("click");
    await router.isReady(); // await the route-change
    await flushPromises(); // the router returns promises
    await wrapper.vm.$nextTick(); // await changes
    expect(router.push).toHaveBeenLastCalledWith({
      name: "Pokedex",
      params: { limit: 4, offset: 0 }
    }); // don't expect the route to have changed since we shouldn't be able to go back
    expect(mockRouterSpy).toHaveBeenCalledTimes(2); // don't expect the route to have changed since we shouldn't be able to go back
  });
});
