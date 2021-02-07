import { shallowMount, VueWrapper } from "@vue/test-utils";
import { createStore, Store } from "vuex";
import methods from "@/mixins/methods";

const mockedTemplate = "<template><div>test</div></template>"; // simulate a component so the unit-test doesn't complain

describe("Name.vue", () => {
  let store: Store<{ language: string }>;
  let names: Array<Language>; // the functions props
  let wrapper: VueWrapper<any>;
  // unmount the wrapper after each test for performance and so that jest doesn't get confused
  afterEach(() => {
    wrapper.unmount(); // don't forget to unmount the wrapper
  });
  // TEST 1 - START //////////////////////////////////////////////////////////////////////////////////////////
  it(`see if the getValueByLanguage-function returns the expected values,
      then change the language and check again`, async () => {
    // prepare the store
    store = createStore({ state: { language: "test 3" } });
    // prepare the props
    names = [
      { name: "not the right value", language: { name: "it", url: "" } },
      { name: "test 2", language: { name: "test 3", url: "" } },
      { name: "test 5", language: { name: "test 4", url: "" } },
      { name: "not the right value", language: { name: "de", url: "" } },
      { name: "not the right value", language: { name: "en", url: "" } }
    ];
    // instantiate the wrapper here to inject the correct (store.)state
    wrapper = shallowMount({ template: mockedTemplate }, {
      global: { plugins: [store], mixins: [methods] }
    } as any);
    expect(wrapper.vm.getValueByLanguage(names)).toStrictEqual([
      { name: "test 2", language: { name: "test 3", url: "" } }
    ]);
    wrapper.vm.$store.state.language = "test 4"; // change the language
    expect(wrapper.vm.getValueByLanguage(names)).toStrictEqual([
      { name: "test 5", language: { name: "test 4", url: "" } }
    ]);
  });
  // TEST 1 - END //////////////////////////////////////////////////////////////////////////////////////////
  // TEST 2 - START //////////////////////////////////////////////////////////////////////////////////////////
  it(`see if the getValueByLanguage-function returns the expected values,
    then change the language and check again`, async () => {
    // prepare the store
    store = createStore({ state: { language: "test 8" } });
    // prepare the props
    names = [
      { name: "not the right value", language: { name: "it", url: "" } },
      { name: "test 6", language: { name: "test 8", url: "" } },
      { name: "test 7", language: { name: "test 9", url: "" } },
      { name: "not the right value", language: { name: "de", url: "" } },
      { name: "not the right value", language: { name: "en", url: "" } }
    ];
    // instantiate the wrapper here to inject the correct (store.)state
    wrapper = shallowMount({ template: mockedTemplate }, {
      global: { plugins: [store], mixins: [methods] }
    } as any);
    expect(wrapper.vm.getValueByLanguage(names)).toStrictEqual([
      { name: "test 6", language: { name: "test 8", url: "" } }
    ]);
    wrapper.vm.$store.state.language = "test 9"; // change the language
    expect(wrapper.vm.getValueByLanguage(names)).toStrictEqual([
      { name: "test 7", language: { name: "test 9", url: "" } }
    ]);
  });
  // TEST 2 - END //////////////////////////////////////////////////////////////////////////////////////////
});
