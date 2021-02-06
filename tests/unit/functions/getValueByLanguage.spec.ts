import { shallowMount, VueWrapper } from "@vue/test-utils";
import { createStore, Store } from "vuex";
import methods from "@/mixins/methods";

describe("Name.vue", () => {
  let store: Store<{ language: string }>;
  let names: Array<Language>;
  let wrapper: VueWrapper<any>;
  afterEach(() => {
    wrapper.unmount(); // don't forget to unmount the wrapper
  });
  // TEST 1 - START //////////////////////////////////////////////////////////////////////////////////////////
  it(`see if the getValueByLanguage-function returns the expected values,
    then change the language and check again
    (we don't really check the filter-function, but the data structure)`, async () => {
    store = createStore({ state: { language: "test 3" } });
    names = [
      { name: "not the right value", language: { name: "it", url: "" } },
      { name: "test 2", language: { name: "test 3", url: "" } },
      { name: "test 5", language: { name: "test 4", url: "" } },
      { name: "not the right value", language: { name: "de", url: "" } },
      { name: "not the right value", language: { name: "en", url: "" } }
    ];
    wrapper = shallowMount(methods, { global: { plugins: [store] } } as any);
    expect(wrapper.vm.getValueByLanguage(names)).toStrictEqual([
      { name: "test 2", language: { name: "test 3", url: "" } }
    ]);
    wrapper.vm.$store.state.language = "test 4";
    expect(wrapper.vm.getValueByLanguage(names)).toStrictEqual([
      { name: "test 5", language: { name: "test 4", url: "" } }
    ]);
  });
  // TEST 1 - END //////////////////////////////////////////////////////////////////////////////////////////
  // TEST 2 - START //////////////////////////////////////////////////////////////////////////////////////////
  it(`see if the getValueByLanguage-function returns the expected values,
    then change the language and check again
    (we don't really check the filter-function, but the data structure)`, async () => {
    store = createStore({ state: { language: "test 8" } });
    names = [
      { name: "not the right value", language: { name: "it", url: "" } },
      { name: "test 6", language: { name: "test 8", url: "" } },
      { name: "test 7", language: { name: "test 9", url: "" } },
      { name: "not the right value", language: { name: "de", url: "" } },
      { name: "not the right value", language: { name: "en", url: "" } }
    ];
    wrapper = shallowMount(methods, { global: { plugins: [store] } } as any);
    expect(wrapper.vm.getValueByLanguage(names)).toStrictEqual([
      { name: "test 6", language: { name: "test 8", url: "" } }
    ]);
    wrapper.vm.$store.state.language = "test 9";
    expect(wrapper.vm.getValueByLanguage(names)).toStrictEqual([
      { name: "test 7", language: { name: "test 9", url: "" } }
    ]);
  });
  // TEST 2 - END //////////////////////////////////////////////////////////////////////////////////////////
});
